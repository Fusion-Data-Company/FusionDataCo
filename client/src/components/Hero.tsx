import { EntropyDemo } from "./demos/EntropyDemo";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Shield, ChevronRight, Star, Lock } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverButton1, setHoverButton1] = useState(false);
  const [hoverButton2, setHoverButton2] = useState(false);
  const controls = useAnimation();
  const textRef = useRef<HTMLHeadingElement>(null);

  // Animate on mount
  useEffect(() => {
    setIsVisible(true);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
    
    // Text shimmer effect
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.classList.add('text-shimmer');
        setTimeout(() => {
          if (textRef.current) {
            textRef.current.classList.remove('text-shimmer');
          }
        }, 2000);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [controls]);
  
  return (
    <div className="relative bg-[#050510] text-white overflow-hidden min-h-screen">
      {/* Superior ambient effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iYSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9Ii4wMDUiIG51bU9jdGF2ZXM9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHJlc3VsdD0ibm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgLjA1IDAiLz48L2ZpbHRlcj48L2RlZnM+PHBhdGggZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMjUiIGQ9Ik0wIDBoMTYwMHY5MDBIMHoiLz48L3N2Zz4=')]" />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      {/* Enterprise-grade ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px]" />
      <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[100px]" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgNjBIMFYwaDYwdjYwem0tMjAgMEgwVjIwaDQwdjQwem0yMC00MEgxMFYxMGgzMHYxMHoiIGZpbGw9IiMxMTEyMjciIGZpbGwtb3BhY2l0eT0iMC4wMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-40" />
      
      {/* Advanced corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-blue-600/70 to-transparent" />
      <div className="absolute top-0 left-0 h-32 w-px bg-gradient-to-b from-blue-600/70 to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-px bg-gradient-to-l from-blue-600/70 to-transparent" />
      <div className="absolute top-0 right-0 h-32 w-px bg-gradient-to-b from-blue-600/70 to-transparent" />
      <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-blue-600/70 to-transparent" />
      <div className="absolute bottom-0 left-0 h-32 w-px bg-gradient-to-t from-blue-600/70 to-transparent" />
      <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-l from-blue-600/70 to-transparent" />
      <div className="absolute bottom-0 right-0 h-32 w-px bg-gradient-to-t from-blue-600/70 to-transparent" />
      
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        {/* Left column: Text content */}
        <div className="relative z-10 px-10 py-24 flex flex-col items-start justify-center text-left">
          {/* Premium Enterprise Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6 group"
          >
            <div className="relative inline-flex items-center">
              {/* Subtle glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/40 via-indigo-500/40 to-blue-700/40 rounded-xl opacity-75 blur-[6px] group-hover:opacity-100 transition duration-700"></div>
              
              {/* Badge container with premium styling */}
              <div className="relative z-10 inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-950/90 border border-blue-600/30 backdrop-blur-md shadow-lg">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-500/70"></div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-500/70"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-blue-500/70"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-500/70"></div>
                
                {/* Icon with enhanced visual treatment */}
                <div className="mr-2.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-600/30 flex items-center justify-center">
                  <Star className="h-3 w-3 text-blue-400" fill="rgba(96, 165, 250, 0.6)" />
                </div>
                
                {/* Premium typography */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300">ENTERPRISE SOLUTION</span>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-white inline-block enterprise-text-shadow leading-tight">Enterprise-Grade</span><br/>
              <div className="relative">
                <motion.span 
                  ref={textRef}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 inline-block enterprise-text" 
                >
                  Marketing Platform
                </motion.span>
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              </div>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl leading-relaxed max-w-xl mb-12 text-slate-300/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A comprehensive <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400 enterprise-text-shadow">solution</span> that combines advanced <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400 enterprise-text-shadow">CRM</span>, analytics, and{' '}  
            <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400 enterprise-text-shadow">AI-powered workflows</span> to transform your <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400 enterprise-text-shadow">business operations</span> and <span className="text-transparent bg-clip-text font-medium bg-gradient-to-r from-blue-400 to-cyan-400 enterprise-text-shadow">accelerate growth</span>.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Premium Start Trial Button - Titanium Effect */}
            <div className="relative group">
              {/* The ambient glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded-lg opacity-70 group-hover:opacity-100 blur-md transition-all duration-500 group-hover:duration-200 animate-pulse-slow"></div>
              
              {/* Titanium/metallic surface with reflective highlights */}
              <Button 
                size="lg" 
                className="relative overflow-hidden h-14 px-8 z-10 border-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
                onMouseEnter={() => setHoverButton1(true)}
                onMouseLeave={() => setHoverButton1(false)}
              >
                {/* Metallic reflective surface effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-transparent to-blue-300/5"></div>
                
                {/* Horizontal light reflection sweep */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-[200%] h-full absolute top-0 -left-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent transform translate-x-[60%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                </div>
                
                {/* Glass highlight at the top */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-blue-300/30"></div>
                <div className="absolute top-[1px] left-0 right-0 h-[1px] bg-blue-300/20"></div>
                <div className="absolute top-[2px] left-0 right-0 h-[1px] bg-blue-300/10"></div>
                
                {/* Button text and icon */}
                <span className="relative z-10 flex items-center gap-3 font-medium text-base text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">Start Enterprise Trial</span>
                  <AnimatePresence>
                    {hoverButton1 ? (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="text-blue-300"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-blue-300"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </Button>
            </div>
            
            {/* Premium Schedule Demo Button - Digital Bowling Ball / Marble Effect */}
            <div className="relative group">
              {/* Subtle ambient glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-blue-500/30 rounded-lg opacity-70 group-hover:opacity-100 blur-md transition-all duration-500"></div>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="relative h-14 px-8 border-0 z-10 overflow-hidden"
                onMouseEnter={() => setHoverButton2(true)}
                onMouseLeave={() => setHoverButton2(false)}
              >
                {/* Marble/swirl effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay" 
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundSize: '150%',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                </div>
                
                {/* Swirl patterns - digital bowling ball effect */}
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent rotate-45 transform -translate-x-16 -translate-y-24 mix-blend-screen"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600/20 to-transparent rotate-45 transform translate-x-12 translate-y-12 mix-blend-screen"></div>
                
                {/* Highlight reflections */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3 font-medium text-base">
                  <AnimatePresence>
                    {hoverButton2 ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full p-1 text-white"
                      >
                        <Lock className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full p-1 text-white"
                      >
                        <Shield className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-100">Schedule Enterprise Demo</span>
                </span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 text-sm text-slate-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex h-7 items-center justify-center rounded-full bg-slate-800/50 border border-slate-700/30 w-7">
              <Lightbulb className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span>No credit card required. Enterprise-level security.</span>
          </motion.div>
          
          {/* Testimonial */}
          <motion.div 
            className="max-w-md backdrop-blur-xl backdrop-saturate-150 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 p-8 rounded-2xl border border-slate-700/20 shadow-2xl shadow-blue-900/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 text-blue-400" fill="#38bdf8" />
              ))}
            </div>
            <p className="italic text-slate-300 mb-5 font-light leading-relaxed">
              "Fusion Data Co has transformed our marketing operations with enterprise-grade tools that were previously only available to Fortune 500 companies."
            </p>
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-xl font-semibold">JD</div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">James Donovan</span>
                <span className="text-sm text-slate-400">CMO, Horizon Financial</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right column: EntropyDemo component - DO NOT MODIFY */}
        <motion.div 
          className="hidden md:flex items-center justify-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.0 }}
        >
          {/* Add premium frame around the entropy animation */}
          <div className="absolute inset-0 m-auto w-[calc(100%-64px)] h-[calc(100%-64px)] rounded-2xl border border-slate-700/20 bg-gradient-to-b from-slate-900/20 to-transparent backdrop-blur-sm" />
          <EntropyDemo />
        </motion.div>
        
        {/* Mobile version of EntropyDemo - only shown on small screens */}
        <motion.div 
          className="absolute inset-0 w-full h-full -z-0 md:hidden opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.4 : 0 }}
          transition={{ duration: 1.0 }}
        >
          <EntropyDemo />
        </motion.div>
      </div>
      
      {/* Premium live counter at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative group">
          {/* Subtle glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-indigo-600/30 to-blue-700/30 rounded-xl opacity-60 blur-[5px] group-hover:opacity-100 transition duration-700"></div>
          
          {/* Premium counter container */}
          <div className="relative px-5 py-2 rounded-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border border-blue-500/20 shadow-lg flex items-center gap-3">
            {/* Pulse animation */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping"></div>
              <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-green-400 shadow-inner shadow-green-900/10"></div>
            </div>
            
            {/* Premium styled text */}
            <div className="flex items-center">
              <span className="text-lg font-bold mr-1.5 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-300">7,258</span>
              <span className="text-xs tracking-wide text-slate-300 font-medium">enterprises using this platform now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add CSS to index.css to support these Enterprise-level effects
const cssToAdd = `
@keyframes textShimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.text-shimmer {
  background: linear-gradient(90deg, #60a5fa, #818cf8, #3b82f6, #60a5fa);
  background-size: 300% 100%;
  animation: textShimmer 2s ease-in-out;
  background-clip: text;
  -webkit-background-clip: text;
}

.enterprise-text-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.enterprise-text {
  letter-spacing: -0.01em;
}

.enterprise-button {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.4) inset;
  transition: all 0.3s ease;
}

.enterprise-button:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.5) inset;
  transform: translateY(-1px);
}

.enterprise-secondary-button {
  box-shadow: 0 1px 2px rgba(30, 41, 59, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.2) inset;
  transition: all 0.3s ease;
}

.enterprise-secondary-button:hover {
  box-shadow: 0 2px 6px rgba(30, 41, 59, 0.7), 0 0 0 1px rgba(59, 130, 246, 0.4) inset;
  border-color: rgba(59, 130, 246, 0.5);
}
`;
