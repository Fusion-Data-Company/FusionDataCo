import { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  User, 
  ChevronDown, 
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CrmContact } from '@shared/schema';

const TEMPLATES = [
  {
    id: 'welcome',
    name: 'Welcome Message',
    content: 'Hi {{name}}, thanks for connecting with us! How can our team help you today?'
  },
  {
    id: 'follow-up',
    name: 'Follow-up Message',
    content: 'Hi {{name}}, I wanted to follow up on our previous conversation. Do you have any questions I can help with?'
  },
  {
    id: 'promo',
    name: 'Special Offer',
    content: 'Hi {{name}}, we\'re offering a special 20% discount on our Pro plan this week. Would you be interested in learning more?'
  },
  {
    id: 'support',
    name: 'Support Request',
    content: 'Hi {{name}}, I see you\'ve been using our platform for {{days}} days. How\'s your experience been so far? Is there anything I can help you with?'
  }
];

// Mock CRM contacts
const CONTACTS = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    telegramUsername: 'alexjohnson',
    lastContactDate: '2023-05-10T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    telegramUsername: 'sarahw',
    lastContactDate: '2023-06-15T14:20:00Z'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    telegramUsername: 'mbrown',
    lastContactDate: '2023-06-20T09:45:00Z'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    telegramUsername: 'emilyd',
    lastContactDate: '2023-07-05T11:15:00Z'
  }
];

interface TelegramIntegrationProps {
  contacts?: CrmContact[];
  channelName?: string;
}

