import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Send, RotateCcw, Building, User, MessageSquare, Lightbulb, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";

interface Message {
  id: string;
  role: "interviewer" | "student" | "system";
  content: string;
  timestamp: number;
  type?: "info" | "warning" | "success" | "hint";
}

interface InterviewCase {
  id: string;
  title: string;
  firm: string;
  type: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface AllPurposeTiresInterviewProps {
  caseData: InterviewCase;
  onComplete: (answers: Record<string, string>, timeElapsed: number, score: number) => void;
  onRequestRating: (score: number) => void;
  onRestart: () => void;
}

type Phase = 
  | "opening" 
  | "awaiting_clarifying" 
  | "clarifying_revealed" 
  | "awaiting_structure" 
  | "awaiting_data"
  | "data_revealed" 
  | "awaiting_calculation" 
  | "awaiting_market"
  | "market_revealed"
  | "calculation_feedback"
  | "complete";

// All-Purpose Tires case configuration
export const allPurposeTiresCase: InterviewCase = {
  id: "all-purpose-tires-market-entry",
  title: "All-Purpose Tires — Market Entry Break-Even",
  firm: "Market Entry",
  type: "Market Entry",
  difficulty: "Intermediate",
};

const AllPurposeTiresInterview = ({ caseData, onComplete, onRequestRating, onRestart }: AllPurposeTiresInterviewProps) => {
  const [phase, setPhase] = useState<Phase>("opening");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [clarifyingHintLevel, setClarifyingHintLevel] = useState(0);
  const [structureHintLevel, setStructureHintLevel] = useState(0);
  const [calculationHintLevel, setCalculationHintLevel] = useState(0);
  const [marketHintLevel, setMarketHintLevel] = useState(0);
  const [hintsUsedTotal, setHintsUsedTotal] = useState(0);
  const [hasIdentifiedBreakEven, setHasIdentifiedBreakEven] = useState(false);
  const [hasCalculatedContribution, setHasCalculatedContribution] = useState(false);
  const [hasCalculatedVolume, setHasCalculatedVolume] = useState(false);
  const [hasReachedConclusion, setHasReachedConclusion] = useState(false);
  const [calculationAttempts, setCalculationAttempts] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [revealedInfo, setRevealedInfo] = useState({ profitability: false, timeline: false, market: false });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle leaving the case
  const handleLeaveCase = () => {
    if (finalScore !== null) {
      onRequestRating(finalScore);
    } else {
      onRestart();
    }
  };

  // Get current hint level for the active phase
  const getCurrentHintLevel = (): number => {
    if (phase === "opening" || phase === "awaiting_clarifying") return clarifyingHintLevel;
    if (phase === "awaiting_structure" || phase === "awaiting_data") return structureHintLevel;
    if (phase === "awaiting_calculation" || phase === "data_revealed") return calculationHintLevel;
    if (phase === "awaiting_market" || phase === "market_revealed") return marketHintLevel;
    return 0;
  };

  const canUseHint = (): boolean => {
    if (phase === "complete" || phase === "calculation_feedback" || phase === "clarifying_revealed") return false;
    return true;
  };

  const isWalkthroughAvailable = (): boolean => {
    return getCurrentHintLevel() >= 3;
  };

  // Initialize with opening message
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      addInterviewerMessage(
        `Welcome. Let me present your case.

**Situation:**
An Italian tire manufacturer has developed innovative **all-purpose tires** that can be used year-round, eliminating the need for seasonal summer/winter tire changes.

**Key Context:**
The company wants to enter the **German market** but will only proceed if they can achieve **profitability within 3 years**.

**Your Task:**
Determine whether this market entry is feasible. Can the company realistically reach break-even within the 3-year window?

*Before we dive in, what clarifying questions do you have regarding the client's objectives or the market context?*`
      );
    }, 500);
  }, []);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addInterviewerMessage = (content: string, type?: "info" | "warning" | "success" | "hint") => {
    setIsTyping(true);
    const delay = 600 + Math.random() * 400;
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        role: "interviewer",
        content,
        timestamp: Date.now(),
        type
      }]);
      setIsTyping(false);
    }, delay);
  };

  // ========== SMART GATE LOGIC ==========
  // Phase 1: Clarifying - keywords unlock specific info
  const clarifyingKeywords = {
    profitability: ["profitability", "profit", "margin", "target", "goals", "objective"],
    timeline: ["timeline", "years", "3 years", "timeframe", "window", "deadline"],
    market: ["market", "germany", "size", "demand", "competition"]
  };
  
  // Phase 2: Structure - break-even keywords
  const structureKeywords = ["break-even", "break even", "breakeven", "fixed cost", "contribution", "volume", "units"];
  
  // Phase 3: Data request keywords
  const dataKeywords = ["data", "numbers", "costs", "price", "assumptions", "fixed", "variable"];
  
  // Calculation keywords
  const calculationKeywords = ["30", "30 million", "10 million", "10m", "30m", "€2", "2 euro", "contribution margin"];
  
  // Market keywords
  const marketKeywords = ["80 million", "40 million", "12.5", "12.5%", "market share", "80m", "40m"];

  // Priority 1: Check for keyword unlock (bypasses ALL length requirements)
  const checkKeywordUnlock = (input: string, phaseType: Phase): { hasKeyword: boolean; type?: string } => {
    const inputLower = input.toLowerCase();
    
    if (phaseType === "opening" || phaseType === "awaiting_clarifying") {
      if (clarifyingKeywords.profitability.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "profitability" };
      }
      if (clarifyingKeywords.timeline.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "timeline" };
      }
      if (clarifyingKeywords.market.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "market" };
      }
    }
    if (phaseType === "awaiting_structure") {
      if (structureKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "structure" };
      }
    }
    if (phaseType === "awaiting_data") {
      if (dataKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "data" };
      }
    }
    if (phaseType === "awaiting_calculation" || phaseType === "data_revealed") {
      if (calculationKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "calculation" };
      }
    }
    if (phaseType === "awaiting_market" || phaseType === "market_revealed") {
      if (marketKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "market_calc" };
      }
    }
    return { hasKeyword: false };
  };

  // Priority 2: Engagement nudge for low-effort responses (only if NO keywords)
  const isLowEffortResponse = (input: string, currentPhase: Phase): boolean => {
    if (checkKeywordUnlock(input, currentPhase).hasKeyword) return false;
    
    const trimmed = input.trim();
    if (trimmed.length < 10) return true;
    
    const lowEffortPatterns = [
      /^(ok|okay|yes|no|start|begin|go|next|continue|hi|hello|hey|sure|yep|yeah|k|y|n|idk|dunno)$/i,
    ];
    return lowEffortPatterns.some(pattern => pattern.test(trimmed.toLowerCase()));
  };

  const getEngagementNudgeMessage = (): string => {
    return `To help you prepare, please explain your reasoning or ask a specific question. If you are stuck, ask for a **Hint**!`;
  };

  const isHelpRequest = (input: string): boolean => {
    return /\b(help|hint|stuck|don'?t know|idk|no idea|not sure|confused|lost)\b/i.test(input.trim().toLowerCase());
  };

  const handleHintRequest = () => {
    if (isTyping || phase === "complete" || phase === "calculation_feedback") return;

    const isWalkthrough = isWalkthroughAvailable();
    
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: "student",
      content: isWalkthrough ? "🎓 Please show me the solution walkthrough." : "💡 I'd like a hint, please.",
      timestamp: Date.now()
    }]);

    setHintsUsedTotal(prev => prev + 1);

    setTimeout(() => {
      if (isWalkthrough) {
        processWalkthrough();
      } else {
        processHintRequest();
      }
    }, 300);
  };

  const processWalkthrough = () => {
    if (phase === "opening" || phase === "awaiting_clarifying") {
      provideClarifyingWalkthrough();
    } else if (phase === "awaiting_structure" || phase === "awaiting_data") {
      provideStructureWalkthrough();
    } else if (phase === "awaiting_calculation" || phase === "data_revealed") {
      provideCalculationWalkthrough();
    } else if (phase === "awaiting_market" || phase === "market_revealed") {
      provideMarketWalkthrough();
    }
  };

  const provideClarifyingWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Clarifying Questions Walkthrough**

