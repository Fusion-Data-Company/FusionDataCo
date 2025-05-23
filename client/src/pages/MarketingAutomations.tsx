import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  ArrowRight, 
  Activity, 
  Mail, 
  MessageSquare, 
  Clock, 
  Users, 
  Tag, 
  CheckCircle, 
  X,
  Save,
  PlayCircle,
  PauseCircle,
  MoreHorizontal,
  Settings,
  Edit,
  Trash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Types for automation components
type TriggerType = 'new_lead' | 'form_submission' | 'tag_added';
type ActionType = 'send_email' | 'send_sms' | 'create_task';
type ConditionType = 'tag_equals' | 'source_equals' | 'property_equals';

interface AutomationNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  subtype: TriggerType | ActionType | ConditionType;
  data: Record<string, any>;
  position: { x: number; y: number };
}

interface Automation {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  nodes: AutomationNode[];
  createdAt: string;
  updatedAt: string;
}

export default function MarketingAutomations() {
  const { toast } = useToast();
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: 1,
      name: "Welcome Email Sequence",
      description: "Sends welcome emails to new leads and creates follow-up tasks",
      isActive: true,
      nodes: [
        {
          id: "trigger-1",
          type: "trigger",
          subtype: "new_lead",
          data: { source: "Lead Magnet" },
          position: { x: 250, y: 100 }
        },
        {
          id: "action-1",
          type: "action",
          subtype: "send_email",
          data: { template: "welcome", delay: 0 },
          position: { x: 250, y: 200 }
        },
        {
          id: "action-2",
          type: "action",
          subtype: "create_task",
          data: { title: "Follow-up call", assignee: "Sales Team", dueDate: 2 },
          position: { x: 250, y: 300 }
        }
      ],
      createdAt: "2023-05-15T14:30:00Z",
      updatedAt: "2023-05-15T14:30:00Z"
    },
    {
      id: 2,
      name: "Lead Magnet Nurture",
      description: "3-day email drip sequence for lead magnet downloads",
      isActive: true,
      nodes: [
        {
          id: "trigger-1",
          type: "trigger",
          subtype: "form_submission",
          data: { form: "Lead Magnet" },
          position: { x: 250, y: 100 }
        },
        {
          id: "action-1",
          type: "action",
          subtype: "send_email",
          data: { template: "lead-magnet-day1", delay: 0 },
          position: { x: 250, y: 200 }
        },
        {
          id: "action-2",
          type: "action",
          subtype: "send_email",
          data: { template: "lead-magnet-day2", delay: 24 },
          position: { x: 250, y: 300 }
        },
        {
          id: "action-3",
          type: "action",
          subtype: "send_email",
          data: { template: "lead-magnet-day3", delay: 48 },
          position: { x: 250, y: 400 }
        }
      ],
      createdAt: "2023-06-10T09:15:00Z",
      updatedAt: "2023-06-10T09:15:00Z"
    },
    {
      id: 3,
      name: "Re-engagement Campaign",
      description: "Target leads who haven't engaged in 30+ days",
      isActive: false,
      nodes: [
        {
          id: "trigger-1",
          type: "trigger",
          subtype: "tag_added",
          data: { tag: "Inactive" },
          position: { x: 250, y: 100 }
        },
        {
          id: "action-1",
          type: "action",
          subtype: "send_email",
          data: { template: "re-engagement", delay: 0 },
          position: { x: 250, y: 200 }
        },
        {
          id: "condition-1",
          type: "condition",
          subtype: "property_equals",
          data: { property: "clicked", value: true },
          position: { x: 250, y: 300 }
        },
        {
          id: "action-2",
          type: "action",
          subtype: "create_task",
          data: { title: "Call inactive lead", assignee: "Sales Team", dueDate: 1 },
          position: { x: 250, y: 400 }
        }
      ],
      createdAt: "2023-07-20T16:45:00Z",
      updatedAt: "2023-07-20T16:45:00Z"
    }
  ]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    description: "",
    triggerType: "new_lead" as TriggerType
  });
  
  // Toggle automation status
  const toggleAutomationStatus = (id: number) => {
    setAutomations(automations.map(automation => 
      automation.id === id 
        ? { ...automation, isActive: !automation.isActive } 
        : automation
    ));
    
    toast({
      title: "Status updated",
      description: `Automation ${automations.find(a => a.id === id)?.isActive ? 'paused' : 'activated'} successfully.`,
    });
  };
  
  // Delete automation
  const deleteAutomation = (id: number) => {
    setAutomations(automations.filter(automation => automation.id !== id));
    
    toast({
      title: "Automation deleted",
      description: "The automation has been deleted successfully.",
    });
  };
  
  // Create new automation
  const createAutomation = () => {
    if (!newAutomation.name) {
      toast({
        title: "Name required",
        description: "Please provide a name for your automation.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(...automations.map(a => a.id), 0) + 1;
    
    const triggerNode: AutomationNode = {
      id: `trigger-${Date.now()}`,
      type: "trigger",
      subtype: newAutomation.triggerType,
      data: {},
      position: { x: 250, y: 100 }
    };
    
    // Add source data for specific trigger types
    if (newAutomation.triggerType === 'new_lead') {
      triggerNode.data.source = "Any";
    } else if (newAutomation.triggerType === 'form_submission') {
      triggerNode.data.form = "Any";
    } else if (newAutomation.triggerType === 'tag_added') {
      triggerNode.data.tag = "Any";
    }
    
    const newAutomationObj: Automation = {
      id: newId,
      name: newAutomation.name,
      description: newAutomation.description,
      isActive: false,
      nodes: [triggerNode],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAutomations([...automations, newAutomationObj]);
    setNewAutomation({
      name: "",
      description: "",
      triggerType: "new_lead"
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Automation created",
      description: "Your new automation has been created successfully. Configure it in the editor.",
    });
  };
  
  // Function to render node icon based on type
  const getNodeIcon = (node: AutomationNode) => {
    if (node.type === 'trigger') {
      if (node.subtype === 'new_lead') return <Users className="w-5 h-5 text-blue-400" />;
      if (node.subtype === 'form_submission') return <Activity className="w-5 h-5 text-green-400" />;
      if (node.subtype === 'tag_added') return <Tag className="w-5 h-5 text-yellow-400" />;
    }
    
    if (node.type === 'action') {
      if (node.subtype === 'send_email') return <Mail className="w-5 h-5 text-indigo-400" />;
      if (node.subtype === 'send_sms') return <MessageSquare className="w-5 h-5 text-purple-400" />;
      if (node.subtype === 'create_task') return <Clock className="w-5 h-5 text-orange-400" />;
    }
    
    if (node.type === 'condition') {
      return <Settings className="w-5 h-5 text-gray-400" />;
    }
    
    return <Activity className="w-5 h-5 text-gray-400" />;
  };
  
  // Function to get descriptive text for nodes
  const getNodeDescription = (node: AutomationNode) => {
    if (node.type === 'trigger') {
      if (node.subtype === 'new_lead') return `When a new lead is created${node.data.source !== "Any" ? ` from ${node.data.source}` : ""}`;
      if (node.subtype === 'form_submission') return `When form "${node.data.form}" is submitted`;
      if (node.subtype === 'tag_added') return `When tag "${node.data.tag}" is added to a contact`;
    }
    
    if (node.type === 'action') {
      if (node.subtype === 'send_email') {
        return `Send "${node.data.template}" email${node.data.delay > 0 ? ` after ${node.data.delay} hour(s)` : " immediately"}`;
      }
      if (node.subtype === 'send_sms') return `Send SMS message`;
      if (node.subtype === 'create_task') return `Create task "${node.data.title}" for ${node.data.assignee} due in ${node.data.dueDate} day(s)`;
    }
    
    if (node.type === 'condition') {
      if (node.subtype === 'property_equals') return `If ${node.data.property} = ${node.data.value}`;
      if (node.subtype === 'tag_equals') return `If contact has tag "${node.data.tag}"`;
      if (node.subtype === 'source_equals') return `If lead source is "${node.data.source}"`;
    }
    
    return "Unknown step";
  };
  
  return (
    <>
      <Helmet>
        <title>Marketing Automation Pipeline | Fusion Data Co</title>
        <meta name="description" content="Create, manage, and automate your marketing workflows with our visual pipeline builder. Set up triggers, conditions, and actions to nurture leads automatically." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="font-['Orbitron'] text-3xl font-bold mb-2 text-white">
                  Marketing Automation Pipeline
                </h1>
                <p className="text-gray-400 mb-4 md:mb-0">
                  Create and manage automated marketing workflows
                </p>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
                    <Plus className="mr-2 h-4 w-4" /> New Automation
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121218] border-gray-800">
                  <DialogHeader>
                    <DialogTitle>Create New Automation</DialogTitle>
                    <DialogDescription>
                      Set up a new marketing automation workflow. You can configure actions and conditions in the editor after creation.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newAutomation.name}
                        onChange={(e) => setNewAutomation({...newAutomation, name: e.target.value})}
                        className="col-span-3 bg-[#0c0c14] border-gray-700"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newAutomation.description}
                        onChange={(e) => setNewAutomation({...newAutomation, description: e.target.value})}
                        className="col-span-3 bg-[#0c0c14] border-gray-700"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="trigger" className="text-right">
                        Trigger
                      </Label>
                      <Select 
                        value={newAutomation.triggerType} 
                        onValueChange={(value: TriggerType) => setNewAutomation({...newAutomation, triggerType: value})}
                      >
                        <SelectTrigger className="col-span-3 bg-[#0c0c14] border-gray-700">
                          <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#121218] border-gray-700">
                          <SelectItem value="new_lead">New Lead Created</SelectItem>
                          <SelectItem value="form_submission">Form Submission</SelectItem>
                          <SelectItem value="tag_added">Tag Added to Contact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-gray-700">
                      Cancel
                    </Button>
                    <Button onClick={createAutomation} className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
                      Create Automation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Automation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {automations.map((automation) => (
                <Card key={automation.id} className="bg-[#121218] border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {automation.name}
                          <Badge variant={automation.isActive ? "default" : "outline"} className={automation.isActive ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50" : "text-gray-400 border-gray-500"}>
                            {automation.isActive ? "Active" : "Disabled"}
                          </Badge>
                        </CardTitle>
                        {automation.description && (
                          <CardDescription className="mt-1 text-gray-400">
                            {automation.description}
                          </CardDescription>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#121218] border-gray-800">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => window.location.href = `/automations/edit/${automation.id}`}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => toggleAutomationStatus(automation.id)}
                          >
                            {automation.isActive ? (
                              <>
                                <PauseCircle className="mr-2 h-4 w-4" />
                                <span>Disable</span>
                              </>
                            ) : (
                              <>
                                <PlayCircle className="mr-2 h-4 w-4" />
                                <span>Enable</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-red-500 focus:text-red-500"
                            onClick={() => deleteAutomation(automation.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Automation Workflow Preview */}
                    <div className="mt-2 space-y-3 border-l-2 border-gray-700 pl-4 py-2">
                      {automation.nodes.map((node, index) => (
                        <div key={node.id} className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            node.type === 'trigger' 
                              ? 'bg-blue-500/20 text-blue-300' 
                              : node.type === 'action'
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {getNodeIcon(node)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {getNodeDescription(node)}
                            </p>
                            {index < automation.nodes.length - 1 && (
                              <div className="mt-2 ml-3 h-4 border-l border-dashed border-gray-700"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-1 flex justify-between">
                    <div className="text-xs text-gray-500">
                      Created {new Date(automation.createdAt).toLocaleDateString()}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#14ffc8] hover:text-[#14ffc8]/80 hover:bg-[#14ffc8]/10"
                      onClick={() => window.location.href = `/automations/edit/${automation.id}`}
                    >
                      Edit Workflow <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Automation Builder Info */}
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="bg-[#0c0c14] rounded-lg border border-gray-800 p-6">
                <h2 className="text-2xl font-bold mb-4">How Automations Work</h2>
                <p className="text-gray-400 mb-6">
                  Create powerful marketing automation workflows in three simple steps:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#121218] p-4 rounded-lg border border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">1. Choose a Trigger</h3>
                    <p className="text-sm text-gray-400">
                      Select what starts your automation: a new lead, form submission, or a tag being added.
                    </p>
                  </div>
                  
                  <div className="bg-[#121218] p-4 rounded-lg border border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                      <Settings className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">2. Add Conditions (Optional)</h3>
                    <p className="text-sm text-gray-400">
                      Filter when your automation should run based on contact properties or behaviors.
                    </p>
                  </div>
                  
                  <div className="bg-[#121218] p-4 rounded-lg border border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3">
                      <Mail className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">3. Define Actions</h3>
                    <p className="text-sm text-gray-400">
                      Set up what happens next: send emails, create tasks, update contact information, and more.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button
                    className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                    onClick={() => setIsCreateDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Automation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}