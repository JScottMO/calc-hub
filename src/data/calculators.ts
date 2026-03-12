import {
  DollarSign, Calculator, Percent, TrendingUp, CreditCard, Car, PiggyBank, BarChart3,
  Receipt, ShoppingCart, Tag, Coins, LineChart, Wallet, Scale, Clock,
  Hash, Divide, BarChart, Binary, Triangle, Circle, Ruler, Dice1, Sigma, Star,
  Activity, Heart, Apple, Baby, Droplets, Footprints, Moon, Timer,
  ArrowLeftRight, Thermometer, Gauge, Zap, Weight, Move, Maximize, Database,
  Calendar, CalendarDays, CalendarClock, Hourglass, Globe,
  Lightbulb, Cpu, Atom, FlaskConical, Radio, Battery,
  Home, PaintBucket, Hammer, Box, Fence, HardHat,
  Dices, Coins as CoinIcon, Key, Palette, FileText, Type, GraduationCap, Fuel, Maximize2
} from "lucide-react";

export type CategoryId = "finance" | "math" | "health" | "conversion" | "datetime" | "science" | "construction" | "fun";

export interface CalculatorInfo {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  path: string;
  keywords: string[];
  icon: any;
  implemented: boolean;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: any;
  description: string;
}

export const categories: CategoryInfo[] = [
  { id: "finance", name: "Finance", icon: DollarSign, description: "Loans, interest, taxes & money tools" },
  { id: "math", name: "Math", icon: Calculator, description: "Arithmetic, algebra, geometry & statistics" },
  { id: "health", name: "Health & Fitness", icon: Heart, description: "BMI, calories, body metrics & more" },
  { id: "conversion", name: "Unit Conversion", icon: ArrowLeftRight, description: "Length, weight, temperature & 20+ unit types" },
  { id: "datetime", name: "Date & Time", icon: Calendar, description: "Date math, timezones & countdowns" },
  { id: "science", name: "Science", icon: Atom, description: "Physics, chemistry & electronics" },
  { id: "construction", name: "Construction", icon: HardHat, description: "Paint, flooring, concrete & building" },
  { id: "fun", name: "Fun & Misc", icon: Dices, description: "Generators, converters & random tools" },
];

