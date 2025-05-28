'use client'

import * as React from "react"
import { Entropy } from "@/components/ui/entropy"

export function EntropyDemo() {
  return (
    <div className="flex items-center justify-center text-white h-full w-full relative overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Entropy animation - Full size to fill the entire right section */}
        <Entropy className="rounded-lg" size={1200} />
      </div>
    </div>
  )
}