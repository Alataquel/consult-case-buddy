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

interface InnovationTiresInterviewProps {
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
  | "awaiting_assumptions"
  | "data_revealed" 
  | "awaiting_calculation" 
  | "calculation_feedback"
  | "complete";

// Innovation Tires case configuration
export const innovationTiresCase: InterviewCase = {
  id: "innovation-tires-pricing",
  title: "Innovation Tires — Value-Based Pricing",
  firm: "Pricing Strategy",
  type: "Pricing Strategy",
  difficulty: "Intermediate",
};

const InnovationTiresInterview = ({ caseData, onComplete, onRequestRating, onRestart }: InnovationTiresInterviewProps) => {
  const [phase, setPhase] = useState<Phase>("opening");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [clarifyingHintLevel, setClarifyingHintLevel] = useState(0);
  const [structureHintLevel, setStructureHintLevel] = useState(0);
  const [calculationHintLevel, setCalculationHintLevel] = useState(0);
  const [hintsUsedTotal, setHintsUsedTotal] = useState(0);
  const [hasIdentifiedValuePricing, setHasIdentifiedValuePricing] = useState(false);
  const [hasIdentifiedAssumptions, setHasIdentifiedAssumptions] = useState(false);
  const [calculationAttempts, setCalculationAttempts] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [revealedInfo, setRevealedInfo] = useState({ competition: false, costs: false, goal: false });
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
    if (phase === "awaiting_structure" || phase === "awaiting_assumptions") return structureHintLevel;
    if (phase === "awaiting_calculation" || phase === "data_revealed") return calculationHintLevel;
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
A French tire manufacturer has developed an innovation in the car tire market. Due to lower rolling resistance, it is possible to reduce fuel consumption by **5%**.

**Key Context:**
The company is **new to the tire market** and currently has no comparable products.

**Your Task:**
The company wants to find out **how much the tire should cost at product launch**.

*Before we dive in, what clarifying questions do you have regarding the client's objectives or the competitive environment?*`
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
    competition: ["competition", "competitor", "unique", "market", "alternative"],
    costs: ["costs", "cost", "manufacturing", "production", "expense"],
    goals: ["goals", "goal", "objective", "target", "profit", "profitability"]
  };
  
  // Phase 2: Structure - value-based pricing keywords
  const structureKeywords = ["value", "value-based", "customer value", "savings", "saving", "benefit", "willingness", "consumption", "fuel"];
  
  // Phase 3: Quantitative - data request keywords
  const dataKeywords = ["data", "numbers", "assumptions", "liters", "km", "mileage", "kilometers", "fuel price", "lifespan"];
  
  // Calculation keywords
  const calculationKeywords = ["115", "€115", "115€", "75", "960", "1152", "57.6", "57,6", "15", "60"];

  // Priority 1: Check for keyword unlock (bypasses ALL length requirements)
  const checkKeywordUnlock = (input: string, phaseType: Phase): { hasKeyword: boolean; type?: string } => {
    const inputLower = input.toLowerCase();
    
    if (phaseType === "opening" || phaseType === "awaiting_clarifying") {
      if (clarifyingKeywords.competition.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "competition" };
      }
      if (clarifyingKeywords.costs.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "costs" };
      }
      if (clarifyingKeywords.goals.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "goals" };
      }
    }
    if (phaseType === "awaiting_structure") {
      if (structureKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "structure" };
      }
    }
    if (phaseType === "awaiting_assumptions") {
      if (dataKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "data" };
      }
    }
    if (phaseType === "awaiting_calculation" || phaseType === "data_revealed") {
      if (calculationKeywords.some(kw => inputLower.includes(kw))) {
        return { hasKeyword: true, type: "calculation" };
      }
    }
    return { hasKeyword: false };
  };

  // Priority 2: Engagement nudge for low-effort responses (only if NO keywords)
  const isLowEffortResponse = (input: string, currentPhase: Phase): boolean => {
    // Priority 1 check first - keywords bypass everything
    if (checkKeywordUnlock(input, currentPhase).hasKeyword) return false;
    
    const trimmed = input.trim();
    
    // Under 10 characters without keywords = engagement nudge
    if (trimmed.length < 10) return true;
    
    // Common low-effort patterns
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
    } else if (phase === "awaiting_structure" || phase === "awaiting_assumptions") {
      provideStructureWalkthrough();
    } else if (phase === "awaiting_calculation" || phase === "data_revealed") {
      provideCalculationWalkthrough();
    }
  };

  const provideClarifyingWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Clarifying Questions Walkthrough**

