import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Lightbulb, RotateCcw, Home } from "lucide-react";

interface FeedbackSection {
  title: string;
  strengths: string[];
  improvements: string[];
  score: number; // 1-5 scale
}

interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
}

interface CaseFeedbackProps {
  userAnswer: string;
  feedback: {
    structure: FeedbackSection;
    logic: FeedbackSection;
    synthesis: FeedbackSection;
  };
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
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "Excellent";
    if (score >= 3) return "Good";
    if (score >= 2) return "Fair";
    return "Needs Work";
  };

  const renderFeedbackSection = (section: FeedbackSection, icon: React.ReactNode) => (
    <Card className="border-0 shadow-elegant">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg font-semibold text-foreground">
              {section.title}
            </CardTitle>
          </div>
          <Badge className={`${getScoreColor(section.score)} bg-transparent border-current`}>
            {section.score}/5 • {getScoreLabel(section.score)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.strengths.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-700">What you did well:</span>
            </div>
            <ul className="ml-6 space-y-1">
              {section.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-foreground">• {strength}</li>
              ))}
            </ul>
          </div>
        )}
        
        {section.improvements.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-orange-700">Areas to improve:</span>
            </div>
            <ul className="ml-6 space-y-1">
              {section.improvements.map((improvement, idx) => (
                <li key={idx} className="text-sm text-foreground">• {improvement}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Great Work! Here's Your Feedback</h2>
        <p className="text-description-gray">
          Review your performance and learn from the expert solution below
        </p>
        <Badge variant="secondary" className="text-sm font-mono">
          Time Taken: {formatTime(timeElapsed)}
        </Badge>
      </div>

      {/* Feedback Sections */}
      <div className="grid gap-6">
        {renderFeedbackSection(
          feedback.structure, 
          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
            <span className="text-xs font-bold text-blue-600">S</span>
          </div>
        )}
        
        {renderFeedbackSection(
          feedback.logic, 
          <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center">
            <span className="text-xs font-bold text-purple-600">L</span>
          </div>
        )}
        
        {renderFeedbackSection(
          feedback.synthesis, 
          <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center">
            <span className="text-xs font-bold text-green-600">R</span>
          </div>
        )}
      </div>

      {/* Correct Answers */}
      {correctAnswers && correctAnswers.length > 0 && (
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Correct Answers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {correctAnswers.map((q) => (
              <div key={q.number} className="space-y-2">
                <div className="bg-secondary p-3 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-bold text-accent mb-1">Question {q.number}</p>
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">{q.answer}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Model Solution */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Model Solution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-light-blue p-4 rounded-lg border-l-4 border-accent">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {modelSolution}
            </p>
          </div>
        </CardContent>
      </Card>

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