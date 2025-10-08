import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/components/AnalyticsTracker';
import { useAuth } from '@/hooks/useAuth';
import { SiGoogle } from 'react-icons/si';

export default function Login() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  
  // Get redirect URL from query parameter
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUrl = searchParams.get('redirect') || '/crm/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation(redirectUrl);
    }
  }, [isAuthenticated, isLoading, redirectUrl, setLocation]);

  // Use Replit Auth for login
  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    
    // Track login attempt
    trackEvent({
      category: 'authentication',
      action: 'submit',
      label: 'google_login',
    });
    
    // Redirect to Replit Auth login endpoint with redirect parameter
    const loginUrl = `/api/login?redirect=${encodeURIComponent(redirectUrl)}`;
    window.location.href = loginUrl;
  };
      
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Login | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Log in to your Fusion Data Co account to access marketing automation tools, CRM, and analytics."
        />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md bg-card border border-border/50">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/logo.svg" 
                alt="Fusion Data Co Logo" 
                className="h-10"
                loading="lazy"
              />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Sign in with your Google account to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>
            
            <Button 
              onClick={handleGoogleLogin}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
              size="lg"
              disabled={isSubmitting}
            >
              <SiGoogle className="mr-2 h-4 w-4" />
              {isSubmitting ? "Redirecting..." : "Continue with Google"}
            </Button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Admin access only. Sign in with your authorized Google account.
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border p-6 text-center">
            <p className="text-xs text-muted-foreground w-full">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}