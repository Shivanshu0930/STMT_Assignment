import type { AnalysisResponse } from "../../lib/types";
import { FileCheck2, GitBranch, Layers3, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function DiscoverySummary({ result }: { result: AnalysisResponse }) {
  const metrics: Array<{ label: string; value: number; icon: LucideIcon }> = [
    { label: "Pages Analyzed", value: result.crawl_summary.pages.length, icon: Layers3 },
    { label: "Flows Detected", value: result.crawl_summary.detected_flows.length, icon: GitBranch },
    { label: "Scenarios", value: result.report.scenarios.length, icon: FileCheck2 },
    { label: "OWASP Areas", value: result.report.owasp_mapping.length, icon: ShieldCheck }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, icon: Icon }) => (
        <section key={label} className="premium-panel group rounded-[24px] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(56,83,88,0.13)]">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f8795]">{label}</div>
            <div className="flex size-9 items-center justify-center rounded-2xl border border-[#d7e6e8] bg-white text-[#52697a] transition group-hover:text-[#17b890]">
              <Icon size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <div className="font-display text-4xl font-semibold tracking-[-0.055em] text-[#263442]">{value}</div>
            <div className="mb-1.5 h-2 w-16 overflow-hidden rounded-full bg-[#e3eef0]">
              <div className="h-full w-2/3 rounded-full bg-[#17b890]" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
