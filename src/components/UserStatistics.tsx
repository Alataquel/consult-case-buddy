import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Award, Flame } from "lucide-react";
import { getUserStats } from "@/utils/scoreStorage";

const UserStatistics = () => {
  const stats = getUserStats();

  if (stats.totalCasesAttempted === 0) {
    return null;
  }

  return (
    <Card className="shadow-elegant border-0 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <Award className="w-8 h-8 text-accent mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.overallGrade}</div>
            <div className="text-sm text-description-gray">Overall Grade</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.averageScore}% avg</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <Target className="w-8 h-8 text-primary mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.totalAttempts}</div>
            <div className="text-sm text-description-gray">Total Attempts</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.totalCasesAttempted} unique cases</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <Trophy className="w-8 h-8 text-amber-500 mb-2" />
            <div className="text-lg font-bold text-foreground text-center line-clamp-1">
              {stats.bestCase ? stats.bestCase.title.split(' ')[0] : 'N/A'}
            </div>
            <div className="text-sm text-description-gray">Best Case</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.bestCase ? `${stats.bestCase.score}%` : '-'}
            </div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <Flame className="w-8 h-8 text-orange-500 mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.currentStreak}</div>
            <div className="text-sm text-description-gray">Day Streak</div>
            <div className="text-xs text-muted-foreground mt-1">Keep it up!</div>
          </div>
        </div>

        {Object.keys(stats.scoresByFirm).length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Performance by Firm</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.scoresByFirm).map(([firm, data]) => (
                <Badge key={firm} variant="secondary" className="px-3 py-1">
                  {firm}: {data.averageScore}% ({data.attempted} {data.attempted === 1 ? 'attempt' : 'attempts'})
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
