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
import { ArrowRight, Sparkles, TrendingUp, Users, Zap, Globe, MessageSquare, BarChart3 } from "lucide-react";

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