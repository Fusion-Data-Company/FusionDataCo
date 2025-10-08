import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  XCircle, 
  TrendingDown, 
  Clock, 
  Target, 
  BarChart3, 
  CheckCircle2, 
  Shield, 
  Activity,
  Brain,
  Zap,
  Users,
  DollarSign,
  AlertTriangle,
  Wind,
  MapPin,
  Compass
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/components/AnalyticsTracker";
import { apiRequest } from "@/lib/queryClient";
import Slideshow from "@/components/Slideshow";

const golfBagSlides = [
  {
    id: 1,
    title: "Slide 1: The Mistake",
    icon: <span className="text-4xl">❌</span>,
    titleColor: "text-red-400",
    bgColor: "bg-gradient-to-br from-red-900/20 to-red-800/10",
    borderColor: "border-red-500/30",
    subtitle: "Every golfer makes this error",
    content: (
      <div className="space-y-4">
        <p className="text-white">Like a weekend golfer grabbing their driver for every shot, most businesses use one AI model for every task - GPT-4 for everything.</p>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h4 className="font-bold text-red-300 mb-2">The Single-Model Trap</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Using GPT-4o for simple data cleanup: $50 per task</li>
            <li>• Using Claude Haiku for complex analysis: Poor results</li>
            <li>• No optimization, no strategy, just "hit and hope"</li>
          </ul>
        </div>
        <p className="text-gray-300 text-sm italic">Result: 300% higher costs, 60% worse performance</p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Slide 2: The Golf Bag",
    icon: <span className="text-4xl">🏌️</span>,
    titleColor: "text-blue-400",
    bgColor: "bg-gradient-to-br from-blue-900/20 to-blue-800/10",
    borderColor: "border-blue-500/30",
    subtitle: "Pro golfers carry 14 clubs for different shots",
    content: (
      <div className="space-y-4">
        <p className="text-white">Professional golfers don't use one club - they carry a strategic selection of 14 different clubs, each optimized for specific situations.</p>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-bold text-blue-300 mb-2">The Professional's Arsenal</h4>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
            <div>
              <strong>Driver:</strong> Long distance shots<br/>
              <strong>Irons:</strong> Precision approach<br/>
              <strong>Wedges:</strong> Short game finesse
            </div>
            <div>
              <strong>Putter:</strong> Finishing the hole<br/>
              <strong>Hybrid:</strong> Versatile situations<br/>
              <strong>Sand Wedge:</strong> Trouble recovery
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">AI Strategy: Have the right model for every business task</p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Slide 3: Analyzing the Lie",
    icon: <span className="text-4xl">🔍</span>,
    titleColor: "text-yellow-400",
    bgColor: "bg-gradient-to-br from-yellow-900/20 to-yellow-800/10",
    borderColor: "border-yellow-500/30",
    subtitle: "Data quality determines model choice",
    content: (
      <div className="space-y-4">
        <p className="text-white">Before selecting a club, pros analyze their "lie" - is the ball on perfect grass, in the rough, or in a bunker?</p>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-300 mb-2">Data Quality Assessment</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div><strong>Clean Data (Fairway):</strong> Use efficient models like Llama or Gemini</div>
            <div><strong>Messy Data (Rough):</strong> Need GPT-4o's advanced reasoning</div>
            <div><strong>Corrupted Data (Bunker):</strong> Claude's structured approach</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">Match your model choice to your data conditions</p>
      </div>
    ),
  },
  {
    id: 4,
    title: "Slide 4: Measuring Distance",
    icon: <span className="text-4xl">📏</span>,
    titleColor: "text-green-400",
    bgColor: "bg-gradient-to-br from-green-900/20 to-green-800/10",
    borderColor: "border-green-500/30",
    subtitle: "Context length determines model selection",
    content: (
      <div className="space-y-4">
        <p className="text-white">Golf pros use rangefinders to measure exact distances. In AI, we measure "context length" - how much information the model needs to process.</p>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="font-bold text-green-300 mb-2">Context Length Strategy</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div><strong>Short Tasks (Putter):</strong> Grok, Haiku - quick & cheap</div>
            <div><strong>Medium Tasks (Iron):</strong> Claude Sonnet - balanced performance</div>
            <div><strong>Long Tasks (Driver):</strong> GPT-4 Turbo - maximum context</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">200-word email vs 50-page document analysis</p>
      </div>
    ),
  },
  {
    id: 5,
    title: "Slide 5: Reading the Wind",
    icon: <span className="text-4xl">💨</span>,
    titleColor: "text-purple-400",
    bgColor: "bg-gradient-to-br from-purple-900/20 to-purple-800/10",
    borderColor: "border-purple-500/30",
    subtitle: "Latency requirements guide model choice",
    content: (
      <div className="space-y-4">
        <p className="text-white">Wind affects every golf shot. In AI, "latency" is your wind - how fast do you need results?</p>
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="font-bold text-purple-300 mb-2">Speed vs Quality Trade-offs</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div><strong>Real-time (Strong Wind):</strong> Groq, Grok - sub-second responses</div>
            <div><strong>Batch Processing (Calm):</strong> GPT-4 - optimize for quality</div>
            <div><strong>Interactive (Light Breeze):</strong> Claude - balanced speed</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">Customer chat vs overnight report generation</p>
      </div>
    ),
  },
  {
    id: 6,
    title: "Slide 6: Angle of Attack",
    icon: <span className="text-4xl">📐</span>,
    titleColor: "text-orange-400",
    bgColor: "bg-gradient-to-br from-orange-900/20 to-orange-800/10",
    borderColor: "border-orange-500/30",
    subtitle: "Determinism needs shape your approach",
    content: (
      <div className="space-y-4">
        <p className="text-white">Golf shots need the right angle - steep for sand traps, shallow for chip shots. In AI, this is "determinism" - how consistent do results need to be?</p>
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
          <h4 className="font-bold text-orange-300 mb-2">Consistency Requirements</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div><strong>High Determinism:</strong> Claude for compliance, legal docs</div>
            <div><strong>Creative Tasks:</strong> GPT-4 for brainstorming, content</div>
            <div><strong>Structured Output:</strong> GPT-4 with JSON mode</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">Financial reports vs marketing copy</p>
      </div>
    ),
  },
  {
    id: 7,
    title: "Slide 7: Club Fitting",
    icon: <span className="text-4xl">⚙️</span>,
    titleColor: "text-teal-400",
    bgColor: "bg-gradient-to-br from-teal-900/20 to-teal-800/10",
    borderColor: "border-teal-500/30",
    subtitle: "OpenRouter optimizes model selection",
    content: (
      <div className="space-y-4">
        <p className="text-white">Pro golfers get custom-fitted clubs. OpenRouter is your AI club fitter - automatically selecting the optimal model for each task.</p>
        <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-4">
          <h4 className="font-bold text-teal-300 mb-2">Automatic Optimization</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div>• 100+ models available instantly</div>
            <div>• Automatic failover if models are down</div>
            <div>• Cost optimization based on task complexity</div>
            <div>• Performance monitoring and adjustment</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">No manual model switching - it's all automated</p>
      </div>
    ),
  },
  {
    id: 8,
    title: "Slide 8: Keeping Score",
    icon: <span className="text-4xl">📊</span>,
    titleColor: "text-cyan-400",
    bgColor: "bg-gradient-to-br from-cyan-900/20 to-cyan-800/10",
    borderColor: "border-cyan-500/30",
    subtitle: "Metrics drive continuous improvement",
    content: (
      <div className="space-y-4">
        <p className="text-white">Every golf round is scored. Every AI task should be measured against business outcomes.</p>
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
          <h4 className="font-bold text-cyan-300 mb-2">AI Performance Scorecard</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div><strong>Speed:</strong> Response time per task type</div>
            <div><strong>Quality:</strong> Accuracy vs business requirements</div>
            <div><strong>Cost:</strong> $ per successful outcome</div>
            <div><strong>Reliability:</strong> Success rate & uptime</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">Track what matters to your business goals</p>
      </div>
    ),
  },
  {
    id: 9,
    title: "Slide 9: Avoiding Hazards",
    icon: <span className="text-4xl">⚠️</span>,
    titleColor: "text-red-400",
    bgColor: "bg-gradient-to-br from-red-900/20 to-red-800/10",
    borderColor: "border-red-500/30",
    subtitle: "Risk management and guardrails",
    content: (
      <div className="space-y-4">
        <p className="text-white">Smart golfers play around water hazards and sand traps. Smart businesses build guardrails around AI risks.</p>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h4 className="font-bold text-red-300 mb-2">AI Risk Mitigation</h4>
          <div className="text-sm text-gray-300 space-y-2">
            <div><strong>Hallucination Detection:</strong> Cross-validate critical outputs</div>
            <div><strong>Data Privacy:</strong> Never send sensitive data to wrong models</div>
            <div><strong>Cost Controls:</strong> Automatic spending limits and alerts</div>
            <div><strong>Backup Models:</strong> Failover when primary models fail</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">Prevention is better than costly mistakes</p>
      </div>
    ),
  },
  {
    id: 10,
    title: "Slide 10: Winning the Game",
    icon: <span className="text-4xl">🏆</span>,
    titleColor: "text-gold-400 text-yellow-400",
    bgColor: "bg-gradient-to-br from-yellow-900/20 to-gold-800/10",
    borderColor: "border-yellow-500/30",
    subtitle: "Multi-model success results",
    content: (
      <div className="space-y-4">
        <p className="text-white">The golf bag approach doesn't just lower your score - it wins tournaments. Multi-model AI doesn't just cut costs - it transforms businesses.</p>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-300 mb-2">Proven Results</h4>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <strong>60% Cost Reduction</strong><br/>
              Smart model selection
            </div>
            <div>
              <strong>3x Better Accuracy</strong><br/>
              Right tool, right task
            </div>
            <div>
              <strong>99.9% Uptime</strong><br/>
              Automatic failover
            </div>
            <div>
              <strong>5min Setup</strong><br/>
              OpenRouter integration
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm italic">From amateur hour to professional performance</p>
      </div>
    ),
  },
];

function MultiModelAgentsForm() {
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
        label: 'multi_model_agents_form',
      });
      
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          formType: 'multi_model_agents',
          company: formData.businessName,
          message: formData.challenges
        }),
      });
      
      setSubmitted(true);
      toast({
        title: "Form submitted successfully",
        description: "We'll be in touch within 24 hours to discuss your multi-model strategy.",
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
        <p className="text-white mb-4">Your multi-model AI consultation request has been submitted successfully.</p>
        <p className="text-gray-300">Our AI architects will contact you within 24 hours to discuss your Golf Bag strategy implementation.</p>
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
        <label className="block text-sm font-medium mb-2">Current AI Model Challenges</label>
        <textarea 
          value={formData.challenges}
          onChange={(e) => setFormData({...formData, challenges: e.target.value})}
          className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none h-24" 
          placeholder="Tell us about your biggest AI model selection and routing challenges..."
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 [box-shadow:0_0_20px_#a855f740]"
      >
        {isSubmitting ? 'Submitting...' : 'Get My Golf Bag Strategy Session'}
      </button>
      <p className="text-xs text-gray-400 mt-4 text-center">
        No spam, ever. Your information is 100% secure and will only be used to contact you about your multi-model AI consultation.
      </p>
    </form>
  );
}

export default function MultiModelAgents() {
  return (
    <>
      <Helmet>
        <title>FUSION Multi-Model AI Routing | The Golf Bag Approach | FUSION Data Co</title>
        <meta name="description" content="FUSION-powered multi-model AI routing eliminates the 'best AI model' question. Our Golf Bag approach delivers the right FUSION model for each task. OpenRouter integration, 60% cost reduction, 3x accuracy improvement through intelligent FUSION optimization." />
        <meta name="keywords" content="FUSION multi-model AI, FUSION OpenRouter integration, FUSION AI routing, FUSION model selection, FUSION Golf Bag approach, FUSION enterprise AI optimization, FUSION AI cost reduction, intelligent FUSION routing, automated FUSION optimization" />
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
                  <span className="text-white">Multi-Model AI Routing</span><br />
                  <span className="text-[#0080ff] [text-shadow:0_0_20px_#0080ff]">The Golf Bag Approach</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Stop asking "What's the best AI model?" The pro's answer: "What's the best model for this shot?" Our Golf Bag methodology optimizes every AI task for maximum performance and minimum cost.
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
                The <span className="text-white">Single-Model Trap</span> Destroying Your AI ROI
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Wrong Tool, Massive Costs</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">GPT-4 Overkill:</span> Using $0.06/1K tokens for simple SMS copy when Grok costs $0.0015 - that's 4000% markup for identical results.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Performance Bottlenecks:</span> Using Claude for real-time voice calls creates 3-second delays that kill conversions and frustrate customers.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Under-optimized Tasks:</span> Using cheap models for complex analysis produces garbage outputs that require expensive human cleanup.
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
                        <AlertTriangle className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Vendor Lock-in & Risk</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Single Point of Failure:</span> OpenAI rate limits hit? Your entire business stops. One vendor dependency means fragile operations.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Price Manipulation:</span> Locked into one provider means you pay whatever they charge - no negotiating power or alternatives.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Innovation Stagnation:</span> Missing out on newer, better, cheaper models because you're locked into outdated infrastructure.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Optimization Strategy Failures</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">No Task-Model Matching</p>
                          <p className="text-gray-300 text-sm">Without intelligent routing logic, you're overpaying and underperforming on every AI task your business runs.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Performance Blind Spots</p>
                          <p className="text-gray-300 text-sm">No analytics on which models work best for which tasks - just guesswork and hope that leads to wasted budget.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Scaling Nightmares</p>
                          <p className="text-gray-300 text-sm">As your business grows, AI costs explode because you have no systematic approach to model selection and optimization.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Competitive Disadvantage</p>
                          <p className="text-gray-300 text-sm">Competitors using optimized multi-model strategies deliver faster, cheaper, better results while you struggle with one-size-fits-all.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* AI Model Statistics - Vertical Box */}
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-bold text-center mb-6 text-white">The AI Model Selection Crisis</h3>
                    <div className="space-y-4">
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">4000%</div>
                        <div className="text-xs text-white">Cost markup using wrong model</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">73%</div>
                        <div className="text-xs text-white">Of businesses use single-model strategy</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">3sec</div>
                        <div className="text-xs text-white">Delay kills 67% of voice conversions</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">85%</div>
                        <div className="text-xs text-white">No optimization strategy in place</div>
                      </div>
                    </div>
                    <div className="text-center mt-6 pt-4 border-t border-red-500/20">
                      <p className="text-red-100 font-medium text-sm italic">
                        "Using one AI model for everything is like playing golf with only a driver."
                      </p>
                      <cite className="text-red-400 text-xs">— AI Performance Institute, 2024</cite>
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
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Golf Bag Methodology</span>
              </h2>
              <p className="text-xl text-center text-white mb-12 max-w-4xl mx-auto">
                Like a golf pro who picks the right club for each shot, we've mastered the art of selecting the perfect AI model for every business task - maximizing performance while minimizing costs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* GPT-4 Driver */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">GPT-4 (Driver)</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Long-distance tasks: 200+ listing descriptions, investor updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Complex reasoning: Multi-step analysis, strategic planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>High-stakes content: Executive communications, proposals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>When accuracy matters more than cost optimization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Claude Irons */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Claude (Irons)</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Structured tasks: Sales scripts, policy comparisons</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Compliance workflows with JSON output reliability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Mid-range precision tasks requiring deterministic results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Perfect balance of quality and cost efficiency</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Llama Wedge */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Llama (Wedge)</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Cleanup tasks: Messy CRM notes, data extraction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Data normalization and document processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Batch processing tasks where speed matters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Cost-effective solution for high-volume operations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Golf Bag Methodology Framework */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">The 10-Step Golf Bag Decision Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Task Analysis (Steps 1-5)</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Distance:</strong> Long context = GPT-4 Driver, Short = Grok Putter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Lie (Data):</strong> Clean data = fairway shot, Messy = rough/wedge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Wind (Latency):</strong> Real-time = fast models, Batch = efficient models</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Angle (Determinism):</strong> Compliance = Claude reliability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Fitting:</strong> OpenRouter selects optimal model automatically</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Performance & Optimization (Steps 6-10)</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Scorecard:</strong> Metrics tied to business outcomes and funnel stages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Hazards:</strong> Guardrails against hallucination and privacy risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Course Management:</strong> Strategic model selection for consistency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>The Win:</strong> Multi-model beats single-model in all metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Continuous Improvement:</strong> Performance data drives optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* LIVE GOLF BAG METHODOLOGY SLIDESHOW */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-[#ffa500]">🎯 The 10-Slide Golf Bag Framework Interactive Demo</h3>
                <Slideshow slides={golfBagSlides} />
              </div>

              {/* Performance Statistics */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why the Golf Bag Approach Dominates</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">60%</div>
                    <div className="text-sm text-white">Average cost reduction vs single-model</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">3x</div>
                    <div className="text-sm text-white">Accuracy improvement on complex tasks</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">100+</div>
                    <div className="text-sm text-white">Models available through OpenRouter</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">24/7</div>
                    <div className="text-sm text-white">Automatic failover and load balancing</div>
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
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete Multi-Model AI System
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Brain className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Intelligent Model Routing</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">OpenRouter integration with 100+ AI models for maximum flexibility</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Automatic task analysis and optimal model selection in milliseconds</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Real-time failover and load balancing across multiple providers</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 60% cost reduction with 3x better accuracy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Shield className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Enterprise-Grade Security</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Advanced guardrails against hallucination and privacy breaches</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Automatic data redaction and compliance monitoring</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Multi-provider redundancy eliminates single points of failure</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 99.9% uptime with enterprise-grade security</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <BarChart3 className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Performance Analytics</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Real-time metrics tied to business outcomes and funnel performance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Model performance tracking with automatic optimization recommendations</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Cost analysis and ROI reporting across all AI operations</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 40% additional efficiency gains through optimization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics Section */}
              <div className="bg-gradient-to-r from-[#14ffc8]/10 to-emerald-500/10 border border-[#14ffc8]/30 rounded-xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-center mb-8">
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Proven Multi-Model Results</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">60%</div>
                    <div className="text-white font-medium">Cost Reduction</div>
                    <div className="text-gray-400 text-sm mt-1">vs single-model strategy</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">3x</div>
                    <div className="text-white font-medium">Accuracy Improvement</div>
                    <div className="text-gray-400 text-sm mt-1">on complex tasks</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">99.9%</div>
                    <div className="text-white font-medium">System Uptime</div>
                    <div className="text-gray-400 text-sm mt-1">with multi-provider failover</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">100+</div>
                    <div className="text-white font-medium">AI Models Available</div>
                    <div className="text-gray-400 text-sm mt-1">through OpenRouter integration</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <blockquote className="text-xl italic text-gray-300 mb-4">
                    "The Golf Bag approach revolutionized our AI operations. We're saving $50K monthly while getting 3x better results on complex tasks. The automatic model selection is like having an AI expert choose the perfect tool for every job."
                  </blockquote>
                  <cite className="text-[#14ffc8] font-semibold">— David Chen, CTO, Enterprise Manufacturing Corp</cite>
                </div>
              </div>
              
              {/* Implementation Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">Your 90-Day Golf Bag Implementation</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Task Analysis & Model Mapping (Days 1-30)</h4>
                        <p className="text-gray-300 text-sm">Complete audit of your AI tasks and optimal model mapping strategy</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">OpenRouter Integration & Testing (Days 31-60)</h4>
                        <p className="text-gray-300 text-sm">Deploy intelligent routing with comprehensive testing and optimization</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Performance Monitoring & Scale (Days 61-90)</h4>
                        <p className="text-gray-300 text-sm">Full analytics dashboard and systematic optimization for maximum ROI</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">What Makes Our Golf Bag Different</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Target className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Proven 10-Step Framework</h4>
                        <p className="text-gray-300 text-sm">Systematic approach based on 300+ successful multi-model implementations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Real-Time Optimization</h4>
                        <p className="text-gray-300 text-sm">Automatic model selection and performance tuning based on live business metrics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Enterprise-Ready</h4>
                        <p className="text-gray-300 text-sm">Enterprise-grade security with industry-leading uptime guarantees</p>
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
                  Ready to Build Your <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">Golf Bag AI System?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join over 300+ enterprises that have revolutionized their AI operations with our Golf Bag methodology - 60% cost reduction with 3x better accuracy.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Golf Bag Analysis</h3>
                    <p className="text-sm text-gray-300">Complete audit of your current AI tasks and optimal model mapping strategy</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">OpenRouter Integration</h3>
                    <p className="text-sm text-gray-300">Access to 100+ AI models with intelligent routing and automatic failover</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">90-Day ROI Guarantee</h3>
                    <p className="text-sm text-gray-300">See measurable cost reduction and performance improvement within 90 days</p>
                  </div>
                </div>

                <MultiModelAgentsForm />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}