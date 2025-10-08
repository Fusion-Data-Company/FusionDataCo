import { Link } from "wouter";
import { Users, BarChart2, Clock, Layers, ArrowRight, UserCheck, MessageSquare, Activity } from "lucide-react";

export default function CRMSection() {
  const features = [
    {
      icon: <Users className="text-[#14ffc8]" size={24} />,
      title: "Contact Management",
      description: "Centralize all your customer data in one place with comprehensive contact profiles, interaction history, and custom fields.",
    },
    {
      icon: <Layers className="text-[#ff0aff]" size={24} />,
      title: "Pipeline Management",
      description: "Visualize your sales process with customizable pipelines and stages. Drag-and-drop deals and track progress in real-time.",
    },
    {
      icon: <Clock className="text-[#8f00ff]" size={24} />,
      title: "Task Automation",
      description: "Set up automated workflows to assign tasks, send follow-up reminders, and update contact records automatically.",
    },
    {
      icon: <BarChart2 className="text-[#00ffff]" size={24} />,
      title: "Analytics Dashboard",
      description: "Track key metrics like conversion rates, deal values, and sales velocity with beautiful, actionable dashboards.",
    },
  ];

  const benefits = [
    {
      icon: <UserCheck />,
      title: "Higher Conversion Rates",
      description: "Companies using our CRM see a 27% increase in lead-to-customer conversion rates through better tracking and follow-up.",
    },
    {
      icon: <MessageSquare />,
      title: "Improved Customer Experience",
      description: "Never miss important follow-ups with automated reminders and personalized communication templates.",
    },
    {
      icon: <Activity />,
      title: "Increased Sales Productivity",
      description: "Sales teams spend 62% more time selling and less time on administrative tasks with our streamlined workflows.",
    },
  ];

  return (
    <section id="crm" className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#121218] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">White-Label</span>{" "}
            <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">CRM Platform</span>
          </h2>
          <p className="text-gray-400 text-lg">
            A powerful, customizable CRM that adapts to your business workflows—not the other way around.
          </p>
        </div>

        {/* CRM Dashboard Preview */}
        <div className="relative mb-16 rounded-xl overflow-hidden backdrop-blur-md bg-[#121218]/50 border border-gray-800 p-3">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0b0b0d] via-transparent to-transparent opacity-70"></div>
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
            alt="CRM Dashboard" 
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
            <h3 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-4 text-white">
              Powerful <span className="text-[#14ffc8]">Analytics</span> & <span className="text-[#ff0aff]">Insights</span>
            </h3>
            <p className="text-gray-300 mb-4 max-w-2xl">
              Track your sales pipeline, monitor team performance, and identify growth opportunities with our intuitive dashboards.
            </p>
          </div>
        </div>
        
        {/* CRM Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
              <div className="mb-4 text-3xl">
                {feature.icon}
              </div>
              <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Results Section */}
        <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 mb-16">
          <h3 className="font-['Orbitron'] text-2xl font-semibold mb-6 text-center">
            <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Real Results</span> with Our CRM
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-[#1a1a1f]/50 p-6 rounded-lg">
                <div className="mb-4 w-12 h-12 rounded-full bg-[#14ffc8]/20 flex items-center justify-center text-[#14ffc8]">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* White Label CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4">
            <span className="text-white">Your Brand,</span>{" "}
            <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Our Technology</span>
          </h3>
          <p className="text-gray-400 mb-6">
            Our white-label CRM can be fully customized with your brand's colors, logo, and domain name.
            Offer your clients a premium CRM experience while building your own brand equity.
          </p>
          <Link href="/pricing">
            <span className="inline-flex items-center px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] transition-all duration-300 cursor-pointer">
              Explore White-Label Options <ArrowRight size={16} className="ml-2" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}