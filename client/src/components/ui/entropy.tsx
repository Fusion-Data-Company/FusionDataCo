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

    // Right side colors - bright blue and turquoise shades
    const rightSideColors = [
      '#2563eb', // bright blue
      '#0ea5e9', // bright sky blue
      '#0891b2', // bright cyan
      '#14b8a6'  // turquoise
    ]
    
    // Left side is pure white
    const leftSideColor = '#ffffff'
    
    // Create a subtle divider line
    const dividerGradient = ctx.createLinearGradient(size/2, 0, size/2, size);
    dividerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');   // white top
    dividerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)'); // brighter middle
    dividerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');   // white bottom

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      colorIndex: number
      color: string
      originalX: number
      originalY: number
      velocity: { x: number; y: number }
      attractionPoint: { x: number; y: number } | null
      wobble: number
      wobbleSpeed: number
      transitionProgress: number
      transitioning: boolean

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
          this.color = leftSideColor
          this.colorIndex = -1
        } else {
          // Right side has colors
          this.colorIndex = Math.floor(Math.random() * rightSideColors.length)
          this.color = rightSideColors[this.colorIndex]
        }
        
        // Very minimal velocity for precise control
        this.velocity = {
          x: 0,
          y: 0
        }
        
        // For particles being pulled across
        this.attractionPoint = null
        this.transitionProgress = 0
        this.transitioning = false
        
        // Add subtle movement
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = 0.02 + Math.random() * 0.03
      }

      update(time: number) {
        if (this.order) {
          // LEFT SIDE PARTICLES - Stay in exact grid formation with minimal movement
          
          // Very slight breathing effect on left grid - subtle expand/contract
          const breathingPhase = Math.sin(time * 0.1) * 0.5
          const breathingX = (this.originalX - size/4) * (1.0 + breathingPhase * 0.01)
          
          // Apply the very subtle breathing motion
          this.x = size/4 + breathingX
          this.y = this.originalY
          
          // Very rarely allow a particle to cross to the right (1/5000 chance)
          if (Math.random() < 0.0004 && !this.transitioning && this.x > size * 0.4) {
            this.transitioning = true
            this.attractionPoint = {
              x: size/2 + 5 + Math.random() * 20,
              y: this.y + (Math.random() - 0.5) * 10
            }
          }
          
          // Handle particles being pulled to right side (very rarely)
          if (this.transitioning && this.attractionPoint) {
            const targetX = this.attractionPoint.x
            const targetY = this.attractionPoint.y
            
            // Move directly toward the target
            this.x += (targetX - this.x) * 0.05
            this.y += (targetY - this.y) * 0.05
            
            // Transition progress
            this.transitionProgress += 0.01
            
            // Change color as it crosses
            if (this.x > size/2 - 5 && this.colorIndex === -1) {
              // Pick a color from the right side
              this.colorIndex = Math.floor(Math.random() * rightSideColors.length)
              this.color = rightSideColors[this.colorIndex]
              
              // Now it's on the right
              this.order = false
              
              // Reset for right side behavior
              this.transitioning = false
              this.attractionPoint = null
              this.velocity = {
                x: (Math.random() - 0.5) * 0.8,
                y: (Math.random() - 0.5) * 0.8
              }
            }
          }
        } else {
          // RIGHT SIDE PARTICLES - Gentle movement
          
          // Apply very mild random forces
          this.velocity.x += (Math.random() - 0.5) * 0.1
          this.velocity.y += (Math.random() - 0.5) * 0.1
          
          // Apply velocity with strong dampening
          this.velocity.x *= 0.9
          this.velocity.y *= 0.9
          this.x += this.velocity.x
          this.y += this.velocity.y
          
          // Strict boundary checks
          if (this.x < size/2) {
            this.x = size/2 + 1
            this.velocity.x = Math.abs(this.velocity.x) * 0.3
          } else if (this.x > size) {
            this.x = size - 1
            this.velocity.x = -Math.abs(this.velocity.x) * 0.3
          }
          
          if (this.y < 0) {
            this.y = 1
            this.velocity.y = Math.abs(this.velocity.y) * 0.3
          } else if (this.y > size) {
            this.y = size - 1
            this.velocity.y = -Math.abs(this.velocity.y) * 0.3
          }
          
          // Occasionally change color
          if (Math.random() < 0.001) {
            const newColorIndex = Math.floor(Math.random() * rightSideColors.length)
            this.colorIndex = newColorIndex
            this.color = rightSideColors[newColorIndex]
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return

        // Draw the main particle
        let alpha = this.order ? 0.7 : 0.9
        
        // Transitioning particles (moving from left to right)
        if (this.transitioning) {
          const progress = Math.min(1, this.transitionProgress)
          
          // Very subtle glow for transitioning particles
          const glowSize = this.size * 2
          const glowAlpha = 0.05 + progress * 0.1
          
          // Use right side color for glow
          const targetColorIndex = Math.floor(Math.random() * rightSideColors.length)
          const targetColor = rightSideColors[targetColorIndex]
          const tr = parseInt(targetColor.substring(1, 3), 16)
          const tg = parseInt(targetColor.substring(3, 5), 16)
          const tb = parseInt(targetColor.substring(5, 7), 16)
          
          const gradient = ctx.createRadialGradient(
            this.x, this.y, this.size * 0.5,
            this.x, this.y, glowSize
          )
          
          gradient.addColorStop(0, `rgba(${tr}, ${tg}, ${tb}, ${glowAlpha})`)
          gradient.addColorStop(1, `rgba(${tr}, ${tg}, ${tb}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Right side particles (colored)
        if (!this.order) {
          // Get RGB from color
          const r = parseInt(this.color.substring(1, 3), 16)
          const g = parseInt(this.color.substring(3, 5), 16)
          const b = parseInt(this.color.substring(5, 7), 16)
          
          // Very subtle inner glow
          const glowSize = this.size * 1.5
          const glowAlpha = 0.03 // Very faint
          
          const gradient = ctx.createRadialGradient(
            this.x, this.y, this.size * 0.5,
            this.x, this.y, glowSize
          )
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowAlpha})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
          
          // Main particle with subtle shimmer effect
          const colorShift = Math.sin(Date.now() * 0.001 + this.x * 0.1) * 0.1
          const rShifted = Math.min(255, Math.max(0, r * (1 + colorShift)))
          const gShifted = Math.min(255, Math.max(0, g * (1 + colorShift)))
          const bShifted = Math.min(255, Math.max(0, b * (1 + colorShift)))
          
          ctx.fillStyle = `rgb(${rShifted}, ${gShifted}, ${bShifted})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Tiny highlight for subtle 3D effect
          const highlightX = this.x - this.size * 0.25
          const highlightY = this.y - this.size * 0.25
          const highlightSize = this.size * 0.15
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.beginPath()
          ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Left side - simple white particle with no glow
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 20 // Slightly larger dots with fewer total
    const gridWidth = size / gridSize
    
    // Left side grid - perfectly aligned grid
    for (let i = 0; i < gridSize / 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = gridWidth * i + gridWidth / 2
        const y = gridWidth * j + gridWidth / 2
        particles.push(new Particle(x, y, true))
      }
    }
    
    // Right side particles - just a few colorful ones
    for (let i = 0; i < gridSize / 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (Math.random() < 0.7) { // 30% fewer on right side
          const x = size/2 + gridWidth * i + gridWidth / 2 + (Math.random() - 0.5) * 5
          const y = gridWidth * j + gridWidth / 2 + (Math.random() - 0.5) * 5
          particles.push(new Particle(x, y, false))
        }
      }
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      
      // Draw elegant divider line with slight gradient
      ctx.strokeStyle = dividerGradient
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Add subtle pulsing dots along the divider to indicate conversion points
      const pulseTime = Date.now() * 0.0005
      const pulseIntensity = (Math.sin(pulseTime) * 0.5 + 0.5) * 0.1
      
      // Add just 3 glowing dots along the divider - more subtle
      for (let i = 0; i < 3; i++) {
        const y = size * ((i + 1) / 4) + Math.sin(pulseTime * 2 + i) * 3
        const dotSize = 0.8 + Math.sin(pulseTime * 3 + i * 0.7) * 0.3
        const glow = 0.8 + Math.sin(pulseTime * 5 + i * 1.3) * 0.5
        
        // Draw a small glow point
        const glowGradient = ctx.createRadialGradient(
          size/2, y, 0,
          size/2, y, 2 + glow
        )
        
        // Use a color from the right side
        const colorIndex = Math.floor(time * 0.01 + i) % rightSideColors.length
        const color = rightSideColors[colorIndex]
        const r = parseInt(color.substring(1, 3), 16)
        const g = parseInt(color.substring(3, 5), 16)
        const b = parseInt(color.substring(5, 7), 16)
        
        glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.2)`)
        glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(size/2, y, 2 + glow, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw a small dot
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(size/2, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Draw connections between nearby points on same side
      particles.forEach(p1 => {
        particles.forEach(p2 => {
          if (p1 !== p2 && p1.order === p2.order) {
            const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y)
            const maxDistance = p1.order ? 30 : 50 // Different connection distances for each side
            
            if (distance < maxDistance) {
              const alpha = p1.order ? 
                  0.05 * (1 - distance / maxDistance) : // Less visible on left
                  0.15 * (1 - distance / maxDistance)   // More visible on right
              
              if (p1.order) {
                // Left side white connections
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
              } else {
                // Right side colored connections
                const r = parseInt(p1.color.substring(1, 3), 16)
                const g = parseInt(p1.color.substring(3, 5), 16)
                const b = parseInt(p1.color.substring(5, 7), 16)
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
              }
              
              ctx.lineWidth = p1.order ? 0.5 : 0.7
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        })
      })
      
      // Special connections for transitioning particles
      particles.forEach(p => {
        if (p.transitioning) {
          // Find nearest particles on the right side
          const rightParticles = particles.filter(rp => !rp.order)
          
          // Connect to closest right particles
          rightParticles.sort((a, b) => {
            const distA = Math.hypot(p.x - a.x, p.y - a.y)
            const distB = Math.hypot(p.x - b.x, p.y - b.y)
            return distA - distB
          }).slice(0, 3).forEach(target => {
            const distance = Math.hypot(p.x - target.x, p.y - target.y)
            if (distance < 100) {
              const alpha = 0.3 * (1 - distance / 100) + pulseIntensity
              
              // Use the right side color
              const r = parseInt(target.color.substring(1, 3), 16)
              const g = parseInt(target.color.substring(3, 5), 16)
              const b = parseInt(target.color.substring(5, 7), 16)
              
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
              ctx.lineWidth = 0.7
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(target.x, target.y)
              ctx.stroke()
            }
          })
        }
      })
      
      // Update and draw all particles
      particles.forEach(particle => {
        particle.update(time)
        particle.draw(ctx)
      })

      time += 0.01
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