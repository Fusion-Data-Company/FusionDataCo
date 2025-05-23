import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Megaphone, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Clock, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Target,
  Users
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trackEvent } from '@/components/AnalyticsTracker';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  business: z.string().min(2, { message: "Please enter your business name." }),
  businessType: z.string().min(1, { message: "Please select your business type." }),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default("SocialMediaTrial"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SocialMediaCampaign() {
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
      businessType: "",
      facebookUrl: "",
      instagramUrl: "",
      message: "",
      source: "SocialMediaTrial",
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
        label: 'social_media_trial',
      });
      
      // Submit to backend
      await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          tags: ["socialMediaTrial"]
        }),
      });
      
      setSubmitted(true);
      toast({
        title: "Trial request submitted successfully",
        description: "We'll be in touch within 24 hours to get your free trial started.",
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
        <title>Social Media Management | Fusion Data Co</title>
        <meta name="description" content="Try our 2-week free social media management service. We post daily, custom-tailored content based on your business and campaign needs." />
        <meta property="og:title" content="Social Media Management | Fusion Data Co" />
        <meta property="og:description" content="Free 2-week trial of our social media management service. Custom content posted daily to your pages." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8f00ff]/30 via-[#0a0a0d] to-[#0a0a0d] opacity-70"></div>
            
            {/* Animated grid lines */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  className="font-['Orbitron'] text-5xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Your Business Looks <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Dead Online</span>
                </motion.h1>
                
                <motion.h2 
                  className="text-2xl md:text-3xl font-light text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  And prospects don't trust what looks dead
                </motion.h2>
                
                <motion.p
                  className="text-xl text-gray-400 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Try our social media management service <span className="text-[#14ffc8] font-bold">free for 2 weeks</span>.
                  We'll post once per day with content tailored to your business.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md px-8 py-6 text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                    onClick={() => {
                      const formSection = document.getElementById('trial-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                      
                      trackEvent({
                        category: 'engagement',
                        action: 'click',
                        label: 'scroll_to_trial_form',
                      });
                    }}
                  >
                    Start Your Free 2-Week Trial
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Pain Points Section */}
          <section className="py-16 px-4 bg-[#0c0c14] relative overflow-hidden">
            {/* Red ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#ff0000]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0000]/3 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">
                The <span className="text-white">Pain</span> of Inactive Social Media
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-14 w-14 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <XCircle className="h-7 w-7 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white text-center">
                      Lost Credibility
                    </h3>
                    <p className="text-gray-300 text-center">
                      When customers check your social media and see months of inactivity, 
                      they question if you're still in business.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-14 w-14 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white text-center">
                      Invisible to Prospects
                    </h3>
                    <p className="text-gray-300 text-center">
                      Social algorithms punish inactive accounts, making you invisible to new 
                      customers who could be finding you right now.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-red-900/30 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-900/20 to-red-800/10 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-14 w-14 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="h-7 w-7 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-white text-center">
                      Competitors Win
                    </h3>
                    <p className="text-gray-300 text-center">
                      While your accounts sit idle, competitors with consistent activity
                      are capturing customers who should be yours.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Solution Section */}
          <section className="py-16 px-4 bg-[#0a0a0d] relative overflow-hidden">
            {/* Green ambient glow behind the content */}
            <div className="absolute inset-0 bg-[#14ffc8]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#14ffc8]/5 blur-3xl rounded-full opacity-20 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <h2 className="text-3xl font-bold mb-12 text-center">
                <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Our Solution:</span> We Run Your Pages
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="bg-[#121218]/90 border border-[#ff0aff]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0aff]/10 to-[#ff0aff]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-16 w-16 bg-[#ff0aff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-white">Daily Content</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          One fresh post every day to keep your audience engaged
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          Consistent posting schedule optimized for your audience
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          No more gaps or inconsistent activity on your profiles
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#ff0aff]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0aff]/10 to-[#ff0aff]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-16 w-16 bg-[#ff0aff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Megaphone className="h-8 w-8 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-white">Tailored Content</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          Custom content based on your industry, services, and brand voice
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          No generic posts or obvious AI-generated content
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          Real humans writing and curating content that sounds like you
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#121218]/90 border border-[#ff0aff]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0aff]/10 to-[#ff0aff]/5 blur-md z-0"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="h-16 w-16 bg-[#ff0aff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-white">Engagement & Results</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          Real engagement from actual customers and prospects
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          Professional social presence that builds trust with new leads
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#ff0aff]" />
                        </div>
                        <p className="text-gray-300">
                          Weekly performance reports showing what's working
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Value Proposition Box */}
              <div className="max-w-4xl mx-auto mt-12 mb-20">
                <Card className="bg-[#121218] border border-[#ff0aff]/20 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0aff]/10 to-[#ff0aff]/5 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">After Your Free Trial</h3>
                        <p className="text-gray-300 mb-6">
                          Continue with our Social Media Management service for just <span className="text-[#ff0aff] font-bold">$199/month</span>.
                          That's less than $7 per day for daily, professional social media management.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-[#ff0aff] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">30 posts per month across your platforms</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-[#ff0aff] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Cancel anytime - no long-term contracts</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-[#ff0aff] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">Social media that grows with your business</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-[#0a0a0d] p-6 rounded-lg">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#ff0aff]/10 rounded-full flex items-center justify-center mr-3">
                              <Facebook className="h-5 w-5 text-[#ff0aff]" />
                            </div>
                            <span className="text-white">Facebook</span>
                          </div>
                          <div className="text-[#ff0aff] font-semibold">30 posts</div>
                        </div>
                        <div className="flex justify-between mb-8">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#ff0aff]/10 rounded-full flex items-center justify-center mr-3">
                              <Instagram className="h-5 w-5 text-[#ff0aff]" />
                            </div>
                            <span className="text-white">Instagram</span>
                          </div>
                          <div className="text-[#ff0aff] font-semibold">30 posts</div>
                        </div>
                        <div className="text-center bg-[#121218] p-4 rounded-md">
                          <div className="text-sm text-gray-400 mb-1">Monthly investment</div>
                          <div className="text-3xl font-bold text-white mb-1">$199<span className="text-gray-400 text-base font-normal">/month</span></div>
                          <div className="text-gray-400 text-sm">After free 2-week trial</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="py-16 px-4 bg-[#121218]">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-16 text-center">
                How Your <span className="text-[#ff0aff]">Free Trial</span> Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#ff0aff] flex items-center justify-center text-black font-bold text-lg">1</div>
                  <Card className="pt-12 mt-5 h-full bg-[#0a0a0d] border border-[#333340]">
                    <CardContent className="text-center p-6">
                      <h3 className="text-xl font-bold mb-4 text-white">Sign Up Today</h3>
                      <p className="text-gray-400">
                        Fill out the simple form below and submit your trial request. 
                        We'll need your business name and social media accounts.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#ff0aff] flex items-center justify-center text-black font-bold text-lg">2</div>
                  <Card className="pt-12 mt-5 h-full bg-[#0a0a0d] border border-[#333340]">
                    <CardContent className="text-center p-6">
                      <h3 className="text-xl font-bold mb-4 text-white">Content Approval</h3>
                      <p className="text-gray-400">
                        Within 24 hours, we'll send you a content plan for review.
                        Once approved, we start posting immediately.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#ff0aff] flex items-center justify-center text-black font-bold text-lg">3</div>
                  <Card className="pt-12 mt-5 h-full bg-[#0a0a0d] border border-[#333340]">
                    <CardContent className="text-center p-6">
                      <h3 className="text-xl font-bold mb-4 text-white">See Results & Decide</h3>
                      <p className="text-gray-400">
                        After 2 weeks, review the results and engagement. Decide if you want 
                        to continue with our full service at $199/month.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          
          {/* Trial Sign-up Form Section */}
          <section id="trial-form" className="py-16 px-4 bg-[#0a0a0d] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#ff0aff]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#ff0aff]/3 blur-3xl rounded-full opacity-10 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-3 text-center text-white">
                  Start Your 2-Week Free Trial Now
                </h2>
                <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
                  No credit card required. No obligation to continue.
                </p>
                
                <Card className="bg-[#121218]/90 border border-[#ff0aff]/10 rounded-lg overflow-hidden relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#ff0aff]/5 to-[#ff0aff]/2 blur-md z-0"></div>
                  <CardContent className="p-8 relative z-10">
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 bg-[#ff0aff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="h-8 w-8 text-[#ff0aff]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Thank You!</h3>
                        <p className="text-gray-300 text-lg mb-6">
                          We've received your trial request and will be in touch within 24 hours 
                          to get your free social media management trial started.
                        </p>
                        <Button 
                          onClick={() => setSubmitted(false)}
                          className="bg-[#ff0aff] hover:bg-[#ff0aff]/90 text-white font-semibold rounded-md px-6 py-3 shadow-[0_0_15px_rgba(255,10,255,0.3)] hover:shadow-[0_0_20px_rgba(255,10,255,0.5)] transition-all duration-300"
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
                                      className="bg-[#0a0a0d] border-[#333340] text-white"
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
                                      className="bg-[#0a0a0d] border-[#333340] text-white"
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
                                      className="bg-[#0a0a0d] border-[#333340] text-white"
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
                                      className="bg-[#0a0a0d] border-[#333340] text-white"
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
                                      <SelectTrigger className="bg-[#0a0a0d] border-[#333340] text-white">
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
                              name="facebookUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">
                                    <div className="flex items-center gap-2">
                                      <Facebook className="h-4 w-4 text-[#ff0aff]" />
                                      <span>Facebook Page URL</span>
                                    </div>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="https://facebook.com/yourbusiness" 
                                      {...field} 
                                      className="bg-[#0a0a0d] border-[#333340] text-white"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="instagramUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">
                                    <div className="flex items-center gap-2">
                                      <Instagram className="h-4 w-4 text-[#ff0aff]" />
                                      <span>Instagram Page URL</span>
                                    </div>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="https://instagram.com/yourbusiness" 
                                      {...field} 
                                      className="bg-[#0a0a0d] border-[#333340] text-white"
                                    />
                                  </FormControl>
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
                                    placeholder="Tell us about your business and any specific content themes you'd like us to focus on..."
                                    className="min-h-[120px] bg-[#0a0a0d] border-[#333340] text-white"
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
                            className="w-full bg-[#ff0aff] hover:bg-[#ff0aff]/90 text-white font-semibold rounded-md py-6 text-lg shadow-[0_0_15px_rgba(255,10,255,0.3)] hover:shadow-[0_0_20px_rgba(255,10,255,0.5)] transition-all duration-300"
                          >
                            {isSubmitting ? "Submitting..." : "Start My Free 2-Week Trial"}
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