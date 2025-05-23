import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Entropy } from "@/components/ui/entropy";
import { useEffect, useState } from "react";

export default function Hero() {
  // Calculate the size based on viewport for proper fullscreen display
  const [size, setSize] = useState(800);
  
  useEffect(() => {
    // Set initial size based on viewport
    const updateSize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setSize(Math.max(windowWidth, windowHeight));
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* Entropy animation positioned as the hero background */}
      <div className="absolute inset-0 overflow-hidden">
        <Entropy size={size} className="w-full h-full" />
      </div>
      
      {/* Content overlay */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl relative">
          <div className="absolute -left-6 -top-6 w-12 h-12 border border-primary/40 rounded-lg"></div>
          <div className="absolute -right-10 -bottom-10 w-20 h-20 border border-accent/30 rounded-lg"></div>
          
          <h1 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Enterprise-Grade</span>{" "}
            <span className="text-primary text-shadow-titanium relative">
              Marketing Platform
              <span className="absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-primary/70 to-transparent"></span>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-muted-foreground">
            A <span className="text-accent font-semibold">comprehensive solution</span> that combines advanced CRM, analytics, and <span className="text-primary font-semibold">AI-powered workflows</span> to transform your business operations and accelerate growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <Link href="/pricing">
              <span className={cn(
                "px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium",
                "shadow-lg hover:shadow-xl transition-shadow duration-300",
                "hover-edge-glow",
                "text-center cursor-pointer inline-block relative group overflow-hidden",
              )}>
                <span className="relative z-10">Start Enterprise Trial</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </span>
            </Link>
            <Link href="/#demo">
              <span className={cn(
                "px-8 py-4 bg-transparent border border-border text-foreground",
                "rounded-md font-medium",
                "hover:bg-muted/20 hover:border-primary/50",
                "transition-all duration-300",
                "text-center cursor-pointer inline-block",
              )}>
                Schedule Enterprise Demo
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="titanium-panel p-1.5 rounded-md bg-card/40">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">No credit card required. Enterprise-level security.</p>
          </div>
          
          <div className="relative max-w-md mt-12">
            {/* Separate ambient glow component behind the card */}
            <div className="absolute -z-10 w-[102%] h-[102%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-full h-full rounded-lg bg-primary/5">
                <div className="w-full h-full rounded-lg blur-[15px] bg-primary/15"></div>
              </div>
            </div>
            
            {/* Solid titanium card */}
            <div className="titanium-panel p-4 rounded-lg relative">
              <p className="text-sm text-foreground font-medium">
                "Fusion Data Co has transformed our marketing operations with enterprise-grade tools that were previously only available to Fortune 500 companies."
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">JD</div>
                <div>
                  <p className="text-xs font-medium text-foreground">James Donovan</p>
                  <p className="text-xs text-muted-foreground">CMO, Horizon Financial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
