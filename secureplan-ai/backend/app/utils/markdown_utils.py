from app.models.report_models import SecurityReport


def report_to_markdown(report: SecurityReport | dict) -> str:
    data = report.model_dump() if hasattr(report, "model_dump") else report
    lines: list[str] = [
        f"# Security Test Plan: {data['target_url']}",
        "",
        "## Executive Summary",
        data["executive_summary"],
        "",
        "## Scope",
    ]
    lines.extend(f"- {item}" for item in data["scope"])
    lines.extend(["", "## Assumptions"])
    lines.extend(f"- {item}" for item in data["assumptions"])
    lines.extend(["", "## Test Strategy"])
    lines.extend(f"- {item}" for item in data["test_strategy"])
    lines.extend(["", "## OWASP Mapping"])
    for item in data["owasp_mapping"]:
        lines.append(f"- **{item['category']}**: {item['coverage_reason']}")
    lines.extend(["", "## Security Test Scenarios"])
    for scenario in data["scenarios"]:
        lines.extend(
            [
                f"### {scenario['id']} - {scenario['title']}",
                f"- Category: {scenario['category']}",
                f"- Priority: {scenario['priority']}",
                f"- Evidence: {scenario['evidence']}",
                f"- Preconditions: {scenario['preconditions']}",
                "- Steps:",
            ]
        )
        lines.extend(f"  {idx}. {step}" for idx, step in enumerate(scenario["steps"], start=1))
        lines.extend(
            [
                f"- Expected Result: {scenario['expected_result']}",
                f"- Test Data: {', '.join(scenario['test_data'])}",
                "",
            ]
        )
    if data["scanner_findings"]:
        lines.append("## Scanner Findings")
        for finding in data["scanner_findings"]:
            lines.append(f"- **{finding['severity']} - {finding['title']}**: {finding['recommendation']}")
    return "\n".join(lines).strip() + "\n"

