import { 
  users, chatMessages, contactSubmissions,
  type User, type InsertUser, 
  type ContactSubmission, type InsertContactSubmission,
  type ChatMessage, type InsertChatMessage
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private chatMessages: Map<number, ChatMessage>;
  private userIdCounter: number;
  private submissionIdCounter: number;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.chatMessages = new Map();
    this.userIdCounter = 1;
    this.submissionIdCounter = 1;
    this.messageIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      role: "user", 
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.submissionIdCounter++;
    const now = new Date();
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: now
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = this.messageIdCounter++;
    const now = new Date();
    const chatMessage: ChatMessage = {
      ...message,
      id,
      createdAt: now
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatMessagesBySession(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.id - b.id);
  }
}

export const storage = new MemStorage();
