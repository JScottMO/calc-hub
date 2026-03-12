import { useState, useCallback } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

export default function StandardCalculator() {
  const { addRecent } = useRecentCalculators();
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (n: string) => {
    if (resetNext) {
      setDisplay(n);
      setResetNext(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
  };

  const handleOp = (newOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op && !resetNext) {
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
      setHistory(h => [`${prev} ${op} ${current} = ${result}`, ...h].slice(0, 20));
    } else {
      setPrev(current);
    }
    setOp(newOp);
    setResetNext(true);
  };

  const handleEquals = () => {
    if (prev === null || !op) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, op);
    setHistory(h => [`${prev} ${op} ${current} = ${result}`, ...h].slice(0, 20));
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setResetNext(false);
  };

  const handleDecimal = () => {
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) setDisplay(display.slice(0, -1));
    else setDisplay("0");
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const btnBase = "flex items-center justify-center rounded-lg text-lg font-medium h-14 transition-colors";

  return (
    <CalculatorShell title="Standard Calculator" description="Basic arithmetic with history" onVisit={() => addRecent("standard")}>
      <div className="font-mono text-right text-3xl font-bold mb-1 p-3 bg-muted rounded-lg overflow-x-auto text-foreground">
        {display}
      </div>
      {op && prev !== null && (
        <div className="text-right text-sm text-muted-foreground mb-3">{prev} {op}</div>
      )}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <button onClick={handleClear} className={`${btnBase} bg-secondary text-secondary-foreground hover:bg-secondary/80`}>AC</button>
        <button onClick={handleSign} className={`${btnBase} bg-secondary text-secondary-foreground hover:bg-secondary/80`}>±</button>
        <button onClick={handlePercent} className={`${btnBase} bg-secondary text-secondary-foreground hover:bg-secondary/80`}>%</button>
        <button onClick={() => handleOp("÷")} className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`}>÷</button>

        {["7","8","9"].map(n => <button key={n} onClick={() => handleNumber(n)} className={`${btnBase} bg-muted hover:bg-muted/70 text-foreground`}>{n}</button>)}
        <button onClick={() => handleOp("×")} className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`}>×</button>

        {["4","5","6"].map(n => <button key={n} onClick={() => handleNumber(n)} className={`${btnBase} bg-muted hover:bg-muted/70 text-foreground`}>{n}</button>)}
        <button onClick={() => handleOp("−")} className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`}>−</button>

        {["1","2","3"].map(n => <button key={n} onClick={() => handleNumber(n)} className={`${btnBase} bg-muted hover:bg-muted/70 text-foreground`}>{n}</button>)}
        <button onClick={() => handleOp("+")} className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`}>+</button>

        <button onClick={() => handleNumber("0")} className={`${btnBase} col-span-2 bg-muted hover:bg-muted/70 text-foreground`}>0</button>
        <button onClick={handleDecimal} className={`${btnBase} bg-muted hover:bg-muted/70 text-foreground`}>.</button>
        <button onClick={handleEquals} className={`${btnBase} bg-primary text-primary-foreground hover:bg-primary/90`}>=</button>
      </div>

      {history.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">History</span>
            <button onClick={() => setHistory([])} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Clear</button>
          </div>
          <div className="space-y-1 max-h-40 overflow-auto">
            {history.map((h, i) => (
              <div key={i} className="text-sm text-muted-foreground font-mono">{h}</div>
            ))}
          </div>
        </div>
      )}
    </CalculatorShell>
  );
}

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b !== 0 ? a / b : NaN;
    default: return b;
  }
}
