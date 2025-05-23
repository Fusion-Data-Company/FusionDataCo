import { EntropyDemo } from "./demos/EntropyDemo";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        
        {/* Left column: Text content */}
        <div className="relative z-10 px-8 py-24 flex flex-col items-start justify-center text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Enterprise-Grade</span><br/>
            <span className="text-blue-500">Marketing Platform</span>
          </h1>
          
          <p className="text-xl max-w-xl mb-10 text-gray-300">
            A comprehensive solution that combines advanced CRM, analytics, and 
            <span className="text-blue-400"> AI-powered workflows</span> to transform your business operations and accelerate growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Enterprise Trial
            </Button>
            <Button variant="outline" size="lg" className="border-gray-500 text-white hover:bg-gray-800">
              Schedule Enterprise Demo
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Lightbulb className="h-4 w-4" />
            <span>No credit card required. Enterprise-level security.</span>
          </div>
          
          {/* Testimonial */}
          <div className="max-w-md bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <p className="italic text-gray-300 mb-4">
              "Fusion Data Co has transformed our marketing operations with enterprise-grade tools that were previously only available to Fortune 500 companies."
            </p>
            <div className="flex items-start">
              <div className="flex flex-col">
                <span className="font-semibold text-white">James Donovan</span>
                <span className="text-sm text-gray-400">CMO, Horizon Financial</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: EntropyDemo component - DO NOT MODIFY */}
        <div className="hidden md:flex items-center justify-center">
          <EntropyDemo />
        </div>
        
        {/* Mobile version of EntropyDemo - only shown on small screens */}
        <div className="absolute inset-0 w-full h-full -z-0 md:hidden opacity-40">
          <EntropyDemo />
        </div>
      </div>
    </div>
  );
}
