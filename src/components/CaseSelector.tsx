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
  
  const problemTypeConfig: Record<string, { description: string; icon: typeof TrendingUp; roles: string[] }> = {
    "Profitability & Cost Optimization": { 
      description: "Profit decline, margin improvement, cost structure analysis", 
      icon: TrendingUp,
      roles: ["Strategy Consultant", "Financial Analyst", "Operations Manager"]
    },
    "Market Entry": { 
      description: "Assess entry into new markets or regions", 
      icon: Globe,
      roles: ["Market Analyst", "Business Development", "Strategy Consultant"]
    },
    "Growth Strategy": { 
      description: "Expansion, scaling, new product launch", 
      icon: LineChart,
      roles: ["Growth Manager", "Strategy Consultant", "Product Manager"]
    },
    "Mergers & Acquisitions": { 
      description: "Acquire, merge, or sell decisions", 
      icon: Building,
      roles: ["M&A Analyst", "Investment Banking", "Corporate Development"]
    },
    "Operations & Process Improvement": { 
      description: "Efficiency, productivity, supply chain", 
      icon: Target,
      roles: ["Operations Consultant", "Process Engineer", "Supply Chain Manager"]
    },
    "Turnaround & Transformation": { 
      description: "Crisis management, restructuring, digital transformation", 
      icon: Building2,
      roles: ["Turnaround Specialist", "Change Manager", "Transformation Lead"]
    },
    "Product Innovation & Strategy": { 
      description: "Product launch, market fit, branding", 
      icon: Briefcase,
      roles: ["Product Manager", "Innovation Lead", "Brand Strategist"]
    },
    "Pricing Strategy": { 
      description: "Value-based, dynamic, or competitive pricing", 
      icon: TrendingUp,
      roles: ["Pricing Analyst", "Revenue Manager", "Commercial Strategy"]
    },
  };

  // Only show problem types that have cases
  const problemTypes = existingTypes.map(type => ({
    name: type,
    description: problemTypeConfig[type]?.description || type,
    icon: problemTypeConfig[type]?.icon || Briefcase,
    roles: problemTypeConfig[type]?.roles || ["Consultant"],
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
          <CardContent className="flex flex-col gap-4 p-6">
            {problemTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-6 border-border hover:border-accent hover:shadow-xl hover:scale-[1.02] hover:bg-accent/5 transition-all duration-300 group"
                  onClick={() => onSelectFirm(type.name)}
                >
                  <div className="flex items-center gap-6 w-full">
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-xl text-foreground group-hover:text-accent transition-colors duration-300">{type.name}</div>
                      <div className="text-sm text-description-gray mt-1">{type.description}</div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {type.roles.map((role) => (
                          <span 
                            key={role} 
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-description-gray group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                      →
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