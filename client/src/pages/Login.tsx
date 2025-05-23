import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/components/AnalyticsTracker';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get redirect URL from query parameter
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUrl = searchParams.get('redirect') || '/crm';

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Track login attempt
      trackEvent({
        category: 'authentication',
        action: 'submit',
        label: 'login_form',
      });
      
      // In a real app, this would make an API call to authenticate
      // For now, we'll simulate a successful login
      setTimeout(() => {
        // Store auth token in localStorage
        localStorage.setItem('auth_token', 'mock_token_12345');
        
        // Track successful login
        trackEvent({
          category: 'authentication',
          action: 'login',
          label: 'login_success',
        });
        
        toast({
          title: "Login successful",
          description: "Welcome back to Fusion Data Co!",
        });
        
        // Redirect to the intended destination
        setLocation(redirectUrl);
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Track failed login
      trackEvent({
        category: 'authentication',
        action: 'login',
        label: 'login_failed',
      });
      
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              />
            </div>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="name@example.com" 
                          type="email"
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <a 
                          href="#" 
                          className="text-sm text-primary hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            trackEvent({
                              category: 'authentication',
                              action: 'click',
                              label: 'forgot_password',
                            });
                            toast({
                              title: "Password Reset",
                              description: "This feature is coming soon. Please contact support for assistance.",
                            });
                          }}
                        >
                          Forgot password?
                        </a>
                      </div>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password"
                          autoComplete="current-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={form.watch('rememberMe')}
                    onChange={(e) => form.setValue('rememberMe', e.target.checked)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me for 30 days
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  className="text-primary hover:underline font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    trackEvent({
                      category: 'authentication',
                      action: 'click',
                      label: 'signup_link',
                    });
                    setLocation('/register');
                  }}
                >
                  Sign up
                </a>
              </span>
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