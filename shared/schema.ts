import { pgTable, text, serial, integer, boolean, jsonb, timestamp, date, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  industry: true,
  message: true,
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
