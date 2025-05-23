import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Plus, 
  ChevronDown, 
  Search, 
  Calendar, 
  SendHorizontal, 
  Copy, 
  Trash2, 
  Edit, 
  ArrowRight, 
  Info,
  BarChart,
  Eye,
  Clock,
  Users,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";

// Email template types
interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'offer' | 'case_study' | 'newsletter';
  createdAt: string;
  updatedAt: string;
}

// Email campaign types
interface EmailCampaign {
  id: number;
  name: string;
  subject: string;
  templateId?: number;
  segmentFilter: Record<string, any>;
  scheduledDate?: string;
  sentDate?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent';
  metrics: {
    opens: number;
    clicks: number;
    bounces: number;
    totalRecipients: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Segment types
interface Segment {
  id: number;
  name: string;
  description?: string;
  filter: Record<string, any>;
  count: number;
}

export default function EmailCenter() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [newEmailContent, setNewEmailContent] = useState({
    name: "",
    subject: "",
    content: "",
    type: "welcome" as EmailTemplate["type"],
    segmentId: "",
    scheduledDate: ""
  });
  
  // Sample data for the UI
  const emailTemplates: EmailTemplate[] = [
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to Fusion Data Co!",
      content: "<h1>Welcome to Fusion Data Co!</h1><p>We're thrilled to have you on board. Here's what you can expect from our platform...</p>",
      type: "welcome",
      createdAt: "2023-05-10T10:30:00Z",
      updatedAt: "2023-05-10T10:30:00Z"
    },
    {
      id: 2,
      name: "Monthly Newsletter - June",
      subject: "Fusion Data Co Newsletter - June 2023",
      content: "<h1>June Newsletter</h1><p>Here are the latest updates and features...</p>",
      type: "newsletter",
      createdAt: "2023-06-01T09:15:00Z",
      updatedAt: "2023-06-01T09:15:00Z"
    },
    {
      id: 3,
      name: "Special Offer - Summer",
      subject: "Limited Time Offer: 30% Off All Plans",
      content: "<h1>Summer Special</h1><p>For a limited time, get 30% off all plans when you upgrade...</p>",
      type: "offer",
      createdAt: "2023-06-15T14:20:00Z",
      updatedAt: "2023-06-15T14:20:00Z"
    },
    {
      id: 4,
      name: "Case Study - TechCorp Success",
      subject: "How TechCorp Increased Leads by 300%",
      content: "<h1>TechCorp Success Story</h1><p>Learn how TechCorp used our platform to increase their leads by 300% in just 3 months...</p>",
      type: "case_study",
      createdAt: "2023-07-05T11:45:00Z",
      updatedAt: "2023-07-05T11:45:00Z"
    }
  ];
  
  const emailCampaigns: EmailCampaign[] = [
    {
      id: 1,
      name: "June Newsletter Campaign",
      subject: "Fusion Data Co Newsletter - June 2023",
      templateId: 2,
      segmentFilter: { lists: ["All Subscribers"] },
      sentDate: "2023-06-05T09:00:00Z",
      status: "sent",
      metrics: {
        opens: 456,
        clicks: 189,
        bounces: 12,
        totalRecipients: 875
      },
      createdAt: "2023-06-01T15:30:00Z",
      updatedAt: "2023-06-05T09:00:00Z"
    },
    {
      id: 2,
      name: "Welcome Sequence - First Email",
      subject: "Welcome to Fusion Data Co!",
      templateId: 1,
      segmentFilter: { tags: ["New Signup"] },
      status: "sending",
      metrics: {
        opens: 87,
        clicks: 42,
        bounces: 3,
        totalRecipients: 150
      },
      createdAt: "2023-06-20T10:15:00Z",
      updatedAt: "2023-06-20T10:15:00Z"
    },
    {
      id: 3,
      name: "Summer Special Promotion",
      subject: "Limited Time Offer: 30% Off All Plans",
      templateId: 3,
      segmentFilter: { tags: ["Active User"] },
      scheduledDate: "2023-07-15T08:00:00Z",
      status: "scheduled",
      metrics: {
        opens: 0,
        clicks: 0,
        bounces: 0,
        totalRecipients: 432
      },
      createdAt: "2023-07-10T16:20:00Z",
      updatedAt: "2023-07-10T16:20:00Z"
    },
    {
      id: 4,
      name: "TechCorp Case Study",
      subject: "How TechCorp Increased Leads by 300%",
      templateId: 4,
      segmentFilter: { tags: ["Lead"] },
      status: "draft",
      metrics: {
        opens: 0,
        clicks: 0,
        bounces: 0,
        totalRecipients: 0
      },
      createdAt: "2023-07-12T14:10:00Z",
      updatedAt: "2023-07-12T14:10:00Z"
    }
  ];
  
