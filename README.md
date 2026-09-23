# Calc Hub

Build a website called calc.rsvp — a clean, fast, privacy-first calculator and unit conversion hub. It is a free alternative to online-calculator.com, calculator.net, and onlineconversion.com. No ads. No tracking. No popups. Users can optionally create an account to save favorite calculators.

🎯 Core Philosophy

Zero ads, zero pop-ups, zero cookie banners, zero third-party tracking scripts

All calculations run entirely client-side — nothing is sent to a server

Optional account for saving favorites — account data stored securely, never sold or shared

Privacy policy in plain English: "We collect only what's needed to run your account (email + password hash). We run no ads. We sell nothing. Your calculations are yours."

Interface should be clean, fast, and distraction-free — content first, no clutter

🏗️ Site Structure & Pages

🏠 Home Page (/)

Large search bar: "Find a calculator or converter..."

Instant client-side search across all tools by name/keyword

Category cards below search: Finance, Math, Health & Fitness, Unit Conversion, Date & Time, Science, Construction, Fun & Misc

"Recently Used" section (stored in localStorage) — shows last 5 tools used, no account needed

"Your Favorites" section if logged in

Featured/popular tools highlighted with cards

📐 CALCULATOR CATEGORIES & TOOLS

💰 Finance

Standard Calculator — full arithmetic with history log

Scientific Calculator — trig, logs, exponents, factorial, π, e

Percentage Calculator — X% of Y, X is what % of Y, % change

Compound Interest Calculator — principal, rate, time, compounding frequency → total + interest breakdown with chart

Simple Interest Calculator

Loan / Mortgage Calculator — loan amount, interest rate, term → monthly payment, total paid, amortization table

Auto Loan Calculator

Savings Goal Calculator — how much to save/month to reach a goal

Investment Return Calculator — ROI, CAGR

Tip Calculator — bill amount, tip %, split by N people

Sales Tax Calculator

Discount Calculator — original price, % off → final price

Currency Converter — fetch live rates via open.er-api.com (free, no key needed for basic use); fallback to cached rates if offline

Inflation Calculator

Net Worth Calculator

Break-Even Calculator

Hourly to Salary Calculator

🔢 Math

Basic / Standard Calculator — large buttons, click or keyboard input, scrollable history

Scientific Calculator — full function set: sin/cos/tan + inverses, log/ln, √, x², xⁿ, factorial, modulo, π, e, parentheses

Fraction Calculator — add, subtract, multiply, divide fractions; simplify; mixed numbers

Percentage Calculator

Average / Mean Calculator — enter a list of numbers

Median & Mode Calculator

Standard Deviation Calculator

Prime Number Checker

GCF / LCM Calculator

Exponent Calculator

Logarithm Calculator

Quadratic Formula Solver — ax² + bx + c = 0 → roots

Triangle Calculator — sides, angles, area (law of sines/cosines)

Circle Calculator — radius → diameter, circumference, area

Pythagorean Theorem Calculator

Random Number Generator — range, count, allow/disallow duplicates

Number Base Converter — binary, octal, decimal, hexadecimal

Roman Numeral Converter

Significant Figures Calculator

🏋️ Health & Fitness

BMI Calculator — metric and imperial; shows underweight/normal/overweight/obese range

BMR Calculator — Basal Metabolic Rate (Mifflin–St Jeor formula)

TDEE Calculator — Total Daily Energy Expenditure with activity level

Calorie Deficit / Surplus Calculator

Ideal Weight Calculator — multiple formulas (Hamwi, Devine, Robinson, Miller)

Body Fat Percentage Calculator — Navy Method (neck, waist, height)

Pregnancy Due Date Calculator — LMP or conception date

Ovulation Calculator

Age Calculator — exact age in years, months, days

Blood Pressure Interpreter — enter systolic/diastolic → category (normal/elevated/hypertension)

Water Intake Calculator — body weight → recommended daily water

Heart Rate Zone Calculator — max HR, training zones

