import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Check, 
  Zap, 
  Crown, 
  Settings,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { trackEvent } from './AnalyticsTracker';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'social-starter',
    name: 'Social Starter',
    price: 299,
    description: 'Automated content creation and posting for growing businesses',
    features: [
      'Automated content creation & posting',
      '1 social platform',
      '3 posts per week',
      'Basic analytics & performance tracking',
      'Content scheduling',
      'Email support'
    ],
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  },
  {
    id: 'social-pro',
    name: 'Social Pro',
    price: 599,
    description: 'Professional social media management with comprehensive analytics',
    features: [
      'Everything in Social Starter, plus:',
      'Up to 3 social platforms',
      'Daily automated posts',
      'Comprehensive analytics & reporting',
      'Content strategy consultation',
      'Priority email and chat support'
    ],
    color: 'bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]/20',
    popular: true
  },
  {
    id: 'social-elite',
    name: 'Social Elite',
    price: 1199,
    description: 'Complete social media management with custom content and all platforms',
    features: [
      'Everything in Social Pro, plus:',
      'Custom daily content creation (human-crafted)',
      'Management of all major social platforms',
      'Advanced analytics and custom reporting',
      'Dedicated social media manager',
      'Tailored content strategy',
      '24/7 priority support'
    ],
    color: 'bg-[#8f00ff]/10 text-[#8f00ff] border-[#8f00ff]/20'
  }
];

interface StripeIntegrationProps {
  currentPlan?: string;
  onPlanChange?: (planId: string) => void;
}

export default function StripeIntegration({ 
  currentPlan = 'professional',
  onPlanChange 
}: StripeIntegrationProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [billingEnabled, setBillingEnabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const handleConnectStripe = () => {
    setIsConnecting(true);
    
    trackEvent({
      category: 'crm_activity',
      action: 'click',
      label: 'stripe_connection_initiated'
    });
    
    // Simulate Stripe connection process
    setTimeout(() => {
      setStripeConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handlePlanUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    
    trackEvent({
      category: 'crm_activity',
      action: 'click',
      label: 'plan_upgrade_initiated',
      value: pricingPlans.find(p => p.id === planId)?.price
    });
    
    onPlanChange?.(planId);
    
    // In a real implementation, this would redirect to Stripe Checkout
    alert(`Redirecting to Stripe checkout for ${planId} plan...`);
  };

  const getCurrentPlan = () => pricingPlans.find(p => p.id === currentPlan);
  const currentPlanData = getCurrentPlan();

  return (
    <div className="space-y-6">
      <Card className="bg-[#121218]/90 border border-[#333340]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#14ffc8]" />
            Stripe Integration
          </CardTitle>
          <CardDescription>
            Connect Stripe to enable seamless billing and subscription management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!stripeConnected ? (
            <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Stripe Not Connected</h3>
                  <p className="text-gray-400 mb-4">
                    Connect your Stripe account to enable subscription billing, plan upgrades, and payment processing.
                  </p>
                  <Button 
                    onClick={handleConnectStripe}
                    disabled={isConnecting}
                    className="bg-[#635bff] hover:bg-[#635bff]/90 text-white"
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Connect Stripe Account
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0a0a0d] rounded-lg border border-[#14ffc8]/20 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#14ffc8]/10 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-[#14ffc8]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Stripe Connected</h3>
                  <p className="text-gray-400 mb-4">
                    Your Stripe account is connected and ready for payment processing.
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]/20" variant="outline">
                      Connected
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-gray-400">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-[#0a0a0d] rounded-lg border border-[#333340]">
            <div>
              <Label htmlFor="billing-enabled" className="text-white font-medium">
                Enable Automatic Billing
              </Label>
              <p className="text-sm text-gray-400 mt-1">
                Automatically charge customers for subscription renewals
              </p>
            </div>
            <Switch
              id="billing-enabled"
              checked={billingEnabled}
              onCheckedChange={setBillingEnabled}
              disabled={!stripeConnected}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#121218]/90 border border-[#333340]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-[#ff0aff]" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Manage your current plan and upgrade options
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentPlanData && (
            <div className="bg-[#0a0a0d] rounded-lg border border-[#333340] p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-white">{currentPlanData.name} Plan</h3>
                    {currentPlanData.popular && (
                      <Badge className="bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]/20" variant="outline">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{currentPlanData.description}</p>
                  <div className="space-y-2">
                    {currentPlanData.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#14ffc8]" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">${currentPlanData.price}</div>
                  <div className="text-gray-400 text-sm">per month</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-[#333340]">
                <div className="text-sm text-gray-400">
                  Next billing: June 23, 2023
                </div>
                <Button variant="outline" size="sm">
                  View Billing History
                </Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="upgrade" className="w-full">
            <TabsList className="bg-[#0a0a0d] border border-[#333340]">
              <TabsTrigger value="upgrade">Upgrade Plans</TabsTrigger>
              <TabsTrigger value="billing">Billing Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upgrade" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`bg-[#0a0a0d] border transition-all duration-300 ${
                      plan.id === currentPlan 
                        ? 'border-[#14ffc8]/50 bg-[#14ffc8]/5' 
                        : 'border-[#333340] hover:border-[#14ffc8]/30'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-white">{plan.name}</CardTitle>
                          <CardDescription className="mt-1">{plan.description}</CardDescription>
                        </div>
                        {plan.popular && (
                          <Badge className="bg-[#14ffc8]/10 text-[#14ffc8] border-[#14ffc8]/20" variant="outline">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4">
                        <div className="text-3xl font-bold text-white">${plan.price}</div>
                        <div className="text-gray-400 text-sm">per month</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#14ffc8] flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {plan.id === currentPlan ? (
                        <Button 
                          className="w-full" 
                          variant="outline" 
                          disabled
                        >
                          Current Plan
                        </Button>
                      ) : (
                        <Button 
                          className="w-full bg-[#14ffc8] hover:bg-[#14ffc8]/90 text-black"
                          onClick={() => handlePlanUpgrade(plan.id)}
                          disabled={!stripeConnected}
                        >
                          {plan.price > (currentPlanData?.price || 0) ? (
                            <>
                              <TrendingUp className="h-4 w-4 mr-2" />
                              Upgrade to {plan.name}
                            </>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Switch to {plan.name}
                            </>
                          )}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#0a0a0d] border border-[#333340]">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#121218] rounded-lg border border-[#333340]">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-white">•••• •••• •••• 4242</div>
                          <div className="text-xs text-gray-400">Expires 12/24</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Update
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-[#0a0a0d] border border-[#333340]">
                  <CardHeader>
                    <CardTitle className="text-lg">Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="billing-email" className="text-white text-sm">
                          Billing Email
                        </Label>
                        <Input
                          id="billing-email"
                          defaultValue="admin@fusiondataco.com"
                          className="bg-[#121218] border-[#333340] text-white mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tax-id" className="text-white text-sm">
                          Tax ID (Optional)
                        </Label>
                        <Input
                          id="tax-id"
                          placeholder="Enter tax ID"
                          className="bg-[#121218] border-[#333340] text-white mt-1"
                        />
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Update Information
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}