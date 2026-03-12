import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { categories, calculators, searchCalculators, type CalculatorInfo } from "@/data/calculators";
import { useRecentCalculators } from "@/hooks/useRecentCalculators";

export default function Home() {
  const [query, setQuery] = useState("");
  const { recent } = useRecentCalculators();
  const results = useMemo(() => searchCalculators(query), [query]);

  const recentCalcs = useMemo(
    () => recent.map(id => calculators.find(c => c.id === id)).filter(Boolean) as CalculatorInfo[],
    [recent]
  );

  const popular = useMemo(
    () => calculators.filter(c => c.implemented).slice(0, 8),
    []
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          calc<span className="text-primary">.rsvp</span>
        </h1>
        <p className="text-muted-foreground text-lg">Free calculators & converters. No ads. No tracking. Runs on your device.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Find a calculator or converter..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full calc-input pl-11 pr-4 py-3 text-base rounded-xl border-2 focus:border-primary"
          autoFocus
        />
        {query && results.length > 0 && (
          <div className="absolute z-10 top-full mt-1 w-full bg-card border rounded-xl shadow-lg max-h-72 overflow-auto">
            {results.map(calc => (
              <Link
                key={calc.id}
                to={calc.implemented ? calc.path : "#"}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors ${!calc.implemented ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <calc.icon className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <div className="font-medium text-sm">{calc.name}</div>
                  <div className="text-xs text-muted-foreground">{calc.description}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {query && results.length === 0 && (
          <div className="absolute z-10 top-full mt-1 w-full bg-card border rounded-xl shadow-lg p-4 text-center text-muted-foreground text-sm">
            No calculators found for "{query}"
          </div>
        )}
      </div>

      {/* Recently Used */}
      {recentCalcs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recently Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentCalcs.map(calc => (
              <ToolCard key={calc.id} calc={calc} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="bg-card border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
            >
              <cat.icon className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm">{cat.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{cat.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popular.map(calc => (
            <ToolCard key={calc.id} calc={calc} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ToolCard({ calc }: { calc: CalculatorInfo }) {
  return (
    <Link
      to={calc.path}
      className="bg-card border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group flex items-start gap-3"
    >
      <calc.icon className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
      <div className="min-w-0">
        <div className="font-medium text-sm truncate">{calc.name}</div>
        <div className="text-xs text-muted-foreground">{calc.description}</div>
      </div>
    </Link>
  );
}
