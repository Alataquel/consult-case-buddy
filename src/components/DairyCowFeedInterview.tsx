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

interface DairyCowFeedInterviewProps {
  caseData: InterviewCase;
  onComplete: (answers: Record<string, string>, timeElapsed: number, score: number) => void;
  onRequestRating: (score: number) => void;
  onRestart: () => void;
}

type Phase = 
  | "opening" 
  | "awaiting_clarifying" 
  | "clarifying_revealed" 
  | "awaiting_framework" 
  | "awaiting_cows_calculation"
  | "cows_feedback" 
  | "awaiting_feed_calculation" 
  | "feed_feedback"
  | "awaiting_revenue_calculation"
  | "revenue_feedback"
  | "awaiting_recommendation"
  | "complete";

// Dairy Cow Feed case configuration
export const dairyCowFeedCase: InterviewCase = {
  id: "dairy-cow-feed-india-entry",
  title: "Dairy Cow Feed — Indian Market Entry",
  firm: "Market Entry",
  type: "Market Entry",
  difficulty: "Intermediate",
};

const DairyCowFeedInterview = ({ caseData, onComplete, onRequestRating, onRestart }: DairyCowFeedInterviewProps) => {
  const [phase, setPhase] = useState<Phase>("opening");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [clarifyingHintLevel, setClarifyingHintLevel] = useState(0);
  const [frameworkHintLevel, setFrameworkHintLevel] = useState(0);
  const [cowsHintLevel, setCowsHintLevel] = useState(0);
  const [feedHintLevel, setFeedHintLevel] = useState(0);
  const [revenueHintLevel, setRevenueHintLevel] = useState(0);
  const [recommendationHintLevel, setRecommendationHintLevel] = useState(0);
  const [hintsUsedTotal, setHintsUsedTotal] = useState(0);
  const [hasIdentifiedFramework, setHasIdentifiedFramework] = useState(false);
  const [hasCalculatedCows, setHasCalculatedCows] = useState(false);
  const [hasCalculatedFeed, setHasCalculatedFeed] = useState(false);
  const [hasCalculatedRevenue, setHasCalculatedRevenue] = useState(false);
  const [hasReachedConclusion, setHasReachedConclusion] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [revealedInfo, setRevealedInfo] = useState({ productType: false, exportShare: false, evaluationMetric: false });
  
  // Track hints used at time of completing each milestone (for scoring)
  const [clarifyHintsAtCompletion, setClarifyHintsAtCompletion] = useState<number | null>(null);
  const [frameworkHintsAtCompletion, setFrameworkHintsAtCompletion] = useState<number | null>(null);
  const [cowsHintsAtCompletion, setCowsHintsAtCompletion] = useState<number | null>(null);
  const [feedHintsAtCompletion, setFeedHintsAtCompletion] = useState<number | null>(null);
  const [revenueHintsAtCompletion, setRevenueHintsAtCompletion] = useState<number | null>(null);
  const [recommendationHintsAtCompletion, setRecommendationHintsAtCompletion] = useState<number | null>(null);
  
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
    if (phase === "awaiting_framework" || phase === "clarifying_revealed") return frameworkHintLevel;
    if (phase === "awaiting_cows_calculation") return cowsHintLevel;
    if (phase === "awaiting_feed_calculation" || phase === "cows_feedback") return feedHintLevel;
    if (phase === "awaiting_revenue_calculation" || phase === "feed_feedback") return revenueHintLevel;
    if (phase === "awaiting_recommendation" || phase === "revenue_feedback") return recommendationHintLevel;
    return 0;
  };

  const canUseHint = (): boolean => {
    if (phase === "complete") return false;
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
Our client is a German company that specializes in high-performance feed for dairy cows. They have built a strong position in the saturated German market over the past decade.

**Key Context:**
The company is now considering expanding into **India** as a growth opportunity. They need to understand whether this market entry is economically attractive.

**Your Task:**
Determine the size of the Indian market for dairy cow feed and assess whether entry is economically attractive for our client.

*Before we dive into the analysis, what clarifying questions do you have about the product, the market, or the evaluation criteria?*`
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
        timestamp: timeElapsed,
        type
      }]);
      setIsTyping(false);
    }, delay);
  };

  const addStudentMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: "student",
      content,
      timestamp: timeElapsed
    }]);
  };

  const addSystemMessage = (content: string, type: "info" | "warning" | "success" | "hint") => {
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      role: "system",
      content,
      timestamp: timeElapsed,
      type
    }]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userInput = inputValue.trim();
    addStudentMessage(userInput);
    setInputValue("");
    
    processResponse(userInput);
  };

  const processResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    switch (phase) {
      case "opening":
      case "awaiting_clarifying":
        handleClarifyingPhase(lowerInput, input);
        break;
      case "clarifying_revealed":
      case "awaiting_framework":
        handleFrameworkPhase(lowerInput, input);
        break;
      case "awaiting_cows_calculation":
        handleCowsCalculation(lowerInput, input);
        break;
      case "cows_feedback":
      case "awaiting_feed_calculation":
        handleFeedCalculation(lowerInput, input);
        break;
      case "feed_feedback":
      case "awaiting_revenue_calculation":
        handleRevenueCalculation(lowerInput, input);
        break;
      case "revenue_feedback":
      case "awaiting_recommendation":
        handleRecommendation(lowerInput, input);
        break;
      default:
        addInterviewerMessage("Let's wrap up here. Thank you for your analysis.");
    }
  };

  const handleClarifyingPhase = (lowerInput: string, originalInput: string) => {
    const asksAboutProduct = /product|feed|type|concentrated|what.*sell|offering|specification/i.test(lowerInput);
    const asksAboutExport = /export|domestic|local|international|who.*buy|target.*market|purpose.*milk/i.test(lowerInput);
    const asksAboutMetric = /metric|measure|success|criteria|how.*evaluate|kpi|turnover|revenue|profit/i.test(lowerInput);
    const asksAboutMarket = /market.*size|india.*market|competition|competitor/i.test(lowerInput);
    
    let response = "";
    let revealedAny = false;
    
    if (asksAboutProduct && !revealedInfo.productType) {
      response += `**Product Type:** The feed is a "concentrated feed" composed of wheat, soy, and corn. It's specifically designed to stimulate and increase milk production in dairy cows.\n\n`;
      setRevealedInfo(prev => ({ ...prev, productType: true }));
      revealedAny = true;
    }
    
    if (asksAboutExport && !revealedInfo.exportShare) {
      response += `**Export Context:** In India, roughly 20% of the annual milk production is intended for export to international markets. The remaining 80% serves domestic consumption.\n\n`;
      setRevealedInfo(prev => ({ ...prev, exportShare: true }));
      revealedAny = true;
    }
    
    if ((asksAboutMetric || asksAboutMarket) && !revealedInfo.evaluationMetric) {
      response += `**Evaluation Metric:** The decision to enter will be based on the potential total revenue (Turnover) the client can achieve in the Indian market.\n\n`;
      setRevealedInfo(prev => ({ ...prev, evaluationMetric: true }));
      revealedAny = true;
    }
    
    if (revealedAny) {
      // Capture hints at clarify completion
      if (clarifyHintsAtCompletion === null) {
        setClarifyHintsAtCompletion(clarifyingHintLevel);
      }
      
      const allRevealed = (revealedInfo.productType || asksAboutProduct) && 
                          (revealedInfo.exportShare || asksAboutExport) && 
                          (revealedInfo.evaluationMetric || asksAboutMetric || asksAboutMarket);
      
      if (allRevealed) {
        response += `Excellent clarifying questions! You've gathered the key information.\n\n*Now, how would you approach structuring this market sizing problem? Walk me through your framework.*`;
        setPhase("awaiting_framework");
      } else {
        response += `Good question. Do you have any other clarifying questions before we proceed with the analysis?`;
        setPhase("awaiting_clarifying");
      }
      
      addInterviewerMessage(response);
    } else {
      // Check if they want to proceed without asking all questions
      const wantsToProceed = /proceed|continue|ready|framework|structure|let.*start|move.*on|analyze/i.test(lowerInput);
      
      if (wantsToProceed) {
        // Reveal remaining info
        let infoReveal = "Before we proceed, let me share some key information:\n\n";
        if (!revealedInfo.productType) {
          infoReveal += `**Product Type:** The feed is a "concentrated feed" (wheat, soy, corn) designed to stimulate milk production.\n\n`;
        }
        if (!revealedInfo.exportShare) {
          infoReveal += `**Export Context:** In India, roughly 20% of annual milk production is intended for export.\n\n`;
        }
        if (!revealedInfo.evaluationMetric) {
          infoReveal += `**Evaluation Metric:** The decision will be based on potential total revenue (Turnover).\n\n`;
        }
        
        if (clarifyHintsAtCompletion === null) {
          setClarifyHintsAtCompletion(clarifyingHintLevel);
        }
        
        infoReveal += `*Now, how would you approach structuring this market sizing problem? Walk me through your framework.*`;
        
        setRevealedInfo({ productType: true, exportShare: true, evaluationMetric: true });
        setPhase("awaiting_framework");
        addInterviewerMessage(infoReveal);
      } else {
        addInterviewerMessage(`That's not quite what I was looking for. Think about what you need to understand about the **product**, the **target market**, or how we'll **evaluate** the opportunity. What would you like to clarify?`);
      }
    }
  };

  const handleFrameworkPhase = (lowerInput: string, originalInput: string) => {
    const mentionsTopDown = /top.*down|population|consumption|demand|supply|people.*cow|cow.*people/i.test(lowerInput);
    const mentionsCows = /cow|cattle|livestock|herd|dairy.*animal/i.test(lowerInput);
    const mentionsFeed = /feed|consumption|kg|kilogram|ton/i.test(lowerInput);
    const mentionsRevenue = /revenue|turnover|market.*share|price|sell|€|euro/i.test(lowerInput);
    const mentionsMilk = /milk|production|liter|litre|domestic|export/i.test(lowerInput);
    
    const hasGoodFramework = (mentionsTopDown || mentionsMilk) && (mentionsCows || mentionsFeed);
    
    if (hasGoodFramework) {
      if (frameworkHintsAtCompletion === null) {
        setFrameworkHintsAtCompletion(frameworkHintLevel);
      }
      setHasIdentifiedFramework(true);
      
      addInterviewerMessage(
        `Good framework! You've identified the top-down market sizing approach. Let me confirm the structure:

**Step 1:** Determine total dairy cows in India (from milk demand)
**Step 2:** Calculate total feed market (cows × consumption)
**Step 3:** Estimate client revenue (market share × price)

Let's start with Step 1. 

**Data Available:**
- India's population: **1.3 billion**
- Share consuming milk: **80%**
- Average milk consumption: **2 liters per person per week** (~100 L/year)
- Dairy cow production: **~3,500 liters per cow per year**
- **20% of milk is for export**

*Based on this data, how many dairy cows does India need? Walk me through your calculation.*`,
        "success"
      );
      setPhase("awaiting_cows_calculation");
    } else {
      const isVague = lowerInput.length < 50 || !/step|first|then|next|finally/i.test(lowerInput);
      
      if (isVague) {
        addInterviewerMessage(
          `I need more structure. When sizing a market, you should think about:

1. **Demand drivers** — Who needs this product? How do we estimate the number of customers (cows)?
2. **Volume estimation** — How much product does each customer (cow) consume?
3. **Revenue calculation** — What's our potential share and pricing?

Can you walk me through your approach step by step?`
        );
      } else {
        addInterviewerMessage(
          `You're on the right track, but let's be more specific. For a **feed** market, we need to know:

1. How many **dairy cows** are in India?
2. How much feed does each cow **consume**?
3. What's our potential **revenue**?

How would you estimate the number of dairy cows in India?`
        );
      }
    }
  };

  const handleCowsCalculation = (lowerInput: string, originalInput: string) => {
    // Looking for key numbers: 29-35 million cows
    const mentionsBillionConsumers = /1\.04|billion.*consumer|1,040|1040/i.test(lowerInput);
    const mentions35People = /35.*people|support.*35|one.*cow.*35|cow.*feed.*35/i.test(lowerInput);
    const mentions29M = /29.*million|30.*million/i.test(lowerInput);
    const mentions35M = /35.*million|~35/i.test(lowerInput);
    const mentionsExportAdjustment = /1\.2|20.*percent.*more|export.*add|multiply.*export|factor.*export/i.test(lowerInput);
    
    const hasCorrectLogic = (mentionsBillionConsumers || mentions35People) && (mentions29M || mentions35M);
    const hasExportLogic = mentionsExportAdjustment || mentions35M;
    
    if (hasCorrectLogic) {
      if (cowsHintsAtCompletion === null) {
        setCowsHintsAtCompletion(cowsHintLevel);
      }
      setHasCalculatedCows(true);
      
      let response = `Excellent calculation! Let me verify:\n\n`;
      response += `• **Milk consumers:** 1.3B × 80% = **1.04 billion people**\n`;
      response += `• **Cows per person:** 3,500L ÷ 100L = 1 cow supports **35 people**\n`;
      response += `• **Domestic cows needed:** 1.04B ÷ 35 = **~29 million cows**\n`;
      
      if (hasExportLogic) {
        response += `• **Including exports (×1.2):** 29M × 1.2 = **~35 million dairy cows**\n\n`;
        response += `Perfect! You correctly accounted for the 20% export volume.\n\n`;
      } else {
        response += `\n⚠️ Don't forget: 20% of milk is for **export**. We need to increase by a factor of 1.2.\n`;
        response += `• **Total cows:** 29M × 1.2 = **~35 million dairy cows**\n\n`;
      }
      
      response += `Now for Step 2: **Feed Market Size**\n\n`;
      response += `**Additional Data:**\n`;
      response += `- A dairy cow consumes approximately **38 kg of concentrated feed per day**\n`;
      response += `- Assume 365 days of feeding\n\n`;
      response += `*What is the total annual market size for dairy cow feed in India (in kg or tons)?*`;
      
      addInterviewerMessage(response, "success");
      setPhase("awaiting_feed_calculation");
    } else {
      // Check if they're on the wrong track
      const hasWrongNumbers = /100.*million|50.*million|10.*million/i.test(lowerInput);
      
      if (hasWrongNumbers) {
        addInterviewerMessage(
          `Let me help you check your math. The key steps are:

1. **Milk consumers:** 1.3 billion × 80% = ?
2. **Cows needed per person:** If one cow produces 3,500L/year and one person consumes 100L/year, how many people can one cow support?
3. **Total domestic cows:** Consumers ÷ People per cow = ?
4. **Adjust for exports:** Multiply by 1.2 (for the 20% export volume)

Try the calculation again.`
        );
      } else {
        addInterviewerMessage(
          `I see you're working on it, but I need to see the numbers more clearly. 

Start with: How many people in India consume milk? Then figure out how many cows are needed to support them.

Remember:
- 1 cow = 3,500 L/year
- 1 person = ~100 L/year
- So 1 cow supports how many people?`
        );
      }
    }
  };

  const handleFeedCalculation = (lowerInput: string, originalInput: string) => {
    // Looking for: ~485 billion kg or similar
    const mentionsDailyCalc = /38.*kg|kg.*38|feed.*day/i.test(lowerInput);
    const mentions35MCows = /35.*million.*cow|35M/i.test(lowerInput);
    const mentionsBillionKg = /485|480|490|billion.*kg|~500.*billion/i.test(lowerInput);
    const mentionsTons = /485.*million.*ton|480.*million.*ton|~500.*million.*ton/i.test(lowerInput);
    
    const hasCorrectAnswer = mentionsBillionKg || mentionsTons;
    const hasCorrectLogic = mentionsDailyCalc && mentions35MCows;
    
    if (hasCorrectAnswer || hasCorrectLogic) {
      if (feedHintsAtCompletion === null) {
        setFeedHintsAtCompletion(feedHintLevel);
      }
      setHasCalculatedFeed(true);
      
      let response = `Great calculation! Here's the verification:\n\n`;
      response += `• **Daily feed per cow:** 38 kg\n`;
      response += `• **Annual feed per cow:** 38 × 365 = **13,870 kg/year**\n`;
      response += `• **Total market:** 35M cows × 13,870 kg = **~485 billion kg/year**\n\n`;
      response += `That's approximately **485 million metric tons** of feed annually!\n\n`;
      response += `Now for the final step: **Client Revenue Potential**\n\n`;
      response += `**Assumptions to use:**\n`;
      response += `- Client's realistic market share: **5%**\n`;
      response += `- Price per kg of feed: **€0.10/kg**\n\n`;
      response += `*What is the client's potential annual revenue in this market?*`;
      
      addInterviewerMessage(response, "success");
      setPhase("awaiting_revenue_calculation");
    } else {
      addInterviewerMessage(
        `Let me help structure this calculation:

**Feed Market = Total Cows × Feed per Cow per Year**

We have:
- 35 million cows
- 38 kg of feed per cow per day
- 365 days per year

So annual feed per cow = 38 × 365 = ?
Total market = 35 million × annual feed per cow = ?

Give me the final number in kg or tons.`
      );
    }
  };

  const handleRevenueCalculation = (lowerInput: string, originalInput: string) => {
    // Looking for: ~€2.4 billion or similar
    const mentionsMarketShare = /5.*percent|5%|market.*share/i.test(lowerInput);
    const mentionsPrice = /€0\.10|0\.10.*€|10.*cent|€0,10/i.test(lowerInput);
    const mentionsBillionRevenue = /2\.4.*billion|€2\.4|2,4.*billion|~2.*billion|2\.43/i.test(lowerInput);
    const mentionsVolume = /24.*billion.*kg|24,3|24\.3/i.test(lowerInput);
    
    const hasCorrectAnswer = mentionsBillionRevenue;
    const hasCorrectLogic = mentionsMarketShare && mentionsVolume;
    
    if (hasCorrectAnswer || hasCorrectLogic) {
      if (revenueHintsAtCompletion === null) {
        setRevenueHintsAtCompletion(revenueHintLevel);
      }
      setHasCalculatedRevenue(true);
      
      let response = `Excellent! Here's the revenue calculation:\n\n`;
      response += `• **Total market:** 485 billion kg\n`;
      response += `• **Client's share (5%):** 485B × 5% = **24.25 billion kg**\n`;
      response += `• **Revenue:** 24.25B kg × €0.10/kg = **~€2.4 billion per year**\n\n`;
      response += `That's a substantial market opportunity!\n\n`;
      response += `**Final Question:** Based on this analysis, what is your recommendation to the client? Should they enter the Indian market? What factors should they consider beyond the market size?`;
      
      addInterviewerMessage(response, "success");
      setPhase("awaiting_recommendation");
    } else {
      addInterviewerMessage(
        `Let's calculate the revenue step by step:

**Client Revenue = Market Size × Market Share × Price per kg**

We have:
- Total market: 485 billion kg
- Market share: 5%
- Price: €0.10/kg

First, what's 5% of 485 billion kg?
Then multiply by the price per kg.

What's the annual revenue potential?`
      );
    }
  };

  const handleRecommendation = (lowerInput: string, originalInput: string) => {
    const mentionsEntry = /enter|proceed|go.*ahead|attractive|opportunity|recommend.*entry/i.test(lowerInput);
    const mentionsRisks = /risk|challenge|competition|local|infrastructure|distribution|logistics|regulation/i.test(lowerInput);
    const mentionsConsiderations = /consider|factor|however|but|although|caveat/i.test(lowerInput);
    
    const hasGoodRecommendation = mentionsEntry && (mentionsRisks || mentionsConsiderations);
    
    if (hasGoodRecommendation || originalInput.length > 150) {
      if (recommendationHintsAtCompletion === null) {
        setRecommendationHintsAtCompletion(recommendationHintLevel);
      }
      setHasReachedConclusion(true);
      showConclusion();
    } else {
      addInterviewerMessage(
        `Good start, but I'd like to hear a more complete recommendation. Consider:

1. **Your recommendation:** Should the client enter? Why or why not?
2. **Key opportunities:** What makes this market attractive?
3. **Key risks:** What challenges might they face?
4. **Next steps:** What should the client investigate further?

Give me a comprehensive recommendation.`
      );
    }
  };

  const showConclusion = () => {
    const score = calculateScore();
    setFinalScore(score);
    setPhase("complete");
    
    setTimeout(() => {
      addInterviewerMessage(
        `**Excellent work! Case Complete.**

---

**Summary of Analysis:**

You successfully sized the Indian dairy cow feed market using a top-down approach:

1. **Dairy Cows:** ~35 million (including export demand)
2. **Total Feed Market:** ~485 billion kg/year
3. **Client Revenue Potential:** ~€2.4 billion/year (at 5% share)

**Key Considerations for Entry:**
- ✅ Large market opportunity (€2.4B potential)
- ⚠️ Local competition and established players
- ⚠️ Distribution and logistics infrastructure
- ⚠️ Price sensitivity in Indian market
- ⚠️ Regulatory requirements for feed imports

---

**Your Score: ${score}/100**

${score >= 80 ? "🌟 Outstanding performance! You demonstrated strong market sizing skills." : 
  score >= 60 ? "👍 Good work! You covered the key elements of the analysis." : 
  "📚 Keep practicing! Focus on structuring your calculations more clearly."}

*Click "Leave Case" to rate this case and return to the library.*`,
        "success"
      );
    }, 500);
  };

  const calculateScore = (): number => {
    let score = 0;
    
    // Milestone 1: Clarifying Questions (20 pts)
    const clarifyHints = clarifyHintsAtCompletion ?? clarifyingHintLevel;
    if (clarifyHints === 0) score += 20;
    else if (clarifyHints === 1) score += 12;
    else score += 0;
    
    // Milestone 2: Framework (20 pts)
    const frameworkHints = frameworkHintsAtCompletion ?? frameworkHintLevel;
    if (hasIdentifiedFramework) {
      if (frameworkHints === 0) score += 20;
      else if (frameworkHints === 1) score += 12;
      else score += 0;
    }
    
    // Milestone 3: Cows Calculation (20 pts)
    const cowsHints = cowsHintsAtCompletion ?? cowsHintLevel;
    if (hasCalculatedCows) {
      if (cowsHints === 0) score += 20;
      else if (cowsHints === 1) score += 10;
      else score += 0;
    }
    
    // Milestone 4: Feed Calculation (15 pts)
    const feedHints = feedHintsAtCompletion ?? feedHintLevel;
    if (hasCalculatedFeed) {
      if (feedHints === 0) score += 15;
      else if (feedHints === 1) score += 8;
      else score += 0;
    }
    
    // Milestone 5: Revenue Calculation (15 pts)
    const revenueHints = revenueHintsAtCompletion ?? revenueHintLevel;
    if (hasCalculatedRevenue) {
      if (revenueHints === 0) score += 15;
      else if (revenueHints === 1) score += 8;
      else score += 0;
    }
    
    // Milestone 6: Recommendation (10 pts)
    const recHints = recommendationHintsAtCompletion ?? recommendationHintLevel;
    if (hasReachedConclusion) {
      if (recHints === 0) score += 10;
      else if (recHints === 1) score += 5;
      else score += 0;
    }
    
    return Math.min(100, Math.max(0, score));
  };

  const handleHintRequest = () => {
    if (!canUseHint()) return;
    
    setHintsUsedTotal(prev => prev + 1);
    
    if (phase === "opening" || phase === "awaiting_clarifying") {
      const newLevel = clarifyingHintLevel + 1;
      setClarifyingHintLevel(newLevel);
      
      if (newLevel === 1) {
        addSystemMessage(
          `💡 **Hint 1:** Think about what you need to understand before sizing a market. Consider: What exactly is the product? Who is the target customer? How will success be measured?`,
          "hint"
        );
      } else if (newLevel === 2) {
        addSystemMessage(
          `💡 **Hint 2:** Ask about: (1) Product type and specifications, (2) Whether the milk is for domestic or export, (3) What metric the client will use to evaluate the opportunity.`,
          "hint"
        );
      } else {
        // Walkthrough
        addSystemMessage(
          `📖 **Walkthrough:** The three key clarifying questions are:\n\n1. "What type of feed is this?" → Concentrated feed (wheat, soy, corn)\n2. "Is Indian milk for domestic or export?" → 80% domestic, 20% export\n3. "How will we evaluate the opportunity?" → Based on potential revenue/turnover\n\nThese help you understand the product, market dynamics, and success criteria.`,
          "hint"
        );
        setTimeout(() => {
          setRevealedInfo({ productType: true, exportShare: true, evaluationMetric: true });
          setPhase("awaiting_framework");
          addInterviewerMessage(
            `Good. Now that we have the context, how would you structure your approach to sizing this market? Walk me through your framework.`
          );
        }, 1500);
      }
    } else if (phase === "awaiting_framework" || phase === "clarifying_revealed") {
      const newLevel = frameworkHintLevel + 1;
      setFrameworkHintLevel(newLevel);
      
      if (newLevel === 1) {
        addSystemMessage(
          `💡 **Hint 1:** For market sizing, think "top-down." Start with the end consumer (people who drink milk) and work backwards to the cows, then to the feed.`,
          "hint"
        );
      } else if (newLevel === 2) {
        addSystemMessage(
          `💡 **Hint 2:** Your framework should answer: (1) How many dairy cows are in India? (2) How much feed does each cow need? (3) What's the client's potential revenue?`,
          "hint"
        );
      } else {
        addSystemMessage(
          `📖 **Walkthrough:** The framework is:\n\n**Step 1:** Calculate dairy cows from milk demand\n**Step 2:** Total Feed = Cows × Feed per cow\n**Step 3:** Revenue = Market share × Market size × Price`,
          "hint"
        );
      }
    } else if (phase === "awaiting_cows_calculation") {
      const newLevel = cowsHintLevel + 1;
      setCowsHintLevel(newLevel);
      
      if (newLevel === 1) {
        addSystemMessage(
          `💡 **Hint 1:** Start by calculating how many people consume milk in India (1.3B × 80%). Then figure out how many people one cow can support (3,500L ÷ 100L).`,
          "hint"
        );
      } else if (newLevel === 2) {
        addSystemMessage(
          `💡 **Hint 2:** One cow supports 35 people. So domestic cows = 1.04B ÷ 35 ≈ 29M. But don't forget the 20% export factor!`,
          "hint"
        );
      } else {
        addSystemMessage(
          `📖 **Walkthrough:** \n• Consumers: 1.3B × 80% = 1.04B\n• Cows per person: 3,500L ÷ 100L = 35 people/cow\n• Domestic cows: 1.04B ÷ 35 = 29M\n• With exports: 29M × 1.2 = **35M cows**`,
          "hint"
        );
      }
    } else if (phase === "awaiting_feed_calculation" || phase === "cows_feedback") {
      const newLevel = feedHintLevel + 1;
      setFeedHintLevel(newLevel);
      
      if (newLevel === 1) {
        addSystemMessage(
          `💡 **Hint 1:** Annual feed per cow = 38 kg/day × 365 days. Then multiply by total cows.`,
          "hint"
        );
      } else if (newLevel === 2) {
        addSystemMessage(
          `💡 **Hint 2:** 38 × 365 = 13,870 kg per cow per year. Total = 35M × 13,870 kg.`,
          "hint"
        );
      } else {
        addSystemMessage(
          `📖 **Walkthrough:** \n• Annual feed/cow: 38 × 365 = 13,870 kg\n• Total market: 35M × 13,870 = **~485 billion kg/year**`,
          "hint"
        );
      }
    } else if (phase === "awaiting_revenue_calculation" || phase === "feed_feedback") {
      const newLevel = revenueHintLevel + 1;
      setRevenueHintLevel(newLevel);
      
      if (newLevel === 1) {
        addSystemMessage(
          `💡 **Hint 1:** Revenue = Market Size × Market Share × Price per kg. Use 5% share and €0.10/kg.`,
          "hint"
        );
      } else if (newLevel === 2) {
        addSystemMessage(
          `💡 **Hint 2:** Client's volume = 485B × 5% = 24.25B kg. Revenue = 24.25B × €0.10.`,
          "hint"
        );
      } else {
        addSystemMessage(
          `📖 **Walkthrough:** \n• Market share: 485B × 5% = 24.25B kg\n• Revenue: 24.25B × €0.10 = **€2.4 billion/year**`,
          "hint"
        );
      }
    } else if (phase === "awaiting_recommendation" || phase === "revenue_feedback") {
      const newLevel = recommendationHintLevel + 1;
      setRecommendationHintLevel(newLevel);
      
      if (newLevel === 1) {
        addSystemMessage(
          `💡 **Hint 1:** A good recommendation has: (1) Clear yes/no, (2) Supporting rationale, (3) Key risks to consider.`,
          "hint"
        );
      } else if (newLevel === 2) {
        addSystemMessage(
          `💡 **Hint 2:** Consider: Large revenue potential (€2.4B), but risks include local competition, distribution challenges, and price sensitivity.`,
          "hint"
        );
      } else {
        addSystemMessage(
          `📖 **Walkthrough:** Recommend entry due to large €2.4B opportunity. Key risks: local competition, distribution infrastructure, regulatory hurdles. Suggest: pilot program, local partnerships.`,
          "hint"
        );
      }
    }
  };

  const getPhaseProgress = (): number => {
    switch (phase) {
      case "opening": return 10;
      case "awaiting_clarifying": return 15;
      case "clarifying_revealed": return 25;
      case "awaiting_framework": return 30;
      case "awaiting_cows_calculation": return 45;
      case "cows_feedback": return 55;
      case "awaiting_feed_calculation": return 60;
      case "feed_feedback": return 70;
      case "awaiting_revenue_calculation": return 75;
      case "revenue_feedback": return 85;
      case "awaiting_recommendation": return 90;
      case "complete": return 100;
      default: return 0;
    }
  };

  const getPhaseName = (): string => {
    switch (phase) {
      case "opening":
      case "awaiting_clarifying":
        return "Clarifying Questions";
      case "clarifying_revealed":
      case "awaiting_framework":
        return "Framework";
      case "awaiting_cows_calculation":
      case "cows_feedback":
        return "Cows Calculation";
      case "awaiting_feed_calculation":
      case "feed_feedback":
        return "Feed Market";
      case "awaiting_revenue_calculation":
      case "revenue_feedback":
        return "Revenue Calculation";
      case "awaiting_recommendation":
        return "Recommendation";
      case "complete":
        return "Complete";
      default:
        return "Interview";
    }
  };

  const renderMessage = (message: Message) => {
    if (message.role === "system") {
      const bgColor = message.type === "hint" ? "bg-amber-50 border-amber-200" :
                      message.type === "success" ? "bg-green-50 border-green-200" :
                      message.type === "warning" ? "bg-red-50 border-red-200" :
                      "bg-blue-50 border-blue-200";
      
      const icon = message.type === "hint" ? <Lightbulb className="w-4 h-4 text-amber-500" /> :
                   message.type === "success" ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                   message.type === "warning" ? <AlertTriangle className="w-4 h-4 text-red-500" /> :
                   <HelpCircle className="w-4 h-4 text-blue-500" />;
      
      return (
        <div className={`flex justify-center my-4`}>
          <div className={`max-w-2xl px-4 py-3 rounded-lg border ${bgColor}`}>
            <div className="flex items-start gap-2">
              {icon}
              <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          </div>
        </div>
      );
    }
    
    const isInterviewer = message.role === "interviewer";
    
    return (
      <div className={`flex ${isInterviewer ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`flex items-start gap-3 max-w-[80%] ${isInterviewer ? '' : 'flex-row-reverse'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isInterviewer ? 'bg-primary/10' : 'bg-secondary'
          }`}>
            {isInterviewer ? (
              <Building className="w-4 h-4 text-primary" />
            ) : (
              <User className="w-4 h-4 text-foreground" />
            )}
          </div>
          <div className={`px-4 py-3 rounded-2xl ${
            isInterviewer 
              ? 'bg-muted rounded-tl-sm' 
              : 'bg-primary text-primary-foreground rounded-tr-sm'
          }`}>
            <div 
              className="text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: message.content
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br/>')
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-bold">{caseData.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{caseData.type}</Badge>
                  <Badge variant="secondary">{caseData.difficulty}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLeaveCase}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Leave Case
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress: {getPhaseName()}</span>
              <span className="font-medium">{getPhaseProgress()}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${getPhaseProgress()}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="h-[500px] overflow-y-auto pr-2">
            {messages.map(message => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={phase === "complete" ? "Case complete! Click Leave Case to continue." : "Type your response..."}
                className="min-h-[80px] resize-none"
                disabled={phase === "complete" || isTyping}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || phase === "complete"}
                className="h-10"
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleHintRequest}
                disabled={!canUseHint() || isTyping}
                className="h-10"
                title={isWalkthroughAvailable() ? "Get walkthrough" : "Get hint"}
              >
                <Lightbulb className={`w-4 h-4 ${isWalkthroughAvailable() ? 'text-amber-500' : ''}`} />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Hints used: {hintsUsedTotal}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DairyCowFeedInterview;
