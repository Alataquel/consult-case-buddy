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

Input Costs: Steel and component prices have likely increased due to inflation and supply chain pressures.

Plant Efficiency: Production downtime from equipment maintenance and increased scrap rates are reducing throughput and raising per-unit costs.

Product Mix: Sales may have shifted toward lower-margin EcoLite units as customers become more price-sensitive.

Overhead Structure: Fixed overhead may have grown faster than revenue, spreading fixed costs less efficiently.

Pricing Discipline: SolarWave has likely held prices steady while competitors discounted aggressively, compressing margins.

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
        answer: `Unit Contribution Margins:
- EcoLite 120L: €420 – (€210 + €65 + €25) = €120 per unit (28.6% margin)
- HomePro 180L: €520 – (€270 + €80 + €30) = €140 per unit (26.9% margin)
- MaxHeat 240L: €640 – (€340 + €95 + €35) = €170 per unit (26.6% margin)

Weighted Average Contribution:
Monthly: [(€120 × 3,200) + (€140 × 2,000) + (€170 × 1,200)] ÷ 6,400 = €134.4 per unit

Annual Volume & Contribution:
- Total annual volume: 6,400 units/month × 12 = 76,800 units
- Total annual contribution: 76,800 × €134.4 = €10.33M
- Operating profit: €10.33M – €2.4M fixed costs = €7.93M

Breakeven Volume:
€2.4M ÷ €134.4 per unit ≈ 17,860 units annually (about 1.5 months of current sales)

Interpretation: SolarWave is far above breakeven. The problem is cost efficiency and margin compression, not volume.`,
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
        answer: `Primary Recommendations:

1. Operational Efficiency (Short-term)
- Renegotiate supplier contracts for bulk discounts or alternative sourcing
- Improve quality control to reduce scrap rates (target 2-3% reduction in material waste)
- Optimize maintenance scheduling to minimize production downtime
- Expected impact: 2-3 percentage point margin improvement

2. Selective Price Increases (Short-term)
- Raise prices 3-5% on HomePro and MaxHeat premium lines
- Maintain EcoLite pricing to protect volume
- Leverage eco-friendly positioning to justify premium
- Expected impact: 1-2 percentage point margin improvement

3. Automation Investment (Medium-term)
- Invest in automated assembly for high-volume EcoLite line
- Reduce labor cost per unit by 15-20%
- Improve throughput and consistency
- Expected impact: 2-3 percentage point margin improvement (after payback)

Trade-offs & Risks:
- Supplier negotiations may face resistance or require longer-term commitments
- Price increases could impact demand elasticity (test with small increases first)
- Automation requires upfront capital and training time
- Need to monitor competitor responses to pricing changes

Implementation Priority: Start with operational efficiency and selective pricing while planning automation investments for year 2.`
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
  },
  
  // MARKET ENTRY
  {
    id: "aurum-market-entry",
    title: "Aurum Beverages International Expansion",
    firm: "Market Entry",
    type: "Market Entry",
    background: `Aurum Beverages S.L. is a Barcelona-based craft drink company founded in 2019. It produces premium non-alcoholic "botanical spritzers" made from Mediterranean herbs and fruits. The brand has gained strong traction in Spain's upscale cafés, boutique hotels, and gourmet retailers. Aurum outsources production to a co-packer near Girona and manages marketing and distribution in-house. Its annual revenue reached €14 million in 2024 with healthy 15% EBITDA margins.

After establishing a strong domestic presence, Aurum's founders are considering international expansion. They've received distribution interest from partners in Germany and the Netherlands—markets with growing demand for premium alcohol-free beverages. However, each market differs in consumer preferences, logistics costs, and retailer dynamics. The company lacks internal experience with exports, pricing localization, and regulatory labeling requirements.

Aurum's board has asked for an assessment of financial viability, competitive intensity, and go-to-market options in Northern Europe.`,
    question: "Determine whether and how Aurum should enter Germany or the Netherlands within the next fiscal year.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — How attractive are these target markets? Analyze key demand and competitive factors.",
        hints: [
          "Consider market size, growth rate, and consumer trends for premium alcohol-free beverages",
          "Evaluate distribution channels and retailer dynamics in each country",
          "Think about brand positioning potential and competitive intensity",
          "Assess regulatory and operational complexity for market entry"
        ],
        answer: `Germany:
- Market Size: Larger premium soft-drink market (~€1.2B with significant scale potential)
- Growth: High growth in "adult alcohol-free" segment driven by health trends
- Competition: Heavy competition from established brands (Bionade, Fritz-kola, international players)
- Distribution: Complex retail landscape with strong discount chains and premium specialty stores
- Positioning: Requires strong brand differentiation and marketing investment

Netherlands:
- Market Size: Smaller market (~€400M) but concentrated and accessible
- Growth: Faster growth rate with high openness to new flavors and international brands
- Competition: Less saturated with fewer established premium players
- Distribution: Simpler logistics with Rotterdam port access; English labeling often accepted
- Positioning: Early-mover advantage in botanical/Mediterranean positioning

Comparative Assessment:
Germany offers scale and volume potential but requires higher investment and faces intense competition. Netherlands offers faster time-to-market, lower entry friction, and better margins despite smaller absolute size.

A strong answer identifies the trade-off between market size (Germany) and market accessibility (Netherlands).`
      },
      {
        number: 2,
        question: "Quantitative — Which market offers higher profit potential in Year 1? Use Exhibit A and assume fixed export overhead of €600,000 annually per market with no cannibalization.",
        hints: [
          "Calculate net revenue after distributor margin for each market",
          "Add variable cost per bottle AND shipping/duties to get total variable cost",
          "Compute contribution margin per bottle, then multiply by volume",
          "Subtract fixed overhead to get operating profit"
        ],
        answer: `Germany Analysis:
- Net price per bottle = €2.80 × (1 - 25%) = €2.10
- Total variable cost = €1.10 + €0.20 shipping = €1.30 per bottle
- Contribution margin = €2.10 - €1.30 = €0.80 per bottle
- Annual volume = 1,200,000 bottles
- Total contribution = 1,200,000 × €0.80 = €960,000
- Operating profit = €960,000 - €600,000 = €360,000
- Profit margin ≈ 5%

Netherlands Analysis:
- Net price per bottle = €3.00 × (1 - 20%) = €2.40
- Total variable cost = €1.00 + €0.15 shipping = €1.15 per bottle
- Contribution margin = €2.40 - €1.15 = €1.25 per bottle
- Annual volume = 900,000 bottles
- Total contribution = 900,000 × €1.25 = €1,125,000
- Operating profit = €1,125,000 - €600,000 = €525,000
- Profit margin ≈ 9%

Conclusion: 
The Netherlands yields €165,000 higher profit (+46% vs Germany) despite 25% lower volume, due to:
- Better pricing power (€3.00 vs €2.80)
- Lower distributor margin (20% vs 25%)
- Lower shipping costs (€0.15 vs €0.20)
- Lower variable costs (€1.00 vs €1.10)

The Netherlands offers superior unit economics that more than compensate for smaller scale.`,
        exhibitImage: "aurum-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Should Aurum enter one market, both, or neither? Use insights from Q1 and Q2 to justify your entry decision and go-to-market model.",
        hints: [
          "Consider the financial returns from Q2 alongside strategic factors from Q1",
          "Think about sequencing: should they test one market first?",
          "Evaluate organizational capacity to manage international expansion",
          "Consider risks and mitigation strategies for market entry"
        ],
        answer: `Recommendation: Enter the Netherlands first as a pilot market

Rationale:
1. Superior Economics: 46% higher profit in Year 1 (€525k vs €360k) with better margins (9% vs 5%)
2. Lower Complexity: Simpler regulatory requirements, English labeling acceptance, easier logistics via Rotterdam
3. Faster Learning: Smaller scale allows testing export operations, pricing strategies, and distributor management with lower risk
4. Strategic Positioning: Early-mover advantage in premium botanical segment before market saturation

Go-to-Market Model:
- Distribution: Partner with established premium beverage distributor (e.g., Heuschen & Schrouff)
- Retail Focus: Target upscale supermarkets (Albert Heijn Premium), specialty stores, and hospitality venues
- Marketing: Joint promotions with premium retail chains, influencer partnerships, sampling events
- Pricing: Maintain €3.00 price point to reinforce premium positioning

Phase 2: Germany Entry (Year 2)
After 12-18 months in Netherlands:
- Apply learnings on packaging, logistics, and distributor management
- Refine brand messaging and product positioning
- Negotiate better terms with German distributors using Netherlands success as leverage
- Consider direct-to-retail model for higher-margin channels

Key Risks & Mitigation:
- Distributor Dependency: Sign performance-based contracts with minimum volume commitments
- Currency Fluctuation: Hedge major FX exposure or build 5-10% buffer into pricing
- Limited Shelf Space: Secure multi-year agreements with anchor retail partners
- Regulatory Changes: Work with local compliance consultants for labeling and import requirements

Critical Success Factors:
- Achieve 70%+ of projected Netherlands volume in Year 1
- Maintain 8%+ operating margin
- Secure 3+ major retail partnerships
- Build repeatable export playbook for future markets

Why Not Both Markets Simultaneously?
Entering both would require €1.2M in fixed overhead, dilute management focus, and risk execution failures. Sequential entry allows organizational learning and capital efficiency.

Why Not Delay?
Current distributor interest and market momentum in premium alcohol-free segment create a window of opportunity. Delaying risks competitive entry and loss of first-mover advantages.`
      }
    ],
    difficulty: "Intermediate",
    modelSolution: `The analysis reveals that Netherlands entry offers superior financial returns and strategic positioning despite smaller market size. The combination of better unit economics (€1.25 vs €0.80 contribution margin), lower distributor take, and reduced operational complexity makes it the ideal pilot market.

The recommended approach prioritizes learning and capital efficiency: prove the international expansion model in Netherlands, then leverage those insights for a stronger Germany entry in Year 2. This sequential strategy balances growth ambitions with organizational capacity and risk management.

The key insight is that market attractiveness isn't purely about size—the Netherlands' better economics, faster time-to-market, and lower barriers make it more valuable for Year 1 despite being half Germany's volume.`,
    keyFrameworks: [
      "Market Attractiveness Assessment",
      "Market Entry Strategy (Build/Buy/Partner)",
      "Contribution Margin Analysis",
      "Go-to-Market Strategy",
      "Market Sizing"
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
