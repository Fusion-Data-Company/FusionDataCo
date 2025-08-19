import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { 
  Target,
  Zap,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Shield,
  Gauge,
  Award,
  Navigation
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';

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
      label: 'see_pricing_from_multimodel'
    });
  };

  return (
    <>
      <Helmet>
        <title>The Golf Bag: Multi-Model AI with OpenRouter | Fusion Data Co</title>
        <meta name="description" content="There is no single 'best model.' Pros pick the right club for the shot—task, distance, lie, wind… context, latency, cost, and determinism." />
        <meta name="keywords" content="multi-model AI, OpenRouter, AI routing, model selection, AI optimization, conversational AI, AI agents" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Golf Bag: Multi-Model AI with OpenRouter" />
        <meta property="og:description" content="Multi-model routing beats single-model dogma—every time, on real revenue." />
        <meta property="og:url" content="https://fusiondataco.com/services/multi-model-agents" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section - Yellow band (Info) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Info & Discovery
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    The Golf Bag: Multi-Model AI with OpenRouter
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  There is no single "best model." Pros pick the right club for the shot—task, distance, lie, wind… context, latency, cost, and determinism.
                </p>
              </div>
            </div>
          </section>

          {/* Golf Bag Presentation - Accordion Slides */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto max-w-4xl">
              <Accordion type="single" collapsible className="space-y-4">
                
                <AccordionItem value="slide-1" className="border border-red-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-red-900/10">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-lg font-semibold">Slide 1 — The Mistake</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-lg text-muted-foreground">
                      People ask "What's the best model?" That's like walking onto a course with one club.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-2" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 2 — The Bag (Concept)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Driver</strong> = broad exploration, long-form generation, ideation.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Long Irons</strong> = structured reasoning, step-wise planning, JSON outputs.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Mid Irons</strong> = tool calling, code, API/memory interaction.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Wedge</strong> = cleanup from a bad lie: noisy inputs, rewriting, extraction.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Putter</strong> = final polish: headlines, SMS, tight copy.</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-3" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 3 — The Lie (Data Condition)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Tight fairway</strong> (clean data) → irons; <strong>heavy rough</strong> (messy data) → wedge first.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Sand</strong> (ambiguous intent) → probe with short prompts; don't over-swing.</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-4" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 4 — Distance (Context Length)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Long distance</strong> (big context) → model with longer context & cost control.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Short game</strong> (microcopy) → small, deterministic, fast.</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-5" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <Gauge className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 5 — Wind (Latency & Cost)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Phone calls</strong> = wind in your face → pick low-latency models.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div><strong>Batch jobs</strong> = tailwind → can use slower, cheaper models at scale.</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-6" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <Navigation className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 6 — Angle (Determinism & Schema)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground">
                      When downstream automations depend on structure, use models that obey JSON and function calls reliably.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-7" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 7 — Club Fitting (Your Stack)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>OpenRouter lets us route to the best "club" step-by-step inside one workflow.</div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>We snapshot prompts + routing so results are reproducible.</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-8" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 8 — Shot Routine (Our Process)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-yellow-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">1-3</div>
                        <p className="text-sm">Inspect lie (data). Pick club (model). Shot plan (prompt schema).</p>
                      </div>
                      <div className="text-center p-4 border border-yellow-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">4</div>
                        <p className="text-sm">Swing (call).</p>
                      </div>
                      <div className="text-center p-4 border border-yellow-500/20 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">5-6</div>
                        <p className="text-sm">Check landing (eval). Adjust.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-9" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 9 — Scorecard (Metrics)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground">
                      Contact → Qualified → Booked → Show → Won; plus latency, cost/lead, accuracy.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-10" className="border border-yellow-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-yellow-900/10">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-yellow-400" />
                      <span className="text-lg font-semibold">Slide 10 — Caddy (Your Agent)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground">
                      Your agent is the caddy that knows the bag, the course, and your swing.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-11" className="border border-red-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-red-900/10">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-lg font-semibold">Slide 11 — Hazards (Risks)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-muted-foreground">
                      Hallucination, privacy, compliance. Mitigate with guardrails, redaction, and human review on high-risk steps.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slide-12" className="border border-green-500/20 rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:bg-green-900/10">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-lg font-semibold">Slide 12 — The Win</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-lg font-semibold text-green-400">
                      Multi-model routing beats single-model dogma—every time, on real revenue.
                    </p>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          </section>

          {/* CTA Section - Green band */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10">
            <div className="container mx-auto">
              <div className="text-center max-w-4xl mx-auto">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Good News & Solution
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Build Your <span className="text-green-400">Multi-Model Agent?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Stop playing with one club. Get the full bag and start winning.
                </p>
                <Link href="/contact" onClick={handleContactClick}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Build My Multi-Model Agent
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Sticky CTA Section */}
          <section className="py-12 px-4 bg-card border-t border-border">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Choose the Right Model for Every Shot</h3>
                <p className="text-muted-foreground mb-6">
                  Contact → Qualified → Booked → Show → Won
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/pricing" onClick={handlePricingClick}>
                    <Button size="lg">
                      See Pricing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Talk to Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}