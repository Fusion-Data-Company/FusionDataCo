import { useState } from "react";
import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CTASection from "@/components/CTASection";
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

  const socialMediaPlans = [
    {
      name: "Social Starter",
      description: "Basic social media automation",
      price: 29,
      color: "text-[#14ffc8]",
      buttonClass: "bg-[#14ffc8] text-[#0b0b0d] hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8]",
      features: [
        "3 Social accounts",
        "30 scheduled posts/month",
        "Basic analytics",
        "Content calendar",
        "Basic AI caption generation",
        "Email support"
      ]
    },
    {
      name: "Social Pro",
      description: "Complete social media management",
      price: 79,
      color: "text-[#ff0aff]",
      buttonClass: "bg-[#ff0aff] text-[#0b0b0d] hover:shadow-[0_0_5px_#ff0aff,0_0_10px_#ff0aff]",
      isPopular: true,
      features: [
        "10 Social accounts",
        "Unlimited scheduled posts",
        "Advanced analytics dashboard",
        "Content calendar & recycling",
        "Advanced AI content creation",
        "Priority support"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing | Fusion Data Co</title>
        <meta name="description" content="Affordable marketing automation plans for businesses of all sizes. Choose from Starter, Professional, and Enterprise packages with a 14-day free trial." />
        <meta name="keywords" content="marketing automation pricing, small business CRM pricing, social media automation cost, AI chatbot pricing" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Simple,</span>{" "}
                  <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Transparent Pricing</span>
                </h1>
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
              
              {/* All-in-One Platform Pricing Cards */}
              <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-8 text-center">
                All-in-One Marketing Platform
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
              
              {/* Social Media Only Plans */}
              <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-8 text-center mt-16">
                Social Media Only Plans
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                {socialMediaPlans.map((plan, index) => (
                  <div 
                    key={index} 
                    className={`backdrop-blur-md bg-[#121218]/70 rounded-xl border ${plan.isPopular ? 'border-2 border-[#ff0aff]' : 'border-gray-800'} overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 ${plan.isPopular ? 'transform md:scale-105 relative z-10' : ''}`}
                  >
                    {plan.isPopular && (
                      <div className="absolute top-0 right-0 bg-[#ff0aff] text-[#0b0b0d] py-1 px-3 text-xs font-semibold">
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
              <div className="mt-12 backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-4xl mx-auto">
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
          
          {/* FAQ Section */}
          <section className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#1a1a1f] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-['Orbitron'] text-3xl font-bold mb-8 text-center">
                  <span className="text-white">Frequently Asked</span>{" "}
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Questions</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold mb-2">Do I need a credit card to start the free trial?</h3>
                    <p className="text-gray-400">No, you don't need to provide credit card information to start your 14-day free trial. You'll only be asked for payment details when you decide to continue with a paid plan after your trial ends.</p>
                  </div>
                  
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold mb-2">Can I upgrade or downgrade my plan later?</h3>
                    <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to the new features, and we'll prorate your bill. When downgrading, changes will take effect at the start of your next billing cycle.</p>
                  </div>
                  
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold mb-2">Is there a setup fee?</h3>
                    <p className="text-gray-400">No, there are no setup fees for any of our plans. You'll only pay the monthly or annual subscription cost of the plan you choose.</p>
                  </div>
                  
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold mb-2">What happens when I reach my usage limits?</h3>
                    <p className="text-gray-400">When you approach your usage limits (like contact count or chatbot conversations), you'll receive a notification giving you the option to upgrade to a higher tier plan. Your service won't be interrupted, but you may need to upgrade to continue adding new contacts or using certain features.</p>
                  </div>
                  
                  <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold mb-2">Do you offer discounts for nonprofits or educational institutions?</h3>
                    <p className="text-gray-400">Yes, we offer special pricing for qualified nonprofits and educational institutions. Please contact our sales team to learn more about our discount programs.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <CTASection />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}
