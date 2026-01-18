import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Send, RotateCcw, FileText, Building, ArrowRight, User, MessageSquare, Lightbulb, CheckCircle, AlertCircle, FileSpreadsheet } from "lucide-react";
import ExhibitTable, { hasExhibitTableData } from "@/components/ExhibitTable";

interface InterviewPhase {
  id: string;
  type: "briefing" | "inquiry" | "structure" | "quantitative" | "conclusion";
  title: string;
  interviewerMessage: string;
  requiredKeywords?: string[]; // Keywords student should mention to progress
  revealOnKeywords?: string[]; // Keywords that trigger additional info reveal
  revealedInfo?: string; // Info revealed when keywords are mentioned
  exhibitKey?: string; // Exhibit to show in this phase
  expectedPoints?: string[]; // Points student should cover
  feedback?: {
    success: string;
    partial: string;
    needsWork: string;
  };
}

interface InterviewCase {
  id: string;
  title: string;
  firm: string;
  type: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  phases: InterviewPhase[];
  finalAnswer: string;
  evaluationCriteria: string[];
}

interface Message {
  id: string;
  role: "interviewer" | "student";
  content: string;
  timestamp: number;
  phaseId?: string;
  isReveal?: boolean;
}

interface CaseInterviewProps {
  caseData: InterviewCase;
  onComplete: (answers: Record<string, string>, timeElapsed: number, score: number) => void;
  onRestart: () => void;
}

// Luxury Car Rental case with phased structure
export const luxuryCarRentalCase: InterviewCase = {
  id: "car-rental-mileage-pricing",
  title: "Luxury Car Rental — Mileage Pricing Strategy",
  firm: "Pricing Strategy",
  type: "Pricing Strategy",
  difficulty: "Intermediate",
  phases: [
    {
      id: "briefing",
      type: "briefing",
      title: "Case Opening",
      interviewerMessage: `Welcome to this pricing case. Let me give you the situation.

Your client is an **international luxury car rental company**. They charge **€220 per day** with advertised "unlimited" mileage.

However, here's the issue: **internally**, all costs are calculated based on the assumption that customers drive no more than **300 km per day**. 

Recently, customers have been exceeding this limit more frequently, which is eroding margins.

**Your task:** Determine the price that should be charged for every additional kilometer driven above the 300 km limit.

Before we dive into calculations, what questions would you like to ask me to clarify the objectives and constraints?`,
    },
    {
      id: "inquiry",
      type: "inquiry", 
      title: "Clarifying Questions",
      interviewerMessage: `Good questions. Let me provide some key information:

• **Profitability Target:** The company expects a **9% profit margin** and wants to maintain this level.
• **Current Performance:** The existing 300 km pricing achieves this 9% margin.
• **Scope:** Focus strictly on **pricing** — you can ignore marketing, operations, and competitive factors for this analysis.

Now, how would you structure your approach to find this price? What types of costs should we consider?`,
      requiredKeywords: ["margin", "profit", "goal", "target", "expectation", "profitability"],
      revealOnKeywords: ["margin", "profit", "goal", "target", "9%"],
      revealedInfo: "The target margin is 9% and must be maintained for additional kilometers.",
    },
    {
      id: "structure",
      type: "structure",
      title: "Cost Structure",
      interviewerMessage: `Good thinking on the cost categories. You correctly identified that we need to separate:

**Fixed Costs** (per rental): Personnel, rent, insurance, marketing — these don't change with kilometers driven.

**Variable Costs** (per km): Maintenance, repairs, depreciation/wear and tear — these scale with usage.

Now let me give you the quantitative data:

• **Fixed Costs:** €50 per rental/vehicle
• **Vehicle Purchase Price:** €100,000
• **Vehicle Resale Value:** €90,000 (after 20,000 km of total usage)

Using this data, calculate:
1. The variable cost per kilometer
2. Verify the current profitability at 300 km
3. The price per additional kilometer that maintains 9% margin

Show me your calculations.`,
      requiredKeywords: ["fixed", "variable", "depreciation", "maintenance", "cost"],
      expectedPoints: ["Fixed vs variable cost distinction", "Depreciation as key variable cost", "Only variable costs apply beyond 300km"],
    },
    {
      id: "quantitative",
      type: "quantitative",
      title: "Calculation Phase",
      interviewerMessage: `Let me check your math...`,
      exhibitKey: undefined, // No exhibit needed for this phase
      feedback: {
        success: `✓ Excellent work! Your calculation is correct.

**Variable Cost:** (€100,000 - €90,000) ÷ 20,000 km = **€0.50/km**

**Current Profit Check:**
• Revenue: €220
• Variable costs: €0.50 × 300 = €150
• Fixed costs: €50
• Profit: €220 - €200 = €20 → **9.09% margin** ✓

**Additional KM Price:**
Using Price = Cost ÷ (1 - Margin):
€0.50 ÷ 0.91 = **€0.5495 per km**

→ **Final Answer: 54.95 cents per additional kilometer**`,
        partial: `You're on the right track, but let me help you with one detail...

⚠️ **Common Mistake:** If you calculated €0.50 × 1.09 = €0.545, that gives you a 9% *markup on cost*, not a 9% *margin on price*.

**The Correct Method:**
For margin on selling price, use: **Price = Cost ÷ (1 - Margin)**

Calculation: €0.50 ÷ 0.91 = **€0.5495**

This ensures the 9% is calculated on the final price, not the cost.`,
        needsWork: `Let me walk you through the correct approach:

**Step 1: Variable Cost per km**
Depreciation = €100,000 - €90,000 = €10,000
Variable cost = €10,000 ÷ 20,000 km = **€0.50/km**

**Step 2: Verify Current Margin**
Revenue: €220
Costs: (€0.50 × 300) + €50 = €200
Profit: €20 → Margin: 9% ✓

**Step 3: Price Additional KM**
Price = €0.50 ÷ (1 - 0.09) = €0.50 ÷ 0.91 = **€0.5495**

**Answer: 54.95 cents per km**`
      }
    },
    {
      id: "conclusion",
      type: "conclusion",
      title: "Case Summary",
      interviewerMessage: `Excellent work on this pricing case! Let me summarize your performance:

**Case Summary:**
The luxury car rental company should charge **54.95 cents (≈55 cents)** for each kilometer driven above the 300 km daily limit.

**Key Insights:**
1. Only variable costs (€0.50/km depreciation) apply to additional kilometers
2. Fixed costs are already covered by the base rate
3. The division method (Cost ÷ 0.91) ensures margin is on price, not markup on cost

**Your Performance:**
• Structured approach to clarifying objectives ✓
• Correct cost categorization (fixed vs variable) ✓
• Accurate mathematical calculation ✓
• Understanding of margin vs markup distinction ✓

Well done! You've completed this pricing case.`,
    }
  ],
  finalAnswer: "54.95 cents per additional kilometer (€0.5495)",
  evaluationCriteria: [
    "Asked about profitability/margin targets before calculating",
    "Correctly categorized fixed vs variable costs",
    "Calculated variable cost as €0.50/km",
    "Verified current 9% margin at 300km baseline",
    "Used correct formula: Price = Cost ÷ (1 - Margin)",
    "Arrived at 54.95 cents (not 54.5 cents)"
  ]
};

