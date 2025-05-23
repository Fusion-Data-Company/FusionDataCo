import { Rocket, LineChart, Clock, Bot, BarChart4, TrendingUp, Briefcase, ShieldCheck } from "lucide-react";

export default function ValueProposition() {
  const stats = [
    {
      icon: <TrendingUp size={28} />,
      title: "189% ROI",
      description: "Enterprise clients achieve 189% ROI within 12 months of implementation",
      color: "primary"
    },
    {
      icon: <BarChart4 size={28} />,
      title: "47% Increase",
      description: "Average growth in qualified lead generation for enterprise clients",
      color: "accent"
    },
    {
      icon: <Briefcase size={28} />,
      title: "Enterprise Ready",
      description: "SOC 2 Type II compliant with dedicated enterprise support team",
      color: "secondary"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "99.99% Uptime",
      description: "Industry-leading SLA with guaranteed enterprise-grade reliability",
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
            <span className="text-foreground">Enterprise-Grade</span>{" "}
            <span className="text-primary text-shadow-titanium">Results</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Fortune 500 companies trust Fusion Data Co to deliver measurable business outcomes with our enterprise marketing platform
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
        
        {/* Enterprise client logos */}
        <div className="mt-16">
          <p className="text-sm text-muted-foreground text-center mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src="https://via.placeholder.com/120x30?text=Enterprise" alt="Enterprise Client" className="h-full" />
            </div>
            <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src="https://via.placeholder.com/120x30?text=Fortune500" alt="Fortune 500 Client" className="h-full" />
            </div>
            <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src="https://via.placeholder.com/120x30?text=GlobalCorp" alt="Global Corp" className="h-full" />
            </div>
            <div className="h-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img src="https://via.placeholder.com/120x30?text=TechLeader" alt="Tech Leader" className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
