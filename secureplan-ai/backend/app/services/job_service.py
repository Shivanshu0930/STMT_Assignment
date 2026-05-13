from app.agents.owasp_mapping_agent import OwaspMappingAgent
from app.agents.report_agent import ReportAgent
from app.agents.scenario_generation_agent import ScenarioGenerationAgent
from app.models.analysis_models import AnalysisRequest
from app.models.report_models import AnalysisResponse
from app.services.openai_service import OpenAIService
from app.services.playwright_service import PlaywrightService
from app.services.zap_service import ZapService


REPORT_STORE: dict[str, AnalysisResponse] = {}


class JobService:
    def __init__(self) -> None:
        self.explorer = PlaywrightService()
        self.mapper = OwaspMappingAgent()
        self.generator = ScenarioGenerationAgent()
        self.zap = ZapService()
        self.openai = OpenAIService()
        self.reporter = ReportAgent()

    async def run_analysis(self, request: AnalysisRequest) -> AnalysisResponse:
        timeline = [
            "Scope validated",
            "Landing URL queued for exploration",
        ]
        crawl_summary = await self.explorer.crawl(str(request.url), request.max_pages)
        timeline.append(f"Exploration completed across {len(crawl_summary.pages)} page(s)")

        mappings = self.mapper.map(crawl_summary)
        timeline.append(f"Mapped {len(mappings)} OWASP risk area(s)")

        scanner_findings = await self.zap.passive_scan(str(request.url)) if request.include_zap else []
        if request.include_zap:
            timeline.append("Passive scanner enrichment completed")

        scenarios = self.generator.generate(crawl_summary, mappings)
        timeline.append(f"Generated {len(scenarios)} baseline security scenario(s)")

        try:
            ai_report = await self.openai.generate_report_json(crawl_summary, scanner_findings)
            timeline.append("OpenAI report synthesis completed" if ai_report else "Deterministic report synthesis completed")
        except Exception:
            ai_report = None
            timeline.append("OpenAI synthesis unavailable; deterministic report synthesis completed")

        report = self.reporter.build(str(request.url), crawl_summary, ai_report, scenarios, mappings, scanner_findings)
        response = AnalysisResponse(
            status="completed",
            timeline=timeline,
            crawl_summary=crawl_summary.model_dump(),
            report=report,
        )
        REPORT_STORE[report.report_id] = response
        return response
