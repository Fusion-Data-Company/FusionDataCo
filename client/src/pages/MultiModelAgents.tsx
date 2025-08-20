import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle,
  Activity,
  Target,
  Wind,
  MapPin,
  Compass,
  BarChart3,
  Home,
  Shield,
  DollarSign,
  Building2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MultiModelAgents() {
  const handleContactClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'build_multi_model_agent'
    });
  };

  const handlePricingClick = () => {
    trackEvent({
      category: 'engagement', 
      action: 'click',
      label: 'see_pricing_from_multi_model'
    });
  };

  const golfBagSlides = [
    {
      id: 'mistake',
      title: 'Slide 1: The Mistake',
      content: 'Walking onto a course with one club = trying to run your business on one model.',
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />
    },
    {
      id: 'bag',
      title: 'Slide 2: The Bag',
      clubs: [
        { name: 'Driver', use: 'long-range generation (ads, blogs)' },
        { name: 'Irons', use: 'structured reasoning (sales scripts, workflows)' },
        { name: 'Wedge', use: 'cleanup/extraction (messy CRM notes)' },
        { name: 'Putter', use: 'final polish (headlines, SMS copy)' }
      ],
      icon: <Target className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'lie',
      title: 'Slide 3: The Lie (Data Condition)',
      content: 'Clean data = fairway (easy shot). Messy data = rough (needs wedge first).',
      icon: <MapPin className="h-8 w-8 text-green-500" />
    },
    {
      id: 'distance',
      title: 'Slide 4: Distance (Context)',
      content: 'Long doc analysis = driver. Short CTA = putter.',
      icon: <Target className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'wind',
      title: 'Slide 5: Wind (Latency/Cost)',
      content: 'Phone calls = headwind → low latency models. Batch processing = tailwind → slower/cheaper models.',
      icon: <Wind className="h-8 w-8 text-cyan-500" />
    },
    {
      id: 'angle',
      title: 'Slide 6: Angle (Determinism)',
      content: 'Compliance workflows = use JSON-locked models.',
      icon: <Compass className="h-8 w-8 text-purple-500" />
    },
    {
      id: 'fitting',
      title: 'Slide 7: Club Fitting',
      content: 'OpenRouter lets us choose the right model each step.',
      icon: <Activity className="h-8 w-8 text-orange-500" />
    },
    {
      id: 'scorecard',
      title: 'Slide 8: Scorecard',
      content: 'Tied to funnel metrics → Contact → Qualified → Booked → Won.',
      icon: <BarChart3 className="h-8 w-8 text-yellow-500" />
    },
    {
      id: 'hazards',
      title: 'Slide 9: Hazards',
      content: 'Hallucination, privacy, compliance = "water/sand traps." Mitigation = guardrails + redaction.',
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />
    },
    {
      id: 'win',
      title: 'Slide 10: The Win',
      content: 'Multi-model routing beats single-model hype in real revenue outcomes.',
      icon: <MapPin className="h-8 w-8 text-yellow-500" />
    },
    {
      id: 'distance',
      title: 'Distance (Context)',
      content: 'Long doc analysis = driver. Short CTA = putter.',
      icon: <Compass className="h-8 w-8 text-green-500" />
    },
    {
      id: 'wind',
      title: 'Wind (Latency/Cost)',
      content: 'Phone calls = headwind → low latency models. Batch processing = tailwind → slower/cheaper models.',
      icon: <Wind className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'angle',
      title: 'Angle (Determinism)',
      content: 'Compliance workflows = use JSON-locked models.',
      icon: <Activity className="h-8 w-8 text-purple-500" />
    },
    {
      id: 'fitting',
      title: 'Club Fitting',
      content: 'OpenRouter lets us choose the right model each step.',
      icon: <CheckCircle className="h-8 w-8 text-green-500" />
    },
    {
      id: 'scorecard',
      title: 'Scorecard',
      content: 'Tied to funnel metrics → Contact → Qualified → Booked → Won.',
      icon: <BarChart3 className="h-8 w-8 text-primary" />
    },
    {
      id: 'hazards',
      title: 'Hazards',
      content: 'Hallucination, privacy, compliance = "water/sand traps." Mitigation = guardrails + redaction.',
      icon: <AlertTriangle className="h-8 w-8 text-orange-500" />
    },
    {
      id: 'win',
      title: 'The Win',
      content: 'Multi-model routing beats single-model hype in real revenue outcomes.',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Multi-Model AI Done Right — The Golf Bag Approach | Fusion Data Co</title>
        <meta name="description" content="Stop asking 'What's the best model?' The pro's answer: 'What's the best model for this shot?' Learn our Golf Bag approach to multi-model AI routing." />
        <meta name="keywords" content="multi-model AI, OpenRouter, AI routing, model selection, enterprise AI, Golf Bag approach" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Multi-Model AI Done Right — The Golf Bag Approach" />
        <meta property="og:description" content="The pro's answer: What's the best model for this shot? Learn our Golf Bag approach to AI." />
        <meta property="og:url" content="https://fusiondataco.com/services/multi-model-agents" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section - Yellow band (Info/Discovery) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Information & Strategy
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    Multi-Model AI Done Right — The Golf Bag Approach
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Stop asking "What's the best model?" The pro's answer: "What's the best model for this shot?"
                </p>
              </div>
            </div>
          </section>

          {/* Golf Bag Presentation - Accordion */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Golf Bag <span className="text-primary">Methodology</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Understanding AI model selection through the lens of professional golf
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {golfBagSlides.map((slide, index) => (
                  <AccordionItem key={slide.id} value={slide.id} className="border-primary/20">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        {slide.icon}
                        <div>
                          <div className="font-semibold text-lg">
                            Slide {index + 1}: {slide.title}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-12 space-y-4">
                        {slide.clubs ? (
                          <div className="space-y-3">
                            {slide.clubs.map((club) => (
                              <div key={club.name} className="flex items-start gap-3">
                                <Badge variant="outline" className="min-w-fit">
                                  {club.name}
                                </Badge>
                                <span className="text-muted-foreground">{club.use}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">{slide.content}</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Industry Analogies Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-blue-900/10 to-blue-800/5">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Industry <span className="text-blue-400">Analogies</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  How the Golf Bag approach works in your industry
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Home className="h-8 w-8 text-blue-500" />
                      <CardTitle>Real Estate</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <strong className="text-primary">Driver:</strong> Generate 200 listing descriptions
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Wedge:</strong> Clean MLS data
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Putter:</strong> Polished Facebook ad copy
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-blue-500" />
                      <CardTitle>Insurance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <strong className="text-primary">Irons:</strong> Structured policy comparisons
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Putter:</strong> Personalized SMS renewal
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-blue-500" />
                      <CardTitle>Finance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <strong className="text-primary">Wedge:</strong> Normalize messy application docs
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Driver:</strong> Generate investor updates
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-8 w-8 text-blue-500" />
                      <CardTitle>Manufacturing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <strong className="text-primary">Wedge:</strong> Normalize messy application docs
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Driver:</strong> Generate investor updates
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Building2 className="h-8 w-8 text-blue-500" />
                      <CardTitle>Enterprise</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <strong className="text-primary">Full Bag:</strong> Complete routing strategy
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Custom Fitting:</strong> Model selection for each use case
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Multi-Model <span className="text-primary">Routing</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">3x</div>
                    <p className="text-sm text-muted-foreground">Better accuracy with right-fit models</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">60%</div>
                    <p className="text-sm text-muted-foreground">Cost reduction via intelligent routing</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Vendor-agnostic flexibility</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* OpenRouter Integration */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-primary/5">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Technology Stack
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Powered by <span className="text-primary">OpenRouter</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Access to 100+ models from OpenAI, Anthropic, Google, Meta, and more. 
                  One API, infinite possibilities.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">GPT-4</div>
                  <p className="text-xs text-muted-foreground">Complex reasoning</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">Claude</div>
                  <p className="text-xs text-muted-foreground">Long context</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">Gemini</div>
                  <p className="text-xs text-muted-foreground">Multimodal</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">Llama</div>
                  <p className="text-xs text-muted-foreground">Fast inference</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section - Green band */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10">
            <div className="container mx-auto text-center">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                Good News & Action
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your <span className="text-green-400">Multi-Model Agent</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop overpaying for one-size-fits-all AI. Get the right model for every shot.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" onClick={handleContactClick}>
                  <Button size="lg" className="group bg-green-600 hover:bg-green-700">
                    Build My Multi-Model Agent
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pricing" onClick={handlePricingClick}>
                  <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
                    View Pricing
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