import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSubmissionSchema, 
  chatMessageSchema, 
  insertCrmContactSchema,
  insertCrmDealSchema,
  insertCrmActivitySchema,
  insertLeadSchema,
  insertSocialTrialSchema
} from "@shared/schema";
import { marketingRouter } from "./marketing";
import { nanoid } from "nanoid";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register marketing routes
  app.use("/api/marketing", marketingRouter);
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const parsedData = contactSubmissionSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ 
          message: "Invalid form data",
          errors: parsedData.error.errors 
        });
      }

      const submission = await storage.createContactSubmission(parsedData.data);
      
      return res.status(201).json({
        message: "Form submitted successfully",
        id: submission.id
      });
    } catch (error) {
      console.error("Error handling contact form submission:", error);
      return res.status(500).json({ message: "An error occurred while processing your request" });
    }
  });

  // Chatbot message endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      // Get or create session ID
      const sessionId = req.body.sessionId || nanoid();
      const userMessage = req.body.message;

      if (!userMessage) {
        return res.status(400).json({ message: "Message is required" });
      }

      // Store user message
      await storage.createChatMessage({
        sessionId,
        message: userMessage,
        sender: "user"
      });

      // Get conversation history for context
      const conversationHistory = await storage.getChatMessagesBySession(sessionId);
      const formattedHistory = conversationHistory.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.message
      }));

      // Working OpenRouter API call with Sandler methodology
      let botResponse = "";
      try {
        // Build conversation history for context
        const conversationHistory = [
          {
            role: "system",
            content: `You are an enterprise sales assistant for Fusion Data Co, following the Sandler Sales methodology. 

COMPANY BACKGROUND:
- Fusion Data Co: $100M+ lead generation and workflow automation company
- Leadership: Robert Yeager (CEO) and Mat (Partner) 
- Specialties: AI-powered lead generation, sales automation, CRM optimization

SANDLER METHODOLOGY - FOLLOW THIS EXACTLY:
1. PAIN FUNNEL: Ask probing questions to uncover business pain points
2. BUDGET QUALIFICATION: Determine financial capacity (minimum $5K/month marketing spend)
3. DECISION MAKER: Identify who makes technology decisions
4. TIMELINE: Understand urgency and implementation timeline
5. PRESENT SOLUTIONS: Only after qualifying pain, budget, decision authority

CONVERSATION FLOW:
- Start by understanding their current lead generation challenges
- Ask about monthly lead volume, conversion rates, biggest bottlenecks
- Qualify budget range before presenting solutions
- Connect qualified prospects to Robert/Mat for strategy calls

Keep responses conversational, consultative, and value-focused.`
          }
        ];

        // Add conversation history from database
        if (formattedHistory && formattedHistory.length > 0) {
          formattedHistory.forEach((msg) => {
            conversationHistory.push({
              role: msg.role,
              content: msg.content
            });
          });
        }

        // Add current user message
        conversationHistory.push({
          role: "user",
          content: userMessage
        });

        // Make OpenRouter API call
        const aiResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: "perplexity/llama-3.1-sonar-large-128k-online",
          messages: conversationHistory,
          temperature: 0.8,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://fusiondataco.com',
            'X-Title': 'Fusion Data Co Enterprise Assistant'
          }
        });

        // Extract AI response
        if (aiResponse.data && aiResponse.data.choices && aiResponse.data.choices[0]) {
          botResponse = aiResponse.data.choices[0].message.content;
        } else {
          throw new Error('Invalid API response format');
        }

      } catch (error) {
        console.error('OpenRouter API Error:', error.response?.data || error.message);
        // Only fallback if API completely fails
        botResponse = "I'm experiencing a temporary connection issue. Let me connect you directly with our team. What's the best way to reach you for a quick strategy call about your lead generation goals?";
      }

      // Store bot response
      await storage.createChatMessage({
        sessionId,
        message: botResponse,
        sender: "bot"
      });

      return res.status(200).json({
        sessionId,
        response: botResponse
      });
    } catch (error) {
      console.error("Error handling chat message:", error);
      return res.status(500).json({ message: "An error occurred while processing your message" });
    }
  });

  // CRM API Routes

  // CRM Contacts
  app.get("/api/crm/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      return res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ message: "An error occurred while fetching contacts" });
    }
  });

  app.get("/api/crm/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }

      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json(contact);
    } catch (error) {
      console.error(`Error fetching contact ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while fetching the contact" });
    }
  });

  app.post("/api/crm/contacts", async (req, res) => {
    try {
      const parsedData = insertCrmContactSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ 
          message: "Invalid contact data",
          errors: parsedData.error.errors 
        });
      }

      const contact = await storage.createContact(parsedData.data);
      
      return res.status(201).json({
        message: "Contact created successfully",
        contact
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      return res.status(500).json({ message: "An error occurred while creating the contact" });
    }
  });

  app.put("/api/crm/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }

      // We'll validate the fields that are provided
      const contactFields = {};
      const allowedFields = [
        'name', 'email', 'phone', 'company', 'position', 
        'tags', 'status', 'source', 'ownerId', 'notes', 'lastContactDate'
      ];
      
      // Only include fields that are in the request body
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          (contactFields as Record<string, any>)[field] = req.body[field];
        }
      }

      const updatedContact = await storage.updateContact(id, contactFields);
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json({
        message: "Contact updated successfully",
        contact: updatedContact
      });
    } catch (error) {
      console.error(`Error updating contact ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while updating the contact" });
    }
  });

  app.delete("/api/crm/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid contact ID" });
      }

      const success = await storage.deleteContact(id);
      if (!success) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json({
        message: "Contact deleted successfully"
      });
    } catch (error) {
      console.error(`Error deleting contact ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while deleting the contact" });
    }
  });

  // CRM Deals
  app.get("/api/crm/deals", async (req, res) => {
    try {
      const contactId = req.query.contactId ? parseInt(req.query.contactId as string) : undefined;
      
      let deals;
      if (contactId && !isNaN(contactId)) {
        deals = await storage.getDealsByContact(contactId);
      } else {
        deals = await storage.getAllDeals();
      }
      
      return res.status(200).json(deals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      return res.status(500).json({ message: "An error occurred while fetching deals" });
    }
  });

  app.get("/api/crm/deals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid deal ID" });
      }

      const deal = await storage.getDeal(id);
      if (!deal) {
        return res.status(404).json({ message: "Deal not found" });
      }

      return res.status(200).json(deal);
    } catch (error) {
      console.error(`Error fetching deal ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while fetching the deal" });
    }
  });

  app.post("/api/crm/deals", async (req, res) => {
    try {
      const parsedData = insertCrmDealSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ 
          message: "Invalid deal data",
          errors: parsedData.error.errors 
        });
      }

      const deal = await storage.createDeal(parsedData.data);
      
      return res.status(201).json({
        message: "Deal created successfully",
        deal
      });
    } catch (error) {
      console.error("Error creating deal:", error);
      return res.status(500).json({ message: "An error occurred while creating the deal" });
    }
  });

  app.put("/api/crm/deals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid deal ID" });
      }

      // We'll validate the fields that are provided
      const dealFields = {};
      const allowedFields = [
        'title', 'contactId', 'value', 'currency', 'status', 
        'stage', 'priority', 'expectedCloseDate', 'actualCloseDate', 
        'ownerId', 'notes'
      ];
      
      // Only include fields that are in the request body
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          (dealFields as Record<string, any>)[field] = req.body[field];
        }
      }

      const updatedDeal = await storage.updateDeal(id, dealFields);
      if (!updatedDeal) {
        return res.status(404).json({ message: "Deal not found" });
      }

      return res.status(200).json({
        message: "Deal updated successfully",
        deal: updatedDeal
      });
    } catch (error) {
      console.error(`Error updating deal ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while updating the deal" });
    }
  });

  app.delete("/api/crm/deals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid deal ID" });
      }

      const success = await storage.deleteDeal(id);
      if (!success) {
        return res.status(404).json({ message: "Deal not found" });
      }

      return res.status(200).json({
        message: "Deal deleted successfully"
      });
    } catch (error) {
      console.error(`Error deleting deal ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while deleting the deal" });
    }
  });

  // CRM Activities
  app.get("/api/crm/activities", async (req, res) => {
    try {
      const contactId = req.query.contactId ? parseInt(req.query.contactId as string) : undefined;
      const dealId = req.query.dealId ? parseInt(req.query.dealId as string) : undefined;
      
      let activities;
      if (contactId && !isNaN(contactId)) {
        activities = await storage.getActivitiesByContact(contactId);
      } else if (dealId && !isNaN(dealId)) {
        activities = await storage.getActivitiesByDeal(dealId);
      } else {
        activities = await storage.getAllActivities();
      }
      
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ message: "An error occurred while fetching activities" });
    }
  });

  app.get("/api/crm/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid activity ID" });
      }

      const activity = await storage.getActivity(id);
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }

      return res.status(200).json(activity);
    } catch (error) {
      console.error(`Error fetching activity ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while fetching the activity" });
    }
  });

  app.post("/api/crm/activities", async (req, res) => {
    try {
      const parsedData = insertCrmActivitySchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ 
          message: "Invalid activity data",
          errors: parsedData.error.errors 
        });
      }

      const activity = await storage.createActivity(parsedData.data);
      
      return res.status(201).json({
        message: "Activity created successfully",
        activity
      });
    } catch (error) {
      console.error("Error creating activity:", error);
      return res.status(500).json({ message: "An error occurred while creating the activity" });
    }
  });

  app.put("/api/crm/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid activity ID" });
      }

      // We'll validate the fields that are provided
      const activityFields = {};
      const allowedFields = [
        'contactId', 'dealId', 'type', 'subject', 'description',
        'dueDate', 'completedDate', 'isCompleted', 'ownerId'
      ];
      
      // Only include fields that are in the request body
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          (activityFields as Record<string, any>)[field] = req.body[field];
        }
      }

      const updatedActivity = await storage.updateActivity(id, activityFields);
      if (!updatedActivity) {
        return res.status(404).json({ message: "Activity not found" });
      }

      return res.status(200).json({
        message: "Activity updated successfully",
        activity: updatedActivity
      });
    } catch (error) {
      console.error(`Error updating activity ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while updating the activity" });
    }
  });

  app.delete("/api/crm/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid activity ID" });
      }

      const success = await storage.deleteActivity(id);
      if (!success) {
        return res.status(404).json({ message: "Activity not found" });
      }

      return res.status(200).json({
        message: "Activity deleted successfully"
      });
    } catch (error) {
      console.error(`Error deleting activity ${req.params.id}:`, error);
      return res.status(500).json({ message: "An error occurred while deleting the activity" });
    }
  });

  // Marketing routes
  app.use("/api/marketing", marketingRouter);
  
  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
