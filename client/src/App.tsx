import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { Helmet } from "react-helmet";
import { queryClient } from "./lib/queryClient";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ConversationalAI from "@/pages/ConversationalAI";
import MultiModelAgents from "@/pages/MultiModelAgents";
import CaseStudies from "@/pages/CaseStudies";
import Blog from "@/pages/Blog";
import SmallBusinessOwners from "@/pages/SmallBusinessOwners";
import RealEstate from "@/pages/RealEstate";
import Medical from "@/pages/Medical";
import Trades from "@/pages/Trades";
import CRM from "@/pages/CRM";
import CRMDashboard from "@/pages/CRMDashboard";
import Pricing from "@/pages/Pricing";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { EntropyDemo } from "@/components/demos/EntropyDemo";
import SocialMedia from "@/pages/SocialMedia";

// Import the proper Login page with Google authentication
import Login from "@/pages/Login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/MobileFooter";



// Marketing Automation Pages
import Campaigns from "@/pages/Campaigns";
import CampaignBuilder from "@/pages/CampaignBuilder";
import CrmCampaigns from "@/pages/CrmCampaigns";
import LeadMagnet from "@/pages/LeadMagnet";
import MarketingSuite from "@/pages/MarketingSuite";
import MarketingAutomations from "@/pages/MarketingAutomations";
import EmailCenter from "@/pages/EmailCenter";
import TelegramIntegrationPage from "@/pages/TelegramIntegrationPage";
import SmallBusinessUpgrade from "@/pages/SmallBusinessUpgrade";
import Leads from "@/pages/Leads";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/conversational-ai" component={ConversationalAI} />
      <Route path="/services/multi-model-agents" component={MultiModelAgents} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/blog" component={Blog} />
      <Route path="/small-business-upgrade" component={SmallBusinessUpgrade} />
      <Route path="/small-business-owners" component={SmallBusinessOwners} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/medical" component={Medical} />
      <Route path="/trades" component={Trades} />
      <Route path="/social-media" component={SocialMedia} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/leads" component={Leads} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/login" component={Login} />
      
      {/* Public CRM Marketing Page */}
      <Route path="/crm" component={CRM} />
      
      {/* Admin CRM Routes - Protected */}
      <Route path="/crm/dashboard" component={CRMDashboard} />
      <Route path="/crm/campaigns" component={CrmCampaigns} />
      <Route path="/crm/email-center" component={EmailCenter} />
      <Route path="/crm/telegram" component={TelegramIntegrationPage} />
      
      {/* Marketing Automation Routes */}
      <Route path="/campaign-builder" component={CampaignBuilder} />
      <Route path="/lead-magnet" component={LeadMagnet} />
      <Route path="/ai-marketing-suite" component={MarketingSuite} />
      <Route path="/automations" component={MarketingAutomations} />
      
      {/* Demo Components */}
      <Route path="/demos/entropy" component={EntropyDemo} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

// Import necessary authentication and analytics components
import AuthProtection from "@/components/AuthProtection";
import AnalyticsTracker from "@/components/AnalyticsTracker";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
            <meta name="theme-color" content="#0b0b0d" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            {/* JSON-LD structured data for SEO */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Fusion Data Co",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "49.00",
                  "priceCurrency": "USD"
                },
                "operatingSystem": "Web Browser"
              })}
            </script>
          </Helmet>
          <Toaster />
          {/* Mobile Header - only shows on mobile/tablet */}
          <MobileHeader />
          {/* Wrap Router with AuthProtection */}
          <AuthProtection>
            <Router />
          </AuthProtection>
          {/* Mobile Footer - only shows on mobile/tablet */}
          <MobileFooter />
          {/* Add analytics tracker component */}
          <AnalyticsTracker />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
