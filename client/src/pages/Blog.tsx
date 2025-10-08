import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, User, BookOpen, TrendingUp, Lightbulb, Target } from "lucide-react";
import { blogPosts, getFeaturedPosts, getRecentPosts } from "@/data/blog-posts";
import { useBlogPosts } from "@/lib/queries/blogQueries";

export default function Blog() {
  const allFeaturedPosts = getFeaturedPosts();
  // Ensure golf post is always first by sorting featured posts
  const featuredPosts = allFeaturedPosts.sort((a, b) => {
    // Golf post always comes first
    if (a.id === 'golf-bag-approach-multi-model-ai') return -1;
    if (b.id === 'golf-bag-approach-multi-model-ai') return 1;
    // Then sort by date for other featured posts
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const recentPosts = getRecentPosts().filter(post => !post.featured);

  // Fetch database blog posts
  const { data: dbBlogPosts, isLoading } = useBlogPosts();

  // Transform database posts to frontend format
  const transformedDbPosts = (dbBlogPosts || []).map(post => {
    const content = post.content || '';
    const wordCount = content.split(' ').length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    return {
      id: post.slug,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: content,
      author: 'Robert Yeager', // Default author for automated posts
      date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
      readTime: `${readTime} min read`,
      category: post.category || 'VIBE CODING',
      image: post.featuredImage || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      featured: false, // Automated posts are not featured by default
      tags: post.tags || [],
      seo: {
        metaDescription: post.excerpt || '',
        keywords: post.tags || []
      }
    };
  });
  
  // Real blog posts with Robert Yeager as author and recent dates
  const legacyPosts = [
    {
      title: "Essential CRM Features Every Enterprise Needs in 2025",
      excerpt: "Discover the 10 must-have CRM features driving business growth and customer satisfaction at enterprise scale.",
      author: "Robert Yeager",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "CRM Strategy",
      slug: "2025-01-15-essential-crm-features-enterprise-needs",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "HIPAA Compliance in Healthcare Marketing: 2025 Complete Guide",
      excerpt: "Navigate HIPAA complexities while implementing effective digital marketing strategies for healthcare organizations.",
      author: "Robert Yeager", 
      date: "January 12, 2025",
      readTime: "12 min read",
      category: "Healthcare",
      slug: "2025-01-12-hipaa-compliance-healthcare-marketing-guide",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Real Estate Lead Generation: Advanced Strategies That Convert in 2025",
      excerpt: "Learn proven tactics for generating high-quality leads in competitive real estate markets using automation tools.",
      author: "Robert Yeager",
      date: "January 10, 2025", 
      readTime: "9 min read",
      category: "Real Estate",
      slug: "2025-01-10-real-estate-lead-generation-advanced-strategies",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Building a Data-Driven Marketing Strategy: Executive Playbook 2025",
      excerpt: "Transform your marketing approach with data-driven insights and analytics-based decision making for enterprise success.",
      author: "Robert Yeager",
      date: "January 8, 2025",
      readTime: "11 min read", 
      category: "Strategy",
      slug: "2025-01-08-building-data-driven-marketing-strategy",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Social Media Automation Without Losing Authenticity in 2025",
      excerpt: "Master the balance between automation efficiency and genuine human connection in your social media strategy.",
      author: "Robert Yeager",
      date: "January 5, 2025",
      readTime: "7 min read",
      category: "Social Media", 
      slug: "2025-01-05-social-media-automation-without-losing-authenticity",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    },
    {
      title: "Email Marketing Automation: Enterprise Implementation Guide 2025",
      excerpt: "Advanced email marketing automation strategies for enterprise teams focused on scalability and personalization.",
      author: "Robert Yeager",
      date: "January 3, 2025",
      readTime: "10 min read",
      category: "Email Marketing",
      slug: "2025-01-03-email-marketing-automation-enterprise-guide", 
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
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

          {/* Featured Posts */}
          {featuredPosts.map((post, index) => (
            <section key={index} className={`py-12 px-4 ${post.id === 'golf-bag-approach-multi-model-ai' ? 'bg-gradient-to-r from-green-900/20 to-blue-900/20' : 'bg-card'} border-b border-border`}>
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden">
                    {post.id === 'golf-bag-approach-multi-model-ai' ? (
                      <div className="bg-gradient-to-br from-green-600/30 via-blue-600/30 to-purple-600/30 h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-8xl mb-4">🏌️</div>
                          <div className="text-2xl font-bold text-white">The Golf Bag Approach</div>
                          <div className="text-lg text-white/80">Multi-Model AI Strategy</div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        width="1920"
                        height="1080"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline">{post.category}</Badge>
                      {post.tags && post.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
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
                      <Link href={`/blog/${post.slug}`}>
                        <Button className={`group ${post.id === 'golf-bag-approach-multi-model-ai' ? 'bg-green-600 hover:bg-green-700' : ''}`}>
                          {post.id === 'golf-bag-approach-multi-model-ai' ? 'Read Full Guide' : 'Read Article'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
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
              {isLoading ? (
                <div data-testid="blog-loading-skeleton" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse overflow-hidden">
                      <div className="h-48 bg-muted"></div>
                      <CardHeader>
                        <div className="h-6 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div data-testid="blog-posts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...transformedDbPosts, ...recentPosts, ...legacyPosts.filter((post: any) => !post.featured)].map((post: any, index) => (
                    <Card key={index} data-testid={`blog-post-card-${post.slug}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          width="800"
                          height="450"
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
                          <Link href={post.slug ? `/blog/${post.slug}` : '#'}>
                            <Button variant="ghost" size="sm" className="group">
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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