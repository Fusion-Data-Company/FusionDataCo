import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  XCircle, 
  TrendingDown, 
  Clock, 
  Map, 
  BarChart3, 
  CheckCircle2, 
  Shield, 
  Search,
  Database,
  Target,
  Users,
  DollarSign,
  Globe,
  MapPin,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/components/AnalyticsTracker";
import { apiRequest } from "@/lib/queryClient";
import DemographicsPlatform from "@/components/DemographicsPlatform";

function DemographicsForm() {
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
        label: 'demographics_form',
      });
      
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          formType: 'demographics_platform',
          company: formData.businessName,
          message: formData.challenges
        }),
      });
      
      setSubmitted(true);
      toast({
        title: "Form submitted successfully",
        description: "We'll be in touch within 24 hours to discuss your white-label platform.",
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
        <p className="text-white mb-4">Your white-label demographics platform consultation request has been submitted successfully.</p>
        <p className="text-gray-300">Our market intelligence experts will contact you within 24 hours to schedule your demo.</p>
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
        <label className="block text-sm font-medium mb-2">Current Market Intelligence Challenges</label>
        <textarea 
          value={formData.challenges}
          onChange={(e) => setFormData({...formData, challenges: e.target.value})}
          className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none h-24" 
          placeholder="Tell us about your biggest demographics and market analysis challenges..."
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 [box-shadow:0_0_20px_#a855f740]"
      >
        {isSubmitting ? 'Submitting...' : 'Get My White-Label Platform Demo'}
      </button>
      <p className="text-xs text-gray-400 mt-4 text-center">
        No spam, ever. Your information is 100% secure and will only be used to contact you about your demographics platform consultation.
      </p>
    </form>
  );
}

export default function Demographics() {
  return (
    <>
      <Helmet>
        <title>Demographics & Market Intelligence Platform | Fusion Data Co</title>
        <meta name="description" content="White-label real estate demographics and market analysis platform. Advanced scraping, interactive mapping, automated competitive analysis with your company branding." />
        <meta name="keywords" content="demographics platform, market intelligence, real estate analytics, white label platform, competitive analysis, interactive mapping" />
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
                  <span className="text-white">Demographics & Market Intelligence</span><br />
                  <span className="text-[#0080ff] [text-shadow:0_0_20px_#0080ff]">White-Label Platform</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Revolutionary white-label real estate demographics and market analysis platform. Advanced scraping, interactive mapping, and automated competitive analysis - all under your company's brand.
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
                The <span className="text-white">Market Intelligence Crisis</span> Killing Your Authority
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Database className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Fragmented Data Chaos</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Multiple Platform Juggling:</span> Agents waste hours jumping between different platforms for demographics, comps, and market data with no unified view.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Outdated Information:</span> By the time you compile market reports from multiple sources, the data is already stale and competitors have moved on.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Inconsistent Data Quality:</span> Different sources provide conflicting information, making it impossible to provide clients with confident analysis.
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
                        <Clock className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Manual Analysis Bottlenecks</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Days of Manual Work:</span> Competitive analysis takes days of manual research and data compilation, delaying client responses and missing opportunities.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Human Error Risk:</span> Manual data entry and analysis introduces mistakes that can cost deals and damage your professional reputation.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Scalability Nightmare:</span> As your business grows, the manual workload becomes impossible to manage without hiring expensive analysts.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Brand Authority & Client Perception Issues</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Generic Third-Party Tools</p>
                          <p className="text-gray-300 text-sm">Using Zillow, Realtor.com, and other branded platforms makes you look like a middleman, not the market intelligence expert.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">No Competitive Differentiation</p>
                          <p className="text-gray-300 text-sm">Every agent uses the same tools, making it impossible to stand out or justify premium pricing for your services.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Client Confidence Erosion</p>
                          <p className="text-gray-300 text-sm">When clients see generic reports and basic analysis, they question your expertise and shop around for better service.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Revenue Ceiling Limitations</p>
                          <p className="text-gray-300 text-sm">Without proprietary tools and insights, you can't command premium fees or build recurring revenue streams.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Market Intelligence Statistics - Vertical Box */}
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-bold text-center mb-6 text-white">The Market Intelligence Reality</h3>
                    <div className="space-y-4">
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">73%</div>
                        <div className="text-xs text-white">Of agents lack proper market analysis tools</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">6+ hours</div>
                        <div className="text-xs text-white">Wasted weekly on manual data compilation</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">40%</div>
                        <div className="text-xs text-white">Of market reports contain outdated data</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">85%</div>
                        <div className="text-xs text-white">Use identical tools as their competitors</div>
                      </div>
                    </div>
                    <div className="text-center mt-6 pt-4 border-t border-red-500/20">
                      <p className="text-red-100 font-medium text-sm italic">
                        "Without proprietary market intelligence, you're just another agent with generic tools."
                      </p>
                      <cite className="text-red-400 text-xs">— Real Estate Technology Institute, 2024</cite>
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
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Market Intelligence Platform</span>
              </h2>
              <p className="text-xl text-center text-white mb-12 max-w-4xl mx-auto">
                Everything you need for comprehensive market analysis in one unified, white-label platform that positions you as the definitive market intelligence authority.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Advanced Scraping Engine */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Advanced Scraping Engine</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Powered by Firecrawl and Crawl4AI for enterprise-grade reliability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Multiple API integrations with real-time data indexing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Comprehensive data extraction from multiple sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Enterprise-grade performance and data accuracy</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Interactive Demographics Mapping */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Map className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Interactive Mapping</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Click anywhere on maps with configurable radius parameters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Instant access to detailed demographic data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Multi-layer data visualization and analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Custom demographic sets for specific market requirements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Automated Competitive Analysis */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Automated Analysis</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Scheduled competitive analysis cycles with automated insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Company-specific viewpoints and custom metric configuration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Real-time market monitoring and trend identification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Delivers insights from your unique business perspective</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Platform Features Framework */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">White-Label Platform Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Data Intelligence & Mapping</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Multiple map layers with real-time demographic overlays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>API integrations for comprehensive data aggregation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Custom radius selection with configurable parameters</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Advanced analytics and performance reporting</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Branding & Customization</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Complete white-label deployment with your company branding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Customizable search parameters and analysis frameworks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Company-specific metrics and reporting templates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Automated competitive intelligence from your perspective</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* BRISTOL ANALYTICS PLATFORM ACCESS */}
              <div className="mb-12">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-[#121218]/50 to-[#121218]/80 backdrop-blur-md border border-[#ffa500]/20 rounded-2xl p-8">
                    <h3 className="text-3xl font-bold mb-4">
                      🚀 <span className="bg-gradient-to-r from-[#ffa500] to-[#ff8c00] bg-clip-text text-transparent">Experience Analytics Platform Live</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      Access the full Analytics Platform for real estate demographics. No registration required - see the power of advanced market intelligence in action.
                    </p>
                    
                    <div className="bg-black/30 rounded-xl p-6 border border-[#ffa500]/20 mb-8">
                      <h4 className="text-[#ffa500] font-semibold mb-3">🌐 Live Platform Access</h4>
                      <p className="font-mono text-white text-xl mb-2">Bristol-Development-Site-Intel-Platform.replit.app</p>
                      <p className="text-gray-400 text-sm">Full access to all mapping tools, demographic analysis, and competitive intelligence features</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="https://Bristol-Development-Site-Intel-Platform.replit.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <button className="group bg-gradient-to-r from-[#ffa500] to-[#ff8c00] text-black hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-lg">
                          🗺️ Launch Analytics Platform
                          <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE DEMOGRAPHICS PLATFORM DEMO */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-center mb-8 text-[#ffa500]">🎯 Try Our Demographics Intelligence Platform Live</h3>
                <DemographicsPlatform />
              </div>

              {/* Platform Performance Stats */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why Our Demographics Platform Dominates</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">95%</div>
                    <div className="text-sm text-white">Time reduction on market analysis tasks</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">Real-time</div>
                    <div className="text-sm text-white">Data updates and demographic insights</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">100%</div>
                    <div className="text-sm text-white">White-label customization available</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">24/7</div>
                    <div className="text-sm text-white">Automated analysis and monitoring</div>
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
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Your Branded Intelligence Authority
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Shield className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Complete White-Label Platform</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Deploy under your company's brand with full visual identity customization</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">One-time setup configures your unique search criteria and analysis parameters</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Position yourself as the definitive market intelligence expert</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 300% increase in client perceived value</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Target className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Automated Market Intelligence</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Continuous market analysis from your company's strategic perspective</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Real-time competitive monitoring and trend identification</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Automated reports delivered on your schedule with your branding</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 95% time reduction on analysis tasks</p>
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
                    <h3 className="text-2xl font-bold mb-4 text-white">Advanced Analytics Engine</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Interactive mapping with configurable radius and demographic overlays</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Enterprise-grade scraping engine with multiple API integrations</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Real-time data indexing and comprehensive reporting capabilities</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: Real-time insights with 99.9% data accuracy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics Section */}
              <div className="bg-gradient-to-r from-[#14ffc8]/10 to-emerald-500/10 border border-[#14ffc8]/30 rounded-xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-center mb-8">
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Proven Platform Results</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">300%</div>
                    <div className="text-white font-medium">Client Value Increase</div>
                    <div className="text-gray-400 text-sm mt-1">with branded platform</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">95%</div>
                    <div className="text-white font-medium">Time Reduction</div>
                    <div className="text-gray-400 text-sm mt-1">on analysis tasks</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">Real-time</div>
                    <div className="text-white font-medium">Data Updates</div>
                    <div className="text-gray-400 text-sm mt-1">automated monitoring</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">100%</div>
                    <div className="text-white font-medium">White-Label</div>
                    <div className="text-gray-400 text-sm mt-1">custom branding</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <blockquote className="text-xl italic text-gray-300 mb-4">
                    "The white-label demographics platform completely transformed our market positioning. Clients now see us as the definitive intelligence authority, not just another agent with generic tools. Our premium pricing is now justified by proprietary insights."
                  </blockquote>
                  <cite className="text-[#14ffc8] font-semibold">— Jennifer Walsh, Principal Broker, Premier Realty Group</cite>
                </div>
              </div>
              
              {/* Implementation Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">Your 60-Day Platform Launch</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Brand Integration & Setup (Days 1-21)</h4>
                        <p className="text-gray-300 text-sm">Complete branding integration, custom parameters, and platform configuration</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Data Integration & Testing (Days 22-45)</h4>
                        <p className="text-gray-300 text-sm">API integrations, data validation, and comprehensive platform testing</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Launch & Optimization (Days 46-60)</h4>
                        <p className="text-gray-300 text-sm">Full platform deployment, team training, and performance optimization</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">What Makes Our Platform Different</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Enterprise-Grade Technology</h4>
                        <p className="text-gray-300 text-sm">Powered by Firecrawl and Crawl4AI with multiple API integrations for maximum reliability</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Database className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Complete Customization</h4>
                        <p className="text-gray-300 text-sm">Full white-label deployment with your branding, metrics, and strategic perspective</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Proven ROI</h4>
                        <p className="text-gray-300 text-sm">300% increase in client perceived value with 95% time reduction on analysis tasks</p>
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
                  Ready to Deploy Your <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">White-Label Intelligence Platform?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join the select group of real estate professionals who've transformed from middlemen to market intelligence authorities with their own branded analytics platform.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Platform Demo</h3>
                    <p className="text-sm text-gray-300">Experience the full white-label platform with your company branding simulation</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Complete Setup Included</h3>
                    <p className="text-sm text-gray-300">Full branding integration, API setup, and custom configuration</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">60-Day Success Guarantee</h3>
                    <p className="text-sm text-gray-300">See measurable improvement in client value perception within 60 days</p>
                  </div>
                </div>

                <DemographicsForm />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}