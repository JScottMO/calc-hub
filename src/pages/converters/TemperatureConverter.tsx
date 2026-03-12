import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { ArrowDownUp } from "lucide-react";

type TempUnit = "C" | "F" | "K" | "R";

const unitNames: Record<TempUnit, string> = { C: "Celsius", F: "Fahrenheit", K: "Kelvin", R: "Rankine" };

function convert(val: number, from: TempUnit, to: TempUnit): number {
  // Convert to Celsius first
  let c: number;
  switch (from) {
    case "C": c = val; break;
    case "F": c = (val - 32) * 5 / 9; break;
    case "K": c = val - 273.15; break;
    case "R": c = (val - 491.67) * 5 / 9; break;
  }
  // Convert from Celsius
  switch (to) {
    case "C": return c;
    case "F": return c * 9 / 5 + 32;
    case "K": return c + 273.15;
    case "R": return c * 9 / 5 + 491.67;
  }
}

export default function TemperatureConverter() {
  const { addRecent } = useRecentCalculators();
  const [from, setFrom] = useState<TempUnit>("F");
  const [to, setTo] = useState<TempUnit>("C");
  const [value, setValue] = useState("72");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return "";
    return convert(v, from, to).toFixed(2).replace(/\.?0+$/, "");
  }, [value, from, to]);

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <CalculatorShell title="Temperature Converter" description="Convert between temperature scales" onVisit={() => addRecent("temperature")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Value</span>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} className="calc-input w-full mt-1 text-lg" />
        </label>
        <div className="flex items-center gap-2">
          <select value={from} onChange={e => setFrom(e.target.value as TempUnit)} className="calc-input flex-1">
            {(Object.keys(unitNames) as TempUnit[]).map(k => <option key={k} value={k}>{unitNames[k]}</option>)}
          </select>
          <button onClick={swap} className="p-2 rounded-lg bg-muted hover:bg-muted/70 transition-colors shrink-0">
            <ArrowDownUp className="h-4 w-4 text-foreground" />
          </button>
          <select value={to} onChange={e => setTo(e.target.value as TempUnit)} className="calc-input flex-1">
            {(Object.keys(unitNames) as TempUnit[]).map(k => <option key={k} value={k}>{unitNames[k]}</option>)}
          </select>
        </div>
      </div>
      {result && (
        <div className="calc-result mt-4 text-center">
          <span className="text-2xl font-bold">{result}</span>
          <span className="text-sm ml-2 opacity-70">°{to === "K" ? "K" : to}</span>
        </div>
      )}
    </CalculatorShell>
  );
}
