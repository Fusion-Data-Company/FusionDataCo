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

          {/* Pain Section - Red band */}
          <section className="py-16 px-4 bg-gradient-to-b from-red-900/20 to-red-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
                  Pain: The Single-Model Trap
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-400">
                  Why One Model = Expensive Mistakes
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Wrong Tool, Bad Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Using GPT-4 for simple SMS copy = $10/task. Using Claude for real-time calls = 3-second delays.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Vendor Lock-in Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      OpenAI rate limits hit? Your business stops. Single-vendor dependency = fragile operations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">No Optimization Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Without model selection logic, you're overpaying and underperforming on every AI task.
                    </p>
                  </CardContent>
                </Card>
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
                            {slide.title}
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
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Industry <span className="text-primary">Analogies</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  How the Golf Bag approach works in your industry
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Home className="h-8 w-8 text-blue-500 mb-3" />
                    <CardTitle>Real Estate</CardTitle>
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
                    <Shield className="h-8 w-8 text-green-500 mb-3" />
                    <CardTitle>Insurance</CardTitle>
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
                    <DollarSign className="h-8 w-8 text-yellow-500 mb-3" />
                    <CardTitle>Finance</CardTitle>
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
                    <Building2 className="h-8 w-8 text-purple-500 mb-3" />
                    <CardTitle>Manufacturing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <strong className="text-primary">Golf Pro:</strong> "Distance to pin = 150 yards? 7-iron."
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Mechanic:</strong> "Brake pads worn? Replace."
                    </p>
                    <p className="text-sm">
                      <strong className="text-primary">Doctor:</strong> "Symptoms + tests = diagnosis."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section - Green band (Good News) */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10">
            <div className="container mx-auto text-center">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                Good News: Right Tool, Right Job
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Build Your <span className="text-green-400">Multi-Model Agent</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Stop overpaying for overkill. Stop underperforming with wrong tools. 
                Start routing intelligently.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleContactClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Build Multi-Model Agent
                </Button>
                <Link href="/blog/golf-bag-approach-multi-model-ai">
                  <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
                    Read Full Golf Bag Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing" onClick={handlePricingClick}>
                  <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
                    See Pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
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