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
          
          {/* Company logo below the quote */}
          <div className="mt-4 flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 p-[2px] rounded-full">
              <div className="bg-black/80 backdrop-blur-sm p-1.5 rounded-full flex items-center justify-center">
                <div className="text-2xl font-semibold tracking-widest flex items-center space-x-1">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">FUSION</span>
                  <span className="text-white text-opacity-90">DATA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}