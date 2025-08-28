import { Request, Response } from 'express';
import { db } from './db';
import { crmContacts, elevenLabsConversations, crmActivities } from '@shared/schema';
import { eq, and, desc, ilike } from 'drizzle-orm';

// Import automation services for FUSION integration
import { ContentAutomationService } from './automation/contentAutomation';
import { AutomationScheduler } from './automation/scheduler';

// Initialize FUSION automation services
const contentService = new ContentAutomationService();
const automationScheduler = new AutomationScheduler();

// Tool implementations
async function lookupContact(params: { name: string }) {
  try {
    const contacts = await db
      .select()
      .from(crmContacts)
      .where(ilike(crmContacts.name, `%${params.name}%`))
      .limit(5);

    if (contacts.length === 0) {
      return {
        found: false,
        message: `No contact found with name "${params.name}"`
      };
    }

    const contactsWithHistory = await Promise.all(
      contacts.map(async (contact) => {
        const recentConversations = await db
          .select()
          .from(elevenLabsConversations)
          .where(eq(elevenLabsConversations.contactId, contact.id))
          .orderBy(desc(elevenLabsConversations.createdAt))
          .limit(3);

        return {
          ...contact,
          recentConversations
        };
      })
    );

    return {
      found: true,
      contacts: contactsWithHistory,
      message: `Found ${contacts.length} contact(s) matching "${params.name}"`
    };
  } catch (error) {
    console.error('Error looking up contact:', error);
    throw new Error('Failed to lookup contact');
  }
}

async function createContact(params: {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  source?: string;
  notes?: string;
}) {
  try {
    const [newContact] = await db
      .insert(crmContacts)
      .values({
        name: params.name,
        email: params.email || '',
        phone: params.phone,
        company: params.company,
        position: params.position,
        source: params.source || 'ElevenLabs Call',
        status: 'New',
        notes: params.notes,
        lastContactDate: new Date(),
      })
      .returning();

    return {
      success: true,
      contact: newContact,
      message: `Created new contact: ${params.name}`
    };
  } catch (error) {
    console.error('Error creating contact:', error);
    throw new Error('Failed to create contact');
  }
}

async function saveConversation(params: {
  sessionId: string;
  contactId: number;
  callerName: string;
  phoneNumber?: string;
  conversationSummary: string;
  callNotes?: string;
  intent?: string;
  followUpRequired?: boolean;
  duration?: number;
  isNewContact?: boolean;
}) {
  try {
    const [conversation] = await db
      .insert(elevenLabsConversations)
      .values({
        sessionId: params.sessionId,
        contactId: params.contactId,
        callerName: params.callerName,
        phoneNumber: params.phoneNumber,
        conversationSummary: params.conversationSummary,
        callNotes: params.callNotes,
        intent: params.intent,
        status: params.followUpRequired ? 'follow_up_needed' : 'completed',
        duration: params.duration,
        isNewContact: params.isNewContact || false,
        followUpRequired: params.followUpRequired || false,
      })
      .returning();

    await db
      .insert(crmActivities)
      .values({
        contactId: params.contactId,
        type: 'Call',
        subject: `ElevenLabs AI Call - ${params.intent || 'General Inquiry'}`,
        description: `${params.conversationSummary}\n\nNotes: ${params.callNotes || 'No additional notes'}`,
        completedDate: new Date(),
        isCompleted: true,
      });

    await db
      .update(crmContacts)
      .set({ 
        lastContactDate: new Date(),
        updatedAt: new Date()
      })
      .where(eq(crmContacts.id, params.contactId));

    return {
      success: true,
      conversation,
      message: 'Conversation saved successfully'
    };
  } catch (error) {
    console.error('Error saving conversation:', error);
    throw new Error('Failed to save conversation');
  }
}

async function getConversationHistory(params: {
  contactId: number;
  limit?: number;
}) {
  try {
    const limit = params.limit || 5;
    
    const conversations = await db
      .select()
      .from(elevenLabsConversations)
      .where(eq(elevenLabsConversations.contactId, params.contactId))
      .orderBy(desc(elevenLabsConversations.createdAt))
      .limit(limit);

    const activities = await db
      .select()
      .from(crmActivities)
      .where(eq(crmActivities.contactId, params.contactId))
      .orderBy(desc(crmActivities.createdAt))
      .limit(limit);

    return {
      success: true,
      conversations,
      activities,
      message: `Retrieved ${conversations.length} conversations and ${activities.length} activities`
    };
  } catch (error) {
    console.error('Error getting conversation history:', error);
    throw new Error('Failed to get conversation history');
  }
}

// FUSION-powered automation functions
async function triggerFusionBlogAutomation(params: {
  topic: string;
  priority?: string;
}) {
  try {
    console.log('[FUSION-MCP] Triggering FUSION blog automation for topic:', params.topic);
    
    // Use the content automation service to generate blog post
    const result = await contentService.runDailyBlogWorkflow();
    
    return {
      success: true,
      blogSlug: result,
      topic: params.topic,
      priority: params.priority || 'medium',
      message: `FUSION blog automation completed successfully for topic: ${params.topic}`
    };
  } catch (error) {
    console.error('[FUSION-MCP] Error triggering blog automation:', error);
    throw new Error('Failed to trigger FUSION blog automation');
  }
}

