from app.models.analysis_models import CrawlSummary
from app.models.report_models import OwaspMapping, Scenario


class ScenarioGenerationAgent:
    def generate(self, crawl_summary: CrawlSummary, mappings: list[OwaspMapping]) -> list[Scenario]:
        scenarios: list[Scenario] = []
        category_names = [mapping.category for mapping in mappings]
        evidence = [obs for page in crawl_summary.pages for obs in page.security_observations]

        def add(title: str, category: str, priority: str, steps: list[str], expected: str, data: list[str]) -> None:
            scenarios.append(
                Scenario(
                    id=f"SEC-{len(scenarios) + 1:03d}",
                    title=title,
                    category=category,
                    priority=priority,
                    evidence=evidence[min(len(scenarios), max(len(evidence) - 1, 0))] if evidence else crawl_summary.target_url,
                    preconditions="Tester has written authorization and test environment scope is approved.",
                    steps=steps,
                    expected_result=expected,
                    test_data=data,
                )
            )

        add(
            "Verify public pages do not disclose sensitive implementation details",
            "A05 Security Misconfiguration",
            "Medium",
            ["Open each discovered public page.", "Review visible content, comments, error banners, and metadata.", "Trigger a safe invalid route such as /not-found-secureplan-check."],
            "The application does not expose stack traces, secrets, internal paths, versions, or debug details.",
            ["/not-found-secureplan-check"],
        )
        add(
            "Verify security headers are defined for browser-side protection",
            "A05 Security Misconfiguration",
            "High",
            ["Request the landing page and key discovered routes.", "Inspect response headers for HSTS, CSP, X-Content-Type-Options, and frame protections.", "Record missing or weak controls."],
            "Security headers are present, consistent, and aligned with browser hardening expectations.",
            ["Content-Security-Policy", "Strict-Transport-Security"],
        )
        if any("A07" in cat or "Authentication" in cat for cat in category_names):
            add(
                "Verify login rejects invalid credentials without account enumeration",
                "A07 Identification and Authentication Failures",
                "High",
                ["Navigate to the login flow.", "Submit a known invalid username with a random password.", "Submit a valid-format but unknown username.", "Compare messages, timing, and status behavior."],
                "The application returns a generic failure response and does not reveal whether an account exists.",
                ["unknown-user@example.test", "WrongPassword123!"],
            )
            add(
                "Verify password and session workflows resist basic abuse",
                "A07 Identification and Authentication Failures",
                "High",
                ["Attempt repeated failed logins within approved rate limits.", "Check whether lockout, throttling, or step-up verification appears.", "Log out and attempt to use browser back navigation to access protected content."],
                "Repeated failures are controlled and logged; logged-out sessions cannot access protected content.",
                ["5 controlled invalid attempts"],
            )
        if any("A03" in cat or "Injection" in cat for cat in category_names):
            add(
                "Verify text inputs safely handle script-like content",
                "A03 Injection",
                "High",
                ["Identify search or text input fields.", "Submit harmless encoded script-like text.", "Observe rendered output and response behavior.", "Check that content is displayed as text or rejected safely."],
                "Input is encoded, validated, or rejected without script execution or unsafe rendering.",
                ["<script>alert('test')</script>", "\"><img src=x onerror=alert(1)>"],
            )
            add(
                "Verify input fields safely handle SQL-like strings",
                "A03 Injection",
                "High",
                ["Submit SQL-like strings into text fields in scope.", "Review application response and visible errors.", "Confirm no authentication bypass, data leakage, or database error appears."],
                "The application treats SQL-like input as data and does not expose database behavior.",
                ["' OR '1'='1", "test@example.test'--"],
            )
        if any("A04" in cat or "Insecure Design" in cat for cat in category_names):
            add(
                "Verify checkout or cart values cannot be manipulated from the client",
                "A04 Insecure Design",
                "High",
                ["Add an item to cart using the normal UI.", "Observe quantity, price, coupon, and total fields.", "Attempt approved client-side tampering using browser dev tools in a test environment.", "Submit the order preview."],
                "Server-side validation recalculates totals and rejects unauthorized price or discount changes.",
                ["quantity=-1", "discount=999"],
            )
        add(
            "Verify direct route access does not bypass authorization",
            "A01 Broken Access Control",
            "Critical",
            ["List discovered account, cart, admin, and checkout-like routes.", "Access each route without authentication where applicable.", "Access role-sensitive routes using a lower-privilege test account if available."],
            "Protected resources require the correct authenticated identity and authorization level.",
            ["/admin", "/account", "/orders/1"],
        )
        add(
            "Verify sensitive data is not stored or cached unsafely in the browser",
            "A02 Cryptographic Failures",
            "Medium",
            ["Complete a normal user flow in the approved test environment.", "Inspect local storage, session storage, cookies, and browser cache.", "Check for tokens, passwords, PII, or payment data exposure."],
            "Sensitive data is not stored in clear text and cookies use secure attributes.",
            ["localStorage", "sessionStorage", "cookies"],
        )
        add(
            "Verify security-relevant events can be monitored",
            "A09 Security Logging and Monitoring Failures",
            "Medium",
            ["Perform safe failed-login, invalid-input, and unauthorized-route checks.", "Ask the application owner to verify whether events are logged.", "Confirm logs avoid secrets and contain enough context for investigation."],
            "Security events are captured with useful metadata and without sensitive payload leakage.",
            ["failed login", "invalid input", "unauthorized access"],
        )
        return scenarios[:12]

