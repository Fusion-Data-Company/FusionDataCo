import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ValueProposition from "@/components/ValueProposition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Award, Target, Shield, Users, Building, Globe, Rocket, Heart } from "lucide-react";

export default function About() {
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
                  Empowering businesses with intelligent automation solutions that drive growth, efficiency, and innovation.
                </p>
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
                    To democratize advanced marketing automation technology, making it accessible and affordable for businesses of all sizes. We believe every company deserves enterprise-level tools without enterprise-level complexity or cost.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We're committed to simplifying digital marketing, automating repetitive tasks, and providing actionable insights that help our clients focus on what they do best - growing their business.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Rocket className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    To become the global leader in integrated marketing automation, where businesses seamlessly connect with their customers through intelligent, data-driven strategies.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We envision a future where marketing automation isn't just about efficiency - it's about creating meaningful connections, predictive insights, and sustainable growth for every business we serve.
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
                    <h3 className="text-xl font-semibold mb-2">Proven ROI</h3>
                    <p className="text-muted-foreground">
                      Our clients see an average 300% increase in lead generation and 50% reduction in marketing costs within the first 6 months.
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

          {/* Company Stats */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-accent/5">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground">Active Businesses</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50M+</div>
                  <div className="text-muted-foreground">Leads Generated</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Meet Our <span className="text-primary">Leadership</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Experienced professionals dedicated to your success
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>CEO & Founder</CardTitle>
                    <CardDescription>Visionary Leader</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      20+ years in marketing technology, passionate about democratizing enterprise tools for all businesses.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Building className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>CTO</CardTitle>
                    <CardDescription>Technology Innovator</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Former Silicon Valley engineer, expert in AI/ML and scalable cloud architectures.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Globe className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>VP of Customer Success</CardTitle>
                    <CardDescription>Client Champion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Dedicated to ensuring every client achieves their goals with our platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

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