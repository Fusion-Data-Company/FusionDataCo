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
  CheckSquare,
  Clock,
  UserCheck,
  Calendar,
  Zap,
  FileText,
  ShieldCheck,
  Building2,
  Heart,
  DollarSign,
  Home,
  ArrowUpRight,
  PhoneCall,
  MessageCircle,
  Bot,
  Brain
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from 'react';

export default function ConversationalAI() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleDemoClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'hear_demo'
    });
    setIsDemoOpen(true);
  };

  const handlePricingClick = () => {
    trackEvent({
      category: 'engagement', 
      action: 'click',
      label: 'see_pricing_from_conversational_ai'
    });
  };

  const handleContactClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'contact_from_conversational_ai'
    });
  };

  return (
    <>
      <Helmet>
        <title>Conversational AI that Answers, Qualifies & Books — 24/7 | Fusion Data Co</title>
        <meta name="description" content="ElevenLabs voice + Vapi telephony + OpenRouter routing. Phone and SMS that sound human, follow process, and put revenue on your calendar." />
        <meta name="keywords" content="conversational AI, voice agents, SMS automation, lead qualification, appointment booking, ElevenLabs, Vapi, OpenRouter" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Conversational AI that Answers, Qualifies & Books — 24/7" />
        <meta property="og:description" content="Phone and SMS that sound human, follow process, and put revenue on your calendar." />
        <meta property="og:url" content="https://fusiondataco.com/services/conversational-ai" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section - Green band (Good News/CTA) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Good News & Solution
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                    Conversational AI that Answers, Qualifies & Books — 24/7
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  ElevenLabs voice + Vapi telephony + OpenRouter routing. Phone and SMS that sound human, follow process, and put revenue on your calendar.
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

          {/* Pain Points Section - Red band */}
          <section className="py-16 px-4 bg-gradient-to-b from-red-900/20 to-red-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
                  Pain: Revenue Leaking Daily
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-400">
                  Every Missed Call = Lost Revenue
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Dropped Calls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      67% of calls go to voicemail during business hours. Prospects hang up or call competitors.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <Clock className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Slow Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Average SMS response: 14+ hours. Leads decay 90% after first hour.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Wasted Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Unqualified prospects consume sales time. No structured qualification process.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* What It Does Section - Yellow band (Info) */}
          <section className="py-16 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Information & Discovery
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What It <span className="text-yellow-400">Does</span>
                </h2>
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
                      Instant replies, drip nurture, reminders, link delivery.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <Users className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Persona Control</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Guardrails ensure tone matches your brand.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <PhoneCall className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Live Handoffs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Detect hot leads → transfer instantly with context.
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
                      Transcripts, tagging, conversion dashboards.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-yellow-500/20">
                  <CardHeader>
                    <ShieldCheck className="h-10 w-10 text-yellow-400 mb-4" />
                    <CardTitle>Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      TCPA opt-in/out, call-record notices, consent logging.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How It <span className="text-primary">Works</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Voice Column */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-6 w-6 text-primary" />
                      Voice (ElevenLabs + Vapi)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">STT/TTS with sub-second latency.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Call flow: greet → detect purpose → capture ID → CRM match → qualify → schedule/transfer → structured summary.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Warm transfer support, voicemail detection, callback scheduling.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Guardrails: profanity fallback, do-not-call checks, PII minimization.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* SMS Column */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                      SMS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm"><strong>T+0:</strong> instant receipt & value link.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm"><strong>Day 1:</strong> tip + soft CTA.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm"><strong>Day 3:</strong> FAQ answer + booking link.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm"><strong>Day 7:</strong> incentive to schedule.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">STOP/HELP required; consent logged.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Industry Examples Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Industry <span className="text-primary">Examples</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Enterprise polish for real business outcomes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Home className="h-8 w-8 text-blue-500 mb-3" />
                    <CardTitle>Real Estate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Call → qualify buyer → auto-book showing.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Shield className="h-8 w-8 text-green-500 mb-3" />
                    <CardTitle>Insurance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      SMS → policy renewal reminder → payment link.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Heart className="h-8 w-8 text-red-500 mb-3" />
                    <CardTitle>Healthcare</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Phone → appointment booking → HIPAA consent note.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <DollarSign className="h-8 w-8 text-yellow-500 mb-3" />
                    <CardTitle>Finance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Loan pre-qualification → checklist delivery via SMS.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Metrics Framing Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Proven <span className="text-primary">Metrics</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">&lt;1 sec</div>
                    <p className="text-sm text-muted-foreground">Average voice response time</p>
                    <div className="text-2xl font-bold text-secondary mt-2">&lt;5 sec</div>
                    <p className="text-sm text-muted-foreground">Average SMS response time</p>
                  </CardContent>
                </Card>

                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-green-500 mb-2">15-30%</div>
                    <p className="text-sm text-muted-foreground">Conversion lifts from instant follow-up</p>
                  </CardContent>
                </Card>

                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-yellow-500 mb-2">Hours → Seconds</div>
                    <p className="text-sm text-muted-foreground">Lead decay reduced</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Industry Examples Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-blue-900/10 to-blue-800/5">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Industry <span className="text-blue-400">Examples</span>
                </h2>
                <p className="text-lg text-muted-foreground">Enterprise-grade solutions across verticals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Home className="h-8 w-8 text-blue-500" />
                      <CardTitle>Real Estate</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Call → qualify buyer → auto-book showing.
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
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      SMS → policy renewal reminder → payment link.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Heart className="h-8 w-8 text-blue-500" />
                      <CardTitle>Healthcare</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Phone → appointment booking → HIPAA consent note.
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
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Loan pre-qualification → checklist delivery via SMS.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Metrics Framing Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Performance <span className="text-primary">Metrics</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">&lt;1 sec</div>
                    <p className="text-sm text-muted-foreground">Voice response time</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">&lt;5 sec</div>
                    <p className="text-sm text-muted-foreground">SMS response time</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">+15-30%</div>
                    <p className="text-sm text-muted-foreground">Conversion lift from instant follow-up</p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-8">
                  Lead decay reduced: hours → seconds
                </p>
              </div>
            </div>
          </section>

          {/* Sandler Alignment Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-background to-red-900/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Sandler <span className="text-primary">Alignment</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Red - Pain */}
                <Card className="border-red-500/20 bg-red-900/5">
                  <CardHeader>
                    <Badge className="mb-2 bg-red-500/10 text-red-400 border-red-500/20">
                      Pain
                    </Badge>
                    <CardTitle className="text-red-400">Identify Problems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Dropped calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Slow response</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>Wasted leads</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Yellow - Info */}
                <Card className="border-yellow-500/20 bg-yellow-900/5">
                  <CardHeader>
                    <Badge className="mb-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                      Info
                    </Badge>
                    <CardTitle className="text-yellow-400">Discover Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Transcripts & tags</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Reveal bottlenecks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span>Process gaps</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Green - Good News */}
                <Card className="border-green-500/20 bg-green-900/5">
                  <CardHeader>
                    <Badge className="mb-2 bg-green-500/10 text-green-400 border-green-500/20">
                      Good News
                    </Badge>
                    <CardTitle className="text-green-400">Deliver Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Qualified automatically</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Booked in calendar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>Logged in CRM</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-primary/5">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-primary">Lead Response</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop losing leads to slow response times. Start converting with AI that never sleeps.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/pricing" onClick={handlePricingClick}>
                  <Button size="lg" className="group">
                    View Pricing Plans
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact" onClick={handleContactClick}>
                  <Button size="lg" variant="outline">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      {/* Demo Modal */}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hear Our AI in Action</DialogTitle>
            <DialogDescription>
              Experience how our conversational AI handles real customer interactions with natural voice and intelligent responses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Sample Call: Real Estate Lead Qualification</p>
              <audio controls className="w-full">
                <source src="/demo-audio-placeholder.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Sample Call: Insurance Renewal</p>
              <audio controls className="w-full">
                <source src="/demo-audio-placeholder-2.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Audio samples coming soon. Contact us for a live demo.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}