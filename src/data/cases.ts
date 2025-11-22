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
  // Cases will be added here
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
