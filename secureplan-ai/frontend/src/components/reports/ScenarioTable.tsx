import type { Scenario } from "../../lib/types";
import { Badge } from "../ui/Badge";

function tone(priority: string) {
  if (priority === "Critical") return "danger";
  if (priority === "High") return "warn";
  return "neutral";
}

export function ScenarioTable({ scenarios }: { scenarios: Scenario[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d7e6e8] shadow-sm">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[980px] border-collapse bg-white/82 text-sm">
          <thead className="bg-[#e8fff7] text-left text-[11px] uppercase tracking-[0.14em] text-[#0c8b6d]">
            <tr>
              <th className="px-4 py-3 font-bold">ID</th>
              <th className="px-4 py-3 font-bold">Scenario</th>
              <th className="px-4 py-3 font-bold">OWASP</th>
              <th className="px-4 py-3 font-bold">Priority</th>
              <th className="px-4 py-3 font-bold">Expected Result</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <tr key={scenario.id} className="border-t border-[#d7e6e8] align-top transition duration-200 hover:bg-[#f6fffb]">
                <td className="px-4 py-4 font-mono text-xs font-semibold text-[#6f8795]">{scenario.id}</td>
                <td className="px-4 py-4">
                  <div className="font-semibold tracking-[-0.01em] text-[#263442]">{scenario.title}</div>
                  <div className="mt-1 max-w-md text-xs leading-5 text-[#6f8795]">{scenario.evidence}</div>
                </td>
                <td className="px-4 py-4 font-bold text-[#52697a]">{scenario.category}</td>
                <td className="px-4 py-4">
                  <Badge tone={tone(scenario.priority)}>{scenario.priority}</Badge>
                </td>
                <td className="px-4 py-4 leading-6 text-[#52697a]">{scenario.expected_result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
