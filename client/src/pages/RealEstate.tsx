import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, BarChart3, Home, Clock, XCircle, CheckCircle2, Users, Calendar, TrendingUp, Shield } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import ROICalculator from "@/components/ROICalculator";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  business: z.string().min(2, { message: "Please enter your business name." }),
  specialty: z.string().min(1, { message: "Please select your specialty." }),
  interestedService: z.string().min(1, { message: "Please select a service you're interested in." }),
  message: z.string().optional(),
  source: z.string().default("RealEstateFunnel"),
});

type FormValues = z.infer<typeof formSchema>;

export default function RealEstate() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business: "",
      specialty: "",
      interestedService: "",
      message: "",
      source: "RealEstateFunnel",
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
        label: 'real_estate_funnel',
      });
      
      // Submit to backend
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setSubmitted(true);
      toast({
        title: "Request submitted successfully",
        description: "We'll be in touch within 24 hours to discuss how we can help grow your real estate business.",
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
        <title>Real Estate Marketing Solutions | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Specialized marketing automation for real estate agents and brokers. Generate more leads, close more deals, and grow your real estate business with proven strategies."
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
                    Stop Losing Listings to <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Better Marketing</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    You're an amazing agent. You know the market, you serve clients well, and you close deals. 
                    But while you're helping buyers and sellers, other agents with better marketing systems 
                    are capturing the leads that should be yours.
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
                      Get More Listings Now
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
                            <Home className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              24/7 Lead Generation
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Capture seller leads and buyer inquiries even when you're showing properties.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <TrendingUp className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Professional Presence
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Stand out with marketing that positions you as the area's top agent.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <Users className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Automated Follow-up
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Never lose a lead again with smart nurturing that turns prospects into clients.
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
          
          {/* Pain Points Section with Enhanced Red Ambient Glow */}
          <section className="py-16 px-4 bg-[#0c0c14] relative overflow-hidden">
            {/* Red ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#ff0000]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0000]/3 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The <span className="text-white">Real Challenges</span> Real Estate Agents Face
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">Lead & Marketing Challenges</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Inconsistent Lead Flow:</span> You're spending thousands on lead generation, but the quality is poor and follow-up is inconsistent.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Website Underperformance:</span> Your current website isn't capturing leads or positioning you as the go-to expert in your market.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Manual Follow-up:</span> You're missing opportunities because you can't personally follow up with every lead at the right time.
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
                      <h3 className="text-xl font-semibold text-red-100">Time & Technology Struggles</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Marketing Time Drain:</span> Creating social posts, email campaigns, and follow-up sequences takes time away from your clients.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Tech Frustration:</span> You've tried multiple tools but none work together and you end up juggling too many platforms.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-white">
                          <span className="font-semibold text-red-100">Inconsistent Branding:</span> Your marketing lacks a cohesive look and message that makes you memorable to potential clients.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Real Estate Industry Statistics - Vertical Box */}
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-xl font-bold text-center mb-6 text-white">The Real Estate Agent Reality</h3>
                    <div className="space-y-4">
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">73%</div>
                        <div className="text-xs text-white">Of agents earn less than $50K annually</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">87%</div>
                        <div className="text-xs text-white">Leave the industry within 5 years</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">$147K</div>
                        <div className="text-xs text-white">Average revenue loss from poor lead generation</div>
                      </div>
                      <div className="bg-[#121218]/60 border border-red-500/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">68%</div>
                        <div className="text-xs text-white">Depend entirely on referrals and past clients</div>
                      </div>
                    </div>
                    <div className="text-center mt-6 pt-4 border-t border-red-500/20">
                      <p className="text-red-100 font-medium text-sm italic">
                        "The average real estate agent closes just 12 transactions per year because they lack a systematic approach to lead generation and follow-up."
                      </p>
                      <cite className="text-red-400 text-xs">— National Association of Realtors, 2024</cite>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Real Estate Industry Expertise Section with Yellow Ambient Glow */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-yellow-800/10 to-amber-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/8 z-0"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Real Estate Industry Expertise</span>
              </h2>
              <p className="text-xl text-center text-white mb-12 max-w-4xl mx-auto">
                We understand real estate marketing because we've mastered the unique challenges of market cycles, commission structures, and high-value client acquisition that drive sustainable growth.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* High-Value Lead Types */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Premium Client Demographics</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Luxury home buyers with $500K+ purchasing power</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Investment property buyers seeking portfolio expansion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>High-net-worth sellers with exclusive listings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Commercial property investors and developers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Market Dynamics */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Market Cycle Understanding</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Seasonal buying patterns: Spring surge, winter slowdown strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Interest rate impact on buyer behavior and timing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Inventory fluctuations creating seller vs. buyer markets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Economic indicators driving urgency and pricing strategies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Decision Psychology */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Client Trust & Decision Drivers</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Local market expertise and neighborhood knowledge validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Recent sales performance and client testimonials impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Professional photography and staging presentation quality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Response time and communication style preferences</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Lead Qualification for Real Estate */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">Advanced Real Estate Lead Qualification Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Financial & Timeline Qualification</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Pre-approval status and lending relationship verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Down payment capacity and liquid asset assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Current home sale contingency and timing coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Investment property experience and portfolio goals</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Property & Market Alignment</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Specific neighborhood preferences and lifestyle requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Property type, size, and feature must-haves vs. nice-to-haves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Commute requirements and school district priorities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Urgency level and competitive market strategy readiness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Competitive Advantage */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why Our Real Estate Expertise Beats the Competition</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">94%</div>
                    <div className="text-sm text-white">Higher listing conversion rates vs. generic marketing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">$75K</div>
                    <div className="text-sm text-white">Average commission increase per qualified lead</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">18 days</div>
                    <div className="text-sm text-white">Average time from lead to contract signing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">85%</div>
                    <div className="text-sm text-white">Client referral rate from satisfied customers</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Solution Section with Green Ambient Glow */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-green-800/10 to-teal-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete Real Estate Marketing System
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <BarChart3 className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Advanced Lead Generation System</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">IDX-integrated websites with instant property valuations that capture 73% more leads than generic sites</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Neighborhood-specific landing pages optimized for local SEO dominance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Social media advertising campaigns targeting first-time homebuyers, luxury buyers, and investors</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 340% increase in qualified leads within 90 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Calendar className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Smart Nurture Automation</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">12-month drip campaigns with market updates, new listings, and pricing trends</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Behavioral triggers based on property searches, price range changes, and engagement levels</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Personalized video messages and custom property recommendations</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 60% faster deal closings with automated follow-up</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-6">
                      <Shield className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Market Authority Builder</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Weekly market analysis reports positioning you as the neighborhood expert</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Google My Business optimization for local search dominance</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#14ffc8] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Client success story campaigns and video testimonials that build instant trust</span>
                      </div>
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-4 mt-4">
                        <p className="text-[#14ffc8] font-semibold text-center">Average Result: 85% of leads choose you over competitors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics Section */}
              <div className="bg-gradient-to-r from-[#14ffc8]/10 to-emerald-500/10 border border-[#14ffc8]/30 rounded-xl p-8 mb-12">
                <h3 className="text-3xl font-bold text-center mb-8">
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Proven Real Estate Marketing Results</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">340%</div>
                    <div className="text-white font-medium">Lead Generation Increase</div>
                    <div className="text-gray-400 text-sm mt-1">vs. traditional marketing</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">$147K</div>
                    <div className="text-white font-medium">Average Annual ROI</div>
                    <div className="text-gray-400 text-sm mt-1">per agent implementation</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">18 Days</div>
                    <div className="text-white font-medium">Lead to Contract</div>
                    <div className="text-gray-400 text-sm mt-1">average conversion time</div>
                  </div>
                  <div className="bg-[#121218]/60 border border-[#14ffc8]/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-[#14ffc8] mb-2">94%</div>
                    <div className="text-white font-medium">Client Satisfaction</div>
                    <div className="text-gray-400 text-sm mt-1">would recommend to peers</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <blockquote className="text-xl italic text-gray-300 mb-4">
                    "Fusion Data Co completely transformed my real estate business. I went from struggling to find quality leads to having a 6-month pipeline of qualified buyers and sellers. The automated systems handle my marketing while I focus on closing deals."
                  </blockquote>
                  <cite className="text-[#14ffc8] font-semibold">— Sarah Chen, Top 1% Producer, Luxury Properties Group</cite>
                </div>
              </div>
              
              {/* Strategic Implementation Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">Your 90-Day Market Domination Plan</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Market Analysis & Setup (Days 1-14)</h4>
                        <p className="text-gray-300 text-sm">Complete competitive analysis, target audience research, and system implementation</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Lead Generation Launch (Days 15-45)</h4>
                        <p className="text-gray-300 text-sm">Deploy targeted campaigns, optimize conversion funnels, and scale successful strategies</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-[#14ffc8]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#14ffc8] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Authority Building & Scale (Days 46-90)</h4>
                        <p className="text-gray-300 text-sm">Establish market authority, expand reach, and systematize your lead flow</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#14ffc8]">What Sets Our System Apart</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Real Estate Specialization</h4>
                        <p className="text-gray-300 text-sm">Unlike generic marketing agencies, we exclusively focus on real estate with 8+ years of industry expertise</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Data-Driven Results</h4>
                        <p className="text-gray-300 text-sm">Every strategy is backed by market data and continuously optimized for maximum ROI</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-[#14ffc8] mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Proven Track Record</h4>
                        <p className="text-gray-300 text-sm">Over 400+ agents using our system with an average 340% increase in qualified leads</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Purple Registration Section */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-violet-800/10 to-purple-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/8 via-transparent to-violet-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Become the <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">Go-To Agent</span> in Your Market?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join over 400+ real estate professionals who have transformed their business with our proven marketing system.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Market Analysis</h3>
                    <p className="text-sm text-gray-300">Comprehensive review of your current market position and competitor analysis</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Custom Lead Strategy</h3>
                    <p className="text-sm text-gray-300">Tailored plan for your market area, price point, and specialty focus</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">90-Day Listing Guarantee</h3>
                    <p className="text-sm text-gray-300">See increased listing appointments within 3 months or we'll refund your investment</p>
                  </div>
                </div>

                <form className="max-w-2xl mx-auto bg-[#121218]/90 p-8 rounded-lg border border-purple-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Agent Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Brokerage</label>
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
                    <label className="block text-sm font-medium mb-2">Real Estate Focus</label>
                    <select className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none">
                      <option>Select Your Specialty</option>
                      <option>Residential Sales</option>
                      <option>Luxury Homes</option>
                      <option>First-Time Buyers</option>
                      <option>Investment Properties</option>
                      <option>Commercial Real Estate</option>
                      <option>New Construction</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Get My Free Real Estate Marketing Analysis
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    No commitment required. Results guaranteed within 90 days.
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