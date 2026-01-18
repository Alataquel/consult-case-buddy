// Real consulting case studies organized by problem type

export interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
  answerImage?: string;
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
    difficulty: "Beginner",
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
  
  // PROFITABILITY & COST OPTIMIZATION - FreshRoute
  {
    id: "freshroute-profitability",
    title: "FreshRoute Logistics — Route Profitability Audit",
    firm: "Profitability & Cost Optimization",
    type: "Profitability & Cost Optimization",
    background: `FreshRoute Logistics, based in Lyon, France, operates a fleet of 500 refrigerated trucks. They transport perishable goods (pharmaceuticals and fresh food) for supermarket chains and hospital networks across France and the Benelux region. The company has a reputation for 99% on-time reliability.

FreshRoute's revenue has grown 10% YoY due to high demand for cold-chain transport. However, the Board is alarmed because Net Profit Margin has collapsed from 8% to 1.5% in just 12 months.

The COO blames rising diesel prices and driver wage inflation. The CFO, however, notes that competitors facing the same macro costs have maintained margins of ~6%.

They have hired you to audit their route profitability. They suspect the issue lies in "Operational Efficiency"—specifically, how effectively they utilize the fleet.`,
    question: "Identify the root cause of the margin collapse and propose specific measures to restore the 8% margin target.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What drives profit in trucking?\nBrainstorm the cost and revenue drivers for a logistics firm.\nKey Concept to explore: \"Utilization\" (is the truck full?) and \"Empty Miles\" (is the truck driving without paying cargo?).",
        hints: [
          "Consider revenue drivers: price per km, surcharges, ancillary fees",
          "Consider cost drivers: fuel, driver wages, tolls, maintenance",
          "Think about the 'Empty Leg' problem - if a truck drives 500km to deliver but returns 500km empty, revenue must cover 1,000km of costs"
        ],
        answer: `Revenue Drivers:
- Price per km
- Surcharges (fuel/weekend)
- Ancillary fees (loading/unloading)

Cost Drivers:
- Variable: Fuel (highest), Driver Wages (hourly/per km), Tolls, Tires/Maintenance
- Fixed: Truck lease/depreciation, Insurance, HQ Staff

Efficiency Metric: The "Empty Leg" problem. If a truck drives 500km to deliver goods but returns 500km empty, the revenue must cover 1,000km of costs.

The drop in margin suggests FreshRoute is driving too many empty kilometers. While competitors face the same fuel and wage inflation, they may have better backhaul rates (finding paying cargo for return trips).`
      },
      {
        number: 2,
        question: "Quantitative — Which route type is destroying value?\nUse Exhibit A to calculate the Profit per Round-Trip for the two main route categories.\n\nNote:\n• Trucks must return to the depot\n• Sometimes they find a \"Backhaul\" (paying cargo for the return trip)\n• Sometimes they return \"Empty\" (earning €0 but still incurring costs)",
        hints: [
          "Calculate the economics of a Full Round Cycle (Outbound + Return)",
          "Weighted Return Revenue = (Revenue × Success Rate) + (€0 × Empty Rate)",
          "Weighted Return Cost = (Cost Loaded × Success Rate) + (Cost Empty × Empty Rate)",
          "Compare total round-trip profit for each route type"
        ],
        answer: `Route Type A: "Regional" (Short-Haul)

Outbound Profit: €600 (Rev) - €450 (Cost) = €150

Return Trip (Weighted):
- Scenario 1 (90% - Loaded): Profit = €600 - €450 = €150
- Scenario 2 (10% - Empty): Profit = €0 - €300 = -€300 (Loss)
- Avg Return Profit: (150 × 0.90) + (-300 × 0.10) = 135 - 30 = €105

Total Round-Trip Profit: €150 (Out) + €105 (Return) = €255 per trip
Margin: High positive contribution

---

Route Type B: "Long-Haul" (Cross-Country)

Outbound Profit: €1,800 (Rev) - €1,400 (Cost) = €400

Return Trip (Weighted):
- Scenario 1 (40% - Loaded): Profit = €1,800 - €1,400 = €400
- Scenario 2 (60% - Empty): Profit = €0 - €1,000 = -€1,000 (Huge Loss)
- Avg Return Profit: (400 × 0.40) + (-1,000 × 0.60) = 160 - 600 = -€440

Total Round-Trip Profit: €400 (Out) + (-€440 Return) = -€40 per trip

---

Conclusion:
FreshRoute is losing money on every Long-Haul trip (-€40) because the high outbound revenue (€1,800) cannot subsidize the 60% of the time the truck returns empty. The Short-Haul routes are subsidizing the Long-Haul fleet.`,
        exhibitImage: "freshroute-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — How do we fix the bleeding?\nBased on Q2, recommend operational or commercial changes.\nConsider trade-offs: Should we raise prices, drop routes, or change operational scheduling?",
        hints: [
          "Consider immediate actions vs. strategic shifts",
          "Think about pricing, operational changes, and technology solutions",
          "Evaluate the trade-offs of each recommendation"
        ],
        answer: `Immediate Action: Stop or Reprice Long-Haul

Option 1 (Pricing): Raise Long-Haul prices by ~20% to cover the empty leg risk.
- Pros: Maintains volume if customers accept
- Cons: May lose price-sensitive customers to competitors

Option 2 (Operational - "Triangulation"): Don't come straight back. Find a load from Destination B to City C, then City C to Home.
- Pros: Utilizes truck capacity, turns empty miles into revenue
- Cons: Requires coordination, may increase delivery time

Strategic Shift: Focus sales efforts on routes where Backhauls are guaranteed (Regional).
- Shift fleet allocation from Long-Haul to Regional
- Regional routes generate €255 profit vs. -€40 loss
- Target: Reduce Long-Haul from 800 to 400 trips/month

Digital Platform: Invest in a "freight matching" digital marketplace to find spot-market loads for empty return trucks.
- Even discounted loads (€500 instead of €1,800) would be better than empty
- At €500 revenue: €500 - €1,400 = -€900 loss vs. -€1,000 empty
- Over time, improve backhaul success rate from 40% to 60%+

Implementation Priority:
1. Immediately reprice Long-Haul routes (+15-20%)
2. Launch triangulation program for top 10 Long-Haul routes
3. Build/buy freight matching platform (6-month project)
4. Reallocate fleet capacity toward Regional routes`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The margin collapse is driven by the "Empty Leg" problem on Long-Haul routes. While outbound trips generate €400 profit, the 60% empty return rate creates -€440 average return loss, resulting in -€40 per round trip.

Regional routes with 90% backhaul success generate €255 profit per round trip. The solution requires repricing Long-Haul routes, implementing triangulation (multi-stop returns), and investing in freight matching technology to improve backhaul rates.

The key insight is that high outbound revenue can mask unprofitable routes when return economics are ignored.`,
    keyFrameworks: [
      "Route Profitability Analysis",
      "Utilization & Empty Miles",
      "Weighted Average Economics",
      "Operational Efficiency",
      "Pricing Strategy"
    ]
  },
  
  // PROFITABILITY & COST OPTIMIZATION - VitaFresh
  {
    id: "vitafresh-profitability",
    title: "VitaFresh Markets — Channel Profitability Crisis",
    firm: "Profitability & Cost Optimization",
    type: "Profitability & Cost Optimization",
    background: `VitaFresh Markets is a premium organic grocery chain in Northern Italy. They operate 40 physical stores and recently launched a rapid "Home Delivery" service to compete with Amazon Fresh and Getir. The brand is strong, known for high-quality local produce and wealthy clientele.

In 2024, VitaFresh grew its total revenue by 20% thanks to the explosion of its online delivery segment. However, the Board is in crisis mode: Overall Operating Profit dropped by 40%.

The CEO doesn't understand. "We are selling more groceries than ever, our basket sizes are huge, and our gross margins on food are stable at 40%. Why are we bleeding cash?"

You have been hired to analyze the profitability of the In-Store vs. Online channels and fix the broken business model.`,
    question: "Diagnose the source of the profit decline and propose a strategy to make the Online channel sustainable within 12 months.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — Where is the leakage?\nAnalyze the cost structure of selling a banana in a store vs. delivering it to a house.\nKey Concept: \"Cost to Serve.\" Identify the additional steps in online fulfillment (picking, packing, last-mile delivery) that do not exist in the physical store model.",
        hints: [
          "In a store, the customer does the 'picking' (walking the aisles) and 'delivery' (driving home) for free",
          "Online, VitaFresh must pay for these services",
          "Think about which costs are truly variable vs. allocated"
        ],
        answer: `The Problem: "Channel Shift." Customers are switching from the high-margin In-Store channel to the Online channel.

Cost Drivers Comparison:

In-Store:
- Customer does picking (walks aisles) → FREE
- Customer does delivery (drives home) → FREE
- VitaFresh pays: COGS, cashier labor, rent

Online:
- VitaFresh pays for picking (€6/order)
- VitaFresh pays for delivery (€12/order)
- VitaFresh pays: COGS, reduced store labor, rent/tech

The Key Insight: Unless VitaFresh charges adequately for these additional services, margins will collapse even as revenue grows. The €3 delivery fee doesn't cover the €12 actual delivery cost.`
      },
      {
        number: 2,
        question: "Quantitative — Is Online actually profitable?\nUse Exhibit A to calculate the Operating Profit (EBIT) per order for both channels.\nDetermine: Is the Online channel simply less profitable, or is it value-destructive (negative profit)?",
        hints: [
          "Calculate Total Revenue for Online (Basket + Fee)",
          "Calculate Gross Profit first (Revenue - COGS)",
          "Subtract all variable and fixed allocated costs to find Net Operating Profit",
          "Watch out for: The illusion of the higher basket size (€70 vs €40)"
        ],
        answer: `Channel A: In-Store

Revenue: €40.00
COGS: €40 × 60% = €24.00
Gross Margin: €16.00
OpEx: €3.00 (Labor) + €4.00 (Rent) = €7.00
Operating Profit: €16.00 - €7.00 = €9.00 per order
Margin %: €9 / €40 = 22.5%

---

Channel B: Online Delivery

Revenue: €70.00 (Basket) + €3.00 (Fee) = €73.00
COGS: €70 × 60% = €42.00
Gross Margin: €73 - €42 = €31.00
OpEx:
- Store Stocking Labor: €2.00
- Picking Labor: €6.00
- Delivery Cost: €12.00
- Rent/Tech: €2.00
- Total OpEx: €22.00
Operating Profit: €31.00 - €22.00 = €9.00 per order
Margin %: €9 / €73 = 12.3%

---

Variable Contribution Analysis:

In-Store Contribution: €40 - €24 - €3 = €13
Online Contribution: €73 - €42 - €2 - €6 - €12 = €11

Conclusion: Every time a customer switches from Store to Online, VitaFresh loses €2 in contribution (€13 → €11), despite the basket being €30 larger! This explains the profit decline.

The larger basket creates an illusion of success, but the additional €18 in delivery-related costs more than offsets the volume benefit.`,
        exhibitImage: "vitafresh-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — How do we fix the mix?\nBased on your math, what should VitaFresh do?\nConsider levers: Pricing (delivery fees), Operational (Click & Collect), or Strategic (minimum order values).",
        hints: [
          "Think about ways to reduce the €12 delivery cost or increase delivery revenue",
          "Consider customer behavior incentives",
          "Evaluate operational alternatives to home delivery"
        ],
        answer: `1. Incentivize "Click & Collect" (Highest Impact)

Offer a €5 coupon if customers pick up their own bags.
- Removes the €12 delivery cost entirely
- New Online Contribution: €73 - €42 - €2 - €6 - €2 + €5 coupon cost = €16
- vs. €11 current Online or €13 In-Store
- Even with the coupon cost, this is more profitable than home delivery

2. Dynamic Delivery Pricing

The current €3 delivery fee is too low compared to the €12 cost.
- Raise fee to €7 for small baskets (<€100)
- Keep €3 for large baskets (€100+) to encourage higher order values
- At €7 fee: Online profit increases from €9 to €13 per order

3. Minimum Order Value

Implement €50 minimum for home delivery.
- Larger baskets spread the €12 delivery cost more efficiently
- Customers below €50 directed to Click & Collect or In-Store

4. Dark Stores (Medium-term)

If online volume is high enough, move picking to a dedicated warehouse.
- Optimized layout reduces picking time
- Picking costs could drop from €6 to €3
- Requires significant volume to justify fixed costs

Implementation Priority:
1. Launch Click & Collect with €5 incentive (Week 1)
2. Raise delivery fees to €5-7 based on basket size (Month 1)
3. Implement €50 minimum order value (Month 2)
4. Evaluate Dark Store investment at 6-month review`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The profit decline is caused by channel cannibalization. While both channels generate €9 operating profit per order, the Online channel has lower contribution margin (€11 vs €13), meaning every customer switch destroys €2 of value.

The solution involves multiple levers: incentivizing Click & Collect to eliminate delivery costs, raising delivery fees closer to true cost, and implementing minimum order values. The key insight is that higher basket sizes can mask unprofitable unit economics when fulfillment costs are ignored.`,
    keyFrameworks: [
      "Channel Profitability Analysis",
      "Cost to Serve",
      "Contribution Margin",
      "Unit Economics",
      "Channel Mix Optimization"
    ]
  },
  
  // PROFITABILITY & COST OPTIMIZATION - UrbanBrew
  {
    id: "urbanbrew-profitability",
    title: "UrbanBrew Coffee — Menu Economics Crisis",
    firm: "Profitability & Cost Optimization",
    type: "Profitability & Cost Optimization",
    background: `UrbanBrew, a chain of 60 premium coffee shops in London and Manchester, targets busy office workers. They are known for high-quality espresso and speed of service.

Last year, facing stagnation in coffee sales, UrbanBrew launched a new "Fresh Lunch" menu (gourmet sandwiches, salads, and hot wraps) to increase the "Average Ticket Size."

The strategy worked: Average Ticket Size jumped from £4.50 to £7.00. Revenue is up 15%.

However, Net Profit has fallen by 10%. Customer complaints about long wait times have skyrocketed, and the morning "coffee rush" queues are moving slower than ever.

The CEO is confused: "We are selling more expensive items. Why are we making less money?"`,
    question: "Analyze the unit economics of the new Lunch menu versus the core Coffee product and recommend a strategy to restore profitability.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What are the hidden costs of food?\nBeyond just the cost of ingredients, what impacts the profitability of selling a hot sandwich vs. a latte in a small shop?\nKey Concepts: Throughput (Service Speed), Waste (Perishables), and Labor Intensity.",
        hints: [
          "Consider how long each product takes to make",
          "Think about shelf life differences between coffee beans and fresh sandwiches",
          "Consider opportunity cost: what else could staff be making?"
        ],
        answer: `The "Throughput" Trap:
The Panini takes 4x longer to make (4 mins vs 1 min). In a busy morning rush, selling one Panini blocks the barista from selling 4 Lattes.

Waste:
Coffee beans have a long shelf life. Fresh gourmet sandwiches spoil daily. A 15% waste rate is a massive hidden cost that doesn't appear in simple COGS calculations.

Cannibalization:
Are customers buying a Sandwich instead of a Coffee, or with a Coffee? If they switch from a high-margin drink to a low-margin food item, overall profit drops even if ticket size increases.

Labor Intensity:
Hot sandwiches require active staff attention (heating, assembly, plating). Espresso machines can work semi-autonomously once the barista initiates the pull.`,
        exhibitImage: "urbanbrew-bcg-exhibit"
      },
      {
        number: 2,
        question: "Quantitative — Which customer is more valuable?\nUse Exhibit A to calculate the Net Margin per unit for a \"Signature Latte\" vs. a \"Gourmet Panini.\"\nCrucial Step: Factor in the cost of Waste and Labor Time.",
        hints: [
          "Effective COGS with Waste: Actual Ingredient Cost = COGS × (1 + Waste Rate)",
          "Labor Cost = Prep Time × Cost per Minute",
          "Contribution Margin = Selling Price - Ingredients (w/ waste) - Packaging - Labor",
          "Think about Opportunity Cost: How many Lattes could you make in the time it takes to heat one Panini?"
        ],
        answer: `Product A: Signature Latte

Revenue: £3.50
Ingredients (adj. for waste): £0.50 × 1.02 = £0.51
Packaging: £0.10
Labor: 1 min × £0.20 = £0.20
Total Variable Cost: £0.51 + £0.10 + £0.20 = £0.81
Net Contribution: £3.50 - £0.81 = £2.69
Margin %: £2.69 / £3.50 = 77%

---

Product B: Gourmet Panini

Revenue: £6.50
Ingredients (adj. for waste): £2.50 × 1.15 = £2.875 (≈ £2.88)
Packaging: £0.30
Labor: 4 mins × £0.20 = £0.80
Total Variable Cost: £2.88 + £0.30 + £0.80 = £3.98
Net Contribution: £6.50 - £3.98 = £2.52
Margin %: £2.52 / £6.50 = 39%

---

The Insight:

Shocking Result: UrbanBrew makes LESS absolute profit (£2.52 vs £2.69) on the £6.50 sandwich than on the £3.50 coffee!

The Throughput Killer: In the 4 minutes it takes to earn £2.52 from a Panini, the staff could have made 4 Lattes, earning 4 × £2.69 = £10.76.

The Panini is destroying value during peak hours by blocking high-margin coffee production.`,
        exhibitImage: "urbanbrew-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Menu Engineering\nShould UrbanBrew keep the lunch menu?\nPropose 2-3 specific changes to the menu or operations to fix the margin erosion.",
        hints: [
          "Consider time-of-day restrictions",
          "Think about prep time reduction strategies",
          "Evaluate pricing adjustments"
        ],
        answer: `1. "Kill" the Complexity During Peak Hours

Remove the "Hot Panini" from the menu during the morning rush (8 AM - 11 AM).
- It slows down the line too much
- Opportunity cost is 4 Lattes (£10.76) vs 1 Panini (£2.52)
- Staff can focus on high-margin, fast-turnover coffee drinks

2. Pre-Packaged "Grab & Go"

Switch to cold sandwiches or pre-warmed items that require 0 minutes of prep time at the counter.
- Reduces Labor cost from £0.80 to £0
- Improves throughput dramatically
- New contribution: £6.50 - £2.88 - £0.30 = £3.32 (vs £2.52)
- Now beats the Latte in absolute profit AND doesn't block production

3. Reduce Waste Through Menu Simplification

15% waste is too high.
- Simplify the menu to 3 core sandwiches (instead of 10 options)
- Improves inventory turnover and forecasting accuracy
- Target waste rate: 5-7%
- At 7% waste: ingredient cost drops from £2.88 to £2.68

4. Pricing Adjustment (If Hot Panini Stays)

If the hot Panini remains on the menu, the price must rise to £8.50 to justify the labor/time usage.
- At £8.50: Contribution = £8.50 - £3.98 = £4.52
- Still takes 4 minutes, but now generates more than the Latte
- Or restrict to "Lunch Only" (12 PM - 2 PM) when coffee rush has passed

Implementation Priority:
1. Immediate: Remove hot items from AM menu
2. Week 2: Launch Grab & Go cold sandwich line
3. Month 1: Simplify menu to reduce waste
4. Month 2: Test premium pricing for remaining hot items`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The profit decline stems from the "Throughput Trap" - hot food items take 4x longer to prepare than coffee, blocking high-margin production during peak hours. Despite higher ticket prices, the Panini generates less absolute profit (£2.52) than a Latte (£2.69) while consuming 4x the staff time.

The solution involves removing time-intensive items during peak hours, switching to grab-and-go formats, and simplifying the menu to reduce waste. The key insight is that revenue and ticket size can mask throughput-destroying products.`,
    keyFrameworks: [
      "Unit Economics Analysis",
      "Throughput & Capacity",
      "Waste & Spoilage Costs",
      "Opportunity Cost",
      "Menu Engineering"
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
    difficulty: "Beginner",
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

  // MARKET ENTRY - DataSafe
  {
    id: "datasafe-market-entry",
    title: "DataSafe Tech — Brazil Market Entry Strategy",
    firm: "Market Entry",
    type: "Market Entry",
    background: `DataSafe Tech is a successful, high-end secure external hard drive manufacturer based in Seattle, USA. Their products are premium, focusing on military-grade encryption and cloud integration. The company enjoys a robust 35% EBITDA margin domestically.

DataSafe has saturated the US and Western European markets. Their strategic focus is now Brazil, a country with a massive, untapped corporate market and high demand for data security. However, Brazil presents two major hurdles:

High Tariffs: Imported electronics face duties and taxes up to 40% of the product cost.
Complex Logistics: Navigating local regulations, customs, and distribution is extremely difficult without local expertise.

DataSafe is evaluating two market entry models:
Model A (Direct Import / D2C): Maintain full control over branding and sales by importing finished units.
Model B (Local Licensing / Partner): License the technology and design to a local Brazilian electronics manufacturer (Partner) who handles production, distribution, and local compliance, splitting the profit.`,
    question: "Determine which entry model provides the highest net profit potential within the first three years, justifying the chosen strategy with qualitative factors.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What are the core risks of each model?\nAnalyze the strategic trade-offs between Control (Model A) and Scale/Speed (Model B).\nConsider: Supply chain friction, brand risk, political/regulatory complexity, and required capital investment.",
        hints: [
          "Think about FX and tariff risks vs. operational/quality risks",
          "Consider speed to market for each model",
          "Evaluate brand control implications",
          "Assess scale potential given pricing constraints"
        ],
        answer: `Model A: Direct Import (D2C)

Risk Profile: High FX/Tariff Risk; Low Operational Risk
- Currency fluctuations can significantly impact margins
- 40% tariff creates major cost disadvantage
- However, DataSafe maintains full quality control

Speed to Market: Slower
- Customs clearance delays
- Need to establish warehousing and distribution
- Regulatory compliance burden falls on DataSafe

Brand Control: High
- Owns all marketing and pricing decisions
- Direct customer relationships
- Consistent brand experience

Scale Potential: Low
- Tariffs restrict competitive pricing (€250 vs competitors at €150-180)
- Limited to premium/enterprise segment only
- Volume constrained by price ceiling

---

Model B: Local Licensing (Partner)

Risk Profile: Low FX/Tariff Risk; High Brand/Quality Risk
- Local production avoids tariffs entirely
- But quality control depends on partner's execution
- Brand reputation at risk if partner underperforms

Speed to Market: Faster
- Leverages existing partner infrastructure
- Partner handles local compliance
- Established distribution channels

Brand Control: Low
- Dependent on Partner's sales team quality
- Limited pricing control
- Risk of brand dilution

Scale Potential: High
- Competitive price point (€180)
- Better distribution reach
- Access to mid-market corporate segment`,
        exhibitImage: "datasafe-diagnostic-exhibit"
      },
      {
        number: 2,
        question: "Quantitative — Which model yields higher annual profit?\nUse Exhibit A to calculate the Annual Net Operating Profit for each model, assuming Year 1 volumes are achieved.\nNote: Use the variable costs and the specific royalty structure provided.",
        hints: [
          "Model A Total Variable Cost must include COGS, Tariffs, and Shipping",
          "Model B Total Variable Cost is the Local COGS + Shipping",
          "The 25% Royalty is subtracted from the Selling Price before DataSafe receives its revenue",
          "Don't forget to subtract Fixed Overhead from Total Contribution"
        ],
        answer: `Model A: Direct Import (D2C)

Total Variable Cost per Unit:
TVC = COGS + Tariff + Shipping
TVC = €100 + (€100 × 0.40) + €10 = €150

Contribution per Unit: €250 - €150 = €100
Total Annual Contribution: 20,000 units × €100 = €2,000,000
Net Profit (EBIT): €2,000,000 - €1,200,000 (Fixed) = €800,000

---

Model B: Local Licensing (Partner)

Partner Royalty Cost: €180 × 0.25 = €45
DataSafe Net Revenue per Unit: €180 - €45 = €135

DataSafe Variable Cost per Unit:
TVC = Local COGS + Shipping = €110 + €5 = €115

Contribution per Unit: €135 - €115 = €20
Total Annual Contribution: 50,000 units × €20 = €1,000,000
Net Profit (EBIT): €1,000,000 - €500,000 (Fixed) = €500,000

---

Conclusion:

Model A (Direct Import) yields higher Net Profit: €800,000 vs €500,000

Despite:
- Heavy 40% tariffs
- Lower volume (20,000 vs 50,000 units)
- Higher fixed overhead (€1.2M vs €500K)

Model A wins because:
- Higher contribution margin (€100 vs €20 per unit)
- Premium pricing power preserved
- The 25% partner royalty + higher local COGS erode Model B's scale advantage`,
        answerImage: "datasafe-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Which strategic door should DataSafe open?\nJustify the final choice based on the quantitative result and the qualitative assessment of risk (Q1).\nDiscuss how DataSafe can mitigate the primary drawback of the chosen model.",
        hints: [
          "Consider both short-term profitability and long-term strategic positioning",
          "Think about hybrid approaches or phased strategies",
          "Address the main risks of your chosen model"
        ],
        answer: `Recommendation: Pursue Model A (Direct Import) for the short term

Justification:

Financial: Model A yields 60% higher profit (€800K vs €500K) despite heavy tariffs and lower volume. The math is clear—the high partner royalty (25%) and higher local COGS (€110 vs €100) in Model B erode the financial gain from higher volume.

Strategic Fit: DataSafe's core competency is premium, high-margin products. Model A preserves this positioning and maintains full control over brand, pricing, and customer relationships.

Risk Profile: While Model A has FX/tariff exposure, Model B's quality and brand risks could permanently damage DataSafe's premium reputation—a harder problem to fix.

---

Mitigation Strategy (Addressing Model A's Risks):

1. Tariff/Logistics Optimization
- Partner with specialized 3rd-party logistics (3PL) firm in Brazil
- Reduce fixed overhead from €1.2M toward €800K
- Leverage 3PL's customs expertise for faster clearance

2. Currency Hedging
- Lock in EUR/BRL rates for 6-12 months
- Price in USD to reduce conversion risk
- Build 10-15% currency buffer into pricing

3. Long-Term Hybrid Strategy
Use Model A's initial profits to fund a deep-dive study on establishing a small local assembly plant ("Model C"):
- Import core encrypted components (high-value, low-volume)
- Local assembly of chassis and packaging
- Avoids most tariffs while maintaining quality control
- Timeline: Year 2-3 feasibility study, Year 4 pilot

4. Phased Volume Growth
- Year 1: 20,000 units via D2C
- Year 2: Expand to 30,000 units with 3PL efficiency gains
- Year 3: Evaluate local assembly plant based on demand patterns

Why Not Model B?
The 25% royalty combined with higher local COGS creates a "volume trap"—DataSafe would need 2.5x more volume just to match Model A's profit. The partner also controls the customer relationship, limiting DataSafe's strategic flexibility.`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The quantitative analysis reveals that Model A (Direct Import) yields 60% higher profit (€800K vs €500K) despite heavy tariffs. The partner royalty and higher local production costs in Model B erode the benefits of 2.5x higher volume.

The recommendation is to pursue Model A while mitigating tariff/logistics risks through 3PL partnerships and currency hedging. Long-term, DataSafe should use Model A profits to explore a hybrid local assembly option that preserves quality control while avoiding tariffs.

The key insight is that volume doesn't always compensate for margin erosion—a premium brand should preserve its pricing power rather than chase scale.`,
    keyFrameworks: [
      "Market Entry Strategy (Build/Buy/Partner)",
      "Unit Economics Comparison",
      "Tariff & Trade Analysis",
      "Risk Assessment",
      "Control vs. Scale Trade-offs"
    ]
  },

  // MARKET ENTRY - VedaHealth
  {
    id: "vedahealth-market-entry",
    title: "VedaHealth Indonesia Market Entry",
    firm: "Market Entry",
    type: "Market Entry",
    background: `VedaHealth is a Singapore-based HealthTech firm that has developed an AI-powered diagnostic tool for primary care clinics. Their software analyzes blood samples and patient vitals to predict chronic respiratory conditions with 94% accuracy. In Singapore, they operate on a high-subscription "SaaS" model with premium private hospitals.

VedaHealth wants to enter Indonesia, a country with 275 million people spread across thousands of islands. Indonesia's healthcare system is currently undergoing a massive digital transformation, but rural access remains a challenge.

The CEO is evaluating two distinct entry strategies:

Option A: Private Hospital Partnership (B2B). Partner with the top three private hospital groups in Jakarta and Surabaya. This targets the growing middle class who pay for premium care.

Option B: National Rural Outreach (B2G). Work with the Indonesian Ministry of Health to deploy a "lite" version of the app in 5,000 Puskesmas (government-run community health centers) across rural provinces.`,
    question: "Evaluate which strategy—Private B2B or Public B2G—is more financially and strategically viable for VedaHealth's first two years in Indonesia.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What are the entry barriers in a fragmented market?\nDiscuss the challenges of entering a market like Indonesia (Geography, Regulation, Infrastructure).\nCompare the \"Sales Cycle\" of a private hospital group versus a national government ministry.",
        hints: [
          "Consider infrastructure challenges: internet connectivity, power reliability across islands",
          "Think about regulatory requirements for medical devices/software in each model",
          "Evaluate sales cycle length and decision-making complexity",
          "Consider payment reliability and political risk for government contracts"
        ],
        answer: `Option A (Private): Shorter sales cycle, higher tech readiness (better internet in Jakarta), lower support needs. However, the market size is capped.

Option B (Public): Massive scale and social impact. Potential for a "monopoly" position in rural data. However, the sales cycle is long (politics), infrastructure is poor (offline mode needed), and "payment risk" from government budgets is higher.

Key Entry Barriers by Model:

Private B2B:
- Sales Cycle: 3-6 months (faster decision-making, fewer stakeholders)
- Tech Readiness: High (reliable internet, modern IT systems)
- Support Needs: Low (trained staff, existing IT support)
- Market Cap: Limited to ~400 premium sites in major cities
- Payment Risk: Low (commercial contracts with private entities)

Public B2G:
- Sales Cycle: 12-24 months (government procurement, political approvals)
- Tech Readiness: Variable (need offline mode for rural areas)
- Support Needs: High (extensive training for community health workers)
- Market Scale: Massive (5,000+ Puskesmas across archipelago)
- Payment Risk: Medium-High (government budget cycles, political changes)

Infrastructure Challenge:
Indonesia's 17,000+ islands create logistical complexity. Option B requires field staff across multiple provinces, driving up fixed costs significantly.`
      },
      {
        number: 2,
        question: "Quantitative — Which path offers better Year 2 profitability?\nUse Exhibit A to calculate the Annual Operating Profit for both options.\n\nNote: Assume all implementation costs (CapEx) are amortized/expensed within the year for simplicity.",
        hints: [
          "Contribution Margin: (Fee) - (Implementation) - (Training)",
          "Option B has much lower margins per site but 12.5x the volume",
          "Option B has double the fixed overhead due to the need for more field staff across multiple islands",
          "Compare operating margins as a percentage of revenue"
        ],
        answer: `Option A: Private B2B

Contribution per Site: €5,000 - (€1,000 + €500) = €3,500
Total Contribution: 400 × €3,500 = €1,400,000
Operating Profit: €1,400,000 - €600,000 = €800,000
Total Revenue: 400 × €5,000 = €2,000,000
Operating Margin: €800,000 / €2,000,000 = 40%

---

Option B: Public B2G

Contribution per Site: €800 - (€300 + €100) = €400
Total Contribution: 5,000 × €400 = €2,000,000
Operating Profit: €2,000,000 - €1,200,000 = €800,000
Total Revenue: 5,000 × €800 = €4,000,000
Operating Margin: €800,000 / €4,000,000 = 20%

---

Analysis:

Both options yield the exact same absolute profit (€800k). However, Option A is much more efficient (40% margin) and less complex to manage (400 sites vs. 5,000).

The volume advantage of Option B (12.5x more sites) is offset by:
1. Much lower contribution per site (€400 vs €3,500)
2. Double the fixed overhead (€1.2M vs €600K)
3. Significantly more operational complexity`,
        exhibitImage: "vedahealth-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Go-to-Market Choice\nWhich path should VedaHealth take?\nConsider the \"Brand Halo\" effect: Does winning a government contract help or hurt private sales?\nWhat are the long-term data advantages of each model?",
        hints: [
          "Consider operational complexity of managing 5,000 rural sites as a Singaporean startup",
          "Think about strategic sequencing: which option builds better foundation for the other?",
          "Evaluate the data value proposition for each model",
          "Consider competitive dynamics and first-mover advantages"
        ],
        answer: `Decision: Option A (Private B2B)

Justification:

1. Financial Efficiency: While both yield identical absolute profit (€800k), Option A achieves this with 40% margin vs 20%. Managing 400 sites is dramatically simpler than 5,000 rural locations across an archipelago.

2. Operational Fit: A Singaporean startup expanding to Indonesia in Year 2 should not attempt to manage 5,000 rural sites. The logistical, training, and support burden would likely overstretch resources.

3. Strategic Sequencing: Start with Private sector to:
   - Prove the AI works in the Indonesian context
   - Build a "Premium Brand" reputation
   - Demonstrate clinical outcomes with proper data
   - Use profits and success stories to negotiate better government terms later

---

Brand Halo Effect:

Private → Public: Strong positive halo. "VedaHealth is trusted by Jakarta's best hospitals" strengthens government credibility.

Public → Private: Risky. Being associated with "basic rural healthcare" could position VedaHealth as low-end, making premium hospital sales harder.

---

Data Advantages:

Option A: Higher quality data from well-documented private patients, better for AI model refinement.

Option B: Massive population-level data, valuable for epidemiological insights but lower data quality from resource-constrained settings.

---

Risk Mitigation:

Competition might move into the Public sector first and "lock out" VedaHealth from the rural data pool.

Mitigation: Sign a "Memorandum of Understanding" (MoU) with the government now for a small pilot (50 sites) while focusing commercial effort on private hospitals. This secures future optionality without current operational burden.

---

Implementation Timeline:
- Year 1-2: Focus 90% on Private B2B (400 sites)
- Year 2: Run 50-site government pilot alongside
- Year 3-4: Expand government contract with proven track record and optimized "lite" version`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The quantitative analysis reveals both options yield identical Year 2 profit (€800k), but Option A (Private B2B) achieves this with 40% margin vs 20%, requiring only 400 sites instead of 5,000.

The recommendation is to pursue Private B2B to prove the AI in Indonesian context, build premium brand credibility, and use success to negotiate stronger government terms later. A small government pilot (50 sites) can secure future optionality without current operational burden.

The key insight is that equal profit at dramatically different margins and complexity levels makes the higher-margin option clearly superior for a startup's first international expansion.`,
    keyFrameworks: [
      "Market Entry Strategy (B2B vs B2G)",
      "Unit Economics Comparison",
      "Operating Margin Analysis",
      "Strategic Sequencing",
      "Brand Positioning Trade-offs"
    ]
  },

  // MARKET ENTRY - NordPay
  {
    id: "nordpay-market-entry",
    title: "NordPay Mexico Market Entry",
    firm: "Market Entry",
    type: "Market Entry",
    background: `NordPay is a highly successful neobank from Iceland with 4 million users across Northern Europe. They offer a slick, mobile-first banking experience with zero fees and high-interest savings accounts. Their tech stack is entirely proprietary, allowing them to launch new features (like crypto trading or micro-loans) in weeks rather than months.

It is 2026, and NordPay has decided to enter Mexico. The Mexican market is attractive: 50% of the population is unbanked, yet smartphone penetration is over 70%. However, Mexico's "Fintech Law" is rigorous. To operate as a full bank, NordPay needs a "Broad Banking License," which takes 24 months to secure and requires significant local capital reserves.

NordPay is choosing between:

Option A: The Long Game (Greenfield). Apply for a full independent license. This gives them total control over the product and 100% of the revenue but delays the full launch.

Option B: The Shortcut (Partnership). Partner with Banco del Sol, a traditional Mexican mid-tier bank. NordPay would provide the app and technology, while Banco del Sol provides the regulatory "umbrella" and banking license.`,
    question: "Determine which entry path—Independent License or Strategic Partnership—yields the higher Annual Net Profit by Year 3.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What are the structural barriers in Mexico?\nDiscuss the challenges of entering a highly regulated financial market.\nConsider: Trust/Brand perception, Regulatory \"Red Tape,\" and the \"Speed-to-Market\" advantage.",
        hints: [
          "Consider the 24-month timeline for independent licensing vs. immediate market entry with a partner",
          "Think about brand perception: Is a foreign neobank trusted by Mexican consumers?",
          "Evaluate the competitive landscape: Who else is moving into Mexico?",
          "Consider the 50% unbanked population—what does this mean for customer acquisition?"
        ],
        answer: `Option A (Greenfield):
Pros: 100% of the data, 100% of the revenue, no "clash of cultures" with a traditional bank. Full control over product roadmap and customer experience.

Cons: 2-year wait time means competitors (like Nubank) might grab the market first. Huge upfront capital requirement. No local brand recognition.

Option B (Partnership):
Pros: Instant entry, immediate access to 1.8M potential customers through Banco del Sol's existing base, lower regulatory risk. Partner handles compliance complexity.

Cons: Giving away 40% of the revenue is expensive. NordPay is "locked" into the partner's legacy systems, which might slow down their fast-moving tech. Less control over customer relationship.

Key Structural Barriers:

1. Regulatory Complexity:
   - "Broad Banking License" requires 24 months + significant capital reserves
   - Fintech Law mandates local data residency and compliance infrastructure
   - Anti-money laundering (AML) requirements are stringent

2. Trust/Brand Perception:
   - Icelandic brand unknown in Mexico
   - Traditional bank partnership provides instant credibility
   - 50% unbanked population is often skeptical of digital-only solutions

3. Speed-to-Market:
   - Nubank and other fintechs already expanding in Latin America
   - 24-month delay could mean losing first-mover advantage
   - Partner route allows immediate market presence`
      },
      {
        number: 2,
        question: "Quantitative — Which model wins on the bottom line?\nUse Exhibit A to calculate the Annual Net Profit for Year 3.\nFactor in: The partner's revenue share and the difference in customer acquisition efficiency.",
        hints: [
          "Option B has more users because the partner allows for 'cross-selling' to their existing traditional database",
          "Option B has lower OpEx because the partner handles regulatory reporting and cash-in/cash-out points",
          "Net Profit Formula: (Users × Net ARPU × 12) - Fixed Costs",
          "Remember to apply the 40% revenue share before calculating contribution"
        ],
        answer: `Option A: Independent License

Monthly Contribution per User: €5.00 - €2.00 = €3.00
Annual Contribution: 1,000,000 users × €3.00 × 12 months = €36,000,000
Annual Net Profit: €36,000,000 - €12,000,000 (Fixed) = €24,000,000

---

Option B: Partnership

Net Revenue per User (after 40% share): €5.00 × 0.60 = €3.00
Monthly Contribution per User: €3.00 - €0.80 (OpEx) = €2.20
Annual Contribution: 1,800,000 users × €2.20 × 12 months = €47,520,000
Annual Net Profit: €47,520,000 - €3,000,000 (Fixed) = €44,520,000

---

Analysis:

Option B is nearly 2x as profitable (€44.5M vs €24M).

Key Drivers of Option B's Advantage:
1. Volume Boost: 80% more users (1.8M vs 1.0M) from partner's existing customer base
2. Lower OpEx: Partner handles regulatory overhead (€0.80 vs €2.00 per user)
3. Lower Fixed Costs: €3M vs €12M—partner absorbs compliance infrastructure costs

The 40% revenue share is more than offset by:
- 1.8x more users
- 60% lower variable costs
- 75% lower fixed costs`,
        exhibitImage: "nordpay-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Control vs. Speed\nWhich path should NordPay take?\nDiscuss the \"Exit Strategy\": If they start with a partner, can they eventually move to their own license?",
        hints: [
          "Consider 'Land Grab' dynamics in neobanking—scale often matters more than margins early on",
          "Think about contract structuring: Can NordPay negotiate a 'sunset clause'?",
          "Evaluate data ownership implications of each model",
          "Consider what happens to customer relationships if NordPay later wants independence"
        ],
        answer: `Verdict: Option B: Strategic Partnership

Reasoning:
In the fast-moving Neobanking world, "Land Grab" is more important than "Unit Margin" in the early years. Option B allows NordPay to capture 1.8 million users quickly and profitably.

Financial Comparison:
- Option A: €24M profit, 1.0M users, full control
- Option B: €44.5M profit, 1.8M users, shared control

Option B delivers 85% higher profit AND 80% more users. The economics strongly favor partnership.

---

Exit Strategy Recommendations:

1. Sunset Clause: Negotiate a "Buy-out" provision in the partnership contract. Once NordPay reaches 5 million users, they should have the right to migrate to their own license, allowing them to stop paying the 40% revenue share once they have sufficient scale.

2. Data Portability: Ensure contract includes data ownership rights. Customer data collected through NordPay's app should belong to NordPay, enabling future migration.

3. License Application: Apply for independent license simultaneously with partnership launch. When the 24-month process completes, NordPay has the option (but not obligation) to transition.

4. Technology Independence: Keep NordPay's core technology separate from Banco del Sol's systems to enable clean separation later.

---

Risk Mitigation:

- Brand Dilution: Ensure NordPay brand is front-and-center in customer experience, not buried under Banco del Sol's branding
- Partner Lock-in: Cap partnership duration at 5 years with renewal terms favorable to NordPay
- Competitive Response: Move fast—sign partnership within 6 months before other fintechs secure similar deals`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The quantitative analysis reveals Option B (Partnership) is nearly 2x as profitable as Option A (€44.5M vs €24M) while also capturing 80% more users (1.8M vs 1.0M).

The recommendation is to pursue the Strategic Partnership with Banco del Sol, but negotiate critical exit provisions: a sunset clause at 5M users, data portability rights, and technology separation. Simultaneously apply for an independent license as a long-term hedge.

The key insight is that in "Land Grab" markets like Mexican fintech, speed and scale trump margin optimization. The 40% revenue share is more than compensated by volume, lower OpEx, and reduced fixed costs.`,
    keyFrameworks: [
      "Market Entry Strategy (Greenfield vs Partnership)",
      "Unit Economics Comparison",
      "Revenue Share Analysis",
      "Strategic Exit Planning",
      "Speed-to-Market Trade-offs"
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
    difficulty: "Beginner",
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

  // GROWTH STRATEGY - FitStream
  {
    id: "fitstream-growth",
    title: "FitStream Growth Strategy",
    firm: "Growth Strategy",
    type: "Growth Strategy",
    background: `FitStream is a premium mobile app offering on-demand home workouts (Yoga, HIIT, and Pilates). Based in Stockholm, they have 1.2 million active subscribers paying €15/month. They are the #1 fitness app in the Nordics and Germany.

Growth in the "B2C Home Fitness" market has peaked. Their Customer Acquisition Cost (CAC) has risen by 50% because the market is saturated with competitors like Peloton and Apple Fitness+. The Board of Directors has set a goal to increase annual revenue by €100M within the next 24 months.

FitStream is considering two growth "bets":

"FitGear" (Product Development): Developing and selling "Smart Resistance Bands" that sync with the app. This targets their existing users to increase their total spend.

"FitWork" (Market Development): Entering the B2B market by selling "Corporate Wellness Packages" to large enterprises (1,000+ employees) as a subsidized employee benefit.`,
    question: "Evaluate both strategies and determine which path is most likely to hit the €100M revenue growth target while maintaining a healthy profit margin.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — Where does the growth come from?\nMap FitStream's options onto the Ansoff Matrix.\nWhat are the primary risks of a software company moving into physical hardware (Option 1) vs. a B2C company moving into B2B sales (Option 2)?",
        hints: [
          "Use the Ansoff Matrix: Existing vs New Products × Existing vs New Markets",
          "Consider supply chain and inventory risks for hardware",
          "Think about the sales cycle differences between B2C and B2B",
          "Evaluate margin profiles: software vs hardware"
        ],
        answer: `Ansoff Matrix Mapping:

Option 1 (FitGear - Hardware): Product Development
- Existing market (current 1.2M users)
- New product (physical hardware vs software)
- Strategy: Increase revenue per user through complementary products

Option 2 (FitWork - B2B): Market Development
- Existing product (fitness content/app)
- New market (corporate enterprises vs individual consumers)
- Strategy: Expand addressable market through new customer segment

---

Option 1 (Hardware) Risks:

1. Supply Chain Complexity:
   - Manufacturing partnerships, quality control
   - Inventory management and working capital requirements
   - Shipping, returns, and warranty handling

2. Margin Compression:
   - Hardware margins (30-40%) far lower than software (70-90%)
   - One-time revenue vs recurring subscriptions
   - Price competition from established fitness equipment brands

3. Capability Gap:
   - Product development expertise (hardware design)
   - Customer support for physical products
   - Regulatory compliance (electronics, safety standards)

4. Brand Risk:
   - Poor product quality could damage premium app brand
   - Hardware returns and defects create customer friction

---

Option 2 (B2B) Risks:

1. Long Sales Cycles:
   - Enterprise sales take 6-12 months
   - Multiple decision-makers (HR, Finance, IT)
   - Procurement processes and RFPs

2. New Sales Capability:
   - Need enterprise sales team (different skill set from B2C marketing)
   - Account management infrastructure
   - Contract negotiation and legal complexity

3. Lower "Brand Love":
   - Forced corporate users may not engage as enthusiastically
   - Usage rates often lower than consumer-driven adoption
   - Churn risk when contracts expire

4. Customer Concentration:
   - Losing one large enterprise = significant revenue loss
   - Negotiation leverage shifts to large buyers`
      },
      {
        number: 2,
        question: "Quantitative — Which bet hits the €100M target?\nUse Exhibit A to calculate the Total Annual Revenue Increase for both options.\nDetermine if either (or both) can meet the €100M goal.",
        hints: [
          "Option 1 Revenue: (Existing Users × Penetration Rate) × Price",
          "Option 2 Revenue: (Companies × Seats per Co) × Price × 12 months",
          "Don't forget to subtract Total CAC and Variable Costs for profitability",
          "Compare both against the €100M revenue target"
        ],
        answer: `Option 1: FitGear (Hardware)

Units Sold: 1,200,000 users × 20% = 240,000 units
Gross Revenue: 240,000 × €80 = €19,200,000

Variable Costs: 240,000 × €50 = €12,000,000
Gross Profit: €19,200,000 - €12,000,000 = €7,200,000

Total CAC: 240,000 × €10 = €2,400,000
Net Profit: €7,200,000 - €2,400,000 = €4,800,000

Verdict: FAILS the €100M revenue target significantly
- Revenue: €19.2M (only 19% of target)
- Net Profit: €4.8M
- Profit Margin: 25%

---

Option 2: FitWork (B2B)

Total Seats: 500 companies × 2,000 seats = 1,000,000 seats
Gross Annual Revenue: 1,000,000 × €5 × 12 months = €60,000,000

Variable Costs: 1,000,000 × €1 × 12 = €12,000,000
Gross Profit: €60,000,000 - €12,000,000 = €48,000,000

Total CAC: 500 × €50,000 = €25,000,000
Net Profit: €48,000,000 - €25,000,000 = €23,000,000

Verdict: CLOSER but still falls short
- Revenue: €60M (60% of target)
- Net Profit: €23M
- Profit Margin: 38%

---

Strategic Synthesis:
Neither option alone hits the €100M goal.
- Option 1: €19.2M revenue
- Option 2: €60M revenue
- Combined: €79.2M revenue (still short)

Option 2 is 3x more powerful than Option 1 on revenue and 5x better on profit.`,
        exhibitImage: "fitstream-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Which strategy is \"smarter\"?\nBased on the math and the operational complexity, which path should the CEO prioritize?\nConsider the impact on Retention (LTV) and Brand Positioning.",
        hints: [
          "Consider recurring revenue vs one-time revenue value to investors",
          "Think about how to close the gap to €100M",
          "Evaluate whether hardware could serve as a retention tool rather than growth driver",
          "Consider the lifetime value implications of each model"
        ],
        answer: `Recommendation: Prioritize Option 2 (B2B FitWork) with scaled ambitions

---

Primary Strategy: B2B Corporate Wellness

To hit €100M revenue target, FitStream needs to scale Option 2:
- Current projection: 500 companies = €60M
- Required: ~835 companies = €100M
- OR increase price per seat from €5 to €8.50

Why B2B is Superior:
1. Recurring Revenue: Subscription model more valuable than one-time hardware sales
2. Higher Profit: €23M net profit vs €4.8M (nearly 5x)
3. Better Margins: 38% net margin vs 25%
4. Investor Appeal: Predictable, recurring revenue commands higher valuations
5. Scalability: Software delivery scales; hardware has physical constraints

---

Secondary Strategy: Use Hardware for Retention

Instead of treating FitGear as a revenue driver, use it as a Retention Tool:
- Offer Smart Resistance Bands FREE to B2B clients who sign 3-year contracts
- Cost: ~€50/unit × 1M corporate users = €50M investment
- Benefit: Lock-in effect, higher engagement, reduced churn
- Hardware becomes a customer acquisition/retention cost, not a profit center

---

LTV and Retention Impact:

B2B Advantage:
- Corporate contracts typically 2-3 years
- Lower churn than individual B2C subscribers
- Cross-selling opportunities (premium content tiers, wellness programs)
- HR departments incentivized to maintain employee benefits

Hardware for Retention:
- Physical products create switching costs
- Users invested in FitStream ecosystem less likely to switch apps
- Bands require app to function, creating lock-in

---

Implementation Roadmap:

Year 1:
- Build B2B sales team (10-15 enterprise reps)
- Target initial 200 enterprise contracts
- Develop corporate-specific features (admin dashboards, usage reports)

Year 2:
- Scale to 500-835 enterprise clients
- Launch hardware bundle as retention/upsell tool
- Expand to additional European markets via corporate clients

---

Brand Positioning Consideration:

Risk: Corporate association could dilute "premium fitness" positioning
Mitigation: Position B2B as "FitStream for Work"—separate branding that preserves consumer brand equity while capturing enterprise revenue`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The quantitative analysis reveals that neither option alone achieves the €100M target. Option 1 (Hardware) delivers only €19.2M revenue, while Option 2 (B2B) reaches €60M with significantly better economics (€23M profit vs €4.8M).

The recommendation is to prioritize B2B Corporate Wellness with scaled ambitions (~835 companies or higher pricing). Hardware should be repositioned from growth driver to retention tool—offering free Smart Bands to lock in multi-year corporate contracts.

The key insight is that recurring B2B revenue is strategically superior to one-time hardware sales: better margins, predictable cash flows, and higher investor valuations. To hit €100M, FitStream needs to think bigger on B2B scale rather than diversifying into low-margin hardware.`,
    keyFrameworks: [
      "Ansoff Matrix (Product vs Market Development)",
      "Unit Economics Comparison",
      "Revenue vs Profit Optimization",
      "B2B vs B2C Sales Strategy",
      "Hardware as Retention Tool"
    ]
  },

  // GROWTH STRATEGY - EcoWash
  {
    id: "ecowash-growth",
    title: "EcoWash Growth Strategy",
    firm: "Growth Strategy",
    type: "Growth Strategy",
    background: `EcoWash is a London-based startup that offers an "Uber-style" on-demand laundry and dry-cleaning service. Users schedule a pickup via an app, and EcoWash handles the cleaning and delivery within 24 hours. They have a loyal B2C (Business-to-Consumer) following in London and Manchester, with a £45 Average Order Value (AOV).

Growth in the UK B2C market has slowed. To justify their Series C valuation, EcoWash needs to double their annual revenue from £50M to £100M within 24 months. The CEO is considering two aggressive growth paths:

"Euro-Growth" (Market Development): Launching the existing B2C service in 5 new European mega-cities (Paris, Berlin, Madrid, Milan, and Amsterdam).

"EcoWash Pro" (Market Penetration / Vertical): Staying in the UK but launching a B2B service targeting boutique hotels and high-end gyms that require daily bulk linen and towel cleaning.`,
    question: "Evaluate which strategy offers a more realistic and profitable path to the £50M revenue gap.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — Assessing Growth Risk\nUsing the Ansoff Matrix, categorize these two strategies.\nWhat are the \"hidden\" operational challenges of switching from washing individual bags of clothes (B2C) to processing 500kg of hotel linens daily (B2B)?",
        hints: [
          "Consider Ansoff Matrix quadrants: Market Development vs Product Development",
          "Think about equipment differences: residential vs industrial washing",
          "Evaluate logistics complexity: many small pickups vs few bulk pickups",
          "Consider quality standards and turnaround expectations for each segment"
        ],
        answer: `Ansoff Matrix Categorization:

Option 1 (Euro-Growth): Market Development
- Same product/service (on-demand laundry)
- New geography (5 European cities)
- Risk: Local regulations, language barriers, existing competitors

Option 2 (EcoWash Pro): Product/Vertical Development
- New service offering (bulk B2B linen cleaning)
- Same geography (UK)
- Risk: Operational transformation required

---

Hidden Operational Challenges of B2C → B2B Shift:

1. Equipment Transformation:
   - B2C: Small/medium residential-grade machines handling diverse fabric types
   - B2B: Industrial washing machines for high-volume, standardized loads (500kg+ daily)
   - May require entirely different facilities and capital equipment

2. Logistics Model Inversion:
   - B2C: "Low volume, high complexity" — many small bags from scattered locations
   - B2B: "High volume, low complexity" — large scheduled pickups from few locations
   - Different vehicle types, routes, and scheduling systems needed

3. Quality Standards:
   - Hotels have strict hygiene certifications (health department requirements)
   - Consistent pressing/folding standards for linens
   - Damage liability is higher per item (premium hotel linens are expensive)

4. Service Level Agreements:
   - Hotels need guaranteed same-day or next-morning turnaround
   - Penalties for late delivery or quality failures
   - Must handle surge demand (weekend peaks, events)

5. Pricing Structure:
   - B2C: Per-item or per-bag pricing
   - B2B: Bulk contracts with volume discounts, long-term agreements
   - Different invoicing cycles (monthly vs per-order)

6. Sales Approach:
   - B2C: App marketing, digital acquisition
   - B2B: Enterprise sales team, relationship building, procurement processes`
      },
      {
        number: 2,
        question: "Quantitative — The \"Race to £50M\"\nUse Exhibit A to calculate the incremental annual revenue generated by each option by Year 2.\nWhich option reaches the £50M growth target?",
        hints: [
          "Annual Revenue = Units × Orders/Month × AOV × 12 months",
          "Option 1 uses €50 (~£42) for AOV conversion",
          "Compare final revenue against the £50M gap target",
          "Note the significant difference in implementation costs"
        ],
        answer: `Option 1: Euro-Growth (B2C)

Total Monthly Orders: 5 cities × 15,000 orders = 75,000 orders/month
Annual Revenue: 75,000 × £42 × 12 = £37,800,000

Operating Profit: £37,800,000 × 20% = £7,560,000
Less Implementation Cost (Year 1): £15,000,000

Result: FAILS the £50M target
- Revenue: £37.8M (76% of target)
- Shortfall: £12.2M

---

Option 2: EcoWash Pro (B2B)

Total Monthly Orders: 1,200 clients × 25 orders = 30,000 orders/month
Annual Revenue: 30,000 × £150 × 12 = £54,000,000

Operating Profit: £54,000,000 × 12% = £6,480,000
Less Implementation Cost (Year 1): £5,000,000

Result: EXCEEDS the £50M target
- Revenue: £54M (108% of target)
- Surplus: £4M

---

Comparative Analysis:

| Metric | Option 1 (B2C) | Option 2 (B2B) |
|--------|----------------|----------------|
| Annual Revenue | £37.8M | £54.0M |
| Target Achievement | 76% | 108% |
| Operating Margin | 20% | 12% |
| Operating Profit | £7.56M | £6.48M |
| Implementation Cost | £15M | £5M |
| Capital Efficiency | £2.52 rev/£ invested | £10.80 rev/£ invested |

Key Insight: Despite lower margins, Option 2's capital efficiency is 4x better and it actually hits the revenue target.`,
        exhibitImage: "ecowash-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Strategic Fit\nBeyond the revenue, which option is more sustainable?\nConsider: Seasonality, Churn, and Customer Acquisition Cost (CAC).",
        hints: [
          "Think about B2C laundry seasonality (winter peaks vs summer lulls)",
          "Consider hotel/gym demand consistency throughout the year",
          "Evaluate customer stickiness: individual app users vs contracted businesses",
          "Factor in the £10M capital savings and what it could fund"
        ],
        answer: `Recommendation: Option 2 (EcoWash Pro) is the clear winner

---

Revenue Achievement:
- Option 2 hits and exceeds the £50M target (£54M vs £37.8M)
- Option 1 falls 24% short of the target

Capital Efficiency:
- Option 2 requires £5M investment vs £15M
- £10M in saved capital can fund industrial equipment
- ROI timeline significantly shorter for Option 2

---

Sustainability Analysis:

1. Seasonality:
   - B2C Laundry: Highly seasonal
     * Peaks: Winter months, holiday seasons (heavy coats, blankets)
     * Troughs: Summer months (lighter clothing, vacation periods)
     * Revenue variance: 30-40% between peak and trough
   
   - B2B Hotels/Gyms: Consistent year-round
     * Hotels: Steady occupancy, tourism spreads across seasons
     * Gyms: Actually counter-cyclical (New Year resolutions, summer prep)
     * Revenue variance: 10-15% between peak and trough

2. Customer Churn:
   - B2C App Users: High churn (25-40% annually)
     * Low switching costs, price-sensitive
     * Competitors one download away
     * Constant CAC spend needed to replace churned users
   
   - B2B Contracts: Low churn (5-10% annually)
     * Switching costs are high (new vendor onboarding, service disruption)
     * Multi-year contracts common
     * Relationship-based retention

3. Customer Acquisition Cost (CAC):
   - B2C: Ongoing digital marketing spend, paid ads, referral programs
   - B2B: Higher upfront sales cost but much lower CAC per £ of lifetime revenue
   - B2B contracts generate predictable multi-year revenue streams

---

Customer Lifetime Value (CLTV):

B2C User:
- AOV: £42 × 2 orders/month × 18-month average lifespan = ~£1,500 CLTV

B2B Client:
- Monthly revenue: 25 orders × £150 = £3,750
- Annual revenue: £45,000 per client
- 3-year average contract: £135,000 CLTV

B2B CLTV is 90x higher than B2C, justifying higher sales investment.

---

Risk Mitigation with Saved Capital:

Use the £10M in saved capital (£15M - £5M) to:
1. Purchase industrial-grade washing equipment (£3-4M)
2. Build dedicated B2B fulfillment center (£2-3M)
3. Hire enterprise sales team (£1-2M)
4. Maintain cash runway for operational scaling (£2-3M)

---

Strategic Recommendation:

EcoWash should pursue Option 2 (EcoWash Pro) as the primary growth strategy:
- Achieves revenue target with superior capital efficiency
- More sustainable revenue with lower seasonality and churn
- Higher CLTV justifies focused sales investment
- Saved capital enables operational excellence

Future consideration: Once B2B operations are profitable and stable (Year 3-4), selectively evaluate 1-2 European cities for B2C expansion using proven playbook and generated cash flows.`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The quantitative analysis reveals Option 2 (EcoWash Pro B2B) exceeds the £50M target with £54M in revenue, while Option 1 (Euro-Growth) falls short at £37.8M. More importantly, Option 2 achieves this with only £5M investment vs £15M—4x better capital efficiency.

Beyond the numbers, B2B is more sustainable: consistent year-round demand (hotels don't have "laundry seasons"), dramatically lower churn (contracted businesses vs fickle app users), and 90x higher customer lifetime value.

The recommendation is to pursue EcoWash Pro and use the £10M in saved capital to invest in industrial equipment, a dedicated B2B fulfillment center, and an enterprise sales team—setting the foundation for scalable, predictable growth.`,
    keyFrameworks: [
      "Ansoff Matrix (Market vs Product Development)",
      "Revenue Gap Analysis",
      "Capital Efficiency Comparison",
      "Customer Lifetime Value (CLTV)",
      "Seasonality and Churn Analysis"
    ]
  },

  // GROWTH STRATEGY - SkillStream
  {
    id: "skillstream-growth",
    title: "SkillStream Growth Strategy",
    firm: "Growth Strategy",
    type: "Growth Strategy",
    background: `SkillStream, based in Berlin, is a leading online platform for high-end professional certifications (AI, Data Science, and FinTech). They have a library of 500+ courses and a user base of 5 million "Retail" (B2C) learners. Currently, they sell courses individually at an average price of €400.

It is 2026, and the cost of acquiring a single student (CAC) has risen by 40% due to heavy competition from LinkedIn Learning and Coursera. SkillStream's revenue growth has flattened at €200M.

To hit their target of €350M in revenue by Year 2, the CEO is considering two "New Engine" strategies:

"SkillPass" (Subscription Pivot): Moving from selling individual courses to a "Netflix-style" subscription for individuals.

"SkillStream for Business" (B2B Pivot): Selling bulk licenses to corporations (HR departments) to use the platform for internal employee upskilling.`,
    question: "Evaluate which strategy offers the most \"Capital Efficient\" path to adding €150M in incremental annual revenue.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — Strategic Positioning\nHow does moving from a \"Transactional\" to a \"Subscription\" model change the company's focus?\nWhat are the risks of \"Cannibalization\" if SkillStream launches a B2B platform while still selling to individuals?",
        hints: [
          "Think about what metrics matter in transactional vs subscription businesses",
          "Consider the behavioral difference between acquiring a customer vs retaining one",
          "Evaluate which existing customers might switch to the cheaper subscription",
          "Think about pricing conflicts between B2C and B2B channels"
        ],
        answer: `Shift in Focus: Transactional vs Subscription

Transactional Model (Current State):
- Focus: Marketing/Sales (getting the next click/purchase)
- Key Metrics: Conversion rate, CAC, average order value
- Success = More new customers buying more courses
- Revenue: Lumpy, dependent on constant acquisition

Subscription Model (SkillPass):
- Focus: Engagement/Retention (keeping users active so they don't churn)
- Key Metrics: Monthly Active Users, churn rate, engagement time
- Success = Users staying subscribed month after month
- Revenue: Predictable, recurring, compounds over time

Operational Implications:
- Product team shifts from "course launches" to "engagement features"
- Marketing shifts from "acquisition campaigns" to "retention programs"
- Success metrics change from "new sign-ups" to "monthly active usage"

---

Cannibalization Risks:

Option 1 (Subscription) - HIGH Cannibalization Risk:
- Power users currently buying 3-4 courses/year at €400 each = €1,200-1,600
- Subscription at €30/month = €360/year
- These high-value users will pay 70-80% LESS than before
- Risk: If subscription is "too good a deal," existing revenue erodes

Option 2 (B2B) - LOW Cannibalization Risk:
- Selling to HR departments (new buyer persona)
- Corporate licenses don't compete with individual purchases
- Employees getting free access through work may actually become evangelists who recommend courses to friends/family
- "Blue Ocean" strategy—new market, not competing with existing

Key Insight: B2B is additive; Subscription is partially substitutional.`
      },
      {
        number: 2,
        question: "Quantitative — Sizing the Revenue Growth\nUse Exhibit A to calculate the Incremental Annual Revenue for both options.\n\nNote: For Option A, you must subtract the revenue \"lost\" from people who stop buying individual courses to switch to the subscription.",
        hints: [
          "Option 1 Gross Revenue: Subscribers × Price × 12 months",
          "Option 1 Net Growth: Gross Subscription Revenue - Cannibalized Revenue",
          "Option 2 Revenue: Companies × Employees × Price",
          "Compare both against the €150M incremental target"
        ],
        answer: `Option 1: SkillPass (Individual Subscription)

Gross Subscription Revenue:
600,000 subscribers × €30/month × 12 months = €216,000,000

Cannibalization Loss:
100,000 users switch from buying courses
Lost revenue: 100,000 × €400 = €40,000,000

Net Incremental Revenue:
€216,000,000 - €40,000,000 = €176,000,000

Result: EXCEEDS the €150M target by €26M
- Gross: €216M
- Net (after cannibalization): €176M
- Target achievement: 117%

---

Option 2: SkillStream for Business (B2B Enterprise)

Total Seats Sold:
1,000 companies × 1,500 employees = 1,500,000 seats

Total Annual Revenue:
1,500,000 seats × €120/employee/year = €180,000,000

Cannibalization: €0 (new market, no overlap)

Net Incremental Revenue: €180,000,000

Result: EXCEEDS the €150M target by €30M
- Gross: €180M
- Net: €180M (no cannibalization)
- Target achievement: 120%

---

Comparative Analysis:

| Metric | Option 1 (Subscription) | Option 2 (B2B) |
|--------|------------------------|----------------|
| Gross Revenue | €216M | €180M |
| Cannibalization | -€40M | €0 |
| Net Incremental | €176M | €180M |
| Target Achievement | 117% | 120% |
| Impact on Existing Business | Negative (erodes €40M) | Neutral/Positive |

Key Insight: While Option 1 has higher gross revenue, Option 2 has higher NET revenue and zero risk to the existing €200M business.`,
        exhibitImage: "skillstream-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Implementation\nWhich path should SkillStream prioritize to reach the €350M total revenue goal?\nSuggest one way to \"Bundle\" these options to maximize value.",
        hints: [
          "Consider the risk profile of each option",
          "Think about which option protects the existing €200M business",
          "Evaluate 'Land and Expand' strategies",
          "Consider how B2B data could inform a better B2C subscription later"
        ],
        answer: `Recommendation: Prioritize Option 2 (B2B Enterprise)

---

Why B2B First?

1. Zero Cannibalization Risk:
   - Protects the existing €200M retail business
   - B2B is additive, not substitutional
   - If B2B underperforms, fall back to stable B2C revenue

2. Higher Net Revenue:
   - €180M net vs €176M net
   - No "leakage" from power users switching

3. "Blue Ocean" Strategy:
   - New market segment (HR/L&D departments)
   - Different buyer persona (enterprise procurement)
   - Less direct competition than consumer ed-tech

4. Predictable Revenue:
   - Enterprise contracts typically 1-3 years
   - Lower churn than individual subscriptions
   - Easier revenue forecasting

5. Strategic Data Asset:
   - 1.5M corporate learners generate valuable engagement data
   - Identify which courses/topics have highest completion rates
   - Use insights to improve B2C offering

---

A+ Bundling Strategy: "Land and Expand"

Phase 1 (Year 1-2): B2B Foundation
- Launch SkillStream for Business
- Target 1,000 enterprise accounts
- Generate €180M in new, protected revenue
- Collect engagement data from 1.5M corporate users

Phase 2 (Year 3): Premium Subscription Launch
- Use B2B learner data to identify "power topics" and optimal course bundles
- Launch "SkillPass Premium" at €50/month (not €30)
- Target serious career-changers, not casual learners
- Higher price point reduces cannibalization of €400 course buyers
- Position as "curated learning path" not "all-you-can-eat"

Phase 3 (Year 3+): B2B → B2C Conversion
- Offer corporate learners "Alumni Access" when they leave their company
- Convert B2B users to individual subscribers at discounted rate
- Built-in lead generation for B2C subscription

---

Revenue Trajectory:

| Year | Existing B2C | B2B Enterprise | Subscription | Total |
|------|-------------|----------------|--------------|-------|
| 1 | €200M | €90M (ramp) | €0 | €290M |
| 2 | €200M | €180M | €0 | €380M |
| 3 | €180M | €200M | €80M | €460M |

By sequencing properly, SkillStream can exceed €350M while building multiple growth engines and minimizing cannibalization risk.

---

Risk Mitigation:

- B2B Sales Cycle: Hire enterprise sales team 6 months before launch
- Content Customization: Create corporate "learning paths" for popular skills
- Platform Scalability: Ensure infrastructure can handle 1.5M+ concurrent users
- Pricing Pressure: Include usage analytics in enterprise contracts to justify renewal pricing`
      }
    ],
    difficulty: "Beginner",
    modelSolution: `The quantitative analysis reveals both options exceed the €150M target: Option 1 (Subscription) delivers €176M net, while Option 2 (B2B) delivers €180M net. However, Option 2 achieves this with zero cannibalization risk, protecting the existing €200M business.

The recommendation is to prioritize B2B Enterprise first, then use the data and cash flows to launch a refined "Premium" subscription in Year 3. This "Land and Expand" approach builds multiple revenue engines while minimizing risk.

The key insight is that subscription models carry hidden cannibalization costs that erode the true incremental value. B2B is a "Blue Ocean" that adds revenue without subtracting from existing streams.`,
    keyFrameworks: [
      "Transactional vs Subscription Business Models",
      "Cannibalization Analysis",
      "Revenue Incrementality",
      "Land and Expand Strategy",
      "B2B vs B2C Go-to-Market"
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
    difficulty: "Beginner",
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
    id: "car-rental-pricing",
    title: "Luxury Car Rental — Mileage Pricing Strategy",
    firm: "Pricing Strategy",
    type: "Pricing Strategy",
    background: `The client is an international car rental company offering luxury segment vehicles for €220/day with unlimited mileage. Internally, the company calculates its costs based on the assumption that customers will not exceed 300 km/day.

Because customers have increasingly been driving more than 300 km/day, the rental company has decided to charge for kilometers driven above the 300 km limit. The company needs to determine the optimal price per additional kilometer that maintains their target profitability.

Key Business Context:
• Current pricing: €220/day with unlimited mileage
• Cost assumption: Customers drive ≤300 km/day
• Problem: Customers increasingly exceed 300 km/day
• Company's general profitability expectation: 9% margin
• The current margin of 9% should be maintained
• Focus is purely on pricing—other operational aspects can be ignored`,
    question: "At what price should each additional kilometer above the 300 km limit be priced to maintain the company's 9% margin?",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What cost structure should inform the pricing decision?\nIdentify the fixed and variable costs of the car rental business model.\nConsider: Which costs are already covered in the base 300 km, and which increase with additional kilometers?",
        hints: [
          "Fixed costs are incurred regardless of kilometers driven",
          "Variable costs increase proportionally with usage/mileage",
          "For pricing additional kilometers, only marginal costs matter—fixed costs are already covered",
          "Think about what happens to a vehicle as it accumulates more kilometers"
        ],
        answer: `Cost Structure Analysis:

Fixed Costs (already covered in base €220/day rate):
• Personnel costs (permanent staff at rental stations)
• Rent for buildings, parking garages, and rental stations
• Lease or purchase price of vehicles (acquisition cost)
• Insurance premiums
• Marketing and overhead

Variable Costs (increase with kilometers driven):
• Maintenance and repairs (more km = more wear)
• Vehicle depreciation (wear & tear reduces resale value)
• Utilities (minimal impact)

Key Insight for Pricing:
For pricing kilometers ABOVE the 300 km limit, we only need to consider variable costs. Fixed costs are already covered within the first 300 km and do not increase with additional kilometers driven.

The primary variable cost driver is vehicle depreciation—as customers drive more kilometers, the resale value of the vehicle decreases proportionally.

Pricing Framework:
Cost-based pricing is appropriate here because:
• Clear cost structure exists
• Target margin is defined (9%)
• Competitive benchmarking or customer surveys are less relevant for this operational decision`
      },
      {
        number: 2,
        question: "Quantitative — Calculate the price per additional kilometer.\n\nUse this information:\n• Fixed costs: €50 per rental per vehicle\n• Vehicles are purchased for €100,000 and resold for €90,000 after 20,000 km\n• Daily rental rate: €220\n• Target margin: 9%",
        hints: [
          "First calculate the variable cost per km from depreciation",
          "Verify the base case profitability (300 km included)",
          "For additional km pricing: Variable Cost + Margin",
          "Remember: The margin percentage is applied to the final price, not added to costs"
        ],
        answer: `Step 1: Calculate Variable Cost per Kilometer

Vehicle Depreciation:
• Purchase price: €100,000
• Resale value: €90,000 (after 20,000 km)
• Total depreciation: €100,000 - €90,000 = €10,000
• Depreciation per km: €10,000 ÷ 20,000 km = €0.50/km

Variable Cost = €0.50 per kilometer

---

Step 2: Verify Base Case Profitability (300 km)

Variable Costs (300 km): €0.50/km × 300 km = €150
Fixed Costs: €50 per rental
Total Costs: €150 + €50 = €200
Revenue: €220
Profit: €220 - €200 = €20
Margin: €20 ÷ €220 = 9.1% ✓

The base case confirms the 9% margin target is being met.

---

Step 3: Calculate Price for Additional Kilometers

For kilometers beyond 300, only variable costs apply (fixed costs already covered).

The €0.50 variable cost represents 91% of the final price (since 9% is the margin):

Price per additional km = Variable Cost ÷ (1 - Margin)
Price per additional km = €0.50 ÷ 0.91 = €0.5495

Verification:
• Price: €0.5495/km
• Cost: €0.50/km
• Profit: €0.0495/km
• Margin: €0.0495 ÷ €0.5495 = 9% ✓

---

Final Answer: €0.55 per kilometer (or 54.95 cents rounded)

Important Note: A common mistake is calculating €0.50 × 1.09 = €0.545. This is mathematically incorrect because the 9% margin is calculated on the selling price, not on the cost. The difference is small but conceptually important.`
      },
      {
        number: 3,
        question: "Recommendation — Present the final pricing recommendation and discuss implementation considerations.",
        hints: [
          "Consider how to communicate the change to customers",
          "Think about competitive positioning",
          "Discuss any operational implications"
        ],
        answer: `Recommendation: Price additional kilometers at €0.55/km

This maintains the company's 9% profit margin while fairly allocating the incremental costs of higher-mileage usage to the customers who cause them.

---

Implementation Considerations:

1. Customer Communication:
• Frame positively: "Unlimited mileage for typical usage (up to 300 km/day)"
• Transparent pricing: Clearly state the per-km charge upfront
• Provide trip planning tools so customers can estimate total costs

2. Competitive Positioning:
• Compare to competitors' mileage policies
• 300 km/day is generous for most use cases (city driving, business trips)
• Premium positioning justifies the structure

3. Operational Implications:
• Update booking systems to track mileage at return
• Train staff on calculating and explaining charges
• Consider implementing GPS tracking for accurate measurement

4. Strategic Options:
• Tiered pricing: €0.50/km for 301-500 km, €0.60/km for 500+ km
• Pre-purchased mileage packages at slight discount
• Loyalty program members could get higher base mileage (e.g., 400 km)

5. Risk Mitigation:
• Monitor customer satisfaction and churn after implementation
• Track competitor responses
• A/B test messaging approaches

---

Financial Impact (Example):

If a customer drives 400 km instead of 300 km:
• Additional km: 100 km
• Additional charge: 100 × €0.55 = €55
• Total rental: €220 + €55 = €275
• Additional profit: 100 × €0.0495 = €4.95 (maintaining 9% margin on extra revenue)`
      }
    ],
    difficulty: "Intermediate",
    modelSolution: `This pricing case demonstrates cost-based pricing principles for usage-based charging. The key insight is that when pricing incremental usage above a base level, only variable (marginal) costs are relevant—fixed costs are already covered in the base price.

The calculation requires understanding that a 9% margin means the cost represents 91% of price, so: Price = Cost ÷ 0.91, not Cost × 1.09. This is a common mathematical trap in margin calculations.

The final recommendation of €0.55/km maintains the company's profitability target while creating a fair system where high-mileage customers pay for the additional depreciation they cause.`,
    keyFrameworks: [
      "Cost-Based Pricing",
      "Fixed vs Variable Costs",
      "Margin Calculation",
      "Incremental Pricing",
      "Usage-Based Pricing"
    ]
  },
  {
    id: "innovation-tires-pricing",
    title: "Innovation Tires — Value-Based Pricing",
    firm: "Pricing Strategy",
    type: "Pricing Strategy",
    background: `A French tire manufacturer has developed an innovation in the car tire market. By reducing the rolling resistance of its tires, it is possible to reduce fuel consumption by 5%.

The company is new to the tire market and has no comparable products to date. The tire is unique in the market—there are no comparable products with this fuel-saving feature.

Key Business Context:
• Innovation: 5% fuel consumption reduction through reduced rolling resistance
• Market position: New entrant with no existing product line
• Competitive landscape: No comparable fuel-saving tires exist
• Cost information: Manufacturing costs are unknown
• Goal: Determine optimal launch price based on customer value, not costs
• Profitability expectation: Unknown—focus is on deriving potential selling price`,
    question: "How much should the innovative fuel-saving tire cost at product launch?",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What pricing approach should be used?\nEvaluate different pricing frameworks and determine which is most appropriate for this situation.\nConsider: Cost-based pricing, value-based pricing, and competitive benchmarking.",
        hints: [
          "Think about what information is available vs. unavailable",
          "Consider whether cost information or customer value should drive pricing",
          "The product has a unique feature with measurable customer benefit",
          "How can you quantify the value of 5% fuel savings to customers?"
        ],
        answer: `Pricing Framework Analysis:

1. Cost-Based Pricing: NOT APPLICABLE
• No manufacturing cost information available
• Cannot calculate margin or markup
• Ruled out for this case

2. Competitive Benchmarking: PARTIALLY APPLICABLE
• No direct competitors with fuel-saving feature
• However, conventional tire prices provide a baseline
• Can use as anchor point for premium calculation

3. Value-Based Pricing: RECOMMENDED APPROACH
• Customer's willingness to pay increases due to 5% fuel savings
• The value can be quantified in monetary terms
• Price = Conventional tire price + Value of fuel savings

Why Value-Based Pricing Works Here:

The 5% fuel savings translates directly into euros saved by the customer. By calculating the lifetime fuel savings, we can determine how much additional value the tire provides compared to conventional alternatives.

Key Insight:
The customer is willing to pay more because they will save money over time. The pricing question becomes: "How much of that savings should we capture vs. pass on to the customer?"

Approach:
1. Estimate annual fuel consumption per vehicle
2. Calculate 5% savings in fuel costs
3. Determine savings per tire over tire lifespan
4. Add savings value to conventional tire price`
      },
      {
        number: 2,
        question: "Quantitative — Calculate the price for the innovation tire.\n\nYou will need to estimate the following:\n• Average mileage per car per year\n• Average fuel consumption per vehicle\n• Fuel price per liter\n• Average conventional tire price\n• Tire lifespan in years",
        hints: [
          "Start with annual mileage (typical European driving is 10,000-15,000 km/year)",
          "Fuel consumption varies by vehicle—estimate a reasonable average",
          "Calculate total liters consumed per year, then apply 5% savings",
          "Remember: Savings per tire = Total savings ÷ 4 tires",
          "Lifetime value = Annual savings × Years of tire life"
        ],
        answer: `Step 1: Establish Assumptions

• Average mileage per car/year: 12,000 km
• Average fuel consumption: 8 liters per 100 km
• Fuel price: €1.20 per liter
• Average conventional tire price: €40
• Tire lifespan: 5 years

---

Step 2: Calculate Annual Fuel Consumption

Total Liters per Year = (Distance per Year ÷ 100) × Consumption per 100 km
Total Liters per Year = (12,000 km ÷ 100) × 8 liters = 960 liters/year

---

Step 3: Calculate Annual Fuel Costs

Annual Fuel Costs = Total Liters × Price per Liter
Annual Fuel Costs = 960 liters × €1.20 = €1,152/year

---

Step 4: Calculate Annual Fuel Savings (5%)

Annual Savings = Fuel Costs × Savings Percentage
Annual Savings = €1,152 × 0.05 = €57.60 ≈ €60/year per vehicle

---

Step 5: Calculate Savings per Tire per Year

Savings per Tire per Year = Annual Savings ÷ 4 tires
Savings per Tire per Year = €60 ÷ 4 = €15/tire/year

---

Step 6: Calculate Lifetime Value per Tire

Lifetime Savings per Tire = Annual Savings per Tire × Lifespan
Lifetime Savings per Tire = €15 × 5 years = €75

---

Step 7: Calculate Innovation Tire Price

Innovation Tire Price = Conventional Price + Lifetime Savings Value
Innovation Tire Price = €40 + €75 = €115 per tire

---

Summary:
| Component | Value |
|-----------|-------|
| Annual mileage | 12,000 km |
| Fuel consumption | 8 L/100 km |
| Annual fuel cost | €1,152 |
| 5% annual savings | €60 |
| Savings per tire/year | €15 |
| Tire lifespan | 5 years |
| Lifetime savings per tire | €75 |
| Conventional tire price | €40 |
| **Innovation tire price** | **€115** |`
      },
      {
        number: 3,
        question: "Recommendation — Present the final pricing recommendation.\nConsider: At €115, what is the customer's value proposition? How should the company position the price?",
        hints: [
          "At €115, the customer breaks even—they pay extra but save equivalent fuel costs",
          "Consider whether capturing 100% of customer value is optimal",
          "Think about the role of marketing in communicating the value proposition",
          "Consider launch pricing vs. long-term pricing strategy"
        ],
        answer: `Pricing Recommendation:

Maximum Price (Value Neutral): €115 per tire
At this price, the customer is indifferent—they pay €75 more but save €75 in fuel over 5 years. This is the theoretical ceiling.

---

Recommended Launch Price: €90-€100 per tire

Rationale:
• €90 price = Customer captures €15-25 of the €75 savings (20-33% value share)
• This creates a clear value proposition: "Pay €50-60 more, save €75"
• Lower barrier to trial for new brand entering market
• Allows premium positioning without appearing exploitative

---

Value Sharing Strategy:

| Price Point | Premium over €40 | Customer Savings | Company Capture |
|-------------|------------------|------------------|-----------------|
| €115 | €75 | €0 (indifferent) | 100% |
| €100 | €60 | €15 | 80% |
| €90 | €50 | €25 | 67% |
| €80 | €40 | €35 | 53% |

---

Marketing Requirements:

To successfully launch at premium pricing, the company must:

1. Communicate the USP Clearly:
• "Save €60/year on fuel" messaging
• Side-by-side cost comparisons over 5 years
• Fuel savings calculator on website

2. Provide Proof Points:
• Independent testing results
• Fuel economy certifications
• Customer testimonials

3. Address Barriers:
• Money-back guarantee if savings not realized
• Partnership with fuel tracking apps for verification
• Financing options to reduce upfront cost barrier

4. Channel Strategy:
• Target environmentally conscious consumers first
• Partner with eco-friendly car dealerships
• Consider fleet sales where fuel savings are tracked

---

Long-Term Pricing Evolution:
• Launch at €90-100 to build market share
• Increase to €110-115 as brand recognition grows
• Consider premium tier variants at €130+ with enhanced features`
      }
    ],
    difficulty: "Intermediate",
    modelSolution: `This case demonstrates value-based pricing when cost information is unavailable. The key insight is that customer willingness to pay is driven by the quantifiable benefit (5% fuel savings), not by production costs.

The calculation translates the percentage savings into annual euros saved (€60/vehicle), then allocates per tire (€15/tire/year) and across the tire's lifespan (€75 total). Adding this to the conventional tire price (€40) gives a theoretical maximum of €115.

However, capturing 100% of customer value is rarely optimal. The recommendation is to price at €90-100, sharing value with customers to drive adoption, especially as a new market entrant with no brand recognition.`,
    keyFrameworks: [
      "Value-Based Pricing",
      "Customer Willingness to Pay",
      "Market Sizing (Bottom-Up)",
      "Value Sharing Strategy",
      "New Product Pricing"
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
    difficulty: "Beginner",
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
    difficulty: "Beginner",
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
    difficulty: "Beginner",
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
        question: "Quantitative — Can we justify the €600M price tag?\nUse Exhibit A and assume:\n• Acquisition leads to cost synergies (supply chain integration) starting in Year 1\n• Revenue continues to grow at projected rates\n• Calculate total EBITDA generated over the next 5 years (cumulative)\n• Does the 5-year cumulative EBITDA cover at least 50% of the purchase price?",
        hints: [
          "Calculate EBITDA in Euros for each year (Revenue × Margin).",
          "Sum the 5 years of EBITDA to get cumulative cash generation.",
          "Compare the sum to the €600M asking price.",
          "Consider: does 5-year cash flow justify the valuation, or is a strategic premium required?"
        ],
        answer: "EBITDA Calculations:\n\nYear 1: €200M × 10% = €20M\nYear 2: €250M × 15% = €37.5M\nYear 3: €300M × 20% = €60M\nYear 4: €350M × 25% = €87.5M\nYear 5: €400M × 25% = €100M\n\nCumulative 5-Year EBITDA: €20M + €37.5M + €60M + €87.5M + €100M = €305M\n\nValuation Assessment:\n- Cumulative 5-year EBITDA: €305M\n- Purchase price: €600M\n- Coverage ratio: €305M ÷ €600M = 50.8%\n\nConclusion:\nThe cumulative cash flow (€305M) covers only ~51% of the asking price (€600M). Based purely on 5-year EBITDA, the valuation appears stretched.\n\nTo justify €600M, you would need:\n- Significant terminal value beyond Year 5 (assuming continued growth and higher margins)\n- Strategic premium for intangible benefits (brand repositioning, Gen Z access)\n- Additional revenue synergies not captured in base projections\n\nThe €600M price implies either:\n- Very strong growth beyond Year 5, or\n- A substantial strategic premium for non-financial benefits\n\nRisk Assessment: The valuation is aggressive and leaves limited margin for execution risk or market changes.",
        exhibitImage: "maison-dubois-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Buy, Partner, or Build?\nShould Maison Dubois acquire Concrete for €600M?\nIf not, propose an alternative structure (e.g., Minority Stake, Joint Venture).",
        hints: [],
        answer: "Recommendation: DO NOT acquire 100% at €600M. Pursue a strategic partnership or minority stake instead.\n\nRationale:\n\nFinancial:\n- Valuation too high: 5-year EBITDA covers only 51% of purchase price\n- Limited margin of safety for execution risks\n- Break-even current profitability increases risk\n- Would require €600M upfront for uncertain returns\n\nStrategic:\n- Cultural integration risk is extremely high (luxury vs. streetwear cultures)\n- Full acquisition could destroy Concrete's authenticity and 'cool factor'\n- Concrete's value depends on maintaining entrepreneurial agility\n- Corporate ownership might alienate Gen Z customer base\n\nCounter-Proposal: Minority Stake (20-30%) + Strategic Partnership\n\nStructure:\n- Investment: €120M-€180M for 20-30% stake (valuing Concrete at €600M)\n- Board seat and strategic input rights\n- Exclusive distribution agreement for Maison Dubois stores\n- Co-development of limited capsule collections\n- Option to acquire majority stake in 3-5 years based on performance milestones\n\nBenefits:\n- Lower capital at risk (€120-180M vs €600M)\n- Preserves Concrete's independence and culture\n- Keeps founders incentivized with significant ownership\n- Tests Gen Z strategy without betting the house\n- Option value: buy more later if successful, walk away if not\n- Maintains Concrete's brand authenticity\n\nAlternative: Build Internal\n- Launch 'Dubois Street' sub-brand internally\n- Hire streetwear design talent\n- Lower cost (~€50M investment over 3 years)\n- Higher execution risk, longer time to market\n\nNext Steps:\n1. Negotiate minority stake structure with Concrete founders\n2. Define collaboration terms (distribution, co-branding)\n3. Establish performance milestones for future acquisition option\n4. Create governance structure that preserves Concrete autonomy\n5. Plan integration safeguards to protect both brand identities"
      }
    ],
    difficulty: "Beginner",
    modelSolution: "This case assesses M&A valuation judgment, synergy analysis, cultural integration risks, and strategic alternatives to full acquisition in cross-industry deals.",
    keyFrameworks: [
      "M&A Valuation",
      "Synergy Analysis",
      "DCF / EBITDA Multiples",
      "Cultural Integration",
      "Strategic Alternatives"
    ]
  },
  {
    id: "aurahome-product-innovation",
    title: "AuraHome Systems — SaaS vs. Hardware Product Strategy",
    firm: "Product Innovation & Strategy",
    type: "Product Innovation & Strategy",
    background: "AuraHome Systems, based in Munich, is a leader in the European smart home market. They manufacture high-quality connected thermostats and security cameras. Historically, AuraHome has operated on a transactional model: they sell hardware at a 30% margin, and customers use a free basic app to control it. Revenue is €450M, but growth has stalled as low-cost competitors from Asia have flooded the market with cheaper hardware. Situation / Challenge: To reignite growth and defend against commoditization, AuraHome's Chief Product Officer (CPO) wants to pivot toward a Services-First Strategy. The R&D team has developed a proprietary AI algorithm that optimizes home energy usage, saving users up to 20% on electricity bills. The company is debating two ways to bring this innovation to market: 'Aura Pure' (SaaS Only): A monthly subscription app compatible with any existing smart thermostat (including competitors'). Low barrier to entry. 'Aura Hub' (Integrated Hardware): A new, premium hardware hub with the AI chip embedded. The subscription only works with this specific device. High barrier to entry but creates a 'walled garden.' Objective: Determine which product strategy—Aura Pure (SaaS) or Aura Hub (Hardware + SaaS)—will generate the highest long-term value for the company.",
    question: "Determine which product strategy—Aura Pure (SaaS) or Aura Hub (Hardware + SaaS)—will generate the highest long-term value for the company.",
    questions: [
      {
        number: 1,
        question: "Diagnostic — What are the strategic trade-offs?\nAnalyze the pros and cons of an 'Open Ecosystem' (Software only) vs. a 'Closed Ecosystem' (Proprietary Hardware).\nConsider: Customer acquisition friction, switching costs (lock-in), data advantages, and brand positioning.",
        hints: [
          "Think about the trade-off between scale/accessibility and defensibility/moat.",
          "Consider customer psychology: low friction (easy to start) vs. commitment (hard to leave).",
          "Evaluate how each model affects competitive positioning and pricing power.",
          "Think about platform strategy: open APIs vs. proprietary ecosystem."
        ],
        answer: "Option A: 'Aura Pure' (SaaS Only / Open Ecosystem)\n\nPros:\n- Rapid scale: Works with any existing smart thermostat (massive addressable market)\n- Low barrier to entry: No upfront hardware cost makes trial frictionless\n- Fast customer acquisition: Easy onboarding process\n- High gross margin: Software-only model scales efficiently\n- Platform play: Can become the standard AI layer across multiple hardware brands\n\nCons:\n- Low moat: Easy for customers to cancel/churn (just a subscription)\n- Dependency risk: Relies on competitors' hardware APIs which might change\n- Limited pricing power: Customers perceive as 'just an app'\n- Commoditization risk: Software-only services are easier to replicate\n- No hardware lock-in: Customers can switch to competitors easily\n\nOption B: 'Aura Hub' (Hardware + SaaS / Closed Ecosystem)\n\nPros:\n- High switching costs: Physical installation creates friction and customer lock-in\n- Premium positioning: Hardware signals quality and justifies higher subscription price\n- Better data control: Own the sensors and hardware, complete data ownership\n- Defensible moat: Integrated experience harder to replicate\n- Recurring revenue stability: Lower churn due to hardware investment\n- Cross-selling potential: Upsell additional hardware and services\n\nCons:\n- High barrier to entry: €180 upfront cost limits market penetration\n- Slower growth: Longer sales cycle and customer decision process\n- Inventory risk: Need to manage manufacturing and supply chain\n- Capital intensive: Requires investment in hardware development and production\n- Market size limitation: Only targets customers willing to replace existing hardware\n\nStrategic Positioning:\n- Open (A): Positions AuraHome as a software/AI company, but risks commoditization\n- Closed (B): Positions AuraHome as a premium integrated solution provider with defensible margins",
        exhibitImage: "aurahome-lifecycle-exhibit"
      },
      {
        number: 2,
        question: "Quantitative — Which product creates more value per customer?\nUse Exhibit A to calculate the Net Customer Lifetime Value (CLTV) for both options.\n\nNote:\n• Hardware purchases are one-time\n• Subscriptions are monthly\n• Customer Lifespan = 1 ÷ Monthly Churn Rate\n• Assume discount rate is negligible for this calculation",
        hints: [
          "Calculate Monthly Contribution Margin for subscription first: Price - Cost to Serve.",
          "Calculate Average Customer Lifespan: 1 ÷ Churn Rate.",
          "Calculate total lifetime subscription value: Monthly Margin × Lifespan.",
          "CLTV = Hardware Margin + Subscription Lifetime Value - CAC."
        ],
        answer: "Option A: 'Aura Pure' (SaaS Only)\n\nHardware Margin:\n€0 (no hardware sold)\n\nMonthly Subscription Contribution:\nMonthly margin = €6.00 (price) - €1.00 (cost) = €5.00 per month\n\nCustomer Lifespan:\nLifespan = 1 ÷ 0.05 (5% churn) = 20 months\n\nLifetime Subscription Value:\n€5.00 × 20 months = €100\n\nNet Customer Lifetime Value (CLTV):\nCLTV = €0 (hardware) + €100 (subscription) - €25 (CAC) = €75\n\n---\n\nOption B: 'Aura Hub' (Hardware + SaaS)\n\nHardware Margin:\n€180 (revenue) - €140 (cost) = €40 (one-time)\n\nMonthly Subscription Contribution:\nMonthly margin = €10.00 (price) - €2.00 (cost) = €8.00 per month\n\nCustomer Lifespan:\nLifespan = 1 ÷ 0.02 (2% churn) = 50 months\n(Hardware creates significantly more stickiness)\n\nLifetime Subscription Value:\n€8.00 × 50 months = €400\n\nNet Customer Lifetime Value (CLTV):\nCLTV = €40 (hardware) + €400 (subscription) - €120 (CAC) = €320\n\n---\n\nConclusion:\n\nOption B generates 4.3x more value per customer (€320 vs. €75)\n\nKey Drivers of Difference:\n1. Lower churn: Hardware reduces churn from 5% to 2%, extending customer life from 20 to 50 months (2.5x)\n2. Higher pricing power: Can charge €10/month vs. €6/month due to premium positioning\n3. Hardware margin: Adds €40 immediate contribution\n4. Cumulative effect: Lower churn × higher price × longer life = dramatically higher LTV\n\nThe analysis shows that while Option A has lower acquisition cost (€25 vs. €120), Option B's superior retention and pricing more than compensate, creating a much more valuable customer base despite slower growth.",
        exhibitImage: "aurahome-exhibit"
      },
      {
        number: 3,
        question: "Recommendation — Which path should AuraHome choose?\nBased on the CLTV and strategic fit, recommend a path.\nAddress the risks of your choice (e.g., if you choose Hardware, how do you overcome the high upfront cost?).",
        hints: [],
        answer: "Recommendation: Launch Option B (Aura Hub - Hardware + SaaS)\n\nRationale:\n\nFinancial:\n- 4.3x higher customer lifetime value (€320 vs. €75)\n- Superior unit economics justify higher customer acquisition investment\n- Lower churn (2% vs. 5%) creates predictable, defensible recurring revenue\n- Hardware margin provides immediate cash flow to fund growth\n\nStrategic:\n- Defensible moat: Integrated hardware-software experience is harder to replicate\n- Premium positioning: Protects against commoditization from Asian competitors\n- Data ownership: Full control of sensors and usage data enables continuous AI improvement\n- Platform potential: Can layer additional services (security, HVAC optimization) on hardware base\n- Customer lock-in: Physical installation creates switching costs\n\nCompetitive Positioning:\n- Differentiates from 'app-only' competitors who lack hardware integration\n- Builds on existing hardware manufacturing capabilities and brand\n- Creates barrier against low-cost hardware competitors who lack software sophistication\n\nKey Risk: High Upfront Cost (€180)\n\nThe €180 hardware price creates significant customer acquisition friction and limits market penetration.\n\nMitigation Strategy: Hardware-as-a-Service Model\n\nStructure:\n- Offer customers: €0 upfront + €15/month subscription (24-month contract)\n- This bundles hardware cost into subscription: €180 ÷ 24 = €7.50/month hardware + €7.50/month service\n- Customer perceives as €15/month (vs. €180 upfront shock)\n\nBenefits:\n- Removes upfront barrier while maintaining hardware lock-in\n- Accelerates customer acquisition\n- Improves cash flow predictability\n- 24-month contract reduces effective churn\n- Customer still physically owns hardware (psychological lock-in)\n\nAlternative: Try-Before-You-Buy\n- 30-day free trial with hardware\n- Customers pay €50 deposit (refundable)\n- After trial, either return hardware or commit to subscription\n- Reduces risk perception while maintaining premium positioning\n\nPhased Rollout:\n\nPhase 1 (Months 1-6): Launch in Germany with Hardware-as-a-Service model\n- Target: 5,000 customers (proof of concept)\n- Focus: Premium homeowners with existing high energy bills\n- Validate: Churn assumptions, customer satisfaction, AI effectiveness\n\nPhase 2 (Months 7-12): Expand to adjacent markets (Austria, Switzerland)\n- Scale manufacturing partnerships\n- Refine customer onboarding and support processes\n- Build case studies demonstrating 20% energy savings\n\nPhase 3 (Year 2+): European expansion + Product line extensions\n- Launch additional hardware modules (security, water management)\n- Build ecosystem of interconnected smart home devices\n- Increase CLTV through cross-selling\n\nWhy Not Option A (SaaS Only)?\nWhile Option A scales faster, it is a 'leaky bucket' strategy. High churn (5%) means constant customer replacement. Software-only services are vulnerable to:\n- Competition from free or bundled alternatives\n- Price compression\n- API changes from hardware partners\n- Lack of defensible competitive advantage\n\nNext Steps:\n1. Finalize Hardware-as-a-Service pricing and contract terms\n2. Build inventory for 5,000 unit pilot (Germany)\n3. Create customer acquisition campaign emphasizing energy savings ROI\n4. Establish customer success team to minimize churn\n5. Monitor unit economics and adjust pricing if needed"
      }
    ],
    difficulty: "Beginner",
    modelSolution: "This case assesses product strategy through customer lifetime value analysis, business model trade-offs (open vs. closed ecosystem), and creative solutions to overcome market barriers.",
    keyFrameworks: [
      "Customer Lifetime Value (CLTV)",
      "Unit Economics",
      "Platform Strategy",
      "Product-Market Fit",
      "Subscription Business Models"
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
