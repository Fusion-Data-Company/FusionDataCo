import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Sparkles, 
  Rocket, 
  Star, 
  Lock, 
  Check 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  plan: z.string().min(1, "Please select a plan"),
});

type FormValues = z.infer<typeof formSchema>;

export default function MarketingSuite() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      plan: "Pro"
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);
      
      // In a real app, this would send to a sales funnel API endpoint
      // For the prototype, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in CRM as a lead with "AI Suite Funnel" tag
      const response = await apiRequest("/api/crm/contacts", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone || "",
          notes: data.message || "",
          tags: ["AI Suite Funnel"],
          source: "AI Marketing Suite Page",
          status: "Lead"
        }),
      });
      
      setSubmitted(true);
      
      toast({
        title: "Form submitted successfully!",
        description: "We'll be in touch with you shortly to discuss your AI Marketing Suite.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Compare features data
  const comparisonData = {
    features: [
      { name: "AI Caption Generation", category: "Content" },
      { name: "Multi-Platform Scheduling", category: "Content" },
      { name: "Content Performance Analytics", category: "Analytics" },
      { name: "Lead Capture Forms", category: "Lead Generation" },
      { name: "CRM Integration", category: "Automation" },
      { name: "Email Marketing Automation", category: "Automation" },
      { name: "Custom Audience Segmentation", category: "Advanced" },
      { name: "Workflow Builder", category: "Advanced" },
      { name: "White-Label Capability", category: "Advanced" },
      { name: "API Access", category: "Advanced" },
    ],
    products: [
      {
        name: "Fusion Data Co",
        features: {
          "AI Caption Generation": true,
          "Multi-Platform Scheduling": true,
          "Content Performance Analytics": true,
          "Lead Capture Forms": true,
          "CRM Integration": true,
          "Email Marketing Automation": true,
          "Custom Audience Segmentation": true,
          "Workflow Builder": true,
          "White-Label Capability": true,
          "API Access": true
        }
      },
      {
        name: "Hootsuite",
        features: {
          "AI Caption Generation": false,
          "Multi-Platform Scheduling": true,
          "Content Performance Analytics": true,
          "Lead Capture Forms": false,
          "CRM Integration": "Limited",
          "Email Marketing Automation": false,
          "Custom Audience Segmentation": "Limited",
          "Workflow Builder": false,
          "White-Label Capability": "Premium",
          "API Access": "Premium"
        }
      },
      {
        name: "Buffer",
        features: {
          "AI Caption Generation": false,
          "Multi-Platform Scheduling": true,
          "Content Performance Analytics": true,
          "Lead Capture Forms": false,
          "CRM Integration": false,
          "Email Marketing Automation": false,
          "Custom Audience Segmentation": false,
          "Workflow Builder": false,
          "White-Label Capability": false,
          "API Access": "Limited"
        }
      },
      {
        name: "Zapier",
        features: {
          "AI Caption Generation": false,
          "Multi-Platform Scheduling": "Via Integrations",
          "Content Performance Analytics": false,
          "Lead Capture Forms": "Via Integrations",
          "CRM Integration": "Via Integrations",
          "Email Marketing Automation": "Via Integrations",
          "Custom Audience Segmentation": false,
          "Workflow Builder": true,
          "White-Label Capability": false,
          "API Access": true
        }
      }
    ]
  };

  // Testimonial data
  const testimonials = [
    {
      name: "Jennifer Martinez",
      title: "Marketing Director",
      company: "GrowthTech Solutions",
      image: "gradient-1",
      quote: "We've increased our social media engagement by 380% and reduced content creation time by 65% since implementing the AI Marketing Suite. The ROI has been tremendous.",
      stars: 5
    },
    {
      name: "David Chen",
      title: "CEO",
      company: "Horizon Retail",
      image: "gradient-2",
      quote: "The automated workflows have transformed our marketing operations. What used to take our team a full week now happens automatically in the background while we focus on strategy.",
      stars: 5
    },
    {
      name: "Samantha Williams",
      title: "Digital Marketing Manager",
      company: "Elite Properties",
      image: "gradient-3",
      quote: "As a real estate marketing team, we needed something that could scale content across multiple properties. The AI Marketing Suite has been a game-changer for our listing promotions.",
      stars: 5
    }
  ];

  // Pricing data
  const pricingData = [
    {
      id: "Basic",
      name: "Basic",
      price: 79,
      yearlyPrice: 790,
      description: "Perfect for solopreneurs and small businesses just getting started with marketing automation.",
      features: [
        "AI Content Generation (100/mo)",
        "Social Media Scheduling",
        "Basic Analytics Dashboard",
        "Email Marketing Integration",
        "1 User Account",
        "Standard Support"
      ],
      color: "border-gray-600",
      highlightColor: "text-gray-400",
      buttonVariant: "outline"
    },
    {
      id: "Pro",
      name: "Pro",
      price: 149,
      yearlyPrice: 1490,
      description: "Best for growing businesses that need advanced marketing automation capabilities.",
      features: [
        "AI Content Generation (500/mo)",
        "Advanced Social Analytics",
        "Multi-Channel Campaigns",
        "Automated Workflows",
        "CRM Integration",
        "5 User Accounts",
        "Priority Support"
      ],
      color: "border-[#14ffc8]",
      highlightColor: "text-[#14ffc8]",
      buttonVariant: "default",
      most_popular: true
    },
    {
      id: "Enterprise",
      name: "Enterprise",
      price: 299,
      yearlyPrice: 2990,
      description: "For large organizations that need comprehensive marketing automation solutions.",
      features: [
        "Unlimited AI Content Generation",
        "Custom Audience Segmentation",
        "Advanced Workflow Builder",
        "White-Label Capability",
        "API Access",
        "Unlimited User Accounts",
        "Dedicated Account Manager"
      ],
      color: "border-[#ff0aff]",
      highlightColor: "text-[#ff0aff]",
      buttonVariant: "outline"
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Marketing Suite | Fusion Data Co</title>
        <meta
          name="description"
          content="Transform your marketing with our all-in-one AI Marketing Suite. Generate content, automate workflows, and track performance across all channels."
        />
        <meta property="og:title" content="The Ultimate AI Marketing Suite | Fusion Data Co" />
        <meta
          property="og:description"
          content="The complete AI-powered marketing platform for businesses that want to win. Automate your marketing and grow faster."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#140850] via-[#0a0a0d] to-[#0a0a0d] opacity-70"></div>
            
            {/* Animated circuit pattern */}
            <div className="absolute inset-0">
              <svg className="w-full h-full opacity-20" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14ffc8" />
                    <stop offset="100%" stopColor="#ff0aff" />
                  </linearGradient>
                </defs>
                <g stroke="url(#grad1)" fill="none" strokeWidth="1">
                  <path d="M50,250 L200,150 L350,250 L500,150 L650,250 L800,150" />
                  <path d="M50,350 L200,250 L350,350 L500,250 L650,350 L800,250" />
                  <path d="M50,450 L200,350 L350,450 L500,350 L650,450 L800,350" />
                  <path d="M50,550 L200,450 L350,550 L500,450 L650,550 L800,450" />
                  <path d="M50,650 L200,550 L350,650 L500,550 L650,650 L800,550" />
                  
                  <path d="M150,50 L150,200 L250,350 L150,500 L250,650 L150,800" />
                  <path d="M250,50 L250,200 L350,350 L250,500 L350,650 L250,800" />
                  <path d="M350,50 L350,200 L450,350 L350,500 L450,650 L350,800" />
                  <path d="M450,50 L450,200 L550,350 L450,500 L550,650 L450,800" />
                  <path d="M550,50 L550,200 L650,350 L550,500 L650,650 L550,800" />
                  <path d="M650,50 L650,200 L750,350 L650,500 L750,650 L650,800" />
                  
                  <circle cx="150" cy="150" r="5" fill="#14ffc8" />
                  <circle cx="250" cy="250" r="5" fill="#ff0aff" />
                  <circle cx="350" cy="350" r="5" fill="#14ffc8" />
                  <circle cx="450" cy="450" r="5" fill="#ff0aff" />
                  <circle cx="550" cy="550" r="5" fill="#14ffc8" />
                  <circle cx="650" cy="650" r="5" fill="#ff0aff" />
                </g>
              </svg>
            </div>

            <div className="container relative z-10 mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h1 
                  className="font-['Orbitron'] text-4xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#14ffc8] to-[#ff0aff]">
                    The Ultimate AI Marketing Suite
                  </span>
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl text-gray-300 mb-8"
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
                  <p className="text-lg md:text-xl text-gray-400">
                    Our comprehensive AI-powered marketing platform combines content creation, 
                    multi-channel scheduling, advanced analytics, and automation workflows to 
                    help you generate more leads, save time, and grow your business.
                  </p>
                </motion.div>
                
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold px-8 py-6 text-lg shadow-[0_0_15px_rgba(20,255,200,0.5)] hover:shadow-[0_0_25px_rgba(20,255,200,0.7)] transition-all duration-300"
                    onClick={() => {
                      const element = document.getElementById('pricing');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-[#ff0aff] text-[#ff0aff] hover:bg-[#ff0aff]/10 px-8 py-6 text-lg"
                    onClick={() => {
                      const element = document.getElementById('features');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    See Features
                  </Button>
                </motion.div>
                
                <motion.div
                  className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-[#14ffc8] mr-2" />
                    <span>14-Day Free Trial</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-[#14ffc8] mr-2" />
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-[#14ffc8] mr-2" />
                    <span>Cancel Anytime</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Pain Points Section */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Marketing Challenges <span className="text-[#ff0aff]">Solved</span>
                </h2>
                <p className="text-lg text-gray-400">
                  Are you tired of these common marketing frustrations? Our AI Marketing Suite eliminates these pain points once and for all.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pain Point 1 */}
                <Card className="bg-[#0a0a0d] border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#14ffc8]/40 hover:shadow-[0_0_15px_rgba(20,255,200,0.1)]">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Time-Consuming Content Creation</h3>
                    <p className="text-gray-400">
                      Spending hours crafting the perfect social media posts, emails, and ad copy only to see mediocre results?
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">
                          <ArrowRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Our AI content generator creates high-converting content in seconds, with your brand voice and audience in mind.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Pain Point 2 */}
                <Card className="bg-[#0a0a0d] border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#14ffc8]/40 hover:shadow-[0_0_15px_rgba(20,255,200,0.1)]">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-4">
                      <Shuffle className="h-6 w-6 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Disconnected Marketing Tools</h3>
                    <p className="text-gray-400">
                      Jumping between multiple platforms for social media, email, analytics, and CRM, causing chaos and missed opportunities?
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">
                          <ArrowRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Our all-in-one platform consolidates your entire marketing tech stack into a single, powerful solution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Pain Point 3 */}
                <Card className="bg-[#0a0a0d] border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#14ffc8]/40 hover:shadow-[0_0_15px_rgba(20,255,200,0.1)]">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-4">
                      <TrendingDown className="h-6 w-6 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Poor ROI on Marketing Efforts</h3>
                    <p className="text-gray-400">
                      Investing substantial time and money into marketing campaigns that fail to generate quality leads and conversions?
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex items-start gap-2">
                        <div className="mt-1">
                          <ArrowRight className="h-4 w-4 text-[#14ffc8]" />
                        </div>
                        <p className="text-gray-300">
                          Our advanced analytics and AI-driven insights help you optimize every aspect of your campaigns for maximum results.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section id="features" className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Powerful <span className="text-[#14ffc8]">Features</span>
                </h2>
                <p className="text-lg text-gray-400">
                  Everything you need to create, schedule, automate, and analyze your marketing campaigns in one place.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#14ffc8]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(20,255,200,0.2)] group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6 group-hover:bg-[#14ffc8]/20 transition-all duration-300">
                      <Sparkles className="w-7 h-7 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#14ffc8] transition-colors duration-300">AI Content Generation</h3>
                    <p className="text-gray-400 mb-4">Create engaging, platform-specific content with a single click. Our AI adapts to your brand voice and audience.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Multi-platform content optimization</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Customizable tone and style</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Keyword and hashtag optimization</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Feature 2 */}
                <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#ff0aff]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(255,10,255,0.2)] group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff0aff]/20 transition-all duration-300">
                      <Calendar className="w-7 h-7 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff0aff] transition-colors duration-300">Multi-Channel Scheduling</h3>
                    <p className="text-gray-400 mb-4">Schedule content across all major platforms from a single dashboard with optimal posting time recommendations.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Visual content calendar</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Batch scheduling capability</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>AI-powered optimal time suggestions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Feature 3 */}
                <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#14ffc8]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(20,255,200,0.2)] group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6 group-hover:bg-[#14ffc8]/20 transition-all duration-300">
                      <BarChart3 className="w-7 h-7 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#14ffc8] transition-colors duration-300">Advanced Analytics</h3>
                    <p className="text-gray-400 mb-4">Track performance metrics across all channels with actionable insights to continuously improve your marketing.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Unified cross-channel dashboard</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Customizable reporting</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>AI-driven performance insights</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Feature 4 */}
                <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#ff0aff]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(255,10,255,0.2)] group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff0aff]/20 transition-all duration-300">
                      <MessageSquare className="w-7 h-7 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff0aff] transition-colors duration-300">Lead Generation Tools</h3>
                    <p className="text-gray-400 mb-4">Capture and nurture leads with AI-powered forms, landing pages, and automated follow-up sequences.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Smart lead capture forms</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Conditional logic flows</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Direct CRM integration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Feature 5 */}
                <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#14ffc8]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(20,255,200,0.2)] group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#14ffc8]/10 flex items-center justify-center mb-6 group-hover:bg-[#14ffc8]/20 transition-all duration-300">
                      <Zap className="w-7 h-7 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#14ffc8] transition-colors duration-300">Marketing Automation</h3>
                    <p className="text-gray-400 mb-4">Create powerful workflows that automate repetitive tasks and deliver personalized experiences at scale.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Visual workflow builder</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Trigger-based automations</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#14ffc8]"></div>
                        <span>Audience segmentation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Feature 6 */}
                <Card className="bg-[#121218]/90 border border-[#2c2c3a] hover:border-[#ff0aff]/40 rounded-lg overflow-hidden transition-all duration-500 h-full hover:shadow-[0_0_15px_rgba(255,10,255,0.2)] group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-[#ff0aff]/10 flex items-center justify-center mb-6 group-hover:bg-[#ff0aff]/20 transition-all duration-300">
                      <Rocket className="w-7 h-7 text-[#ff0aff]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#ff0aff] transition-colors duration-300">CRM Integration</h3>
                    <p className="text-gray-400 mb-4">Seamlessly connect your marketing efforts with your customer relationship management for end-to-end visibility.</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Built-in CRM capabilities</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Lead scoring & routing</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff0aff]"></div>
                        <span>Customer journey mapping</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Comparison Table */}
          <section className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Why Choose <span className="text-[#14ffc8]">Fusion</span>?
                </h2>
                <p className="text-lg text-gray-400">
                  See how our comprehensive AI Marketing Suite compares to other popular solutions on the market.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 text-left border-b border-gray-800">Feature</th>
                      {comparisonData.products.map((product, index) => (
                        <th key={index} className="p-4 text-center border-b border-gray-800">
                          <div className="font-bold text-lg">{product.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.features.map((feature, featureIndex) => (
                      <tr 
                        key={featureIndex}
                        className={featureIndex % 2 === 0 ? 'bg-[#0a0a0d]' : ''}
                      >
                        <td className="p-4 border-b border-gray-800">
                          <div className="flex items-center gap-2">
                            {feature.category === "Advanced" && (
                              <Star className="h-4 w-4 text-[#ff0aff]" />
                            )}
                            <span>{feature.name}</span>
                          </div>
                        </td>
                        {comparisonData.products.map((product, productIndex) => {
                          const value = product.features[feature.name];
                          return (
                            <td key={productIndex} className="p-4 text-center border-b border-gray-800">
                              {value === true ? (
                                <Check className="h-5 w-5 text-[#14ffc8] mx-auto" />
                              ) : value === false ? (
                                <span className="text-gray-500">—</span>
                              ) : value === "Limited" ? (
                                <span className="text-yellow-500">Limited</span>
                              ) : value === "Premium" ? (
                                <span className="text-amber-500">Premium Only</span>
                              ) : (
                                <span className="text-gray-400">{value}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          
          {/* Testimonials */}
          <section className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Success <span className="text-[#ff0aff]">Stories</span>
                </h2>
                <p className="text-lg text-gray-400">
                  Discover how businesses like yours are transforming their marketing with our AI-powered platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className="bg-gradient-to-br from-[#121218] to-[#1a1a24] border border-gray-800 rounded-lg overflow-hidden shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div className="text-[#ff0aff] text-xl">
                          {"★".repeat(testimonial.stars)}
                          {"☆".repeat(5 - testimonial.stars)}
                        </div>
                      </div>
                      
                      <blockquote className="text-gray-300 italic mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div 
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                            index === 0 ? "from-blue-500 to-purple-600" :
                            index === 1 ? "from-green-500 to-emerald-600" :
                            "from-amber-500 to-orange-600"
                          } mr-4`}
                        ></div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-gray-400">
                            {testimonial.title}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-[#0c0c14]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  Simple, Transparent <span className="text-[#14ffc8]">Pricing</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Choose the plan that's right for your business. All plans include a 14-day free trial.
                </p>
                
                <div className="inline-flex items-center bg-[#1a1a24] p-1 rounded-lg mb-8">
                  <Tabs defaultValue="monthly" className="w-full max-w-xs mx-auto">
                    <TabsList className="grid w-full grid-cols-2 bg-transparent">
                      <TabsTrigger 
                        value="monthly"
                        className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black data-[state=active]:shadow"
                      >
                        Monthly
                      </TabsTrigger>
                      <TabsTrigger 
                        value="yearly"
                        className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black data-[state=active]:shadow"
                      >
                        Yearly (20% off)
                      </TabsTrigger>
                    </TabsList>
                  
                    <TabsContent value="monthly">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {pricingData.map((plan, index) => (
                          <Card 
                            key={index}
                            className={`relative bg-[#0a0a0d] border-2 ${plan.color} rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,255,200,0.15)]`}
                          >
                            {plan.most_popular && (
                              <div className="absolute top-0 right-0 bg-[#14ffc8] text-black px-4 py-1 text-sm font-medium">
                                Most Popular
                              </div>
                            )}
                            <CardHeader className="pb-0">
                              <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="mb-6">
                                <div className="flex items-baseline">
                                  <span className="text-4xl font-bold">${plan.price}</span>
                                  <span className="text-gray-400 ml-1">/month</span>
                                </div>
                              </div>
                              
                              <div className="space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-2">
                                    <CheckCircle2 className={`h-5 w-5 ${plan.highlightColor}`} />
                                    <span className="text-gray-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <Button 
                                variant={plan.buttonVariant as any}
                                className={`w-full py-6 ${
                                  plan.buttonVariant === "default" 
                                    ? "bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black shadow-[0_0_15px_rgba(20,255,200,0.3)]" 
                                    : `border-${plan.highlightColor} ${plan.highlightColor}`
                                }`}
                                onClick={() => {
                                  form.setValue("plan", plan.id);
                                  const element = document.getElementById('contact-form');
                                  element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                              >
                                Start Free Trial
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="yearly">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {pricingData.map((plan, index) => (
                          <Card 
                            key={index}
                            className={`relative bg-[#0a0a0d] border-2 ${plan.color} rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,255,200,0.15)]`}
                          >
                            {plan.most_popular && (
                              <div className="absolute top-0 right-0 bg-[#14ffc8] text-black px-4 py-1 text-sm font-medium">
                                Most Popular
                              </div>
                            )}
                            <CardHeader className="pb-0">
                              <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="mb-6">
                                <div className="flex items-baseline">
                                  <span className="text-4xl font-bold">${Math.round(plan.yearlyPrice / 12)}</span>
                                  <span className="text-gray-400 ml-1">/month</span>
                                </div>
                                <div className="text-sm text-[#14ffc8] mt-1">
                                  ${plan.yearlyPrice} billed yearly (20% off)
                                </div>
                              </div>
                              
                              <div className="space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-2">
                                    <CheckCircle2 className={`h-5 w-5 ${plan.highlightColor}`} />
                                    <span className="text-gray-300">{feature}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <Button 
                                variant={plan.buttonVariant as any} 
                                className={`w-full py-6 ${
                                  plan.buttonVariant === "default" 
                                    ? "bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black shadow-[0_0_15px_rgba(20,255,200,0.3)]" 
                                    : `border-${plan.highlightColor} ${plan.highlightColor}`
                                }`}
                                onClick={() => {
                                  form.setValue("plan", plan.id);
                                  const element = document.getElementById('contact-form');
                                  element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                              >
                                Start Free Trial
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact Form Section */}
          <section id="contact-form" className="py-20 bg-[#0a0a0d]">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left side - Content */}
                  <div>
                    <h2 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                      Ready to <span className="text-[#ff0aff]">Transform</span> Your Marketing?
                    </h2>
                    <p className="text-lg text-gray-400 mb-8">
                      Fill out the form and one of our marketing automation experts will get in touch to help you get started.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <CheckCircle2 className="h-6 w-6 text-[#14ffc8]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">14-Day Free Trial</h3>
                          <p className="text-gray-400">
                            Try all features with no restrictions for 14 days. No credit card required.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <CheckCircle2 className="h-6 w-6 text-[#14ffc8]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Dedicated Onboarding</h3>
                          <p className="text-gray-400">
                            Get personalized onboarding support to ensure you're set up for success.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <CheckCircle2 className="h-6 w-6 text-[#14ffc8]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Money-Back Guarantee</h3>
                          <p className="text-gray-400">
                            If you're not completely satisfied within 30 days, we'll refund your payment.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-[#121218] rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Lock className="h-5 w-5 text-[#14ffc8]" />
                        <h3 className="font-bold">Enterprise Solutions</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Need a custom solution for your large organization? Our enterprise plan includes custom features, dedicated support, and tailored onboarding.
                      </p>
                      <a 
                        href="mailto:enterprise@fusiondataco.com" 
                        className="text-[#ff0aff] text-sm flex items-center hover:underline"
                      >
                        Contact our enterprise team
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Right side - Form */}
                  <div>
                    <Card className="bg-[#121218]/90 border border-gray-800 overflow-hidden shadow-[0_0_40px_rgba(20,255,200,0.1)]">
                      <CardContent className="p-6 md:p-8">
                        {!submitted ? (
                          <>
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold mb-2">
                                Get Started with AI Marketing Suite
                              </h2>
                              <p className="text-gray-400">
                                Fill out the form below to begin your 14-day free trial.
                              </p>
                            </div>

                            <Form {...form}>
                              <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                              >
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Your name"
                                          {...field}
                                          className="bg-[#0c0c14] border-gray-700"
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
                                      <FormLabel>Business Email</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="email"
                                          placeholder="you@company.com"
                                          {...field}
                                          className="bg-[#0c0c14] border-gray-700"
                                        />
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
                                        <Input
                                          placeholder="Your company"
                                          {...field}
                                          className="bg-[#0c0c14] border-gray-700"
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
                                      <FormLabel>Phone Number (Optional)</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="tel"
                                          placeholder="Your phone number"
                                          {...field}
                                          className="bg-[#0c0c14] border-gray-700"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="plan"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Selected Plan</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="bg-[#0c0c14] border-gray-700">
                                            <SelectValue placeholder="Select a plan" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#121218] border-gray-700">
                                          {pricingData.map((plan) => (
                                            <SelectItem
                                              key={plan.id}
                                              value={plan.id}
                                            >
                                              {plan.name} - ${plan.price}/month
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="message"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Additional Information (Optional)</FormLabel>
                                      <FormControl>
                                        <Textarea
                                          placeholder="Tell us about your specific needs or questions"
                                          className="bg-[#0c0c14] border-gray-700 min-h-[100px]"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="pt-2">
                                  <Button
                                    type="submit"
                                    className="w-full py-6 bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold rounded-md text-lg shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                                    disabled={submitting}
                                  >
                                    {submitting ? (
                                      "Processing..."
                                    ) : (
                                      <>
                                        Start Your Free Trial
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                      </>
                                    )}
                                  </Button>
                                </div>

                                <p className="text-center text-xs text-gray-500 mt-4">
                                  By signing up, you agree to our <a href="#" className="text-[#14ffc8] hover:underline">Terms of Service</a> and <a href="#" className="text-[#14ffc8] hover:underline">Privacy Policy</a>.
                                </p>
                              </form>
                            </Form>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-[#14ffc8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                              <CheckCircle2 className="h-8 w-8 text-[#14ffc8]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">
                              Thank You for Your Interest!
                            </h2>
                            <p className="text-gray-400 mb-6">
                              We've received your information and will be in touch shortly to help you get started with your free trial.
                            </p>
                            <Button
                              className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-semibold px-6 py-3 rounded-md shadow-[0_0_15px_rgba(20,255,200,0.3)] hover:shadow-[0_0_20px_rgba(20,255,200,0.5)] transition-all duration-300"
                              onClick={() => window.location.href = "/"}
                            >
                              Return to Homepage
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
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
}