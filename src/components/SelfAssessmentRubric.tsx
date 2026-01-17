import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutGrid, 
  Calculator, 
  Target, 
  MessageSquare, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface RubricCriteria {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  levels: string[];
}

const criteria: RubricCriteria[] = [
  {
    id: "structure",
    name: "Structure & Framework",
    description: "Did you use a clear, logical framework to approach the problem?",
    icon: <LayoutGrid className="w-5 h-5" />,
    levels: [
      "No clear structure",
      "Basic structure attempted",
      "Logical framework used",
      "Well-organized approach",
      "Excellent, MECE structure"
    ]
  },
  {
    id: "accuracy",
    name: "Quantitative Accuracy",
    description: "Were your calculations and numerical answers correct?",
    icon: <Calculator className="w-5 h-5" />,
    levels: [
      "Major errors or no math",
      "Significant calculation errors",
      "Minor errors but right approach",
      "Mostly accurate calculations",
      "Fully accurate with clear math"
    ]
  },
  {
    id: "insights",
    name: "Key Insights",
    description: "Did you identify the critical issues and value drivers?",
    icon: <Target className="w-5 h-5" />,
    levels: [
      "Missed key issues",
      "Identified some issues",
      "Found main drivers",
      "Good insight into drivers",
      "Deep, insightful analysis"
    ]
  },
  {
    id: "recommendation",
    name: "Recommendation Quality",
    description: "Was your final recommendation clear, actionable, and well-supported?",
    icon: <MessageSquare className="w-5 h-5" />,
    levels: [
      "No clear recommendation",
      "Vague recommendation",
      "Clear but unsupported",
      "Well-reasoned recommendation",
      "Compelling, actionable advice"
    ]
  }
];

interface SelfAssessmentRubricProps {
  onSubmitScore: (score: number, ratings: Record<string, number>) => void;
}

const SelfAssessmentRubric = ({ onSubmitScore }: SelfAssessmentRubricProps) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const handleRating = (criteriaId: string, level: number) => {
    setRatings(prev => ({
      ...prev,
      [criteriaId]: level
    }));
  };

  const allRated = criteria.every(c => ratings[c.id] !== undefined);
  
  const calculateScore = () => {
    if (!allRated) return 0;
    const totalPoints = Object.values(ratings).reduce((sum, r) => sum + r, 0);
    const maxPoints = criteria.length * 5;
    return Math.round((totalPoints / maxPoints) * 100);
  };

  const score = calculateScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreGrade = (score: number) => {
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

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="flex items-stretch">
        <div className="w-1.5 bg-gradient-to-b from-violet-500 to-purple-400" />
        <CardContent className="flex-1 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Self-Assessment</h3>
              <p className="text-sm text-description-gray">Rate your performance on each criterion</p>
            </div>
          </div>

          <div className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-primary">
                    {criterion.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{criterion.name}</h4>
                    <p className="text-xs text-description-gray">{criterion.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((level) => {
                    const isSelected = ratings[criterion.id] === level;
                    return (
                      <button
                        key={level}
                        onClick={() => handleRating(criterion.id, level)}
                        className={`
                          flex-1 min-w-[100px] px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                          ${isSelected 
                            ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md scale-105" 
                            : "bg-muted hover:bg-muted/80 text-foreground hover:scale-102"
                          }
                        `}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold">{level}</span>
                          <span className="text-[10px] opacity-80 text-center leading-tight">
                            {criterion.levels[level - 1]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Score Display */}
          {allRated && (
            <div className="mt-8 p-6 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200/50 animate-fade-in">
              <div className="text-center">
                <p className="text-sm font-medium text-violet-600 mb-2">Your Score</p>
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </span>
                  <div className="text-left">
                    <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-lg px-3 py-1">
                      {getScoreGrade(score)}
                    </Badge>
                    <p className="text-xs text-description-gray mt-1">out of 100</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              onClick={() => onSubmitScore(score, ratings)}
              disabled={!allRated}
              variant="hero"
              size="lg"
              className="w-full py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit Self-Assessment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            {!allRated && (
              <p className="text-center text-xs text-description-gray mt-2">
                Please rate all {criteria.length} criteria to continue
              </p>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default SelfAssessmentRubric;
