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

    // Theme colors - ambient blue, green, and cyan (no orange)
    const themeColors = [
      '#3b82f6', // ambient blue 
      '#10b981', // green
      '#06b6d4'  // cyan
    ]
    
    // Create a radial gradient for the backdrop (subtle ambient effect)
    const radialGradient = ctx.createRadialGradient(size/2, size/2, 10, size/2, size/2, size);
    radialGradient.addColorStop(0, 'rgba(37, 99, 235, 0.05)');   // blue center
    radialGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)'); // cyan middle
    radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');          // transparent edge

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
        this.size = 2
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
        
        // Assign a color from our theme
        this.colorIndex = Math.floor(Math.random() * themeColors.length)
        this.color = themeColors[this.colorIndex]
        this.colorTransition = Math.random() * 0.02 // Speed of color transition
      }

      update() {
        if (this.order) {
          // Ordered particles affected by chaos
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          // Calculate influence from chaotic particles
          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })

          // Mix ordered movement with chaotic influence
          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence

          // Influence gradually weakens
          this.influence *= 0.99
        } else {
          // Chaotic movement
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks
          if (this.x < size / 2 || this.x > size) this.velocity.x *= -1
          if (this.y < 0 || this.y > size) this.velocity.y *= -1
          this.x = Math.max(size / 2, Math.min(size, this.x))
          this.y = Math.max(0, Math.min(size, this.y))
        }
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
        
        // Set alpha based on particle state
        const alpha = this.order ?
          0.8 - this.influence * 0.5 :
          0.8
        
        // Get RGB components from the hex color
        const r = parseInt(this.color.substring(1, 3), 16)
        const g = parseInt(this.color.substring(3, 5), 16)
        const b = parseInt(this.color.substring(5, 7), 16)
        
        // Create RGBA color string
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
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
      ctx.clearRect(0, 0, size, size)
      
      // Draw the background gradient for ambient effect
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, size, size);

      // Update neighbor relationships periodically
      if (time % 30 === 0) {
        updateNeighbors()
      }

      // Update and draw all particles
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)

        // Draw connecting lines with matching colors
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 50) {
            // Get RGB components from the hex color
            const r = parseInt(particle.color.substring(1, 3), 16)
            const g = parseInt(particle.color.substring(3, 5), 16)
            const b = parseInt(particle.color.substring(5, 7), 16)
            
            const alpha = 0.2 * (1 - distance / 50)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      // Add vertical divider line with subtle blue color
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'  // Ambient blue with low opacity
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      // Add text elements if needed 
      ctx.font = '12px monospace'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'

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