  const segments: Segment[] = [
    {
      id: 1,
      name: "All Subscribers",
      description: "Everyone who has subscribed to our emails",
      filter: { status: "subscribed" },
      count: 875
    },
    {
      id: 2,
      name: "New Signups",
      description: "Users who signed up in the last 30 days",
      filter: { tags: ["New Signup"] },
      count: 150
    },
    {
      id: 3,
      name: "Active Users",
      description: "Users who logged in within the last 7 days",
      filter: { lastActivity: { $gte: "7d" } },
      count: 432
    },
    {
      id: 4,
      name: "Leads from Campaign Builder",
      description: "Leads that came from Campaign Builder Funnel",
      filter: { tags: ["CampaignBuilderLead"] },
      count: 273
    },
    {
      id: 5,
      name: "Lead Magnet Subscribers",
      description: "Users who downloaded our lead magnet",
      filter: { tags: ["LeadMagnet"] },
      count: 354
    }
  ];
  
  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setNewEmailContent({
      ...newEmailContent,
      name: `Campaign using ${template.name}`,
      subject: template.subject,
      content: template.content
    });
    setShowEmailEditor(true);
  };
  
  const handleCreateCampaign = () => {
    if (!newEmailContent.name || !newEmailContent.subject || !newEmailContent.content || !newEmailContent.segmentId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Normally would submit to API here
    toast({
      title: "Campaign created",
      description: "Your email campaign has been created successfully.",
    });
    
    setShowEmailEditor(false);
    setNewEmailContent({
      name: "",
      subject: "",
      content: "",
      type: "welcome",
      segmentId: "",
      scheduledDate: ""
    });
    setSelectedTemplate(null);
    setActiveTab("campaigns");
  };
  
  const handleScheduleCampaign = () => {
    if (!newEmailContent.scheduledDate) {
      toast({
        title: "Date required",
        description: "Please select a scheduled date.",
        variant: "destructive"
      });
      return;
    }
    
    // Normally would submit to API here
    toast({
      title: "Campaign scheduled",
      description: `Your email campaign has been scheduled for ${new Date(newEmailContent.scheduledDate).toLocaleString()}.`,
    });
    
    setShowEmailEditor(false);
    setNewEmailContent({
      name: "",
      subject: "",
      content: "",
      type: "welcome",
      segmentId: "",
      scheduledDate: ""
    });
    setSelectedTemplate(null);
    setActiveTab("campaigns");
  };
  
  const handleSendNow = () => {
    if (!newEmailContent.segmentId) {
      toast({
        title: "Segment required",
        description: "Please select a recipient segment.",
        variant: "destructive"
      });
      return;
    }
    
    // Show confirmation dialog here
    if (confirm("Are you sure you want to send this email now?")) {
      // Normally would submit to API here
      toast({
        title: "Campaign sent",
        description: "Your email campaign is now being sent.",
      });
      
      setShowEmailEditor(false);
      setNewEmailContent({
        name: "",
        subject: "",
        content: "",
        type: "welcome",
        segmentId: "",
        scheduledDate: ""
      });
      setSelectedTemplate(null);
      setActiveTab("campaigns");
    }
  };
  
  // Function to format metrics numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };
  
  return (
    <>
      <Helmet>
        <title>Email Marketing Center | Fusion Data Co</title>
        <meta name="description" content="Create, schedule, and manage your email marketing campaigns with our comprehensive email center. Track performance and optimize your communications." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="font-['Orbitron'] text-3xl font-bold mb-2 text-white">
                  Email Marketing Center
                </h1>
                <p className="text-gray-400 mb-4 md:mb-0">
                  Create, send, and track email campaigns
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                  onClick={() => setActiveTab("templates")}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create New Email
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700"
                  onClick={() => window.location.href = "/automations"}
                >
                  View Email Automations
                </Button>
              </div>
            </div>
            
            {showEmailEditor ? (
              <EmailEditor 
                template={selectedTemplate}
                emailContent={newEmailContent}
                setEmailContent={setNewEmailContent}
                segments={segments}
                onCancel={() => setShowEmailEditor(false)}
                onSave={handleCreateCampaign}
                onSchedule={handleScheduleCampaign}
                onSendNow={handleSendNow}
              />
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-[#121218]">
                  <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
                    Campaigns
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="segments" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
                    Segments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="campaigns" className="mt-0">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search campaigns..."
                        className="pl-9 bg-[#121218] border-gray-700 w-full sm:w-80"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-[#121218] border-gray-700">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121218] border-gray-700">
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="sending">Sending</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="border-gray-700">
                        <Calendar className="mr-2 h-4 w-4" />
                        Date
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {emailCampaigns.map((campaign) => (
                      <Card key={campaign.id} className="bg-[#121218] border-gray-800 hover:border-gray-700 transition-all duration-200">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                              {campaign.name}
                              <Badge 
                                className={`
                                  ${campaign.status === 'draft' ? 'bg-gray-500/20 text-gray-400 border-gray-500' : ''}
                                  ${campaign.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400 border-blue-500' : ''}
                                  ${campaign.status === 'sending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : ''}
                                  ${campaign.status === 'sent' ? 'bg-green-500/20 text-green-400 border-green-500' : ''}
                                `}
                              >
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </Badge>
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-[#121218] border-gray-800">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                {campaign.status === 'draft' && (
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit Campaign</span>
                                  </DropdownMenuItem>
                                )}
                                {campaign.status === 'draft' && (
                                  <DropdownMenuItem className="cursor-pointer">
                                    <SendHorizontal className="mr-2 h-4 w-4" />
                                    <span>Send Now</span>
                                  </DropdownMenuItem>
                                )}
                                {campaign.status === 'scheduled' && (
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Reschedule</span>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="cursor-pointer">
                                  <Copy className="mr-2 h-4 w-4" />
                                  <span>Duplicate</span>
                                </DropdownMenuItem>
                                {campaign.status !== 'sent' && campaign.status !== 'sending' && (
                                  <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardDescription className="mt-1">
                            {campaign.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm mt-2">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Users className="h-4 w-4" />
                              <span>{formatNumber(campaign.metrics.totalRecipients)} recipients</span>
                            </div>
                            
                            {(campaign.status === 'sent' || campaign.status === 'sending') && (
                              <>
                                <div className="flex items-center gap-1 text-green-400">
                                  <Eye className="h-4 w-4" />
                                  <span>{formatNumber(campaign.metrics.opens)} opens</span>
                                </div>
                                <div className="flex items-center gap-1 text-blue-400">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>{formatNumber(campaign.metrics.clicks)} clicks</span>
                                </div>
                              </>
                            )}
                            
                            {campaign.scheduledDate && campaign.status === 'scheduled' && (
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Scheduled for {new Date(campaign.scheduledDate).toLocaleDateString()} at {new Date(campaign.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {(campaign.status === 'sent' || campaign.status === 'sending') && (
                            <div className="mt-4">
                              <div className="mb-2 flex justify-between items-center text-xs">
                                <span className="text-gray-400">Performance</span>
                                <span className="text-gray-400">
                                  {Math.round((campaign.metrics.opens / campaign.metrics.totalRecipients) * 100)}% open rate
                                </span>
                              </div>
                              <div className="w-full bg-[#0a0a0d] rounded-full h-2.5">
                                <div 
                                  className="bg-gradient-to-r from-[#14ffc8] to-[#14ffc8]/70 h-2.5 rounded-full" 
                                  style={{ width: `${(campaign.metrics.opens / campaign.metrics.totalRecipients) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <div className="text-xs text-gray-500">
                            {campaign.status === 'sent' ? 'Sent' : 'Created'} {new Date(campaign.status === 'sent' && campaign.sentDate ? campaign.sentDate : campaign.createdAt).toLocaleDateString()}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-[#14ffc8] hover:text-[#14ffc8]/80 hover:bg-[#14ffc8]/10"
                          >
                            View Report <BarChart className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="templates" className="mt-0">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search templates..."
                        className="pl-9 bg-[#121218] border-gray-700 w-full sm:w-80"
                      />
                    </div>
                    <Button 
                      className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                      onClick={() => {
                        setSelectedTemplate(null);
                        setNewEmailContent({
                          name: "",
                          subject: "",
                          content: "",
                          type: "welcome",
                          segmentId: "",
                          scheduledDate: ""
                        });
                        setShowEmailEditor(true);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create Template
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {emailTemplates.map((template) => (
                      <Card 
                        key={template.id} 
                        className="bg-[#121218] border-gray-800 hover:border-[#14ffc8]/30 transition-all duration-200 cursor-pointer"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="flex items-center gap-2">
                              {template.name}
                            </CardTitle>
                            <Badge 
                              className={`
                                ${template.type === 'welcome' ? 'bg-green-500/20 text-green-400 border-green-500' : ''}
                                ${template.type === 'newsletter' ? 'bg-blue-500/20 text-blue-400 border-blue-500' : ''}
                                ${template.type === 'offer' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' : ''}
                                ${template.type === 'case_study' ? 'bg-purple-500/20 text-purple-400 border-purple-500' : ''}
                              `}
                            >
                              {template.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
                          </div>
                          <CardDescription className="mt-1">
                            {template.subject}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mt-2 p-3 bg-[#0a0a0d] rounded-lg border border-gray-800 h-32 overflow-hidden">
                            <div className="prose prose-invert max-w-none prose-sm">
                              <div dangerouslySetInnerHTML={{ __html: template.content }} />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <div className="text-xs text-gray-500">
                            Created {new Date(template.createdAt).toLocaleDateString()}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-[#14ffc8] hover:text-[#14ffc8]/80 hover:bg-[#14ffc8]/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTemplateSelect(template);
                            }}
                          >
                            Use Template <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="segments" className="mt-0">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search segments..."
                        className="pl-9 bg-[#121218] border-gray-700 w-full sm:w-80"
                      />
                    </div>
                    <Button className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
                      <Plus className="mr-2 h-4 w-4" /> Create Segment
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {segments.map((segment) => (
                      <Card key={segment.id} className="bg-[#121218] border-gray-800 hover:border-gray-700 transition-all duration-200">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>{segment.name}</CardTitle>
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500">
                              {formatNumber(segment.count)} contacts
                            </Badge>
                          </div>
                          {segment.description && (
                            <CardDescription className="mt-1">
                              {segment.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {Object.entries(segment.filter).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="bg-[#0a0a0d] border-gray-700">
                                {key}: {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2 flex justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-white"
                          >
                            <Edit className="mr-1 h-4 w-4" /> Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-[#14ffc8] hover:text-[#14ffc8]/80 hover:bg-[#14ffc8]/10"
                            onClick={() => {
                              setNewEmailContent({
                                ...newEmailContent,
                                segmentId: segment.id.toString()
                              });
                              setActiveTab("templates");
                            }}
                          >
                            Create Campaign <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            {/* AI Tips Section */}
            {!showEmailEditor && (
              <div className="mt-16 max-w-5xl mx-auto">
                <div className="bg-[#0c0c14] rounded-lg border border-gray-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#14ffc8]/20 rounded-full p-2 mt-1">
                      <Info className="h-5 w-5 text-[#14ffc8]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Email Marketing Tips from AI</h3>
                      <p className="text-gray-400 mb-4">
                        Our AI has analyzed thousands of successful email campaigns and has some tips for you:
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-[#121218] rounded-md p-3 border border-gray-800">
                          <h4 className="font-medium mb-1 flex items-center gap-1">
                            <Clock className="h-4 w-4 text-[#14ffc8]" /> Best Send Times
                          </h4>
                          <p className="text-sm text-gray-400">
                            Emails sent on Tuesday and Thursday mornings (9-11am) show 23% higher open rates.
                          </p>
                        </div>
                        <div className="bg-[#121218] rounded-md p-3 border border-gray-800">
                          <h4 className="font-medium mb-1 flex items-center gap-1">
                            <FileText className="h-4 w-4 text-[#14ffc8]" /> Subject Line Magic
                          </h4>
                          <p className="text-sm text-gray-400">
                            Subject lines with 6-10 words have the highest open rates. Questions increase engagement by 35%.
                          </p>
                        </div>
                        <div className="bg-[#121218] rounded-md p-3 border border-gray-800">
                          <h4 className="font-medium mb-1 flex items-center gap-1">
                            <Users className="h-4 w-4 text-[#14ffc8]" /> Segmentation Impact
                          </h4>
                          <p className="text-sm text-gray-400">
                            Segmented campaigns have 101% higher click rates than non-segmented campaigns.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center">
                        <Button className="bg-[#14ffc8]/20 hover:bg-[#14ffc8]/30 text-[#14ffc8] border border-[#14ffc8]/30">
                          Get AI Content Suggestions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Email Editor Component
interface EmailEditorProps {
  template: EmailTemplate | null;
  emailContent: {
    name: string;
    subject: string;
    content: string;
    type: EmailTemplate["type"];
    segmentId: string;
    scheduledDate: string;
  };
  setEmailContent: React.Dispatch<React.SetStateAction<{
    name: string;
    subject: string;
    content: string;
    type: EmailTemplate["type"];
    segmentId: string;
    scheduledDate: string;
  }>>;
  segments: Segment[];
  onCancel: () => void;
  onSave: () => void;
  onSchedule: () => void;
  onSendNow: () => void;
}

function EmailEditor({ 
  template,
  emailContent,
  setEmailContent,
  segments,
  onCancel,
  onSave,
  onSchedule,
  onSendNow
}: EmailEditorProps) {
  // Rich text editor mock UI (in a real application, you'd use a rich text editor like TinyMCE or Draft.js)
  
  return (
    <div className="bg-[#121218] rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {template ? `Create Campaign From: ${template.name}` : 'Create New Email Template'}
        </h2>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </Button>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={emailContent.name}
                  onChange={(e) => setEmailContent({...emailContent, name: e.target.value})}
                  placeholder="Enter campaign name"
                  className="mt-1 bg-[#0a0a0d] border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={emailContent.subject}
                  onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
                  placeholder="Enter email subject"
                  className="mt-1 bg-[#0a0a0d] border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Email Type</Label>
                <Select 
                  value={emailContent.type} 
                  onValueChange={(value: EmailTemplate["type"]) => setEmailContent({...emailContent, type: value})}
                >
                  <SelectTrigger id="type" className="mt-1 bg-[#0a0a0d] border-gray-700">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border-gray-700">
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="offer">Special Offer</SelectItem>
                    <SelectItem value="case_study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="segment">Select Recipients</Label>
                <Select 
                  value={emailContent.segmentId} 
                  onValueChange={(value) => setEmailContent({...emailContent, segmentId: value})}
                >
                  <SelectTrigger id="segment" className="mt-1 bg-[#0a0a0d] border-gray-700">
                    <SelectValue placeholder="Select recipient segment" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border-gray-700">
                    {segments.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id.toString()}>
                        {segment.name} ({segment.count} contacts)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="schedule">Schedule Date (Optional)</Label>
                <Input
                  id="schedule"
                  type="datetime-local"
                  value={emailContent.scheduledDate}
                  onChange={(e) => setEmailContent({...emailContent, scheduledDate: e.target.value})}
                  className="mt-1 bg-[#0a0a0d] border-gray-700"
                />
              </div>
              
              <div className="flex items-center h-10 gap-2">
                <Info className="h-4 w-4 text-gray-400" />
                <p className="text-xs text-gray-400">
                  You can save as draft, schedule for later, or send immediately
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="content">Email Content</Label>
            <div className="mt-1 border border-gray-700 rounded-lg p-4 bg-[#0a0a0d] min-h-[300px]">
              {/* This would be a rich text editor in a real application */}
              <Textarea
                id="content"
                value={emailContent.content}
                onChange={(e) => setEmailContent({...emailContent, content: e.target.value})}
                placeholder="Enter your email content here..."
                className="min-h-[300px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 resize-none"
              />
            </div>
          </div>
          
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={onCancel} className="border-gray-700">
              Cancel
            </Button>
            <Button variant="outline" onClick={onSave} className="border-[#14ffc8] text-[#14ffc8] hover:bg-[#14ffc8]/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              Save Draft
            </Button>
            {emailContent.scheduledDate && (
              <Button variant="outline" onClick={onSchedule} className="border-[#ff0aff] text-[#ff0aff] hover:bg-[#ff0aff]/10">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            )}
            <Button onClick={onSendNow} className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
              <SendHorizontal className="mr-2 h-4 w-4" />
              Send Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}