import { Link } from "wouter";
import { 
  Calendar, 
  Wand2, 
  BarChart, 
  CheckCircle, 
  Share2, 
  Lightbulb,
  LineChart, 
  MessageSquare, 
  TrendingUp, 
  Target, 
  Laptop,
  BarChart3,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SocialMedia() {
  const enterpriseFeatures = [
    {
      icon: <Calendar size={28} />,
      title: "Enterprise Content Calendar",
      description: "Coordinate global content strategies with advanced scheduling, approval workflows, and content governance.",
      color: "primary"
    },
    {
      icon: <Wand2 size={28} />,
      title: "AI Content Intelligence",
      description: "Generate enterprise-ready content with AI that adapts to your brand voice, compliance requirements, and industry context.",
      color: "accent"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Executive Analytics Suite",
      description: "Comprehensive ROI metrics, predictive analytics, and executive dashboards with multi-channel attribution modeling.",
      color: "secondary"
    }
  ];

  const advancedFeatures = [
    {
      icon: <Share2 size={24} />,
      title: "Multi-Channel Distribution",
      description: "Seamlessly share content across all enterprise channels with dynamic content transformation for each platform."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Predictive Content Strategy",
      description: "AI-powered recommendations based on historical performance and trend analysis."
    },
    {
      icon: <LineChart size={24} />,
      title: "Competitive Intelligence",
      description: "Track and analyze competitor social activity and benchmark your performance."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Sentiment Analysis",
      description: "Monitor brand perception with advanced NLP to understand customer sentiment."
    },
    {
      icon: <Target size={24} />,
      title: "Advanced Audience Targeting",
      description: "Segment and target content based on demographic, behavioral, and engagement data."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Crisis Management Tools",
      description: "Real-time alerts and automated response systems for reputation management."
    }
  ];

  const enterpriseBenefits = [
    "Global team collaboration with role-based permissions",
    "Compliance-ready content workflows with approval gates",
    "Automated cross-platform content optimization",
    "AI-powered engagement response system",
    "Executive-level reporting with customizable KPIs",
    "Brand safety monitoring and enforcement"
  ];

  const platforms = [
    { name: "LinkedIn", icon: <Linkedin size={24} />, color: "linkedin" },
    { name: "Twitter", icon: <Twitter size={24} />, color: "twitter" },
    { name: "Instagram", icon: <Instagram size={24} />, color: "instagram" },
    { name: "Facebook", icon: <Facebook size={24} />, color: "facebook" },
    { name: "YouTube", icon: <Youtube size={24} />, color: "youtube" }
  ];

  return (
    <section id="social-media" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-20 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-4">
              <Share2 className="text-primary w-5 h-5" />
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
              <span className="text-foreground">Enterprise Social Media</span>{" "}
              <span className="text-primary text-shadow-titanium">Management</span>
            </h2>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Sophisticated social media management solutions built for enterprise teams with global reach, comprehensive governance, and data-driven strategy.
          </p>
        </div>
        
        {/* Platform badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {platforms.map((platform, index) => (
            <div key={index} className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 border border-border/30">
              <div className={`text-${platform.color}`}>
                {platform.icon}
              </div>
              <span className="text-foreground font-medium">{platform.name}</span>
            </div>
          ))}
        </div>
        
        {/* Enterprise Social Media Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {enterpriseFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="titanium-panel rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-${feature.color}/10 border border-${feature.color}/20`}>
                <div className={`text-${feature.color}`}>
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="font-['Orbitron'] text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Enterprise Dashboard Preview */}
        <div className="titanium-panel rounded-xl overflow-hidden mb-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-foreground">
                Enterprise-Grade <span className="text-primary text-shadow-titanium">Social Intelligence</span>
              </h3>
              
              <p className="text-muted-foreground mb-8">
                Our enterprise social media platform empowers global teams with advanced governance, comprehensive analytics, and AI-powered insights to drive measurable business impact across all digital channels.
              </p>
              
              <ul className="space-y-4 mb-8">
                {enterpriseBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <CheckCircle className="text-primary w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/pricing">
                <span className={cn(
                  "px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-md",
                  "hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center",
                  "relative overflow-hidden group"
                )}>
                  <span className="relative z-10 flex items-center">
                    View Enterprise Plans
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </span>
              </Link>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border-l border-border/30 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5">
                <Laptop className="w-full h-full text-primary" />
              </div>
              
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
                  alt="Enterprise social media dashboard" 
                  className="rounded-lg shadow-lg border border-border/40 w-full transition-all duration-500 hover:shadow-xl" 
                />
                
                <div className="mt-6 glass-panel p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Executive KPI Dashboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time analytics and performance metrics designed for C-suite executives and stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Features */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
              Advanced Enterprise Capabilities
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for enterprise social media management at scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="glass-panel p-6 rounded-lg hover-edge-glow transition-all duration-300">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10 border border-primary/20">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-['Orbitron'] text-lg font-medium mb-2 text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enterprise testimonial/callout */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-8 rounded-xl border border-border/30 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 opacity-5">
              <Share2 className="w-full h-full text-primary" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-24 h-24 rounded-full border-4 border-background overflow-hidden">
                <img 
                  src="https://via.placeholder.com/150x150?text=CMO" 
                  alt="Enterprise CMO" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div>
                <p className="text-muted-foreground italic mb-4">
                  "Fusion Data Co's enterprise social media platform has transformed how our global team coordinates campaigns across 23 markets. The advanced analytics and AI-powered content suggestions have increased our engagement by 147% while reducing production time by 40%."
                </p>
                <div>
                  <p className="font-medium text-foreground">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Chief Marketing Officer, Fortune 500 Enterprise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
