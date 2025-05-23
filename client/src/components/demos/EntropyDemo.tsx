'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* Entropy animation */}
        <div className="mb-16">
          <Entropy className="rounded-lg" size={650} />
        </div>
        
        {/* Quote positioned below the entropy element */}
        <div className="absolute bottom-6 w-[90%] max-w-lg z-10">
          <div className="backdrop-blur-xl backdrop-saturate-180 bg-gradient-to-br from-slate-900/90 via-blue-900/20 to-slate-900/90 p-4 rounded-xl border border-blue-500/40 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-blue-400/10 animate-shimmer"></div>
            </div>
            <p className="font-semibold text-[18px] leading-relaxed tracking-wide text-center relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-200">&ldquo;Every Prospect Is Surrounded by Noise.</span> 
              <br />
              <span className="text-white">Fusion Cuts Through It and Closes the Loop.&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}