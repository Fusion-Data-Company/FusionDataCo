import { Router } from "express";
import { db } from "./db";
import { 
  marketingCampaigns, 
  socialPosts, 
  leadMagnets,
  leadMagnetSubscribers,
  insertMarketingCampaignSchema, 
  insertSocialPostSchema,
  insertLeadMagnetSchema,
  insertLeadMagnetSubscriberSchema,
  emailTemplates,
  insertEmailTemplateSchema,
  crmContacts
} from "@shared/schema";
import { eq, desc, and, inArray } from "drizzle-orm";
import { generateSocialCaptions } from "./openRouter";

export const marketingRouter = Router();

// Get all campaigns
marketingRouter.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await db.select().from(marketingCampaigns).orderBy(desc(marketingCampaigns.createdAt));
    
    // Get posts for each campaign
    const campaignsWithPosts = await Promise.all(
      campaigns.map(async (campaign) => {
        const posts = await db.select().from(socialPosts)
          .where(eq(socialPosts.campaignId, campaign.id));
        
        return {
          ...campaign,
          posts
        };
      })
    );
    
    res.json(campaignsWithPosts);
  } catch (error) {
    console.error("Error getting campaigns:", error);
    res.status(500).json({ error: "Failed to get campaigns" });
  }
});

// Get campaign by ID
marketingRouter.get("/campaigns/:id", async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    
    const [campaign] = await db.select().from(marketingCampaigns)
      .where(eq(marketingCampaigns.id, campaignId));
    
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    
    const posts = await db.select().from(socialPosts)
      .where(eq(socialPosts.campaignId, campaignId));
    
    res.json({
      ...campaign,
      posts
    });
  } catch (error) {
    console.error("Error getting campaign:", error);
    res.status(500).json({ error: "Failed to get campaign" });
  }
});

// Create a new campaign
marketingRouter.post("/campaigns", async (req, res) => {
  try {
    const validation = insertMarketingCampaignSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: "Invalid campaign data", 
        details: validation.error.format() 
      });
    }
    
    const campaignData = validation.data;
    const postsData = req.body.posts || [];
    
    // Insert campaign
    const [campaign] = await db
      .insert(marketingCampaigns)
      .values(campaignData)
      .returning();
    
    // Insert posts if any
    if (postsData.length > 0) {
      const postEntries = postsData.map((post: any) => ({
        ...post,
        campaignId: campaign.id,
        metrics: post.metrics || {},
      }));
      
      await db.insert(socialPosts).values(postEntries);
    }
    
    // Get the newly created campaign with posts
    const posts = await db.select().from(socialPosts)
      .where(eq(socialPosts.campaignId, campaign.id));
    
    res.status(201).json({
      ...campaign,
      posts
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ error: "Failed to create campaign" });
  }
});

// Update campaign
marketingRouter.patch("/campaigns/:id", async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    
    // Validate the campaign exists
    const existingCampaign = await db.select().from(marketingCampaigns)
      .where(eq(marketingCampaigns.id, campaignId));
    
    if (existingCampaign.length === 0) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    
    // Update campaign
    const [updatedCampaign] = await db
      .update(marketingCampaigns)
      .set(req.body)
      .where(eq(marketingCampaigns.id, campaignId))
      .returning();
    
    res.json(updatedCampaign);
  } catch (error) {
    console.error("Error updating campaign:", error);
    res.status(500).json({ error: "Failed to update campaign" });
  }
});

// Delete campaign
marketingRouter.delete("/campaigns/:id", async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    
    // Delete associated posts first
    await db
      .delete(socialPosts)
      .where(eq(socialPosts.campaignId, campaignId));
    
    // Delete campaign
    const deletedCampaign = await db
      .delete(marketingCampaigns)
      .where(eq(marketingCampaigns.id, campaignId))
      .returning();
    
    if (deletedCampaign.length === 0) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({ error: "Failed to delete campaign" });
  }
});

// Social Post Routes

// Get post by ID
marketingRouter.get("/posts/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    
    const [post] = await db.select().from(socialPosts)
      .where(eq(socialPosts.id, postId));
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.json(post);
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({ error: "Failed to get post" });
  }
});

// Update post
marketingRouter.patch("/posts/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    
    // Validate the post exists
    const existingPost = await db.select().from(socialPosts)
      .where(eq(socialPosts.id, postId));
    
    if (existingPost.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    // Update post
    const [updatedPost] = await db
      .update(socialPosts)
      .set(req.body)
      .where(eq(socialPosts.id, postId))
      .returning();
    
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Reschedule post
marketingRouter.patch("/posts/:id/reschedule", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { scheduledDate } = req.body;
    
    if (!scheduledDate) {
      return res.status(400).json({ error: "Scheduled date is required" });
    }
    
    // Update post scheduled date
    const [updatedPost] = await db
      .update(socialPosts)
      .set({ 
        scheduledDate,
        status: "Scheduled", // Reset status to Scheduled
      })
      .where(eq(socialPosts.id, postId))
      .returning();
    
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.error("Error rescheduling post:", error);
    res.status(500).json({ error: "Failed to reschedule post" });
  }
});

