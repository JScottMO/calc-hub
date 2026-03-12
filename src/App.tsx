import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Calculators
const StandardCalculator = lazy(() => import("./pages/calculators/StandardCalculator"));
const BMICalculator = lazy(() => import("./pages/calculators/BMICalculator"));
const TipCalculator = lazy(() => import("./pages/calculators/TipCalculator"));
const PercentageCalculator = lazy(() => import("./pages/calculators/PercentageCalculator"));
const CompoundInterestCalculator = lazy(() => import("./pages/calculators/CompoundInterestCalculator"));
const MortgageCalculator = lazy(() => import("./pages/calculators/MortgageCalculator"));
const DiscountCalculator = lazy(() => import("./pages/calculators/DiscountCalculator"));
const TDEECalculator = lazy(() => import("./pages/calculators/TDEECalculator"));
const PasswordGenerator = lazy(() => import("./pages/calculators/PasswordGenerator"));

// Converters
const LengthConverter = lazy(() => import("./pages/converters/LengthConverter"));
const TemperatureConverter = lazy(() => import("./pages/converters/TemperatureConverter"));
const WeightConverter = lazy(() => import("./pages/converters/WeightConverter"));
const CurrencyConverter = lazy(() => import("./pages/converters/CurrencyConverter"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center h-40">
    <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Finance */}
              <Route path="/calculator/standard" element={<StandardCalculator />} />
              <Route path="/calculator/percentage" element={<PercentageCalculator />} />
              <Route path="/calculator/tip" element={<TipCalculator />} />
              <Route path="/calculator/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
              <Route path="/calculator/discount" element={<DiscountCalculator />} />

              {/* Health */}
              <Route path="/calculator/bmi" element={<BMICalculator />} />
              <Route path="/calculator/tdee" element={<TDEECalculator />} />

              {/* Converters */}
              <Route path="/converter/length" element={<LengthConverter />} />
              <Route path="/converter/temperature" element={<TemperatureConverter />} />
              <Route path="/converter/weight" element={<WeightConverter />} />
              <Route path="/converter/currency" element={<CurrencyConverter />} />

              {/* Fun */}
              <Route path="/calculator/password-generator" element={<PasswordGenerator />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
