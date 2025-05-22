import { Rocket, LineChart, Clock, Bot } from "lucide-react";

export default function ValueProposition() {
  const stats = [
    {
      icon: <Rocket className="text-[#00ffff]" size={24} />,
      title: "76% ROI",
      description: "Companies see positive ROI within one year of adopting our marketing automation"
    },
    {
      icon: <LineChart className="text-[#14ffc8]" size={24} />,
      title: "25% Higher",
      description: "Small businesses using automation see 25% higher marketing ROI on average"
    },
    {
      icon: <Clock className="text-[#ff0aff]" size={24} />,
      title: "12+ Hours",
      description: "Save over 12 hours per week on manual marketing tasks"
    },
    {
      icon: <Bot className="text-[#8f00ff]" size={24} />,
      title: "AI-Powered",
      description: "ElevenLabs AI agents handle customer inquiries 24/7"
    }
  ];

  return (
    <section className="py-16 bg-[#0b0b0d]">
      <div className="container mx-auto px-4">
        <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  index === 0 ? "bg-[#00ffff]/20" :
                  index === 1 ? "bg-[#14ffc8]/20" :
                  index === 2 ? "bg-[#ff0aff]/20" :
                  "bg-[#8f00ff]/20"
                }`}>
                  {stat.icon}
                </div>
                <h3 className="font-['Orbitron'] text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
