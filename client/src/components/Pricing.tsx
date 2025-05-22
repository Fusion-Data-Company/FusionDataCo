import { useState } from "react";
import { Link } from "wouter";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for solopreneurs and new businesses",
      price: 49,
      color: "text-[#14ffc8]",
      buttonClass: "bg-[#14ffc8] text-[#0b0b0d] hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8]",
      features: [
        "1 Website",
        "CRM (up to 500 contacts)",
        "5 Automation workflows",
        "AI chatbot (100 conversations)",
        "Social media (3 accounts)",
        "Email support"
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      price: 99,
      color: "text-[#8f00ff]",
      buttonClass: "bg-[#8f00ff] text-[#0b0b0d] hover:shadow-[0_0_5px_#8f00ff,0_0_10px_#8f00ff]",
      isPopular: true,
      features: [
        "3 Websites",
        "CRM (up to 2,500 contacts)",
        "Unlimited automation workflows",
        "AI chatbot (500 conversations)",
        "Social media (10 accounts)",
        "Priority support + training"
      ]
    },
    {
      name: "Enterprise",
      description: "For established businesses with high volume",
      price: 199,
      color: "text-[#00ffff]",
      buttonClass: "bg-[#00ffff] text-[#0b0b0d] hover:shadow-[0_0_5px_#00ffff,0_0_10px_#00ffff]",
      features: [
        "10 Websites",
        "CRM (unlimited contacts)",
        "Unlimited automation workflows",
        "AI chatbot (unlimited conversations)",
        "Social media (unlimited accounts)",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-[#0b0b0d]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Simple,</span>{" "}
            <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Transparent Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg">Choose the plan that works for your business. All plans include a 14-day free trial.</p>
        </div>
        
        {/* Pricing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className={`font-semibold ${!isYearly ? "text-[#14ffc8]" : "text-gray-400"}`}>Monthly</span>
          <div className="mx-4 relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input 
              type="checkbox" 
              id="pricing-toggle" 
              className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer" 
              checked={isYearly}
              onChange={() => setIsYearly(!isYearly)}
            />
            <span className={`absolute top-0 left-0 right-0 bottom-0 bg-[#1a1a1f] border border-gray-700 ${isYearly ? "bg-[#14ffc8]" : ""} rounded-full transition-all duration-300`}></span>
            <span className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? "translate-x-6" : ""}`}></span>
          </div>
          <span className={`font-semibold ${isYearly ? "text-[#14ffc8]" : "text-gray-400"}`}>
            Yearly <span className="text-xs text-[#ff0aff]">(Save 20%)</span>
          </span>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`backdrop-blur-md bg-[#121218]/70 rounded-xl border ${plan.isPopular ? 'border-2 border-[#8f00ff]' : 'border-gray-800'} overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 ${plan.isPopular ? 'transform scale-105 relative z-10' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-[#8f00ff] text-[#0b0b0d] py-1 px-3 text-xs font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 border-b border-gray-800">
                <h3 className="font-['Orbitron'] text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-end">
                  <span className="text-4xl font-['Orbitron'] font-bold text-white">
                    {formatPrice(plan.price, isYearly)}
                  </span>
                  <span className="text-gray-400 ml-1 mb-1">/month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="text-gray-400 space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={plan.color + " mt-1 mr-2"} size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/#demo">
                  <a className={`block w-full py-3 text-center ${plan.buttonClass} rounded-md font-medium transition-all duration-300`}>
                    Start Free Trial
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise Custom Option */}
        <div className="mt-12 backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4">Need a custom solution?</h3>
              <p className="text-gray-400">
                Contact our team for a tailored plan that addresses your specific business requirements. We can customize integrations, workflows, and AI training to match your unique processes.
              </p>
            </div>
            <div className="md:w-1/3 text-center">
              <Link href="/#demo">
                <a className="px-6 py-3 bg-transparent border border-[#14ffc8] text-[#14ffc8] rounded-md font-medium hover:bg-[#14ffc8] hover:text-[#0b0b0d] transition-all duration-300 inline-block">
                  Contact Sales
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
