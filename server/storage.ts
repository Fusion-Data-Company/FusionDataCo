import { 
  users, chatMessages, contactSubmissions, crmContacts, crmDeals, crmActivities,
  leads, socialTrials, blogPosts, automationJobs, contentResearch, 
  newsletterSubscribers, youtubeChannels, youtubeVideos,
  type User, type UpsertUser, 
  type ContactSubmission, type InsertContactSubmission,
  type ChatMessage, type InsertChatMessage,
  type CrmContact, type InsertCrmContact,
  type CrmDeal, type InsertCrmDeal,
  type CrmActivity, type InsertCrmActivity,
  type Lead, type InsertLead,
  type SocialTrial, type InsertSocialTrial,
  type BlogPost, type InsertBlogPost,
  type AutomationJob, type InsertAutomationJob,
  type ContentResearch, type InsertContentResearch,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type YoutubeChannel, type InsertYoutubeChannel,
  type YoutubeVideo, type InsertYoutubeVideo
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, and, desc } from 'drizzle-orm';
import { Pool } from 'pg';

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Create Drizzle ORM instance
const db = drizzle(pool);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User operations - Updated for Replit Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByReplitAuthId(replitAuthId: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Contact form operations - Enhanced for all form types
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionsByType(formType: string): Promise<ContactSubmission[]>;
  
  // Chat operations
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]>;
  
  // CRM operations
  // Contacts
  createContact(contact: InsertCrmContact): Promise<CrmContact>;
  getContact(id: number): Promise<CrmContact | undefined>;
  getAllContacts(): Promise<CrmContact[]>;
  updateContact(id: number, contact: Partial<InsertCrmContact>): Promise<CrmContact | undefined>;
  deleteContact(id: number): Promise<boolean>;
  
  // Deals
  createDeal(deal: InsertCrmDeal): Promise<CrmDeal>;
  getDeal(id: number): Promise<CrmDeal | undefined>;
  getAllDeals(): Promise<CrmDeal[]>;
  getDealsByContact(contactId: number): Promise<CrmDeal[]>;
  updateDeal(id: number, deal: Partial<InsertCrmDeal>): Promise<CrmDeal | undefined>;
  deleteDeal(id: number): Promise<boolean>;
  
  // Activities
  createActivity(activity: InsertCrmActivity): Promise<CrmActivity>;
  getActivity(id: number): Promise<CrmActivity | undefined>;
  getAllActivities(): Promise<CrmActivity[]>;
  getActivitiesByContact(contactId: number): Promise<CrmActivity[]>;
  getActivitiesByDeal(dealId: number): Promise<CrmActivity[]>;
  updateActivity(id: number, activity: Partial<InsertCrmActivity>): Promise<CrmActivity | undefined>;
  deleteActivity(id: number): Promise<boolean>;
  
  // Lead operations
  createLead(lead: InsertLead): Promise<Lead>;
  getLead(id: number): Promise<Lead | undefined>;
  getAllLeads(): Promise<Lead[]>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  
  // Social trial operations
  createSocialTrial(trial: InsertSocialTrial): Promise<SocialTrial>;
  getSocialTrial(id: number): Promise<SocialTrial | undefined>;
  getAllSocialTrials(): Promise<SocialTrial[]>;
  updateSocialTrial(id: number, trial: Partial<InsertSocialTrial>): Promise<SocialTrial | undefined>;
  deleteSocialTrial(id: number): Promise<boolean>;
  
  // Content automation operations
  // Blog posts
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Automation jobs
  createAutomationJob(job: InsertAutomationJob): Promise<AutomationJob>;
  getAutomationJob(id: number): Promise<AutomationJob | undefined>;
  getPendingJobs(): Promise<AutomationJob[]>;
  getJobsByType(jobType: string): Promise<AutomationJob[]>;
  updateAutomationJob(id: number, job: Partial<InsertAutomationJob>): Promise<AutomationJob | undefined>;
  
  // Content research
  createContentResearch(research: InsertContentResearch): Promise<ContentResearch>;
  getContentResearchByDate(date: string): Promise<ContentResearch[]>;
  getUnprocessedResearch(): Promise<ContentResearch[]>;
  updateContentResearch(id: number, research: Partial<InsertContentResearch>): Promise<ContentResearch | undefined>;
  
  // Newsletter subscribers
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined>;
  getActiveSubscribers(): Promise<NewsletterSubscriber[]>;
  updateNewsletterSubscriber(id: number, subscriber: Partial<InsertNewsletterSubscriber>): Promise<NewsletterSubscriber | undefined>;
  
  // YouTube monitoring
  createYoutubeChannel(channel: InsertYoutubeChannel): Promise<YoutubeChannel>;
  getActiveYoutubeChannels(): Promise<YoutubeChannel[]>;
  updateYoutubeChannel(id: number, channel: Partial<InsertYoutubeChannel>): Promise<YoutubeChannel | undefined>;
  
  createYoutubeVideo(video: InsertYoutubeVideo): Promise<YoutubeVideo>;
  getRecentVideos(limit?: number): Promise<YoutubeVideo[]>;
  updateYoutubeVideo(id: number, video: Partial<InsertYoutubeVideo>): Promise<YoutubeVideo | undefined>;
}

