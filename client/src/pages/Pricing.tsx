import React from 'react';
import { Helmet } from 'react-helmet';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { trackEvent } from '@/components/AnalyticsTracker';
import { formatPrice } from '@/lib/utils';

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: {
    included: string[];
    notIncluded: string[];
  };
  cta: {
    text: string;
    link: string;
  };
  popular?: boolean;
}

export default function Pricing() {
  // Pricing tiers data
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: 49,
      description: "Perfect for small businesses just getting started with marketing automation.",
      features: {
        included: [
          "3 marketing campaigns",
          "1 social media channel",
          "Lead capture forms",
          "Email marketing (500 sends/mo)",
          "Basic analytics",
          "Email support"
        ],
        notIncluded: [
          "AI copywriting",
          "Custom workflows",
          "CRM integration",
          "Telegram integrations",
          "Advanced analytics"
        ]
      },
      cta: {
        text: "Start Free Trial",
        link: "/register?plan=starter"
      }
    },
    {
      name: "Growth",
      price: 149,
      description: "For businesses looking to scale their marketing efforts with advanced features.",
      features: {
        included: [
          "10 marketing campaigns",
          "3 social media channels",
          "Lead capture forms",
          "Email marketing (5,000 sends/mo)",
          "AI copywriting (25/mo)",
          "Custom workflows",
          "CRM integration",
          "Telegram integrations",
          "Advanced analytics",
          "Priority support"
        ],
        notIncluded: [
          "White labeling",
          "Dedicated account manager"
        ]
      },
      cta: {
        text: "Start Free Trial",
        link: "/register?plan=growth"
      },
      popular: true
    },
    {
      name: "Elite",
      price: 399,
      description: "Enterprise-grade marketing automation for high-performance businesses.",
      features: {
        included: [
          "Unlimited marketing campaigns",
          "All social media channels",
          "Lead capture forms",
          "Email marketing (50,000 sends/mo)",
          "Unlimited AI copywriting",
          "Custom workflows",
          "CRM integration",
          "Telegram integrations",
          "Advanced analytics & reporting",
          "White labeling",
          "Dedicated account manager",
          "24/7 priority support"
        ],
        notIncluded: []
      },
      cta: {
        text: "Start Free Trial",
        link: "/register?plan=elite"
      }
    }
  ];

  // Track pricing page view
  React.useEffect(() => {
    trackEvent({
      category: 'engagement',
      action: 'view',
      label: 'pricing_page',
      nonInteraction: true
    });
  }, []);
  
  // Handler for CTA button clicks
  const handleCtaClick = (planName: string) => {
    trackEvent({
      category: 'lead_generation',
      action: 'click',
      label: `pricing_cta_${planName.toLowerCase()}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Pricing Plans | Fusion Data Co</title>
        <meta 
          name="description" 
          content="Flexible pricing plans for businesses of all sizes. Choose the right marketing automation plan for your business needs with Fusion Data Co."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-card">
            <div className="container mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-primary">Simple, Transparent</span> Pricing
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Choose the plan that fits your business needs with our straightforward pricing options. 
                  All plans include a 14-day free trial.
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="btn-titanium"
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing-cards');
                      pricingSection?.scrollIntoView({ behavior: 'smooth' });
                      
                      trackEvent({
                        category: 'engagement',
                        action: 'click',
                        label: 'view_plans_button',
                      });
                    }}
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing Cards Section */}
          <section id="pricing-cards" className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                  <Card 
                    key={index}
                    className={`bg-background border ${tier.popular ? 'border-primary border-2' : 'border-border/50'} h-full flex flex-col relative`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <div className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
                          MOST POPULAR
                        </div>
                      </div>
                    )}
                    <CardHeader className={`pt-6 ${tier.popular ? 'pt-8' : ''}`}>
                      <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="mb-8">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatPrice(tier.price * 10, true)} billed annually
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold mb-4">What's included:</h3>
                        <ul className="space-y-3 mb-6">
                          {tier.features.included.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {tier.features.notIncluded.length > 0 && (
                          <>
                            <h3 className="text-base font-semibold mb-4">Not included:</h3>
                            <ul className="space-y-3">
                              {tier.features.notIncluded.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start gap-2">
                                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-border">
                      <Button 
                        className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card hover:bg-card/90 text-foreground border border-border'}`}
                        size="lg"
                        onClick={() => handleCtaClick(tier.name)}
                      >
                        {tier.cta.text}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Feature Grid Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Compare <span className="text-primary">Features</span>
              </h2>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse border border-border">
                  <thead>
                    <tr className="bg-card">
                      <th className="p-4 text-left border-b border-border">Feature</th>
                      <th className="p-4 text-center border-b border-border">Starter</th>
                      <th className="p-4 text-center border-b border-border">Growth</th>
                      <th className="p-4 text-center border-b border-border">Elite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-border">Marketing Campaigns</td>
                      <td className="p-4 text-center border-b border-border">3</td>
                      <td className="p-4 text-center border-b border-border">10</td>
                      <td className="p-4 text-center border-b border-border">Unlimited</td>
                    </tr>
                    <tr className="bg-card/30">
                      <td className="p-4 border-b border-border">Social Media Channels</td>
                      <td className="p-4 text-center border-b border-border">1</td>
                      <td className="p-4 text-center border-b border-border">3</td>
                      <td className="p-4 text-center border-b border-border">All</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border">Monthly Email Sends</td>
                      <td className="p-4 text-center border-b border-border">500</td>
                      <td className="p-4 text-center border-b border-border">5,000</td>
                      <td className="p-4 text-center border-b border-border">50,000</td>
                    </tr>
                    <tr className="bg-card/30">
                      <td className="p-4 border-b border-border">AI Copywriting</td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">25/mo</td>
                      <td className="p-4 text-center border-b border-border">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border">Custom Workflows</td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="bg-card/30">
                      <td className="p-4 border-b border-border">CRM Integration</td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border">Telegram Integrations</td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="bg-card/30">
                      <td className="p-4 border-b border-border">White Labeling</td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border">Dedicated Account Manager</td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <X className="h-5 w-5 mx-auto text-muted-foreground" />
                      </td>
                      <td className="p-4 text-center border-b border-border">
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      </td>
                    </tr>
                    <tr className="bg-card/30">
                      <td className="p-4 border-b border-border">Support</td>
                      <td className="p-4 text-center border-b border-border">Email</td>
                      <td className="p-4 text-center border-b border-border">Priority</td>
                      <td className="p-4 text-center border-b border-border">24/7 Priority</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 px-4 bg-card">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Can I switch plans later?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, 
                    while downgrades will take effect at the end of your current billing cycle.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Do you offer annual discounts?</h3>
                  <p className="text-muted-foreground">
                    Yes! You can save approximately 17% by choosing annual billing on any of our plans. 
                    Annual plans are billed once per year.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">What happens after the free trial?</h3>
                  <p className="text-muted-foreground">
                    After your 14-day free trial ends, your account will automatically convert to the plan you 
                    selected. We'll send you a reminder email 3 days before the trial ends.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Is there a setup fee?</h3>
                  <p className="text-muted-foreground">
                    No, there are no setup fees for any of our plans. The price you see is the full price 
                    you'll pay, with no hidden fees or charges.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover) 
                    as well as PayPal for payment.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Do you offer refunds?</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day money-back guarantee for monthly plans. Annual plans are non-refundable 
                    after the first 30 days but will remain active until the end of your billing period.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 px-4 bg-background">
            <div className="container mx-auto">
              <div className="bg-gradient-to-r from-card to-card/80 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start your free 14-day trial today. No credit card required, no commitment.
                  Experience the full power of our platform and see the results for yourself.
                </p>
                <Button 
                  size="lg" 
                  className="btn-titanium"
                  onClick={() => {
                    trackEvent({
                      category: 'lead_generation',
                      action: 'click',
                      label: 'pricing_bottom_cta',
                    });
                  }}
                >
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}