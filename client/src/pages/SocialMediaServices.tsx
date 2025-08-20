import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CTASection from "@/components/CTASection";
import { Calendar, Wand2, BarChart, CheckCircle, Check, ArrowRight } from "lucide-react";

export default function SocialMediaServices() {
  return (
    <>
      <Helmet>
        <title>Social Media Automation | Fusion Data Co</title>
        <meta name="description" content="Professional social media advertising management and optimization with marketing automation systems, lead nurture sequences, and ROI-focused campaign management. Complete analytics and performance tracking." />
        <meta name="keywords" content="social media advertising management, marketing automation systems, lead nurture sequences, conversion funnel optimization, ROI campaign management, performance tracking analytics" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section 
            className="relative overflow-hidden bg-[#0b0b0d] py-20 md:py-28" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max')",
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }}
          >
            <div className="absolute inset-0 bg-[#0b0b0d]/80 bg-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Automated</span>{" "}
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Social Media</span>{" "}
                  <span className="text-white">Marketing</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Professional social media advertising management and optimization with marketing automation systems, lead nurture sequences, and ROI-focused campaign management. Complete analytics and performance tracking for maximum results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/pricing">
                    <a className="px-6 py-3 bg-[#00ffff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#00ffff,0_0_10px_#00ffff] animate-[pulse-glow_3s_infinite] text-center">
                      Start Free 14-Day Trial
                    </a>
                  </Link>
                  <Link href="/demos/entropy">
                    <a className="px-6 py-3 bg-transparent border border-[#14ffc8] text-white rounded-md font-medium hover:bg-[#14ffc8] hover:text-[#0b0b0d] transition-all duration-300 text-center">
                      Schedule Demo
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Core Features Section */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Comprehensive</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Social Media Management</span>
                </h2>
                <p className="text-gray-400 text-lg">Everything you need to automate your social media marketing in one place.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mb-4">
                    <Calendar className="text-[#14ffc8]" size={28} />
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">Content Calendar</h3>
                  <p className="text-gray-400 mb-4">Visualize and plan your social media content across all platforms with our intuitive calendar interface.</p>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2" size={16} />
                      <span>Drag-and-drop content planning</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2" size={16} />
                      <span>Color-coded content categories</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2" size={16} />
                      <span>Campaign organization tools</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#ff0aff] transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mb-4">
                    <Wand2 className="text-[#ff0aff]" size={28} />
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">AI Content Creation</h3>
                  <p className="text-gray-400 mb-4">Generate engaging posts, captions, and hashtags with our AI-powered content assistant.</p>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2" size={16} />
                      <span>Industry-specific content ideas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2" size={16} />
                      <span>Caption generation with tone control</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2" size={16} />
                      <span>Trending hashtag recommendations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#00ffff] transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#00ffff]/20 flex items-center justify-center mb-4">
                    <BarChart className="text-[#00ffff]" size={28} />
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">Analytics Dashboard</h3>
                  <p className="text-gray-400 mb-4">Track engagement, growth, and ROI across all your social media channels in one place.</p>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2" size={16} />
                      <span>Cross-platform performance metrics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2" size={16} />
                      <span>Audience growth and demographics</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2" size={16} />
                      <span>Content performance analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Workflow Section */}
          <section className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#1a1a1f] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                    <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4">
                      Streamline Your <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Social Media Workflow</span>
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Our social media automation tools help you maintain a consistent presence across all platforms without the daily grind.
                    </p>
                    <ul className="text-gray-400 space-y-4 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={20} />
                        <span>Schedule posts across multiple platforms</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={20} />
                        <span>Recycle evergreen content automatically</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={20} />
                        <span>Respond to comments and messages with AI</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={20} />
                        <span>Generate monthly performance reports</span>
                      </li>
                    </ul>
                    <Link href="/pricing">
                      <a className="px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] transition-all duration-300 inline-block">
                        View Social Media Plans
                      </a>
                    </Link>
                  </div>
                  <div className="md:w-1/2">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
                      alt="Social media automation dashboard" 
                      className="rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">The</span>{" "}
                  <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Benefits</span>
                </h2>
                <p className="text-gray-400 text-lg">How our social media automation transforms your online presence</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-[#00ffff]/20 flex items-center justify-center mb-4">
                    <span className="text-[#00ffff] font-bold">1</span>
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">Save Hours Every Week</h3>
                  <p className="text-gray-400">
                    Our customers save an average of 15 hours per week by automating their social media planning, scheduling, and reporting.
                  </p>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mb-4">
                    <span className="text-[#ff0aff] font-bold">2</span>
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">Increase Engagement</h3>
                  <p className="text-gray-400">
                    Businesses using our platform see a 42% average increase in engagement through consistent posting and AI-optimized content.
                  </p>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mb-4">
                    <span className="text-[#14ffc8] font-bold">3</span>
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">Maintain Consistency</h3>
                  <p className="text-gray-400">
                    Never worry about gaps in your posting schedule again. Our platform ensures your brand maintains a constant, professional presence.
                  </p>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-[#8f00ff]/20 flex items-center justify-center mb-4">
                    <span className="text-[#8f00ff] font-bold">4</span>
                  </div>
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">Data-Driven Strategy</h3>
                  <p className="text-gray-400">
                    Make better content decisions with our comprehensive analytics that show exactly what's working and what isn't.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Platform Support Section */}
          <section className="py-16 bg-gradient-to-b from-[#1a1a1f] to-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-4xl mx-auto">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-8 text-center">
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Supported</span> Platforms
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-[#00ffff]/10 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-[#00ffff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </div>
                    <p className="font-semibold">Facebook</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-[#8f00ff]/10 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-[#8f00ff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <p className="font-semibold">LinkedIn</p>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-gray-400 mb-6">And more platforms including Pinterest, TikTok, YouTube, and Google Business Profile</p>
                  <Link href="/pricing">
                    <a className="inline-flex items-center px-6 py-3 bg-[#00ffff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#00ffff,0_0_10px_#00ffff] transition-all duration-300">
                      Get Started <ArrowRight size={16} className="ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          <CTASection />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}
