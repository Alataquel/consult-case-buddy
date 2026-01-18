// Structured exhibit data for professional in-app tables

export interface ExhibitColumn {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
}

export interface ExhibitData {
  title: string;
  subtitle?: string;
  columns: ExhibitColumn[];
  rows: Record<string, string | number>[];
  footnote?: string;
}

export const exhibitData: Record<string, ExhibitData> = {
  // SolarWave - Unit Economics
  "solarwave-exhibit": {
    title: "Exhibit A: Product Line Unit Economics",
    subtitle: "Monthly Sales Data - SolarWave Energy Solutions",
    columns: [
      { key: "product", header: "Product Line", align: "left" },
      { key: "price", header: "Price (€)", align: "right" },
      { key: "materials", header: "Materials (€)", align: "right" },
      { key: "labor", header: "Labor (€)", align: "right" },
      { key: "logistics", header: "Logistics (€)", align: "right" },
      { key: "volume", header: "Monthly Volume", align: "right" },
    ],
    rows: [
      { product: "EcoHeat 120L", price: 450, materials: 200, labor: 65, logistics: 25, volume: "3,200 units" },
      { product: "HomePro 180L", price: 520, materials: 270, labor: 80, logistics: 30, volume: "2,000 units" },
      { product: "MaxHeat 240L", price: 640, materials: 340, labor: 95, logistics: 35, volume: "1,200 units" },
    ],
    footnote: "All costs are variable costs per unit. Fixed costs are handled separately."
  },

  // FreshRoute - Route Economics
  "freshroute-exhibit": {
    title: "Exhibit A: Route Economics Comparison",
    subtitle: "FreshRoute Logistics — Revenue & Cost per Truck Trip",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "regional_outbound", header: "Regional Outbound", align: "right" },
      { key: "regional_return", header: "Regional Return", align: "right" },
      { key: "longhaul_outbound", header: "Long-Haul Outbound", align: "right" },
      { key: "longhaul_return", header: "Long-Haul Return", align: "right" },
    ],
    rows: [
      { metric: "Revenue per Trip", regional_outbound: "€800", regional_return: "€0 (empty)", longhaul_outbound: "€2,400", longhaul_return: "€0 (empty)" },
      { metric: "Fuel Cost", regional_outbound: "€120", regional_return: "€100", longhaul_outbound: "€450", longhaul_return: "€400" },
      { metric: "Driver Cost", regional_outbound: "€150", regional_return: "€150", longhaul_outbound: "€350", longhaul_return: "€350" },
      { metric: "Tolls & Fees", regional_outbound: "€30", regional_return: "€30", longhaul_outbound: "€120", longhaul_return: "€120" },
      { metric: "Trips per Month", regional_outbound: "240", regional_return: "240", longhaul_outbound: "80", longhaul_return: "80" },
    ],
    footnote: "Return trips are currently empty (backhaul). Potential backhaul revenue: Regional €400/trip, Long-Haul €1,200/trip."
  },

  // VitaFresh - Channel Profitability
  "vitafresh-exhibit": {
    title: "Exhibit A: Channel Unit Economics",
    subtitle: "VitaFresh Markets — Per-Order Breakdown",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "instore", header: "In-Store", align: "right" },
      { key: "online", header: "Online Delivery", align: "right" },
    ],
    rows: [
      { metric: "Average Basket Size", instore: "€45", online: "€52" },
      { metric: "COGS (% of basket)", instore: "62%", online: "62%" },
      { metric: "Store Labor (per order)", instore: "€2.50", online: "—" },
      { metric: "Rent Allocation (per order)", instore: "€1.80", online: "—" },
      { metric: "Picking Cost (per order)", instore: "—", online: "€4.20" },
      { metric: "Delivery Cost (per order)", instore: "—", online: "€6.50" },
      { metric: "Revenue Share (% of total)", instore: "72%", online: "28%" },
    ],
    footnote: "Online revenue has grown from 18% to 28% over 2 years."
  },

  // UrbanBrew - Product Comparison
  "urbanbrew-exhibit": {
    title: "Exhibit A: Product Unit Economics",
    subtitle: "UrbanBrew Coffee — Latte vs. Panini Comparison",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "latte", header: "Specialty Latte", align: "right" },
      { key: "panini", header: "Artisan Panini", align: "right" },
    ],
    rows: [
      { metric: "Selling Price", latte: "€4.50", panini: "€7.80" },
      { metric: "Ingredient Cost", latte: "€0.85", panini: "€2.40" },
      { metric: "Waste/Spoilage", latte: "€0.10", panini: "€0.65" },
      { metric: "Labor Time", latte: "2 min", panini: "5 min" },
      { metric: "Labor Cost (€18/hr)", latte: "€0.60", panini: "€1.50" },
      { metric: "Daily Volume", latte: "320 units", panini: "85 units" },
    ],
    footnote: "Labor rate: €18/hour. Kitchen capacity constrained to 10 hours/day."
  },

  // UrbanBrew BCG Matrix
  "urbanbrew-bcg-exhibit": {
    title: "Exhibit B: Product Portfolio Analysis",
    subtitle: "UrbanBrew Coffee — BCG Matrix Positioning",
    columns: [
      { key: "product", header: "Product", align: "left" },
      { key: "growth", header: "Market Growth", align: "center" },
      { key: "share", header: "Relative Share", align: "center" },
      { key: "quadrant", header: "BCG Quadrant", align: "center" },
    ],
    rows: [
      { product: "Specialty Coffee", growth: "High (12%)", share: "High", quadrant: "⭐ Star" },
      { product: "Artisan Paninis", growth: "Low (3%)", share: "High", quadrant: "🐄 Cash Cow" },
      { product: "Breakfast Items", growth: "High (15%)", share: "Low", quadrant: "❓ Question Mark" },
      { product: "Bottled Drinks", growth: "Low (2%)", share: "Low", quadrant: "🐕 Dog" },
    ],
  },

  // Aurum - Market Expansion
  "aurum-exhibit": {
    title: "Exhibit A: Market Expansion Options",
    subtitle: "Aurum Jewelry — Germany vs. Netherlands",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "germany", header: "Germany", align: "right" },
      { key: "netherlands", header: "Netherlands", align: "right" },
    ],
    rows: [
      { metric: "Wholesale Price (per piece)", germany: "€85", netherlands: "€80" },
      { metric: "Expected Annual Volume", germany: "12,000 units", netherlands: "8,500 units" },
      { metric: "Distributor Margin", germany: "18%", netherlands: "15%" },
      { metric: "Shipping Cost (per unit)", germany: "€4.50", netherlands: "€3.20" },
      { metric: "Marketing Investment", germany: "€45,000", netherlands: "€28,000" },
      { metric: "Fixed Overhead (annual)", germany: "€120,000", netherlands: "€75,000" },
    ],
    footnote: "Manufacturing cost: €32 per piece. Both markets require dedicated sales rep."
  },

  // DataSafe - Entry Models
  "datasafe-exhibit": {
    title: "Exhibit A: Market Entry Options",
    subtitle: "DataSafe Tech — Direct Import vs. Local Licensing",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "direct", header: "Direct Import", align: "right" },
      { key: "licensing", header: "Local Licensing", align: "right" },
    ],
    rows: [
      { metric: "Unit Price", direct: "€180", licensing: "€165" },
      { metric: "Expected Volume (Year 1)", direct: "15,000 units", licensing: "22,000 units" },
      { metric: "Manufacturing Cost", direct: "€65", licensing: "€58" },
      { metric: "Import Tariff", direct: "12%", licensing: "—" },
      { metric: "Shipping (per unit)", direct: "€8", licensing: "€2" },
      { metric: "Royalty Fee", direct: "—", licensing: "8% of revenue" },
      { metric: "Fixed Overhead", direct: "€280,000", licensing: "€180,000" },
    ],
    footnote: "Licensing partner handles local distribution and regulatory compliance."
  },

  // DataSafe Diagnostic
  "datasafe-diagnostic-exhibit": {
    title: "Exhibit B: Strategic Diagnostic",
    subtitle: "DataSafe Tech — Key Decision Factors",
    columns: [
      { key: "factor", header: "Decision Factor", align: "left" },
      { key: "direct", header: "Direct Import", align: "center" },
      { key: "licensing", header: "Local Licensing", align: "center" },
    ],
    rows: [
      { factor: "Control over Brand", direct: "✓ High", licensing: "△ Medium" },
      { factor: "Speed to Market", direct: "△ 12-18 months", licensing: "✓ 6-9 months" },
      { factor: "Capital Required", direct: "✗ High", licensing: "✓ Lower" },
      { factor: "Local Market Knowledge", direct: "✗ Limited", licensing: "✓ Strong" },
      { factor: "Long-term Margin Potential", direct: "✓ Higher", licensing: "△ Capped by royalty" },
    ],
  },

  // VedaHealth - B2B vs B2G
  "vedahealth-exhibit": {
    title: "Exhibit A: Market Entry Comparison",
    subtitle: "VedaHealth — Private Hospitals vs. Public Health Program",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "private", header: "Private B2B", align: "right" },
      { key: "public", header: "Public B2G", align: "right" },
    ],
    rows: [
      { metric: "Number of Sites", private: "400 hospitals", public: "5,000 clinics" },
      { metric: "License Fee (per site/year)", private: "€8,000", public: "€1,200" },
      { metric: "Implementation Cost (per site)", private: "€2,500", public: "€400" },
      { metric: "Training Cost (per site)", private: "€800", public: "€150" },
      { metric: "Annual Overhead", private: "€1.2M", public: "€2.8M" },
      { metric: "Payment Terms", private: "Net 30", public: "Net 180" },
    ],
    footnote: "Government contract requires 3-year commitment. Private contracts are annual."
  },

  // NordPay - Entry Options
  "nordpay-exhibit": {
    title: "Exhibit A: Mexico Entry Financial Comparison",
    subtitle: "NordPay — Greenfield vs. Strategic Partnership",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "greenfield", header: "Own License", align: "right" },
      { key: "partnership", header: "Partnership", align: "right" },
    ],
    rows: [
      { metric: "Year 1 Users", greenfield: "1,000,000", partnership: "1,800,000" },
      { metric: "Monthly ARPU", greenfield: "€5.00", partnership: "€5.00" },
      { metric: "Revenue Share to Partner", greenfield: "—", partnership: "40%" },
      { metric: "Variable Cost (per user/mo)", greenfield: "€2.00", partnership: "€0.80" },
      { metric: "Annual Fixed Costs", greenfield: "€12M", partnership: "€3M" },
      { metric: "Time to Launch", greenfield: "24 months", partnership: "6 months" },
    ],
    footnote: "Partnership with Banco del Sol provides existing banking license and customer base."
  },

  // NovaRide - Growth Options
  "novaride-exhibit": {
    title: "Exhibit A: Growth Initiative Comparison",
    subtitle: "NovaRide Mobility — France Expansion vs. B2B Leasing",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "france", header: "France Retail", align: "right" },
      { key: "leasing", header: "B2B Leasing", align: "right" },
    ],
    rows: [
      { metric: "Year 2 Volume", france: "10,000 units", leasing: "800 contracts" },
      { metric: "Revenue per Unit/Contract", france: "€950", leasing: "€4,800/year" },
      { metric: "Variable Cost (per unit)", france: "€610 + €25", leasing: "€2,100 + €720" },
      { metric: "CapEx Required", france: "€2.5M", leasing: "€3.2M" },
      { metric: "Annual Fixed Overhead", france: "€1.2M", leasing: "€1.8M" },
      { metric: "Depreciation Period", france: "5 years", leasing: "5 years" },
    ],
    footnote: "France: €25 = warranty provision. Leasing: €720 = annual maintenance per contract."
  },

  // FitStream - Growth Options
  "fitstream-exhibit": {
    title: "Exhibit A: Growth Option Comparison",
    subtitle: "FitStream — Hardware (FitGear) vs. B2B Wellness (FitWork)",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "hardware", header: "FitGear Hardware", align: "right" },
      { key: "b2b", header: "FitWork B2B", align: "right" },
    ],
    rows: [
      { metric: "Target Market Size", hardware: "2.4M households", b2b: "50,000 companies" },
      { metric: "Penetration Rate (Y2)", hardware: "2%", b2b: "1.5%" },
      { metric: "Price Point", hardware: "€400/device", b2b: "€80/employee/year" },
      { metric: "Variable Cost", hardware: "€280/device", b2b: "€12/employee/year" },
      { metric: "Customer Acquisition Cost", hardware: "€45/customer", b2b: "€2,500/company" },
      { metric: "Avg Employees per Company", hardware: "—", b2b: "1,000" },
    ],
    footnote: "B2B contracts are annual with 85% renewal rate."
  },

  // EcoWash - Growth Strategy
  "ecowash-exhibit": {
    title: "Exhibit A: Growth Strategy Comparison",
    subtitle: "EcoWash — Euro-Growth vs. B2B Professional",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "eurogrowth", header: "Euro-Growth (B2C)", align: "right" },
      { key: "b2bpro", header: "B2B Professional", align: "right" },
    ],
    rows: [
      { metric: "Year 2 Orders", eurogrowth: "180,000", b2bpro: "2,400 contracts" },
      { metric: "Average Order Value", eurogrowth: "€65", b2bpro: "€12,000/year" },
      { metric: "Gross Margin", eurogrowth: "42%", b2bpro: "38%" },
      { metric: "Implementation Capital", eurogrowth: "€1.8M", b2bpro: "€2.4M" },
      { metric: "Customer Acquisition Cost", eurogrowth: "€22", b2bpro: "€1,800" },
      { metric: "Payback Period", eurogrowth: "8 months", b2bpro: "14 months" },
    ],
  },

  // SkillStream - Business Model Pivot
  "skillstream-exhibit": {
    title: "Exhibit A: Business Model Pivot Analysis",
    subtitle: "SkillStream — B2C Subscription vs. B2B Enterprise",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "b2c", header: "B2C Subscription", align: "right" },
      { key: "b2b", header: "B2B Enterprise", align: "right" },
    ],
    rows: [
      { metric: "Current Monthly Users", b2c: "850,000", b2b: "—" },
      { metric: "Target Enterprise Clients", b2c: "—", b2b: "120 companies" },
      { metric: "Monthly Subscription", b2c: "€12", b2b: "—" },
      { metric: "Enterprise License (annual)", b2c: "—", b2b: "€85,000" },
      { metric: "Avg Employees Licensed", b2c: "—", b2b: "2,500" },
      { metric: "B2C Cannibalization Rate", b2c: "—", b2b: "15%" },
    ],
    footnote: "B2B enterprise sales cycle: 6-9 months. Requires dedicated sales team."
  },

  // Verdora - Pricing Sensitivity
  "verdora-exhibit": {
    title: "Exhibit A: Price Sensitivity Analysis",
    subtitle: "Verdora Skincare — PureBalance Serum Scenarios",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "low", header: "€32 Price", align: "right" },
      { key: "mid", header: "€38 Price", align: "right" },
      { key: "high", header: "€45 Price", align: "right" },
    ],
    rows: [
      { metric: "Projected Annual Volume", low: "42,000 units", mid: "35,000 units", high: "24,000 units" },
      { metric: "Manufacturing Cost", low: "€14", mid: "€14", high: "€14" },
      { metric: "Packaging Cost", low: "€3", mid: "€3", high: "€3" },
      { metric: "Marketing (per unit)", low: "€8", mid: "€6", high: "€5" },
      { metric: "Distribution (per unit)", low: "€4", mid: "€4", high: "€4" },
      { metric: "Annual Marketing Budget", low: "€350,000", mid: "€220,000", high: "€150,000" },
    ],
    footnote: "Higher price points require less marketing spend per unit but have lower volume."
  },

  // Mediflow - Operations
  "mediflow-exhibit": {
    title: "Exhibit A: Production Line Performance",
    subtitle: "Mediflow GmbH — Operations Metrics",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "extrusion", header: "Extrusion", align: "right" },
      { key: "molding", header: "Molding", align: "right" },
      { key: "assembly", header: "Assembly", align: "right" },
    ],
    rows: [
      { metric: "Theoretical Capacity (units/hr)", extrusion: "500", molding: "400", assembly: "350" },
      { metric: "Overall Equipment Effectiveness", extrusion: "72%", molding: "68%", assembly: "85%" },
      { metric: "Rework Rate", extrusion: "3.2%", molding: "5.8%", assembly: "1.5%" },
      { metric: "Setup Time (per changeover)", extrusion: "45 min", molding: "90 min", assembly: "20 min" },
      { metric: "Changeovers per Day", extrusion: "2", molding: "4", assembly: "6" },
    ],
    footnote: "OEE = Availability × Performance × Quality. Industry benchmark: 85%."
  },

  // Helion - Synergy Analysis
  "helion-exhibit": {
    title: "Exhibit A: Acquisition Synergy Analysis",
    subtitle: "Helion Energy — Voltrix Material Cost Synergies",
    columns: [
      { key: "component", header: "Cost Component", align: "left" },
      { key: "base", header: "Current Cost", align: "right" },
      { key: "conservative", header: "Conservative (6%)", align: "right" },
      { key: "base_case", header: "Base Case (10%)", align: "right" },
      { key: "optimistic", header: "Optimistic (14%)", align: "right" },
    ],
    rows: [
      { component: "Battery Cells", base: "€42M", conservative: "€39.5M", base_case: "€37.8M", optimistic: "€36.1M" },
      { component: "Power Electronics", base: "€28M", conservative: "€26.3M", base_case: "€25.2M", optimistic: "€24.1M" },
      { component: "Thermal Systems", base: "€18M", conservative: "€16.9M", base_case: "€16.2M", optimistic: "€15.5M" },
      { component: "Total Material Cost", base: "€88M", conservative: "€82.7M", base_case: "€79.2M", optimistic: "€75.7M" },
      { component: "Annual Savings", base: "—", conservative: "€5.3M", base_case: "€8.8M", optimistic: "€12.3M" },
    ],
    footnote: "Integration costs: €7.6M annually. Deal is value-accretive above 8.6% synergy."
  },

  // Castellon - Cost Reduction
  "castellon-exhibit": {
    title: "Exhibit A: Cost Reduction Opportunity Analysis",
    subtitle: "Castellon Ceramics — Variable Cost Breakdown",
    columns: [
      { key: "category", header: "Cost Category", align: "left" },
      { key: "current", header: "Current Cost (€/m²)", align: "right" },
      { key: "percent", header: "% of Variable", align: "right" },
      { key: "potential", header: "Savings Potential", align: "right" },
    ],
    rows: [
      { category: "Raw Materials", current: "€8.50", percent: "42%", potential: "8-12%" },
      { category: "Direct Labor", current: "€4.20", percent: "21%", potential: "5-8%" },
      { category: "Energy (Gas + Electric)", current: "€5.80", percent: "29%", potential: "12-18%" },
      { category: "Logistics", current: "€1.70", percent: "8%", potential: "15-22%" },
      { category: "Total Variable", current: "€20.20", percent: "100%", potential: "—" },
    ],
    footnote: "Energy costs have increased 45% in past 18 months. Logistics affected by driver shortage."
  },

  // Maison Dubois - Financial Projections
  "maison-dubois-exhibit": {
    title: "Exhibit A: Target Financial Projections",
    subtitle: "Maison Dubois — Artisan Boulangerie Acquisition",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "y1", header: "Year 1", align: "right" },
      { key: "y2", header: "Year 2", align: "right" },
      { key: "y3", header: "Year 3", align: "right" },
      { key: "y4", header: "Year 4", align: "right" },
      { key: "y5", header: "Year 5", align: "right" },
    ],
    rows: [
      { metric: "Revenue (€M)", y1: "4.2", y2: "4.8", y3: "5.5", y4: "6.1", y5: "6.8" },
      { metric: "Growth Rate", y1: "—", y2: "14%", y3: "15%", y4: "11%", y5: "11%" },
      { metric: "EBITDA (€M)", y1: "0.42", y2: "0.53", y3: "0.66", y4: "0.79", y5: "0.92" },
      { metric: "EBITDA Margin", y1: "10%", y2: "11%", y3: "12%", y4: "13%", y5: "13.5%" },
      { metric: "CapEx (€M)", y1: "0.25", y2: "0.30", y3: "0.28", y4: "0.22", y5: "0.20" },
    ],
    footnote: "Asking price: €8.5M (implied 20x Year 1 EBITDA). Synergies not included."
  },

  // AuraHome - CLTV Analysis
  "aurahome-exhibit": {
    title: "Exhibit A: Business Model Comparison",
    subtitle: "AuraHome — SaaS Subscription vs. Hardware Sales",
    columns: [
      { key: "metric", header: "Metric", align: "left" },
      { key: "saas", header: "SaaS Model", align: "right" },
      { key: "hardware", header: "Hardware Model", align: "right" },
    ],
    rows: [
      { metric: "Initial Price", saas: "€0", hardware: "€450" },
      { metric: "Monthly Subscription", saas: "€29", hardware: "—" },
      { metric: "Hardware Margin", saas: "—", hardware: "35%" },
      { metric: "Monthly Service Cost", saas: "€8", hardware: "€2" },
      { metric: "Monthly Churn Rate", saas: "2.5%", hardware: "—" },
      { metric: "Customer Acquisition Cost", saas: "€180", hardware: "€95" },
    ],
    footnote: "SaaS includes free hardware. Hardware model has optional €5/month premium features (18% attach rate)."
  },

  // AuraHome Lifecycle
  "aurahome-lifecycle-exhibit": {
    title: "Exhibit B: Customer Lifetime Value Calculation",
    subtitle: "AuraHome — CLTV Framework",
    columns: [
      { key: "component", header: "CLTV Component", align: "left" },
      { key: "saas", header: "SaaS Model", align: "right" },
      { key: "hardware", header: "Hardware Model", align: "right" },
    ],
    rows: [
      { component: "Average Lifetime (months)", saas: "40", hardware: "One-time" },
      { component: "Lifetime Revenue", saas: "€1,160", hardware: "€450 + €36" },
      { component: "Lifetime Service Cost", saas: "€320", hardware: "€24" },
      { component: "Gross Lifetime Value", saas: "€840", hardware: "€462" },
      { component: "Less: CAC", saas: "€180", hardware: "€95" },
      { component: "Net CLTV", saas: "€660", hardware: "€367" },
    ],
    footnote: "Hardware €36 = 18% attach rate × €5/mo × 40 months average engagement."
  },
};
