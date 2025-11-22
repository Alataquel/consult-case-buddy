import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Target, Zap } from "lucide-react";

interface DifficultySelectorProps {
  firmName: string;
  onSelectDifficulty: (difficulty: string) => void;
  onBack: () => void;
}

const DifficultySelector = ({ firmName, onSelectDifficulty, onBack }: DifficultySelectorProps) => {
  const difficulties = [
    {
      level: "Beginner",
      description: "Perfect for getting started with case interviews",
      icon: Zap,
      color: "border-green-500 hover:bg-green-50"
    },
    {
      level: "Intermediate",
      description: "More complex scenarios requiring deeper analysis",
      icon: Target,
      color: "border-yellow-500 hover:bg-yellow-50"
    },
    {
      level: "Advanced",
      description: "Challenging cases for experienced practitioners",
      icon: TrendingUp,
      color: "border-red-500 hover:bg-red-50"
    }
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-description-gray hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Firms
        </Button>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Select Difficulty Level</h2>
        <p className="text-description-gray text-lg">
          Choose the difficulty level for <span className="text-primary font-semibold">{firmName}</span> cases
        </p>
      </div>

      <div className="space-y-4">
        {difficulties.map((difficulty) => {
          const Icon = difficulty.icon;
          return (
            <Card 
              key={difficulty.level}
              className={`shadow-elegant border-2 ${difficulty.color} cursor-pointer transition-all hover:shadow-lg`}
              onClick={() => onSelectDifficulty(difficulty.level)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-accent" />
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {difficulty.level}
                    </CardTitle>
                    <CardDescription className="text-description-gray">
                      {difficulty.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;
