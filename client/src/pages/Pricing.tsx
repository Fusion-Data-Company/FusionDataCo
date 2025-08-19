import React from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, Star, Phone, MessageSquare, ArrowRight, Zap, Shield, Home, DollarSign, Building2, CheckCircle } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { Link } from "wouter";
import { conversationalAIPricingTiers, addOnServices, caseSnippets, complianceFeatures } from '@/data/pricing-tiers';

export default function Pricing() {
  const handleGetStarted = (tier: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `get_started_${tier.toLowerCase()}`
    });
  };

  const handleContactClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'contact_from_pricing'
    });
  };

  return (
    <>
      <Helmet>
        <title>Pricing - Launch, Growth & Scale Plans | Fusion Data Co</title>
        <meta name="description" content="Transparent pricing for Conversational AI, multi-model agents, and automation solutions. Launch from $799/mo, Growth from $1,799/mo, Scale from $4,499/mo." />
        <meta name="keywords" content="conversational AI pricing, voice agent pricing, SMS automation cost, enterprise AI pricing" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Transparent AI & Automation Pricing" />
        <meta property="og:description" content="Launch from $799/mo. Growth from $1,799/mo. Scale from $4,499/mo. Plus setup fees." />
        <meta property="og:url" content="https://fusiondataco.com/pricing" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Transparent Pricing
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Choose Your <span className="text-primary">Growth Path</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Enterprise-grade conversational AI and automation solutions. No hidden fees, no surprises.
              </p>
            </div>
          </section>

          {/* Main Pricing Tiers - Launch/Growth/Scale */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Conversational AI <span className="text-primary">Plans</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Voice + SMS agents that qualify, book, and close 24/7
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {conversationalAIPricingTiers.map((tier) => (
                  <Card 
                    key={tier.name} 
                    className={`relative hover:shadow-xl transition-shadow ${tier.recommended ? 'border-primary ring-2 ring-primary/20' : ''}`}
                  >
                    {tier.recommended && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        Recommended
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">${tier.price.toLocaleString()}</span>
                          <span className="text-muted-foreground ml-2">/month</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          + ${tier.setupFee.toLocaleString()} setup fee
                        </p>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/contact" className="w-full" onClick={() => handleGetStarted(tier.name)}>
                        <Button 
                          className="w-full" 
                          variant={tier.recommended ? "default" : "outline"}
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Add-On Services */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Add-On <span className="text-primary">Services</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {addOnServices.map((addon, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">{addon.name}</h4>
                      <p className="text-2xl font-bold text-primary">{addon.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance & Standards */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  Enterprise Standards
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Compliance & <span className="text-blue-400">Reliability</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {complianceFeatures.map((feature, index) => (
                  <Card key={index} className="border-blue-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Case Snippets */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/10 to-green-800/5">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Proven Results
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Real <span className="text-green-400">Impact</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {caseSnippets.map((snippet, index) => (
                  <Card key={index} className="text-center border-green-500/20">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-3">{snippet.icon}</div>
                      <h4 className="font-semibold mb-2 text-green-400">{snippet.industry}</h4>
                      <p className="text-sm text-muted-foreground">{snippet.result}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked <span className="text-primary">Questions</span>
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="setup">
                  <AccordionTrigger>What's included in the setup fee?</AccordionTrigger>
                  <AccordionContent>
                    Setup includes agent configuration, voice tuning, CRM integration, workflow design, testing, and initial training. Launch tier gets you running in 3-5 days, Growth in 7-10 days, Scale includes full enterprise onboarding over 2-3 weeks.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contract">
                  <AccordionTrigger>Are there long-term contracts?</AccordionTrigger>
                  <AccordionContent>
                    Month-to-month for Launch tier. Growth requires 6-month commitment. Scale includes annual agreements with SLAs and dedicated support.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="usage">
                  <AccordionTrigger>What about usage limits?</AccordionTrigger>
                  <AccordionContent>
                    Each tier includes generous usage limits. Launch: 1,000 minutes/month. Growth: 5,000 minutes/month. Scale: Unlimited with fair use policy. Additional minutes at $0.05/min.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="integrations">
                  <AccordionTrigger>Which CRMs do you integrate with?</AccordionTrigger>
                  <AccordionContent>
                    We integrate with all major CRMs including Salesforce, HubSpot, Pipedrive, Monday.com, and custom APIs. n8n automation included in Growth and Scale tiers enables virtually any integration.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="upgrade">
                  <AccordionTrigger>Can I upgrade or downgrade?</AccordionTrigger>
                  <AccordionContent>
                    Upgrade anytime with prorated billing. Downgrading requires 30-day notice and may involve feature limitations. Our team helps ensure smooth transitions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-primary/5">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-primary">Revenue Operations</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join businesses that have cut response times from hours to seconds.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" onClick={handleContactClick}>
                  <Button size="lg" className="group">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services/conversational-ai">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}