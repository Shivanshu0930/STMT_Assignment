# Architecture Document

## Component Diagram

```text
+------------------+       +------------------+       +--------------------+
| React Frontend   | ----> | FastAPI Backend  | ----> | Agent Orchestrator |
+------------------+       +------------------+       +--------------------+
                                                            |
                 +----------------------+-------------------+------------------+
                 |                      |                                      |
        +------------------+   +------------------+                 +------------------+
        | UI Exploration   |   | OWASP Mapping    |                 | Report Builder   |
        +------------------+   +------------------+                 +------------------+
                 |                      |                                      |
        +------------------+   +------------------+                 +------------------+
        | Scanner Enrich   |   | OpenAI Synthesis |                 | Export APIs      |
        +------------------+   +------------------+                 +------------------+
```

## Request Sequence

1. User enters URL.
2. Frontend sends `POST /api/analyze`.
3. Backend validates request.
4. Exploration service crawls allowed pages.
5. Mapping agent maps discovered evidence to OWASP areas.
6. Scenario agent creates baseline scenarios.
7. OpenAI service optionally improves report narrative and structure.
8. Report agent builds final artifacts.
9. Frontend displays the report.
10. User exports Markdown, JSON, or text.

## Deployment View

Local demo:

```text
Browser -> Vite Dev Server -> FastAPI API -> OpenAI API
```

Production path:

```text
CDN -> React Static Build -> API Gateway -> FastAPI App -> Worker Queue -> Database -> OpenAI/ZAP
```

