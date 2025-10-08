import { Helmet } from 'react-helmet';
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ValueProposition from "@/components/ValueProposition";
import MediaCard from "@/components/MediaCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Award, Target, Shield, Users, Building, Globe, Rocket, Heart, Mic } from "lucide-react";
import type { MediaItem } from "@shared/schema";

export default function About() {
  const { data: mediaItems = [] } = useQuery<MediaItem[]>({
    queryKey: ['/api/media'],
  });

  // Get 2 most recent media items
  const recentMedia = mediaItems.slice(0, 2);

  return (
    <>
      <Helmet>
        <title>About Us - Fusion Data Co | Your Marketing Automation Partner</title>
        <meta name="description" content="Learn about Fusion Data Co's mission to revolutionize marketing automation. We combine cutting-edge technology with industry expertise to help businesses scale efficiently." />
        <meta name="keywords" content="about Fusion Data Co, marketing automation company, business automation experts, CRM specialists, digital transformation partner" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us - Fusion Data Co | Your Marketing Automation Partner" />
        <meta property="og:description" content="Discover how Fusion Data Co is transforming businesses with innovative marketing automation solutions." />
        <meta property="og:url" content="https://fusiondataco.com/about" />
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
                    About Fusion Data Co
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Bringing enterprise-grade conversational AI and marketing automation to small businesses who deserve sophisticated tools without the complexity.
                </p>
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-6 mb-8">
                  <p className="text-2xl font-bold text-primary text-center">
                    "FIRST WE MAKE IT WORK, THEN WE MAKE IT PRETTY"
                  </p>
                  <p className="text-center text-muted-foreground mt-2">Our Philosophy</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    To empower small businesses with the same conversational AI technology that Fortune 500 companies use - voice agents, SMS automation, and multi-model AI routing - at prices that make sense for growing companies.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We specialize in taking complex enterprise AI systems and making them simple, affordable, and incredibly effective for real estate, healthcare, trades, and service businesses who need to capture every lead and convert more prospects.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Rocket className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    A world where every small business has access to AI agents that answer calls instantly, respond to SMS in seconds, and qualify leads 24/7 - without requiring a team of developers or a massive budget.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We're building the future where conversational AI becomes as essential as having a website, where multi-model routing optimizes every customer interaction, and where businesses can compete with enterprise-level automation tools.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition Component */}
          <ValueProposition />

          {/* Core Values Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-background to-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Core <span className="text-primary">Values</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Heart className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Customer First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Your success is our success. We listen, adapt, and deliver solutions that exceed expectations.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Trust & Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      We protect your data with enterprise-grade security and maintain complete transparency in all operations.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Award className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Continuously evolving with cutting-edge technology to keep you ahead of the competition.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>Partnership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      We're not just a vendor - we're your strategic partner in digital transformation.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Choose <span className="text-primary">Fusion Data Co</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  What sets us apart in the marketing automation landscape
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
                    <p className="text-muted-foreground">
                      Replace multiple tools with one comprehensive platform. From CRM to social media, email marketing to analytics - everything works seamlessly together.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
                    <p className="text-muted-foreground">
                      Leverage advanced AI for content creation, predictive analytics, and automated decision-making that adapts to your business needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
                    <p className="text-muted-foreground">
                      Tailored solutions for specific industries including real estate, medical, trades, and small businesses with proven success strategies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">White-Label Ready</h3>
                    <p className="text-muted-foreground">
                      Build your own brand with our white-label solutions. Perfect for agencies and consultants looking to offer premium services.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">5</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Results-Driven Approach</h3>
                    <p className="text-muted-foreground">
                      Our clients consistently see significant improvements in lead conversion rates and operational efficiency through AI-powered automation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">6</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">
                      Get help when you need it with our dedicated support team, comprehensive documentation, and active community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Commitment */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-accent/5">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-primary">Commitment</span> to You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Expert</div>
                    <div className="text-muted-foreground">AI Implementation</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">Custom</div>
                    <div className="text-muted-foreground">Solutions Built</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-muted-foreground">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Expertise */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our <span className="text-primary">Expertise</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Experienced team dedicated to bringing enterprise AI to small businesses
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>AI Implementation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Extensive experience deploying conversational AI and multi-model routing for businesses across industries.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Building className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>Technical Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Deep expertise in AI/ML, workflow automation, and scalable cloud architectures using cutting-edge technologies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Globe className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>Customer Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Committed to ensuring every client successfully implements AI solutions that deliver real business value.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Media Highlights Section */}
          {recentMedia.length > 0 && (
            <section className="py-16 px-4 bg-gradient-to-b from-purple-900/20 to-blue-900/20">
              <div className="container mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Mic className="h-8 w-8 text-purple-400" />
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Recent Media <span className="text-purple-400">Appearances</span>
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Hear from Rob about AI automation, business growth strategies, and the future of marketing
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                  {recentMedia.map((item) => (
                    <MediaCard key={item.id} item={item} />
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/media">
                    <Button size="lg" variant="outline" className="group" data-testid="button-view-all-media-about">
                      View All Media Appearances
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join the Fusion Data Co Family?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience the difference of a true marketing automation partner. Let's grow together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="group">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Explore Our Services
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