import { motion } from "framer-motion";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { useDevice } from "@/hooks/use-device";
import { trackEvent } from "@/components/AnalyticsTracker";

export default function MobilePricing() {
  const { isMobile, isTablet } = useDevice();

  // Only render on mobile and tablet
  if (!isMobile && !isTablet) return null;

  const plans = [
    {
      name: "Starter",
      icon: <Zap className="w-6 h-6" />,
      price: "$299",
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 1,000 contacts",
        "5 automation workflows",
        "Basic email templates",
        "Standard analytics",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      popular: false,
      color: "accent"
    },
    {
      name: "Professional",
      icon: <Crown className="w-6 h-6" />,
      price: "$599",
      period: "/month",
      description: "Ideal for growing teams and businesses",
      features: [
        "Up to 10,000 contacts",
        "Unlimited workflows",
        "Advanced AI features",
        "Custom templates",
        "Priority support",
        "Advanced analytics"
      ],
      buttonText: "Get Started",
      popular: true,
      color: "primary"
    },
    {
      name: "Enterprise",
      icon: <Rocket className="w-6 h-6" />,
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited contacts",
        "Custom integrations",
        "Dedicated success manager",
        "White-label options",
        "24/7 phone support",
        "Advanced security"
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "secondary"
    }
  ];

  const handlePlanClick = (planName: string) => {
    trackEvent({
      category: 'lead_generation',
      action: 'click',
      label: `mobile_pricing_${planName.toLowerCase()}`
    });
  };

  return (
    <section className="py-16 px-4 bg-background/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 -left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>

      <div className="max-w-sm mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-['Orbitron'] text-2xl md:text-3xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto mb-4"></div>
          
          <p className="text-muted-foreground">
            Start free, scale as you grow. No hidden fees.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="space-y-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Glow */}
              <div className={`absolute inset-0 rounded-xl blur-xl opacity-20 ${
                plan.popular ? 'bg-primary' : 
                plan.color === 'secondary' ? 'bg-secondary' : 'bg-accent'
              }`}></div>
              
              {/* Card Content */}
              <div className={`relative bg-card/80 backdrop-blur-sm rounded-xl p-6 ${
                plan.popular 
                  ? 'border-2 border-primary/50' 
                  : 'border border-border/50'
              } hover:border-border transition-all duration-300`}>
                
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-${plan.color}/10 border border-${plan.color}/20`}>
                    <div className={`text-${plan.color}`}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-['Orbitron'] text-xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-${plan.color}/10 flex items-center justify-center mr-3 mt-0.5`}>
                        <Check className={`text-${plan.color} w-3 h-3`} />
                      </div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl'
                      : 'border border-border bg-background/50 text-foreground hover:bg-accent/10'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">30-day money-back guarantee</span>
              <br />
              No setup fees • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}