import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function PercentageCalculator() {
  const { addRecent } = useRecentCalculators();
  const [mode, setMode] = useState<"of" | "is" | "change">("of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const result = (() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return null;
    switch (mode) {
      case "of": return { label: `${x}% of ${y}`, value: ((x / 100) * y).toFixed(4).replace(/\.?0+$/, "") };
      case "is": return { label: `${x} is what % of ${y}`, value: y !== 0 ? ((x / y) * 100).toFixed(2) + "%" : "N/A" };
      case "change": return { label: `% change from ${x} to ${y}`, value: x !== 0 ? (((y - x) / x) * 100).toFixed(2) + "%" : "N/A" };
    }
  })();

  const modes = [
    { id: "of" as const, label: "X% of Y" },
    { id: "is" as const, label: "X is what % of Y" },
    { id: "change" as const, label: "% Change" },
  ];

  const labels = { of: ["Percentage", "Number"], is: ["Value", "Total"], change: ["From", "To"] };

  return (
    <CalculatorShell title="Percentage Calculator" description="Percentage of, is what percent, and percent change" onVisit={() => addRecent("percentage")}>
      <div className="flex gap-2 mb-4 flex-wrap">
        {modes.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{m.label}</button>
        ))}
      </div>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">{labels[mode][0]}</span>
          <input type="number" value={a} onChange={e => setA(e.target.value)} className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">{labels[mode][1]}</span>
          <input type="number" value={b} onChange={e => setB(e.target.value)} className="calc-input w-full mt-1" />
        </label>
      </div>
      {result && <ResultDisplay label={result.label} value={result.value} />}
    </CalculatorShell>
  );
}
