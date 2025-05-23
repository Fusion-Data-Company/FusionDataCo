import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { 
  Settings, 
  MessageSquare, 
  AlertTriangle, 
  Bell,
  Info,
  Check,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from "@/components/ui/alert";
import TelegramIntegration from "@/components/TelegramIntegration";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

// Mock configuration for the Telegram integration
const INITIAL_CONFIG = {
  enabled: true,
  botToken: "6000000000:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  channelId: "@FusionDataCoChannel",
  notifyOnNewLeads: true,
  notifyOnDeals: true,
  leadNotificationTemplate: "🎯 New Lead: {{name}} from {{source}}",
  dealNotificationTemplate: "💰 New Deal: {{title}} worth {{value}} with {{contact}}"
};

export default function TelegramIntegrationPage() {
  const { toast } = useToast();
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Query to fetch CRM contacts (with Telegram usernames)
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['/api/crm/contacts'],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(queryKey[0]);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    }
  });
  
  // Filter contacts that have Telegram usernames
  const contactsWithTelegram = contacts.filter((contact: any) => contact.tags?.includes('Telegram') || contact.telegramUsername);
  
  // Function to save configuration
  const saveConfig = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Settings saved",
        description: "Your Telegram integration settings have been updated.",
      });
    }, 1000);
  };
  
  // Function to test the connection
  const testConnection = async () => {
    toast({
      title: "Testing connection...",
      description: "Sending a test message to your Telegram channel.",
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: "The test message was sent to your Telegram channel.",
      });
    }, 1500);
  };
  
  return (
    <>
      <Helmet>
        <title>Telegram Integration | Fusion Data Co</title>
        <meta name="description" content="Integrate your CRM with Telegram to send updates to channels and direct message leads." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-white">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="font-['Orbitron'] text-3xl font-bold mb-2 text-white">
                  Telegram Integration
                </h1>
                <p className="text-gray-400 mb-4 md:mb-0">
                  Connect your CRM with Telegram to send updates and message leads
                </p>
              </div>
              
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button 
                    variant="outline"
                    className="border-gray-700"
                    onClick={() => setIsEditing(true)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="border-gray-700"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                )}
                
                <Button 
                  onClick={testConnection}
                  className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                  disabled={!config.enabled}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Test Connection
                </Button>
              </div>
            </div>
            
            {config.enabled ? (
              <div className="mb-8">
                <Alert className="bg-[#14ffc8]/10 border-[#14ffc8]/30 text-[#14ffc8]">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Telegram Integration Active</AlertTitle>
                  <AlertDescription>
                    Your CRM is connected to Telegram. You can send updates to your channel and message leads directly.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="mb-8">
                <Alert variant="destructive" className="bg-red-900/20 border-red-900/30">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Integration Disabled</AlertTitle>
                  <AlertDescription>
                    Telegram integration is currently disabled. Enable it in the settings to start sending updates.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            
            {isEditing ? (
              <Card className="bg-[#121218] border-gray-800 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-[#14ffc8]" />
                    Integration Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your Telegram bot and notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable" className="text-base font-medium">Enable Telegram Integration</Label>
                      <p className="text-sm text-gray-400">Allow the CRM to send updates and messages via Telegram</p>
                    </div>
                    <Switch 
                      id="enable" 
                      checked={config.enabled} 
                      onCheckedChange={(checked) => setConfig({...config, enabled: checked})}
                    />
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Bot Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="botToken">Bot Token</Label>
                        <Input 
                          id="botToken"
                          type="password"
                          value={config.botToken}
                          onChange={(e) => setConfig({...config, botToken: e.target.value})}
                          className="bg-[#0a0a0d] border-gray-700"
                          disabled={!config.enabled}
                        />
                        <p className="text-xs text-gray-500">Obtain from @BotFather on Telegram</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="channelId">Channel ID or Username</Label>
                        <Input 
                          id="channelId"
                          value={config.channelId}
                          onChange={(e) => setConfig({...config, channelId: e.target.value})}
                          className="bg-[#0a0a0d] border-gray-700"
                          disabled={!config.enabled}
                        />
                        <p className="text-xs text-gray-500">Format: @YourChannelName</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="notifyLeads" className="text-base">New Lead Notifications</Label>
                        <p className="text-sm text-gray-400">Send notification when a new lead is created</p>
                      </div>
                      <Switch 
                        id="notifyLeads" 
                        checked={config.notifyOnNewLeads} 
                        onCheckedChange={(checked) => setConfig({...config, notifyOnNewLeads: checked})}
                        disabled={!config.enabled}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="notifyDeals" className="text-base">New Deal Notifications</Label>
                        <p className="text-sm text-gray-400">Send notification when a new deal is created</p>
                      </div>
                      <Switch 
                        id="notifyDeals" 
                        checked={config.notifyOnDeals} 
                        onCheckedChange={(checked) => setConfig({...config, notifyOnDeals: checked})}
                        disabled={!config.enabled}
                      />
                    </div>
                    
                    {config.notifyOnNewLeads && (
                      <div className="space-y-2">
                        <Label htmlFor="leadTemplate">Lead Notification Template</Label>
                        <Input 
                          id="leadTemplate"
                          value={config.leadNotificationTemplate}
                          onChange={(e) => setConfig({...config, leadNotificationTemplate: e.target.value})}
                          className="bg-[#0a0a0d] border-gray-700"
                          disabled={!config.enabled}
                        />
                        <p className="text-xs text-gray-500">Use {{name}}, {{email}}, {{source}}, etc. as variables</p>
                      </div>
                    )}
                    
                    {config.notifyOnDeals && (
                      <div className="space-y-2">
                        <Label htmlFor="dealTemplate">Deal Notification Template</Label>
                        <Input 
                          id="dealTemplate"
                          value={config.dealNotificationTemplate}
                          onChange={(e) => setConfig({...config, dealNotificationTemplate: e.target.value})}
                          className="bg-[#0a0a0d] border-gray-700"
                          disabled={!config.enabled}
                        />
                        <p className="text-xs text-gray-500">Use {{title}}, {{value}}, {{contact}}, etc. as variables</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 border-t border-gray-800 pt-5">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={saveConfig}
                    className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </CardFooter>
              </Card>
            ) : null}
            
            {/* Telegram Integration Component */}
            {config.enabled ? (
              <TelegramIntegration 
                contacts={contactsWithTelegram}
                channelName={config.channelId.replace('@', '')}
              />
            ) : (
              <div className="text-center py-16 bg-[#121218] rounded-lg border border-gray-800">
                <MessageSquare className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Telegram Integration Disabled</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Enable the Telegram integration in settings to send updates to your channel and message leads directly.
                </p>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Integration
                </Button>
              </div>
            )}
            
            {/* Help section */}
            <div className="mt-12">
              <Card className="bg-[#0c0c14] border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-[#14ffc8]" />
                    Using Telegram with CRM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        Channel Updates
                      </h3>
                      <p className="text-sm text-gray-400">
                        Send campaign metrics, new lead notifications, and company updates to your team's Telegram channel.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        Direct Messaging
                      </h3>
                      <p className="text-sm text-gray-400">
                        Message leads and customers directly via Telegram. Perfect for quick follow-ups and personalized support.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-[#14ffc8]" />
                        Lead Handoff
                      </h3>
                      <p className="text-sm text-gray-400">
                        When a chat conversation escalates, seamlessly transfer to Telegram for more in-depth discussions.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-800 pt-5">
                  <p className="text-xs text-gray-500">
                    Note: To message leads directly, they must have their Telegram username saved in their contact profile.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}