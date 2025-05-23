import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, BarChart3, Globe, Clock } from "lucide-react";
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
  company: z.string().min(2, { message: "Please enter your brokerage or agency name." }),
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
                  <Card className="bg-card border border-border/50 overflow-hidden">
                    <CardContent className="p-6">
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
                <Card className="bg-background border border-border/50">
                  <CardContent className="p-6">
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
                
                <Card className="bg-background border border-border/50">
                  <CardContent className="p-6">
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
                
                <Card className="bg-background border border-border/50">
                  <CardContent className="p-6">
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
                
                <Card className="bg-background border border-border/50">
                  <CardContent className="p-6">
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