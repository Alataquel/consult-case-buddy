import { useState } from "react";
import { Star } from "lucide-react";
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
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Rate This Case</DialogTitle>
          <DialogDescription className="text-center">
            How would you rate the quality of "<span className="font-medium">{caseTitle}</span>"?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setSelectedRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoveredRating || selectedRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Rating Label */}
          <p className="text-center text-sm text-muted-foreground h-5">
            {hoveredRating > 0 
              ? ratingLabels[hoveredRating] 
              : selectedRating > 0 
                ? ratingLabels[selectedRating]
                : "Click to rate"}
          </p>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="ghost" onClick={onSkip} className="flex-1">
            Skip
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedRating === 0}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseRatingDialog;
