import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function CompoundInterestCalculator() {
  const { addRecent } = useRecentCalculators();
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("12");

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const t = parseFloat(years) || 0;
  const n = parseInt(freq) || 1;

  const total = p * Math.pow(1 + r / n, n * t);
  const interest = total - p;

  const freqOptions = [
    { value: "1", label: "Annually" },
    { value: "4", label: "Quarterly" },
    { value: "12", label: "Monthly" },
    { value: "365", label: "Daily" },
  ];

  return (
    <CalculatorShell title="Compound Interest Calculator" description="See how your money grows over time" onVisit={() => addRecent("compound-interest")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Principal ($)</span>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Annual Rate (%)</span>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Years</span>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Compounding</span>
          <div className="flex gap-2 mt-1 flex-wrap">
            {freqOptions.map(f => (
              <button key={f.value} onClick={() => setFreq(f.value)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${freq === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{f.label}</button>
            ))}
          </div>
        </label>
      </div>
      {p > 0 && (
        <div className="space-y-2 mt-4">
          <ResultDisplay label="Total Value" value={`$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          <ResultDisplay label="Total Interest" value={`$${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
          {/* Simple bar visualization */}
          <div className="mt-4 space-y-2">
            <div className="text-xs text-muted-foreground font-medium">Breakdown</div>
            <div className="h-6 rounded-full overflow-hidden flex bg-muted">
              <div className="bg-primary/60 h-full" style={{ width: `${(p / total) * 100}%` }} title="Principal" />
              <div className="bg-primary h-full" style={{ width: `${(interest / total) * 100}%` }} title="Interest" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Principal: {((p / total) * 100).toFixed(0)}%</span>
              <span>Interest: {((interest / total) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      )}
    </CalculatorShell>
  );
}
