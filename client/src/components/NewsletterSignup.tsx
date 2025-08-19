import { useState } from "react";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/components/AnalyticsTracker";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSignup() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Track newsletter signup
      trackEvent({
        category: "lead_generation",
        action: "submit",
        label: "footer_newsletter"
      });

      // Submit to backend
      await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: email,
          message: "Newsletter subscription from footer",
          formType: "newsletter",
          source: "Footer"
        })
      });

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });

      // Clear the form
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel mb-16 p-8 rounded-xl max-w-5xl mx-auto relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 opacity-5">
        <Shield className="w-full h-full text-primary" />
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-lg">
          <h3 className="font-['Orbitron'] text-2xl font-semibold mb-3 text-foreground">
            Stay Updated with Enterprise Insights
          </h3>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for exclusive industry trends, product updates, and enterprise marketing strategies.
          </p>
        </div>
        
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={isSubmitting}
            className="px-4 py-3 bg-muted/30 border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors w-full sm:w-64 disabled:opacity-50"
          />
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </button>
        </div>
      </div>
    </div>
  );
}