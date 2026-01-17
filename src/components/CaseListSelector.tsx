import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Clock, BookOpen, Star, ChevronRight } from "lucide-react";
import { cases } from "@/data/cases";
import { getCaseScore } from "@/utils/scoreStorage";

interface CaseListSelectorProps {
  firmName: string;
  onSelectCase: (caseId: string) => void;
  onBack: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-100 text-green-700 border-green-200';
    case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'hard': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const CaseListSelector = ({ firmName, onSelectCase, onBack }: CaseListSelectorProps) => {
  const firmCases = cases.filter(c => c.type === firmName);

  return (
    <div className="h-full flex flex-col space-y-8 animate-fade-in">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="text-description-gray hover:text-foreground hover:bg-white/50 mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Problem Types
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <div>
              <Badge className="mb-2 bg-white/80 text-primary border-0 shadow-sm">
                {firmName}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground">Select Your Case</h1>
              <p className="text-description-gray mt-1">
                {firmCases.length > 0 
                  ? `${firmCases.length} case${firmCases.length !== 1 ? 's' : ''} available to practice`
                  : 'No cases available yet. Check back soon!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Cards Grid */}
      <div className="grid gap-4">
        {firmCases.map((caseItem, index) => {
          const previousScore = getCaseScore(caseItem.id);
          
          return (
            <Card 
              key={caseItem.id}
              className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSelectCase(caseItem.id)}
            >
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  {/* Left accent bar */}
                  <div className="w-1.5 bg-gradient-to-b from-primary to-accent group-hover:w-2 transition-all duration-300" />
                  
                  <div className="flex-1 p-6 flex items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {caseItem.title}
                      </h3>
                      
                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className={`${getDifficultyColor(caseItem.difficulty)} border`}>
                          {caseItem.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-sm text-description-gray">
                          <Clock className="w-4 h-4" />
                          <span>{caseItem.questions.length * 10}-{caseItem.questions.length * 15} min</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-description-gray">
                          <BookOpen className="w-4 h-4" />
                          <span>{caseItem.questions.length} questions</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Score or Start indicator */}
                    <div className="flex items-center gap-4">
                      {previousScore !== null ? (
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(previousScore)}`}>
                            {previousScore}%
                          </div>
                          <div className="flex items-center gap-1 text-xs text-description-gray">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            Previous Score
                          </div>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                          New
                        </Badge>
                      )}
                      
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <ChevronRight className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {firmCases.length === 0 && (
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="py-16 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Cases Yet</h3>
            <p className="text-description-gray">Cases for this problem type are coming soon!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CaseListSelector;
