import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Send, RotateCcw, Lightbulb } from "lucide-react";

interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
}

interface Case {
  id: string;
  title: string;
  firm: string;
  type: string;
  background: string;
  question: string;
  questions?: CaseQuestion[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  exhibitImage?: string;
}

interface CasePracticeProps {
  caseData: Case;
  onSubmitAnswer: (answer: string) => void;
  onRestart: () => void;
}

const CasePractice = ({ caseData, onSubmitAnswer, onRestart }: CasePracticeProps) => {
  const [answer, setAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});

  const toggleHints = (questionNumber: number) => {
    setVisibleHints(prev => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  };

  // Simple timer (you could enhance this with useEffect for real-time updates)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with case info and timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-medium">
            {caseData.firm} • {caseData.type}
          </Badge>
          <div className="flex items-center gap-1 text-description-gray">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        <Button variant="ghost" onClick={onRestart} className="text-description-gray hover:text-foreground">
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>
      </div>

      {/* Case Question Display */}
      <Card className="shadow-elegant border-0">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            {caseData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-light-blue p-4 rounded-lg border-l-4 border-accent">
            <p className="text-foreground text-sm leading-relaxed mb-3">
              <strong>Background:</strong> {caseData.background}
            </p>
          </div>
          
          {caseData.questions && caseData.questions.length > 0 ? (
            <div className="space-y-3">
              {caseData.questions.map((q) => (
                <div key={q.number} className="bg-secondary p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-bold text-accent mb-2">Question {q.number}</p>
                  <p className="text-foreground font-medium leading-relaxed whitespace-pre-line">{q.question}</p>
                  {q.hints && q.hints.length > 0 && (
                    <div className="mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleHints(q.number)}
                        className="text-xs text-description-gray hover:text-foreground"
                      >
                        <Lightbulb className="w-3 h-3 mr-1" />
                        {visibleHints[q.number] ? "Hide Hints" : "Show Hints"}
                      </Button>
                      {visibleHints[q.number] && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <ul className="text-xs text-description-gray space-y-1">
                            {q.hints.map((hint, idx) => (
                              <li key={idx}>• {hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-secondary p-4 rounded-lg border-l-4 border-primary">
              <p className="text-foreground font-medium leading-relaxed">
                <strong>Question:</strong> {caseData.question}
              </p>
            </div>
          )}
          
          {caseData.exhibitImage && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold text-foreground mb-2">Case Exhibit:</p>
              <img 
                src={`/src/assets/${caseData.exhibitImage}.png`}
                alt="Case exhibit"
                className="w-full h-auto rounded border border-border"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answer Input */}
      <Card className="shadow-elegant border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Your Response</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Textarea
              placeholder="Structure your approach and provide your analysis here. Think about:&#10;&#10;1. How would you break down this problem?&#10;2. What are your key assumptions?&#10;3. What's your analysis and calculations?&#10;4. What's your final recommendation?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[300px] resize-none border-border focus:border-accent"
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-description-gray">
                {answer.length > 0 ? `${answer.length} characters` : "Start typing your response..."}
              </p>
              <Button 
                onClick={handleSubmit} 
                disabled={!answer.trim()}
                variant="hero"
                className="px-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Answer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Helpful Tips */}
      <Card className="bg-muted border-0">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">💡 Pro Tips:</h4>
            <ul className="text-sm text-description-gray space-y-1">
              <li>• Start with a clear structure (e.g., Revenue, Costs, External factors)</li>
              <li>• State your assumptions explicitly and make them realistic</li>
              <li>• Show your math step-by-step</li>
              <li>• End with a clear, actionable recommendation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasePractice;