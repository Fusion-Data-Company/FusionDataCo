import { Link } from "wouter";
import { 
  Target, 
  Wand2, 
  BarChart, 
  CheckCircle, 
  TrendingUp, 
  Lightbulb,
  LineChart, 
  MessageSquare, 
  Filter, 
  Users, 
  Laptop,
  BarChart3,
  DollarSign,
  Clock,
  ArrowRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Funnels() {
  const enterpriseFeatures = [
    {
      icon: <Target size={28} />,
      title: "Color-Coded Pipeline Stages",
      description: "Visual sales process with clear progression through qualification, discovery, proposal, and closing phases.",
      color: "primary"
    },
    {
      icon: <Wand2 size={28} />,
      title: "Smart Qualification System",
      description: "Advanced questioning frameworks and qualification techniques that identify ready-to-buy prospects automatically.",
      color: "accent"
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Revenue Forecasting Engine",
      description: "Predictive analytics with deal scoring, probability assessments, and accurate revenue projections for strategic planning.",
      color: "secondary"
    }
  ];

  const advancedFeatures = [
    {
      icon: <Filter size={24} />,
      title: "Advanced Lead Scoring",
      description: "Automatically qualify prospects based on engagement, behavior, and demographic criteria."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Intelligent Follow-Up Sequences",
      description: "AI-powered nurture campaigns that adapt based on prospect responses and behaviors."
    },
    {
      icon: <LineChart size={24} />,
      title: "Conversion Analytics",
      description: "Track and optimize every stage of your funnel with detailed conversion metrics."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Automated Communications",
      description: "Smart email and SMS sequences that move prospects through your sales process."
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration Tools",
      description: "Assign leads, track activities, and manage your entire sales team's performance."
    },
    {
      icon: <Clock size={24} />,
      title: "Real-Time Notifications",
      description: "Instant alerts for hot leads, follow-up reminders, and critical sales activities."
    }
  ];

  const enterpriseBenefits = [
    "Color-coded visual pipeline for instant status recognition",
    "Systematic qualification process that filters quality prospects",
    "Automated nurture sequences that maintain engagement",
    "Revenue forecasting with 95% accuracy rates",
    "Team performance tracking with individual KPIs",
    "Integration with existing CRM and marketing tools"
  ];

  const stages = [
    { name: "Prospect", color: "red", stage: "Initial Contact" },
    { name: "Qualify", color: "yellow", stage: "Discovery & Needs" },
    { name: "Propose", color: "green", stage: "Solution Presentation" },
    { name: "Close", color: "blue", stage: "Decision & Onboarding" }
  ];

  return (
    <section id="funnels" className="py-24 bg-background relative overflow-hidden">
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
              <Target className="text-primary w-5 h-5" />
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
              <span className="text-foreground">Strategic Sales Funnels</span>{" "}
              <span className="text-primary text-shadow-titanium">That Actually Close</span>
            </h2>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Stop losing qualified prospects in your sales process. Our proven systematic methodology creates color-coded, conversion-optimized funnel systems that drive consistent revenue growth.
          </p>
        </div>
        
        {/* Pipeline Stage badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {stages.map((stage, index) => (
            <div 
              key={index} 
              className="chrome-panel px-5 py-3 rounded-full flex items-center gap-3 border border-border/30 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-card/80`}>
                <div className={`w-4 h-4 rounded-full bg-${stage.color}-500`}></div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-medium text-sm">{stage.name}</span>
                <span className="text-xs text-muted-foreground">{stage.stage}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise Sales Funnel Features */}
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
                    <path d="M3 3v5h5" />
                    <path d="M6 17a9 9 0 0 1 0-10l3.5 3.5" />
                    <path d="M15 6.5l3.5-3.5L21 6v5h-5" />
                    <path d="M18 14a9 9 0 0 1-3.5 7L12 18.5 9.5 21a9 9 0 0 1-3.5-7" />
                  </svg>
                </div>
                <h3 className="font-['Orbitron'] text-2xl font-semibold text-foreground">
                  Enterprise <span className="text-gradient-primary">Funnel Intelligence</span>
                </h3>
              </div>
              
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our enterprise sales funnel platform empowers teams with systematic qualification processes, predictive analytics, and automated nurture sequences to drive consistent revenue growth and pipeline optimization.
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
                    View Funnel Plans
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
                    Enterprise Sales Funnel Hub
                  </div>
                </div>
                
                {/* Dashboard image */}
                <div className="relative transform transition-transform duration-700 hover:rotate-y-5 hover:scale-105 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
                    alt="Enterprise sales funnel dashboard" 
                    className="rounded-b-lg border border-border/40 w-full" 
                  />
                  
                  {/* Dashboard overlay with metrics */}
                  <div className="absolute top-4 right-4 glass-panel p-3 rounded-lg shadow-lg text-sm backdrop-blur-lg bg-card/50 border border-white/10 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                    <div className="flex items-center mb-1 text-accent">
                      <DollarSign className="w-3 h-3 mr-1" />
                      <span className="font-mono font-medium">+284% Revenue</span>
                    </div>
                    <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Info cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="glass-panel p-4 rounded-lg shadow-lg border border-white/10 hover-edge-glow transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-medium text-foreground mb-2 flex items-center text-sm">
                      <Target className="w-4 h-4 mr-2 text-primary" />
                      Pipeline Analytics
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Real-time conversion tracking and revenue forecasting with 95% accuracy.
                    </p>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-lg shadow-lg border border-white/10 hover-edge-glow transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-medium text-foreground mb-2 flex items-center text-sm">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      Smart Automation
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Intelligent lead qualification and automated follow-up sequences.
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
                <span className="text-xs font-medium text-primary">Proven Methodology</span>
              </div>
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
                Advanced Sales <span className="text-gradient-primary">Capabilities</span>
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-4 mx-auto"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Sophisticated tools designed specifically for enterprise sales teams that need systematic processes, predictable results, and scalable growth.
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
              <Target className="w-full h-full text-primary" />
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
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max" 
                    alt="Enterprise Sales Director" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Company logo overlay */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-card p-1 border border-white/10 shadow-lg">
                  <div className="bg-gradient-to-tr from-green-600 to-green-800 w-full h-full rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">B2B</span>
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
                    "Fusion Data Co's systematic sales funnel approach completely transformed our B2B sales process. The color-coded pipeline and qualification system helped us <span className="text-primary font-medium">increase our closing rate by 284%</span> while reducing our sales cycle from 6 months to 8 weeks."
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground flex items-center">
                      Michael Rodriguez
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500 ml-2">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </p>
                    <p className="text-sm text-muted-foreground">VP of Sales, Enterprise Software Company</p>
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