Sleep Cycle Calculator — bedtime → optimal wake times (90-min cycles)

Pace Calculator — distance + time → pace; pace + distance → time

📏 Unit Conversion (each converter has dropdowns for From/To with instant live conversion as user types)

Length — mm, cm, m, km, in, ft, yd, mi, nautical miles, fathoms, light-years, AU, parsecs

Weight / Mass — mg, g, kg, tonnes, oz, lb, stone, US tons, metric tons, carats

Volume — ml, L, fl oz, cups, pints, quarts, gallons (US & UK), cubic cm/m/in/ft, barrels, teaspoons, tablespoons

Temperature — Celsius, Fahrenheit, Kelvin, Rankine, Réaumur

Speed — m/s, km/h, mph, knots, ft/s, Mach, speed of light

Area — mm², cm², m², km², in², ft², yd², acres, hectares, sq miles

Time — milliseconds, seconds, minutes, hours, days, weeks, months, years, decades, centuries

Pressure — Pa, kPa, MPa, bar, psi, atm, torr, mmHg, inHg

Energy — J, kJ, cal, kcal, Wh, kWh, BTU, eV, erg, foot-pound

Power — W, kW, MW, hp (mechanical + electrical), BTU/hr, ft·lbf/s

Force — N, kN, lbf, dyne, kgf, poundal

Torque — N·m, ft·lbf, in·lbf, kgf·m

Frequency — Hz, kHz, MHz, GHz, rpm, rad/s, deg/s

Data Storage — bits, bytes, KB, MB, GB, TB, PB (binary and decimal)

Data Transfer Rate — bps, Kbps, Mbps, Gbps

Fuel Economy — MPG (US), MPG (UK), L/100km, km/L

Angle — degrees, radians, gradians, arcminutes, arcseconds, turns

Density — kg/m³, g/cm³, lb/ft³, lb/gal

Flow Rate — L/s, L/min, m³/s, gal/min (GPM), ft³/s

Luminance / Illuminance — lux, foot-candle, candela/m²

Cooking — cups, tbsp, tsp, fl oz, mL, sticks of butter, grams of common ingredients

Clothing Sizes — US/EU/UK sizes for men's/women's shirts, pants, shoes, ring sizes

Shoe Size — US/EU/UK/CM conversions for men and women

Paper Size — A0–A10, Letter, Legal, Tabloid in mm/cm/in

Astronomical — AU, light-year, parsec, km, miles

Numbers — Roman numerals, binary/hex/octal/decimal, scientific notation

Typography — pt, px, em, rem, pica (at common DPI settings)

📅 Date & Time

Date Difference Calculator — days, weeks, months, years between two dates

Add / Subtract Days Calculator — date + N days = ?

Day of the Week Calculator — what day was/will any date be?

Countdown Timer — to any future date

Unix Timestamp Converter — epoch ↔ human-readable date/time

Time Zone Converter — pick two time zones, enter a time → converted time

Business Days Calculator — working days between two dates (excludes weekends)

Age Calculator — full breakdown in years, months, days, hours, minutes

Week Number Calculator — what week of the year is this date?

🔬 Science

Ohm's Law Calculator — V, I, R, P — enter any two, get the others

Resistor Color Code Calculator — pick color bands → resistance value (and reverse)

Acceleration Calculator — F = ma variants

Kinetic Energy Calculator

Potential Energy Calculator

Work & Power Calculator

Density Calculator — mass, volume, density (any two → third)

Ideal Gas Law Calculator — PV = nRT

Molarity / Concentration Calculator

pH Calculator — H⁺ concentration ↔ pH

Half-Life Calculator — radioactive decay

Wavelength / Frequency / Energy — photon properties

dB (Decibel) Calculator — power ratio, voltage ratio

Capacitor / Resistor / Inductor — basic electronics calculators

🏗️ Construction & Home

Area Calculator — room area for flooring/painting (rectangle, circle, triangle, L-shape)

