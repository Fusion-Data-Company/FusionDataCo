import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, BarChart3, Shield, Clock, DollarSign, BadgePercent, XCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ROICalculator from "@/components/ROICalculator";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  business: z.string().min(2, { message: "Please enter your business name." }),
  businessType: z.string().min(1, { message: "Please select your business type." }),
  interestedService: z.string().min(1, { message: "Please select a service you're interested in." }),
  message: z.string().optional(),
  source: z.string().default("SmallBusinessFunnel"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SmallBusinessOwners() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentLeads, setCurrentLeads] = useState<string>('10');
  const [ticketPrice, setTicketPrice] = useState<string>('250');
  const [projectedGain, setProjectedGain] = useState<number>(0);

  // Calculate ROI
  const calculateROI = () => {
    const leads = parseInt(currentLeads) || 0;
    const price = parseFloat(ticketPrice) || 0;
    const additionalLeads = Math.round(leads * 0.2); // 20% more leads
    const newGain = additionalLeads * price;
    setProjectedGain(newGain);
    
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'roi_calculator_used',
      value: newGain
    });
  };

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business: "",
      businessType: "",
      interestedService: "",
      message: "",
      source: "SmallBusinessFunnel",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission event
      trackEvent({
        category: 'lead_generation',
        action: 'submit',
        label: 'small_business_funnel',
      });
      
      // Submit to backend
      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      setSubmitted(true);
      toast({
        title: "Request submitted successfully",
        description: "We'll be in touch with you shortly to discuss how we can help your business grow.",
      });
      
      // Reset form
      form.reset();
      
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

  return (
    <>
      <Helmet>
        <title>Small Business Solutions | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Specialized marketing and data solutions for small business owners. Grow your customer base, streamline operations, and increase revenue with Fusion Data Co."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218]">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Your Business Deserves <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Better Results</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    You didn't start your business to become a web designer, a developer, or a tech wizard. You're great at what you do — but your website, funnels, and CRM? They're holding you back.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md px-8 py-6 text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                      onClick={() => {
                        const formSection = document.getElementById('lead-form');
                        formSection?.scrollIntoView({ behavior: 'smooth' });
                        
                        trackEvent({
                          category: 'engagement',
                          action: 'click',
                          label: 'scroll_to_form_button',
                        });
                      }}
                    >
                      Get Started Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <Card className="bg-[#121218] border border-gray-800 overflow-hidden rounded-lg shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0d] to-[#121218] opacity-50"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <BarChart3 className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Growth without Complexity
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Our average small business client sees 38% increase in qualified leads
                              within the first 90 days.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <Shield className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Enterprise-grade, Small Business Price
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Access the same tools and strategies used by Fortune 500 companies,
                              but with pricing that makes sense for your business.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <Clock className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Time-saving Automation
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Save 15+ hours per week with automated lead generation,
                              follow-up, and customer engagement.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pain Points Section with Red Ambient Glow */}
          <section className="py-16 px-4 bg-[#0c0c14] relative overflow-hidden">
            {/* Red ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#ff0000]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0000]/3 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The <span className="text-white">Real Challenges</span> Small Business Owners Face
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Outdated Web Presence
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You've got a GoDaddy template from 2014 that never helped close a single deal.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You have to call someone to update your website. They take a week. Or they ghost.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You're losing leads because your contact form breaks on mobile — again.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Invisible Online Presence
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          Your social media page hasn't been updated since last tax season. You're not even visible.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          Customers forget you exist because there's no consistent online presence.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          Your competitors show up in search results, but you're nowhere to be found.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Tech Overwhelm
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You don't have time to become a tech expert. You're running a real business.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          Every time you try to update something yourself, it breaks something else.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You've tried multiple "easy-to-use" platforms but ended up with a mess.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      No Follow-up System
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You're tracking leads on post-it notes, spreadsheets, or worse — your memory.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          Your leads go cold because you don't have an automatic follow-up process.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You know you're leaking money from missed opportunities, but you don't know how to fix it.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Yellow Industry Info Section */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-950 via-yellow-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-amber-800/10 to-orange-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-500/8 via-transparent to-amber-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Understanding the <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Small Business Landscape</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#ffa500]">Why 80% of Small Businesses Fail Within 5 Years</h3>
                  <div className="space-y-4">
                    <div className="bg-[#121218]/60 border border-[#ffa500]/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 text-white">Marketing Neglect</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Most small business owners are experts in their craft but struggle with marketing. They rely on word-of-mouth and hope for the best, missing 73% of potential customers.
                      </p>
                      <div className="text-[#ffa500] font-semibold text-sm">Impact: 60% revenue loss compared to competitors with proper marketing</div>
                    </div>
                    
                    <div className="bg-[#121218]/60 border border-[#ffa500]/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 text-white">Cash Flow Management</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        Without predictable lead generation, businesses experience feast-or-famine cycles that make it impossible to plan, invest, or grow consistently.
                      </p>
                      <div className="text-[#ffa500] font-semibold text-sm">Impact: 82% of failed businesses cite cash flow as primary reason</div>
                    </div>
                    
                    <div className="bg-[#121218]/60 border border-[#ffa500]/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 text-white">Digital Transformation Gap</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        While consumers moved online, many small businesses stayed stuck with outdated methods, losing market share to digitally-savvy competitors.
                      </p>
                      <div className="text-[#ffa500] font-semibold text-sm">Impact: 67% of customers research online before buying locally</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#ffa500]">The Small Business Success Formula</h3>
                  <div className="space-y-6">
                    <div className="border border-[#ffa500]/30 rounded-lg p-6 bg-gradient-to-r from-[#ffa500]/10 to-transparent">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#ffa500]/20 rounded-full flex items-center justify-center">
                          <span className="text-[#ffa500] font-bold text-lg">1</span>
                        </div>
                        <h4 className="text-xl font-semibold text-white">Consistent Lead Generation</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Build systems that bring in qualified prospects every day, not just when you remember to post on social media.
                      </p>
                    </div>
                    
                    <div className="border border-[#ffa500]/30 rounded-lg p-6 bg-gradient-to-r from-[#ffa500]/10 to-transparent">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#ffa500]/20 rounded-full flex items-center justify-center">
                          <span className="text-[#ffa500] font-bold text-lg">2</span>
                        </div>
                        <h4 className="text-xl font-semibold text-white">Automated Follow-Up</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Never lose a lead because you forgot to follow up. Automated systems nurture prospects until they're ready to buy.
                      </p>
                    </div>
                    
                    <div className="border border-[#ffa500]/30 rounded-lg p-6 bg-gradient-to-r from-[#ffa500]/10 to-transparent">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#ffa500]/20 rounded-full flex items-center justify-center">
                          <span className="text-[#ffa500] font-bold text-lg">3</span>
                        </div>
                        <h4 className="text-xl font-semibold text-white">Professional Online Presence</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Your website is your 24/7 salesperson. Make sure it's working to convert visitors into customers, not driving them away.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Statistics */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">Small Business Marketing Reality Check</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">61%</div>
                    <div className="text-sm text-white">Of small businesses have no marketing strategy</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">47%</div>
                    <div className="text-sm text-white">Don't track their marketing ROI at all</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">73%</div>
                    <div className="text-sm text-white">Rely solely on word-of-mouth marketing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">$312K</div>
                    <div className="text-sm text-white">Average revenue lost per year due to poor marketing</div>
                  </div>
                </div>
              </div>

              {/* Success Stories Preview */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">What Success Looks Like</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-6">
                    <div className="text-2xl font-bold text-[#ffa500] mb-2">Thompson's Plumbing</div>
                    <div className="text-sm text-white mb-3">From $180K to $520K annual revenue in 18 months</div>
                    <div className="text-xs text-gray-400">"Finally have more work than I can handle, and I'm booked 3 months out"</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-6">
                    <div className="text-2xl font-bold text-[#ffa500] mb-2">Elite Fitness Studio</div>
                    <div className="text-sm text-white mb-3">420% increase in new member signups</div>
                    <div className="text-xs text-gray-400">"Our automated system brings in 15+ qualified leads per week"</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-6">
                    <div className="text-2xl font-bold text-[#ffa500] mb-2">Rodriguez Law Firm</div>
                    <div className="text-sm text-white mb-3">$2.3M in new case value within 12 months</div>
                    <div className="text-xs text-gray-400">"We've become the go-to firm in our area for personal injury"</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Solution Section with Green Ambient Glow */}
          <section className="py-16 px-4 bg-[#0a0a0d] relative overflow-hidden">
            {/* Green ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#14ffc8]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#14ffc8]/3 blur-3xl rounded-full opacity-10 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete Small Business Growth System
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <BadgePercent className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Done-for-You Marketing
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Professional website that converts visitors into paying customers
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Daily social media content created and posted automatically
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          SEO optimization so you appear in local search results
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Automated Lead System
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Capture and organize leads without lifting a finger
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Automatic follow-up sequences that nurture prospects
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Simple CRM that tells you exactly who to call and when
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Ongoing Support
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Unlimited updates to your website and marketing materials
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Monthly strategy call with a dedicated success manager
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          24/7 tech support and marketing advisory
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Advanced ROI Calculator Section */}
              <div className="max-w-5xl mx-auto mt-16">
                <h3 className="text-2xl font-bold text-center mb-6 text-white">
                  <span className="text-[#14ffc8]">ROI Calculator:</span> See Your Growth Potential
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3">
                    {/* Description and benefits */}
                    <div className="bg-[#121218] border border-[#333340] rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold mb-4 text-white">How Our Platform Delivers ROI</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">50% higher conversion rates</span> with professional, 
                            responsive designs that build trust
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">10-15 hours saved weekly</span> through 
                            automated lead capture, follow-up, and customer management
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">20-30% higher customer value</span> through 
                            improved targeting and personalized follow-up sequences
                          </p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#121218] border border-[#333340] rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <DollarSign className="h-5 w-5 text-[#14ffc8] mr-2" />
                        <h4 className="text-lg font-semibold text-white">Real Client Results</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#0a0a0d] border border-[#333340] rounded-md p-4">
                          <div className="text-2xl font-bold text-[#14ffc8] mb-1">38%</div>
                          <div className="text-sm text-gray-400">Increase in qualified leads within 90 days</div>
                        </div>
                        <div className="bg-[#0a0a0d] border border-[#333340] rounded-md p-4">
                          <div className="text-2xl font-bold text-[#ff0aff] mb-1">4.2x</div>
                          <div className="text-sm text-gray-400">Average return on platform investment</div>
                        </div>
                        <div className="bg-[#0a0a0d] border border-[#333340] rounded-md p-4">
                          <div className="text-2xl font-bold text-[#8f00ff] mb-1">62%</div>
                          <div className="text-sm text-gray-400">Reduction in time spent on marketing tasks</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400 italic">
                        "We saw a 43% increase in our lead conversion rate in just the first month after 
                        implementing Fusion Data Co's platform. The ROI has been incredible."
                        <div className="mt-1 text-white font-medium">— Sarah K., Small Business Owner</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    {/* Use the new ROI Calculator component */}
                    <div className="sticky top-4">
                      <ROICalculator className="h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA and Lead Form Section */}
          <section id="lead-form" className="py-16 px-4 bg-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#14ffc8]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#14ffc8]/5 blur-3xl rounded-full opacity-10 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
                  Ready to <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Grow Your Business?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-12 text-center">
                  Fill out the form below and we'll show you exactly how our system can be tailored to your specific business.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Lead form */}
                  <div className="bg-[#0a0a0d] border border-[#333340] p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Get Your Custom Growth Plan</h3>
                    
                    {submitted ? (
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-[#14ffc8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-[#14ffc8]" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2 text-white">Request Submitted!</h4>
                        <p className="text-gray-300 mb-4">
                          Thank you for reaching out. One of our growth experts will contact you within 
                          24 hours to discuss how we can help your business grow.
                        </p>
                        <Button 
                          className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold"
                          onClick={() => setSubmitted(false)}
                        >
                          Submit Another Request
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Your Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Smith" {...field} className="bg-[#121218] border-[#333340] text-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Email Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john@example.com" {...field} className="bg-[#121218] border-[#333340] text-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(555) 123-4567" {...field} className="bg-[#121218] border-[#333340] text-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="business"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Business Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your Business Name" {...field} className="bg-[#121218] border-[#333340] text-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="businessType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Business Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-[#121218] border-[#333340] text-white">
                                        <SelectValue placeholder="Select your industry" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-[#121218] border-[#333340] text-white">
                                      <SelectItem value="retail">Retail</SelectItem>
                                      <SelectItem value="service">Service-based</SelectItem>
                                      <SelectItem value="restaurant">Restaurant/Food</SelectItem>
                                      <SelectItem value="professional">Professional (Legal, Accounting, etc.)</SelectItem>
                                      <SelectItem value="healthcare">Healthcare</SelectItem>
                                      <SelectItem value="trades">Trades (Plumbing, Electrical, etc.)</SelectItem>
                                      <SelectItem value="real-estate">Real Estate</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="interestedService"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">I'm Interested In</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-[#121218] border-[#333340] text-white">
                                        <SelectValue placeholder="Select service" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-[#121218] border-[#333340] text-white">
                                      <SelectItem value="website">Professional Website</SelectItem>
                                      <SelectItem value="social-media">Social Media Management</SelectItem>
                                      <SelectItem value="crm">Lead Management/CRM</SelectItem>
                                      <SelectItem value="marketing-automation">Marketing Automation</SelectItem>
                                      <SelectItem value="full-suite">Full Growth Suite</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Tell us about your business goals</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="What challenges are you facing? What are you hoping to achieve?"
                                    {...field}
                                    className="bg-[#121218] border-[#333340] text-white min-h-[120px]"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold py-3"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="animate-pulse">Processing...</span>
                              </>
                            ) : (
                              "Get My Free Growth Plan"
                            )}
                          </Button>
                          
                          <p className="text-xs text-center text-gray-400">
                            By submitting this form, you agree to our Privacy Policy and Terms of Service.
                            We'll never share your information with third parties.
                          </p>
                        </form>
                      </Form>
                    )}
                  </div>
                  
                  {/* Testimonials */}
                  <div className="bg-[#0a0a0d] border border-[#333340] p-8 rounded-lg space-y-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold mb-2 text-white">What Our Clients Say</h3>
                    
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="bg-[#121218] rounded-lg p-5 border border-[#333340] mb-4">
                          <p className="text-gray-300 italic">
                            "After struggling with DIY marketing for years, it's such a relief to have professionals 
                            handling everything. My leads have doubled, and I don't have to think about it."
                          </p>
                          <div className="absolute -bottom-3 left-5 w-6 h-6 bg-[#121218] border-b border-r border-[#333340] transform rotate-45"></div>
                        </div>
                        
                        <div className="flex items-center ml-4">
                          <div className="w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-3">
                            <span className="text-[#14ffc8] font-semibold">JD</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">John Donovan</div>
                            <div className="text-gray-400 text-sm">Donovan Plumbing</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="bg-[#121218] rounded-lg p-5 border border-[#333340] mb-4">
                          <p className="text-gray-300 italic">
                            "Worth every penny. I was skeptical about another 'marketing solution', but 
                            the ROI was measurable from month one. My online bookings are up 76%."
                          </p>
                          <div className="absolute -bottom-3 left-5 w-6 h-6 bg-[#121218] border-b border-r border-[#333340] transform rotate-45"></div>
                        </div>
                        
                        <div className="flex items-center ml-4">
                          <div className="w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-3">
                            <span className="text-[#ff0aff] font-semibold">LM</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">Lisa Martinez</div>
                            <div className="text-gray-400 text-sm">Wellness Spa Owner</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="bg-[#121218] rounded-lg p-5 border border-[#333340] mb-4">
                          <p className="text-gray-300 italic">
                            "I was wasting 15+ hours a week trying to handle my own marketing. Now I 
                            focus on serving clients while my online presence keeps growing."
                          </p>
                          <div className="absolute -bottom-3 left-5 w-6 h-6 bg-[#121218] border-b border-r border-[#333340] transform rotate-45"></div>
                        </div>
                        
                        <div className="flex items-center ml-4">
                          <div className="w-10 h-10 rounded-full bg-[#8f00ff]/20 flex items-center justify-center mr-3">
                            <span className="text-[#8f00ff] font-semibold">RC</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">Robert Chen</div>
                            <div className="text-gray-400 text-sm">Chen's Electronics</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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