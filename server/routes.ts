import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSubmissionSchema, chatMessageSchema } from "@shared/schema";
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

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
