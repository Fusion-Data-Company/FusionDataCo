import { motion } from "framer-motion";
import { Zap, TrendingUp, Users, BarChart3 } from "lucide-react";
import { useDevice } from "@/hooks/use-device";
import { trackEvent } from "@/components/AnalyticsTracker";

export default function MobileHero() {
  const { isMobile, isTablet } = useDevice();

  // Only render on mobile and tablet
  if (!isMobile && !isTablet) return null;

  const handleGetStarted = () => {
    trackEvent({
      category: 'lead_generation',
      action: 'click',
      label: 'mobile_hero_cta'
    });
  };

  const stats = [
    { icon: TrendingUp, label: "Growth Rate", value: "300%" },
    { icon: Users, label: "Happy Clients", value: "2.5K+" },
    { icon: BarChart3, label: "ROI Increase", value: "450%" }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 py-20 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -left-20 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-sm mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-4"
        >
          <span className="text-foreground">Transform Your</span>
          <br />
          <span className="text-primary">Marketing ROI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-muted-foreground mb-8 leading-relaxed"
        >
          Enterprise-grade marketing automation that drives real results for growing businesses.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-4 mb-12"
        >
          <a
            href="/contact"
            onClick={handleGetStarted}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 block"
          >
            Start Free Trial
          </a>
          <a
            href="/pricing"
            className="w-full border border-border bg-background/50 backdrop-blur-sm text-foreground py-4 px-6 rounded-xl font-semibold hover:bg-accent/10 transition-all duration-300 block"
          >
            View Pricing
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-3 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30"
            >
              <div className="flex justify-center mb-2">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8 pt-6 border-t border-border/30"
        >
          <p className="text-xs text-muted-foreground mb-3">Trusted by industry leaders</p>
          <div className="flex justify-center space-x-4 opacity-50">
            <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
            <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
            <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}