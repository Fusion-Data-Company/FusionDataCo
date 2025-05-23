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
                  <CardContent className="p-6 relative z-10">
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
                  <CardContent className="p-6 relative z-10">
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
                  <CardContent className="p-6 relative z-10">
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
                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Missing Growth Opportunities
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You've got no way to capture leads or follow up automatically with interested customers.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          Perfect customers visit your site but leave without contacting you - and you never know.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <p className="text-gray-300">
                          You're paying for marketing but have no idea if it's actually working.
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
            <div className="absolute -inset-1/2 bg-[#14ffc8]/5 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Complete Solution</span> for Small Business Growth
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/10 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-white">Fully Built Website & Funnel</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Professional, mobile-optimized website that actually converts visitors to leads
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Lead capture forms that work perfectly on all devices
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Content that speaks directly to your ideal customers
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/10 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-white">Your Own CRM + Lead Storage</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          All leads stored in your own Postgres DB (you control it)
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Track and manage your customer relationships in one place
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          See exactly what's working and what's not in real-time
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#14ffc8]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/10 to-[#14ffc8]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-white">Ongoing Support & Updates</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          24/7 live support — a real person, any time
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Hosting, updates, content management — done for you
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Everything evolves with your business - month-to-month, no contracts
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* ROI Calculator Section */}
              <div className="max-w-4xl mx-auto bg-[#121218] border border-[#14ffc8]/20 rounded-lg overflow-hidden relative p-8 mt-16">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/10 to-[#14ffc8]/5 blur-md z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-center mb-6 text-white">
                    <span className="text-[#14ffc8]">ROI Calculator:</span> See Your Growth Potential
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="current-leads" className="text-white text-lg mb-2 block">
                          How many leads do you get now per month?
                        </Label>
                        <Input 
                          id="current-leads"
                          type="number" 
                          value={currentLeads}
                          onChange={(e) => setCurrentLeads(e.target.value)}
                          className="bg-[#0a0a0d] border-[#333340] text-white h-12"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="ticket-price" className="text-white text-lg mb-2 block">
                          What's your average ticket price? ($)
                        </Label>
                        <Input 
                          id="ticket-price"
                          type="number" 
                          value={ticketPrice}
                          onChange={(e) => setTicketPrice(e.target.value)}
                          className="bg-[#0a0a0d] border-[#333340] text-white h-12"
                        />
                      </div>
                      
                      <Button 
                        onClick={calculateROI}
                        className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md py-3 text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                      >
                        Calculate Potential ROI
                      </Button>
                    </div>
                    
                    <div className="bg-[#0a0a0d] p-6 rounded-lg flex flex-col justify-center items-center">
                      <h4 className="text-xl font-medium text-gray-300 mb-3">With 20% more leads, you could gain:</h4>
                      
                      <div className="text-5xl font-bold text-[#14ffc8] mb-2">
                        ${projectedGain.toLocaleString()}
                      </div>
                      
                      <p className="text-gray-400 text-center">
                        Additional revenue per month
                      </p>
                      
                      <div className="mt-6 pt-6 border-t border-gray-800 w-full text-center">
                        <p className="text-gray-300">
                          That's <span className="text-[#14ffc8] font-bold">${(projectedGain * 12).toLocaleString()}</span> per year in untapped revenue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA and Lead Form Section */}
          <section id="lead-form" className="py-16 px-4 bg-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#14ffc8]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#14ffc8]/3 blur-3xl rounded-full opacity-10 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-3 text-center text-white">
                  Ready to Stop Losing Leads and Start Growing?
                </h2>
                <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
                  Tell us about your business. We'll get back to you within 24 hours with a personalized plan.
                </p>
                
                <Card className="bg-[#0a0a0d]/90 border border-[#14ffc8]/10 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#14ffc8]/5 to-[#14ffc8]/2 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 bg-[#14ffc8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="h-8 w-8 text-[#14ffc8]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Thank You!</h3>
                        <p className="text-gray-300 text-lg mb-6">
                          We've received your information and will be in touch shortly to discuss how we can help your business grow.
                        </p>
                        <Button 
                          onClick={() => setSubmitted(false)}
                          className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md px-6 py-3 shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                        >
                          Submit Another Request
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Full Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="John Smith" 
                                      {...field} 
                                      className="bg-[#121218] border-[#333340] text-white"
                                    />
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
                                    <Input 
                                      placeholder="your@email.com" 
                                      {...field} 
                                      className="bg-[#121218] border-[#333340] text-white"
                                    />
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
                                  <FormLabel className="text-white">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="(555) 123-4567" 
                                      {...field} 
                                      className="bg-[#121218] border-[#333340] text-white"
                                    />
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
                                    <Input 
                                      placeholder="Your Business LLC" 
                                      {...field} 
                                      className="bg-[#121218] border-[#333340] text-white"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
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
                                        <SelectValue placeholder="Select business type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-[#121218] border-[#333340] text-white">
                                      <SelectItem value="retail">Retail Store</SelectItem>
                                      <SelectItem value="restaurant">Restaurant/Café</SelectItem>
                                      <SelectItem value="service">Service Business</SelectItem>
                                      <SelectItem value="trades">Trades & Construction</SelectItem>
                                      <SelectItem value="professional">Professional Services</SelectItem>
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
                                  <FormLabel className="text-white">Which service are you most interested in?</FormLabel>
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
                                      <SelectItem value="website">Website & Funnel Pages</SelectItem>
                                      <SelectItem value="crm">CRM & Lead Management</SelectItem>
                                      <SelectItem value="social">Social Media Management</SelectItem>
                                      <SelectItem value="seo">SEO & Online Visibility</SelectItem>
                                      <SelectItem value="complete">Complete Solution Package</SelectItem>
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
                                <FormLabel className="text-white">Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us a bit more about your business challenges..."
                                    className="min-h-[120px] bg-[#121218] border-[#333340] text-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md py-6 text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                          >
                            {isSubmitting ? "Submitting..." : "Get My Growth Plan"}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}