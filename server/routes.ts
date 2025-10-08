import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { automationScheduler, getAutomationStatus, manualTriggers } from './automation';
import { 
  contactSubmissionSchema, 
  chatMessageSchema, 
  insertCrmContactSchema,
  insertCrmDealSchema,
  insertCrmActivitySchema,
  insertLeadSchema,
  insertSocialTrialSchema,
  insertMeetingRequestSchema
} from "@shared/schema";
import { marketingRouter } from "./marketing";
import { newsletterService } from "./services/NewsletterAutomationService";
import { mailjetService } from "./automation/mailjetService";
import { calendarService, type AttendeeType } from "./services/calendarService";
import { nanoid } from "nanoid";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);
  
  // Auth routes for user info
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const replitAuthId = req.user.claims.sub;
      const user = await storage.getUserByReplitAuthId(replitAuthId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Protect admin routes
  app.use("/api/admin/*", isAdmin);
  app.use("/api/crm/*", isAdmin);
  
  // Register marketing routes
  app.use("/api/marketing", marketingRouter);

  // MCP (Model Context Protocol) endpoints for ElevenLabs integration
  const { handleStreamableMCP, handleMCPJson } = await import("./mcp-server");
  
  // Streamable HTTP endpoint for ElevenLabs (SSE)
  app.all("/api/mcp", handleStreamableMCP);
  
  // Regular JSON endpoint for testing and direct API calls
  app.all("/api/mcp/json", handleMCPJson);

  // AI Content Demo endpoint
  app.post("/api/ai-content-demo", async (req, res) => {
    try {
      const { businessType, model } = req.body;
      
      if (!businessType) {
        return res.status(400).json({ error: "Business type is required" });
      }

      // Import the function dynamically to avoid circular imports
      const { generateAIContentDemo } = await import("./openRouter");
      
      const content = await generateAIContentDemo(
        businessType, 
        model || 'anthropic/claude-3-sonnet:beta'
      );
      
      res.json({ success: true, content });
    } catch (error) {
      console.error("Error generating AI content demo:", error);
      res.status(500).json({ 
        error: "Failed to generate content", 
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
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
      
      // Send email notification to Rob (non-blocking - don't fail form if email fails)
      const formType = parsedData.data.formType || 'Contact';
      mailjetService.sendFormNotification(parsedData.data, formType).catch(err => {
        console.error('[FORM] Email notification failed for contact submission:', err.message);
      });
      
      return res.status(201).json({
        message: "Form submitted successfully",
        id: submission.id
      });
    } catch (error) {
      console.error("Error handling contact form submission:", error);
      return res.status(500).json({ message: "An error occurred while processing your request" });
    }
  });

  // Blog posts API endpoints
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const { status, limit } = req.query;
      
      let posts;
      if (status === 'published') {
        posts = await storage.getPublishedBlogPosts();
      } else {
        posts = await storage.getAllBlogPosts();
      }
      
      // Apply limit if provided and valid
      if (limit) {
        const limitNum = parseInt(limit as string, 10);
        if (Number.isFinite(limitNum) && limitNum > 0) {
          posts = posts.slice(0, limitNum);
        }
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // AI Services Health Check endpoints
  app.get("/api/health/ai", async (req, res) => {
    try {
      const { checkAllAIServices } = await import('./services/aiHealthCheck');
      const healthResults = await checkAllAIServices();
      
      const allHealthy = healthResults.every(result => result.status === 'healthy');
      
      res.status(allHealthy ? 200 : 503).json({
        status: allHealthy ? 'healthy' : 'degraded',
        services: healthResults,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error checking AI services health:", error);
      res.status(500).json({ 
        status: 'error',
        message: "Failed to check AI services health",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Individual service health checks
  app.get("/api/health/ai/openrouter", async (req, res) => {
    try {
      const { checkOpenRouterHealth } = await import('./services/aiHealthCheck');
      const result = await checkOpenRouterHealth();
      res.status(result.status === 'healthy' ? 200 : 503).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/health/ai/perplexity", async (req, res) => {
    try {
      const { checkPerplexityHealth } = await import('./services/aiHealthCheck');
      const result = await checkPerplexityHealth();
      res.status(result.status === 'healthy' ? 200 : 503).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get("/api/health/ai/openai", async (req, res) => {
    try {
      const { checkOpenAIHealth } = await import('./services/aiHealthCheck');
      const result = await checkOpenAIHealth();
      res.status(result.status === 'healthy' ? 200 : 503).json(result);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Lead generation form submission endpoint (for Real Estate, Medical, Trades forms)
  app.post("/api/leads", async (req, res) => {
    try {
      const parsedData = insertLeadSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ 
          message: "Invalid lead data",
          errors: parsedData.error.errors 
        });
      }

      const lead = await storage.createLead(parsedData.data);
      
      // Send email notification to Rob (non-blocking - don't fail form if email fails)
      const formType = `Lead - ${parsedData.data.source || 'Website'}`;
      mailjetService.sendFormNotification(parsedData.data, formType).catch(err => {
        console.error('[FORM] Email notification failed for lead submission:', err.message);
      });
      
      return res.status(201).json({
        message: "Lead submitted successfully",
        id: lead.id
      });
    } catch (error) {
      console.error("Error handling lead submission:", error);
      return res.status(500).json({ message: "An error occurred while processing your request" });
    }
  });

  // Meeting request/scheduling endpoint
  app.post("/api/meetings", async (req, res) => {
    try {
      const parsedData = insertMeetingRequestSchema.safeParse(req.body);
      
      if (!parsedData.success) {
        return res.status(400).json({ 
          message: "Invalid meeting request data",
          errors: parsedData.error.errors 
        });
      }

      const { 
        attendeeType, 
        attendeeName, 
        attendeeEmail, 
        preferredDateTime, 
        timezone, 
        duration,
        meetingPurpose,
        notes
      } = parsedData.data;

      // Find available slots (next 14 days from preferred date)
      const startDate = new Date(preferredDateTime);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 14);

      const availableSlots = await calendarService.findAvailableSlots(
        attendeeType as AttendeeType,
        startDate,
        endDate,
        timezone || 'America/Los_Angeles',
        duration || 30,
        5
      );

      if (availableSlots.length === 0) {
        return res.status(409).json({
          message: "No available slots found in the requested timeframe",
          alternativeSlots: []
        });
      }

      // Use the first available slot (closest to preferred time)
      const selectedSlot = availableSlots[0];
      
      // Create Google Calendar event
      const { eventId, eventLink } = await calendarService.createMeetingEvent({
        attendeeType: attendeeType as AttendeeType,
        summary: `Strategy Call with ${attendeeName}`,
        description: `Meeting Purpose: ${meetingPurpose || 'Strategy Discussion'}\n\nNotes: ${notes || 'None provided'}\n\nScheduled via FusionDataCo.com`,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
        timezone: timezone || 'America/Los_Angeles',
        attendeeEmail,
        attendeeName
      });

      // Save meeting request to database with Google Calendar details
      const meetingRequest = await storage.createMeetingRequest({
        ...parsedData.data,
        preferredDateTime: new Date(selectedSlot.start),
        status: 'confirmed'
      });
      
      // Update with Google Calendar event details
      await storage.updateMeetingRequest(meetingRequest.id, {
        googleEventId: eventId,
        googleEventLink: eventLink
      });

      // Send confirmation email
      mailjetService.sendFormNotification({
        name: attendeeName,
        email: attendeeEmail,
        meetingTime: new Date(selectedSlot.start).toLocaleString('en-US', { 
          timeZone: timezone,
          dateStyle: 'full',
          timeStyle: 'short'
        }),
        meetingType: attendeeType,
        eventLink
      }, 'Meeting Confirmation').catch(err => {
        console.error('[CALENDAR] Failed to send meeting confirmation email:', err.message);
      });

      return res.status(201).json({
        message: "Meeting scheduled successfully",
        meeting: {
          id: meetingRequest.id,
          scheduledTime: selectedSlot.start,
          duration: duration || 30,
          eventLink,
          timezone
        },
        alternativeSlots: availableSlots.slice(1) // Send other available slots
      });
    } catch (error) {
      console.error("[CALENDAR] Error scheduling meeting:", error);
      return res.status(500).json({ 
        message: "Failed to schedule meeting. Please try again or contact support." 
      });
    }
  });

  // Get available time slots (for calendar widget)
  app.get("/api/meetings/availability", async (req, res) => {
    try {
      const { attendeeType, startDate, timezone, duration } = req.query;

      if (!attendeeType || !startDate || !timezone) {
        return res.status(400).json({
          message: "Missing required parameters: attendeeType, startDate, timezone"
        });
      }

      const start = new Date(startDate as string);
      const end = new Date(start);
      end.setDate(end.getDate() + 14); // Next 14 days

      const slots = await calendarService.findAvailableSlots(
        attendeeType as AttendeeType,
        start,
        end,
        timezone as string,
        parseInt(duration as string) || 30,
        20 // Return up to 20 slots
      );

      return res.json({
        availableSlots: slots,
        timezone
      });
    } catch (error) {
      console.error("[CALENDAR] Error fetching availability:", error);
      return res.status(500).json({ 
        message: "Failed to fetch availability" 
      });
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
            content: `You are a Sandler-trained business consultant for Fusion Data Co. We provide comprehensive business automation solutions, NOT just lead generation.

FUSION DATA CO COMPLETE SERVICE PORTFOLIO:

🏆 FLAGSHIP PRODUCT: White-Label Business Platform
- All-in-one business solution built on Node.js/Replit
- Custom websites with e-commerce capabilities
- Integrated CRM with spiderweb data collection
- Smart forms across all pages feeding central CRM
- AI-powered email marketing (Claude 3.7/GPT-4)
- Social media automation and campaign generation
- FANG-level styling and user experience
- One-stop shop for complete business operations

🎁 FREE TRIAL OFFER: Social Media Automation
- 2 weeks FREE social media posting (ONLY free service)
- Up to 3 social media accounts
- AI-generated content tailored to brand
- Subscription options after trial based on frequency needs

💼 ADDITIONAL SERVICES:
- Custom CRM development and integration
- Professional website development
- Lead generation and automation systems
- Business process optimization

QUALIFICATION STRATEGY BY BUSINESS NEED:

FOR COMPLETE BUSINESS PLATFORM PROSPECTS:
Pain Points: "What's your biggest operational bottleneck - website performance, customer management, or marketing automation?"
Budget: "What's your monthly investment in business tools and marketing combined?"
Decision: "Who handles technology decisions for your business operations?"
Timeline: "How quickly do you need to streamline your business processes?"

FOR SOCIAL MEDIA PROSPECTS:
Pain Points: "How much time does your team spend creating social media content weekly?"
Budget: "What are you currently spending on social media management or content creation?"
Trial Offer: "Would you like to try our AI-powered social media service FREE for 2 weeks?"
Value: "What would saving 10+ hours weekly on content creation be worth to your business?"

CONVERSATION FLOW RULES:
1. IDENTIFY BUSINESS TYPE FIRST: Ask what type of business they run
2. DISCOVER PRIMARY PAIN: What's their #1 operational challenge
3. QUALIFY BUDGET RANGE: What they invest monthly in business tools/marketing
4. MATCH TO SERVICE: Connect pain to appropriate Fusion Data solution
5. OFFER APPROPRIATE TRIAL: Only social media gets free trial
6. GUIDE TO NEXT STEP: Registration or strategy call with Robert/Mat

RESPONSE RULES:
- Maximum 50 words per response
- Always end with ONE qualifying question
- Focus on ONE pain point at a time
- Match solution to discovered pain
- Only mention free trial for social media service
- Guide toward appropriate service based on their needs

NEXT STEPS BY SERVICE:
- Platform Demo: "I'd like to show you our complete business platform. What's your preferred contact method?"
- Social Media Trial: "Let's get your free 2-week trial started. What are your 3 main social accounts?"
- Custom Solution: "This needs a custom approach. Let me connect you with Robert for a strategy session."

Remember: We solve COMPLETE business operations, not just lead generation. Qualify first, then match to appropriate service.`
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

      } catch (error: unknown) {
        console.error('OpenRouter API Error:', error instanceof Error ? error.message : 'Unknown error');
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

  // AUTOMATION SYSTEM ROUTES
  
  // Get automation status
  app.get("/api/automation/status", isAdmin, async (req, res) => {
    try {
      const status = await getAutomationStatus();
      res.json(status);
    } catch (error) {
      console.error("Error getting automation status:", error);
      res.status(500).json({ error: "Failed to get automation status" });
    }
  });

  // Manual triggers for testing
  app.post("/api/automation/trigger/daily-blog", isAdmin, async (req, res) => {
    try {
      console.log("[API] Manual trigger: daily blog");
      const result = await manualTriggers.dailyBlog();
      res.json({ success: true, result });
    } catch (error) {
      console.error("Error triggering daily blog:", error);
      res.status(500).json({ error: "Failed to trigger daily blog" });
    }
  });

  app.post("/api/automation/trigger/monthly-newsletter", isAdmin, async (req, res) => {
    try {
      console.log("[API] Manual trigger: monthly newsletter");
      const result = await manualTriggers.monthlyNewsletter();
      res.json({ success: true, result });
    } catch (error) {
      console.error("Error triggering monthly newsletter:", error);
      res.status(500).json({ error: "Failed to trigger monthly newsletter" });
    }
  });

  app.post("/api/automation/trigger/youtube-monitoring", isAdmin, async (req, res) => {
    try {
      console.log("[API] Manual trigger: YouTube monitoring");
      await manualTriggers.youtubeMonitoring();
      res.json({ success: true, result: "YouTube monitoring completed" });
    } catch (error) {
      console.error("Error triggering YouTube monitoring:", error);
      res.status(500).json({ error: "Failed to trigger YouTube monitoring" });
    }
  });

  // Get recent automation jobs
  app.get("/api/automation/jobs", isAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const jobs = await automationScheduler.getRecentJobs(limit);
      res.json(jobs);
    } catch (error) {
      console.error("Error getting automation jobs:", error);
      res.status(500).json({ error: "Failed to get automation jobs" });
    }
  });

  // ELITE NEWSLETTER AUTOMATION ADMIN ROUTES
  app.get("/api/admin/contacts", isAdmin, async (req, res) => {
    try {
      const contacts = await storage.getAllContactSubmissions();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching admin contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/admin/leads", isAdmin, async (req, res) => {
    try {
      const leadsData = await storage.getAllLeads();
      res.json(leadsData);
    } catch (error) {
      console.error("Error fetching admin leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/admin/chat-messages", isAdmin, async (req, res) => {
    try {
      const messages = await storage.getAllChatMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching admin chat messages:", error);
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  app.get("/api/admin/newsletter-campaigns", isAdmin, async (req, res) => {
    try {
      const campaigns = await newsletterService.getNewsletterCampaigns();
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching newsletter campaigns:", error);
      res.status(500).json({ error: "Failed to fetch newsletter campaigns" });
    }
  });

  app.get("/api/admin/newsletter-settings", isAdmin, async (req, res) => {
    try {
      const settings = await newsletterService.getNewsletterSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching newsletter settings:", error);
      res.status(500).json({ error: "Failed to fetch newsletter settings" });
    }
  });

  app.get("/api/admin/newsletter-stats", isAdmin, async (req, res) => {
    try {
      const recipients = await newsletterService.getNewsletterRecipients();
      const campaigns = await newsletterService.getNewsletterCampaigns();
      
      const totalEmailsSent = campaigns.reduce((sum: number, campaign: any) => sum + (campaign.successCount || 0), 0);
      const averageOpenRate = campaigns.length > 0 
        ? Math.round(campaigns.reduce((sum: number, campaign: any) => sum + (campaign.openRate || 0), 0) / campaigns.length)
        : 0;

      res.json({
        totalSubscribers: recipients.length,
        totalEmailsSent,
        averageOpenRate,
        campaignCount: campaigns.length
      });
    } catch (error) {
      console.error("Error fetching newsletter stats:", error);
      res.status(500).json({ error: "Failed to fetch newsletter stats" });
    }
  });

  app.post("/api/admin/trigger-newsletter", isAdmin, async (req, res) => {
    try {
      console.log("🚀 Manual ELITE newsletter trigger requested");
      const result = await newsletterService.executeNewsletterAutomation();
      res.json(result);
    } catch (error) {
      console.error("Error triggering newsletter:", error);
      res.status(500).json({ error: "Failed to trigger newsletter automation" });
    }
  });

  app.post("/api/admin/newsletter-campaigns/:id/pause", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { isPaused } = req.body;
      const updated = await newsletterService.toggleCampaignPause(parseInt(id), isPaused);
      res.json(updated);
    } catch (error) {
      console.error("Error updating campaign:", error);
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  app.delete("/api/admin/newsletter-campaigns/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await newsletterService.deleteCampaign(parseInt(id));
      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Campaign not found" });
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ error: "Failed to delete campaign" });
    }
  });

  // BLOG MANAGEMENT ROUTES
  
  // Get all blog posts
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error getting blog posts:", error);
      res.status(500).json({ error: "Failed to get blog posts" });
    }
  });

  // Get published blog posts (public route)
  app.get("/api/blog/published", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error getting published blog posts:", error);
      res.status(500).json({ error: "Failed to get published blog posts" });
    }
  });

  // Get single blog post by slug (public route)
  app.get("/api/blog/post/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error getting blog post:", error);
      res.status(500).json({ error: "Failed to get blog post" });
    }
  });

  // Initialize automation system on startup
  try {
    console.log("[STARTUP] Initializing content automation system...");
    // We'll import and initialize this after the routes are set up
    const { initializeAutomation } = await import('./automation');
    await initializeAutomation();
    console.log("[STARTUP] ✅ Content automation system initialized");
  } catch (error) {
    console.error("[STARTUP] ❌ Failed to initialize automation system:", error);
    // Don't fail the entire server if automation fails to start
  }
  
  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
