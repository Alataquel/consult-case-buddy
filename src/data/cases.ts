// Real consulting case studies organized by problem type

export interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
}

export interface Case {
  id: string;
  title: string;
  firm: string;
  type: string;
  background: string;
  question: string; // Main question for backward compatibility
  questions?: CaseQuestion[]; // Multi-part questions
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modelSolution: string;
  keyFrameworks: string[];
  exhibitImage?: string;
}

export const cases: Case[] = [
  // PROFITABILITY & COST OPTIMIZATION
  {
    id: "solarwave-profitability",
    title: "SolarWave Appliances Profit Decline",
    firm: "Profitability & Cost Optimization",
    type: "Profitability & Cost Optimization",
    background: `Valencia-based SolarWave Appliances S.L. manufactures compact solar-powered water heaters for residential customers across southern Europe. The company has grown steadily since 2018, positioning itself as a mid-priced, eco-friendly alternative to conventional electric units. SolarWave operates a single assembly plant near Alicante, sourcing components from Spain and Portugal. Its sales channels include online direct-to-consumer (45%) and regional distributors (55%).

Over the past twelve months, SolarWave's operating profit margin fell from 12% to 6%, despite stable revenue. The CEO suspects that rising input costs and inefficient plant operations are eroding margins. Preliminary reviews show production downtime due to equipment maintenance and increased scrap rates on key components. Meanwhile, competition from low-cost Eastern European brands is intensifying, pressuring prices. The CFO has asked for a structured review of cost drivers to restore margins without harming product quality or customer delivery times.`,
    question: "Determine the root causes of profit decline and identify actionable measures to recover SolarWave's target margin of 12% within one year.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — Where is margin being lost? Explore which parts of the value chain are likely driving profit erosion.",
        hints: [
          "Consider input costs, plant efficiency, product mix, pricing discipline, and overhead structure",
          "Think about both external factors (competition, supplier prices) and internal factors (operations, efficiency)",
          "Product mix shifts can significantly impact overall profitability"
        ],
        answer: `Margin decline likely stems from multiple sources:

**Input Costs**: Steel and component prices have likely increased due to inflation and supply chain pressures.

**Plant Efficiency**: Production downtime from equipment maintenance and increased scrap rates are reducing throughput and raising per-unit costs.

**Product Mix**: Sales may have shifted toward lower-margin EcoLite units as customers become more price-sensitive.

**Overhead Structure**: Fixed overhead may have grown faster than revenue, spreading fixed costs less efficiently.

**Pricing Discipline**: SolarWave has likely held prices steady while competitors discounted aggressively, compressing margins.

A strong answer identifies 3-4 of these areas and links them to the 6-percentage-point margin decline.`
      },
      {
        number: 2,
        question: "Quantitative — What is the current profit per unit and breakeven volume? Use Exhibit A and assume fixed costs of €2.4M annually.",
        hints: [
          "Calculate contribution margin for each product line (price minus all variable costs)",
          "Compute weighted average contribution based on monthly volumes",
          "Breakeven volume = Fixed Costs ÷ Average Contribution per Unit"
        ],
        answer: `**Unit Contribution Margins:**
- EcoLite 120L: €420 – (€210 + €65 + €25) = €120 per unit (28.6% margin)
- HomePro 180L: €520 – (€270 + €80 + €30) = €140 per unit (26.9% margin)
- MaxHeat 240L: €640 – (€340 + €95 + €35) = €170 per unit (26.6% margin)

**Weighted Average Contribution:**
Monthly: [(€120 × 3,200) + (€140 × 2,000) + (€170 × 1,200)] ÷ 6,400 = €134.4 per unit

**Annual Volume & Contribution:**
- Total annual volume: 6,400 units/month × 12 = 76,800 units
- Total annual contribution: 76,800 × €134.4 = €10.33M
- Operating profit: €10.33M – €2.4M fixed costs = €7.93M

**Breakeven Volume:**
€2.4M ÷ €134.4 per unit ≈ 17,860 units annually (about 1.5 months of current sales)

**Interpretation:** SolarWave is far above breakeven. The problem is cost efficiency and margin compression, not volume.`,
        exhibitImage: "solarwave-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — How should SolarWave improve profitability? Based on your diagnosis and calculations, recommend 2–3 key levers to restore margins. Discuss trade-offs.",
        hints: [
          "Consider both short-term cost measures and medium-term operational improvements",
          "Balance cost reduction, pricing strategy, and operational efficiency",
          "Think about which levers have the highest impact with lowest risk"
        ],
        answer: `**Primary Recommendations:**

**1. Operational Efficiency (Short-term)**
- Renegotiate supplier contracts for bulk discounts or alternative sourcing
- Improve quality control to reduce scrap rates (target 2-3% reduction in material waste)
- Optimize maintenance scheduling to minimize production downtime
- Expected impact: 2-3 percentage point margin improvement

**2. Selective Price Increases (Short-term)**
- Raise prices 3-5% on HomePro and MaxHeat premium lines
- Maintain EcoLite pricing to protect volume
- Leverage eco-friendly positioning to justify premium
- Expected impact: 1-2 percentage point margin improvement

**3. Automation Investment (Medium-term)**
- Invest in automated assembly for high-volume EcoLite line
- Reduce labor cost per unit by 15-20%
- Improve throughput and consistency
- Expected impact: 2-3 percentage point margin improvement (after payback)

**Trade-offs & Risks:**
- Supplier negotiations may face resistance or require longer-term commitments
- Price increases could impact demand elasticity (test with small increases first)
- Automation requires upfront capital and training time
- Need to monitor competitor responses to pricing changes

**Implementation Priority:** Start with operational efficiency and selective pricing while planning automation investments for year 2.`
      }
    ],
    difficulty: "Intermediate",
    modelSolution: `The profit decline stems from a combination of rising input costs, operational inefficiencies, and competitive pricing pressure. Analysis reveals that while all product lines are profitable, the weighted average contribution margin of €134.4 per unit leaves little buffer when fixed costs and inefficiencies are factored in.

The immediate priority is addressing operational waste—reducing scrap rates and optimizing maintenance schedules can deliver quick wins. Simultaneously, selective price increases on premium models protect positioning while improving margins. Medium-term automation investments will sustainably reduce per-unit costs and improve competitiveness.

With current volumes far exceeding breakeven (17,860 vs 76,800 units), the focus must be on cost structure optimization rather than volume growth.`,
    keyFrameworks: [
      "Cost Structure Analysis (Fixed vs Variable)",
      "Contribution Margin & Unit Economics",
      "Breakeven Analysis",
      "Value Chain Analysis",
      "Profitability Tree"
    ]
  }
];

export const getCasesBySelection = (type: string, value: string): Case[] => {
  if (type === 'firm') {
    return cases.filter(case_ => case_.firm === value);
  } else if (type === 'type') {
    return cases.filter(case_ => case_.type === value);
  }
  return cases;
};

export const getRandomCase = (filteredCases: Case[]): Case => {
  const randomIndex = Math.floor(Math.random() * filteredCases.length);
  return filteredCases[randomIndex];
};
