// AI-powered feedback generation for case study responses

interface FeedbackSection {
  title: string;
  strengths: string[];
  improvements: string[];
  score: number; // 1-5 scale
}

interface CaseFeedback {
  structure: FeedbackSection;
  logic: FeedbackSection;
  synthesis: FeedbackSection;
  overallScore: number;
}

export const generateFeedback = (userAnswer: string, caseType: string): CaseFeedback => {
  // Analyze the user's answer for different components
  const answerLength = userAnswer.length;
  const hasStructure = checkForStructure(userAnswer);
  const hasCalculations = checkForCalculations(userAnswer);
  const hasRecommendation = checkForRecommendation(userAnswer);
  const hasAssumptions = checkForAssumptions(userAnswer);

  // Generate Structure Feedback
  const structureFeedback: FeedbackSection = {
    title: "Structure & Framework",
    strengths: [],
    improvements: [],
    score: 3
  };

  if (hasStructure) {
    structureFeedback.strengths.push("Good use of structured framework to break down the problem");
    structureFeedback.score += 1;
  }
  if (userAnswer.includes("First") || userAnswer.includes("1.") || userAnswer.includes("•")) {
    structureFeedback.strengths.push("Clear sequencing and organization of thoughts");
    structureFeedback.score += 0.5;
  }

  if (!hasStructure) {
    structureFeedback.improvements.push("Use a clear framework (e.g., profitability tree, market sizing) to structure your approach");
  }
  if (answerLength < 200) {
    structureFeedback.improvements.push("Provide more detailed analysis for each component of your framework");
  }

  // Generate Logic & Math Feedback
  const logicFeedback: FeedbackSection = {
    title: "Logic & Analysis",
    strengths: [],
    improvements: [],
    score: 3
  };

  if (hasCalculations) {
    logicFeedback.strengths.push("Included quantitative analysis to support your reasoning");
    logicFeedback.score += 1;
  }
  if (hasAssumptions) {
    logicFeedback.strengths.push("Stated key assumptions clearly");
    logicFeedback.score += 0.5;
  }

  if (!hasCalculations && (caseType === "Market Sizing" || caseType === "Profitability")) {
    logicFeedback.improvements.push("Include specific calculations and numerical estimates");
  }
  if (!hasAssumptions) {
    logicFeedback.improvements.push("State your key assumptions explicitly (e.g., market size, pricing, growth rates)");
  }

  // Generate Synthesis & Recommendation Feedback
  const synthesisFeedback: FeedbackSection = {
    title: "Synthesis & Recommendation",
    strengths: [],
    improvements: [],
    score: 3
  };

  if (hasRecommendation) {
    synthesisFeedback.strengths.push("Provided a clear recommendation");
    synthesisFeedback.score += 1;
  }
  if (userAnswer.toLowerCase().includes("therefore") || userAnswer.toLowerCase().includes("recommend")) {
    synthesisFeedback.strengths.push("Good synthesis of analysis into actionable insights");
    synthesisFeedback.score += 0.5;
  }

  if (!hasRecommendation) {
    synthesisFeedback.improvements.push("End with a clear, actionable recommendation");
  }
  if (!userAnswer.toLowerCase().includes("risk") && !userAnswer.toLowerCase().includes("next step")) {
    synthesisFeedback.improvements.push("Consider discussing risks or next steps for implementation");
  }

  // Cap scores at 5
  structureFeedback.score = Math.min(5, structureFeedback.score);
  logicFeedback.score = Math.min(5, logicFeedback.score);
  synthesisFeedback.score = Math.min(5, synthesisFeedback.score);

  // Calculate overall score (average of all sections, converted to percentage)
  const averageScore = (structureFeedback.score + logicFeedback.score + synthesisFeedback.score) / 3;
  const overallScore = Math.round((averageScore / 5) * 100);

  return {
    structure: structureFeedback,
    logic: logicFeedback,
    synthesis: synthesisFeedback,
    overallScore
  };
};

const checkForStructure = (answer: string): boolean => {
  const structureIndicators = [
    "framework", "approach", "first", "second", "third",
    "1.", "2.", "3.", "•", "-", "structure", "break down",
    "revenue", "cost", "profit", "market", "customers"
  ];
  
  return structureIndicators.some(indicator => 
    answer.toLowerCase().includes(indicator)
  );
};

const checkForCalculations = (answer: string): boolean => {
  const mathIndicators = [
    "calculate", "million", "billion", "€", "$", "%",
    "=", "×", "*", "+", "-", "/", "estimate"
  ];
  
  return mathIndicators.some(indicator => 
    answer.includes(indicator)
  );
};

const checkForRecommendation = (answer: string): boolean => {
  const recommendationIndicators = [
    "recommend", "suggest", "should", "conclusion",
    "therefore", "overall", "final", "decision"
  ];
  
  return recommendationIndicators.some(indicator => 
    answer.toLowerCase().includes(indicator)
  );
};

const checkForAssumptions = (answer: string): boolean => {
  const assumptionIndicators = [
    "assume", "assuming", "assumption", "estimate",
    "approximately", "roughly", "likely", "expect"
  ];
  
  return assumptionIndicators.some(indicator => 
    answer.toLowerCase().includes(indicator)
  );
};

export const generateNextTip = (feedback: CaseFeedback, caseType: string): string => {
  const lowestScore = Math.min(
    feedback.structure.score,
    feedback.logic.score, 
    feedback.synthesis.score
  );

  if (lowestScore === feedback.structure.score) {
    return "Great job! Next time, spend more time upfront creating a structured framework. A good structure is like a roadmap - it guides your entire analysis and makes your thinking clear to the interviewer.";
  } else if (lowestScore === feedback.logic.score) {
    return "Nice work! For your next case, focus on making your assumptions more explicit and adding sensitivity analysis. Ask yourself: 'What if this assumption changes by 20%? How does it impact my conclusion?'";
  } else {
    return "Excellent analysis! To take it to the next level, try to be more crisp with your final recommendation. Lead with your conclusion, then briefly support it with 2-3 key points from your analysis.";
  }
};