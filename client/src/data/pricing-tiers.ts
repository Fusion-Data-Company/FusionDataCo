// New Fusion Data Co Pricing Tiers - Launch/Growth/Scale

export interface PricingTier {
  name: string;
  price: number;
  setupFee: number;
  description: string;
  features: string[];
  addOns?: string[];
  recommended?: boolean;
}

export const conversationalAIPricingTiers: PricingTier[] = [
  {
    name: "Launch",
    price: 799,
    setupFee: 2000,
    description: "Perfect for businesses starting their AI journey",
    features: [
      "1 voice+SMS agent, 1 phone number",
      "Core flow + CRM sync",
      "Weekly top-10 transcript review",
      "Basic analytics dashboard",
      "Email support"
    ]
  },
  {
    name: "Growth",
    price: 1799,
    setupFee: 6000,
    description: "Scale your operations with advanced automation",
    features: [
      "3 agents, advanced scoring",
      "n8n automations (intake → deal; docs; ticketing)",
      "Analytics dashboards",
      "Bi-weekly optimization",
      "Enterprise-grade security standards",
      "Priority support"
    ],
    recommended: true
  },
  {
    name: "Scale",
    price: 4499,
    setupFee: 15000,
    description: "Enterprise-grade solution with unlimited capacity",
    features: [
      "Unlimited agents, SLAs, priority support",
      "Multi-model routing playbooks",
      "Human-in-the-loop review tooling",
      "Security/compliance reviews",
      "Error-tolerant automations with retries, DLQs, logs",
      "Vendor-agnostic: Multi-model via OpenRouter; no lock-in"
    ]
  }
];

export const addOnServices = [
  { name: "Additional numbers", price: "$5/DID" },
  { name: "Custom voice clone", price: "$99" },
  { name: "Bespoke dashboards", price: "$750" },
  { name: "Training workshops", price: "$1,250" }
];

export const caseSnippets = [
  {
    industry: "Real Estate",
    result: "Cut avg. lead response from 14h → 22s",
    icon: "🏠"
  },
  {
    industry: "Insurance", 
    result: "32% more inbound calls converted to paid policies",
    icon: "🛡️"
  },
  {
    industry: "Finance",
    result: "Loan pre-qualifications processed 10x faster",
    icon: "💰"
  }
];

export const complianceFeatures = [
  "Enterprise-grade secure infrastructure",
  "Data privacy protection",
  "Industry-standard communication practices",
  "Healthcare-ready security options",
  "Error-tolerant automations with retries",
  "Vendor-agnostic via OpenRouter"
];