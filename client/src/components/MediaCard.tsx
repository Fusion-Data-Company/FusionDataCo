import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, ExternalLink, Share2 } from "lucide-react";
import { format } from "date-fns";
import MediaEmbed from "./MediaEmbed";
import type { MediaItem } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface MediaCardProps {
  item: MediaItem;
}

export default function MediaCard({ item }: MediaCardProps) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const { toast } = useToast();

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'podcast': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'video': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'speaking': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'article': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.toLowerCase() === 'video' || type.toLowerCase() === 'podcast') {
      return <Play className="h-4 w-4" />;
    }
    return null;
  };

  const handleShare = async (platform: 'linkedin' | 'twitter' | 'copy') => {
    const url = item.externalUrl || window.location.href;
    const text = `Check out: ${item.title}`;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied",
          description: "Media link copied to clipboard",
        });
        break;
    }
  };

  return (
    <>
      <Card 
        className="group hover:border-primary/50 transition-all duration-300 overflow-hidden"
        data-testid={`card-media-${item.id}`}
      >
        {/* Thumbnail */}
        <div 
          className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden cursor-pointer"
          onClick={() => setIsEmbedOpen(true)}
          data-testid={`thumbnail-media-${item.id}`}
        >
          {item.thumbnailUrl ? (
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              data-testid={`img-thumbnail-${item.id}`}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Play className="h-16 w-16 text-primary/30" />
            </div>
          )}
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-primary rounded-full p-4">
              {getTypeIcon(item.type) || <ExternalLink className="h-6 w-6 text-black" />}
            </div>
          </div>

          {/* Featured Badge */}
          {item.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-accent text-black font-bold" data-testid={`badge-featured-${item.id}`}>
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge 
              className={getTypeColor(item.type)}
              data-testid={`badge-type-${item.id}`}
            >
              {item.type}
            </Badge>
            {item.platform && (
              <Badge variant="outline" className="text-xs" data-testid={`badge-platform-${item.id}`}>
                {item.platform}
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors" data-testid={`text-title-${item.id}`}>
            {item.title}
          </CardTitle>
          <CardDescription className="line-clamp-2" data-testid={`text-description-${item.id}`}>
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span data-testid={`text-date-${item.id}`}>
                {format(new Date(item.publishDate), 'MMM d, yyyy')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                onClick={() => setIsEmbedOpen(true)}
                data-testid={`button-watch-${item.id}`}
              >
                {item.type.toLowerCase() === 'article' ? 'Read' : 'Watch'}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" data-testid={`button-share-${item.id}`}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleShare('linkedin')} data-testid={`share-linkedin-${item.id}`}>
                    Share on LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('twitter')} data-testid={`share-twitter-${item.id}`}>
                    Share on Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('copy')} data-testid={`share-copy-${item.id}`}>
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {item.topic && (
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Topic: </span>
              <Badge variant="secondary" className="text-xs" data-testid={`badge-topic-${item.id}`}>
                {item.topic}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <MediaEmbed
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
        title={item.title}
        embedUrl={item.embedUrl}
        externalUrl={item.externalUrl}
        platform={item.platform}
      />
    </>
  );
}
