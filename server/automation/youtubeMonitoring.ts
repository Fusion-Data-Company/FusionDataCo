import { google } from 'googleapis';
import { storage } from '../storage';
import { InsertYoutubeChannel, InsertYoutubeVideo, InsertContentResearch } from '@shared/schema';

export class YouTubeMonitoringService {
  private youtube: any;
  private readonly MONITORED_KEYWORDS = [
    'cursor ai', 'v0 dev', 'bolt.new', 'claude dev', 'windsurf editor',
    'elevenlabs agents', 'conversational ai', 'voice ai',
    'n8n automation', 'make.com workflows', 'zapier alternative',
    'ai video generation', 'runway ml', 'pika labs', 'midjourney',
    'vibe coding', 'rapid development', 'no-code ai'
  ];

  private readonly DEFAULT_CHANNELS = [
    {
      channelId: 'UCXuqSBlHAE6Xw-yeJA0Tunw', // Linus Tech Tips
      channelName: 'Linus Tech Tips',
      keywords: ['ai', 'cursor', 'development']
    },
    {
      channelId: 'UC0uTPqBCFIpZxlz_Lv1tk_g', // Ben Awad
      channelName: 'Ben Awad',
      keywords: ['cursor ai', 'v0', 'development']
    },
    {
      channelId: 'UCmXVXfidLZQkppLPaATcHag', // AI Explained
      channelName: 'AI Explained',
      keywords: ['ai tools', 'automation']
    }
  ];

  constructor() {
    this.initializeYouTubeAPI();
  }

  private async initializeYouTubeAPI(): Promise<void> {
    try {
      // For now, we'll use API key authentication
      // In production, you might want to use OAuth for higher quotas
      this.youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY || process.env.GOOGLE_CLIENT_SECRET
      });
      