async function triggerFusionNewsletter(params: {
  theme?: string;
  includeMetrics?: boolean;
}) {
  try {
    console.log('[FUSION-MCP] Triggering FUSION newsletter generation');
    
    // Use the content automation service to generate newsletter
    const result = await contentService.generateMonthlyNewsletter();
    
    return {
      success: true,
      newsletter: result,
      theme: params.theme || 'FUSION Enterprise Updates',
      includeMetrics: params.includeMetrics || true,
      message: 'FUSION newsletter generation completed successfully'
    };
  } catch (error) {
    console.error('[FUSION-MCP] Error generating newsletter:', error);
    throw new Error('Failed to generate FUSION newsletter');
  }
}

// ElevenLabs expects a simple HTTP API, not MCP JSON-RPC
export async function handleStreamableMCP(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Return tools list for ElevenLabs
      const tools = [
        {
          name: "lookup_contact",
          description: "FUSION-powered contact lookup to retrieve conversation history and FUSION intelligence",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the contact to look up using FUSION search algorithms"
              }
            },
            required: ["name"]
          }
        },
        {
          name: "trigger_fusion_blog_automation",
          description: "Trigger FUSION-powered blog content generation with AI optimization",
          parameters: {
            type: "object",
            properties: {
              topic: {
                type: "string",
                description: "Blog topic or theme for FUSION content generation"
              },
              priority: {
                type: "string",
                description: "Priority level: high, medium, low"
              }
            },
            required: ["topic"]
          }
        },
        {
          name: "trigger_fusion_newsletter",
          description: "Generate FUSION-powered newsletter with enterprise automation",
          parameters: {
            type: "object",
            properties: {
              theme: {
                type: "string",
                description: "Newsletter theme or focus area"
              },
              includeMetrics: {
                type: "boolean",
                description: "Include performance metrics and FUSION analytics"
              }
            }
          }
        },
        {
          name: "create_contact",
          description: "Create a new contact record for a prospective client",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Full name of the contact"
              },
              email: {
                type: "string",
                description: "Email address if provided"
              },
              phone: {
                type: "string",
                description: "Phone number if available"
              },
              company: {
                type: "string",
                description: "Company name if mentioned"
              },
              position: {
                type: "string",
                description: "Job title or position if mentioned"
              },
              source: {
                type: "string",
                description: "How they heard about us"
              },
              notes: {
                type: "string",
                description: "Initial notes from the conversation"
              }
            },
            required: ["name"]
          }
        },
        {
          name: "save_conversation",
          description: "Save conversation summary and notes for a contact",
          parameters: {
            type: "object",
            properties: {
              sessionId: {
                type: "string",
                description: "ElevenLabs session identifier"
              },
              contactId: {
                type: "number",
                description: "ID of the contact (from lookup_contact or create_contact)"
              },
              callerName: {
                type: "string",
                description: "Name the caller provided"
              },
              phoneNumber: {
                type: "string",
                description: "Phone number if available"
              },
              conversationSummary: {
                type: "string",
                description: "Brief summary of the conversation"
              },
              callNotes: {
                type: "string",
                description: "Detailed notes from the call"
              },
              intent: {
                type: "string",
                description: "What the caller wanted (quote, information, etc.)"
              },
              followUpRequired: {
                type: "boolean",
                description: "Whether follow-up is needed"
              },
              duration: {
                type: "number",
                description: "Call duration in seconds"
              },
              isNewContact: {
                type: "boolean",
                description: "Whether this is a new contact"
              }
            },
            required: ["sessionId", "contactId", "callerName", "conversationSummary"]
          }
        },
        {
          name: "get_conversation_history",
          description: "Get previous conversation history for a returning contact",
          parameters: {
            type: "object",
            properties: {
              contactId: {
                type: "number",
                description: "ID of the contact to get history for"
              },
              limit: {
                type: "number",
                description: "Maximum number of conversations to return (default: 5)"
              }
            },
            required: ["contactId"]
          }
        }
      ];

      console.log('[MCP] Returning tools list');
      res.json(tools);
      return;
    }

    if (req.method === 'POST') {
      const { method, params, id } = req.body;
      console.log('[MCP] JSON-RPC method:', method, 'with params:', params);

      switch (method) {
        case 'initialize':
          const initResponse = {
            jsonrpc: '2.0',
            id,
            result: {
              protocolVersion: params?.protocolVersion || '2025-03-26',
              capabilities: {
                tools: {}
              },
              serverInfo: {
                name: 'FUSION Data Company MCP Server',
                version: '2.0.0-FUSION',
                description: 'Enterprise AI-powered FUSION automation and conversational agent integration'
              }
            }
          };
          res.json(initResponse);
          break;

        case 'notifications/initialized':
          res.status(200).end();
          break;

        case 'tools/list':
          const toolsResponse = {
            jsonrpc: '2.0',
            id,
            result: {
              tools: [
                {
                  name: "lookup_contact",
                  description: "FUSION-powered contact lookup to retrieve conversation history and FUSION intelligence",
                  inputSchema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "The name of the contact to look up using FUSION search algorithms"
                      }
                    },
                    required: ["name"]
                  }
                },
                {
                  name: "trigger_fusion_blog_automation",
                  description: "Trigger FUSION-powered blog content generation with AI optimization",
                  inputSchema: {
                    type: "object",
                    properties: {
                      topic: {
                        type: "string",
                        description: "Blog topic or theme for FUSION content generation"
                      },
                      priority: {
                        type: "string",
                        description: "Priority level: high, medium, low"
                      }
                    },
                    required: ["topic"]
                  }
                },
                {
                  name: "trigger_fusion_newsletter",
                  description: "Generate FUSION-powered newsletter with enterprise automation",
                  inputSchema: {
                    type: "object",
                    properties: {
                      theme: {
                        type: "string",
                        description: "Newsletter theme or focus area"
                      },
                      includeMetrics: {
                        type: "boolean",
                        description: "Include performance metrics and FUSION analytics"
                      }
                    }
                  }
                },
                {
                  name: "create_contact",
                  description: "Create a new contact record for a prospective client",
                  inputSchema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "Full name of the contact"
                      },
                      email: {
                        type: "string",
                        description: "Email address if provided"
                      },
                      phone: {
                        type: "string",
                        description: "Phone number if available"
                      },
                      company: {
                        type: "string",
                        description: "Company name if mentioned"
                      },
                      position: {
                        type: "string",
                        description: "Job title or position if mentioned"
                      },
                      source: {
                        type: "string",
                        description: "How they heard about us"
                      },
                      notes: {
                        type: "string",
                        description: "Initial notes from the conversation"
                      }
                    },
                    required: ["name"]
                  }
                },
                {
                  name: "save_conversation",
                  description: "Save conversation summary and notes for a contact",
                  inputSchema: {
                    type: "object",
                    properties: {
                      sessionId: {
                        type: "string",
                        description: "ElevenLabs session identifier"
                      },
                      contactId: {
                        type: "number",
                        description: "ID of the contact (from lookup_contact or create_contact)"
                      },
                      callerName: {
                        type: "string",
                        description: "Name the caller provided"
                      },
                      phoneNumber: {
                        type: "string",
                        description: "Phone number if available"
                      },
                      conversationSummary: {
                        type: "string",
                        description: "Brief summary of the conversation"
                      },
                      callNotes: {
                        type: "string",
                        description: "Detailed notes from the call"
                      },
                      intent: {
                        type: "string",
                        description: "What the caller wanted (quote, information, etc.)"
                      },
                      followUpRequired: {
                        type: "boolean",
                        description: "Whether follow-up is needed"
                      },
                      duration: {
                        type: "number",
                        description: "Call duration in seconds"
                      },
                      isNewContact: {
                        type: "boolean",
                        description: "Whether this is a new contact"
                      }
                    },
                    required: ["sessionId", "contactId", "callerName", "conversationSummary"]
                  }
                },
                {
                  name: "get_conversation_history",
                  description: "Get previous conversation history for a returning contact",
                  inputSchema: {
                    type: "object",
                    properties: {
                      contactId: {
                        type: "number",
                        description: "ID of the contact to get history for"
                      },
                      limit: {
                        type: "number",
                        description: "Maximum number of conversations to return (default: 5)"
                      }
                    },
                    required: ["contactId"]
                  }
                }
              ]
            }
          };
          res.json(toolsResponse);
          break;

        case 'tools/call':
          const { name, arguments: args } = params;
          console.log('[MCP] Tool call:', name, 'with arguments:', args);
          
          let result;
          try {
            switch (name) {
              case 'lookup_contact':
                result = await lookupContact(args);
                break;
              case 'create_contact':
                result = await createContact(args);
                break;
              case 'save_conversation':
                result = await saveConversation(args);
                break;
              case 'get_conversation_history':
                result = await getConversationHistory(args);
                break;
              case 'trigger_fusion_blog_automation':
                result = await triggerFusionBlogAutomation(args);
                break;
              case 'trigger_fusion_newsletter':
                result = await triggerFusionNewsletter(args);
                break;
              default:
                throw new Error(`Unknown FUSION tool: ${name}`);
            }

            res.json({
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                  }
                ]
              }
            });
          } catch (error) {
            res.json({
              jsonrpc: '2.0',
              id,
              error: {
                code: -32603,
                message: error instanceof Error ? error.message : 'Unknown error'
              }
            });
          }
          break;

        default:
          res.json({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`
            }
          });
      }
    }
  } catch (error) {
    console.error('[MCP] Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Keep the JSON endpoint for testing
export async function handleMCPJson(req: Request, res: Response) {
  return handleStreamableMCP(req, res);
}