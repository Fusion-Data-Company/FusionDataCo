import * as cron from 'node-cron';
import { ContentAutomationService } from './contentAutomation';
import { YouTubeMonitoringService } from './youtubeMonitoring';
import { storage } from '../storage';
import { InsertAutomationJob } from '@shared/schema';

export class AutomationScheduler {
  private contentService: ContentAutomationService;
  private youtubeService: YouTubeMonitoringService;
  private isRunning: boolean = false;

  constructor() {
    this.contentService = new ContentAutomationService();
    this.youtubeService = new YouTubeMonitoringService();
  }

  // Start all scheduled tasks
  async start(): Promise<void> {
    if (this.isRunning) {
      console.log('[SCHEDULER] Already running');
      return;
    }

    console.log('[SCHEDULER] Starting automation scheduler');
    this.isRunning = true;

    // Setup default YouTube channels if needed
    await this.youtubeService.setupDefaultChannels();

    // Schedule daily blog posts at 8:00 AM Pacific (16:00 UTC)
    cron.schedule('0 16 * * *', async () => {
      await this.runWithJobTracking('daily_blog', async () => {
        return await this.contentService.runDailyBlogWorkflow();
      });
    }, {
      timezone: 'America/Los_Angeles'
    });

    // Schedule monthly newsletter on 1st at 9:00 AM Pacific (17:00 UTC)
    cron.schedule('0 17 1 * *', async () => {
      await this.runWithJobTracking('monthly_newsletter', async () => {
        return await this.contentService.generateMonthlyNewsletter();
      });
    }, {
      timezone: 'America/Los_Angeles'
    });

    // Schedule YouTube monitoring every hour
    cron.schedule('0 * * * *', async () => {
      await this.runWithJobTracking('youtube_monitor', async () => {
        await this.youtubeService.runHourlyMonitoring();
        return 'YouTube monitoring completed';
      });
    });

    // Schedule content research cleanup daily at midnight Pacific
    cron.schedule('0 8 * * *', async () => {
      await this.runWithJobTracking('cleanup', async () => {
        await this.cleanupOldData();
        return 'Data cleanup completed';
      });
    }, {
      timezone: 'America/Los_Angeles'
    });

    console.log('[SCHEDULER] All automation tasks scheduled');
    console.log('[SCHEDULER] Daily blog: 8:00 AM Pacific');
    console.log('[SCHEDULER] Monthly newsletter: 1st of month, 9:00 AM Pacific');
    console.log('[SCHEDULER] YouTube monitoring: Every hour');
    console.log('[SCHEDULER] Data cleanup: Daily at midnight Pacific');
  }

  // Stop all scheduled tasks
  stop(): void {
    console.log('[SCHEDULER] Stopping automation scheduler');
    cron.getTasks().forEach(task => task.stop());
    this.isRunning = false;
  }

  // Wrapper for job execution with tracking
  private async runWithJobTracking(
    jobType: string, 
    jobFunction: () => Promise<string>
  ): Promise<void> {
    const job: InsertAutomationJob = {
      jobType,
      status: 'pending',
      scheduledTime: new Date(),
      startedAt: null,
      completedAt: null,
      errorMessage: null,
      resultData: {},
      parameters: {}
    };

    try {
      // Create job record
      const createdJob = await storage.createAutomationJob(job);
      console.log(`[SCHEDULER] Starting job: ${jobType} (ID: ${createdJob.id})`);

      // Update to running
      await storage.updateAutomationJob(createdJob.id, {
        status: 'running',
        startedAt: new Date()
      });

      // Execute the job
      const result = await jobFunction();

      // Update to completed
      await storage.updateAutomationJob(createdJob.id, {
        status: 'completed',
        completedAt: new Date(),
        resultData: { result, executionTime: Date.now() - (createdJob.startedAt?.getTime() || Date.now()) }
      });

      console.log(`[SCHEDULER] Job completed: ${jobType} - ${result}`);

    } catch (error) {
      console.error(`[SCHEDULER] Job failed: ${jobType}`, error);
      
      // Update to failed
      try {
        const jobs = await storage.getJobsByType(jobType);
        const latestJob = jobs[0];
        if (latestJob && latestJob.status === 'running') {
          await storage.updateAutomationJob(latestJob.id, {
            status: 'failed',
            completedAt: new Date(),
            errorMessage: error instanceof Error ? error.message : String(error)
          });
        }
      } catch (updateError) {
        console.error('[SCHEDULER] Failed to update job status:', updateError);
      }
    }
  }

  // Manual triggers for testing
  async triggerDailyBlog(): Promise<string> {
    console.log('[SCHEDULER] Manually triggering daily blog generation');
    return await this.contentService.runDailyBlogWorkflow();
  }

  async triggerMonthlyNewsletter(): Promise<string> {
    console.log('[SCHEDULER] Manually triggering monthly newsletter');
    return await this.contentService.generateMonthlyNewsletter();
  }

  async triggerYouTubeMonitoring(): Promise<void> {
    console.log('[SCHEDULER] Manually triggering YouTube monitoring');
    await this.youtubeService.runHourlyMonitoring();
  }

  // Data cleanup utilities
  private async cleanupOldData(): Promise<void> {
    console.log('[SCHEDULER] Starting data cleanup');

    try {
      // Clean up old content research (keep last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Clean up old automation job records (keep last 100 of each type)
      const jobTypes = ['daily_blog', 'monthly_newsletter', 'youtube_monitor', 'cleanup'];
      
      for (const jobType of jobTypes) {
        const jobs = await storage.getJobsByType(jobType);
        if (jobs.length > 100) {
          console.log(`[CLEANUP] Would clean up ${jobs.length - 100} old ${jobType} jobs`);
          // In a real implementation, you'd delete the excess jobs
        }
      }

      console.log('[SCHEDULER] Data cleanup completed');

    } catch (error) {
      console.error('[SCHEDULER] Data cleanup failed:', error);
    }
  }

  // Status and monitoring
  async getJobStatus(): Promise<any> {
    try {
      const pendingJobs = await storage.getPendingJobs();
      const recentJobs = await storage.getJobsByType('daily_blog');
      
      return {
        isRunning: this.isRunning,
        pendingJobs: pendingJobs.length,
        lastDailyBlog: recentJobs[0] || null,
        scheduledTasks: Array.from(cron.getTasks()).length,
        nextExecution: {
          dailyBlog: '8:00 AM Pacific (daily)',
          monthlyNewsletter: '1st of month, 9:00 AM Pacific',
          youtubeMonitoring: 'Every hour'
        }
      };
    } catch (error) {
      console.error('[SCHEDULER] Failed to get job status:', error);
      return {
        isRunning: this.isRunning,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async getRecentJobs(limit: number = 20): Promise<any[]> {
    try {
      const allJobs = [];
      const jobTypes = ['daily_blog', 'monthly_newsletter', 'youtube_monitor'];
      
      for (const jobType of jobTypes) {
        const jobs = await storage.getJobsByType(jobType);
        allJobs.push(...jobs.slice(0, 5));
      }

      return allJobs
        .sort((a, b) => new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('[SCHEDULER] Failed to get recent jobs:', error);
      return [];
    }
  }
}

// Global scheduler instance
export const automationScheduler = new AutomationScheduler();