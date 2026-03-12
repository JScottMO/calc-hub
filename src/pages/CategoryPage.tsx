import { useParams, Link } from "react-router-dom";
import { categories, getCalculatorsByCategory, type CategoryId } from "@/data/calculators";
import { useEffect } from "react";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const calcs = id ? getCalculatorsByCategory(id as CategoryId) : [];

  useEffect(() => {
    if (category) document.title = `${category.name} — calc.rsvp`;
  }, [category]);

  if (!category) {
    return <div className="p-8 text-center text-muted-foreground">Category not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <category.icon className="h-7 w-7 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground text-sm">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {calcs.map(calc => (
          <Link
            key={calc.id}
            to={calc.implemented ? calc.path : "#"}
            className={`bg-card border rounded-lg p-4 transition-all flex items-start gap-3 ${calc.implemented ? "hover:border-primary hover:shadow-sm" : "opacity-50 cursor-not-allowed"}`}
          >
            <calc.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-sm">{calc.name}</div>
              <div className="text-xs text-muted-foreground">{calc.description}</div>
              {!calc.implemented && <div className="text-xs text-muted-foreground mt-1 italic">Coming soon</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
