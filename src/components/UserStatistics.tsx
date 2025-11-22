import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Award } from "lucide-react";
import { getUserStats } from "@/utils/scoreStorage";

const UserStatistics = () => {
  const stats = getUserStats();

  if (stats.totalCasesAttempted === 0) {
    return null;
  }

  return (
    <Card className="shadow-elegant border-0 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <Target className="w-8 h-8 text-primary mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.totalCasesAttempted}</div>
            <div className="text-sm text-description-gray">Cases Attempted</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <TrendingUp className="w-8 h-8 text-accent mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.averageScore}%</div>
            <div className="text-sm text-description-gray">Average Score</div>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-background rounded-lg">
            <Award className="w-8 h-8 text-accent mb-2" />
            <div className="text-3xl font-bold text-foreground">
              {Object.keys(stats.scoresByFirm).length}
            </div>
            <div className="text-sm text-description-gray">Firms Practiced</div>
          </div>
        </div>

        {Object.keys(stats.scoresByFirm).length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Performance by Firm</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.scoresByFirm).map(([firm, data]) => (
                <Badge key={firm} variant="secondary" className="px-3 py-1">
                  {firm}: {data.averageScore}% ({data.attempted} attempts)
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
