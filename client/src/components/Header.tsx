import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/#solutions" },
    { name: "Social Media", path: "/social-media" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-opacity-20 border-[#00ffff] dark:border-[#00ffff]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="flex items-center text-[#14ffc8] font-['Orbitron'] text-xl font-bold [text-shadow:0_0_5px_#14ffc8]">
              FUSION<span className="text-white">DATA</span>
              <span className="text-[#00ffff] [text-shadow:0_0_5px_#00ffff]">CO</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span className={cn(
                  "text-white hover:text-[#14ffc8] transition-colors duration-300 cursor-pointer",
                  location === link.path && "text-[#14ffc8]"
                )}>
                  {link.name}
                </span>
              </Link>
            ))}
            <Link href="/#demo">
              <span className="ml-4 px-4 py-2 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium hover:shadow-[0_0_5px_#14ffc8,0_0_10px_#14ffc8] transition-all duration-300 cursor-pointer">
                Get Started
              </span>
            </Link>
          </nav>
          <button 
            className="md:hidden text-white hover:text-[#14ffc8]" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={cn("md:hidden pt-4 pb-2 space-y-3", !isMenuOpen && "hidden")}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span 
                className={cn(
                  "block py-2 text-white hover:text-[#14ffc8] cursor-pointer",
                  location === link.path && "text-[#14ffc8]"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </span>
            </Link>
          ))}
          <Link href="/#demo">
            <span 
              className="block py-2 px-4 bg-[#14ffc8] text-[#0b0b0d] rounded-md font-medium w-full text-center cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
