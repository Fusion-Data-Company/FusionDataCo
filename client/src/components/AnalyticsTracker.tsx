import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Types for analytics events
export type EventCategory = 
  | 'engagement' 
  | 'lead_generation' 
  | 'campaign_management'
  | 'authentication'
  | 'crm_activity';

export type EventAction = 
  | 'click' 
  | 'view' 
  | 'submit' 
  | 'create' 
  | 'delete'
  | 'update'
  | 'login'
  | 'logout'
  | 'open'
  | 'close';

interface AnalyticsEvent {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

// Function to send event to Google Analytics
export function trackEvent({
  category,
  action,
  label,
  value,
  nonInteraction = false
}: AnalyticsEvent) {
  // Check if window.gtag exists (Google Analytics is loaded)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction
    });
    console.debug(`Analytics Event: ${category} > ${action} > ${label}`);
  } else {
    // For development - log the event
    console.debug(`Analytics Event (dev): ${category} > ${action} > ${label}`);
  }
}

// Hook to track page views
export function usePageViewTracking() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA-MEASUREMENT-ID', {
        page_path: location
      });
      console.debug(`Page view: ${location}`);
    } else {
      console.debug(`Page view (dev): ${location}`);
    }
  }, [location]);
}

// Function to create UTM-compatible links
export function createUtmLink(
  baseUrl: string,
  {
    source,
    medium,
    campaign,
    term,
    content
  }: {
    source: string;
    medium: string;
    campaign: string;
    term?: string;
    content?: string;
  }
) {
  const url = new URL(baseUrl);
  
  // Add UTM parameters
  url.searchParams.append('utm_source', source);
  url.searchParams.append('utm_medium', medium);
  url.searchParams.append('utm_campaign', campaign);
  
  if (term) url.searchParams.append('utm_term', term);
  if (content) url.searchParams.append('utm_content', content);
  
  return url.toString();
}

// Component for tracking clicks on CTAs
interface TrackClickProps {
  children: React.ReactNode;
  category: EventCategory;
  action?: EventAction;
  label?: string;
  value?: number;
}

export function TrackClick({
  children,
  category,
  action = 'click',
  label,
  value
}: TrackClickProps) {
  const handleClick = () => {
    trackEvent({
      category,
      action,
      label,
      value
    });
  };
  
  // Clone the child element to add the onClick handler
  return React.cloneElement(children as React.ReactElement, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      // Call the original onClick if it exists
      if ((children as React.ReactElement).props.onClick) {
        (children as React.ReactElement).props.onClick(e);
      }
      
      handleClick();
    }
  });
}

// Main component to initialize analytics
export default function AnalyticsTracker() {
  usePageViewTracking();
  
  useEffect(() => {
    // Initialize Google Analytics (would be replaced with actual GA code)
    if (typeof window !== 'undefined' && !(window as any).gtag) {
      console.debug('Initializing analytics tracking (development mode)');
      (window as any).gtag = (command: string, ...args: any[]) => {
        console.debug(`GA Command (dev): ${command}`, args);
      };
    }
    
    // Track initial page load
    trackEvent({
      category: 'engagement',
      action: 'view',
      label: 'page_load',
      nonInteraction: true
    });
  }, []);
  
  return null; // This component doesn't render anything
}