In a market entry case, the key clarifying questions reveal:

• **Profitability Target:** The specific target is unknown — we need to determine what is plausible.
• **Timeline:** The client wants to break even within 3 years.
• **Market:** We need to assess if the German market can support the required volume.

**Key Insight:** This is a **Break-Even Analysis** problem. We need to find the volume required to cover costs.

Now, how would you structure your approach to determine if this is feasible?`,
      "info"
    );
    setRevealedInfo({ profitability: true, timeline: true, market: true });
    setPhase("awaiting_structure");
  };

  const provideStructureWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Structure Walkthrough**

**Break-Even Analysis Framework:**
To determine feasibility, we calculate the volume needed to cover fixed costs.

**Formula:** Break-Even Volume = Fixed Costs ÷ Contribution Margin

📊 **Data Revealed:**
• Fixed Costs: **€60 Million**
• Variable Costs: **€58 per tire**
• Price per Tire: **€60**
• Timeframe: **3 Years**

Now calculate the break-even volume.`,
      "info"
    );
    setHasIdentifiedBreakEven(true);
    setPhase("awaiting_calculation");
  };

  const provideCalculationWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Break-Even Calculation Walkthrough**

**Step 1: Contribution Margin**
€60 (Price) - €58 (Variable Cost) = **€2 per tire**

**Step 2: Total Break-Even Volume**
€60M (Fixed Costs) ÷ €2 (Margin) = **30 Million tires** (over 3 years)

**Step 3: Annual Required Volume**
30M ÷ 3 years = **10 Million tires/year**

Now we need to determine: Is 10 Million tires/year realistic in the German market?`,
      "info"
    );
    setHasCalculatedContribution(true);
    setHasCalculatedVolume(true);
    setPhase("awaiting_market");
  };

  const provideMarketWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Market Feasibility Walkthrough**

**Market Data:**
• Population: 80 Million
• Car Ownership: 1 car per 2 people = **40 Million cars**
• Tires per Car: 8 (4 summer + 4 winter)
• Tire Life: 4 years

**Market Calculation:**
(40M cars × 8 tires) ÷ 4 years = **80 Million tires/year**

**Required Market Share:**
10M ÷ 80M = **12.5%**

**Conclusion:** Capturing 12.5% market share in year one as a new entrant is **unrealistic**. The recommendation is to NOT enter the market under these conditions.`,
      "success"
    );
    setHasReachedConclusion(true);
    setPhase("calculation_feedback");
    
    setTimeout(() => {
      showConclusion(false);
    }, 3000);
  };

  const processHintRequest = () => {
    if (phase === "opening" || phase === "awaiting_clarifying") {
      provideClarifyingHint();
    } else if (phase === "awaiting_structure" || phase === "awaiting_data") {
      provideStructureHint();
    } else if (phase === "awaiting_calculation" || phase === "data_revealed") {
      provideCalculationHint();
    } else if (phase === "awaiting_market" || phase === "market_revealed") {
      provideMarketHint();
    }
  };

  const provideClarifyingHint = () => {
    const level = clarifyingHintLevel;
    setClarifyingHintLevel(prev => prev + 1);

    if (level === 0) {
      addInterviewerMessage(
        `**Hint 1/3:** Think about the **profitability requirements**, the **timeline constraints**, or the **market characteristics**.`,
        "hint"
      );
    } else if (level === 1) {
      addInterviewerMessage(
        `**Hint 2/3:** Ask about: **profitability targets** (What margin do they need?), **timeline** (Why 3 years?), or **market** (How big is the German tire market?).`,
        "hint"
      );
    } else {
      addInterviewerMessage(
        `**Coach Mode — Since you're stuck, here is the information:**

• **Profitability:** No specific target — we determine what's plausible.
• **Timeline:** Must break even within 3 years.
• **Market:** German market needs assessment.

Now, what analytical framework makes sense for this problem?`,
        "info"
      );
      setRevealedInfo({ profitability: true, timeline: true, market: true });
      setPhase("awaiting_structure");
    }
  };

  const provideStructureHint = () => {
    const level = structureHintLevel;
    setStructureHintLevel(prev => prev + 1);

    if (level === 0) {
      addInterviewerMessage(
        `**Hint 1/3:** To determine if a market entry is profitable, should we start by looking at the market size or the internal costs required to keep the lights on?`,
        "hint"
      );
    } else if (level === 1) {
      addInterviewerMessage(
        `**Hint 2/3:** Think about the relationship between **Price**, **Variable Costs**, and **Fixed Costs**. How do we find the number of units needed to reach zero profit?`,
        "hint"
      );
    } else {
      addInterviewerMessage(
        `**Coach Mode — Here's the structure and data:**

**Break-Even Analysis** is the correct framework.
Formula: Fixed Costs ÷ Contribution Margin = Volume needed

📊 **Data:**
• Fixed Costs: **€60 Million**
• Variable Costs: **€58 per tire**
• Price per Tire: **€60**

Calculate the break-even volume.`,
        "info"
      );
      setHasIdentifiedBreakEven(true);
      setPhase("awaiting_calculation");
    }
  };

  const provideCalculationHint = () => {
    const level = calculationHintLevel;
    setCalculationHintLevel(prev => prev + 1);

    if (level === 0) {
      addInterviewerMessage(
        `**Hint 1/3:** First calculate the **Contribution Margin**: Price minus Variable Cost per unit.`,
        "hint"
      );
    } else if (level === 1) {
      addInterviewerMessage(
        `**Hint 2/3:** 
• Contribution Margin = €60 - €58 = ?
• Break-Even = €60M ÷ Contribution Margin = ?`,
        "hint"
      );
    } else {
      addInterviewerMessage(
        `**Coach Mode — Full Break-Even Calculation:**
• Contribution Margin: €60 - €58 = **€2**
• Break-Even: €60M ÷ €2 = **30 Million tires** (3 years)
• Annual: 30M ÷ 3 = **10 Million tires/year**

Now determine if 10M tires/year is achievable in Germany.`,
        "info"
      );
      setHasCalculatedContribution(true);
      setHasCalculatedVolume(true);
      setPhase("awaiting_market");
    }
  };

  const provideMarketHint = () => {
    const level = marketHintLevel;
    setMarketHintLevel(prev => prev + 1);

    if (level === 0) {
      addInterviewerMessage(
        `**Hint 1/3:** To assess feasibility, calculate the **total market size** in tires per year, then compare to our required volume.`,
        "hint"
      );
    } else if (level === 1) {
      addInterviewerMessage(
        `**Hint 2/3:** 
• Germany has ~80M people, ~40M cars
• Each car uses 8 tires (summer + winter)
• Tires last ~4 years
What's the annual market demand?`,
        "hint"
      );
    } else {
      addInterviewerMessage(
        `**Coach Mode — Market Calculation:**
• Market: (40M × 8) ÷ 4 = **80M tires/year**
• Required share: 10M ÷ 80M = **12.5%**
• Verdict: **Unrealistic** for a new entrant`,
        "info"
      );
      setHasReachedConclusion(true);
      setPhase("calculation_feedback");
      setTimeout(() => {
        showConclusion(false);
      }, 3000);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping || phase === "complete") return;

    const studentInput = inputValue.trim();
    
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: "student",
      content: studentInput,
      timestamp: Date.now()
    }]);
    
    setInputValue("");

    setTimeout(() => {
      processResponse(studentInput);
    }, 300);
  };

  const processResponse = (input: string) => {
    switch (phase) {
      case "opening":
        handleOpeningPhase(input);
        break;
      case "awaiting_clarifying":
        handleClarifyingPhase(input);
        break;
      case "awaiting_structure":
        handleStructurePhase(input);
        break;
      case "awaiting_data":
        handleDataPhase(input);
        break;
      case "data_revealed":
      case "awaiting_calculation":
        handleCalculationPhase(input);
        break;
      case "awaiting_market":
      case "market_revealed":
        handleMarketPhase(input);
        break;
      case "calculation_feedback":
        handlePostCalculationPhase(input);
        break;
    }
  };

  const handleOpeningPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    
    const keywordCheck = checkKeywordUnlock(input, "opening");
    if (keywordCheck.hasKeyword) {
      if (keywordCheck.type === "profitability") {
        setRevealedInfo(prev => ({ ...prev, profitability: true }));
        addInterviewerMessage(
          `Good question about profitability targets.

**Revealed:** The specific profitability target is unknown. The client wants us to determine what is plausible and if they can break even within the 3-year window.

Do you have other clarifying questions, or are you ready to structure your approach?`
        );
        setPhase("awaiting_clarifying");
        return;
      }
      if (keywordCheck.type === "timeline") {
        setRevealedInfo(prev => ({ ...prev, timeline: true }));
        addInterviewerMessage(
          `Good question about the timeline.

**Revealed:** The 3-year window is firm. The client's board has mandated profitability within this period or they will not approve the investment.

What else would you like to clarify?`
        );
        setPhase("awaiting_clarifying");
        return;
      }
      if (keywordCheck.type === "market") {
        setRevealedInfo(prev => ({ ...prev, market: true }));
        addInterviewerMessage(
          `Good question about the market.

**Revealed:** Germany is the largest tire market in Europe. The client sees it as a critical beachhead for European expansion.

What else would you like to clarify?`
        );
        setPhase("awaiting_clarifying");
        return;
      }
    }

    if (isLowEffortResponse(input, "opening")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    addInterviewerMessage(
      `Before structuring, consider asking about:
• **Profitability targets** — What margins are expected?
• **Timeline** — Why 3 years specifically?
• **Market** — What do we know about German tire demand?

What would you like to clarify?`,
      "hint"
    );
    setPhase("awaiting_clarifying");
  };

  const handleClarifyingPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    
    const keywordCheck = checkKeywordUnlock(input, "awaiting_clarifying");
    if (keywordCheck.hasKeyword) {
      if (keywordCheck.type === "profitability" && !revealedInfo.profitability) {
        setRevealedInfo(prev => ({ ...prev, profitability: true }));
        addInterviewerMessage(
          `**Revealed:** No specific profitability target — we determine feasibility based on break-even analysis.

${revealedInfo.timeline && revealedInfo.market ? "Great! You've gathered the key context. How would you structure your analysis?" : "Any other questions?"}`
        );
        if (revealedInfo.timeline && revealedInfo.market) setPhase("awaiting_structure");
        return;
      }
      if (keywordCheck.type === "timeline" && !revealedInfo.timeline) {
        setRevealedInfo(prev => ({ ...prev, timeline: true }));
        addInterviewerMessage(
          `**Revealed:** The 3-year window is non-negotiable.

${revealedInfo.profitability && revealedInfo.market ? "Great! You've gathered the key context. How would you structure your analysis?" : "Any other questions?"}`
        );
        if (revealedInfo.profitability && revealedInfo.market) setPhase("awaiting_structure");
        return;
      }
      if (keywordCheck.type === "market" && !revealedInfo.market) {
        setRevealedInfo(prev => ({ ...prev, market: true }));
        addInterviewerMessage(
          `**Revealed:** Germany is a large, mature market with established players.

${revealedInfo.profitability && revealedInfo.timeline ? "Great! You've gathered the key context. How would you structure your analysis?" : "Any other questions?"}`
        );
        if (revealedInfo.profitability && revealedInfo.timeline) setPhase("awaiting_structure");
        return;
      }
    }

    // Check for structure keywords to move forward
    if (structureKeywords.some(kw => inputLower.includes(kw))) {
      setHasIdentifiedBreakEven(true);
      addInterviewerMessage(
        `Excellent! **Break-even analysis** is the right framework.

To proceed, I need to give you the cost data. Ask me for the **data** or **costs**.`
      );
      setPhase("awaiting_data");
      return;
    }

    if (inputLower.includes("structure") || inputLower.includes("ready") || inputLower.includes("move on")) {
      addInterviewerMessage(
        `Alright, let's structure your approach.

Given the 3-year profitability requirement, what analytical framework would you use to assess feasibility?`
      );
      setPhase("awaiting_structure");
      return;
    }

    if (isLowEffortResponse(input, "awaiting_clarifying")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    addInterviewerMessage(
      `I understand. Is there anything else you'd like to clarify, or are you ready to structure your approach?`
    );
  };

  const handleStructurePhase = (input: string) => {
    const inputLower = input.toLowerCase();

    // Priority 1: Check for break-even or data keywords
    const keywordCheck = checkKeywordUnlock(input, "awaiting_structure");
    if (keywordCheck.hasKeyword || structureKeywords.some(kw => inputLower.includes(kw))) {
      setHasIdentifiedBreakEven(true);
      addInterviewerMessage(
        `Excellent! **Break-even analysis** is exactly right.

📊 **Data Revealed:**
• Fixed Costs: **€60 Million**
• Variable Costs: **€58 per tire**
• Price per Tire: **€60**
• Timeframe: **3 Years**

**Your Task:** Calculate the break-even volume — how many tires must be sold to cover fixed costs?

*Show me your calculation.*`,
        "info"
      );
      setPhase("awaiting_calculation");
      return;
    }

    // Check for direct data request
    if (dataKeywords.some(kw => inputLower.includes(kw))) {
      addInterviewerMessage(
        `📊 **Data Revealed:**
• Fixed Costs: **€60 Million**
• Variable Costs: **€58 per tire**
• Price per Tire: **€60**
• Timeframe: **3 Years**

Using this data, calculate the break-even volume.`,
        "info"
      );
      setPhase("awaiting_calculation");
      return;
    }

    if (isLowEffortResponse(input, "awaiting_structure")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    addInterviewerMessage(
      `To assess market entry feasibility with a profitability requirement, think about:
• What costs must be covered?
• How do we calculate the volume needed?

What framework would you use?`,
      "hint"
    );
  };

  const handleDataPhase = (input: string) => {
    const inputLower = input.toLowerCase();

    if (dataKeywords.some(kw => inputLower.includes(kw))) {
      addInterviewerMessage(
        `📊 **Data Revealed:**
• Fixed Costs: **€60 Million**
• Variable Costs: **€58 per tire**
• Price per Tire: **€60**
• Timeframe: **3 Years**

Now calculate the break-even volume.`,
        "info"
      );
      setPhase("awaiting_calculation");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    addInterviewerMessage(
      `To proceed with the break-even calculation, ask me for the **data** or **cost information**.`,
      "hint"
    );
  };

  const handleCalculationPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    setCalculationAttempts(prev => prev + 1);

    // Check for contribution margin (€2)
    const hasContributionMargin = inputLower.includes("€2") || inputLower.includes("2 euro") || 
      (inputLower.includes("60") && inputLower.includes("58") && inputLower.includes("2"));
    
    // Check for total volume (30 million)
    const hasTotalVolume = inputLower.includes("30 million") || inputLower.includes("30m") || inputLower.includes("30,000,000");
    
    // Check for annual volume (10 million)
    const hasAnnualVolume = inputLower.includes("10 million") || inputLower.includes("10m") || inputLower.includes("10,000,000");

    if (hasAnnualVolume) {
      setHasCalculatedContribution(true);
      setHasCalculatedVolume(true);
      addInterviewerMessage(
        `✓ **Correct!** 

**Your Calculation:**
• Contribution Margin: €60 - €58 = €2
• Break-Even: €60M ÷ €2 = 30M tires (3 years)
• Annual: 30M ÷ 3 = **10 Million tires/year** ✓

Now let's assess feasibility. Here is the market data:

📊 **German Market Data:**
• Total Population: **80 Million** people
• Car Ownership: 1 car per 2 people = **40 Million cars**
• Tires per Car: **8 tires** (4 summer + 4 winter)
• Tire Lifespan: **4 years**

**Market Calculation:**
(40M cars × 8 tires) ÷ 4 years = **80 Million tires/year** total demand

**The Critical Question:**
What market share would 10 million tires represent? Is this realistic for a new entrant?`,
        "success"
      );
      setPhase("awaiting_market");
      return;
    }

    if (hasTotalVolume) {
      setHasCalculatedContribution(true);
      addInterviewerMessage(
        `Good progress! 30 million tires over 3 years is correct.

Now divide by 3 to get the **annual required volume**.`
      );
      return;
    }

    if (hasContributionMargin) {
      addInterviewerMessage(
        `Good! The contribution margin is €2 per tire.

Now calculate: €60M (Fixed Costs) ÷ €2 = ? tires needed`
      );
      return;
    }

    if (isLowEffortResponse(input, "awaiting_calculation")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    addInterviewerMessage(
      `Let me guide you through the break-even calculation:

1. **Contribution Margin** = Price - Variable Cost = ?
2. **Break-Even Volume** = Fixed Costs ÷ Contribution Margin = ?
3. **Annual Volume** = Total ÷ 3 years = ?

Show me your work.`,
      "hint"
    );
  };

  const handleMarketPhase = (input: string) => {
    const inputLower = input.toLowerCase();

    // Check for market size calculation (80 million)
    const hasMarketSize = inputLower.includes("80 million") || inputLower.includes("80m");
    
    // Check for market share (12.5%)
    const hasMarketShare = inputLower.includes("12.5") || inputLower.includes("12,5");
    
    // Check for conclusion (unrealistic)
    const hasConclusion = inputLower.includes("unrealistic") || inputLower.includes("not feasible") || 
      inputLower.includes("too high") || inputLower.includes("too ambitious") || inputLower.includes("should not enter");

    if (hasMarketShare || hasConclusion) {
      setHasReachedConclusion(true);
      addInterviewerMessage(
        `✓ **Excellent analysis!**

**Market Calculation:**
• 40M cars × 8 tires ÷ 4 years = **80M tires/year**
• Required share: 10M ÷ 80M = **12.5%**

**Your Conclusion:** Capturing 12.5% market share in year one as a new entrant is indeed **unrealistic**.

**Business Insight:** Even with a 10% replacement rate for damage (boosting market to ~88M), the required share remains ~11% — still very ambitious.

**Recommendation:** The client should **not enter** under these conditions, or renegotiate the timeline/cost structure.`,
        "success"
      );
      setPhase("calculation_feedback");
      
      setTimeout(() => {
        showConclusion(true);
      }, 3000);
      return;
    }

    if (hasMarketSize) {
      addInterviewerMessage(
        `Good! The German market is ~80 million tires per year.

Now calculate: What **market share** would 10 million tires represent?

Is this realistic for a new entrant?`
      );
      return;
    }

    // Check for market data request
    if (inputLower.includes("data") || inputLower.includes("market") || inputLower.includes("population") || inputLower.includes("cars")) {
      addInterviewerMessage(
        `📊 **Market Data:**
• Total Population: **80 Million** people
• Car Ownership: 1 car per 2 people = **40 Million cars**
• Tires per Car: **8** (4 summer + 4 winter traditionally)
• Tire Lifespan: **4 years**

Calculate the total annual market demand, then determine what share 10M tires represents.`
      );
      return;
    }

    if (isLowEffortResponse(input, "awaiting_market")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    addInterviewerMessage(
      `To assess if 10 million tires/year is achievable, we need to understand the total market.

Ask me for the **market data** to calculate the required market share.`,
      "hint"
    );
  };

  const handlePostCalculationPhase = (input: string) => {
    showConclusion(true);
  };

  const showConclusion = (wasCorrect: boolean) => {
    setPhase("complete");
    
    const score = calculateScore(wasCorrect);
    setFinalScore(score);
    
    setTimeout(() => {
      addInterviewerMessage(
        `**Case Complete — Performance Summary**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Final Answer:** The market entry is **not feasible** under current conditions. A 12.5% market share in year one is unrealistic for a new entrant.

**Key Learnings:**
${hasIdentifiedBreakEven ? "✓" : "○"} Identified Break-Even Analysis as the correct framework
${hasCalculatedContribution ? "✓" : "○"} Correctly calculated the Contribution Margin (€2)
${hasCalculatedVolume ? "✓" : "○"} Derived the annual volume required (10 Million)
${hasReachedConclusion ? "✓" : "○"} Synthesized market data to conclude "Unrealistic"

**This Case vs. Value-Based Pricing:**
• All-Purpose Tires: Volume feasibility (market entry)
• Innovation Tires: Price discovery (value-based)

**Your Score: ${score}%**

Click **"Back to Library"** when you're ready to continue.`,
        "success"
      );
    }, 1000);
  };

  const calculateScore = (wasCorrect: boolean): number => {
    let score = 0;
    
    if (hasIdentifiedBreakEven) score += 25;
    if (hasCalculatedContribution) score += 25;
    if (hasCalculatedVolume) score += 25;
    if (hasReachedConclusion) score += 25;
    
    return Math.min(100, score);
  };

  const difficultyConfig = {
    Beginner: { color: "bg-green-100 text-green-700 border-green-200", icon: "🟢" },
    Intermediate: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🟡" }, 
    Advanced: { color: "bg-red-100 text-red-700 border-red-200", icon: "🔴" }
  };

  const getPhaseNumber = (): number => {
    switch (phase) {
      case "opening": return 1;
      case "awaiting_clarifying": return 1;
      case "clarifying_revealed": return 2;
      case "awaiting_structure": return 2;
      case "awaiting_data": return 2;
      case "data_revealed": return 3;
      case "awaiting_calculation": return 3;
      case "awaiting_market": return 4;
      case "market_revealed": return 4;
      case "calculation_feedback": return 5;
      case "complete": return 5;
      default: return 1;
    }
  };

  const phases = [
    { num: 1, label: "Clarify" },
    { num: 2, label: "Structure" },
    { num: 3, label: "Calculate" },
    { num: 4, label: "Market" },
    { num: 5, label: "Complete" }
  ];

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
                <Badge variant="outline" className="bg-violet-100 border-violet-200 text-violet-700">
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
                onClick={handleLeaveCase} 
                className="text-description-gray hover:text-foreground hover:bg-white/50"
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                {phase === "complete" ? "Back to Library" : "Exit Case"}
              </Button>
            </div>
          </div>
          
          {/* Phase Progress */}
          <div className="flex items-center gap-1 mt-4">
            {phases.map((p, idx) => (
              <div key={p.num} className="flex items-center">
                <div className={`flex flex-col items-center`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    p.num < getPhaseNumber() 
                      ? 'bg-green-500 text-white' 
                      : p.num === getPhaseNumber() 
                        ? 'bg-primary text-white ring-2 ring-primary/30 ring-offset-2' 
                        : 'bg-white/60 text-muted-foreground'
                  }`}>
                    {p.num < getPhaseNumber() ? <CheckCircle className="w-4 h-4" /> : p.num}
                  </div>
                  <span className={`text-[10px] mt-1 ${p.num <= getPhaseNumber() ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {p.label}
                  </span>
                </div>
                {idx < phases.length - 1 && (
                  <div className={`w-6 md:w-10 h-0.5 mb-4 ${p.num < getPhaseNumber() ? 'bg-green-500' : 'bg-white/40'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 border-0 shadow-lg overflow-hidden flex flex-col min-h-[500px]">
        <CardContent className="flex-1 p-0 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-start gap-3 max-w-[88%] ${msg.role === 'student' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'interviewer' 
                      ? msg.type === 'warning' 
                        ? 'bg-amber-100 text-amber-600'
                        : msg.type === 'success'
                          ? 'bg-green-100 text-green-600'
                          : msg.type === 'hint'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-primary/10 text-primary'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {msg.role === 'interviewer' ? (
                      msg.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                      msg.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                      msg.type === 'hint' ? <Lightbulb className="w-4 h-4" /> :
                      <MessageSquare className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-5 py-3 ${
                    msg.role === 'interviewer'
                      ? msg.type === 'warning'
                        ? 'bg-amber-50 border border-amber-200'
                        : msg.type === 'success'
                          ? 'bg-green-50 border border-green-200'
                          : msg.type === 'hint'
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-muted/50 border border-border/50'
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className={`text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'interviewer' ? 'text-foreground' : ''
                    }`} dangerouslySetInnerHTML={{ 
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n/g, '<br/>')
                    }} />
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
                  <div className="bg-muted/50 border border-border/50 rounded-2xl px-5 py-3">
                    <div className="flex items-center gap-1.5">
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

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-muted/20">
            {/* Hint / Walkthrough Button Row */}
            {canUseHint() && (
              <div className="flex items-center justify-between mb-3">
                {isWalkthroughAvailable() ? (
                  <Button
                    onClick={handleHintRequest}
                    disabled={isTyping}
                    variant="outline"
                    size="sm"
                    className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:border-amber-300"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Show me the solution walkthrough
                  </Button>
                ) : (
                  <Button
                    onClick={handleHintRequest}
                    disabled={isTyping}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Need a Hint? ({3 - getCurrentHintLevel()} remaining)
                  </Button>
                )}
                <span className="text-xs text-muted-foreground">
                  Hints used: {hintsUsedTotal}
                </span>
              </div>
            )}
            
            <div className="flex gap-3">
              <Textarea
                placeholder={phase === "complete" ? "Case completed!" : "Type your response... Explain your reasoning."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isTyping || phase === "complete"}
                className="min-h-[80px] resize-none bg-white border-border focus:border-primary"
              />
              <div className="flex flex-col gap-2 self-end">
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || phase === "complete"}
                  size="lg"
                  variant="hero"
                  className="px-6"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send • Shift+Enter for new line • Use the Hint button if you're stuck
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllPurposeTiresInterview;
