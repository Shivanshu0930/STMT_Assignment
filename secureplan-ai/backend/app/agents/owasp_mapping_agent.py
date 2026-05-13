from app.models.analysis_models import CrawlSummary
from app.models.report_models import OwaspMapping


class OwaspMappingAgent:
    def map(self, crawl_summary: CrawlSummary) -> list[OwaspMapping]:
        evidence = [obs for page in crawl_summary.pages for obs in page.security_observations]
        flows = " ".join(crawl_summary.detected_flows).lower()
        mappings: list[OwaspMapping] = [
            OwaspMapping(
                category="A05 Security Misconfiguration",
                coverage_reason="Every public web application should be checked for missing headers, verbose errors, and unsafe defaults.",
                related_evidence=evidence[:3] or ["Landing URL is publicly reachable."],
            )
        ]
        if "authentication" in flows:
            mappings.append(
                OwaspMapping(
                    category="A07 Identification and Authentication Failures",
                    coverage_reason="Login or password inputs were observed in the UI.",
                    related_evidence=[item for item in evidence if "Authentication" in item][:3],
                )
            )
        if "search" in flows:
            mappings.append(
                OwaspMapping(
                    category="A03 Injection",
                    coverage_reason="Search/query surfaces can reflect or process user-controlled input.",
                    related_evidence=[item for item in evidence if "Search" in item][:3],
                )
            )
        if "cart" in flows or "checkout" in flows or "payment" in flows:
            mappings.append(
                OwaspMapping(
                    category="A04 Insecure Design",
                    coverage_reason="Commerce workflows require business logic and transaction abuse testing.",
                    related_evidence=[item for item in evidence if "Commerce" in item][:3],
                )
            )
        mappings.append(
            OwaspMapping(
                category="A01 Broken Access Control",
                coverage_reason="Discovered routes and account-related flows should be tested for direct object access and authorization bypass.",
                related_evidence=[page.url for page in crawl_summary.pages[:5]],
            )
        )
        return mappings

