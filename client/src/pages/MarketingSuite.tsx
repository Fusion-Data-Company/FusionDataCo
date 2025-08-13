import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  BarChart4, 
  Clock3, 
  Shuffle,
  TrendingUp,
  Calendar,
  MailCheck,
  Users,
  Zap,
  Lock,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { apiRequest } from "@/lib/queryClient";

export default function MarketingSuite() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plan: "pro"
  });
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.company) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Create CRM contact with the lead information
      await apiRequest("/api/crm/contacts", {
        method: "POST",
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          phone: formState.phone || "",
          tags: ["AI Suite Funnel"],
          source: "AI Marketing Suite Page",
          status: "Lead"
        })
      });
      
      toast({
        title: "Success!",
        description: "Thank you for your interest. Our team will contact you shortly.",
      });
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        company: "",
        phone: "",
        plan: "pro"
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  // Comparison table data
  const features = {
    "AI Caption Generation": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: false
    },
    "Multi-Platform Scheduling": {
      fusion: true,
      hootsuite: true,
      buffer: true,
      zapier: false
    },
    "Content Performance Analytics": {
      fusion: true,
      hootsuite: true,
      buffer: true,
      zapier: false
    },
    "Lead Capture Forms": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: true
    },
    "CRM Integration": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: true
    },
    "Email Marketing Automation": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: true
    },
    "Custom Audience Segmentation": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: false
    },
    "Workflow Builder": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: true
    },
    "White-Label Capability": {
      fusion: true,
      hootsuite: false,
      buffer: false,
      zapier: false
    }
  };
  
  // Pricing plans
  const plans = [
    {
      name: "Basic",
      value: "basic",
      price: 49,
      features: [
        "AI Caption Generation (50/mo)",
        "3 Social Platforms",
        "Basic Analytics",
        "Lead Capture Forms",
        "Email Support"
      ]
    },
    {
      name: "Pro",
      value: "pro",
      price: 99,
      popular: true,
      features: [
        "AI Caption Generation (250/mo)",
        "All Social Platforms",
        "Advanced Analytics",
        "Lead Capture Forms",
        "CRM Integration",
        "Email Marketing",
        "Custom Segmentation",
        "Priority Support"
      ]
    },
    {
      name: "Enterprise",
      value: "enterprise",
      price: 199,
      features: [
        "Unlimited AI Caption Generation",
        "All Pro Features",
        "White-Label Capability",
        "API Access",
        "Dedicated Account Manager",
        "Custom Workflow Builder",
        "24/7 Premium Support"
      ]
    }
  ];
  
  // Testimonials
  const testimonials = [
    {
      quote: "Fusion Data Co's AI Marketing Suite has completely transformed how we approach our social media strategy. We're getting more engagement while spending half the time on content creation.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechFlow",
      company: "TechFlow",
      avatarColor: "#14ffc8"
    },
    {
      quote: "The AI caption generator is mind-blowing. It produces perfect content for each platform with just a few clicks, saving us dozens of hours every month.",
      author: "Mark Williams",
      position: "Social Media Manager",
      company: "Growth Marketing Agency",
      avatarColor: "#ff0aff"
    },
    {
      quote: "I've tried every marketing platform out there, and Fusion Data Co's suite is the only one that seamlessly combines AI content creation, scheduling, and CRM in one place.",
      author: "Jennifer Lee",
      position: "Chief Marketing Officer",
      company: "NextLevel Retail",
      avatarColor: "#14ffc8"
    },
    {
      quote: "The ROI we've seen since switching to Fusion Data Co is incredible. Our lead generation has increased by 137% in just three months.",
      author: "Michael Rodriguez",
      position: "Founder",
      company: "DigitalStep Marketing",
      avatarColor: "#ff0aff"
    }
  ];
  
  // Pain points
  const painPoints = [
    {
      title: "Endless Content Creation",
      description: "Spending hours every day creating social posts with minimal results",
      icon: <Clock3 className="w-6 h-6 text-[#ff0aff]" />,
      solution: "AI-generated captions tailored to each platform in seconds"
    },
    {
      title: "Disconnected Tools",
      description: "Juggling 5+ different tools that don't talk to each other",
      icon: <Shuffle className="w-6 h-6 text-[#ff0aff]" />,
      solution: "All-in-one platform combining social, CRM, and automation"
    },
    {
      title: "Poor Lead Conversion",
      description: "Social engagement doesn't translate to actual leads or sales",
      icon: <TrendingUp className="w-6 h-6 text-[#ff0aff]" />,
      solution: "Integrated CRM with lead scoring and nurture campaigns"
    }
  ];

  return (
    <>
      <Helmet>
        <title>The Ultimate AI Marketing Suite | Fusion Data Co</title>
        <meta name="description" content="The Ultimate AI Marketing Suite for Businesses That Want to Win. Combine AI-powered content creation, multi-platform scheduling, and integrated CRM in one powerful platform." />
        <meta property="og:title" content="The Ultimate AI Marketing Suite | Fusion Data Co" />
        <meta property="og:description" content="The all-in-one AI marketing platform for businesses that want to win. Streamline your workflow and boost conversions." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-28 overflow-hidden">
            {/* Background gradient and grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#140850] via-[#0a0a0d] to-[#0a0a0d] opacity-70"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMDIwMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
            
            {/* Hero content */}
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <motion.h1 
                  className="font-['Orbitron'] text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#14ffc8] to-[#ff0aff]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  The Ultimate AI Marketing Suite
                </motion.h1>
                
                <motion.h2 
                  className="text-2xl md:text-3xl text-gray-300 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  For Businesses That Want to Win
                </motion.h2>
                
                <motion.div
                  className="max-w-3xl mx-auto mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-xl text-gray-400">
                    Combine AI-powered content creation, multi-platform scheduling, advanced CRM, and automated workflows in one seamless platform. Stop juggling tools and start converting.
                  </p>
                </motion.div>
                
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Button
                    onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="py-6 px-8 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                  >
                    Start Your Free Trial
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="py-6 px-8 border-[#ff0aff] text-[#ff0aff] hover:bg-[#ff0aff]/10 font-semibold rounded-md text-lg"
                  >
                    See How It Works
                  </Button>
                </motion.div>
                
                <motion.div
                  className="mt-10 text-sm text-gray-500 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Lock className="w-4 h-4 mr-1" />
                  <span>No credit card required for 14-day trial</span>
                </motion.div>
              </div>
            </div>
            
            {/* Abstract decoration */}
            <div className="absolute -bottom-5 left-0 w-full h-20 bg-gradient-to-r from-[#14ffc8]/10 via-[#ff0aff]/10 to-[#14ffc8]/10 blur-3xl"></div>
          </section>
          
          {/* Problem Section */}
          <section className="py-20 bg-[#0c0c14]" id="features">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                    The <span className="text-[#ff0aff]">Pain</span> We Solve
                  </h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Most marketing teams waste 60% of their time juggling disconnected tools with minimal results. We've built the solution.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {painPoints.map((point, index) => (
                    <Card key={index} className="bg-[#121218]/90 border-gray-800 overflow-hidden hover:border-[#ff0aff]/30 transition-all duration-300">
                      <CardHeader>
                        <div className="mb-4">
                          {point.icon}
                        </div>
                        <CardTitle>{point.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 mb-6">{point.description}</p>
                        <div className="flex items-start gap-2">
                          <div className="bg-[#14ffc8]/20 rounded-full p-1 mt-0.5">
                            <ArrowRight className="w-4 h-4 text-[#14ffc8]" />
                          </div>
                          <p className="text-[#14ffc8]">{point.solution}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Solution Section */}
          <section className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                    The <span className="text-[#14ffc8]">Solution</span>
                  </h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    One platform that combines everything you need to 10x your marketing ROI
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* AI Caption Generator */}
                  <div className="bg-[#121218]/70 p-8 rounded-lg border border-gray-800 hover:border-[#14ffc8]/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6">
                      <BrainCircuit className="w-7 h-7 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">AI Caption Generator</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Generate platform-specific captions in seconds, not hours. Our AI understands the unique requirements of each social platform and optimizes content accordingly.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                        <span>Platform-specific formatting (hashtags, emojis, length)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                        <span>Adjustable tone to match your brand voice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                        <span>Optimized for engagement and conversion</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Seamless Scheduling */}
                  <div className="bg-[#121218]/70 p-8 rounded-lg border border-gray-800 hover:border-[#ff0aff]/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6">
                      <Calendar className="w-7 h-7 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Seamless Scheduling</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Schedule posts across all major platforms from a single dashboard. Preview, edit, and optimize your content calendar with our intuitive interface.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#ff0aff] shrink-0 mt-0.5" />
                        <span>Multi-platform publishing (Facebook, LinkedIn, YouTube)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#ff0aff] shrink-0 mt-0.5" />
                        <span>Visual calendar with drag-and-drop functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#ff0aff] shrink-0 mt-0.5" />
                        <span>Optimal posting time recommendations</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Integrated CRM */}
                  <div className="bg-[#121218]/70 p-8 rounded-lg border border-gray-800 hover:border-[#ff0aff]/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6">
                      <Users className="w-7 h-7 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Integrated CRM</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Turn social engagement into qualified leads. Our built-in CRM captures, scores, and nurtures leads from all your marketing efforts.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#ff0aff] shrink-0 mt-0.5" />
                        <span>Lead scoring based on engagement and behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#ff0aff] shrink-0 mt-0.5" />
                        <span>Contact and deal tracking with visual pipeline</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#ff0aff] shrink-0 mt-0.5" />
                        <span>Automated follow-up sequences</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Performance Analytics */}
                  <div className="bg-[#121218]/70 p-8 rounded-lg border border-gray-800 hover:border-[#14ffc8]/30 transition-all duration-300 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6">
                      <BarChart4 className="w-7 h-7 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Performance Analytics</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Gain deep insights into what's working and what's not. Our analytics dashboard shows you exactly how to optimize your marketing efforts.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                        <span>Cross-platform performance metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                        <span>Content type effectiveness analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                        <span>ROI tracking and attribution</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  What Our <span className="text-[#14ffc8]">Clients</span> Say
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Join thousands of businesses already using our AI Marketing Suite
                </p>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <Carousel className="w-full">
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card className="bg-[#121218]/70 border border-gray-800">
                            <CardContent className="flex flex-col items-center text-center p-6">
                              <div className="mb-6 mt-4">
                                <div 
                                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                                  style={{ backgroundColor: `${testimonial.avatarColor}20` }}
                                >
                                  <span 
                                    className="text-2xl font-bold"
                                    style={{ color: testimonial.avatarColor }}
                                  >
                                    {testimonial.author.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div className="mb-2 text-4xl text-[#14ffc8]">"</div>
                              <p className="text-lg text-gray-300 mb-6">
                                {testimonial.quote}
                              </p>
                              <div>
                                <p className="font-bold text-white">{testimonial.author}</p>
                                <p className="text-sm text-gray-400">{testimonial.position}, {testimonial.company}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center gap-2 mt-4">
                    <CarouselPrevious className="relative inset-0 translate-y-0 bg-[#121218]/70 border-gray-700 hover:bg-[#121218] hover:border-gray-600" />
                    <CarouselNext className="relative inset-0 translate-y-0 bg-[#121218]/70 border-gray-700 hover:bg-[#121218] hover:border-gray-600" />
                  </div>
                </Carousel>
              </div>
            </div>
          </section>
          
          {/* Comparison Table */}
          <section className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  How We <span className="text-[#ff0aff]">Compare</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  See why businesses choose Fusion Data Co over competitors
                </p>
              </div>
              
              <div className="max-w-5xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="py-4 px-6 text-left text-lg font-medium text-gray-300">Features</th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-[#14ffc8] text-lg font-bold mb-1">Fusion Data Co</div>
                        <div className="text-sm text-gray-400">AI Marketing Suite</div>
                      </th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-white text-lg font-bold mb-1">Hootsuite</div>
                        <div className="text-sm text-gray-400">Enterprise</div>
                      </th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-white text-lg font-bold mb-1">Buffer</div>
                        <div className="text-sm text-gray-400">Business</div>
                      </th>
                      <th className="py-4 px-6 text-center">
                        <div className="text-white text-lg font-bold mb-1">Zapier</div>
                        <div className="text-sm text-gray-400">Professional</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {Object.entries(features).map(([feature, platforms]) => (
                      <tr key={feature} className="hover:bg-[#0c0c14]">
                        <td className="py-4 px-6 text-left font-medium">{feature}</td>
                        <td className="py-4 px-6 text-center">
                          {platforms.fusion ? (
                            <CheckCircle2 className="mx-auto w-6 h-6 text-[#14ffc8]" />
                          ) : (
                            <XCircle className="mx-auto w-6 h-6 text-gray-600" />
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {platforms.hootsuite ? (
                            <CheckCircle2 className="mx-auto w-6 h-6 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto w-6 h-6 text-gray-600" />
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {platforms.buffer ? (
                            <CheckCircle2 className="mx-auto w-6 h-6 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto w-6 h-6 text-gray-600" />
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {platforms.zapier ? (
                            <CheckCircle2 className="mx-auto w-6 h-6 text-green-500" />
                          ) : (
                            <XCircle className="mx-auto w-6 h-6 text-gray-600" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          
          {/* Pricing Section */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Simple, <span className="text-[#14ffc8]">Transparent</span> Pricing
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  All plans include a 14-day free trial with no credit card required
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan) => (
                  <div 
                    key={plan.name}
                    className={`bg-[#121218] rounded-lg overflow-hidden border ${
                      plan.popular 
                        ? "border-[#14ffc8] shadow-[0_0_25px_rgba(20,255,200,0.2)]" 
                        : "border-gray-800"
                    } relative`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 w-full bg-[#14ffc8] text-black text-center py-1 font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-gray-400 ml-2">/month</span>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Sparkles className="w-5 h-5 text-[#14ffc8] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        className={`w-full py-6 ${
                          plan.popular 
                            ? "bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black shadow-[0_0_15px_rgba(20,255,200,0.3)]" 
                            : "bg-[#121218] border border-[#14ffc8] text-[#14ffc8] hover:bg-[#14ffc8]/10"
                        } font-semibold rounded-md`}
                        onClick={() => {
                          setFormState({ ...formState, plan: plan.value });
                          document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Start Free Trial
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Signup Form */}
          <section className="py-20 bg-[#0a0a0d]" id="signup-form">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Left side: Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                    Ready to <span className="text-[#ff0aff]">Transform</span> Your Marketing?
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-8">
                    Join thousands of businesses already using our AI Marketing Suite to:
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#ff0aff]/20 rounded-full p-1 mt-0.5">
                        <Zap className="w-5 h-5 text-[#ff0aff]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Generate AI content that converts</h3>
                        <p className="text-gray-400">Create platform-specific captions in seconds, not hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#ff0aff]/20 rounded-full p-1 mt-0.5">
                        <Zap className="w-5 h-5 text-[#ff0aff]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Streamline your entire workflow</h3>
                        <p className="text-gray-400">Schedule, publish, and analyze from one dashboard</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#ff0aff]/20 rounded-full p-1 mt-0.5">
                        <Zap className="w-5 h-5 text-[#ff0aff]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Convert engagement to real leads</h3>
                        <p className="text-gray-400">Integrated CRM turns followers into customers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-[#14ffc8]/10 p-4 rounded-lg border border-[#14ffc8]/30">
                    <Lock className="w-5 h-5 text-[#14ffc8]" />
                    <p className="text-sm">
                      <span className="font-medium text-[#14ffc8]">14-day free trial.</span> No credit card required. Cancel anytime.
                    </p>
                  </div>
                </div>
                
                {/* Right side: Form */}
                <div className="bg-[#121218] p-8 rounded-xl border border-gray-800 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Get Started Now</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-400 mb-2">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className="bg-[#0a0a0d] border-gray-700"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-400 mb-2">Business Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="bg-[#0a0a0d] border-gray-700"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-gray-400 mb-2">Company Name</Label>
                      <Input 
                        id="company"
                        name="company"
                        placeholder="Enter your company name"
                        className="bg-[#0a0a0d] border-gray-700"
                        value={formState.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-400 mb-2">Phone Number (Optional)</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="bg-[#0a0a0d] border-gray-700"
                        value={formState.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="plan" className="text-sm font-medium text-gray-400 mb-2">Select Plan</Label>
                      <Select
                        value={formState.plan}
                        onValueChange={(value) => setFormState({ ...formState, plan: value })}
                      >
                        <SelectTrigger id="plan" className="bg-[#0a0a0d] border-gray-700">
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121218] border-gray-700">
                          {plans.map((plan) => (
                            <SelectItem key={plan.value} value={plan.value}>
                              {plan.name} (${plan.price}/mo)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full py-6 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-md flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300 mt-6"
                      disabled={loading}
                    >
                      {loading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Start Your 14-Day Free Trial
                          <ArrowRight className="w-5 h-5 ml-1" />
                        </>
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 mt-4">
                      <Lock className="w-4 h-4" />
                      <span>Your data is secure and will never be shared.</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          
          {/* Final CTA */}
          <section className="py-16 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Don't Miss Out on the Future of Marketing Automation
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join thousands of businesses already transforming their marketing with AI
                </p>
                <Button
                  onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="py-5 px-8 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}