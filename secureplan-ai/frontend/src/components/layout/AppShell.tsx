import type { ReactNode } from "react";
import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fbf6]">
      <TopNav />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
