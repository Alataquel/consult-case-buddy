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
  // Cases will be added here organized by problem type:
  // - Profitability & Cost Optimization
  // - Market Entry
  // - Growth Strategy
  // - Mergers & Acquisitions (M&A)
  // - Operations & Process Improvement
  // - Pricing Strategy
  // - Product & Innovation Strategy
  // - Public Sector / Policy Cases
  // - Turnaround & Transformation
  // - Sustainability & ESG
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
