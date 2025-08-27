import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, CheckCircle2, Mail, Calendar, Users, Lightbulb, Send, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LeadMagnet() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    businessType: ""
  });
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  const businessTypes = [
    "Real Estate",
    "Medical",
    "Home Services",
    "Retail",
    "Coaching",
    "Restaurant",
    "Technology",
    "Legal",
    "Fitness",
    "Financial",
    "Nonprofit",
    "Other"
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email to download the playbook.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Submit to lead magnet endpoint
      // For now we're using a hardcoded ID (1) as we don't have a UI to create lead magnets yet
      await apiRequest("/api/marketing/lead-magnets/1/subscribe", {
        method: "POST",
        body: JSON.stringify(formState)
      });
      
      toast({
        title: "Success!",
        description: "Your AI Marketing Playbook will be delivered to your email shortly.",
      });
      
      setFormStep(2);
    } catch (error) {
      console.error("Error submitting lead form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Free AI Marketing Playbook | Fusion Data Co</title>
        <meta name="description" content="Download our free AI Marketing Playbook and learn how to leverage artificial intelligence to boost your marketing results, increase engagement, and drive more leads." />
        <meta property="og:title" content="Free AI Marketing Playbook | Fusion Data Co" />
        <meta property="og:description" content="Download our free AI Marketing Playbook and learn how to leverage artificial intelligence to boost your marketing results." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          <section className="relative py-20 overflow-hidden">
            {/* Background gradient and grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#140850] via-[#0a0a0d] to-[#0a0a0d] opacity-70"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Left side: Content */}
                <div>
                  <motion.h1 
                    className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#14ffc8] to-[#ff0aff]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Download Our Free AI Marketing Playbook
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    Discover how to leverage AI to boost your marketing results, increase engagement, and drive more leads.
                  </motion.p>
                  
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-[#14ffc8]/20 rounded-full p-1 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">12-Page Strategic Guide</h3>
                        <p className="text-gray-400">Step-by-step instructions to implement AI in your marketing stack</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#14ffc8]/20 rounded-full p-1 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">5 AI Prompt Templates</h3>
                        <p className="text-gray-400">Ready-to-use prompt templates for content generation that actually works</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#14ffc8]/20 rounded-full p-1 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">ROI Calculator</h3>
                        <p className="text-gray-400">Custom spreadsheet to calculate your potential return on investment</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Right side: Form */}
                <div>
                  {formStep === 1 ? (
                    <motion.div 
                      className="bg-[#121218] p-8 rounded-xl border border-gray-800 shadow-xl"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Get Instant Access</h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium text-gray-400 mb-2">Full Name</Label>
                          <Input 
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="bg-[#0a0a0d] border-gray-700"
                            value={formState.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-400 mb-2">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="bg-[#0a0a0d] border-gray-700"
                            value={formState.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="businessType" className="text-sm font-medium text-gray-400 mb-2">Business Type</Label>
                          <Select
                            value={formState.businessType}
                            onValueChange={(value) => setFormState({ ...formState, businessType: value })}
                          >
                            <SelectTrigger id="businessType" className="bg-[#0a0a0d] border-gray-700">
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#121218] border-gray-700">
                              {businessTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button 
                          type="submit"
                          className="w-full py-6 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-md flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                          disabled={loading}
                        >
                          {loading ? (
                            <>Downloading...</>
                          ) : (
                            <>
                              Download Playbook Now
                              <Download className="w-5 h-5 ml-1" />
                            </>
                          )}
                        </Button>
                        
                        <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 mt-4">
                          <Lock className="w-4 h-4" />
                          <span>We respect your privacy. Unsubscribe anytime.</span>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="bg-[#121218] p-8 rounded-xl border border-gray-800 shadow-xl"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#14ffc8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Mail className="w-10 h-10 text-[#14ffc8]" />
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4">Your Playbook Is On Its Way!</h2>
                        <p className="text-gray-400 mb-6">
                          Check your email inbox for your AI Marketing Playbook. We've also signed you up for our 3-day email course on advanced AI marketing strategies.
                        </p>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3 bg-[#0a0a0d] p-3 rounded-lg border border-gray-800">
                            <div className="bg-[#14ffc8]/20 rounded-full p-1.5">
                              <Mail className="w-4 h-4 text-[#14ffc8]" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-white">Day 1: AI Marketing Guide</p>
                              <p className="text-xs text-gray-500">Today</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 bg-[#0a0a0d] p-3 rounded-lg border border-gray-800">
                            <div className="bg-gray-700/40 rounded-full p-1.5">
                              <Lightbulb className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-white">Day 2: AI Use Cases</p>
                              <p className="text-xs text-gray-500">Tomorrow</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 bg-[#0a0a0d] p-3 rounded-lg border border-gray-800">
                            <div className="bg-gray-700/40 rounded-full p-1.5">
                              <Send className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-white">Day 3: Special Trial Offer</p>
                              <p className="text-xs text-gray-500">In 2 days</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => window.location.href = "/ai-marketing-suite"}
                          className="py-5 px-6 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-md shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                        >
                          Explore AI Marketing Suite
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </section>
          
          {/* Social Proof Section */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold text-center mb-16">
                Trusted by <span className="text-[#ff0aff]">Marketing Teams</span> Everywhere
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Testimonial 1 */}
                <div className="bg-[#121218] p-6 rounded-lg border border-gray-800 hover:border-[#14ffc8]/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[#14ffc8]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Sarah Thompson</h3>
                      <p className="text-sm text-gray-400">Marketing Director, TechFlow</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "This playbook changed our entire approach to social media. We're seeing 3x the engagement with half the effort."
                  </p>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-[#121218] p-6 rounded-lg border border-gray-800 hover:border-[#ff0aff]/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-[#ff0aff]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Mark Rodriguez</h3>
                      <p className="text-sm text-gray-400">CEO, GrowthLabs Agency</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "We've implemented these AI marketing strategies for 12 clients and every single one has seen measurable ROI improvements."
                  </p>
                </div>
                
                {/* Testimonial 3 */}
                <div className="bg-[#121218] p-6 rounded-lg border border-gray-800 hover:border-[#14ffc8]/30 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-[#14ffc8]" />
                    </div>
                    <div>
                      <h3 className="font-bold">Jennifer Lee</h3>
                      <p className="text-sm text-gray-400">Small Business Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    "As a small business, I didn't think AI was accessible to me. This playbook showed me exactly how to get started without a big budget."
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Stats Section */}
          <section className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold text-center mb-16">
                  The <span className="text-[#14ffc8]">Power</span> of AI Marketing
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-8 bg-[#121218]/70 rounded-lg border border-gray-800">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">73%</div>
                    <p className="text-gray-400">Reduction in content creation time using AI-powered tools</p>
                  </div>
                  
                  <div className="p-8 bg-[#121218]/70 rounded-lg border border-gray-800">
                    <div className="text-4xl font-bold text-[#ff0aff] mb-2">167%</div>
                    <p className="text-gray-400">Average increase in social media engagement with AI-optimized content</p>
                  </div>
                  
                  <div className="p-8 bg-[#121218]/70 rounded-lg border border-gray-800">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">42%</div>
                    <p className="text-gray-400">More qualified leads generated through AI-powered marketing campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Ready to <span className="text-[#ff0aff]">Revolutionize</span> Your Marketing?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                  Download the free playbook today and join thousands of marketers who are already seeing results with AI-powered marketing.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="py-6 px-8 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                  >
                    Get Your Free Playbook
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = "/ai-marketing-suite"}
                    className="py-6 px-8 border-[#ff0aff] text-[#ff0aff] hover:bg-[#ff0aff]/10 font-semibold rounded-md text-lg"
                  >
                    Explore Full AI Suite
                  </Button>
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