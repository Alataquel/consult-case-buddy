import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Award, Flame, Sparkles, TrendingUp, BarChart3, Briefcase, DollarSign, Rocket, Settings, Package, Building, RefreshCw, Leaf } from "lucide-react";
import { getUserStats } from "@/utils/scoreStorage";

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

// Filter out old firm names that are no longer valid problem types
const validProblemTypes = Object.keys(problemTypeIcons);

const UserStatistics = () => {
  const stats = getUserStats();
  
  // Filter scoresByFirm to only include valid problem types (excluding old McKinsey/Bain data)
  const filteredScores = Object.entries(stats.scoresByFirm).filter(
    ([type]) => validProblemTypes.includes(type)
  );

  return (
    <Card className="shadow-elegant border-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
      
      <CardContent className="pt-6 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Your Progress</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group flex flex-col items-center p-5 bg-background/80 backdrop-blur rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-accent/20">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground">
              {stats.totalCasesAttempted === 0 ? "-" : stats.overallGrade}
            </div>
            <div className="text-sm text-description-gray font-medium">Overall Grade</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.totalCasesAttempted === 0 ? "Start practicing!" : `${stats.averageScore}% avg`}
            </div>
          </div>
          
          <div className="group flex flex-col items-center p-5 bg-background/80 backdrop-blur rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.totalAttempts}</div>
            <div className="text-sm text-description-gray font-medium">Total Attempts</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.totalCasesAttempted === 0 ? "Complete your first case" : `${stats.totalCasesAttempted} unique cases`}
            </div>
          </div>
          
          <div className="group flex flex-col items-center p-5 bg-background/80 backdrop-blur rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-amber-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-lg font-bold text-foreground text-center line-clamp-1">
              {stats.bestCase ? stats.bestCase.title.split(' ')[0] : '-'}
            </div>
            <div className="text-sm text-description-gray font-medium">Best Case</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.bestCase ? `${stats.bestCase.score}%` : 'No cases yet'}
            </div>
          </div>
          
          <div className="group flex flex-col items-center p-5 bg-background/80 backdrop-blur rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 border border-transparent hover:border-orange-200">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.currentStreak}</div>
            <div className="text-sm text-description-gray font-medium">Day Streak</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.currentStreak === 0 ? "Start today!" : "Keep it up!"}
            </div>
          </div>
        </div>

        {filteredScores.length > 0 && (
          <div className="mt-6 pt-5 border-t border-border/50">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" />
              Performance by Problem Type
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredScores.map(([type, data], index) => {
                const colors = problemTypeColors[type] || { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-600" };
                const icon = problemTypeIcons[type] || <Briefcase className="w-4 h-4" />;
                
                return (
                  <div 
                    key={type}
                    className={`group relative overflow-hidden rounded-xl ${colors.bg} border ${colors.border} p-4 hover:shadow-md transition-all duration-300 animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.text.replace('text-', 'bg-')} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text}`}>
                          {icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground line-clamp-1">
                            {type.length > 20 ? type.split(' ').slice(0, 2).join(' ') : type}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {data.attempted} {data.attempted === 1 ? 'attempt' : 'attempts'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${colors.text}`}>
                          {data.averageScore}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 bg-background/50 rounded-full overflow-hidden">
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