export const calculators: CalculatorInfo[] = [
  // Finance
  { id: "standard", name: "Standard Calculator", description: "Full arithmetic with history log", category: "finance", path: "/calculator/standard", keywords: ["basic", "arithmetic", "add", "subtract", "multiply", "divide"], icon: Calculator, implemented: true },
  { id: "percentage", name: "Percentage Calculator", description: "X% of Y, percentage change, and more", category: "finance", path: "/calculator/percentage", keywords: ["percent", "ratio", "change"], icon: Percent, implemented: true },
  { id: "tip", name: "Tip Calculator", description: "Calculate tip and split the bill", category: "finance", path: "/calculator/tip", keywords: ["tip", "gratuity", "bill", "split", "restaurant"], icon: Receipt, implemented: true },
  { id: "compound-interest", name: "Compound Interest Calculator", description: "Principal, rate, time → total with chart", category: "finance", path: "/calculator/compound-interest", keywords: ["interest", "investment", "savings", "compound"], icon: TrendingUp, implemented: true },
  { id: "mortgage", name: "Mortgage Calculator", description: "Monthly payments and amortization schedule", category: "finance", path: "/calculator/mortgage", keywords: ["loan", "mortgage", "payment", "house", "home"], icon: CreditCard, implemented: true },
  { id: "discount", name: "Discount Calculator", description: "Original price, % off → final price", category: "finance", path: "/calculator/discount", keywords: ["sale", "discount", "price", "savings", "off"], icon: Tag, implemented: true },
  { id: "sales-tax", name: "Sales Tax Calculator", description: "Calculate sales tax on a purchase", category: "finance", path: "/calculator/sales-tax", keywords: ["tax", "sales", "purchase"], icon: ShoppingCart, implemented: false },
  { id: "currency", name: "Currency Converter", description: "Live exchange rates", category: "finance", path: "/converter/currency", keywords: ["currency", "exchange", "forex", "money"], icon: Coins, implemented: true },

  // Math
  { id: "scientific", name: "Scientific Calculator", description: "Trig, logs, exponents, and more", category: "math", path: "/calculator/scientific", keywords: ["scientific", "trig", "sin", "cos", "log", "exponent"], icon: Calculator, implemented: false },
  { id: "fraction", name: "Fraction Calculator", description: "Add, subtract, multiply, divide fractions", category: "math", path: "/calculator/fraction", keywords: ["fraction", "numerator", "denominator"], icon: Divide, implemented: false },
  { id: "average", name: "Average Calculator", description: "Mean, median, mode of a number set", category: "math", path: "/calculator/average", keywords: ["average", "mean", "median", "mode"], icon: BarChart, implemented: false },
  { id: "quadratic", name: "Quadratic Solver", description: "Solve ax² + bx + c = 0", category: "math", path: "/calculator/quadratic", keywords: ["quadratic", "equation", "roots", "formula"], icon: Sigma, implemented: false },
  { id: "number-base", name: "Number Base Converter", description: "Binary, octal, decimal, hex", category: "math", path: "/converter/number-base", keywords: ["binary", "hex", "octal", "decimal", "base"], icon: Binary, implemented: false },
  { id: "random-number", name: "Random Number Generator", description: "Generate random numbers in a range", category: "math", path: "/calculator/random-number", keywords: ["random", "generate", "number"], icon: Dice1, implemented: false },

  // Health
  { id: "bmi", name: "BMI Calculator", description: "Body Mass Index with category ranges", category: "health", path: "/calculator/bmi", keywords: ["bmi", "body", "mass", "index", "weight", "height", "obesity"], icon: Activity, implemented: true },
  { id: "tdee", name: "TDEE Calculator", description: "Total Daily Energy Expenditure", category: "health", path: "/calculator/tdee", keywords: ["tdee", "calories", "energy", "metabolic", "bmr"], icon: Apple, implemented: true },
  { id: "body-fat", name: "Body Fat Calculator", description: "Navy Method body fat estimation", category: "health", path: "/calculator/body-fat", keywords: ["body", "fat", "percentage", "navy"], icon: Activity, implemented: false },
  { id: "age", name: "Age Calculator", description: "Exact age in years, months, days", category: "health", path: "/calculator/age", keywords: ["age", "birthday", "born"], icon: Calendar, implemented: false },
  { id: "sleep", name: "Sleep Cycle Calculator", description: "Optimal wake times based on 90-min cycles", category: "health", path: "/calculator/sleep", keywords: ["sleep", "cycle", "wake", "bedtime"], icon: Moon, implemented: false },
  { id: "pace", name: "Pace Calculator", description: "Running/walking pace from distance & time", category: "health", path: "/calculator/pace", keywords: ["pace", "running", "walking", "speed", "distance"], icon: Timer, implemented: false },

  // Conversion
  { id: "length", name: "Length Converter", description: "Meters, feet, inches, miles & more", category: "conversion", path: "/converter/length", keywords: ["length", "distance", "meters", "feet", "inches", "miles", "km"], icon: Ruler, implemented: true },
  { id: "temperature", name: "Temperature Converter", description: "Celsius, Fahrenheit, Kelvin & more", category: "conversion", path: "/converter/temperature", keywords: ["temperature", "celsius", "fahrenheit", "kelvin"], icon: Thermometer, implemented: true },
  { id: "weight", name: "Weight Converter", description: "Kilograms, pounds, ounces & more", category: "conversion", path: "/converter/weight", keywords: ["weight", "mass", "kg", "pounds", "ounces", "grams"], icon: Weight, implemented: true },
  { id: "volume", name: "Volume Converter", description: "Liters, gallons, cups & more", category: "conversion", path: "/converter/volume", keywords: ["volume", "liters", "gallons", "cups", "ml"], icon: FlaskConical, implemented: false },
  { id: "speed", name: "Speed Converter", description: "km/h, mph, m/s, knots & more", category: "conversion", path: "/converter/speed", keywords: ["speed", "velocity", "kmh", "mph"], icon: Gauge, implemented: false },
  { id: "area", name: "Area Converter", description: "Square meters, acres, hectares & more", category: "conversion", path: "/converter/area", keywords: ["area", "square", "acres", "hectares"], icon: Maximize, implemented: false },
  { id: "data", name: "Data Storage Converter", description: "Bytes, KB, MB, GB, TB & more", category: "conversion", path: "/converter/data", keywords: ["data", "storage", "bytes", "megabytes", "gigabytes"], icon: Database, implemented: false },

  // Date & Time
  { id: "date-difference", name: "Date Difference Calculator", description: "Days, weeks, months between dates", category: "datetime", path: "/calculator/date-difference", keywords: ["date", "difference", "between", "days"], icon: CalendarDays, implemented: false },
  { id: "add-days", name: "Add/Subtract Days", description: "Date + N days = ?", category: "datetime", path: "/calculator/add-days", keywords: ["add", "subtract", "days", "date"], icon: CalendarClock, implemented: false },
  { id: "countdown", name: "Countdown Timer", description: "Time remaining until any date", category: "datetime", path: "/calculator/countdown", keywords: ["countdown", "timer", "remaining"], icon: Hourglass, implemented: false },
  { id: "timezone", name: "Time Zone Converter", description: "Convert times between zones", category: "datetime", path: "/converter/timezone", keywords: ["timezone", "time", "zone", "convert"], icon: Globe, implemented: false },

  // Science
  { id: "ohms-law", name: "Ohm's Law Calculator", description: "Voltage, current, resistance, power", category: "science", path: "/calculator/ohms-law", keywords: ["ohm", "voltage", "current", "resistance", "power"], icon: Zap, implemented: false },
  { id: "density", name: "Density Calculator", description: "Mass, volume, density relationships", category: "science", path: "/calculator/density", keywords: ["density", "mass", "volume"], icon: Box, implemented: false },

  // Construction
  { id: "paint", name: "Paint Calculator", description: "Room dimensions → gallons of paint", category: "construction", path: "/calculator/paint", keywords: ["paint", "room", "wall", "gallons"], icon: PaintBucket, implemented: false },
  { id: "concrete", name: "Concrete Calculator", description: "Volume → bags or cubic yards", category: "construction", path: "/calculator/concrete", keywords: ["concrete", "slab", "volume", "bags"], icon: Hammer, implemented: false },

  // Fun
  { id: "password-generator", name: "Password Generator", description: "Secure random passwords", category: "fun", path: "/calculator/password-generator", keywords: ["password", "generate", "secure", "random"], icon: Key, implemented: true },
  { id: "color-converter", name: "Color Converter", description: "HEX ↔ RGB ↔ HSL", category: "fun", path: "/converter/color", keywords: ["color", "hex", "rgb", "hsl", "convert"], icon: Palette, implemented: false },
  { id: "word-counter", name: "Word Counter", description: "Count words, characters, sentences", category: "fun", path: "/calculator/word-counter", keywords: ["word", "character", "count", "text"], icon: FileText, implemented: false },
  { id: "dice-roller", name: "Dice Roller", description: "Roll any number of dice with any sides", category: "fun", path: "/calculator/dice-roller", keywords: ["dice", "roll", "random", "d20", "d6"], icon: Dices, implemented: false },
  { id: "gpa", name: "GPA Calculator", description: "Course grades → GPA on 4.0 scale", category: "fun", path: "/calculator/gpa", keywords: ["gpa", "grade", "college", "school"], icon: GraduationCap, implemented: false },
];

export function searchCalculators(query: string): CalculatorInfo[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return calculators.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.keywords.some(k => k.includes(q))
  );
}

export function getCalculatorsByCategory(categoryId: CategoryId): CalculatorInfo[] {
  return calculators.filter(c => c.category === categoryId);
}

export function getCalculatorById(id: string): CalculatorInfo | undefined {
  return calculators.find(c => c.id === id);
}
