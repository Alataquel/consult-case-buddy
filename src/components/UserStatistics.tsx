import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Award, Sparkles, TrendingUp, BarChart3, Briefcase, DollarSign, Rocket, Settings, Package, Building, RefreshCw, Leaf, Filter, ChevronDown } from "lucide-react";
import { getUserStats } from "@/utils/scoreStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const problemTypeIcons: Record<string, React.ReactNode> = {
  "Profitability & Cost Optimization": <BarChart3 className="w-4 h-4" />,
  "Market Entry": <Rocket className="w-4 h-4" />,
  "Growth Strategy": <TrendingUp className="w-4 h-4" />,
  "Mergers & Acquisitions": <Building className="w-4 h-4" />,
  "Operations & Process Improvement": <Settings className="w-4 h-4" />,
  "Pricing Strategy": <DollarSign className="w-4 h-4" />,
  "Product & Innovation Strategy": <Package className="w-4 h-4" />,
  "Public Sector / Policy Cases": <Briefcase className="w-4 h-4" />,
  "Turnaround & Transformation": <RefreshCw className="w-4 h-4" />,
  "Sustainability & ESG": <Leaf className="w-4 h-4" />,
};

const problemTypeColors: Record<string, { bg: string; border: string; text: string }> = {
  "Profitability & Cost Optimization": { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600" },
  "Market Entry": { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600" },
  "Growth Strategy": { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600" },
  "Mergers & Acquisitions": { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-600" },
  "Operations & Process Improvement": { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-600" },
  "Pricing Strategy": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-600" },
  "Product & Innovation Strategy": { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-600" },
  "Public Sector / Policy Cases": { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-600" },
  "Turnaround & Transformation": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600" },
  "Sustainability & ESG": { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-600" },
};

const difficultyColors: Record<string, { bg: string; border: string; text: string }> = {
  "Beginner": { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600" },
  "Intermediate": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600" },
  "Advanced": { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-600" },
};

const validProblemTypes = Object.keys(problemTypeIcons);

const UserStatistics = () => {
  const stats = getUserStats();
  const [filterDifficulty, setFilterDifficulty] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  
  // Filter scoresByFirm to only include valid problem types
  let filteredScores = Object.entries(stats.scoresByFirm).filter(
    ([type]) => validProblemTypes.includes(type)
  );
  
  // Apply type filter
  if (filterType.length > 0) {
    filteredScores = filteredScores.filter(([type]) => filterType.includes(type));
  }
  
  // Get available types for filter
  const availableTypes = Object.entries(stats.scoresByFirm)
    .filter(([type]) => validProblemTypes.includes(type))
    .map(([type]) => type);

  const toggleDifficultyFilter = (difficulty: string) => {
    setFilterDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleTypeFilter = (type: string) => {
    setFilterType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Card className="shadow-elegant border-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      
      <CardContent className="pt-4 pb-4 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="font-semibold text-foreground text-sm">Your Progress</h3>
        </div>
        
        {/* Compact Stats Grid */}
        <div className="grid grid-cols-5 gap-3">
          {/* Overall Grade */}
          <div className="group flex flex-col items-center p-4 bg-background/80 backdrop-blur rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-accent/20">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2 group-hover:bg-accent/20 transition-colors">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalCasesAttempted === 0 ? "-" : stats.overallGrade}
            </div>
            <div className="text-xs text-muted-foreground font-medium text-center">Overall</div>
          </div>
          
          {/* Beginner Grade */}
          <div className="group flex flex-col items-center p-4 bg-background/80 backdrop-blur rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-green-200">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
              <span className="text-sm font-bold text-green-600">🟢</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.beginnerGrade === "N/A" ? "-" : stats.beginnerGrade}
            </div>
            <div className="text-xs text-muted-foreground font-medium text-center">Beginner</div>
          </div>
          
          {/* Intermediate Grade */}
          <div className="group flex flex-col items-center p-4 bg-background/80 backdrop-blur rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-amber-200">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2 group-hover:bg-amber-200 transition-colors">
              <span className="text-sm font-bold text-amber-600">🟡</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.intermediateGrade === "N/A" ? "-" : stats.intermediateGrade}
            </div>
            <div className="text-xs text-muted-foreground font-medium text-center">Intermediate</div>
          </div>
          
          {/* Advanced Grade */}
          <div className="group flex flex-col items-center p-4 bg-background/80 backdrop-blur rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-red-200">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2 group-hover:bg-red-200 transition-colors">
              <span className="text-sm font-bold text-red-600">🔴</span>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.advancedGrade === "N/A" ? "-" : stats.advancedGrade}
            </div>
            <div className="text-xs text-muted-foreground font-medium text-center">Advanced</div>
          </div>
          
          {/* Total Attempts */}
          <div className="group flex flex-col items-center p-4 bg-background/80 backdrop-blur rounded-lg hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stats.totalAttempts}</div>
            <div className="text-xs text-muted-foreground font-medium text-center">Attempts</div>
          </div>
        </div>

        {/* Performance by Problem Type */}
        {filteredScores.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-accent" />
                Performance by Problem Type
              </h4>
              
              {/* Filters */}
              <div className="flex items-center gap-2">
                {/* Difficulty Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Filter className="w-3 h-3" />
                      Difficulty
                      {filterDifficulty.length > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">
                          {filterDifficulty.length}
                        </span>
                      )}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuLabel className="text-xs">Filter by Difficulty</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["Beginner", "Intermediate", "Advanced"].map(diff => (
                      <DropdownMenuCheckboxItem
                        key={diff}
                        checked={filterDifficulty.includes(diff)}
                        onCheckedChange={() => toggleDifficultyFilter(diff)}
                        className="text-xs"
                      >
                        {diff}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Type Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Filter className="w-3 h-3" />
                      Type
                      {filterType.length > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">
                          {filterType.length}
                        </span>
                      )}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-xs">Filter by Problem Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {availableTypes.map(type => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={filterType.includes(type)}
                        onCheckedChange={() => toggleTypeFilter(type)}
                        className="text-xs"
                      >
                        {type.length > 25 ? type.split(' ').slice(0, 2).join(' ') + '...' : type}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredScores.map(([type, data], index) => {
                const colors = problemTypeColors[type] || { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-600" };
                const icon = problemTypeIcons[type] || <Briefcase className="w-4 h-4" />;
                
                return (
                  <div 
                    key={type}
                    className={`group relative overflow-hidden rounded-lg ${colors.bg} border ${colors.border} p-3 hover:shadow-md transition-all duration-300 animate-fade-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${colors.text.replace('text-', 'bg-')} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md ${colors.bg} flex items-center justify-center ${colors.text}`}>
                          {icon}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-foreground line-clamp-1">
                            {type.length > 18 ? type.split(' ').slice(0, 2).join(' ') : type}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {data.attempted} {data.attempted === 1 ? 'attempt' : 'attempts'}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${colors.text}`}>
                        {data.averageScore}%
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-2 h-1 bg-background/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors.text.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
                        style={{ width: `${data.averageScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserStatistics;