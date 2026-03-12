import { useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CalculatorShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onVisit?: () => void;
}

export function CalculatorShell({ title, description, children, onVisit }: CalculatorShellProps) {
  useEffect(() => {
    onVisit?.();
    document.title = `${title} — calc.rsvp`;
  }, [title, onVisit]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function ResultDisplay({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="calc-result flex items-center justify-between mt-4">
      <div>
        <div className="text-xs font-normal opacity-70 uppercase tracking-wide">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
      <Button variant="ghost" size="icon" onClick={copy} className="shrink-0">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
