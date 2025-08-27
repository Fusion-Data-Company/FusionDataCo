import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import MobileFeatures from "@/components/MobileFeatures";
import SocialMedia from "@/components/SocialMedia";
import CRMSection from "@/components/CRMSection";
import AIContentDemo from "@/components/AIContentDemo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap, Globe, MessageSquare, BarChart3, ExternalLink, Laptop, Phone } from "lucide-react";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services - Marketing Automation & CRM Solutions | Fusion Data Co</title>
        <meta name="description" content="Explore our comprehensive suite of marketing automation services including CRM integration, AI-powered content generation, social media management, and lead generation tools." />
        <meta name="keywords" content="marketing automation services, CRM solutions, AI content generation, social media management, lead generation, email marketing, workflow automation" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Services - Marketing Automation & CRM Solutions | Fusion Data Co" />
        <meta property="og:description" content="Transform your business with our complete marketing automation platform. CRM, AI content, social media, and more." />
        <meta property="og:url" content="https://fusiondataco.com/services" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8f00ff]/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Comprehensive Marketing Solutions
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  One platform, infinite possibilities. Transform your business with our integrated suite of marketing automation tools.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/pricing">
                    <Button size="lg" className="group">
                      View Pricing
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Core Services Overview */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Core <span className="text-primary">Services</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Everything you need to automate, optimize, and scale your marketing efforts
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Globe className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Website Builder</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Create stunning, conversion-optimized websites with our drag-and-drop builder and professional templates.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>CRM Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Manage leads, track interactions, and automate follow-ups with our powerful CRM system.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MessageSquare className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Schedule posts, engage audiences, and track performance across all social platforms.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Sparkles className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>AI Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Generate compelling content instantly with our AI-powered writing assistant.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Website/CRM Portfolio Showcase */}
          <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#14ffc8]/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Website/CRM</span>{" "}
                  <span className="text-[#14ffc8] [text-shadow:0_0_5px_#14ffc8]">Hybrid Platforms</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                  Explore sample styles of our integrated website and CRM solutions built for different industries
                </p>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <Card className="backdrop-blur-md bg-[#121218]/70 rounded-xl border border-gray-800 hover:border-[#14ffc8] transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-[#14ffc8]" />
                      <CardTitle className="text-white">Solar Shield USA</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Solar energy and home improvement services with integrated lead management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <a 
                      href="https://sonshieldusa.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#14ffc8] hover:text-[#14ffc8]/80 transition-colors"
                    >
                      View Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-[#121218]/70 rounded-xl border border-gray-800 hover:border-[#14ffc8] transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-[#14ffc8]" />
                      <CardTitle className="text-white">Drive City Lube & Smog</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Automotive services with appointment scheduling and customer management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <a 
                      href="https://www.drivecitylubeandsmog.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#14ffc8] hover:text-[#14ffc8]/80 transition-colors"
                    >
                      View Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-[#121218]/70 rounded-xl border border-gray-800 hover:border-[#14ffc8] transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-[#14ffc8]" />
                      <CardTitle className="text-white">California RES</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Real estate services with property listings and client relationship tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <a 
                      href="https://californiares.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#14ffc8] hover:text-[#14ffc8]/80 transition-colors"
                    >
                      View Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-[#121218]/70 rounded-xl border border-gray-800 hover:border-[#14ffc8] transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-[#14ffc8]" />
                      <CardTitle className="text-white">Tyler Shoemake</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Personal brand and professional services with client engagement features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <a 
                      href="https://tylershoemake.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#14ffc8] hover:text-[#14ffc8]/80 transition-colors"
                    >
                      View Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-[#121218]/70 rounded-xl border border-gray-800 hover:border-[#14ffc8] transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-[#14ffc8]" />
                      <CardTitle className="text-white">AP Redding</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Professional services platform with integrated business management tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <a 
                      href="https://apredding.net/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#14ffc8] hover:text-[#14ffc8]/80 transition-colors"
                    >
                      View Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* CTA */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to See Your <span className="text-[#14ffc8]">Custom Solution</span>?
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Each platform is tailored to the specific needs and industry of our clients. Let's build something unique for your business.
                </p>
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-[#14ffc8] to-[#ff0aff] text-black hover:opacity-90 transition-opacity">
                    Schedule Your Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Detailed Features Section */}
          <Features />
          <MobileFeatures />
          
          {/* AI Content Demo Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8f00ff]/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Experience <span className="text-primary">AI-Powered</span> Content Creation
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  See how our AI generates compelling content tailored to your industry and audience
                </p>
              </div>
              <div className="max-w-6xl mx-auto">
                <AIContentDemo />
              </div>
            </div>
          </section>

          {/* Social Media Management Section */}
          <SocialMedia />
          
          {/* CRM Section */}
          <CRMSection />
          
          {/* CRM System Showcase - Interactive Demo */}
          <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0d] via-[#121218] to-[#0a0a0d] relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#14ffc8]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ff0aff]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#14ffc8]/20 to-[#ff0aff]/20 px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-[#14ffc8] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#14ffc8]">LIVE DEMO AVAILABLE</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#14ffc8] via-white to-[#ff0aff] bg-clip-text text-transparent">
                    Enterprise CRM System
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Experience the future of customer relationship management with AI-powered call centers, comprehensive databases, and intelligent automation.
                </p>
              </div>

              {/* Three-Panel Product Display */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Panel 1 - Call Center */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#14ffc8]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative backdrop-blur-md bg-[#121218]/80 border-[#14ffc8]/20 hover:border-[#14ffc8] transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14ffc8] to-transparent"></div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <img 
                          src="@assets/Screenshot 2025-08-26 at 08.53.17_1756223601235.png" 
                          alt="Enterprise Call Center Interface" 
                          className="w-full h-48 object-cover rounded-lg border border-[#14ffc8]/20"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-[#14ffc8]">
                        🎯 AI Call Center
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Advanced call management with AI assistance and enterprise analytics. Real-time rebuttal generation and lead qualification.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#14ffc8]">
                        <div className="w-2 h-2 bg-[#14ffc8] rounded-full animate-pulse"></div>
                        <span>Live AI Assistance</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Panel 2 - Database */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff0aff]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative backdrop-blur-md bg-[#121218]/80 border-[#ff0aff]/20 hover:border-[#ff0aff] transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0aff] to-transparent"></div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <img 
                          src="@assets/Screenshot 2025-08-26 at 08.53.38_1756223620928.png" 
                          alt="Enterprise Database System" 
                          className="w-full h-48 object-cover rounded-lg border border-[#ff0aff]/20"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-[#ff0aff]">
                        📊 Smart Database
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Comprehensive contact management with 3,172 records and live sync capabilities. Advanced search and filtering system.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#ff0aff]">
                        <div className="w-2 h-2 bg-[#ff0aff] rounded-full animate-pulse"></div>
                        <span>Real-time Sync</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Panel 3 - Contact Intelligence */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#14ffc8]/10 via-[#ff0aff]/10 to-[#14ffc8]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative backdrop-blur-md bg-[#121218]/80 border-gray-600 hover:border-[#14ffc8] transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#14ffc8] via-[#ff0aff] to-[#14ffc8]"></div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <img 
                          src="@assets/Screenshot 2025-08-26 at 08.54.01_1756223643177.png" 
                          alt="Contact Intelligence System" 
                          className="w-full h-48 object-cover rounded-lg border border-gray-600"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#14ffc8] to-[#ff0aff] bg-clip-text text-transparent">
                        🧠 Contact Intelligence
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Deep social media integration and contact enrichment. LinkedIn, Facebook, Instagram, and multi-platform data aggregation.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#14ffc8]">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#14ffc8] to-[#ff0aff] rounded-full animate-pulse"></div>
                        <span>Social Intelligence</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Call-to-Action Section */}
              <div className="text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-[#121218]/50 to-[#121218]/80 backdrop-blur-md border border-[#14ffc8]/20 rounded-2xl p-8 mb-8">
                    <h3 className="text-3xl font-bold mb-4">
                      🚀 <span className="bg-gradient-to-r from-[#14ffc8] to-[#ff0aff] bg-clip-text text-transparent">Try It Live Right Now</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      No signup required. Full access to all features. See why leading companies choose our platform.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-black/30 rounded-xl p-4 border border-[#14ffc8]/20">
                        <h4 className="text-[#14ffc8] font-semibold mb-2">🌐 Demo URL</h4>
                        <p className="font-mono text-white text-lg">sonshieldusa.app</p>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4 border border-[#ff0aff]/20">
                        <h4 className="text-[#ff0aff] font-semibold mb-2">🔑 Access PIN</h4>
                        <p className="font-mono text-white text-2xl font-bold">1001</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="https://sonshieldusa.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" className="group bg-gradient-to-r from-[#14ffc8] to-[#ff0aff] text-black hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
                          🎯 Launch Live Demo
                          <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                      <Link href="/contact">
                        <Button size="lg" variant="outline" className="border-[#14ffc8] text-[#14ffc8] hover:bg-[#14ffc8] hover:text-black transition-all duration-300 px-8 py-3 text-lg font-semibold">
                          📞 Schedule Custom Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    💡 <strong>Pro Tip:</strong> Use PIN 1001 to access all premium features instantly. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Services */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Advanced <span className="text-primary">Capabilities</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Take your marketing to the next level with these powerful features
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Marketing Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Real-time performance tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>ROI measurement and attribution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Custom reporting dashboards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Predictive analytics and insights</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Workflow Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Visual workflow builder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Multi-channel automation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Conditional logic and branching</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>API integrations and webhooks</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Lead Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Smart forms and landing pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Lead scoring and qualification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Automated nurture campaigns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Conversion optimization tools</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Marketing?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using Fusion Data Co to automate their marketing and drive growth.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="group">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Request Custom Demo
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Bristol Real Estate Demographics Platform */}
          <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0d] via-[#121218] to-[#0a0a0d] relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#0088ff]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00ff88]/20 to-[#0088ff]/20 px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-[#00ff88]">ELITE REAL ESTATE INTELLIGENCE</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#00ff88] via-white to-[#0088ff] bg-clip-text text-transparent">
                    Bristol Demographics Platform
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Revolutionary white-label real estate demographics and market analysis platform. Advanced scraping, mapping, and project analysis with customizable company-specific metrics and automated competitive analysis cycles.
                </p>
              </div>

              {/* Platform Features Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Advanced Scraping Engine */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative backdrop-blur-md bg-[#121218]/80 border-[#00ff88]/20 hover:border-[#00ff88] transition-all duration-500 overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff88] to-transparent"></div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-[#00ff88]">
                        🔍 Advanced Scraping Engine
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Powered by Firecrawl and Crawl4AI, our platform delivers comprehensive data extraction from multiple sources with enterprise-grade reliability and speed.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#00ff88] rounded-full"></div>
                          Multiple API integrations
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#00ff88] rounded-full"></div>
                          Real-time data indexing
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#00ff88] rounded-full"></div>
                          Enterprise-grade performance
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Interactive Demographics Mapping */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0088ff]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative backdrop-blur-md bg-[#121218]/80 border-[#0088ff]/20 hover:border-[#0088ff] transition-all duration-500 overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0088ff] to-transparent"></div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-[#0088ff]">
                        🗺️ Interactive Demographics Mapping
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Click anywhere on our advanced maps and configure custom radius parameters to instantly access detailed demographic data tailored to your specific market requirements.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#0088ff] rounded-full"></div>
                          Custom radius selection
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#0088ff] rounded-full"></div>
                          Configurable demographic sets
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#0088ff] rounded-full"></div>
                          Multi-layer data visualization
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Automated Competitive Analysis */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/10 via-[#0088ff]/10 to-[#00ff88]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <Card className="relative backdrop-blur-md bg-[#121218]/80 border-gray-600 hover:border-[#00ff88] transition-all duration-500 overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff88] via-[#0088ff] to-[#00ff88]"></div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#00ff88] to-[#0088ff] bg-clip-text text-transparent">
                        📊 Automated Competitive Analysis
                      </h3>
                      <p className="text-gray-400 mb-4">
                        Set your company metrics once and let our platform run scheduled competitive analysis cycles, delivering insights from your unique business perspective automatically.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gradient-to-r from-[#00ff88] to-[#0088ff] rounded-full"></div>
                          Scheduled analysis cycles
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gradient-to-r from-[#00ff88] to-[#0088ff] rounded-full"></div>
                          Company-specific viewpoints
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gradient-to-r from-[#00ff88] to-[#0088ff] rounded-full"></div>
                          Custom metric configuration
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* White-Label Configuration Section */}
              <div className="max-w-6xl mx-auto mb-16">
                <Card className="backdrop-blur-md bg-[#121218]/80 border-[#00ff88]/20 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff88] via-[#0088ff] to-[#00ff88]"></div>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-3xl font-bold mb-4">
                          <span className="text-[#00ff88]">White-Label</span>{" "}
                          <span className="text-white">Configuration</span>
                        </h3>
                        <p className="text-gray-300 text-lg mb-6">
                          Deploy the Bristol platform under your company's brand with fully customizable search parameters, company-specific metrics, and automated competitive intelligence that aligns with your business strategy.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#00ff88]/20 rounded-full flex items-center justify-center mt-1">
                              <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">One-Time Setup</h4>
                              <p className="text-gray-400 text-sm">Configure your company's unique search criteria and analysis parameters</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#0088ff]/20 rounded-full flex items-center justify-center mt-1">
                              <div className="w-2 h-2 bg-[#0088ff] rounded-full"></div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">Automated Intelligence</h4>
                              <p className="text-gray-400 text-sm">Continuous market analysis from your company's strategic perspective</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#00ff88] to-[#0088ff] rounded-full flex items-center justify-center mt-1">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">Complete Branding</h4>
                              <p className="text-gray-400 text-sm">Full white-label deployment with your company's visual identity</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="bg-black/30 rounded-xl p-6 border border-[#00ff88]/20">
                          <h4 className="text-[#00ff88] font-semibold mb-4 text-center">🏢 Platform Features</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#00ff88]">Multiple</div>
                              <div className="text-gray-400">Map Layers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#0088ff]">API</div>
                              <div className="text-gray-400">Integrations</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#00ff88]">Real-time</div>
                              <div className="text-gray-400">Demographics</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#0088ff]">Automated</div>
                              <div className="text-gray-400">Analysis</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Platform Access */}
              <div className="text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-[#121218]/50 to-[#121218]/80 backdrop-blur-md border border-[#00ff88]/20 rounded-2xl p-8">
                    <h3 className="text-3xl font-bold mb-4">
                      🚀 <span className="bg-gradient-to-r from-[#00ff88] to-[#0088ff] bg-clip-text text-transparent">Experience Bristol Live</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                      Access the full Bristol real estate demographics platform. No registration required - see the power of advanced market intelligence in action.
                    </p>
                    
                    <div className="bg-black/30 rounded-xl p-6 border border-[#00ff88]/20 mb-8">
                      <h4 className="text-[#00ff88] font-semibold mb-3">🌐 Live Platform Access</h4>
                      <p className="font-mono text-white text-xl mb-2">Bristol-Development-Site-Intel-Platform.replit.app</p>
                      <p className="text-gray-400 text-sm">Full access to all mapping tools, demographic analysis, and competitive intelligence features</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="https://Bristol-Development-Site-Intel-Platform.replit.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button size="lg" className="group bg-gradient-to-r from-[#00ff88] to-[#0088ff] text-black hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
                          🗺️ Launch Bristol Platform
                          <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </a>
                      <Link href="/contact">
                        <Button size="lg" variant="outline" className="border-[#0088ff] text-[#0088ff] hover:bg-[#0088ff] hover:text-black transition-all duration-300 px-8 py-3 text-lg">
                          Request White-Label Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}