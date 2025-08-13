import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  Users,
  PlusCircle,
  Star,
  Tag,
  Clock,
  CalendarDays,
  Rocket,
  Filter,
  MoreHorizontal,
  Facebook,
  CheckCircle,
  Zap,
  Building,
  MessageSquare,
  CreditCard,
  Globe,
  X,
  Phone,
  Mail,
  Activity,
  Pencil,
  User,
  ExternalLink,
  Settings,
  Calendar
} from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import StripeIntegration from '@/components/StripeIntegration';

// Mock data types
interface CrmLead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  business?: string;
  businessType?: string;
  message?: string;
  source: string;
  createdAt: string;
  tags: string[];
  status: 'new' | 'contacted' | 'qualified' | 'unqualified';
}

interface CrmTrialSignup {
  id: number;
  name: string;
  email: string;
  business?: string;
  businessType?: string;
  trialType: 'social' | 'crm' | 'website';
  facebookUrl?: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'converted';
  tags: string[];
}

interface CrmSite {
  id: number;
  clientName: string;
  businessName: string;
  domain: string;
  plan: string;
  status: 'development' | 'active' | 'paused' | 'maintenance';
  lastUpdated: string;
  tags: string[];
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [selectedTrialSignup, setSelectedTrialSignup] = useState<CrmTrialSignup | null>(null);
  const [selectedSite, setSelectedSite] = useState<CrmSite | null>(null);
  const [chatPrompt, setChatPrompt] = useState(`Our AI assistant should help users with:
1. Learning about our services and pricing
2. Answering FAQs about our social media management
3. Explaining the benefits of our CRM system
4. Providing basic technical support
5. Scheduling demos or consultations`);
  
