import { useParams } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPostBySlug } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      // Check static blog posts first
      const staticPost = getBlogPostBySlug(slug);
      if (staticPost) {
        setPost(staticPost);
        setLoading(false);
        return;
      }
      
      // If not found in static posts, try to fetch from database
      fetch(`/api/blog/post/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setPost(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Fusion Data Co</title>
        <meta name="description" content={post.excerpt || post.seo?.metaDescription} />
        <meta name="keywords" content={post.seo?.keywords?.join(', ') || post.tags?.join(', ')} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.seo?.metaDescription} />
        <meta property="og:image" content={post.featuredImage || post.image} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.seo?.metaDescription} />
        <meta name="twitter:image" content={post.featuredImage || post.image} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a0d] via-[#121218] to-[#1a1a20] text-foreground">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-12 px-4 bg-gradient-to-br from-[#0a0a0d] via-[#14141a] to-[#1a1a24] relative overflow-hidden">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <img 
                  src={post.featuredImage || post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.tags && post.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      By {post.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Button variant="outline" size="sm" onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-12 px-4 bg-gradient-to-b from-[#121218] via-[#1a1a24] to-[#0f0f15] relative">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"></div>
            </div>
            <div className="container mx-auto max-w-4xl relative z-10">
              <article className="prose prose-xl prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-primary prose-li:text-foreground/90 prose-code:text-primary prose-blockquote:border-primary prose-blockquote:text-foreground">
                {post.content ? (
                  <div 
                    className="formatted-content space-y-8 text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/\n\n/g, '</p><p class="mt-6 text-foreground/90 leading-relaxed">')
                        .replace(/^/, '<p class="text-foreground/90 leading-relaxed">')
                        .replace(/$/, '</p>')
                        .replace(/## (.*)/g, '<h2 class="text-3xl font-bold mt-10 mb-6 text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$1</h2>')
                        .replace(/### (.*)/g, '<h3 class="text-2xl font-semibold mt-8 mb-4 text-foreground border-l-4 border-primary pl-4">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
                        .replace(/- (.*)/g, '<li class="ml-4 mb-3 text-foreground/90 flex items-start"><span class="text-primary mr-2">•</span><span>$1</span></li>')
                    }} 
                  />
                ) : (
                  <div className="text-xl leading-relaxed space-y-6 text-foreground/90">
                    {post.excerpt.split('\n\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-6">{paragraph}</p>
                    ))}
                  </div>
                )}
              </article>
              
              {/* Call to Action */}
              <div className="mt-12 p-8 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-xl border border-primary/20 backdrop-blur-sm text-center shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get expert guidance on implementing these strategies for your organization.
                </p>
                <Link href="/contact">
                  <Button size="lg">
                    Get Your Free Consultation
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