import { useState } from "react";
import { Helmet } from 'react-helmet';
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaCard from "@/components/MediaCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Tv, Mic, Users, FileText } from "lucide-react";
import type { MediaItem } from "@shared/schema";

export default function Media() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: mediaItems = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['/api/media'],
  });

  // Filter media items based on active tab and search query
  const filteredItems = mediaItems.filter(item => {
    const matchesTab = activeTab === "all" || item.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.topic && item.topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'video': return <Tv className="h-4 w-4" />;
      case 'podcast': return <Mic className="h-4 w-4" />;
      case 'speaking': return <Users className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Rob Andino in the Media | Interviews, Podcasts & Speaking Engagements</title>
        <meta name="description" content="Watch Rob Andino's interviews, podcast appearances, and speaking engagements on AI, marketing automation, and business growth strategies." />
        <meta name="keywords" content="Rob Andino interviews, AI podcasts, marketing automation talks, business growth speaking, enterprise AI discussions" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rob Andino in the Media | Interviews & Podcasts" />
        <meta property="og:description" content="Explore Rob Andino's media appearances discussing AI, automation, and business growth." />
        <meta property="og:url" content="https://fusiondataco.com/media" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#0a0a0d] to-[#121218] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#14ffc8]/5 z-0"></div>
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-page-title">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Rob Andino in the Media
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8" data-testid="text-page-description">
                  Explore interviews, podcast appearances, and speaking engagements covering AI automation, 
                  marketing innovation, and business growth strategies.
                </p>

                {/* Search Bar */}
                <div className="max-w-md mx-auto relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search media by title, topic, or keyword..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-media"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Filter Tabs */}
          <section className="py-8 px-4 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-10">
            <div className="container mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
                  <TabsTrigger value="all" className="flex items-center gap-2" data-testid="tab-all">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="podcast" className="flex items-center gap-2" data-testid="tab-podcast">
                    {getTabIcon('podcast')} Podcasts
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2" data-testid="tab-video">
                    {getTabIcon('video')} Videos
                  </TabsTrigger>
                  <TabsTrigger value="speaking" className="flex items-center gap-2" data-testid="tab-speaking">
                    {getTabIcon('speaking')} Speaking
                  </TabsTrigger>
                  <TabsTrigger value="article" className="flex items-center gap-2" data-testid="tab-article">
                    {getTabIcon('article')} Articles
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </section>

          {/* Media Grid */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i} 
                      className="h-96 bg-card rounded-lg animate-pulse"
                      data-testid={`skeleton-card-${i}`}
                    />
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-16" data-testid="empty-state">
                  <div className="text-6xl mb-4">🎙️</div>
                  <h3 className="text-2xl font-bold mb-2">No Media Found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No results found for "${searchQuery}". Try a different search term.`
                      : "Media content will be added soon. Check back later!"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-sm text-muted-foreground" data-testid="text-results-count">
                    Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="media-grid">
                    {filteredItems.map((item) => (
                      <MediaCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
