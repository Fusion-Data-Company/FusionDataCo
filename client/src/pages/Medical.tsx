import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, BarChart3, Shield, Clock, Heart, XCircle, CheckCircle2, Users, Calendar, Stethoscope } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import ROICalculator from "@/components/ROICalculator";
import ComparisonTable from "@/components/ComparisonTable";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  practice: z.string().min(2, { message: "Please enter your practice name." }),
  specialty: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default("MedicalFunnel"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Medical() {
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
      practice: "",
      specialty: "",
      message: "",
      source: "MedicalFunnel",
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
        label: 'medical_funnel',
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
        <title>Healthcare Marketing Solutions | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Specialized marketing automation for medical practices. Attract new patients, fill your schedule, and grow your practice with Fusion Data Co."
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
                    Grow Your <span className="text-[#14ffc8]">Medical</span> Practice With Ethical Patient Acquisition
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Healthcare professionals trust our HIPAA-compliant marketing system to 
                    attract qualified patients while maintaining the highest ethical standards.
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
                      Schedule Your Practice Growth Assessment
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
                              Increase Patient Volume by 43%
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our medical clients see an average 43% increase in new patients within 90 days.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Shield className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              HIPAA-Compliant Marketing
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our systems are designed from the ground up to maintain patient privacy and regulatory compliance.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Clock className="h-6 w-6 text-[#14ffc8]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              Reduce No-Shows by 68%
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Our automated reminder system dramatically reduces appointment no-shows and cancellations.
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
                The <span className="text-white">Real Challenges</span> Healthcare Providers Face
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121218]/70 border border-[#ff0000]/20 rounded-lg overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Patient Acquisition Struggles
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Difficulty attracting new patients in competitive markets with large hospital networks
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Unreliable referral systems that create unpredictable patient flow
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Marketing agencies with no healthcare experience who don't understand regulations
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Online Reputation Management
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Negative reviews damaging your practice's reputation even when providing excellent care
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          No systematic approach to collecting and showcasing positive patient testimonials
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Poor online visibility compared to larger healthcare institutions
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Patient Communication Gaps
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          High rate of missed appointments and last-minute cancellations
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Inefficient recall systems leading to gaps in preventative care
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Limited patient education systems, reducing treatment compliance
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="enterprise-card">
                  <div className="glow-wrapper"></div>
                  <CardContent className="p-6 enterprise-card-content">
                    <h3 className="text-xl font-semibold mb-4">
                      Practice Management Inefficiency
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Disjointed systems that don't communicate with each other, creating data silos
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          Staff spending too much time on administrative tasks instead of patient care
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-muted-foreground">
                          No comprehensive analytics to make data-driven practice growth decisions
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
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">The Solution:</span> Complete Healthcare Marketing System
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-6 w-6 text-[#14ffc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Patient Acquisition System</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Specialty-specific content that educates and converts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Targeted digital campaigns to your ideal patients</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Insurance-matched patient targeting</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Avg. New Patients:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">+43%</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-[#14ffc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Patient Communication Hub</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Multi-channel appointment reminders</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Automated recall and preventative care outreach</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">HIPAA-compliant secure messaging</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">No-show Reduction:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">68%</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="h-8 w-8 text-[#14ffc8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-center">Reputation Management</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Proactive review collection and monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Rapid response system for negative feedback</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#14ffc8] flex-shrink-0" />
                        <span className="text-sm">Testimonial showcasing and content creation</span>
                      </li>
                    </ul>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">Review Volume:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">5.2x</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/10 to-[#14ffc8]/5 blur-md z-0"></div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-semibold mb-2">
                      "Fusion Data Co <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">transformed</span> our patient acquisition strategy."
                    </h3>
                    <p className="text-muted-foreground">
                      "As a busy dermatology practice, we struggled with consistent new patient flow. 
                      Since implementing Fusion's healthcare marketing system, we've seen a 52% increase in new patients 
                      and our schedule is consistently booked 3 weeks out. The system is completely HIPAA-compliant 
                      and has become an essential part of our practice."
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold">Dr. Amanda Chen, MD</p>
                      <p className="text-sm text-muted-foreground">Founder, Premier Dermatology Associates</p>
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
                    Ready to <span className="text-[#14ffc8]">Grow</span> Your Healthcare Practice?
                  </h2>
                  <p className="text-lg mb-8 text-muted-foreground">
                    Schedule a complimentary 30-minute Practice Growth Assessment with a healthcare marketing specialist.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Practice-Specific Growth Plan</h3>
                        <p className="text-muted-foreground">
                          Receive a custom marketing blueprint tailored to your specialty and practice goals.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Patient Acquisition Forecast</h3>
                        <p className="text-muted-foreground">
                          See projections for new patient growth based on real data from your specialty.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-[#14ffc8]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Compliance Assessment</h3>
                        <p className="text-muted-foreground">
                          Identify any HIPAA or regulatory risks in your current marketing approach.
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
                            Your information has been submitted successfully. One of our healthcare marketing
                            specialists will contact you within 1 business day to schedule your assessment.
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
                            Schedule Your Free Practice Growth Assessment
                          </h3>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <input type="hidden" name="source" value="MedicalFunnel" />
                              
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Dr. Amanda Chen" {...field} />
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
                                      <Input placeholder="doctor@yourpractice.com" {...field} />
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
                                name="practice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Practice Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your Practice Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="specialty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Specialty (Optional)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., Dermatology, Dentistry, etc." {...field} />
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
                                    <FormLabel>What are your practice goals? (Optional)</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="What specific challenges are you facing in your practice?" 
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
                                {isSubmitting ? "Submitting..." : "Schedule My Assessment"}
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