import { Server, Laptop, Bot, Cog, MessageSquare, PieChart, Check } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Server className="text-3xl" />,
      title: "White-Label CRM",
      description: "Manage contacts, track interactions, and nurture leads—all under your own brand.",
      benefits: ["Custom branding options", "Lead scoring & tracking", "Email integration"],
      color: "text-[#14ffc8]",
      borderHover: "hover:border-[#14ffc8]"
    },
    {
      icon: <Laptop className="text-3xl" />,
      title: "Business Website Builder",
      description: "Create stunning, conversion-optimized websites with no coding required.",
      benefits: ["Drag-and-drop interface", "Mobile-responsive templates", "Built-in SEO tools"],
      color: "text-[#ff0aff]",
      borderHover: "hover:border-[#ff0aff]"
    },
    {
      icon: <Bot className="text-3xl" />,
      title: "AI-Powered Agents",
      description: "ElevenLabs AI agents qualify leads and handle customer inquiries 24/7.",
      benefits: ["Natural language processing", "Automated follow-ups", "Lead qualification"],
      color: "text-[#00ffff]",
      borderHover: "hover:border-[#00ffff]"
    },
    {
      icon: <Cog className="text-3xl" />,
      title: "Automation Workflows",
      description: "Create custom workflows using n8n/Make to automate repetitive marketing tasks.",
      benefits: ["No-code automation builder", "Multi-step workflows", "Integration with 300+ apps"],
      color: "text-[#8f00ff]",
      borderHover: "hover:border-[#8f00ff]"
    },
    {
      icon: <MessageSquare className="text-3xl" />,
      title: "Social Media Automation",
      description: "Schedule posts, monitor engagement, and analyze performance across platforms.",
      benefits: ["Multi-channel posting", "Content calendar", "Analytics dashboard"],
      color: "text-[#14ffc8]",
      borderHover: "hover:border-[#14ffc8]"
    },
    {
      icon: <PieChart className="text-3xl" />,
      title: "Analytics & Reporting",
      description: "Track performance with real-time dashboards and custom reports.",
      benefits: ["Customizable dashboards", "ROI tracking", "Exportable reports"],
      color: "text-[#ff0aff]",
      borderHover: "hover:border-[#ff0aff]"
    }
  ];

  return (
    <section className="py-16 bg-[#0b0b0d] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">One Platform.</span>{" "}
            <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Unlimited Potential.</span>
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to automate your marketing and grow your business.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 transition-all duration-300 ${feature.borderHover}`}>
              <div className={`${feature.color} mb-4 text-3xl`}>
                {feature.icon}
              </div>
              <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <ul className="text-gray-400 space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`${feature.color} mt-1 mr-2`} size={16} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
