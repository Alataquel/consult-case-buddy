// Real consulting case studies from McKinsey, BCG, and Bain practice materials

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
  {
    id: "mckinsey-aurelia-beauty",
    title: "Aurelia Beauty — Going Virtual",
    firm: "McKinsey",
    type: "Digital Transformation",
    background: "Aurelia Beauty, a global luxury cosmetics company, wants to explore new ways to engage customers more effectively in an increasingly digital world.\n\nAurelia sells premium makeup, fragrance, and skincare products mainly through high-end department stores and specialty online retailers.\n\nIn-store, beauty advisors play a key role by:\n• Engaging shoppers who browse passively\n• Demonstrating product expertise\n• Driving sales through personalized service\n• Maintaining loyal repeat customers\n\nAdvisors are hired either directly or via third-party agencies. They are trained, managed, and paid by Aurelia and organized by brand and country.\n\nHowever, as more consumers shop online, store traffic has declined—leaving many advisors underutilized.\n\nAurelia's leadership team has asked consultants to evaluate whether training most beauty advisors to connect with customers through virtual and social channels could be both effective and profitable.\n\nNote: Inspired by McKinsey case materials (https://www.mckinsey.com/careers/interviewing/beautify). This adaptation has been reworded for educational purposes.",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "Aurelia plans to train its current advisors to become virtual beauty consultants who will manage client groups, sell through personalized pages on aurelia.com, appear at key retail events, and maintain active social media presences.\n\nWhat factors should Aurelia consider before shifting advisors into this new model?",
        hints: [
          "Take time to structure your answer logically.",
          "Present your framework before diving into details."
        ],
        answer: "Retail partnerships: How might retailers react if more customers buy directly through Aurelia's website? What new commercial arrangements would maintain strong partner relationships?\n\nCompetition: Are rival beauty brands already using virtual advisors? How successful are they, and what are their plans to expand digital selling?\n\nInternal capabilities: What is the current digital skill level of advisors? How many already have professional social media profiles or blogs? Can new advisors with stronger online skills be hired?\n\nBrand consistency: How can Aurelia protect its brand image while empowering many advisors to post content? Could this approach also strengthen Aurelia's reputation as a modern, desirable employer?"
      },
      {
        number: 2,
        question: "Aurelia wants to understand how customers—especially those who prefer in-store experiences—would respond to interacting with virtual beauty advisors.\n\nIf you were a loyal Aurelia customer who enjoys in-store service, what features might convince you to switch to a mostly online experience?",
        hints: [
          "Group your thoughts to cover all key aspects."
        ],
        answer: "Personalized feedback tools: A 'smart mirror' app could allow customers to upload selfies and receive instant shade or product suggestions ('Try a glossier finish instead').\n\nOnline communities: Advisors could run exclusive groups or forums where customers share looks and discuss products that work for them.\n\nTrusted expert content: Advisors active on Instagram, TikTok, or Douyin could post tutorials, reviews, and product insights to build credibility and engagement.\n\nPrivate consultations: Customers could message advisors directly about specific skincare or makeup needs, receiving personalized recommendations based on their purchase history."
      },
      {
        number: 3,
        question: "To assess the potential financial impact, the team wants to know how long it would take for this investment to become profitable.\n\nAssumptions:\n• Expected revenue increase: 10% (first year)\n• Current revenue: €1.3 billion\n• One-time investments: €50M in IT, €25M in training, €50M in store counter upgrades, €25M in inventory\n• Ongoing annual costs: €10M starting in year one\n\nHow many years until the investment breaks even?",
        hints: [
          "Explain each step.",
          "Focus on your reasoning, not speed."
        ],
        answer: "Incremental revenue: €1.3B × 10% = €130M\n\nNet annual profit: €130M − €10M = €120M\n\nTotal investment: €50M + €25M + €50M + €25M = €150M\n\nPayback period: €150M ÷ €120M = 1.25 years\n\nResult: The initiative would become profitable in roughly 1 year and 3 months."
      }
    ],
    difficulty: "Intermediate",
    modelSolution: "This is a multi-part case study covering digital transformation strategy, customer experience design, and financial analysis. See individual question answers for detailed solutions.",
    keyFrameworks: ["Digital Transformation", "Change Management", "Cost-Benefit Analysis", "Customer Experience"]
  },
  {
    id: "mckinsey-diconsa",
    title: "RuralPay — Expanding Financial Access in Mexico",
    firm: "McKinsey",
    type: "Financial Inclusion",
    background: "The Horizon Foundation, a global nonprofit focused on poverty reduction, wants to design a basic financial services model for people living in rural Mexico.\n\nMost of Mexico's rural population lives on low incomes and relies partly on government assistance. Because few have bank accounts, they collect benefits in cash from a limited number of state-run bank branches—often far from home. These trips are time-consuming, costly, and carry safety risks.\n\nThe Mexican government also operates a network of about 22,000 community stores, known here as RuralPay Shops, which sell food and essential goods through centralized warehouses and regional delivery routes.\n\nThe consulting team has been asked to evaluate whether the RuralPay store network could also deliver basic financial services, starting with benefit payments and eventually expanding to savings, bill payments, insurance, and loans.\n\nNote: This case is credited to McKinsey & Company (https://www.mckinsey.com/careers/interviewing/diconsa).",
    question: "Multi-part case with 4 questions",
    questions: [
      {
        number: 1,
        question: "What should the team analyze to determine whether the RuralPay network can and should be used to offer financial services to rural residents?",
        hints: [
          "Take a few moments to structure your ideas before you start.",
          "Begin with an overall framework, then go into details."
        ],
        answer: "Benefits for rural families: How much time and travel cost could beneficiaries save by collecting payments locally? Would easier access improve financial security and savings habits?\n\nBenefits for stakeholders: Could this model lower administrative costs for the government or the state bank? Would it drive more business to RuralPay shops or ease pressure on existing bank branches?\n\nOperational risks: Do the stores have the staff, infrastructure, and security to handle payments safely? Can the state bank manage a larger and more distributed network? Would decentralization increase fraud or theft risk?"
      },
      {
        number: 2,
        question: "Each family currently spends 50 pesos per month on travel and food to collect benefit payments. If payments were available through local RuralPay stores, that cost would drop by 30%.\n\nAssume:\n• Mexico's population = 100 million\n• 20% rural population\n• 50% of rural residents receive benefits\n• Average family = 4 members\n\nHow much money would rural families collectively save each year if they could collect benefits locally?",
        hints: [
          "Take your time and explain your steps clearly."
        ],
        answer: "Rural population: 100M × 20% = 20M people\n\nRural families: 20M ÷ 4 = 5M families\n\nFamilies receiving benefits: 5M × 50% = 2.5M families\n\nAnnual cost per family: 50 pesos × 12 = 600 pesos\n\nTotal annual cost: 600 × 2.5M = 1.5B pesos\n\nAnnual savings: 1.5B × 30% = 450M pesos\n\nResult: Families would collectively save about 450 million pesos per year."
      },
      {
        number: 3,
        question: "A survey across three regions asked rural residents about collecting benefits at their nearest RuralPay store.\n\nWhat trends do you see in the results, and how would you explain them?",
        hints: [
          "Study the data carefully and look for differences between regions."
        ],
        answer: "Interest in using RuralPay varies widely by region.\n\nSecurity concerns are common everywhere but highest in one region.\n\nMost respondents trust they'll receive benefits, except in regions with higher crime.\n\nSome doubt that collecting locally will be cheaper, even though most agree it saves time.\n\nOverall, trust, safety, and perceived savings drive willingness to adopt. In areas with more crime and corruption, skepticism is stronger.",
        exhibitImage: "diconsa-exhibit"
      },
      {
        number: 4,
        question: "During a meeting, the state-owned bank raises concerns about introducing financial products in rural areas where education levels are low, financial literacy is limited, and crime rates are high.\n\nHow could the bank effectively promote and deliver financial services under these conditions?",
        hints: [
          "Group your ideas logically by theme."
        ],
        answer: "Addressing low awareness:\n\n• Pilot products in receptive areas first to demonstrate success.\n• Host in-store demos explaining how products work.\n• Partner with trusted community groups or local brands.\n• Share real stories of customers who benefited (e.g., successful claims or savings goals).\n• Encourage RuralPay staff to promote product uptake.\n• Offer small incentives (e.g., 50 pesos for opening a first savings account).\n\nAddressing crime and fraud:\n\n• Strengthen store security and staff training.\n• Impose daily or weekly transaction limits.\n• Use secure technology (chip cards, electronic verification) to reduce cash handling and fraud."
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This is a multi-part case study covering financial inclusion strategy, market sizing, data analysis, and go-to-market strategy. See individual question answers for detailed solutions.",
    keyFrameworks: ["Social Impact", "Financial Inclusion", "Stakeholder Analysis", "Market Sizing"]
  },
  {
    id: "mckinsey-brightbrew",
    title: "BrightBrew — Launching IonLight",
    firm: "McKinsey",
    type: "New Product Launch",
    background: "BrightBrew, one of the top three beverage companies in the U.S., is considering the launch of a new sports drink, IonLight, and has asked for help designing the product's go-to-market strategy.\n\nBrightBrew controls its entire beverage chain—brand design, production, bottling, and distribution—operating five national plants and serving major retailers across both carbonated and non-carbonated categories.\n\nIonLight is a low-sugar sports drink focused on electrolyte replenishment. It's designed to tap into the growing consumer demand for healthier, lower-sugar beverages.\n\nThe VP of Marketing has asked the consulting team to evaluate the key launch factors, market dynamics, and BrightBrew's readiness to support IonLight.\n\nHelpful hints: Write down important information. Feel free to ask the interviewer to explain anything that is not clear to you.",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "What should BrightBrew evaluate before launching IonLight?",
        hints: [
          "Take time to structure your ideas before answering.",
          "Begin with an overall framework, then go into detail."
        ],
        answer: "Consumers: Who buys sports drinks? Which segments—athletes, casual fitness, or health-focused consumers—should IonLight target?\n\nCost & price: Is the sports-drink category more profitable than existing lines? Can IonLight be sold profitably at market prices? What's the breakeven volume?\n\nCompetitors: Which products will IonLight compete with? Who are the key players, and how might they react?\n\nCapabilities: Does BrightBrew have the right marketing and production setup? Can current facilities and distributors handle this line?\n\nChannels: Which retail and e-commerce channels are best? Are current partners willing to add IonLight to their assortments?"
      },
      {
        number: 2,
        question: "Your team wants to estimate the market share IonLight must reach to break even.\n\nGiven:\n• Bottle size: 16 oz (1/8 gallon)\n• Retail price: $2\n• Fixed costs: $40 million\n• Variable cost per bottle: $1.90\n• Total U.S. beverage market: 8,000 million gallons\n• Electrolyte drinks = 5% of total market",
        hints: [
          "Work step by step and explain your logic."
        ],
        answer: "Breakeven units:\n• Unit margin: $2 − $1.90 = $0.10\n• Units to cover $40M fixed costs: $40M ÷ $0.10 = 400 million bottles\n\nTranslate to gallons:\n• 8 bottles = 1 gallon → 400M ÷ 8 = 50 million gallons\n\nMarket size:\n• 8,000M × 5% = 400 million gallons of electrolyte drinks\n\nRequired market share:\n• 50M ÷ 400M = 12.5%\n\nResult: IonLight must capture 12.5% of the electrolyte segment—about the #2 spot—to break even.",
        exhibitImage: "brightbrew-exhibit"
      },
      {
        number: 3,
        question: "BrightBrew believes its market scale can help reach the target share but wants to understand what's needed to achieve it.",
        hints: [
          "Group your ideas by theme for clarity."
        ],
        answer: "Consumer fit: Match product taste, function, and image to key segments; ensure pricing aligns with expectations and competitors.\n\nBrand & marketing: Launch with strong advertising, sampling, and influencer campaigns. Use BrightBrew's reach to secure high visibility and anticipate rival promotions. Avoid cannibalizing other BrightBrew brands.\n\nSales & distribution: Lock key retail placements and refrigeration space; equip sales teams to position IonLight as incremental to category growth.\n\nOperations: Confirm production and logistics capacity for national rollout; ensure rapid scale-up when demand rises."
      }
    ],
    difficulty: "Intermediate",
    modelSolution: "This is a multi-part case study covering product launch strategy, market sizing, breakeven analysis, and go-to-market planning. See individual question answers for detailed solutions.",
    keyFrameworks: ["Product Launch", "Market Sizing", "Breakeven Analysis", "Competitive Analysis"]
  },
  {
    id: "mckinsey-novacura",
    title: "HelixBio RNA Therapeutics Case",
    firm: "McKinsey",
    type: "M&A",
    background: "**Client Background**\n\nOur client, HelixBio, is a global pharmaceutical company headquartered in Switzerland, generating about $10 billion per year in revenue. The company's primary R&D hubs are in Basel and Zurich, and it operates regional sales offices worldwide.\n\nHelixBio has built its reputation on developing and commercializing small-molecule drugs—traditional chemical compounds that treat widespread conditions such as hypertension, arthritis, and infections. However, HelixBio now aims to enter the rapidly growing field of RNA therapeutics, including messenger RNA (mRNA) and small interfering RNA (siRNA)–based drugs that can target diseases at the genetic level.\n\nBecause R&D for RNA therapeutics requires a very different scientific foundation, HelixBio is exploring how to build these capabilities. It could develop them internally, form partnerships with smaller firms, or acquire a company with proven RNA expertise.\n\nSince competitors are already several years ahead, HelixBio wants to accelerate its entry by acquiring Genvera Therapeutics, a leading RNA-focused biotech based in the Boston area.\n\n**About Genvera Therapeutics**\n\nFounded 12 years ago by a team of RNA biologists from MIT, Genvera Therapeutics now employs around 200 scientists and staff. The company has developed a proprietary lipid nanoparticle (LNP) delivery system for RNA therapeutics and has a robust early-stage drug pipeline.\n\nGenvera is publicly traded, and its market capitalization is approximately $1 billion.\n\nHelixBio has engaged your consulting team to assess whether acquiring Genvera would be strategically and financially sound.\n\n**McKinsey-style Objective**\n\nMain question: Should HelixBio acquire Genvera Therapeutics?",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "What factors should HelixBio consider when evaluating whether to acquire Genvera?",
        hints: [
          "HelixBio should evaluate factors across four key dimensions."
        ],
        answer: "**Pipeline and Scientific Value**\n\n• Number, stage, and potential of Genvera's RNA drug candidates.\n• Quality of science: success likelihood, differentiation, patent protection.\n• Potential future revenue and profitability of drugs in development.\n\n**R&D and Platform Capabilities**\n\n• Strength of Genvera's proprietary RNA delivery technology.\n• Depth of scientific talent and leadership team.\n• Infrastructure (labs, equipment, manufacturing, and bioinformatics systems).\n\n**Commercial Capabilities**\n\n• Genvera's ability to promote RNA-based treatments.\n• Existing relationships with regulators, hospitals, and thought leaders.\n• Complementarity with HelixBio's global sales and marketing network.\n\n**Financial Considerations**\n\n• Valuation and acquisition price.\n• Expected synergies in R&D or go-to-market activities.\n• Risks versus alternatives (e.g., partnering instead of buying).\n\nA very strong answer might also mention:\n• Genvera's existing partnerships and IP-sharing arrangements.\n• HelixBio's own capability gaps in RNA science.\n• Other potential acquisition or partnership targets.\n• Whether RNA therapeutics fit HelixBio's long-term strategic focus."
      },
      {
        number: 2,
        question: "What issues should the team consider when assessing the value of Genvera's current RNA drug pipeline?",
        hints: [
          "Mention a broad set of factors before narrowing your focus."
        ],
        answer: "**Scientific and Clinical Factors**\n\n• Remaining R&D cost to bring each candidate to market.\n• Probability of clinical and regulatory success.\n• Efficacy, safety, and differentiation from competitors.\n\n**Market and Commercial Potential**\n\n• Patient population and market size.\n• Pricing potential of the drug.\n• Competitive dynamics: number of rival drugs, side effects, convenience of use.\n\n**Operational and Cost Factors**\n\n• Manufacturing complexity of RNA formulations.\n• Marketing and distribution costs.\n• Reimbursement dynamics in key markets.\n\n**Risk Factors**\n\n• Scientific and regulatory uncertainty.\n• Strength of IP and risk of imitation.\n• Substitution threats from next-generation modalities.\n\nA top-tier answer could also include:\n• Reputational and media coverage around RNA therapies.\n• Whether prominent scientists or regulators support this therapeutic class.\n• The scalability of Genvera's LNP platform for future candidates."
      },
      {
        number: 3,
        question: "HelixBio believes that the likelihood of success for Genvera's lead RNA drug can be improved by investing an additional $150 million in a larger Phase II trial. This investment is intended to increase the probability that the drug progresses successfully through later stages.\n\nIf the drug reaches the market, its net present value (NPV) of profits is estimated at $1.2 billion.\n\n**Assumptions:**\n• Expected value of a successful marketed drug: $1.2 billion\n• Current success rates: Phase I: 70%, Phase II: 40%, Phase III + approval: 50% × 90%\n\nBy how much would the Phase II success rate need to increase for the $150 million investment to break even?",
        hints: [
          "Explain each step clearly."
        ],
        answer: "**Sample Calculation**\n\nAfter Phase II, the combined probability of downstream success is:\n• 50% × 90% = 45%\n\nThus, if a drug passes Phase II, its expected value:\n• 45% × $1.2B = $540M\n\nTo break even, we need an extra $150M in value, so the new value must be:\n• $540M + $150M = $690M\n\n$150M ÷ $540M = 0.28 → a **28 percentage point increase** required in combined Phase I and II success probability.\n\nCurrent combined Phase I × II:\n• 70% × 40% = 28%\n\nIt needs to rise to 56%.\n\nSo **Phase II success probability must increase from 40% to 80%**.\n\n**Result:** Phase II success would need to double—a challenging improvement.",
        exhibitImage: "globapharm-exhibit"
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This is a multi-part case study covering M&A strategy for RNA therapeutics, platform technology evaluation, pipeline assessment, and probability-weighted investment analysis. See individual question answers for detailed solutions.",
    keyFrameworks: ["M&A Evaluation Framework", "Drug Development Economics", "RNA Therapeutics Assessment", "Risk-Return Analysis"]
  },
  {
    id: "mckinsey-national-education",
    title: "National Education Case Interview",
    firm: "McKinsey",
    type: "Public Sector",
    background: "Loravia is a fictional country located in Eastern Europe with a population of 20 million. The government of Loravia wants to make major improvements in both the quantity and quality of education for its children. Because McKinsey has great deal of global knowledge and expertise in the education sector, the Loravian department of education has asked McKinsey to advise on how it can achieve this transformation of its school system.\n\nLoravia's free market economy is still developing, having emerged from many decades under communism. Recently, the government of Loravia put a new economic plan in place with aspirations to transform its economy and turbocharge its development so it's well positioned to compete with its European neighbors. The government of Loravia realizes that the education of its children is a critical factor in meeting crucial economic development goals. It intends to transform the school system over the next ten years to enable it to support its economic aspirations.\n\nSchooling in Loravia is completely public and is provided by a network of government-run schools that admit children from ages five through 18.\n\nThe first stage of this effort will involve diagnosing the current state of education in schools in Loravia to determine how best to meet the government's future aspirations.\n\nMcKinsey has been asked to support the Loravian department of education in diagnosing the state of its current school system, and in identifying the most important areas for improvement.",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "What issues would you want to investigate in diagnosing the current state of the Loravian school system?",
        hints: [
          "Take time to organize your thoughts before answering. This tells the interviewer that you think about the problem in a logical way.",
          "Develop overall approach before diving into details."
        ],
        answer: "Some of the factors you might discuss with your interviewer could include:\n\n• The quantity of available education: What is access to education like, and how does it differ by age, region, and demographic group? What is the supply of teachers and education resources like at a national, regional, or local levels? What are the national, regional, and local budgets for education?\n\n• The quality of available education: What is the quality of the current curriculum, for example, the subjects taught in schools and levels of attainment or learning objectives? What is the quality of the teaching, for example, the qualification level of teachers or results of teacher assessments?\n\n• Loravia's broader economic objectives: What industries and sectors will be a priority for Loravia in future, and what skills will be needed? How well does the current education system develop these skills? Should alternative models to a public education system be considered, for example, independent or private schools?"
      },
      {
        number: 2,
        question: "The chart below shows some important education-related measures for Loravia and also for some comparison countries. Three sets of comparison countries have been used. The first set contains some of Loravia's neighboring countries in Eastern Europe. In the second set are some of the most developed economies in Europe. Finally, in the third set are some countries that have similar sized economies to Loravia on a per person basis, which have similar GDP per capita.\n\nWhat observations can you derive from this chart?",
        hints: [
          "Take some time to look at the information and note any observations you have.",
          "Challenge yourself to identify trends that are not immediately obvious from the data."
        ],
        answer: "Some of the observations you might discuss with your interviewer could include:\n\nA good answer might include the following observations:\n\n• Loravia spends more on education and also has a lower student-to-teacher ratio than the majority of its neighbors and economic peers, however, despite these factors, Loravia still has one of the lowest international assessment scores.\n\n• Broadly, there seems to be no direct relationship between student-to-teacher ratio and education outcome as measured by the international assessment.\n\n• Developed countries clearly spend more per student on education and have better outcomes as measured by the international assessment. However, among Loravia's peers and neighbors there is no clear relationship between spending and education outcomes.\n\n• While student-to-teacher ratios and per-student funding are levers that could be important in improving education quality, the data here indicates that alone, these may not deliver the necessary improvements. Issues such as teacher quality and curriculum content should be investigated.",
        exhibitImage: "national-education-exhibit"
      },
      {
        number: 3,
        question: "One of the clients at Loravian's educational department mentions neighbor country 'C' as an example, because it's outperforming all of Loravia's economic peers and neighbors in the international assessment. She believes that the more concentrated school structure in this country is a big reason for better outcomes in the international assessment. She suggests that having larger, less fragmented schools allows for more effective teacher selection and training, leading to improved education outcomes for students. Finally, she shares that 15 percent of Loravia's population is currently attending school.\n\nWhat would be the reduction in the total number of schools in Loravia if it were to achieve the same average school size as neighbor country C?",
        hints: [
          "Don't feel rushed into performing calculations. Take your time.",
          "Talk your interviewer through your steps so that you can demonstrate an organized approach."
        ],
        answer: "One possible approach to discuss with your interviewer could be:\n\n• There are three million schoolchildren in Loravia: 15 percent times 20 million\n• There are currently 6,000 schools across Loravia: three million school children divided by 500 per school\n• Assuming the same school size as neighbor C would mean there are 3,750 schools across Loravia: three million divided by 800 students per school\n• Therefore, 2,250 schools would be closed—or about 37.5 percent of schools"
      }
    ],
    difficulty: "Intermediate",
    modelSolution: "This is a multi-part case study covering public sector strategy, data analysis, and education policy. See individual question answers for detailed solutions.",
    keyFrameworks: ["Public Sector Strategy", "Benchmarking", "Education Policy", "Data Analysis"]
  },
  {
    id: "mckinsey-talbot-trucks",
    title: "Talbot Trucks Case Interview",
    firm: "McKinsey",
    type: "Sustainability",
    background: "Talbot Trucks is a Europe-based private truck OEM. It produces and sells trucks all over the world. Talbot Trucks is considered a leader in quality manufacturing. Its primary customer base includes large trucking companies that own thousands of trucks and owner-operators, which are smaller customers that own fewer trucks.\n\nTrucks today are mainly powered by diesel engines and require carbon-based petroleum fuel. Talbot Trucks is interested in exploring ways to reduce the carbon footprint of its vehicles and has specifically asked about electric trucks, or 'eTrucks.'\n\nETrucks and diesel trucks differ in the design—e-motor and batteries versus combustion engines—and also in the way they are fueled, meaning comparably slow charging versus quick refilling with diesel fuel at gas stations. The introduction of this new technology is disruptive for the manufacturers as well as customers both large and small.\n\nThe CEO of Talbot Trucks has approached McKinsey to help determine the attractiveness of an investment in eTruck manufacturing for its European market.",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "What information would you want to collect to understand the attractiveness for Talbot Trucks in producing and selling eTrucks in Europe?",
        hints: [
          "Take time to organize your thoughts before answering. This will help show your interviewer that you have a logical approach and can think in an organized way, regardless of the accuracy of the outcome.",
          "Develop an overall approach before diving into details."
        ],
        answer: "Some of the information you might discuss with your interviewer could include:\n\n• Market: What important differences exist between large and small truck customers, such as price, features, reliability, and volume? Which geographies in Europe are most receptive to eTrucks—an environmentally conscious population, or ones with a political agenda? How will customers perceive Talbot Trucks' eTrucks when compared to existing competitors or new entrants? What are potential substitutes, like rail?\n\n• Financials: Are there different market segments or use cases for eTrucks? How does revenue potential compare between these segments? What are Talbot Trucks' main cost drivers? What price could be expected in different segments?\n\n• Risks: How much experience does Talbot Trucks have with eTrucks? Will it be able to produce a reliable product in a cost-efficient way? What will happen to sales of current truck models? Will legislation force a move toward eTrucks? If so, what are the risks associated with actively addressing the issue instead of waiting it out?"
      },
      {
        number: 2,
        question: "The team set out to investigate the major cost drivers for buying and operating one diesel truck, an analysis commonly referred to as 'total cost of ownership' (TCO). You have been given the following information comparing the TCO for a diesel truck against that for an eTruck:\n\n• Driver: A driver costs around €3,000 per month. There is a significant shortage of drivers in the market.\n• Depreciation: Diesel trucks costs €100,000. The typical lifespan is four years. Residual value—the value at which you can resell the truck—is assumed to be €0.\n• Fuel: A heavy duty diesel truck consumes around 30 liters of diesel per 100 kilometers. Diesel costs €1 per liter.\n• Maintenance: As a general rule, maintenance per truck is around €5,000 a year for a diesel truck.\n• Other, including tolls, insurances, and taxes: €10,000 per year.\n\nUsing this data, what can you infer about the differences in TCO for diesel trucks vs eTrucks?",
        hints: [
          "Take some time to look at the information and note down any observations you have.",
          "Challenge yourself to identify trends that are not immediately obvious from the data."
        ],
        answer: "Some of the differences you might discuss with your interviewer could include:\n\n• Fuel and depreciation account for the majority of the costs of an eTruck, and therefore are the key drivers for buying an eTruck.\n\n• eTrucks have a significant advantage over diesel trucks in terms of cost per kilometer. Therefore, eTrucks become more attractive the more distance they cover per year.\n\n• Depreciation may also vary drastically for eTrucks, since presumably eTrucks will be more expensive as the technology is newer.\n\n• Other costs are much lower for eTrucks, suggesting there may be tax breaks or other financial incentives keeping these costs lower.",
        exhibitImage: "talbot-trucks-exhibit"
      },
      {
        number: 3,
        question: "After running focus groups with Talbot Trucks' customers, the team concluded that the total cost of an eTruck needs to be the same as a diesel truck to be considered attractive to customers. Currently, a Talbot Trucks diesel truck costs €100,000.\n\nAssuming that the figures above do not change, what is the maximum price Talbot Trucks can charge for its eTruck so that the total cost of ownership is equal to that of a diesel truck?",
        hints: [
          "Don't feel rushed into performing calculations. Take your time.",
          "Remember that calculators are not allowed—you may want to write out your calculations on paper during the interview.",
          "Talk your interviewer through your steps so that you can demonstrate an organized approach; the more you talk the easier it will be for your interviewer to help you."
        ],
        answer: "One possible approach to discuss with your interviewer could be:\n\nAnnual TCO for an existing diesel truck has five components:\n\n• Driver costs: €3,000 a month times 12 months equals €36,000\n• Depreciation: €100,000 over lifespan divided by four years equals €25,000\n• Fuel: 30 liters divided by 100 kilometers times €1 per liter times 100,000 kilometers a year equals €30,000\n• Maintenance: €5,000\n• Other: €10,000\n• This adds up to €106,000 total annual cost of ownership for a diesel truck.\n\nFour of the five components of an eTruck's annual TCO are:\n\n• Driver costs: €3,000 a month times 12 months is equal to €36,000\n• Fuel: 100 kWh divided by 100 kilometers times €0.15 per kWh times 100,000 kilometers a year equals €15,000\n• Maintenance: €3,000\n• Other: €5,000\n• This adds up to €59,000, not yet including the depreciation component\n\nIf the annual TCO for an eTruck is equal to the annual TCO of a diesel truck: €106,000, then the annual depreciation for an eTruck is €47,000, which is €106,000 minus €59,000\n\nTherefore, to match a diesel truck's TCO over the four year lifetime of the truck, the maximum purchase price for an eTruck would be €188,000, or 47,000 times four years."
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This is a multi-part case study covering sustainability strategy, total cost of ownership analysis, and investment feasibility. See individual question answers for detailed solutions.",
    keyFrameworks: ["Total Cost of Ownership", "Sustainability Strategy", "Market Assessment", "Investment Analysis"]
  },
  {
    id: "bain-coffee-shop",
    title: "Coffee Shop Co. Case Interview",
    firm: "Bain",
    type: "Market Entry",
    background: "You're having lunch with an old friend from university, and she's looking for some business advice. She is thinking of opening a coffee shop in Cambridge, England, a large university city an hour and a half away from London.\n\nShe sees potential in this business but wants your help in determining whether opening a coffee shop is a good idea.\n\nCase Setup:\nStart any case by understanding the question you're asked to solve. Ask your interviewer questions if you feel confused or need more information. We want you to succeed in your interviews!\n\nTake the time (1-2 minutes) to think about how you would approach the problem. Always structure your thinking, and communicate your ideas with your interviewer.\n\nHere are some sample questions to ask yourself:\n• How big is the opportunity?\n• How much does it cost to open a coffee shop?\n• What is the shop's go-to-market strategy?",
    question: "Multi-part case with 4 questions",
    questions: [
      {
        number: 1,
        question: "You show your proposed framework to your friend, and she really likes it! She's especially interested in figuring out how big the market is to best estimate how much coffee she can sell. She knows the market probably includes commuters, visitors, etc., but for now, she wants you to focus on Cambridge residents alone.\n\nHow do you estimate the size of the market?",
        hints: [
          "Two potential approaches come to mind when estimating market size:",
          "'Top-down' approach: Start with a large number (e.g. total relevant population) and progressively narrow down.",
          "'Bottom-up' approach: Start with a small number (e.g. average cups of coffee consumed per day) and progressively scale up.",
          "Note: When making assumptions about market size, there is no 'right' or 'wrong' answer. Base your estimations on your reasonable assumptions about the market."
        ],
        answer: "Two potential approaches come to mind when estimating market size:\n\n• 'Top-down' approach: Start with a large number (e.g. total relevant population) and progressively narrow down.\n• 'Bottom-up' approach: Start with a small number (e.g. average cups of coffee consumed per day) and progressively scale up.\n\nAfter you show her the potential options for estimating market size, she wants you to approximate the market size using your framework. Assume that Cambridge has a population of 100,000 people and, on average, each drinks 1 cup of coffee per day.",
        exhibitImage: "coffee-shop-framework"
      },
      {
        number: 2,
        question: "After discussing the framework, your friend wants you to calculate the actual market size. Assume that Cambridge has a population of 100,000 people and, on average, each drinks 1 cup of coffee per day.\n\nWhat is the total market size in cups of coffee per year?",
        hints: [
          "Use the top-down approach starting with the total population.",
          "Consider what percentage are adults, what percentage of adults drink coffee, and how much coffee is consumed at home vs. at coffee shops.",
          "Remember to annualize your calculation."
        ],
        answer: "Top-Down calculation:\n\n• 100,000 people live in Cambridge\n• *80% are adults = 80,000\n• *50% of adults are coffee drinkers = 40,000 people\n• *1 cup of coffee per person per day = 40,000 cups of coffee per day\n• *50% of coffee made and consumed at home = 20,000 cups of coffee per day bought at coffee shops\n• *~350 days per year = 7,000,000 cups of coffee per year\n\nTotal market size is 7,000,000 cups of coffee per year",
        exhibitImage: "coffee-shop-calculation"
      },
      {
        number: 3,
        question: "Now that you have the market size, your friend wants to gain a better understanding of how much coffee she would need to sell to break even in her first year.\n\nHow much coffee does she need to sell to break even in the first year?\n\nHere is some additional information:\n• Price per coffee = £3\n• Cost to open shop = £245,610\n• Cost to run shop each year = £163,740\n• Cost per cup of coffee = £1",
        hints: [
          "Don't feel rushed into performing calculations. Take your time.",
          "Remember that calculators are not allowed - you may want to write out your calculations on paper during the interview.",
          "Talk your interviewer through your steps so that you can demonstrate an organized approach; the more you talk the easier it will be for your interviewer to help you.",
          "Use the breakeven formula: Profit = Revenue - Cost = £0"
        ],
        answer: "Breakeven calculation:\n\nProfit = £0\nRevenue - Cost = £0\n\n(Price × Quantity) - (Fixed costs + Variable costs) = £0\n(3 × Q) - (163,740 + 245,610 + [1 × Q]) = 0\n3Q - 409,350 - Q = 0\n2Q - 409,350 = 0\n2Q = 409,350\nQ = 204,675 cups to break even\n\nYour friend needs to sell 204,675 cups of coffee to break even in the first year."
      },
      {
        number: 4,
        question: "After running through the calculations, do you think it's reasonable for her to open up a coffee shop?",
        hints: [
          "Consider the market size you calculated earlier (7,000,000 cups per year).",
          "Calculate what percentage of the market share would be needed to break even.",
          "Think about other factors beyond just breaking even, such as timeline to recoup initial investment and competitive positioning."
        ],
        answer: "A good answer:\nYes! Because there are 7,000,000 cups sold and the break-even point is 204,675 cups, which is ~3% of the market share, breaking even is achievable.\n\nA better answer:\nBreaking even is achievable, but we'd want to understand more about our friend's investment timeline. Depending on how many years she plans to run the store, it might be difficult to recoup the cost of opening it.\n\nOther key questions she needs to think about before proceeding include:\n\n• What is CoffeeCo's go-to-market strategy?\n• How will the organization differentiate itself among its competitors?\n• Is there a dominant player that will make it difficult to win share?\n• Is the market full of smaller competitors that CoffeeCo could beat?"
      }
    ],
    difficulty: "Beginner",
    modelSolution: "This is a multi-part case study covering market sizing, breakeven analysis, and business strategy. The case walks through a structured approach to evaluating a small business opportunity. See individual question answers for detailed solutions.",
    keyFrameworks: ["Market Sizing", "Breakeven Analysis", "Profitability Framework", "Go-to-Market Strategy"]
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
