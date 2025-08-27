import { sql } from 'drizzle-orm';
import { pgTable, text, serial, integer, boolean, jsonb, timestamp, date, varchar, primaryKey, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User table - Updated for Replit Auth with backward compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // Use serial to match foreign key expectations
  replitAuthId: varchar("replit_auth_id").unique(), // Replit Auth ID
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  replitAuthId: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  role: true,
});

export type UpsertUser = Omit<typeof users.$inferInsert, 'id'>;

// Contact form submissions - Enhanced for all form types
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  industry: text("industry"),
  phone: text("phone"),
  message: text("message"),
  formType: text("form_type").notNull(), // 'contact', 'social_media', 'real_estate', 'medical', 'trades', 'small_business'
  challenges: text("challenges"),
  businessName: text("business_name"),
  brokerage: text("brokerage"),
  agentName: text("agent_name"),
  source: text("source").default("website"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  industry: true,
  phone: true,
  message: true,
  formType: true,
  challenges: true,
  businessName: true,
  brokerage: true,
  agentName: true,
  source: true,
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  message: text("message").notNull(),
  sender: text("sender").notNull(), // 'user' or 'bot'
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  message: true,
  sender: true,
});

// CRM TABLES
// Contacts table
export const crmContacts = pgTable("crm_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  position: text("position"),
  tags: text("tags").array(),
  status: text("status").default("New"), // New, In Progress, Qualified, Proposal, Negotiation, Won, Lost
  source: text("source"), // Website, Social Media, Referral, Email, etc.
  ownerId: integer("owner_id").references(() => users.id),
  notes: text("notes"),
  lastContactDate: timestamp("last_contact_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCrmContactSchema = createInsertSchema(crmContacts).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  position: true,
  tags: true,
  status: true,
  source: true,
  ownerId: true,
  notes: true,
  lastContactDate: true,
});

// Deals table
export const crmDeals = pgTable("crm_deals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  contactId: integer("contact_id").references(() => crmContacts.id),
  value: integer("value").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  status: text("status").default("New"), // New, In Progress, Qualified, Proposal, Negotiation, Won, Lost
  stage: text("stage"), // Discovery, Qualification, Proposal, Negotiation, Closing
  priority: text("priority").default("Medium"), // Low, Medium, High
  expectedCloseDate: date("expected_close_date"),
  actualCloseDate: date("actual_close_date"),
  ownerId: integer("owner_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCrmDealSchema = createInsertSchema(crmDeals).pick({
  title: true,
  contactId: true,
  value: true,
  currency: true,
  status: true,
  stage: true,
  priority: true,
  expectedCloseDate: true,
  actualCloseDate: true,
  ownerId: true,
  notes: true,
});

// Activities table for tracking interactions with contacts
export const crmActivities = pgTable("crm_activities", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").references(() => crmContacts.id),
  dealId: integer("deal_id").references(() => crmDeals.id),
  type: text("type").notNull(), // Call, Email, Meeting, Note, Task
  subject: text("subject").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  isCompleted: boolean("is_completed").default(false),
  ownerId: integer("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCrmActivitySchema = createInsertSchema(crmActivities).pick({
  contactId: true,
  dealId: true,
  type: true,
  subject: true,
  description: true,
  dueDate: true,
  completedDate: true,
  isCompleted: true,
  ownerId: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof chatMessageSchema>;

// CRM types
export type CrmContact = typeof crmContacts.$inferSelect;
export type InsertCrmContact = z.infer<typeof insertCrmContactSchema>;

export type CrmDeal = typeof crmDeals.$inferSelect;
export type InsertCrmDeal = z.infer<typeof insertCrmDealSchema>;

export type CrmActivity = typeof crmActivities.$inferSelect;
export type InsertCrmActivity = z.infer<typeof insertCrmActivitySchema>;

// Marketing Campaign tables
export const marketingCampaigns = pgTable("marketing_campaigns", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  goal: text("goal").notNull(), // Promote, Announce, Celebrate, Educate, Sell
  businessType: text("business_type"), // Real Estate, Medical, Trades, Retail, Coaching, etc.
  status: text("status").default("Draft"), // Draft, Scheduled, Active, Paused, Completed
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  budget: integer("budget"),
  tags: text("tags").array(),
  ownerId: integer("owner_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMarketingCampaignSchema = createInsertSchema(marketingCampaigns).pick({
  title: true,
  goal: true,
  businessType: true,
  status: true,
  startDate: true,
  endDate: true,
  budget: true,
  tags: true,
  ownerId: true,
});

// Social Posts table
export const socialPosts = pgTable("social_posts", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => marketingCampaigns.id),
  platform: text("platform").notNull(), // Facebook, Instagram, LinkedIn, Twitter
  content: text("content").notNull(),
  mediaUrls: text("media_urls").array(),
  tone: text("tone"), // Professional, Friendly, Funny, Minimalist, Aggressive
  scheduledDate: timestamp("scheduled_date"),
  publishedDate: timestamp("published_date"),
  status: text("status").default("Draft"), // Draft, Scheduled, Published, Failed
  metrics: jsonb("metrics").default({}), // likes, shares, comments, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSocialPostSchema = createInsertSchema(socialPosts).pick({
  campaignId: true,
  platform: true,
  content: true,
  mediaUrls: true,
  tone: true,
  scheduledDate: true,
  publishedDate: true,
  status: true,
  metrics: true,
});

