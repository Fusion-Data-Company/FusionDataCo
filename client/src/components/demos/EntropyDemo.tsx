'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full p-8">
      <div className="flex flex-col items-center">
        <Entropy className="rounded-lg" size={600} />
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <div className="space-y-4 leading-relaxed">
            {/* Main headline with gradient effect */}
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-green-300 tracking-wide">
              Contact, Connect, Convert, Collect... 📈
            </h3>
            
            {/* Supporting text with elegant styling */}
            <div className="space-y-3 text-gray-300/90 text-base font-light">
              <p className="italic">
                Every potential lead is being pulled at from <span className="text-orange-400">all directions</span>. 🎯
              </p>
              <p>
                At <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 font-medium">Fusion</span>, we focus on more than lead generation.
              </p>
              <p className="text-green-300/90 font-medium">
                We focus on lead <em>conversion</em> and <em>continuation</em> of services. ✨
              </p>
            </div>
            
            {/* Elegant accent line */}
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent mx-auto mt-6" />
          </div>
        </div>
      </div>
    </div>
  )
}