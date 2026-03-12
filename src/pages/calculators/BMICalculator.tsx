import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { useSearchParams } from "react-router-dom";

export default function BMICalculator() {
  const { addRecent } = useRecentCalculators();
  const [params, setParams] = useSearchParams();
  const [unit, setUnit] = useState(params.get("unit") || "imperial");
  const [weight, setWeight] = useState(params.get("weight") || "");
  const [height, setHeight] = useState(params.get("height") || "");

  const bmi = (() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || h <= 0) return null;
    if (unit === "imperial") return (w / (h * h)) * 703;
    return w / ((h / 100) * (h / 100));
  })();

  const category = bmi === null ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
  const catColor = bmi === null ? "" : bmi < 18.5 ? "text-blue-500" : bmi < 25 ? "text-green-500" : bmi < 30 ? "text-yellow-500" : "text-red-500";

  return (
    <CalculatorShell title="BMI Calculator" description="Calculate your Body Mass Index" onVisit={() => addRecent("bmi")}>
      <div className="flex gap-2 mb-4">
        {["imperial", "metric"].map(u => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === u ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {u === "imperial" ? "Imperial (lb/in)" : "Metric (kg/cm)"}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Weight ({unit === "imperial" ? "lbs" : "kg"})</span>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={unit === "imperial" ? "180" : "82"} className="calc-input w-full mt-1" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Height ({unit === "imperial" ? "inches" : "cm"})</span>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder={unit === "imperial" ? "70" : "178"} className="calc-input w-full mt-1" />
        </label>
      </div>
      {bmi !== null && (
        <>
          <ResultDisplay label="Your BMI" value={bmi.toFixed(1)} />
          <div className={`mt-2 text-center font-semibold ${catColor}`}>{category}</div>
          <div className="mt-4 grid grid-cols-4 gap-1 text-xs text-center">
            {[
              { label: "Underweight", range: "< 18.5", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
              { label: "Normal", range: "18.5–24.9", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
              { label: "Overweight", range: "25–29.9", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
              { label: "Obese", range: "30+", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
            ].map(c => (
              <div key={c.label} className={`rounded-md p-2 ${c.color}`}>
                <div className="font-medium">{c.label}</div>
                <div className="opacity-75">{c.range}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </CalculatorShell>
  );
}
