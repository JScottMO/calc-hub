import { useState, useEffect, useMemo, useCallback } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";
import { ArrowDownUp, RefreshCw, AlertCircle } from "lucide-react";
import { ResultDisplay } from "@/components/CalculatorShell";

const CACHE_KEY = "calc-rsvp-currency-rates";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedRates {
  rates: Record<string, number>;
  timestamp: number;
  base: string;
}

const popularCurrencies = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "MXN",
  "BRL", "KRW", "SGD", "HKD", "NOK", "SEK", "DKK", "NZD", "ZAR", "RUB",
  "TRY", "PLN", "THB", "IDR", "MYR", "PHP", "CZK", "ILS", "CLP", "ARS",
  "TWD", "SAR", "AED", "EGP", "NGN", "PKR", "BDT", "VND", "COP", "PEN",
];

const currencyNames: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen",
  CAD: "Canadian Dollar", AUD: "Australian Dollar", CHF: "Swiss Franc",
  CNY: "Chinese Yuan", INR: "Indian Rupee", MXN: "Mexican Peso",
  BRL: "Brazilian Real", KRW: "South Korean Won", SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar", NOK: "Norwegian Krone", SEK: "Swedish Krona",
  DKK: "Danish Krone", NZD: "New Zealand Dollar", ZAR: "South African Rand",
  RUB: "Russian Ruble", TRY: "Turkish Lira", PLN: "Polish Zloty",
  THB: "Thai Baht", IDR: "Indonesian Rupiah", MYR: "Malaysian Ringgit",
  PHP: "Philippine Peso", CZK: "Czech Koruna", ILS: "Israeli Shekel",
  CLP: "Chilean Peso", ARS: "Argentine Peso", TWD: "Taiwan Dollar",
  SAR: "Saudi Riyal", AED: "UAE Dirham", EGP: "Egyptian Pound",
  NGN: "Nigerian Naira", PKR: "Pakistani Rupee", BDT: "Bangladeshi Taka",
  VND: "Vietnamese Dong", COP: "Colombian Peso", PEN: "Peruvian Sol",
};

function getCachedRates(): CachedRates | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data: CachedRates = JSON.parse(cached);
    if (Date.now() - data.timestamp < CACHE_DURATION) return data;
    return null;
  } catch {
    return null;
  }
}

function setCachedRates(rates: Record<string, number>) {
  const data: CachedRates = { rates, timestamp: Date.now(), base: "USD" };
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

export default function CurrencyConverter() {
  const { addRecent } = useRecentCalculators();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [value, setValue] = useState("1");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRates = useCallback(async (force = false) => {
    if (!force) {
      const cached = getCachedRates();
      if (cached) {
        setRates(cached.rates);
        setLastUpdated(new Date(cached.timestamp));
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      if (data.result !== "success") throw new Error("API error");
      setRates(data.rates);
      setCachedRates(data.rates);
      setLastUpdated(new Date());
    } catch {
      // Fall back to cache even if expired
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const data: CachedRates = JSON.parse(cached);
          setRates(data.rates);
          setLastUpdated(new Date(data.timestamp));
          setError("Using cached rates (couldn't fetch live rates)");
        } else {
          setError("Couldn't fetch exchange rates. Please try again.");
        }
      } catch {
        setError("Couldn't fetch exchange rates. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRates(); }, [fetchRates]);

  const availableCurrencies = useMemo(() => {
    if (!rates) return popularCurrencies;
    return popularCurrencies.filter(c => c in rates);
  }, [rates]);

  const result = useMemo(() => {
    if (!rates) return null;
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    const fromRate = rates[from];
    const toRate = rates[to];
    if (!fromRate || !toRate) return null;
    const inUsd = v / fromRate;
    const converted = inUsd * toRate;
    return converted;
  }, [value, from, to, rates]);

  const rateDisplay = useMemo(() => {
    if (!rates) return null;
    const fromRate = rates[from];
    const toRate = rates[to];
    if (!fromRate || !toRate) return null;
    return (toRate / fromRate).toFixed(6);
  }, [from, to, rates]);

  const swap = () => { setFrom(to); setTo(from); };

  const formatResult = (n: number) => {
    if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (n >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
    return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <CalculatorShell title="Currency Converter" description="Live exchange rates with 24-hour caching" onVisit={() => addRecent("currency")}>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Fetching exchange rates…</span>
        </div>
      ) : (
        <div className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-md px-3 py-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <label className="block">
            <span className="text-sm font-medium text-foreground">Amount</span>
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="calc-input w-full mt-1 text-lg"
              min="0"
              step="any"
            />
          </label>

          <div className="flex items-center gap-2">
            <select value={from} onChange={e => setFrom(e.target.value)} className="calc-input flex-1">
              {availableCurrencies.map(c => (
                <option key={c} value={c}>{c} — {currencyNames[c] || c}</option>
              ))}
            </select>
            <button onClick={swap} className="p-2 rounded-lg bg-muted hover:bg-muted/70 transition-colors shrink-0">
              <ArrowDownUp className="h-4 w-4 text-foreground" />
            </button>
            <select value={to} onChange={e => setTo(e.target.value)} className="calc-input flex-1">
              {availableCurrencies.map(c => (
                <option key={c} value={c}>{c} — {currencyNames[c] || c}</option>
              ))}
            </select>
          </div>

          {result !== null && (
            <>
              <ResultDisplay label={`${value} ${from} =`} value={`${formatResult(result)} ${to}`} />
              {rateDisplay && (
                <p className="text-xs text-muted-foreground text-center">
                  1 {from} = {rateDisplay} {to}
                </p>
              )}
            </>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>
              {lastUpdated ? `Rates from ${lastUpdated.toLocaleString()}` : ""}
            </span>
            <button
              onClick={() => fetchRates(true)}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          </div>
        </div>
      )}
    </CalculatorShell>
  );
}
