import { useState } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function TDEECalculator() {
  const { addRecent } = useRecentCalculators();
  const [unit, setUnit] = useState("imperial");
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.55");

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseInt(age) || 0;

  const wKg = unit === "imperial" ? w * 0.453592 : w;
  const hCm = unit === "imperial" ? h * 2.54 : h;

  const bmr = sex === "male"
    ? 10 * wKg + 6.25 * hCm - 5 * a + 5
    : 10 * wKg + 6.25 * hCm - 5 * a - 161;

  const tdee = bmr * parseFloat(activity);
  const valid = w > 0 && h > 0 && a > 0;

  const activityLevels = [
    { value: "1.2", label: "Sedentary" },
    { value: "1.375", label: "Light" },
    { value: "1.55", label: "Moderate" },
    { value: "1.725", label: "Active" },
    { value: "1.9", label: "Very Active" },
  ];

  return (
    <CalculatorShell title="TDEE Calculator" description="Total Daily Energy Expenditure (Mifflin–St Jeor)" onVisit={() => addRecent("tdee")}>
      <div className="flex gap-2 mb-4">
        {["imperial", "metric"].map(u => (
          <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${unit === u ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>
            {u === "imperial" ? "Imperial" : "Metric"}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        {["male", "female"].map(s => (
          <button key={s} onClick={() => setSex(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${sex === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-3">
        <label className="block"><span className="text-sm font-medium text-foreground">Age</span><input type="number" value={age} onChange={e => setAge(e.target.value)} className="calc-input w-full mt-1" /></label>
        <label className="block"><span className="text-sm font-medium text-foreground">Weight ({unit === "imperial" ? "lbs" : "kg"})</span><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="calc-input w-full mt-1" /></label>
        <label className="block"><span className="text-sm font-medium text-foreground">Height ({unit === "imperial" ? "inches" : "cm"})</span><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="calc-input w-full mt-1" /></label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Activity Level</span>
          <div className="flex gap-2 mt-1 flex-wrap">
            {activityLevels.map(l => (
              <button key={l.value} onClick={() => setActivity(l.value)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activity === l.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{l.label}</button>
            ))}
          </div>
        </label>
      </div>
      {valid && (
        <div className="space-y-2 mt-4">
          <ResultDisplay label="BMR" value={`${Math.round(bmr)} cal/day`} />
          <ResultDisplay label="TDEE" value={`${Math.round(tdee)} cal/day`} />
          <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
            <div className="bg-muted rounded-lg p-2"><div className="font-semibold text-foreground">{Math.round(tdee - 500)}</div><div className="text-muted-foreground">Lose 1lb/wk</div></div>
            <div className="bg-accent rounded-lg p-2"><div className="font-semibold text-accent-foreground">{Math.round(tdee)}</div><div className="text-muted-foreground">Maintain</div></div>
            <div className="bg-muted rounded-lg p-2"><div className="font-semibold text-foreground">{Math.round(tdee + 500)}</div><div className="text-muted-foreground">Gain 1lb/wk</div></div>
          </div>
        </div>
      )}
    </CalculatorShell>
  );
}
