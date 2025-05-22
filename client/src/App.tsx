import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { Helmet } from "react-helmet";
import { queryClient } from "./lib/queryClient";

// Pages
import Home from "@/pages/Home";
import SmallBusiness from "@/pages/SmallBusiness";
import RealEstate from "@/pages/RealEstate";
import Medical from "@/pages/Medical";
import HomeServices from "@/pages/HomeServices";
import SocialMediaServices from "@/pages/SocialMediaServices";
import Pricing from "@/pages/Pricing";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/small-business" component={SmallBusiness} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/medical" component={Medical} />
      <Route path="/home-services" component={HomeServices} />
      <Route path="/social-media" component={SocialMediaServices} />
      <Route path="/pricing" component={Pricing} />
      <Route component={NotFound} />
    </Switch>
  );
}

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
          </Helmet>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