export class PostgresStorage implements IStorage {
  // User operations - Updated for Replit Auth
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByReplitAuthId(replitAuthId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.replitAuthId, replitAuthId));
    return result[0];
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const result = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.replitAuthId,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result[0];
  }

  // Contact form operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmissionsByType(formType: string): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions)
      .where(eq(contactSubmissions.formType, formType))
      .orderBy(desc(contactSubmissions.createdAt));
  }

  // Chat operations
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const result = await db.insert(chatMessages).values(message).returning();
    return result[0];
  }

  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId));
  }
  
  // CRM operations
  // Contacts
  async createContact(contact: InsertCrmContact): Promise<CrmContact> {
    const result = await db.insert(crmContacts).values(contact).returning();
    return result[0];
  }
  
  async getContact(id: number): Promise<CrmContact | undefined> {
    const result = await db.select().from(crmContacts).where(eq(crmContacts.id, id));
    return result[0];
  }
  
  async getAllContacts(): Promise<CrmContact[]> {
    return await db.select().from(crmContacts).orderBy(desc(crmContacts.createdAt));
  }
  
  async updateContact(id: number, contact: Partial<InsertCrmContact>): Promise<CrmContact | undefined> {
    const result = await db
      .update(crmContacts)
      .set({ ...contact, updatedAt: new Date() })
      .where(eq(crmContacts.id, id))
      .returning();
    return result[0];
  }
  
  async deleteContact(id: number): Promise<boolean> {
    const result = await db
      .delete(crmContacts)
      .where(eq(crmContacts.id, id))
      .returning({ id: crmContacts.id });
    return result.length > 0;
  }
  
  // Deals
  async createDeal(deal: InsertCrmDeal): Promise<CrmDeal> {
    const result = await db.insert(crmDeals).values(deal).returning();
    return result[0];
  }
  
  async getDeal(id: number): Promise<CrmDeal | undefined> {
    const result = await db.select().from(crmDeals).where(eq(crmDeals.id, id));
    return result[0];
  }
  
  async getAllDeals(): Promise<CrmDeal[]> {
    return await db.select().from(crmDeals).orderBy(desc(crmDeals.createdAt));
  }
  
  async getDealsByContact(contactId: number): Promise<CrmDeal[]> {
    return await db
      .select()
      .from(crmDeals)
      .where(eq(crmDeals.contactId, contactId))
      .orderBy(desc(crmDeals.createdAt));
  }
  
  async updateDeal(id: number, deal: Partial<InsertCrmDeal>): Promise<CrmDeal | undefined> {
    const result = await db
      .update(crmDeals)
      .set({ ...deal, updatedAt: new Date() })
      .where(eq(crmDeals.id, id))
      .returning();
    return result[0];
  }
  
  async deleteDeal(id: number): Promise<boolean> {
    const result = await db
      .delete(crmDeals)
      .where(eq(crmDeals.id, id))
      .returning({ id: crmDeals.id });
    return result.length > 0;
  }
  
  // Activities
  async createActivity(activity: InsertCrmActivity): Promise<CrmActivity> {
    const result = await db.insert(crmActivities).values(activity).returning();
    return result[0];
  }
  
  async getActivity(id: number): Promise<CrmActivity | undefined> {
    const result = await db.select().from(crmActivities).where(eq(crmActivities.id, id));
    return result[0];
  }
  
  async getAllActivities(): Promise<CrmActivity[]> {
    return await db.select().from(crmActivities).orderBy(desc(crmActivities.createdAt));
  }
  
  async getActivitiesByContact(contactId: number): Promise<CrmActivity[]> {
    return await db
      .select()
      .from(crmActivities)
      .where(eq(crmActivities.contactId, contactId))
      .orderBy(desc(crmActivities.createdAt));
  }
  
  async getActivitiesByDeal(dealId: number): Promise<CrmActivity[]> {
    return await db
      .select()
      .from(crmActivities)
      .where(eq(crmActivities.dealId, dealId))
      .orderBy(desc(crmActivities.createdAt));
  }
  
  async updateActivity(id: number, activity: Partial<InsertCrmActivity>): Promise<CrmActivity | undefined> {
    const result = await db
      .update(crmActivities)
      .set({ ...activity, updatedAt: new Date() })
      .where(eq(crmActivities.id, id))
      .returning();
    return result[0];
  }
  
  async deleteActivity(id: number): Promise<boolean> {
    const result = await db
      .delete(crmActivities)
      .where(eq(crmActivities.id, id))
      .returning({ id: crmActivities.id });
    return result.length > 0;
  }

  // Lead operations
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLead(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined> {
    const [updatedLead] = await db
      .update(leads)
      .set({ ...lead, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    try {
      const result = await db.delete(leads).where(eq(leads.id, id));
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error("Error deleting lead:", error);
      return false;
    }
  }

  // Social trial operations
  async createSocialTrial(trial: InsertSocialTrial): Promise<SocialTrial> {
    const [newTrial] = await db.insert(socialTrials).values(trial).returning();
    return newTrial;
  }

  async getSocialTrial(id: number): Promise<SocialTrial | undefined> {
    const [trial] = await db.select().from(socialTrials).where(eq(socialTrials.id, id));
    return trial;
  }

  async getAllSocialTrials(): Promise<SocialTrial[]> {
    return await db.select().from(socialTrials).orderBy(desc(socialTrials.createdAt));
  }

  async updateSocialTrial(id: number, trial: Partial<InsertSocialTrial>): Promise<SocialTrial | undefined> {
    const [updatedTrial] = await db
      .update(socialTrials)
      .set(trial)
      .where(eq(socialTrials.id, id))
      .returning();
    return updatedTrial;
  }

  async deleteSocialTrial(id: number): Promise<boolean> {
    try {
      const result = await db.delete(socialTrials).where(eq(socialTrials.id, id));
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error("Error deleting social trial:", error);
      return false;
    }
  }

  // Content automation operations
  // Blog posts
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(post).returning();
    return result[0];
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await db.update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  // Automation jobs
  async createAutomationJob(job: InsertAutomationJob): Promise<AutomationJob> {
    const result = await db.insert(automationJobs).values(job).returning();
    return result[0];
  }

  async getAutomationJob(id: number): Promise<AutomationJob | undefined> {
    const result = await db.select().from(automationJobs).where(eq(automationJobs.id, id));
    return result[0];
  }

  async getPendingJobs(): Promise<AutomationJob[]> {
    return await db.select().from(automationJobs)
      .where(eq(automationJobs.status, 'pending'))
      .orderBy(automationJobs.scheduledTime);
  }

  async getJobsByType(jobType: string): Promise<AutomationJob[]> {
    return await db.select().from(automationJobs)
      .where(eq(automationJobs.jobType, jobType))
      .orderBy(desc(automationJobs.createdAt));
  }

  async updateAutomationJob(id: number, job: Partial<InsertAutomationJob>): Promise<AutomationJob | undefined> {
    const result = await db.update(automationJobs)
      .set(job)
      .where(eq(automationJobs.id, id))
      .returning();
    return result[0];
  }

  // Content research
  async createContentResearch(research: InsertContentResearch): Promise<ContentResearch> {
    const result = await db.insert(contentResearch).values(research).returning();
    return result[0];
  }

  async getContentResearchByDate(date: string): Promise<ContentResearch[]> {
    return await db.select().from(contentResearch)
      .where(eq(contentResearch.date, date))
      .orderBy(desc(contentResearch.relevanceScore));
  }

  async getUnprocessedResearch(): Promise<ContentResearch[]> {
    return await db.select().from(contentResearch)
      .where(eq(contentResearch.processed, false))
      .orderBy(desc(contentResearch.createdAt));
  }

  async updateContentResearch(id: number, research: Partial<InsertContentResearch>): Promise<ContentResearch | undefined> {
    const result = await db.update(contentResearch)
      .set(research)
      .where(eq(contentResearch.id, id))
      .returning();
    return result[0];
  }

  // Newsletter subscribers
  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const result = await db.insert(newsletterSubscribers)
      .values(subscriber)
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: {
          ...subscriber,
          isActive: true,
          unsubscribedAt: null,
        },
      })
      .returning();
    return result[0];
  }

  async getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined> {
    const result = await db.select().from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));
    return result[0];
  }

  async getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db.select().from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.isActive, true))
      .orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async updateNewsletterSubscriber(id: number, subscriber: Partial<InsertNewsletterSubscriber>): Promise<NewsletterSubscriber | undefined> {
    const result = await db.update(newsletterSubscribers)
      .set(subscriber)
      .where(eq(newsletterSubscribers.id, id))
      .returning();
    return result[0];
  }

  // YouTube monitoring
  async createYoutubeChannel(channel: InsertYoutubeChannel): Promise<YoutubeChannel> {
    const result = await db.insert(youtubeChannels)
      .values(channel)
      .onConflictDoUpdate({
        target: youtubeChannels.channelId,
        set: {
          ...channel,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result[0];
  }

  async getActiveYoutubeChannels(): Promise<YoutubeChannel[]> {
    return await db.select().from(youtubeChannels)
      .where(eq(youtubeChannels.isActive, true))
      .orderBy(youtubeChannels.channelName);
  }

  async updateYoutubeChannel(id: number, channel: Partial<InsertYoutubeChannel>): Promise<YoutubeChannel | undefined> {
    const result = await db.update(youtubeChannels)
      .set({ ...channel, updatedAt: new Date() })
      .where(eq(youtubeChannels.id, id))
      .returning();
    return result[0];
  }

  async createYoutubeVideo(video: InsertYoutubeVideo): Promise<YoutubeVideo> {
    const result = await db.insert(youtubeVideos)
      .values(video)
      .onConflictDoUpdate({
        target: youtubeVideos.videoId,
        set: {
          ...video,
        },
      })
      .returning();
    return result[0];
  }

  async getRecentVideos(limit: number = 50): Promise<YoutubeVideo[]> {
    return await db.select().from(youtubeVideos)
      .where(eq(youtubeVideos.isRelevant, true))
      .orderBy(desc(youtubeVideos.publishedAt))
      .limit(limit);
  }

  async updateYoutubeVideo(id: number, video: Partial<InsertYoutubeVideo>): Promise<YoutubeVideo | undefined> {
    const result = await db.update(youtubeVideos)
      .set(video)
      .where(eq(youtubeVideos.id, id))
      .returning();
    return result[0];
  }
}

// Since we now have PostgreSQL set up, we'll use it instead of in-memory storage
export const storage = new PostgresStorage();
