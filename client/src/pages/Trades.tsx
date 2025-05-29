import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, BarChart3, Wrench, UserPlus, Users, Shield, CheckCircle2, XCircle } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().min(2, { message: "Please enter your company name." }),
  tradetype: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default("TradesFunnel"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Trades() {
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
      company: "",
      tradetype: "",
      message: "",
      source: "TradesFunnel",
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
        label: 'trades_funnel',
      });
      
      // Submit to backend
      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      setSubmitted(true);
      toast({
        title: "Form submitted successfully",
        description: "We'll be in touch with you shortly.",
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
        <title>Trades & Service Business Marketing | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Specialized marketing for plumbers, electricians, HVAC, and trades businesses. Generate more leads, book more jobs, and grow your service business with Fusion Data Co."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Book More Jobs and Scale Your <span className="text-[#14ffc8]">Trades</span> Business
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Stop worrying about where your next job will come from. Our proven marketing system 
                    helps trades businesses generate a steady flow of qualified leads.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="btn-titanium"
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
                      Get Your Lead Generation Plan
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <Card className="enterprise-card">
                    <div className="glow-wrapper"></div>
                    <CardContent className="p-6 enterprise-card-content">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <BarChart3 className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              35+ Quality Leads Per Month
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our trades clients average 35+ qualified leads per month that convert to booked jobs.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Wrench className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              2.4x Average Ticket Value
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our systems help you target higher-value jobs and upsell additional services.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <UserPlus className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              83% Customer Retention
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our automated follow-up system turns one-time customers into lifetime clients.
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
          <section className="py-16 px-4 bg-gradient-to-br from-slate-950 via-red-950/30 to-slate-900 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-red-800/10 to-orange-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/8 via-transparent to-orange-500/8 z-0"></div>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">
                The <span className="text-white">Real Challenges</span> Trades Businesses Face
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/40 rounded-lg overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Feast or Famine Cycle
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Alternating between being too busy and struggling to find jobs
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Seasonal fluctuations making staffing and inventory planning difficult
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Constant stress about where the next job will come from
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/40 rounded-lg overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Lead Quality Issues
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Wasting time and money on leads that never convert to jobs
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Online directories and lead services charging high fees for shared leads
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Low-budget customers haggling on price and causing payment problems
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/40 rounded-lg overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Marketing Complexity
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          No time to manage multiple marketing channels while running your business
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          Agencies that don't understand the trades industry charging premium rates
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          Uncertainty about which marketing strategies actually work for service businesses
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-950/40 to-red-900/30 border border-red-500/40 rounded-lg overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Customer Follow-up Challenges
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          Losing potential repeat business because of poor follow-up systems
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          No systematic approach to getting reviews and referrals
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                        <p className="text-red-100/80">
                          Missing out on maintenance contracts and recurring revenue opportunities
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Trades Industry Expertise Section with Yellow Ambient Glow */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-yellow-800/10 to-amber-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/8 z-0"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Trades Industry Expertise</span>
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-12 max-w-4xl mx-auto">
                We understand trades businesses because we've mastered the unique challenges of seasonal demand, emergency calls, and high-value project acquisition that drive sustainable growth.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* High-Value Lead Types */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Premium Customer Demographics</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Homeowners with $100K+ household income seeking quality workmanship</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Commercial property managers with recurring maintenance contracts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Emergency service customers willing to pay premium rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Construction companies needing specialized subcontractor services</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Service Demand Patterns */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Seasonal & Emergency Patterns</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Peak HVAC demand during extreme weather (300% rate increase)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Plumbing emergencies with 24-hour premium service opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Roofing projects timed with insurance claim settlements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Electrical upgrades driven by home renovation projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Customer Decision Psychology */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Trust & Urgency Drivers</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Licensed, bonded, insured credentials drive initial trust</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Local Google reviews and BBB ratings influence 89% of decisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Response time under 2 hours wins emergency service contracts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Upfront pricing and warranty terms close high-value projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Lead Qualification for Trades */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">Advanced Trades Lead Qualification Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Project Value & Urgency Assessment</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Emergency vs. planned work classification (premium pricing opportunities)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Project scope estimation: repair, replacement, or full system install</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Insurance claim involvement and coverage verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Budget range pre-qualification ($500+ minimum project values)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Customer Profile & Payment Verification</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Property ownership verification and decision-maker identification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Payment method assessment: cash, financing, or payment plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Previous contractor experience and satisfaction levels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Timeline flexibility and scheduling compatibility</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Competitive Advantage */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why Our Trades Expertise Beats the Competition</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">92%</div>
                    <div className="text-sm text-muted-foreground">Higher job conversion rates vs. generic marketing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">$2,850</div>
                    <div className="text-sm text-muted-foreground">Average project value increase</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">45min</div>
                    <div className="text-sm text-muted-foreground">Average response time to emergency calls</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">78%</div>
                    <div className="text-sm text-muted-foreground">Customer retention for recurring services</div>
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
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete Trades Business Growth System
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-[#14ffc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Consistent Lead Generation</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Geo-targeted local SEO and PPC campaigns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Service-specific landing pages that convert</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Emergency service promotion for premium jobs</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Monthly Leads:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">35+</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-[#14ffc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Business Automation</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">24/7 booking and estimate requests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Automated follow-up and reminder system</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Customer database with service history</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Time Saved:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">23 hrs/week</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-[#14ffc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Reputation Management</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Automated review collection from customers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Showcase testimonials to build trust</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Proactive review monitoring and response</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Positive Reviews:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">+187%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-semibold mb-2">
                      "My schedule stays full now, even in the slow season."
                    </h3>
                    <p className="text-muted-foreground">
                      "Before working with Fusion, we'd spend thousands on advertising with uneven results. 
                      Their system has completely transformed our business. We're booked solid 3 weeks out, 
                      our average ticket value is up 72%, and I've got the peace of mind knowing new jobs are 
                      coming in consistently."
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold">Mike Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Owner, Rodriguez Plumbing & HVAC</p>
                    </div>
                  </div>
                  <div className="md:w-1/4 flex justify-center md:justify-end">
                    <div className="flex items-center gap-1">
                      <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Detailed Solutions Content */}
              <div className="space-y-16 mt-16">
                {/* Advanced Lead Generation Strategy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#14ffc8]">Advanced Lead Generation Strategy</h3>
                    <p className="text-lg leading-relaxed">
                      Our trades-specific marketing system captures high-intent customers at the exact moment they need your services. 
                      We combine emergency response marketing, seasonal campaign optimization, and repeat customer nurturing to create 
                      a steady stream of profitable jobs year-round.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/20">
                        <h4 className="font-semibold text-[#14ffc8] mb-2">Emergency Response</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 24/7 priority call routing</li>
                          <li>• Emergency service landing pages</li>
                          <li>• Instant quote systems</li>
                          <li>• Crisis communication templates</li>
                        </ul>
                      </div>
                      <div className="bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/20">
                        <h4 className="font-semibold text-[#14ffc8] mb-2">Seasonal Optimization</h4>
                        <ul className="text-sm space-y-1">
                          <li>• HVAC seasonal campaigns</li>
                          <li>• Weather-triggered marketing</li>
                          <li>• Maintenance reminder systems</li>
                          <li>• Service contract renewals</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#14ffc8]/5 p-8 rounded-lg border border-[#14ffc8]/20">
                    <h4 className="text-xl font-semibold mb-6 text-center">Trades Business Results</h4>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">394%</p>
                        <p className="text-sm text-gray-300">Average Job Volume Increase</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">$847K</p>
                        <p className="text-sm text-gray-300">Additional Annual Revenue</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">67%</p>
                        <p className="text-sm text-gray-300">Higher Average Ticket</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">91%</p>
                        <p className="text-sm text-gray-300">Customer Retention Rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multi-Channel Customer Acquisition */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold text-[#14ffc8]">Multi-Channel Customer Acquisition</h3>
                    <p className="text-lg leading-relaxed">
                      Trades businesses require a diverse approach to reach customers across multiple touchpoints. Our system 
                      integrates digital marketing, local SEO, review management, and traditional advertising to dominate your local market.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#14ffc8]">Digital Presence:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Google My Business optimization
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Local search domination
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Emergency service advertising
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Social media automation
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#14ffc8]">Traditional Marketing:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Vehicle wrap optimization
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Door hanger campaigns
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Referral program automation
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Community event marketing
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#14ffc8]/5 p-6 rounded-lg border border-[#14ffc8]/20">
                    <h4 className="font-semibold text-[#14ffc8] mb-4">Trade-Specific Specialties</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">HVAC</p>
                        <p className="text-xs text-gray-300">Seasonal maintenance campaigns</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Plumbing</p>
                        <p className="text-xs text-gray-300">Emergency response optimization</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Electrical</p>
                        <p className="text-xs text-gray-300">Safety inspection reminders</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Roofing</p>
                        <p className="text-xs text-gray-300">Storm damage response systems</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI and Performance Metrics */}
                <div className="bg-[#14ffc8]/5 p-8 rounded-lg border border-[#14ffc8]/20">
                  <h3 className="text-2xl font-bold text-[#14ffc8] mb-8 text-center">Proven Results Across Trade Industries</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">542%</div>
                      <div className="text-sm text-gray-300 mb-4">Emergency Call Response Rate</div>
                      <div className="text-xs text-gray-400">Within first hour of system activation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">8.7x</div>
                      <div className="text-sm text-gray-300 mb-4">Return on Marketing Investment</div>
                      <div className="text-xs text-gray-400">Compared to traditional advertising</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">76%</div>
                      <div className="text-sm text-gray-300 mb-4">Repeat Customer Rate</div>
                      <div className="text-xs text-gray-400">Through maintenance programs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">234%</div>
                      <div className="text-sm text-gray-300 mb-4">Referral Generation Increase</div>
                      <div className="text-xs text-gray-400">Via automated follow-up systems</div>
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
                  Ready to Dominate Your <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">Local Market?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join over 300+ trades businesses that have transformed their lead generation with our proven system.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Business Assessment</h3>
                    <p className="text-sm text-gray-300">Comprehensive analysis of your current marketing and lead generation systems</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Custom Growth Plan</h3>
                    <p className="text-sm text-gray-300">Trade-specific strategy tailored to your service area and specialties</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">90-Day Job Guarantee</h3>
                    <p className="text-sm text-gray-300">See increased job volume within 3 months or we'll refund your investment</p>
                  </div>
                </div>

                <form className="max-w-2xl mx-auto bg-[#121218]/90 p-8 rounded-lg border border-purple-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
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
                    <label className="block text-sm font-medium mb-2">Trade Specialty</label>
                    <select className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none">
                      <option>Select Your Trade</option>
                      <option>HVAC</option>
                      <option>Plumbing</option>
                      <option>Electrical</option>
                      <option>Roofing</option>
                      <option>General Contractor</option>
                      <option>Landscaping</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Get My Free Trades Marketing Analysis
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    No commitment required. Results guaranteed within 90 days.
                  </p>
                </form>
              </div>
            </div>
          </section>
          
          {/* CTA - Lead Form Section */}
          <section id="lead-form" className="py-16 md:py-24 px-4 bg-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Fill Your Schedule</span> With Quality Jobs?
                  </h2>
                  <p className="text-lg mb-8 text-muted-foreground">
                    Get your customized Lead Generation Plan with a free 30-minute strategy session.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Custom Marketing Blueprint</h3>
                        <p className="text-muted-foreground">
                          We'll analyze your service area and create a tailored marketing plan for your business.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Competitor Analysis</h3>
                        <p className="text-muted-foreground">
                          See what's working for top service providers in your area and how to stand out.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Lead Generation Forecast</h3>
                        <p className="text-muted-foreground">
                          Get a detailed projection of leads and revenue potential for your business.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Card className="bg-background border border-border/50">
                    <CardContent className="p-6 md:p-8">
                      {submitted ? (
                        <div className="text-center py-8">
                          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <Check className="h-8 w-8 text-[#14ffc8]" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                          <p className="text-muted-foreground mb-6">
                            Your information has been submitted successfully. One of our service business
                            marketing specialists will contact you within 1 business day.
                          </p>
                          <Button 
                            className="btn-titanium" 
                            onClick={() => setSubmitted(false)}
                          >
                            Submit Another Inquiry
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold mb-6">
                            Get Your Free Lead Generation Plan
                          </h3>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <input type="hidden" name="source" value="TradesFunnel" />
                              
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Mike Rodriguez" {...field} />
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
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                      <Input placeholder="mike@yourplumbing.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone Number (Optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="(555) 123-4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your Company Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="tradetype"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Type of Trade (Optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., Plumbing, HVAC, Electrical, etc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>What are your biggest challenges? (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="What specific challenges are you facing in your business?" 
                                        className="min-h-[100px]"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button 
                                type="submit" 
                                className="w-full btn-titanium" 
                                size="lg"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Submitting..." : "Get My Lead Generation Plan"}
                              </Button>
                              
                              <p className="text-xs text-center text-muted-foreground pt-2">
                                By submitting, you agree to our Privacy Policy and Terms of Service.
                                We'll never share your information.
                              </p>
                            </form>
                          </Form>
                        </>
                      )}
                    </CardContent>
                  </Card>
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