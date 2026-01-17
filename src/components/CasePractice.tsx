import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Send, RotateCcw, Lightbulb, FileText, HelpCircle, Image, BookOpen, ChevronDown, ChevronUp, Building, ArrowRight } from "lucide-react";

// Import all exhibit images
import solarwaveExhibit from "@/assets/solarwave-exhibit.png";
import aurumExhibit from "@/assets/aurum-exhibit.png";
import novarideExhibit from "@/assets/novaride-exhibit.png";
import mediflowExhibit from "@/assets/mediflow-exhibit.png";
import helionExhibit from "@/assets/helion-exhibit.png";
import castellonExhibit from "@/assets/castellon-exhibit.png";
import maisonDuboisExhibit from "@/assets/maison-dubois-exhibit.png";
import aurahomeExhibit from "@/assets/aurahome-exhibit.png";
import aurahomeLifecycleExhibit from "@/assets/aurahome-lifecycle-exhibit.png";
import freshrouteExhibit from "@/assets/freshroute-exhibit.png";
import vitafreshExhibit from "@/assets/vitafresh-exhibit.png";
import urbanbrewExhibit from "@/assets/urbanbrew-exhibit.png";
import urbanbrewBcgExhibit from "@/assets/urbanbrew-bcg-exhibit.png";
import datasafeExhibit from "@/assets/datasafe-exhibit.png";
import datasafeDiagnosticExhibit from "@/assets/datasafe-diagnostic-exhibit.png";
import datasafeAnswerExhibit from "@/assets/datasafe-answer-exhibit.png";
import vedahealthExhibit from "@/assets/vedahealth-exhibit.png";
import nordpayExhibit from "@/assets/nordpay-exhibit.png";

const exhibitImages: Record<string, string> = {
  "solarwave-exhibit": solarwaveExhibit,
  "aurum-exhibit": aurumExhibit,
  "novaride-exhibit": novarideExhibit,
  "mediflow-exhibit": mediflowExhibit,
  "helion-exhibit": helionExhibit,
  "castellon-exhibit": castellonExhibit,
  "maison-dubois-exhibit": maisonDuboisExhibit,
  "aurahome-exhibit": aurahomeExhibit,
  "aurahome-lifecycle-exhibit": aurahomeLifecycleExhibit,
  "freshroute-exhibit": freshrouteExhibit,
  "vitafresh-exhibit": vitafreshExhibit,
  "urbanbrew-exhibit": urbanbrewExhibit,
  "urbanbrew-bcg-exhibit": urbanbrewBcgExhibit,
  "datasafe-exhibit": datasafeExhibit,
  "datasafe-diagnostic-exhibit": datasafeDiagnosticExhibit,
  "datasafe-answer-exhibit": datasafeAnswerExhibit,
  "vedahealth-exhibit": vedahealthExhibit,
  "nordpay-exhibit": nordpayExhibit,
};

export { exhibitImages };

interface CaseQuestion {
  number: number;
  question: string;
  hints?: string[];
  answer: string;
  exhibitImage?: string;
  answerImage?: string;
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
  onSubmitAnswer: (answer: string, timeElapsed: number) => void;
  onRestart: () => void;
}

