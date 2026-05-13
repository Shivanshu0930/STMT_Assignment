from fastapi import APIRouter

from app.models.analysis_models import AnalysisRequest
from app.models.report_models import AnalysisResponse
from app.services.job_service import JobService

router = APIRouter(tags=["analysis"])


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest) -> AnalysisResponse:
    return await JobService().run_analysis(request)

