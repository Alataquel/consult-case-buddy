import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, HelpCircle, ChevronRight, BookOpen, Filter, CheckCircle, ArrowUpDown } from "lucide-react";
import { cases } from "@/data/cases";
import { getCaseScore, getCaseRating } from "@/utils/scoreStorage";
import UserStatistics from "@/components/UserStatistics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SortOption = "default" | "difficulty-asc" | "difficulty-desc" | "rating-desc" | "rating-asc";

const difficultyOrder: Record<string, number> = {
  beginner: 1,
  easy: 1,
  intermediate: 2,
  medium: 2,
  advanced: 3,
  hard: 3,
};

interface CaseListSelectorProps {
  onSelectCase: (caseId: string) => void;
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


const CaseListSelector = ({ onSelectCase }: CaseListSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("default");
  
  // Get unique problem types
  const problemTypes = [...new Set(cases.map(c => c.type))];
  
  // Apply filters and sorting
  const filteredAndSortedCases = useMemo(() => {
    // First filter
    const filtered = cases.filter(caseItem => {
      const matchesSearch = searchQuery === "" || 
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.background.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = !difficultyFilter || 
        caseItem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
      
      const matchesType = !typeFilter || caseItem.type === typeFilter;
      
      return matchesSearch && matchesDifficulty && matchesType;
    });

    // Then sort
    const sorted = [...filtered];
    
    switch (sortOption) {
      case "difficulty-asc":
        sorted.sort((a, b) => 
          (difficultyOrder[a.difficulty.toLowerCase()] || 0) - 
          (difficultyOrder[b.difficulty.toLowerCase()] || 0)
        );
        break;
      case "difficulty-desc":
        sorted.sort((a, b) => 
          (difficultyOrder[b.difficulty.toLowerCase()] || 0) - 
          (difficultyOrder[a.difficulty.toLowerCase()] || 0)
        );
        break;
      case "rating-desc":
        sorted.sort((a, b) => {
          const ratingA = getCaseRating(a.id) || 0;
          const ratingB = getCaseRating(b.id) || 0;
          return ratingB - ratingA;
        });
        break;
      case "rating-asc":
        sorted.sort((a, b) => {
          const ratingA = getCaseRating(a.id) || 0;
          const ratingB = getCaseRating(b.id) || 0;
          return ratingA - ratingB;
        });
        break;
      default:
        // Keep original order (recently added = last in array shown first)
        break;
    }

    return sorted;
  }, [searchQuery, difficultyFilter, typeFilter, sortOption]);

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            Case Library
            <button className="text-muted-foreground hover:text-foreground">
              <HelpCircle className="w-5 h-5" />
            </button>
          </h1>
          <p className="text-muted-foreground mt-1">
            {cases.length} cases available • Practice consulting interviews
          </p>
        </div>
      </div>

      {/* User Statistics */}
      <UserStatistics />

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`rounded-lg ${!typeFilter ? 'bg-muted' : ''}`}
            onClick={() => setTypeFilter(null)}
          >
            <Filter className="w-4 h-4 mr-2" />
            All Types
          </Button>
          
          {problemTypes.slice(0, 4).map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              className={`rounded-lg text-xs ${typeFilter === type ? 'bg-muted border-primary' : ''}`}
              onClick={() => setTypeFilter(typeFilter === type ? null : type)}
            >
              {type.length > 15 ? type.split(' ')[0] : type}
            </Button>
          ))}
          
          {problemTypes.length > 4 && (
            <select
              className="h-8 px-3 text-sm rounded-lg border border-input bg-background"
              value={typeFilter || ""}
              onChange={(e) => setTypeFilter(e.target.value || null)}
            >
              <option value="">More...</option>
              {problemTypes.slice(4).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        {/* Difficulty Filter */}
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
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-primary/80"
          onClick={() => {
            setSearchQuery("");
            setDifficultyFilter(null);
            setTypeFilter(null);
          }}
        >
          Clear all
        </Button>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
            <SelectTrigger className="w-[160px] h-8 text-sm">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default order</SelectItem>
              <SelectItem value="difficulty-asc">Difficulty: Easy first</SelectItem>
              <SelectItem value="difficulty-desc">Difficulty: Hard first</SelectItem>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
              <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 bg-primary hover:bg-primary/90"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedCases.length} of {cases.length} cases
        {(typeFilter || difficultyFilter) && (
          <span className="ml-2">
            {typeFilter && <Badge variant="secondary" className="mr-2">{typeFilter}</Badge>}
            {difficultyFilter && <Badge variant="secondary">{difficultyFilter}</Badge>}
          </span>
        )}
      </div>

      {/* Case Cards */}
      <div className="flex-1 space-y-4 overflow-auto pb-8">
        {filteredAndSortedCases.map((caseItem, index) => {
          const previousScore = getCaseScore(caseItem.id);
          const caseRating = getCaseRating(caseItem.id);
          const diffStyle = getDifficultyStyle(caseItem.difficulty);
          const hasCompleted = previousScore !== null;
          
          const description = caseItem.background.split('.')[0] + '.';
          
          return (
            <div 
              key={caseItem.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Top Row: Title + Rating */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-semibold text-foreground">
                    {caseItem.title}
                  </h3>
                  {!hasCompleted && (
                    <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400 text-xs font-semibold px-2 py-0.5">
                      NEW!
                    </Badge>
                  )}
                  {hasCompleted && (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                
                {caseRating && (
                  <div className="flex items-center gap-2 text-sm flex-shrink-0">
                    <span className="font-semibold text-foreground">{caseRating}.0</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= caseRating 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground hidden sm:inline">• Your rating</span>
                  </div>
                )}
              </div>
              
              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground mb-4">
                <span>Type:</span>
                {caseItem.difficulty === 'Beginner' ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-medium text-blue-600 cursor-help underline decoration-dotted underline-offset-2">
                          📝 Solo Practice
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Work through the case at your own pace with guided prompts. No interviewer pressure — perfect for building foundational skills.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-medium text-violet-600 cursor-help underline decoration-dotted underline-offset-2">
                          🎙️ Interview Mode
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Simulates a real interviewer-led case with strict phase gating. You must answer correctly to progress — just like the real thing.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <span className="mx-2 hidden sm:inline">|</span>
                <span className="hidden sm:inline">Difficulty:</span>
                <span className={`font-medium ${diffStyle.color}`}>{diffStyle.label}</span>
                <span className="mx-2">|</span>
                <span>Function:</span>
                <span className="font-medium text-foreground">{caseItem.type}</span>
                <span className="mx-2 hidden md:inline">|</span>
                <span className="hidden md:inline">Questions:</span>
                <span className="font-medium text-foreground hidden md:inline">{caseItem.questions?.length || 3}</span>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground mb-5 line-clamp-2">
                {description}
              </p>
              
              {/* Bottom Row: Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {caseItem.questions?.length || 3} questions
                  </span>
                  {caseItem.keyFrameworks?.[0] && (
                    <Badge variant="outline" className="text-xs">
                      {caseItem.keyFrameworks[0]}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                  onClick={() => onSelectCase(caseItem.id)}
                >
                  View case
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
        
        {filteredAndSortedCases.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Cases Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseListSelector;
