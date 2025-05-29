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
          <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-red-950/40 to-slate-950 relative overflow-hidden">
            {/* Balanced red background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/25 via-red-800/15 to-red-900/25 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/8 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/12 via-transparent to-red-400/12 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/15 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-400/15 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The <span className="text-white">Real Challenges</span> Real Estate Agents Face
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/40 rounded-lg overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
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
                        <p className="text-red-100/80">
                          <span className="font-semibold text-red-100">Inconsistent Lead Flow:</span> You're spending thousands on lead generation, but the quality is poor and follow-up is inconsistent.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          <span className="font-semibold text-red-100">Website Underperformance:</span> Your current website isn't capturing leads or positioning you as the go-to expert in your market.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          <span className="font-semibold text-red-100">Manual Follow-up:</span> You're missing opportunities because you can't personally follow up with every lead at the right time.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/40 rounded-lg overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
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
                        <p className="text-red-100/80">
                          <span className="font-semibold text-red-100">Marketing Time Drain:</span> Creating social posts, email campaigns, and follow-up sequences takes time away from your clients.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          <span className="font-semibold text-red-100">Tech Frustration:</span> You've tried multiple tools but none work together and you end up juggling too many platforms.
                        </p>
                      </li>
                      <li className="flex gap-3 items-start">
                        <div className="mt-1">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          <span className="font-semibold text-red-100">Inconsistent Branding:</span> Your marketing lacks a cohesive look and message that makes you memorable to potential clients.
                        </p>
                      </li>
                    </ul>
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
              <p className="text-xl text-center text-muted-foreground mb-12 max-w-4xl mx-auto">
                We understand real estate marketing because we've mastered the unique challenges of market cycles, commission structures, and high-value client acquisition that drive sustainable growth.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* High-Value Lead Types */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
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
                  <CardContent className="p-6 relative z-10">
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
                  <CardContent className="p-6 relative z-10">
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
                    <ul className="space-y-2 text-sm text-muted-foreground">
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
                    <ul className="space-y-2 text-sm text-muted-foreground">
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
                    <div className="text-sm text-muted-foreground">Higher listing conversion rates vs. generic marketing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">$75K</div>
                    <div className="text-sm text-muted-foreground">Average commission increase per qualified lead</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">18 days</div>
                    <div className="text-sm text-muted-foreground">Average time from lead to contract signing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">85%</div>
                    <div className="text-sm text-muted-foreground">Client referral rate from satisfied customers</div>
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
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Lead Generation</h3>
                    <p className="text-gray-300 text-sm">
                      Targeted IDX website, property valuation tools, and buyer lead magnets that convert visitors into qualified leads.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Nurture Automation</h3>
                    <p className="text-gray-300 text-sm">
                      Automated follow-up sequences that nurture leads and stay top-of-mind through your entire sales cycle.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Reputation Builder</h3>
                    <p className="text-gray-300 text-sm">
                      Professional content marketing that positions you as the trusted expert in your local market.
                    </p>
                  </CardContent>
                </Card>
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
                  Ready to <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Dominate Your Market?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-12 text-center">
                  Let's build you a real estate marketing system that generates consistent leads and listings.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Lead form */}
                  <div className="bg-[#0a0a0d] border border-[#333340] p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Get Your Real Estate Marketing Strategy</h3>
                    
                    {submitted ? (
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-[#14ffc8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-[#14ffc8]" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2 text-white">Request Submitted!</h4>
                        <p className="text-gray-300 mb-4">
                          Thank you for reaching out. One of our real estate marketing specialists will contact you within 
                          24 hours to discuss your custom strategy.
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
                                    <Input placeholder="Sarah Johnson" {...field} className="bg-[#121218] border-[#333340] text-white" />
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
                                    <Input placeholder="sarah@premierealty.com" {...field} className="bg-[#121218] border-[#333340] text-white" />
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
                                  <FormLabel className="text-white">Brokerage Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Premier Realty Group" {...field} className="bg-[#121218] border-[#333340] text-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="specialty"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Real Estate Focus</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-[#121218] border-[#333340] text-white">
                                        <SelectValue placeholder="Select your specialty" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-[#121218] border-[#333340] text-white">
                                      <SelectItem value="residential-sales">Residential Sales</SelectItem>
                                      <SelectItem value="luxury-homes">Luxury Homes</SelectItem>
                                      <SelectItem value="first-time-buyers">First-Time Buyers</SelectItem>
                                      <SelectItem value="investment-properties">Investment Properties</SelectItem>
                                      <SelectItem value="commercial-real-estate">Commercial Real Estate</SelectItem>
                                      <SelectItem value="new-construction">New Construction</SelectItem>
                                      <SelectItem value="relocation-services">Relocation Services</SelectItem>
                                      <SelectItem value="foreclosures">Foreclosures & REO</SelectItem>
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
                                  <FormLabel className="text-white">Primary Interest</FormLabel>
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
                                      <SelectItem value="lead-generation">More Leads & Listings</SelectItem>
                                      <SelectItem value="social-media">Social Media Marketing</SelectItem>
                                      <SelectItem value="website-redesign">Professional Website</SelectItem>
                                      <SelectItem value="email-marketing">Email Campaigns</SelectItem>
                                      <SelectItem value="crm-system">CRM & Follow-up System</SelectItem>
                                      <SelectItem value="full-marketing">Complete Marketing Package</SelectItem>
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
                                    placeholder="What challenges are you facing? What are your goals for lead generation and sales?"
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
                              "Get My Real Estate Marketing Strategy"
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
                  
                  {/* ROI Calculator */}
                  <div className="bg-[#0a0a0d] border border-[#333340] p-8 rounded-lg">
                    <ROICalculator className="h-full" />
                  </div>
                </div>
              </div>
              
              {/* Detailed Solutions Content */}
              <div className="space-y-16 mt-16">
                {/* Advanced Real Estate Marketing Strategy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#14ffc8]">Advanced Real Estate Marketing Strategy</h3>
                    <p className="text-lg leading-relaxed">
                      Our real estate marketing system leverages behavioral psychology, market timing, and hyper-local targeting to position 
                      you as the go-to agent in your area. We create compelling buyer and seller journeys that convert prospects into 
                      committed clients while building your reputation as a market expert.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/20">
                        <h4 className="font-semibold text-[#14ffc8] mb-2">Buyer Acquisition</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Pre-qualified buyer database</li>
                          <li>• Exclusive property alerts</li>
                          <li>• Mortgage pre-approval partnerships</li>
                          <li>• Virtual tour campaigns</li>
                        </ul>
                      </div>
                      <div className="bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/20">
                        <h4 className="font-semibold text-[#14ffc8] mb-2">Seller Generation</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Home valuation marketing</li>
                          <li>• Market report automation</li>
                          <li>• Listing presentation tools</li>
                          <li>• Seller education sequences</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#14ffc8]/5 p-8 rounded-lg border border-[#14ffc8]/20">
                    <h4 className="text-xl font-semibold mb-6 text-center">Real Estate Results</h4>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">324%</p>
                        <p className="text-sm text-gray-300">Listing Appointment Increase</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">$1.2M</p>
                        <p className="text-sm text-gray-300">Average Commission Growth</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">73%</p>
                        <p className="text-sm text-gray-300">Faster Listing Sales</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">95%</p>
                        <p className="text-sm text-gray-300">Client Satisfaction Rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Domination System */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold text-[#14ffc8]">Market Domination System</h3>
                    <p className="text-lg leading-relaxed">
                      Real estate success requires consistent visibility and credibility in your local market. Our system positions you 
                      as the neighborhood expert through strategic content marketing, community engagement, and data-driven insights.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#14ffc8]">Local Authority Building:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Neighborhood market reports
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            School district analytics
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Local event partnerships
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Community involvement campaigns
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#14ffc8]">Digital Presence:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Property showcase videos
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Client success stories
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Social media automation
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Review generation systems
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#14ffc8]/5 p-6 rounded-lg border border-[#14ffc8]/20">
                    <h4 className="font-semibold text-[#14ffc8] mb-4">Market Specializations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Luxury Homes</p>
                        <p className="text-xs text-gray-300">High-net-worth buyer targeting</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">First-Time Buyers</p>
                        <p className="text-xs text-gray-300">Education-focused campaigns</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Investment Properties</p>
                        <p className="text-xs text-gray-300">ROI analysis and targeting</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Commercial Real Estate</p>
                        <p className="text-xs text-gray-300">Business owner outreach</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI and Performance Metrics */}
                <div className="bg-[#14ffc8]/5 p-8 rounded-lg border border-[#14ffc8]/20">
                  <h3 className="text-2xl font-bold text-[#14ffc8] mb-8 text-center">Proven Results for Real Estate Professionals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">467%</div>
                      <div className="text-sm text-gray-300 mb-4">Qualified Lead Increase</div>
                      <div className="text-xs text-gray-400">Within first 6 months of implementation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">6.2x</div>
                      <div className="text-sm text-gray-300 mb-4">Return on Marketing Investment</div>
                      <div className="text-xs text-gray-400">Measured by commission growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">84%</div>
                      <div className="text-sm text-gray-300 mb-4">Referral Rate Improvement</div>
                      <div className="text-xs text-gray-400">Through client satisfaction systems</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">197%</div>
                      <div className="text-sm text-gray-300 mb-4">Social Media Engagement</div>
                      <div className="text-xs text-gray-400">Across all platforms combined</div>
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