Paint Calculator — room dimensions → gallons of paint needed

Flooring Calculator — room area + waste % → sq ft of material

Concrete Calculator — slab, column, footing volume → bags or cubic yards

Mulch / Gravel / Topsoil Calculator — area + depth → cubic yards

Fence Calculator — perimeter + post spacing → posts, rails, panels needed

Roofing Calculator — footprint + pitch → roof area + squares

Stair Calculator — rise/run, number of steps

Wallpaper Calculator

BTU / HVAC Calculator — room size → BTU needed for AC or heating

Patio / Tile Calculator — area + tile size → number of tiles (with waste %)

Board Foot Calculator — lumber volume

🎲 Fun & Miscellaneous

Random Name Picker — paste a list, pick N random names (great for giveaways)

Dice Roller — any number of dice, any number of sides

Coin Flip

Lottery Number Generator

Password Generator — length, character sets, generate N passwords

UUID / GUID Generator

Hash Generator — MD5, SHA-1, SHA-256 of any text (client-side only)

Color Converter — HEX ↔ RGB ↔ HSL

Reading Time Estimator — paste text → estimated reading time

Word / Character Counter

Grade Calculator — enter assignment scores + weights → overall grade

GPA Calculator — course grades + credit hours → GPA (4.0 scale)

Bra Size Calculator — band + bust measurements → size

Ring Size Converter — US/EU/UK/diameter

Fuel Cost Calculator — distance + MPG + price/gallon → trip cost

Map Scale Calculator

Aspect Ratio Calculator

Darts Calculator — track remaining score for 501/301

👤 User Accounts & Favorites

Auth

Sign up with email + password (hashed, never stored in plaintext)

Or sign up with Google OAuth

No marketing emails — account confirmation only

Account data: email, hashed password, list of favorited tool IDs, optional display name

Favorites Feature

Every calculator/converter page has a ⭐ "Save to Favorites" button

If not logged in → prompt to create a free account (no pressure, can dismiss)

Favorites sync to account and appear on the home page dashboard

Can organize favorites into named groups (e.g. "Work", "Health", "Cooking")

Account Page (/account)

Manage favorites and groups

Change password

Delete account — permanently removes all data

No subscription, no payment, always free

🎨 Design Direction

Font: Inter or similar clean sans-serif

Color palette: White background, light gray sidebar/cards, one strong accent (suggest a clean blue or teal) for buttons/links/active states

Dark mode toggle (saved to localStorage)

Layout: Left sidebar navigation (collapsible on mobile) with category tree + main content area

Each calculator is a focused card — inputs, a clear "Calculate" button or live output, and the result in a distinct highlighted box

Results should include context where helpful (e.g. BMI result shows which category; loan result shows amortization table)

Copy result button on every calculator output

Share URL — each calculation state should be shareable via URL params (e.g. /bmi?weight=180&height=70&unit=imperial)

Print-friendly styles on result pages

Mobile responsive — sidebar becomes bottom nav or hamburger on small screens

Subtle animations, no jank, no unnecessary loading states

⚙️ Technical Notes

React + Tailwind CSS

All math runs client-side — no API calls for calculations

Currency converter fetches rates from https://open.er-api.com/v6/latest/USD (free tier, no key needed) and caches in localStorage for 24 hours

Supabase for auth and favorites storage (or Firebase Auth — whichever Lovable integrates best)

URL state management — calculator inputs reflected in query params for shareability

Calculation history stored in localStorage (last 20 per calculator), no account needed

SEO-friendly routes: /calculator/bmi, /converter/length, /calculator/mortgage, etc.

Sitemap + meta descriptions for every tool page

🔒 Privacy Statement (display in footer and /privacy)

"calc.rsvp runs every calculation on your device — nothing you type is sent to our servers. We have no ads, no analytics trackers, and no data brokers. If you create an account, we store only your email and your list of saved favorites. We will never sell your data. Ever."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/283c1c62-57b0-4b0e-9043-840c4c00199e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
