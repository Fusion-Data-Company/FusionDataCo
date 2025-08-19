import React from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, Star, Phone, MessageSquare } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { formatPrice } from '@/lib/utils';
import conversationalAIPricing from '@/data/pricing-conversational-ai';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: {
    included: string[];
    notIncluded: string[];
  };
  cta: {
    text: string;
    link: string;
  };
  popular?: boolean;
}

export default function Pricing() {
  // Social Media Pricing - Monthly Subscriptions
  const socialMediaTiers: PricingTier[] = [
    {
      name: "Social Starter",
      price: 299,
      description: "Automated content creation and posting for growing businesses.",
      features: {
        included: [
          "Automated content creation & posting",
          "1 social platform",
          "3 posts per week",
          "Basic analytics & performance tracking",
          "Content scheduling",
          "Email support"
        ],
        notIncluded: []
      },
      cta: {
        text: "Get Started",
        link: "/contact?service=social-starter"
      }
    },
    {
      name: "Social Pro",
      price: 599,
      description: "Professional social media management with comprehensive analytics.",
      features: {
        included: [
          "Everything in Social Starter, plus:",
          "Up to 3 social platforms",
          "Daily automated posts",
          "Comprehensive analytics & reporting",
          "Content strategy consultation",
          "Priority email and chat support"
        ],
        notIncluded: []
      },
      cta: {
        text: "Get Started",
        link: "/contact?service=social-pro"
      },
      popular: true
    },
    {
      name: "Social Elite",
      price: 1199,
      description: "Complete social media management with custom content and all platforms.",
      features: {
        included: [
          "Everything in Social Pro, plus:",
          "Custom daily content creation (human-crafted)",
          "Management of all major social platforms",
          "Advanced analytics and custom reporting",
          "Dedicated social media manager",
          "Tailored content strategy",
          "24/7 priority support"
        ],
        notIncluded: []
      },
      cta: {
        text: "Get Started",
        link: "/contact?service=social-elite"
      }
    }
  ];

  // Website Development & E-Commerce - One-time Projects
  interface WebsitePricing {
    service: string;
    price: string;
    description: string;
    features: string[];
  }

  const websitePricing: WebsitePricing[] = [
    {
      service: "Basic Website",
      price: "From $999",
      description: "Professional website for small businesses",
      features: [
        "Up to 5 pages",
        "Essential SEO optimization", 
        "Contact forms",
        "Mobile responsive design",
        "Basic hosting setup"
      ]
    },
    {
      service: "Standard Website", 
      price: "From $2,499",
      description: "Enhanced website with blog and CRM integration",
      features: [
        "Up to 12 pages",
        "Blog integration", 
        "Basic CRM integration",
        "Advanced SEO optimization",
        "Social media integration",
        "Analytics setup"
      ]
    },
    {
      service: "E-commerce Website",
      price: "From $4,999", 
      description: "Full online store with payment processing",
      features: [
        "Fully functional online store",
        "Payment gateway integration",
        "CRM integration",
        "Inventory management",
        "Order tracking system",
        "Customer accounts"
      ]
    },
    {
      service: "Custom Deployments 🗓️",
      price: "Custom Quote",
      description: "Specialized projects tailored to your needs",
      features: [
        "Consultation and planning",
        "Custom functionality development",
        "Advanced integrations",
        "Ongoing technical support",
        "Training and documentation"
      ]
    }
  ];

  // CRM Pricing - One-time Setup
  const crmPricing: WebsitePricing[] = [
    {
      service: "Starter CRM",
      price: "From $999 one-time",
      description: "Essential branded CRM solution",
      features: [
        "Essential CRM functionality",
        "Limited customization",
        "Basic contact management",
        "Lead tracking",
        "Email support"
      ]
    },
    {
      service: "Business CRM",
      price: "From $1,799 one-time", 
      description: "Intermediate CRM with automation capabilities",
      features: [
        "Advanced CRM features",
        "Integration capabilities",
        "Workflow automation",
        "Custom fields and forms",
        "Priority support"
      ]
    },
    {
      service: "Premium CRM",
      price: "From $2,499+ one-time",
      description: "Comprehensive CRM with advanced integrations",
      features: [
        "Full CRM functionality",
        "Advanced integrations",
        "Custom solutions",
        "Advanced reporting",
        "Dedicated account manager"
      ]
    }
  ];

  // Ongoing Care Packages - Monthly
  const carePricing: PricingTier[] = [
    {
      name: "Basic Care",
      price: 99,
      description: "Essential hosting and maintenance for your applications.",
      features: {
        included: [
          "Hosting and uptime monitoring",
          "Regular backups",
          "Minor content updates",
          "Security monitoring",
          "Email support"
        ],
        notIncluded: [
          "Priority support",
          "Dedicated account management",
          "Complex updates"
        ]
      },
      cta: {
        text: "Get Care Package",
        link: "/contact?service=basic-care"
      }
    },
    {
      name: "Full-Service Care", 
      price: 499,
      description: "Comprehensive care with priority support and account management.",
      features: {
        included: [
          "Priority support",
          "Dedicated account management",
          "Unlimited minor updates",
          "Updates executed within 3 business days",
          "Performance monitoring",
          "Security updates"
        ],
        notIncluded: [
          "Strategic consultations",
          "Complex integrations"
        ]
      },
      cta: {
        text: "Get Care Package", 
        link: "/contact?service=full-care"
      },
      popular: true
    },
    {
      name: "Elite Care",
      price: 999,
      description: "Premium support with strategic consultations and custom updates.",
      features: {
        included: [
          "Premium support",
          "Strategic consultations", 
          "Custom updates and modifications",
          "Complex integrations",
          "Dedicated technical team",
          "24/7 monitoring"
        ],
        notIncluded: []
      },
      cta: {
        text: "Get Care Package",
        link: "/contact?service=elite-care"
      }
    }
  ];

  // Track pricing page view
  React.useEffect(() => {
    trackEvent({
      category: 'engagement',
      action: 'view',
      label: 'pricing_page',
      nonInteraction: true
    });
  }, []);
  
  // Handler for CTA button clicks
  const handleCtaClick = (planName: string) => {
    trackEvent({
      category: 'lead_generation',
      action: 'click',
      label: `pricing_cta_${planName.toLowerCase()}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Pricing - Marketing Automation & Conversational AI Solutions | Fusion Data Co</title>
        <meta name="description" content="Transparent pricing for our comprehensive marketing automation platform including conversational AI, CRM, and social media management. Choose the plan that fits your business needs." />
        <meta name="keywords" content="conversational AI pricing, marketing automation pricing, CRM pricing, social media management cost, website development pricing, voice agents pricing" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pricing - Marketing Automation & Conversational AI Solutions | Fusion Data Co" />
        <meta property="og:description" content="Transparent pricing for conversational AI, marketing automation, CRM, and website development services." />
        <meta property="og:url" content="https://fusiondataco.com/pricing" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-primary">Enterprise Solutions</span> Made Affordable
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Conversational AI, marketing automation, CRM solutions, and website development services designed for small and medium businesses.
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="btn-titanium"
                    onClick={() => {
                      const pricingSection = document.getElementById('social-media-pricing');
                      pricingSection?.scrollIntoView({ behavior: 'smooth' });
                      
                      trackEvent({
                        category: 'engagement',
                        action: 'click',
                        label: 'view_plans_button',
                      });
                    }}
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Conversational AI Pricing Section */}
          <section id="conversational-ai-pricing" className="py-16 px-4 bg-gradient-to-b from-green-900/10 to-green-800/5">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Featured Solution
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <Phone className="inline-block mr-3 h-8 w-8 text-green-400" />
                  <span className="text-green-400">Conversational AI</span> Voice & SMS Agents
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                  AI agents that answer, qualify, and book appointments 24/7. ElevenLabs voice + Vapi telephony + OpenRouter multi-model routing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {conversationalAIPricing.plans.map((plan, index) => (
                  <Card 
                    key={plan.slug}
                    className={`bg-background border ${plan.recommended ? 'border-green-500 border-2 shadow-lg shadow-green-500/20' : 'border-green-500/20'} h-full flex flex-col relative`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <div className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          RECOMMENDED
                        </div>
                      </div>
                    )}
                    <CardHeader className={`pt-6 ${plan.recommended ? 'pt-8' : ''}`}>
                      <CardTitle className="text-2xl font-bold text-green-400">{plan.name}</CardTitle>
                      <CardDescription>{plan.blurb}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="mb-6">
                        <div className="flex items-baseline mb-2">
                          <span className="text-3xl font-bold text-green-400">${plan.priceMonthly}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          + ${plan.setupOneTime} one-time setup
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold mb-4 text-green-400">What's included:</h3>
                        <ul className="space-y-3 mb-6">
                          {plan.includes.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border">
                      <Button 
                        className={`w-full ${plan.recommended ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20'}`}
                        size="lg"
                        onClick={() => handleCtaClick(plan.name)}
                      >
                        {plan.cta.label}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Add-ons Section */}
              <div className="bg-card/50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Optional Add-ons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {conversationalAIPricing.addons.map((addon, index) => (
                    <div key={index} className="text-center p-4 border border-green-500/20 rounded-lg">
                      <div className="text-lg font-semibold text-green-400">${addon.price}</div>
                      <div className="text-sm text-muted-foreground">{addon.note}</div>
                      <div className="text-sm font-medium mt-1">{addon.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Notice */}
              <div className="text-center text-xs text-muted-foreground space-y-1">
                {conversationalAIPricing.legal.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-green-400">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                  <AccordionItem value="included-vs-usage" className="border-green-500/20">
                    <AccordionTrigger className="text-left">What's included vs. usage?</AccordionTrigger>
                    <AccordionContent>
                      Monthly fees cover platform access, setup, and optimization. Actual telephony, LLM, and voice synthesis costs are billed at vendor rates (pass-through pricing) for complete transparency.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="setup-speed" className="border-green-500/20">
                    <AccordionTrigger className="text-left">How fast is setup?</AccordionTrigger>
                    <AccordionContent>
                      Typical setup time is 3-5 business days for Launch, 1-2 weeks for Growth, and 2-4 weeks for Scale. We'll have you taking calls as quickly as possible.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="crm-integration" className="border-green-500/20">
                    <AccordionTrigger className="text-left">Can you work with our CRM?</AccordionTrigger>
                    <AccordionContent>
                      Yes! We provide two-way sync with most major CRMs including Salesforce, HubSpot, Pipedrive, and more. Custom integrations available for Scale plans.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="quality-evaluation" className="border-green-500/20">
                    <AccordionTrigger className="text-left">How do you evaluate quality?</AccordionTrigger>
                    <AccordionContent>
                      We review transcripts, analyze conversation tags, and track conversion metrics. Our KPI ladder follows: Contact → Qualified → Booked → Showed → Won.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Social Media Pricing Section */}
          <section id="social-media-pricing" className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="text-primary">Social Media</span> Marketing Packages
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Automated social media management with AI-powered content creation and multi-platform scheduling.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {socialMediaTiers.map((tier, index) => (
                  <Card 
                    key={index}
                    className={`bg-background border ${tier.popular ? 'border-primary border-2' : 'border-border/50'} h-full flex flex-col relative`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <div className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
                          MOST POPULAR
                        </div>
                      </div>
                    )}
                    <CardHeader className={`pt-6 ${tier.popular ? 'pt-8' : ''}`}>
                      <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="mb-8">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold mb-4">What's included:</h3>
                        <ul className="space-y-3 mb-6">
                          {tier.features.included.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {tier.features.notIncluded.length > 0 && (
                          <>
                            <h3 className="text-base font-semibold mb-4">Not included:</h3>
                            <ul className="space-y-3">
                              {tier.features.notIncluded.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start gap-2">
                                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border">
                      <Button 
                        className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card hover:bg-card/90 text-foreground border border-border'}`}
                        size="lg"
                        onClick={() => handleCtaClick(tier.name)}
                      >
                        {tier.cta.text}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Website Development Pricing Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Website Development & <span className="text-primary">E-Commerce Solutions</span>
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Professional website development with conversion optimization and modern design.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {websitePricing.map((item, index) => (
                  <Card key={index} className="bg-card border border-border/50 h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{item.service}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{item.price}</div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleCtaClick(item.service)}
                      >
                        Get Quote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* CRM Solutions */}
              <h3 className="text-2xl font-bold mb-8 text-center">
                Custom <span className="text-primary">CRM Solutions</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {crmPricing.map((item, index) => (
                  <Card key={index} className="bg-card border border-border/50 h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{item.service}</CardTitle>
                      <div className="text-2xl font-bold text-primary">{item.price}</div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleCtaClick(item.service)}
                      >
                        Get Quote
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Care Packages Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Ongoing <span className="text-primary">Care Packages</span>
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Comprehensive hosting, maintenance, and support for your applications.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {carePricing.map((tier, index) => (
                  <Card 
                    key={index}
                    className={`bg-background border ${tier.popular ? 'border-primary border-2' : 'border-border/50'} h-full flex flex-col relative`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <div className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
                          MOST POPULAR
                        </div>
                      </div>
                    )}
                    <CardHeader className={`pt-6 ${tier.popular ? 'pt-8' : ''}`}>
                      <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="mb-8">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold mb-4">What's included:</h3>
                        <ul className="space-y-3 mb-6">
                          {tier.features.included.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {tier.features.notIncluded.length > 0 && (
                          <>
                            <h3 className="text-base font-semibold mb-4">Not included:</h3>
                            <ul className="space-y-3">
                              {tier.features.notIncluded.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start gap-2">
                                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border">
                      <Button 
                        className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card hover:bg-card/90 text-foreground border border-border'}`}
                        size="lg"
                        onClick={() => handleCtaClick(tier.name)}
                      >
                        {tier.cta.text}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Lead Generation Pricing Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Lead Generation & <span className="text-primary">Acquisition Services</span>
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                High-quality verified leads with advanced outreach technologies for maximum conversion.
              </p>
              
              {/* Mobile-friendly card layout for small screens */}
              <div className="block md:hidden space-y-4">
                {[
                  { type: "Email Lists", price: "From $150 per 1,000 leads", desc: "Verified B2B/B2C email contacts" },
                  { type: "Phone Lists", price: "From $200 per 1,000 leads", desc: "Validated phone contacts, business or consumer" },
                  { type: "Combined Lists", price: "From $250 per 1,000 leads", desc: "Fully verified contacts with emails and phone numbers" },
                  { type: "Ringless Voicemail Drops", price: "$159 per 1,000 drops", desc: "Fully managed campaigns including content creation, deployment, and analytics" },
                  { type: "AI Voice Calls", price: "From $0.25 per call", desc: "AI-driven personalized outbound calling campaigns" },
                  { type: "Live Caller Services", price: "From $25/hour per agent", desc: "Managed outbound calling services, with domestic and offshore options available" },
                  { type: "Real Estate Acquisition Leads", price: "From $50 per lead", desc: "Premium, validated leads for high-value transactions" }
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                    <h3 className="text-foreground font-bold text-lg mb-2">{item.type}</h3>
                    <p className="text-primary font-bold text-lg mb-2">{item.price}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Desktop table layout */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden">
                  <thead className="bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                    <tr>
                      <th className="px-4 lg:px-6 py-4 text-left text-foreground font-bold text-sm lg:text-base">Lead Type</th>
                      <th className="px-4 lg:px-6 py-4 text-left text-foreground font-bold text-sm lg:text-base">Pricing</th>
                      <th className="px-4 lg:px-6 py-4 text-left text-foreground font-bold text-sm lg:text-base">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">Email Lists</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">From $150 per 1,000 leads</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">Verified B2B/B2C email contacts</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">Phone Lists</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">From $200 per 1,000 leads</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">Validated phone contacts, business or consumer</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">Combined Lists</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">From $250 per 1,000 leads</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">Fully verified contacts with emails and phone numbers</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">Ringless Voicemail Drops</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">$159 per 1,000 drops</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">Fully managed campaigns including content creation, deployment, and analytics</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">AI Voice Calls</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">From $0.25 per call</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">AI-driven personalized outbound calling campaigns</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">Live Caller Services</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">From $25/hour per agent</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">Managed outbound calling services, with domestic and offshore options available</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 lg:px-6 py-4 text-foreground font-medium text-sm lg:text-base">Real Estate Acquisition Leads</td>
                      <td className="px-4 lg:px-6 py-4 text-primary font-bold text-sm lg:text-base">From $50 per lead</td>
                      <td className="px-4 lg:px-6 py-4 text-muted-foreground text-sm lg:text-base">Premium, validated leads for high-value transactions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => {
                    trackEvent({
                      category: 'lead_generation',
                      action: 'click',
                      label: 'lead_generation_cta',
                    });
                  }}
                >
                  Get Custom Lead Generation Quote
                </Button>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Can I switch plans later?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, 
                    while downgrades will take effect at the end of your current billing cycle.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Do you offer annual discounts?</h3>
                  <p className="text-muted-foreground">
                    Yes! You can save approximately 17% by choosing annual billing on any of our plans. 
                    Annual plans are billed once per year.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">What happens after the free trial?</h3>
                  <p className="text-muted-foreground">
                    After your 14-day free trial ends, your account will automatically convert to the plan you 
                    selected. We'll send you a reminder email 3 days before the trial ends.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Is there a setup fee?</h3>
                  <p className="text-muted-foreground">
                    No, there are no setup fees for any of our plans. The price you see is the full price 
                    you'll pay, with no hidden fees or charges.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover) 
                    as well as PayPal for payment.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Do you offer refunds?</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day money-back guarantee for monthly plans. Annual plans are non-refundable 
                    after the first 30 days but will remain active until the end of your billing period.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <div className="bg-gradient-to-r from-card to-card/80 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start your free 14-day trial today. No credit card required, no commitment.
                  Experience the full power of our platform and see the results for yourself.
                </p>
                <Button 
                  size="lg" 
                  className="btn-titanium"
                  onClick={() => {
                    trackEvent({
                      category: 'lead_generation',
                      action: 'click',
                      label: 'pricing_bottom_cta',
                    });
                  }}
                >
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}