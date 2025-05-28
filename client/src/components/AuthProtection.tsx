import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Loader2 } from 'lucide-react';
import { trackEvent } from './AnalyticsTracker';

interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role: string;
}

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
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, params] = useRoute('/crm/*');
  const [, campaignsParams] = useRoute('/campaigns/*');
  const [, automationsParams] = useRoute('/automations/*');
  
  // Determine if the current route requires auth
  const isProtectedRoute = Boolean(params || campaignsParams || automationsParams || (window.location.pathname.startsWith('/crm/') && window.location.pathname !== '/crm'));
  
  useEffect(() => {
    // Check authentication status (this would use a real auth system in production)
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be a fetch to an auth endpoint
        // This is a mock to simulate authenticated state
        const isLoggedIn = localStorage.getItem('auth_token') !== null;
        
        // Mock user data (would come from API)
        const mockUser: User = {
          id: 1,
          username: 'admin',
          email: 'admin@fusiondataco.com',
          fullName: 'Admin User',
          role: 'admin'
        };
        
        // Delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setAuthenticated(isLoggedIn);
        setUser(isLoggedIn ? mockUser : null);
        
        // Track authentication status
        if (isLoggedIn) {
          trackEvent({
            category: 'authentication',
            action: 'login',
            label: 'auto_login'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // If not on a protected route, just render children
  if (!isProtectedRoute) {
    return <>{children}</>;
  }
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0d] z-50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#14ffc8] mx-auto mb-4" />
          <p className="text-white">Verifying access...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!authenticated) {
    // Track unauthorized access attempt
    trackEvent({
      category: 'authentication',
      action: 'view',
      label: 'unauthorized_access_attempt',
      nonInteraction: true
    });
    
    // Show a message and redirect
    setTimeout(() => {
      setLocation('/login?redirect=' + encodeURIComponent(window.location.pathname));
    }, 500);
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0d] z-50">
        <div className="text-center max-w-md p-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m0 0v2m0-2h2m-2 0H9m4-4v2m-2-2h2" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-4">
            You need to be logged in to access this area. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }
  
  // If role check is required and fails, show unauthorized
  if (requiredRole && user && user.role !== requiredRole && requiredRole !== 'user') {
    // Track unauthorized role attempt
    trackEvent({
      category: 'authentication',
      action: 'view',
      label: 'insufficient_permissions',
      nonInteraction: true
    });
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0d] z-50">
        <div className="text-center max-w-md p-6">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-yellow-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Insufficient Permissions</h2>
          <p className="text-gray-400 mb-4">
            You don't have the necessary permissions to access this section.
          </p>
          <button 
            className="px-4 py-2 bg-[#14ffc8] text-black rounded-md hover:bg-[#14ffc8]/90 transition-colors"
            onClick={() => setLocation('/')}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  // Pass authentication information to children
  return <>{children}</>;
}