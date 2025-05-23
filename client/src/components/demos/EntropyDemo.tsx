'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full">
      <div className="flex flex-col items-center w-full h-full">
        <Entropy className="rounded-lg" size={650} />
        <div className="mt-3 text-center">
          <div className="font-medium text-[15px] leading-relaxed">
            <p className="text-blue-300 tracking-wide">
              &ldquo;Every Prospect Is Surrounded by Noise. 
              <br />
              <span className="text-white">Fusion Cuts Through It and Closes the Loop.&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}