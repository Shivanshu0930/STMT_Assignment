from uuid import uuid4

from app.models.analysis_models import CrawlSummary
from app.models.report_models import ScannerFinding, SecurityReport
from app.utils.markdown_utils import report_to_markdown


class ReportAgent:
    def build(
        self,
        target_url: str,
        crawl_summary: CrawlSummary,
        ai_report: dict | None,
        scenarios,
        mappings,
        scanner_findings: list[dict],
    ) -> SecurityReport:
        findings = [ScannerFinding(**finding) for finding in scanner_findings]
        if ai_report:
            report_data = {
                "report_id": str(uuid4()),
                "target_url": target_url,
                "executive_summary": ai_report.get("executive_summary", ""),
                "scope": ai_report.get("scope", [target_url]),
                "assumptions": ai_report.get("assumptions", []),
                "test_strategy": ai_report.get("test_strategy", []),
                "scenarios": ai_report.get("scenarios", [scenario.model_dump() for scenario in scenarios]),
                "owasp_mapping": ai_report.get("owasp_mapping", [mapping.model_dump() for mapping in mappings]),
                "scanner_findings": [finding.model_dump() for finding in findings],
                "markdown": "",
                "text": "",
            }
        else:
            report_data = {
                "report_id": str(uuid4()),
                "target_url": target_url,
                "executive_summary": (
                    "SecurePlan AI analyzed the visible application surface and generated an OWASP-aligned "
                    "security testing package. The plan focuses on non-destructive validation of authentication, "
                    "authorization, input handling, configuration, browser storage, monitoring, and business logic risks."
                ),
                "scope": [target_url, f"{len(crawl_summary.pages)} discovered page(s)", ", ".join(crawl_summary.detected_flows)],
                "assumptions": [
                    "Testing is performed only with written authorization.",
                    "Generated scenarios are planning artifacts and should be executed in a test or approved environment.",
                    "Active exploitation, destructive testing, and data exfiltration are out of scope.",
                ],
                "test_strategy": [
                    "Use visible UI evidence to prioritize relevant security checks.",
                    "Map features and flows to OWASP Top 10 and WSTG-style test areas.",
                    "Perform passive scanner enrichment for headers, cookies, and browser-facing misconfigurations.",
                    "Validate business logic manually with approved test accounts and controlled test data.",
                ],
                "scenarios": [scenario.model_dump() for scenario in scenarios],
                "owasp_mapping": [mapping.model_dump() for mapping in mappings],
                "scanner_findings": [finding.model_dump() for finding in findings],
                "markdown": "",
                "text": "",
            }
        report = SecurityReport(**report_data)
        markdown = report_to_markdown(report)
        return report.model_copy(update={"markdown": markdown, "text": markdown.replace("#", "").replace("*", "")})

