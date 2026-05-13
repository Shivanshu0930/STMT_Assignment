import re
from collections import deque

import httpx
from bs4 import BeautifulSoup

from app.models.analysis_models import CrawlSummary, FormField, FormSummary, PageSummary
from app.utils.url_utils import normalize_url, same_origin


class PlaywrightService:
    """Lightweight exploration service.

    The current implementation uses HTTP parsing for reliability in constrained
    environments. The class boundary is intentionally named for the browser
    automation role so it can be upgraded to full Playwright exploration.
    """

    async def crawl(self, url: str, max_pages: int = 8) -> CrawlSummary:
        visited: set[str] = set()
        queue: deque[str] = deque([url])
        pages: list[PageSummary] = []

        headers = {"User-Agent": "SecurePlanAI/1.0 Security-Test-Planning-Bot"}
        async with httpx.AsyncClient(headers=headers, follow_redirects=True, timeout=12) as client:
            while queue and len(visited) < max_pages:
                current_url = queue.popleft()
                if current_url in visited:
                    continue
                visited.add(current_url)

                try:
                    response = await client.get(current_url)
                    content_type = response.headers.get("content-type", "")
                    if "text/html" not in content_type:
                        continue
                except Exception:
                    continue

                page = self._parse_page(current_url, response.text)
                pages.append(page)

                for link in page.links:
                    absolute = normalize_url(current_url, link)
                    if absolute and same_origin(url, absolute) and absolute not in visited:
                        queue.append(absolute)

        detected_flows = self._detect_flows(pages)
        return CrawlSummary(target_url=url, pages=pages, detected_flows=detected_flows)

    def _parse_page(self, url: str, html: str) -> PageSummary:
        soup = BeautifulSoup(html, "html.parser")
        title = soup.title.get_text(strip=True) if soup.title else None
        headings = [h.get_text(" ", strip=True) for h in soup.select("h1, h2, h3")][:16]
        links = [a.get("href", "") for a in soup.find_all("a", href=True)][:60]
        buttons = [b.get_text(" ", strip=True) or b.get("aria-label", "") for b in soup.select("button, [role=button]")][:40]

        inputs: list[FormField] = []
        for element in soup.select("input, textarea, select"):
            inputs.append(
                FormField(
                    name=element.get("name") or element.get("id") or element.get("aria-label") or "unnamed",
                    field_type=element.get("type") or element.name,
                    required=element.has_attr("required"),
                    placeholder=element.get("placeholder"),
                )
            )

        forms: list[FormSummary] = []
        for form in soup.find_all("form")[:12]:
            fields = []
            for element in form.select("input, textarea, select"):
                fields.append(
                    FormField(
                        name=element.get("name") or element.get("id") or element.get("aria-label") or "unnamed",
                        field_type=element.get("type") or element.name,
                        required=element.has_attr("required"),
                        placeholder=element.get("placeholder"),
                    )
                )
            forms.append(FormSummary(action=form.get("action"), method=(form.get("method") or "GET").upper(), fields=fields))

        observations = self._security_observations(url, title, headings, inputs, buttons)
        return PageSummary(
            url=url,
            title=title,
            headings=headings,
            links=links,
            buttons=[button for button in buttons if button][:40],
            inputs=inputs[:40],
            forms=forms,
            security_observations=observations,
        )

    def _detect_flows(self, pages: list[PageSummary]) -> list[str]:
        text = " ".join(
            " ".join([page.url, page.title or "", " ".join(page.headings), " ".join(page.buttons)])
            for page in pages
        ).lower()
        candidates = {
            "Authentication": ["login", "sign in", "password"],
            "Registration": ["register", "sign up", "create account"],
            "Search": ["search", "query"],
            "Cart and Checkout": ["cart", "basket", "checkout"],
            "Payment": ["payment", "billing", "card"],
            "Profile Management": ["profile", "account", "address"],
            "File Upload": ["upload", "file"],
        }
        flows = [name for name, signals in candidates.items() if any(signal in text for signal in signals)]
        return flows or ["Public browsing"]

    def _security_observations(
        self,
        url: str,
        title: str | None,
        headings: list[str],
        inputs: list[FormField],
        buttons: list[str],
    ) -> list[str]:
        combined = " ".join([url, title or "", " ".join(headings), " ".join(buttons)]).lower()
        observations: list[str] = []
        if any(field.field_type in {"password"} or "password" in field.name.lower() for field in inputs):
            observations.append("Authentication input detected; evaluate credential handling, lockout, reset, and session controls.")
        if any(re.search(r"search|query", field.name, re.I) for field in inputs) or "search" in combined:
            observations.append("Search/query surface detected; evaluate injection and reflected output handling.")
        if any(word in combined for word in ["cart", "checkout", "coupon", "discount"]):
            observations.append("Commerce workflow detected; evaluate price manipulation, authorization, and business logic abuse.")
        if any(field.field_type == "file" for field in inputs):
            observations.append("File upload input detected; evaluate file validation, malware controls, and content handling.")
        if not observations:
            observations.append("Public UI surface detected; evaluate headers, information disclosure, and exposed routes.")
        return observations
