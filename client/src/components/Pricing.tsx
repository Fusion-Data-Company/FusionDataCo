import { useState } from "react";
import { Link } from "wouter";
import { Check, Zap, ShieldCheck, Users, Gauge, BadgeCheck, Award, BarChart3, Workflow, Database, Lock, Bot, ArrowRight, Sparkles, CheckCircle2, Globe } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { TitaniumCard } from "@/components/ui/TitaniumCard";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  
  const plans = [
    {
      name: "Professional",
      description: "Enhanced tools for growing teams",
      priceMonthly: 249,
      priceYearly: 199,
      color: "primary",
      tier: "tier1",
      features: [
        "Enterprise CRM (up to 10,000 contacts)",
        "Advanced workflow automation",
        "AI insights dashboard",
        "10 team members",
        "Marketing analytics",
        "24/7 priority support",
        "99.9% uptime SLA"
      ]
    },
    {
      name: "Enterprise",
      description: "Premium solution for enterprise organizations",
      priceMonthly: 749,
      priceYearly: 599,
      color: "accent",
      tier: "tier2",
      isPopular: true,
      features: [
        "Enterprise CRM (unlimited contacts)",
        "Custom workflow automation",
        "Advanced AI insights + prediction",
        "Unlimited team members",
        "Advanced analytics + reporting",
        "Dedicated success manager",
        "99.99% uptime SLA",
        "Priority API access",
        "SAML/SSO authentication",
        "Advanced compliance tools"
      ]
    },
    {
      name: "Elite",
      description: "Bespoke solution for global enterprises",
      priceMonthly: 1499,
      priceYearly: 1199,
      color: "secondary",
      tier: "tier3",
      features: [
        "Everything in Enterprise plus:",
        "Custom integration development",
        "Multi-region data residency",
        "Enterprise-grade security",
        "AI model customization",
        "Dedicated dev environment",
        "24/7 executive support",
        "Quarterly business reviews",
        "Strategic advisory services"
      ]
    }
  ];
  
  const enterpriseFeatures = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Enterprise Security",
      description: "Enterprise-grade security with end-to-end encryption and advanced threat protection"
    },
    {
      icon: <Users size={24} />,
      title: "Role-Based Access",
      description: "Granular permission controls and user management for enterprise teams"
    },
    {
      icon: <Gauge size={24} />,
      title: "Guaranteed Performance",
      description: "99.99% uptime SLA with global infrastructure for reliable performance"
    },
    {
      icon: <BadgeCheck size={24} />,
      title: "Data Privacy",
      description: "Built with privacy and security best practices, detailed audit logging"
    }
  ];

  // Helper function to map plan color to glow color
  const getGlowColor = (color: string) => {
    switch(color) {
      case 'primary': return 'blue';
      case 'secondary': return 'purple';
      case 'accent': return 'green';
      default: return 'blue';
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute top-20 left-0 w-full h-full">
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-[90px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/10 mb-6 border border-primary/20">
            <span className="text-xs font-medium text-primary">ENTERPRISE PLANS</span>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-card/70 border border-primary/30 flex items-center justify-center mr-4 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <div className="absolute w-20 h-20 bg-primary/10 rounded-full blur-xl -top-10 -left-10"></div>
              <Sparkles className="text-primary relative z-10" size={20} />
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
              <span className="text-foreground">Enterprise-Grade</span>{" "}
              <span className="text-gradient-primary">Pricing</span>
            </h2>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl mb-12 leading-relaxed">
            Sophisticated solutions engineered for global enterprises with comprehensive security, unmatched performance, and dedicated support infrastructure.
          </p>
        
          {/* Pricing Toggle */}
          <div className="chrome-panel rounded-full p-1.5 flex items-center mb-12 shadow-lg border border-white/10 backdrop-blur-sm">
            <button
              className={cn(
                "px-6 py-2.5 rounded-full font-medium transition-all duration-300",
                !isYearly 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-6 py-2.5 rounded-full font-medium transition-all duration-300 relative",
                isYearly 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
              onClick={() => setIsYearly(true)}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full animate-pulse-glow shadow-sm">
                Save 20%
              </span>
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-5 mb-20">
          {plans.map((plan, index) => (
            <TitaniumCard
              key={index}
              glowColor={getGlowColor(plan.color)}
              className={cn(
                "overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-fade-in",
                plan.isPopular ? "lg:scale-105 z-10" : "",
                index === 0 ? "lg:translate-x-5" : "",
                index === 2 ? "lg:-translate-x-5" : ""
              )}
            >
              {/* Recommended badge */}
              {plan.isPopular && (
                <div className="absolute top-7 right-0 bg-accent text-accent-foreground py-1 pl-4 pr-5 text-xs font-semibold shadow-lg rounded-l-full z-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  RECOMMENDED
                </div>
              )}
              
              {/* Plan Header */}
              <div className="p-8 border-b border-border/20 relative z-10">
                <div className="mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative",
                    index === 0 ? "bg-primary/10 border border-primary/20" :
                    index === 1 ? "bg-accent/10 border border-accent/20" :
                    "bg-secondary/10 border border-secondary/20"
                  )}>
                    <div className={cn(
                      "relative z-10",
                      index === 0 ? "text-primary" :
                      index === 1 ? "text-accent" :
                      "text-secondary"
                    )}>
                      {index === 0 && <BarChart3 size={24} />}
                      {index === 1 && <Bot size={24} />}
                      {index === 2 && <Award size={24} />}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>
                  </div>
                  
                  <h3 className="font-['Orbitron'] text-2xl font-semibold mb-2 text-foreground flex items-center">
                    {plan.name}
                    {plan.name === "Elite" && <Lock className="ml-2 text-secondary h-5 w-5" />}
                  </h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                
                {/* Price display */}
                <div className="mb-8">
                  <div className="relative mb-2 flex items-baseline">
                    <div className={cn(
                      "text-5xl font-['Orbitron'] font-bold",
                      index === 0 ? "text-primary" :
                      index === 1 ? "text-accent" :
                      "text-secondary"
                    )}>
                      {formatPrice(isYearly ? plan.priceYearly : plan.priceMonthly, false)}
                    </div>
                    <div className="text-muted-foreground ml-2 flex items-baseline">
                      <span>/month</span>
                    </div>
                    
                    {isYearly && (
                      <div className={cn(
                        "absolute -right-2 top-0 rounded-lg px-3 py-1 text-xs font-medium shadow-sm border",
                        index === 0 ? "bg-primary/10 text-primary border-primary/30" :
                        index === 1 ? "bg-accent/10 text-accent border-accent/30" :
                        "bg-secondary/10 text-secondary border-secondary/30"
                      )}>
                        20% off
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {isYearly ? "Billed annually" : "Billed monthly"}
                    {isYearly && (
                      <span className="ml-1">
                        ({formatPrice(plan.priceYearly * 12, false)}/year)
                      </span>
                    )}
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className="mb-2">
                  <Link href="/demos/entropy">
                    <div className={cn(
                      "btn-titanium block w-full py-3.5 text-center rounded-lg font-medium shadow-md transition-all duration-300 cursor-pointer relative group overflow-hidden",
                      index === 0 ? "bg-primary/90 text-primary-foreground border border-primary/30" :
                      index === 1 ? "bg-accent/90 text-accent-foreground border border-accent/30" :
                      "bg-secondary/90 text-secondary-foreground border border-secondary/30"
                    )}>
                      <span className="relative z-10 flex items-center justify-center">
                        {index === 1 ? "Schedule Demo" : "Get Started"}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </div>
                  </Link>
                </div>
              </div>
              
              {/* Features list */}
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-5">
                  <div className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center mr-3",
                    index === 0 ? "bg-primary/10" :
                    index === 1 ? "bg-accent/10" :
                    "bg-secondary/10"
                  )}>
                    <div className={cn(
                      index === 0 ? "text-primary" :
                      index === 1 ? "text-accent" :
                      "text-secondary"
                    )}>
                      <CheckCircle2 size={12} />
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-foreground">
                    Enterprise Features
                  </h4>
                </div>
                
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/item">
                      <div className={cn(
                        "flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center mr-3 mt-0.5 transition-colors duration-200",
                        index === 0 ? "bg-primary/5 border-primary/20 group-hover/item:bg-primary/10" :
                        index === 1 ? "bg-accent/5 border-accent/20 group-hover/item:bg-accent/10" :
                        "bg-secondary/5 border-secondary/20 group-hover/item:bg-secondary/10"
                      )}>
                        <Check className={cn(
                          "w-3 h-3",
                          index === 0 ? "text-primary" :
                          index === 1 ? "text-accent" :
                          "text-secondary"
                        )} />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TitaniumCard>
          ))}
        </div>
      </div>
    </section>
  );
}