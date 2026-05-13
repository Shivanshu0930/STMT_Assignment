# Design Document

## Design Goal

SecurePlan AI is designed as an enterprise-grade agentic security planning platform. It focuses on producing high-quality, explainable security test artifacts from real UI evidence.

## High-Level Design

```text
User
  -> React Dashboard
  -> FastAPI Backend
  -> Job Service
  -> Exploration Agent
  -> OWASP Mapping Agent
  -> Scenario Generation Agent
  -> OpenAI Synthesis
  -> Report Agent
  -> Exports
```

## Frontend Design

The frontend uses a professional SaaS dashboard layout:

- Sidebar navigation.
- Analysis workspace.
- URL input panel.
- Agent timeline.
- Discovery metrics.
- Report tabs.
- Scenario table.
- Export buttons.

The design avoids a generic landing page and opens directly into the usable product experience.

## Backend Design

The backend uses FastAPI with separate modules for API routes, services, agents, models, and utilities.

The job service coordinates the complete analysis workflow:

1. Validate request.
2. Explore target URL.
3. Map observations to OWASP categories.
4. Generate baseline scenarios.
5. Enrich with OpenAI if configured.
6. Build final report.
7. Store report in memory for export.

## Data Model

Core models:

- `AnalysisRequest`
- `CrawlSummary`
- `PageSummary`
- `Scenario`
- `OwaspMapping`
- `ScannerFinding`
- `SecurityReport`

## Prompt Strategy

The OpenAI prompt receives structured crawl evidence, not raw unbounded HTML. This improves reliability and reduces hallucinated test cases.

The model is instructed to:

- Generate safe planning artifacts.
- Return valid JSON.
- Use evidence-specific scenarios.
- Avoid destructive exploitation instructions.

## Future Design Enhancements

- Full Playwright browser automation.
- OWASP ZAP passive alert integration.
- Background job queue.
- Persistent database.
- Login and multi-user workspaces.
- PDF export.
- WebSocket live progress.

