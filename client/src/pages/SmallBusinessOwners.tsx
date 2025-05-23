import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, BarChart3, Shield, Clock } from "lucide-react";
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
  business: z.string().min(2, { message: "Please enter your business name." }),
  message: z.string().optional(),
  source: z.string().default("SmallBusinessFunnel"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SmallBusinessOwners() {
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
        <title>Small Business Solutions | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Specialized marketing and data solutions for small business owners. Grow your customer base, streamline operations, and increase revenue with Fusion Data Co."
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
                    Powering Growth for <span className="text-primary">Small Business</span> Owners
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Running a business is hard enough. Let us handle your marketing 
                    and customer acquisition while you focus on what you do best.
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
                      Get Started Now
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
                              Growth without Complexity
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our average small business client sees 38% increase in qualified leads
                              within the first 90 days.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Shield className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Enterprise-grade, Small Business Price
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Access the same tools and strategies used by Fortune 500 companies,
                              but with pricing that makes sense for your business.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Time-saving Automation
                            </h3>
                            <p className="text-muted-foreground text-sm">
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
          
          {/* Pain Points Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                The <span className="text-primary">Real Challenges</span> Small Business Owners Face
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="titanium-card glow-blue">
                  <div className="ambient-glow"></div>
                  <CardContent className="p-6 titanium-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Inconsistent Customer Flow
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Feast or famine sales cycles that make staffing and inventory planning a nightmare
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Inability to predict busy periods, leading to lost sales or wasteful overstaffing
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Constant worry about where your next customers will come from
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="titanium-card glow-purple">
                  <div className="ambient-glow"></div>
                  <CardContent className="p-6 titanium-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Marketing That Drains Resources
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Wasting thousands on ineffective ads and campaigns with no measurable results
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Marketing firms that charge high retainers but deliver minimal ROI
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Too many tools and platforms with no integrated strategy
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="titanium-card glow-green">
                  <div className="ambient-glow"></div>
                  <CardContent className="p-6 titanium-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Not Enough Time
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Wearing too many hats, from operations to HR to marketing
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Struggling to stay on top of social media and customer engagement
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          No time to learn complex marketing systems or analyze data
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="titanium-card glow-amber">
                  <div className="ambient-glow"></div>
                  <CardContent className="p-6 titanium-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Falling Behind Competitors
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Larger competitors with dedicated marketing teams capturing your market share
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Customers choosing others because of better online presence and faster response
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          Unable to leverage new technologies that could give you an edge
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
                <span className="text-primary">Purpose-built Solutions</span> for Small Business Growth
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">Consistent Lead Generation</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Predictable customer acquisition pipeline</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Multi-channel lead generation strategy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Automated lead qualification and scoring</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Typical ROI:</p>
                      <p className="text-xl font-bold text-primary">3.8x</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Automated Marketing</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">AI-powered content creation and scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">24/7 lead nurturing and follow-up</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Customer journey optimization</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Time Saved:</p>
                      <p className="text-xl font-bold text-primary">15+ hrs/week</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Data-driven Decisions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Real-time performance dashboards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Customer behavior analytics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Predictive trend analysis</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Avg. Revenue Increase:</p>
                      <p className="text-xl font-bold text-primary">27%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-semibold mb-2">
                      "Fusion Data has been a game-changer for our business."
                    </h3>
                    <p className="text-muted-foreground">
                      "Before Fusion, we were spending 15 hours a week on social media with minimal results. 
                      Now our campaigns run on autopilot, our lead pipeline is full, and we've increased 
                      revenue by 32% in just 6 months."
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold">Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Owner, Pacific Coast Wellness</p>
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
                    Ready to Transform Your <span className="text-primary">Business Growth</span>?
                  </h2>
                  <p className="text-lg mb-8 text-muted-foreground">
                    Schedule a free 30-minute consultation to discover how Fusion Data Co can help
                    your small business thrive in the digital landscape.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Custom Growth Strategy</h3>
                        <p className="text-muted-foreground">
                          We'll create a tailored plan based on your specific business goals and challenges.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Competitive Analysis</h3>
                        <p className="text-muted-foreground">
                          Get insights into what's working for competitors in your industry and location.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">ROI Projection</h3>
                        <p className="text-muted-foreground">
                          See the potential return on your marketing investment based on real data.
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
                            Your information has been submitted successfully. One of our business growth
                            experts will contact you within 1 business day.
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
                            Get Your Free Consultation
                          </h3>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <input type="hidden" name="source" value="SmallBusinessFunnel" />
                              
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John Smith" {...field} />
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
                                      <Input placeholder="john@yourcompany.com" {...field} />
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
                                name="business"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your Business Name" {...field} />
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
                                    <FormLabel>Tell us about your goals (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="What are your primary business challenges or goals?" 
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
                                {isSubmitting ? "Submitting..." : "Schedule My Consultation"}
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