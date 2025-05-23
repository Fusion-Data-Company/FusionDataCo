import { useState } from "react";
import { Link } from "wouter";
import { Check, Zap, ShieldCheck, Users, Gauge, BadgeCheck, Award, BarChart3, Workflow, Database, Lock, Bot, ArrowRight, Sparkles } from "lucide-react";
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
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-20 -right-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-4">
              <Sparkles className="text-primary w-5 h-5" />
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
              <span className="text-foreground">Enterprise-Grade</span>{" "}
              <span className="text-primary text-shadow-titanium">Pricing</span>
            </h2>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl mb-10">
            Tailored solutions designed for enterprise organizations with comprehensive features, dedicated support, and advanced security.
          </p>
        
          {/* Pricing Toggle */}
          <div className="glass-panel rounded-full p-1.5 flex items-center mb-12 shadow-sm">
            <button
              className={cn(
                "px-5 py-2 rounded-full font-medium transition-all duration-300",
                !isYearly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              )}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={cn(
                "px-5 py-2 rounded-full font-medium transition-all duration-300 relative",
                isYearly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
              )}
              onClick={() => setIsYearly(true)}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={cn(
                "titanium-panel rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative",
                plan.isPopular ? "border-accent shadow-lg" : "border-border shadow-md"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-7 right-0 bg-accent text-accent-foreground py-1 pl-3 pr-4 text-xs font-semibold shadow-md rounded-l-full">
                  RECOMMENDED
                </div>
              )}
              
              <div className="p-8 border-b border-border/40">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-2 text-foreground flex items-center">
                  {plan.name}
                  {plan.name === "Elite" && <Award className="ml-2 text-secondary h-5 w-5" />}
                </h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="relative mb-2">
                  <span className={`text-4xl font-['Orbitron'] font-bold text-foreground`}>
                    {formatPrice(isYearly ? plan.priceYearly : plan.priceMonthly, false)}
                  </span>
                  <span className="text-muted-foreground ml-1">/month</span>
                  
                  {isYearly && (
                    <div className="absolute -right-2 top-0 bg-accent/10 text-accent rounded-md px-2 py-0.5 text-xs font-medium">
                      20% off
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  {isYearly ? "Billed annually" : "Billed monthly"}
                  {isYearly && ` (${formatPrice(plan.priceYearly * 12, false)}/year)`}
                </p>
                
                <Link href="/#enterprise-demo">
                  <span className={cn(
                    "block w-full py-3 text-center rounded-md font-medium shadow-md transition-all duration-200 cursor-pointer relative group overflow-hidden",
                    index === 0 ? "bg-primary text-primary-foreground" :
                    index === 1 ? "bg-accent text-accent-foreground" :
                    "bg-secondary text-secondary-foreground"
                  )}>
                    <span className="relative z-10 flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </span>
                </Link>
              </div>
              
              <div className="p-8">
                <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
                  Features included
                </h4>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${plan.color}/10 flex items-center justify-center mr-3`}>
                        <Check className={`text-${plan.color} w-3 h-3`} />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise Features */}
        <div className="glass-panel p-10 rounded-xl max-w-6xl mx-auto mb-20">
          <div className="text-center mb-10">
            <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
              Enterprise-Grade Features
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All plans include these essential enterprise capabilities to ensure security, compliance, and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10 border border-primary/20`}>
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
        
        {/* Enterprise Custom Option */}
        <div className="relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-5">
            <Database className="w-80 h-80 text-primary" />
          </div>
          
          <div className="titanium-panel p-10 rounded-xl relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center mr-4">
                    <Zap className="text-accent w-5 h-5" />
                  </div>
                  <h3 className="font-['Orbitron'] text-2xl font-semibold text-foreground">
                    Global Enterprise Solution
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  For global enterprises with complex requirements, our elite team provides a completely customized solution with dedicated infrastructure, custom development, and executive-level support.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="text-accent w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground text-sm">Custom API development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="text-accent w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground text-sm">Dedicated infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="text-accent w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground text-sm">Global data centers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="text-accent w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground text-sm">24/7 executive support</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3 w-full">
                <div className="glass-panel p-6 rounded-xl border border-border/40 shadow-md">
                  <h4 className="font-['Orbitron'] text-lg font-medium mb-4 text-foreground text-center">
                    Contact Enterprise Sales
                  </h4>
                  
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Work Email" 
                        className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        className="w-full px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    <button 
                      type="button"
                      className="w-full py-3 bg-accent text-accent-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                      Request Consultation
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
              Enterprise FAQs
            </h3>
            <p className="text-muted-foreground">
              Common questions about our enterprise solutions and pricing.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="glass-panel p-6 rounded-xl">
              <h4 className="font-medium text-foreground mb-2">Can I customize my enterprise plan?</h4>
              <p className="text-muted-foreground">
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
