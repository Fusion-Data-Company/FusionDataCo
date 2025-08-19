export default {
  currency: "USD",
  plans: [
    {
      slug: "launch",
      name: "Launch",
      priceMonthly: 799,
      setupOneTime: 2000,
      blurb: "Get to first calls fast with a single agent and core flows.",
      includes: [
        "1 voice+SMS agent (Vapi + ElevenLabs)",
        "1 phone number",
        "Core call flow + SMS auto-replies",
        "Calendar + CRM integration",
        "Weekly transcript review (top 10)",
        "Usage billed at vendor cost (pass-through)"
      ],
      cta: { label: "Start Launch", href: "/contact" }
    },
    {
      slug: "growth",
      name: "Growth",
      priceMonthly: 1799,
      setupOneTime: 6000,
      blurb: "Multiple flows, deeper automation, faster iteration.",
      includes: [
        "Up to 3 agents (brands/queues)",
        "Advanced qualification & scoring",
        "n8n automations (intake → deal; ticketing; docs)",
        "Analytics dashboard + alerts",
        "Bi-weekly optimization",
        "Usage billed at vendor cost (pass-through)"
      ],
      cta: { label: "Choose Growth", href: "/contact" },
      recommended: true
    },
    {
      slug: "scale",
      name: "Scale",
      priceMonthly: 4499,
      setupOneTime: 15000,
      blurb: "High volume, SLAs, and multi-brand orchestration.",
      includes: [
        "Unlimited agents & flows",
        "Priority SLAs + on-call support",
        "Multi-model routing playbooks",
        "Human-in-the-loop tooling",
        "Weekly experiment cadence",
        "Security reviews & compliance logs"
      ],
      cta: { label: "Talk to Sales", href: "/contact" }
    }
  ],
  addons: [
    { name: "Additional phone numbers", note: "per DID", price: 5 },
    { name: "Custom voice clone", note: "per voice", price: 99 },
    { name: "Bespoke dashboard pack", note: "per pack", price: 750 },
    { name: "Dedicated training workshop", note: "half-day", price: 1250 }
  ],
  legal: [
    "Telephony, LLM, and TTS/STT usage billed at vendor cost (pass-through).",
    "SMS requires opt-in and clear STOP/HELP handling (TCPA/CTIA).",
    "Call recording requires consent language per jurisdiction."
  ]
};