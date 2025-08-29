import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Handshake, Building, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";

export default function Partners() {
  const partnerTiers = [
    {
      title: "Technology Partners",
      icon: Zap,
      description: "Integration partners that enhance our platform capabilities",
      partners: [
        { name: "OpenRouter", description: "Multi-model AI routing and management", status: "Integrated" },
        { name: "ElevenLabs", description: "Voice synthesis and audio AI technology", status: "Integrated" },
        { name: "Vapi", description: "Voice AI infrastructure and phone systems", status: "Integrated" },
        { name: "N8N", description: "Workflow automation and business process integration", status: "Integrated" },
        { name: "Go High Level", description: "CRM and marketing automation platform", status: "Integrated" }
      ]
    },
    {
      title: "Industry Partners",
      icon: Building,
      description: "Strategic partners in key industry verticals",
      partners: [
        { name: "Real Estate Associations", description: "Local and regional real estate professional networks", status: "Active" },
        { name: "Healthcare Networks", description: "Medical practice management and compliance partners", status: "Active" },
        { name: "Financial Services", description: "Insurance and financial advisory firm partnerships", status: "Active" },
        { name: "Trade Organizations", description: "Construction and home services professional groups", status: "Active" }
      ]
    },
    {
      title: "Channel Partners",
      icon: Globe,
      description: "Authorized resellers and implementation specialists",
      partners: [
        { name: "Regional Consultants", description: "Certified implementation and training specialists", status: "Recruiting" },
        { name: "Digital Agencies", description: "Marketing agencies offering white-label solutions", status: "Active" },
        { name: "Business Consultants", description: "Enterprise consultants providing integrated solutions", status: "Active" }
      ]
    }
  ];

  const partnerBenefits = [
    "Priority technical support and dedicated account management",
    "Co-marketing opportunities and joint sales initiatives",
    "Early access to new features and beta programs",
    "Competitive referral commissions and revenue sharing",
    "Comprehensive training and certification programs",
    "White-label and custom branding options"
  ];

  return (
    <>
      <Helmet>
        <title>Partners - Fusion Data Co</title>
        <meta name="description" content="Join Fusion Data Co's partner network. Explore technology integrations, industry partnerships, and channel partner opportunities." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Partner <span className="text-primary">Ecosystem</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join our network of technology, industry, and channel partners to deliver 
                comprehensive marketing automation solutions to enterprise customers.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="group">
                    Become a Partner
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Partner Tiers */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Partnership <span className="text-primary">Opportunities</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Multiple ways to collaborate and grow together in the marketing automation space
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {partnerTiers.map((tier, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <tier.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{tier.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {tier.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {tier.partners.map((partner, partnerIndex) => (
                          <div key={partnerIndex} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{partner.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{partner.description}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              partner.status === 'Integrated' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                              partner.status === 'Active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {partner.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Partner Benefits */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Partner <span className="text-primary">Benefits</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Our partners enjoy comprehensive support, competitive benefits, and growth opportunities 
                    in the expanding marketing automation market.
                  </p>
                  
                  <div className="space-y-4">
                    {partnerBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-primary">Enterprise Focus</CardTitle>
                      <CardDescription>
                        Target Fortune 500 and mid-market companies with enterprise-grade solutions
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-accent/20 bg-accent/5">
                    <CardHeader>
                      <CardTitle className="text-accent">Proven ROI</CardTitle>
                      <CardDescription>
                        Partners typically see 25-40% increase in revenue within first year
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card className="border-secondary/20 bg-secondary/5">
                    <CardHeader>
                      <CardTitle className="text-secondary">Ongoing Support</CardTitle>
                      <CardDescription>
                        Dedicated partner success team with quarterly business reviews
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-primary">Partner</span> With Us?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our growing network of successful partners and accelerate your business growth 
                with enterprise marketing automation solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="group">
                    Start Partnership Application
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to discuss partnership opportunities?
                </p>
                <div className="flex flex-wrap gap-6 justify-center text-sm">
                  <a href="tel:+19165340915" className="text-primary hover:underline">
                    +1 (916) 534-0915
                  </a>
                  <a href="mailto:rob@fusiondataco.com" className="text-primary hover:underline">
                    rob@fusiondataco.com
                  </a>
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