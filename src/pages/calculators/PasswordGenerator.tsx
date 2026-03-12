import { useState, useCallback } from "react";
import { CalculatorShell, ResultDisplay } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator() {
  const { addRecent } = useRecentCalculators();
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;

    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      const arr = new Uint32Array(length);
      crypto.getRandomValues(arr);
      results.push(Array.from(arr, v => chars[v % chars.length]).join(""));
    }
    setPasswords(results);
  }, [length, upper, lower, numbers, symbols, count]);

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${checked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
    >{label}</button>
  );

  return (
    <CalculatorShell title="Password Generator" description="Generate secure random passwords" onVisit={() => addRecent("password-generator")}>
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Length: {length}</span>
          <input type="range" min={4} max={128} value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full mt-1 accent-[hsl(var(--primary))]" />
        </label>
        <div>
          <span className="text-sm font-medium text-foreground block mb-1">Characters</span>
          <div className="flex gap-2 flex-wrap">
            <Toggle label="A-Z" checked={upper} onChange={setUpper} />
            <Toggle label="a-z" checked={lower} onChange={setLower} />
            <Toggle label="0-9" checked={numbers} onChange={setNumbers} />
            <Toggle label="!@#$" checked={symbols} onChange={setSymbols} />
          </div>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Count</span>
          <input type="number" value={count} min={1} max={20} onChange={e => setCount(parseInt(e.target.value) || 1)} className="calc-input w-24 mt-1" />
        </label>
        <Button onClick={generate} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" /> Generate
        </Button>
      </div>
      {passwords.length > 0 && (
        <div className="mt-4 space-y-2">
          {passwords.map((pw, i) => (
            <PasswordRow key={i} password={pw} />
          ))}
        </div>
      )}
    </CalculatorShell>
  );
}

function PasswordRow({ password }: { password: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="calc-result flex items-center justify-between gap-2">
      <code className="text-sm break-all flex-1 font-mono">{password}</code>
      <button onClick={copy} className="shrink-0 p-1 hover:bg-primary/10 rounded transition-colors">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