// Delete post
marketingRouter.delete("/posts/:id", async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    
    const deletedPost = await db
      .delete(socialPosts)
      .where(eq(socialPosts.id, postId))
      .returning();
    
    if (deletedPost.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Generate captions using AI
marketingRouter.post("/generate-captions", async (req, res) => {
  try {
    const { goal, businessType, platforms, tone, additionalContext, model } = req.body;
    
    if (!goal || !businessType || !platforms || platforms.length === 0 || !tone) {
      return res.status(400).json({ 
        error: "Missing required fields",
        required: ["goal", "businessType", "platforms", "tone"]
      });
    }
    
    // Use OpenRouter to generate captions
    const captions = await generateSocialCaptions(
      goal, 
      businessType, 
      tone, 
      platforms, 
      additionalContext || "",
      model || "anthropic/claude-3-opus:beta"
    );
    
    res.json({ captions });
  } catch (error) {
    console.error("Error generating captions:", error);
    res.status(500).json({ error: "Failed to generate captions" });
  }
});

// Lead Magnet Routes

// Get all lead magnets
marketingRouter.get("/lead-magnets", async (req, res) => {
  try {
    const leadMagnetsList = await db.select().from(leadMagnets)
      .orderBy(desc(leadMagnets.createdAt));
    
    res.json(leadMagnetsList);
  } catch (error) {
    console.error("Error getting lead magnets:", error);
    res.status(500).json({ error: "Failed to get lead magnets" });
  }
});

// Create a lead magnet
marketingRouter.post("/lead-magnets", async (req, res) => {
  try {
    const validation = insertLeadMagnetSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: "Invalid lead magnet data", 
        details: validation.error.format() 
      });
    }
    
    const [leadMagnet] = await db
      .insert(leadMagnets)
      .values(validation.data)
      .returning();
    
    res.status(201).json(leadMagnet);
  } catch (error) {
    console.error("Error creating lead magnet:", error);
    res.status(500).json({ error: "Failed to create lead magnet" });
  }
});

// Lead magnet subscription
marketingRouter.post("/lead-magnets/:id/subscribe", async (req, res) => {
  try {
    const leadMagnetId = parseInt(req.params.id);
    
    // Check if lead magnet exists
    const leadMagnetResults = await db.select().from(leadMagnets)
      .where(eq(leadMagnets.id, leadMagnetId));
    
    if (leadMagnetResults.length === 0) {
      return res.status(404).json({ error: "Lead magnet not found" });
    }
    
    const leadMagnet = leadMagnetResults[0];
    
    const { name, email, businessType } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ 
        error: "Name and email are required",
      });
    }
    
    // Check if the email already exists as a contact
    let contactId = null;
    const existingContacts = await db.select().from(crmContacts)
      .where(eq(crmContacts.email, email));
    
    if (existingContacts.length > 0) {
      contactId = existingContacts[0].id;
    } else {
      // Create a new contact
      const [newContact] = await db
        .insert(crmContacts)
        .values({
          name,
          email,
          company: businessType || "",
          tags: ["Lead Magnet Subscriber"],
          source: "Lead Magnet",
        })
        .returning();
        
      contactId = newContact.id;
    }
    
    // Create subscription record
    const [subscription] = await db
      .insert(leadMagnetSubscribers)
      .values({
        leadMagnetId,
        name,
        email,
        businessType,
        contactId,
        campaignDrip: true,
      })
      .returning();
    
    res.status(201).json({
      subscription,
      downloadUrl: leadMagnet.fileUrl,
    });
  } catch (error) {
    console.error("Error subscribing to lead magnet:", error);
    res.status(500).json({ error: "Failed to subscribe to lead magnet" });
  }
});

// Email Templates Routes

// Get all email templates
marketingRouter.get("/email-templates", async (req, res) => {
  try {
    const templates = await db.select().from(emailTemplates)
      .orderBy(desc(emailTemplates.createdAt));
    
    res.json(templates);
  } catch (error) {
    console.error("Error getting email templates:", error);
    res.status(500).json({ error: "Failed to get email templates" });
  }
});

// Create email template
marketingRouter.post("/email-templates", async (req, res) => {
  try {
    const validation = insertEmailTemplateSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: "Invalid email template data", 
        details: validation.error.format() 
      });
    }
    
    const [template] = await db
      .insert(emailTemplates)
      .values(validation.data)
      .returning();
    
    res.status(201).json(template);
  } catch (error) {
    console.error("Error creating email template:", error);
    res.status(500).json({ error: "Failed to create email template" });
  }
});

// Campaign Analytics Routes

// Get campaign analytics
marketingRouter.get("/campaigns/:id/analytics", async (req, res) => {
  try {
    const campaignId = parseInt(req.params.id);
    
    const [campaign] = await db.select().from(marketingCampaigns)
      .where(eq(marketingCampaigns.id, campaignId));
    
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    
    const posts = await db.select().from(socialPosts)
      .where(eq(socialPosts.campaignId, campaignId));
    
    // Calculate aggregated metrics from all posts
    const metrics = {
      totalPosts: posts.length,
      postsPublished: posts.filter(post => post.status === "Published").length,
      totalEngagement: 0,
      engagementByPlatform: {} as Record<string, number>,
      impressions: 0,
      clicks: 0,
      likes: 0,
      shares: 0,
      comments: 0,
    };
    
    // Aggregate metrics from all posts
    posts.forEach(post => {
      if (post.metrics) {
        // Add platform-specific metrics
        const platform = post.platform;
        const platformMetrics = post.metrics as any;
        metrics.engagementByPlatform[platform] = (metrics.engagementByPlatform[platform] || 0) + 
          ((platformMetrics.likes || 0) + (platformMetrics.shares || 0) + (platformMetrics.comments || 0));
        
        // Add to total metrics
        metrics.likes += (platformMetrics.likes || 0);
        metrics.shares += (platformMetrics.shares || 0);
        metrics.comments += (platformMetrics.comments || 0);
        metrics.impressions += (platformMetrics.views || 0);
      }
    });
    
    // Calculate total engagement
    metrics.totalEngagement = metrics.likes + metrics.shares + metrics.comments;
    
    res.json({
      campaign: {
        ...campaign,
        posts
      },
      metrics,
    });
  } catch (error) {
    console.error("Error getting campaign analytics:", error);
    res.status(500).json({ error: "Failed to get campaign analytics" });
  }
});