import { Helmet } from 'react-helmet';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CTASection from "@/components/CTASection";
import { Users, Database, Zap, PieChart, Globe, Smartphone, Shield, ArrowRight, CheckCircle, Star, TrendingUp } from "lucide-react";

export default function CRM() {
  const features = [
    {
      icon: <Users className="text-[#14ffc8]" size={28} />,
      title: "Visitor Tracking",
      description: "Automatically capture every website visitor's journey, interactions, and engagement patterns in real-time."
    },
    {
      icon: <Database className="text-[#ff0aff]" size={28} />,
      title: "Lead Intelligence",
      description: "Enrich visitor data with contact information, company details, and behavioral insights for smarter targeting."
    },
    {
      icon: <Zap className="text-[#8f00ff]" size={28} />,
      title: "Automated Workflows",
      description: "Set up intelligent sequences that nurture leads based on their actions and engagement level automatically."
    },
    {
      icon: <PieChart className="text-[#00ffff]" size={28} />,
      title: "Conversion Analytics",
      description: "Track conversion paths, identify high-value visitors, and optimize your funnel for maximum ROI."
    }
  ];

  const whitelabelFeatures = [
    {
      icon: <Globe />,
      title: "Your Brand, Your Domain",
      description: "Complete white-labeling with custom domains, logos, and branding throughout the entire platform."
    },
    {
      icon: <Smartphone />,
      title: "Mobile-First Design",
      description: "Responsive CRM that works perfectly on all devices with native mobile app capabilities."
    },
    {
      icon: <Shield />,
      title: "Enterprise Security",
      description: "Bank-level security with SSO, role-based permissions, and compliance-ready data protection."
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="text-[#14ffc8]" size={24} />,
      title: "3x Higher Conversion",
      description: "Our clients see average conversion rate increases of 300% within 90 days of implementation."
    },
    {
      icon: <Star className="text-[#ff0aff]" size={24} />,
      title: "Zero Development Time",
      description: "Launch your white-label CRM in under 24 hours with full customization and branding."
    },
    {
      icon: <CheckCircle className="text-[#8f00ff]" size={24} />,
      title: "Revenue Sharing",
      description: "Earn recurring revenue from every client subscription with our generous partner program."
    }
  ];

  return (
    <>
      <Helmet>
        <title>White-Label CRM Platform | Fusion Data Co</title>
        <meta name="description" content="Revolutionary white-label CRM that automatically captures website visitors, tracks behavior, and converts leads into customers. Complete branding customization available." />
        <meta name="keywords" content="white-label CRM, visitor tracking, lead generation, website analytics, customer relationship management, automated workflows" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0b0b0d] via-[#121218] to-[#1a1a2e] py-20 md:py-28">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full border border-blue-500/30 mb-8">
                  <span className="text-sm font-medium text-blue-300">ENTERPRISE SOLUTION</span>
                </div>
                
                {/* Main heading */}
                <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-white">Enterprise-Grade</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-blue-500">
                    Marketing Platform
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  A comprehensive solution that combines <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400">advanced CRM</span>, <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400">analytics</span>, and <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400">AI-powered workflows</span> to transform your <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400">business operations</span> and <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400">accelerate growth</span>.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link href="/pricing">
                    <span className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer">
                      Start Free Trial
                    </span>
                  </Link>
                  <Link href="#demo">
                    <span className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800/50 transition-all duration-300 cursor-pointer">
                      Watch Demo
                    </span>
                  </Link>
                </div>
                
                {/* Key metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">10K+</div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">500+</div>
                    <div className="text-sm text-gray-400">Integrations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 bg-gradient-to-b from-[#121218] to-[#0b0b0d] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Turn Your Website Into a</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Lead Generation Machine</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Our white-label CRM automatically captures every visitor, tracks their behavior, and converts them into qualified leads—all under your brand.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {features.map((feature, index) => (
                  <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-['Orbitron'] text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Spider Web Analogy */}
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-2xl p-8 border border-gray-800 max-w-4xl mx-auto">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-[#14ffc8]">
                    Like a Spider Web for Your Business
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Just as a spider web captures everything that touches it, our CRM captures every visitor interaction, 
                    building a complete picture of your potential customers before they even make contact.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#14ffc8]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🕸️</span>
                      </div>
                      <h4 className="font-semibold mb-2">Capture</h4>
                      <p className="text-gray-400 text-sm">Every visitor leaves digital footprints</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#ff0aff]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h4 className="font-semibold mb-2">Analyze</h4>
                      <p className="text-gray-400 text-sm">AI identifies intent and interest level</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#8f00ff]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">💰</span>
                      </div>
                      <h4 className="font-semibold mb-2">Convert</h4>
                      <p className="text-gray-400 text-sm">Automated workflows nurture into sales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* White-Label Features */}
          <section className="py-16 bg-[#0b0b0d]">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Complete White-Label</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Customization</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Make it yours with complete branding control and custom domain hosting
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {whitelabelFeatures.map((feature, index) => (
                  <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-gray-800 hover:border-[#14ffc8] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-[#14ffc8]/20 flex items-center justify-center mb-6 text-[#14ffc8]">
                      {feature.icon}
                    </div>
                    <h3 className="font-['Orbitron'] text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center mb-4">
                      {benefit.icon}
                      <h3 className="font-semibold ml-3">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-b from-[#0b0b0d] to-[#121218]">
            <div className="container mx-auto px-4">
              <div className="backdrop-blur-md bg-[#121218]/70 rounded-2xl p-12 border border-gray-800 max-w-4xl mx-auto text-center">
                <h2 className="font-['Orbitron'] text-3xl font-bold mb-4">
                  Ready to Launch Your Own CRM Platform?
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Join hundreds of agencies and consultants who are building recurring revenue streams with our white-label CRM solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing">
                    <span className="px-8 py-4 bg-[#14ffc8] text-[#0b0b0d] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#14ffc8]/25 transition-all duration-300 cursor-pointer">
                      Start Free Trial
                    </span>
                  </Link>
                  <Link href="/contact">
                    <span className="px-8 py-4 border border-[#14ffc8] text-[#14ffc8] rounded-lg font-semibold hover:bg-[#14ffc8] hover:text-[#0b0b0d] transition-all duration-300 cursor-pointer">
                      Schedule Demo
                    </span>
                  </Link>
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