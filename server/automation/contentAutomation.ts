import { generateContent } from '../openRouter';
import { storage } from '../storage';
import { InsertBlogPost, InsertContentResearch, InsertAutomationJob } from '@shared/schema';
import axios from 'axios';
import * as cheerio from 'cheerio';

export class ContentAutomationService {
  private readonly RESEARCH_SOURCES = {
    techcrunch: 'https://techcrunch.com/category/artificial-intelligence/',
    verge: 'https://www.theverge.com/ai-artificial-intelligence',
    venturebeat: 'https://venturebeat.com/ai/',
  };

  private readonly VIBE_CODING_KEYWORDS = [
    'cursor ai', 'v0 dev', 'bolt.new', 'claude dev', 'windsurf editor',
    'anthropic', 'vercel ai', 'github copilot', 'replit agent',
    'elevenlabs', 'openai', 'chatgpt', 'gpt-4', 'claude',
    'n8n', 'make.com', 'zapier', 'automation', 'workflow',
    'ai video', 'runway ml', 'pika labs', 'midjourney', 'stable diffusion',
    'vibe coding', 'no-code', 'low-code', 'rapid development'
  ];

  // DAILY BLOG POST WORKFLOW
  async runDailyBlogWorkflow(): Promise<string> {
    const today = new Date().toISOString().split('T')[0];
    console.log(`[AUTOMATION] Starting daily blog workflow for ${today}`);

    try {
      // Phase 1: Research (6:00 AM - 7:00 AM Pacific)
      const researchData = await this.gatherDailyResearch();
      
      // Phase 2: Content Synthesis (7:00 AM - 7:30 AM Pacific)
      const blogPost = await this.generateDailyBlogPost(researchData);
      
      // Phase 3: Publishing (7:30 AM - 8:00 AM Pacific)
      const publishedPost = await this.publishBlogPost(blogPost);
      
      console.log(`[AUTOMATION] Daily blog post published: ${publishedPost.title}`);
      return publishedPost.slug;
      
    } catch (error) {
      console.error('[AUTOMATION] Daily blog workflow failed:', error);
      throw error;
    }
  }

  // RESEARCH PHASE
  private async gatherDailyResearch(): Promise<InsertContentResearch[]> {
    const today = new Date().toISOString().split('T')[0];
    const researchResults: InsertContentResearch[] = [];

    // Scrape news sources
    for (const [source, url] of Object.entries(this.RESEARCH_SOURCES)) {
      try {
        const articles = await this.scrapeNewsSource(source, url);
        researchResults.push(...articles);
      } catch (error) {
        console.error(`[RESEARCH] Failed to scrape ${source}:`, error);
      }
    }

    // Store research data
    for (const research of researchResults) {
      try {
        await storage.createContentResearch(research);
      } catch (error) {
        console.error('[RESEARCH] Failed to store research data:', error);
      }
    }

    console.log(`[RESEARCH] Gathered ${researchResults.length} research items`);
    return researchResults;
  }

  private async scrapeNewsSource(source: string, url: string): Promise<InsertContentResearch[]> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const articles: InsertContentResearch[] = [];

      // Generic selectors for article extraction
      const selectors = this.getSelectorsForSource(source);
      
      $(selectors.article).each((index, element) => {
        const title = $(element).find(selectors.title).text().trim();
        const summary = $(element).find(selectors.summary).text().trim();
        const link = $(element).find(selectors.link).attr('href');
        
        if (title && this.isRelevantContent(title, summary)) {
          const relevanceScore = this.calculateRelevanceScore(title, summary);
          
          articles.push({
            date: new Date().toISOString().split('T')[0],
            source,
            sourceUrl: link ? (link.startsWith('http') ? link : `https://${source}.com${link}`) : url,
            title,
            summary: summary.substring(0, 500),
            keywords: this.extractKeywords(title + ' ' + summary),
            relevanceScore,
            category: this.categorizeContent(title, summary),
            rawData: {
              element: $(element).html()?.substring(0, 1000) || ''
            },
            processed: false,
            usedInContent: false
          });
        }
      });

