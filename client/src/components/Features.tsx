import { 
  Server, Database, BarChart3, Bot, Workflow, 
  MessageSquare, Lock, ShieldCheck, Globe, 
  ExternalLink, Check, Fingerprint, Award, FileCheck 
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Workflow size={30} />,
      title: "N8N Workflow Automation",
      description: "Professional N8N workflow development and implementation with multi-platform system integrations and custom automation solutions.",
      benefits: [
        "Custom automation solutions for lead generation", 
        "API connections and webhook configurations", 
        "Make.com (Integromat) automations when specified"
      ],
      color: "primary"
    },
    {
      icon: <Database size={30} />,
      title: "Go High Level CRM Implementation",
      description: "Complete CRM system setup and optimization with lead generation pipeline development and sales team efficiency optimization.",
      benefits: [
        "Go High Level funnel implementation", 
        "Customer relationship management automation", 
        "Data enrichment and acquisition funnel creation"
      ],
      color: "accent"
    },
    {
      icon: <Bot size={30} />,
      title: "AI & Voice Technology Solutions",
      description: "ElevenLabs voice synthesis, multi-step AI agent creation, and LLM integration with Claude, GPT, and OpenRouter.io.",
      benefits: [
        "ElevenLabs voice synthesis and agent development", 
        "Ollama local model deployment", 
        "Voice-enabled customer interaction systems"
      ],
      color: "secondary"
    },
    {
      icon: <Globe size={30} />,
      title: "Professional Web Development",
      description: "Conversion-optimized website development with browser automation via Puppeteer and human-like interaction patterns.",
      benefits: [
        "Conversion-optimized professional websites", 
        "Web scraping for credential-restricted data", 
        "Form automation and data extraction"
      ],
      color: "accent"
    },
    {
      icon: <BarChart3 size={30} />,
      title: "Marketing & Social Media Management",
      description: "ROI-focused social media advertising management, marketing automation systems, and conversion funnel optimization with analytics tracking.",
      benefits: [
        "Social media advertising management and optimization", 
        "Lead nurture sequences and conversion funnel optimization", 
        "Analytics and performance tracking with ROI focus"
      ],
      color: "primary"
    },
    {
      icon: <Database size={30} />,
      title: "Data Management & Analytics",
      description: "Comprehensive data solutions with Airtable automation, Supabase backend implementation, and Google Workspace integration for seamless operations.",
      benefits: [
        "Airtable database automation and Supabase implementation", 
        "Google Workspace integration (Docs, Sheets, Drive, Gmail)", 
        "Real-time analytics dashboard creation and data transfer"
      ],
      color: "secondary"
    },
    {
      icon: <Bot size={30} />,
      title: "Custom Applications & AI Assistants",
      description: "Bespoke application development and complex personal assistants using Claude Desktop with custom MCP server setups for complete data and asset control.",
      benefits: [
        "Custom application development tailored to your needs", 
        "Claude 3.7 Sonnet personal assistants with full data access", 
        "Custom MCP server setups for unified control from one interface"
      ],
      color: "primary"
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
                <div className="p-4 bg-card/50 rounded-lg border border-border/30 flex flex-col items-center justify-center hover:bg-card/70 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-medium text-foreground">GDPR</span>
                </div>
                <div className="p-4 bg-card/50 rounded-lg border border-border/30 flex flex-col items-center justify-center hover:bg-card/70 transition-colors">
                  <Lock className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-medium text-foreground">HIPAA</span>
                </div>
                <div className="p-4 bg-card/50 rounded-lg border border-border/30 flex flex-col items-center justify-center hover:bg-card/70 transition-colors">
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-medium text-foreground">SOC 2</span>
                </div>
                <div className="p-4 bg-card/50 rounded-lg border border-border/30 flex flex-col items-center justify-center hover:bg-card/70 transition-colors">
                  <FileCheck className="w-8 h-8 text-primary mb-2" />
                  <span className="text-xs font-medium text-foreground">CCPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}