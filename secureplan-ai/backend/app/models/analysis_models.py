from enum import Enum

from pydantic import BaseModel, Field, HttpUrl


class ScanMode(str, Enum):
    passive = "passive"
    standard = "standard"
    demo = "demo"


class AnalysisRequest(BaseModel):
    url: HttpUrl
    max_pages: int = Field(default=8, ge=1, le=25)
    scan_mode: ScanMode = ScanMode.passive
    include_zap: bool = False


class PageElement(BaseModel):
    label: str
    kind: str
    selector_hint: str | None = None


class FormField(BaseModel):
    name: str
    field_type: str
    required: bool = False
    placeholder: str | None = None


class FormSummary(BaseModel):
    action: str | None = None
    method: str = "GET"
    fields: list[FormField] = []


class PageSummary(BaseModel):
    url: str
    title: str | None = None
    headings: list[str] = []
    links: list[str] = []
    buttons: list[str] = []
    inputs: list[FormField] = []
    forms: list[FormSummary] = []
    security_observations: list[str] = []


class CrawlSummary(BaseModel):
    target_url: str
    pages: list[PageSummary]
    detected_flows: list[str]
    technologies: list[str] = []

