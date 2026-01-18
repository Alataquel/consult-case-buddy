import { useState } from "react";
import { Star, Sparkles } from "lucide-react";
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
        className="sm:max-w-md border-0 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {/* Soft glowing background accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        
        {/* Main content - centered vertically */}
        <div className="relative z-10 flex flex-col items-center justify-center py-8 px-4">
          {/* Celebration icon */}
          <div className="mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-amber-400 absolute -top-2 -left-4 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 absolute -bottom-1 -right-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">
            Case Complete!
          </h2>
          
          {/* Subtitle */}
          <p className="text-slate-400 text-center mb-8 text-sm">
            You finished "<span className="text-slate-200 font-medium">{caseTitle}</span>"
          </p>
          
          {/* Rating prompt */}
          <p className="text-lg font-medium text-slate-200 mb-6">
            How was this case study?
          </p>
          
          {/* Star Rating - Large and prominent */}
          <div className="flex justify-center gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setSelectedRating(star)}
                className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full"
              >
                <Star
                  className={`w-14 h-14 transition-all duration-200 ${
                    star <= (hoveredRating || selectedRating)
                      ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                      : "text-slate-600 hover:text-slate-500"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Rating Label */}
          <p className="text-center text-lg font-medium h-7 mb-8">
            {hoveredRating > 0 
              ? <span className="text-amber-400">{ratingLabels[hoveredRating]}</span>
              : selectedRating > 0 
                ? <span className="text-amber-400">{ratingLabels[selectedRating]}</span>
                : <span className="text-slate-500">Tap a star to rate</span>}
          </p>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3 relative z-10 border-t border-slate-700/50 pt-4">
          <Button 
            variant="ghost" 
            onClick={onSkip} 
            className="flex-1 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
          >
            Skip
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedRating === 0}
            className="flex-1 text-base py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:shadow-none"
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
