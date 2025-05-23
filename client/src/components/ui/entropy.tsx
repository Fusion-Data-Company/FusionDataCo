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

    // FANG premium colors - focused on purple spectrum with accents
    const themeColors = [
      '#8b5cf6', // purple (primary)
      '#c084fc', // light purple
      '#4f46e5', // indigo
      '#a855f7', // violet
      '#ec4899', // pink (for conversion highlight)
      '#0ea5e9', // sky blue (accent)
    ]
    
    // Conversion zone color (right side)
    const conversionColor = '#10b981' // emerald green for converted leads
    
    // Premium backdrop with sophisticated gradient
    const radialGradient = ctx.createRadialGradient(size/2, size/2, 10, size/2, size/2, size);
    radialGradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)');   // purple glow at center
    radialGradient.addColorStop(0.4, 'rgba(79, 70, 229, 0.05)');  // indigo middle
    radialGradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.03)'); // emerald hint
    radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');           // transparent edge
    
    // Create a linear gradient for the divider (represents conversion boundary)
    const dividerGradient = ctx.createLinearGradient(size/2, 0, size/2, size);
    dividerGradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');   // purple top
    dividerGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.3)'); // pink middle (conversion highlight)
    dividerGradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');   // emerald bottom

    type Neighbor = {
      x: number
      y: number
      velocity: { x: number; y: number }
      order: boolean
    }

    class Particle {
      x: number
      y: number
      size: number
      effectiveSize: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Neighbor[]
      color: string
      colorIndex: number
      colorTransition: number

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 + Math.random() * 1 : 2 + Math.random() * 2 // Varied sizes
        this.effectiveSize = this.size
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * (order ? 1 : 3), // Faster movement on right side (converted)
          y: (Math.random() - 0.5) * (order ? 1 : 3)
        }
        this.influence = 0
        this.neighbors = []
        
        // Assign colors based on side (prospect vs converted)
        if (order) {
          // Left side (prospects) - purple spectrum
          this.colorIndex = Math.floor(Math.random() * 4) // First 4 colors (purples/indigo)
        } else {
          // Right side (converted) - mix of conversion colors and accent
          const rightSideIndex = Math.random() < 0.7 ? 
            4 + Math.floor(Math.random() * 2) : // Pink or sky blue
            Math.floor(Math.random() * 2); // Occasionally use purple
        
          this.colorIndex = rightSideIndex
        }
        
        this.color = themeColors[this.colorIndex]
        this.colorTransition = Math.random() * 0.01 // Slower, more subtle transitions
      }

      update() {
        // Create time-based pulsing effect
        const pulseScale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
        
        if (this.order) {
          // Left side (prospects) - Form clusters that slowly approach the boundary
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          
          // Create cluster behavior - particles attracted to nearby particles
          let clusterInfluence = { x: 0, y: 0 }
          let clusterCount = 0
          
          // Calculate cluster forces from neighbors
          this.neighbors.forEach(neighbor => {
            if (neighbor.order) { // Only cluster with same-side particles
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              if (distance > 0 && distance < 40) {
                // Short-range attraction for clustering
                const strength = Math.pow(1 - distance / 40, 2) * 0.03
                clusterInfluence.x += (neighbor.x - this.x) * strength
                clusterInfluence.y += (neighbor.y - this.y) * strength
                clusterCount++
              }
            }
          })
          
          // Attraction toward conversion boundary (particles want to convert)
          const boundaryDistance = Math.abs(this.x - (size / 2))
          const boundaryAttraction = Math.min(0.1, 5 / boundaryDistance) * 0.02
          
          // Calculate influence from converted particles (right side)
          const conversionInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) { // Only influenced by converted particles
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              // Stronger influence from nearby converted particles
              const strength = Math.max(0, 1 - distance / 120) * 0.2
              conversionInfluence.x += (neighbor.x - this.x) * strength
              conversionInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })
          
          // Combined movement formula
          let moveX = dx * 0.01 // Return to original position (weak)
          let moveY = dy * 0.02
          
          // Add conversion pull (stronger near boundary)
          moveX += (size/2 - this.x) * boundaryAttraction
          
          // Add cluster forces
          if (clusterCount > 0) {
            moveX += clusterInfluence.x
            moveY += clusterInfluence.y
          }
          
          // Add conversion influences
          moveX += conversionInfluence.x * this.influence * 2
          moveY += conversionInfluence.y * this.influence
          
          // Apply movement
          this.x += moveX
          this.y += moveY
          
          // Influence gradually weakens but never completely disappears
          this.influence = Math.max(0.01, this.influence * 0.98)
          
        } else {
          // Right side (converted leads) - More dynamic, celebratory movement
          
          // Slight attraction to center of right side
          const centerX = size * 0.75
          const centerY = size * 0.5
          const distanceToCenter = Math.hypot(this.x - centerX, this.y - centerY)
          
          // Create swirling, more dynamic movement
          const angle = Math.atan2(this.y - centerY, this.x - centerX)
          const swirl = 0.2 * Math.sin(angle + Date.now() * 0.001)
          
          // Chaotic but controlled movement
          this.velocity.x += (Math.random() - 0.5) * 0.6
          this.velocity.y += (Math.random() - 0.5) * 0.6
          
          // Add swirl effect
          this.velocity.x += Math.cos(angle + Math.PI/2) * swirl
          this.velocity.y += Math.sin(angle + Math.PI/2) * swirl
          
          // Add slight center attraction
          if (distanceToCenter > 50) {
            this.velocity.x += (centerX - this.x) * 0.0005
            this.velocity.y += (centerY - this.y) * 0.0005
          }
          
          // Apply friction
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          
          // Apply velocity
          this.x += this.velocity.x
          this.y += this.velocity.y
          
          // Boundary checks - keep in right half and bounce
          if (this.x < size / 2) {
            this.x = size / 2 + 5
            this.velocity.x *= -0.8 // Bounce with energy loss
          }
          if (this.x > size) {
            this.x = size - 5
            this.velocity.x *= -0.8
          }
          if (this.y < 0) {
            this.y = 5
            this.velocity.y *= -0.8
          }
          if (this.y > size) {
            this.y = size - 5
            this.velocity.y *= -0.8
          }
        }
        
        // Apply pulsing effect to particle size
        this.effectiveSize = this.size * pulseScale
      }

      // Gradually transition to a new color
      updateColor() {
        // Update color index for gentle color transitions
        if (Math.random() < this.colorTransition) {
          const nextColorIndex = (this.colorIndex + 1) % themeColors.length
          this.colorIndex = nextColorIndex
          this.color = themeColors[nextColorIndex]
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Update color occasionally for subtle transitions
        this.updateColor()
        
        // Set alpha and size based on particle state and position
        let alpha = this.order ? 0.8 - this.influence * 0.3 : 0.9
        const size = this.effectiveSize || this.size
        
        // Get RGB components from the hex color
        const r = parseInt(this.color.substring(1, 3), 16)
        const g = parseInt(this.color.substring(3, 5), 16)
        const b = parseInt(this.color.substring(5, 7), 16)
        
        // Add glow effects for converted particles (right side)
        if (!this.order) {
          // Create glow effect for converted particles
          const glowSize = size * 3
          const glowAlpha = 0.15
          
          // Inner glow
          const gradient = ctx.createRadialGradient(
            this.x, this.y, size * 0.5,
            this.x, this.y, glowSize
          )
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowAlpha})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
          
          // Make converted particles brighter
          alpha = 0.95
        }
        else if (this.x > size/2 - 30) {
          // Particles near the conversion boundary get a subtle highlight
          const distanceToBoundary = Math.abs(this.x - size/2)
          const highlightStrength = Math.max(0, 1 - distanceToBoundary / 30)
          
          // Add subtle glow for particles approaching conversion
          const glowSize = size * 2 * highlightStrength
          const glowAlpha = 0.1 * highlightStrength
          
          const gradient = ctx.createRadialGradient(
            this.x, this.y, size * 0.5,
            this.x, this.y, glowSize
          )
          
          // Use pink/conversion color for the highlight
          gradient.addColorStop(0, `rgba(236, 72, 153, ${glowAlpha})`)
          gradient.addColorStop(1, `rgba(236, 72, 153, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Draw the main particle
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add highlight dot for a premium 3D effect
        const highlightX = this.x - size * 0.3
        const highlightY = this.y - size * 0.3
        const highlightSize = size * 0.25
        
        ctx.fillStyle = `rgba(255, 255, 255, 0.6)`
        ctx.beginPath()
        ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 25
    const spacing = size / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        particles.push(new Particle(x, y, order))
      }
    }

    // Update neighbor relationships
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles
          .filter(other => {
            if (other === particle) return false
            const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
            return distance < 100
          })
          .map(p => ({
            x: p.x,
            y: p.y,
            velocity: p.velocity,
            order: p.order
          }))
      })
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      // Safety check for context
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      
      // Draw the background gradient for ambient effect
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, size, size);

      // Update neighbor relationships periodically
      if (time % 30 === 0) {
        updateNeighbors()
      }
      
      // Draw conversion boundary (vertical divider line) with gradient
      ctx.strokeStyle = dividerGradient;
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Draw subtle pulse effect at the divider line (conversion point)
      const pulseTime = Date.now() * 0.001
      const pulseIntensity = (Math.sin(pulseTime * 2) * 0.5 + 0.5) * 0.2
      
      // Conversion zone highlight effect
      const highlightGradient = ctx.createLinearGradient(size/2, 0, size/2 + 30, 0)
      highlightGradient.addColorStop(0, `rgba(236, 72, 153, ${0.1 + pulseIntensity})`)
      highlightGradient.addColorStop(1, 'rgba(236, 72, 153, 0)')
      
      ctx.fillStyle = highlightGradient
      ctx.fillRect(size/2, 0, 30, size)

      // Update and draw all particles
      particles.forEach(particle => {
        particle.update()
        
        // Draw connecting lines with matching colors
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          // First determine if we should draw a line (different logic for each side)
          let shouldConnect = false
          let connectionType = ""
          
          if (particle.order && neighbor.order) {
            // Left side cluster connections (purple leads)
            shouldConnect = distance < 40
            connectionType = "cluster"
          } else if (!particle.order && !neighbor.order) {
            // Right side celebrations (converted leads)
            shouldConnect = distance < 60
            connectionType = "converted"
          } else if ((particle.order && !neighbor.order) || (!particle.order && neighbor.order)) {
            // Cross-boundary connections (conversion attempt)
            const boundaryDistance = Math.min(
              Math.abs(particle.x - size/2),
              Math.abs(neighbor.x - size/2)
            )
            shouldConnect = distance < 70 && boundaryDistance < 30
            connectionType = "conversion"
          }
          
          if (shouldConnect) {
            // Get RGB components from the particle color
            const r = parseInt(particle.color.substring(1, 3), 16)
            const g = parseInt(particle.color.substring(3, 5), 16)
            const b = parseInt(particle.color.substring(5, 7), 16)
            
            let alpha = 0
            let lineWidth = 0
            
            if (connectionType === "cluster") {
              // Purple cluster connections
              alpha = 0.15 * (1 - distance / 40)
              lineWidth = 0.5
            } else if (connectionType === "converted") {
              // Converted side connections (brighter)
              alpha = 0.25 * (1 - distance / 60)
              lineWidth = 0.7
            } else if (connectionType === "conversion") {
              // Cross-boundary conversion connections (highlight)
              alpha = 0.3 * (1 - distance / 70)
              lineWidth = 1
              
              // Use pink highlight for conversion paths
              const pinkR = 236
              const pinkG = 72
              const pinkB = 153
              
              // Blend with original color
              const blend = 0.7
              const blendedR = Math.round(r * (1-blend) + pinkR * blend)
              const blendedG = Math.round(g * (1-blend) + pinkG * blend)
              const blendedB = Math.round(b * (1-blend) + pinkB * blend)
              
              ctx.strokeStyle = `rgba(${blendedR}, ${blendedG}, ${blendedB}, ${alpha})`
              ctx.lineWidth = lineWidth
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
              
              // Skip regular drawing to use the special color
              return
            }
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
        
        // Draw the particle after connections
        particle.draw(ctx)
      })

      time++
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