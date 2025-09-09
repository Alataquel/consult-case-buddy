import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Target, TrendingUp, Users, DollarSign, Settings } from "lucide-react";

interface CaseSelectorProps {
  onSelect: (type: string, value: string) => void;
}

const CaseSelector = ({ onSelect }: CaseSelectorProps) => {
  const firms = [
    { name: "McKinsey", description: "Strategy-focused cases with structured frameworks", icon: Building },
    { name: "BCG", description: "Hypothesis-driven and creative problem solving", icon: Target },
    { name: "Bain", description: "Results-oriented with strong client focus", icon: TrendingUp },
  ];

  const problemTypes = [
    { name: "Profitability", description: "Identify and fix profit issues", icon: DollarSign },
    { name: "Market Sizing", description: "Estimate market opportunities", icon: Users },
    { name: "Growth Strategy", description: "Expand business and markets", icon: TrendingUp },
    { name: "M&A", description: "Merger and acquisition analysis", icon: Building },
    { name: "Pricing", description: "Optimize pricing strategies", icon: DollarSign },
    { name: "Operations", description: "Improve operational efficiency", icon: Settings },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Choose Your Practice Style</h2>
        <p className="text-description-gray text-lg max-w-2xl mx-auto">
          Select either a consulting firm's approach or a specific case type to get started with your practice session.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Firm Selection */}
        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-primary">By Consulting Firm</CardTitle>
            <CardDescription className="text-description-gray">
              Practice with the methodology and style of top consulting firms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {firms.map((firm) => {
              const Icon = firm.icon;
              return (
                <Button
                  key={firm.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 border-border hover:border-accent"
                  onClick={() => onSelect('firm', firm.name)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent" />
                    <div className="text-left">
                      <div className="font-medium text-foreground">{firm.name}</div>
                      <div className="text-sm text-description-gray">{firm.description}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Problem Type Selection */}
        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-primary">By Problem Type</CardTitle>
            <CardDescription className="text-description-gray">
              Focus on specific consulting case categories and frameworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {problemTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 border-border hover:border-accent"
                  onClick={() => onSelect('type', type.name)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent" />
                    <div className="text-left">
                      <div className="font-medium text-foreground">{type.name}</div>
                      <div className="text-sm text-description-gray">{type.description}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseSelector;