import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Check, X, ChevronRight } from "lucide-react";

export default function SmallBusiness() {
  return (
    <>
      <Helmet>
        <title>Small Business Marketing Automation | Fusion Data Co</title>
        <meta name="description" content="All-in-one marketing automation platform tailored for small businesses. Increase leads, boost sales, and save time with our comprehensive solution." />
        <meta name="keywords" content="small business marketing, marketing automation, lead generation, small business CRM, marketing ROI" />
        
        {/* ElevenLabs ConvAI Script */}
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section 
            className="relative overflow-hidden bg-[#0b0b0d] py-20 md:py-28" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max')",
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }}
          >
            <div className="absolute inset-0 bg-[#0b0b0d]/80 bg-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Marketing Automation For</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Small Businesses</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Stop missing leads and wasting time on manual tasks. Our all-in-one platform helps you generate more leads, close more deals, and grow your business faster—without hiring an expensive agency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/pricing">
                    <a className="px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] animate-[pulse-glow_3s_infinite] text-center">
                      Start Free 14-Day Trial
                    </a>
                  </Link>
                  <Link href="/demos/entropy">
                    <a className="px-6 py-3 bg-transparent border border-[#8f00ff] text-white rounded-md font-medium hover:bg-[#8f00ff] hover:text-[#0b0b0d] transition-all duration-300 text-center">
                      Schedule Demo
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Pain Points Section */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-8 text-center">
                  <span className="text-white">Common Small Business</span>{" "}
                  <span className="text-red-500">Challenges</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <X className="text-red-500" size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Missed Lead Opportunities</h3>
                        <p className="text-gray-400">Small businesses miss 71% of leads due to slow response times. When you're busy running your business, it's easy to miss website inquiries or fail to follow up quickly.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <X className="text-red-500" size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Wasted Marketing Budget</h3>
                        <p className="text-gray-400">On average, small businesses waste 37% of their marketing budget on ineffective channels or campaigns they can't properly track or measure.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <X className="text-red-500" size={20} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Time-Consuming Manual Tasks</h3>
                        <p className="text-gray-400">Small business owners spend 20+ hours per week on administrative and marketing tasks that could be automated, taking time away from serving customers and growing the business.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Solution Section */}
          <section className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#1a1a1f] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">The</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Solution</span>
                </h2>
                <p className="text-gray-400 text-lg">Our all-in-one platform automates your marketing and lead generation so you can focus on running your business.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-3">
                      <span className="text-[#14ffc8]">1</span>
                    </div>
                    Never Miss a Lead
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>AI chatbot captures visitor information 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated follow-up sequences nurture leads</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>CRM tracks all interactions in one place</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#00ffff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#00ffff]">2</span>
                    </div>
                    Maximize ROI
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Track where your leads come from</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Measure conversion rates at every stage</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Real-time dashboard shows your results</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#ff0aff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#ff0aff]">3</span>
                    </div>
                    Save Time
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automate repetitive marketing tasks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Pre-built workflows for common scenarios</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Integrates with tools you already use</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#8f00ff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8f00ff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#8f00ff]">4</span>
                    </div>
                    Grow Your Business
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Scale your marketing without adding staff</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Deliver consistent customer experience</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Compete with larger businesses</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Results/ROI Section */}
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-3xl mx-auto">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-center">
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Real Results</span> Small Businesses See
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">25%</div>
                    <p className="text-gray-400">Higher marketing ROI compared to manual methods</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">12+ hrs</div>
                    <p className="text-gray-400">Saved every week on repetitive marketing tasks</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">3x</div>
                    <p className="text-gray-400">More leads captured with 24/7 AI response</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/demos/entropy">
                    <a className="inline-flex items-center px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] transition-all duration-300">
                      See How It Works <ChevronRight size={16} className="ml-2" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          <CTASection />
        </main>
        <Footer />
        <elevenlabs-convai agent-id="agent_6701k3kk65vsetbtrmhe3ek7sgdt"></elevenlabs-convai>
      </div>
    </>
  );
}
