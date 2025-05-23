import React from "react";
import { cn } from "@/lib/utils";

type GlowColor = "blue" | "purple" | "green" | "amber" | "none";

interface TitaniumCardProps {
  children: React.ReactNode;
  glowColor: GlowColor;
  className?: string;
}

export function TitaniumCard({ 
  children, 
  glowColor = "blue", 
  className 
}: TitaniumCardProps) {
  return (
    <div className="card-with-glow relative rounded-xl">
      {/* Ambient glow layer - separated from the card for true depth */}
      {glowColor !== "none" && (
        <div className={`card-ambient-glow card-ambient-glow-${glowColor}`}></div>
      )}
      
      {/* Titanium panel with brushed metal effect */}
      <div className={cn("titanium-panel rounded-xl", className)}>
        {children}
      </div>
    </div>
  );
}