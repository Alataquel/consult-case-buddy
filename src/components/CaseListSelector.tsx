import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { cases } from "@/data/cases";
import { getCaseScore } from "@/utils/scoreStorage";

interface CaseListSelectorProps {
  firmName: string;
  onSelectCase: (caseId: string) => void;
  onBack: () => void;
}

const CaseListSelector = ({ firmName, onSelectCase, onBack }: CaseListSelectorProps) => {
  const firmCases = cases.filter(c => c.type === firmName);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-description-gray hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Problem Types
        </Button>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {firmName}
        </Badge>
      </div>

      <Card className="shadow-elegant border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">
            Select a Case
          </CardTitle>
          <p className="text-description-gray">
            {firmCases.length > 0 
              ? `Choose from ${firmCases.length} available case${firmCases.length !== 1 ? 's' : ''}`
              : 'No cases available yet. Check back soon!'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {firmCases.map((caseItem) => {
              const previousScore = getCaseScore(caseItem.id);
              
              return (
                <Button
                  key={caseItem.id}
                  variant="outline"
                  className="w-full justify-between h-auto py-4 px-6 hover:border-accent hover:bg-light-blue transition-all"
                  onClick={() => onSelectCase(caseItem.id)}
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="font-semibold text-foreground text-left">
                      {caseItem.title}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {caseItem.type}
                    </Badge>
                  </div>
                  {previousScore !== null && (
                    <div className="flex items-center gap-2 text-accent">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-bold">{previousScore}%</span>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseListSelector;
