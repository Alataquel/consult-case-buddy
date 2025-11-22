import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Building2, Briefcase, LineChart, TrendingUp, Target, Award, Globe, Users } from "lucide-react";

interface CaseSelectorProps {
  onSelectFirm: (firmName: string) => void;
}

const CaseSelector = ({ onSelectFirm }: CaseSelectorProps) => {
  const firms = [
    { name: "McKinsey", description: "Strategy-focused cases with structured frameworks", icon: Building },
    { name: "BCG", description: "Hypothesis-driven and creative problem solving", icon: Target },
    { name: "Bain", description: "Results-oriented with strong client focus", icon: TrendingUp },
    { name: "Deloitte", description: "Digital transformation and technology-driven solutions", icon: Globe },
    { name: "Accenture", description: "Technology and operations-focused consulting", icon: Briefcase },
    { name: "OC&C", description: "Retail and consumer-focused strategy", icon: Users },
    { name: "Oliver Wyman", description: "Deep industry expertise and analytics", icon: LineChart },
    { name: "A.T. Kearney", description: "Operations and strategic advisory", icon: Building2 },
    { name: "Strategy& / PWC", description: "Strategy within Big Four network", icon: Award },
    { name: "L.E.K. Consulting", description: "Corporate strategy and shareholder value", icon: TrendingUp },
    { name: "Roland Berger", description: "European strategy consultancy", icon: Globe },
    { name: "EY Parthenon", description: "Corporate finance and strategy", icon: Briefcase },
    { name: "Consulting Clubs", description: "University case competition practice", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Choose a Consulting Firm</h2>
        <p className="text-description-gray text-lg max-w-2xl mx-auto">
          Select a consulting firm to practice with their methodology and case style
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-elegant border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-primary">Top Consulting Firms</CardTitle>
            <CardDescription className="text-description-gray">
              Practice with cases from leading strategy consulting firms worldwide
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-3">
            {firms.map((firm) => {
              const Icon = firm.icon;
              return (
                <Button
                  key={firm.name}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 border-border hover:border-accent"
                  onClick={() => onSelectFirm(firm.name)}
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
      </div>
    </div>
  );
};

export default CaseSelector;