import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, ChevronDown, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDevice } from "@/hooks/use-device";
import { trackEvent } from "@/components/AnalyticsTracker";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [location] = useLocation();
  const { isMobile, isTablet } = useDevice();

  // Only render on mobile and tablet
  if (!isMobile && !isTablet) return null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: isMenuOpen ? 'close_mobile_menu' : 'open_mobile_menu'
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsIndustriesOpen(false);
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/services/conversational-ai", label: "Conversational AI" },
    { href: "/services/multi-model-agents", label: "Multi-Model Agents" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" }
  ];

  const industryItems = [
    { href: "/small-business", label: "Small Business", icon: "🏢" },
    { href: "/real-estate", label: "Real Estate", icon: "🏠" },
    { href: "/medical", label: "Medical", icon: "⚕️" },
    { href: "/trades", label: "Trades", icon: "🔧" }
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" onClick={closeMenu}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-['Orbitron'] text-lg font-bold text-foreground">
                Fusion Data Co
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-['Orbitron'] text-xl font-bold text-foreground">
                      Fusion Data Co
                    </span>
                  </div>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-4 mb-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                    >
                      <div className={`block px-4 py-3 rounded-lg transition-colors ${
                        location === item.href
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-foreground hover:bg-accent/10"
                      }`}>
                        {item.label}
                      </div>
                    </Link>
                  ))}

                  {/* Industries Dropdown */}
                  <div>
                    <button
                      onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-foreground hover:bg-accent/10 transition-colors"
                    >
                      <span>Industries</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        isIndustriesOpen ? "rotate-180" : ""
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {isIndustriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-2 space-y-2">
                            {industryItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                              >
                                <div className="flex items-center space-x-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors">
                                  <span className="text-lg">{item.icon}</span>
                                  <span>{item.label}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </nav>

                {/* Contact Info */}
                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Phone className="w-5 h-5" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                    <span>sales@fusiondataco.com</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Link href="/contact" onClick={closeMenu}>
                    <div className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg text-center font-semibold hover:shadow-lg transition-all duration-300">
                      Get Started Today
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}