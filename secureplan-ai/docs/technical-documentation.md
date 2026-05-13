# SecurePlan AI Technical Documentation

## System Overview

SecurePlan AI is a full-stack agentic application that generates security test plans and test scenarios for a web application from a landing URL. It combines UI exploration, OWASP risk mapping, optional passive scanner enrichment, and OpenAI-based report synthesis.

## Architecture

```text
React Frontend
  -> FastAPI REST API
  -> Job Orchestrator
  -> UI Exploration Service
  -> OWASP Mapping Agent
  -> Scenario Generation Agent
  -> Optional ZAP Scanner Agent
  -> OpenAI Report Synthesis
  -> Report Export Service
```

## Tech Stack And Reasoning

- React + Vite: fast development, modern component model, strong UI ecosystem.
- Tailwind CSS: consistent styling and responsive design without heavy CSS files.
- FastAPI: async-friendly Python API framework with automatic OpenAPI docs.
- Pydantic: strict request and response schema validation.
- HTTPX + BeautifulSoup: reliable initial crawler implementation that can run in constrained environments.
- OpenAI API: generates professional narrative, scenario wording, and structured report content.
- OWASP ZAP: planned open-source passive scanner integration for security header and browser-facing findings.
- python-pptx: generates a professional PowerPoint deck from project content.

## Backend Structure

```text
backend/app/api
REST endpoints for analysis, reports, and exports.

backend/app/agents
Focused agent modules for mapping, scenario generation, and report construction.

backend/app/services
External or workflow services such as exploration, OpenAI, ZAP, and job orchestration.

backend/app/models
Pydantic schemas for requests, crawl summaries, scenarios, mappings, and reports.

backend/app/knowledge_base
Local OWASP and ecommerce security reference data.
```

## API Workflow

### POST /api/analyze

Accepts:

```json
{
  "url": "https://example.com",
  "max_pages": 8,
  "scan_mode": "passive",
  "include_zap": false
}
```

Returns:

- Timeline of agent actions.
- Crawl summary.
- Complete security report.
- Markdown and text exports embedded in response.

### GET /api/reports

Returns in-memory report history for the current backend process.

### GET /api/exports/{report_id}/markdown

Returns Markdown export.

### GET /api/exports/{report_id}/json

Returns JSON export.

### GET /api/exports/{report_id}/text

Returns text export.

## Agent Design

### Exploration Agent

Discovers visible pages, headings, forms, inputs, links, buttons, and flow signals. The current implementation uses HTTP parsing and is intentionally wrapped behind `PlaywrightService` so it can be upgraded to full browser automation.

### OWASP Mapping Agent

Maps discovered evidence to OWASP-style risk categories such as access control, injection, authentication, misconfiguration, sensitive data, and business logic.

### Scenario Generation Agent

Creates deterministic baseline security scenarios from the mapped risks. This ensures the system remains useful even without an OpenAI API key.

### OpenAI Report Synthesis

When configured, OpenAI receives structured app evidence and generates a more polished JSON report. The system still validates the final shape through Pydantic models.

### Report Agent

Builds final Markdown, text, and JSON artifacts. This keeps export formatting separate from analysis logic.

## Security Design Decisions

- Default mode is non-destructive security planning.
- Active exploitation is not performed.
- Scanner enrichment is optional and clearly marked.
- Users are reminded to test only approved targets.
- URL input is validated by Pydantic.
- Report generation is evidence-driven to reduce generic AI output.

## Scalability Path

- Replace in-memory report store with PostgreSQL.
- Add Redis + background worker for long-running scans.
- Add WebSocket progress streaming.
- Upgrade exploration service to full Playwright browser automation.
- Add OWASP ZAP passive alerts through API integration.
- Add tenant, user, role, and audit log support.

