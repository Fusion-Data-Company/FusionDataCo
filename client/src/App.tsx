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
import CRMDashboard from "@/pages/CRMDashboard";
import Pricing from "@/pages/Pricing";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { EntropyDemo } from "@/components/demos/EntropyDemo";
import SocialMediaCampaign from "@/pages/SocialMediaCampaign";

// We'll implement these pages directly to avoid import issues
import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { trackEvent } from "@/components/AnalyticsTracker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/MobileFooter";

function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get redirect parameter from URL if exists
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get('redirect') || '/crm/dashboard';
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate authentication (in a real app, this would call an API)
    setTimeout(() => {
      // Simple validation
      if (username === 'admin' && password === 'admin123') {
        // Store auth token in localStorage
        localStorage.setItem('auth_token', 'demo_token_123');
        
        // Track successful login
        trackEvent({
          category: 'authentication',
          action: 'login',
          label: 'manual_login'
        });
        
        // Redirect to the dashboard or specified redirect URL
        setLocation(redirectTo);
      } else {
        setError('Invalid username or password');
        
        // Track failed login attempt
        trackEvent({
          category: 'authentication',
          action: 'login_failed',
          label: 'invalid_credentials'
        });
      }
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-[#121218]/70 rounded-xl p-8 border border-[#333340]">
            <div className="mb-6 text-center">
              <h1 className="font-['Orbitron'] text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to access your dashboard</p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-md border border-[#333340] bg-[#0a0a0d] px-4 py-3 text-white placeholder-gray-500 focus:border-[#14ffc8] focus:outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <a href="#" className="text-sm text-[#14ffc8] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-[#333340] bg-[#0a0a0d] px-4 py-3 text-white placeholder-gray-500 focus:border-[#14ffc8] focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Demo credentials: username <span className="text-[#14ffc8]">admin</span> / password <span className="text-[#14ffc8]">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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
import SmallBusinessUpgrade from "@/pages/SmallBusinessUpgrade";
import Leads from "@/pages/Leads";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/small-business-upgrade" component={SmallBusinessUpgrade} />
      <Route path="/small-business-owners" component={SmallBusinessOwners} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/medical" component={Medical} />
      <Route path="/trades" component={Trades} />
      <Route path="/social-media" component={SocialMediaCampaign} />
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
