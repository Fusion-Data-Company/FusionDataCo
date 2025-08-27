import { Request, Response } from 'express';
import { db } from './db';
import { crmContacts, elevenLabsConversations, crmActivities } from '@shared/schema';
import { eq, and, desc, ilike } from 'drizzle-orm';

// MCP Protocol Types
interface MCPRequest {
  jsonrpc: string;
  id: string | number;
  method: string;
  params?: any;
}

interface MCPResponse {
  jsonrpc: string;
  id: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

// Available tools for ElevenLabs agent
const MCP_TOOLS: MCPTool[] = [
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
];

// Tool implementations
async function lookupContact(params: { name: string }) {
  try {
    // Search for contacts by name (case-insensitive)
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

    // Get recent conversations for each contact
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
    // Save conversation record
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

    // Also create a CRM activity record
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

    // Update contact's last contact date
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

// Main MCP request handler
async function handleMCPRequest(request: MCPRequest): Promise<MCPResponse> {
  const { id, method, params } = request;

  try {
    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {}
            },
            serverInfo: {
              name: 'Fusion Data Company MCP',
              version: '1.0.0'
            }
          }
        };

      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            tools: MCP_TOOLS
          }
        };

      case 'tools/call':
        const { name: toolName, arguments: toolArgs } = params;
        
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

        return {
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

      default:
        throw new Error(`Unknown method: ${method}`);
    }
  } catch (error) {
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -1,
        message: error instanceof Error ? error.message : 'Unknown error',
        data: error
      }
    };
  }
}

// Streamable HTTP endpoint for ElevenLabs
export async function handleStreamableMCP(req: Request, res: Response) {
  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      const mcpRequest = req.body as MCPRequest;
      console.log('[MCP] Received request:', JSON.stringify(mcpRequest, null, 2));
      
      const response = await handleMCPRequest(mcpRequest);
      console.log('[MCP] Sending response:', JSON.stringify(response, null, 2));
      
      // Send as Server-Sent Event
      res.write(`data: ${JSON.stringify(response)}\n\n`);
      res.end();
    } else {
      // Handle GET request for connection testing
      res.write(`data: ${JSON.stringify({
        jsonrpc: '2.0',
        method: 'notification',
        params: {
          type: 'connection_established',
          message: 'Fusion Data Company MCP Server is ready',
          timestamp: new Date().toISOString()
        }
      })}\n\n`);
      res.end();
    }
  } catch (error) {
    console.error('[MCP] Error handling request:', error);
    const errorResponse = {
      jsonrpc: '2.0',
      id: 'error',
      error: {
        code: -1,
        message: 'Internal server error',
        data: error instanceof Error ? error.message : 'Unknown error'
      }
    };
    res.write(`data: ${JSON.stringify(errorResponse)}\n\n`);
    res.end();
  }
}

// Regular JSON endpoint for direct API calls
export async function handleMCPJson(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const mcpRequest = req.body as MCPRequest;
    console.log('[MCP-JSON] Received request:', JSON.stringify(mcpRequest, null, 2));
    
    const response = await handleMCPRequest(mcpRequest);
    console.log('[MCP-JSON] Sending response:', JSON.stringify(response, null, 2));
    
    res.json(response);
  } catch (error) {
    console.error('[MCP-JSON] Error handling request:', error);
    res.status(500).json({
      jsonrpc: '2.0',
      id: 'error',
      error: {
        code: -1,
        message: 'Internal server error',
        data: error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
}