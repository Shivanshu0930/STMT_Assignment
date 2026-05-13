# SecurePlan AI

SecurePlan AI is an agentic security test planning platform that converts a web application landing URL into an OWASP-aligned security test plan and structured security test scenarios.

## What It Does

- Accepts a landing URL for a web application.
- Discovers visible pages, forms, links, inputs, buttons, and user flows.
- Maps discovered UI evidence to OWASP security testing categories.
- Uses OpenAI, when configured, to generate a polished security test plan.
- Exports reports as Markdown, text, and JSON.
- Includes technical documentation, non-technical documentation, and a PowerPoint deck.

## Quick Start

```powershell
cd secureplan-ai
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
cd frontend
npm install
cd ..
```

Copy `.env.example` to `.env` and add your OpenAI API key.

```powershell
.\scripts\start_backend.ps1
.\scripts\start_frontend.ps1
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000/docs`

## Safety

Only analyze websites you own or have explicit permission to test. The default implementation generates non-destructive security planning artifacts and does not perform active exploitation.

