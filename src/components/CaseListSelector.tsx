import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Star, HelpCircle, ChevronRight, Clock, BookOpen, Filter } from "lucide-react";
import { cases } from "@/data/cases";
import { getCaseScore } from "@/utils/scoreStorage";

interface CaseListSelectorProps {
  firmName: string;
  onSelectCase: (caseId: string) => void;
  onBack: () => void;
}

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
    case 'easy': 
      return { label: 'Beginner', color: 'text-green-600' };
    case 'intermediate':
    case 'medium': 
      return { label: 'Intermediate', color: 'text-amber-600' };
    case 'advanced':
    case 'hard': 
      return { label: 'Advanced', color: 'text-red-600' };
    default: 
      return { label: difficulty, color: 'text-gray-600' };
  }
};

const getScoreStars = (score: number | null) => {
  if (score === null) return null;
  // Convert 0-100 score to 0-5 stars
  const stars = Math.round((score / 100) * 5 * 10) / 10;
  return stars.toFixed(1);
};

const CaseListSelector = ({ firmName, onSelectCase, onBack }: CaseListSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  
  const firmCases = cases.filter(c => c.type === firmName);
  
  // Apply filters
  const filteredCases = firmCases.filter(caseItem => {
    const matchesSearch = searchQuery === "" || 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.background.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = !difficultyFilter || 
      caseItem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Case Library
              <button className="text-muted-foreground hover:text-foreground">
                <HelpCircle className="w-5 h-5" />
              </button>
            </h1>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <Button 
          variant="outline" 
          size="sm"
          className={`rounded-lg ${!difficultyFilter ? 'bg-muted' : ''}`}
          onClick={() => setDifficultyFilter(null)}
        >
          <Filter className="w-4 h-4 mr-2" />
          All Types
        </Button>
        
        {difficulties.map((diff) => (
          <Button
            key={diff}
            variant="outline"
            size="sm"
            className={`rounded-lg ${difficultyFilter === diff ? 'bg-muted border-primary' : ''}`}
            onClick={() => setDifficultyFilter(difficultyFilter === diff ? null : diff)}
          >
            {diff}
          </Button>
        ))}
        
        <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
          {firmName}
        </Badge>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-teal-600 hover:text-teal-700"
          onClick={() => {
            setSearchQuery("");
            setDifficultyFilter(null);
          }}
        >
          Clear all
        </Button>

        {/* Search */}
        <div className="flex-1 flex justify-end min-w-[200px]">
          <div className="relative w-full max-w-xs">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 rounded-lg border-border"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 bg-teal-600 hover:bg-teal-700"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Case Cards */}
      <div className="flex-1 space-y-4 overflow-auto">
        {filteredCases.map((caseItem, index) => {
          const previousScore = getCaseScore(caseItem.id);
          const diffStyle = getDifficultyStyle(caseItem.difficulty);
          const starRating = getScoreStars(previousScore);
          const isNew = previousScore === null;
          
          // Extract first sentence of background for description
          const description = caseItem.background.split('.')[0] + '.';
          
          return (
            <div 
              key={caseItem.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Top Row: Title + Rating */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {caseItem.title}
                  </h3>
                  {isNew && (
                    <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400 text-xs font-semibold px-2 py-0.5">
                      NEW!
                    </Badge>
                  )}
                </div>
                
                {starRating && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-foreground">{starRating}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= Math.round(parseFloat(starRating)) 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">• Your score: {previousScore}%</span>
                  </div>
                )}
              </div>
              
              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground mb-4">
                <span>Type:</span>
                <span className="font-medium text-foreground">Interviewer-led</span>
                <span className="mx-2">|</span>
                <span>Difficulty:</span>
                <span className={`font-medium ${diffStyle.color}`}>{diffStyle.label}</span>
                <span className="mx-2">|</span>
                <span>Function:</span>
                <span className="font-medium text-foreground">{caseItem.type}</span>
                <span className="mx-2">|</span>
                <span>Questions:</span>
                <span className="font-medium text-foreground">{caseItem.questions?.length || 3}</span>
                <span className="mx-2">|</span>
                <span>Frameworks:</span>
                <span className="font-medium text-foreground">{caseItem.keyFrameworks?.[0] || 'Various'}</span>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-5 line-clamp-2">
                {description}
              </p>
              
              {/* Bottom Row: Actions */}
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span>Read Q&A</span>
                </button>
                
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6"
                  onClick={() => onSelectCase(caseItem.id)}
                >
                  View case
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
        
        {filteredCases.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Cases Found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search or filters' : 'Cases for this problem type are coming soon!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseListSelector;
