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
    { name: "LinkedIn", icon: <Linkedin size={24} />, color: "primary" },
    { name: "Facebook", icon: <Facebook size={24} />, color: "primary" },
    { name: "YouTube", icon: <Youtube size={24} />, color: "primary" }
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
            <div 
              key={index} 
              className="chrome-panel px-5 py-3 rounded-full flex items-center gap-3 border border-border/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-card/80 text-${platform.color}`}>
                {platform.icon}
              </div>
              <span className="text-foreground font-medium">{platform.name}</span>
              <div className="w-2 h-2 rounded-full bg-primary/30 ml-1"></div>
            </div>
          ))}
        </div>
        
        {/* Enterprise Social Media Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {enterpriseFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="enterprise-card p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-card/0 via-card/0 to-card opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-${feature.color}/10 border border-${feature.color}/20 group-hover:border-${feature.color}/40 transition-colors duration-300`}>
                  <div className={`text-${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="font-['Orbitron'] text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
                
                <div className="mt-6 pt-4 border-t border-border/20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-primary">
                    Learn more about this feature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise Dashboard Preview */}
        <div className="chrome-panel rounded-xl overflow-hidden mb-16 shadow-xl relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Background pattern and glow */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-8 md:p-12 flex flex-col justify-center backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-6 h-6">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <h3 className="font-['Orbitron'] text-2xl font-semibold text-foreground">
                  Enterprise <span className="text-gradient-primary">Social Intelligence</span>
                </h3>
              </div>
              
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our enterprise social media platform empowers global teams with advanced governance, comprehensive analytics, and AI-powered insights to drive measurable business impact across all digital channels.
              </p>
              
              <ul className="space-y-4 mb-8">
                {enterpriseBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${0.5 + (index * 0.1)}s` }}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mr-3 shadow-sm">
                      <CheckCircle className="text-primary w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/pricing">
                <span className="btn-titanium px-6 py-3 rounded-md font-medium shadow-md inline-flex items-center justify-center">
                  <span className="flex items-center">
                    View Enterprise Plans
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </div>
            
            <div className="polished-chrome p-8 md:p-12 relative overflow-hidden border-l border-white/10">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 pointer-events-none">
                <Laptop className="w-full h-full text-primary" />
              </div>
              
              <div className="relative z-10 perspective-1000">
                {/* Terminal header */}
                <div className="bg-black/70 rounded-t-lg p-2 border border-border/40 border-b-0 flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono w-full text-center">
                    Enterprise Social Intelligence Hub
                  </div>
                </div>
                
                {/* Dashboard image */}
                <div className="relative transform transition-transform duration-700 hover:rotate-y-5 hover:scale-105 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
                    alt="Enterprise social media dashboard" 
                    className="rounded-b-lg border border-border/40 w-full"
                    loading="lazy"
                  />
                  
                  {/* Dashboard overlay with metrics */}
                  <div className="absolute top-4 right-4 glass-panel p-3 rounded-lg shadow-lg text-sm backdrop-blur-lg bg-card/50 border border-white/10 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                    <div className="flex items-center mb-1 text-accent">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span className="font-mono font-medium">+147% Engagement</span>
                    </div>
                    <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Info cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="glass-panel p-4 rounded-lg shadow-lg border border-white/10 hover-edge-glow transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-medium text-foreground mb-2 flex items-center text-sm">
                      <BarChart3 className="w-4 h-4 mr-2 text-primary" />
                      Executive KPI Dashboard
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Real-time analytics and performance metrics designed for C-suite executives and stakeholders.
                    </p>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-lg shadow-lg border border-white/10 hover-edge-glow transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-medium text-foreground mb-2 flex items-center text-sm">
                      <Wand2 className="w-4 h-4 mr-2 text-accent" />
                      AI-Powered Strategy
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Predictive analytics and AI recommendations for optimal content performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Features */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/10 mb-4 border border-primary/20">
                <span className="text-xs font-medium text-primary">FANG-Level Tools</span>
              </div>
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
                Advanced Enterprise <span className="text-gradient-primary">Capabilities</span>
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-4 mx-auto"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Sophisticated tools designed specifically for enterprise social media management at global scale with uncompromising security and compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="enterprise-card p-6 rounded-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-card/70 border border-white/10 shadow-md">
                        <div className="text-primary">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-['Orbitron'] text-lg font-medium mb-2 text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span className="text-xs text-muted-foreground">Enterprise-ready</span>
                      </div>
                      <a href="#" className="text-xs text-primary font-medium flex items-center hover:underline">
                        Learn more
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enterprise testimonial/callout */}
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="chrome-panel p-8 md:p-10 rounded-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none">
              <Share2 className="w-full h-full text-primary" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-20 pointer-events-none"></div>
            
            {/* Quote mark */}
            <div className="absolute top-6 left-6 text-primary/10 text-8xl font-serif pointer-events-none">
              "
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full -m-1 animate-pulse-glow"></div>
                <div className="flex-shrink-0 w-24 h-24 rounded-full border-2 border-white/10 overflow-hidden shadow-lg bg-card">
                  <img 
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max" 
                    alt="Enterprise CMO" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Company logo overlay */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card p-1 border border-white/10 shadow-lg">
                  <div className="bg-gradient-to-tr from-blue-600 to-blue-800 w-full h-full rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">F500</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="p-1 px-3 rounded-full bg-primary/10 inline-flex items-center mb-4 border border-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-3 h-3 mr-2">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span className="text-xs font-medium text-primary">Enterprise Success Story</span>
                </div>
                
                <div className="glass-panel p-6 rounded-lg shadow-lg mb-4 backdrop-blur-sm">
                  <p className="text-foreground italic leading-relaxed">
                    "Fusion Data Co's enterprise social media platform has transformed how our global team coordinates campaigns across 23 markets. The advanced analytics and AI-powered content suggestions have <span className="text-primary font-medium">increased our engagement by 147%</span> while reducing production time by 40%."
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground flex items-center">
                      Sarah Johnson
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500 ml-2">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </p>
                    <p className="text-sm text-muted-foreground">Chief Marketing Officer, Global Fortune 500</p>
                  </div>
                  
                  <a href="#" className="text-primary text-sm font-medium flex items-center">
                    Read case study
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
