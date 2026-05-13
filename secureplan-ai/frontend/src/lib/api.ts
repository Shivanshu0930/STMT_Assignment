import type { AnalysisResponse } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8012/api";

export async function analyzeUrl(payload: {
  url: string;
  max_pages: number;
  scan_mode: string;
  include_zap: boolean;
}): Promise<AnalysisResponse> {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Analysis failed");
  }
  return response.json();
}

export function exportUrl(reportId: string, format: "markdown" | "json" | "text") {
  return `${API_BASE}/exports/${reportId}/${format}`;
}
