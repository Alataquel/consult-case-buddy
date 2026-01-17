import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, RotateCcw, Home, Clock, Lightbulb, FileText, Image } from "lucide-react";
import { exhibitImages } from "./CasePractice";

interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
  answerImage?: string;
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
    <div className="h-full flex flex-col space-y-8 animate-fade-in">
      {/* Hero Header - matching CasePractice style */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-white/80 text-green-700 border-0 shadow-sm">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Answer Review
              </h1>
              <p className="text-description-gray mt-2">
                Compare your answer with the correct solution
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-xl font-mono font-bold text-foreground">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      {correctAnswers && correctAnswers.length > 0 ? (
        <div className="grid gap-6">
          {correctAnswers.map((q, index) => (
            <Card 
              key={q.number} 
              className="border-0 shadow-lg overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-stretch">
                <div className="w-1.5 bg-gradient-to-b from-primary to-primary/50" />
                <CardContent className="flex-1 p-6">
                  {/* Question Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary">
                      {q.number}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">Question {q.number}</span>
                      <p className="text-foreground font-medium leading-relaxed">
                        {q.question}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Your Answer */}
                    <Card className="border-0 shadow-md overflow-hidden">
                      <div className="flex items-stretch">
                        <div className="w-1 bg-gradient-to-b from-blue-500 to-blue-300" />
                        <CardContent className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-semibold text-blue-700">Your Answer</span>
                          </div>
                          <div className="bg-blue-50/50 p-4 rounded-lg min-h-[180px]">
                            <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                              {userAnswers[q.number] || "No answer provided"}
                            </p>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                    
                    {/* Correct Answer */}
                    <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50/50">
                      <div className="flex items-stretch">
                        <div className="w-1.5 bg-gradient-to-b from-emerald-500 to-green-400" />
                        <CardContent className="flex-1 p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-sm">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-emerald-700 text-lg">Correct Answer</span>
                          </div>
                          <div className="bg-white/80 backdrop-blur p-5 rounded-xl border border-emerald-200/50 shadow-inner min-h-[180px]">
                            <p className="text-foreground leading-relaxed whitespace-pre-line">
                              {q.answer}
                            </p>
                            {q.answerImage && exhibitImages[q.answerImage] && (
                              <div className="mt-5 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                                <p className="text-xs font-medium text-emerald-600 mb-2 flex items-center gap-1.5">
                                  <Image className="w-3.5 h-3.5" />
                                  Solution Exhibit
                                </p>
                                <img 
                                  src={exhibitImages[q.answerImage]} 
                                  alt={`Answer exhibit for Question ${q.number}`}
                                  className="w-full rounded-lg border border-emerald-200 shadow-sm"
                                />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="flex items-stretch">
            <div className="w-1.5 bg-gradient-to-b from-blue-500 to-blue-300" />
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Your Answer</h3>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-lg">
                <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
                  {userAnswer}
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      )}

      {/* Next Steps Tip */}
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="flex items-stretch">
          <div className="w-1.5 bg-gradient-to-b from-amber-500 to-amber-300" />
          <CardContent className="flex-1 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Next Step Tip</h3>
            </div>
            <p className="text-foreground leading-relaxed">{nextTip}</p>
          </CardContent>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pb-8">
        <Button variant="outline" onClick={onGoHome} size="lg" className="px-6 py-6">
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        <Button variant="hero" onClick={onTryAnother} size="lg" className="px-8 py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Another Case
        </Button>
      </div>
    </div>
  );
};

export default CaseFeedback;
