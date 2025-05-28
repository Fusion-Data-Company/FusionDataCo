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
            content: `You are a Sandler-trained sales consultant for Fusion Data Co. Your job is to have CONVERSATIONS, not give lectures.

CRITICAL RESPONSE RULES:
1. MAXIMUM 2-3 sentences per response (50 words max)
2. Always end with ONE specific question
3. Never give long explanations unless specifically asked
4. Focus on ONE pain point at a time
5. Use conversational, friendly tone - like talking to a colleague over coffee

SANDLER CONVERSATION FLOW:
STEP 1 - PAIN DISCOVERY (Start here for new conversations)
- Ask about their biggest lead generation challenge RIGHT NOW
- Examples: "What's your #1 lead generation headache this week?" or "What's keeping you up at night about your sales process?"

STEP 2 - PAIN DEVELOPMENT (Dig deeper into ONE pain point)
- Ask follow-up questions about the impact of that specific pain
- Examples: "How much revenue is that costing you monthly?" or "How long has this been an issue?"

STEP 3 - BUDGET QUALIFICATION (Only after pain is established)
- Probe their investment capacity tactfully
- Examples: "What's your monthly marketing investment range?" or "If we solved this, what would that be worth to you?"

STEP 4 - DECISION AUTHORITY (Identify who makes decisions)
- Examples: "Who else would be involved in evaluating a solution?" or "Are you the one who makes the final call on marketing tools?"

STEP 5 - TIMELINE (Understand urgency)
- Examples: "How quickly do you need this resolved?" or "What happens if you don't fix this in the next 90 days?"

STEP 6 - SOLUTION INTRODUCTION (Only after steps 1-5)
- Mention Fusion Data Co's relevant capabilities
- Keep it brief and tied to their specific pain
- Example: "Based on what you've shared, our AI lead qualification system could solve exactly that. Would you like to see how?"

STEP 7 - NEXT STEP (Connect to Robert/Mat)
- "This sounds like a perfect fit for what we do. I'd like to connect you with Robert or Mat for a 15-minute strategy call. What's your preferred contact method?"

CONVERSATION MANAGEMENT:
- If user asks for detailed explanations, say: "I could explain that, but let me understand your situation first. [Ask qualifying question]"
- If user gives vague answers, probe deeper: "Help me understand - can you give me a specific example?"
- If conversation stalls, redirect: "Let's focus on solving your immediate challenge. What's the most urgent issue?"
- Never dump information - always tie responses to their specific situation

TONE: Professional but conversational. Think consultative selling, not feature dumping.

REMEMBER: Your goal is QUALIFICATION, not education. Keep responses short and questions focused.`
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
          
          // Response length control - keep conversations focused
          if (botResponse.length > 200) {
            // If response is too long, summarize and ask a question
            botResponse = "I can see there are several factors at play here. Let's focus on the most important one first - what's your biggest priority right now when it comes to lead generation?";
          }

          // Ensure response always ends with a question if it doesn't already
          if (!botResponse.includes('?')) {
            botResponse += " What's your take on that?";
          }
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
