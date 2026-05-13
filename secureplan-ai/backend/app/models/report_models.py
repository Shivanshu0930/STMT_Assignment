from pydantic import BaseModel


class Scenario(BaseModel):
    id: str
    title: str
    category: str
    priority: str
    evidence: str
    preconditions: str
    steps: list[str]
    expected_result: str
    test_data: list[str]


class OwaspMapping(BaseModel):
    category: str
    coverage_reason: str
    related_evidence: list[str]


class ScannerFinding(BaseModel):
    title: str
    severity: str
    evidence: str
    recommendation: str


class SecurityReport(BaseModel):
    report_id: str
    target_url: str
    executive_summary: str
    scope: list[str]
    assumptions: list[str]
    test_strategy: list[str]
    scenarios: list[Scenario]
    owasp_mapping: list[OwaspMapping]
    scanner_findings: list[ScannerFinding]
    markdown: str
    text: str


class AnalysisResponse(BaseModel):
    status: str
    timeline: list[str]
    crawl_summary: dict
    report: SecurityReport

