import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Play, Calendar, Youtube, Mail, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface AutomationStatus {
  isRunning: boolean;
  pendingJobs: number;
  lastDailyBlog: any;
  scheduledTasks: number;
  nextExecution: {
    dailyBlog: string;
    monthlyNewsletter: string;
    youtubeMonitoring: string;
  };
}

export default function AutomationDashboard() {
  const [status, setStatus] = useState<AutomationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/automation/status', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error('Error fetching automation status:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerAutomation = async (type: string, endpoint: string, description: string) => {
    setTriggering(type);
    try {
      const response = await fetch(`/api/automation/trigger/${endpoint}`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "✅ Success!",
          description: `${description} completed successfully`,
        });
        
        // Refresh status after successful trigger
        setTimeout(fetchStatus, 1000);
      } else {
        throw new Error('Failed to trigger automation');
      }
    } catch (error) {
      toast({
        title: "❌ Error",
        description: `Failed to trigger ${description.toLowerCase()}`,
        variant: "destructive",
      });
    } finally {
      setTriggering(null);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🤖 Content Automation Dashboard</h1>
          <p className="text-gray-600 mt-2">VIBE CODING content generation system</p>
        </div>
        <Button onClick={fetchStatus} variant="outline">
          <Clock className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              {status?.isRunning ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="font-semibold">
                  {status?.isRunning ? 'Running' : 'Stopped'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Scheduled Tasks</p>
                <p className="font-semibold">{status?.scheduledTasks || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Jobs</p>
                <p className="font-semibold">{status?.pendingJobs || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Last Blog</p>
                <p className="font-semibold text-xs">
                  {status?.lastDailyBlog ? 'Recent' : 'None'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Triggers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Manual Triggers
          </CardTitle>
          <CardDescription>
            Test the automation system with manual triggers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-green-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold">Daily Blog Post</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Generate a VIBE CODING blog post with latest research
                  </p>
                  <Button 
                    onClick={() => triggerAutomation('daily-blog', 'daily-blog', 'Daily blog generation')}
                    disabled={triggering === 'daily-blog'}
                    className="w-full"
                  >
                    {triggering === 'daily-blog' ? 'Generating...' : 'Generate Blog Post'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold">Monthly Newsletter</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Send Sandler-style newsletter to subscribers
                  </p>
                  <Button 
                    onClick={() => triggerAutomation('newsletter', 'monthly-newsletter', 'Monthly newsletter')}
                    disabled={triggering === 'newsletter'}
                    variant="outline"
                    className="w-full"
                  >
                    {triggering === 'newsletter' ? 'Sending...' : 'Send Newsletter'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold">YouTube Monitor</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Check for new VIBE CODING videos and trends
                  </p>
                  <Button 
                    onClick={() => triggerAutomation('youtube', 'youtube-monitoring', 'YouTube monitoring')}
                    disabled={triggering === 'youtube'}
                    variant="outline"
                    className="w-full"
                  >
                    {triggering === 'youtube' ? 'Monitoring...' : 'Run Monitoring'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Execution Times */}
      <Card>
        <CardHeader>
          <CardTitle>⏰ Scheduled Execution Times</CardTitle>
          <CardDescription>
            When automated tasks will run (Pacific Time)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="font-medium">Daily Blog</span>
              </div>
              <Badge variant="secondary">{status?.nextExecution?.dailyBlog}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Newsletter</span>
              </div>
              <Badge variant="secondary">{status?.nextExecution?.monthlyNewsletter}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span className="font-medium">YouTube Check</span>
              </div>
              <Badge variant="secondary">{status?.nextExecution?.youtubeMonitoring}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* VIBE CODING Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 VIBE CODING Focus Areas</CardTitle>
          <CardDescription>
            Keywords and tools being monitored for content generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Development Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['Cursor AI', 'V0 Dev', 'Bolt.new', 'Claude Dev', 'Windsurf Editor'].map(tool => (
                  <Badge key={tool} variant="outline" className="bg-green-50">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-sm mb-2">AI & Automation</h4>
              <div className="flex flex-wrap gap-2">
                {['ElevenLabs', 'N8N', 'Make.com', 'OpenRouter', 'Conversational AI'].map(tool => (
                  <Badge key={tool} variant="outline" className="bg-blue-50">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold text-sm mb-2">Creator Economy</h4>
              <div className="flex flex-wrap gap-2">
                {['Runway ML', 'Pika Labs', 'Midjourney', 'AI Video', 'Content Creation'].map(tool => (
                  <Badge key={tool} variant="outline" className="bg-purple-50">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500 mt-8">
        🚀 FusionDataCo VIBE CODING Automation System - Fully Operational
      </div>
    </div>
  );
}