from fastapi import APIRouter, HTTPException

from app.services.job_service import REPORT_STORE

router = APIRouter(tags=["reports"])


@router.get("/reports")
def list_reports() -> list[dict]:
    return [
        {
            "report_id": item.report.report_id,
            "target_url": item.report.target_url,
            "scenario_count": len(item.report.scenarios),
            "status": item.status,
        }
        for item in REPORT_STORE.values()
    ]


@router.get("/reports/{report_id}")
def get_report(report_id: str):
    report = REPORT_STORE.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

