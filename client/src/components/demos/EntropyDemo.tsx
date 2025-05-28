'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full p-8">
      <div className="flex flex-col items-center">
        <Entropy className="rounded-lg" size={600} />
        <div className="mt-8 text-center max-w-2xl mx-auto relative z-50">
          {/* Background for text readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl -z-10" />
          
          <div className="space-y-4 leading-relaxed p-6 relative z-10">
            {/* Main headline with gradient effect */}
            <h3 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-green-300">
                Contact, Connect, Convert, Collect...
              </span> 📈
            </h3>
            
            {/* Supporting text with enhanced contrast */}
            <div className="space-y-3 text-white text-base font-medium drop-shadow-md">
              <p className="italic text-gray-100">
                Every potential lead is being pulled at from <span className="text-orange-300 font-semibold">all directions</span>. 🎯
              </p>
              <p className="text-gray-100">
                At <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-green-300 font-bold">Fusion Data Co.</span>, we focus on more than lead generation.
              </p>
              <p className="text-green-200 font-semibold">
                We focus on lead <em className="text-green-100">conversion</em> and <em className="text-green-100">continuation</em> of services. ✨
              </p>
            </div>
            
            {/* Elegant accent line */}
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-blue-300/80 to-transparent mx-auto mt-6" />
          </div>
        </div>
      </div>
    </div>
  )
}