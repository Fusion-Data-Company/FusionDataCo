import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MenuIcon, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
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
  };

  const toggleDropdown = (linkName: string) => {
    setDropdownOpen(dropdownOpen === linkName ? null : linkName);
  };

  const navLinks = [
    { name: "Home", path: "/" },
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
        { name: "Social Media", path: "/social-media" },
        { name: "Campaign Builder", path: "/campaign-builder" },
        { name: "Lead Magnet", path: "/lead-magnet" },
        { name: "CRM", path: "/crm" },
      ]
    },
    { name: "Leads", path: "/leads" },
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
                      "relative group px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer",
                      "hover:bg-slate-800/50 hover:border hover:border-blue-400/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                      location === link.path && "bg-slate-800/30 border border-blue-400/20"
                    )}>
                      <span className="cyberpunk-text-animate-nav">
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
          
          <button 
            className="lg:hidden text-foreground hover:text-primary transition-colors duration-200" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={cn(
          "lg:hidden pt-5 pb-3 space-y-3 absolute left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border/40 px-4 shadow-lg",
          "transition-all duration-300",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}>
          {navLinks.map((link, idx) => (
            <div key={idx}>
              {link.hasDropdown ? (
                <div className="space-y-2">
                  <button 
                    className={cn(
                      "flex items-center justify-between w-full py-3 text-muted-foreground transition-colors duration-200",
                      location.startsWith(link.path) && "text-foreground"
                    )}
                    onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      dropdownOpen === link.name && "transform rotate-180"
                    )} />
                  </button>
                  
                  <div className={cn(
                    "pl-4 border-l-2 border-border space-y-2 transition-all duration-200",
                    dropdownOpen ? "h-auto opacity-100 visible" : "h-0 opacity-0 invisible"
                  )}>
                    {link.dropdownItems.map((item, i) => (
                      <Link key={i} href={item.path}>
                        <span 
                          className={cn(
                            "block py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer",
                            location === item.path && "text-primary"
                          )}
                          onClick={() => setIsMenuOpen(false)}
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
                      "block py-3 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer",
                      location === link.path && "text-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
          
          <div className="pt-2 flex items-center justify-between gap-3">
            <Link href="/#demo">
              <span 
                className={cn(
                  "block py-3 px-4 bg-primary text-primary-foreground rounded-md font-medium text-center cursor-pointer shadow-md",
                  "hover:shadow-lg transition-all duration-200 grow"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Get Enterprise Demo
              </span>
            </Link>
            
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setIsMenuOpen(false);
              }}
              className="p-3 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors duration-200"
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
          </div>
        </div>
      </div>
    </header>
  );
}
