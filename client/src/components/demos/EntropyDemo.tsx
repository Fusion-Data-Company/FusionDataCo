'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent text-white h-full w-full relative">
      <div className="flex flex-col items-center h-full w-full justify-center">
        {/* Large entropy animation for hero section */}
        <div className="relative">
          <Entropy className="rounded-lg" size={800} />
          
          {/* Elegant overlay frame */}
          <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none" />
          <div className="absolute -inset-2 rounded-xl border border-blue-500/20 pointer-events-none" />
        </div>
        
        {/* Styled quote with elegant typography */}
        <div className="mt-8 text-center max-w-md">
          <div className="space-y-2">
            <p className="italic text-slate-300/90 tracking-wide font-light text-lg leading-relaxed">
              &ldquo;Order and chaos dance &mdash;
              <span className="text-slate-400/80">digital poetry in motion.&rdquo;</span>
            </p>
            
            {/* Elegant underline */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}