export type Scenario = {
  id: string;
  title: string;
  category: string;
  priority: "Critical" | "High" | "Medium" | "Low" | string;
  evidence: string;
  preconditions: string;
  steps: string[];
  expected_result: string;
  test_data: string[];
};

export type OwaspMapping = {
  category: string;
  coverage_reason: string;
  related_evidence: string[];
};

export type ScannerFinding = {
  title: string;
  severity: string;
  evidence: string;
  recommendation: string;
};

export type SecurityReport = {
  report_id: string;
  target_url: string;
  executive_summary: string;
  scope: string[];
  assumptions: string[];
  test_strategy: string[];
  scenarios: Scenario[];
  owasp_mapping: OwaspMapping[];
  scanner_findings: ScannerFinding[];
  markdown: string;
  text: string;
};

export type AnalysisResponse = {
  status: string;
  timeline: string[];
  crawl_summary: {
    target_url: string;
    pages: Array<{
      url: string;
      title?: string;
      headings: string[];
      links: string[];
      buttons: string[];
      security_observations: string[];
    }>;
    detected_flows: string[];
  };
  report: SecurityReport;
};

