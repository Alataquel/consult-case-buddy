// Real consulting case studies from McKinsey, BCG, and Bain practice materials

export interface Case {
  id: string;
  title: string;
  firm: string;
  type: string;
  background: string;
  question: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  modelSolution: string;
  keyFrameworks: string[];
}

export const cases: Case[] = [
  // McKinsey Cases
  {
    id: "mckinsey-electro-light",
    title: "Electro-Light Sports Drink Market Entry",
    firm: "McKinsey",
    type: "Market Sizing",
    background: "Electro-Light is a leading energy company looking to diversify into the sports drink market. They want to understand the market opportunity in Spain before making their investment decision. The sports drink market has been growing steadily, driven by increased health consciousness and sports participation.",
    question: "What is the annual market size for sports drinks in Spain, and should Electro-Light enter this market?",
    difficulty: "Beginner",
    duration: "30-45 minutes",
    modelSolution: `**Market Sizing Approach:**

1. **Population Segmentation:**
   - Spain population: ~47 million
   - Target demographics:
     - Athletes (professional/amateur): 2 million
     - Fitness enthusiasts: 8 million  
     - Casual consumers: 15 million
     - Total addressable: 25 million

2. **Consumption Analysis:**
   - Athletes: 10 drinks/month × €2.50 = €25/month
   - Fitness enthusiasts: 4 drinks/month × €2.50 = €10/month
   - Casual consumers: 1 drink/month × €2.50 = €2.50/month

3. **Market Size Calculation:**
   - Athletes: 2M × €25 × 12 = €600M
   - Fitness: 8M × €10 × 12 = €960M
   - Casual: 15M × €2.50 × 12 = €450M
   - **Total: ~€2.0B annually**

**Recommendation:** Enter the market. Large addressable market with growth potential, though entry strategy should focus on premium positioning and partnerships with gyms/sports clubs.`,
    keyFrameworks: ["Market Sizing", "TAM-SAM-SOM", "Customer Segmentation"]
  },
  
  {
    id: "mckinsey-airline-profitability",
    title: "Regional Airline Profit Decline",
    firm: "McKinsey",
    type: "Profitability",
    background: "A regional airline in Europe has seen its profits decline by 40% over the past two years. The airline operates 50 aircraft serving 25 destinations across Europe. Despite maintaining similar passenger volumes, profitability has dropped significantly. Management is concerned about the sustainability of current operations.",
    question: "What is causing the profit decline and what should the airline do to restore profitability?",
    difficulty: "Intermediate",
    duration: "45-60 minutes",
    modelSolution: `**Profitability Framework Analysis:**

1. **Revenue Analysis:**
   - Passenger volumes stable (eliminate demand issue)
   - Average ticket price down 15% due to competition
   - Ancillary revenue unchanged
   - Load factor declined from 85% to 78%

2. **Cost Analysis:**
   - Fuel costs increased 25% (major driver)
   - Labor costs up 8% (union agreements)
   - Maintenance costs up 12% (aging fleet)
   - Airport fees increased 6%

3. **Key Issues Identified:**
   - External: Fuel price volatility, increased competition
   - Internal: Fleet aging, route optimization needed

4. **Recommendations:**
   - Short-term: Fuel hedging, dynamic pricing implementation
   - Medium-term: Route optimization, fleet renewal planning
   - Long-term: Consider strategic partnerships or consolidation

**Expected Impact:** 15-20% profit recovery within 18 months through combined initiatives.`,
    keyFrameworks: ["Profitability Tree", "Cost-Revenue Analysis", "Porter's Five Forces"]
  },

  // BCG Cases
  {
    id: "bcg-retail-growth",
    title: "Premium Retailer Growth Strategy",
    firm: "BCG",
    type: "Growth Strategy",
    background: "A premium fashion retailer with 150 stores across North America wants to double their revenue within 5 years. They currently generate $2B in annual revenue with strong brand recognition in the luxury segment. The company is exploring various growth options including geographic expansion, new product categories, and digital transformation.",
    question: "How should the retailer achieve their growth objective and what are the key risks?",
    difficulty: "Advanced",
    duration: "60-90 minutes",
    modelSolution: `**Growth Strategy Framework:**

1. **Current State Analysis:**
   - $2B revenue, 150 stores
   - Target: $4B in 5 years (15% CAGR)
   - Strong luxury positioning, high margins

2. **Growth Options Evaluation:**
   
   **Option 1: Geographic Expansion**
   - Potential: $800M (40% of growth)
   - International markets (Europe, Asia)
   - Risk: Brand dilution, operational complexity
   
   **Option 2: Product Category Extension**
   - Potential: $600M (30% of growth)
   - Accessories, home goods, beauty
   - Risk: Core brand positioning
   
   **Option 3: Digital/E-commerce**
   - Potential: $400M (20% of growth)
   - Enhanced online experience, social commerce
   - Risk: Channel conflict with stores
   
   **Option 4: Store Format Innovation**
   - Potential: $200M (10% of growth)
   - Smaller urban stores, pop-up concepts
   - Risk: Execution complexity

3. **Recommended Strategy:**
   - Phase 1: Digital enhancement + selective international expansion
   - Phase 2: Product category extension
   - Phase 3: New store formats
   
   **Key Success Factors:** Brand consistency, operational excellence, talent acquisition`,
    keyFrameworks: ["Ansoff Matrix", "BCG Growth-Share Matrix", "Risk-Return Analysis"]
  },

  // Bain Cases
  {
    id: "bain-tech-acquisition",
    title: "Software Company M&A Analysis",
    firm: "Bain",
    type: "M&A",
    background: "A private equity firm is considering acquiring a mid-market software company for $500M. The target company provides HR management software to mid-size enterprises with $100M in annual recurring revenue and 25% EBITDA margins. The PE firm believes there are significant opportunities to accelerate growth and improve margins.",
    question: "Should the PE firm proceed with the acquisition and what value creation levers should they focus on?",
    difficulty: "Advanced",
    duration: "60-90 minutes",
    modelSolution: `**M&A Analysis Framework:**

1. **Financial Valuation:**
   - Current: $100M ARR, $25M EBITDA
   - Purchase price: $500M (20x EBITDA, 5x Revenue)
   - Market multiples: 15-25x EBITDA for SaaS
   - Valuation appears reasonable for quality asset

2. **Market Assessment:**
   - HR software market growing 8-10% annually
   - Increasing digitalization post-COVID
   - Target serves underserved mid-market
   - Strong competitive positioning

3. **Value Creation Plan:**
   
   **Revenue Growth (Target: $150M ARR in 3 years):**
   - Sales team expansion: +$20M ARR
   - Product enhancement: +$15M ARR
   - Adjacent markets: +$15M ARR
   
   **Margin Improvement (Target: 35% EBITDA):**
   - Operational efficiency: +5%
   - Technology optimization: +3%
   - Go-to-market efficiency: +2%

4. **Exit Strategy:**
   - 3-5 year hold period
   - Strategic sale to larger HR tech company
   - Target 3-5x money multiple

**Recommendation:** Proceed with acquisition. Strong market position with clear value creation opportunities. Focus on revenue growth first, then margin expansion.`,
    keyFrameworks: ["DCF Valuation", "Strategic Options", "Value Creation Plan"]
  },

  {
    id: "bain-pricing-optimization",
    title: "Telecommunications Pricing Strategy",
    firm: "Bain",
    type: "Pricing",
    background: "A telecommunications company with 10 million subscribers is facing increased competition from new market entrants offering low-cost plans. Their current pricing structure has three tiers, but customer acquisition has slowed and churn has increased to 15% annually. Management wants to revamp their pricing strategy to compete effectively while maintaining profitability.",
    question: "How should the telecom company restructure its pricing to improve customer acquisition and retention?",
    difficulty: "Intermediate",
    duration: "45-60 minutes",
    modelSolution: `**Pricing Strategy Framework:**

1. **Current State Analysis:**
   - 10M subscribers, 15% annual churn
   - 3-tier pricing: Basic ($30), Standard ($50), Premium ($80)
   - Average revenue per user (ARPU): $45
   - Customer acquisition cost (CAC): $120

2. **Competitive Landscape:**
   - New entrants offering $25-35 plans
   - Established players maintaining premium pricing
   - Price sensitivity highest in Basic tier

3. **Customer Segmentation:**
   - Price-sensitive (40%): Basic tier, high churn risk
   - Value-conscious (45%): Standard tier, moderate loyalty
   - Premium users (15%): Low price sensitivity, high value

4. **Pricing Recommendations:**
   
   **New Structure:**
   - Essential: $25 (limited data, basic features)
   - Smart: $45 (competitive features, good value)
   - Premium: $75 (unlimited, premium features)
   - Family: $120 (4 lines, shared data)

   **Key Changes:**
   - Introduce low-cost Essential tier
   - Enhance value proposition for Smart tier
   - Bundle family plans for retention
   - Add usage-based options

5. **Expected Impact:**
   - Reduce churn to 10%
   - Increase acquisition by 25%
   - Maintain ARPU through better segmentation

**Implementation:** Phase rollout over 6 months with extensive A/B testing and customer communication.`,
    keyFrameworks: ["Price Elasticity", "Customer Segmentation", "Competitive Positioning"]
  },

  // Additional McKinsey Case
  {
    id: "mckinsey-operations-efficiency",
    title: "Manufacturing Operations Improvement",
    firm: "McKinsey",
    type: "Operations",
    background: "A automotive parts manufacturer is struggling with declining margins due to operational inefficiencies. The company operates 5 manufacturing plants and has seen its operating margin drop from 18% to 12% over two years. Production costs have increased while quality issues have led to higher warranty claims and customer complaints.",
    question: "How can the manufacturer improve operational efficiency and restore profitability?",
    difficulty: "Intermediate",
    duration: "45-60 minutes",
    modelSolution: `**Operations Excellence Framework:**

1. **Current State Assessment:**
   - 5 plants, 12% operating margin (target: 18%)
   - Quality issues: 3% defect rate (industry: 1%)
   - Equipment utilization: 75% (best practice: 85%+)
   - Labor productivity declined 8%

2. **Root Cause Analysis:**
   - Equipment: Aging machinery, inadequate maintenance
   - Process: Inconsistent procedures across plants
   - People: Insufficient training, low engagement
   - Quality: Poor supplier management, weak QC

3. **Improvement Initiatives:**
   
   **Equipment Excellence:**
   - Implement Total Productive Maintenance (TPM)
   - Upgrade critical equipment (ROI: 2-3 years)
   - Target: +5% utilization, -30% downtime
   
   **Process Standardization:**
   - Lean manufacturing implementation
   - Standardize best practices across plants
   - Target: +15% productivity
   
   **Quality Enhancement:**
   - Supplier quality programs
   - Enhanced quality control systems
   - Target: <1% defect rate
   
   **Workforce Development:**
   - Skills training programs
   - Performance management systems
   - Target: +10% labor productivity

4. **Financial Impact:**
   - Equipment improvements: +2% margin
   - Process optimization: +3% margin
   - Quality enhancement: +1% margin
   - Total target: 18% operating margin

**Implementation Roadmap:** 18-month transformation with quick wins in first 6 months and full benefits realized by month 18.`,
    keyFrameworks: ["Operations Excellence", "Lean Manufacturing", "Total Quality Management"]
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