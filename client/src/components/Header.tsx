import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MenuIcon, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close any open dropdowns when toggling menu
    if (!isMenuOpen) {
      setDropdownOpen(null);
    }
  };

  // Handle swipe gestures on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Close menu on left swipe, open on right swipe
    if (isLeftSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    } else if (isRightSwipe && !isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  const toggleDropdown = (linkName: string) => {
    setDropdownOpen(dropdownOpen === linkName ? null : linkName);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Media", path: "/media" },
    { 
      name: "Industries", 
      path: "/small-business-owners",
      hasDropdown: true,
      dropdownItems: [
        { name: "Small Business Owners", path: "/small-business-owners" },
        { name: "Real Estate", path: "/real-estate" },
        { name: "Medical", path: "/medical" },
        { name: "Trades", path: "/trades" },
      ]
    },
    { 
      name: "Solutions", 
      path: "/social-media",
      hasDropdown: true,
      dropdownItems: [
        { name: "Conversational AI", path: "/services/conversational-ai" },
        { name: "Multi-Model Agents", path: "/services/multi-model-agents" },
        { name: "Demographics", path: "/demographics" },
        { name: "Social Media", path: "/social-media" },
        { name: "Funnels", path: "/funnels" },
        { name: "Campaign Builder", path: "/campaign-builder" },
        { name: "Lead Gen", path: "/lead-magnet" },
        { name: "CRM", path: "/crm" },
      ]
    },
    { name: "Blog", path: "/blog" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled 
        ? "py-4 bg-card/95 backdrop-blur-lg border-b border-border/40 shadow-md" 
        : "py-6 bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="flex items-center cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/10 rounded-lg blur opacity-30"></div>
                <div className="relative">
                  <span className="font-['Orbitron'] text-xl font-bold tracking-wider">
                    <span className="text-primary text-shadow-titanium">FUSION</span>
                    <span className="text-foreground">DATA</span>
                    <span className="text-accent text-shadow-accent">CO</span>
                  </span>
                </div>
              </div>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {link.hasDropdown ? (
                  <div>
                    <button 
                      className={cn(
                        "flex items-center relative group px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer",
                        "hover:bg-slate-800/50 hover:border hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                        (location.startsWith(link.path) || dropdownOpen === link.name) && "bg-slate-800/30 border border-blue-400/20"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown(link.name);
                      }}
                    >
                      <span className="cyberpunk-text-animate-nav">
                        {link.name}
                      </span>
                      <ChevronDown className={cn(
                        "ml-2 h-4 w-4 transition-transform duration-300 text-blue-400",
                        dropdownOpen === link.name && "transform rotate-180"
                      )} />
                      
                      {/* Corner highlights */}
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 border-l border-t border-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 border-r border-t border-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                    
                    {/* Dropdown menu */}
                    <div className={cn(
                      "absolute left-0 mt-2 w-64 origin-top-left z-50",
                      "transition-all duration-200 transform",
                      dropdownOpen === link.name ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none" 
                    )}>
                      <div className="glass-panel border border-border/40 shadow-lg rounded-lg overflow-hidden p-1">
                        {link.dropdownItems.map((item) => (
                          <Link key={item.path} href={item.path}>
                            <span className={cn(
                              "block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-md transition-colors duration-200 cursor-pointer",
                              location === item.path && "text-primary"
                            )}>
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href={link.path}>
                    <div className={cn(
                      "relative group px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer nav-item-enhanced",
                      "hover:bg-slate-800/50 hover:border hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                      location === link.path && "bg-slate-800/30 border border-blue-400/20"
                    )}>
                      <span className="cyberpunk-text-animate-nav micro-feedback focus-ring-enhanced">
                        {link.name}
                      </span>
                      
                      {/* Corner highlights */}
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 border-l border-t border-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 border-r border-t border-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <Link href="/small-business-upgrade">
              <button className={cn(
                "ml-2 px-8 py-4 relative group overflow-hidden cursor-pointer",
                "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800",
                "border-2 border-blue-400/50 rounded-xl",
                "hover:scale-[1.05] transition-all duration-500 ease-out",
                "hover:border-blue-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.8),0_0_80px_rgba(59,130,246,0.4)]",
                "shadow-[0_0_30px_rgba(59,130,246,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]",
                "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-transparent before:via-blue-400/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
              )}
              >
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
                
                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-xl border border-blue-400/30 animate-pulse group-hover:border-blue-300/50"></div>
                
                {/* Main text with animated gradient */}
                <span className="relative z-10 font-['Orbitron'] font-bold text-base tracking-wider flex items-center whitespace-nowrap">
                  <span className="cyberpunk-text-animate">
                    Small Business Upgrade
                  </span>
                </span>
                
                {/* Enhanced corner highlights with animation */}
                <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-blue-300 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-blue-300 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-blue-300 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-blue-300 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                
                {/* Scanning lines */}
                <div className="absolute top-0 left-2 h-full w-0.5 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></div>
                <div className="absolute top-0 right-2 h-full w-0.5 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" style={{ animationDelay: '0.2s' }}></div>
                
                {/* Power indicator dot */}
                <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></div>
              </button>
            </Link>
            
            {/* Admin CRM Access */}
            <Link href="/login">
              <button className={cn(
                "ml-2 px-4 py-2 relative group overflow-hidden cursor-pointer",
                "bg-gradient-to-br from-slate-800 via-blue-800 to-slate-700",
                "border border-blue-400/50 rounded-lg",
                "hover:scale-[1.03] transition-all duration-300 ease-out",
                "hover:border-blue-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
                "shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              )}>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out"></div>
                
                {/* Main text */}
                <span className="relative z-10 font-['Orbitron'] font-bold text-xs tracking-wider">
                  <span className="cyberpunk-text-animate-small">
                    ADMIN
                  </span>
                </span>
                
                {/* Corner highlights */}
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-l border-t border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-r border-t border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-l border-b border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-r border-b border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </Link>
            
            {/* Theme toggle button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              )}
            </button>
          </nav>
          
          {/* Enhanced Mobile Menu Button - Apple-level Touch Target */}
          <button 
            className={cn(
              "lg:hidden relative rounded-lg text-foreground hover:text-primary transition-all duration-300 touch-target",
              "min-h-[44px] min-w-[44px] p-3",
              "hover:bg-primary/10 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
              "active:scale-95 active:bg-primary/20",
              isMenuOpen && "bg-primary/15 text-primary scale-105 shadow-lg"
            )}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            data-testid="button-mobile-menu"
          >
            <div className="relative flex items-center justify-center">
              {/* Animated hamburger/close icon - larger for better visibility */}
              <div className={cn(
                "transition-all duration-300 ease-in-out",
                isMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
              )}>
                {isMenuOpen ? (
                  <X size={28} className="drop-shadow-sm" strokeWidth={2.5} />
                ) : (
                  <MenuIcon size={28} className="drop-shadow-sm" strokeWidth={2.5} />
                )}
              </div>
              
              {/* Pulse indicator when open */}
              {isMenuOpen && (
                <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse"></div>
              )}
            </div>
            
            {/* Menu notification badge */}
            <div className={cn(
              "absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full transition-all duration-300",
              isMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-60 animate-pulse"
            )}></div>
          </button>
        </div>
        
        {/* Enhanced Mobile menu with swipe support - Apple-level Quality */}
        <div 
          className={cn(
            "lg:hidden pt-6 pb-6 space-y-2 absolute left-0 right-0 bg-gradient-to-b from-card/98 via-card/95 to-card/92 backdrop-blur-xl border-b border-border/50 px-6 shadow-2xl",
            "transition-all duration-500 ease-out will-change-transform",
            "max-h-[85vh] overflow-y-auto overscroll-behavior-contain",
            isMenuOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-full opacity-0 scale-95 pointer-events-none"
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Swipe indicator - iOS style */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 bg-border/60 rounded-full"></div>
          </div>
          {navLinks.map((link, idx) => (
            <div key={idx} className="transform transition-all duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
              {link.hasDropdown ? (
                <div className="space-y-3">
                  <button 
                    className={cn(
                      "flex items-center justify-between w-full rounded-lg text-muted-foreground transition-all duration-300 touch-target",
                      "min-h-[48px] py-3 px-4",
                      "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/5 hover:text-foreground hover:shadow-md",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-primary/5",
                      "active:scale-98",
                      location.startsWith(link.path) && "text-foreground bg-primary/10 shadow-sm"
                    )}
                    onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
                    data-testid={`button-mobile-dropdown-${link.name.toLowerCase()}`}
                  >
                    <span className="font-medium text-base">{link.name}</span>
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-all duration-300 text-primary flex-shrink-0",
                      dropdownOpen === link.name && "transform rotate-180 scale-110"
                    )} />
                  </button>
                  
                  <div className={cn(
                    "ml-6 pl-4 border-l-2 border-gradient-to-b from-primary/50 to-accent/30 space-y-1 overflow-hidden transition-all duration-300",
                    "mobile-dropdown-enhanced mobile-optimized",
                    dropdownOpen === link.name ? "max-h-96 opacity-100 visible mt-2" : "max-h-0 opacity-0 invisible"
                  )}>
                    {link.dropdownItems.map((item, i) => (
                      <Link key={i} href={item.path}>
                        <span 
                          className={cn(
                            "block rounded-md text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer touch-target",
                            "min-h-[44px] py-3 px-4 text-base",
                            "hover:bg-gradient-to-r hover:from-secondary/10 hover:to-primary/5 hover:translate-x-1 hover:shadow-sm",
                            "focus:outline-none focus:ring-1 focus:ring-primary/30",
                            "active:scale-98",
                            location === item.path && "text-primary bg-primary/5 translate-x-1 shadow-sm"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                          data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.path}>
                  <span 
                    className={cn(
                      "block rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer font-medium touch-target",
                      "min-h-[48px] py-3 px-4 text-base",
                      "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/5 hover:shadow-md",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-primary/5 mobile-focus-enhanced",
                      "active:scale-98 active:bg-primary/15 mobile-touch-target touch-feedback mobile-optimized",
                      location === link.path && "text-foreground bg-primary/10 shadow-sm"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                    data-testid={`link-mobile-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
          
          {/* Enhanced Mobile CTA Buttons - Apple-level Quality */}
          <div className="pt-6 border-t border-gradient-to-r from-border/20 via-border/60 to-border/20 mt-4 space-y-3">
            <Link href="/small-business-upgrade">
              <span 
                className={cn(
                  "block bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden group touch-target",
                  "min-h-[52px] py-4 px-6",
                  "border border-blue-400/50 rounded-xl font-['Orbitron'] font-bold text-base tracking-wider text-center cursor-pointer",
                  "hover:border-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-500",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400/50 mobile-focus-enhanced",
                  "active:scale-98 mobile-touch-target mobile-cta-shimmer mobile-optimized mobile-touch-enhanced"
                )}
                onClick={() => setIsMenuOpen(false)}
                data-testid="button-mobile-cta-business-upgrade"
              >
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-xl border border-blue-400/30 animate-pulse group-hover:border-blue-300/50"></div>
                
                <span className="relative z-10 text-white flex items-center justify-center gap-2">
                  <span>🚀</span>
                  Small Business Upgrade
                </span>
                
                {/* Corner highlights */}
                <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-blue-300 opacity-70 group-hover:opacity-100 transition-opacity"></div>
              </span>
            </Link>
            
            <Link href="/login">
              <span 
                className={cn(
                  "block bg-gradient-to-br from-slate-800 via-blue-800 to-slate-700 relative overflow-hidden group touch-target",
                  "min-h-[48px] py-3 px-4",
                  "border border-blue-400/50 rounded-lg font-['Orbitron'] font-bold text-sm tracking-wider text-center cursor-pointer",
                  "hover:border-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-blue-400/50 mobile-focus-enhanced",
                  "active:scale-98 mobile-touch-target mobile-cta-shimmer mobile-optimized mobile-touch-enhanced"
                )}
                onClick={() => setIsMenuOpen(false)}
                data-testid="button-mobile-admin"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/15 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out"></div>
                
                <span className="relative z-10 text-white flex items-center justify-center gap-2">
                  <span>🔐</span>
                  ADMIN
                </span>
              </span>
            </Link>
            
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setIsMenuOpen(false);
                }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300",
                  "hover:bg-gradient-to-br hover:from-muted/40 hover:to-muted/20 hover:scale-110 hover:shadow-lg",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:scale-110",
                  "active:scale-95"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 transition-transform duration-300 hover:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 transition-transform duration-300 hover:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
