import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Clock, Send, RotateCcw, Building, User, MessageSquare, Lightbulb, CheckCircle, AlertTriangle, FileSpreadsheet, HelpCircle } from "lucide-react";
import ExhibitTable, { hasExhibitTableData } from "@/components/ExhibitTable";

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

interface CaseInterviewProps {
  caseData: InterviewCase;
  onComplete: (answers: Record<string, string>, timeElapsed: number, score: number) => void;
  onRestart: () => void;
}

type Phase = 
  | "opening" 
  | "awaiting_clarifying" 
  | "clarifying_revealed" 
  | "awaiting_structure" 
  | "data_revealed" 
  | "awaiting_calculation" 
  | "calculation_feedback"
  | "complete";

// Luxury Car Rental case configuration
export const luxuryCarRentalCase: InterviewCase = {
  id: "car-rental-mileage-pricing",
  title: "Luxury Car Rental — Mileage Pricing Strategy",
  firm: "Pricing Strategy",
  type: "Pricing Strategy",
  difficulty: "Intermediate",
};

const CaseInterview = ({ caseData, onComplete, onRestart }: CaseInterviewProps) => {
  const [phase, setPhase] = useState<Phase>("opening");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [clarifyingHintLevel, setClarifyingHintLevel] = useState(0);
  const [structureHintLevel, setStructureHintLevel] = useState(0);
  const [calculationHintLevel, setCalculationHintLevel] = useState(0);
  const [hintsUsedTotal, setHintsUsedTotal] = useState(0);
  const [hasRevealedMargin, setHasRevealedMargin] = useState(false);
  const [hasProvidedStructure, setHasProvidedStructure] = useState(false);
  const [calculationAttempts, setCalculationAttempts] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current hint level for the active phase
  const getCurrentHintLevel = (): number => {
    if (phase === "opening" || phase === "awaiting_clarifying") return clarifyingHintLevel;
    if (phase === "awaiting_structure") return structureHintLevel;
    if (phase === "awaiting_calculation" || phase === "data_revealed") return calculationHintLevel;
    return 0;
  };

  // Check if hints are available (max 3 per phase)
  const canUseHint = (): boolean => {
    if (phase === "complete" || phase === "calculation_feedback" || phase === "clarifying_revealed") return false;
    return getCurrentHintLevel() < 3;
  };

  // Initialize with opening message
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      addInterviewerMessage(
        `Welcome. Let me present your case.

**Situation:**
An international luxury car rental company charges **€220 per day** with advertised "unlimited" mileage.

**The Problem:**
Internally, all costs are calculated based on the assumption that customers drive no more than **300 km per day**. Recently, customers have been exceeding this limit more frequently.

**Your Task:**
Determine the price that should be charged for every additional kilometer driven above the 300 km limit.

*Before we proceed, what would you like to ask me?*`
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

  // Key Concepts for each phase - hitting these bypasses length requirements
  const clarifyingKeyConcepts = [
    "profitability", "margin", "goal", "objective", "expectation", "target",
    "profit", "return", "percentage", "how much", "requirement"
  ];
  
  const structureKeyConcepts = [
    "variable", "fixed", "cost", "depreciation", "maintenance", "wear",
    "tear", "personnel", "rent", "insurance"
  ];
  
  const calculationKeyConcepts = [
    "0.50", "0.5", "50 cent", "€0.50", "54.95", "54,95", "0.5495",
    "55 cent", "formula", "divide", "0.91", "1 - 0.09"
  ];

  // Smart validation: Check if input contains key concepts for current phase
  const hasKeyConcept = (input: string, phase: Phase): boolean => {
    const inputLower = input.toLowerCase();
    
    if (phase === "opening" || phase === "awaiting_clarifying") {
      return clarifyingKeyConcepts.some(kw => inputLower.includes(kw));
    }
    if (phase === "awaiting_structure" || phase === "clarifying_revealed") {
      return structureKeyConcepts.some(kw => inputLower.includes(kw));
    }
    if (phase === "awaiting_calculation" || phase === "data_revealed") {
      return calculationKeyConcepts.some(kw => inputLower.includes(kw));
    }
    return false;
  };

  // Smart Response Gate: Low-effort only if NO key concepts AND too short
  const isLowEffortResponse = (input: string, currentPhase: Phase): boolean => {
    // Priority 1: If key concept detected, always allow
    if (hasKeyConcept(input, currentPhase)) {
      return false;
    }
    
    // Priority 2: Check length/pattern only if no key concepts
    const trimmed = input.trim().toLowerCase();
    const lowEffortPatterns = [
      /^[a-z]$/,           // Single letter
      /^(ok|okay|yes|no|start|begin|go|next|continue|hi|hello|hey|sure|yep|yeah|k|y|n)$/i,
      /^.{1,10}$/,         // Very short responses (less than 10 chars) without key concepts
    ];
    return lowEffortPatterns.some(pattern => pattern.test(trimmed));
  };

  // Handle the Hint button click
  const handleHintRequest = () => {
    if (!canUseHint() || isTyping) return;

    // Add a system message showing the hint request
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: "student",
      content: "💡 I'd like a hint, please.",
      timestamp: Date.now()
    }]);

    setHintsUsedTotal(prev => prev + 1);

    // Process hint based on current phase
    setTimeout(() => {
      processHintRequest();
    }, 300);
  };

  const processHintRequest = () => {
    if (phase === "opening" || phase === "awaiting_clarifying") {
      provideClarifyingHint();
    } else if (phase === "awaiting_structure") {
      provideStructureHint();
    } else if (phase === "awaiting_calculation" || phase === "data_revealed") {
      provideCalculationHint();
    }
  };

  const provideClarifyingHint = () => {
    const level = clarifyingHintLevel;
    setClarifyingHintLevel(prev => prev + 1);

    if (level === 0) {
      // Hint 1: Conceptual nudge
      addInterviewerMessage(
        `**Hint 1/3:** Think about what a business owner needs to know before setting a new price. What is their ultimate goal?`,
        "hint"
      );
    } else if (level === 1) {
      // Hint 2: Structural hint
      addInterviewerMessage(
        `**Hint 2/3:** You should ask about the company's **profitability targets** or what specific financial expectations they have for this pricing.`,
        "hint"
      );
    } else {
      // Hint 3: Direct reveal
      addInterviewerMessage(
        `**Hint 3/3 — Information Revealed:**

The company expects a **9% profit margin** and wants to maintain this level for the extra kilometers. Focus strictly on pricing.

Now, how would you structure your approach to find this price? What types of costs should we consider?`,
        "info"
      );
      setHasRevealedMargin(true);
      setPhase("awaiting_structure");
    }
  };

  const provideStructureHint = () => {
    const level = structureHintLevel;
    setStructureHintLevel(prev => prev + 1);

    if (level === 0) {
      // Hint 1: Conceptual nudge
      addInterviewerMessage(
        `**Hint 1/3:** Think about different categories of business costs. Some costs stay the same regardless of how much the car is driven. Others increase specifically when the car is driven more.`,
        "hint"
      );
    } else if (level === 1) {
      // Hint 2: Structural hint
      addInterviewerMessage(
        `**Hint 2/3:** You're looking for costs that scale with kilometers driven. Think about **maintenance** and **depreciation/wear & tear** — these are variable costs. Personnel and rent are fixed.`,
        "hint"
      );
    } else {
      // Hint 3: Direct reveal
      addInterviewerMessage(
        `**Hint 3/3 — Structure Revealed:**

**Fixed Costs** (don't change with km): Personnel, rent, insurance
**Variable Costs** (scale with km): Maintenance, depreciation/wear & tear

Here is the quantitative data:
• Fixed Costs: **€50** per rental
• Vehicle Purchase Price: **€100,000**
• Vehicle Resale Value: **€90,000** (after 20,000 km)

Now calculate the variable cost per km and the final price that maintains 9% margin.`,
        "info"
      );
      setHasProvidedStructure(true);
      setPhase("awaiting_calculation");
    }
  };

  const provideCalculationHint = () => {
    const level = calculationHintLevel;
    setCalculationHintLevel(prev => prev + 1);

    if (level === 0) {
      // Hint 1: Conceptual nudge
      addInterviewerMessage(
        `**Hint 1/3:** Start by figuring out how much it costs the company each time a car is driven one kilometer. Think about what happens to the car's value as it's driven.`,
        "hint"
      );
    } else if (level === 1) {
      // Hint 2: Structural hint
      addInterviewerMessage(
        `**Hint 2/3:** Calculate depreciation per km:
• Depreciation = (Purchase Price - Resale Value) ÷ Total km
• Then apply the **margin formula** (not markup!) to get the final price.`,
        "hint"
      );
    } else {
      // Hint 3: Direct reveal
      addInterviewerMessage(
        `**Hint 3/3 — Calculation Guide:**

**Step 1: Variable Cost**
Depreciation = €100,000 - €90,000 = €10,000
Variable Cost = €10,000 ÷ 20,000 km = **€0.50/km**

**Step 2: Apply Margin Formula**
⚠️ Use margin on price, NOT markup on cost!
Price = Cost ÷ (1 - Margin) = €0.50 ÷ 0.91 = ?

Now give me the final answer.`,
        "info"
      );
    }
  };

  const isHelpRequest = (input: string): boolean => {
    const trimmed = input.trim().toLowerCase();
    return /\b(help|hint|stuck|don'?t know|idk|no idea|not sure|confused|lost)\b/i.test(trimmed);
  };

  const checkForProfitabilityQuestion = (input: string): boolean => {
    const keywords = [
      "profit", "margin", "goal", "target", "expect", "profitability",
      "return", "percentage", "how much", "objective", "requirement"
    ];
    const inputLower = input.toLowerCase();
    return keywords.some(kw => inputLower.includes(kw));
  };

  const checkForCostStructure = (input: string): boolean => {
    const inputLower = input.toLowerCase();
    const hasFixed = inputLower.includes("fixed");
    const hasVariable = inputLower.includes("variable");
    const hasDepreciation = inputLower.includes("depreciation") || inputLower.includes("wear");
    const hasMaintenance = inputLower.includes("maintenance") || inputLower.includes("repair");
    
    // Must mention both fixed AND variable, plus at least one specific cost type
    return (hasFixed && hasVariable) && (hasDepreciation || hasMaintenance);
  };

  const analyzeCalculation = (input: string): { correct: boolean; hasIncorrectMethod: boolean; hasVariableCost: boolean } => {
    const inputLower = input.toLowerCase();
    
    // Check for correct answer (54.95, 0.5495, 55 cents rounded)
    const hasCorrectAnswer = 
      inputLower.includes("54.95") || 
      inputLower.includes("0.5495") ||
      inputLower.includes("54,95") ||
      (inputLower.includes("55") && inputLower.includes("cent"));
    
    // Check for incorrect method (multiplying by 1.09)
    const hasIncorrectMethod = 
      inputLower.includes("54.5") || 
      inputLower.includes("0.545") ||
      inputLower.includes("54,5") ||
      (inputLower.includes("1.09") && inputLower.includes("0.5"));
    
    // Check if they at least got the variable cost right
    const hasVariableCost = 
      inputLower.includes("0.50") || 
      inputLower.includes("0.5 eur") ||
      inputLower.includes("50 cent") ||
      inputLower.includes("€0.50");
    
    return { correct: hasCorrectAnswer, hasIncorrectMethod, hasVariableCost };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping || phase === "complete") return;

    const studentInput = inputValue.trim();
    
    // Add student message
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: "student",
      content: studentInput,
      timestamp: Date.now()
    }]);
    
    setInputValue("");

    // Process based on current phase
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
      case "clarifying_revealed":
        handlePostClarifyingPhase(input);
        break;
      case "awaiting_structure":
        handleStructurePhase(input);
        break;
      case "data_revealed":
        handlePreCalculationPhase(input);
        break;
      case "awaiting_calculation":
        handleCalculationPhase(input);
        break;
      case "calculation_feedback":
        handlePostCalculationPhase(input);
        break;
    }
  };

  const handleOpeningPhase = (input: string) => {
    // Check for low-effort response - friendly guidance
    if (isLowEffortResponse(input, "opening")) {
      addInterviewerMessage(
        `To get the most out of this practice, please try to explain your reasoning. 

If you're stuck, use the **"Need a Hint?"** button above to get guidance!

*What clarifying questions do you have regarding the client's goals or the scope of this project?*`,
        "hint"
      );
      setPhase("awaiting_clarifying");
      return;
    }

    // Check if they asked about profitability
    if (checkForProfitabilityQuestion(input)) {
      revealMarginInfo();
    } else {
      // Good effort but didn't ask the key question - move to clarifying phase
      addInterviewerMessage(
        `Good start. Those are reasonable considerations.

However, I'd encourage you to think more strategically. *What clarifying questions do you have regarding the client's goals or the scope of this project?*`,
        "hint"
      );
      setPhase("awaiting_clarifying");
    }
  };

  const handleClarifyingPhase = (input: string) => {
    // Friendly guidance for low-effort responses
    if (isLowEffortResponse(input, "awaiting_clarifying")) {
      addInterviewerMessage(
        `To get the most out of this practice, please try to explain your reasoning.

If you're stuck, use the **"Need a Hint?"** button to get guidance!`,
        "hint"
      );
      return;
    }

    // Check if they asked about profitability
    if (checkForProfitabilityQuestion(input)) {
      revealMarginInfo();
      return;
    }

    // Handle help requests with hint ladder
    if (isHelpRequest(input)) {
      setClarifyingHintLevel(prev => prev + 1);
      
      if (clarifyingHintLevel === 0) {
        // Hint 1: Conceptual nudge
        addInterviewerMessage(
          `Think about what a business owner would care about before setting a new price. What financial outcomes matter most to them?`,
          "hint"
        );
      } else if (clarifyingHintLevel === 1) {
        // Hint 2: Structural hint
        addInterviewerMessage(
          `Consider this: Would you want to know if there is a **specific profit goal** the company is aiming for?`,
          "hint"
        );
      } else {
        // Hint 3: The reveal
        addInterviewerMessage(
          `I'll share this with you: The company expects a **9% profit margin**. This is the key constraint for your pricing calculation.

Now, how would you structure your approach to find this price? What types of costs should we consider?`,
          "info"
        );
        setHasRevealedMargin(true);
        setPhase("awaiting_structure");
      }
      return;
    }

    // Not a help request, but also not asking about profitability
    setClarifyingHintLevel(prev => prev + 1);
    
    if (clarifyingHintLevel >= 2) {
      // After multiple attempts, give the direct hint
      addInterviewerMessage(
        `Let me help you: Would you want to know if there is a **specific profit goal** the company is aiming for?`,
        "hint"
      );
    } else {
      addInterviewerMessage(
        `Think about what financial metrics a company typically optimizes for. What targets might drive their pricing decisions?`,
        "hint"
      );
    }
  };

  const revealMarginInfo = () => {
    setHasRevealedMargin(true);
    addInterviewerMessage(
      `Good question. Here's the key information:

• **Profitability Target:** The company expects a **9% profit margin** and wants to maintain this level.
• **Current State:** The existing €220/day rate for 300 km achieves this 9% margin.
• **Scope:** Focus strictly on **pricing** — you can ignore marketing, operations, and competitive factors.

Now, how would you structure your approach to find this price? What types of costs should we consider?`,
      "info"
    );
    setPhase("awaiting_structure");
  };

  const handlePostClarifyingPhase = (input: string) => {
    // They got the margin info, now checking for structure
    handleStructurePhase(input);
  };

  const handleStructurePhase = (input: string) => {
    // Friendly guidance for low-effort responses
    if (isLowEffortResponse(input, "awaiting_structure")) {
      addInterviewerMessage(
        `To get the most out of this practice, please try to explain your reasoning.

If you're stuck, use the **"Need a Hint?"** button to get guidance!`,
        "hint"
      );
      return;
    }

    // Handle help requests with hint ladder
    if (isHelpRequest(input)) {
      setStructureHintLevel(prev => prev + 1);
      
      if (structureHintLevel === 0) {
        // Hint 1: Conceptual nudge
        addInterviewerMessage(
          `Think about different categories of business costs. Some costs stay the same regardless of how much the car is driven. Others increase specifically when the car is driven more.`,
          "hint"
        );
      } else if (structureHintLevel === 1) {
        // Hint 2: Structural hint
        addInterviewerMessage(
          `You're looking for costs that increase specifically when the car is driven more. Think about **maintenance** and **depreciation/wear & tear** — these are variable costs that scale with kilometers.`,
          "hint"
        );
      } else {
        // Hint 3: The reveal
        addInterviewerMessage(
          `Here's the structure you need:

**Fixed Costs** (don't change with km): Personnel, rent, insurance
**Variable Costs** (scale with km): Maintenance, depreciation/wear & tear

Now categorize the costs in your own words, then I'll give you the data.`,
          "info"
        );
      }
      return;
    }

    // Check if they properly structured costs
    if (checkForCostStructure(input)) {
      setHasProvidedStructure(true);
      addInterviewerMessage(
        `Excellent cost categorization. You correctly identified:

**Fixed Costs** (per rental): Personnel, rent, insurance, marketing — don't change with km driven.
**Variable Costs** (per km): Maintenance, repairs, depreciation/wear — scale with usage.

Here is the quantitative data you'll need:

📊 **Cost Data:**
• Fixed Costs: **€50** per rental/vehicle
• Vehicle Purchase Price: **€100,000**
• Vehicle Resale Value: **€90,000** (after 20,000 km of usage)

Using this data, please calculate:
1. The variable cost per kilometer
2. The price per additional kilometer that maintains the 9% margin

*Show me your step-by-step calculations.*`,
        "success"
      );
      setPhase("awaiting_calculation");
    } else {
      // They haven't properly structured the costs
      setStructureHintLevel(prev => prev + 1);
      
      if (structureHintLevel >= 2) {
        addInterviewerMessage(
          `I need you to explicitly categorize costs into **Fixed** and **Variable**. 

Which costs stay the same regardless of distance driven? Which costs increase as more kilometers are driven?

Specifically mention: depreciation, maintenance, personnel, and rent.`,
          "hint"
        );
      } else {
        addInterviewerMessage(
          `You're on the right track, but I need you to be more specific.

Think about which costs change when someone drives more kilometers vs. which costs stay the same regardless of distance driven.

Can you categorize the relevant costs into **Fixed** and **Variable** categories? What specific cost items fall into each?`,
          "hint"
        );
      }
    }
  };

  const handlePreCalculationPhase = (input: string) => {
    // Move to calculation phase
    handleCalculationPhase(input);
  };

  const handleCalculationPhase = (input: string) => {
    // Friendly guidance for low-effort responses
    if (isLowEffortResponse(input, "awaiting_calculation")) {
      addInterviewerMessage(
        `To get the most out of this practice, please show your step-by-step calculations.

If you're stuck, use the **"Need a Hint?"** button to get guidance!`,
        "hint"
      );
      return;
    }

    // Handle help requests with hint ladder
    if (isHelpRequest(input)) {
      setCalculationHintLevel(prev => prev + 1);
      
      if (calculationHintLevel === 0) {
        // Hint 1: Conceptual nudge
        addInterviewerMessage(
          `Start by figuring out how much it costs the company each time a car is driven one kilometer. Think about what happens to the car's value as it's driven.`,
          "hint"
        );
      } else if (calculationHintLevel === 1) {
        // Hint 2: Structural hint
        addInterviewerMessage(
          `**Step 1:** Calculate depreciation per km using:
(Purchase Price - Resale Value) ÷ Total km driven

**Step 2:** Then apply the margin formula to get the final price.

Now try the calculation.`,
          "hint"
        );
      } else {
        // Hint 3: The reveal
        addInterviewerMessage(
          `Here's the calculation:

**Variable Cost per km:**
Depreciation = €100,000 - €90,000 = €10,000
Variable Cost = €10,000 ÷ 20,000 km = **€0.50/km**

**Price Formula (for margin on price):**
Price = Cost ÷ (1 - Margin) = €0.50 ÷ 0.91 = ?

Now apply this formula and give me the final answer.`,
          "info"
        );
      }
      return;
    }

    const { correct, hasIncorrectMethod, hasVariableCost } = analyzeCalculation(input);
    setCalculationAttempts(prev => prev + 1);

    if (correct) {
      // Correct answer!
      addInterviewerMessage(
        `✓ **Excellent work!** Your calculation is correct.

Let me verify your steps:

**Step 1: Variable Cost per km**
Depreciation = €100,000 - €90,000 = €10,000
Variable Cost = €10,000 ÷ 20,000 km = **€0.50/km** ✓

**Step 2: Additional KM Price**
Price = Cost ÷ (1 - Margin)
Price = €0.50 ÷ 0.91 = **€0.5495** ✓

**Final Answer: 54.95 cents per additional kilometer**

Key insight: Fixed costs are ignored for additional km because they're already covered by the base 300 km rate.`,
        "success"
      );
      setPhase("calculation_feedback");
      
      setTimeout(() => {
        showConclusion(true);
      }, 3000);
      
    } else if (hasIncorrectMethod) {
      // They made the common markup vs margin mistake - REJECT IT
      addInterviewerMessage(
        `⚠️ **That is a markup on cost, not a margin on price.**

Your variable cost calculation is correct (€0.50/km). However, you've applied a **markup to cost** rather than calculating a **margin on price**.

• **Your method:** €0.50 × 1.09 = €0.545 ❌
• This gives 9% *above cost*, not 9% *of the final selling price*

**The Correct Formula:**
The client requires a 9% margin on the **final price**. Use:
$$\\text{Price} = \\text{Variable Cost} \\div (1 - \\text{Margin})$$

Please recalculate using this formula.`,
        "warning"
      );
      
    } else if (hasVariableCost) {
      // They got variable cost but need help with the margin
      addInterviewerMessage(
        `You've correctly identified the variable cost (€0.50/km). Now for the final step:

The company needs a **9% margin on the selling price** (not on cost).

Remember:
• Margin = Profit ÷ Price
• So: Price = Cost ÷ (1 - Margin)

Apply this formula to your €0.50 variable cost with a 9% margin requirement.`,
        "hint"
      );
      
    } else {
      // Need more help - use hint ladder approach
      setCalculationHintLevel(prev => prev + 1);
      
      if (calculationHintLevel >= 2) {
        addInterviewerMessage(
          `Let me guide you through the calculation:

**Step 1:** What is the depreciation per km?
• Depreciation = Purchase - Resale = €100,000 - €90,000 = €10,000
• Per km = €10,000 ÷ 20,000 km = ?

**Step 2:** Once you have the variable cost, apply the margin formula:
• Price = Cost ÷ (1 - Margin)

Try again with these hints.`,
          "hint"
        );
      } else {
        addInterviewerMessage(
          `I need to see your mathematical reasoning. Please show me:

1. How you calculated the variable cost per km (using the vehicle purchase/resale data)
2. How you applied the 9% margin to get the final price

Walk me through each step.`,
          "hint"
        );
      }
    }
  };

  const handlePostCalculationPhase = (input: string) => {
    // Already completed, just acknowledge
    showConclusion(true);
  };

  const showConclusion = (wasCorrect: boolean) => {
    setPhase("complete");
    
    const score = calculateScore(wasCorrect);
    
    setTimeout(() => {
      addInterviewerMessage(
        `**Case Complete — Performance Summary**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Final Answer:** The luxury car rental company should charge **54.95 cents (≈€0.55)** for each kilometer driven above the 300 km daily limit.

**Why Fixed Costs Are Ignored:**
Fixed costs (€50 per rental) are already covered by the base €220/day rate for the first 300 km. Additional kilometers only incur variable costs (depreciation/wear), so only those costs need to be recovered in the per-km price.

**Key Insights Demonstrated:**
${hasRevealedMargin ? "✓" : "○"} Asked about profitability targets before calculating
${hasProvidedStructure ? "✓" : "○"} Correctly categorized fixed vs. variable costs
${wasCorrect ? "✓" : "○"} Applied correct margin formula (Cost ÷ 0.91)
${wasCorrect ? "✓" : "○"} Understood that fixed costs are already covered

**Important Distinction:**
• Markup on cost: €0.50 × 1.09 = €0.545 ❌
• Margin on price: €0.50 ÷ 0.91 = €0.5495 ✓

**Your Score: ${score}%**

Well done completing this pricing case!`,
        "success"
      );
      
      // Trigger completion after showing summary
      setTimeout(() => {
        onComplete({}, timeElapsed, score);
      }, 2000);
      
    }, 1000);
  };

  const calculateScore = (wasCorrect: boolean): number => {
    let score = 0;
    
    if (hasRevealedMargin) score += 25;      // Asked good clarifying questions
    if (hasProvidedStructure) score += 25;   // Structured costs properly
    if (wasCorrect) score += 50;             // Got the right answer
    
    // Bonus for efficiency
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
      case "data_revealed": return 3;
      case "awaiting_calculation": return 3;
      case "calculation_feedback": return 4;
      case "complete": return 5;
      default: return 1;
    }
  };

  const phases = [
    { num: 1, label: "Opening" },
    { num: 2, label: "Clarify" },
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
            {/* Hint Button Row */}
            {canUseHint() && (
              <div className="flex items-center justify-between mb-3">
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

export default CaseInterview;
