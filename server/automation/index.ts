/**
 * FusionDataCo Content Automation System
 * 
 * This module provides fully autonomous content generation and distribution
 * based on the VIBE CODING methodology and Sandler sales framework.
 * 
 * Key Features:
 * - Daily blog post generation at 8:00 AM Pacific
 * - Monthly newsletter with Sandler funnel content
 * - Hourly YouTube channel monitoring
 * - Automated content research and synthesis
 * - Social media snippet generation
 * 
 * Architecture:
 * - ContentAutomationService: Core content generation logic
 * - YouTubeMonitoringService: Video discovery and analysis
 * - AutomationScheduler: Cron-based task scheduling
 * - Database integration: PostgreSQL storage for all content
 */

export { ContentAutomationService } from './contentAutomation';
export { YouTubeMonitoringService } from './youtubeMonitoring';
export { AutomationScheduler, automationScheduler } from './scheduler';

// Import for internal use
import { automationScheduler } from './scheduler';

// Automation system configuration
export const AUTOMATION_CONFIG = {
  // Scheduling times (Pacific timezone)
  DAILY_BLOG_TIME: '08:00', // 8:00 AM Pacific
  MONTHLY_NEWSLETTER_TIME: '09:00', // 9:00 AM Pacific on 1st of month
  YOUTUBE_MONITORING_INTERVAL: '0 * * * *', // Every hour
  DATA_CLEANUP_TIME: '00:00', // Midnight Pacific
  
  // Content parameters
  BLOG_POST_LENGTH: '2000-3000 words',
  RESEARCH_SOURCES: 4,
  YOUTUBE_CHANNELS_MONITORED: 10,
  RELEVANCE_THRESHOLD: 5,
  
  // VIBE CODING focus areas
  PRIMARY_KEYWORDS: [
    'cursor ai', 'v0 dev', 'bolt.new', 'claude dev', 'windsurf editor',
    'elevenlabs agents', 'conversational ai', 'n8n automation',
    'ai video generation', 'vibe coding', 'rapid development'
  ],
  
  // Sandler methodology sections for newsletters
  SANDLER_STRUCTURE: {
    RED: 'Pain points - what\'s breaking in their business',
    YELLOW: 'Consequences - what happens if they don\'t adapt',
    GREEN: 'Solutions - our tools and methods',
    PURPLE: 'Registration CTA with urgency'
  }
};

/**
 * Initialize the automation system
 * Call this from your main server file to start all scheduled tasks
 */
export async function initializeAutomation(): Promise<void> {
  try {
    console.log('[AUTOMATION] Initializing FusionDataCo automation system...');
    
    // Start the scheduler
    await automationScheduler.start();
    
    console.log('[AUTOMATION] ✅ System initialized successfully');
    console.log('[AUTOMATION] 📝 Daily blogs scheduled for 8:00 AM Pacific');
    console.log('[AUTOMATION] 📧 Monthly newsletters scheduled for 1st at 9:00 AM Pacific');
    console.log('[AUTOMATION] 📺 YouTube monitoring running every hour');
    
  } catch (error) {
    console.error('[AUTOMATION] ❌ Failed to initialize automation system:', error);
    throw error;
  }
}

/**
 * Get automation system status
 */
export async function getAutomationStatus(): Promise<any> {
  return await automationScheduler.getJobStatus();
}

/**
 * Manual triggers for testing and immediate execution
 */
export const manualTriggers = {
  dailyBlog: () => automationScheduler.triggerDailyBlog(),
  monthlyNewsletter: () => automationScheduler.triggerMonthlyNewsletter(),
  youtubeMonitoring: () => automationScheduler.triggerYouTubeMonitoring()
};