  // Mock data for demonstration
  const leads: CrmLead[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "555-123-4567",
      business: "Bloom Boutique",
      businessType: "retail",
      message: "I need help with my website and social media presence.",
      source: "SmallBusinessFunnel",
      createdAt: "2023-05-20T10:30:00Z",
      tags: ["website-interest", "retail"],
      status: "new"
    },
    {
      id: 2,
      name: "Michael Smith",
      email: "mike@smithplumbing.com",
      phone: "555-987-6543",
      business: "Smith Plumbing",
      businessType: "trades",
      message: "Looking for better ways to generate leads for my plumbing business.",
      source: "TradesFunnel",
      createdAt: "2023-05-19T14:45:00Z",
      tags: ["lead-generation", "trades"],
      status: "contacted"
    },
    {
      id: 3,
      name: "Dr. Emily Wong",
      email: "dr.wong@familycare.com",
      phone: "555-222-3333",
      business: "Family Care Medical",
      businessType: "medical",
      message: "Need a better system for patient follow-ups and online presence.",
      source: "MedicalFunnel",
      createdAt: "2023-05-18T09:15:00Z",
      tags: ["crm-interest", "medical"],
      status: "qualified"
    },
    {
      id: 4,
      name: "Robert Davis",
      email: "rob@davisrealestate.com",
      phone: "555-444-5555",
      business: "Davis Real Estate",
      businessType: "real-estate",
      message: "Looking to automate my property listings and client follow-ups.",
      source: "RealEstateFunnel",
      createdAt: "2023-05-17T16:20:00Z",
      tags: ["automation-interest", "real-estate"],
      status: "new"
    },
    {
      id: 5,
      name: "Julia Martinez",
      email: "julia@cafebistro.com",
      phone: "555-666-7777",
      business: "Café Bistro",
      businessType: "restaurant",
      message: "Need help with social media marketing for my restaurant.",
      source: "SocialMediaTrial",
      createdAt: "2023-05-16T11:10:00Z",
      tags: ["social-media-interest", "restaurant"],
      status: "new"
    }
  ];
  
  const trialSignups: CrmTrialSignup[] = [
    {
      id: 1,
      name: "Julia Martinez",
      email: "julia@cafebistro.com",
      business: "Café Bistro",
      businessType: "restaurant",
      trialType: "social",
      facebookUrl: "https://facebook.com/cafebistro",
      startDate: "2023-05-21T00:00:00Z",
      endDate: "2023-06-04T23:59:59Z",
      status: "active",
      tags: ["restaurant", "social-media"]
    },
    {
      id: 2,
      name: "Tom Wilson",
      email: "tom@wilsonelectrical.com",
      business: "Wilson Electrical",
      businessType: "trades",
      trialType: "crm",
      startDate: "2023-05-19T00:00:00Z",
      endDate: "2023-06-02T23:59:59Z",
      status: "active",
      tags: ["trades", "crm-system"]
    },
    {
      id: 3,
      name: "Amanda Lee",
      email: "amanda@amandasalon.com",
      business: "Amanda's Hair Salon",
      businessType: "service",
      trialType: "social",
      facebookUrl: "https://facebook.com/amandasalon",
      startDate: "2023-05-15T00:00:00Z",
      endDate: "2023-05-29T23:59:59Z",
      status: "completed",
      tags: ["service", "social-media"]
    },
    {
      id: 4,
      name: "David Johnson",
      email: "david@lakesiderealty.com",
      business: "Lakeside Realty",
      businessType: "real-estate",
      trialType: "website",
      startDate: "2023-05-18T00:00:00Z",
      endDate: "2023-06-01T23:59:59Z",
      status: "active",
      tags: ["real-estate", "website"]
    },
    {
      id: 5,
      name: "Patricia Miller",
      email: "patricia@millerlaw.com",
      business: "Miller Law Firm",
      businessType: "professional",
      trialType: "crm",
      startDate: "2023-05-10T00:00:00Z",
      endDate: "2023-05-24T23:59:59Z",
      status: "converted",
      tags: ["professional", "crm-system"]
    }
  ];
  
  const activeSites: CrmSite[] = [
    {
      id: 1,
      clientName: "Robert Chen",
      businessName: "Chen's Electronics",
      domain: "chenselectronics.com",
      plan: "Professional",
      status: "active",
      lastUpdated: "2023-05-19T14:30:00Z",
      tags: ["retail", "e-commerce"]
    },
    {
      id: 2,
      clientName: "Patricia Miller",
      businessName: "Miller Law Firm",
      domain: "millerlaw.com",
      plan: "Enterprise",
      status: "active",
      lastUpdated: "2023-05-18T09:45:00Z",
      tags: ["professional", "legal"]
    },
    {
      id: 3,
      clientName: "Dr. Emily Wong",
      businessName: "Family Care Medical",
      domain: "familycaremedical.com",
      plan: "Professional",
      status: "development",
      lastUpdated: "2023-05-20T11:15:00Z",
      tags: ["medical", "healthcare"]
    },
    {
      id: 4,
      clientName: "Michael Smith",
      businessName: "Smith Plumbing",
      domain: "smithplumbing.com",
      plan: "Standard",
      status: "maintenance",
      lastUpdated: "2023-05-17T16:20:00Z",
      tags: ["trades", "service"]
    },
    {
      id: 5,
      clientName: "Amanda Lee",
      businessName: "Amanda's Hair Salon",
      domain: "amandassalon.com",
      plan: "Standard",
      status: "active",
      lastUpdated: "2023-05-16T13:10:00Z",
      tags: ["service", "beauty"]
    }
  ];
  
  // Filter leads based on search query and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.business && lead.business.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesTag = tagFilter === 'all' || lead.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesTag;
  });
  
  // Filter trial signups based on search query and filters
  const filteredTrialSignups = trialSignups.filter(signup => {
    const matchesSearch = searchQuery === '' || 
      signup.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      signup.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (signup.business && signup.business.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || signup.status === statusFilter;
    
    const matchesTag = tagFilter === 'all' || signup.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesTag;
  });
  
  // Filter active sites based on search query and filters
  const filteredSites = activeSites.filter(site => {
    const matchesSearch = searchQuery === '' || 
      site.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      site.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.domain.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || site.status === statusFilter;
    
    const matchesTag = tagFilter === 'all' || site.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesTag;
  });
  
  // Count stats
  const newLeadsCount = leads.filter(lead => lead.status === 'new').length;
  const activeTrialsCount = trialSignups.filter(signup => signup.status === 'active').length;
  const activeSitesCount = activeSites.filter(site => site.status === 'active').length;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new':
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'contacted':
      case 'pending':
      case 'development':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'qualified':
      case 'completed':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'unqualified':
      case 'paused':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'converted':
        return 'bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]/20';
      case 'maintenance':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  // Handle saving the chat prompt
  const saveChatPrompt = () => {
    // Here you would normally save to the backend
    alert('Chat system prompt updated successfully');
    trackEvent({
      category: 'crm_activity',
      action: 'update',
      label: 'chat_prompt_updated'
    });
  };
  
  // Tag colors map
  const tagColorMap: Record<string, string> = {
    'website-interest': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'crm-interest': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'social-media-interest': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    'automation-interest': 'bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]/20',
    'lead-generation': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'retail': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    'trades': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'medical': 'bg-red-500/10 text-red-500 border-red-500/20',
    'real-estate': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'restaurant': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'service': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    'professional': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    'e-commerce': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    'legal': 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    'healthcare': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    'beauty': 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20',
    'social-media': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    'crm-system': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'website': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };
  
  // Render tag with appropriate color
  const renderTag = (tag: string) => {
    const colorClass = tagColorMap[tag] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    return (
      <Badge key={tag} className={`${colorClass} mr-1 mb-1`} variant="outline">
        {tag}
      </Badge>
    );
  };
  
  return (
    <>
      <Helmet>
        <title>CRM Dashboard | Fusion Data Co</title>
        <meta name="description" content="Manage your leads, trial signups, and active sites in one centralized dashboard." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">CRM Dashboard</h1>
              <div>
                <Link href="/crm/campaigns">
                  <Button variant="outline" className="mr-2">
                    Campaigns
                  </Button>
                </Link>
                <Link href="/crm/email-center">
                  <Button variant="outline" className="mr-2">
                    Email Center
                  </Button>
                </Link>
                <Button className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Contact
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#121218]/90 border border-[#333340]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">New Leads</p>
                      <h3 className="text-3xl font-bold">{newLeadsCount}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#14ffc8]/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-[#14ffc8]" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Link href="#" onClick={() => setActiveTab('leads')}>
                      <span className="text-sm text-[#14ffc8] underline cursor-pointer">View all leads</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#121218]/90 border border-[#333340]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Active Trials</p>
                      <h3 className="text-3xl font-bold">{activeTrialsCount}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#ff0aff]/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-[#ff0aff]" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Link href="#" onClick={() => setActiveTab('trials')}>
                      <span className="text-sm text-[#ff0aff] underline cursor-pointer">View all trials</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#121218]/90 border border-[#333340]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Active Sites</p>
                      <h3 className="text-3xl font-bold">{activeSitesCount}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[#8f00ff]/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-[#8f00ff]" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Link href="#" onClick={() => setActiveTab('sites')}>
                      <span className="text-sm text-[#8f00ff] underline cursor-pointer">View all sites</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-[#121218]/90">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                  <TabsTrigger value="trials">Trial Signups</TabsTrigger>
                  <TabsTrigger value="sites">Active Sites</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center">
                  <Input
                    placeholder="Search..."
                    className="w-64 mr-2 bg-[#121218]/90 border-[#333340] text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="outline" className="mr-2">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Leads */}
                  <Card className="bg-[#121218]/90 border border-[#333340]">
                    <CardHeader>
                      <CardTitle>Recent Leads</CardTitle>
                      <CardDescription>Latest leads from all sources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        {leads.slice(0, 5).map((lead) => (
                          <div key={lead.id} className="mb-3 pb-3 border-b border-[#333340] last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-white">{lead.name}</h4>
                                <p className="text-sm text-gray-400">{lead.email}</p>
                                <div className="flex flex-wrap mt-1">
                                  <Badge className={`${getStatusBadgeColor(lead.status)} mr-2`} variant="outline">
                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                  </Badge>
                                  {lead.tags.slice(0, 2).map(tag => renderTag(tag))}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-400">{formatDate(lead.createdAt)}</p>
                                <p className="text-xs text-gray-400 mt-1">{lead.source}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  
                  {/* Recent Trial Signups */}
                  <Card className="bg-[#121218]/90 border border-[#333340]">
                    <CardHeader>
                      <CardTitle>Recent Trial Signups</CardTitle>
                      <CardDescription>Latest free trial registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        {trialSignups.slice(0, 5).map((signup) => (
                          <div key={signup.id} className="mb-3 pb-3 border-b border-[#333340] last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-white">{signup.name}</h4>
                                <p className="text-sm text-gray-400">{signup.business || signup.email}</p>
                                <div className="flex flex-wrap mt-1">
                                  <Badge className={`${getStatusBadgeColor(signup.status)} mr-2`} variant="outline">
                                    {signup.status.charAt(0).toUpperCase() + signup.status.slice(1)}
                                  </Badge>
                                  <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 mr-2" variant="outline">
                                    {signup.trialType === 'social' ? 'Social Media' : 
                                     signup.trialType === 'crm' ? 'CRM System' : 'Website'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-gray-400">{formatDate(signup.startDate)}</p>
                                <p className="text-xs text-gray-400 mt-1">to {formatDate(signup.endDate)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Active Sites Overview */}
                <Card className="bg-[#121218]/90 border border-[#333340]">
                  <CardHeader>
                    <CardTitle>Active Sites</CardTitle>
                    <CardDescription>Websites currently being managed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeSites.filter(site => site.status === 'active').slice(0, 3).map((site) => (
                        <Card key={site.id} className="bg-[#0a0a0d] border border-[#333340]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-white">{site.businessName}</h4>
                              <Badge className={getStatusBadgeColor(site.status)} variant="outline">
                                {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-[#14ffc8] mb-2">{site.domain}</p>
                            <p className="text-xs text-gray-400 mb-3">{site.plan} Plan</p>
                            <div className="flex justify-between items-center text-xs text-gray-400">
                              <span>Updated: {formatDate(site.lastUpdated)}</span>
                              <Button variant="ghost" size="sm" className="h-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Leads Tab */}
              <TabsContent value="leads">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-[#121218]/90 border border-[#333340]">
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>All Leads</CardTitle>
                          <div className="flex space-x-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="w-[150px] bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectValue placeholder="Filter by status" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="unqualified">Unqualified</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select value={tagFilter} onValueChange={setTagFilter}>
                              <SelectTrigger className="w-[150px] bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectValue placeholder="Filter by tag" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectItem value="all">All Tags</SelectItem>
                                <SelectItem value="website-interest">Website Interest</SelectItem>
                                <SelectItem value="crm-interest">CRM Interest</SelectItem>
                                <SelectItem value="social-media-interest">Social Media Interest</SelectItem>
                                <SelectItem value="automation-interest">Automation Interest</SelectItem>
                                <SelectItem value="lead-generation">Lead Generation</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="trades">Trades</SelectItem>
                                <SelectItem value="medical">Medical</SelectItem>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="restaurant">Restaurant</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-[#333340] hover:bg-[#0a0a0d]">
                              <TableHead className="text-white">Name</TableHead>
                              <TableHead className="text-white">Source</TableHead>
                              <TableHead className="text-white">Status</TableHead>
                              <TableHead className="text-white">Date</TableHead>
                              <TableHead className="text-white text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredLeads.map((lead) => (
                              <TableRow key={lead.id} className="border-[#333340] hover:bg-[#0a0a0d]/50 cursor-pointer" onClick={() => setSelectedLead(lead)}>
                                <TableCell className="font-medium">
                                  <div>
                                    {lead.name}
                                    <div className="text-sm text-gray-400">{lead.email}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{lead.source}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusBadgeColor(lead.status)} variant="outline">
                                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>{formatDate(lead.createdAt)}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {filteredLeads.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                                  No leads found matching your filters
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    {selectedLead ? (
                      <Card className="bg-[#121218]/90 border border-[#333340] sticky top-4">
                        <CardHeader className="flex flex-row items-start justify-between">
                          <div>
                            <CardTitle>{selectedLead.name}</CardTitle>
                            <CardDescription className="mt-1">{selectedLead.email}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedLead(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Contact Information</h4>
                            <div className="space-y-2">
                              {selectedLead.phone && (
                                <div className="flex items-center text-sm">
                                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                  <span>{selectedLead.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center text-sm">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{selectedLead.email}</span>
                              </div>
                              {selectedLead.business && (
                                <div className="flex items-center text-sm">
                                  <Building className="h-4 w-4 mr-2 text-gray-400" />
                                  <span>{selectedLead.business}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Lead Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Created: {formatDate(selectedLead.createdAt)}</span>
                              </div>
                              <div className="flex items-center">
                                <Tag className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Source: {selectedLead.source}</span>
                              </div>
                              <div className="flex items-center">
                                <Activity className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Status: 
                                  <Badge className={`${getStatusBadgeColor(selectedLead.status)} ml-2`} variant="outline">
                                    {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                                  </Badge>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedLead.tags.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Tags</h4>
                              <div className="flex flex-wrap mt-1">
                                {selectedLead.tags.map(tag => renderTag(tag))}
                              </div>
                            </div>
                          )}
                          
                          {selectedLead.message && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Message</h4>
                              <p className="text-sm border border-[#333340] rounded-md p-3 bg-[#0a0a0d]">
                                {selectedLead.message}
                              </p>
                            </div>
                          )}
                          
                          <div className="pt-4 space-y-2">
                            <Button className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Send Message
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Tag className="h-4 w-4 mr-2" />
                              Add Tags
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-[#121218]/90 border border-[#333340]">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-[#0a0a0d] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Select a Lead</h3>
                          <p className="text-gray-400 mb-6">
                            Click on any lead to view details and take action
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Trial Signups Tab */}
              <TabsContent value="trials">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-[#121218]/90 border border-[#333340]">
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>Trial Signups</CardTitle>
                          <div className="flex space-x-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="w-[150px] bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectValue placeholder="Filter by status" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select value={tagFilter} onValueChange={setTagFilter}>
                              <SelectTrigger className="w-[150px] bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectValue placeholder="Filter by type" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="social-media">Social Media</SelectItem>
                                <SelectItem value="crm-system">CRM System</SelectItem>
                                <SelectItem value="website">Website</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-[#333340] hover:bg-[#0a0a0d]">
                              <TableHead className="text-white">Business</TableHead>
                              <TableHead className="text-white">Trial Type</TableHead>
                              <TableHead className="text-white">Status</TableHead>
                              <TableHead className="text-white">End Date</TableHead>
                              <TableHead className="text-white text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTrialSignups.map((signup) => (
                              <TableRow key={signup.id} className="border-[#333340] hover:bg-[#0a0a0d]/50 cursor-pointer" onClick={() => setSelectedTrialSignup(signup)}>
                                <TableCell className="font-medium">
                                  <div>
                                    {signup.business || "N/A"}
                                    <div className="text-sm text-gray-400">{signup.name}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    {signup.trialType === 'social' ? (
                                      <>
                                        <div className="flex mr-2">
                                          <Facebook className="h-4 w-4 text-blue-400 mr-1" />
                                        </div>
                                        Social Media
                                      </>
                                    ) : signup.trialType === 'crm' ? (
                                      <>
                                        <Users className="h-4 w-4 text-purple-400 mr-2" />
                                        CRM System
                                      </>
                                    ) : (
                                      <>
                                        <Globe className="h-4 w-4 text-blue-500 mr-2" />
                                        Website
                                      </>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusBadgeColor(signup.status)} variant="outline">
                                    {signup.status.charAt(0).toUpperCase() + signup.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>{formatDate(signup.endDate)}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {filteredTrialSignups.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                                  No trial signups found matching your filters
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    {selectedTrialSignup ? (
                      <Card className="bg-[#121218]/90 border border-[#333340] sticky top-4">
                        <CardHeader className="flex flex-row items-start justify-between">
                          <div>
                            <CardTitle>{selectedTrialSignup.business || selectedTrialSignup.name}</CardTitle>
                            <CardDescription className="mt-1">{selectedTrialSignup.email}</CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedTrialSignup(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Trial Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Type: {selectedTrialSignup.trialType === 'social' ? 'Social Media' : 
                                             selectedTrialSignup.trialType === 'crm' ? 'CRM System' : 'Website'}</span>
                              </div>
                              <div className="flex items-center">
                                <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Started: {formatDate(selectedTrialSignup.startDate)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Ends: {formatDate(selectedTrialSignup.endDate)}</span>
                              </div>
                              <div className="flex items-center">
                                <Activity className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Status: 
                                  <Badge className={`${getStatusBadgeColor(selectedTrialSignup.status)} ml-2`} variant="outline">
                                    {selectedTrialSignup.status.charAt(0).toUpperCase() + selectedTrialSignup.status.slice(1)}
                                  </Badge>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedTrialSignup.trialType === 'social' && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Social Accounts</h4>
                              <div className="space-y-2 mt-2">
                                {selectedTrialSignup.facebookUrl && (
                                  <div className="flex items-center text-sm">
                                    <Facebook className="h-4 w-4 mr-2 text-blue-400" />
                                    <a href={selectedTrialSignup.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                      {selectedTrialSignup.facebookUrl}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Business Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Name: {selectedTrialSignup.business || "N/A"}</span>
                              </div>
                              <div className="flex items-center">
                                <Tag className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Type: {selectedTrialSignup.businessType || "N/A"}</span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedTrialSignup.tags.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Tags</h4>
                              <div className="flex flex-wrap mt-1">
                                {selectedTrialSignup.tags.map(tag => renderTag(tag))}
                              </div>
                            </div>
                          )}
                          
                          <div className="pt-4 space-y-2">
                            {selectedTrialSignup.status === 'completed' && (
                              <Button className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium">
                                <Zap className="h-4 w-4 mr-2" />
                                Convert to Paid Plan
                              </Button>
                            )}
                            {selectedTrialSignup.status === 'active' && (
                              <Button className="w-full bg-[#ff0aff] hover:bg-[#ff0aff]/90 text-white font-medium">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send Content Update
                              </Button>
                            )}
                            <Button variant="outline" className="w-full">
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-[#121218]/90 border border-[#333340]">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-[#0a0a0d] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Select a Trial</h3>
                          <p className="text-gray-400 mb-6">
                            Click on any trial signup to view details and manage
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Active Sites Tab */}
              <TabsContent value="sites">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-[#121218]/90 border border-[#333340]">
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle>Active Sites</CardTitle>
                          <div className="flex space-x-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="w-[150px] bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectValue placeholder="Filter by status" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0a0a0d] border-[#333340] text-white">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="paused">Paused</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-[#333340] hover:bg-[#0a0a0d]">
                              <TableHead className="text-white">Business</TableHead>
                              <TableHead className="text-white">Domain</TableHead>
                              <TableHead className="text-white">Plan</TableHead>
                              <TableHead className="text-white">Status</TableHead>
                              <TableHead className="text-white text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredSites.map((site) => (
                              <TableRow key={site.id} className="border-[#333340] hover:bg-[#0a0a0d]/50 cursor-pointer" onClick={() => setSelectedSite(site)}>
                                <TableCell className="font-medium">
                                  <div>
                                    {site.businessName}
                                    <div className="text-sm text-gray-400">{site.clientName}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <a href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="text-[#14ffc8] hover:underline">
                                    {site.domain}
                                  </a>
                                </TableCell>
                                <TableCell>{site.plan}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusBadgeColor(site.status)} variant="outline">
                                    {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            {filteredSites.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                                  No sites found matching your filters
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    {selectedSite ? (
                      <Card className="bg-[#121218]/90 border border-[#333340] sticky top-4">
                        <CardHeader className="flex flex-row items-start justify-between">
                          <div>
                            <CardTitle>{selectedSite.businessName}</CardTitle>
                            <CardDescription className="mt-1">
                              <a href={`https://${selectedSite.domain}`} target="_blank" rel="noopener noreferrer" className="text-[#14ffc8] hover:underline">
                                {selectedSite.domain}
                              </a>
                            </CardDescription>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedSite(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Site Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Domain: {selectedSite.domain}</span>
                              </div>
                              <div className="flex items-center">
                                <Badge className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Plan: {selectedSite.plan}</span>
                              </div>
                              <div className="flex items-center">
                                <Activity className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Status: 
                                  <Badge className={`${getStatusBadgeColor(selectedSite.status)} ml-2`} variant="outline">
                                    {selectedSite.status.charAt(0).toUpperCase() + selectedSite.status.slice(1)}
                                  </Badge>
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Last Updated: {formatDate(selectedSite.lastUpdated)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Client Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                <span>Name: {selectedSite.clientName}</span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedSite.tags.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400 mb-1">Tags</h4>
                              <div className="flex flex-wrap mt-1">
                                {selectedSite.tags.map(tag => renderTag(tag))}
                              </div>
                            </div>
                          )}
                          
                          <div className="pt-4 space-y-2">
                            <Button className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black font-medium">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Website
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Site
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-[#121218]/90 border border-[#333340]">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-[#0a0a0d] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Globe className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Select a Site</h3>
                          <p className="text-gray-400 mb-6">
                            Click on any site to view details and manage
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card className="bg-[#121218]/90 border border-[#333340]">
                    <CardHeader>
                      <CardTitle>Chat System Settings</CardTitle>
                      <CardDescription>Customize the AI assistant for your customers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="system-prompt" className="text-white mb-2 block">System Prompt</Label>
                        <Textarea 
                          id="system-prompt"
                          placeholder="Enter system instructions for the chat assistant..." 
                          className="min-h-[200px] bg-[#0a0a0d] border-[#333340] text-white"
                          value={chatPrompt}
                          onChange={(e) => setChatPrompt(e.target.value)}
                        />
                        <p className="text-sm text-gray-400 mt-2">
                          This prompt guides how the AI assistant responds to customer inquiries.
                        </p>
                      </div>
                      <Button onClick={saveChatPrompt} className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Stripe Integration Component */}
                  <StripeIntegration 
                    currentPlan="professional"
                    onPlanChange={(planId) => {
                      console.log('Plan changed to:', planId);
                      // Handle plan change logic here
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}