      return articles.slice(0, 5); // Limit to top 5 per source
    } catch (error) {
      console.error(`[SCRAPER] Error scraping ${source}:`, error);
      return [];
    }
  }

  private getSelectorsForSource(source: string): { article: string; title: string; summary: string; link: string } {
    const selectors = {
      techcrunch: {
        article: '.post-block',
        title: '.post-block__title__link',
        summary: '.post-block__content',
        link: '.post-block__title__link'
      },
      verge: {
        article: 'article',
        title: 'h2 a, h3 a',
        summary: '.c-entry-summary',
        link: 'h2 a, h3 a'
      },
      venturebeat: {
        article: 'article',
        title: '.ArticleListing__title a',
        summary: '.ArticleListing__excerpt',
        link: '.ArticleListing__title a'
      }
    };

    return selectors[source as keyof typeof selectors] || {
      article: 'article',
      title: 'h1, h2, h3',
      summary: 'p',
      link: 'a'
    };
  }

  private isRelevantContent(title: string, summary: string): boolean {
    const content = (title + ' ' + summary).toLowerCase();
    return this.VIBE_CODING_KEYWORDS.some(keyword => 
      content.includes(keyword.toLowerCase())
    );
  }

  private calculateRelevanceScore(title: string, summary: string): number {
    const content = (title + ' ' + summary).toLowerCase();
    let score = 0;
    
    this.VIBE_CODING_KEYWORDS.forEach(keyword => {
      if (content.includes(keyword.toLowerCase())) {
        score += keyword.includes('vibe coding') ? 3 : 1;
      }
    });
    
    return Math.min(score, 10);
  }

  private extractKeywords(text: string): string[] {
    const keywords: string[] = [];
    this.VIBE_CODING_KEYWORDS.forEach(keyword => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });
    return keywords;
  }

  private categorizeContent(title: string, summary: string): string {
    const content = (title + ' ' + summary).toLowerCase();
    
    if (content.includes('cursor') || content.includes('v0') || content.includes('bolt')) {
      return 'vibe_coding';
    } else if (content.includes('ai video') || content.includes('runway') || content.includes('pika')) {
      return 'ai_video';
    } else if (content.includes('n8n') || content.includes('automation') || content.includes('workflow')) {
      return 'automation';
    } else if (content.includes('elevenlabs') || content.includes('voice') || content.includes('tts')) {
      return 'conversational_ai';
    }
    
    return 'ai_tools';
  }

  // CONTENT GENERATION PHASE
  private async generateDailyBlogPost(researchData: InsertContentResearch[]): Promise<InsertBlogPost> {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const systemPrompt = `You are FusionDataCo's AI content specialist. Every piece of content must:
1. Lead with VIBE CODING as the primary narrative - this is the future of development
2. Position all tools and news through the lens of 'build fast, ship faster'
3. Use casual but authoritative tone - we're the cool kids who actually know our shit
4. Include actionable takeaways for non-technical entrepreneurs
5. Reference specific use cases with real tools combinations
6. Always tie back to lead generation and business growth
7. Emphasize no-code/low-code solutions that amplify technical capabilities
8. Highlight multimodal AI applications that create competitive advantages

Generate a comprehensive blog post using the APEX Framework:
- Attention-grabbing headline focusing on VIBE CODING revolution
- Problem identification for small business owners
- Evidence from today's discoveries
- eXecution steps using discovered tools

Structure content with sections:
- "What the Hottest Vibe Coders Did Today"
- "New LLM Drops & What They Mean for Your Business"
- "Multimodal Magic: ElevenLabs + OpenRouter Combos"
- "Automation Arsenal: N8N/Make/Cursor/Gumloop Updates"
- "Creator Economy Tools: Video Gen & Influencer Tech"`;

    const prompt = `Create a daily VIBE CODING blog post for ${dateStr}.

Research Data from Today:
${researchData.map(item => `
- ${item.title} (${item.source})
  Summary: ${item.summary}
  Keywords: ${item.keywords?.join(', ')}
  Relevance: ${item.relevanceScore}/10
`).join('\n')}

Requirements:
1. Compelling headline with "VIBE CODING" or related terms
2. 2000-3000 words total
3. Include all required sections
4. Reference specific tools and discoveries from research
5. Actionable takeaways for business owners
6. Include social media snippets for Twitter, LinkedIn, Instagram
7. SEO-optimized with relevant keywords
8. Call-to-action pointing to FusionDataCo services

Return the content as a JSON object with:
{
  "title": "Main blog title",
  "excerpt": "150-word excerpt for preview",
  "content": "Full HTML blog content",
  "tags": ["array", "of", "relevant", "tags"],
  "socialSnippets": {
    "twitter": "Twitter post content",
    "linkedin": "LinkedIn post content", 
    "instagram": "Instagram caption"
  }
}`;

    try {
      const response = await generateContent(prompt, 'anthropic/claude-3-opus:beta', {
        temperature: 0.8,
        max_tokens: 4000,
        system_prompt: systemPrompt
      });

      const contentData = JSON.parse(response);
      const slug = this.generateSlug(contentData.title);

      return {
        title: contentData.title,
        slug,
        content: contentData.content,
        excerpt: contentData.excerpt,
        tags: contentData.tags,
        category: 'VIBE CODING',
        status: 'published',
        publishedAt: new Date(),
        authorId: 1, // System author
        isAutomated: true,
        sourceData: { researchData, generatedAt: new Date().toISOString() },
        socialSnippets: contentData.socialSnippets,
        metrics: {}
      };

    } catch (error) {
      console.error('[GENERATION] Blog post generation failed:', error);
      
      // Fallback content
      return this.generateFallbackBlogPost(researchData);
    }
  }

  private generateSlug(title: string): string {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return `${dateStr}-${title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)}`;
  }

  private async generateFallbackBlogPost(researchData: InsertContentResearch[]): Promise<InsertBlogPost> {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return {
      title: `VIBE CODING Update: ${dateStr} - The Latest in AI Development Tools`,
      slug: this.generateSlug(`VIBE CODING Update ${dateStr}`),
      content: `<h1>VIBE CODING Update: What's Happening Today</h1>
        <p>The VIBE CODING revolution continues to accelerate. Here's what caught our attention today in the world of rapid AI-powered development.</p>
        
        <h2>Today's Discoveries</h2>
        ${researchData.map(item => `
          <h3>${item.title}</h3>
          <p><strong>Source:</strong> ${item.source}</p>
          <p>${item.summary}</p>
          <p><strong>Keywords:</strong> ${item.keywords?.join(', ')}</p>
        `).join('')}
        
        <h2>What This Means for Your Business</h2>
        <p>These developments continue to prove that VIBE CODING isn't just a trend—it's the future of how we build and ship products.</p>
        
        <p><strong>Ready to join the VIBE CODING revolution?</strong> <a href="/contact">Contact FusionDataCo</a> to see how these tools can transform your business.</p>`,
      excerpt: `Daily roundup of the latest VIBE CODING tools and AI development updates for ${dateStr}.`,
      tags: ['vibe-coding', 'ai-tools', 'development', 'automation'],
      category: 'VIBE CODING',
      status: 'published',
      publishedAt: new Date(),
      authorId: 1,
      isAutomated: true,
      sourceData: { researchData, fallback: true },
      socialSnippets: {
        twitter: `🚀 VIBE CODING Update: Latest AI development tools that are changing the game. From Cursor to V0, here's what's happening today in rapid development. #VibeCoding #AI`,
        linkedin: `Daily VIBE CODING update: The AI development landscape continues to evolve rapidly. Here are today's key discoveries that every business leader should know about.`,
        instagram: `⚡ VIBE CODING revolution continues! Today's AI tool discoveries that are reshaping how we build and ship products. Swipe for details! #VibeCoding #AI #Innovation`
      },
      metrics: {}
    };
  }

  // PUBLISHING PHASE
  private async publishBlogPost(blogPostData: InsertBlogPost): Promise<any> {
    try {
      const publishedPost = await storage.createBlogPost(blogPostData);
      console.log(`[PUBLISHING] Blog post published: ${publishedPost.title}`);
      return publishedPost;
    } catch (error) {
      console.error('[PUBLISHING] Failed to publish blog post:', error);
      throw error;
    }
  }

  // MONTHLY NEWSLETTER WORKFLOW
  async generateMonthlyNewsletter(): Promise<string> {
    console.log('[AUTOMATION] Starting monthly newsletter generation');

    try {
      // Get top-performing blog posts from past month
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      
      const blogPosts = await storage.getPublishedBlogPosts();
      const recentPosts = blogPosts.filter(post => 
        new Date(post.publishedAt!) > oneMonthAgo
      ).slice(0, 10);

      // Generate Sandler-style newsletter content
      const newsletterContent = await this.generateNewsletterContent(recentPosts);
      
      // Send to active subscribers
      const subscribers = await storage.getActiveSubscribers();
      await this.sendNewsletter(newsletterContent, subscribers);

      console.log(`[AUTOMATION] Monthly newsletter sent to ${subscribers.length} subscribers`);
      return 'Newsletter sent successfully';
      
    } catch (error) {
      console.error('[AUTOMATION] Monthly newsletter failed:', error);
      throw error;
    }
  }

  private async generateNewsletterContent(recentPosts: any[]): Promise<any> {
    const systemPrompt = `You are creating a monthly newsletter for FusionDataCo using the Sandler sales methodology:
- RED Section: Pain points (what's breaking in their business)
- YELLOW Section: Consequences (what happens if they don't adapt)  
- GREEN Section: Solutions (our tools and methods)
- PURPLE Section: Registration CTA with urgency

Focus on VIBE CODING narrative and business growth through automation.`;

    const prompt = `Create a monthly VIBE CODING newsletter based on these recent blog posts:

${recentPosts.map(post => `
- ${post.title}
  ${post.excerpt}
`).join('\n')}

Structure:
1. Subject line
2. Email HTML content using Sandler methodology
3. Clear call-to-action for FusionDataCo services

Format as JSON: {"subject": "...", "content": "..."}`;

    try {
      const response = await generateContent(prompt, 'anthropic/claude-3-opus:beta', {
        temperature: 0.7,
        system_prompt: systemPrompt
      });

      return JSON.parse(response);
    } catch (error) {
      console.error('[NEWSLETTER] Generation failed:', error);
      return {
        subject: "VIBE CODING Monthly: Don't Get Left Behind",
        content: `<h1>The VIBE CODING Revolution Continues</h1>
          <p>Here's what happened this month in the world of rapid AI development...</p>
          <p><strong>Ready to join the revolution?</strong> <a href="https://fusiondataco.com/contact">Get started with FusionDataCo</a></p>`
      };
    }
  }

  private async sendNewsletter(content: any, subscribers: any[]): Promise<void> {
    if (subscribers.length === 0) {
      console.log('[NEWSLETTER] No subscribers to send to');
      return;
    }

    try {
      // Import mailjet service
      const { mailjetService } = await import('./mailjetService');
      
      // Convert subscribers to mailjet format
      const recipients = subscribers.map(sub => ({
        email: sub.email,
        name: sub.name || sub.email
      }));

      // Send newsletter
      await mailjetService.sendNewsletter(
        content.subject,
        content.content,
        recipients
      );

      console.log(`[NEWSLETTER] ✅ Successfully sent to ${subscribers.length} subscribers`);

    } catch (error) {
      console.error('[NEWSLETTER] ❌ Failed to send newsletter:', error);
      // Don't throw - we want to continue execution even if email fails
    }
  }
}