import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function DiscountCalculator() {
  const { addRecent } = useRecentCalculators();
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const savings = p * d / 100;
  const finalPrice = p - savings;

  return (
    <CalculatorShell title="Discount Calculator" description="Original price, % off → final price" onVisit={() => addRecent("discount")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Original Price ($)</span>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="99.99" className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Discount (%)</span>
          <div className="flex gap-2 mt-1">
            {["10", "20", "25", "50"].map(d => (
              <button key={d} onClick={() => setDiscount(d)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${discount === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{d}%</button>
            ))}
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="calc-input w-20" />
          </div>
        </label>
      </div>
      {p > 0 && d > 0 && (
        <div className="space-y-2 mt-4">
          <ResultDisplay label="You Save" value={`$${savings.toFixed(2)}`} />
          <ResultDisplay label="Final Price" value={`$${finalPrice.toFixed(2)}`} />
        </div>
      )}
    </CalculatorShell>
  );
}
