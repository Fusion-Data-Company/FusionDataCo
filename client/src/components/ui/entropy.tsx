'use client'
import { useEffect, useRef } from 'react'

interface EntropyProps {
  className?: string
  size?: number
}

export function Entropy({ className = "", size = 400 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Base settings
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    // Right side colors - Blue theme
    const rightSideColors = [
      '#2563eb', // bright blue
      '#0ea5e9', // bright sky blue
      '#0891b2', // bright cyan
      '#14b8a6'  // turquoise
    ]

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      color: string
      originalX: number
      originalY: number
      velocity: { x: number; y: number }
      
      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 : 2 + Math.random() * 1.5 // Variable size for right side
        this.order = order
        
        // Assign colors based on side
        if (order) {
          // Left side is white with very slight blue tint variations for visual interest
          const blueVariation = Math.floor(Math.random() * 10) // Subtle blue tinting (0-10)
          this.color = `rgb(255, 255, ${245 + blueVariation})` 
        } else {
          // Right side has random colors from the theme
          const colorIndex = Math.floor(Math.random() * rightSideColors.length)
          
          // Occasionally use a brighter version of the color (25% chance)
          if (Math.random() < 0.25) {
            const baseColor = rightSideColors[colorIndex]
            
            // Parse and brighten the hex color
            const r = Math.min(255, parseInt(baseColor.substring(1, 3), 16) + 30)
            const g = Math.min(255, parseInt(baseColor.substring(3, 5), 16) + 30)
            const b = Math.min(255, parseInt(baseColor.substring(5, 7), 16) + 30)
            
            this.color = `rgb(${r}, ${g}, ${b})`
          } else {
            this.color = rightSideColors[colorIndex]
          }
        }
        
        // Starting velocity - more randomized
        const velocityFactor = Math.random() * 2 + 0.5 // Between 0.5 and 2.5
        this.velocity = {
          x: (Math.random() - 0.5) * velocityFactor,
          y: (Math.random() - 0.5) * velocityFactor
        }
      }

      update() {
        // Allow particles to very frequently cross over - greatly increased probability
        const nearCenter = Math.abs(this.x - size/2) < 35; // Even wider center area
        const shouldCrossOver = Math.random() < 0.015 && nearCenter; // 15x more likely than original
        
        // Additional crossing chance for particles that were created on the divider
        const isOnDivider = Math.abs(this.originalX - size/2) < 10;
        const dividerCrossChance = isOnDivider && Math.random() < 0.08; // High chance to cross
        
        if (shouldCrossOver || dividerCrossChance) {
          // Change state when crossing
          this.order = !this.order;
          
          // Update color when crossing with transition effect
          if (this.order) {
            // Changed to ordered (left side) - white
            this.color = '#ffffff';
          } else {
            // Changed to chaotic (right side) - random color from theme
            const colorIndex = Math.floor(Math.random() * rightSideColors.length);
            this.color = rightSideColors[colorIndex];
          }
          
          // Give a much stronger push in the new direction
          const crossingForce = 2 + Math.random() * 2; // Variable force between 2-4
          this.velocity.x = this.order ? -crossingForce : crossingForce; // Strong momentum
          this.velocity.y = (Math.random() - 0.5) * 6; // Add significant vertical movement when crossing
        }
        
        if (this.order) {
          // Left side particles - more dynamic movement with larger breathing effect
          // Calculate breathing effect with larger amplitude and varied frequencies
          const time = Date.now() * 0.001;
          const breathingOffsetX = Math.sin(time + this.originalY * 0.1) * 4 + Math.cos(time * 0.5) * 2;
          const breathingOffsetY = Math.sin(time + this.originalX * 0.1) * 4 + Math.sin(time * 0.7) * 2;
          
          // Pulse effect - occasional stronger movement
          const pulseStrength = Math.sin(time * 0.3) * 0.5 + 0.5; // 0 to 1 range
          
          // If near the divider, allow stronger drift toward divider
          if (nearCenter && Math.random() < 0.03) { // Increased probability
            this.x += 1.2; // Faster movement toward divider
            // Random upward/downward drift when near divider
            this.y += (Math.random() - 0.5) * 2;
          } else {
            // More dynamic movement toward original position plus breathing offset
            const targetX = this.originalX + breathingOffsetX;
            const targetY = this.originalY + breathingOffsetY;
            this.x += (targetX - this.x) * (0.1 + pulseStrength * 0.05);
            this.y += (targetY - this.y) * (0.1 + pulseStrength * 0.05);
            
            // Add slight random movement for more life
            this.x += (Math.random() - 0.5) * 0.3;
            this.y += (Math.random() - 0.5) * 0.3;
          }
        } else {
          // Right side particles - much more chaotic movement
          // Add stronger random forces
          this.velocity.x += (Math.random() - 0.5) * 0.8; // Doubled
          this.velocity.y += (Math.random() - 0.5) * 0.8; // Doubled
          
          // Occasional bursts of speed
          if (Math.random() < 0.05) {
            this.velocity.x += (Math.random() - 0.5) * 3;
            this.velocity.y += (Math.random() - 0.5) * 3;
          }
          
          // Less dampening for faster movement
          this.velocity.x *= 0.96; // Less friction
          this.velocity.y *= 0.96; // Less friction
          
          // Update position with increased speed
          this.x += this.velocity.x * 1.2;
          this.y += this.velocity.y * 1.2;
          
          // Left side attraction - particles occasionally drift toward divider
          if (Math.random() < 0.02 && this.x > size/2 + 50) {
            this.velocity.x -= 0.3; // Gentle pull toward divider
          }
          
          // Boundary checks - allow crossing the middle, but keep within canvas
          if (this.x < 0) {
            this.x = 1;
            this.velocity.x = Math.abs(this.velocity.x) * 0.8;
          } else if (this.x > size) {
            this.x = size - 1;
            this.velocity.x = -Math.abs(this.velocity.x) * 0.8;
          }
          
          if (this.y < 0) {
            this.y = 1;
            this.velocity.y = Math.abs(this.velocity.y) * 0.8;
          } else if (this.y > size) {
            this.y = size - 1;
            this.velocity.y = -Math.abs(this.velocity.y) * 0.8;
          }
          
          // Frequent color changes
          if (Math.random() < 0.005) { // 5x more likely
            const colorIndex = Math.floor(Math.random() * rightSideColors.length);
            this.color = rightSideColors[colorIndex];
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - with extremely high density
    const particles: Particle[] = []
    const gridSize = 45 // Increased for even more particles
    const spacing = size / gridSize
    
    // Create grid of particles, left side ordered, right side chaotic
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        
        // Add some randomness to right side position
        const finalX = order ? x : x + (Math.random() - 0.5) * spacing * 2
        const finalY = order ? y : y + (Math.random() - 0.5) * spacing * 2
        
        particles.push(new Particle(finalX, finalY, order))
      }
    }
    
    // Add even more particles to the right side for more chaotic movement
    for (let i = 0; i < 600; i++) { // Doubled from 300
      const x = size/2 + Math.random() * (size/2)
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }
    
    // Add some particles directly on the divider line that will cross regularly
    const dividerParticleCount = 30
    for (let i = 0; i < dividerParticleCount; i++) {
      const y = Math.random() * size
      // Slightly offset from center to encourage crossing
      const x = size/2 + (Math.random() < 0.5 ? -5 : 5)
      // Randomly assign to either ordered or chaotic side
      const order = Math.random() < 0.5
      particles.push(new Particle(x, y, order))
    }

    let animationId = 0
    
    function animate() {
      ctx.clearRect(0, 0, size, size)
      
      // Draw a blue glowing divider line
      // Main line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Blue glow for divider
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Inner brighter line
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })
      
      // Draw connections between particles - limit the number for performance
      particles.forEach(particle => {
        // Find nearby particles
        const nearbyParticles = particles
          .filter(other => {
            if (other === particle) return false
            const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
            return distance < (particle.order ? 30 : 40)
          })
          .slice(0, 4) // Limit to 4 connections per particle for performance
        
        // Draw connections to nearby particles
        nearbyParticles.forEach(other => {
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          const maxDistance = particle.order ? 40 : 60 // Increased connection distance
          
          // Check if connection crosses the divider
          const crossesDivider = (particle.x < size/2 && other.x >= size/2) || 
                              (particle.x >= size/2 && other.x < size/2)
                              
          // Pulsating connection effect based on time
          const pulseTime = Date.now() * 0.001
          const pulseFactor = Math.sin(pulseTime * 0.7 + particle.x * 0.01 + particle.y * 0.01) * 0.5 + 1.2
          
          if (distance < maxDistance || (crossesDivider && distance < 80)) {
            let alpha = particle.order ? 
                0.25 * (1 - distance / maxDistance) * pulseFactor : // More visible on left with pulse
                0.15 * (1 - distance / maxDistance) * pulseFactor   // Less visible on right with pulse
            
            // Enhance connections across the divider
            if (crossesDivider) {
              // Connections across divider have higher opacity and pulse more dramatically
              alpha = 0.5 * (Math.sin(pulseTime * 2) * 0.2 + 0.8)
              
              // Special gradient for cross-divider connections with more vibrant colors
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y, other.x, other.y
              )
              
              if (particle.order) {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)')
                gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.7)') // Brighter middle
                gradient.addColorStop(1, 'rgba(56, 189, 248, 0.5)')
              } else {
                gradient.addColorStop(0, 'rgba(56, 189, 248, 0.5)')
                gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)') // Brighter middle
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)')
              }
              
              ctx.strokeStyle = gradient
              ctx.lineWidth = 1.2 // Thicker for divider crossings
              
              // Add glow effect to crossing connections
              ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
              ctx.shadowBlur = 5;
            } else {
              // Regular connections with improved visibility
              if (particle.order) {
                // Left side - white connections with slight blue tint
                ctx.strokeStyle = `rgba(235, 245, 255, ${alpha})`
                ctx.lineWidth = 0.7
              } else {
                // Right side - colored connections
                const r = parseInt(particle.color.substring(1, 3), 16)
                const g = parseInt(particle.color.substring(3, 5), 16)
                const b = parseInt(particle.color.substring(5, 7), 16)
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
                ctx.lineWidth = 0.6
              }
              
              ctx.shadowBlur = 0; // No shadow for regular connections
            }
            
            // Draw the connection line
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })
      
      // Draw blue glowing dots along the divider - increased count and more dramatic effects
      const dotCount = 6 // Doubled from 3
      for (let i = 0; i < dotCount; i++) {
        const y = size * ((i + 1) / (dotCount + 1)) // Spread evenly
        
        // More dramatic pulsing effect
        const time = Date.now() * 0.001
        const pulseSize = 2 + Math.sin(time * 0.8 + i * 0.5) * 1.2
        
        // Larger glow effect with brighter colors
        const pulsePhase = Math.sin(time * 0.5 + i * 0.3) * 0.5 + 0.5 // 0 to 1 range
        const gradientSize = 6 + pulsePhase * 8 // Larger, more dynamic glow
        
        // Create bright, pulsing gradient
        const gradient = ctx.createRadialGradient(
          size/2, y, 0,
          size/2, y, gradientSize
        )
        
        // Brighter center with more opacity variation
        const centralOpacity = 0.7 + pulsePhase * 0.3
        gradient.addColorStop(0, `rgba(56, 189, 248, ${centralOpacity})`)
        gradient.addColorStop(0.3, `rgba(59, 130, 246, ${centralOpacity * 0.7})`)
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
        
        // Draw the glow
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(size/2, y, gradientSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Bright dot in center with a slight 3D effect
        ctx.fillStyle = '#3b82f6'
        ctx.beginPath()
        ctx.arc(size/2, y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Add a highlight for 3D effect
        const highlightSize = pulseSize * 0.4
        const offsetX = -highlightSize * 0.5
        const offsetY = -highlightSize * 0.5
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.beginPath()
        ctx.arc(size/2 + offsetX, y + offsetY, highlightSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Add occasional energy burst from divider line
      const burstTime = Date.now() * 0.001
      if (Math.sin(burstTime * 0.2) > 0.95) {
        // Position burst at random point along divider
        const burstY = Math.random() * size
        const burstSize = 10 + Math.random() * 30
        
        // Create burst gradient
        const burstGradient = ctx.createRadialGradient(
          size/2, burstY, 0,
          size/2, burstY, burstSize
        )
        burstGradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)')
        burstGradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)')
        burstGradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
        
        // Draw burst
        ctx.fillStyle = burstGradient
        ctx.beginPath()
        ctx.arc(size/2, burstY, burstSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [size])

  return (
    <div className={`relative bg-black ${className}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}