import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CTASection from "@/components/CTASection";
import { Check, X, ChevronRight } from "lucide-react";

export default function RealEstate() {
  return (
    <>
      <Helmet>
        <title>Real Estate Marketing Automation | Fusion Data Co</title>
        <meta name="description" content="Automated marketing solutions tailored for real estate professionals. Generate more leads, manage listings, and stay connected with past clients." />
        <meta name="keywords" content="real estate marketing, real estate lead generation, property listing automation, real estate CRM" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section 
            className="relative overflow-hidden bg-[#0b0b0d] py-20 md:py-28" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max')",
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }}
          >
            <div className="absolute inset-0 bg-[#0b0b0d]/80 bg-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Marketing Automation For</span>{" "}
                  <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Real Estate</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Never lose track of a lead again. Our all-in-one platform helps real estate professionals generate more leads, manage listings, and nurture client relationships—all on autopilot.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/pricing">
                    <a className="px-6 py-3 bg-[#ff0aff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#ff0aff,0_0_10px_#ff0aff] animate-[pulse-glow_3s_infinite] text-center">
                      Start Free 14-Day Trial
                    </a>
                  </Link>
                  <Link href="/#demo">
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
                  <span className="text-white">Common Real Estate</span>{" "}
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
                        <h3 className="text-xl font-semibold mb-2">Lost Potential Buyer Leads</h3>
                        <p className="text-gray-400">Real estate agents often miss 35% of potential buyer inquiries due to delayed responses. When you're showing properties, it's impossible to answer every call or email immediately.</p>
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
                        <h3 className="text-xl font-semibold mb-2">Time-Consuming Property Listings</h3>
                        <p className="text-gray-400">Agents spend 5-7 hours per week manually updating listings across multiple platforms, taking valuable time away from client interactions and showings.</p>
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
                        <h3 className="text-xl font-semibold mb-2">Poor Past-Client Follow-Up</h3>
                        <p className="text-gray-400">83% of clients say they'd work with their agent again, but only 12% do—largely because agents fail to maintain regular contact after closing.</p>
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
                  <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Solution</span>
                </h2>
                <p className="text-gray-400 text-lg">Our platform automates your real estate marketing so you can focus on closing deals.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#ff0aff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#ff0aff]">1</span>
                    </div>
                    Lead Capture & Nurturing
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>AI chatbot pre-qualifies buyer/seller leads 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated drip campaigns for different buying stages</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Listing alert workflows keep buyers engaged</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#00ffff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#00ffff]">2</span>
                    </div>
                    Listing Management
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>One-click multi-platform listing syndication</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated social media property promotion</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Showing feedback collection and analysis</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-3">
                      <span className="text-[#14ffc8]">3</span>
                    </div>
                    Client Relationship Management
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated past client follow-up sequences</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Birthday, anniversary, and home purchase reminders</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Referral request workflows</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#8f00ff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8f00ff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#8f00ff]">4</span>
                    </div>
                    Reputation Management
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated review collection after closings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Review monitoring across platforms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Testimonial showcasing on your website</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Results/ROI Section */}
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-3xl mx-auto">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-center">
                  <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Real Results</span> for Real Estate Professionals
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">42%</div>
                    <p className="text-gray-400">More leads captured with 24/7 AI response</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">5+ hrs</div>
                    <p className="text-gray-400">Saved weekly on listing management</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">3.5x</div>
                    <p className="text-gray-400">More repeat and referral business</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/#demo">
                    <a className="inline-flex items-center px-6 py-3 bg-[#ff0aff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#ff0aff,0_0_10px_#ff0aff] transition-all duration-300">
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
        <ChatBot />
      </div>
    </>
  );
}
