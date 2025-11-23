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
Total Monthly Contribution: (€120 × 3,200) + (€140 × 2,000) + (€170 × 1,200) = €384,000 + €280,000 + €204,000 = €868,000
Weighted Average per Unit: €868,000 ÷ 6,400 = €135.625 per unit

Annual Volume & Contribution:
- Total annual volume: 6,400 units/month × 12 = 76,800 units
- Total annual contribution: €868,000 × 12 = €10,416,000
- Operating profit: €10,416,000 – €2,400,000 fixed costs = €8,016,000

Breakeven Volume:
€2,400,000 ÷ €135.625 per unit = 17,696 units annually (about 2.75 months of current sales)

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
- Profit margin ≈ 14.3%

Netherlands Analysis:
- Net price per bottle = €3.00 × (1 - 20%) = €2.40
- Total variable cost = €1.00 + €0.15 shipping = €1.15 per bottle
- Contribution margin = €2.40 - €1.15 = €1.25 per bottle
- Annual volume = 900,000 bottles
- Total contribution = 900,000 × €1.25 = €1,125,000
- Operating profit = €1,125,000 - €600,000 = €525,000
- Profit margin ≈ 24.3%

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
1. Superior Economics: 46% higher profit in Year 1 (€525k vs €360k) with better margins (24% vs 14%)
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
- Regulatory Fragmentation: Navigate varying deposit schemes (e.g., Pfand in Germany) and labeling requirements
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
  },

  // GROWTH STRATEGY
  {
    id: "novaride-growth",
    title: "NovaRide Mobility Growth Strategy",
    firm: "Growth Strategy",
    type: "Growth Strategy",
    background: `NovaRide Mobility S.L. is a Madrid-based electric scooter manufacturer specializing in compact, mid-range urban mobility vehicles. Founded in 2020, the company sells primarily to city commuters and short-distance delivery services. NovaRide operates through direct online sales (60%) and partnerships with retail chains (40%). With €28M in 2024 revenue and 12% EBIT margin, it has become one of Spain's top three e-scooter brands.

After three years of steady growth, NovaRide's domestic sales have plateaued. Urban market saturation, tighter city regulations on shared scooters, and rising price competition are limiting organic expansion. The CEO believes NovaRide must pursue new growth paths to reach its €50M revenue target by 2027.

The company is evaluating two strategic options:
1. Expand into Southern France, leveraging geographic proximity and similar urban mobility trends
2. Launch a B2B leasing service for delivery companies, providing scooters and maintenance under monthly contracts

Each option would require capital investment, new capabilities, and different risk profiles.`,
    question: "Determine which growth initiative—cross-border expansion or B2B leasing—offers the stronger case for investment over the next two years.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What factors should drive NovaRide's growth decision? Identify the most relevant dimensions for comparing both options.",
        hints: [
          "Consider market potential and addressable customer base for each option",
          "Evaluate investment needs and capital intensity",
          "Think about operational complexity and required new capabilities",
          "Assess strategic synergies with existing business model",
          "Consider risk profiles and scalability"
        ],
        answer: `Key Decision Factors:

Market Potential:
- France expansion: Geographic adjacency, similar urban demographics, growing e-mobility adoption, existing retail infrastructure
- B2B leasing: Recurring revenue model, delivery market growth (food delivery, logistics), customer lock-in potential

Investment Requirements:
- France: Lower initial CapEx (€2.5M), moderate fixed overhead (€1.2M), retail and distribution setup
- Leasing: Higher CapEx (€3.2M) for fleet inventory, higher fixed costs (€1.8M) for service infrastructure, financing requirements

Operational Complexity:
- France: Easier marketing adaptation, retail logistics and dealer management, regulatory compliance across borders
- Leasing: Fleet management systems, maintenance service capability, contract management, financing arrangements

Strategic Fit:
- France: Leverages existing product line and brand, similar go-to-market model, lower learning curve
- Leasing: New business model, recurring revenue streams, deeper customer relationships, service capability development

Risk Profile:
- France: Regulatory differences, dealer dependency, currency exposure, slower market adoption than expected
- Leasing: Cash flow timing (CapEx upfront, revenue over time), maintenance cost volatility, customer creditworthiness, contract disputes

A strong answer identifies 4-5 of these dimensions and discusses trade-offs between short-term profitability (France) vs long-term recurring revenue (leasing).`
      },
      {
        number: 2,
        question: "Quantitative — Which option delivers higher annual profit by Year 2? Use Exhibit A and assume fixed overhead of €1.2M for France entry and €1.8M for leasing service.",
        hints: [
          "Calculate contribution margin per unit/contract (revenue minus all variable costs)",
          "Include depreciation of CapEx using straight-line method over 5 years",
          "Total profit = Total Contribution - Fixed Overhead - Depreciation",
          "Compare both profit levels and profit margins"
        ],
        answer: `France Retail Expansion Analysis:
- Contribution per unit = €950 - (€610 + €25) = €315 per unit
  (Note: The €25 represents warranty and after-sales service provision per unit, not customer-paid maintenance)
- Total contribution = 10,000 units × €315 = €3,150,000
- Annual depreciation = €2.5M ÷ 5 years = €500,000
- Total costs = €1,200,000 (fixed overhead) + €500,000 (depreciation) = €1,700,000
- Year 2 Profit = €3,150,000 - €1,700,000 = €1,450,000
- Revenue = 10,000 × €950 = €9.5M
- Profit margin = €1.45M ÷ €9.5M ≈ 15.3%

B2B Leasing Service Analysis:
- Contribution per contract = €1,800 - (€900 + €180) = €720 per contract
  (Note: For this analysis, the €900 manufacturing cost is treated as an immediate expense to model conservative Year 2 cash impact. The €3.2M CapEx represents service infrastructure: IT systems, warehouse, charging stations.)
- Total contribution = 3,000 contracts × €720 = €2,160,000
- Annual depreciation = €3.2M ÷ 5 years = €640,000
- Total costs = €1,800,000 (fixed overhead) + €640,000 (depreciation) = €2,440,000
- Year 2 Profit = €2,160,000 - €2,440,000 = -€280,000 (loss)
- Revenue = 3,000 × €1,800 = €5.4M
- Profit margin = -5.2%

Conclusion:
France retail expansion delivers €1.73M better financial performance in Year 2 (€1.45M profit vs €280k loss). France offers:
- Positive profitability from Year 2
- Higher profit margin (15.3% vs -5.2%)
- Lower capital intensity per euro of profit
- Faster payback on investment

The leasing model's higher per-unit contribution (€720 vs €315) cannot overcome its higher fixed costs and CapEx burden at Year 2 volumes. Leasing would require significantly higher contract volumes to reach breakeven.`,
        exhibitImage: "novaride-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Which path should NovaRide pursue, and why? Base your recommendation on both qualitative and quantitative findings.",
        hints: [
          "Integrate financial analysis from Q2 with strategic factors from Q1",
          "Consider both near-term profitability and long-term strategic positioning",
          "Think about sequencing: could one option enable the other later?",
          "Identify critical success factors and major risks for your recommendation"
        ],
        answer: `Recommendation: Pursue France retail expansion first, then consider B2B leasing in Year 3-4

Rationale:

Financial Performance:
- France generates €1.45M profit in Year 2 vs €280k loss for leasing
- 15.3% profit margin vs negative margin for leasing
- Lower capital requirements (€2.5M vs €3.2M)
- Faster cash generation to fund future initiatives

Strategic Advantages:
- Leverages existing capabilities: Same product line, similar retail model, established brand equity
- Geographic adjacency: Cultural similarity, manageable logistics, shared time zone
- Lower execution risk: Proven business model, shorter learning curve
- Market validation: Test international expansion at moderate scale before bigger commitments
- Future synergy: Entering France creates a natural springboard for a future leasing launch. Once NovaRide has logistics and brand presence in France, layering on a B2B service becomes cheaper and less risky

Implementation Approach:
- Phase 1 (Months 1-6): Pilot in 2-3 Southern French cities (Marseille, Nice, Toulouse)
- Phase 2 (Months 7-12): Build partnerships with regional e-mobility dealers to minimize logistics costs
- Phase 3 (Year 2): Scale to 10 cities based on pilot learnings
- Validate price acceptance and adapt marketing messaging for French consumers

Future Sequencing for B2B Leasing:
After establishing France operations (Year 3-4):
- Use improved cash flows to fund leasing infrastructure
- Apply international expansion learnings to B2B model complexity
- Consider leasing in both Spain and France for broader market base
- By Year 3, operational maturity will better support dual business models

Key Risks and Mitigation:
- Regulatory differences: Hire local compliance consultant, partner with established dealers who understand French regulations
- Dealer dependency: Structure performance-based agreements with minimum volume commitments and quality standards
- Slower demand: Start with pilot cities to validate assumptions before full commitment
- Currency exposure: Price in euros, natural hedge since costs also in euros

Why Not B2B Leasing Now?
- Negative Year 2 profitability strains cash flows
- Requires building entirely new capabilities (fleet management, maintenance network, financing)
- Higher execution risk with unproven business model
- Would divert management focus from core retail business

Why Not Both Simultaneously?
- Capital constraints (€5.7M total CapEx)
- Management bandwidth limitations
- Risk of execution failure on both fronts
- Better to prove one path before diversifying

Critical Success Factors for France Expansion:
- Achieve 70%+ of projected Year 2 volume (7,000+ units)
- Maintain 12%+ EBIT margin
- Secure 5+ dealer partnerships across target cities
- Build efficient cross-border logistics and support infrastructure

Next Steps:
1. Conduct detailed market research in target French cities
2. Identify and approach potential dealer partners
3. Develop French-language marketing materials and e-commerce site
4. Establish logistics and after-sales support infrastructure
5. Launch pilot with clear success metrics and go/no-go decision points`
      }
    ],
    difficulty: "Intermediate",
    modelSolution: `The analysis reveals that France retail expansion offers superior near-term financial returns and lower execution risk compared to B2B leasing. While leasing's per-unit economics are attractive (€720 vs €315 contribution), its higher fixed costs and capital requirements make it unprofitable in Year 2.

France expansion leverages NovaRide's existing strengths—product quality, retail model, brand positioning—while providing geographic diversification. The €1.45M Year 2 profit creates financial capacity to explore leasing or other growth options in subsequent years.

The recommended sequential approach (France first, leasing later) balances growth ambitions with financial prudence and operational capacity. This strategy allows NovaRide to validate international expansion capabilities before taking on the complexity of a new business model, ultimately positioning the company for sustainable multi-year growth toward its €50M revenue target.`,
    keyFrameworks: [
      "Growth Strategy Framework (Organic vs Inorganic)",
      "Investment Analysis & ROI Comparison",
      "Contribution Margin Analysis",
      "Strategic Fit Assessment",
      "Risk-Return Trade-off"
    ]
  },

  // PRICING STRATEGY
  {
    id: "verdora-pricing",
    title: "Verdora Skincare Pricing Strategy",
    firm: "Pricing Strategy",
    type: "Pricing Strategy",
    background: `Verdora Skincare S.L. is a Seville-based natural cosmetics company founded in 2017. It produces plant-based face creams, serums, and cleansers using locally sourced ingredients. Verdora sells mainly through pharmacies and its own e-commerce site, positioned as an affordable premium brand. The company achieved €22M in revenue in 2024 with 10% EBIT margin.

Verdora recently launched a new product line—"PureBalance Serum", targeting urban professionals seeking eco-conscious skincare. Initial feedback is strong, but sales have plateaued after an early surge. The marketing director believes price perception is constraining growth: Verdora's €38 retail price sits between mass brands (€20–25) and prestige serums (€50–70).

Retail partners are pushing for promotions to stimulate volume, while management worries this could dilute brand equity. The CEO has asked for a structured pricing review to assess price elasticity, margin impact, and competitive dynamics.`,
    question: "Recommend the optimal pricing strategy for Verdora's PureBalance Serum to maximize profit without eroding brand equity.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What factors influence Verdora's optimal price point? Identify key levers affecting pricing decisions.",
        hints: [
          "Consider customer perception and willingness to pay for eco-conscious products",
          "Analyze competitive benchmarks: mass brands (€20-25) vs prestige serums (€50-70)",
          "Think about price elasticity and volume sensitivity",
          "Evaluate cost structure and contribution margins",
          "Consider channel incentives and retailer requirements"
        ],
        answer: `Key Pricing Factors:

Customer Perception and Value:
- Target segment: Urban professionals seeking eco-conscious, natural skincare
- Willingness to pay tied to perceived quality, ingredient sourcing story, and brand values
- Risk of "stuck in the middle" positioning between mass and prestige tiers
- Premium cues needed: Packaging quality, ingredient transparency, certifications

Competitive Benchmarks:
- Mass brands (€20-25): High volume, limited natural positioning, pharmacy distribution
- Prestige serums (€50-70): Department stores, luxury packaging, established brands
- Current €38 price creates ambiguous positioning—neither clearly affordable nor clearly premium

Price Elasticity:
- High elasticity risk near mass-market threshold (€30-35 range)
- At €32, significant volume increase (+29% vs €38) suggests price-sensitive customers
- At €45, volume declines by only 24%, indicating core premium segment exists
- Middle positioning may be missing both segments

Cost Structure:
- Variable costs (€11.50 per unit) are constant across price points
- Fixed costs (€3.2M annually) require sufficient volume and margin to cover
- Higher prices improve unit economics but reduce addressable market

Channel Dynamics:
- Retail partners want 30% margin regardless of price point
- Pharmacy channel expects promotional support for slower-moving premium items
- E-commerce offers full margin capture but requires brand-building investment
- Retailer pushback on current pricing suggests positioning uncertainty

Brand Equity Considerations:
- Early discounting trains customers to wait for promotions
- Premium positioning requires consistent messaging and retail experience
- Natural/eco positioning supports premium pricing if communicated effectively

A strong answer identifies 4-5 factors and discusses the trade-off between volume (lower price) and margin (higher price) in the context of brand positioning.`
      },
      {
        number: 2,
        question: "Quantitative — How would a price change affect annual profit? Use Exhibit A and assume fixed costs of €3.2M annually, retail margin of 30%, and variable costs from the exhibit.",
        hints: [
          "Calculate Verdora's net revenue after retail margin: Net = Retail Price × (1 - 30%)",
          "Variable cost per unit = Manufacturing Cost + Packaging & Fulfillment",
          "Unit contribution = Net Revenue - Variable Costs",
          "Total annual profit = (Unit Contribution × Volume) - Fixed Costs",
          "Compare all three scenarios for profit and margin percentage"
        ],
        answer: `Price Scenario Analysis:

Step 1: Calculate Net Revenue to Verdora (after 30% retail margin)
- €32 retail → Net to Verdora = €32 × 0.70 = €22.40
- €38 retail → Net to Verdora = €38 × 0.70 = €26.60
- €45 retail → Net to Verdora = €45 × 0.70 = €31.50

Step 2: Calculate Variable Cost per Unit
- Manufacturing + Packaging & Fulfillment = €9.0 + €2.5 = €11.50 (constant)

Step 3: Calculate Unit Contribution Margin
- €32 price: €22.40 - €11.50 = €10.90 per unit
- €38 price: €26.60 - €11.50 = €15.10 per unit
- €45 price: €31.50 - €11.50 = €20.00 per unit

Step 4: Calculate Total Annual Contribution
- €32 price: €10.90 × 220,000 units = €2,398,000
- €38 price: €15.10 × 170,000 units = €2,567,000
- €45 price: €20.00 × 130,000 units = €2,600,000

Step 5: Calculate Annual Profit (Contribution - Fixed Costs of €3.2M)
- €32 price: €2,398,000 - €3,200,000 = -€802,000 (loss)
- €38 price: €2,567,000 - €3,200,000 = -€633,000 (loss)
- €45 price: €2,600,000 - €3,200,000 = -€600,000 (smallest loss)

Summary Table:
Price | Net Revenue | Volume | Contribution | Profit | Unit Margin %
€32   | €22.40     | 220k   | €2.40M      | -€0.80M | 48.7%
€38   | €26.60     | 170k   | €2.57M      | -€0.63M | 56.8%
€45   | €31.50     | 130k   | €2.60M      | -€0.60M | 63.5%

Key Insights:
- All scenarios show losses (likely product ramp-up phase)
- €45 price minimizes loss and has highest unit margin (63.5%)
- €32 price generates most volume but worst financial outcome (-€802k loss)
- Current €38 price is middle ground but not optimal

Breakeven Analysis:
- At €38 price: Breakeven volume = €3.2M ÷ €15.10 = 212,000 units (25% increase needed)
- At €45 price: Breakeven volume = €3.2M ÷ €20.00 = 160,000 units (23% increase needed)

The €45 price point requires the smallest absolute volume increase to reach profitability while maintaining the strongest margins.`,
        exhibitImage: "verdora-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — What pricing action should Verdora take? Use Q1-Q2 findings to make a recommendation with rationale, financial impact, and risk management.",
        hints: [
          "Consider both short-term profitability and long-term brand positioning",
          "Think about non-price levers to drive volume at current or higher prices",
          "Evaluate channel strategy and marketing messaging",
          "Assess risks of each pricing direction"
        ],
        answer: `Recommendation: Increase price to €45 and invest in premium positioning

Financial Rationale:
- Minimizes losses in Year 1: -€600k vs -€633k (current) or -€802k (lower price)
- Best unit economics: €20 contribution per unit (63.5% margin)
- Requires only 160k units for breakeven (vs 212k at €38 price)
- Volume decline from 170k to 130k is manageable (-24%) given margin improvement
- Creates financial headroom for brand-building investment

Strategic Rationale:

1. Clear Premium Positioning
- €45 price firmly positions PureBalance in premium tier, avoiding "stuck in middle" trap
- Creates distance from mass brands (€20-25) and approaches prestige tier (€50-70)
- Aligns with eco-conscious, natural ingredient story that commands premium
- Strong unit margins fund marketing investment needed to support premium perception

2. Brand Equity Protection
- Avoids discounting spiral that trains customers to wait for promotions
- Higher price signals quality and efficacy to target urban professionals
- Protects future pricing power as brand matures
- Consistent premium messaging across channels

3. Targeted Volume Growth
- Focus on converting high-value customers rather than chasing volume
- 23% volume increase (130k → 160k) reaches breakeven with premium economics
- More achievable than 25% increase needed at €38 price

Implementation Plan:

Phase 1: Premium Repositioning (Months 1-3)
- Upgrade packaging to signal luxury: Heavier glass, premium pump, botanical illustrations
- Reformulate brand story: Emphasize rare Mediterranean botanicals, sustainable sourcing, clinical results
- Launch influencer partnerships with eco-conscious lifestyle bloggers
- Create premium in-store displays for pharmacy partners

Phase 2: Pricing Rollout (Months 4-6)
- Communicate price increase as reflecting true ingredient quality and R&D investment
- Offer loyalty program for existing customers (15% discount on subscription for first 6 months)
- Introduce smaller trial size (15ml at €22) to reduce barrier to entry
- Launch gift sets and bundles to maintain price per ml while offering value perception

Phase 3: Performance Marketing (Months 7-12)
- Digital campaigns targeting "sustainable luxury" and "conscious beauty" keywords
- Partner with select premium spas for professional endorsements
- Develop educational content on ingredient efficacy
- A/B test messaging: sustainability vs. clinical results vs. Mediterranean heritage

Channel Strategy:
- Selective distribution: Focus on premium pharmacies and concept beauty stores
- E-commerce emphasis: Higher margins, better brand control, customer data access
- Reduce reliance on promotional pressure from mass-market pharmacy chains
- Consider partnership with premium online beauty retailers (Cult Beauty, Space NK)

Risk Management:

Risk 1: Volume Decline Exceeds Projections
- Mitigation: Monitor weekly sell-through rates; prepare to introduce €38 value size if needed
- Trigger: If volume falls below 100k units in first 6 months

Risk 2: Retailer Resistance
- Mitigation: Offer improved margins (35% vs 30%) for premium placement and exclusive displays
- Alternative: Shift channel mix toward owned e-commerce (currently strong at 60% of sales)

Risk 3: Competitive Response
- Mitigation: Differentiate on specific ingredient stories and sustainability certifications
- Monitor: Track competitor pricing and promotional intensity monthly

Risk 4: Consumer Rejection of Price Increase
- Mitigation: Soft launch with existing customer base; offer transition pricing for loyalists
- Fallback: Maintain €38 SKU but create clear differentiation (size, formulation) with €45 premium version

Alternative If Premium Strategy Fails:
If after 6 months, volume falls below 110k units:
- Maintain €38 price but optimize product line architecture
- Introduce €28 "essentials" line for volume and €55 "intensive" line for prestige halo effect
- Focus on winning the middle market with superior value proposition

Why Not Lower to €32?
- Worst financial outcome: -€802k annual loss
- Damages brand equity and future pricing power
- Creates promotion dependency
- Requires 212k units for breakeven (56% increase from current)—unrealistic
- Commodity positioning in crowded market

Why Not Stay at €38?
- "Stuck in middle" positioning lacks clarity
- Second-worst financial outcome among options
- Requires significant volume increase (25%) just to break even
- No competitive advantage vs. mass brands or prestige players
- Current plateau suggests positioning confusion

Success Metrics (12-month targets):
- Unit volume: 160,000+ (breakeven threshold)
- Customer acquisition cost: <€15 per new customer
- Repeat purchase rate: >35%
- Premium channel mix: 60%+ through high-end pharmacies and owned e-commerce
- Net Promoter Score: >40

Next Steps (First 30 days):
1. Commission packaging redesign with premium aesthetics
2. Develop premium brand messaging and visual identity
3. Conduct focus groups with target segment on €45 price acceptance
4. Negotiate premium placement terms with top-tier pharmacy partners
5. Plan influencer partnership strategy with 10-15 eco-luxury content creators`
      }
    ],
    difficulty: "Advanced",
    modelSolution: `The pricing analysis reveals that Verdora's current €38 price point creates positioning ambiguity and suboptimal financial outcomes. While counterintuitive during a sales plateau, increasing price to €45 offers the best path forward by:

1. Minimizing losses through superior unit economics (€20 vs €15.10 contribution)
2. Requiring lower absolute volume to reach profitability (160k vs 212k units)
3. Creating clear premium positioning that aligns with eco-conscious brand values
4. Funding necessary marketing investment to drive growth

The volume decrease from pricing up (-24%) is more than offset by margin improvement (+32% per unit), resulting in the strongest financial position. More importantly, the €45 price signals quality and efficacy to the target segment of urban professionals willing to pay for sustainable, natural skincare.

Success depends on upgrading the entire brand experience—packaging, messaging, channel strategy—to justify and reinforce premium pricing. The recommendation includes risk mitigation through phased rollout, performance monitoring, and clear fallback options if volume targets aren't met.

This case illustrates the principle that optimal pricing isn't always about maximizing volume—sometimes value extraction from a smaller, high-quality customer base creates better financial outcomes and stronger brand equity.`,
    keyFrameworks: [
      "Value-Based Pricing",
      "Price Elasticity Analysis",
      "Contribution Margin Optimization",
      "Brand Positioning Strategy",
      "Pricing Psychology"
    ]
  },
  {
    id: "mediflow-operations-improvement",
    title: "Mediflow Devices S.L. — Operational Bottleneck Analysis",
    firm: "Operations & Process Improvement",
    type: "Operations & Process Improvement",
    background: "Mediflow Devices S.L. is a Valencia-based manufacturer of precision plastic tubing and connectors used in hospital IV sets and dialysis machines. Founded in 2008, it supplies large healthcare equipment firms across Europe. Mediflow employs 280 staff and operates a single 24-hour plant with extrusion, molding, and packaging lines. In 2024, it generated €42M in revenue with a 9% EBIT margin. Situation / Challenge: Over the past year, Mediflow has faced rising customer complaints about delayed deliveries and inconsistent product quality. On-time delivery has slipped from 95% to 86%, while scrap rates have nearly doubled. An internal audit found long setup times between production runs and uneven operator productivity. Despite installing new extrusion lines in 2023, throughput has not improved as expected. The COO believes the bottleneck may lie in the molding and assembly stages, but is uncertain where to prioritize improvements. She wants to assess which process step limits capacity and how much output could increase if the constraint were resolved. The management team aims to restore service reliability and recover lost profitability without major capital expenditure. Objective: Identify the main operational bottleneck and quantify its impact on Mediflow's total plant capacity and output.",
    question: "Identify the main operational bottleneck and quantify its impact on Mediflow's total plant capacity and output.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — Where might Mediflow's operational bottleneck lie?\nIdentify symptoms of process inefficiency and potential root causes.\nConsider: equipment utilization, setup time, rework, and labor balance.",
        hints: [
          "Look for stages with lowest OEE or highest setup/rework times.",
          "Consider how sequential processes interact.",
          "Think about capacity constraints vs. quality issues."
        ],
        answer: "Indicators point to inefficiencies in Molding: longest setup time, lowest OEE, highest rework.\nPotential root causes: tooling changeovers, maintenance scheduling, inconsistent operator skill.\nAssembly moderately constrained but likely downstream of molding delays."
      },
      {
        number: 2,
        question: "Quantitative — Which stage is constraining throughput, and what is the improvement potential?\nUse Exhibit A and assume:\n• A product must pass sequentially through all three stages (Extrusion → Molding → Assembly).\n• Each line operates 20 hours/day for 30 days/month (600 hours total).\n• The slowest stage determines plant output.\n• Target: achieve 20% higher monthly volume without new machines.",
        hints: [
          "Adjust effective capacity for OEE, rework, and setup time.",
          "Identify the stage with the lowest effective throughput.",
          "Estimate improvement needed to raise total output by 20%.",
          "Consider lean or TPM methods for root-cause mitigation."
        ],
        answer: "Effective available hours: 600 – setup time\nExtrusion = 580h, Molding = 555h, Assembly = 565h\n\nAdjusted hourly throughput = Theoretical Capacity × OEE × (1 – Rework Rate)\nExtrusion = 1,200 × 0.80 × 0.98 = 941\nMolding = 900 × 0.70 × 0.95 = 598\nAssembly = 1,000 × 0.75 × 0.97 = 728\n\nMonthly effective output = Adjusted throughput × available hours\nExtrusion = 941 × 580 = 546,000 units\nMolding = 598 × 555 = 332,000 units\nAssembly = 728 × 565 = 411,000 units\n\n→ Molding is the bottleneck (332k units/month).\n\nTo raise total output by 20%:\nTarget = 332k × 1.2 = 398k units.\nNeeded increase in molding throughput = (398k ÷ 555h) = 717 units/hr (from 598 → +20%).\nAchievable via improving OEE from 70% → ~84%, or reducing setup time by ~25 hours/month.",
        exhibitImage: "mediflow-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — What actions should management take to improve efficiency?\nRecommend immediate and medium-term process changes.\nDiscuss both operational levers and monitoring metrics.",
        hints: [],
        answer: "Short term: implement SMED (Single-Minute Exchange of Dies) to cut setup time; schedule preventive maintenance to boost uptime.\nMedium term: cross-train operators, standardize tooling, and digitize performance dashboards.\nTrack OEE, scrap rate, and changeover time weekly.\nRisks: temporary output dip during process change, workforce adaptation.\nNext steps: pilot lean improvements on one molding line, monitor impact, then scale across plant."
      }
    ],
    difficulty: "Intermediate",
    modelSolution: "This case assesses operational bottleneck identification, throughput analysis, and process improvement recommendations using OEE and capacity calculations.",
    keyFrameworks: [
      "Operations Management",
      "Theory of Constraints",
      "Lean Manufacturing",
      "OEE Analysis"
    ]
  },
  {
    id: "helion-ma-acquisition",
    title: "Helion Energy Systems S.L. — Voltrix Acquisition Analysis",
    firm: "Mergers & Acquisitions",
    type: "Mergers & Acquisitions",
    background: "Helion Energy Systems S.L. is a Madrid-based producer of industrial-grade lithium battery packs used in electric buses and construction machinery. The company has grown rapidly, reaching €85M in revenue and 14% EBIT margin in 2024. Helion's management believes growth is slowing due to limited in-house R&D capacity and dependence on imported cells. The company's strategic plan calls for vertical integration into component manufacturing and expansion into northern Europe. Situation / Challenge: Helion is evaluating the acquisition of Voltrix Components GmbH, a mid-sized German producer of high-density battery cells. Voltrix generates €60M in revenue with a 10% EBIT margin and owns patented cell chemistry that could reduce Helion's material costs by up to 12%. However, Voltrix's plant is underutilized and requires €8M in refurbishment. The deal would also expose Helion to German labor costs and integration risk. The CEO has asked for an assessment of the deal's strategic and financial attractiveness: should Helion proceed with the acquisition, and what synergies are required to make it worthwhile? Objective: Determine whether acquiring Voltrix creates sufficient strategic and financial value for Helion Energy Systems.",
    question: "Determine whether acquiring Voltrix creates sufficient strategic and financial value for Helion Energy Systems.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What factors determine whether this acquisition is attractive?\nIdentify both strategic and operational considerations.\nConsider: synergy potential, integration complexity, market access, capability fit, and financial return.",
        hints: [
          "Think about vertical integration benefits and supply chain control.",
          "Consider both hard synergies (cost savings) and soft synergies (capabilities, market access).",
          "Assess integration risks including cultural fit and operational complexity."
        ],
        answer: "Key rationale: supply security, IP ownership, cost reduction, and entry into German EV supply chain.\nRisks: cultural integration, capital expenditure, plant turnaround, and technology transfer delays.\nStrategic upside: reduced supplier dependence and enhanced R&D capability."
      },
      {
        number: 2,
        question: "Quantitative — What is the deal's expected return based on projected synergies?\nUse Exhibit A and assume:\n• Synergy = reduction in material cost for Helion (percentage shown in exhibit).\n• Post-deal fixed cost increase = €6M/year (integration + maintenance).\n• One-time refurbishment cost = €8M (depreciated over 5 years).\n• Ignore taxes and financing costs for simplicity.",
        hints: [
          "Compute annual synergy savings from material cost reduction.",
          "Add synergies to baseline EBIT, then subtract additional fixed costs.",
          "Include depreciation of refurbishment cost (€8M ÷ 5 years).",
          "Calculate new EBIT margin for each scenario."
        ],
        answer: "Current baseline:\nCombined revenue = €145M\nEBIT (pre-synergy) = 12% → €17.4M\nMaterial cost base = €90M\n\nSynergy savings:\nConservative: 6% × €90M = €5.4M\nBase: 10% × €90M = €9.0M\nOptimistic: 14% × €90M = €12.6M\n\nAdded costs:\n+€6M integration + €8M refurbishment ÷ 5 = €1.6M depreciation → total +€7.6M/year\n\nNew EBIT:\nConservative: €17.4M + €5.4M – €7.6M = €15.2M (10.5%)\nBase: €17.4M + €9.0M – €7.6M = €18.8M (13.0%)\nOptimistic: €17.4M + €12.6M – €7.6M = €22.4M (15.4%)\n\n→ Deal is value-accretive if ≥10% synergy achieved (base/optimistic cases).",
        exhibitImage: "helion-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Should Helion acquire Voltrix?\nBase your decision on both qualitative and quantitative insights.\nDiscuss key risks, integration focus areas, and next steps.",
        hints: [],
        answer: "Proceed if due diligence confirms ≥10% material cost savings and integration feasibility.\nPrioritize early integration of supply chain and R&D teams to realize synergies quickly.\nNegotiate earn-out structure or contingent pricing based on performance to mitigate risk.\nRisks: execution delays, cultural misalignment, overestimation of savings.\nNext steps: conduct technical audit of Voltrix's facility, detailed synergy validation, and scenario-based valuation."
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This case assesses M&A strategic rationale, synergy quantification, and deal valuation including integration costs and depreciation.",
    keyFrameworks: [
      "M&A Valuation",
      "Synergy Analysis",
      "Post-Merger Integration",
      "Vertical Integration Strategy"
    ]
  },
  {
    id: "castellon-turnaround",
    title: "Castellon Textiles S.L. — Operational Turnaround",
    firm: "Turnaround & Transformation",
    type: "Turnaround & Transformation",
    background: "Castellon Textiles S.L. is a mid-sized apparel manufacturer located in Castellón, Spain, producing private-label garments for European fashion retailers. The company employs 600 people and runs two production plants specializing in cotton knitwear and denim. Castellon built its reputation on quality and reliability, but over the past three years, it has lost market share to lower-cost Turkish and Moroccan suppliers. In 2024, revenue fell to €55M (–18% YoY), and EBIT margin dropped to 2% from 9% two years earlier. Situation / Challenge: The company's cost base has risen sharply due to wage inflation, energy price increases, and inefficient production scheduling. Utilization now averages only 68%, with frequent idle periods between orders. The CEO—recently appointed by the family owners—believes that Castellon needs a comprehensive operational and commercial turnaround to restore profitability within 18 months. However, the management team is divided on focus: should they prioritize cost restructuring (plant consolidation, process automation) or commercial renewal (shift toward higher-margin niche products and nearshoring clients)? The board seeks a fact-based assessment of root causes, quick wins, and the strategic levers required to stabilize and transform the business. Objective: Develop a turnaround plan that restores Castellon Textiles' EBIT margin to at least 8% within 18 months.",
    question: "Develop a turnaround plan that restores Castellon Textiles' EBIT margin to at least 8% within 18 months.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What are the key drivers of Castellon's margin erosion?\nAnalyze both internal inefficiencies and external pressures.\nConsider: cost structure, product mix, capacity utilization, and market positioning.",
        hints: [
          "Look at both external pressures (competition, input costs) and internal issues (efficiency, utilization).",
          "Consider how capacity utilization affects unit economics.",
          "Think about whether the problem is revenue decline, cost increase, or both."
        ],
        answer: "Internal: excess capacity (68% utilization), outdated scheduling, high labor cost per unit.\nExternal: energy cost inflation and margin pressure from low-cost imports.\nCommercial weakness: dependence on volume-driven contracts with thin margins."
      },
      {
        number: 2,
        question: "Quantitative — How much cost reduction is required to reach the 8% target?\nUse Exhibit A and assume:\n• 2024 revenue = €55M\n• Fixed costs remain constant at €10M\n• Target EBIT margin = 8%\n• Variable costs are detailed in Exhibit A",
        hints: [
          "Calculate current EBIT from revenue minus total costs.",
          "Compute target EBIT = 8% × €55M.",
          "Determine savings required to bridge the gap.",
          "Assess which cost categories offer the most improvement potential."
        ],
        answer: "Current situation:\nTotal costs = 24.0 + 14.5 + 4.5 + 2.0 + 10.0 = €55.0M\nEBIT = €55.0M revenue – €55.0M costs = €0 → 0% margin (near break-even).\n\nTarget EBIT (8%):\nRequired EBIT = 8% × €55M = €4.4M profit\nTherefore, total cost target = €55.0M – €4.4M = €50.6M\nSavings required = €55.0M – €50.6M = €4.4M (8% of revenue).\n\nPotential variable cost reduction (based on Exhibit):\nMaterials: €24.0M × 5% = €1.2M\nLabor: €14.5M × 15% = €2.18M\nEnergy: €4.5M × 20% = €0.9M\nLogistics: €2.0M × 10% = €0.2M\nTotal potential = €4.48M, just enough to reach target.\n\n→ Hitting benchmark efficiency across all categories would restore EBIT to ~8%.",
        exhibitImage: "castellon-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — What transformation actions should Castellon prioritize?\nUse insights from Q1–Q2 to propose short-term stabilization and medium-term transformation levers.\nDiscuss sequencing and change management implications.",
        hints: [],
        answer: "Short-term (3–6 months):\nLaunch efficiency blitz on labor scheduling and maintenance downtime.\nNegotiate new energy contracts and shift production to off-peak hours.\n\nMedium-term (6–18 months):\nConsolidate two plants into one to improve utilization above 85%.\nInvest in partial automation for repetitive processes.\nDevelop a 'sustainable cotton' niche line for premium European retailers.\n\nRisks: workforce resistance, upfront restructuring costs, demand volatility.\nNext steps: validate cost improvement roadmap, design KPI dashboard (OEE, labor cost/unit), and align management incentives with transformation milestones."
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This case assesses turnaround strategy through cost structure analysis, efficiency benchmarking, and prioritization of operational and commercial levers.",
    keyFrameworks: [
      "Cost Structure Analysis",
      "Operational Efficiency",
      "Capacity Utilization",
      "Turnaround Management"
    ]
  },
  {
    id: "maison-dubois-ma",
    title: "Maison Dubois — Concrete Streetwear Acquisition",
    firm: "Mergers & Acquisitions",
    type: "Mergers & Acquisitions",
    background: "Maison Dubois is a 120-year-old Parisian luxury fashion house known for its haute couture, leather goods, and classic elegance. While financially stable with €2.5B in revenue and 22% EBITDA margin, the brand has struggled to connect with Gen Z consumers. The Board feels the brand is aging and missing out on the 'hype economy.' Situation / Challenge: Maison Dubois is considering acquiring 'Concrete,' a London-based streetwear startup that has grown explosively in the last 3 years. Concrete is known for limited 'drops,' celebrity collaborations, and a cult-like digital following. Concrete's Financials: €150M revenue, growing 40% YoY, but currently operating at break-even (0% margin) due to heavy reinvestment. The Deal: Concrete's founders are asking for €600M to sell 100% of the company. The Conflict: The Maison Dubois CFO thinks the price is absurd (4x revenue for a zero-profit company). The CMO believes it's a necessary survival play to capture the next generation. Objective: Evaluate the acquisition of Concrete. Is the €600M valuation justifiable, and what are the risks of integrating such different cultures?",
    question: "Evaluate the acquisition of Concrete. Is the €600M valuation justifiable, and what are the risks of integrating such different cultures?",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What creates value in this deal?\nIdentify the potential revenue and cost synergies.\nConsider the intangible benefits (Brand Halo) vs. risks (Brand Dilution).",
        hints: [
          "Think about operational synergies: supply chain, distribution, manufacturing.",
          "Consider revenue synergies: cross-selling, market access, customer base expansion.",
          "Evaluate intangible factors: brand perception, cultural fit, innovation capability.",
          "Assess risks: cultural clash, brand dilution, execution challenges."
        ],
        answer: "Potential Synergies:\n\nCost Synergies:\n- Supply chain integration: Using Maison Dubois's factories and leather sourcing to lower Concrete's COGS (Concrete currently uses expensive contract manufacturers)\n- Operational efficiency: Leverage established manufacturing relationships and economies of scale\n- Reduced procurement costs through combined purchasing power\n\nRevenue Synergies:\n- Distribution expansion: Selling Concrete products in Maison Dubois's global flagship stores\n- Market access: Concrete gains entry to Asian and Middle Eastern luxury markets\n- Cross-brand collaboration: Limited edition luxury streetwear collections\n- Digital capabilities: Concrete's social media and influencer marketing expertise applied to Maison Dubois\n\nIntangible Benefits:\n- Brand halo: Maison Dubois gains 'cool factor' and Gen Z relevance\n- Innovation infusion: Streetwear agility and drop culture energizes traditional brand\n- Talent acquisition: Access to digital-native creative talent\n- Future-proofing: Hedging against luxury market shifts toward casual\n\nKey Risks:\n- Cultural clash: 'Suits vs. Skaters' - corporate bureaucracy could kill Concrete's authenticity and cool factor\n- Brand dilution: High-end luxury customers might be alienated by mass-market streetwear association\n- Integration complexity: Balancing autonomy (preserve culture) vs. integration (capture synergies)\n- Overpayment risk: High valuation for unproven profitability\n- Talent retention: Founders and key designers may leave post-acquisition"
      },
      {
        number: 2,
        question: "Quantitative — Can we justify the €600M price tag?\nUse the projected financials below and assume:\n• Acquisition leads to cost synergies (supply chain integration) starting in Year 1\n• Revenue continues to grow at projected rates\n• Calculate total EBITDA generated over the next 5 years (cumulative)\n• Does the 5-year cumulative EBITDA cover at least 50% of the purchase price?\n\nConcrete Financial Projections (Post-Acquisition with Synergies):\nYear 1: Revenue €200M, EBITDA Margin 10%\nYear 2: Revenue €250M, EBITDA Margin 15%\nYear 3: Revenue €300M, EBITDA Margin 20%\nYear 4: Revenue €350M, EBITDA Margin 25%\nYear 5: Revenue €400M, EBITDA Margin 25%",
        hints: [
          "Calculate EBITDA in Euros for each year (Revenue × Margin).",
          "Sum the 5 years of EBITDA to get cumulative cash generation.",
          "Compare the sum to the €600M asking price.",
          "Consider: does 5-year cash flow justify the valuation, or is a strategic premium required?"
        ],
        answer: "EBITDA Calculations:\n\nYear 1: €200M × 10% = €20M\nYear 2: €250M × 15% = €37.5M\nYear 3: €300M × 20% = €60M\nYear 4: €350M × 25% = €87.5M\nYear 5: €400M × 25% = €100M\n\nCumulative 5-Year EBITDA: €20M + €37.5M + €60M + €87.5M + €100M = €305M\n\nValuation Assessment:\n- Cumulative 5-year EBITDA: €305M\n- Purchase price: €600M\n- Coverage ratio: €305M ÷ €600M = 50.8%\n\nConclusion:\nThe cumulative cash flow (€305M) covers only ~51% of the asking price (€600M). Based purely on 5-year EBITDA, the valuation appears stretched.\n\nTo justify €600M, you would need:\n- Significant terminal value beyond Year 5 (assuming continued growth and higher margins)\n- Strategic premium for intangible benefits (brand repositioning, Gen Z access)\n- Additional revenue synergies not captured in base projections\n\nThe €600M price implies either:\n- Very strong growth beyond Year 5, or\n- A substantial strategic premium for non-financial benefits\n\nRisk Assessment: The valuation is aggressive and leaves limited margin for execution risk or market changes."
      },
      {
        number: 3,
        question: "Recommendation — Buy, Partner, or Build?\nShould Maison Dubois acquire Concrete for €600M?\nIf not, propose an alternative structure (e.g., Minority Stake, Joint Venture).",
        hints: [],
        answer: "Recommendation: DO NOT acquire 100% at €600M. Pursue a strategic partnership or minority stake instead.\n\nRationale:\n\nFinancial:\n- Valuation too high: 5-year EBITDA covers only 51% of purchase price\n- Limited margin of safety for execution risks\n- Break-even current profitability increases risk\n- Would require €600M upfront for uncertain returns\n\nStrategic:\n- Cultural integration risk is extremely high (luxury vs. streetwear cultures)\n- Full acquisition could destroy Concrete's authenticity and 'cool factor'\n- Concrete's value depends on maintaining entrepreneurial agility\n- Corporate ownership might alienate Gen Z customer base\n\nCounter-Proposal: Minority Stake (20-30%) + Strategic Partnership\n\nStructure:\n- Investment: €120M-€180M for 20-30% stake (valuing Concrete at €600M)\n- Board seat and strategic input rights\n- Exclusive distribution agreement for Maison Dubois stores\n- Co-development of limited capsule collections\n- Option to acquire majority stake in 3-5 years based on performance milestones\n\nBenefits:\n- Lower capital at risk (€120-180M vs €600M)\n- Preserves Concrete's independence and culture\n- Keeps founders incentivized with significant ownership\n- Tests Gen Z strategy without betting the house\n- Option value: buy more later if successful, walk away if not\n- Maintains Concrete's brand authenticity\n\nAlternative: Build Internal\n- Launch 'Dubois Street' sub-brand internally\n- Hire streetwear design talent\n- Lower cost (~€50M investment over 3 years)\n- Higher execution risk, longer time to market\n\nNext Steps:\n1. Negotiate minority stake structure with Concrete founders\n2. Define collaboration terms (distribution, co-branding)\n3. Establish performance milestones for future acquisition option\n4. Create governance structure that preserves Concrete autonomy\n5. Plan integration safeguards to protect both brand identities"
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This case assesses M&A valuation judgment, synergy analysis, cultural integration risks, and strategic alternatives to full acquisition in cross-industry deals.",
    keyFrameworks: [
      "M&A Valuation",
      "Synergy Analysis",
      "DCF / EBITDA Multiples",
      "Cultural Integration",
      "Strategic Alternatives"
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
