import { useState } from 'react';
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
import { BookingCTA, BookingDialog } from "@/components/booking";

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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [leadData, setLeadData] = useState<{ name: string; email: string; phone?: string }>({
    name: "",
    email: "",
    phone: "",
  });

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
      
      // Save lead data for booking
      setLeadData({
        name: data.name,
        email: data.email,
        phone: data.phone,
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

  // Handler for opening booking dialog
  const handleOpenBooking = () => {
    trackEvent({
      category: 'booking',
      action: 'opened',
      label: 'medical_funnel',
    });
    setIsBookingOpen(true);
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
                  <p className="text-xl text-white mb-8">
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
                            <p className="text-white text-sm">
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
                            <p className="text-white text-sm">
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
                            <p className="text-white text-sm">
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
          
          {/* Pain Points Section with Enhanced Red Ambient Glow */}
          <section className="py-16 px-4 bg-[#0c0c14] relative overflow-hidden">
            {/* Red ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#ff0000]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0000]/3 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The <span className="text-white">Real Challenges</span> Healthcare Providers Face
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <h3 className="text-2xl font-semibold mb-6 text-white">Patient Acquisition & Revenue Challenges</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Unpredictable Patient Flow</p>
                          <p className="text-gray-300 text-sm">Your schedule swings between overwhelming busy periods and concerning gaps, making financial planning impossible and staff scheduling a nightmare.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Declining Referral Networks</p>
                          <p className="text-gray-300 text-sm">Traditional referral sources are drying up as physicians retire, practices consolidate, and patients increasingly research and choose providers independently online.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Insurance Reimbursement Pressures</p>
                          <p className="text-gray-300 text-sm">With reimbursement rates declining, you need more patients to maintain revenue, but your current marketing isn't bringing in enough qualified prospects.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium mb-1">Competition from Large Health Systems</p>
                          <p className="text-gray-300 text-sm">Hospital networks with massive marketing budgets are capturing patients you should be treating, while you struggle to compete with their visibility and resources.</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Online Reputation Management
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          Negative reviews damaging your practice's reputation even when providing excellent care
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          No systematic approach to collecting and showcasing positive patient testimonials
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          Poor online visibility compared to larger healthcare institutions
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Patient Communication Gaps
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          High rate of missed appointments and last-minute cancellations
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          Inefficient recall systems leading to gaps in preventative care
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          Limited patient education systems, reducing treatment compliance
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-red-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-red-100">
                        Practice Management Inefficiency
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          Disjointed systems that don't communicate with each other, creating data silos
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          Staff spending too much time on administrative tasks instead of patient care
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-6 w-6 text-red-400" />
                        </div>
                        <p className="text-white">
                          No comprehensive analytics to make data-driven practice growth decisions
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Healthcare Industry Expertise Section with Yellow Ambient Glow */}
          <section className="py-16 px-4 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 relative overflow-hidden">
            {/* Professional layered background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-yellow-800/10 to-amber-900/20 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-600/5 to-transparent z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/8 via-transparent to-orange-500/8 z-0"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Our <span className="text-[#ffa500] [text-shadow:0_0_5px_#ffa500]">Healthcare Industry Expertise</span>
              </h2>
              <p className="text-xl text-center text-white mb-12 max-w-4xl mx-auto">
                We understand healthcare marketing because we've mastered the unique challenges, regulations, and patient acquisition strategies that drive practice growth.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* High-Value Lead Types */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Premium Patient Demographics</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Insurance-verified patients with $75K+ household income</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Patients actively seeking elective procedures (cosmetic, dental, specialist care)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Chronic condition patients requiring ongoing care management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Health-conscious demographics aged 35-65 with disposable income</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Regulatory Compliance Expertise */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">HIPAA-Compliant Marketing</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Complete HIPAA compliance in all patient communications and data handling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>FDA-compliant advertising for medical devices and treatments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>State medical board advertising regulation adherence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Ethical marketing practices that maintain professional credibility</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Patient Journey Understanding */}
                <Card className="bg-[#121218]/90 border border-[#ffa500]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ffa500]/20 to-[#ffa500]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="h-12 w-12 bg-[#ffa500]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="h-6 w-6 text-[#ffa500]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#ffa500]">Patient Decision Psychology</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Trust-building through educational content and social proof</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Addressing healthcare anxiety and decision paralysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Insurance navigation and payment option communication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#ffa500] flex-shrink-0 mt-0.5" />
                        <span>Emergency vs. preventive care messaging strategies</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Healthcare Lead Qualification */}
              <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#ff8c00]/5 border border-[#ffa500]/30 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-center mb-6 text-[#ffa500]">Advanced Healthcare Lead Qualification Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Insurance & Financial Qualification</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Real-time insurance verification and coverage assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Out-of-pocket cost estimation and payment plan qualification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>HSA/FSA eligible procedure identification and guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Premium insurance plan holders prioritization</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Clinical & Urgency Assessment</h4>
                    <ul className="space-y-2 text-sm text-white">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Symptom severity and treatment urgency evaluation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Previous treatment history and referral pattern analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Specialist referral readiness and appointment commitment level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-[#ffa500] rounded-full mt-2 flex-shrink-0"></div>
                        <span>Chronic condition management program suitability</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Competitive Advantage */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#ffa500]">Why Our Healthcare Expertise Beats the Competition</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">87%</div>
                    <div className="text-sm text-white">Higher patient conversion rates vs. generic marketing</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">$340</div>
                    <div className="text-sm text-white">Average patient lifetime value increase</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">24hrs</div>
                    <div className="text-sm text-white">Average time to qualified appointment booking</div>
                  </div>
                  <div className="bg-[#121218]/50 border border-[#ffa500]/20 rounded-lg p-4">
                    <div className="text-3xl font-bold text-[#ffa500] mb-2">100%</div>
                    <div className="text-sm text-white">HIPAA compliance with zero violations</div>
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
                      <p className="text-sm text-white">Avg. New Patients:</p>
                      <p className="text-xl font-bold text-[#14ffc8]">+43%</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/20 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <div className="h-12 w-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-2">
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
                      <p className="text-sm text-white">No-show Reduction:</p>
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
                      <p className="text-sm text-white">Review Volume:</p>
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
                    <p className="text-white">
                      "As a busy dermatology practice, we struggled with consistent new patient flow. 
                      Since implementing Fusion's healthcare marketing system, we've seen a 52% increase in new patients 
                      and our schedule is consistently booked 3 weeks out. The system is completely HIPAA-compliant 
                      and has become an essential part of our practice."
                    </p>
                    <div className="mt-4">
                      <p className="font-semibold">Dr. Amanda Chen, MD</p>
                      <p className="text-sm text-white">Founder, Premier Dermatology Associates</p>
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
                {/* Advanced Patient Journey Optimization */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#14ffc8]">Advanced Patient Journey Optimization</h3>
                    <p className="text-lg leading-relaxed">
                      Our proprietary healthcare marketing system transforms every touchpoint into a conversion opportunity. 
                      From the moment a potential patient discovers your practice to their first appointment and beyond, 
                      we orchestrate a seamless experience that builds trust and drives action.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/20">
                        <h4 className="font-semibold text-[#14ffc8] mb-2">Pre-Visit Engagement</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Educational content series</li>
                          <li>• Symptom checkers</li>
                          <li>• Treatment cost calculators</li>
                          <li>• Provider bio videos</li>
                        </ul>
                      </div>
                      <div className="bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/20">
                        <h4 className="font-semibold text-[#14ffc8] mb-2">Post-Visit Retention</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Automated follow-up sequences</li>
                          <li>• Treatment adherence tracking</li>
                          <li>• Referral reward programs</li>
                          <li>• Preventative care reminders</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#14ffc8]/5 p-8 rounded-lg border border-[#14ffc8]/20">
                    <h4 className="text-xl font-semibold mb-6 text-center">Patient Acquisition Results</h4>
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">287%</p>
                        <p className="text-sm text-gray-300">Average ROI Increase</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">$2.4M</p>
                        <p className="text-sm text-gray-300">Additional Revenue Generated</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">4.7x</p>
                        <p className="text-sm text-gray-300">Patient Lifetime Value</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-[#14ffc8]">92%</p>
                        <p className="text-sm text-gray-300">Patient Satisfaction Score</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HIPAA-Compliant Digital Infrastructure */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-2xl font-bold text-[#14ffc8]">HIPAA-Compliant Digital Infrastructure</h3>
                    <p className="text-lg leading-relaxed">
                      Healthcare marketing requires specialized compliance expertise. Our platform is built from the ground up 
                      with HIPAA regulations in mind, ensuring your patient data remains secure while maximizing marketing effectiveness.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#14ffc8]">Security Features:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            End-to-end encryption for all communications
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Role-based access controls
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Audit trails for all data access
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Regular security assessments
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#14ffc8]">Compliance Tools:</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Automated consent management
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Data retention policy automation
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Breach notification systems
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            Compliance reporting dashboard
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#14ffc8]/5 p-6 rounded-lg border border-[#14ffc8]/20">
                    <h4 className="font-semibold text-[#14ffc8] mb-4">Specialty-Specific Solutions</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Cardiology</p>
                        <p className="text-xs text-gray-300">Heart health education campaigns</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Orthopedics</p>
                        <p className="text-xs text-gray-300">Sports injury prevention content</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Dermatology</p>
                        <p className="text-xs text-gray-300">Cosmetic procedure showcases</p>
                      </div>
                      <div className="p-3 bg-[#14ffc8]/10 rounded">
                        <p className="font-medium text-sm">Mental Health</p>
                        <p className="text-xs text-gray-300">Stigma-reducing awareness campaigns</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROI and Performance Metrics */}
                <div className="bg-[#14ffc8]/5 p-8 rounded-lg border border-[#14ffc8]/20">
                  <h3 className="text-2xl font-bold text-[#14ffc8] mb-8 text-center">Proven Results Across Healthcare Specialties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">847%</div>
                      <div className="text-sm text-gray-300 mb-4">Average Cost Per Acquisition Improvement</div>
                      <div className="text-xs text-gray-400">Compared to traditional marketing methods</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">12.3x</div>
                      <div className="text-sm text-gray-300 mb-4">Patient Lifetime Value Multiplier</div>
                      <div className="text-xs text-gray-400">Through improved retention strategies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">89%</div>
                      <div className="text-sm text-gray-300 mb-4">No-Show Reduction Rate</div>
                      <div className="text-xs text-gray-400">Via automated reminder systems</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#14ffc8] mb-2">156%</div>
                      <div className="text-sm text-gray-300 mb-4">Referral Increase</div>
                      <div className="text-xs text-gray-400">Through patient advocacy programs</div>
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
                  Ready to Transform Your <span className="text-purple-400 [text-shadow:0_0_5px_#a855f7]">Healthcare Practice?</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join over 500+ healthcare providers who have revolutionized their patient acquisition with our proven system.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Free Strategy Session</h3>
                    <p className="text-sm text-gray-300">30-minute consultation to analyze your current patient acquisition strategy</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">Custom Implementation Plan</h3>
                    <p className="text-sm text-gray-300">Tailored roadmap for your specialty and patient demographics</p>
                  </div>
                  <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                    <h3 className="font-semibold text-purple-400 mb-2">90-Day Revenue Guarantee</h3>
                    <p className="text-sm text-gray-300">See measurable results within 3 months or we'll refund your investment</p>
                  </div>
                </div>

                <form className="max-w-2xl mx-auto bg-[#121218]/90 p-8 rounded-lg border border-purple-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Practice Name</label>
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
                    <label className="block text-sm font-medium mb-2">Medical Specialty</label>
                    <select className="w-full px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-lg focus:border-purple-400 focus:outline-none">
                      <option>Select Your Specialty</option>
                      <option>Family Medicine</option>
                      <option>Cardiology</option>
                      <option>Orthopedics</option>
                      <option>Dermatology</option>
                      <option>Mental Health</option>
                      <option>Pediatrics</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Get My Free Healthcare Marketing Analysis
                  </button>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    No commitment required. HIPAA-compliant consultation guaranteed.
                  </p>
                </form>
              </div>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>

      {/* Booking Dialog */}
      <BookingDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        leadContext={leadData}
      />
    </>
  );
}