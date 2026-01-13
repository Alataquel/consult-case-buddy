import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Building2, Briefcase, LineChart, TrendingUp, Target, Globe } from "lucide-react";
import UserStatistics from "@/components/UserStatistics";
import { cases } from "@/data/cases";

interface CaseSelectorProps {
  onSelectFirm: (firmName: string) => void;
}

const CaseSelector = ({ onSelectFirm }: CaseSelectorProps) => {
  // Get unique case types that actually have cases
  const existingTypes = [...new Set(cases.map(c => c.type))];
  
  const problemTypeConfig: Record<string, { description: string; icon: typeof TrendingUp }> = {
    "Profitability & Cost Optimization": { description: "Profit decline, margin improvement, cost structure analysis", icon: TrendingUp },
    "Market Entry": { description: "Assess entry into new markets or regions", icon: Globe },
    "Growth Strategy": { description: "Expansion, scaling, new product launch", icon: LineChart },
    "Mergers & Acquisitions": { description: "Acquire, merge, or sell decisions", icon: Building },
    "Operations & Process Improvement": { description: "Efficiency, productivity, supply chain", icon: Target },
    "Turnaround & Transformation": { description: "Crisis management, restructuring, digital transformation", icon: Building2 },
    "Product Innovation & Strategy": { description: "Product launch, market fit, branding", icon: Briefcase },
    "Pricing Strategy": { description: "Value-based, dynamic, or competitive pricing", icon: TrendingUp },
  };

  // Only show problem types that have cases
  const problemTypes = existingTypes.map(type => ({
    name: type,
    description: problemTypeConfig[type]?.description || type,
    icon: problemTypeConfig[type]?.icon || Briefcase,
  }));

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Choose a Problem Type</h2>
        <p className="text-description-gray text-lg max-w-2xl mx-auto">
          Select a case type to practice and develop your consulting skills
        </p>
      </div>

      {/* User Statistics */}
      <UserStatistics />

      <div className="flex-1 w-full">
        <Card className="shadow-elegant border-0 h-full">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-primary">Case Problem Types</CardTitle>
            <CardDescription className="text-description-gray">
              Practice with real consulting case scenarios organized by problem type
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {problemTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-8 border-border hover:border-accent hover:shadow-lg transition-all duration-200"
                  onClick={() => onSelectFirm(type.name)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg text-foreground">{type.name}</div>
                      <div className="text-sm text-description-gray mt-1">{type.description}</div>
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