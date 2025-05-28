import { motion } from "framer-motion";
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useDevice } from "@/hooks/use-device";
import { trackEvent } from "@/components/AnalyticsTracker";

export default function MobileFooter() {
  const { isMobile, isTablet } = useDevice();

  // Only render on mobile and tablet
  if (!isMobile && !isTablet) return null;

  const handleContactClick = (type: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `mobile_footer_${type}`
    });
  };

  const handleSocialClick = (platform: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `mobile_social_${platform}`
    });
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/crm", label: "CRM" },
    { href: "/contact", label: "Contact" }
  ];

  const industries = [
    { href: "/small-business", label: "Small Business" },
    { href: "/real-estate", label: "Real Estate" },
    { href: "/medical", label: "Medical" },
    { href: "/trades", label: "Trades" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>

      <div className="relative z-10 px-4 py-12">
        <div className="max-w-sm mx-auto">
          {/* Logo and Description */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-['Orbitron'] text-xl font-bold text-foreground">
                Fusion Data Co
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise-grade marketing automation that transforms your business growth.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4 mb-8"
          >
            <h3 className="font-['Orbitron'] text-lg font-semibold text-foreground text-center mb-4">
              Get In Touch
            </h3>
            
            <div className="space-y-3">
              <a
                href="mailto:sales@fusiondataco.com"
                onClick={() => handleContactClick('email')}
                className="flex items-center justify-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30 hover:bg-background/70 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-foreground">sales@fusiondataco.com</span>
              </a>
              
              <a
                href="tel:+15551234567"
                onClick={() => handleContactClick('phone')}
                className="flex items-center justify-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30 hover:bg-background/70 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-foreground">(555) 123-4567</span>
              </a>
              
              <div className="flex items-center justify-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-foreground">San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-['Orbitron'] text-lg font-semibold text-foreground text-center mb-4">
              Quick Links
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-center py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/30"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Industries */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-['Orbitron'] text-lg font-semibold text-foreground text-center mb-4">
              Industries
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {industries.map((industry, index) => (
                <a
                  key={index}
                  href={industry.href}
                  className="text-center py-2 px-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/30"
                >
                  {industry.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="font-['Orbitron'] text-lg font-semibold text-foreground text-center mb-4">
              Follow Us
            </h3>
            
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  onClick={() => handleSocialClick(social.label.toLowerCase())}
                  className="w-12 h-12 bg-background/50 border border-border/30 rounded-lg flex items-center justify-center hover:bg-background/70 hover:border-primary/30 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <a
              href="/contact"
              className="block w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Free Trial
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-6 border-t border-border/30 text-center"
          >
            <p className="text-xs text-muted-foreground">
              © 2024 Fusion Data Co. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}