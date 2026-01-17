import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, ArrowRight, Lightbulb, ArrowLeft, FileText, HelpCircle, Image, BookOpen, Clock, Target, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { exhibitImages } from "./CasePractice";

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

  const difficultyConfig = {
    Beginner: { color: "bg-green-100 text-green-700 border-green-200", icon: "🟢" },
    Intermediate: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🟡" }, 
    Advanced: { color: "bg-red-100 text-red-700 border-red-200", icon: "🔴" }
  };

  const estimatedTime = caseData.questions ? caseData.questions.length * 12 : 15;

  return (
    <div className="w-full px-6 lg:px-12 space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <Button 
            variant="ghost" 
            onClick={onGoBack} 
            className="text-description-gray hover:text-foreground hover:bg-white/50 mb-6 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </Button>
          
          <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-white/80 text-primary border-0 shadow-sm">
                  <Building className="w-3 h-3 mr-1" />
                  {caseData.firm}
                </Badge>
                <Badge variant="outline" className="bg-white/50 border-white/80">
                  {caseData.type}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {caseData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Badge className={`${difficultyConfig[caseData.difficulty].color} border px-3 py-1`}>
                  {difficultyConfig[caseData.difficulty].icon} {caseData.difficulty}
                </Badge>
                <div className="flex items-center gap-1.5 text-description-gray bg-white/60 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>~{estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-1.5 text-description-gray bg-white/60 px-3 py-1 rounded-full">
                  <HelpCircle className="w-4 h-4" />
                  <span>{caseData.questions?.length || 1} questions</span>
                </div>
              </div>
            </div>
              
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        {/* Background Section */}
        <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-stretch">
            <div className="w-1.5 bg-gradient-to-b from-accent to-accent/50" />
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Case Background</h3>
              </div>
              <p className="text-foreground leading-relaxed text-base">{caseData.background}</p>
            </CardContent>
          </div>
        </Card>

        {/* Questions Section */}
        {caseData.questions && caseData.questions.length > 0 && (
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="flex items-stretch">
              <div className="w-1.5 bg-gradient-to-b from-primary to-primary/50" />
              <CardContent className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Case Questions</h3>
                </div>
                
                <div className="space-y-4">
                  {caseData.questions.map((q, index) => (
                    <div 
                      key={q.number}
                      className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-colors duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                          {q.number}
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-medium leading-relaxed whitespace-pre-line">
                            {q.question}
                          </p>
                          
                          {q.hints && q.hints.length > 0 && (
                            <div className="mt-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleHints(q.number)}
                                className="text-sm text-accent hover:text-accent hover:bg-accent/10 -ml-2"
                              >
                                <Lightbulb className="w-4 h-4 mr-2" />
                                {visibleHints[q.number] ? "Hide Hints" : "Show Hints"}
                                {visibleHints[q.number] ? (
                                  <ChevronUp className="w-4 h-4 ml-1" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 ml-1" />
                                )}
                              </Button>
                              
                              {visibleHints[q.number] && (
                                <div className="mt-3 p-4 bg-accent/5 rounded-lg border border-accent/20 animate-fade-in">
                                  <ul className="space-y-2">
                                    {q.hints.map((hint, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-description-gray">
                                        <span className="text-accent mt-0.5">💡</span>
                                        {hint}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Question-specific exhibit */}
                      {q.exhibitImage && (
                        <div className="mt-4 ml-12 p-4 bg-white rounded-lg border border-border/50">
                          <p className="text-sm font-medium text-description-gray mb-3 flex items-center gap-2">
                            <Image className="w-4 h-4" />
                            Exhibit for Question {q.number}
                          </p>
                          <img 
                            src={exhibitImages[q.exhibitImage]}
                            alt={`Exhibit for question ${q.number}`}
                            className="w-full h-auto rounded-lg border border-border shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Case Exhibit */}
        {caseData.exhibitImage && (
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="flex items-stretch">
              <div className="w-1.5 bg-gradient-to-b from-purple-500 to-purple-300" />
              <CardContent className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Image className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Case Exhibit</h3>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border/50">
                  <img 
                    src={exhibitImages[caseData.exhibitImage]}
                    alt="Case exhibit"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
          <div className="flex items-stretch">
            <div className="w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-300" />
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Tips for Success</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { icon: Target, text: "Structure your approach before diving into details" },
                  { icon: "💬", text: "Think out loud - explain your reasoning clearly" },
                  { icon: "📝", text: "Make realistic assumptions and state them" },
                  { icon: "🎯", text: "Synthesize findings into actionable recommendations" }
                ].map((tip, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
                  >
                    {typeof tip.icon === 'string' ? (
                      <span className="text-lg">{tip.icon}</span>
                    ) : (
                      <tip.icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-foreground">{tip.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-8">
        <Button 
          onClick={onStartCase} 
          size="lg" 
          variant="hero"
          className="px-12 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
        >
          <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Begin Case Practice
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-description-gray mt-3">
          Your answers will be saved and reviewed at the end
        </p>
      </div>
    </div>
  );
};

export default CasePresentation;