import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, ArrowRight, Lightbulb } from "lucide-react";

interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
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

interface CasePresentationProps {
  caseData: Case;
  onStartCase: () => void;
  onGoBack: () => void;
}

const CasePresentation = ({ caseData, onStartCase, onGoBack }: CasePresentationProps) => {
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});

  const toggleHints = (questionNumber: number) => {
    setVisibleHints(prev => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  };

  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800", 
    Advanced: "bg-red-100 text-red-800"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onGoBack} className="text-description-gray hover:text-foreground">
          ← Back to Selection
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-medium">
            <Building className="w-3 h-3 mr-1" />
            {caseData.firm}
          </Badge>
          <Badge variant="outline" className="font-medium">
            {caseData.type}
          </Badge>
        </div>
      </div>

      {/* Case Details */}
      <Card className="shadow-elegant border-0">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                {caseData.title}
              </CardTitle>
              <div className="flex items-center gap-4">
                <Badge className={difficultyColors[caseData.difficulty]}>
                  {caseData.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Background */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Case Background</h3>
            <div className="bg-light-blue p-4 rounded-lg border-l-4 border-accent">
              <p className="text-foreground leading-relaxed">{caseData.background}</p>
            </div>
          </div>

          {/* Questions */}
          {caseData.questions && caseData.questions.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Case Questions</h3>
              <div className="space-y-4">
                {caseData.questions.map((q) => (
                  <div key={q.number}>
                    <div className="bg-secondary p-4 rounded-lg border-l-4 border-primary">
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
                    
                    {/* Question-specific exhibit */}
                    {q.exhibitImage && (
                      <div className="mt-3 bg-muted p-4 rounded-lg">
                        <p className="text-sm font-semibold text-foreground mb-2">Exhibit for Question {q.number}:</p>
                        <img 
                          src={`/src/assets/${q.exhibitImage}.png`}
                          alt={`Exhibit for question ${q.number}`}
                          className="w-full h-auto rounded border border-border"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Your Challenge</h3>
              <div className="bg-secondary p-4 rounded-lg border-l-4 border-primary">
                <p className="text-foreground font-medium leading-relaxed">{caseData.question}</p>
              </div>
            </div>
          )}

          {/* Case Exhibit */}
          {caseData.exhibitImage && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Case Exhibit</h3>
              <div className="bg-muted p-4 rounded-lg">
                <img 
                  src={`/src/assets/${caseData.exhibitImage}.png`}
                  alt="Case exhibit"
                  className="w-full h-auto rounded border border-border"
                />
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Instructions</h3>
            <div className="bg-muted p-4 rounded-lg">
              <ul className="space-y-2 text-description-gray">
                <li>• Take your time to structure your approach before diving into details</li>
                <li>• Think out loud - explain your reasoning as you work through the case</li>
                <li>• Make realistic assumptions and state them clearly</li>
                <li>• Synthesize your findings into actionable recommendations</li>
              </ul>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 text-center">
            <Button 
              onClick={onStartCase} 
              size="lg" 
              variant="hero"
              className="px-8"
            >
              Start Case Practice
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasePresentation;