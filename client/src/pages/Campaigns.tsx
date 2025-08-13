import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart3, Megaphone, Calendar, Edit2, Lightbulb, BrainCircuit, RefreshCw, LayoutGrid } from "lucide-react";
import { Link } from "wouter";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Campaigns() {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setTimeout(() => setAnimationComplete(true), 800);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      <Helmet>
        <title>Campaign Builder | Fusion Data Co</title>
        <meta name="description" content="Launch, track, and automate your social presence in minutes with our AI-powered campaign builder. Create multi-platform content with the perfect brand voice." />
        <meta property="og:title" content="Automated Campaign Builder | Fusion Data Co" />
        <meta property="og:description" content="Launch, track, and automate your social presence in minutes with our AI-powered campaign builder." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#140850] via-[#0a0a0d] to-[#0a0a0d] opacity-70"></div>
            
            {/* Animated grid lines */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  className="font-['Orbitron'] text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#14ffc8] to-[#ff0aff]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Automated Campaign Builder
                </motion.h1>
                
                <motion.h2 
                  className="text-2xl md:text-3xl font-light text-gray-300 mb-8 max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Launch, Track & Automate Your Social Presence in Minutes
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link href="/campaigns/new">
                    <Button size="lg" className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md px-8 py-6 text-lg shadow-[0_0_15px_rgba(20,255,200,0.5)] hover:shadow-[0_0_20px_rgba(20,255,200,0.7)] transition-all duration-300">
                      Create Your First Campaign
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-['Orbitron'] font-bold text-center mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Powerful <span className="text-[#14ffc8]">Features</span>
              </motion.h2>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={container}
                initial="hidden"
                animate="show"
                onAnimationComplete={handleAnimationComplete}
              >
                {/* Campaign Composer */}
                <motion.div variants={item} className="feature-card">
                  <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#14ffc8]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(20,255,200,0.2)] group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6 group-hover:bg-[#14ffc8]/20 transition-all duration-300">
                        <Edit2 className="w-7 h-7 text-[#14ffc8]" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#14ffc8] transition-colors duration-300">Campaign Composer</h3>
                      <p className="text-gray-400 mb-4">Create stunning campaigns with our intuitive wizard interface. Set goals, target platforms, and schedule in minutes.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* AI Caption Generator */}
                <motion.div variants={item} className="feature-card">
                  <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#ff0aff]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(255,10,255,0.2)] group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff0aff]/20 transition-all duration-300">
                        <BrainCircuit className="w-7 h-7 text-[#ff0aff]" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff0aff] transition-colors duration-300">AI Caption Generator</h3>
                      <p className="text-gray-400 mb-4">Generate platform-specific captions powered by OpenRouter AI. Perfect your brand voice with just a few clicks.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Multi-Platform Scheduler */}
                <motion.div variants={item} className="feature-card">
                  <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#14ffc8]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(20,255,200,0.2)] group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6 group-hover:bg-[#14ffc8]/20 transition-all duration-300">
                        <Calendar className="w-7 h-7 text-[#14ffc8]" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#14ffc8] transition-colors duration-300">Multi-Platform Scheduler</h3>
                      <p className="text-gray-400 mb-4">Schedule content across Facebook, LinkedIn, and YouTube all from one unified dashboard.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Brand Voice Templates */}
                <motion.div variants={item} className="feature-card">
                  <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#ff0aff]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(255,10,255,0.2)] group">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff0aff]/20 transition-all duration-300">
                        <Megaphone className="w-7 h-7 text-[#ff0aff]" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff0aff] transition-colors duration-300">Brand Voice Templates</h3>
                      <p className="text-gray-400 mb-4">Choose from multiple tones: Bold, Playful, Luxury, and more. Keep your messaging consistent across all platforms.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  How It <span className="text-[#ff0aff]">Works</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Our automated campaign builder takes the guesswork out of social media marketing
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-10 h-10 text-[#14ffc8]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Define Your Goals</h3>
                  <p className="text-gray-400">Set campaign objectives, choose platforms, and define your target audience</p>
                </div>
                
                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mx-auto mb-6">
                    <BrainCircuit className="w-10 h-10 text-[#ff0aff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Generate Content</h3>
                  <p className="text-gray-400">Our AI creates platform-specific posts matching your brand voice and campaign goals</p>
                </div>
                
                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mx-auto mb-6">
                    <LayoutGrid className="w-10 h-10 text-[#14ffc8]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Automate & Monitor</h3>
                  <p className="text-gray-400">Schedule posts, track performance, and optimize campaigns automatically</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing CTA */}
          <section className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#121218] to-[#1c1c28] rounded-2xl p-10 border border-gray-800 relative overflow-hidden shadow-[0_0_40px_rgba(20,255,200,0.1)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14ffc8] to-[#ff0aff]"></div>
                
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Start a 2-Week Trial</h2>
                  <p className="text-xl text-gray-400">No credit card required. Experience the full power of our platform.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <Button size="lg" className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md px-8 py-6 text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300">
                    Start Free Trial
                  </Button>
                  
                  <Link href="/pricing">
                    <Button variant="outline" size="lg" className="border-[#ff0aff] text-[#ff0aff] hover:bg-[#ff0aff]/10 font-semibold rounded-md px-8 py-6 text-lg">
                      View Pricing Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Lead Form */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                  <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                    Ready to <span className="text-[#14ffc8]">Transform</span> Your Social Presence?
                  </h2>
                  <p className="text-xl text-gray-400 mb-6">
                    Join thousands of businesses that have increased their social engagement by an average of 230% within just 30 days.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#14ffc8]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14ffc8]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Full access to AI content generator</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#14ffc8]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14ffc8]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Multi-platform scheduling tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#14ffc8]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14ffc8]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Comprehensive analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#14ffc8]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14ffc8]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Priority customer support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#121218] p-8 rounded-xl border border-gray-800 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Get Started Now</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-[#1a1a24] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14ffc8] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 bg-[#1a1a24] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14ffc8] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-[#1a1a24] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14ffc8] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                      <select className="w-full px-4 py-3 bg-[#1a1a24] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14ffc8] transition-all">
                        <option value="">Select Industry</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Medical">Medical</option>
                        <option value="Home Services">Home Services</option>
                        <option value="Retail">Retail</option>
                        <option value="Coaching">Coaching</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <Button className="w-full py-4 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-md shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300">
                      Request Demo
                    </Button>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      By signing up, you agree to our <a href="#" className="text-[#14ffc8] hover:underline">Terms of Service</a> and <a href="#" className="text-[#14ffc8] hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}