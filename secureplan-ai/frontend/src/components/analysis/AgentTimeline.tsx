import { CheckCircle2, Cpu } from "lucide-react";
import { Card } from "../ui/Card";

export function AgentTimeline({ items }: { items: string[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[#d7e6e8] bg-[#f6fffb]/70 px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[-0.01em] text-[#263442]">
          <Cpu size={17} />
          Agent Timeline
        </div>
      </div>
      <div className="space-y-0 p-5">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="relative flex gap-3 pb-5 last:pb-0">
            {index !== items.length - 1 && <div className="absolute left-3 top-7 h-[calc(100%-28px)] w-px bg-[#d7e6e8]" />}
            <div className="relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#17b890] text-white shadow-[0_0_0_4px_rgba(23,184,144,0.12)]">
              <CheckCircle2 size={15} />
            </div>
            <div>
              <div className="text-sm font-bold tracking-[-0.01em] text-[#263442]">{item}</div>
              <div className="text-xs font-semibold text-[#6f8795]">Stage {index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
