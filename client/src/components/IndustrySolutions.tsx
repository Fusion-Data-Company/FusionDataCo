import { Link } from "wouter";
import { 
  Check, 
  ArrowRight, 
  Building, 
  BarChart, 
  Shield, 
  FileText,
  TrendingUp, 
  BriefcaseBusiness, 
  Gem, 
  UserRoundCog,
  Activity, 
  Lock, 
  Server, 
  BarChart3, 
  Brain, 
  LineChart, 
  Globe, 
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IndustrySolution {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  icon: React.ReactNode;
  color: string;
  challenges: string[];
  solutions: string[];
  stats: {
    value: string;
    label: string;
  }[];
}

export default function IndustrySolutions() {
  const solutions: IndustrySolution[] = [
    {
      title: "Enterprise",
      subtitle: "For Global Organizations",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/enterprise",
      icon: <Building size={24} />,
      color: "primary",
      challenges: [
        "Managing global brand consistency across markets",
        "Complex compliance and governance requirements",
        "Siloed marketing data across business units",
        "Inefficient cross-department collaboration"
      ],
      solutions: [
        "Centralized brand asset management with governance",
        "Automated compliance checks and audit trails",
        "Cross-unit data integration and unified insights",
        "Collaborative workflows with role-based permissions",
        "Enterprise SLAs with dedicated support"
      ],
      stats: [
        { value: "89%", label: "Increased marketing efficiency" },
        { value: "67%", label: "Reduced compliance risks" },
        { value: "3.2x", label: "ROI on marketing spend" }
      ]
    },
    {
      title: "Financial Services",
      subtitle: "For Banking & Investment",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/finance",
      icon: <BarChart size={24} />,
      color: "accent",
      challenges: [
        "Strict regulatory compliance requirements",
        "Personalization while maintaining privacy",
        "Complex approval workflows for content",
        "Data security and client confidentiality"
      ],
      solutions: [
        "GDPR and FINRA compliant marketing automation",
        "Secure client segmentation and targeting",
        "Multi-level approval workflows for compliance",
        "Enterprise-grade security and encryption",
        "Relationship-based marketing intelligence"
      ],
      stats: [
        { value: "99.9%", label: "Compliance adherence" },
        { value: "41%", label: "Increased client engagement" },
        { value: "57%", label: "Faster campaign deployment" }
      ]
    },
    {
      title: "Healthcare",
      subtitle: "For Medical Enterprises",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/healthcare",
      icon: <Shield size={24} />,
      color: "secondary",
      challenges: [
        "HIPAA compliance across all communications",
        "Personalized patient journeys at scale",
        "Integration with electronic health records",
        "Coordinating care team communications"
      ],
      solutions: [
        "HIPAA-compliant marketing automation",
        "Secure patient journey orchestration",
        "EHR integration for coordinated outreach",
        "Compliant multi-channel communications",
        "Provider relationship management"
      ],
      stats: [
        { value: "100%", label: "HIPAA compliance" },
        { value: "78%", label: "Patient satisfaction increase" },
        { value: "32%", label: "Reduced readmissions" }
      ]
    },
    {
      title: "Manufacturing",
      subtitle: "For Industry Leaders",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/manufacturing",
      icon: <FileText size={24} />,
      color: "muted-foreground",
      challenges: [
        "Complex multi-tier distribution channels",
        "Long sales cycles with multiple stakeholders",
        "Technical product information management",
        "Global supply chain communication"
      ],
      solutions: [
        "Channel partner management platform",
        "Account-based marketing automation",
        "Digital product information distribution",
        "Supply chain engagement automation",
        "Multi-language content localization"
      ],
      stats: [
        { value: "47%", label: "Shorter sales cycles" },
        { value: "63%", label: "Increased distributor engagement" },
        { value: "2.6x", label: "Marketing qualified leads" }
      ]
    }
  ];

  const enterpriseCapabilities = [
    {
      icon: <Lock size={20} />,
      title: "Enterprise Security",
      description: "SOC 2 Type II compliant with end-to-end encryption and role-based access"
    },
    {
      icon: <Server size={20} />,
      title: "Global Infrastructure",
      description: "99.99% uptime SLA with multi-region deployment and disaster recovery"
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Advanced Analytics",
      description: "Custom reporting, predictive analytics, and executive dashboards"
    },
    {
      icon: <Brain size={20} />,
      title: "AI Workflow Automation",
      description: "Intelligent automation with custom AI models for your industry"
    },
    {
      icon: <LineChart size={20} />,
      title: "Attribution Modeling",
      description: "Multi-touch attribution across all marketing channels and campaigns"
    },
    {
      icon: <Globe size={20} />,
      title: "Global Compliance",
      description: "GDPR, CCPA, HIPAA, and industry-specific compliance frameworks"
    },
    {
      icon: <Database size={20} />,
      title: "Data Integration",
      description: "Enterprise API access with custom integrations and data warehousing"
    },
    {
      icon: <UserRoundCog size={20} />,
      title: "Dedicated Support",
      description: "White-glove onboarding, dedicated CSM, and 24/7 technical support"
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-lg border border-primary/30 flex items-center justify-center mr-4">
              <BriefcaseBusiness className="text-primary w-5 h-5" />
            </div>
            <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold">
              <span className="text-foreground">Enterprise-Grade</span>{" "}
              <span className="text-primary text-shadow-titanium">Solutions</span>
            </h2>
          </div>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          
          <p className="text-lg text-muted-foreground text-center max-w-2xl mb-10">
            Tailored enterprise marketing solutions with the scalability, security, and sophistication that industry leaders demand.
          </p>
        </div>
        
        {/* Solutions grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="card-with-glow relative rounded-xl overflow-hidden transition-all duration-300 group"
            >
              {/* Separate ambient glow behind card */}
              <div className={`card-ambient-glow ${
                solution.color === 'primary' ? 'card-ambient-glow-blue' : 
                solution.color === 'secondary' ? 'card-ambient-glow-purple' : 
                solution.color === 'accent' ? 'card-ambient-glow-green' :
                'card-ambient-glow-amber'}`}>
              </div>
              
              {/* Actual titanium card content */}
              <div className="titanium-panel rounded-xl overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url('${solution.image}')` }}
                  >
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className={`w-12 h-12 rounded-lg bg-${solution.color}/10 border border-${solution.color}/20 flex items-center justify-center mb-3`}>
                      <div className={`text-${solution.color}`}>
                        {solution.icon}
                      </div>
                    </div>
                    
                    <h3 className="font-['Orbitron'] text-2xl font-bold text-foreground mb-1">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {solution.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex mb-6">
                    {solution.stats.map((stat, idx) => (
                      <div key={idx} className="flex-1 text-center p-2">
                        <div className={`text-2xl font-['Orbitron'] font-bold text-${solution.color}`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-['Orbitron'] text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Activity size={18} className={`text-${solution.color}`} />
                      Enterprise Challenges
                    </h4>
                    <ul className="space-y-2">
                      {solution.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          </div>
                          <span className="text-muted-foreground text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-['Orbitron'] text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Gem size={18} className={`text-${solution.color}`} />
                      Our Enterprise Solution
                    </h4>
                    <ul className="space-y-2">
                      {solution.solutions.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${solution.color}/10 flex items-center justify-center mr-3 mt-0.5`}>
                            <Check className={`text-${solution.color} w-3 h-3`} />
                          </div>
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={solution.link}>
                    <span className={cn(
                      `bg-${solution.color}/10 text-${solution.color} border border-${solution.color}/20`,
                      "block w-full py-3 rounded-md font-medium text-center transition-all duration-300 hover:bg-card/50 cursor-pointer",
                      "flex items-center justify-center gap-2"
                    )}>
                      <span>Explore {solution.title} Solutions</span>
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise-grade capabilities */}
        <div className="glass-panel rounded-xl p-8 md:p-10 max-w-6xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4 text-foreground">
              Enterprise-Grade Capabilities
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for enterprise from the ground up with the security, scalability, and sophistication that global organizations demand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {enterpriseCapabilities.map((capability, index) => (
              <div key={index} className="card-with-glow relative rounded-lg">
                <div className="card-ambient-glow card-ambient-glow-blue"></div>
                <div className="titanium-panel p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <div className="text-primary">
                        {capability.icon}
                      </div>
                    </div>
                    <h4 className="font-medium text-foreground">{capability.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enterprise CTA */}
        <div className="text-center">
          <Link href="/enterprise">
            <span className={cn(
              "px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-md",
              "hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center",
              "relative overflow-hidden group"
            )}>
              <span className="relative z-10 flex items-center">
                Request Enterprise Consultation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}