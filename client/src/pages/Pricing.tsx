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
        <title>Custom Pricing Solutions | Fusion Data Co</title>
        <meta name="description" content="Get custom pricing tailored to your specific needs. We create solutions based on your unique pain points to save you money and maximize efficiency." />
        <meta name="keywords" content="conversational AI pricing, voice agent pricing, SMS automation cost, enterprise AI pricing" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Custom Pricing Solutions" />
        <meta property="og:description" content="Schedule a free consultation with our sales team for pricing tailored to your specific needs and pain points." />
        <meta property="og:url" content="https://fusiondataco.com/pricing" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto text-center">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Custom Solutions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-primary">Schedule A Free Consultation</span> With Our Sales Team For Pricing
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We create custom solutions for clients based on their pain points throughout the day. We save our clients money by building solutions tailored to their specific needs instead of making them pay for parts of a larger plan they won't use.
              </p>
            </div>
          </section>

          {/* Custom Solutions Approach */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our <span className="text-primary">Custom Approach</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  Every business is unique, with its own set of challenges and pain points. Instead of forcing you into a one-size-fits-all solution, we take the time to understand your specific needs and create a tailored solution that addresses exactly what you need.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="text-center hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl">Discovery Call</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      We start with a comprehensive consultation to understand your current challenges, workflows, and goals.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-shadow border-primary ring-2 ring-primary/20">
                  <CardHeader>
                    <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl">Custom Solution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      We design and build a solution that targets your specific pain points without unnecessary features that inflate costs.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl">Cost Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Pay only for what you need. Our custom approach typically saves clients 30-50% compared to traditional packages.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Custom Solutions */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why <span className="text-primary">Custom</span> Works Better
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      No Wasted Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Traditional packages include features you may never use. Our custom solutions focus only on what will actually help your business grow.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      Perfect Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      We build solutions that work seamlessly with your existing tools and workflows, not against them.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      Scalable Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Start with what you need today and add features as your business grows. No need to pay upfront for future capabilities.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      Dedicated Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Get personalized support from a team that understands your unique setup and business needs.
                    </CardDescription>
                  </CardContent>
                </Card>
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
                <AccordionItem value="consultation">
                  <AccordionTrigger>How does the consultation process work?</AccordionTrigger>
                  <AccordionContent>
                    Our consultation process starts with a detailed discovery call where we learn about your business, current challenges, and goals. We then create a custom proposal that addresses your specific needs and pain points, ensuring you only pay for solutions that will actually benefit your business.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="timeline">
                  <AccordionTrigger>How long does it take to get a custom solution?</AccordionTrigger>
                  <AccordionContent>
                    After our initial consultation, we typically provide a detailed proposal within 2-3 business days. Implementation timelines vary based on complexity, but most custom solutions are deployed within 1-4 weeks depending on your specific requirements.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cost">
                  <AccordionTrigger>How much can I expect to save with a custom solution?</AccordionTrigger>
                  <AccordionContent>
                    Our clients typically save 30-50% compared to traditional package pricing because they only pay for features and capabilities they actually need. We eliminate the waste of paying for unused features while ensuring you get exactly what will drive results for your business.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="support">
                  <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
                  <AccordionContent>
                    All custom solutions include dedicated support from our team who understands your specific setup. We provide training, ongoing optimization, and technical support to ensure you get maximum value from your investment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scaling">
                  <AccordionTrigger>Can I add features as my business grows?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! One of the key benefits of our custom approach is scalability. Start with what you need today and add capabilities as your business grows. This allows you to expand strategically without overpaying upfront for future needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-primary/5">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Your <span className="text-primary">Custom Solution</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule your free consultation today and discover how we can save you money while solving your specific business challenges.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" onClick={handleContactClick}>
                  <Button size="lg" className="group">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    View Our Services
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