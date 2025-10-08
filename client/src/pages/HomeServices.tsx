import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Check, X, ChevronRight } from "lucide-react";

export default function HomeServices() {
  return (
    <>
      <Helmet>
        <title>Home Services Marketing Automation | Fusion Data Co</title>
        <meta name="description" content="Marketing automation solutions for plumbers, electricians, HVAC, and other home service professionals. Never miss a call and grow your business." />
        <meta name="keywords" content="home services marketing, plumbing marketing automation, contractor marketing, field service marketing" />
        
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section 
            className="relative overflow-hidden bg-[#0b0b0d] py-20 md:py-28" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max')",
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }}
          >
            <div className="absolute inset-0 bg-[#0b0b0d]/80 bg-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Marketing Automation For</span>{" "}
                  <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Home Services</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Stop missing calls while on the job. Our platform helps plumbers, electricians, HVAC technicians, and other service professionals capture leads, schedule appointments, and grow their business—even when you're in the field.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/contact">
                    <span className="px-6 py-3 bg-[#8f00ff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#8f00ff,0_0_10px_#8f00ff] animate-[pulse-glow_3s_infinite] text-center cursor-pointer inline-block">
                      Get Started Today
                    </span>
                  </Link>
                  <Link href="/demos/entropy">
                    <span className="px-6 py-3 bg-transparent border border-[#14ffc8] text-white rounded-md font-medium hover:bg-[#14ffc8] hover:text-[#0b0b0d] transition-all duration-300 text-center cursor-pointer inline-block">
                      Schedule Demo
                    </span>
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
                  <span className="text-white">Common Home Service</span>{" "}
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
                        <h3 className="text-xl font-semibold mb-2">Missing Calls While on Jobs</h3>
                        <p className="text-gray-400">Service professionals miss a significant number of potential customer calls while working on jobs, resulting in lost revenue and frustrated potential customers.</p>
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
                        <h3 className="text-xl font-semibold mb-2">Inefficient Scheduling and Dispatching</h3>
                        <p className="text-gray-400">Home service businesses waste considerable time each week on manual scheduling, route planning, and dispatch coordination, leading to reduced job capacity and revenue.</p>
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
                        <h3 className="text-xl font-semibold mb-2">Limited Recurring Customer Revenue</h3>
                        <p className="text-gray-400">Without a system for maintenance reminders and follow-ups, service businesses miss out on substantial potential recurring revenue from existing customers.</p>
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
                  <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Solution</span>
                </h2>
                <p className="text-gray-400 text-lg">Our platform automates your customer communications and streamlines scheduling so you never miss an opportunity.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#8f00ff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8f00ff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#8f00ff]">1</span>
                    </div>
                    Call Handling
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>AI-powered call answering and booking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>24/7 virtual receptionist qualification</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Immediate text notifications for urgent jobs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#00ffff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#00ffff]">2</span>
                    </div>
                    Smart Scheduling
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Online booking with job type pre-qualification</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>SMS appointment confirmations and reminders</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Optimized route planning and technician dispatch</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-3">
                      <span className="text-[#14ffc8]">3</span>
                    </div>
                    Customer Management
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Digital estimates and approvals</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated invoice delivery and payment reminders</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Post-service follow-up and review requests</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#ff0aff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#ff0aff]">4</span>
                    </div>
                    Long-term Revenue Growth
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Seasonal service reminders</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Maintenance plan enrollment campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Customer retention and reactivation workflows</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Results/ROI Section */}
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-3xl mx-auto">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-center">
                  <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Real Results</span> for Home Service Pros
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">94%</div>
                    <p className="text-gray-400">More calls answered and converted to bookings</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">30%</div>
                    <p className="text-gray-400">Increase in jobs completed per week</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">74%</div>
                    <p className="text-gray-400">Higher customer retention with maintenance plans</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/demos/entropy">
                    <span className="inline-flex items-center px-6 py-3 bg-[#8f00ff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#8f00ff,0_0_10px_#8f00ff] transition-all duration-300 cursor-pointer">
                      See How It Works <ChevronRight size={16} className="ml-2" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
