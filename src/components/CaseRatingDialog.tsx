import { useState } from "react";
import { Star, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CaseRatingDialogProps {
  isOpen: boolean;
  caseTitle: string;
  score?: number;
  onSubmit: (rating: number) => void;
  onSkip: () => void;
}

const CaseRatingDialog = ({ isOpen, caseTitle, score, onSubmit, onSkip }: CaseRatingDialogProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onSubmit(selectedRating);
    }
  };

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent"
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-600";
    if (s >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreGrade = (s: number) => {
    if (s >= 90) return "A+";
    if (s >= 85) return "A";
    if (s >= 80) return "A-";
    if (s >= 75) return "B+";
    if (s >= 70) return "B";
    if (s >= 65) return "B-";
    if (s >= 60) return "C+";
    if (s >= 55) return "C";
    return "C-";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-lg border-2 border-primary/20 shadow-2xl bg-gradient-to-b from-background via-background to-primary/5" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <DialogHeader className="relative z-10">
          <div className="flex items-center justify-center mb-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg animate-pulse">
              <Trophy className="w-7 h-7 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Case Complete!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You finished "<span className="font-semibold text-foreground">{caseTitle}</span>"
          </DialogDescription>
        </DialogHeader>
        
        {/* Score Display */}
        {score !== undefined && (
          <div className="relative z-10 mx-auto my-4 p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border border-border/50 shadow-inner">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Your Score</p>
              <div className="flex items-center justify-center gap-3">
                <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
                <div className={`text-2xl font-bold px-3 py-1 rounded-lg bg-muted ${getScoreColor(score)}`}>
                  {getScoreGrade(score)}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This score is saved to your dashboard
              </p>
            </div>
          </div>
        )}

        <div className="py-4 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <p className="text-sm font-medium text-foreground">Rate this case study</p>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          
          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setSelectedRating(star)}
                className="transition-all hover:scale-125 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-full p-1"
              >
                <Star
                  className={`w-12 h-12 transition-all duration-200 ${
                    star <= (hoveredRating || selectedRating)
                      ? "fill-amber-400 text-amber-400 drop-shadow-lg"
                      : "text-gray-300 hover:text-amber-200"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Rating Label */}
          <p className="text-center text-base font-medium h-6">
            {hoveredRating > 0 
              ? <span className="text-amber-600">{ratingLabels[hoveredRating]}</span>
              : selectedRating > 0 
                ? <span className="text-amber-600">{ratingLabels[selectedRating]}</span>
                : <span className="text-muted-foreground">Click a star to rate</span>}
          </p>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3 relative z-10">
          <Button variant="ghost" onClick={onSkip} className="flex-1 text-muted-foreground hover:text-foreground">
            Skip
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedRating === 0}
            variant="hero"
            className="flex-1 text-base py-5"
          >
            <Star className="w-4 h-4 mr-2 fill-current" />
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseRatingDialog;
