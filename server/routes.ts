import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSubmissionSchema, 
  chatMessageSchema, 
  insertCrmContactSchema,
  insertCrmDealSchema,
  insertCrmActivitySchema
} from "@shared/schema";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
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

      // Generate bot response based on user message
      let botResponse = "";
      
      if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("cost")) {
        botResponse = "Our plans start at $49/month for the Starter plan. We also offer Professional ($99/month) and Enterprise ($199/month) plans. Would you like to know more about what's included in each plan?";
      } 
      else if (userMessage.toLowerCase().includes("trial")) {
        botResponse = "Yes, we offer a 14-day free trial on all our plans. You can try out all the features without any commitment. Would you like me to help you get started?";
      }
      else if (userMessage.toLowerCase().includes("demo")) {
        botResponse = "I'd be happy to schedule a personalized demo for you. Our team can show you how Fusion Data Co can specifically help your business. What industry are you in?";
      }
      else if (userMessage.toLowerCase().includes("crm") || userMessage.toLowerCase().includes("hubspot")) {
        botResponse = "Great question! While HubSpot is excellent, our CRM is specifically designed for small businesses with more affordable pricing and simpler workflows. We offer white-labeling capabilities, which HubSpot doesn't provide at lower tiers. Would you like to see a quick demo of our CRM?";
      }
      else {
        botResponse = "Thanks for reaching out! Our platform combines a white-label CRM, website builder, automation workflows, and AI agents to help businesses like yours generate more leads. How can I help you specifically today?";
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
          contactFields[field] = req.body[field];
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
          dealFields[field] = req.body[field];
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
          activityFields[field] = req.body[field];
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

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
