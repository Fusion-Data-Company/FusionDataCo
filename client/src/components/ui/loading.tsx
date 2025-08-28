import * as React from "react"
import { cn } from "@/lib/utils"

interface FusionSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function FusionSpinner({ size = "md", className }: FusionSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3", 
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4"
  }

  return (
    <div 
      className={cn("fusion-spinner gpu-accelerated", sizeClasses[size], className)}
      role="status"
      aria-label="Loading content"
    />
  )
}

interface FusionSkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function FusionSkeleton({ className, children }: FusionSkeletonProps) {
  return (
    <div 
      className={cn("skeleton-enhanced rounded-md gpu-accelerated", className)}
      role="status"
      aria-busy="true"
      aria-label="Content loading"
    >
      {children}
    </div>
  )
}

interface FusionPulseProps {
  children: React.ReactNode
  className?: string
}

export function FusionPulse({ children, className }: FusionPulseProps) {
  return (
    <div className={cn("fusion-pulse", className)}>
      {children}
    </div>
  )
}

interface LoadingStateProps {
  isLoading: boolean
  children: React.ReactNode
  skeleton?: React.ReactNode
  className?: string
}

export function LoadingState({ isLoading, children, skeleton, className }: LoadingStateProps) {
  if (isLoading) {
    return (
      <div className={cn("animate-pulse", className)}>
        {skeleton || (
          <FusionSkeleton className="h-20 w-full">
            <div className="flex items-center justify-center h-full">
              <FusionSpinner size="lg" />
            </div>
          </FusionSkeleton>
        )}
      </div>
    )
  }
  
  return <>{children}</>
}

// Pre-built skeleton templates
export function CardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <FusionSkeleton className="h-10 w-10 rounded-full" />
      <FusionSkeleton className="h-6 w-3/4" />
      <FusionSkeleton className="h-4 w-full" />
      <FusionSkeleton className="h-4 w-2/3" />
    </div>
  )
}

export function ButtonSkeleton() {
  return <FusionSkeleton className="h-10 w-24 rounded-md" />
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <FusionSkeleton 
          key={i} 
          className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} 
        />
      ))}
    </div>
  )
}