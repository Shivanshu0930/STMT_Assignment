export function Badge({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "good" | "warn" | "danger" }) {
  const tones = {
    neutral: "border-[#d7e6e8] bg-white/80 text-[#52697a]",
    good: "border-[#17b890]/25 bg-[#17b890]/10 text-[#0c8b6d]",
    warn: "border-[#ffb703]/25 bg-[#ffb703]/12 text-[#9a6100]",
    danger: "border-rose/20 bg-rose/10 text-rose"
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tones[tone]}`}>{children}</span>;
}
