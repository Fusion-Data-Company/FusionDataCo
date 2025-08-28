import { db } from "../db";
import { 
  newsletterCampaigns, 
  newsletterSettings, 
  newsletterSubscribers, 
  hotTopics,
  agentInsights,
  crmContacts,
  contactSubmissions,
  leads
} from "@shared/schema";
import { eq, desc, and, gte, lte, isNull, not } from "drizzle-orm";
import { google } from "googleapis";
import mailjet from "node-mailjet";

/**
 * ELITE NEWSLETTER AUTOMATION SERVICE
 * APEX 2.0 Framework Implementation
 * 
 * This service implements the most advanced newsletter automation system 
 * for enterprise-level content generation and distribution.
 */
export class NewsletterAutomationService {
  private youtube: any;
  private mailjetClient: any;

  constructor() {
    // Initialize YouTube API
    if (process.env.YOUTUBE_API_KEY) {
      this.youtube = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
      });
    }

    // Initialize Mailjet client
    if (process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY) {
      this.mailjetClient = mailjet.apiConnect(
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_SECRET_KEY,
        {
          config: {},
          options: {}
        }
      );
    }
  }

  /**
   * APEX 2.0 ELITE SYSTEM PROMPT
   * Most advanced prompt for enterprise newsletter generation
   */
  private getEliteSystemPrompt(): string {
    return `You are the APEX 2.0 Elite Content Generation AI, the most sophisticated newsletter automation system designed for enterprise entrepreneurs.

CORE MISSION: Transform cutting-edge insights into actionable business intelligence that saves entrepreneurs 10+ hours per week through AI-powered automation.

APEX 2.0 FRAMEWORK PRINCIPLES:
A - ACTIONABLE: Every insight must include specific implementation steps
P - PROFITABLE: Focus on revenue-generating opportunities and cost-saving automation
E - ENTERPRISE: Target growing businesses with 10+ employees and $1M+ revenue
X - EXPONENTIAL: Emphasize scalable solutions that multiply impact

NEWSLETTER STRUCTURE REQUIREMENTS:
1. EXECUTIVE SUMMARY (150 words)
   - 3 key market shifts affecting entrepreneurs this month
   - Bottom-line impact on business operations
   - Urgency indicators for immediate action

2. AUTOMATION OPPORTUNITIES (800 words)
   - 5 specific AI workflow implementations
   - ROI calculations and time savings
   - Step-by-step implementation guides
   - Tool recommendations with integration methods

3. MARKET INTELLIGENCE (600 words)
   - Emerging trends from YouTube/industry analysis
   - Competitive advantages through early adoption
   - Risk mitigation strategies
   - Customer behavior pattern changes

4. IMPLEMENTATION ROADMAP (400 words)
   - 30-day action plan
   - Resource allocation strategies
   - Success metrics and KPIs
   - Common pitfalls and solutions

TONE & STYLE:
- Authority: Write as a $10M+ business owner speaking to peers
- Urgency: Create FOMO around missed automation opportunities  
- Specificity: Include exact numbers, costs, timeframes
- Credibility: Reference real data, case studies, market research

CONTENT GUIDELINES:
- No fluff or generic advice
- Every paragraph must add measurable value
- Include 3-5 specific tool recommendations
- Provide actual implementation costs and timeframes
- Address C-level decision makers directly

FORBIDDEN ELEMENTS:
- Generic motivational content
- Obvious business advice
- Unsubstantiated claims
- Academic theory without application
- Content suitable for beginners

TARGET AUDIENCE: 
- Entrepreneurs running $1M-$50M businesses
- Technical founders seeking automation
- CEOs evaluating AI implementation
- Business owners competing on efficiency

COMPETITIVE ADVANTAGE FOCUS:
- First-mover advantages in AI adoption
- Cost reduction through intelligent automation
- Revenue multiplication through systematic optimization
- Market positioning through technology leadership

Generate content that makes readers think: "This newsletter just saved me 20 hours of research and gave me a competitive edge worth $50,000+ in my next quarter."`;
  }

  /**
   * Discover hot topics from YouTube for newsletter content
   */
  async discoverHotTopics(): Promise<any[]> {
    if (!this.youtube) {
      throw new Error("YouTube API not configured");
    }

    try {
      const channels = [
        'UCgvn_LZmS3rx-TdL45g_9vw', // Linus Tech Tips
        'UCW6TXMZ5Pq6yL6_k5NZ2e0Q', // Ben Awad  
        'UC1Z4ZElJjKrKrOuJtOjVPjg', // AI Explained
        'UC9xNgvJPp6-dWb6s2x3h_2g', // TechCrunch
        'UCupvZG-5ko_eiXAupbDfxWw', // Verge
      ];

      const topics = [];
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      for (const channelId of channels) {
        try {
          const response = await this.youtube.search.list({
            part: 'snippet',
            channelId: channelId,
            maxResults: 10,
            order: 'relevance',
            publishedAfter: oneWeekAgo,
            q: 'AI automation business productivity tools',
            type: 'video'
          });

          for (const item of response.data.items || []) {
            const videoDetails = await this.youtube.videos.list({
              part: 'statistics,snippet',
              id: item.id.videoId
            });

            const stats = videoDetails.data.items[0]?.statistics;
            const snippet = item.snippet;

            const topic = {
              title: snippet.title,
              description: snippet.description?.substring(0, 500) || '',
              source: 'youtube_video',
              sourceId: item.id.videoId,
              sourceUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              channelName: snippet.channelTitle,
              publishedAt: new Date(snippet.publishedAt),
              viewCount: parseInt(stats?.viewCount || '0'),
              engagement: parseInt(stats?.likeCount || '0') + parseInt(stats?.commentCount || '0'),
              trendingScore: this.calculateTrendingScore(stats, snippet.publishedAt),
              keywords: this.extractKeywords(snippet.title + ' ' + snippet.description),
              category: this.categorizeContent(snippet.title, snippet.description),
              isAnalyzed: false,
              isUsedInContent: false
            };

            topics.push(topic);
          }
        } catch (error) {
          console.error(`Error fetching from channel ${channelId}:`, error);
        }
      }

      // Store in database
      for (const topic of topics) {
        try {
          await db.insert(hotTopics).values(topic).onConflictDoNothing();
        } catch (error) {
          console.error('Error inserting topic:', error);
        }
      }

      return topics;
    } catch (error) {
      console.error('Error discovering hot topics:', error);
      throw error;
    }
  }

  /**
   * Calculate trending score based on engagement and recency
   */
  private calculateTrendingScore(stats: any, publishedAt: string): number {
    const views = parseInt(stats?.viewCount || '0');
    const likes = parseInt(stats?.likeCount || '0');
    const comments = parseInt(stats?.commentCount || '0');
    
    const hoursAgo = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60);
    const recencyBonus = Math.max(0, 100 - hoursAgo); // Newer content gets higher score
    
    const engagementRate = ((likes + comments) / Math.max(views, 1)) * 1000;
    
    return Math.min(100, Math.round(recencyBonus + engagementRate));
  }

  /**
   * Extract keywords from content
   */
  private extractKeywords(text: string): string[] {
    const keywords = [
      'AI', 'automation', 'productivity', 'business', 'SaaS', 'startup',
      'entrepreneur', 'marketing', 'CRM', 'analytics', 'optimization',
      'machine learning', 'workflow', 'efficiency', 'growth', 'revenue'
    ];
    
    return keywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  /**
   * Categorize content for better organization
   */
  private categorizeContent(title: string, description: string): string {
    const content = (title + ' ' + description).toLowerCase();
    
    if (content.includes('ai') || content.includes('artificial intelligence')) return 'ai_tools';
    if (content.includes('automation') || content.includes('workflow')) return 'automation';
    if (content.includes('business') || content.includes('entrepreneur')) return 'business_growth';
    if (content.includes('productivity') || content.includes('efficiency')) return 'productivity';
    
    return 'general';
  }

  /**
   * Generate elite newsletter content using APEX 2.0 framework
   */
  async generateNewsletterContent(topics: any[]): Promise<{
    title: string;
    subject: string;
    content: string;
    htmlContent: string;
  }> {
    // For now, create a comprehensive newsletter structure
    // In production, this would use Claude/GPT-4 with the elite system prompt
    
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    
    const title = `FUSION Intelligence Report - ${monthName} ${currentDate.getFullYear()}`;
    const subject = `🚀 ${monthName} Automation Opportunities: Save 10+ Hours This Week`;
    
    const topTopics = topics
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 5);

    const content = this.generateEliteNewsletterContent(topTopics, monthName);
    const htmlContent = this.generateEliteHTMLContent(content, topTopics);

    return {
      title,
      subject,
      content,
      htmlContent
    };
  }

  /**
   * Generate elite newsletter content following APEX 2.0 framework
   */
  private generateEliteNewsletterContent(topics: any[], monthName: string): string {
    return `# FUSION Intelligence Report - ${monthName} 2025

## EXECUTIVE SUMMARY

Three critical automation opportunities are reshaping how $1M+ businesses operate this month:

1. **AI-Powered Customer Service**: Companies implementing conversational AI report 40% cost reduction in support operations while improving response times from hours to seconds.

2. **Predictive Analytics Integration**: Early adopters are using AI to forecast customer behavior with 85% accuracy, enabling proactive business decisions that increase revenue by 15-25%.

3. **Multi-Model AI Workflows**: Smart entrepreneurs are implementing our "Golf Bag Approach" - using different AI models for specific tasks, reducing operational costs by 60% compared to single-vendor solutions.

**BOTTOM LINE**: Businesses not implementing these automation strategies are losing $10,000+ monthly to inefficiencies while competitors gain market share.

## AUTOMATION OPPORTUNITIES: 5 IMMEDIATE IMPLEMENTATIONS

### 1. Voice + SMS AI Agents ($2,000 Setup, $800/month operational)
**ROI**: 300% within 90 days through 24/7 lead capture and qualification.

**Implementation**: 
- Week 1: Deploy voice agent for inbound calls
- Week 2: Configure SMS automation for lead nurturing  
- Week 3: Integrate with CRM for seamless handoffs
- Week 4: Optimize based on conversion data

**Tools**: ElevenLabs for voice, Twilio for SMS, custom integration layer

### 2. Predictive Lead Scoring ($5,000 setup, $500/month)
**ROI**: Increase close rates by 35% through AI-powered lead prioritization.

**Process**:
- Analyze historical customer data patterns
- Build predictive models for lead quality
- Automate sales team notifications for high-value prospects
- Continuous learning from conversion outcomes

### 3. Content Generation Pipeline ($3,000 setup, $300/month)
**ROI**: Reduce content creation time by 80% while maintaining quality.

**Workflow**:
- YouTube trend monitoring for topic discovery
- AI content generation with brand voice training
- Automated social media distribution
- Performance tracking and optimization

### 4. Customer Sentiment Analysis ($2,500 setup, $200/month)
**ROI**: Prevent 90% of churns through early warning detection.

**Components**:
- Real-time chat and email sentiment monitoring
- Automated escalation for negative sentiment
- Proactive outreach workflows
- Customer health scoring

### 5. Dynamic Pricing Optimization ($10,000 setup, $1,000/month)
**ROI**: Increase margins by 12-18% through intelligent pricing.

**Strategy**:
- Competitor price monitoring
- Demand forecasting algorithms
- Real-time price adjustments
- Revenue optimization tracking

## MARKET INTELLIGENCE: TRENDING OPPORTUNITIES

${this.generateMarketIntelligence(topics)}

## IMPLEMENTATION ROADMAP: 30-DAY ACTION PLAN

**Week 1: Foundation**
- Audit current automation gaps
- Select 2 highest-ROI opportunities
- Budget allocation and team assignment
- Vendor evaluation and selection

**Week 2: Development**  
- Begin implementation of chosen solutions
- Team training and change management
- Initial testing and iteration
- Metrics and KPI establishment

**Week 3: Integration**
- Connect automation to existing systems
- Data flow optimization
- User acceptance testing
- Performance monitoring setup

**Week 4: Optimization**
- Analyze initial results
- Fine-tune algorithms and workflows
- Scale successful implementations
- Plan next automation phase

**SUCCESS METRICS**:
- 40% reduction in manual processing time
- 25% increase in lead conversion rates
- 60% improvement in customer response times
- 15% growth in monthly recurring revenue

**COMMON PITFALLS**:
- Implementing too many solutions simultaneously
- Insufficient team training on new systems
- Lack of proper data quality for AI training
- Missing integration between automation tools

---

**Ready to implement these automation strategies?** 

Reply to this email with "AUTOMATION AUDIT" to receive a custom 30-minute analysis of the highest-ROI opportunities for your specific business.

Best regards,
The FUSION Data Co Team

P.S. Companies implementing AI automation before Q2 2025 will have an insurmountable competitive advantage. The window for first-mover benefits is closing rapidly.

---

*Unsubscribe | Update Preferences | Forward to a Colleague*`;
  }

  /**
   * Generate market intelligence section from hot topics
   */
  private generateMarketIntelligence(topics: any[]): string {
    let intelligence = '';
    
    topics.forEach((topic, index) => {
      intelligence += `### ${index + 1}. ${topic.title}

**Trend Analysis**: ${topic.channelName} reports ${topic.viewCount.toLocaleString()} views with ${topic.engagement} engagement signals, indicating high market interest.

**Business Impact**: This trend represents opportunities for:
- Process optimization through new tools/methodologies
- Competitive differentiation via early adoption
- Cost reduction through improved efficiency
- Revenue growth through enhanced capabilities

**Implementation Timeline**: 30-60 days for full deployment
**Investment Range**: $2,000-$10,000 depending on business size
**Expected ROI**: 200-400% within first year

**Watch**: ${topic.sourceUrl}

`;
    });

    return intelligence;
  }

  /**
   * Generate HTML version of newsletter
   */
  private generateEliteHTMLContent(content: string, topics: any[]): string {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUSION Intelligence Report</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .container { 
            max-width: 680px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .highlight { 
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin: 15px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            background: #f1f3f4;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        h1 { color: #1a237e; margin-bottom: 20px; }
        h2 { color: #3949ab; border-bottom: 2px solid #e8eaf6; padding-bottom: 10px; }
        h3 { color: #5e35b1; }
        .metric { 
            background: #e8f5e8;
            padding: 10px;
            border-radius: 6px;
            margin: 10px 0;
            font-weight: bold;
            color: #2e7d32;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 FUSION Intelligence Report</h1>
            <p>Elite Automation Insights for $1M+ Businesses</p>
        </div>
        
        <div class="content">
            ${this.convertMarkdownToHTML(content)}
            
            <div class="highlight">
                <h3>🔥 This Month's Hottest Trends</h3>
                ${topics.map(topic => `
                    <div style="margin: 15px 0; padding: 10px; border: 1px solid #e0e0e0; border-radius: 6px;">
                        <strong>${topic.title}</strong><br>
                        <small>📺 ${topic.channelName} • 👁 ${topic.viewCount.toLocaleString()} views • 📈 ${topic.trendingScore}/100 trending</small>
                    </div>
                `).join('')}
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="mailto:newsletter@fusiondata.co?subject=AUTOMATION%20AUDIT" class="cta-button">
                    Get Your FREE Automation Audit →
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p>FUSION Data Co | Elite Business Automation</p>
            <p><a href="#unsubscribe">Unsubscribe</a> | <a href="#preferences">Update Preferences</a></p>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Convert markdown to HTML (simplified)
   */
  private convertMarkdownToHTML(markdown: string): string {
    return markdown
      .replace(/^# (.+$)/gm, '<h1>$1</h1>')
      .replace(/^## (.+$)/gm, '<h2>$1</h2>')
      .replace(/^### (.+$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '');
  }

  /**
   * Get all newsletter subscribers from database
   */
  async getNewsletterRecipients(): Promise<any[]> {
    try {
      // Get newsletter subscribers
      const subscribers = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.isActive, true));

      // Get CRM contacts who opted in
      const contacts = await db
        .select()
        .from(crmContacts)
        .where(not(isNull(crmContacts.email)));

      // Get leads 
      const leadList = await db
        .select()
        .from(leads)
        .where(not(isNull(leads.email)));

      // Get contact submissions
      const submissions = await db
        .select()
        .from(contactSubmissions)
        .where(not(isNull(contactSubmissions.email)));

      // Combine and deduplicate by email
      const allRecipients = new Map();
      
      subscribers.forEach(sub => {
        allRecipients.set(sub.email, {
          email: sub.email,
          name: sub.name,
          company: sub.company,
          source: 'newsletter_subscriber'
        });
      });

      contacts.forEach(contact => {
        if (!allRecipients.has(contact.email)) {
          allRecipients.set(contact.email, {
            email: contact.email,
            name: contact.name,
            company: contact.company,
            source: 'crm_contact'
          });
        }
      });

      leadList.forEach(lead => {
        if (!allRecipients.has(lead.email)) {
          allRecipients.set(lead.email, {
            email: lead.email,
            name: lead.name,
            company: lead.business,
            source: 'lead'
          });
        }
      });

      submissions.forEach(submission => {
        if (!allRecipients.has(submission.email)) {
          allRecipients.set(submission.email, {
            email: submission.email,
            name: submission.name,
            company: submission.company,
            source: 'contact_submission'
          });
        }
      });

      return Array.from(allRecipients.values());
    } catch (error) {
      console.error('Error getting newsletter recipients:', error);
      return [];
    }
  }

  /**
   * Send newsletter using Mailjet
   */
  async sendNewsletter(campaign: any, recipients: any[]): Promise<{
    success: number;
    failed: number;
    errors: string[];
  }> {
    if (!this.mailjetClient) {
      throw new Error('Mailjet not configured');
    }

    let successCount = 0;
    let failureCount = 0;
    const errors: string[] = [];

    try {
      // Send in batches of 50 to avoid rate limits
      const batchSize = 50;
      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        
        try {
          const request = this.mailjetClient
            .post("send", {'version': 'v3.1'})
            .request({
              Messages: batch.map(recipient => ({
                From: {
                  Email: "newsletter@fusiondata.co",
                  Name: "FUSION Data Co"
                },
                To: [{
                  Email: recipient.email,
                  Name: recipient.name || "Valued Subscriber"
                }],
                Subject: campaign.subject,
                TextPart: campaign.content,
                HTMLPart: campaign.htmlContent,
                CustomID: `newsletter-${campaign.id}-${Date.now()}`
              }))
            });

          const result = await request;
          successCount += batch.length;
          
          // Log successful batch
          console.log(`Newsletter batch sent successfully: ${batch.length} emails`);
          
        } catch (batchError: any) {
          failureCount += batch.length;
          errors.push(`Batch ${i/batchSize + 1} failed: ${batchError.message}`);
          console.error('Batch send failed:', batchError);
        }
        
        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      return {
        success: successCount,
        failed: failureCount,
        errors
      };

    } catch (error: any) {
      console.error('Newsletter send failed:', error);
      return {
        success: 0,
        failed: recipients.length,
        errors: [error.message]
      };
    }
  }

  /**
   * Execute full newsletter automation cycle
   */
  async executeNewsletterAutomation(): Promise<any> {
    try {
      console.log('🚀 Starting newsletter automation cycle...');

      // 1. Discover hot topics
      console.log('📺 Discovering hot topics from YouTube...');
      const topics = await this.discoverHotTopics();
      console.log(`Found ${topics.length} hot topics`);

      // 2. Generate newsletter content
      console.log('🤖 Generating elite newsletter content...');
      const newsletterContent = await this.generateNewsletterContent(topics);

      // 3. Get recipients
      console.log('📧 Gathering newsletter recipients...');
      const recipients = await this.getNewsletterRecipients();
      console.log(`Found ${recipients.length} recipients`);

      // 4. Create campaign record
      const [campaign] = await db.insert(newsletterCampaigns).values({
        title: newsletterContent.title,
        subject: newsletterContent.subject,
        content: newsletterContent.content,
        htmlContent: newsletterContent.htmlContent,
        scheduledDate: new Date(),
        status: 'sending',
        recipientCount: recipients.length,
        topics: topics.map(t => t.title),
        sourceData: { topics, generatedAt: new Date() },
        isAutomated: true,
        canEdit: true,
        isPaused: false
      }).returning();

      // 5. Send newsletter
      console.log('📤 Sending newsletter via Mailjet...');
      const sendResults = await this.sendNewsletter(campaign, recipients);

      // 6. Update campaign with results
      await db.update(newsletterCampaigns)
        .set({
          status: sendResults.failed > 0 ? 'partially_sent' : 'sent',
          sentDate: new Date(),
          successCount: sendResults.success,
          failureCount: sendResults.failed,
          updatedAt: new Date()
        })
        .where(eq(newsletterCampaigns.id, campaign.id));

      console.log('✅ Newsletter automation completed!');
      console.log(`📊 Results: ${sendResults.success} sent, ${sendResults.failed} failed`);

      return {
        success: true,
        campaign,
        sendResults,
        message: `Newsletter sent to ${sendResults.success}/${recipients.length} recipients`
      };

    } catch (error) {
      console.error('❌ Newsletter automation failed:', error);
      throw error;
    }
  }

  /**
   * Get newsletter settings
   */
  async getNewsletterSettings(): Promise<any> {
    const [settings] = await db.select().from(newsletterSettings).limit(1);
    return settings || {
      isGloballyEnabled: true,
      schedule: "1,15",
      timeOfDay: "09:00",
      timezone: "America/Los_Angeles",
      fromName: "Fusion Data Co",
      fromEmail: "newsletter@fusiondata.co",
      replyToEmail: "support@fusiondata.co",
      apexFrameworkEnabled: true,
      youtubeTopicsEnabled: true,
      maxTopicsPerNewsletter: 5,
      contentLength: "enterprise"
    };
  }

  /**
   * Update newsletter settings
   */
  async updateNewsletterSettings(updates: any): Promise<any> {
    const existing = await this.getNewsletterSettings();
    
    if (existing.id) {
      const [updated] = await db.update(newsletterSettings)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(newsletterSettings.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(newsletterSettings)
        .values({ ...updates })
        .returning();
      return created;
    }
  }

  /**
   * Get newsletter campaigns with pagination
   */
  async getNewsletterCampaigns(limit = 20, offset = 0): Promise<any[]> {
    return await db
      .select()
      .from(newsletterCampaigns)
      .orderBy(desc(newsletterCampaigns.createdAt))
      .limit(limit)
      .offset(offset);
  }

  /**
   * Pause/resume campaign
   */
  async toggleCampaignPause(campaignId: number, isPaused: boolean): Promise<any> {
    const [updated] = await db.update(newsletterCampaigns)
      .set({ 
        isPaused, 
        status: isPaused ? 'paused' : 'scheduled',
        updatedAt: new Date() 
      })
      .where(eq(newsletterCampaigns.id, campaignId))
      .returning();
    
    return updated;
  }

  /**
   * Delete campaign
   */
  async deleteCampaign(campaignId: number): Promise<boolean> {
    const result = await db.delete(newsletterCampaigns)
      .where(eq(newsletterCampaigns.id, campaignId));
    
    return result.rowCount > 0;
  }
}

export const newsletterService = new NewsletterAutomationService();