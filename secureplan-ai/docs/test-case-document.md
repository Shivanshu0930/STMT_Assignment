# Test Case Document

## Test Cases For SecurePlan AI

| ID | Test Case | Steps | Expected Result |
|---|---|---|---|
| APP-001 | Analyze valid URL | Enter a valid URL and click Generate | System returns completed report |
| APP-002 | Reject invalid URL | Enter invalid text as URL | Backend returns validation error |
| APP-003 | Export Markdown | Generate report and open Markdown export | Markdown report is returned |
| APP-004 | Export JSON | Generate report and open JSON export | JSON report is returned |
| APP-005 | Export Text | Generate report and open text export | Plain text report is returned |
| APP-006 | UI responsiveness | Open UI on desktop and mobile widths | Layout remains usable |
| APP-007 | Scenario generation | Analyze a page with login/search signals | Authentication or injection scenarios are generated |
| APP-008 | No OpenAI key fallback | Run without OpenAI API key | Deterministic report is generated |
| APP-009 | Passive scanner option | Enable scanner enrichment | Scanner status appears in findings |
| APP-010 | Report tabs | Switch between report tabs | Correct content is displayed |

## Sample Generated Security Scenarios

| ID | Scenario | OWASP Area | Priority |
|---|---|---|---|
| SEC-001 | Verify public pages do not disclose implementation details | Security Misconfiguration | Medium |
| SEC-002 | Verify security headers are defined | Security Misconfiguration | High |
| SEC-003 | Verify invalid login does not reveal account existence | Authentication Failures | High |
| SEC-004 | Verify text inputs safely handle script-like content | Injection | High |
| SEC-005 | Verify direct route access does not bypass authorization | Broken Access Control | Critical |

