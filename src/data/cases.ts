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
        question: "The team conducted a survey on a sample of the rural population in three different regions of Mexico. Participants were shown several statements about the concept of collecting benefits at their nearest Diconsa store and asked how much they agreed with each statement. The average response to some of the questions in each region is shown in the exhibit below.\n\nWhat are your observations regarding this information, and how would you explain these trends?",
        hints: [
          "Take some time to look at the information and note down any observations you have.",
          "Challenge yourself to identify trends that are not immediately obvious from the data."
        ],
        answer: "Some of the observations you might discuss with your interviewer could include:\n\n• There are significant differences by region as to how interested people are in collecting benefits at their nearest Diconsa\n• Everyone has security concerns about collecting benefits at a Diconsa, but this is especially true in Region B\n• People are not so concerned about whether they will receive their benefits, except in Region B\n• Not everyone is completely convinced it will cost them less to collect benefits from their nearest Diconsa, despite the fact that they all agree it will save time\n• Broadly speaking, security, trust, and cost effectiveness all seem to influence whether someone is interested in collecting benefits at a Diconsa. People's perception of these seem to differ by region, with Region B being a particular issue. One potential explanation for the results in Region B is that this region has far higher levels of crime and corruption, which means people are less convinced that they will receive their benefits or that they can keep them secure once received.",
        exhibitImage: "diconsa-exhibit"
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
    keyFrameworks: ["Social Impact", "Financial Inclusion", "Stakeholder Analysis", "Market Sizing"]
  },
  {
    id: "mckinsey-electro-light",
    title: "Electro-Light Case Interview",
    firm: "McKinsey",
    type: "New Product Launch",
    background: "SuperSoda is a top-three beverage producer in the United States that has approached McKinsey for help designing its product launch strategy.\n\nAs an integrated beverage company, SuperSoda leads its own brand design, marketing, and sales efforts. The company also owns its entire beverage supply chain, including production of concentrates, bottling and packaging, and distribution to retail outlets. SuperSoda has a considerable number of brands across carbonated and noncarbonated drinks, five large bottling plants throughout the country, and distribution agreements with most major retailers.\n\nSuperSoda is evaluating the launch of a new product, a flavored sports drink called 'Electro-Light.' Sports drinks are usually designed to replenish energy, with sugars, and electrolytes, or salts, in the body. However, Electro-Light has been formulated to focus more on the replenishment of electrolytes and has a lower sugar content compared to most other sports drinks. The company expects this new beverage to capitalize on the recent trend away from high-sugar products.\n\nSuperSoda's vice president of marketing has asked McKinsey to help analyze key factors surrounding the launch of Electro-Light and its own internal capabilities to support that effort.",
    question: "Multi-part case with 3 questions",
    questions: [
      {
        number: 1,
        question: "What key factors should SuperSoda consider when deciding whether or not to launch Electro-Light?",
        hints: [
          "Take time to organize your thoughts before answering. This tells the interviewer that you think about the problem in a logical way.",
          "Develop overall approach before diving into details."
        ],
        answer: "Some of the factors you might discuss with your interviewer could include:\n\n• Consumers: Who drinks sports drinks? Are there specific market segments to address?\n\n• Cost and price: Is the sports-drinks market more profitable than the markets for SuperSoda's current products? Is it possible to sell Electro-Light profitably at a price set by the market and internal production costs? Given the fixed costs involved, what would be the point for Electro-Light to break even?\n\n• Competitors: Which products will Electro-Light be competing with? Which companies are key in the market, and how will they react?\n\n• Capabilities and capacity: Are the necessary marketing and sales capabilities available within SuperSoda? Does the product require specialized production, packaging, or distribution? Is it possible to accommodate Electro-Light in the current production and distribution facilities? What impact does geography have on plant selection?\n\n• Channels: What is the ideal distribution channel for this product? Are current retail outlets willing to add Electro-Light to those product catalogs?"
      },
      {
        number: 2,
        question: "After reviewing the key factors that SuperSoda should consider when deciding whether to launch Electro-Light, your team wants to understand the beverage market and consumer preferences to gauge the potential success of Electro-Light.\n\nYour team has gathered the following information about the US sports drink market (shown in the exhibit below). The information shows an estimated share of electrolyte drinks, as well as the current share for the two main electrolyte products: CoolSweat and RecoverPlus.\n\nBased on the target price and upfront fixed costs, what share of the electrolyte drink market would Electro-Light need to capture to break even? Here is some additional information for you to consider as you form your response:\n\n• Electro-Light would launch in a 16-ounce format—or one-eighth of a gallon—at a price of $2 to retailers\n• To be able to launch Electro-Light, SuperSoda needs to bear $40 million in total fixed costs, including marketing expenses and increased costs across its production and distribution network\n• The vice president of operations estimates that each bottle would cost $1.90 to produce and deliver in the new process",
        hints: [
          "Don't feel rushed into performing calculations. Take your time.",
          "Remember that calculators are not allowed—you may want to write out your calculations on paper during the interview.",
          "Talk your interviewer through your steps so that you can demonstrate an organized approach; the more you talk the easier it will be for your interviewer to help you."
        ],
        answer: "One possible approach to discuss with your interviewer could be:\n\nElectro-Light would need to capture a 12.5 percent market share of electrolyte drinks to break even. Therefore, Electro-Light would need to become the number two product on the market.\n\n1. Electro-Light would need to sell 400 million units to break even:\n• Variable profit per unit: $2 minus $1.90 equals $0.10\n• Breakeven units: Total fixed costs and variable profit per unit is approximately $40 million divided by $0.10 per unit equals 400 million units\n\n2. Electro-Light would need to capture a 12.5 percent market share:\n• Electrolyte drinks market: five percent times 8,000 million gallons equals 400 million gallons\n• Electro-Light sales in millions of gallons: 400 million units divided by eight units per gallon equals 50 million gallons\n• Market share: 50 million gallons divided by 400 million gallons equals 12.5 percent",
        exhibitImage: "electro-light-exhibit"
      },
      {
        number: 3,
        question: "SuperSoda executives believe that the company's position as a top-three beverage company gives it strategic impetus toward achieving the desired market share. However, they ask the team to outline what would be needed to achieve the target 12.5 percent share of the electrolyte-drinks market.\n\nWhat would SuperSoda need to do to gain the required market share for Electro-Light following its launch?",
        hints: [
          "Consider the issues raised in the question and group your thoughts around them. This will ensure that you are giving the most relevant answers."
        ],
        answer: "Some of the ideas you might discuss with your interviewer could include:\n\n• Match with consumer preferences: Ensure that the product image, attributes, and quality fulfill the needs of all consumers or a niche segment to reach the desired market share; ensure that the target price is consistent with other products on the market as well as with consumer expectations.\n\n• Strong branding/marketing: Create a successful introductory marketing campaign, including advertising, pricing, and bundling promotions. Leverage the company's top-three producer status and minimal market fragmentation to position the Electro-Light brand within the top three in the market segment. Anticipate competitors' responses—for example, advertising, pricing, and distribution agreements. Ensure that product positioning does not cannibalize other, more profitable SuperSoda products.\n\n• Operational capabilities: Secure access to preferred distribution channels. Ensure that the sales force has the capabilities needed to sell the new product. Ensure that production ramp-up allows for a response when demand increases."
      }
    ],
    difficulty: "Intermediate",
    modelSolution: "This is a multi-part case study covering product launch strategy, market sizing, breakeven analysis, and go-to-market planning. See individual question answers for detailed solutions.",
    keyFrameworks: ["Product Launch", "Market Sizing", "Breakeven Analysis", "Competitive Analysis"]
  },
  {
    id: "mckinsey-globapharm",
    title: "GlobaPharm Case Interview",
    firm: "McKinsey",
    type: "M&A",
    background: "GlobaPharm is a major pharmaceutical company (pharmaco) with $10 billion a year in revenue. Its corporate headquarters and primary research and development (R&D) centers are in Germany, with regional sales offices worldwide.\n\nGlobaPharm has a long, successful tradition in researching, developing, and selling 'small molecule' drugs. This class of drugs represents the vast majority of drugs today, including aspirin and most blood-pressure or cholesterol medications. GlobaPharm is interested in entering a new, rapidly growing segment of drugs called 'biologicals.' These are often proteins or other large, complex molecules that can treat conditions not addressable by traditional drugs.\n\nR&D for biologicals is vastly different from small-molecule R&D. To gain these capabilities, pharmacos have three options: they can build them from scratch, partner with existing start-ups, or acquire the start-ups. Since its competitors are already several years ahead of GlobaPharm, GlobaPharm wants to jumpstart its biologicals program by acquiring BioFuture, a leading biologicals start-up based in the San Francisco area. BioFuture was founded 12 years ago by several prominent scientists and now employs 200 people. It is publicly traded and at its current share price the company is worth about $1 billion in total.\n\nGlobaPharm has engaged McKinsey to evaluate the BioFuture acquisition and to advise on its strategic fit with GlobaPharm's biologicals strategy. Our overall question today, therefore, is 'Should GlobaPharm acquire BioFuture?'",
    question: "Multi-part case with 4 questions",
    questions: [
      {
        number: 1,
        question: "What factors should the team consider when evaluating whether GlobaPharm should acquire BioFuture?",
        hints: [
          "Take time to organize your thoughts before answering. This tells the interviewer that you think about the problem in a logical way.",
          "Develop overall approach before diving into details."
        ],
        answer: "A good answer would include the following:\n\n• The value of BioFuture's drug pipeline: number of drugs currently in development, quality of drugs (likelihood of success), potential revenues and profits\n\n• BioFuture's R&D capabilities (future drug pipeline): scientific talent, intellectual property (for example, patents, proprietary processes or know-how for biologicals research), and buildings, equipment, and other items that allow BioFuture's R&D to operate\n\n• BioFuture's marketing or sales capabilities: Especially how promotional messages will be delivered, for example, relationships with key opinion leaders that can promote biologicals; key opinion leaders can come from the academic arena, like prominent medical school professors, or from the public arena, like heads of regulatory bodies or prominent telejournalists\n\n• Acquisition price\n\nA very good answer might also include multiple additional key factors:\n\n• BioFuture's existing partnerships or other relationships with pharmacos\n• GlobaPharm's capability gaps in biologicals, R&D, sales and marketing, etc.\n• GlobaPharm's alternatives to this acquisition: Alternative companies GlobaPharm could acquire, other strategies for entering biological segment (for example, entering partnerships rather than acquiring)"
      },
      {
        number: 2,
        question: "The team wants to explore BioFuture's current drug pipeline. The team decides to focus first on evaluating the value of BioFuture's current drug portfolio.\n\nWhat issues should the team consider when evaluating the value of BioFuture's existing drug pipeline?",
        hints: [
          "Be sure to mention a range of potential issues to explore instead of immediately diving very deep into one issue. Then ask your interviewer if he or she wants to go deeper on any of them specifically."
        ],
        answer: "A good answer would include the following:\n\n• Further cost of R&D until each drug is ready to be sold\n• Potential value of selling each drug\n• Market size: for example, size of patient population, pricing\n• Market share: for example, number of competitive drugs in R&D or on the market; different side effects, convenient dosing schedule (that is, patients are prescribed to take a drug at regular intervals that are easy to remember such as once a day or every 12 hours)\n• Costs to manufacture and sell: for example, marketing, distribution\n• Press about these drugs: for instance, have famous doctors called for this kind of drug? Is it only slightly improving on what is on the market already?\n\nA very good answer would also include the following:\n\n• Risk level: Likelihood clinical trials of a drug will prove effective; likelihood that a drug will win regulatory approval\n• Side effects and potential legal exposure: for example, potential law suits due to unexpected side effects\n• Emergence of substitutes: are competitors working on substitutes already? Is it about speed and does BioFuture have enough researchers working on the respective drugs?\n• Strength of underlying patents: that is, how likely is it that a competitor can successfully copy BioFuture's drug?"
      },
      {
        number: 3,
        question: "Below is a description of expected probability of success, by stage, in the Pharma R&D pipeline (shown in the exhibit below).\n\nNote: 'Filing' is the process of submitting all of the clinical and safety evidence from Phase I, II, and III trials, and asking for regulatory approval to actually sell the drug.\n\nGlobaPharm believes that the likelihood of success of BioFuture's primary drug candidate can be improved by investing an additional $150 million in a larger Phase II trial. The hope is that this investment would raise the success rate in Phase II, meaning that more candidate drugs successfully make it to Phase III and beyond.\n\nBy how much would the Phase II success rate need to increase in order for this investment to break even?\n\nAssume that if the drug is successfully marketed and sold, it would be worth $1.2 billion (that is, the present value of all future profits from selling the drug is $1.2 billion).",
        hints: [
          "Ask for clarification of information if necessary.",
          "Take notes of the numbers.",
          "Take time to plan out how to approach the calculation.",
          "Describe your approach and talk the interviewer through your calculation.",
          "It is always good to provide a 'sanity check' on your numbers and to provide common-sense commentary and insights on the implication of your calculations."
        ],
        answer: "A very good answer would include the following:\n\nInvestment would need to increase the probability of success in Phase II from 40 to 80 percent (that is, increase of 40 percentage points). There are multiple ways to approach this calculation. One method is shown here:\n\n1. If a candidate drug passes Phase II, then it has a 50% × 90% = 45% chance of being successfully marketed and sold. Since a successful candidate drug is worth $1.2 billion, a candidate drug that passes Phase II is worth 45% × $1.2 billion = $540 million.\n\n2. To break even (that is, to make the $150 million investment worthwhile), the value of the candidate drug that passes Phase II would need to increase to $540 million + $150 million = $690 million. This means, the probability of combined success in Phase I and II would need to increase by (150/540) = 28 percentage points.\n\n3. So the current probability of Phase I and II, that is, 70% × 40% = 28% would have to increase by 28 percentage points, to 56%. In order to come up to 56%, Phase II probability would have to increase from 40% to 80% (70% × 80% = 56%).\n\n4. This seems like a very big challenge, as an increase by 40 percentage points means that the current probability of 40% needs to double.",
        exhibitImage: "globapharm-exhibit"
      },
      {
        number: 4,
        question: "Next, the team explores the potential setup with BioFuture after the acquisition. Although BioFuture's existing drug pipeline is relatively limited, GlobaPharm is highly interested in its ability to serve as a biological research 'engine' that, when combined with GlobaPharm's existing R&D assets, will produce many candidate drugs over the next 10 years.\n\nWhat are your hypotheses on the major risks of integrating the R&D functions of BioFuture and GlobaPharm?",
        hints: [
          "Recognize the 'human element' of organizational change is always a key component of our work. Don't forget to include these types of insights in your answers."
        ],
        answer: "A very good answer would include the following:\n\n• Scientists do not have overlapping disease (therapeutic area) interests or expertise and are unable to materially collaborate\n\n• Integration into the process-driven GlobaPharm culture kills the entrepreneurial culture at BioFuture that has been key to its success\n\n• Language barriers severely hinder communication and sharing of information\n\n• Poor management and sense of community as a result of R&D operations that might come with a time difference of 9 hours\n\n• Key scientific talent leaving BioFuture after the acquisition – either because acquisition makes them independently wealthy or because they don't want to be a part of the new big GlobaPharm pharmaco"
      }
    ],
    difficulty: "Advanced",
    modelSolution: "This is a multi-part case study covering M&A strategy, due diligence, probability analysis, and integration risk assessment. See individual question answers for detailed solutions.",
    keyFrameworks: ["M&A Analysis", "Due Diligence", "Risk Assessment", "Probability Analysis"]
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
