import { useState } from "react";
import { Brain } from "lucide-react";
import CaseListSelector from "@/components/CaseListSelector";
import CasePresentation from "@/components/CasePresentation";
import CasePractice from "@/components/CasePractice";
import CaseFeedback from "@/components/CaseFeedback";
import { cases, Case } from "@/data/cases";
import { generateFeedback, generateNextTip } from "@/utils/feedbackGenerator";
import { saveCaseScore } from "@/utils/scoreStorage";

type AppState = 'library' | 'case-presentation' | 'practice' | 'feedback';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('library');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [caseFeedback, setCaseFeedback] = useState<any>(null);

  const handleSelectCase = (caseId: string) => {
    const selected = cases.find(c => c.id === caseId);
    if (selected) {
      setSelectedCase(selected);
      setCurrentState('case-presentation');
    }
  };

  const handleStartCase = () => {
    setCurrentState('practice');
  };

  const handleSubmitAnswer = (answer: string, time: number) => {
    setUserAnswer(answer);
    setTimeElapsed(time);
    
    if (selectedCase) {
      const feedback = generateFeedback(answer, selectedCase.type);
      const nextTip = generateNextTip(feedback, selectedCase.type);
      
      setCaseFeedback({
        feedback,
        nextTip,
        modelSolution: selectedCase.modelSolution,
        correctAnswers: selectedCase.questions
      });
      
      setCurrentState('feedback');
    }
  };

  const handleSubmitScore = (score: number) => {
    if (selectedCase) {
      saveCaseScore(selectedCase.id, score, selectedCase.type, selectedCase.title);
    }
  };

  const handleTryAnother = () => {
    setCurrentState('library');
    setSelectedCase(null);
    setUserAnswer('');
    setTimeElapsed(0);
    setCaseFeedback(null);
  };

  const handleGoHome = () => {
    setCurrentState('library');
    setSelectedCase(null);
    setUserAnswer('');
    setTimeElapsed(0);
    setCaseFeedback(null);
  };

  const handleRestart = () => {
    setCurrentState('library');
  };

  // Header Component
  const Header = () => (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleGoHome}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-foreground">Case Study Buddy</h1>
              <p className="text-sm text-description-gray">AI-powered case interview practice</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );

  if (currentState === 'library') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-6 py-8">
          <CaseListSelector onSelectCase={handleSelectCase} />
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
            onGoBack={() => setCurrentState('library')}
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
            correctAnswers={caseFeedback.correctAnswers}
            nextTip={caseFeedback.nextTip}
            timeElapsed={timeElapsed}
            caseId={selectedCase.id}
            caseTitle={selectedCase.title}
            caseType={selectedCase.type}
            onSubmitScore={handleSubmitScore}
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