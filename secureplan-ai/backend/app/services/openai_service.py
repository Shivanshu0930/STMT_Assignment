import json

from openai import OpenAI

from app.config import settings
from app.models.analysis_models import CrawlSummary


class OpenAIService:
    def __init__(self) -> None:
        self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None

    async def generate_report_json(self, crawl_summary: CrawlSummary, scanner_findings: list[dict]) -> dict | None:
        if not self.client:
            return None

        prompt = self._build_prompt(crawl_summary, scanner_findings)
        response = self.client.responses.create(
            model=settings.openai_model,
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are a senior application security test architect. "
                        "Generate safe, non-destructive security test planning artifacts only. "
                        "Return valid JSON matching the requested shape."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            text={"format": {"type": "json_object"}},
        )
        return json.loads(response.output_text)

    def _build_prompt(self, crawl_summary: CrawlSummary, scanner_findings: list[dict]) -> str:
        return f"""
Generate a security test planning JSON document from this observed application evidence.

Required JSON shape:
{{
  "executive_summary": "string",
  "scope": ["string"],
  "assumptions": ["string"],
  "test_strategy": ["string"],
  "scenarios": [
    {{
      "id": "SEC-001",
      "title": "string",
      "category": "OWASP category name",
      "priority": "Critical|High|Medium|Low",
      "evidence": "string",
      "preconditions": "string",
      "steps": ["string"],
      "expected_result": "string",
      "test_data": ["string"]
    }}
  ],
  "owasp_mapping": [
    {{
      "category": "string",
      "coverage_reason": "string",
      "related_evidence": ["string"]
    }}
  ]
}}

Rules:
- Use only safe validation steps. Do not include exploit chaining or destructive payloads.
- Make scenarios specific to the observed UI evidence.
- Include at least 10 high-quality scenarios when enough evidence exists.
- Cover authentication, access control, input validation, configuration, session, sensitive data, logging, and business logic where relevant.

Crawl summary:
{crawl_summary.model_dump_json(indent=2)}

Scanner findings:
{json.dumps(scanner_findings, indent=2)}
"""

