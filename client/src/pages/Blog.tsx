import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, User, BookOpen, TrendingUp, Lightbulb, Target } from "lucide-react";

export default function Blog() {
  const blogPosts = [
    {
      title: "The Future of Marketing Automation: AI and Machine Learning Trends for 2025",
      excerpt: "Discover how artificial intelligence and machine learning are reshaping marketing automation strategies for enterprise businesses.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
      featured: true
    },
    {
      title: "10 Essential CRM Features Every Enterprise Needs",
      excerpt: "A comprehensive guide to the must-have CRM features that drive business growth and customer satisfaction at scale.",
      author: "Michael Roberts",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "CRM Strategy",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "HIPAA Compliance in Healthcare Marketing: What You Need to Know",
      excerpt: "Navigate the complexities of HIPAA compliance while implementing effective digital marketing strategies for healthcare organizations.",
      author: "Dr. Emily Watson",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Real Estate Lead Generation: Advanced Strategies That Work",
      excerpt: "Learn proven tactics for generating high-quality leads in the competitive real estate market using automation tools.",
      author: "David Park",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Building a Data-Driven Marketing Strategy: A Step-by-Step Guide",
      excerpt: "Transform your marketing approach with data-driven insights and analytics-based decision making.",
      author: "Jennifer Lee",
      date: "March 5, 2024",
      readTime: "9 min read",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Social Media Automation Without Losing Authenticity",
      excerpt: "How to maintain genuine connections with your audience while leveraging automation for efficiency.",
      author: "Alex Martinez",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    }
  ];

  const resources = [
    {
      title: "Marketing Automation Playbook",
      description: "Complete guide to implementing marketing automation in your organization",
      icon: <BookOpen className="h-8 w-8" />,
      type: "E-Book",
      pages: "85 pages"
    },
    {
      title: "CRM Implementation Checklist",
      description: "Step-by-step checklist for successful CRM deployment",
      icon: <Target className="h-8 w-8" />,
      type: "Checklist",
      pages: "12 pages"
    },
    {
      title: "ROI Calculator",
      description: "Calculate your potential return on marketing automation investment",
      icon: <TrendingUp className="h-8 w-8" />,
      type: "Tool",
      pages: "Interactive"
    },
    {
      title: "Industry Benchmark Report 2024",
      description: "Compare your marketing metrics with industry standards",
      icon: <Lightbulb className="h-8 w-8" />,
      type: "Report",
      pages: "45 pages"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Blog & Resources - Marketing Insights | Fusion Data Co</title>
        <meta name="description" content="Expert insights on marketing automation, CRM strategies, and digital transformation. Access guides, reports, and tools to accelerate your business growth." />
        <meta name="keywords" content="marketing automation blog, CRM resources, digital marketing guides, enterprise marketing insights, automation best practices" />
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
                    Insights & Resources
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Stay ahead with expert insights, industry trends, and practical resources for marketing automation success.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post, index) => (
            <section key={index} className="py-12 px-4 bg-card border-b border-border">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>By {post.author}</span>
                      </div>
                      <Button className="group">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Recent Posts Grid */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.filter(post => !post.featured).map((post, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                        <Button variant="ghost" size="sm" className="group">
                          Read More
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Free Resources</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Download our guides, templates, and tools to accelerate your marketing transformation.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <div className="mb-4 text-primary">{resource.icon}</div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                        <span className="text-xs text-muted-foreground">{resource.pages}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{resource.description}</CardDescription>
                      <Button variant="outline" size="sm" className="w-full">
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Stay Informed with Our Newsletter
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get the latest insights, tips, and strategies delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}