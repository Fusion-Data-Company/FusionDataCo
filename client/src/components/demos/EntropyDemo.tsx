'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full">
      <div className="relative flex flex-col items-center w-full h-full">
        {/* Entropy animation */}
        <Entropy className="rounded-lg" size={650} />
        

      </div>
    </div>
  )
}