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
import SmallBusinessOwners from "@/pages/SmallBusinessOwners";
import RealEstate from "@/pages/RealEstate";
import Medical from "@/pages/Medical";
import Trades from "@/pages/Trades";
import CRM from "@/pages/CRM";
import Pricing from "@/pages/Pricing";
import NotFound from "@/pages/not-found";

// We'll implement these pages directly to avoid import issues
function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card border border-border/50 p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <p className="text-center mb-4 text-muted-foreground">
          Access your Fusion Data Co dashboard
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full p-2 border border-border rounded-md bg-background" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full p-2 border border-border rounded-md bg-background" placeholder="••••••••" />
          </div>
          <button className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium">Sign in</button>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="max-w-2xl mx-auto bg-card border border-border/50 p-8 rounded-lg">
          <p className="text-center mb-6 text-muted-foreground">
            Have questions about our platform? Our team is here to help.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border border-border rounded-md bg-background" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border border-border rounded-md bg-background" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea className="w-full p-2 border border-border rounded-md bg-background h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Marketing Automation Pages
import Campaigns from "@/pages/Campaigns";
import CampaignBuilder from "@/pages/CampaignBuilder";
import CrmCampaigns from "@/pages/CrmCampaigns";
import LeadMagnet from "@/pages/LeadMagnet";
import MarketingSuite from "@/pages/MarketingSuite";
import MarketingAutomations from "@/pages/MarketingAutomations";
import EmailCenter from "@/pages/EmailCenter";
import TelegramIntegrationPage from "@/pages/TelegramIntegrationPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/small-business-owners" component={SmallBusinessOwners} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/medical" component={Medical} />
      <Route path="/trades" component={Trades} />
      <Route path="/social-media" component={Campaigns} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      
      {/* CRM Routes - Protected */}
      <Route path="/crm" component={CRM} />
      <Route path="/crm/campaigns" component={CrmCampaigns} />
      <Route path="/crm/email-center" component={EmailCenter} />
      <Route path="/crm/telegram" component={TelegramIntegrationPage} />
      
      {/* Marketing Automation Routes */}
      <Route path="/campaign-builder" component={CampaignBuilder} />
      <Route path="/lead-magnet" component={LeadMagnet} />
      <Route path="/ai-marketing-suite" component={MarketingSuite} />
      <Route path="/automations" component={MarketingAutomations} />
      
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
          {/* Wrap Router with AuthProtection */}
          <AuthProtection>
            <Router />
          </AuthProtection>
          {/* Add analytics tracker component */}
          <AnalyticsTracker />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