      console.log('[YOUTUBE] YouTube API initialized');
    } catch (error) {
      console.error('[YOUTUBE] Failed to initialize YouTube API:', error);
    }
  }

  // SETUP DEFAULT CHANNELS
  async setupDefaultChannels(): Promise<void> {
    console.log('[YOUTUBE] Setting up default monitored channels');
    
    for (const channelData of this.DEFAULT_CHANNELS) {
      try {
        await storage.createYoutubeChannel({
          channelId: channelData.channelId,
          channelName: channelData.channelName,
          channelUrl: `https://youtube.com/channel/${channelData.channelId}`,
          keywords: channelData.keywords,
          isActive: true,
          lastChecked: null,
          videoCount: 0,
          subscriberCount: 0
        });
        
        console.log(`[YOUTUBE] Added channel: ${channelData.channelName}`);
      } catch (error) {
        console.error(`[YOUTUBE] Failed to add channel ${channelData.channelName}:`, error);
      }
    }
  }

  // HOURLY MONITORING WORKFLOW
  async runHourlyMonitoring(): Promise<void> {
    console.log('[YOUTUBE] Starting hourly YouTube monitoring');

    try {
      const channels = await storage.getActiveYoutubeChannels();
      const newVideos: any[] = [];

      for (const channel of channels) {
        const videos = await this.checkChannelForNewVideos(channel);
        newVideos.push(...videos);
        
        // Update last checked time
        await storage.updateYoutubeChannel(channel.id, {
          lastChecked: new Date()
        });
      }

      // Also search for trending videos with our keywords
      const trendingVideos = await this.searchTrendingVideos();
      newVideos.push(...trendingVideos);

      console.log(`[YOUTUBE] Found ${newVideos.length} new relevant videos`);

      // Process and store videos
      for (const video of newVideos) {
        await this.processAndStoreVideo(video);
      }

    } catch (error) {
      console.error('[YOUTUBE] Hourly monitoring failed:', error);
    }
  }

  private async checkChannelForNewVideos(channel: any): Promise<any[]> {
    if (!this.youtube) {
      console.error('[YOUTUBE] YouTube API not initialized');
      return [];
    }

    try {
      // Get recent videos from the channel
      const response = await this.youtube.search.list({
        part: 'snippet',
        channelId: channel.channelId,
        order: 'date',
        maxResults: 10,
        publishedAfter: this.getLastCheckTime(channel.lastChecked)
      });

      const videos = response.data.items || [];
      const relevantVideos = videos.filter((video: any) => 
        this.isVideoRelevant(video, channel.keywords)
      );

      console.log(`[YOUTUBE] Found ${relevantVideos.length} relevant videos from ${channel.channelName}`);
      return relevantVideos.map((video: any) => ({
        ...video,
        sourceChannelId: channel.channelId
      }));

    } catch (error) {
      console.error(`[YOUTUBE] Failed to check channel ${channel.channelName}:`, error);
      return [];
    }
  }

  private async searchTrendingVideos(): Promise<any[]> {
    if (!this.youtube) {
      return [];
    }

    try {
      const allVideos: any[] = [];
      
      // Search for each keyword set
      for (const keyword of this.MONITORED_KEYWORDS.slice(0, 5)) { // Limit to avoid quota issues
        try {
          const response = await this.youtube.search.list({
            part: 'snippet',
            q: keyword,
            order: 'relevance',
            maxResults: 5,
            publishedAfter: this.getRecentTimeframe(),
            type: 'video'
          });

          const videos = response.data.items || [];
          allVideos.push(...videos.map((video: any) => ({
            ...video,
            searchKeyword: keyword
          })));

        } catch (error) {
          console.error(`[YOUTUBE] Search failed for keyword "${keyword}":`, error);
        }
      }

      return allVideos;

    } catch (error) {
      console.error('[YOUTUBE] Trending video search failed:', error);
      return [];
    }
  }

  private isVideoRelevant(video: any, channelKeywords: string[] = []): boolean {
    const title = video.snippet?.title?.toLowerCase() || '';
    const description = video.snippet?.description?.toLowerCase() || '';
    const content = title + ' ' + description;

    // Check against channel-specific keywords
    const hasChannelKeywords = channelKeywords.some(keyword => 
      content.includes(keyword.toLowerCase())
    );

    // Check against global monitoring keywords  
    const hasGlobalKeywords = this.MONITORED_KEYWORDS.some(keyword =>
      content.includes(keyword.toLowerCase())
    );

    return hasChannelKeywords || hasGlobalKeywords;
  }

  private async processAndStoreVideo(videoData: any): Promise<void> {
    try {
      const relevanceScore = this.calculateVideoRelevance(videoData);
      
      // Only store highly relevant videos
      if (relevanceScore < 3) {
        return;
      }

      const video: InsertYoutubeVideo = {
        videoId: videoData.id?.videoId || videoData.id,
        channelId: videoData.sourceChannelId || videoData.snippet?.channelId,
        title: videoData.snippet?.title || '',
        description: videoData.snippet?.description?.substring(0, 1000) || '',
        publishedAt: new Date(videoData.snippet?.publishedAt || Date.now()),
        thumbnailUrl: videoData.snippet?.thumbnails?.medium?.url || '',
        videoUrl: `https://youtube.com/watch?v=${videoData.id?.videoId || videoData.id}`,
        viewCount: 0, // We'd need additional API calls to get this
        likeCount: 0,
        relevanceScore,
        keywords: this.extractVideoKeywords(videoData),
        isRelevant: relevanceScore >= 5,
        usedInContent: false
      };

      await storage.createYoutubeVideo(video);

      // Also create content research entry for high-value videos
      if (relevanceScore >= 7) {
        const research: InsertContentResearch = {
          date: new Date().toISOString().split('T')[0],
          source: 'youtube',
          sourceUrl: video.videoUrl!,
          title: video.title,
          summary: video.description?.substring(0, 300) || '',
          keywords: video.keywords || [],
          relevanceScore,
          category: this.categorizeVideo(videoData),
          rawData: { videoData },
          processed: false,
          usedInContent: false
        };

        await storage.createContentResearch(research);
      }

      console.log(`[YOUTUBE] Stored video: ${video.title} (relevance: ${relevanceScore})`);

    } catch (error) {
      console.error('[YOUTUBE] Failed to process video:', error);
    }
  }

  private calculateVideoRelevance(videoData: any): number {
    const title = videoData.snippet?.title?.toLowerCase() || '';
    const description = videoData.snippet?.description?.toLowerCase() || '';
    const content = title + ' ' + description;

    let score = 0;

    // High-value keywords get more points
    const highValueKeywords = ['cursor ai', 'v0 dev', 'vibe coding', 'elevenlabs', 'claude dev'];
    highValueKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 3;
    });

    // Medium-value keywords
    const mediumValueKeywords = ['ai automation', 'no-code', 'rapid development', 'workflow'];
    mediumValueKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 2;
    });

    // General AI keywords
    const generalKeywords = ['ai', 'automation', 'development', 'tools'];
    generalKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 1;
    });

    // Bonus for recent videos
    const publishedAt = new Date(videoData.snippet?.publishedAt || 0);
    const hoursAgo = (Date.now() - publishedAt.getTime()) / (1000 * 60 * 60);
    if (hoursAgo < 24) score += 2;
    if (hoursAgo < 6) score += 1;

    return Math.min(score, 10);
  }

  private extractVideoKeywords(videoData: any): string[] {
    const title = videoData.snippet?.title?.toLowerCase() || '';
    const description = videoData.snippet?.description?.toLowerCase() || '';
    const content = title + ' ' + description;

    const keywords: string[] = [];
    this.MONITORED_KEYWORDS.forEach(keyword => {
      if (content.includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });

    return keywords;
  }

  private categorizeVideo(videoData: any): string {
    const title = videoData.snippet?.title?.toLowerCase() || '';
    const description = videoData.snippet?.description?.toLowerCase() || '';
    const content = title + ' ' + description;

    if (content.includes('cursor') || content.includes('v0') || content.includes('bolt')) {
      return 'vibe_coding';
    } else if (content.includes('elevenlabs') || content.includes('voice') || content.includes('tts')) {
      return 'conversational_ai';
    } else if (content.includes('n8n') || content.includes('automation') || content.includes('workflow')) {
      return 'automation';
    } else if (content.includes('ai video') || content.includes('runway') || content.includes('pika')) {
      return 'ai_video';
    }

    return 'ai_tools';
  }

  private getLastCheckTime(lastChecked: Date | null): string {
    if (!lastChecked) {
      // If never checked, look back 24 hours
      const yesterday = new Date();
      yesterday.setHours(yesterday.getHours() - 24);
      return yesterday.toISOString();
    }
    return lastChecked.toISOString();
  }

  private getRecentTimeframe(): string {
    // Look for videos from the last 6 hours for trending search
    const recent = new Date();
    recent.setHours(recent.getHours() - 6);
    return recent.toISOString();
  }

  // MANUAL MONITORING CONTROLS
  async addChannelToMonitor(channelId: string, channelName: string, keywords: string[]): Promise<void> {
    try {
      await storage.createYoutubeChannel({
        channelId,
        channelName,
        channelUrl: `https://youtube.com/channel/${channelId}`,
        keywords,
        isActive: true,
        lastChecked: null,
        videoCount: 0,
        subscriberCount: 0
      });

      console.log(`[YOUTUBE] Added channel to monitoring: ${channelName}`);
    } catch (error) {
      console.error('[YOUTUBE] Failed to add channel:', error);
      throw error;
    }
  }

  async getRecentDiscoveries(limit: number = 20): Promise<any[]> {
    try {
      return await storage.getRecentVideos(limit);
    } catch (error) {
      console.error('[YOUTUBE] Failed to get recent discoveries:', error);
      return [];
    }
  }
}