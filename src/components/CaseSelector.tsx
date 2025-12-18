import { Card, CardContent } from "@/components/ui/card";
import { Building, Building2, Briefcase, LineChart, TrendingUp, Target, Globe, Sparkles, Rocket, GraduationCap } from "lucide-react";
import UserStatistics from "@/components/UserStatistics";
import { cases } from "@/data/cases";

interface CaseSelectorProps {
  onSelectFirm: (firmName: string) => void;
}

const CaseSelector = ({ onSelectFirm }: CaseSelectorProps) => {
  // Get unique case types that actually have cases
  const existingTypes = [...new Set(cases.map(c => c.type))];
  
  const problemTypeConfig: Record<string, { description: string; icon: typeof TrendingUp; color: string }> = {
    "Profitability & Cost Optimization": { description: "Profit decline, margin improvement, cost structure analysis", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
    "Market Entry": { description: "Assess entry into new markets or regions", icon: Globe, color: "from-blue-500 to-cyan-500" },
    "Growth Strategy": { description: "Expansion, scaling, new product launch", icon: LineChart, color: "from-violet-500 to-purple-500" },
    "Mergers & Acquisitions": { description: "Acquire, merge, or sell decisions", icon: Building, color: "from-orange-500 to-amber-500" },
    "Operations & Process Improvement": { description: "Efficiency, productivity, supply chain", icon: Target, color: "from-rose-500 to-pink-500" },
    "Turnaround & Transformation": { description: "Crisis management, restructuring, digital transformation", icon: Building2, color: "from-indigo-500 to-blue-500" },
    "Product Innovation & Strategy": { description: "Product launch, market fit, branding", icon: Briefcase, color: "from-fuchsia-500 to-pink-500" },
    "Pricing Strategy": { description: "Value-based, dynamic, or competitive pricing", icon: TrendingUp, color: "from-cyan-500 to-blue-500" },
  };

  // Only show problem types that have cases
  const problemTypes = existingTypes.map(type => ({
    name: type,
    description: problemTypeConfig[type]?.description || type,
    icon: problemTypeConfig[type]?.icon || Briefcase,
    color: problemTypeConfig[type]?.color || "from-gray-500 to-slate-500",
  }));

  return (
    <div className="h-full flex flex-col">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Practice</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="case-interview-gradient">Ace Your Case</span>
          <br />
          <span className="text-foreground">Interview</span>
        </h1>
        
        <p className="text-description-gray text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Practice real consulting cases with instant AI feedback.
          <br className="hidden md:block" />
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="w-5 h-5 inline" /> Built for ambitious students like you.
          </span>
        </p>
      </div>

      {/* User Statistics */}
      <div className="mb-8">
        <UserStatistics />
      </div>

      {/* Problem Types Grid */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Choose Your Challenge</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {problemTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.name}
                className="group cursor-pointer border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                onClick={() => onSelectFirm(type.name)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {type.name}
                        </h3>
                        <p className="text-sm text-description-gray mt-1 line-clamp-2">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaseSelector;