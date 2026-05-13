import { Activity, Globe2, Loader2, Play, Radar, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

type Props = {
  url: string;
  setUrl: (value: string) => void;
  maxPages: number;
  setMaxPages: (value: number) => void;
  includeZap: boolean;
  setIncludeZap: (value: boolean) => void;
  loading: boolean;
  onAnalyze: () => void;
};

export function UrlInputPanel({ url, setUrl, maxPages, setMaxPages, includeZap, setIncludeZap, loading, onAnalyze }: Props) {
  return (
    <section className="premium-panel overflow-hidden rounded-[28px]">
      <div className="grid gap-5 p-5 xl:grid-cols-[260px_1fr] xl:items-center">
        <div className="rounded-[24px] border border-[#d7e6e8] bg-white/70 p-4">
          <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-[#e8fff7] text-[#0c8b6d]">
            <ShieldCheck size={22} />
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f8795]">Launchpad</div>
          <h2 className="font-display mt-1 text-2xl font-semibold leading-none tracking-[-0.04em] text-[#263442]">Drop target. Get plan.</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-[#e8fff7] px-3 py-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#0c8b6d]"><Radar size={12} /> Map</div>
              <div className="mt-1 text-xs font-semibold text-[#52697a]">OWASP</div>
            </div>
            <div className="rounded-2xl bg-[#fff0e8] px-3 py-2">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#c95d3a]"><Activity size={12} /> Mode</div>
              <div className="mt-1 text-xs font-semibold text-[#52697a]">Passive</div>
            </div>
          </div>
        </div>
        <div>
      <div className="grid gap-3 lg:grid-cols-[1fr_150px_150px]">
        <label className="relative block">
          <Globe2 className="absolute left-4 top-4 text-[#6f8795]" size={18} />
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            className="h-14 w-full rounded-2xl border border-[#d7e6e8] bg-white/90 pl-12 pr-4 text-sm font-bold tracking-[-0.01em] text-[#263442] outline-none transition placeholder:text-[#8ea0aa] focus:border-[#17b890] focus:ring-4 focus:ring-[#17b890]/12"
          />
        </label>
        <select
          value={maxPages}
          onChange={(event) => setMaxPages(Number(event.target.value))}
          className="h-14 rounded-2xl border border-[#d7e6e8] bg-white/90 px-3 text-sm font-bold text-[#263442] outline-none transition focus:border-[#17b890] focus:ring-4 focus:ring-[#17b890]/12"
        >
          <option value={5}>5 pages</option>
          <option value={8}>8 pages</option>
          <option value={12}>12 pages</option>
          <option value={20}>20 pages</option>
        </select>
        <Button className="h-14 rounded-2xl" onClick={onAnalyze} disabled={loading || !url} icon={loading ? <Loader2 className="animate-spin" size={17} /> : <Play size={17} />}>
          {loading ? "Running" : "Generate"}
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <label className="inline-flex items-center gap-2 rounded-full border border-[#d7e6e8] bg-white/80 px-3 py-2 text-sm font-bold tracking-[-0.01em] text-[#52697a] transition hover:border-[#8fb9c2]">
          <input checked={includeZap} onChange={(event) => setIncludeZap(event.target.checked)} type="checkbox" className="size-4 accent-teal" />
          Include passive scanner enrichment
        </label>
        <span className="text-xs font-bold text-[#6f8795]">Use only with authorized targets.</span>
      </div>
      </div>
      </div>
    </section>
  );
}
