import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  Brain,
  Globe,
  Star,
  Target,
  Briefcase,
  GraduationCap,
  ExternalLink
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";

// Form schema for voice agents demo registration
const voiceAgentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Please select your industry"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  revenue: z.string().min(1, "Please select your revenue range"),
  teamSize: z.string().min(1, "Please select your team size"),
  challenge: z.string().min(10, "Please describe your biggest challenge"),
  formType: z.string().default("voice_agents_demo"),
  source: z.string().default("voice_agents_page")
});

type VoiceAgentFormValues = z.infer<typeof voiceAgentFormSchema>;

export default function ConversationalAI() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<VoiceAgentFormValues>({
    resolver: zodResolver(voiceAgentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      industry: "",
      phone: "",
      revenue: "",
      teamSize: "",
      challenge: "",
      formType: "voice_agents_demo",
      source: "voice_agents_page"
    },
  });

  const handleAgentClick = (agentName: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `demo_${agentName}_agent`
    });
  };

  const onSubmit = async (data: VoiceAgentFormValues) => {
    setIsSubmitting(true);
    
    try {
      trackEvent({
        category: 'lead_generation',
        action: 'submit', 
        label: 'voice_agents_demo_form',
      });
      
      // Submit to backend
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          message: `Voice Agents Demo Request - Company: ${data.company}, Industry: ${data.industry}, Revenue: ${data.revenue}, Team Size: ${data.teamSize}, Challenge: ${data.challenge}`
        }),
      });
      
      setSubmitted(true);
      toast({
        title: "Strategy Session Booked!",
        description: "We'll contact you within 24 hours to schedule your custom demo.",
      });
      
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Voice AI Agents in Action — See Live Demos | Fusion Data Co</title>
        <meta name="description" content="Experience our revolutionary voice AI agents: Sales Coach, Hiring Screener, Onboarding Companion & Website Concierge. Try live demos now." />
        <meta name="keywords" content="voice AI agents, AI sales training, AI hiring, AI onboarding, conversational AI, ElevenLabs, live demos" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Voice AI Agents in Action — See Live Demos" />
        <meta property="og:description" content="Experience revolutionary AI agents that never sleep, never quit, and convert 3x better than human reps." />
        <meta property="og:url" content="https://fusiondataco.com/services/conversational-ai" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground enterprise-background">
        <Header />
        <main className="flex-grow">

          {/* RED SECTION - PAIN (Alex Hormozi Hook) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-red-900/20 to-red-800/10 relative overflow-hidden enterprise-background elite-section-red">
            <div className="absolute inset-0 bg-red-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-5xl mx-auto mb-16">
                <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20 elite-badge">
                  Pain: The $10,000/Month Problem
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                    While You Sleep, Your Competitors Steal Your Customers
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Here's what nobody tells you about running a business in 2025: While you're sleeping, your competitors are stealing your customers with AI agents that never sleep, never call in sick, and convert 3x better than your best sales rep.
                </p>
                <p className="text-lg text-red-300 mb-8">
                  Meanwhile, you're still paying $10,000+ per month for humans who miss calls, forget follow-ups, and let qualified leads slip through the cracks.
                </p>
              </div>

              {/* Pain Points Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Card className="border-red-500/20 bg-red-500/5 premium-card">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3 elite-icon" />
                    <CardTitle className="text-red-400">Lost Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      67% of calls go unanswered. Average loss: $847 per missed opportunity.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5 premium-card">
                  <CardHeader>
                    <Clock className="h-8 w-8 text-red-400 mb-3 elite-icon" />
                    <CardTitle className="text-red-400">Unqualified Interviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      HR teams waste 40+ hours/week on bad candidates who never make it past round one.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5 premium-card">
                  <CardHeader>
                    <DollarSign className="h-8 w-8 text-red-400 mb-3 elite-icon" />
                    <CardTitle className="text-red-400">Training Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      $15,000+ per new sales hire, 90-day ramp time, and still no guarantee they'll hit quota.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20 bg-red-500/5 premium-card">
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 text-red-400 mb-3 elite-icon" />
                    <CardTitle className="text-red-400">Onboarding Failures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      58% of new hires quit within 6 months due to poor training and overwhelming processes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* YELLOW SECTION - SOLUTION (The Fusion Voice Arsenal) */}
          <section className="py-16 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10 enterprise-background elite-section-yellow">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 elite-badge">
                  Solution: The Fusion Voice Arsenal
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  <span className="text-yellow-400">Experience AI Agents That Actually Work</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  What makes Fusion agents different? We've distilled hostage-level negotiation tactics, undercover cop instant rapport techniques, and every major sales methodology into proprietary foundational prompts that no competitor can replicate.
                </p>
              </div>
              
              {/* Voice Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                
                {/* Agent 1: AI Sales Coach */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:shadow-xl transition-all premium-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="h-10 w-10 text-yellow-400 elite-icon" />
                      <div>
                        <CardTitle className="text-xl">AI Sales Coach</CardTitle>
                        <p className="text-sm text-yellow-300">For Sales Teams</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-yellow-400">
                      The Sandler-Trained AI That Turns Rookies Into Closers in 30 Days
                    </h3>
                    <p className="text-sm text-muted-foreground">(No More $15K Training Programs)</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Pain identification & tool presentation mastery</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Hostage negotiation tactics integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Real-time pitch coaching & feedback</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Custom knowledge base integration</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700 glass-button"
                      onClick={() => {
                        handleAgentClick('sales_coach');
                        window.open('https://elevenlabs.io/app/talk-to?agent_id=agent_01jz0xtv25ej8axfe92t1sdv9t', '_blank');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Try Sales Coach Demo
                    </Button>
                  </CardContent>
                </Card>

                {/* Agent 2: AI Hiring Screener */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:shadow-xl transition-all premium-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <UserCheck className="h-10 w-10 text-yellow-400 elite-icon" />
                      <div>
                        <CardTitle className="text-xl">AI Hiring Screener</CardTitle>
                        <p className="text-sm text-yellow-300">For HR Directors</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-yellow-400">
                      The Interview Bot That Filters 1,000 Candidates Down to 10 Perfect Matches
                    </h3>
                    <p className="text-sm text-muted-foreground">(Save 35+ Hours/Week)</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Indeed automation integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">AI transcript analysis & scoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Custom questions & variables</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Only interview pre-qualified A-players</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700 glass-button"
                      onClick={() => {
                        handleAgentClick('hiring_screener');
                        window.open('https://elevenlabs.io/app/talk-to?agent_id=agent_01k07mhgszfcg9br6n46m8d35m', '_blank');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Try Hiring Screener Demo
                    </Button>
                  </CardContent>
                </Card>

                {/* Agent 3: AI Onboarding Companion */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:shadow-xl transition-all premium-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Heart className="h-10 w-10 text-yellow-400 elite-icon" />
                      <div>
                        <CardTitle className="text-xl">AI Onboarding Companion</CardTitle>
                        <p className="text-sm text-yellow-300">For New Hires</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-yellow-400">
                      The Empathetic AI Mentor That Cuts Onboarding Time by 70%
                    </h3>
                    <p className="text-sm text-muted-foreground">(While Boosting Retention)</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Tactical empathy & supportive coaching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Full company knowledge base access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Overwhelming situation management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Historical data & project guidance</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700 glass-button"
                      onClick={() => {
                        handleAgentClick('onboarding_companion');
                        window.open('https://elevenlabs.io/app/talk-to?agent_id=agent_01jxb0mn53ft19tt6crjzaqnwc', '_blank');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Try Onboarding Demo
                    </Button>
                  </CardContent>
                </Card>

                {/* Agent 4: AI Website Concierge */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:shadow-xl transition-all premium-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="h-10 w-10 text-yellow-400 elite-icon" />
                      <div>
                        <CardTitle className="text-xl">AI Website Concierge</CardTitle>
                        <p className="text-sm text-yellow-300">For Websites</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-yellow-400">
                      The Multilingual Sales Agent That Converts Visitors to Booked Calls 24/7/365
                    </h3>
                    <p className="text-sm text-muted-foreground">(40+ Languages)</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Website layout & product knowledge</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Twilio & Google Calendar integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Live agent transfer for emergencies</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 elite-icon" />
                        <span className="text-sm">Objection handling & sales closes</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700 glass-button"
                      onClick={() => {
                        handleAgentClick('website_concierge');
                        window.open('https://elevenlabs.io/app/talk-to?agent_id=ybtdqCeRrbskLzgWulrg', '_blank');
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Try Website Concierge Demo
                    </Button>
                  </CardContent>
                </Card>

              </div>

              {/* Languages Section */}
              <div className="mt-16 text-center">
                <Card className="border-yellow-500/20 bg-yellow-500/5 max-w-4xl mx-auto premium-card">
                  <CardHeader>
                    <CardTitle className="text-2xl text-yellow-400">40+ Languages Supported</CardTitle>
                    <p className="text-muted-foreground">
                      Our agents can detect, speak, and translate in real-time across dozens of languages
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
                      {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Turkish', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Czech', 'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Slovak', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Filipino', 'Ukrainian', 'Bengali', 'Tamil', 'Telugu'].map((language) => (
                        <Badge key={language} variant="outline" className="text-xs border-yellow-500/20 elite-badge">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* GREEN SECTION - ROI/GOOD NEWS */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10 enterprise-background elite-section-green">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20 elite-badge">
                  Good News: The $50K+ Monthly Savings
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  <span className="text-green-400">Here's What Happens Next</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  Companies implementing our voice agent arsenal report game-changing results:
                </p>
              </div>

              {/* ROI Value Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-4 elite-icon" />
                    <div className="text-3xl font-bold text-green-400 mb-2 text-center">$35,000/month</div>
                    <p className="text-sm text-muted-foreground text-center">Saved on hiring costs by eliminating bad candidates</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4 elite-icon" />
                    <div className="text-3xl font-bold text-green-400 mb-2 text-center">47%</div>
                    <p className="text-sm text-muted-foreground text-center">Revenue increase with never-miss lead response</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Clock className="h-12 w-12 text-green-400 mx-auto mb-4 elite-icon" />
                    <div className="text-3xl font-bold text-green-400 mb-2 text-center">70%</div>
                    <p className="text-sm text-muted-foreground text-center">Reduction in training time with AI coaching</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Users className="h-12 w-12 text-green-400 mx-auto mb-4 elite-icon" />
                    <div className="text-3xl font-bold text-green-400 mb-2 text-center">58%</div>
                    <p className="text-sm text-muted-foreground text-center">Reduction in turnover with proper onboarding</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Globe className="h-12 w-12 text-green-400 mx-auto mb-4 elite-icon" />
                    <div className="text-3xl font-bold text-green-400 mb-2 text-center">24/7/365</div>
                    <p className="text-sm text-muted-foreground text-center">Availability in 40+ languages</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Shield className="h-12 w-12 text-green-400 mx-auto mb-4 elite-icon" />
                    <div className="text-3xl font-bold text-green-400 mb-2 text-center">Zero</div>
                    <p className="text-sm text-muted-foreground text-center">Sick days, vacations, or workplace drama</p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Proof Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Star className="h-8 w-8 text-green-400 mb-3 elite-icon" />
                    <p className="text-sm text-green-300 mb-2 font-semibold">Real Estate Client</p>
                    <p className="text-sm text-muted-foreground">
                      "Went from 23% to 71% lead conversion in 90 days with the AI Sales Coach"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Star className="h-8 w-8 text-green-400 mb-3 elite-icon" />
                    <p className="text-sm text-green-300 mb-2 font-semibold">Manufacturing Company</p>
                    <p className="text-sm text-muted-foreground">
                      "Saved $847 per interview by filtering candidates with AI Hiring Screener first"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 premium-card">
                  <CardContent className="pt-6">
                    <Star className="h-8 w-8 text-green-400 mb-3 elite-icon" />
                    <p className="text-sm text-green-300 mb-2 font-semibold">SaaS Startup</p>
                    <p className="text-sm text-muted-foreground">
                      "Reduced onboarding from 6 weeks to 10 days with the AI Onboarding Companion"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* REGISTRATION FORM SECTION */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/10 to-background enterprise-background">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                
                {submitted ? (
                  <Card className="border-green-500/20 bg-green-500/5 premium-card">
                    <CardContent className="pt-8 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-green-400 mb-4">Strategy Session Booked!</h2>
                      <p className="text-lg text-muted-foreground mb-2">
                        We'll contact you within 24 hours to schedule your custom voice agent demonstration.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Get ready to see how AI agents can transform your business operations.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-primary/20 premium-card">
                    <CardHeader className="text-center">
                      <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                        Get Your Custom Voice Agent Strategy Session
                      </CardTitle>
                      <p className="text-xl text-primary font-semibold">(Worth $2,500) - FREE for the Next 48 Hours</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Limited to 10 companies this month due to custom agent development time
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Smith" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john@company.com" type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Acme Corporation" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(555) 123-4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="industry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Industry *</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your industry" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="real_estate">Real Estate</SelectItem>
                                      <SelectItem value="insurance">Insurance</SelectItem>
                                      <SelectItem value="healthcare">Healthcare</SelectItem>
                                      <SelectItem value="finance">Finance</SelectItem>
                                      <SelectItem value="technology">Technology</SelectItem>
                                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                      <SelectItem value="retail">Retail</SelectItem>
                                      <SelectItem value="legal">Legal</SelectItem>
                                      <SelectItem value="consulting">Consulting</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="revenue"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Monthly Revenue Range *</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select revenue range" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="under_10k">Under $10K</SelectItem>
                                      <SelectItem value="10k_25k">$10K - $25K</SelectItem>
                                      <SelectItem value="25k_50k">$25K - $50K</SelectItem>
                                      <SelectItem value="50k_100k">$50K - $100K</SelectItem>
                                      <SelectItem value="100k_250k">$100K - $250K</SelectItem>
                                      <SelectItem value="250k_500k">$250K - $500K</SelectItem>
                                      <SelectItem value="500k_1m">$500K - $1M</SelectItem>
                                      <SelectItem value="over_1m">Over $1M</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="teamSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Team Size (Sales/Support) *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select team size" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="just_me">Just me</SelectItem>
                                    <SelectItem value="2_5">2-5 people</SelectItem>
                                    <SelectItem value="6_10">6-10 people</SelectItem>
                                    <SelectItem value="11_25">11-25 people</SelectItem>
                                    <SelectItem value="26_50">26-50 people</SelectItem>
                                    <SelectItem value="over_50">Over 50 people</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="challenge"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Biggest Customer Service Challenge *</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe your biggest challenge with customer service, hiring, training, or lead response..."
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            size="lg" 
                            className="w-full bg-primary hover:bg-primary/90 glass-button" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Booking Your Session..." : "Book My FREE Strategy Session"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>

                          <p className="text-xs text-muted-foreground text-center">
                            By submitting this form, you agree to receive follow-up communications about our voice agent services. 
                            For pricing information, please contact our sales team during your strategy session.
                          </p>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}