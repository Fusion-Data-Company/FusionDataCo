import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IndustrySolutions from "@/components/IndustrySolutions";
import CTASection from "@/components/CTASection";
import MobileHero from "@/components/MobileHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Zap, TrendingUp, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FUSION Data Co - Revolutionary Enterprise AI Business Automation Platform</title>
        <meta name="description" content="FUSION Data Co delivers cutting-edge enterprise automation with AI-powered FUSION systems, conversational agents, multi-model AI routing, and intelligent business FUSION technology that transforms operations and accelerates exponential growth." />
        <meta name="keywords" content="FUSION enterprise automation, AI-powered business FUSION, intelligent FUSION systems, conversational AI agents, multi-model AI routing, FUSION workflow optimization, enterprise AI automation, FUSION data intelligence, advanced business FUSION, automated FUSION technology" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FUSION Data Co - Revolutionary Enterprise AI Business Automation Platform" />
        <meta property="og:description" content="Transform your enterprise with FUSION-powered automation, intelligent conversational agents, and multi-model AI routing. Experience the future of business FUSION systems." />
        <meta property="og:url" content="https://fusiondataco.com" />
        
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          <Hero />
          <MobileHero />
          
          {/* Featured Blog Post Banner */}
          <section className="py-8 px-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border-y border-green-500/20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🏌️</div>
                  <div>
                    <h3 className="text-xl font-bold text-green-400">New Guide: The Golf Bag Approach to Multi-Model AI</h3>
                    <p className="text-muted-foreground">Why one AI model isn't enough for enterprise operations</p>
                  </div>
                </div>
                <Link href="/blog/golf-bag-approach-multi-model-ai">
                  <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                    Read Full Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Quick Value Props Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Everything You Need to <span className="text-primary">Grow Your Business</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  One platform, unlimited possibilities. Transform your marketing with our complete automation suite.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card enhanced className="group">
                  <CardHeader>
                    <Zap className="h-10 w-10 text-primary mb-4 micro-feedback" />
                    <CardTitle className="group-hover:text-primary transition-colors">Instant Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-foreground transition-colors">
                      Get started in minutes with pre-built templates and industry-specific workflows
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card enhanced className="group">
                  <CardHeader>
                    <TrendingUp className="h-10 w-10 text-primary mb-4 micro-feedback" />
                    <CardTitle className="group-hover:text-primary transition-colors">Proven Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-foreground transition-colors">
                      300% average increase in lead generation within the first 6 months
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card enhanced className="group">
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-4 micro-feedback" />
                    <CardTitle className="group-hover:text-primary transition-colors">Enterprise Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-foreground transition-colors">
                      Bank-level encryption and compliance with all major data protection standards
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card enhanced className="group">
                  <CardHeader>
                    <Globe className="h-10 w-10 text-primary mb-4 micro-feedback" />
                    <CardTitle className="group-hover:text-primary transition-colors">All-in-One Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-foreground transition-colors">
                      CRM, websites, email, social media, and AI tools in one integrated system
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/services">
                    <Button size="lg" variant="fusion" className="group">
                      Explore Our Services
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="fusion-glow">
                      Learn About Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          
          {/* Industry Solutions Brief */}
          <IndustrySolutions />
          
          {/* Main CTA Section */}
          <CTASection />
          
          {/* Quick Contact CTA */}
          <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Marketing?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using Fusion Data Co to automate their growth.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="group">
                    View Pricing Plans
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
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