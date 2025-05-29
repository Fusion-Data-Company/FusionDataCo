import { Rocket, LineChart, Clock, Bot, BarChart4, TrendingUp, Briefcase, ShieldCheck } from "lucide-react";

export default function ValueProposition() {
  const stats = [
    {
      icon: <TrendingUp size={28} />,
      title: "N8N & Make.com Automation",
      description: "Professional workflow development with multi-platform integrations and custom lead generation pipelines",
      color: "primary"
    },
    {
      icon: <BarChart4 size={28} />,
      title: "Go High Level CRM",
      description: "Complete funnel implementation, lead generation pipelines, and sales team efficiency optimization",
      color: "accent"
    },
    {
      icon: <Bot size={28} />,
      title: "AI & Voice Technology",
      description: "ElevenLabs voice synthesis, multi-step AI agents, and LLM integration with Claude, GPT, OpenRouter.io",
      color: "secondary"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Custom CRM MCP Servers",
      description: "Custom CRM MCP servers enabling seamless business data and workspace interaction through Claude 3.7 Sonnet",
      color: "muted-foreground"
    }
  ];

  return (
    <section className="py-20 bg-background relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4 text-center">
            <span className="text-foreground">Complete Business</span>{" "}
            <span className="text-primary text-shadow-titanium">Automation</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Small businesses trust Fusion Data Co to streamline their entire operation with our white-label business platform
          </p>
        </div>
        
        <div className="titanium-panel rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-panel p-6 rounded-lg hover-edge-glow transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 bg-${stat.color}/10 border border-${stat.color}/20`}>
                  <div className={`text-${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="font-['Orbitron'] text-xl font-semibold mb-3 text-foreground">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Industries we serve */}
        <div className="mt-16">
          <p className="text-sm text-muted-foreground text-center mb-8">SERVING SMALL BUSINESSES ACROSS INDUSTRIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-sm text-muted-foreground">
            <div className="hover:text-primary transition-colors">Real Estate</div>
            <div className="hover:text-primary transition-colors">Medical Practices</div>
            <div className="hover:text-primary transition-colors">Trade Services</div>
            <div className="hover:text-primary transition-colors">Professional Services</div>
            <div className="hover:text-primary transition-colors">E-commerce</div>
          </div>
        </div>
      </div>
    </section>
  );
}
