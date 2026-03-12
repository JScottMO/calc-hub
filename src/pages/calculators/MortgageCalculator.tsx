import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function MortgageCalculator() {
  const { addRecent } = useRecentCalculators();
  const [loanAmt, setLoanAmt] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [termYears, setTermYears] = useState("30");

  const p = parseFloat(loanAmt) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseInt(termYears) || 0) * 12;

  const monthly = r > 0 && n > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n || 0;
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - p;

  return (
    <CalculatorShell title="Mortgage Calculator" description="Monthly payments and total cost" onVisit={() => addRecent("mortgage")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Loan Amount ($)</span>
          <input type="number" value={loanAmt} onChange={e => setLoanAmt(e.target.value)} className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Interest Rate (%)</span>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.1" className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Loan Term (years)</span>
          <div className="flex gap-2 mt-1">
            {["15", "20", "30"].map(t => (
              <button key={t} onClick={() => setTermYears(t)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${termYears === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{t} yr</button>
            ))}
            <input type="number" value={termYears} onChange={e => setTermYears(e.target.value)} className="calc-input w-20" />
          </div>
        </label>
      </div>
      {p > 0 && n > 0 && (
        <div className="space-y-2 mt-4">
          <ResultDisplay label="Monthly Payment" value={`$${monthly.toFixed(2)}`} />
          <ResultDisplay label="Total Paid" value={`$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <ResultDisplay label="Total Interest" value={`$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        </div>
      )}
    </CalculatorShell>
  );
}
