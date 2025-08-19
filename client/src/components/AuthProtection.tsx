import { useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Loader2 } from 'lucide-react';
import { trackEvent } from './AnalyticsTracker';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthProtectionProps {
  children: React.ReactNode;
  requiredRole?: string;
}

// This component protects routes from unauthorized access
export default function AuthProtection({ 
  children, 
  requiredRole = 'user' 
}: AuthProtectionProps) {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [, params] = useRoute('/crm/*');
  const [, campaignsParams] = useRoute('/campaigns/*');
  const [, automationsParams] = useRoute('/automations/*');
  
  // Determine if the current route requires auth
  const isProtectedRoute = Boolean(
    params || 
    campaignsParams || 
    automationsParams || 
    (window.location.pathname.startsWith('/crm/') && window.location.pathname !== '/crm')
  );
  
  useEffect(() => {
    // Handle authentication for protected routes
    if (!isLoading && isProtectedRoute && !isAuthenticated) {
      // Track unauthorized access attempt
      trackEvent({
        category: 'authentication',
        action: 'view' as const,
        label: window.location.pathname
      });
      
      // Redirect to login with return URL
      toast({
        title: "Authentication Required",
        description: "Please sign in to access the admin panel.",
        variant: "destructive",
      });
      
      const returnUrl = encodeURIComponent(window.location.pathname);
      setLocation(`/login?redirect=${returnUrl}`);
    }
    
    // Check role requirement if specified for admin routes
    if (!isLoading && isAuthenticated && isProtectedRoute && requiredRole === 'admin' && (user as any)?.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "This area requires admin privileges.",
        variant: "destructive",
      });
      setLocation('/');
    }
  }, [isLoading, isAuthenticated, isProtectedRoute, requiredRole, user, setLocation, toast]);
  
  // If not on a protected route, just render children
  if (!isProtectedRoute) {
    return <>{children}</>;
  }
  
  // If loading, show loading state (but only for protected routes)
  if (isLoading && isProtectedRoute) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0d] z-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#14ffc8] mx-auto mb-4" />
          <p className="text-white">Verifying access...</p>
        </div>
      </div>
    );
  }
  
  // Render children if authenticated or not on protected route
  return <>{children}</>;
}