import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MediaEmbedProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  embedUrl?: string | null;
  externalUrl?: string | null;
  platform?: string | null;
}

export default function MediaEmbed({ isOpen, onClose, title, embedUrl, externalUrl, platform }: MediaEmbedProps) {
  // Extract video ID for YouTube
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };

  // Extract Spotify episode ID
  const getSpotifyEmbedUrl = (url: string) => {
    const episodeMatch = url.match(/episode\/([a-zA-Z0-9]+)/);
    if (episodeMatch && episodeMatch[1]) {
      return `https://open.spotify.com/embed/episode/${episodeMatch[1]}`;
    }
    return url;
  };

  const renderEmbed = () => {
    if (!embedUrl && !externalUrl) {
      return (
        <div className="text-center py-12 text-muted-foreground" data-testid="embed-unavailable">
          <p>No embed available for this media item.</p>
        </div>
      );
    }

    // If we have an embed URL, use it
    if (embedUrl) {
      let finalEmbedUrl = embedUrl;

      // Handle YouTube
      if (platform?.toLowerCase().includes('youtube') || embedUrl.includes('youtube')) {
        finalEmbedUrl = getYouTubeEmbedUrl(embedUrl);
      }
      
      // Handle Spotify
      if (platform?.toLowerCase().includes('spotify') || embedUrl.includes('spotify')) {
        finalEmbedUrl = getSpotifyEmbedUrl(embedUrl);
      }

      return (
        <div className="aspect-video w-full" data-testid="media-embed-iframe">
          <iframe
            src={finalEmbedUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }

    // Fallback to external link
    if (externalUrl) {
      return (
        <div className="text-center py-12" data-testid="embed-external-link">
          <p className="text-muted-foreground mb-4">
            This media is hosted externally on {platform || 'another platform'}
          </p>
          <Button asChild data-testid="button-open-external">
            <a href={externalUrl} target="_blank" rel="noopener noreferrer">
              Open in {platform || 'Browser'}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl" data-testid="dialog-media-embed">
        <DialogHeader>
          <DialogTitle data-testid="text-embed-title">{title}</DialogTitle>
        </DialogHeader>
        {renderEmbed()}
      </DialogContent>
    </Dialog>
  );
}
