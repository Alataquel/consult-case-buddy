import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

interface CaseRatingDialogProps {
  isOpen: boolean;
  caseTitle: string;
  score?: number;
  onSubmit: (rating: number) => void;
  onSkip: () => void;
}

const CaseRatingDialog = ({ isOpen, caseTitle, onSubmit, onSkip }: CaseRatingDialogProps) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md border border-border/50 shadow-xl bg-card text-card-foreground" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {/* Main content */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          {/* Simple check icon */}
          <div className="mb-5">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-2 text-foreground">
            Case Complete
          </h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-center mb-6 text-sm">
            You finished "<span className="text-foreground font-medium">{caseTitle}</span>"
          </p>
          
          {/* Rating prompt */}
          <p className="text-base font-medium text-foreground mb-5">
            How was this case study?
          </p>
          
          {/* Star Rating */}
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setSelectedRating(star)}
                className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background rounded-full"
              >
                <Star
                  className={`w-10 h-10 transition-all duration-200 ${
                    star <= (hoveredRating || selectedRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/40 hover:text-muted-foreground/60"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Rating Label */}
          <p className="text-center text-sm font-medium h-6 mb-4">
            {hoveredRating > 0 
              ? <span className="text-foreground">{ratingLabels[hoveredRating]}</span>
              : selectedRating > 0 
                ? <span className="text-foreground">{ratingLabels[selectedRating]}</span>
                : <span className="text-muted-foreground">Tap a star to rate</span>}
          </p>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3 border-t border-border/50 pt-4">
          <Button 
            variant="ghost" 
            onClick={onSkip} 
            className="flex-1 text-muted-foreground hover:text-foreground"
          >
            Skip
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedRating === 0}
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
