import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Award, Flame, Sparkles } from "lucide-react";
import { getUserStats } from "@/utils/scoreStorage";

const UserStatistics = () => {
  const stats = getUserStats();

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

        {Object.keys(stats.scoresByFirm).length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <h4 className="text-sm font-semibold text-foreground mb-3">Performance by Problem Type</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.scoresByFirm).map(([type, data]) => (
                <Badge 
                  key={type} 
                  variant="secondary" 
                  className="px-3 py-1.5 bg-background/80 hover:bg-background transition-colors"
                >
                  {type}: <span className="font-bold ml-1">{data.averageScore}%</span>
                  <span className="text-muted-foreground ml-1">({data.attempted})</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserStatistics;
