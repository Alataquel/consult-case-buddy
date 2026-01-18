import { useState } from "react";
import { Brain } from "lucide-react";
import CaseListSelector from "@/components/CaseListSelector";
import CasePresentation from "@/components/CasePresentation";
import CasePractice from "@/components/CasePractice";
import CaseFeedback from "@/components/CaseFeedback";
import CaseInterview, { luxuryCarRentalCase } from "@/components/CaseInterview";
import InnovationTiresInterview, { innovationTiresCase } from "@/components/InnovationTiresInterview";
import AllPurposeTiresInterview, { allPurposeTiresCase } from "@/components/AllPurposeTiresInterview";
import DairyCowFeedInterview, { dairyCowFeedCase } from "@/components/DairyCowFeedInterview";
import CaseRatingDialog from "@/components/CaseRatingDialog";
import { cases, Case } from "@/data/cases";
import { generateFeedback, generateNextTip } from "@/utils/feedbackGenerator";
import { saveCaseScore, saveCaseRating } from "@/utils/scoreStorage";

type AppState = 'library' | 'case-presentation' | 'practice' | 'interview' | 'interview-tires' | 'interview-allpurpose' | 'interview-dairyfeed' | 'feedback';

// Special interview-mode case IDs
const INTERVIEW_MODE_CASES = {
  'car-rental-mileage-pricing': 'car-rental',
  'innovation-tires-pricing': 'innovation-tires',
  'all-purpose-tires-market-entry': 'all-purpose-tires',
  'dairy-cow-feed-india-entry': 'dairy-feed'
};

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('library');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [caseFeedback, setCaseFeedback] = useState<any>(null);
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [pendingRatingCaseId, setPendingRatingCaseId] = useState<string>('');
  const [pendingRatingCaseTitle, setPendingRatingCaseTitle] = useState<string>('');
  const [pendingRatingScore, setPendingRatingScore] = useState<number | undefined>(undefined);

  const handleSelectCase = (caseId: string) => {
    // Check if this is an interview-mode case
    if (caseId in INTERVIEW_MODE_CASES) {
      setIsInterviewMode(true);
      if (caseId === 'innovation-tires-pricing') {
        setCurrentState('interview-tires');
      } else if (caseId === 'all-purpose-tires-market-entry') {
        setCurrentState('interview-allpurpose');
      } else if (caseId === 'dairy-cow-feed-india-entry') {
        setCurrentState('interview-dairyfeed');
      } else {
        setCurrentState('interview');
      }
      return;
    }

    const selected = cases.find(c => c.id === caseId);
    if (selected) {
      setSelectedCase(selected);
      setIsInterviewMode(false);
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

  const handleInterviewComplete = (answers: Record<string, string>, time: number, score: number) => {
    // Save the interview score
    saveCaseScore('car-rental-mileage-pricing', score, 'Pricing Strategy', 'Luxury Car Rental — Mileage Pricing Strategy');
    
    // Show rating dialog
    setPendingRatingCaseId('car-rental-mileage-pricing');
    setPendingRatingCaseTitle('Luxury Car Rental — Mileage Pricing Strategy');
    setShowRatingDialog(true);
    setIsInterviewMode(false);
  };

  const handleRatingSubmit = (rating: number) => {
    saveCaseRating(pendingRatingCaseId, rating);
    setShowRatingDialog(false);
    setCurrentState('library');
    setPendingRatingCaseId('');
    setPendingRatingCaseTitle('');
    setPendingRatingScore(undefined);
  };

  const handleRatingSkip = () => {
    setShowRatingDialog(false);
    setCurrentState('library');
    setPendingRatingCaseId('');
    setPendingRatingCaseTitle('');
    setPendingRatingScore(undefined);
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
    setIsInterviewMode(false);
  };

  const handleGoHome = () => {
    setCurrentState('library');
    setSelectedCase(null);
    setUserAnswer('');
    setTimeElapsed(0);
    setCaseFeedback(null);
    setIsInterviewMode(false);
  };

  const handleRestart = () => {
    if (isInterviewMode) {
      // Reset interview mode
      setCurrentState('library');
      setIsInterviewMode(false);
    } else {
      setCurrentState('library');
    }
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
        
        {/* Rating Dialog */}
        <CaseRatingDialog
          isOpen={showRatingDialog}
          caseTitle={pendingRatingCaseTitle}
          score={pendingRatingScore}
          onSubmit={handleRatingSubmit}
          onSkip={handleRatingSkip}
        />
      </div>
    );
  }

  if (currentState === 'interview') {
    const handleInterviewRequestRating = (score: number) => {
      // Save the score first
      saveCaseScore('car-rental-mileage-pricing', score, 'Pricing Strategy', 'Luxury Car Rental — Mileage Pricing Strategy');
      
      // Show rating dialog with score
      setPendingRatingCaseId('car-rental-mileage-pricing');
      setPendingRatingCaseTitle('Luxury Car Rental — Mileage Pricing Strategy');
      setPendingRatingScore(score);
      setShowRatingDialog(true);
    };

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-6">
          <CaseInterview 
            caseData={luxuryCarRentalCase}
            onComplete={handleInterviewComplete}
            onRequestRating={handleInterviewRequestRating}
            onRestart={handleRestart}
          />
        </div>
        
        {/* Rating Dialog */}
        <CaseRatingDialog
          isOpen={showRatingDialog}
          caseTitle={pendingRatingCaseTitle}
          score={pendingRatingScore}
          onSubmit={handleRatingSubmit}
          onSkip={handleRatingSkip}
        />
      </div>
    );
  }

  if (currentState === 'interview-tires') {
    const handleTiresRequestRating = (score: number) => {
      saveCaseScore('innovation-tires-pricing', score, 'Pricing Strategy', 'Innovation Tires — Value-Based Pricing');
      setPendingRatingCaseId('innovation-tires-pricing');
      setPendingRatingCaseTitle('Innovation Tires — Value-Based Pricing');
      setPendingRatingScore(score);
      setShowRatingDialog(true);
    };

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-6">
          <InnovationTiresInterview 
            caseData={innovationTiresCase}
            onComplete={handleInterviewComplete}
            onRequestRating={handleTiresRequestRating}
            onRestart={handleRestart}
          />
        </div>
        <CaseRatingDialog
          isOpen={showRatingDialog}
          caseTitle={pendingRatingCaseTitle}
          score={pendingRatingScore}
          onSubmit={handleRatingSubmit}
          onSkip={handleRatingSkip}
        />
      </div>
    );
  }

  if (currentState === 'interview-allpurpose') {
    const handleAllPurposeRequestRating = (score: number) => {
      saveCaseScore('all-purpose-tires-market-entry', score, 'Market Entry', 'All-Purpose Tires — Market Entry Break-Even');
      setPendingRatingCaseId('all-purpose-tires-market-entry');
      setPendingRatingCaseTitle('All-Purpose Tires — Market Entry Break-Even');
      setPendingRatingScore(score);
      setShowRatingDialog(true);
    };

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-6">
          <AllPurposeTiresInterview 
            caseData={allPurposeTiresCase}
            onComplete={handleInterviewComplete}
            onRequestRating={handleAllPurposeRequestRating}
            onRestart={handleRestart}
          />
        </div>
        <CaseRatingDialog
          isOpen={showRatingDialog}
          caseTitle={pendingRatingCaseTitle}
          score={pendingRatingScore}
          onSubmit={handleRatingSubmit}
          onSkip={handleRatingSkip}
        />
      </div>
    );
  }

  if (currentState === 'interview-dairyfeed') {
    const handleDairyFeedRequestRating = (score: number) => {
      saveCaseScore('dairy-cow-feed-india-entry', score, 'Market Entry', 'Dairy Cow Feed — Indian Market Entry');
      setPendingRatingCaseId('dairy-cow-feed-india-entry');
      setPendingRatingCaseTitle('Dairy Cow Feed — Indian Market Entry');
      setPendingRatingScore(score);
      setShowRatingDialog(true);
    };

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-6">
          <DairyCowFeedInterview 
            caseData={dairyCowFeedCase}
            onComplete={handleInterviewComplete}
            onRequestRating={handleDairyFeedRequestRating}
            onRestart={handleRestart}
          />
        </div>
        <CaseRatingDialog
          isOpen={showRatingDialog}
          caseTitle={pendingRatingCaseTitle}
          score={pendingRatingScore}
          onSubmit={handleRatingSubmit}
          onSkip={handleRatingSkip}
        />
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
