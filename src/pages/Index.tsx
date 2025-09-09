import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Clock, Award, Users, Zap } from "lucide-react";
import CaseSelector from "@/components/CaseSelector";
import CasePresentation from "@/components/CasePresentation";
import CasePractice from "@/components/CasePractice";
import CaseFeedback from "@/components/CaseFeedback";
import { cases, getCasesBySelection, getRandomCase, Case } from "@/data/cases";
import { generateFeedback, generateNextTip } from "@/utils/feedbackGenerator";

type AppState = 'home' | 'selection' | 'case-presentation' | 'practice' | 'feedback';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [caseFeedback, setCaseFeedback] = useState<any>(null);

  const features = [
    {
      icon: Brain,
      title: "Real Case Studies",
      description: "Practice with actual McKinsey, BCG, and Bain case studies"
    },
    {
      icon: Target,
      title: "Expert Feedback",
      description: "Get detailed feedback on structure, logic, and synthesis"
    },
    {
      icon: Clock,
      title: "Timed Practice",
      description: "Build your skills under realistic interview conditions"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor your improvement across different case types"
    }
  ];

  const handleSelection = (type: string, value: string) => {
    const filteredCases = getCasesBySelection(type, value);
    const randomCase = getRandomCase(filteredCases);
    setSelectedCase(randomCase);
    setCurrentState('case-presentation');
  };

  const handleStartCase = () => {
    setCurrentState('practice');
  };

  const handleSubmitAnswer = (answer: string) => {
    setUserAnswer(answer);
    
    if (selectedCase) {
      const feedback = generateFeedback(answer, selectedCase.type);
      const nextTip = generateNextTip(feedback, selectedCase.type);
      
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
    setSelectedCase(null);
    setUserAnswer('');
    setCaseFeedback(null);
  };

  const handleGoHome = () => {
    setCurrentState('home');
    setSelectedCase(null);
    setUserAnswer('');
    setCaseFeedback(null);
  };

  const handleRestart = () => {
    setCurrentState('selection');
  };

  if (currentState === 'selection') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <CaseSelector onSelect={handleSelection} />
        </div>
      </div>
    );
  }

  if (currentState === 'case-presentation' && selectedCase) {
    return (
      <div className="min-h-screen bg-background">
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

  // Home Page
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 font-medium px-4 py-2">
              ✨ AI-Powered Consulting Practice
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Master Your Next <span className="case-interview-gradient">Case Interview</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Practice real McKinsey, BCG, and Bain case studies with expert AI coaching. 
              Get personalized feedback and improve your consulting interview skills.
            </p>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                variant="accent"
                onClick={() => setCurrentState('selection')}
                className="px-8 py-3 text-lg font-semibold"
              >
                Start Practice Session
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-3 text-lg border-white/30 text-white hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-foreground">Why Case Study Buddy?</h2>
            <p className="text-description-gray text-lg max-w-2xl mx-auto">
              Get the competitive edge you need with our AI-powered coaching platform designed by former consultants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-elegant border-0 hover:shadow-glow transition-smooth">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-description-gray">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="subtle-gradient py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">{cases.length}+</div>
              <div className="text-description-gray">Real Case Studies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">3</div>
              <div className="text-description-gray">Top Consulting Firms</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-description-gray">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-description-gray text-lg">
              Simple steps to case interview mastery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Choose Your Focus</h3>
              <p className="text-description-gray">
                Select a consulting firm style or specific case type to practice with
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Practice & Solve</h3>
              <p className="text-description-gray">
                Work through real case studies at your own pace with guided prompts
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Expert Feedback</h3>
              <p className="text-description-gray">
                Receive detailed feedback on structure, logic, and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to Ace Your Case Interview?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of successful candidates who practiced with Case Study Buddy
            </p>
            <Button 
              size="lg" 
              variant="accent"
              onClick={() => setCurrentState('selection')}
              className="px-8 py-3 text-lg font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Your First Case
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;