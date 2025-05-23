'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full">
      <div className="relative flex flex-col items-center w-full h-full">
        {/* Entropy animation */}
        <Entropy className="rounded-lg" size={650} />
        
        {/* Quote overlay - positioned on top of the animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 max-w-lg text-center z-10">
          <div className="backdrop-blur-md backdrop-saturate-150 bg-gradient-to-br from-slate-900/80 to-blue-900/70 p-4 rounded-lg border border-blue-500/30 shadow-lg">
            <p className="font-semibold text-[18px] leading-relaxed tracking-wide">
              <span className="text-blue-300">&ldquo;Every Prospect Is Surrounded by Noise.</span> 
              <br />
              <span className="text-white">Fusion Cuts Through It and Closes the Loop.&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}