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
import Demographics from "@/pages/Demographics";
import Media from "@/pages/Media";
import Blog from "@/pages/Blog";
import BlogAdmin from "@/pages/BlogAdmin";
import GolfBagBlogPost from "@/pages/GolfBagBlogPost";
import BlogPost from "@/pages/BlogPost";
import SmallBusinessOwners from "@/pages/SmallBusinessOwners";
import RealEstate from "@/pages/RealEstate";
import Medical from "@/pages/Medical";
import Trades from "@/pages/Trades";
import CRM from "@/pages/CRM";
import CRMDashboard from "@/pages/CRMDashboard";
import Pricing from "@/pages/Pricing";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Partners from "@/pages/Partners";
import { EntropyDemo } from "@/components/demos/EntropyDemo";

const AutomationDashboard = React.lazy(() => import("@/pages/AutomationDashboard"));
import SocialMedia from "@/pages/SocialMedia";
import FunnelsPage from "@/pages/Funnels";

// Import the proper Login page with Google authentication
import Login from "@/pages/Login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";



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
      <Route path="/demographics" component={Demographics} />
      <Route path="/media" component={Media} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/admin" component={BlogAdmin} />
      <Route path="/blog/golf-bag-approach-multi-model-ai" component={GolfBagBlogPost} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin/automation" component={() => <Suspense fallback={<div>Loading...</div>}><AutomationDashboard /></Suspense>} />
      <Route path="/small-business-upgrade" component={SmallBusinessUpgrade} />
      <Route path="/small-business-owners" component={SmallBusinessOwners} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/medical" component={Medical} />
      <Route path="/trades" component={Trades} />
      <Route path="/social-media" component={SocialMedia} />
      <Route path="/funnels" component={FunnelsPage} />
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
      
      {/* Legal Pages */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/partners" component={Partners} />
      
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
            {/* Enhanced JSON-LD structured data for FUSION SEO */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "FUSION Data Co",
                "alternateName": "FUSION Enterprise Automation Platform",
                "description": "Enterprise AI-powered business automation platform featuring FUSION technology, conversational agents, and multi-model AI routing systems.",
                "applicationCategory": "BusinessApplication",
                "applicationSubCategory": "Enterprise Automation Software",
                "operatingSystem": "Web Browser",
                "softwareVersion": "2.0",
                "releaseNotes": "Advanced FUSION technology integration with multi-model AI routing",
                "offers": [
                  {
                    "@type": "Offer",
                    "name": "FUSION Launch Plan",
                    "price": "799.00",
                    "priceCurrency": "USD",
                    "priceSpecification": {
                      "@type": "UnitPriceSpecification",
                      "price": "799.00",
                      "priceCurrency": "USD",
                      "unitText": "monthly"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "name": "FUSION Growth Plan",
                    "price": "1799.00",
                    "priceCurrency": "USD",
                    "priceSpecification": {
                      "@type": "UnitPriceSpecification",
                      "price": "1799.00", 
                      "priceCurrency": "USD",
                      "unitText": "monthly"
                    }
                  },
                  {
                    "@type": "Offer",
                    "name": "FUSION Scale Plan", 
                    "price": "4499.00",
                    "priceCurrency": "USD",
                    "priceSpecification": {
                      "@type": "UnitPriceSpecification",
                      "price": "4499.00",
                      "priceCurrency": "USD", 
                      "unitText": "monthly"
                    }
                  }
                ],
                "provider": {
                  "@type": "Organization",
                  "name": "FUSION Data Co",
                  "url": "https://fusiondataco.com",
                  "logo": "https://fusiondataco.com/favicon.svg",
                  "description": "Leading provider of enterprise FUSION automation solutions"
                },
                "url": "https://fusiondataco.com",
                "mainEntityOfPage": "https://fusiondataco.com",
                "keywords": "FUSION automation, enterprise AI, conversational agents, multi-model AI routing, business automation",
                "featureList": [
                  "FUSION-powered conversational AI agents",
                  "Multi-model AI routing systems", 
                  "Enterprise automation workflows",
                  "Intelligent data FUSION",
                  "Voice and SMS automation",
                  "CRM integration and analytics"
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "847",
                  "bestRating": "5"
                }
              })}
            </script>
          </Helmet>
          <Toaster />
          {/* Wrap Router with AuthProtection */}
          <AuthProtection>
            <Router />
          </AuthProtection>
          {/* Mobile Footer - only shows on mobile/tablet */}
          <MobileFooter />
          {/* Add analytics tracker component */}
          <AnalyticsTracker />
          {/* ElevenLabs Widget - appears on all pages */}
          <ElevenLabsWidget />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
