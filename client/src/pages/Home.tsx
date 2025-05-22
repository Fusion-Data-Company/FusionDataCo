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

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Fusion Data Co - All-in-One Marketing Automation Platform</title>
        <meta name="description" content="Fusion Data Co provides an all-in-one marketing automation platform combining CRM, website building, and AI-powered workflows to help small businesses generate leads and grow." />
        <meta name="keywords" content="marketing automation, N8N automations, AI lead generation, small business marketing automation, social content workflows, white-label CRM" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fusion Data Co - All-in-One Marketing Automation Platform" />
        <meta property="og:description" content="Next-gen marketing automation platform for small businesses. Combine CRM, website building, and AI-powered workflows." />
        <meta property="og:url" content="https://fusiondataco.com" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0b0b0d] text-white">
        <Header />
        <main className="flex-grow">
          <Hero />
          <ValueProposition />
          <Features />
          <IndustrySolutions />
          <CRMSection />
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
