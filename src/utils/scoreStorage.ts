// Utility for managing case scores in localStorage

export interface CaseScore {
  caseId: string;
  score: number;
  date: string;
  firm: string;
  caseTitle: string;
}

export interface UserStats {
  totalCasesAttempted: number;
  averageScore: number;
  scoresByFirm: Record<string, { attempted: number; averageScore: number }>;
}

export const saveCaseScore = (caseId: string, score: number, firm: string, caseTitle: string) => {
  const scores = getCaseScores();
  const newScore: CaseScore = {
    caseId,
    score,
    date: new Date().toISOString(),
    firm,
    caseTitle
  };
  
  scores.push(newScore);
  localStorage.setItem('caseScores', JSON.stringify(scores));
};

export const getCaseScores = (): CaseScore[] => {
  const scores = localStorage.getItem('caseScores');
  return scores ? JSON.parse(scores) : [];
};

export const getCaseScore = (caseId: string): number | null => {
  const scores = getCaseScores();
  const caseScores = scores.filter(s => s.caseId === caseId);
  
  if (caseScores.length === 0) return null;
  
  // Return the most recent score
  const mostRecent = caseScores.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
  
  return mostRecent.score;
};

export const getUserStats = (): UserStats => {
  const scores = getCaseScores();
  
  if (scores.length === 0) {
    return {
      totalCasesAttempted: 0,
      averageScore: 0,
      scoresByFirm: {}
    };
  }
  
  const uniqueCases = new Set(scores.map(s => s.caseId));
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const averageScore = Math.round(totalScore / scores.length);
  
  const scoresByFirm: Record<string, { attempted: number; averageScore: number }> = {};
  
  scores.forEach(score => {
    if (!scoresByFirm[score.firm]) {
      scoresByFirm[score.firm] = { attempted: 0, averageScore: 0 };
    }
    scoresByFirm[score.firm].attempted++;
  });
  
  Object.keys(scoresByFirm).forEach(firm => {
    const firmScores = scores.filter(s => s.firm === firm);
    const firmTotal = firmScores.reduce((sum, s) => sum + s.score, 0);
    scoresByFirm[firm].averageScore = Math.round(firmTotal / firmScores.length);
  });
  
  return {
    totalCasesAttempted: uniqueCases.size,
    averageScore,
    scoresByFirm
  };
};
