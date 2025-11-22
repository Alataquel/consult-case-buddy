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
  {
    id: "mckinsey-beautify",
    title: "Beautify Case Interview",
    firm: "McKinsey",
    type: "Market Entry",
    background: "Beautify is a global prestige cosmetics company that sells its products mainly inside high-end department stores such as Harrods and Shanghai No. 1. It also has a presence online with specialty retailers like Sephora. Beautify produces makeup, fragrance, and skin care products sold under several brands. In department stores, beauty consultants play a critical role with consumers: approaching passive customers, demonstrating product knowledge, actively selling products, and maintaining a loyal customer base. However, consumers are shifting more to online shopping, and too many beauty consultants are left working in empty department stores.",
    question: "Beautify's president and COO engaged McKinsey to help evaluate if training the majority of beauty consultants to use virtual channels to connect with customers could be profitable for the company. What possible factors should Beautify consider when shifting this group of employees toward a new set of responsibilities?",
    difficulty: "Intermediate",
    modelSolution: "Key factors to consider include: (1) Retailer response - how will retailers respond to consumers buying directly from beautify.com and what financial arrangements are needed? (2) Competitor response - do other beauty companies offer virtual assistants and how successful are they? (3) Current capabilities - what is the current skill set of beauty consultants regarding social media? (4) Brand image - what are implications if hundreds of advisors start posting about products? Analysis shows that with 10% revenue increase (€130M on €1.3B base), minus €10M annual costs, profit is €120M. With €150M upfront investment (€50M IT + €25M training + €50M remodeling + €25M inventory), the investment becomes profitable after 1.25 years.",
    keyFrameworks: ["Market Analysis", "Cost-Benefit Analysis", "Change Management", "Digital Transformation"]
  },
  {
    id: "mckinsey-diconsa",
    title: "Diconsa Case Interview",
    firm: "McKinsey",
    type: "Market Entry",
    background: "The Bill & Melinda Gates Foundation wants to reduce extreme poverty worldwide. The majority of Mexico's rural population is relatively poor, relying in part on government benefits. Since they lack bank accounts, they collect benefits in cash from limited state-owned bank branches often far from where they live, consuming time and risking crime. The Mexican government owns Diconsa, a chain of 22,000 stores providing basic goods to rural populations.",
    question: "McKinsey has been asked to investigate and assess the possibility of using the Diconsa network to provide basic financial services to supplement the limited number of state-owned bank branches. What should the team investigate to determine whether the Diconsa network could and should be leveraged?",
    difficulty: "Advanced",
    modelSolution: "Key investigation areas: (1) Benefits to rural population - time/expense savings, better security, access to broader financial services. Currently costs families 50 pesos/month; Diconsa would reduce by 30%. With 20% rural population (20M people), half receiving benefits, that's 5M families or 2.5M receiving benefits. Annual savings: 2.5M families × 600 pesos × 30% = 450M pesos saved. (2) Benefits to government - lower administration costs, better financial management, increased Diconsa business. (3) Risks - does Diconsa have capacity for financial payments? Greater fraud risk? Survey data shows significant regional differences in trust, security concerns, and cost perceptions, especially in Region B with higher crime.",
    keyFrameworks: ["Social Impact", "Financial Inclusion", "Stakeholder Analysis", "Risk Assessment"]
  },
  {
    id: "mckinsey-electro-light",
    title: "Electro-Light Case Interview",
    firm: "McKinsey",
    type: "New Product",
    background: "SuperSoda is a top-three beverage producer in the United States that leads its own brand design, marketing, and sales efforts. The company owns its entire beverage supply chain, including production of concentrates, bottling and packaging, and distribution. SuperSoda is evaluating the launch of Electro-Light, a flavored sports drink formulated to focus on electrolyte replenishment with lower sugar content compared to most other sports drinks, capitalizing on the trend away from high-sugar products.",
    question: "SuperSoda's vice president of marketing has asked McKinsey to help analyze key factors surrounding the launch of Electro-Light. What key factors should SuperSoda consider when deciding whether or not to launch Electro-Light?",
    difficulty: "Intermediate",
    modelSolution: "Key factors: (1) Consumers - who drinks sports drinks and what segments to address? (2) Cost and price - profitability vs current products, ability to sell at market price given production costs. (3) Competitors - which products will Electro-Light compete with and how will they react? (4) Capabilities - marketing/sales capabilities available, specialized production needs, capacity in current facilities. (5) Channels - ideal distribution channel and retailer willingness. Breakeven analysis: US sports drink market is 8B gallons, electrolyte drinks are 5% (400M gallons). At $2 retail price, $1.90 cost per 16oz bottle, $0.10 profit per unit. Need 400M units to cover $40M fixed costs = 50M gallons = 12.5% market share of electrolyte drinks (would be #2 behind CoolSweat's 20%).",
    keyFrameworks: ["Product Launch", "Market Sizing", "Breakeven Analysis", "Competitive Analysis"]
  },
  {
    id: "mckinsey-globapharm",
    title: "GlobaPharm Case Interview",
    firm: "McKinsey",
    type: "M&A",
    background: "GlobaPharm is a major pharmaceutical company with $10 billion annual revenue and headquarters in Germany. The company has a successful tradition in researching, developing, and selling 'small molecule' drugs. GlobaPharm is interested in entering the rapidly growing 'biologicals' segment - proteins or other large, complex molecules that can treat conditions not addressable by traditional drugs. To jumpstart its biologicals program, GlobaPharm wants to acquire BioFuture, a leading biologicals start-up based in San Francisco, founded 12 years ago, employing 200 people, publicly traded and currently worth $1 billion.",
    question: "GlobaPharm has engaged McKinsey to evaluate the BioFuture acquisition and advise on its strategic fit. Should GlobaPharm acquire BioFuture? What factors should the team consider?",
    difficulty: "Advanced",
    modelSolution: "Key evaluation factors: (1) Value of BioFuture's drug pipeline - number of drugs in development, quality/likelihood of success, potential revenues. (2) R&D capabilities - scientific talent, intellectual property, facilities and equipment. (3) Marketing/sales capabilities - relationships with key opinion leaders. (4) Acquisition price relative to value. Drug development analysis: Phase I (70% success) → Phase II (40%) → Phase III (50%) → Filing (90%) = 12.6% overall success rate. If a drug passing Phase II is worth $540M (45% × $1.2B), to justify $150M investment in Phase II, success rate must increase to 80% (40 percentage point increase), which seems very challenging. Integration risks: cultural differences, language barriers, time zone management (9 hour difference), potential departure of key scientific talent.",
    keyFrameworks: ["M&A Analysis", "Due Diligence", "Risk Assessment", "Probability Analysis"]
  },
  {
    id: "mckinsey-national-education",
    title: "National Education Case Interview",
    firm: "McKinsey",
    type: "Public Sector",
    background: "Loravia is a fictional Eastern European country with 20 million population. The government wants to make major improvements in both quantity and quality of education for its children to support economic development goals and compete with European neighbors. Schooling in Loravia is completely public, provided by government-run schools admitting children ages 5-18. The first stage involves diagnosing the current state to determine how best to meet future aspirations.",
    question: "McKinsey has been asked to support the Loravian department of education in diagnosing the current state of its school system and identifying the most important areas for improvement. What issues would you want to investigate?",
    difficulty: "Intermediate",
    modelSolution: "Key investigation areas: (1) Quantity of education - access by age/region/demographic, supply of teachers and resources, budgets at national/regional/local levels. (2) Quality of education - curriculum quality, teaching quality, teacher qualifications. (3) Broader economic objectives - priority industries/sectors and needed skills, how well current system develops these skills. Data analysis reveals: Loravia spends more per student ($5,000) and has better student-to-teacher ratio (18:1) than most neighbors and economic peers, yet has one of lowest international assessment scores (41). This suggests spending and ratios alone won't improve outcomes - teacher quality and curriculum content are critical. School consolidation analysis: With 15% of 20M population in school (3M students) and current 500 students/school, there are 6,000 schools. Matching Neighbor C's 800 students/school would mean 3,750 schools - a reduction of 2,250 schools (37.5%).",
    keyFrameworks: ["Public Sector Strategy", "Benchmarking", "Education Policy", "Data Analysis"]
  },
  {
    id: "mckinsey-talbot-trucks",
    title: "Talbot Trucks Case Interview",
    firm: "McKinsey",
    type: "Sustainability",
    background: "Talbot Trucks is a Europe-based private truck OEM producing and selling trucks worldwide. The company is considered a leader in quality manufacturing with a customer base including large trucking companies with thousands of trucks and owner-operators with fewer trucks. Trucks today are mainly powered by diesel engines requiring carbon-based petroleum fuel. Talbot Trucks is interested in exploring ways to reduce the carbon footprint of its vehicles, specifically electric trucks (eTrucks). ETrucks differ in design (e-motor and batteries vs combustion engines) and fueling (slow charging vs quick diesel refilling).",
    question: "The CEO of Talbot Trucks has approached McKinsey to help determine the attractiveness of an investment in eTruck manufacturing for its European market. What information would you want to collect?",
    difficulty: "Advanced",
    modelSolution: "Key information to collect: (1) Market - differences between large and small customers, geographic receptivity in Europe, customer perception vs competitors, potential substitutes like rail. (2) Financials - revenue potential across segments, main cost drivers, expected pricing. (3) Risks - Talbot's experience with eTrucks, ability to produce cost-efficiently, impact on current truck sales, legislation forcing change. TCO analysis for diesel truck: Driver €36K + Depreciation €25K (€100K over 4 years) + Fuel €30K (30L/100km × €1/L × 100K km) + Maintenance €5K + Other €10K = €106K annual total. For eTruck to match: €106K total - €36K driver - €15K fuel (100kWh/100km × €0.15/kWh × 100K km) - €3K maintenance - €5K other = €47K annual depreciation needed. Therefore, maximum eTruck price = €47K × 4 years = €188K. Key insight: fuel and depreciation are the major cost drivers, and eTrucks become more attractive the more distance covered annually.",
    keyFrameworks: ["Total Cost of Ownership", "Sustainability Strategy", "Market Assessment", "Investment Analysis"]
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
