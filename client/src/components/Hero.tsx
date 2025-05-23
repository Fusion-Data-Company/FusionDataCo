import { EntropyDemo } from "./demos/EntropyDemo";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-[120px]" />
      
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        {/* Left column: Text content */}
        <div className="relative z-10 px-8 py-24 flex flex-col items-start justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-white">Enterprise-Grade</span><br/>
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              >
                Marketing Platform
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl max-w-xl mb-10 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            A comprehensive solution that combines advanced CRM, analytics, and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> AI-powered workflows</span> to transform your business operations and accelerate growth.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-900/20 border-0 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Enterprise Trial
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-blue-500/30 text-white hover:bg-blue-900/20 hover:border-blue-400/80 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule Enterprise Demo
                <motion.span
                  initial={{ opacity: 0.6, scale: 1 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Shield className="h-4 w-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-sm text-blue-300/60 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Lightbulb className="h-4 w-4" />
            <span>No credit card required. Enterprise-level security.</span>
          </motion.div>
          
          {/* Testimonial */}
          <motion.div 
            className="max-w-md backdrop-blur-md backdrop-saturate-150 bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-xl shadow-blue-900/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <p className="italic text-gray-300 mb-4">
              "Fusion Data Co has transformed our marketing operations with enterprise-grade tools that were previously only available to Fortune 500 companies."
            </p>
            <div className="flex items-start">
              <div className="flex flex-col">
                <span className="font-semibold text-white">James Donovan</span>
                <span className="text-sm text-blue-300/60">CMO, Horizon Financial</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right column: EntropyDemo component - DO NOT MODIFY */}
        <motion.div 
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <EntropyDemo />
        </motion.div>
        
        {/* Mobile version of EntropyDemo - only shown on small screens */}
        <motion.div 
          className="absolute inset-0 w-full h-full -z-0 md:hidden opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.4 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <EntropyDemo />
        </motion.div>
      </div>
    </div>
  );
}
