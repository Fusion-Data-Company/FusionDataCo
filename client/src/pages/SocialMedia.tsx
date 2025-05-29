import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  XCircle, 
  TrendingUp, 
  Clock, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  Shield, 
  Calendar,
  Target,
  Lightbulb,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react";

export default function SocialMedia() {
  return (
    <>
      <Helmet>
        <title>Social Media Management Solutions | Fusion Data Co</title>
        <meta name="description" content="Complete social media management and automation platform designed for businesses that need consistent, engaging content across all platforms with advanced analytics and ROI tracking." />
        <meta name="keywords" content="social media management, social media automation, content creation, social media analytics, brand management, engagement tracking" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0080ff]/20 via-[#0a0a0d] to-[#0a0a0d]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">Social Media Management</span><br />
                  <span className="text-[#0080ff] [text-shadow:0_0_20px_#0080ff]">That Actually Works</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Stop struggling with inconsistent posting and low engagement. Our complete social media management platform creates compelling content, builds authentic audiences, and drives measurable business results across all your channels.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#solutions" className="bg-[#0080ff] hover:bg-[#0066cc] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 [box-shadow:0_0_20px_#0080ff40]">
                    See Our Solutions
                  </a>
                  <a href="#registration" className="border border-[#0080ff] text-[#0080ff] hover:bg-[#0080ff] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                    Start Free Trial
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pain Points Section with Enhanced Red Ambient Glow */}
          <section className="py-16 px-4 bg-[#0c0c14] relative overflow-hidden">
            {/* Red ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#ff0000]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0000]/3 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The <span className="text-white">Social Media Challenges</span> Killing Your Growth
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Content & Engagement Struggles</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Inconsistent Posting:</span> Your social media accounts go weeks without updates, making your business look inactive and unprofessional.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Poor Content Quality:</span> Your posts lack visual appeal and compelling copy, resulting in minimal likes, shares, and comments.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">No Strategy or Direction:</span> You're posting randomly without a cohesive brand voice or content strategy that drives business goals.
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
                      <h3 className="text-xl font-semibold text-red-100">Time & Resource Drain</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Time-Consuming Creation:</span> Creating content, designing graphics, and writing captions takes hours away from running your business.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Platform Management Chaos:</span> Managing multiple social platforms becomes overwhelming with different posting requirements and audience behaviors.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">No ROI Tracking:</span> You can't measure what's working, wasting money on ineffective content and missing growth opportunities.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Competition & Algorithm Challenges</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Competitor Dominance</p>
                          <p className="text-gray-300 text-sm">Your competitors consistently outperform you on social media with better content, higher engagement, and more followers, making you invisible to potential customers.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Algorithm Struggles</p>
                          <p className="text-gray-300 text-sm">Constantly changing platform algorithms bury your content, limiting organic reach and making it harder to connect with your audience without paid advertising.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Trend Lag</p>
                          <p className="text-gray-300 text-sm">By the time you catch up to social media trends, they're already outdated, making your brand appear behind the curve and irrelevant to younger audiences.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Lead Generation Failure</p>
                          <p className="text-gray-300 text-sm">Your social media efforts generate followers but no actual customers or leads, making it feel like a vanity metric with no business impact.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Social Media Industry Statistics - Vertical Box */}
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-bold text-center mb-6 text-white">The Social Media Reality</h3>
                    <div className="space-y-4">
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">64%</div>
                        <div className="text-xs text-white">Of businesses post inconsistently</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">71%</div>
                        <div className="text-xs text-white">Struggle with content creation</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">58%</div>
                        <div className="text-xs text-white">Can't measure social media ROI</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">43%</div>
                        <div className="text-xs text-white">Generate zero leads from social</div>
                      </div>
                    </div>
                    <div className="text-center mt-6 pt-4 border-t border-red-500/20">
                      <p className="text-red-100 font-medium text-sm italic">
                        "90% of small businesses fail to leverage social media effectively for lead generation and customer acquisition."
                      </p>
                      <cite className="text-red-400 text-xs">— Social Media Marketing Institute, 2024</cite>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Social Media Industry Expertise Section with Yellow Ambient Glow */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-yellow-800/10 to-amber-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/8 z-0"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Social Media Expertise</span>
              </h2>
              <p className="text-xl text-center text-white mb-12 max-w-4xl mx-auto">
                We understand social media marketing because we've mastered platform algorithms, audience psychology, and content strategies that drive real business results across every major platform.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Platform Algorithm Mastery */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Algorithm Optimization</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Facebook/Instagram algorithm timing and engagement optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>LinkedIn professional content strategy and B2B targeting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>TikTok and Instagram Reels viral content formulas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>YouTube algorithm optimization for maximum reach</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Content Psychology */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Audience Psychology</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Behavioral triggers that drive engagement and sharing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Emotional storytelling techniques for brand connection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Platform-specific content psychology and user behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Call-to-action psychology that converts followers to customers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Performance Analytics */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Performance Tracking</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Advanced analytics and ROI measurement across all platforms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Competitor analysis and benchmarking strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>A/B testing methodologies for content optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Lead attribution and customer journey mapping</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Social Media Strategy Methods */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">Advanced Social Media Strategy Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Content Strategy & Creation</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Brand voice development and content pillar strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Visual brand consistency and design template systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Content calendar planning and seasonal campaign strategy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>User-generated content campaigns and community building</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Engagement & Community Management</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Community engagement strategies and response protocols</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Influencer collaboration and partnership development</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Crisis management and reputation monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Social listening and trend identification systems</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Platform Expertise */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why Our Social Media Expertise Delivers Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">340%</div>
                    <div className="text-sm text-white">Average engagement increase within 90 days</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">285%</div>
                    <div className="text-sm text-white">Follower growth rate vs. organic efforts</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">92%</div>
                    <div className="text-sm text-white">Client retention rate year-over-year</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">67%</div>
                    <div className="text-sm text-white">Lead generation improvement from social</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Solution Section with Green Ambient Glow */}
          <section id="solutions" className="py-16 px-4 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-green-800/10 to-teal-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete Social Media Management System
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Calendar className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Smart Content Creation & Scheduling</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">AI-powered content creation with your brand voice and industry expertise built-in</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Automated scheduling optimized for each platform's peak engagement times</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Professional graphic design and video content creation for all platforms</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 340% increase in engagement within 90 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Users className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Community Management & Engagement</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">24/7 community management with personalized responses and engagement</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Strategic engagement campaigns to build loyal follower communities</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Reputation monitoring and crisis management protocols</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 285% follower growth rate within 6 months</p>
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
                    <h3 className="text-2xl font-bold mb-4 text-white">Advanced Analytics & Lead Generation</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Comprehensive ROI tracking with detailed performance analytics across all platforms</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Lead generation campaigns that convert social followers into paying customers</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Competitor analysis and market positioning strategies</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 67% improvement in social media lead generation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics Section */}
              <div className="bg-gradient-to-r from-[#14ffc8]/10 to-emerald-500/10 border border-[#14ffc8]/30 rounded-xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-center mb-8">
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Proven Social Media Results</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">340%</div>
                    <div className="text-white font-medium">Engagement Increase</div>
                    <div className="text-gray-400 text-sm mt-1">average within 90 days</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">285%</div>
                    <div className="text-white font-medium">Follower Growth</div>
                    <div className="text-gray-400 text-sm mt-1">vs. organic efforts</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">67%</div>
                    <div className="text-white font-medium">Lead Generation</div>
                    <div className="text-gray-400 text-sm mt-1">improvement from social</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">92%</div>
                    <div className="text-white font-medium">Client Satisfaction</div>
                    <div className="text-gray-400 text-sm mt-1">retention rate</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <blockquote className="text-xl italic text-gray-300 mb-4">
                    "Fusion Data Co transformed our social media from a time-consuming burden into our most effective lead generation channel. Our engagement tripled and we're getting 50+ qualified leads per month from social alone."
                  </blockquote>
                  <cite className="text-[#14ffc8] font-semibold">— Maria Rodriguez, CEO, Digital Marketing Agency</cite>
                </div>
              </div>
              
              {/* Strategic Implementation Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">Your 90-Day Social Media Transformation</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Brand Analysis & Strategy (Days 1-14)</h4>
                        <p className="text-gray-300 text-sm">Complete brand audit, competitor analysis, and custom content strategy development</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Content Creation & Launch (Days 15-45)</h4>
                        <p className="text-gray-300 text-sm">Deploy engaging content across all platforms with optimized posting schedules</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Community Building & Scale (Days 46-90)</h4>
                        <p className="text-gray-300 text-sm">Build engaged communities, implement lead generation, and scale successful strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">What Sets Our Social Media Apart</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Platform Specialization</h4>
                        <p className="text-gray-300 text-sm">Deep expertise in each platform's unique algorithms, audience behaviors, and content requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Data-Driven Optimization</h4>
                        <p className="text-gray-300 text-sm">Continuous A/B testing and performance optimization based on real engagement data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Proven Track Record</h4>
                        <p className="text-gray-300 text-sm">Over 500+ successful social media transformations with documented ROI improvements</p>
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
                  Ready to Transform Your <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">Social Media Presence?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join over 500+ businesses that have revolutionized their social media marketing with our proven management system.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Brand Audit</h3>
                    <p className="text-sm text-gray-300">Complete analysis of your current social media presence and competitor benchmarking</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Custom Content Strategy</h3>
                    <p className="text-sm text-gray-300">Tailored content plan for your industry, audience, and business goals</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">30-Day Growth Guarantee</h3>
                    <p className="text-sm text-gray-300">See measurable engagement improvement within 30 days or we'll refund your investment</p>
                  </div>
                </div>

                <form className="max-w-2xl mx-auto bg-[#121218]/90 p-8 rounded-lg border border-purple-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Industry</label>
                      <input type="text" className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input type="tel" className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Current Social Media Challenges</label>
                    <textarea className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none h-24" placeholder="Tell us about your biggest social media challenges..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 [box-shadow:0_0_20px_#a855f740]">
                    Get My Free Social Media Audit
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    No spam, ever. Your information is 100% secure and will only be used to contact you about your social media consultation.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}