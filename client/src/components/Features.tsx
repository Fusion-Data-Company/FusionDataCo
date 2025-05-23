import { 
  Server, Database, BarChart3, Bot, Workflow, 
  MessageSquare, Lock, ShieldCheck, Globe, 
  ExternalLink, Check, Fingerprint 
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Database size={30} />,
      title: "Enterprise CRM",
      description: "Comprehensive customer relationship management with advanced segmentation and enterprise-grade governance.",
      benefits: [
        "Role-based access controls", 
        "Custom workflow automation", 
        "Enterprise data governance"
      ],
      color: "primary"
    },
    {
      icon: <BarChart3 size={30} />,
      title: "Advanced Analytics",
      description: "Make data-driven decisions with our enterprise business intelligence platform and predictive modeling.",
      benefits: [
        "Customizable executive dashboards", 
        "Predictive lead scoring", 
        "ROI attribution modeling"
      ],
      color: "accent"
    },
    {
      icon: <Bot size={30} />,
      title: "AI-Powered Intelligence",
      description: "Leverage cutting-edge AI for personalized customer engagement and operational efficiency.",
      benefits: [
        "Natural language processing", 
        "Predictive customer behavior", 
        "Automated content optimization"
      ],
      color: "secondary"
    },
    {
      icon: <Workflow size={30} />,
      title: "Workflow Orchestration",
      description: "Design complex enterprise workflows that connect all departments for seamless operations.",
      benefits: [
        "Enterprise process automation", 
        "Cross-department coordination", 
        "Integration with enterprise systems"
      ],
      color: "accent"
    },
    {
      icon: <Lock size={30} />,
      title: "Enterprise Security",
      description: "Bank-grade security protocols with comprehensive audit logging and compliance controls.",
      benefits: [
        "SOC 2 Type II compliance", 
        "End-to-end encryption", 
        "Advanced threat protection"
      ],
      color: "primary"
    },
    {
      icon: <Globe size={30} />,
      title: "Global Infrastructure",
      description: "Distributed cloud architecture with regional data compliance and enterprise-grade reliability.",
      benefits: [
        "99.99% uptime SLA", 
        "Global CDN integration", 
        "Regional data residency"
      ],
      color: "secondary"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-4">
              <Fingerprint className="text-primary w-5 h-5" />
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
              <span className="text-foreground">Enterprise-Grade</span>{" "}
              <span className="text-primary text-shadow-titanium">Capabilities</span>
            </h2>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Our enterprise platform provides the comprehensive suite of tools that Fortune 500 companies rely on for marketing excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-with-glow relative rounded-xl"
            >
              {/* Separate ambient glow behind card */}
              <div className={`card-ambient-glow ${
                feature.color === 'primary' ? 'card-ambient-glow-blue' : 
                feature.color === 'secondary' ? 'card-ambient-glow-purple' : 
                'card-ambient-glow-green'}`}>
              </div>
              
              {/* Actual card with solid titanium panel */}
              <div className="titanium-panel p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-${feature.color}/10 border border-${feature.color}/20`}>
                  <div className={`text-${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="font-['Orbitron'] text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
                
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${feature.color}/10 flex items-center justify-center mr-3`}>
                        <Check className={`text-${feature.color} w-3 h-3`} />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-4 border-t border-border/30">
                  <a href="#" className="text-sm flex items-center text-primary hover:underline">
                    Learn more <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="glass-panel p-8 rounded-xl max-w-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
              <ShieldCheck className="w-full h-full text-primary" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-['Orbitron'] font-semibold mb-4 text-foreground">
                Enterprise-Grade Security & Compliance
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Fusion Data Co is fully compliant with industry regulations including GDPR, CCPA, HIPAA, and SOC 2 Type II. Our enterprise platform provides the security controls required by the most security-conscious organizations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
                  <img src="https://via.placeholder.com/80x30?text=GDPR" alt="GDPR Compliant" />
                </div>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
                  <img src="https://via.placeholder.com/80x30?text=HIPAA" alt="HIPAA Compliant" />
                </div>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
                  <img src="https://via.placeholder.com/80x30?text=SOC2" alt="SOC 2 Type II" />
                </div>
                <div className="p-3 bg-card/50 rounded-lg border border-border/30 flex items-center justify-center">
                  <img src="https://via.placeholder.com/80x30?text=CCPA" alt="CCPA Compliant" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}