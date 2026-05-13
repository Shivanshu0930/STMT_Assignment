import { motion } from "framer-motion";
import { useState } from "react";
import { analyzeUrl } from "../lib/api";
import { mockReport } from "../data/mockReport";
import type { AnalysisResponse } from "../lib/types";
import { AgentTimeline } from "../components/analysis/AgentTimeline";
import { DiscoverySummary } from "../components/analysis/DiscoverySummary";
import { UrlInputPanel } from "../components/analysis/UrlInputPanel";
import { ReportDashboard } from "../components/reports/ReportDashboard";
import { Badge } from "../components/ui/Badge";
import { CircleDot, LockKeyhole, RadioTower, WandSparkles } from "lucide-react";

export function AnalysisWorkspace() {
  const [url, setUrl] = useState("https://example.com");
  const [maxPages, setMaxPages] = useState(8);
  const [includeZap, setIncludeZap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResponse>(mockReport);

  async function runAnalysis() {
    setLoading(true);
    setError("");
    try {
      const response = await analyzeUrl({ url, max_pages: maxPages, scan_mode: "passive", include_zap: includeZap });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="workspace-grid min-h-screen">
      <div className="mx-auto max-w-[1680px] px-4 py-6 md:px-8">
      <header className="fresh-panel mb-5 overflow-hidden rounded-[28px] p-5 backdrop-blur">
        <div className="grid gap-5 xl:grid-cols-[1fr_380px] xl:items-end">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone="good">Live Workspace</Badge>
              <Badge>OWASP aligned</Badge>
              <Badge>OpenAI ready</Badge>
            </div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0c8b6d]">
              <WandSparkles size={16} />
              AI Security Studio
            </div>
            <h1 className="font-display max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#263442] md:text-6xl">
              Plan security tests from a URL, without the old-school checklist chaos.
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold tracking-[-0.01em] text-[#52697a]">
              <span className="inline-flex items-center gap-2"><CircleDot size={14} className="text-[#17b890]" /> Evidence-first generation</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole size={14} className="text-[#7c8cf8]" /> Authorized testing only</span>
            </div>
          </div>
          <div className="grid gap-3 rounded-[24px] border border-white/70 bg-white/70 p-4 shadow-[0_18px_46px_rgba(56,83,88,0.1)]">
            <div className="flex items-center justify-between rounded-2xl bg-[#e8fff7] px-4 py-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c8b6d]"><RadioTower size={16} /> Passive Planning Mode</span>
              <span className="size-2.5 animate-premium-pulse rounded-full bg-[#17b890]" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-[#fff8de] p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#a66b00]">Output</div>
                <div className="mt-1 font-semibold text-[#52697a]">MD / JSON / TXT</div>
              </div>
              <div className="rounded-2xl bg-[#f0edff] p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#6f5bd8]">Agent</div>
                <div className="mt-1 font-semibold text-[#52697a]">OWASP mapped</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-5">
          <UrlInputPanel
            url={url}
            setUrl={setUrl}
            maxPages={maxPages}
            setMaxPages={setMaxPages}
            includeZap={includeZap}
            setIncludeZap={setIncludeZap}
            loading={loading}
            onAnalyze={runAnalysis}
          />
          {error && <div className="rounded-md border border-rose/20 bg-rose/10 px-4 py-3 text-sm font-medium text-rose">{error}</div>}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <DiscoverySummary result={result} />
          </motion.div>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <AgentTimeline items={result.timeline} />
            <div className="premium-panel rounded-3xl p-5">
              <h2 className="text-sm font-semibold tracking-[-0.01em] text-[#263442]">Detected Flows</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.crawl_summary.detected_flows.map((flow) => (
                  <Badge key={flow} tone="good">{flow}</Badge>
                ))}
              </div>
            </div>
          </div>
          <ReportDashboard result={result} />
      </div>
      </div>
    </div>
  );
}
