import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Lightbulb, RotateCcw, Home } from "lucide-react";

interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
}

interface CaseFeedbackProps {
  userAnswer: string;
  feedback: any;
  modelSolution: string;
  correctAnswers?: CaseQuestion[];
  nextTip: string;
  timeElapsed: number;
  onTryAnother: () => void;
  onGoHome: () => void;
}

const CaseFeedback = ({ 
  userAnswer, 
  feedback, 
  modelSolution, 
  correctAnswers,
  nextTip, 
  timeElapsed,
  onTryAnother, 
  onGoHome 
}: CaseFeedbackProps) => {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Parse user answer into questions if it's multi-part
  const parseUserAnswer = () => {
    const parts = userAnswer.split(/Question \d+:/);
    const questions: { [key: number]: string } = {};
    
    if (parts.length > 1) {
      parts.slice(1).forEach((part, idx) => {
        questions[idx + 1] = part.trim();
      });
    } else {
      questions[1] = userAnswer.trim();
    }
    
    return questions;
  };
  
  const userAnswers = parseUserAnswer();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Answer Review</h2>
        <p className="text-description-gray">
          Compare your answer with the correct solution
        </p>
        <Badge variant="secondary" className="text-sm font-mono">
          Time Taken: {formatTime(timeElapsed)}
        </Badge>
      </div>

      {/* Side-by-Side Comparison */}
      {correctAnswers && correctAnswers.length > 0 ? (
        <div className="space-y-6">
          {correctAnswers.map((q) => (
            <Card key={q.number} className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Question {q.number}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Your Answer */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-700">Your Answer</span>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 min-h-[200px]">
                      <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                        {userAnswers[q.number] || "No answer provided"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Correct Answer */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-700">Correct Answer</span>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 min-h-[200px]">
                      <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                        {q.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Answer Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Your Answer */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-700">Your Answer</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 min-h-[200px]">
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                    {userAnswer}
                  </p>
                </div>
              </div>
              
              {/* Model Solution */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-700">Model Solution</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 min-h-[200px]">
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                    {modelSolution}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps Tip */}
      <Card className="bg-secondary border-0">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white font-bold text-sm">💡</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Next Step Tip:</h4>
              <p className="text-description-gray">{nextTip}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={onGoHome} className="px-6">
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <Button variant="hero" onClick={onTryAnother} className="px-6">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Another Case
        </Button>
      </div>
    </div>
  );
};

export default CaseFeedback;