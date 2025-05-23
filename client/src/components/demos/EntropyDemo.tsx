'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full pb-4">
      <div className="relative flex flex-col items-center w-full">
        {/* Entropy animation */}
        <Entropy className="rounded-lg" size={650} />
        
        {/* Logo element to add in the space - positioned right below animation */}
        <div className="mt-4 flex flex-col items-center">
          {/* Quote box */}
          <div className="backdrop-blur-md backdrop-saturate-150 bg-gradient-to-br from-slate-900/80 to-blue-900/70 p-4 rounded-xl border border-blue-500/30 shadow-lg w-[90%] max-w-lg">
            <p className="font-semibold text-[18px] leading-relaxed tracking-wide text-center">
              <span className="text-blue-300">&ldquo;Every Prospect Is Surrounded by Noise.</span> 
              <br />
              <span className="text-white">Fusion Cuts Through It and Closes the Loop.&rdquo;</span>
            </p>
          </div>
          
          {/* Premium Company logo below the quote */}
          <div className="mt-4 flex items-center justify-center">
            <div className="relative group">
              {/* Ambient glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 rounded-xl opacity-75 blur-lg group-hover:opacity-100 transition duration-1000"></div>
              
              {/* Logo container with glassmorphism */}
              <div className="relative px-7 py-3 bg-black border border-blue-800/30 rounded-xl backdrop-blur-md flex items-center justify-center overflow-hidden">
                {/* Animated gradient accent line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70"></div>
                
                {/* Logo mark */}
                <div className="mr-3 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center overflow-hidden">
                  <div className="w-8 h-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full transform translate-x-1.5 translate-y-1.5"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1.5 translate-y-1.5"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full transform translate-x-1.5 -translate-y-1.5"></div>
                      <div className="w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1.5 -translate-y-1.5"></div>
                    </div>
                    <div className="absolute inset-0 border-2 border-white/40 rounded-sm transform rotate-45"></div>
                  </div>
                </div>
                
                {/* Logo text */}
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">FUSION</span>
                    <span className="text-xl font-semibold text-white ml-1">DATA</span>
                  </div>
                  <span className="text-[10px] tracking-widest text-blue-400/80 uppercase mt-0.5">Enterprise solutions</span>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-blue-400/40"></div>
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-blue-400/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}