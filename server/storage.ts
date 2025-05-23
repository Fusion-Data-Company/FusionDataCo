import { 
  users, chatMessages, contactSubmissions, crmContacts, crmDeals, crmActivities,
  leads, socialTrials,
  type User, type InsertUser, 
  type ContactSubmission, type InsertContactSubmission,
  type ChatMessage, type InsertChatMessage,
  type CrmContact, type InsertCrmContact,
  type CrmDeal, type InsertCrmDeal,
  type CrmActivity, type InsertCrmActivity,
  type Lead, type InsertLead,
  type SocialTrial, type InsertSocialTrial
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
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
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
}

export class PostgresStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Contact form operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
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
}

// Since we now have PostgreSQL set up, we'll use it instead of in-memory storage
export const storage = new PostgresStorage();
