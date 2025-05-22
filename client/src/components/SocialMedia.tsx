import { Link } from "wouter";
import { Calendar, Wand2, BarChart, CheckCircle } from "lucide-react";

export default function SocialMedia() {
  const features = [
    {
      icon: <Calendar className="text-[#14ffc8]" size={28} />,
      title: "Content Calendar",
      description: "Visualize and plan your social media content across platforms with our intuitive calendar interface."
    },
    {
      icon: <Wand2 className="text-[#ff0aff]" size={28} />,
      title: "AI Content Creation",
      description: "Generate engaging posts, captions, and hashtags with our AI-powered content assistant."
    },
    {
      icon: <BarChart className="text-[#00ffff]" size={28} />,
      title: "Analytics Dashboard",
      description: "Track engagement, growth, and ROI across all your social media channels in one place."
    }
  ];

  const benefits = [
    "Schedule posts across multiple platforms",
    "Recycle evergreen content automatically",
    "Respond to comments and messages with AI",
    "Generate monthly performance reports"
  ];

  return (
    <section id="social-media" className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#1a1a1f] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Social Media</span>{" "}
            <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Automation</span>
          </h2>
          <p className="text-gray-400 text-lg">Schedule, publish, and analyze your social media content across all platforms.</p>
        </div>
        
        {/* Social Media Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
              <div className="mb-4 text-3xl">
                {feature.icon}
              </div>
              <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Social Media Dashboard Preview */}
        <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 overflow-hidden relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4">
                Streamline Your <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Social Media Workflow</span>
              </h3>
              <p className="text-gray-400 mb-6">
                Our social media automation tools help you maintain a consistent presence across all platforms without the daily grind.
              </p>
              <ul className="text-gray-400 space-y-4 mb-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-[#14ffc8] mt-1 mr-3 text-lg" size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing">
                <span className="px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] transition-all duration-300 inline-block cursor-pointer">
                  View Social Media Plans
                </span>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
                alt="Social media automation dashboard" 
                className="rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-500 hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