// Lead Magnets table
export const leadMagnets = pgTable("lead_magnets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // PDF, Ebook, Webinar, Template
  fileUrl: text("file_url"),
  thumbnailUrl: text("thumbnail_url"),
  campaignId: integer("campaign_id").references(() => marketingCampaigns.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLeadMagnetSchema = createInsertSchema(leadMagnets).pick({
  title: true,
  description: true,
  type: true,
  fileUrl: true,
  thumbnailUrl: true,
  campaignId: true,
});

// Lead Magnet Subscribers table
export const leadMagnetSubscribers = pgTable("lead_magnet_subscribers", {
  id: serial("id").primaryKey(),
  leadMagnetId: integer("lead_magnet_id").references(() => leadMagnets.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  businessType: text("business_type"),
  downloadDate: timestamp("download_date").defaultNow(),
  contactId: integer("contact_id").references(() => crmContacts.id),
  campaignDrip: boolean("campaign_drip").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadMagnetSubscriberSchema = createInsertSchema(leadMagnetSubscribers).pick({
  leadMagnetId: true,
  name: true,
  email: true,
  businessType: true,
  downloadDate: true,
  contactId: true,
  campaignDrip: true,
});

// Marketing Automations table
export const marketingAutomations = pgTable("marketing_automations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  trigger: text("trigger").notNull(), // New lead, Form submission, Tag added
  condition: jsonb("condition").default({}), // JSON containing conditions
  actions: jsonb("actions").default([]), // Array of action objects
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMarketingAutomationSchema = createInsertSchema(marketingAutomations).pick({
  name: true,
  description: true,
  trigger: true,
  condition: true,
  actions: true,
  isActive: true,
});

// Email Templates table
export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // Welcome, Offer, Case Study, Newsletter
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).pick({
  name: true,
  subject: true,
  content: true,
  type: true,
});

// Email Campaigns table
export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  templateId: integer("template_id").references(() => emailTemplates.id),
  segmentFilter: jsonb("segment_filter").default({}),
  scheduledDate: timestamp("scheduled_date"),
  sentDate: timestamp("sent_date"),
  status: text("status").default("Draft"), // Draft, Scheduled, Sending, Sent
  metrics: jsonb("metrics").default({}), // opens, clicks, bounces
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).pick({
  name: true,
  subject: true,
  content: true,
  templateId: true,
  segmentFilter: true,
  scheduledDate: true,
  sentDate: true,
  status: true,
  metrics: true,
});

// Type exports for marketing tables
export type MarketingCampaign = typeof marketingCampaigns.$inferSelect;
export type InsertMarketingCampaign = z.infer<typeof insertMarketingCampaignSchema>;

export type SocialPost = typeof socialPosts.$inferSelect;
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;

export type LeadMagnet = typeof leadMagnets.$inferSelect;
export type InsertLeadMagnet = z.infer<typeof insertLeadMagnetSchema>;

export type LeadMagnetSubscriber = typeof leadMagnetSubscribers.$inferSelect;
export type InsertLeadMagnetSubscriber = z.infer<typeof insertLeadMagnetSubscriberSchema>;

export type MarketingAutomation = typeof marketingAutomations.$inferSelect;
export type InsertMarketingAutomation = z.infer<typeof insertMarketingAutomationSchema>;

export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;

export type EmailCampaign = typeof emailCampaigns.$inferSelect;
export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;

// Leads table for form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  business: text("business"),
  industry: text("industry"),
  interestedService: text("interested_service"),
  message: text("message"),
  source: text("source").notNull().default("Website"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  name: true,
  email: true,
  phone: true,
  business: true,
  industry: true,
  interestedService: true,
  message: true,
  source: true,
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// Social media trial signups
export const socialTrials = pgTable("social_trials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  currentFollowers: integer("current_followers").default(0),
  goals: text("goals"),
  status: text("status").notNull().default("pending"),
  trialStartDate: timestamp("trial_start_date"),
  trialEndDate: timestamp("trial_end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSocialTrialSchema = createInsertSchema(socialTrials).pick({
  name: true,
  email: true,
  phone: true,
  businessName: true,
  businessType: true,
  currentFollowers: true,
  goals: true,
});

export type SocialTrial = typeof socialTrials.$inferSelect;
export type InsertSocialTrial = z.infer<typeof insertSocialTrialSchema>;

// CONTENT AUTOMATION SYSTEM TABLES

// Blog posts table for automated content
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  tags: text("tags").array(),
  category: text("category").default("VIBE CODING"),
  status: text("status").default("draft"), // draft, published, scheduled
  publishedAt: timestamp("published_at"),
  scheduledFor: timestamp("scheduled_for"),
  authorId: integer("author_id").references(() => users.id),
  isAutomated: boolean("is_automated").default(true),
  sourceData: jsonb("source_data").default({}), // Research data used to generate
  socialSnippets: jsonb("social_snippets").default({}), // Generated social media posts
  metrics: jsonb("metrics").default({}), // views, shares, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true,
  featuredImage: true,
  tags: true,
  category: true,
  status: true,
  publishedAt: true,
  scheduledFor: true,
  authorId: true,
  isAutomated: true,
  sourceData: true,
  socialSnippets: true,
  metrics: true,
});

// Content automation jobs tracking
export const automationJobs = pgTable("automation_jobs", {
  id: serial("id").primaryKey(),
  jobType: text("job_type").notNull(), // daily_blog, monthly_newsletter, youtube_monitor
  status: text("status").default("pending"), // pending, running, completed, failed
  scheduledTime: timestamp("scheduled_time").notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  errorMessage: text("error_message"),
  resultData: jsonb("result_data").default({}),
  parameters: jsonb("parameters").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAutomationJobSchema = createInsertSchema(automationJobs).pick({
  jobType: true,
  status: true,
  scheduledTime: true,
  startedAt: true,
  completedAt: true,
  errorMessage: true,
  resultData: true,
  parameters: true,
});

// Content research data storage
export const contentResearch = pgTable("content_research", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().defaultNow(),
  source: text("source").notNull(), // techcrunch, verge, youtube, reddit
  sourceUrl: text("source_url"),
  title: text("title").notNull(),
  summary: text("summary"),
  keywords: text("keywords").array(),
  relevanceScore: integer("relevance_score").default(0), // 1-10
  category: text("category"), // vibe_coding, ai_tools, automation, etc.
  rawData: jsonb("raw_data").default({}),
  processed: boolean("processed").default(false),
  usedInContent: boolean("used_in_content").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContentResearchSchema = createInsertSchema(contentResearch).pick({
  date: true,
  source: true,
  sourceUrl: true,
  title: true,
  summary: true,
  keywords: true,
  relevanceScore: true,
  category: true,
  rawData: true,
  processed: true,
  usedInContent: true,
});

// Newsletter subscribers (separate from leads for newsletter-specific tracking)
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  company: text("company"),
  industryInterest: text("industry_interest"),
  subscriptionSource: text("subscription_source").default("website"),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  isActive: boolean("is_active").default(true),
  unsubscribedAt: timestamp("unsubscribed_at"),
  lastEmailSent: timestamp("last_email_sent"),
  emailPreferences: jsonb("email_preferences").default({
    frequency: "monthly",
    contentTypes: ["blog", "industry_news", "tools"]
  }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
  name: true,
  company: true,
  industryInterest: true,
  subscriptionSource: true,
  subscribedAt: true,
  isActive: true,
  unsubscribedAt: true,
  lastEmailSent: true,
  emailPreferences: true,
});

// YouTube channel monitoring configuration
export const youtubeChannels = pgTable("youtube_channels", {
  id: serial("id").primaryKey(),
  channelId: text("channel_id").notNull().unique(),
  channelName: text("channel_name").notNull(),
  channelUrl: text("channel_url"),
  keywords: text("keywords").array(), // keywords to monitor for
  isActive: boolean("is_active").default(true),
  lastChecked: timestamp("last_checked"),
  videoCount: integer("video_count").default(0),
  subscriberCount: integer("subscriber_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertYoutubeChannelSchema = createInsertSchema(youtubeChannels).pick({
  channelId: true,
  channelName: true,
  channelUrl: true,
  keywords: true,
  isActive: true,
  lastChecked: true,
  videoCount: true,
  subscriberCount: true,
});

// YouTube videos discovered through monitoring
export const youtubeVideos = pgTable("youtube_videos", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").notNull().unique(),
  channelId: text("channel_id").references(() => youtubeChannels.channelId),
  title: text("title").notNull(),
  description: text("description"),
  publishedAt: timestamp("published_at"),
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url"),
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  relevanceScore: integer("relevance_score").default(0),
  keywords: text("keywords").array(),
  isRelevant: boolean("is_relevant").default(false),
  usedInContent: boolean("used_in_content").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertYoutubeVideoSchema = createInsertSchema(youtubeVideos).pick({
  videoId: true,
  channelId: true,
  title: true,
  description: true,
  publishedAt: true,
  thumbnailUrl: true,
  videoUrl: true,
  viewCount: true,
  likeCount: true,
  relevanceScore: true,
  keywords: true,
  isRelevant: true,
  usedInContent: true,
});

// Type exports for automation system
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type AutomationJob = typeof automationJobs.$inferSelect;
export type InsertAutomationJob = z.infer<typeof insertAutomationJobSchema>;

export type ContentResearch = typeof contentResearch.$inferSelect;
export type InsertContentResearch = z.infer<typeof insertContentResearchSchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;

export type YoutubeChannel = typeof youtubeChannels.$inferSelect;
export type InsertYoutubeChannel = z.infer<typeof insertYoutubeChannelSchema>;

export type YoutubeVideo = typeof youtubeVideos.$inferSelect;
export type InsertYoutubeVideo = z.infer<typeof insertYoutubeVideoSchema>;

// ElevenLabs Conversational AI Interactions
export const elevenLabsConversations = pgTable("elevenlabs_conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(), // ElevenLabs session identifier
  contactId: integer("contact_id").references(() => crmContacts.id),
  callerName: text("caller_name"), // Name provided during call
  phoneNumber: text("phone_number"), // Phone number if available
  conversationSummary: text("conversation_summary"), // AI summary of conversation
  callNotes: text("call_notes"), // Detailed notes from the call
  intent: text("intent"), // What the caller wanted (quote, information, etc.)
  status: text("status").default("active"), // active, completed, follow_up_needed
  duration: integer("duration"), // Call duration in seconds
  isNewContact: boolean("is_new_contact").default(true),
  followUpRequired: boolean("follow_up_required").default(false),
  conversationData: jsonb("conversation_data").default({}), // Raw conversation data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertElevenLabsConversationSchema = createInsertSchema(elevenLabsConversations).pick({
  sessionId: true,
  contactId: true,
  callerName: true,
  phoneNumber: true,
  conversationSummary: true,
  callNotes: true,
  intent: true,
  status: true,
  duration: true,
  isNewContact: true,
  followUpRequired: true,
  conversationData: true,
});

export type ElevenLabsConversation = typeof elevenLabsConversations.$inferSelect;
export type InsertElevenLabsConversation = z.infer<typeof insertElevenLabsConversationSchema>;