const CaseInterview = ({ caseData, onComplete, onRestart }: CaseInterviewProps) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [phaseAnswers, setPhaseAnswers] = useState<Record<string, string>>({});
  const [revealedInfo, setRevealedInfo] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentPhase = caseData.phases[currentPhaseIndex];
  const isComplete = currentPhaseIndex >= caseData.phases.length;

  // Initialize with first interviewer message
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (caseData.phases.length > 0) {
      setTimeout(() => {
        addInterviewerMessage(caseData.phases[0].interviewerMessage, caseData.phases[0].id);
      }, 500);
    }
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addInterviewerMessage = (content: string, phaseId?: string, isReveal = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        role: "interviewer",
        content,
        timestamp: Date.now(),
        phaseId,
        isReveal
      }]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const checkKeywordsAndProgress = (studentInput: string) => {
    const inputLower = studentInput.toLowerCase();
    const phase = currentPhase;

    // Check for keyword reveals
    if (phase.revealOnKeywords && phase.revealedInfo && !revealedInfo.has(phase.id)) {
      const hasKeyword = phase.revealOnKeywords.some(kw => inputLower.includes(kw.toLowerCase()));
      if (hasKeyword) {
        setRevealedInfo(prev => new Set([...prev, phase.id]));
      }
    }

    // For quantitative phase, check for specific calculations
    if (phase.type === "quantitative") {
      const hasCorrectAnswer = inputLower.includes("0.5495") || inputLower.includes("54.95") || inputLower.includes("55 cent");
      const hasIncorrectMethod = inputLower.includes("0.545") || inputLower.includes("54.5 cent");
      
      if (phase.feedback) {
        if (hasCorrectAnswer) {
          return { proceed: true, feedback: phase.feedback.success };
        } else if (hasIncorrectMethod) {
          return { proceed: true, feedback: phase.feedback.partial };
        } else if (inputLower.includes("0.50") || inputLower.includes("€0.5")) {
          return { proceed: true, feedback: phase.feedback.needsWork };
        }
      }
    }

    // Default: always proceed after student input
    return { proceed: true, feedback: null };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping || isComplete) return;

    // Add student message
    const studentMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "student",
      content: inputValue,
      timestamp: Date.now(),
      phaseId: currentPhase?.id
    };
    setMessages(prev => [...prev, studentMessage]);
    
    // Save answer for this phase
    setPhaseAnswers(prev => ({
      ...prev,
      [currentPhase.id]: inputValue
    }));

    const currentInput = inputValue;
    setInputValue("");

    // Check keywords and determine response
    const { proceed, feedback } = checkKeywordsAndProgress(currentInput);

    setTimeout(() => {
      if (feedback) {
        addInterviewerMessage(feedback, currentPhase.id);
      }

      // Move to next phase after delay
      setTimeout(() => {
        const nextIndex = currentPhaseIndex + 1;
        if (nextIndex < caseData.phases.length) {
          setCurrentPhaseIndex(nextIndex);
          const nextPhase = caseData.phases[nextIndex];
          addInterviewerMessage(nextPhase.interviewerMessage, nextPhase.id);
        } else {
          // Case complete
          onComplete(phaseAnswers, timeElapsed, calculateScore());
        }
      }, feedback ? 2000 : 500);
    }, 500);
  };

  const calculateScore = () => {
    // Basic scoring based on phase completion
    const completedPhases = Object.keys(phaseAnswers).length;
    const totalPhases = caseData.phases.length - 1; // Exclude conclusion
    return Math.round((completedPhases / totalPhases) * 100);
  };

  const difficultyConfig = {
    Beginner: { color: "bg-green-100 text-green-700 border-green-200", icon: "🟢" },
    Intermediate: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🟡" }, 
    Advanced: { color: "bg-red-100 text-red-700 border-red-200", icon: "🔴" }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-6 mb-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="bg-white/80 text-primary border-0 shadow-sm">
                  <Building className="w-3 h-3 mr-1" />
                  {caseData.firm}
                </Badge>
                <Badge className={`${difficultyConfig[caseData.difficulty].color} border`}>
                  {difficultyConfig[caseData.difficulty].icon} {caseData.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-white/50 border-white/80">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Interview Mode
                </Badge>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                {caseData.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-lg font-mono font-bold text-foreground">{formatTime(timeElapsed)}</span>
              </div>
              <Button 
                variant="ghost" 
                onClick={onRestart} 
                className="text-description-gray hover:text-foreground hover:bg-white/50"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Restart
              </Button>
            </div>
          </div>
          
          {/* Phase Progress */}
          <div className="flex items-center gap-2 mt-4">
            {caseData.phases.map((phase, idx) => (
              <div key={phase.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  idx < currentPhaseIndex 
                    ? 'bg-green-500 text-white' 
                    : idx === currentPhaseIndex 
                      ? 'bg-primary text-white ring-2 ring-primary/30' 
                      : 'bg-white/60 text-muted-foreground'
                }`}>
                  {idx < currentPhaseIndex ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < caseData.phases.length - 1 && (
                  <div className={`w-8 h-0.5 ${idx < currentPhaseIndex ? 'bg-green-500' : 'bg-white/40'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 border-0 shadow-lg overflow-hidden flex flex-col">
        <CardContent className="flex-1 p-0 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'student' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'interviewer' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {msg.role === 'interviewer' ? <MessageSquare className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.role === 'interviewer'
                      ? msg.isReveal 
                        ? 'bg-amber-50 border border-amber-200'
                        : 'bg-muted/50 border border-border/50'
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {msg.isReveal && (
                      <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium mb-2">
                        <Lightbulb className="w-3 h-3" />
                        Information Revealed
                      </div>
                    )}
                    <p className={`text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'interviewer' ? 'text-foreground' : ''
                    }`}>
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="bg-muted/50 border border-border/50 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Exhibit Display */}
          {currentPhase?.exhibitKey && hasExhibitTableData(currentPhase.exhibitKey) && (
            <div className="px-6 pb-4">
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 text-purple-700 text-sm font-medium mb-3">
                  <FileSpreadsheet className="w-4 h-4" />
                  Case Exhibit
                </div>
                <ExhibitTable exhibitKey={currentPhase.exhibitKey} />
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <div className="flex gap-3">
              <Textarea
                placeholder={isComplete ? "Case completed!" : "Type your response..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isTyping || isComplete}
                className="min-h-[80px] resize-none bg-white border-border focus:border-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || isComplete}
                size="lg"
                variant="hero"
                className="px-6 self-end"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseInterview;
