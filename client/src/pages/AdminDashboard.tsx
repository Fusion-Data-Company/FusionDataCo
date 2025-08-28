import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Users, Mail, MessageSquare, TrendingUp, Calendar, Database, Send, Settings, Play, Pause, Trash2, Eye, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contactSubmissions = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
    enabled: true,
  });

  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ['/api/admin/leads'],
    enabled: true,
  });

  const { data: chatMessages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/admin/chat-messages'],
    enabled: true,
  });

  // Newsletter queries
  const { data: newsletterCampaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/admin/newsletter-campaigns'],
    enabled: true,
  });

  const { data: newsletterSettings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/admin/newsletter-settings'],
    enabled: true,
  });

  const { data: newsletterStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/newsletter-stats'],
    enabled: true,
  });

  // Newsletter mutations
  const triggerNewsletterMutation = useMutation({
    mutationFn: () => apiRequest('/api/admin/trigger-newsletter', { method: 'POST' }),
    onSuccess: (data) => {
      toast({
        title: "Newsletter Sent Successfully!",
        description: `${data.sendResults?.success || 0} emails sent successfully`,
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/newsletter-campaigns'] });
    },
    onError: (error: any) => {
      toast({
        title: "Newsletter Failed",
        description: error.message || "Failed to send newsletter",
        variant: "destructive",
      });
    },
  });

  const pauseCampaignMutation = useMutation({
    mutationFn: ({ id, isPaused }: { id: number; isPaused: boolean }) => 
      apiRequest(`/api/admin/newsletter-campaigns/${id}/pause`, { 
        method: 'POST', 
        body: { isPaused } 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/newsletter-campaigns'] });
      toast({
        title: "Campaign Updated",
        description: "Campaign status updated successfully",
      });
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/admin/newsletter-campaigns/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/newsletter-campaigns'] });
      toast({
        title: "Campaign Deleted",
        description: "Campaign deleted successfully",
      });
    },
  });

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Fusion Data Co</title>
        <meta name="description" content="Administrative dashboard for managing leads, contacts, and system analytics." />
      </Helmet>
      
      <div className="min-h-screen bg-[#0B0F1A]">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage leads, contacts, and system performance</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#121218]/90 border-blue-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Total Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">
                    {contactsLoading ? "..." : Array.isArray(contactSubmissions) ? contactSubmissions.length : 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121218]/90 border-green-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Total Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">
                    {leadsLoading ? "..." : leads?.length || 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121218]/90 border-purple-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">
                    {messagesLoading ? "..." : chatMessages?.length || 0}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121218]/90 border-yellow-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">
                    Connected
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="contacts" className="space-y-6">
              <TabsList className="bg-[#121218]/90 border border-gray-700">
                <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="messages">Chat Messages</TabsTrigger>
                <TabsTrigger value="newsletters">📧 Newsletter Automation</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="contacts">
                <Card className="bg-[#121218]/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Contact Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contactsLoading ? (
                      <div className="text-gray-400">Loading contact submissions...</div>
                    ) : contactSubmissions?.length > 0 ? (
                      <div className="space-y-4">
                        {contactSubmissions.slice(0, 10).map((contact: any) => (
                          <div key={contact.id} className="p-4 bg-[#1a1a24] rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{contact.name}</h3>
                              <span className="text-xs text-gray-400">{contact.formType}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{contact.email}</p>
                            {contact.company && <p className="text-gray-400 text-sm">{contact.company}</p>}
                            {contact.message && <p className="text-gray-400 text-sm mt-2">{contact.message}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400">No contact submissions yet.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leads">
                <Card className="bg-[#121218]/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {leadsLoading ? (
                      <div className="text-gray-400">Loading leads...</div>
                    ) : leads?.length > 0 ? (
                      <div className="space-y-4">
                        {leads.slice(0, 10).map((lead: any) => (
                          <div key={lead.id} className="p-4 bg-[#1a1a24] rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{lead.name}</h3>
                              <span className="text-xs text-gray-400">{lead.status}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{lead.email}</p>
                            {lead.company && <p className="text-gray-400 text-sm">{lead.company}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400">No leads yet.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                <Card className="bg-[#121218]/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Chat Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {messagesLoading ? (
                      <div className="text-gray-400">Loading chat messages...</div>
                    ) : chatMessages?.length > 0 ? (
                      <div className="space-y-4">
                        {chatMessages.slice(0, 10).map((message: any) => (
                          <div key={message.id} className="p-4 bg-[#1a1a24] rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <span className={`font-semibold ${message.sender === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
                                {message.sender === 'user' ? 'User' : 'Bot'}
                              </span>
                              <span className="text-xs text-gray-400">{message.sessionId}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{message.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400">No chat messages yet.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="newsletters">
                <div className="space-y-6">
                  {/* Newsletter Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-[#121218]/90 border-cyan-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Total Campaigns
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-cyan-400">
                          {campaignsLoading ? "..." : newsletterCampaigns.length}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#121218]/90 border-green-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Subscribers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-400">
                          {statsLoading ? "..." : newsletterStats?.totalSubscribers || 0}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#121218]/90 border-blue-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Emails Sent
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-400">
                          {statsLoading ? "..." : newsletterStats?.totalEmailsSent || 0}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#121218]/90 border-purple-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Open Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-400">
                          {statsLoading ? "..." : `${newsletterStats?.averageOpenRate || 0}%`}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Newsletter Controls */}
                  <Card className="bg-[#121218]/90 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <Send className="h-5 w-5 mr-2" />
                          ELITE Newsletter Automation
                        </CardTitle>
                        <Button
                          onClick={() => triggerNewsletterMutation.mutate()}
                          disabled={triggerNewsletterMutation.isPending}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        >
                          {triggerNewsletterMutation.isPending ? (
                            <>🤖 Generating...</>
                          ) : (
                            <>🚀 Send Newsletter Now</>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-white">APEX 2.0 Framework</h3>
                          <ul className="space-y-2 text-sm text-gray-400">
                            <li>✅ YouTube topic discovery</li>
                            <li>✅ Enterprise-level content generation</li>
                            <li>✅ Mailjet email delivery</li>
                            <li>✅ Automated bi-monthly scheduling</li>
                            <li>✅ Advanced metrics tracking</li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-semibold text-white">Schedule Settings</h3>
                          <div className="text-sm text-gray-400">
                            <p><strong>Schedule:</strong> {newsletterSettings?.schedule || "1st & 15th"} of each month</p>
                            <p><strong>Time:</strong> {newsletterSettings?.timeOfDay || "9:00 AM"} {newsletterSettings?.timezone || "Pacific"}</p>
                            <p><strong>Status:</strong> {newsletterSettings?.isGloballyEnabled ? "🟢 Active" : "🔴 Disabled"}</p>
                            <p><strong>Framework:</strong> {newsletterSettings?.apexFrameworkEnabled ? "APEX 2.0" : "Standard"}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campaign History */}
                  <Card className="bg-[#121218]/90 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Campaign History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {campaignsLoading ? (
                        <div className="text-gray-400">Loading campaigns...</div>
                      ) : newsletterCampaigns.length > 0 ? (
                        <div className="space-y-4">
                          {newsletterCampaigns.slice(0, 10).map((campaign: any) => (
                            <div key={campaign.id} className="p-4 bg-[#1a1a24] rounded-lg border border-gray-700">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-white mb-1">{campaign.title}</h3>
                                  <p className="text-sm text-gray-400 mb-2">{campaign.subject}</p>
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>📅 {new Date(campaign.scheduledDate).toLocaleDateString()}</span>
                                    <span>📧 {campaign.recipientCount} recipients</span>
                                    <span>✅ {campaign.successCount} sent</span>
                                    {campaign.failureCount > 0 && <span>❌ {campaign.failureCount} failed</span>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge 
                                    variant={
                                      campaign.status === 'sent' ? 'default' : 
                                      campaign.status === 'sending' ? 'secondary' :
                                      campaign.status === 'failed' ? 'destructive' : 'outline'
                                    }
                                  >
                                    {campaign.status}
                                  </Badge>
                                  {campaign.isPaused && <Badge variant="outline">Paused</Badge>}
                                  <div className="flex gap-1">
                                    {campaign.canEdit && !campaign.isPaused && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => pauseCampaignMutation.mutate({ id: campaign.id, isPaused: true })}
                                        className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                      >
                                        <Pause className="h-4 w-4" />
                                      </Button>
                                    )}
                                    {campaign.isPaused && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => pauseCampaignMutation.mutate({ id: campaign.id, isPaused: false })}
                                        className="h-8 w-8 p-0 text-gray-400 hover:text-green-400"
                                      >
                                        <Play className="h-4 w-4" />
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => deleteCampaignMutation.mutate(campaign.id)}
                                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Mail className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">No newsletter campaigns yet.</p>
                          <p className="text-sm text-gray-500">Click "Send Newsletter Now" to create your first campaign.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <Card className="bg-[#121218]/90 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">System Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-[#1a1a24] rounded-lg border border-gray-700">
                          <h3 className="font-semibold text-white mb-2">Form Submission Sources</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Social Media</span>
                              <span className="text-white">
                                {Array.isArray(contactSubmissions) ? contactSubmissions.filter((c: any) => c.formType === 'social_media').length : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Real Estate</span>
                              <span className="text-white">
                                {Array.isArray(contactSubmissions) ? contactSubmissions.filter((c: any) => c.formType === 'real_estate').length : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Medical</span>
                              <span className="text-white">
                                {Array.isArray(contactSubmissions) ? contactSubmissions.filter((c: any) => c.formType === 'medical').length : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Trades</span>
                              <span className="text-white">
                                {Array.isArray(contactSubmissions) ? contactSubmissions.filter((c: any) => c.formType === 'trades').length : 0}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-[#1a1a24] rounded-lg border border-gray-700">
                          <h3 className="font-semibold text-white mb-2">Database Health</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Connection Status</span>
                              <span className="text-green-400">Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tables</span>
                              <span className="text-white">All Operational</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Last Backup</span>
                              <span className="text-white">Automated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}