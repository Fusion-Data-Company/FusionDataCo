import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  XCircle, 
  TrendingDown, 
  Clock, 
  Bot, 
  BarChart3, 
  CheckCircle2, 
  Shield, 
  Brain,
  MessageSquare,
  Zap,
  Users,
  DollarSign,
  Phone,
  Globe,
  Target
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/components/AnalyticsTracker";
import { apiRequest } from "@/lib/queryClient";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";

function ConversationalAIForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    name: '',
    email: '',
    phone: '',
    challenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      trackEvent({
        category: 'lead_generation',
        action: 'submit',
        label: 'conversational_ai_form',
      });
      
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          formType: 'conversational_ai',
          company: formData.businessName,
          message: formData.challenges
        }),
      });
      
      setSubmitted(true);
      toast({
        title: "Form submitted successfully",
        description: "We'll be in touch within 24 hours to discuss your AI strategy.",
      });
      
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

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-[#121218]/90 p-8 rounded-lg border border-purple-500/30 text-center">
        <h3 className="text-2xl font-bold text-purple-400 mb-4">Thank You!</h3>
        <p className="text-white mb-4">Your conversational AI consultation request has been submitted successfully.</p>
        <p className="text-gray-300">Our AI specialists will contact you within 24 hours to schedule your free strategy session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#121218]/90 p-8 rounded-lg border border-purple-500/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Business Name</label>
          <input 
            type="text" 
            value={formData.businessName}
            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Industry</label>
          <input 
            type="text" 
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
            className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" 
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Your Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" 
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <input 
          type="tel" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" 
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Current AI & Communication Challenges</label>
        <textarea 
          value={formData.challenges}
          onChange={(e) => setFormData({...formData, challenges: e.target.value})}
          className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none h-24" 
          placeholder="Tell us about your biggest customer communication challenges..."
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 [box-shadow:0_0_20px_#a855f740]"
      >
        {isSubmitting ? 'Submitting...' : 'Get My Free AI Strategy Session'}
      </button>
      <p className="text-xs text-gray-400 mt-4 text-center">
        No spam, ever. Your information is 100% secure and will only be used to contact you about your AI consultation.
      </p>
    </form>
  );
}

