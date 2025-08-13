import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  CalendarDays, 
  ListFilter, 
  PlusCircle, 
  RefreshCw, 
  Edit, 
  Trash2, 
  Copy, 
  BarChart, 
  Calendar,
  ChevronDown,
  Filter,
  Grid,
  LayoutList,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
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
  DialogTrigger
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDistanceToNow } from "date-fns";

// Social media platform icons
const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'Facebook':
      return <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">f</div>;
    case 'LinkedIn':
      return <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs">in</div>;
    default:
      return <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">?</div>;
  }
};

const statusColors: Record<string, string> = {
  "Draft": "bg-gray-500/20 text-gray-400 border-gray-500",
  "Scheduled": "bg-blue-500/20 text-blue-300 border-blue-500",
  "Active": "bg-green-500/20 text-green-300 border-green-500",
  "Paused": "bg-yellow-500/20 text-yellow-300 border-yellow-500",
  "Completed": "bg-purple-500/20 text-purple-300 border-purple-500",
  "Published": "bg-green-500/20 text-green-300 border-green-500",
  "Failed": "bg-red-500/20 text-red-300 border-red-500"
};

// Type definitions for campaign data
interface SocialPost {
  id: number;
  campaignId: number;
  platform: string;
  content: string;
  mediaUrls?: string[];
  tone?: string;
  scheduledDate: string;
  publishedDate?: string;
  status: string;
  metrics: {
    likes?: number;
    shares?: number;
    comments?: number;
    views?: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Campaign {
  id: number;
  title: string;
  goal: string;
  businessType: string;
  status: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  tags?: string[];
  ownerId?: number;
  createdAt: string;
  updatedAt: string;
  posts?: SocialPost[];
}

export default function CrmCampaigns() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'campaign' | 'post'>('post');
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const { data: campaigns = [], isLoading, isError, error } = useQuery({
    queryKey: ['/api/marketing/campaigns'],
    retry: 1,
  });

  // Mutation for rescheduling a post
  const rescheduleMutation = useMutation({
    mutationFn: (data: { postId: number; scheduledDate: string }) => {
      return apiRequest(`/api/marketing/posts/${data.postId}/reschedule`, {
        method: 'PATCH',
        body: JSON.stringify({ scheduledDate: data.scheduledDate }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/marketing/campaigns'] });
      toast({
        title: 'Post rescheduled',
        description: 'The post has been rescheduled successfully.',
      });
      setIsRescheduleOpen(false);
    },
    onError: (err) => {
      console.error('Error rescheduling post:', err);
      toast({
        title: 'Rescheduling failed',
        description: 'There was an error rescheduling the post.',
        variant: 'destructive',
      });
    },
  });

  // Mutation for deleting a post or campaign
  const deleteMutation = useMutation({
    mutationFn: ({ type, id }: { type: 'campaign' | 'post'; id: number }) => {
      return apiRequest(`/api/marketing/${type === 'campaign' ? 'campaigns' : 'posts'}/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/marketing/campaigns'] });
      toast({
        title: `${deleteType === 'campaign' ? 'Campaign' : 'Post'} deleted`,
        description: `The ${deleteType} has been deleted successfully.`,
      });
      setIsDeleteConfirmOpen(false);
    },
    onError: (err) => {
      console.error(`Error deleting ${deleteType}:`, err);
      toast({
        title: 'Deletion failed',
        description: `There was an error deleting the ${deleteType}.`,
        variant: 'destructive',
      });
    },
  });

  // Filter campaigns based on selected filters
  const filteredCampaigns = campaigns.filter((campaign: Campaign) => {
    if (statusFilter !== 'all' && campaign.status !== statusFilter) {
      return false;
    }
    
    if (platformFilter !== 'all') {
      const hasPlatform = campaign.posts?.some(post => post.platform === platformFilter);
      if (!hasPlatform) return false;
    }
    
    return true;
  });

  // Get all posts from campaigns
  const allPosts = campaigns.flatMap((campaign: Campaign) => 
    (campaign.posts || []).map(post => ({
      ...post,
      campaignTitle: campaign.title,
      campaignGoal: campaign.goal,
    }))
  );

  // Filter posts based on selected filters
  const filteredPosts = allPosts.filter(post => {
    if (statusFilter !== 'all' && post.status !== statusFilter) {
      return false;
    }
    
    if (platformFilter !== 'all' && post.platform !== platformFilter) {
      return false;
    }
    
    return true;
  });

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handler for rescheduling a post
  const handleReschedule = (post: SocialPost) => {
    setSelectedPost(post);
    // Set default date to post's scheduled date
    setRescheduleDate(post.scheduledDate.split('T')[0]);
    setIsRescheduleOpen(true);
  };

  // Handler for submitting reschedule
  const submitReschedule = () => {
    if (!selectedPost || !rescheduleDate) return;
    
    rescheduleMutation.mutate({
      postId: selectedPost.id,
      scheduledDate: new Date(rescheduleDate).toISOString(),
    });
  };

  // Handler for deleting a post or campaign
  const handleDelete = (type: 'campaign' | 'post', id: number) => {
    setDeleteType(type);
    setDeleteItemId(id);
    setIsDeleteConfirmOpen(true);
  };

  // Handler for confirming deletion
  const confirmDelete = () => {
    if (!deleteItemId) return;
    
    deleteMutation.mutate({
      type: deleteType,
      id: deleteItemId,
    });
  };

  // Functions to generate mock data for post metrics
  const getRandomMetrics = () => {
    return {
      likes: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 30),
      views: Math.floor(Math.random() * 1000)
    };
  };

  return (
    <>
      <Helmet>
        <title>Campaign Management | Fusion Data Co</title>
        <meta name="description" content="Manage your social media campaigns, track metrics, and schedule content across multiple platforms." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="font-['Orbitron'] text-3xl font-bold mb-2 text-white">
                  Campaign Management
                </h1>
                <p className="text-gray-400 mb-4 md:mb-0">
                  Schedule, track, and analyze your social media campaigns
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link href="/campaigns/new">
                  <Button className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    New Campaign
                  </Button>
                </Link>
                
                <div className="flex border border-gray-700 rounded-md">
                  <Button
                    variant={view === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setView('list')}
                    className={view === 'list' ? 'bg-[#121218] text-white border-r border-gray-700' : 'text-gray-400 border-r border-gray-700'}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === 'calendar' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setView('calendar')}
                    className={view === 'calendar' ? 'bg-[#121218] text-white' : 'text-gray-400'}
                  >
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-[#121218] rounded-lg border border-gray-800">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-400">Filters:</span>
              </div>
              
              <div className="flex-1 min-w-[150px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-[#0c0c14] border-gray-700 h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border-gray-700">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[150px]">
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="bg-[#0c0c14] border-gray-700 h-9">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121218] border-gray-700">
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setStatusFilter('all');
                  setPlatformFilter('all');
                }}
                className="text-gray-400 border-gray-700 ml-auto"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Reset
              </Button>
            </div>
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-10 w-10 text-[#14ffc8] animate-spin mb-4" />
                  <p className="text-gray-400">Loading campaigns...</p>
                </div>
              </div>
            )}
            
            {/* Error State */}
            {isError && (
              <div className="flex justify-center items-center py-20">
                <div className="glass-panel p-8 rounded-xl max-w-md text-center">
                  <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <Trash2 className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Error Loading Campaigns</h3>
                  <p className="text-gray-400 mb-6">{error?.toString() || "Failed to load campaign data"}</p>
                  <Button 
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/marketing/campaigns'] })}
                    className="bg-[#14ffc8] text-black"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
            
            {/* Empty State */}
            {!isLoading && !isError && filteredCampaigns.length === 0 && (
              <div className="flex justify-center items-center py-20 bg-[#121218]/50 backdrop-blur-sm rounded-lg">
                <div className="glass-panel p-8 rounded-xl max-w-md text-center">
                  <div className="w-16 h-16 mx-auto bg-[#14ffc8]/20 rounded-full flex items-center justify-center mb-4">
                    <PlusCircle className="h-8 w-8 text-[#14ffc8]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Campaigns Found</h3>
                  <p className="text-gray-400 mb-6">
                    {statusFilter !== 'all' || platformFilter !== 'all'
                      ? "No campaigns match your current filters. Try adjusting your filter settings."
                      : "Create your first campaign to start scheduling social media content."}
                  </p>
                  <Link href="/campaigns/new">
                    <Button className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black">
                      Create Campaign
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            
            {/* Content Display - List View */}
            {!isLoading && !isError && filteredCampaigns.length > 0 && view === 'list' && (
              <Tabs defaultValue="campaigns">
                <TabsList className="bg-[#121218] mb-6">
                  <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
                    Campaigns
                  </TabsTrigger>
                  <TabsTrigger value="posts" className="data-[state=active]:bg-[#14ffc8] data-[state=active]:text-black">
                    Posts
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="campaigns" className="mt-0">
                  <div className="grid gap-4">
                    {filteredCampaigns.map((campaign: Campaign) => (
                      <Card key={campaign.id} className="bg-[#121218]/90 border-gray-800 overflow-hidden">
                        <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle className="text-lg font-medium">
                              {campaign.title}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className={`${statusColors[campaign.status]}`}>
                                {campaign.status}
                              </Badge>
                              <Badge variant="outline" className="bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]">
                                {campaign.goal}
                              </Badge>
                              <Badge variant="outline" className="bg-[#ff0aff]/10 text-[#ff0aff] border-[#ff0aff]">
                                {campaign.businessType}
                              </Badge>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#121218] border-gray-800">
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => window.location.href = `/campaigns/edit/${campaign.id}`}
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit Campaign</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => window.location.href = `/campaigns/analytics/${campaign.id}`}
                              >
                                <BarChart className="h-4 w-4" />
                                <span>View Analytics</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300"
                                onClick={() => handleDelete('campaign', campaign.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Delete Campaign</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardHeader>
                        
                        <CardContent className="p-4 pt-3">
                          <div className="mt-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-gray-400">Campaign Posts</span>
                              <span className="text-gray-400">{campaign.posts?.length || 0} posts</span>
                            </div>
                            
                            <div className="grid gap-2">
                              {campaign.posts?.map((post, index) => (
                                <div 
                                  key={post.id} 
                                  className="bg-[#0a0a0d] p-3 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-800 group"
                                >
                                  <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <PlatformIcon platform={post.platform} />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{post.platform}</span>
                                        <Badge variant="outline" className={`${statusColors[post.status]} text-xs`}>
                                          {post.status}
                                        </Badge>
                                      </div>
                                      <p className="text-gray-400 text-sm truncate max-w-[220px] sm:max-w-[300px]">
                                        {post.content}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="text-right text-xs text-gray-400 mr-2">
                                      {post.scheduledDate ? formatDate(post.scheduledDate) : 'Not scheduled'}
                                    </div>
                                    
                                    {post.status === 'Published' && (
                                      <div className="flex items-center gap-2 text-xs">
                                        <span className="text-[#14ffc8]">{post.metrics?.likes || 0} likes</span>
                                        <span>•</span>
                                        <span className="text-[#ff0aff]">{post.metrics?.shares || 0} shares</span>
                                      </div>
                                    )}
                                    
                                    <div className="flex items-center space-x-1 ml-auto">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-gray-500 hover:text-white"
                                        onClick={() => handleReschedule(post)}
                                      >
                                        <Calendar className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-gray-500 hover:text-white"
                                        onClick={() => window.location.href = `/campaigns/edit-post/${post.id}`}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-gray-500 hover:text-white"
                                        onClick={() => handleDelete('post', post.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="posts" className="mt-0">
                  <div className="grid gap-3">
                    {filteredPosts.map((post) => (
                      <div 
                        key={post.id} 
                        className="bg-[#121218] p-4 rounded-md border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <PlatformIcon platform={post.platform} />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">{post.platform}</span>
                              <Badge variant="outline" className={`${statusColors[post.status]} text-xs`}>
                                {post.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400">
                              {post.campaignTitle}
                            </div>
                            <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                              {post.content}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 self-end sm:self-auto">
                          <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:gap-2 items-end sm:items-center">
                            <span>{post.scheduledDate ? formatDate(post.scheduledDate) : 'Not scheduled'}</span>
                            {post.status === 'Published' && (
                              <>
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-2 mt-1 sm:mt-0">
                                  <span className="text-[#14ffc8]">{post.metrics?.likes || 0} likes</span>
                                  <span>•</span>
                                  <span className="text-[#ff0aff]">{post.metrics?.shares || 0} shares</span>
                                </div>
                              </>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500 hover:text-white"
                              onClick={() => handleReschedule(post)}
                            >
                              <Calendar className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500 hover:text-white"
                              onClick={() => window.location.href = `/campaigns/edit-post/${post.id}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500 hover:text-white"
                              onClick={() => handleDelete('post', post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            {/* Content Display - Calendar View */}
            {!isLoading && !isError && filteredCampaigns.length > 0 && view === 'calendar' && (
              <div className="bg-[#121218] rounded-lg border border-gray-800 p-4">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium">Campaign Calendar</h3>
                  <p className="text-gray-400 text-sm">
                    Scheduled posts for the next 30 days
                  </p>
                </div>
                
                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-gray-400 text-sm font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {/* Generate calendar days for current month */}
                  {Array.from({ length: 35 }).map((_, index) => {
                    const today = new Date();
                    const currentDay = new Date(today);
                    currentDay.setDate(today.getDate() - today.getDay() + index);
                    
                    // Get posts scheduled for this day
                    const dayPosts = allPosts.filter(post => {
                      if (!post.scheduledDate) return false;
                      const postDate = new Date(post.scheduledDate);
                      return postDate.toDateString() === currentDay.toDateString();
                    });
                    
                    const isToday = currentDay.toDateString() === today.toDateString();
                    
                    return (
                      <div 
                        key={index}
                        className={`min-h-[100px] border p-1 rounded-md relative ${
                          isToday 
                            ? 'border-[#14ffc8] bg-[#14ffc8]/5' 
                            : 'border-gray-800 hover:border-gray-700'
                        } ${
                          currentDay.getMonth() === today.getMonth() 
                            ? 'bg-[#0c0c14]' 
                            : 'bg-[#0c0c14]/50'
                        }`}
                      >
                        <div className={`text-xs ${
                          isToday 
                            ? 'text-[#14ffc8] font-medium' 
                            : 'text-gray-400'
                        } mb-1`}>
                          {currentDay.getDate()}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          {dayPosts.length > 0 ? (
                            dayPosts.slice(0, 3).map((post, i) => (
                              <div 
                                key={i}
                                className="bg-[#0a0a0d] text-xs p-1 rounded flex items-center gap-1 cursor-pointer hover:bg-[#0a0a0d]/80"
                                onClick={() => handleReschedule(post)}
                              >
                                <PlatformIcon platform={post.platform} />
                                <span className="truncate">{post.platform}</span>
                              </div>
                            ))
                          ) : null}
                          
                          {dayPosts.length > 3 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayPosts.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
        
        {/* Reschedule Dialog */}
        <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
          <DialogContent className="bg-[#121218] border-gray-800">
            <DialogHeader>
              <DialogTitle>Reschedule Post</DialogTitle>
              <DialogDescription>
                Select a new date and time for this post.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="date">New Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="bg-[#0a0a0d] border-gray-700"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsRescheduleOpen(false)}
                className="border-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={submitReschedule}
                className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                disabled={rescheduleMutation.isPending}
              >
                {rescheduleMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
          <DialogContent className="bg-[#121218] border-gray-800">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this {deleteType}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="border-gray-700"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}