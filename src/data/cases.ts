// Real consulting case studies from McKinsey, BCG, and Bain practice materials

export interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
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
  {
    id: "mckinsey-beautify",
    title: "Beautify Case Interview",
    firm: "McKinsey",
    type: "Digital Transformation",
    background: "Beautify is a global prestige cosmetics company that sells its products mainly inside high-end department stores such as Harrods and Shanghai No. 1. It also has a presence online with specialty retailers like Sephora. Beautify produces a number of makeup, fragrance, and skin care products sold under several different brands.\n\nIn department stores, beauty consultants play a critical role with consumers: approaching 'passive' customers, demonstrating their knowledge of the products, actively selling the products, and maintaining a loyal customer base of repeat buyers. These consultants are hired directly by Beautify or through specialist, third-party agencies that find new recruits for a fee. Beautify is then responsible for selecting, training, and paying the consultants. Within Beautify, beauty consultants are managed independently by each brand in each country. However, consumers are shifting more to online shopping, and too many beauty consultants are left working in empty department stores.\n\nBeautify's president and COO engaged McKinsey to help evaluate if training the majority of beauty consultants to use virtual channels to connect with customers could be profitable for the company.",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "Beautify is excited to support its current staff of beauty consultants on the journey to becoming virtual social media-beauty advisors. Consultants would still lead the way in terms of direct consumer engagement and would be expected to maintain and grow a group of clients. They would sell products through their own pages on beautify.com, make appearances at major retail outlets, and be active on all social media platforms.\n\nWhat possible factors should Beautify consider when shifting this group of employees toward a new set of responsibilities?",
        hints: [
          "Take time to organize your thoughts before answering. This will help show your interviewer that you have a logical approach and can think in an organized way, regardless of the accuracy of the outcome.",
          "Develop an overall approach before diving into details."
        ],
        answer: "Some of the factors you might discuss with your interviewer could include:\n\n• Retailer response: How will retailers respond to consumers buying directly from beautify.com? What kinds of financial arrangements will Beautify have to work out with its retail partners?\n\n• Competitor response: Do other beauty companies offer virtual assistants? If yes, how successful are they? If no, do they have plans to digitize the personal selling experience?\n\n• Current capabilities: What is the current skill set of beauty consultants regarding social media? How many already have an online presence, for example, those with more professional accounts on social media platforms or a personal beauty or skincare blog? Would it be possible to hire new advisors with these marketing skills?\n\n• Brand image: What are the implications for Beautify's brand if hundreds of advisors suddenly start posting about its products? How could this be leveraged to make Beautify seem more attractive as an employer in the market?"
      },
      {
        number: 2,
        question: "One of the key areas that Beautify wants to understand is the reaction of current and potential new customers to the virtual social media-beauty advisors.\n\nImagine you are a current Beautify customer and you mostly shop at your local department store because you enjoy the high-touch service offered by in-store consultants. What features would make you consider switching to a mostly virtual sales experience?",
        hints: [
          "Consider the issues raised in the question and group your thoughts around them. This will ensure you are giving the most relevant answers."
        ],
        answer: "Some of the features you might discuss with your interviewer could include:\n\n• Getting real-time feedback on new looks: Beautify could develop a 'selfie mirror' mobile app, which would let you upload a selfie and get tailored recommendations from your advisor. They could also potentially use that image to show you new ideas, colors, or product lines, and make suggestions such as, 'That lipstick is too matte, but here's what a glossier formulation would look like.'\n\n• Joining an online social community: Advisors could start closed groups, or a blog, where they encourage and respond to comments. This is a great way to connect with other people who have similar interests and learn what makeup and skincare products work well for them.\n\n• Learning about latest trends from someone you trust: If an advisor is active on social media, like Instagram, TikTok, or Douyin, they probably post several times a day. Some of it will be personal, to build rapport, but much of it will be related to beauty and skincare. An advisor might offer tutorials, give product reviews, discuss common beauty myths, or more.\n\n• Responding privately to a particular concern: If you're having skin issues, you could contact the advisor privately. The two of you could connect to discuss your specific concerns. Again, the advisor would understand which products you already use and could make appropriate adjustments."
      },
      {
        number: 3,
        question: "The discussion about virtual advisors has been energizing, but you'd like to ground the discussion in some analysis. You've always found it helpful to frame an investment in terms of how long it will take to turn profitable, such as when incremental revenues are greater than the cost of the project.\n\nYou sit down with your teammates from Beautify finance and come up with the following assumptions:\n\n• With advisors, you expect ten percent overall increase in incremental revenue—the team assumes that Beautify will gain new customers who enjoy the experience as well as increased online sales through those engaged, but it will also lose some to other brands that still provide more in-store service. The team assumes this will happen in the first year.\n• In that first year, Beautify will invest €50 million in IT, €25 million in training, €50 million in remodeling department store counters, and €25 million in inventory.\n• All-in yearly costs associated with a shift to advisors are expected to be €10 million and will start during the first year.\n• Beautify's revenues are €1.3 billion.\n\nHow many years would it take until the investment in advisors turns profitable?",
        hints: [
          "Don't feel rushed into performing calculations. Take your time.",
          "Remember that calculators are not allowed - you may want to write out your calculations on paper during the interview.",
          "Talk your interviewer through your steps so that you can demonstrate an organized approach; the more you talk, the easier it will be for your interviewer to help you."
        ],
        answer: "One possible approach to discuss with your interviewer could be:\n\n• Incremental revenues = €130 million: €130 million is ten percent of €1.3 billion\n• Resulting profits = €120 million: €130 million minus €10 million annual all-in additional costs for new beauty advisors\n• Expected upfront investment = €150 million: 50 + 25 + 50 + 25\n• This investment will be profitable after 1.25 years or one year and three months: €150 million investment divided by €120 million annual profit = 1.25 years"
      }
    ],
    difficulty: "Intermediate",
    modelSolution: "This is a multi-part case study covering digital transformation strategy, customer experience design, and financial analysis. See individual question answers for detailed solutions.",
    keyFrameworks: ["Digital Transformation", "Change Management", "Cost-Benefit Analysis", "Customer Experience"]
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
    keyFrameworks: ["Social Impact", "Financial Inclusion", "Stakeholder Analysis", "Risk Assessment"],
    exhibitImage: "diconsa-exhibit"
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
    keyFrameworks: ["Product Launch", "Market Sizing", "Breakeven Analysis", "Competitive Analysis"],
    exhibitImage: "electro-light-exhibit"
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
    keyFrameworks: ["M&A Analysis", "Due Diligence", "Risk Assessment", "Probability Analysis"],
    exhibitImage: "globapharm-exhibit"
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
    keyFrameworks: ["Public Sector Strategy", "Benchmarking", "Education Policy", "Data Analysis"],
    exhibitImage: "national-education-exhibit"
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
    keyFrameworks: ["Total Cost of Ownership", "Sustainability Strategy", "Market Assessment", "Investment Analysis"],
    exhibitImage: "talbot-trucks-exhibit"
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
