import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function TipCalculator() {
  const { addRecent } = useRecentCalculators();
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("18");
  const [people, setPeople] = useState("1");

  const billAmt = parseFloat(bill) || 0;
  const tip = billAmt * (parseFloat(tipPct) || 0) / 100;
  const total = billAmt + tip;
  const perPerson = total / (parseInt(people) || 1);

  return (
    <CalculatorShell title="Tip Calculator" description="Calculate tip and split the bill" onVisit={() => addRecent("tip")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Bill Amount ($)</span>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="85.00" className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Tip Percentage (%)</span>
          <div className="flex gap-2 mt-1">
            {["15", "18", "20", "25"].map(p => (
              <button key={p} onClick={() => setTipPct(p)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tipPct === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{p}%</button>
            ))}
            <input type="number" value={tipPct} onChange={e => setTipPct(e.target.value)} className="calc-input w-20" />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Split Between</span>
          <input type="number" value={people} onChange={e => setPeople(e.target.value)} min="1" className="calc-input w-full mt-1" />
        </label>
      </div>
      {billAmt > 0 && (
        <div className="space-y-2 mt-4">
          <ResultDisplay label="Tip Amount" value={`$${tip.toFixed(2)}`} />
          <ResultDisplay label="Total" value={`$${total.toFixed(2)}`} />
          {parseInt(people) > 1 && <ResultDisplay label="Per Person" value={`$${perPerson.toFixed(2)}`} />}
        </div>
      )}
    </CalculatorShell>
  );
}
