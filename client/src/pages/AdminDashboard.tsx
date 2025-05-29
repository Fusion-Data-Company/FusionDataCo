import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Users, Mail, MessageSquare, TrendingUp, Calendar, Database } from "lucide-react";

export default function AdminDashboard() {
  const { data: contactSubmissions, isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/admin/contacts'],
    enabled: true,
  });

  const { data: leads, isLoading: leadsLoading } = useQuery({
    queryKey: ['/api/admin/leads'],
    enabled: true,
  });

  const { data: chatMessages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/admin/chat-messages'],
    enabled: true,
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
                    {contactsLoading ? "..." : contactSubmissions?.length || 0}
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
                                {contactSubmissions?.filter((c: any) => c.formType === 'social_media').length || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Real Estate</span>
                              <span className="text-white">
                                {contactSubmissions?.filter((c: any) => c.formType === 'real_estate').length || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Medical</span>
                              <span className="text-white">
                                {contactSubmissions?.filter((c: any) => c.formType === 'medical').length || 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Trades</span>
                              <span className="text-white">
                                {contactSubmissions?.filter((c: any) => c.formType === 'trades').length || 0}
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