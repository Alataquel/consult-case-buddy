// Utility for managing case scores and ratings in localStorage

export interface CaseScore {
  caseId: string;
  score: number;
  date: string;
  firm: string;
  caseTitle: string;
}

export interface CaseRating {
  caseId: string;
  rating: number; // 1-5 stars
  date: string;
}

export interface UserStats {
  totalCasesAttempted: number;
  totalAttempts: number;
  averageScore: number;
  overallGrade: string;
  bestCase: { title: string; score: number } | null;
  currentStreak: number;
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

// Case Rating Functions (quality feedback)
export const saveCaseRating = (caseId: string, rating: number) => {
  const ratings = getCaseRatings();
  const existingIndex = ratings.findIndex(r => r.caseId === caseId);
  
  const newRating: CaseRating = {
    caseId,
    rating,
    date: new Date().toISOString()
  };
  
  if (existingIndex >= 0) {
    // Update existing rating
    ratings[existingIndex] = newRating;
  } else {
    // Add new rating
    ratings.push(newRating);
  }
  
  localStorage.setItem('caseRatings', JSON.stringify(ratings));
};

export const getCaseRatings = (): CaseRating[] => {
  const ratings = localStorage.getItem('caseRatings');
  return ratings ? JSON.parse(ratings) : [];
};

export const getCaseRating = (caseId: string): number | null => {
  const ratings = getCaseRatings();
  const rating = ratings.find(r => r.caseId === caseId);
  return rating ? rating.rating : null;
};

export const getAverageCaseRating = (caseId: string): { rating: number; count: number } | null => {
  // For now, we just return the user's own rating
  // In a real app with a database, this would aggregate all user ratings
  const rating = getCaseRating(caseId);
  if (rating === null) return null;
  return { rating, count: 1 };
};

const getGradeFromScore = (score: number): string => {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "A-";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "B-";
  if (score >= 60) return "C+";
  if (score >= 55) return "C";
  if (score >= 50) return "C-";
  return "D";
};

const calculateStreak = (scores: CaseScore[]): number => {
  if (scores.length === 0) return 0;
  
  const sortedScores = [...scores].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  
  for (const score of sortedScores) {
    const scoreDate = new Date(score.date);
    const daysDiff = Math.floor((currentDate.getTime() - scoreDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      streak++;
      currentDate = scoreDate;
    } else {
      break;
    }
  }
  
  return streak;
};

export const getUserStats = (): UserStats => {
  const scores = getCaseScores();
  
  if (scores.length === 0) {
    return {
      totalCasesAttempted: 0,
      totalAttempts: 0,
      averageScore: 0,
      overallGrade: "N/A",
      bestCase: null,
      currentStreak: 0,
      scoresByFirm: {}
    };
  }
  
  const uniqueCases = new Set(scores.map(s => s.caseId));
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const averageScore = Math.round(totalScore / scores.length);
  const overallGrade = getGradeFromScore(averageScore);
  
  // Find best case
  const bestScore = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  const bestCase = { title: bestScore.caseTitle, score: bestScore.score };
  
  const currentStreak = calculateStreak(scores);
  
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
    totalAttempts: scores.length,
    averageScore,
    overallGrade,
    bestCase,
    currentStreak,
    scoresByFirm
  };
};