export default function TelegramIntegration({ 
  contacts = CONTACTS, 
  channelName = 'FusionDataCo Updates' 
}: TelegramIntegrationProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('channel');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [channelMetrics, setChannelMetrics] = useState({
    subscribers: 354,
    newLeads: 42,
    engagement: '23%',
    lastUpdate: '2023-07-10T14:30:00Z'
  });
  
  // Function to handle channel update
  const handleChannelUpdate = () => {
    if (!messageContent) {
      toast({
        title: 'Message required',
        description: 'Please enter a message to send to the channel.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Update sent',
        description: 'Your message has been sent to the Telegram channel.',
      });
      setMessageContent('');
    }, 1500);
  };
  
  // Function to handle direct message
  const handleDirectMessage = () => {
    if (!selectedContact) {
      toast({
        title: 'Contact required',
        description: 'Please select a contact to message.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!messageContent) {
      toast({
        title: 'Message required',
        description: 'Please enter a message to send.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Message sent',
        description: `Your message has been sent to ${contacts.find(c => c.id.toString() === selectedContact)?.name}.`,
      });
      setMessageContent('');
      setSelectedContact('');
      setSelectedTemplate('');
    }, 1500);
  };
  
  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    const contact = contacts.find(c => c.id.toString() === selectedContact);
    if (!contact) return;
    
    let content = template.content;
    content = content.replace(/{{name}}/g, contact.name.split(' ')[0]);
    
    // Calculate days since registration if needed
    if (content.includes('{{days}}')) {
      const daysSinceReg = Math.floor((new Date().getTime() - new Date(contact.lastContactDate).getTime()) / (1000 * 3600 * 24));
      content = content.replace(/{{days}}/g, daysSinceReg.toString());
    }
    
    setMessageContent(content);
  };
  
  // Generate Telegram link
  const getTelegramLink = (username: string) => {
    return `https://t.me/${username}`;
  };
  
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 bg-[#121218]">
          <TabsTrigger value="channel" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
            Channel Updates
          </TabsTrigger>
          <TabsTrigger value="dm" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
            Direct Messages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="channel" className="mt-0">
          <Card className="enterprise-card">
            <div className="glow-wrapper"></div>
            <CardHeader className="enterprise-card-content">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#14ffc8]" />
                Telegram Channel Updates
              </CardTitle>
              <CardDescription>
                Send updates to your Telegram channel "{channelName}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea 
                      placeholder="Type your update message here..."
                      className="min-h-[200px] bg-[#0a0a0d] border-gray-700 resize-none"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{messageContent.length} characters</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          Channel Statistics <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#121218] border-gray-800">
                        <DialogHeader>
                          <DialogTitle>{channelName} - Statistics</DialogTitle>
                          <DialogDescription>
                            View current metrics for your Telegram channel
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="bg-[#0a0a0d] p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400 mb-1">Subscribers</div>
                            <div className="text-2xl font-bold text-white">{channelMetrics.subscribers}</div>
                          </div>
                          <div className="bg-[#0a0a0d] p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400 mb-1">New Leads</div>
                            <div className="text-2xl font-bold text-[#14ffc8]">{channelMetrics.newLeads}</div>
                          </div>
                          <div className="bg-[#0a0a0d] p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400 mb-1">Engagement Rate</div>
                            <div className="text-2xl font-bold text-[#ff0aff]">{channelMetrics.engagement}</div>
                          </div>
                          <div className="bg-[#0a0a0d] p-4 rounded-lg border border-gray-800">
                            <div className="text-sm text-gray-400 mb-1">Last Updated</div>
                            <div className="text-lg font-medium text-white">
                              {new Date(channelMetrics.lastUpdate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <div className="bg-[#0a0a0d] rounded-lg border border-gray-800 p-4 mb-4 flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#14ffc8]/20 text-[#14ffc8] border-[#14ffc8]">
                          Preview
                        </Badge>
                        <div className="text-sm text-gray-400">How your message will appear</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mt-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#14ffc8]/20 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-[#14ffc8]" />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{channelName}</div>
                        <div className="text-sm text-gray-400">Now</div>
                        <div className="mt-2 text-gray-200 whitespace-pre-wrap">
                          {messageContent || "Your message will appear here..."}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      onClick={handleChannelUpdate}
                      className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        "Sending update..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Channel Update
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dm" className="mt-0">
          <Card className="enterprise-card">
            <div className="glow-wrapper"></div>
            <CardHeader className="enterprise-card-content">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#ff0aff]" />
                Telegram Direct Messages
              </CardTitle>
              <CardDescription>
                Send personalized messages to leads and customers via Telegram
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Contact</Label>
                    <Select value={selectedContact} onValueChange={(value) => {
                      setSelectedContact(value);
                      setSelectedTemplate('');
                      setMessageContent('');
                    }}>
                      <SelectTrigger className="w-full bg-[#0a0a0d] border-gray-700">
                        <SelectValue placeholder="Choose a contact" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121218] border-gray-700">
                        {contacts.filter(c => c.telegramUsername).map((contact) => (
                          <SelectItem key={contact.id} value={contact.id.toString()}>
                            {contact.name} (@{contact.telegramUsername})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedContact && (
                    <div className="space-y-2">
                      <Label>Message Template (Optional)</Label>
                      <Select value={selectedTemplate} onValueChange={(value) => {
                        setSelectedTemplate(value);
                        applyTemplate(value);
                      }}>
                        <SelectTrigger className="w-full bg-[#0a0a0d] border-gray-700">
                          <SelectValue placeholder="Select a template or write custom message" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121218] border-gray-700">
                          {TEMPLATES.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea 
                      placeholder={selectedContact ? "Type your message here..." : "Select a contact first"}
                      className="min-h-[200px] bg-[#0a0a0d] border-gray-700 resize-none"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      disabled={!selectedContact}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col">
                  {selectedContact ? (
                    <div className="bg-[#0a0a0d] rounded-lg border border-gray-800 p-4 mb-4 flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#ff0aff]/20 text-[#ff0aff] border-[#ff0aff]">
                            Contact
                          </Badge>
                          <div className="text-sm text-white">
                            {contacts.find(c => c.id.toString() === selectedContact)?.name}
                          </div>
                        </div>
                        
                        {contacts.find(c => c.id.toString() === selectedContact)?.telegramUsername && (
                          <a 
                            href={getTelegramLink(contacts.find(c => c.id.toString() === selectedContact)?.telegramUsername || '')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#14ffc8] hover:text-[#14ffc8]/80 text-sm flex items-center"
                          >
                            Open in Telegram <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex items-start gap-3 mt-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ff0aff]/20 flex items-center justify-center">
                          <User className="h-5 w-5 text-[#ff0aff]" />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium">You</div>
                          <div className="text-sm text-gray-400">Now</div>
                          <div className="mt-2 text-gray-200 whitespace-pre-wrap">
                            {messageContent || "Your message will appear here..."}
                          </div>
                          {messageContent && (
                            <div className="text-sm text-gray-400 mt-1 flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" /> Not sent yet
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#0a0a0d] rounded-lg border border-gray-800 p-6 mb-4 flex-grow flex flex-col items-center justify-center text-center">
                      <User className="h-12 w-12 text-gray-500 mb-3" />
                      <h3 className="text-lg font-medium text-white mb-1">No Contact Selected</h3>
                      <p className="text-gray-400 mb-3">Select a contact to send a direct message via Telegram</p>
                    </div>
                  )}
                  
                  <div>
                    <Button 
                      onClick={handleDirectMessage}
                      className="w-full bg-[#ff0aff] hover:bg-[#ff0aff]/90 text-black font-medium"
                      disabled={loading || !selectedContact || !messageContent}
                    >
                      {loading ? (
                        "Sending message..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Direct Message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 flex justify-between">
              <div className="text-xs text-gray-400">
                Messages will be sent through the Telegram API
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Telegram Setup Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121218] border-gray-800">
                  <DialogHeader>
                    <DialogTitle>Telegram Integration Setup</DialogTitle>
                    <DialogDescription>
                      Follow these steps to set up Telegram integration
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">1. Create a Telegram Bot</h4>
                      <p className="text-sm text-gray-400">
                        Message @BotFather on Telegram to create a new bot and get your API token.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">2. Configure Your Bot Token</h4>
                      <div className="flex items-center gap-2 bg-[#0a0a0d] rounded p-2 border border-gray-700">
                        <code className="text-sm flex-grow truncate">1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi</code>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">3. Create a Telegram Channel</h4>
                      <p className="text-sm text-gray-400">
                        Create a channel and add your bot as an administrator with posting privileges.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">4. Link Customer Telegram Usernames</h4>
                      <p className="text-sm text-gray-400">
                        Ask your customers for their Telegram usernames and add them to their CRM contact profiles.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}