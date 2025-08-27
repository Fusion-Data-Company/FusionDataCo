import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, BarChart3, Home, Clock, XCircle, CheckCircle2, Users, Calendar, TrendingUp, Shield, AlertTriangle, CheckCircle } from "lucide-react";
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
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section - Blue band */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    STOP LOSING LISTINGS TO BETTER MARKETING
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  Real Estate Marketing Automation Platform
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  You're an amazing agent. You know the market, you serve clients well, and you close deals. 
                  But while you're helping buyers and sellers, other agents with better marketing systems 
                  are capturing the leads that should be yours.
                </p>
              </div>
            </div>
          </section>
          
          {/* Pain Section - Red band */}
          <section className="py-16 px-4 bg-gradient-to-b from-red-900/20 to-red-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
                  Pain: Real Estate Marketing Gaps
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-400">
                  Why Real Estate Agents Struggle with Lead Generation
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Inconsistent Lead Flow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You're spending thousands on lead generation, but the quality is poor and follow-up is inconsistent. Leads slip through the cracks.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Marketing Time Drain</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Creating social posts, email campaigns, and follow-up sequences takes time away from serving your clients and closing deals.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Technology Frustration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You've tried multiple tools but none work together. You end up juggling too many platforms that don't deliver results.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Solution Section - Yellow band (Information & Tools) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Information & Strategy: Complete Marketing Automation
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-yellow-400">Real Estate Marketing Platform</span> Features
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Everything you need for systematic lead generation and client nurturing in one unified platform
                </p>
              </div>
              
              {/* Main Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Lead Generation Engine */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Home className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">🏡 Lead Generation Engine</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Automated lead capture and qualification system designed specifically for real estate professionals 
                      to identify and engage high-value prospects.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">24/7 listing inquiry capture</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Buyer qualification automation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Seller lead identification</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CRM & Follow-up Automation */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">📱 CRM & Follow-up Automation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Smart nurturing sequences that automatically follow up with prospects based on their behavior, 
                      interests, and stage in the buying or selling process.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Automated drip campaigns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Behavior-triggered responses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Market update automation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Marketing Automation */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">📈 Marketing Automation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Professional marketing campaigns that position you as the area expert while consistently 
                      generating new leads and nurturing existing relationships.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Social media management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Email marketing campaigns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Market report distribution</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics & ROI Tracking */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <BarChart3 className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">📊 Analytics & ROI Tracking</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Complete visibility into your marketing performance with detailed analytics that show 
                      exactly which efforts are generating the best results and highest-value leads.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Lead source tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Conversion rate analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Campaign performance metrics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Green Section - Solutions/Good News */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                  Good News: Real Estate Success Platform
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-green-400">Transform Your Real Estate Business</span> With Proven Results
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Join hundreds of successful real estate professionals who have dramatically increased their lead generation 
                  and closed more deals with our comprehensive marketing automation platform.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                  <CardHeader>
                    <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-green-400" />
                    </div>
                    <CardTitle className="text-green-400">340% More Qualified Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our automated lead generation system consistently delivers 3x more qualified prospects than traditional marketing methods.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">24/7 automated lead capture</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Pre-qualified buyer identification</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                  <CardHeader>
                    <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-8 w-8 text-green-400" />
                    </div>
                    <CardTitle className="text-green-400">60% Faster Deal Closings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Automated follow-up sequences and smart nurturing campaigns dramatically reduce time from lead to closing.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Intelligent follow-up automation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Behavioral trigger campaigns</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                  <CardHeader>
                    <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                    <CardTitle className="text-green-400">85% Higher Commission Per Lead</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Focus on high-value prospects and premium listings while our system handles lead nurturing and qualification automatically.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Premium client targeting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Luxury market positioning</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Success Metrics */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-6 text-green-400">Proven Results Across All Market Conditions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
                    <div className="text-sm text-muted-foreground">Client retention rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">$185K</div>
                    <div className="text-sm text-muted-foreground">Average annual commission increase</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">18 days</div>
                    <div className="text-sm text-muted-foreground">Average time from lead to contract</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">400+</div>
                    <div className="text-sm text-muted-foreground">Successful real estate professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Purple Section - Call to Action/Registration */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-purple-900/20 to-violet-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/5 z-0"></div>
            <div className="container mx-auto relative z-10 max-w-4xl">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
                  Ready to Get Started?
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-purple-400">Start Your Real Estate Marketing Transformation</span> Today
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Get your free market analysis and custom lead generation strategy consultation. 
                  See exactly how our platform can transform your real estate business.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Brokerage Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Your brokerage"
                        className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="bg-background/50 border-purple-500/20 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Market Focus Area
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/50 border-purple-500/20 focus:border-purple-400">
                        <SelectValue placeholder="Select your primary market" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential-sales">Residential Sales</SelectItem>
                        <SelectItem value="luxury-homes">Luxury Homes ($1M+)</SelectItem>
                        <SelectItem value="first-time-buyers">First-Time Buyers</SelectItem>
                        <SelectItem value="investment-properties">Investment Properties</SelectItem>
                        <SelectItem value="commercial">Commercial Real Estate</SelectItem>
                        <SelectItem value="new-construction">New Construction</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Current Monthly Lead Volume
                    </label>
                    <Select>
                      <SelectTrigger className="bg-background/50 border-purple-500/20 focus:border-purple-400">
                        <SelectValue placeholder="How many leads do you currently generate per month?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-10">0-10 leads per month</SelectItem>
                        <SelectItem value="11-25">11-25 leads per month</SelectItem>
                        <SelectItem value="26-50">26-50 leads per month</SelectItem>
                        <SelectItem value="51-100">51-100 leads per month</SelectItem>
                        <SelectItem value="100+">100+ leads per month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      What's your biggest marketing challenge? (Optional)
                    </label>
                    <Textarea
                      placeholder="Tell us about your current marketing challenges..."
                      className="bg-background/50 border-purple-500/20 focus:border-purple-400 min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-4 text-lg"
                  >
                    Get My Free Real Estate Marketing Analysis
                  </Button>
                </form>

                <div className="mt-6 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    🔒 Your information is secure and will never be shared
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No spam, no sales calls until you're ready. Get your custom strategy within 24 hours.
                  </p>
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
