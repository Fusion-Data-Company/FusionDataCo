import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  Phone, 
  MessageSquare, 
  Shield, 
  Users, 
  BarChart3, 
  CheckCircle,
  ArrowRight,
  Play,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckSquare
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';

export default function ConversationalAI() {
  const handleDemoClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'hear_demo'
    });
    // TODO: Open modal with sample audio URL placeholder
    alert("Demo feature coming soon - audio samples will be available here");
  };

  const handlePricingClick = () => {
    trackEvent({
      category: 'engagement', 
      action: 'click',
      label: 'see_pricing_from_conversational_ai'
    });
  };

  return (
    <>
      <Helmet>
        <title>Conversational AI that Answers, Qualifies & Books — 24/7 | Fusion Data Co</title>
        <meta name="description" content="ElevenLabs voice + Vapi telephony + OpenRouter multi-model routing. Phone and SMS that sound human, follow process, and put revenue on your calendar." />
        <meta name="keywords" content="conversational AI, voice agents, SMS automation, lead qualification, appointment booking, ElevenLabs, Vapi, OpenRouter" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Conversational AI that Answers, Qualifies & Books — 24/7" />
        <meta property="og:description" content="Phone and SMS that sound human, follow process, and put revenue on your calendar." />
        <meta property="og:url" content="https://fusiondataco.com/services/conversational-ai" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section - Green band (Solution/Good News) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Solution & Good News
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                    Conversational AI that Answers, Qualifies & Books — 24/7
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  ElevenLabs voice + Vapi telephony + OpenRouter multi-model routing. Phone and SMS that sound human, follow process, and put revenue on your calendar.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="group bg-green-600 hover:bg-green-700" onClick={handleDemoClick}>
                    <Play className="mr-2 h-4 w-4" />
                    Hear a Demo
                  </Button>
                  <Link href="/pricing" onClick={handlePricingClick}>
                    <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
                      See Pricing
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* What It Does Section - Yellow band (Info/Discovery) */}
          <section className="py-16 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Info & Discovery
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What It <span className="text-yellow-400">Does</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive capabilities that work together seamlessly
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <Phone className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Phone Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Inbound/outbound, greeting → intent → qualify → schedule/transfer → CRM summary.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <MessageSquare className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>SMS Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Instant replies, drip nurture, reminders, link delivery, two-way conversation.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <Shield className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Persona Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      System prompts + guardrails; tone locked to your brand.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <Users className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Live Handoffs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Detect hot intent → warm transfer or priority alert.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <BarChart3 className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Transcripts, tags, conversion tracking, and KPI dashboards.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <CheckCircle className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Opt-in/opt-out, consent logging, call-record notices.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works Section - Yellow band (Info/Discovery) */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Info & Discovery
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How It <span className="text-yellow-400">Works</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Column A: Voice */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Phone className="mr-3 h-6 w-6 text-yellow-400" />
                    Voice (ElevenLabs + Vapi)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>STT/TTS:</strong> low-latency recognition + lifelike voice.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Call flow:</strong> greeting → purpose detection → identity capture (name/phone/email) → CRM match/create → qualification (timeframe, budget, need) → booking/transfer → structured summary to CRM.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Handoffs:</strong> warm transfer; voicemail detection; callback scheduling.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Latency envelope:</strong> target &lt;700ms turns for natural feel.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Guardrails:</strong> no PII beyond necessity; do-not-call handling; profanity/abuse fallback.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column B: SMS */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <MessageSquare className="mr-3 h-6 w-6 text-yellow-400" />
                    SMS
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Instant response:</strong> receipt + value link.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Sequencing:</strong> day 1 follow-up, day 3 FAQ, day 7 booking incentive (STOP supported).
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Short links & UTM:</strong> attributable outcomes; fraud checks for links.
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckSquare className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Escalation:</strong> keyword "CALL" or "AGENT" triggers live follow-up.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* n8n Automations Section - Yellow to Green transition */}
          <section className="py-16 px-4 bg-gradient-to-b from-yellow-900/10 to-green-900/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-yellow-500/10 to-green-500/10 text-yellow-400 border-yellow-500/20">
                  Info → Solution Transition
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  n8n <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Automations</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  What we automate (examples):
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="border-yellow-500/20 hover:border-green-500/20 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-yellow-400" />
                      Business Processes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm"><strong>Lead Intake → Deal:</strong> enrich → score → SMS/email → calendar → Slack alert → CRM update.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm"><strong>Case/Ticketing:</strong> classify → assign owner → SLA timers → escalation → close loop.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm"><strong>Docs & E-Sign:</strong> generate PDF → e-sign → deliver → attach to CRM deal/contact.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm"><strong>RevOps Alerts:</strong> payment events → notify team → update dashboard.</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-yellow-500/20 hover:border-green-500/20 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-yellow-400" />
                      Reliability Patterns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Retries + backoff, dead-letter queues, idempotency keys</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Structured logs + alerting, replay tooling</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckSquare className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Secrets vaulted, least-privilege tokens, audit trails</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Sandler Method Alignment - Green band (Good News) */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Good News & Solution
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-green-400">Sandler Method</span> Alignment
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-red-900/20 border-red-500/20">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-2" />
                    <CardTitle className="text-red-400">Pain (Red)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-300">
                      "Leads wait, slip, and go cold."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Slow responses, dropped leads, inconsistent qualification.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-900/20 border-yellow-500/20">
                  <CardHeader>
                    <Info className="h-8 w-8 text-yellow-400 mb-2" />
                    <CardTitle className="text-yellow-400">Info (Yellow)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-yellow-300">
                      "We expose bottlenecks with transcripts, tags, and KPIs."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Transcripts and tags reveal patterns; no guessing.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-900/20 border-green-500/20">
                  <CardHeader>
                    <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                    <CardTitle className="text-green-400">Good News (Green)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-300">
                      "We answer, qualify, and book—automatically."
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Booked meetings, clean CRM, faster close cycles.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Evaluation & Improvement - Yellow band (Info) */}
          <section className="py-16 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Info & Discovery
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Evaluation & <span className="text-yellow-400">Improvement</span>
                </h2>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-yellow-400">Weekly Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Weekly transcript reviews (top 10 wins/losses).</p>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-yellow-400">Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Prompt AB tests; routing tweaks by intent.</p>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-yellow-400">KPI Ladder</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Contact → qualified → booked → showed → won.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Sticky CTA Section - Green band */}
          <section className="py-12 px-4 bg-green-900/20 border-t border-green-500/20">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4 text-green-400">Ready to Transform Your Lead Process?</h3>
                <p className="text-muted-foreground mb-6">
                  Contact → Qualified → Booked → Show → Won
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/pricing" onClick={handlePricingClick}>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      See Pricing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
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