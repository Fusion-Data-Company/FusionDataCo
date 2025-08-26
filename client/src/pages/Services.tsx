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

                {/* CRM Demo Card */}
                <Card className="backdrop-blur-md bg-gradient-to-br from-[#ff0aff]/10 to-[#14ffc8]/10 rounded-xl border border-[#ff0aff] hover:border-[#ff0aff]/80 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Laptop className="h-5 w-5 text-[#ff0aff]" />
                      <CardTitle className="text-white">Live CRM Demo</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">
                      Experience our white-label sales agent CRM with AI rebuttal generator
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <a 
                        href="https://sonshieldusa.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#ff0aff] hover:text-[#ff0aff]/80 transition-colors font-semibold"
                      >
                        Try Live Demo <ExternalLink className="h-4 w-4" />
                      </a>
                      <div className="text-sm text-gray-500">
                        Demo PIN: <span className="font-mono text-[#14ffc8] font-bold">1001</span>
                      </div>
                    </div>
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
          
          {/* CRM Demo Highlight */}
          <section className="py-16 px-4 bg-gradient-to-b from-[#ff0aff]/10 to-background">
            <div className="container mx-auto text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Experience Our <span className="text-[#ff0aff]">AI-Powered CRM</span> Live
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Try our white-label sales agent mini CRM with built-in AI rebuttal generator. See how it can transform your sales process.
                </p>
                
                <Card className="max-w-2xl mx-auto bg-gradient-to-br from-[#ff0aff]/5 to-[#14ffc8]/5 border-[#ff0aff]/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Laptop className="h-8 w-8 text-[#ff0aff]" />
                      <Phone className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Live Demo Available</h3>
                    <p className="text-gray-400 mb-4">
                      Access our fully functional CRM demo to explore lead management, AI rebuttals, and automation features.
                    </p>
                    <div className="bg-black/20 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-400 mb-2">Demo Access Details:</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">URL:</p>
                          <p className="font-mono text-[#14ffc8] text-sm">sonshieldusa.app</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Demo PIN:</p>
                          <p className="font-mono text-[#ff0aff] text-xl font-bold">1001</p>
                        </div>
                      </div>
                    </div>
                    <a 
                      href="https://sonshieldusa.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="bg-gradient-to-r from-[#ff0aff] to-[#14ffc8] text-black hover:opacity-90 transition-opacity">
                        Launch Demo Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
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
        </main>
        <Footer />
      </div>
    </>
  );
}