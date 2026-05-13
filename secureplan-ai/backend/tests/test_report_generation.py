from app.agents.owasp_mapping_agent import OwaspMappingAgent
from app.agents.scenario_generation_agent import ScenarioGenerationAgent
from app.models.analysis_models import CrawlSummary, PageSummary


def test_scenario_generation_returns_security_cases():
    crawl = CrawlSummary(
        target_url="https://example.com",
        detected_flows=["Authentication", "Search"],
        pages=[
            PageSummary(
                url="https://example.com/login",
                title="Login",
                security_observations=["Authentication input detected; evaluate credential handling."],
            )
        ],
    )
    mappings = OwaspMappingAgent().map(crawl)
    scenarios = ScenarioGenerationAgent().generate(crawl, mappings)
    assert len(scenarios) >= 5
    assert any("Authentication" in scenario.category for scenario in scenarios)

