import { 
  Server, Database, BarChart3, Bot, Workflow, Users, TrendingUp,
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
      color: "blue",
      glowColor: "blue-500"
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
      color: "emerald",
      glowColor: "emerald-500"
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
      color: "purple",
      glowColor: "purple-500"
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
      color: "cyan",
      glowColor: "cyan-500"
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
      color: "orange",
      glowColor: "orange-500"
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
      color: "pink",
      glowColor: "pink-500"
    },
    {
      icon: <Bot size={30} />,
      title: "Custom CRM MCP Servers & AI Assistants",
      description: "Custom CRM MCP servers that allow businesses to interact seamlessly with their data and workspace functions through Claude 3.7 Sonnet integration.",
      benefits: [
        "Custom CRM MCP servers for seamless data interaction", 
        "Claude 3.7 Sonnet integration with complete workspace access", 
        "Unified business data and function control from one interface"
      ],
      color: "violet",
      glowColor: "violet-500"
    },
    {
      icon: <Users size={30} />,
      title: "Customer Support & Training Solutions",
      description: "Comprehensive customer support automation with training programs, knowledge base creation, and multi-channel communication systems.",
      benefits: [
        "24/7 automated customer support with AI chatbots", 
        "Staff training programs and knowledge base development", 
        "Multi-channel communication (email, SMS, chat, voice)"
      ],
      color: "indigo",
      glowColor: "indigo-500"
    },
    {
      icon: <TrendingUp size={30} />,
      title: "Business Intelligence & Reporting",
      description: "Advanced business intelligence dashboards with predictive analytics, executive reporting, and strategic insights for data-driven decision making.",
      benefits: [
        "Executive dashboards with real-time KPI tracking", 
        "Predictive analytics and forecasting models", 
        "Custom reports with actionable business insights"
      ],
      color: "teal",
      glowColor: "teal-500"
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
          {features.map((feature, index) => {
            const colorMap = {
              blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', shadow: 'shadow-blue-500/20', glow: 'bg-blue-500/5' },
              emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', shadow: 'shadow-emerald-500/20', glow: 'bg-emerald-500/5' },
              purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', shadow: 'shadow-purple-500/20', glow: 'bg-purple-500/5' },
              cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', shadow: 'shadow-cyan-500/20', glow: 'bg-cyan-500/5' },
              orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', shadow: 'shadow-orange-500/20', glow: 'bg-orange-500/5' },
              pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', shadow: 'shadow-pink-500/20', glow: 'bg-pink-500/5' },
              violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', shadow: 'shadow-violet-500/20', glow: 'bg-violet-500/5' },
              indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', shadow: 'shadow-indigo-500/20', glow: 'bg-indigo-500/5' },
              teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', shadow: 'shadow-teal-500/20', glow: 'bg-teal-500/5' }
            };
            const colors = colorMap[feature.color as keyof typeof colorMap];
            
            return (
              <div 
                key={index} 
                className="relative group"
              >
                {/* Ambient glow effect */}
                <div className={`absolute -inset-3 ${colors.glow} rounded-xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                
                {/* Card content */}
                <div className={`relative bg-[#121218]/90 backdrop-blur-md border ${colors.border} p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:${colors.shadow} hover:shadow-xl`}>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${colors.bg} border ${colors.border}`}>
                    <div className={colors.text}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-['Orbitron'] text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mr-3 mt-0.5`}>
                          <Check className={`${colors.text} w-3 h-3`} />
                        </div>
                        <span className="text-gray-400 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700/30">
                    <a href="#" className={`text-sm flex items-center ${colors.text} hover:underline`}>
                      Learn more <ExternalLink className="ml-1 w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="relative bg-[#121218]/90 backdrop-blur-md border border-gray-800/50 p-8 rounded-xl max-w-4xl overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-5">
              <ShieldCheck className="w-full h-full text-emerald-400" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-['Orbitron'] font-semibold mb-4 text-white">
                Enterprise-Grade Security & Compliance
              </h3>
              
              <p className="text-gray-300 mb-6">
                Fusion Data Co is fully compliant with industry regulations including GDPR, CCPA, HIPAA, and SOC 2 Type II. Our enterprise platform provides the security controls required by the most security-conscious organizations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <ShieldCheck className="w-8 h-8" />, label: "GDPR", color: "emerald" },
                  { icon: <Lock className="w-8 h-8" />, label: "HIPAA", color: "blue" },
                  { icon: <Award className="w-8 h-8" />, label: "SOC 2", color: "violet" },
                  { icon: <FileCheck className="w-8 h-8" />, label: "CCPA", color: "cyan" }
                ].map((compliance, index) => {
                  const colorMap = {
                    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'bg-emerald-500/5' },
                    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'bg-blue-500/5' },
                    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'bg-violet-500/5' },
                    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', glow: 'bg-cyan-500/5' }
                  };
                  const colors = colorMap[compliance.color as keyof typeof colorMap];
                  
                  return (
                    <div key={compliance.label} className="relative group">
                      {/* Ambient glow effect */}
                      <div className={`absolute -inset-1 ${colors.glow} rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                      
                      {/* Card content */}
                      <div className={`relative ${colors.bg} border ${colors.border} p-4 rounded-lg flex flex-col items-center justify-center hover:-translate-y-0.5 transition-all duration-300`}>
                        <div className={`${colors.text} mb-2`}>
                          {compliance.icon}
                        </div>
                        <span className={`text-xs font-medium ${colors.text}`}>{compliance.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}