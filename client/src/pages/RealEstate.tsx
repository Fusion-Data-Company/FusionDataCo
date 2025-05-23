import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, BarChart3, Globe, Clock, Home, XCircle, AlertTriangle, CheckCircle2, Users, DollarSign } from "lucide-react";
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
  company: z.string().min(2, { message: "Please enter your brokerage or agency name." }),
  agentType: z.string().min(1, { message: "Please select your agent type." }),
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
      company: "",
      agentType: "",
      interestedService: "",
      message: "",
      source: "RealEstateFunnel",
    },
  });

  // Form submission handler
  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission event
      trackEvent({
        category: 'lead_generation',
        action: 'submit',
        label: 'real_estate_funnel',
      });
      
      // Submit to backend
      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      
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
          content="Specialized marketing automation for real estate agents and brokerages. Generate more qualified leads, showcase listings professionally, and close more deals with Fusion Data Co."
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
                    Stop Losing Listings to <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Tech-Savvy Competitors</span>
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    You know the market. You know properties. But while you're showing houses, 
                    your competition is stealing leads with professional websites, automated follow-ups, 
                    and social media that actually works.
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
                              Professional Listing Showcase
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Your properties deserve better than fuzzy MLS photos and generic descriptions.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <Users className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Automated Lead Nurturing
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Follow up with every prospect automatically while you focus on closings.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-[#14ffc8]/10 p-3 rounded-full">
                            <DollarSign className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-white">
                              Commission-Focused Marketing
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Every marketing dollar works harder when it's designed to close deals.
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
                The <span className="text-white">Reality</span> Every Real Estate Agent Faces
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Your Website Embarrasses You
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Your brokerage template looks like every other agent's. Prospects can't tell you apart."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Listing photos are compressed, forms don't work on mobile, and your contact info is buried."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Buyers judge your professionalism by your website. Yours says 'part-time agent.'"
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      You're Losing Leads to Follow-up
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Someone inquires about a listing on Tuesday. You call back Thursday. They already found an agent."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Your CRM is a mess of sticky notes and half-remembered phone calls."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Buyers forget you exist because you don't stay in touch systematically."
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Marketing That Doesn't Work
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "You post 'Just Listed!' on Facebook. Three likes. Two are your mom and your broker."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Your Instagram is random photos of houses. No strategy, no brand, no results."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "You spend money on Zillow leads and get tire-kickers who shop five agents."
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Technology Overwhelm
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "You're supposed to be an agent, not a web designer, social media manager, and IT support."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "Every time you try to update something, it breaks. Now your listing gallery shows error messages."
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          "You watch tech-savvy agents win listings because their marketing looks more professional."
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Professional Real Estate Marketing That Closes
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <Home className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Professional Property Showcase
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Stunning listing galleries that make properties irresistible
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Mobile-optimized virtual tours and photo presentations
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Automatic MLS integration and property syndication
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Automated Lead Nurturing
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Instant response to all listing inquiries and buyer leads
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Smart CRM that tracks every interaction and follow-up
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Automated drip campaigns that keep you top-of-mind
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      Market Authority Building
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Professional social media presence with market updates
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Local SEO optimization to dominate area searches
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Neighborhood expertise content that establishes trust
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* ROI Calculator Section */}
              <div className="max-w-5xl mx-auto mt-16">
                <h3 className="text-2xl font-bold text-center mb-6 text-white">
                  <span className="text-[#14ffc8]">ROI Calculator:</span> See What Professional Marketing Is Worth
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3">
                    <div className="bg-[#121218] border border-[#333340] rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold mb-4 text-white">How Professional Marketing Impacts Your Commission</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Premium listings sell 23% faster</span> with professional marketing
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Win 40% more listing appointments</span> with professional presentation
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-4 w-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Generate 3x more qualified buyer leads</span> with targeted marketing
                          </p>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#121218] border border-[#333340] rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <DollarSign className="h-5 w-5 text-[#14ffc8] mr-2" />
                        <h4 className="text-lg font-semibold text-white">Real Agent Results</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[#0a0a0d] border border-[#333340] rounded-md p-4">
                          <div className="text-2xl font-bold text-[#14ffc8] mb-1">47%</div>
                          <div className="text-sm text-gray-400">More listing appointments won in first 90 days</div>
                        </div>
                        <div className="bg-[#0a0a0d] border border-[#333340] rounded-md p-4">
                          <div className="text-2xl font-bold text-[#ff0aff] mb-1">$127k</div>
                          <div className="text-sm text-gray-400">Average additional commission in year one</div>
                        </div>
                        <div className="bg-[#0a0a0d] border border-[#333340] rounded-md p-4">
                          <div className="text-2xl font-bold text-[#8f00ff] mb-1">89%</div>
                          <div className="text-sm text-gray-400">Repeat and referral business increase</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-400 italic">
                        "My listing presentations used to be just market comps and a handshake. Now I show up with 
                        a marketing plan that looks like I work for Sotheby's. I win 80% of my presentations."
                        <div className="mt-1 text-white font-medium">— Marcus R., Top Producer</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
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
                  Ready to <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Win More Listings?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-12 text-center">
                  Let's build you a marketing system that makes competitors jealous and clients confident.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Lead form */}
                  <div className="bg-[#0a0a0d] border border-[#333340] p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Get Your Real Estate Marketing Plan</h3>
                    
                    {submitted ? (
                      <div className="bg-[#14ffc8]/10 border border-[#14ffc8]/20 rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-[#14ffc8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="h-8 w-8 text-[#14ffc8]" />
                        </div>
                        <h4 className="text-xl font-semibold mb-2 text-white">Request Submitted!</h4>
                        <p className="text-gray-300 mb-4">
                          Thank you for reaching out. One of our real estate marketing specialists will contact you within 
                          24 hours to discuss your custom marketing strategy.
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
                                    <Input placeholder="john@realty.com" {...field} className="bg-[#121218] border-[#333340] text-white" />
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
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Brokerage/Agency</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your Brokerage Name" {...field} className="bg-[#121218] border-[#333340] text-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                              control={form.control}
                              name="agentType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Agent Type</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-[#121218] border-[#333340] text-white">
                                        <SelectValue placeholder="Select agent type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-[#121218] border-[#333340] text-white">
                                      <SelectItem value="new-agent">New Agent (0-2 years)</SelectItem>
                                      <SelectItem value="experienced">Experienced Agent (3-10 years)</SelectItem>
                                      <SelectItem value="top-producer">Top Producer (10+ years)</SelectItem>
                                      <SelectItem value="team-leader">Team Leader</SelectItem>
                                      <SelectItem value="broker">Broker/Owner</SelectItem>
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
                                      <SelectItem value="listing-marketing">Listing Marketing</SelectItem>
                                      <SelectItem value="buyer-lead-generation">Buyer Lead Generation</SelectItem>
                                      <SelectItem value="social-media">Social Media Management</SelectItem>
                                      <SelectItem value="website-redesign">Professional Website</SelectItem>
                                      <SelectItem value="crm-automation">CRM & Automation</SelectItem>
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
                                <FormLabel className="text-white">Tell us about your marketing goals</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="What challenges are you facing? What results are you looking for?"
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
                              "Get My Marketing Strategy"
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
                  
                  {/* Success stories */}
                  <div className="bg-[#0a0a0d] border border-[#333340] p-8 rounded-lg space-y-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold mb-2 text-white">What Agents Are Saying</h3>
                    
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="bg-[#121218] rounded-lg p-5 border border-[#333340] mb-4">
                          <p className="text-gray-300 italic">
                            "I went from struggling to get listings to having sellers call me directly. 
                            My marketing looks so professional that people assume I'm the market leader."
                          </p>
                          <div className="absolute -bottom-3 left-5 w-6 h-6 bg-[#121218] border-b border-r border-[#333340] transform rotate-45"></div>
                        </div>
                        
                        <div className="flex items-center ml-4">
                          <div className="w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mr-3">
                            <span className="text-[#14ffc8] font-semibold">TR</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">Tom Rodriguez</div>
                            <div className="text-gray-400 text-sm">Century 21 - $8.2M in sales</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="bg-[#121218] rounded-lg p-5 border border-[#333340] mb-4">
                          <p className="text-gray-300 italic">
                            "My conversion rate doubled overnight. When you show up with marketing that looks 
                            like luxury brands, sellers trust you with their biggest asset."
                          </p>
                          <div className="absolute -bottom-3 left-5 w-6 h-6 bg-[#121218] border-b border-r border-[#333340] transform rotate-45"></div>
                        </div>
                        
                        <div className="flex items-center ml-4">
                          <div className="w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center mr-3">
                            <span className="text-[#ff0aff] font-semibold">KB</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">Karen Booth</div>
                            <div className="text-gray-400 text-sm">Keller Williams - Top 5% Producer</div>
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
    
    try {
      // Track form submission event
      trackEvent({
        category: 'lead_generation',
        action: 'submit',
        label: 'real_estate_funnel',
      });
      
      // Submit to backend
      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      
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
          content="Specialized marketing automation for real estate professionals. Generate more listings, attract qualified buyers, and close more deals with Fusion Data Co."
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
                    Attract More Listings and Qualified <span className="text-primary">Real Estate</span> Buyers
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Stop competing on price. Our AI-powered marketing system helps real estate 
                    professionals become the obvious choice in their market.
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
                      Get Your Market Domination Plan
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
                            <BarChart3 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              78% More Leads
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our real estate clients see a 78% increase in qualified leads within 90 days.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Globe className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Digital Listing Dominance
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Position yourself as the hyper-local expert with our AI-optimized content system.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Save 12+ Hours Per Week
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Automated follow-up and lead nurturing frees you to focus on closing deals.
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
          
          {/* Pain Points Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-primary">Real Challenges</span> Facing Today's Real Estate Professionals
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Increasing Competition
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Tech-enabled discount brokers cutting into your territory and squeezing commissions
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Large brokerages with massive marketing budgets dominating your market
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          New agents entering the market fighting for the same listings
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Inconsistent Lead Generation
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Overpaying for leads from portals that aren't exclusive and rarely convert
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Uncertainty about where your next listing is coming from
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Relying too heavily on referrals that can dry up in changing markets
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Digital Marketing Overwhelm
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Too many platforms to manage - social media, CRM, email, websites, IDX, MLS
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Struggling to create fresh, engaging content that actually generates leads
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Not enough time to both market your business and actually serve clients
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Poor Lead Follow-up
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Leads falling through the cracks because of inconsistent follow-up
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          No system for nurturing long-term prospects until they're ready to transact
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Precious time wasted on manual follow-up tasks instead of high-value activities
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Solution & ROI Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-primary">Proven Solutions</span> for Real Estate Success
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Hyper-Local Authority</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">AI-generated neighborhood market reports</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Automated property valuation landing pages</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Local content that positions you as the expert</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Avg. Listing Increase:</p>
                      <p className="text-xl font-bold text-primary">63%</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Listing Acquisition System</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Pre-listing nurture campaigns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Automated FSBO and Expired outreach</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Seller lead magnet creation and distribution</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Commission Increase:</p>
                      <p className="text-xl font-bold text-primary">2.6x</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Buyer Conversion Engine</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Personalized property alerts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Automated showing feedback collection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Buyer journey tracking and optimization</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Lead Response Time:</p>
                      <p className="text-xl font-bold text-primary">↓ 97%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-semibold mb-2">
                      "I went from 4 to 18 listings in 5 months."
                    </h3>
                    <p className="text-muted-foreground">
                      "Fusion Data Co's automated marketing system completely transformed my business. 
                      My digital presence makes me look like a team of 20 when it's just me and my 
                      assistant. Best investment I've made in my business in 15 years."
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold">Jessica Martinez</p>
                      <p className="text-sm text-muted-foreground">Broker, Coastal Premier Properties</p>
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
            </div>
          </section>
          
          {/* CTA - Lead Form Section */}
          <section id="lead-form" className="py-16 md:py-24 px-4 bg-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to <span className="text-primary">Dominate</span> Your Local Market?
                  </h2>
                  <p className="text-lg mb-8 text-muted-foreground">
                    Get your personalized Real Estate Market Domination Plan with a free 30-minute strategy session.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Custom Marketing Blueprint</h3>
                        <p className="text-muted-foreground">
                          We'll analyze your market and create a tailored marketing strategy just for you.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Competitor Analysis</h3>
                        <p className="text-muted-foreground">
                          See what's working for top agents in your area and how to differentiate yourself.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Lead Generation Forecast</h3>
                        <p className="text-muted-foreground">
                          Get a detailed projection of the listings and buyers you could generate.
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
                            <Check className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                          <p className="text-muted-foreground mb-6">
                            Your information has been submitted successfully. One of our real estate
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
                            Get Your Free Market Domination Plan
                          </h3>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <input type="hidden" name="source" value="RealEstateFunnel" />
                              
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Jessica Martinez" {...field} />
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
                                      <Input placeholder="jessica@yourbrokerage.com" {...field} />
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
                                    <FormLabel>Brokerage/Agency</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your Brokerage" {...field} />
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
                                        placeholder="What specific challenges are you facing in your real estate business?" 
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
                                {isSubmitting ? "Submitting..." : "Get My Market Domination Plan"}
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