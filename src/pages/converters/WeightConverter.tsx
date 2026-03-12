import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { ArrowDownUp } from "lucide-react";

const units: Record<string, { name: string; toKg: number }> = {
  mg: { name: "Milligrams", toKg: 1e-6 },
  g: { name: "Grams", toKg: 0.001 },
  kg: { name: "Kilograms", toKg: 1 },
  t: { name: "Metric Tonnes", toKg: 1000 },
  oz: { name: "Ounces", toKg: 0.0283495 },
  lb: { name: "Pounds", toKg: 0.453592 },
  st: { name: "Stone", toKg: 6.35029 },
  uston: { name: "US Tons", toKg: 907.185 },
};

export default function WeightConverter() {
  const { addRecent } = useRecentCalculators();
  const [from, setFrom] = useState("lb");
  const [to, setTo] = useState("kg");
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const kg = v * units[from].toKg;
    const converted = kg / units[to].toKg;
    return converted.toLocaleString(undefined, { maximumFractionDigits: 8 });
  }, [value, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <CalculatorShell title="Weight Converter" description="Convert between weight and mass units" onVisit={() => addRecent("weight")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Value</span>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} className="calc-input w-full mt-1 text-lg" />
        </label>
        <div className="flex items-center gap-2">
          <select value={from} onChange={e => setFrom(e.target.value)} className="calc-input flex-1">
            {Object.entries(units).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
          <button onClick={swap} className="p-2 rounded-lg bg-muted hover:bg-muted/70 transition-colors shrink-0">
            <ArrowDownUp className="h-4 w-4 text-foreground" />
          </button>
          <select value={to} onChange={e => setTo(e.target.value)} className="calc-input flex-1">
            {Object.entries(units).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
      </div>
      {result && (
        <div className="calc-result mt-4 text-center">
          <span className="text-2xl font-bold">{result}</span>
          <span className="text-sm ml-2 opacity-70">{units[to].name}</span>
        </div>
      )}
    </CalculatorShell>
  );
}
