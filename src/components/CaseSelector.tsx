import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Building2, Briefcase, LineChart, TrendingUp, Target, Award, Globe, Users } from "lucide-react";
import UserStatistics from "@/components/UserStatistics";

interface CaseSelectorProps {
  onSelectFirm: (firmName: string) => void;
}

const CaseSelector = ({ onSelectFirm }: CaseSelectorProps) => {
  const problemTypes = [
    { name: "Profitability & Cost Optimization", description: "Profit decline, margin improvement, cost structure analysis", icon: TrendingUp },
    { name: "Market Entry", description: "Assess entry into new markets or regions", icon: Globe },
    { name: "Growth Strategy", description: "Expansion, scaling, new product launch", icon: LineChart },
    { name: "Mergers & Acquisitions (M&A)", description: "Acquire, merge, or sell decisions", icon: Building },
    { name: "Operations & Process Improvement", description: "Efficiency, productivity, supply chain", icon: Target },
    { name: "Pricing Strategy", description: "Value-based, dynamic, or competitive pricing", icon: Award },
    { name: "Product & Innovation Strategy", description: "Product launch, market fit, branding", icon: Briefcase },
    { name: "Public Sector / Policy Cases", description: "Government, nonprofit, social impact", icon: Users },
    { name: "Turnaround & Transformation", description: "Crisis management, restructuring, digital transformation", icon: Building2 },
    { name: "Sustainability & ESG", description: "Carbon reduction, circular economy, social inclusion", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Choose a Problem Type</h2>
        <p className="text-description-gray text-lg max-w-2xl mx-auto">
          Select a case type to practice and develop your consulting skills
        </p>
      </div>

      {/* User Statistics */}
      <UserStatistics />

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-primary">Case Problem Types</CardTitle>
            <CardDescription className="text-description-gray">
              Practice with real consulting case scenarios organized by problem type
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3">
            {problemTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 border-border hover:border-accent"
                  onClick={() => onSelectFirm(type.name)}
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