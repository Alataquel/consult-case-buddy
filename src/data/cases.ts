// Real consulting case studies from McKinsey, BCG, and Bain practice materials

export interface Case {
  id: string;
  title: string;
  firm: string;
  type: string;
  background: string;
  question: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  modelSolution: string;
  keyFrameworks: string[];
}

export const cases: Case[] = [
  // McKinsey Official Cases
  {
    id: "mckinsey-beautify",
    title: "Beautify - Virtual Beauty Consultants",
    firm: "McKinsey",
    type: "Operations",
    background: "Beautify is a global prestige cosmetics company that sells its products mainly inside high-end department stores such as Harrods and Shanghai No. 1. It also has a presence online with specialty retailers like Sephora. Beautify produces makeup, fragrance, and skin care products sold under several different brands. However, consumers are shifting more to online shopping, and too many beauty consultants are left working in empty department stores.",
    question: "Should Beautify train the majority of beauty consultants to use virtual channels to connect with customers, and could this be profitable?",
    difficulty: "Intermediate",
    modelSolution: `**Key Considerations for Transition:**

1. **Employee Capability Assessment:**
   - Digital literacy and comfort with technology
   - Current skill sets vs. required virtual skills
   - Training needs and investment required
   - Change management and resistance

2. **Customer Response:**
   - Virtual experience features that matter:
     * Live video consultations
     * Personalized product recommendations
     * Virtual try-on technology
     * Easy scheduling and convenience
     * Access to consultant's expertise anytime
   - Balance of high-touch service in virtual format

3. **Financial Analysis:**
   - Initial Investment: €150M (€50M IT, €25M training, €50M remodeling, €25M inventory)
   - Expected Revenue Impact: 10% increase (€130M on €1.3B base)
   - Ongoing Costs: €10M annually
   - Breakeven: Year 2 (Year 1: -€20M, Year 2: +€120M cumulative)

**Recommendation:** Proceed with measured rollout. Strong financial case with 2-year payback, but success depends on effective change management and customer adoption.`,
    keyFrameworks: ["Change Management", "Profitability Analysis", "Customer Experience"]
  },
  
  {
    id: "mckinsey-diconsa",
    title: "Diconsa - Financial Services for Rural Mexico",
    firm: "McKinsey",
    type: "Social Impact",
    background: "The Bill & Melinda Gates Foundation wants to reduce extreme poverty worldwide. Mexico's rural population is relatively poor, relying on government benefits collected in cash from distant state-owned bank branches. The Mexican government operates 22,000 Diconsa stores throughout Mexico providing basic goods to rural populations.",
    question: "Can the Diconsa network be leveraged to provide basic financial services to Mexico's rural population?",
    difficulty: "Advanced",
    modelSolution: `**Investigation Framework:**

1. **Feasibility Analysis:**
   - Infrastructure readiness at Diconsa stores
   - Technology and security requirements
   - Staff training and capability
   - Regulatory compliance

2. **Market Analysis:**
   - Current cost: 50 pesos/month per family for travel
   - Potential savings: 30% reduction (15 pesos/month)
   - Rural population: 20M (20% of 100M)
   - Benefit recipients: 10M (50% of rural)
   - Families: 2.5M (10M ÷ 4 members/family)
   - **Annual savings: 450M pesos** (2.5M families × 15 pesos × 12 months)

3. **Customer Concerns:**
   - Low education levels and banking unfamiliarity
   - Security and fraud risks
   - Trust in financial institutions
   - Solutions: Simple products, strong security, education programs

4. **Implementation Strategy:**
   - Start with benefit disbursement
   - Gradually add savings, bill payment, insurance
   - Partner with existing bank infrastructure
   - Focus on security and education

**Recommendation:** Pursue partnership model. Significant social impact with 450M pesos annual savings for rural families, while building foundation for broader financial inclusion.`,
    keyFrameworks: ["Social Impact Analysis", "Market Sizing", "Stakeholder Analysis"]
  },
  
  {
    id: "mckinsey-electrolight",
    title: "Electro-Light Sports Drink Launch",
    firm: "McKinsey",
    type: "Market Entry",
    background: "SuperSoda is a top-three beverage producer in the United States with integrated operations including brand design, manufacturing, and distribution. The company is evaluating the launch of 'Electro-Light,' a flavored sports drink with lower sugar content focused on electrolyte replenishment, capitalizing on trends away from high-sugar products.",
    question: "Should SuperSoda launch Electro-Light, and what factors should guide this decision?",
    difficulty: "Intermediate",
    modelSolution: `**Launch Decision Framework:**

1. **Key Factors to Consider:**
   - Market size and growth trajectory
   - Competitive landscape
   - Consumer preferences and trends
   - Internal capabilities (production, distribution)
   - Financial requirements and returns

2. **Market Analysis:**
   - US sports drink market: 3.2B gallons
   - Electrolyte drinks: 25% share (800M gallons)
   - Current players: CoolSweat (50%), RecoverPlus (30%)
   - Available share: 20% (160M gallons)

3. **Break-Even Calculation:**
   - Price to retailers: $2 per bottle (16 oz = 1/8 gallon)
   - Production cost: $1.90 per bottle
   - Contribution margin: $0.10 per bottle
   - Fixed costs: $40M
   - Break-even volume: 400M bottles (50M gallons)
   - **Required market share: 12.5%** (50M ÷ 400M electrolyte gallons)

4. **Go-to-Market Strategy:**
   - Leverage existing retailer relationships
   - Emphasize health/low-sugar positioning
   - Strong marketing campaign
   - Promotional pricing and sampling
   - Target health-conscious consumers

**Recommendation:** Launch with strong marketing support. Break-even at 12.5% share is achievable given SuperSoda's distribution strength and favorable market trends, though competitive response requires monitoring.`,
    keyFrameworks: ["Market Entry", "Break-Even Analysis", "Competitive Strategy"]
  },
  
  {
    id: "mckinsey-globapharm",
    title: "GlobaPharm - Biologicals Acquisition",
    firm: "McKinsey",
    type: "M&A",
    background: "GlobaPharm is a major pharmaceutical company with $10B annual revenue, traditionally focused on small molecule drugs. The company wants to enter the rapidly growing biologicals segment. To jumpstart capabilities, GlobaPharm is considering acquiring BioFuture, a leading biologicals start-up worth $1 billion, rather than building from scratch or partnering.",
    question: "Should GlobaPharm acquire BioFuture to enter the biologicals market?",
    difficulty: "Advanced",
    modelSolution: `**M&A Decision Framework:**

1. **Strategic Fit Assessment:**
   - Market attractiveness: Biologicals fast-growing segment
   - Competitive urgency: Competitors several years ahead
   - Capability gap: GlobaPharm lacks biologicals R&D
   - Build vs. buy: Acquisition faster than organic development

2. **Target Evaluation:**
   - BioFuture profile: 12 years old, 200 employees
   - Location: San Francisco (biotech hub)
   - Valuation: $1B (publicly traded)
   - Leadership: Founded by prominent scientists
   - Technology platform and pipeline assessment

3. **Financial Analysis:**
   - Purchase price relative to revenue and pipeline value
   - Integration costs and synergy potential
   - Time to commercialization
   - ROI projections and payback period
   - Comparison to partnership or organic build costs

4. **Integration Risks:**
   - Cultural fit (large pharma vs. start-up)
   - Talent retention (key scientists and researchers)
   - Operational integration challenges
   - Geographic considerations (Germany HQ vs. SF operations)

5. **Alternative Options:**
   - Partnership with multiple start-ups
   - Licensing agreements
   - Organic capability building
   - Smaller acquisitions + partnerships

**Recommendation:** Conditional proceed. Strategic rationale strong given competitive timing and capability needs. Success depends on: (1) thorough due diligence on pipeline value, (2) strong retention plan for key talent, (3) maintaining start-up culture while integrating R&D processes.`,
    keyFrameworks: ["M&A Strategy", "Strategic Fit Analysis", "Valuation"]
  },
  
  {
    id: "mckinsey-national-education",
    title: "Transforming Loravia's Education System",
    firm: "McKinsey",
    type: "Public Sector",
    background: "Loravia is a fictional Eastern European country with 20 million people and an emerging economy. After decades under communism, the government has put a new economic plan in place to compete with European neighbors. The government realizes education is critical to meeting economic development goals and wants to transform its public school system over the next ten years.",
    question: "How can Loravia diagnose its current education system and identify the most important areas for improvement?",
    difficulty: "Advanced",
    modelSolution: `**Education System Diagnostic Framework:**

1. **Current State Assessment:**
   - Student outcomes (test scores, graduation rates)
   - Teacher quality and training
   - School infrastructure and resources
   - Curriculum relevance to economic goals
   - Administrative efficiency
   - Funding levels and allocation

2. **International Benchmarking:**
   - Compare to peer countries and aspirational systems
   - Identify performance gaps
   - Best practice analysis
   - Cost-effectiveness comparisons

3. **Root Cause Analysis:**
   - Teacher capabilities and motivation
   - Resource constraints
   - Curriculum gaps
   - Administrative barriers
   - Funding inadequacy or misallocation
   - Stakeholder alignment

4. **Priority Areas for Improvement:**
   - Teacher development and recruitment
   - Curriculum modernization (STEM, critical thinking)
   - Technology integration
   - School infrastructure upgrades
   - Performance measurement systems
   - Parental and community engagement

5. **Implementation Roadmap:**
   - Quick wins (1-2 years)
   - Medium-term initiatives (3-5 years)
   - Long-term transformation (6-10 years)
   - Change management strategy
   - Funding requirements and sources

**Recommendation:** Prioritize teacher quality and curriculum modernization. Research shows teacher quality is the #1 in-school factor affecting student outcomes. Combine with infrastructure improvements and measurement systems for comprehensive transformation aligned to economic development goals.`,
    keyFrameworks: ["Public Sector Strategy", "System Diagnostics", "Change Management"]
  },
  
  {
    id: "mckinsey-talbot-trucks",
    title: "Talbot Trucks - Electric Vehicle Strategy",
    firm: "McKinsey",
    type: "Sustainability",
    background: "Talbot Trucks is a Europe-based private truck OEM and quality manufacturing leader. The company produces and sells trucks worldwide to large trucking companies and owner-operators. Currently, trucks are mainly diesel-powered. Talbot Trucks wants to explore electric trucks (eTrucks) to reduce carbon footprint, despite the disruptive technology requiring new designs and charging infrastructure.",
    question: "Is investment in eTruck manufacturing attractive for Talbot Trucks in the European market?",
    difficulty: "Advanced",
    modelSolution: `**eTruck Investment Assessment:**

1. **Market Attractiveness:**
   - Regulatory environment (emissions standards, incentives)
   - Total addressable market size in Europe
   - Growth projections and adoption timeline
   - Customer willingness to pay premium
   - Competitor positioning and capabilities

2. **Customer Segments:**
   - Large fleet operators: Lower TCO focus, can invest in charging
   - Owner-operators: Higher upfront cost sensitivity, limited charging access
   - Urban delivery: Shorter routes, suitable for current battery range
   - Long-haul: Battery limitations, charging infrastructure gaps

3. **Economic Feasibility:**
   - eTruck production costs vs. diesel trucks
   - Battery costs and trajectory
   - Charging infrastructure requirements
   - Total cost of ownership for customers
   - Break-even analysis and payback period

4. **Capability Requirements:**
   - Electric drivetrain technology and IP
   - Battery sourcing and partnerships
   - Manufacturing line conversion costs
   - Service network training and equipment
   - Software and connectivity capabilities

5. **Risks and Challenges:**
   - Technology uncertainty (battery improvements)
   - Infrastructure development pace
   - Competitor response and patents
   - Supply chain for batteries and components
   - Customer adoption barriers

**Recommendation:** Phased entry strategy. Start with urban delivery segment where value proposition is strongest (shorter routes, better TCO). Partner with battery suppliers rather than building capability. Invest in charging partnerships. Monitor long-haul segment as battery technology improves. Regulatory tailwinds support investment timing.`,
    keyFrameworks: ["Technology Strategy", "Market Entry", "Sustainability"]
  },

  // Bain Official Cases
  {
    id: "bain-coffeeco",
    title: "CoffeeCo - Cambridge Coffee Shop",
    firm: "Bain",
    type: "Market Entry",
    background: "Your university friend is considering opening a coffee shop in Cambridge, England, a large university city 90 minutes from London. She sees business potential but wants advice on whether this is a good investment opportunity.",
    question: "Should your friend open a coffee shop in Cambridge?",
    difficulty: "Beginner",
    modelSolution: `**Coffee Shop Investment Analysis:**

1. **Market Size Estimation:**
   - Cambridge population: 100,000
   - Average consumption: 1 cup/day per person
   - Annual market: 100,000 × 365 = 36.5M cups
   - Assuming 70% market capture (not everyone buys daily)
   - **Addressable market: ~25M cups or 7M realistic**

2. **Break-Even Analysis:**
   - Price per coffee: £3
   - Variable cost per cup: £1
   - Contribution margin: £2 per cup
   - Fixed costs (annual): £163,740
   - One-time opening cost: £245,610
   
   Break-even calculation:
   - (3 × Q) - (163,740 + 245,610 + Q) = 0
   - 2Q = 409,350
   - **Q = 204,675 cups in year 1**

3. **Market Share Assessment:**
   - Required cups: 204,675
   - Total market: ~7M cups
   - **Required market share: ~3%**
   - This is achievable for a well-positioned shop

4. **Key Success Factors:**
   - Location (foot traffic, visibility)
   - Differentiation from competitors
   - Competitive landscape intensity
   - Quality and service excellence
   - Investment timeline and patience

5. **Additional Considerations:**
   - Opening cost payback period
   - Owner's time commitment
   - Alternative investment returns
   - Risk tolerance and runway

**Recommendation:** Cautiously proceed. Breaking even at 3% share is achievable, but need to understand: (1) competitive intensity, (2) differentiation strategy, (3) timeline expectations, (4) location specifics. Opening cost means profitability may take 2-3 years.`,
    keyFrameworks: ["Market Sizing", "Break-Even Analysis", "Profitability"]
  },

  // Additional original cases maintaining variety
  {
    id: "mckinsey-electro-light-original",
    title: "Sports Drink Market Entry - Spain",
    firm: "McKinsey",
    type: "Market Sizing",
    background: "Electro-Light is a leading energy company looking to diversify into the sports drink market. They want to understand the market opportunity in Spain before making their investment decision. The sports drink market has been growing steadily, driven by increased health consciousness and sports participation.",
    question: "What is the annual market size for sports drinks in Spain, and should Electro-Light enter this market?",
    difficulty: "Beginner",
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