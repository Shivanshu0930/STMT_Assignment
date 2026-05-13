import { BookOpen, FileStack, KeyRound, Radar, Settings, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";

const items = [
  { label: "Analysis", icon: Radar, active: true },
  { label: "Reports", icon: FileStack },
  { label: "Knowledge", icon: BookOpen },
  { label: "Controls", icon: SlidersHorizontal },
  { label: "API Keys", icon: KeyRound },
  { label: "Settings", icon: Settings }
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d7e6e8]/80 bg-[#f8fbf6]/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] items-center gap-4 px-4 py-3 md:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#17b890] text-white shadow-[0_16px_38px_rgba(23,184,144,0.26)]">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-display text-lg font-semibold tracking-[-0.03em] text-[#263442]">SecurePlan AI</div>
              <span className="rounded-full border border-[#bce9dd] bg-[#e8fff7] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0c8b6d]">Beta</span>
            </div>
            <div className="text-xs font-semibold text-[#6f8795]">Security Planning OS</div>
          </div>
        </div>
        <nav className="flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-2xl border border-[#d7e6e8] bg-white/75 p-1 shadow-[0_12px_34px_rgba(56,83,88,0.08)] scrollbar-thin">
          {items.map((item) => (
            <button
              key={item.label}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-semibold tracking-[-0.01em] transition duration-200 ${
                item.active
                  ? "bg-[#e8fff7] text-[#0c8b6d] shadow-sm"
                  : "text-[#6f8795] hover:bg-[#f3f8f5] hover:text-[#263442]"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 rounded-2xl border border-[#d7e6e8] bg-white/75 px-3 py-2 shadow-[0_12px_34px_rgba(56,83,88,0.08)] lg:flex">
          <Sparkles size={16} className="text-[#ff7a59]" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f8795]">Run Mode</div>
            <div className="text-sm font-semibold text-[#263442]">Passive Evidence</div>
          </div>
        </div>
      </div>
    </header>
  );
}
