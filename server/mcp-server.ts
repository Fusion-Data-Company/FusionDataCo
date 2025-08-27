import { Request, Response } from 'express';
import { db } from './db';
import { crmContacts, elevenLabsConversations, crmActivities } from '@shared/schema';
import { eq, and, desc, ilike } from 'drizzle-orm';

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

// ElevenLabs MCP Server - Proper JSON-RPC 2.0 implementation
export async function handleStreamableMCP(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      const { jsonrpc, id, method, params } = req.body;
      console.log('[MCP] Received request:', JSON.stringify(req.body, null, 2));

      // Handle MCP protocol methods
      switch (method) {
        case 'initialize':
          const { protocolVersion } = params || {};
          const initResponse = {
            jsonrpc: '2.0',
            id,
            result: {
              protocolVersion: protocolVersion || '2025-03-26',
              capabilities: {
                tools: {}
              },
              serverInfo: {
                name: 'Fusion Data Company MCP',
                version: '1.0.0'
              }
            }
          };
          console.log('[MCP] Initialize response:', JSON.stringify(initResponse, null, 2));
          res.json(initResponse);
          break;

        case 'notifications/initialized':
          // Handle initialized notification (no response needed)
          console.log('[MCP] Received notifications/initialized');
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
                  description: "Look up an existing contact by name to retrieve conversation history and notes",
                  inputSchema: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "The name of the contact to look up"
                      }
                    },
                    required: ["name"]
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
          console.log('[MCP] Tools list response:', JSON.stringify(toolsResponse, null, 2));
          res.json(toolsResponse);
          break;

        case 'tools/call':
          const { name: toolName, arguments: toolArgs } = params;
          console.log('[MCP] Tool call:', toolName, 'with params:', toolArgs);

          let result;
          switch (toolName) {
            case 'lookup_contact':
              result = await lookupContact(toolArgs);
              break;
            case 'create_contact':
              result = await createContact(toolArgs);
              break;
            case 'save_conversation':
              result = await saveConversation(toolArgs);
              break;
            case 'get_conversation_history':
              result = await getConversationHistory(toolArgs);
              break;
            default:
              throw new Error(`Unknown tool: ${toolName}`);
          }

          const toolResponse = {
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
          };
          console.log('[MCP] Tool response:', JSON.stringify(toolResponse, null, 2));
          res.json(toolResponse);
          break;

        default:
          const errorResponse = {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`
            }
          };
          res.status(400).json(errorResponse);
      }
    } else {
      // GET request - return server info
      res.json({
        name: 'Fusion Data Company MCP Server',
        version: '1.0.0',
        description: 'MCP server for managing contact information and conversation history',
        endpoints: {
          mcp: 'POST /api/mcp - MCP JSON-RPC 2.0 endpoint'
        }
      });
    }
  } catch (error) {
    console.error('[MCP] Error:', error);
    const errorResponse = {
      jsonrpc: '2.0',
      id: req.body?.id || 'error',
      error: {
        code: -32603,
        message: 'Internal error',
        data: error instanceof Error ? error.message : 'Unknown error'
      }
    };
    res.status(500).json(errorResponse);
  }
}

// Keep the JSON endpoint for testing
export async function handleMCPJson(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      res.json({
        status: 'Fusion Data Company MCP Server Ready',
        endpoints: {
          tools: 'GET /api/mcp - Get available tools',
          execute: 'POST /api/mcp - Execute a tool'
        }
      });
      return;
    }

    const { tool_name, parameters } = req.body;
    console.log('[MCP-JSON] Tool call:', tool_name, 'with params:', parameters);
    
    let result;
    switch (tool_name) {
      case 'lookup_contact':
        result = await lookupContact(parameters);
        break;
      case 'create_contact':
        result = await createContact(parameters);
        break;
      case 'save_conversation':
        result = await saveConversation(parameters);
        break;
      case 'get_conversation_history':
        result = await getConversationHistory(parameters);
        break;
      default:
        throw new Error(`Unknown tool: ${tool_name}`);
    }

    console.log('[MCP-JSON] Tool result:', result);
    res.json(result);
  } catch (error) {
    console.error('[MCP-JSON] Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}