In a value-based pricing case, the key clarifying questions reveal:

• **Competition:** No comparable tires with this fuel-saving feature exist — the tire is unique.
• **Costs:** No information on manufacturing costs is available.
• **Goal:** The objective is to derive the selling price based on **customer value**, not cost.

**Key Insight:** When costs are unknown and the product is unique, **value-based pricing** is the only viable strategy.

Now, how would you structure your approach to determine this price?`,
      "info"
    );
    setRevealedInfo({ competition: true, costs: true, goal: true });
    setPhase("awaiting_structure");
  };

  const provideStructureWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Structure Walkthrough**

**Value-Based Pricing Strategy:**
Since we don't know manufacturing costs and the product is unique, we price based on the **value delivered to the customer** — in this case, fuel savings.

**Assumptions Needed:**
• Annual mileage (km/year)
• Average fuel consumption (L/100km)
• Fuel price (€/L)
• Tire lifespan (years)
• Number of tires per car

📊 **Data Revealed:**
• Annual Mileage: **12,000 km/year**
• Fuel Consumption: **8 L/100 km**
• Fuel Price: **€1.20/L**
• Standard Tire Price: **€40/tire**
• Tire Lifespan: **5 years**
• Tires per Car: **4**

Now calculate the maximum price the customer would pay.`,
      "info"
    );
    setHasIdentifiedValuePricing(true);
    setHasIdentifiedAssumptions(true);
    setPhase("awaiting_calculation");
  };

  const provideCalculationWalkthrough = () => {
    addInterviewerMessage(
      `🎓 **Coach Mode — Full Calculation Walkthrough**

**Step 1: Annual Fuel Consumption**
(12,000 km ÷ 100) × 8 L = **960 liters/year**

**Step 2: Annual Fuel Cost**
960 L × €1.20 = **€1,152/year**

**Step 3: Annual Savings (5%)**
€1,152 × 0.05 = **€57.60/year** (≈€60)

**Step 4: Savings per Tire per Year**
€60 ÷ 4 tires = **€15/tire/year**

**Step 5: Total Value per Tire (5 years)**
€15 × 5 years = **€75 extra value**

**Step 6: Maximum Price**
€40 (standard) + €75 (value) = **€115 per tire**

**Business Insight:**
At €115, the customer is **indifferent** — they save exactly what they pay extra. To encourage adoption, price slightly below €115 to share some savings with the customer.`,
      "success"
    );
    setPhase("calculation_feedback");
    
    setTimeout(() => {
      showConclusion(false);
    }, 3000);
  };

  const processHintRequest = () => {
    if (phase === "opening" || phase === "awaiting_clarifying") {
      provideClarifyingHint();
    } else if (phase === "awaiting_structure" || phase === "awaiting_assumptions") {
      provideStructureHint();
    } else if (phase === "awaiting_calculation" || phase === "data_revealed") {
      provideCalculationHint();
    }
  };

  const provideClarifyingHint = () => {
    const level = clarifyingHintLevel;
    setClarifyingHintLevel(prev => prev + 1);

    if (level === 0) {
      // Hint 1: Suggest the category
      addInterviewerMessage(
        `**Hint 1/3:** Think about the **competitive landscape**, the company's **cost structure**, or their **pricing objectives**.`,
        "hint"
      );
    } else if (level === 1) {
      // Hint 2: Provide the keywords
      addInterviewerMessage(
        `**Hint 2/3:** Ask about: **competition** (Are there alternatives?), **costs** (What are production costs?), or **goals** (What's the target profitability?).`,
        "hint"
      );
    } else {
      // Hint 3: Coach Mode - direct reveal
      addInterviewerMessage(
        `**Coach Mode — Since you're stuck, here is the information:**

• **Competition:** No comparable tires exist — the product is unique.
• **Costs:** Manufacturing costs are unknown.
• **Goal:** Derive price from **customer value**, not cost.

Now, what pricing strategy makes sense given these constraints?`,
        "info"
      );
      setRevealedInfo({ competition: true, costs: true, goal: true });
      setPhase("awaiting_structure");
    }
  };

  const provideStructureHint = () => {
    const level = structureHintLevel;
    setStructureHintLevel(prev => prev + 1);

    if (level === 0) {
      // Hint 1: Focus on value
      addInterviewerMessage(
        `**Hint 1/3:** Focus on **Value-based pricing**. What is the 5% fuel saving worth in Euros?`,
        "hint"
      );
    } else if (level === 1) {
      // Hint 2: Calculate fuel cost first
      addInterviewerMessage(
        `**Hint 2/3:** Calculate the **total annual fuel cost** for the car first. Then find 5% of that.`,
        "hint"
      );
    } else {
      // Hint 3: Coach Mode - reveal data
      addInterviewerMessage(
        `**Coach Mode — Here's the structure and data:**

**Value-Based Pricing** is the correct approach.

📊 **Data:**
• 12,000 km/year | 8 L/100km | €1.20/L
• Standard tire: €40 | Lifespan: 5 years | 4 tires/car

Calculate the customer's total fuel savings over the tire's lifetime.`,
        "info"
      );
      setHasIdentifiedValuePricing(true);
      setHasIdentifiedAssumptions(true);
      setPhase("awaiting_calculation");
    }
  };

  const provideCalculationHint = () => {
    const level = calculationHintLevel;
    setCalculationHintLevel(prev => prev + 1);

    if (level === 0) {
      // Hint 1: Focus on value
      addInterviewerMessage(
        `**Hint 1/3:** Focus on **Value-based pricing**. What is the 5% fuel saving worth in Euros?`,
        "hint"
      );
    } else if (level === 1) {
      // Hint 2: Calculate fuel cost first
      addInterviewerMessage(
        `**Hint 2/3:** Calculate the **total annual fuel cost** for the car first.
• Annual fuel: (12,000 ÷ 100) × 8 = ? liters
• Annual cost: ? liters × €1.20 = ?`,
        "hint"
      );
    } else {
      // Hint 3: Coach Mode - full walkthrough
      addInterviewerMessage(
        `**Coach Mode — Full Calculation:**
• 960 L/year × €1.20 = €1,152/year
• 5% savings = €57.60 ≈ €60/year (for the whole car)
• Per tire: €60 ÷ 4 = €15/year
• Over 5 years: €15 × 5 = **€75 extra value**
• Maximum price = €40 + €75 = **€115**`,
        "info"
      );
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
      case "awaiting_assumptions":
        handleAssumptionsPhase(input);
        break;
      case "data_revealed":
      case "awaiting_calculation":
        handleCalculationPhase(input);
        break;
      case "calculation_feedback":
        handlePostCalculationPhase(input);
        break;
    }
  };

  const handleOpeningPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    
    // Priority 1: Check for keyword unlocks FIRST (bypasses length requirements)
    const keywordCheck = checkKeywordUnlock(input, "opening");
    
    if (keywordCheck.hasKeyword) {
      let response = "Good question. Here's what I can tell you:\n\n";
      let hasNewInfo = false;
      
      // Competition keyword
      if (clarifyingKeywords.competition.some(kw => inputLower.includes(kw)) && !revealedInfo.competition) {
        response += "• **Competition:** No comparable tires with this fuel-saving feature exist. The tire is **unique** in the market.\n\n";
        setRevealedInfo(prev => ({ ...prev, competition: true }));
        hasNewInfo = true;
      }
      // Costs keyword
      if (clarifyingKeywords.costs.some(kw => inputLower.includes(kw)) && !revealedInfo.costs) {
        response += "• **Costs:** There is **no information available** on manufacturing costs.\n\n";
        setRevealedInfo(prev => ({ ...prev, costs: true }));
        hasNewInfo = true;
      }
      // Goals keyword
      if (clarifyingKeywords.goals.some(kw => inputLower.includes(kw)) && !revealedInfo.goal) {
        response += "• **Goal:** The target profitability is unknown. The goal is to derive the selling price based on **customer value**.\n\n";
        setRevealedInfo(prev => ({ ...prev, goal: true }));
        hasNewInfo = true;
      }
      
      if (hasNewInfo) {
        response += "*Any other questions, or are you ready to structure your approach?*";
        addInterviewerMessage(response, "info");
        setPhase("awaiting_clarifying");
        return;
      }
    }

    // Priority 2: Engagement nudge for low-effort responses
    if (isLowEffortResponse(input, "opening")) {
      addInterviewerMessage(
        `${getEngagementNudgeMessage()}

*What clarifying questions do you have about the client's objectives or competitive environment?*`,
        "hint"
      );
      setPhase("awaiting_clarifying");
      return;
    }

    // Good effort but no specific keyword - guide them
    addInterviewerMessage(
      `Good start. Before we structure our approach, consider asking about:
• The **competitive** landscape
• The company's **cost** structure
• Their pricing **goals**

*What specific information would help you determine the price?*`,
      "hint"
    );
    setPhase("awaiting_clarifying");
  };

  const handleClarifyingPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    
    // Priority 1: Check for keyword unlocks FIRST
    const keywordCheck = checkKeywordUnlock(input, "awaiting_clarifying");
    
    if (keywordCheck.hasKeyword) {
      let response = "";
      let hasNewInfo = false;
      
      // Check each keyword type and reveal if not already revealed
      if (clarifyingKeywords.competition.some(kw => inputLower.includes(kw)) && !revealedInfo.competition) {
        response += "• **Competition:** No comparable tires exist. The product is **unique**.\n\n";
        setRevealedInfo(prev => ({ ...prev, competition: true }));
        hasNewInfo = true;
      }
      if (clarifyingKeywords.costs.some(kw => inputLower.includes(kw)) && !revealedInfo.costs) {
        response += "• **Costs:** No manufacturing cost information is available.\n\n";
        setRevealedInfo(prev => ({ ...prev, costs: true }));
        hasNewInfo = true;
      }
      if (clarifyingKeywords.goals.some(kw => inputLower.includes(kw)) && !revealedInfo.goal) {
        response += "• **Goal:** Derive price from **customer value**, not cost targets.\n\n";
        setRevealedInfo(prev => ({ ...prev, goal: true }));
        hasNewInfo = true;
      }

      if (hasNewInfo) {
        response += "*Any other questions, or shall we structure the approach?*";
        addInterviewerMessage(response, "info");
        return;
      }
    }

    // Priority 2: Engagement nudge
    if (isLowEffortResponse(input, "awaiting_clarifying")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    // Check if they want to move on to structuring
    if (inputLower.includes("structure") || inputLower.includes("approach") || inputLower.includes("move on") || inputLower.includes("next") || inputLower.includes("ready")) {
      addInterviewerMessage(
        `Good. Let me summarize what we know:

• **Competition:** No comparable products exist — unique innovation.
• **Costs:** Manufacturing costs are unknown.
• **Goal:** Derive price from customer value, not cost.

**Now, how would you structure your approach to determine this price? What pricing strategy makes the most sense here?**`,
        "info"
      );
      setRevealedInfo({ competition: true, costs: true, goal: true });
      setPhase("awaiting_structure");
      return;
    }

    // Generic nudge
    addInterviewerMessage(
      `Think about what pricing strategies are available. Ask about **competition**, **costs**, or **goals**, or tell me you're ready to structure your approach.`,
      "hint"
    );
  };

  const handleStructurePhase = (input: string) => {
    const inputLower = input.toLowerCase();
    
    // Priority 1: Check for value-based pricing keywords OR data request → IMMEDIATELY provide data
    const wantsData = dataKeywords.some(kw => inputLower.includes(kw));
    const identifiedValuePricing = structureKeywords.some(kw => inputLower.includes(kw));
    
    if (identifiedValuePricing || wantsData) {
      setHasIdentifiedValuePricing(true);
      setHasIdentifiedAssumptions(true);
      addInterviewerMessage(
        `${identifiedValuePricing ? "Excellent! **Value-based pricing** is exactly right." : "Good — you're ready for the quantitative phase."}

Since we don't know manufacturing costs and the product is unique, we price based on the **value delivered to the customer** — fuel savings.

📊 **Here is your data:**
• Annual Mileage: **12,000 km**
• Fuel Consumption: **8 L / 100 km**
• Fuel Price: **€1.20 / Liter**
• Standard Tire Price: **€40**
• Tire Lifespan: **5 years** (4 tires per car)

**Your Task:** Calculate the maximum price a customer would be willing to pay for this fuel-saving tire.

*Show me your step-by-step calculation.*`,
        "success"
      );
      setPhase("awaiting_calculation");
      return;
    }

    // Priority 2: Engagement nudge
    if (isLowEffortResponse(input, "awaiting_structure")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    // Check for incorrect approach
    if (inputLower.includes("cost-plus") || inputLower.includes("cost based") || inputLower.includes("markup")) {
      addInterviewerMessage(
        `⚠️ Cost-plus pricing won't work here because **we don't have cost information**.

Think about the alternative: If costs are unknown, what else could we base the price on? What does the customer *gain* from this tire?`,
        "warning"
      );
    } else {
      addInterviewerMessage(
        `There are several pricing strategies: cost-plus, competitive, and value-based.

Given that:
• Costs are unknown
• No comparable products exist

Which strategy makes sense here? Think about the **value** or **savings** the customer gets.`,
        "hint"
      );
    }
  };

  const handleAssumptionsPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    
    // Priority 1: Check for data keywords (Fast Track to reveal data)
    if (dataKeywords.some(kw => inputLower.includes(kw))) {
      setHasIdentifiedAssumptions(true);
      addInterviewerMessage(
        `Good thinking! Here are the assumptions we'll use:

📊 **Data:**
• Annual Mileage: **12,000 km/year**
• Average Fuel Consumption: **8 liters/100 km**
• Fuel Price: **€1.20/liter**
• Standard Tire Price: **€40/tire**
• Tire Lifespan: **5 years**
• Tires per Car: **4**

**Your Task:** Calculate the maximum price a customer would be willing to pay for this fuel-saving tire.

*Show me your step-by-step calculation.*`,
        "info"
      );
      setPhase("awaiting_calculation");
      return;
    }

    // Priority 2: Engagement nudge
    if (isLowEffortResponse(input, "awaiting_assumptions")) {
      addInterviewerMessage(getEngagementNudgeMessage(), "hint");
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    // Nudge toward assumptions
    addInterviewerMessage(
      `To calculate fuel savings, think about:
• How many **km** does a typical driver travel per year?
• How much **fuel** does a car consume per 100km?
• What's the current fuel price?
• How long do tires last (**lifespan**)?

What **assumptions** would you make?`,
      "hint"
    );
  };

  const handleCalculationPhase = (input: string) => {
    const inputLower = input.toLowerCase();
    setCalculationAttempts(prev => prev + 1);

    // Priority 1: Check for correct final answer (115)
    const hasCorrectAnswer = inputLower.includes("115") || inputLower.includes("€115") || inputLower.includes("115€");
    
    if (hasCorrectAnswer) {
      addInterviewerMessage(
        `✓ **Excellent work!** Your calculation is correct.

**Verification:**
1. Annual fuel: (12,000 ÷ 100) × 8 = 960 L
2. Annual cost: 960 × €1.20 = €1,152
3. 5% savings: €1,152 × 0.05 = €57.60 ≈ €60/year
4. Per tire/year: €60 ÷ 4 = €15
5. Over 5 years: €15 × 5 = €75 value
6. Maximum price: €40 + €75 = **€115** ✓

**The Indifference Point:**
At €115, the customer is **indifferent** — they save exactly what they pay extra. How should we set the final price to actually encourage them to buy?`,
        "success"
      );
      setPhase("calculation_feedback");
      
      setTimeout(() => {
        showConclusion(true);
      }, 3000);
      return;
    }

    // Check for intermediate calculations
    const hasValuePerTire = inputLower.includes("75");
    const hasSavings = inputLower.includes("57.6") || inputLower.includes("57,6") || inputLower.includes("58") || inputLower.includes("60");
    const hasAnnualCost = inputLower.includes("1152") || inputLower.includes("1,152");
    const hasAnnualFuel = inputLower.includes("960");

    if (hasValuePerTire || hasSavings) {
      addInterviewerMessage(
        `Good progress! You've correctly calculated the fuel savings.

Now add the **extra value (€75)** to the **standard tire price (€40)** to get the maximum selling price.`,
        "hint"
      );
      return;
    }
    
    if (hasAnnualCost || hasAnnualFuel) {
      addInterviewerMessage(
        `You're on the right track with the fuel costs!

Next:
• Calculate 5% of the annual fuel cost (€1,152 × 0.05)
• Divide by 4 tires
• Multiply by 5 years

What's the total value per tire?`,
        "hint"
      );
      return;
    }

    // Priority 2: Engagement nudge
    if (isLowEffortResponse(input, "awaiting_calculation")) {
      addInterviewerMessage(
        `${getEngagementNudgeMessage()}

Please show me your step-by-step calculations.`,
        "hint"
      );
      return;
    }

    if (isHelpRequest(input)) {
      processHintRequest();
      return;
    }

    // Generic guidance
    setCalculationHintLevel(prev => prev + 1);
    addInterviewerMessage(
      `I need to see your step-by-step reasoning. Please calculate:

1. Annual fuel consumption (12,000 km at 8 L/100km)
2. Annual fuel cost (at €1.20/L)
3. Annual savings (5%)
4. Savings per tire per year (÷4 tires)
5. Total value over 5 years
6. Final price (base €40 + value)`,
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

**Final Answer:** The innovation tire should be priced at **€115 per tire** (maximum) or slightly below to encourage adoption.

**The "Indifference Point" Concept:**
At €115, customers save exactly €75 in fuel over 5 years — the same as the price premium. They're economically indifferent. Pricing at €100-110 shares value with customers, driving faster adoption.

**Key Insights Demonstrated:**
${hasIdentifiedValuePricing ? "✓" : "○"} Identified value-based pricing as the correct strategy
${hasIdentifiedAssumptions ? "✓" : "○"} Articulated key assumptions for the calculation
${wasCorrect ? "✓" : "○"} Correctly calculated the €115 maximum price
${wasCorrect ? "✓" : "○"} Understood the business rationale for pricing below maximum

**This Case vs. Cost-Based Pricing:**
• Car Rental Case: Cost + Margin formula (known costs)
• Innovation Tires: Value-based (unknown costs, unique product)

**Your Score: ${score}%**

Click **"Back to Library"** when you're ready to continue.`,
        "success"
      );
    }, 1000);
  };

  const calculateScore = (wasCorrect: boolean): number => {
    let score = 0;
    
    if (hasIdentifiedValuePricing) score += 30;
    if (hasIdentifiedAssumptions) score += 20;
    if (wasCorrect) score += 50;
    
    if (calculationAttempts === 1 && wasCorrect) score = Math.min(100, score + 10);
    
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
      case "awaiting_assumptions": return 2;
      case "data_revealed": return 3;
      case "awaiting_calculation": return 3;
      case "calculation_feedback": return 4;
      case "complete": return 5;
      default: return 1;
    }
  };

  const phases = [
    { num: 1, label: "Clarify" },
    { num: 2, label: "Structure" },
    { num: 3, label: "Calculate" },
    { num: 4, label: "Review" },
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

export default InnovationTiresInterview;
