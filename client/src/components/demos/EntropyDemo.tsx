'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full">
      <div className="flex flex-col items-center w-full h-full">
        <Entropy className="rounded-lg" size={650} />
        <div className="mt-3 text-center">
          <div className="font-mono text-[12px] leading-relaxed">
            <p className="italic text-gray-400/60 tracking-wide">
              &ldquo;Order and chaos dance &mdash;
              <span className="opacity-70">digital poetry in motion.&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}