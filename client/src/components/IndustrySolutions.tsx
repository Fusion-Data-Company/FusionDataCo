import { Link } from "wouter";
import { Check, X } from "lucide-react";

interface IndustrySolution {
  title: string;
  image: string;
  link: string;
  linkText: string;
  linkColor: string;
  iconColor: string;
  hoverColor: string;
  painPoints: string[];
  solutions: string[];
}

export default function IndustrySolutions() {
  const solutions: IndustrySolution[] = [
    {
      title: "Small Business Owners",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/small-business",
      linkText: "Learn More",
      linkColor: "bg-[#14ffc8] text-[#0b0b0d]",
      iconColor: "text-[#14ffc8]",
      hoverColor: "hover:border-[#14ffc8] hover:shadow-[0_0_5px_#14ffc8]",
      painPoints: [
        "Missing leads due to slow response times",
        "Spending too much on ineffective marketing",
        "Lack of consistent customer follow-up",
      ],
      solutions: [
        "All-in-one platform to manage all marketing efforts",
        "AI lead qualification and instant follow-up",
        "ROI tracking for all marketing campaigns",
      ],
    },
    {
      title: "Real Estate Professionals",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/real-estate",
      linkText: "Learn More",
      linkColor: "bg-[#ff0aff] text-[#0b0b0d]",
      iconColor: "text-[#ff0aff]",
      hoverColor: "hover:border-[#ff0aff] hover:shadow-[0_0_5px_#ff0aff]",
      painPoints: [
        "Losing track of potential buyer leads",
        "Time wasted on manual property listing updates",
        "Difficulty staying top-of-mind with past clients",
      ],
      solutions: [
        "Automated lead nurturing for buyers and sellers",
        "Property listing syndication across platforms",
        "Scheduled check-ins with past clients",
      ],
    },
    {
      title: "Medical Practices",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/medical",
      linkText: "Learn More",
      linkColor: "bg-[#00ffff] text-[#0b0b0d]",
      iconColor: "text-[#00ffff]",
      hoverColor: "hover:border-[#00ffff] hover:shadow-[0_0_5px_#00ffff]",
      painPoints: [
        "High no-show rate for appointments",
        "Inefficient patient intake processes",
        "Limited patient education resources",
      ],
      solutions: [
        "Automated appointment reminders",
        "Digital intake form workflows",
        "Personalized patient follow-up sequences",
      ],
    },
    {
      title: "Home Services",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      link: "/home-services",
      linkText: "Learn More",
      linkColor: "bg-[#8f00ff] text-[#0b0b0d]",
      iconColor: "text-[#8f00ff]",
      hoverColor: "hover:border-[#8f00ff] hover:shadow-[0_0_5px_#8f00ff]",
      painPoints: [
        "Missing calls while on the job",
        "Inefficient scheduling and dispatching",
        "Limited recurring customer revenue",
      ],
      solutions: [
        "AI call answering and booking",
        "Smart scheduling with SMS notifications",
        "Automated maintenance reminders",
      ],
    },
  ];

  return (
    <section id="solutions" className="py-16 bg-[#0b0b0d]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Solutions For Your</span>{" "}
            <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Industry</span>
          </h2>
          <p className="text-gray-400 text-lg">Tailored marketing automation for your specific business needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={`backdrop-blur-md bg-[#121218]/70 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 group ${solution.hoverColor}`}
            >
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: `url('${solution.image}')` }}
              >
                <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-all duration-300">
                  <h3 className="font-['Orbitron'] text-2xl font-bold text-white">{solution.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-['Orbitron'] text-lg font-semibold mb-2 text-white">Pain Points:</h4>
                  <ul className="text-gray-400 space-y-2">
                    {solution.painPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <X className="text-red-500 mt-1 mr-2" size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="font-['Orbitron'] text-lg font-semibold mb-2 text-white">Our Solution:</h4>
                  <ul className="text-gray-400 space-y-2">
                    {solution.solutions.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={solution.iconColor + " mt-1 mr-2"} size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={solution.link}>
                  <span className={`block w-full py-3 ${solution.linkColor} rounded-md font-medium text-center hover:shadow-[0_0_5px_currentColor] transition-all duration-300 cursor-pointer`}>
                    {solution.linkText}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
