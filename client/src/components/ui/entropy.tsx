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
        this.size = order ? 1.5 : 2
        this.order = order
        
        // Assign colors based on side
        if (order) {
          // Left side is white
          this.color = '#ffffff'
        } else {
          // Right side has random colors from the theme
          const colorIndex = Math.floor(Math.random() * rightSideColors.length)
          this.color = rightSideColors[colorIndex]
        }
        
        // Starting velocity
        this.velocity = {
          x: (Math.random() - 0.5) * 1,
          y: (Math.random() - 0.5) * 1
        }
      }

      update() {
        // Allow particles to occasionally cross over
        const nearCenter = Math.abs(this.x - size/2) < 20;
        const shouldCrossOver = Math.random() < 0.001 && nearCenter;
        
        if (shouldCrossOver) {
          // Change state when crossing
          this.order = !this.order;
          
          // Update color when crossing
          if (this.order) {
            // Changed to ordered (left side)
            this.color = '#ffffff';
          } else {
            // Changed to chaotic (right side)
            const colorIndex = Math.floor(Math.random() * rightSideColors.length);
            this.color = rightSideColors[colorIndex];
          }
          
          // Give a little push in the new direction
          this.velocity.x = this.order ? -1 : 1;
        }
        
        if (this.order) {
          // Left side particles - orderly movement
          // Return to original position with a slight breathing effect
          const breathingOffsetX = Math.sin(Date.now() * 0.001 + this.originalY * 0.1) * 2
          const breathingOffsetY = Math.sin(Date.now() * 0.001 + this.originalX * 0.1) * 2
          
          // If near the divider, allow occasional drift toward divider
          if (nearCenter && Math.random() < 0.01) {
            this.x += 0.5;
          } else {
            // Normal movement toward original position plus breathing offset
            this.x += ((this.originalX + breathingOffsetX) - this.x) * 0.1
            this.y += ((this.originalY + breathingOffsetY) - this.y) * 0.1
          }
        } else {
          // Right side particles - chaotic movement
          // Add random forces
          this.velocity.x += (Math.random() - 0.5) * 0.4
          this.velocity.y += (Math.random() - 0.5) * 0.4
          
          // Dampening to prevent excessive speed
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          
          // Update position
          this.x += this.velocity.x
          this.y += this.velocity.y
          
          // Boundary checks - allow crossing the middle, but keep within canvas
          if (this.x < 0) {
            this.x = 1
            this.velocity.x = Math.abs(this.velocity.x) * 0.5
          } else if (this.x > size) {
            this.x = size - 1
            this.velocity.x = -Math.abs(this.velocity.x) * 0.5
          }
          
          if (this.y < 0) {
            this.y = 1
            this.velocity.y = Math.abs(this.velocity.y) * 0.5
          } else if (this.y > size) {
            this.y = size - 1
            this.velocity.y = -Math.abs(this.velocity.y) * 0.5
          }
          
          // Occasionally change color
          if (Math.random() < 0.001) {
            const colorIndex = Math.floor(Math.random() * rightSideColors.length)
            this.color = rightSideColors[colorIndex]
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

    // Create particles
    const particles: Particle[] = []
    const gridSize = 25
    const spacing = size / gridSize
    
    // Create grid of particles, left side ordered, right side chaotic
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        
        // Add some randomness to right side position
        const finalX = order ? x : x + (Math.random() - 0.5) * spacing
        const finalY = order ? y : y + (Math.random() - 0.5) * spacing
        
        particles.push(new Particle(finalX, finalY, order))
      }
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
          const maxDistance = particle.order ? 30 : 40
          
          // Check if connection crosses the divider
          const crossesDivider = (particle.x < size/2 && other.x >= size/2) || 
                              (particle.x >= size/2 && other.x < size/2)
                              
          if (distance < maxDistance || (crossesDivider && distance < 60)) {
            let alpha = particle.order ? 
                0.15 * (1 - distance / maxDistance) : // More visible on left
                0.1 * (1 - distance / maxDistance)   // Less visible on right
            
            // Enhance connections across the divider
            if (crossesDivider) {
              alpha = 0.3
              
              // Special gradient for cross-divider connections
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y, other.x, other.y
              )
              
              if (particle.order) {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
                gradient.addColorStop(1, 'rgba(56, 189, 248, 0.3)')
              } else {
                gradient.addColorStop(0, 'rgba(56, 189, 248, 0.3)')
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)')
              }
              
              ctx.strokeStyle = gradient
              ctx.lineWidth = 0.7
            } else {
              // Regular connections
              ctx.strokeStyle = particle.order ? 
                  `rgba(255, 255, 255, ${alpha})` :
                  `rgba(56, 189, 248, ${alpha})`
              ctx.lineWidth = 0.5
            }
            
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })
      
      // Draw blue glowing dots along the divider
      const dotCount = 3
      for (let i = 0; i < dotCount; i++) {
        const y = size * ((i + 1) / 4)
        const pulseSize = 2 + Math.sin(Date.now() * 0.001 + i) * 0.5
        
        // Glow effect
        const gradientSize = 4 + Math.sin(Date.now() * 0.002) * 2
        const gradient = ctx.createRadialGradient(
          size/2, y, 0,
          size/2, y, gradientSize
        )
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.7)')
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(size/2, y, gradientSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Bright dot in center
        ctx.fillStyle = '#3b82f6'
        ctx.beginPath()
        ctx.arc(size/2, y, pulseSize, 0, Math.PI * 2)
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