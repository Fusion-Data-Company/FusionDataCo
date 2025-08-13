import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Calendar, Award, BarChart3, Building } from "lucide-react";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "Global E-commerce Platform",
      client: "Fortune 500 Retailer",
      industry: "Retail & E-commerce",
      icon: <Building className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      challenge: "Disconnected marketing channels resulting in inconsistent customer experience and poor ROI tracking across 50+ markets.",
      solution: "Implemented unified marketing automation platform with AI-powered personalization, cross-channel orchestration, and real-time analytics.",
      results: [
        { metric: "Revenue Increase", value: "+157%", description: "Year-over-year growth" },
        { metric: "Customer Retention", value: "+89%", description: "Improved retention rate" },
        { metric: "Marketing Efficiency", value: "3.2x", description: "ROI improvement" },
        { metric: "Time to Market", value: "-65%", description: "Campaign deployment time" }
      ],
      testimonial: "Fusion Data Co transformed our marketing operations. We now have complete visibility and control across all channels.",
      testimonialAuthor: "CMO, Global Retail Corporation"
    },
    {
      title: "Healthcare Network Transformation",
      client: "Regional Healthcare System",
      industry: "Healthcare",
      icon: <Users className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      challenge: "HIPAA compliance concerns limiting digital patient engagement and marketing automation capabilities.",
      solution: "Deployed HIPAA-compliant CRM with secure patient communication, automated appointment reminders, and targeted health campaigns.",
      results: [
        { metric: "Patient Engagement", value: "+234%", description: "Digital interaction rate" },
        { metric: "No-Show Rate", value: "-71%", description: "Appointment attendance" },
        { metric: "Patient Satisfaction", value: "4.8/5", description: "Average rating" },
        { metric: "Compliance Score", value: "100%", description: "HIPAA adherence" }
      ],
      testimonial: "Finally, a platform that lets us engage patients digitally while maintaining complete HIPAA compliance.",
      testimonialAuthor: "VP of Patient Experience"
    },
    {
      title: "Real Estate Brokerage Scale-Up",
      client: "National Real Estate Firm",
      industry: "Real Estate",
      icon: <TrendingUp className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      challenge: "Manual lead management causing 40% of qualified leads to go cold before agent contact.",
      solution: "Automated lead scoring, instant response system, and AI-powered property matching with integrated CRM workflows.",
      results: [
        { metric: "Lead Response Time", value: "<2 min", description: "Average first contact" },
        { metric: "Conversion Rate", value: "+312%", description: "Lead to client" },
        { metric: "Agent Productivity", value: "+185%", description: "Deals per agent" },
        { metric: "Revenue Growth", value: "+$42M", description: "Annual increase" }
      ],
      testimonial: "The automation has given our agents superpowers. They focus on selling while the system handles everything else.",
      testimonialAuthor: "CEO, National Realty Group"
    },
    {
      title: "Financial Services Digital Transformation",
      client: "Investment Management Firm",
      industry: "Financial Services",
      icon: <BarChart3 className="h-6 w-6" />,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      challenge: "Complex compliance requirements preventing effective digital marketing and client communication.",
      solution: "FINRA-compliant marketing automation with multi-level approval workflows and encrypted client portals.",
      results: [
        { metric: "Client Acquisition", value: "+127%", description: "New accounts opened" },
        { metric: "Compliance Violations", value: "Zero", description: "Since implementation" },
        { metric: "Client Satisfaction", value: "96%", description: "Satisfaction score" },
        { metric: "AUM Growth", value: "+$1.2B", description: "Assets under management" }
      ],
      testimonial: "Fusion Data Co understood our compliance needs and delivered a solution that actually works in our regulated environment.",
      testimonialAuthor: "Chief Compliance Officer"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Case Studies - Success Stories | Fusion Data Co</title>
        <meta name="description" content="Explore real-world success stories from enterprises using Fusion Data Co's marketing automation platform. See measurable results across industries." />
        <meta name="keywords" content="marketing automation case studies, CRM success stories, enterprise transformation, ROI examples, client testimonials" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#8f00ff]/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Real Results, Real Impact
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  See how leading enterprises transformed their marketing operations and achieved extraordinary growth with Fusion Data Co.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Overview */}
          <section className="py-12 px-4 bg-card border-y border-border">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">250%</div>
                  <div className="text-sm text-muted-foreground">Average ROI Increase</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Businesses Transformed</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Client Retention Rate</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.5B+</div>
                  <div className="text-sm text-muted-foreground">Revenue Generated</div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="space-y-16">
                {caseStudies.map((study, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Image Side */}
                      <div className="relative h-64 lg:h-auto">
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                          <div className="flex items-center gap-2 text-white">
                            {study.icon}
                            <span className="font-semibold">{study.industry}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Side */}
                      <div className="p-8 lg:p-12">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                          <p className="text-muted-foreground">{study.client}</p>
                        </div>
                        
                        <div className="space-y-6 mb-8">
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2">Challenge</h4>
                            <p className="text-muted-foreground">{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2">Solution</h4>
                            <p className="text-muted-foreground">{study.solution}</p>
                          </div>
                        </div>
                        
                        {/* Results Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="bg-card/50 p-4 rounded-lg border border-border/50">
                              <div className="text-2xl font-bold text-primary">{result.value}</div>
                              <div className="text-xs text-muted-foreground">{result.metric}</div>
                              <div className="text-xs text-muted-foreground/70">{result.description}</div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Testimonial */}
                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                          <p className="mb-2">"{study.testimonial}"</p>
                          <cite className="text-sm not-italic">— {study.testimonialAuthor}</cite>
                        </blockquote>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses achieving extraordinary results with Fusion Data Co.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="group">
                    Start Your Transformation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline">
                    Explore Our Solutions
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