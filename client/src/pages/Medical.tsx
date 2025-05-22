import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CTASection from "@/components/CTASection";
import { Check, X, ChevronRight } from "lucide-react";

export default function Medical() {
  return (
    <>
      <Helmet>
        <title>Medical Practice Marketing Automation | Fusion Data Co</title>
        <meta name="description" content="Automated marketing solutions for medical practices. Reduce no-shows, streamline patient intake, and grow your practice with our all-in-one platform." />
        <meta name="keywords" content="medical practice marketing, healthcare automation, patient acquisition, medical CRM, appointment reminder software" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section 
            className="relative overflow-hidden bg-[#0b0b0d] py-20 md:py-28" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max')",
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }}
          >
            <div className="absolute inset-0 bg-[#0b0b0d]/80 bg-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Marketing Automation For</span>{" "}
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Medical Practices</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Reduce no-shows, streamline patient intake, and grow your practice with our HIPAA-compliant marketing automation platform designed specifically for healthcare providers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/pricing">
                    <a className="px-6 py-3 bg-[#00ffff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#00ffff,0_0_10px_#00ffff] animate-[pulse-glow_3s_infinite] text-center">
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
                  <span className="text-white">Common Medical Practice</span>{" "}
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
                        <h3 className="text-xl font-semibold mb-2">High No-Show Rate</h3>
                        <p className="text-gray-400">Medical practices face an average no-show rate of 18-30%, costing thousands in lost revenue every month and disrupting schedules.</p>
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
                        <h3 className="text-xl font-semibold mb-2">Inefficient Patient Intake</h3>
                        <p className="text-gray-400">Staff spends 4-6 hours daily on manual intake processes, resulting in data entry errors and extended patient wait times.</p>
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
                        <h3 className="text-xl font-semibold mb-2">Limited Patient Education</h3>
                        <p className="text-gray-400">Practices struggle to provide timely, personalized patient education, leading to lower treatment adherence and patient satisfaction.</p>
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
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Solution</span>
                </h2>
                <p className="text-gray-400 text-lg">Our HIPAA-compliant platform automates patient communications and streamlines workflows.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#00ffff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#00ffff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#00ffff]">1</span>
                    </div>
                    Appointment Management
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Multi-channel appointment reminders (SMS, email, voice)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated waitlist notifications for cancellations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#00ffff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Online scheduling with insurance verification</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-3">
                      <span className="text-[#14ffc8]">2</span>
                    </div>
                    Digital Patient Intake
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>HIPAA-compliant digital forms and e-signatures</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Automated insurance eligibility verification</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#14ffc8] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Secure document upload for medical records</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#ff0aff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#ff0aff]">3</span>
                    </div>
                    Patient Education
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Condition-specific education sequences</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Procedure preparation instructions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#ff0aff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Post-treatment care reminders</span>
                    </li>
                  </ul>
                </div>
                
                <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#8f00ff] transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8f00ff]/20 flex items-center justify-center mr-3">
                      <span className="text-[#8f00ff]">4</span>
                    </div>
                    Practice Growth
                  </h3>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Patient review automation and monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Referral management and tracking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-[#8f00ff] mt-1 mr-2 flex-shrink-0" size={16} />
                      <span>Birthday and check-up reminders</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Results/ROI Section */}
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-3xl mx-auto">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-center">
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Real Results</span> for Medical Practices
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">68%</div>
                    <p className="text-gray-400">Reduction in appointment no-shows</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">90%</div>
                    <p className="text-gray-400">Decrease in paperwork and manual data entry</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">32%</div>
                    <p className="text-gray-400">Increase in patient satisfaction scores</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/#demo">
                    <a className="inline-flex items-center px-6 py-3 bg-[#00ffff] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#00ffff,0_0_10px_#00ffff] transition-all duration-300">
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
