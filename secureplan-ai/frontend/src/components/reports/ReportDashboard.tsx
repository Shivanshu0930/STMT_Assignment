import { Download, FileJson, FileText, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { exportUrl } from "../../lib/api";
import type { AnalysisResponse } from "../../lib/types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ScenarioTable } from "./ScenarioTable";

const tabs = ["Plan", "Scenarios", "OWASP Mapping", "Scanner", "Markdown"] as const;

export function ReportDashboard({ result }: { result: AnalysisResponse }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Plan");
  const report = result.report;

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#d7e6e8] bg-[#f6fffb]/75 px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8fff7] text-[#0c8b6d] shadow-[0_14px_28px_rgba(23,184,144,0.14)]">
              <ShieldAlert size={19} />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f8795]">Generated Security Report</div>
              <h2 className="font-display mt-1 break-all text-xl font-semibold tracking-[-0.035em] text-[#263442]">{report.target_url}</h2>
              <div className="mt-1 text-xs font-semibold text-[#6f8795]">Report ID: {report.report_id}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={exportUrl(report.report_id, "markdown")} target="_blank" rel="noreferrer">
              <Button variant="secondary" icon={<FileText size={16} />}>Markdown</Button>
            </a>
            <a href={exportUrl(report.report_id, "json")} target="_blank" rel="noreferrer">
              <Button variant="secondary" icon={<FileJson size={16} />}>JSON</Button>
            </a>
            <a href={exportUrl(report.report_id, "text")} target="_blank" rel="noreferrer">
              <Button variant="secondary" icon={<Download size={16} />}>Text</Button>
            </a>
          </div>
        </div>
        <div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-[#d7e6e8] bg-white/80 p-1 scrollbar-thin">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`h-9 shrink-0 rounded-xl px-3 text-sm font-semibold transition ${
                tab === item ? "bg-[#e8fff7] text-[#0c8b6d] shadow-sm" : "text-[#52697a] hover:bg-[#f3f8f5]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5">
        {tab === "Plan" && (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[#263442]">Executive Summary</h3>
              <p className="mt-2 rounded-2xl border border-[#d7e6e8] bg-white/82 p-4 leading-7 text-[#52697a] shadow-sm">{report.executive_summary}</p>
              <h3 className="mt-6 text-base font-semibold tracking-[-0.02em] text-[#263442]">Test Strategy</h3>
              <div className="mt-3 grid gap-2">
                {report.test_strategy.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#d7e6e8] bg-[#f6fffb] px-3 py-2 text-sm font-bold text-[#52697a] shadow-sm">{item}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[#263442]">Scope</h3>
              <div className="mt-3 space-y-2">
                {report.scope.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#d7e6e8] bg-white/82 px-3 py-2 text-sm font-bold text-[#52697a]">{item}</div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "Scenarios" && <ScenarioTable scenarios={report.scenarios} />}
        {tab === "OWASP Mapping" && (
          <div className="grid gap-3">
            {report.owasp_mapping.map((item) => (
              <div key={item.category} className="rounded-2xl border border-[#d7e6e8] bg-white/82 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(56,83,88,0.1)]">
                <div className="font-semibold tracking-[-0.02em] text-[#263442]">{item.category}</div>
                <div className="mt-1 text-sm leading-6 text-[#52697a]">{item.coverage_reason}</div>
              </div>
            ))}
          </div>
        )}
        {tab === "Scanner" && (
          <div className="grid gap-3">
            {report.scanner_findings.length === 0 && <div className="rounded-2xl border border-[#d7e6e8] bg-white/82 p-4 text-sm font-bold text-[#52697a]">Scanner enrichment was not requested for this run.</div>}
            {report.scanner_findings.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#d7e6e8] bg-white/82 p-4">
                <div className="font-semibold text-[#263442]">{item.severity} - {item.title}</div>
                <div className="mt-1 text-sm leading-6 text-[#52697a]">{item.recommendation}</div>
              </div>
            ))}
          </div>
        )}
        {tab === "Markdown" && (
          <pre className="max-h-[520px] overflow-auto rounded-2xl border border-[#bcd8e4] bg-[#edf9ff] p-4 text-xs leading-6 text-[#31556a] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] scrollbar-thin">{report.markdown}</pre>
        )}
      </div>
    </Card>
  );
}
