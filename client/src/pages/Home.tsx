import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Features from "@/components/Features";
import IndustrySolutions from "@/components/IndustrySolutions";
import SocialMedia from "@/components/SocialMedia";
import CRMSection from "@/components/CRMSection";
import Pricing from "@/components/Pricing";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import ChatBot from "@/components/ChatBot";
import AIContentDemo from "@/components/AIContentDemo";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Fusion Data Co - Complete Business Automation Platform</title>
        <meta name="description" content="Fusion Data Co provides a comprehensive white-label business platform with integrated CRM, custom websites, AI-powered email marketing, and social media automation. Streamline your entire business operation." />
        <meta name="keywords" content="marketing automation, N8N automations, AI lead generation, small business marketing automation, social content workflows, white-label CRM" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fusion Data Co - Complete Business Automation Platform" />
        <meta property="og:description" content="White-label business platform combining custom websites, integrated CRM, AI email marketing, and social media automation. One platform for complete business operations." />
        <meta property="og:url" content="https://fusiondataco.com" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          <Hero />
          <ValueProposition />
          <Features />
          <IndustrySolutions />
          
          {/* AI Content Demo Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8f00ff]/5 z-0"></div>
            <div className="absolute -inset-1/2 bg-[#8f00ff]/3 blur-3xl rounded-full opacity-10 z-0"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Experience</span>{" "}
                  <span className="text-[#8f00ff] [text-shadow:0_0_5px_#8f00ff]">AI-Powered Content</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  See how our AI creates personalized marketing content for your specific business type. 
                  Try the interactive demo below and discover content that actually converts.
                </p>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <AIContentDemo />
              </div>
            </div>
          </section>
          

          <SocialMedia />
          <Pricing />
          <CTASection />
          <ContactForm />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}
