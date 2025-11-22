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
    type: "Financial Inclusion",
    background: "The Bill & Melinda Gates Foundation is a private organization with vast ambitions; one of its goals is to reduce extreme poverty worldwide. The foundation has asked McKinsey to design a basic financial-services offering for residents in remote communities in Mexico.\n\nThe majority of Mexico's rural population is relatively poor, relying in part on government benefits for their livelihood. Since they tend not to have bank accounts, they usually collect those benefits in cash from a limited number of state-owned bank branches. These branches are often a long way from where the recipients live, so it can take a lot of time and effort to collect benefits. In addition, while traveling to the branches, people can be at risk of falling victim to crime.\n\nThe Mexican government also owns and operates a chain of 22,000 stores throughout Mexico, called Diconsa, which provide basic food, clothes, and other essential goods to rural populations. These stores are supplied through a network of central and regional warehouses and several thousand delivery trucks.\n\nMcKinsey has been asked to investigate and assess the possibility of using the Diconsa network to provide a set of basic financial services to supplement the limited number of state-owned bank branches. This would start with dispensing benefit payments and would gradually grow to include savings accounts, bill payments, insurance, loans, and other financial products.",
    question: "Multi-part case with 4 questions",
    questions: [
      {
        number: 1,
        question: "What should the team investigate to determine whether the Diconsa network could and should be leveraged to provide a range of basic financial services to Mexico's rural population?",
        hints: [
          "Take time to organize your thoughts before answering. This will help show your interviewer that you have a logical approach and can think in an organized way, regardless of the accuracy of the outcome.",
          "Develop an overall approach before diving into details."
        ],
        answer: "Some of the factors you might discuss with your interviewer could include:\n\n• Benefits to the Mexican rural population: How much time, effort, and expense would a benefit recipient save through the Diconsa network—for example, through shorter travel times? Beyond what was stated in the summary, what benefits would there be for rural populations being given greater access to a broader range of financial services? Would there be better security for their money?\n\n• Benefits to the government, state bank, and Diconsa network: Would the government benefit in terms of increased compliance with, or the collection of benefits such as lower administration costs? Would these financial services result in better financial management among the rural population, like more business for Diconsa stores? Would this alternative model reduce pressure on and increase efficiency at the bank branches that currently distribute benefit payments?\n\n• Potential risks due to this venture: Does the Diconsa network have the capacity or ability to deal with financial payments and products? Does the state bank have the capacity to operate financial services across a much larger network of outlets? Is there a greater risk of fraud or theft due to less centralized control of benefit payments?"
      },
      {
        number: 2,
        question: "The team has estimated that it currently costs a family 50 pesos per month in transportation and food to make the journey to collect benefit payments. The team also estimates that if benefits were available for collection at local Diconsa stores, the cost would be reduced by 30 percent.\n\nTwenty percent of Mexico's population is rural, and of that number, half currently receive state benefits.\n\nYou can assume that Mexico has a population of 100 million.\n\nYou can also assume that families in Mexico have an average four members, and that this does not vary by region.\n\nIf every family could collect state benefits at their local Diconsa stores, how much in total per year would be saved across all Mexican rural families receiving state benefits?",
        hints: [
          "Don't feel rushed into performing calculations. Take your time.",
          "Remember that calculators are not allowed—you may want to write out your calculations on paper during the interview.",
          "Talk your interviewer through your steps so that you can demonstrate an organized approach; the more you talk the easier it will be for your interviewer to help you."
        ],
        answer: "One possible approach to discuss with your interviewer could be:\n\n• There are five million families in rural Mexico: 20 percent times 100 million, divided by four people per family\n• There are 2.5 million families receiving benefits: 50 percent times five million families\n• Each family currently spends 600 pesos per year to receive benefits: 50 pesos per month times 12 months\n• In total, families spend 1.5 billion pesos per year to receive benefits: 600 pesos times 2.5 million families\n• 450 million pesos could be saved: 30 percent times 1.5 billion pesos"
      },
      {
        number: 3,
        question: "The team conducted a survey on a sample of the rural population in three different regions of Mexico. Participants were shown several statements about the concept of collecting benefits at their nearest Diconsa store and asked how much they agreed with each statement. The average response to some of the questions in each region is shown in the exhibit above.\n\nWhat are your observations regarding this information, and how would you explain these trends?",
        hints: [
          "Take some time to look at the information and note down any observations you have.",
          "Challenge yourself to identify trends that are not immediately obvious from the data."
        ],
        answer: "Some of the observations you might discuss with your interviewer could include:\n\n• There are significant differences by region as to how interested people are in collecting benefits at their nearest Diconsa\n• Everyone has security concerns about collecting benefits at a Diconsa, but this is especially true in Region B\n• People are not so concerned about whether they will receive their benefits, except in Region B\n• Not everyone is completely convinced it will cost them less to collect benefits from their nearest Diconsa, despite the fact that they all agree it will save time\n• Broadly speaking, security, trust, and cost effectiveness all seem to influence whether someone is interested in collecting benefits at a Diconsa. People's perception of these seem to differ by region, with Region B being a particular issue. One potential explanation for the results in Region B is that this region has far higher levels of crime and corruption, which means people are less convinced that they will receive their benefits or that they can keep them secure once received."
      },
      {
        number: 4,
        question: "In a subsequent meeting, representatives from the state-owned bank express concern about how challenging it will be to offer basic financial products to the rural population.\n\nOne of the representatives mentions that these are regions where people have minimal education and are unfamiliar with banking products. There is also significant crime and fraud. He asks for the team's thoughts about how the bank could sell these services effectively to the population given these challenges.",
        hints: [
          "Consider the issues raised in the question and group your thoughts around them. This will ensure that you are giving the most relevant answers."
        ],
        answer: "Some of the thoughts you might discuss with your interviewer could include:\n\nExamples suggestions on how to overcome lower levels of education and familiarity with banking products:\n\n• Pilot some products in certain regions where the population might be more receptive, so that less receptive people can see that they are already being used by others in similar situations\n• Arrange in-store talks and demonstrations, focusing on educating people about what the products are and how they can be used to dispel common causes of distrust\n• Collaborate with brands or organizations that are already well-known and trusted by the rural population living in these areas\n• Advertise using individuals who have benefited from similar products, for example, people who have made successful insurance claims, or who managed to save money for a specific need\n• Motivate Diconsa employees to encourage product take-up\n• Offer promotions to encourage initial take-up, for example, pay 50 pesos when people make their first deposit into a savings account\n\nExample suggestions to overcome crime and fraud:\n\n• Increase security at Diconsa stores\n• Impose daily or weekly transaction limits\n• Introduce technology, such as chip cards, to reduce fraudulent activity and discourage crime by reducing the use of cash"
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This is a multi-part case study covering financial inclusion strategy, market sizing, data analysis, and go-to-market strategy. See individual question answers for detailed solutions.",
    keyFrameworks: ["Social Impact", "Financial Inclusion", "Stakeholder Analysis", "Market Sizing"],
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
