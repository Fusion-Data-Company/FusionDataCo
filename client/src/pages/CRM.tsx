import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CTASection from "@/components/CTASection";
import CRMContactsDemo from "@/components/CRMContactsDemo";
import { Users, Database, Zap, PieChart, CheckCircle, Smartphone, Globe, Shield, ArrowRight } from "lucide-react";

export default function CRM() {
  const features = [
    {
      icon: <Users className="text-[#14ffc8]" size={28} />,
      title: "360° Contact View",
      description: "See complete customer data including communication history, purchases, website activity, and social interactions in one unified profile."
    },
    {
      icon: <Database className="text-[#ff0aff]" size={28} />,
      title: "Custom Fields & Tags",
      description: "Create unlimited custom fields and tags to track industry-specific data points and segment your contacts effectively."
    },
    {
      icon: <Zap className="text-[#8f00ff]" size={28} />,
      title: "Automated Workflows",
      description: "Design custom workflows that automatically assign tasks, send follow-ups, and update contact records based on triggers and conditions."
    },
    {
      icon: <PieChart className="text-[#00ffff]" size={28} />,
      title: "Advanced Analytics",
      description: "Gain insights with customizable dashboards showing deal flow, conversion rates, team performance, and revenue forecasts."
    }
  ];

  const integrations = [
    {
      title: "Email",
      description: "Sync with Gmail, Outlook, and other email providers. Track opens, clicks, and responses automatically."
    },
    {
      title: "Calendar",
      description: "Two-way sync with Google Calendar, Outlook, and other calendar apps for seamless appointment scheduling."
    },
    {
      title: "Social Media",
      description: "Connect LinkedIn, Twitter, and Facebook to track interactions and import contact information."
    },
    {
      title: "Marketing Tools",
      description: "Integrate with email marketing, SMS, and advertising platforms for unified campaign tracking."
    },
    {
      title: "Documents",
      description: "Create and share quotes, contracts, and proposals directly from the CRM with e-signature support."
    },
    {
      title: "Payment Processing",
      description: "Process payments through Stripe, PayPal, and other payment gateways without leaving the platform."
    }
  ];

  const whitelabelFeatures = [
    {
      icon: <Globe />,
      title: "Custom Domain",
      description: "Host the CRM on your own domain for a seamless brand experience."
    },
    {
      icon: <Smartphone />,
      title: "Branded Mobile App",
      description: "Provide clients with a mobile app featuring your branding for on-the-go access."
    },
    {
      icon: <Shield />,
      title: "Admin Controls",
      description: "Manage client accounts, permissions, and billing from a central dashboard."
    }
  ];

  return (
    <>
      <Helmet>
        <title>White-Label CRM Platform | Fusion Data Co</title>
        <meta name="description" content="A powerful, customizable CRM that adapts to your business workflows with complete white-labeling options for agencies and consultants." />
        <meta name="keywords" content="white-label CRM, custom CRM, marketing automation CRM, sales CRM, customer relationship management" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section 
            className="relative overflow-hidden bg-[#0b0b0d] py-20 md:py-28" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1642790106346-8caeba6ec76a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
              backgroundSize: "cover", 
              backgroundPosition: "center",
              backgroundBlendMode: "soft-light" 
            }}
          >
            <div className="absolute inset-0 bg-[#0b0b0d]/80"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Powerful CRM</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">That Works For You</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-300">
                  Our fully customizable CRM adapts to your unique business processes and can be white-labeled for your brand. Stop forcing your team to adapt to rigid CRM systems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/pricing">
                    <span className="px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] animate-[pulse-glow_3s_infinite] text-center cursor-pointer inline-block">
                      Start Your Free Trial
                    </span>
                  </Link>
                  <Link href="/#demo">
                    <span className="px-6 py-3 bg-transparent border border-[#8f00ff] text-white rounded-md font-medium hover:bg-[#8f00ff] hover:text-[#0b0b0d] transition-all duration-300 text-center cursor-pointer inline-block">
                      Schedule Demo
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CRM Features */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Features Built For</span>{" "}
                  <span className="text-[#ff0aff] [text-shadow:0_0_5px_#ff0aff]">Results</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Our CRM combines powerful features with intuitive design to help your team close more deals.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {features.map((feature, index) => (
                  <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-['Orbitron'] text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Dashboard Preview */}
          <section className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#1a1a1f] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-white">Powerful</span>{" "}
                  <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Contact Management</span>
                </h3>
                <p className="text-gray-400 mb-6">
                  Build stronger relationships by tracking all customer interactions in one place.
                  Our CRM helps you never miss a follow-up and close more deals.
                </p>
              </div>
              
              <div className="mb-16">
                {/* Contacts Demo Component */}
                <CRMContactsDemo />
              </div>
              
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-['Orbitron'] text-2xl md:text-3xl font-bold mb-6">
                      <span className="text-white">Visualize Your</span>{" "}
                      <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">Sales Pipeline</span>
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Track deals through customizable stages with our intuitive drag-and-drop interface. 
                      See probability-weighted forecasts and identify bottlenecks instantly.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={18} />
                        <p className="text-gray-300">Customizable pipeline stages to match your sales process</p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={18} />
                        <p className="text-gray-300">Visual deal progress with time-in-stage tracking</p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="text-[#14ffc8] mt-1 mr-3" size={18} />
                        <p className="text-gray-300">Detailed win/loss reporting with reason tracking</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" 
                      alt="CRM Pipeline View" 
                      className="rounded-lg shadow-lg border border-gray-700" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Integrations */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Seamless</span>{" "}
                  <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">Integrations</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Connect your favorite tools and services for a unified workflow and single source of truth.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {integrations.map((integration, index) => (
                  <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <h3 className="font-['Orbitron'] text-xl font-semibold mb-3 text-white">{integration.title}</h3>
                    <p className="text-gray-400">{integration.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link href="/#demo">
                  <span className="inline-flex items-center px-6 py-3 bg-transparent border border-[#00ffff] text-[#00ffff] rounded-md font-medium hover:bg-[#00ffff] hover:text-[#0b0b0d] transition-all duration-300 cursor-pointer">
                    See All Integrations <ArrowRight size={16} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          </section>
          
          {/* White Label Section */}
          <section className="py-16 bg-gradient-to-b from-[#1a1a1f] to-[#0b0b0d] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')]"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">White-Label</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Solutions</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Agencies and consultants can rebrand our CRM platform as their own, creating new revenue streams while delivering exceptional value to clients.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {whitelabelFeatures.map((feature, index) => (
                  <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mb-4 text-[#14ffc8]">
                      {feature.icon}
                    </div>
                    <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                    <h3 className="font-['Orbitron'] text-2xl font-semibold mb-4">Ready to offer CRM services?</h3>
                    <p className="text-gray-400">
                      Add CRM to your service offerings with zero development costs. We handle the technology while you focus on delivering value to clients.
                    </p>
                  </div>
                  <div className="md:w-1/3 text-center">
                    <Link href="/pricing">
                      <span className="px-6 py-3 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] inline-block cursor-pointer">
                        Partner With Us
                      </span>
                    </Link>
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