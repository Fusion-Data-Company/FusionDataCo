import { useState } from "react";
import { Link } from "wouter";
import { Check, Zap, ShieldCheck, Users, Gauge, BadgeCheck, Award, BarChart3, Workflow, Database, Lock, Bot, ArrowRight, Sparkles, CheckCircle2, Globe } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
      description: "SOC 2 Type II compliant with end-to-end encryption and advanced threat protection"
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
      title: "Compliance Ready",
      description: "GDPR, HIPAA, and CCPA compliant with detailed audit logging"
    }
  ];

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
            <div 
              key={index} 
              className={cn(
                "chrome-panel rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 relative animate-fade-in group",
                plan.isPopular 
                  ? "border-accent/40 lg:scale-105 z-10" 
                  : "border-white/10 hover:border-white/20",
                index === 0 ? "lg:translate-x-5" : "",
                index === 2 ? "lg:-translate-x-5" : ""
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Glow effect on popular plan */}
              {plan.isPopular && (
                <div className="absolute inset-0 bg-accent/5 blur-lg rounded-xl -m-1 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              )}
              
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
                  <Link href="/#enterprise-demo">
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
            </div>
          ))}
        </div>
        
        {/* Enterprise Features */}
        <div className="chrome-panel p-12 rounded-xl max-w-6xl mx-auto mb-24 border border-white/10 shadow-xl animate-fade-in backdrop-blur-sm relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-secondary/10 mb-4 border border-secondary/20">
                <span className="text-xs font-medium text-secondary">TITANIUM SUITE</span>
              </div>
              
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
                All-Inclusive Enterprise <span className="text-gradient-primary">Security & Compliance</span>
              </h3>
              
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-transparent rounded-full mb-6 mx-auto"></div>
              
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every plan includes our comprehensive enterprise security and compliance framework, ensuring your organization's data is protected to the highest industry standards.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {enterpriseFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="enterprise-card p-6 text-center relative group animate-fade-in hover:shadow-2xl transition-all duration-500"
                  style={{ animationDelay: `${0.2 + (index * 0.15)}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 polished-chrome border border-white/10 shadow-lg mx-auto">
                      <div className="text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h4 className="font-['Orbitron'] text-lg font-medium mb-3 text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80">{feature.description}</p>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enterprise Custom Option */}
        <div className="relative overflow-hidden mb-24">
          <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
            <Database className="w-80 h-80 text-primary" />
          </div>
          
          <div className="titanium-panel p-12 rounded-xl border border-white/10 shadow-xl relative z-10 animate-fade-in">
            <div className="flex flex-col lg:flex-row items-stretch gap-12">
              <div className="lg:w-2/3">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center mr-4 shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
                    <div className="absolute w-20 h-20 bg-accent/20 rounded-full blur-xl -top-10 -left-10"></div>
                    <Zap className="text-accent relative z-10" size={22} />
                  </div>
                  <div>
                    <h3 className="font-['Orbitron'] text-2xl font-semibold text-foreground">
                      Global Enterprise <span className="text-gradient-silver">Custom Solution</span>
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Lock size={10} className="mr-1.5" />
                      <span>Invitation-only enterprise tier</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  For global Fortune 500 enterprises with complex requirements, our elite team provides a completely customized solution with dedicated infrastructure, custom development, and executive-level support. Our Titanium Elite program includes direct access to our core engineering team and customized AI model training.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="glass-panel p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300 group/item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Workflow size={18} className="text-accent" />
                      </div>
                      <h5 className="font-medium text-foreground">Custom API Development</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">Bespoke integrations with your existing enterprise systems and proprietary technology.</p>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300 group/item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Database size={18} className="text-accent" />
                      </div>
                      <h5 className="font-medium text-foreground">Dedicated Infrastructure</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">Private cloud deployment with dedicated resources for ultimate performance and security.</p>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300 group/item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Globe size={18} className="text-accent" />
                      </div>
                      <h5 className="font-medium text-foreground">Global Data Centers</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">Multi-region deployment with data residency options for global compliance requirements.</p>
                  </div>
                  
                  <div className="glass-panel p-4 rounded-lg border border-white/10 hover:shadow-lg transition-all duration-300 group/item">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Bot size={18} className="text-accent" />
                      </div>
                      <h5 className="font-medium text-foreground">Custom AI Training</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">Proprietary AI models trained on your organization's data for industry-specific insights.</p>
                  </div>
                </div>
                
                <div className="inline-flex items-center mb-3 gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-full text-xs font-medium text-secondary border border-secondary/20">
                  <Users size={12} />
                  <span>Selected clients include Fortune 100 enterprises and government agencies</span>
                </div>
              </div>
              
              <div className="lg:w-1/3 w-full">
                <div className="chrome-panel p-8 rounded-xl border border-white/10 shadow-xl h-full flex flex-col">
                  <h4 className="font-['Orbitron'] text-xl font-medium mb-6 text-foreground">
                    Request Elite Access
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-6">Submit your information to schedule a consultation with our enterprise solutions architects.</p>
                  
                  <form className="space-y-4 flex-grow">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                      <input 
                        id="fullName"
                        type="text" 
                        placeholder="Jane Smith" 
                        className="w-full px-4 py-3 bg-card/50 border border-white/10 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="workEmail" className="block text-sm font-medium text-muted-foreground mb-1">Work Email</label>
                      <input 
                        id="workEmail"
                        type="email" 
                        placeholder="jane.smith@enterprise.com" 
                        className="w-full px-4 py-3 bg-card/50 border border-white/10 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-muted-foreground mb-1">Company</label>
                      <input 
                        id="companyName"
                        type="text" 
                        placeholder="Enterprise Corp." 
                        className="w-full px-4 py-3 bg-card/50 border border-white/10 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div className="mt-auto pt-4">
                      <button 
                        type="button"
                        className="btn-titanium w-full py-3.5 bg-accent/90 text-accent-foreground rounded-lg font-medium shadow-lg border border-accent/30 hover:shadow-xl flex items-center justify-center"
                      >
                        <span className="flex items-center">
                          Request Elite Consultation
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </button>
                      
                      <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center">
                        <Lock size={10} className="mr-1.5" />
                        <span>Your information is secure and confidential</span>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-24 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/10 mb-4 border border-primary/20">
              <span className="text-xs font-medium text-primary">FREQUENTLY ASKED</span>
            </div>
            
            <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
              Enterprise <span className="text-gradient-primary">FAQs</span>
            </h3>
            
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6 mx-auto"></div>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Common questions about our enterprise solutions, pricing, and implementation process.
            </p>
          </div>
          
          <div className="space-y-5">
            <div className="chrome-panel p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mr-3">
                  <Check className="text-primary w-4 h-4" />
                </div>
                <h4 className="font-['Orbitron'] font-medium text-foreground">Can I customize my enterprise plan?</h4>
              </div>
              <p className="text-muted-foreground pl-11 leading-relaxed">
                Yes, enterprise plans can be fully customized to your specific business requirements. Our solutions architects will work with you to design the perfect solution.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-xl">
              <h4 className="font-medium text-foreground mb-2">Do you offer multi-year contracts?</h4>
              <p className="text-muted-foreground">
                Yes, we offer multi-year enterprise agreements with additional discounts and price protection. Contact our enterprise sales team for details.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-xl">
              <h4 className="font-medium text-foreground mb-2">What kind of support is included?</h4>
              <p className="text-muted-foreground">
                Enterprise plans include 24/7 priority support, a dedicated customer success manager, regular business reviews, and access to our enterprise support portal.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-xl">
              <h4 className="font-medium text-foreground mb-2">How do you handle data security and compliance?</h4>
              <p className="text-muted-foreground">
                All enterprise plans include SOC 2 Type II compliance, end-to-end encryption, advanced authentication options, and comprehensive audit logging. We support GDPR, HIPAA, and CCPA compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
