import { useState } from "react";
import { Brain } from "lucide-react";
import CaseSelector from "@/components/CaseSelector";
import CaseListSelector from "@/components/CaseListSelector";
import CasePresentation from "@/components/CasePresentation";
import CasePractice from "@/components/CasePractice";
import CaseFeedback from "@/components/CaseFeedback";
import UserStatistics from "@/components/UserStatistics";
import { cases, Case } from "@/data/cases";
import { generateFeedback, generateNextTip } from "@/utils/feedbackGenerator";
import { saveCaseScore } from "@/utils/scoreStorage";

type AppState = 'selection' | 'case-list' | 'case-presentation' | 'practice' | 'feedback';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('selection');
  const [selectedFirm, setSelectedFirm] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [caseFeedback, setCaseFeedback] = useState<any>(null);

  const handleSelectFirm = (firmName: string) => {
    setSelectedFirm(firmName);
    setCurrentState('case-list');
  };

  const handleSelectCase = (caseId: string) => {
    const selectedCase = cases.find(c => c.id === caseId);
    if (selectedCase) {
      setSelectedCase(selectedCase);
      setCurrentState('case-presentation');
    }
  };

  const handleStartCase = () => {
    setCurrentState('practice');
  };

  const handleSubmitAnswer = (answer: string) => {
    setUserAnswer(answer);
    
    if (selectedCase) {
      const feedback = generateFeedback(answer, selectedCase.type);
      const nextTip = generateNextTip(feedback, selectedCase.type);
      
      // Save the score
      saveCaseScore(selectedCase.id, feedback.overallScore, selectedCase.firm, selectedCase.title);
      
      setCaseFeedback({
        feedback,
        nextTip,
        modelSolution: selectedCase.modelSolution
      });
      
      setCurrentState('feedback');
    }
  };

  const handleTryAnother = () => {
    setCurrentState('selection');
    setSelectedFirm('');
    setSelectedCase(null);
    setUserAnswer('');
    setCaseFeedback(null);
  };

  const handleGoHome = () => {
    setCurrentState('selection');
    setSelectedFirm('');
    setSelectedCase(null);
    setUserAnswer('');
    setCaseFeedback(null);
  };

  const handleRestart = () => {
    setCurrentState('selection');
    setSelectedFirm('');
  };

  const handleBackToFirms = () => {
    setCurrentState('selection');
    setSelectedFirm('');
  };

  // Header Component
  const Header = () => (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Case Study Buddy</h1>
              <p className="text-sm text-description-gray">AI-powered case interview practice</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  if (currentState === 'selection') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 space-y-6">
          <UserStatistics />
          <CaseSelector onSelectFirm={handleSelectFirm} />
        </div>
      </div>
    );
  }

  if (currentState === 'case-list') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <CaseListSelector 
            firmName={selectedFirm}
            onSelectCase={handleSelectCase}
            onBack={handleBackToFirms}
          />
        </div>
      </div>
    );
  }

  if (currentState === 'case-presentation' && selectedCase) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <CasePresentation 
            caseData={selectedCase}
            onStartCase={handleStartCase}
            onGoBack={() => setCurrentState('selection')}
          />
        </div>
      </div>
    );
  }

  if (currentState === 'practice' && selectedCase) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <CasePractice 
            caseData={selectedCase}
            onSubmitAnswer={handleSubmitAnswer}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  if (currentState === 'feedback' && caseFeedback && selectedCase) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <CaseFeedback 
            userAnswer={userAnswer}
            feedback={caseFeedback.feedback}
            modelSolution={caseFeedback.modelSolution}
            nextTip={caseFeedback.nextTip}
            onTryAnother={handleTryAnother}
            onGoHome={handleGoHome}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Index;