const CasePractice = ({ caseData, onSubmitAnswer, onRestart }: CasePracticeProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});

  // Start timer when component mounts and scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleHints = (questionNumber: number) => {
    setVisibleHints(prev => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  };

  const updateAnswer = (questionNumber: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: value
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    let combinedAnswer = "";
    
    if (caseData.questions && caseData.questions.length > 0) {
      combinedAnswer = caseData.questions
        .map(q => {
          const answer = answers[q.number] || "";
          return answer ? `Question ${q.number}:\n${answer}` : "";
        })
        .filter(a => a)
        .join("\n\n");
    } else {
      combinedAnswer = answers[1] || "";
    }
    
    if (combinedAnswer.trim()) {
      onSubmitAnswer(combinedAnswer, timeElapsed);
    }
  };

  const hasAnyAnswer = Object.values(answers).some(a => a.trim().length > 0);

  const difficultyConfig = {
    Beginner: { color: "bg-green-100 text-green-700 border-green-200", icon: "🟢" },
    Intermediate: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🟡" }, 
    Advanced: { color: "bg-red-100 text-red-700 border-red-200", icon: "🔴" }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-white/80 text-primary border-0 shadow-sm">
                  <Building className="w-3 h-3 mr-1" />
                  {caseData.firm}
                </Badge>
                <Badge variant="outline" className="bg-white/50 border-white/80">
                  {caseData.type}
                </Badge>
                <Badge className={`${difficultyConfig[caseData.difficulty].color} border`}>
                  {difficultyConfig[caseData.difficulty].icon} {caseData.difficulty}
                </Badge>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {caseData.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-xl font-mono font-bold text-foreground">{formatTime(timeElapsed)}</span>
              </div>
              <Button 
                variant="ghost" 
                onClick={onRestart} 
                className="text-description-gray hover:text-foreground hover:bg-white/50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        {/* Background Section */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="flex items-stretch">
            <div className="w-1.5 bg-gradient-to-b from-accent to-accent/50" />
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Case Background</h3>
              </div>
              <p className="text-foreground leading-relaxed">{caseData.background}</p>
            </CardContent>
          </div>
        </Card>

        {/* Questions & Answers */}
        {caseData.questions && caseData.questions.length > 0 ? (
          caseData.questions.map((q, index) => (
            <Card 
              key={q.number} 
              className="border-0 shadow-lg overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-stretch">
                <div className="w-1.5 bg-gradient-to-b from-primary to-primary/50" />
                <CardContent className="flex-1 p-6">
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary">
                      {q.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Question {q.number}</span>
                      </div>
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
                  {q.exhibitImage && exhibitImages[q.exhibitImage] && (
                    <div className="mb-6 p-4 bg-white rounded-xl border border-border/50">
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
                  
                  {/* Answer textarea */}
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your Answer
                    </label>
                    <Textarea
                      placeholder={`Type your answer for Question ${q.number}...`}
                      value={answers[q.number] || ""}
                      onChange={(e) => updateAnswer(q.number, e.target.value)}
                      className="min-h-[180px] resize-none border-border focus:border-primary bg-white"
                    />
                    <p className="text-xs text-description-gray mt-2">
                      {answers[q.number]?.length || 0} characters
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="flex items-stretch">
              <div className="w-1.5 bg-gradient-to-b from-primary to-primary/50" />
              <CardContent className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Your Challenge</h3>
                </div>
                <p className="text-foreground font-medium leading-relaxed mb-6">
                  {caseData.question}
                </p>
                
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Answer
                  </label>
                  <Textarea
                    placeholder="Type your answer..."
                    value={answers[1] || ""}
                    onChange={(e) => updateAnswer(1, e.target.value)}
                    className="min-h-[250px] resize-none border-border focus:border-primary bg-white"
                  />
                  <p className="text-xs text-description-gray mt-2">
                    {answers[1]?.length || 0} characters
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        )}
        
        {/* Case Exhibit */}
        {caseData.exhibitImage && exhibitImages[caseData.exhibitImage] && (
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

        {/* Pro Tips */}
        <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
          <div className="flex items-stretch">
            <div className="w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-300" />
            <CardContent className="flex-1 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Pro Tips</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Start with a clear structure (Revenue, Costs, External factors)",
                  "State your assumptions explicitly and realistically",
                  "Show your math step-by-step",
                  "End with a clear, actionable recommendation"
                ].map((tip, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-white/60 rounded-lg"
                  >
                    <span className="text-lg">💡</span>
                    <span className="text-sm text-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Submit CTA */}
      <div className="text-center pb-8">
        <Button 
          onClick={handleSubmit} 
          disabled={!hasAnyAnswer}
          size="lg" 
          variant="hero"
          className="px-12 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit All Answers
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-description-gray mt-3">
          {hasAnyAnswer ? "Review your answers and submit when ready" : "Start typing your responses to enable submission"}
        </p>
      </div>
    </div>
  );
};

export default CasePractice;