'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex flex-col items-center justify-center text-white h-full w-full relative overflow-hidden">
      <div className="relative flex flex-col items-center w-full h-full">
        {/* Entropy animation - Larger size to fill the space better */}
        <Entropy className="rounded-lg" size={800} />
      </div>
    </div>
  )
}