export default function ConversationalAI() {
  return (
    <>
      <Helmet>
        <title>Conversational AI Solutions | Fusion Data Co</title>
        <meta name="description" content="Revolutionary voice AI agents that never sleep, never quit, and convert 3x better than human reps. Experience AI sales coaches, hiring screeners, and customer service agents." />
        <meta name="keywords" content="conversational AI, voice AI agents, AI sales training, AI customer service, automated calling, AI hiring, chatbots, virtual assistants" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Blue Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0080ff]/20 via-[#0a0a0d] to-[#0a0a0d]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">Conversational AI Agents</span><br />
                  <span className="text-[#0080ff] [text-shadow:0_0_20px_#0080ff]">That Actually Convert</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Stop losing customers while you sleep. Our revolutionary voice AI agents work 24/7/365, never call in sick, and convert 3x better than your best human reps with proven negotiation tactics.
                </p>
              </div>
            </div>
          </section>
          
          {/* Red Pain Points Section with Enhanced Red Ambient Glow */}
          <section className="py-16 px-4 bg-[#0c0c14] relative overflow-hidden">
            {/* Red ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#ff0000]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0000]/3 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The <span className="text-white">Customer Communication Crisis</span> Costing You Millions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Missed Calls & Lost Revenue</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">67% Unanswered Calls:</span> Your potential customers hang up after 4 rings while you're in meetings, resulting in $847 average lost revenue per missed opportunity.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">24/7 Coverage Gap:</span> Customers contact you at nights and weekends when nobody's available, sending them straight to competitors.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Slow Response Times:</span> By the time you return calls or respond to inquiries, prospects have already moved on to faster competitors.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Staff & Training Costs</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">$15,000+ Per Hire:</span> New sales reps require extensive training, 90-day ramp time, and still no guarantee they'll hit quota or stay long-term.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Inconsistent Performance:</span> Human agents have bad days, get sick, take vacations, and deliver inconsistent customer experiences that hurt your brand.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Hiring Waste:</span> HR teams waste 40+ hours per week interviewing unqualified candidates who never make it past the first round.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Competitive Disadvantage & Customer Loss</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Competitor AI Advantage</p>
                          <p className="text-gray-300 text-sm">While you're still using human-only processes, competitors with AI agents are capturing customers 24/7 with instant responses and perfect consistency.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Customer Expectations Gap</p>
                          <p className="text-gray-300 text-sm">Modern customers expect instant responses and 24/7 availability - delays result in negative reviews and lost business to more responsive companies.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Language Barriers</p>
                          <p className="text-gray-300 text-sm">You're losing international customers and diverse local markets because your team can't communicate in multiple languages effectively.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Onboarding Failures</p>
                          <p className="text-gray-300 text-sm">58% of new hires quit within 6 months due to overwhelming processes and poor training - each failure costs you $25,000+ in lost investment.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AI Statistics - Vertical Box */}
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-bold text-center mb-6 text-white">The Customer Communication Crisis</h3>
                    <div className="space-y-4">
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">67%</div>
                        <div className="text-xs text-white">Of business calls go unanswered</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">$847</div>
                        <div className="text-xs text-white">Average revenue lost per missed call</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">40+</div>
                        <div className="text-xs text-white">Hours wasted weekly on bad hires</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">58%</div>
                        <div className="text-xs text-white">New hires quit within 6 months</div>
                      </div>
                    </div>
                    <div className="text-center mt-6 pt-4 border-t border-red-500/20">
                      <p className="text-red-100 font-medium text-sm italic">
                        "While you sleep, your competitors are stealing customers with AI that never stops working."
                      </p>
                      <cite className="text-red-400 text-xs">— Business AI Institute, 2024</cite>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Yellow Product Info Section with Yellow Ambient Glow */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-yellow-800/10 to-amber-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/8 z-0"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">AI Agent Arsenal</span>
              </h2>
              <p className="text-xl text-center text-white mb-12 max-w-4xl mx-auto">
                We've distilled hostage-level negotiation tactics, undercover cop rapport techniques, and every major sales methodology into proprietary AI agents that no competitor can replicate.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* AI Sales Coach */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">AI Sales Coach</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Turns rookies into closers in 30 days with proven methodologies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Pain identification & solution presentation mastery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Real-time coaching with hostage negotiation tactics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Custom knowledge base integration for your industry</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AI Hiring Screener */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">AI Hiring Screener</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Filters 1,000 candidates down to 10 perfect matches automatically</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Indeed automation with AI transcript analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Custom questions and scoring variables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Save 35+ hours per week on unqualified candidates</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AI Website Concierge */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Website Concierge</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Converts visitors to booked calls 24/7 in 40+ languages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Complete website knowledge and product expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Calendar integration and live agent transfer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Advanced objection handling and sales closing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* AI Technology Framework */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">Advanced AI Technology Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Voice & Language Processing</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>ElevenLabs integration for human-like voice quality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Real-time language detection and translation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Sentiment analysis and emotional intelligence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Custom voice cloning and brand personality</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Integration & Automation</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>CRM synchronization and lead management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Calendar booking and appointment scheduling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Multi-platform communication (phone, chat, email)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Performance analytics and optimization insights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* LIVE AI AGENTS DEMO */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-[#ffa500]">🎯 Experience Our AI Agents Live</h3>
                <div className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg p-8 text-center min-h-[400px] flex flex-col justify-center">
                  <p className="text-white mb-6">Talk directly with our conversational AI agents - trained on real estate, insurance, healthcare, and business scenarios:</p>
                  
                  {/* AI Agent Interface */}
                  <div className="mb-6">
                    <ElevenLabsWidget />
                  </div>
                  
                  <p className="text-gray-400 text-sm mt-4">This agent supports voice and text conversations in 40+ languages</p>
                  <div className="bg-[#ffa500]/10 border border-[#ffa500]/20 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
                    <p className="text-[#ffa500] font-semibold">Try asking: "What's my home worth?" or "I need business insurance quotes"</p>
                  </div>
                  
                  {/* Alternative Access */}
                  <div className="mt-6 pt-4 border-t border-[#ffa500]/20">
                    <p className="text-gray-400 text-xs mb-3">Or access the agent directly:</p>
                    <a 
                      href="https://elevenlabs.com/conversational-ai/agents/6701k3kk65vsetbtrmhe3ek7sgdt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#ffa500] hover:bg-[#ffa500]/90 text-black px-4 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      <span>🗣️</span>
                      Open Agent in New Tab
                      <span className="ml-1">↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* AI Performance Stats */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why Our AI Agents Outperform Human Teams</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">24/7</div>
                    <div className="text-sm text-white">Never sleeps, never takes breaks</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">40+</div>
                    <div className="text-sm text-white">Languages supported natively</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">3x</div>
                    <div className="text-sm text-white">Better conversion vs human reps</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">0</div>
                    <div className="text-sm text-white">Sick days or vacation time</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Green Solution Section with Green Ambient Glow */}
          <section id="solutions" className="py-16 px-4 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-green-800/10 to-teal-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete AI Agent Ecosystem
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Bot className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">24/7 Customer Engagement</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">AI agents that never sleep, ensuring every customer gets instant responses</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Multi-language support for global customer base expansion</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Human-like conversation quality with emotional intelligence</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 3x better conversion than human reps</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Brain className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Intelligent Automation</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Automated candidate screening that saves 35+ hours per week</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Sales coaching that turns rookies into closers in 30 days</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Onboarding support that reduces new hire quit rate by 70%</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: $50K+ monthly savings on staff costs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Zap className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Advanced Performance Analytics</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Real-time conversation analytics and optimization recommendations</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">ROI tracking with detailed performance metrics across all channels</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Predictive insights that identify high-value prospects automatically</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 400% improvement in lead qualification</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics Section */}
              <div className="bg-gradient-to-r from-[#14ffc8]/10 to-emerald-500/10 border border-[#14ffc8]/30 rounded-xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-center mb-8">
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Proven AI Agent Results</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">$50K+</div>
                    <div className="text-white font-medium">Monthly Savings</div>
                    <div className="text-gray-400 text-sm mt-1">on staffing costs</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">3x</div>
                    <div className="text-white font-medium">Conversion Rate</div>
                    <div className="text-gray-400 text-sm mt-1">vs human agents</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">35+</div>
                    <div className="text-white font-medium">Hours Saved</div>
                    <div className="text-gray-400 text-sm mt-1">per week per manager</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">24/7</div>
                    <div className="text-white font-medium">Availability</div>
                    <div className="text-gray-400 text-sm mt-1">never misses a lead</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <blockquote className="text-xl italic text-gray-300 mb-4">
                    "Fusion Data Co's AI agents have completely transformed our customer engagement. We're capturing leads 24/7 in multiple languages, and our conversion rate tripled within the first month of implementation."
                  </blockquote>
                  <cite className="text-[#14ffc8] font-semibold">— Sarah Martinez, CEO, Global Tech Solutions</cite>
                </div>
              </div>
              
              {/* Strategic Implementation Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">Your 60-Day AI Transformation</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Strategy & Setup (Days 1-14)</h4>
                        <p className="text-gray-300 text-sm">Complete business analysis, agent customization, and integration setup</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Training & Launch (Days 15-30)</h4>
                        <p className="text-gray-300 text-sm">Deploy AI agents with comprehensive training and monitoring</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Optimization & Scale (Days 31-60)</h4>
                        <p className="text-gray-300 text-sm">Performance optimization, advanced features, and systematic scaling</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">What Makes Our AI Agents Different</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Proprietary Psychology Integration</h4>
                        <p className="text-gray-300 text-sm">Hostage negotiation tactics and undercover cop rapport techniques built into every conversation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Advanced Learning Algorithms</h4>
                        <p className="text-gray-300 text-sm">Continuous improvement through conversation analysis and performance optimization</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Proven Track Record</h4>
                        <p className="text-gray-300 text-sm">Over 200+ successful AI agent deployments with documented 3x conversion improvements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Purple Registration Section */}
          <section id="registration" className="py-16 px-4 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-violet-800/10 to-purple-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/8 via-transparent to-violet-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Deploy Your <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">AI Agent Arsenal?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join over 200+ companies that have revolutionized their customer engagement with AI agents that never sleep and convert 3x better than human reps.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Strategy Session</h3>
                    <p className="text-sm text-gray-300">Complete business analysis and custom AI agent recommendation plan</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Live Demo Access</h3>
                    <p className="text-sm text-gray-300">Try our sales coach, hiring screener, and website concierge agents</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">60-Day ROI Guarantee</h3>
                    <p className="text-sm text-gray-300">See measurable improvement in conversions within 60 days or we'll refund your investment</p>
                  </div>
                </div>

                <ConversationalAIForm />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}