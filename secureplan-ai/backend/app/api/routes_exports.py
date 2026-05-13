from fastapi import APIRouter, HTTPException, Response

from app.services.job_service import REPORT_STORE

router = APIRouter(tags=["exports"])


@router.get("/exports/{report_id}/markdown")
def export_markdown(report_id: str) -> Response:
    report = REPORT_STORE.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return Response(report.report.markdown, media_type="text/markdown")


@router.get("/exports/{report_id}/text")
def export_text(report_id: str) -> Response:
    report = REPORT_STORE.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return Response(report.report.text, media_type="text/plain")


@router.get("/exports/{report_id}/json")
def export_json(report_id: str):
    report = REPORT_STORE.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report.report

