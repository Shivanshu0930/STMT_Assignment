import type { AnalysisResponse } from "../lib/types";

export const mockReport: AnalysisResponse = {
  status: "ready",
  timeline: [
    "Scope validated",
    "Landing URL queued for exploration",
    "Exploration completed across 6 page(s)",
    "Mapped 5 OWASP risk area(s)",
    "Generated 10 baseline security scenario(s)",
    "Report synthesis completed"
  ],
  crawl_summary: {
    target_url: "https://demo-shop.local",
    detected_flows: ["Authentication", "Search", "Cart and Checkout", "Payment"],
    pages: [
      {
        url: "https://demo-shop.local",
        title: "Demo Shop",
        headings: ["New arrivals", "Featured products"],
        links: ["/login", "/cart", "/checkout"],
        buttons: ["Search", "Add to cart"],
        security_observations: ["Commerce workflow detected; evaluate price manipulation and business logic abuse."]
      }
    ]
  },
  report: {
    report_id: "demo-report",
    target_url: "https://demo-shop.local",
    executive_summary:
      "SecurePlan AI generated an OWASP-aligned security testing package from the visible ecommerce UI surface.",
    scope: ["Landing page", "Authentication", "Search", "Checkout"],
    assumptions: ["Testing is authorized", "No destructive testing is performed"],
    test_strategy: ["Map observed UI flows to OWASP risks", "Prioritize authentication, access control, and input validation"],
    owasp_mapping: [
      {
        category: "A01 Broken Access Control",
        coverage_reason: "Account and checkout routes require authorization checks.",
        related_evidence: ["/account", "/checkout"]
      },
      {
        category: "A03 Injection",
        coverage_reason: "Search fields accept user-controlled input.",
        related_evidence: ["Search input detected"]
      }
    ],
    scanner_findings: [
      {
        title: "ZAP integration disabled",
        severity: "Info",
        evidence: "Demo mode",
        recommendation: "Enable ZAP for passive scanner enrichment."
      }
    ],
    scenarios: [
      {
        id: "SEC-001",
        title: "Verify direct route access does not bypass authorization",
        category: "A01 Broken Access Control",
        priority: "Critical",
        evidence: "Account and checkout routes discovered",
        preconditions: "Tester has written authorization.",
        steps: ["Open protected routes without login", "Repeat with a lower-privilege account", "Compare response behavior"],
        expected_result: "Protected resources require correct authentication and authorization.",
        test_data: ["/account", "/orders/1"]
      },
      {
        id: "SEC-002",
        title: "Verify text inputs safely handle script-like content",
        category: "A03 Injection",
        priority: "High",
        evidence: "Search input detected",
        preconditions: "Search page is accessible.",
        steps: ["Enter script-like text", "Submit search", "Observe rendered output"],
        expected_result: "The application safely encodes or rejects unsafe content.",
        test_data: ["<script>alert('test')</script>"]
      }
    ],
    markdown: "# Security Test Plan\n\nDemo report.",
    text: "Security Test Plan\n\nDemo report."
  }
};

