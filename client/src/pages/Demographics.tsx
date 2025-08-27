import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle,
  MapPin,
  BarChart3,
  Search,
  Globe,
  Target,
  Zap,
  Building2,
  Home,
  Shield,
  DollarSign,
  ExternalLink,
  Map,
  Database,
  RefreshCw,
  Settings
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';

export default function Demographics() {
  const handleLiveDemoClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'demographics_live_demo'
    });
  };

  const handleWhiteLabelClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'demographics_white_label_demo'
    });
  };

  const handleContactClick = () => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: 'demographics_contact'
    });
  };

  return (
    <>
      <Helmet>
        <title>Demographics & Market Intelligence Platform | Fusion Data Co</title>
        <meta name="description" content="Revolutionary white-label real estate demographics and market analysis platform. Advanced scraping, mapping, and competitive analysis with customizable company-specific metrics." />
        <meta name="keywords" content="demographics analysis, real estate intelligence, market analysis, competitive analysis, white label platform" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Demographics & Market Intelligence Platform" />
        <meta property="og:description" content="Advanced demographics mapping and competitive analysis platform with white-label deployment." />
        <meta property="og:url" content="https://fusiondataco.com/demographics" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    ELITE REAL ESTATE INTELLIGENCE
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  Data Analytics Platform
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Revolutionary white-label real estate demographics and market analysis platform. 
                  Advanced scraping, mapping, and project analysis with customizable company-specific metrics.
                </p>
              </div>
            </div>
          </section>

          {/* Pain Section - Red band */}
          <section className="py-16 px-4 bg-gradient-to-b from-red-900/20 to-red-800/10">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/20">
                  Pain: Market Intelligence Gaps
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-400">
                  Why Real Estate Professionals Struggle with Data
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Fragmented Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Agents waste hours jumping between multiple platforms for demographics, comps, and market data. No unified view.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Manual Analysis Bottlenecks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Competitive analysis takes days of manual work. Market reports are outdated by the time they're complete.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader>
                    <AlertTriangle className="h-8 w-8 text-red-400 mb-3" />
                    <CardTitle className="text-red-400">Generic Tools, No Branding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Third-party platforms showcase their brand, not yours. Clients see you as a middleman, not the expert.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Solution Section - Yellow band (Information & Tools) */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-yellow-900/20 to-yellow-800/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                  Information & Strategy: Complete Market Intelligence
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-yellow-400">Data Analytics Platform</span> Features
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Everything you need for comprehensive market analysis in one unified, white-label platform
                </p>
              </div>

              {/* Main Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Advanced Scraping Engine */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Search className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">🔍 Advanced Scraping Engine</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Powered by Firecrawl and Crawl4AI, our platform delivers comprehensive data extraction 
                      from multiple sources with enterprise-grade reliability and speed.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Multiple API integrations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Real-time data indexing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Enterprise-grade performance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Demographics Mapping */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Map className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">🗺️ Interactive Demographics Mapping</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Click anywhere on our advanced maps and configure custom radius parameters to instantly 
                      access detailed demographic data tailored to your specific market requirements.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Custom radius selection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Configurable demographic sets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Multi-layer data visualization</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Automated Competitive Analysis */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <RefreshCw className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">📊 Automated Competitive Analysis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Set your company metrics once and let our platform run scheduled competitive analysis cycles, 
                      delivering insights from your unique business perspective automatically.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Scheduled analysis cycles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Company-specific viewpoints</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm">Custom metric configuration</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* White-Label Configuration */}
                <Card className="border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <Settings className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-yellow-400">White-Label Configuration</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Deploy the Data Analytics Platform under your company's brand with fully customizable 
                      search parameters, company-specific metrics, and automated competitive intelligence.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">One-Time Setup</h4>
                        <p className="text-sm text-muted-foreground">Configure your company's unique search criteria and analysis parameters</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">Automated Intelligence</h4>
                        <p className="text-sm text-muted-foreground">Continuous market analysis from your company's strategic perspective</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">Complete Branding</h4>
                        <p className="text-sm text-muted-foreground">Full white-label deployment with your company's visual identity</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Platform Features Overview */}
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold mb-8 text-yellow-400">🏢 Platform Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-yellow-400">Multiple</h4>
                    <p className="text-sm text-muted-foreground">Map Layers</p>
                  </div>
                  <div className="text-center">
                    <Database className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-yellow-400">API</h4>
                    <p className="text-sm text-muted-foreground">Integrations</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-yellow-400">Real-time</h4>
                    <p className="text-sm text-muted-foreground">Demographics</p>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-yellow-400">Automated</h4>
                    <p className="text-sm text-muted-foreground">Analysis</p>
                  </div>
                </div>
              </div>

              {/* Live Demo Section */}
              <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-background">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-yellow-400 mb-4">
                    🚀 Experience Data Analytics Live
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Access the full Data Analytics Platform for real estate demographics. 
                    No registration required - see the power of advanced market intelligence in action.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-background/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">🌐 Live Platform Access</h3>
                    <p className="text-muted-foreground mb-4">
                      Full access to all mapping tools, demographic analysis, and competitive intelligence features
                    </p>
                    <Button 
                      size="lg" 
                      onClick={handleLiveDemoClick}
                      className="bg-yellow-600 hover:bg-yellow-700 text-black font-semibold"
                      asChild
                    >
                      <a 
                        href="https://data-analytics-platform-demo.replit.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        🗺️ Launch Data Analytics Platform
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section - Green band (Good News) */}
          <section className="py-16 px-4 bg-gradient-to-b from-green-900/20 to-green-800/10">
            <div className="container mx-auto text-center">
              <Badge className="mb-4 bg-green-500/10 text-green-400 border-green-500/20">
                Good News: Your Branded Intelligence Platform
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Deploy <span className="text-green-400">White-Label Demographics</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Stop being the middleman. Become the market intelligence expert with your own branded 
                Data Analytics Platform, delivering automated insights that position you as the authority.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={handleWhiteLabelClick}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Request White-Label Demo
                </Button>
                <Link href="/contact" onClick={handleContactClick}>
                  <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
                    Schedule Strategy Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-green-500/20 hover:bg-green-500/10">
                    See Pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}