import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { ArrowDownUp } from "lucide-react";

const units: Record<string, { name: string; toMeters: number }> = {
  mm: { name: "Millimeters", toMeters: 0.001 },
  cm: { name: "Centimeters", toMeters: 0.01 },
  m: { name: "Meters", toMeters: 1 },
  km: { name: "Kilometers", toMeters: 1000 },
  in: { name: "Inches", toMeters: 0.0254 },
  ft: { name: "Feet", toMeters: 0.3048 },
  yd: { name: "Yards", toMeters: 0.9144 },
  mi: { name: "Miles", toMeters: 1609.344 },
  nm: { name: "Nautical Miles", toMeters: 1852 },
};

export default function LengthConverter() {
  const { addRecent } = useRecentCalculators();
  const [from, setFrom] = useState("ft");
  const [to, setTo] = useState("m");
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    const meters = v * units[from].toMeters;
    const converted = meters / units[to].toMeters;
    return converted.toLocaleString(undefined, { maximumFractionDigits: 8 });
  }, [value, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <CalculatorShell title="Length Converter" description="Convert between length and distance units" onVisit={() => addRecent("length")}>
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
