'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent text-white h-full w-full">
      <div className="relative flex flex-col items-center w-full h-full">
        {/* Entropy animation - Direct positioning for better performance */}
        <Entropy className="rounded-lg shadow-2xl" size={700} />
      </div>
    </div>
  )
}