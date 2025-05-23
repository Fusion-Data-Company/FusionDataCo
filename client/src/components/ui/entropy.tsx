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

    // Black theme with brighter particles
    const particleColor = '#ffffff'
    
    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Particle[]
      visible: boolean

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 : 2 // Ordered particles slightly smaller
        this.order = order
        this.velocity = {
          x: order ? 0 : (Math.random() - 0.5) * 2,
          y: order ? 0 : (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
        this.visible = true
      }

      update() {
        if (this.order) {
          // Ordered particles stay mostly in place with minimal movement
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          
          // Only add tiny movement for a subtle effect
          this.x += dx * 0.1
          this.y += dy * 0.1
        } else {
          // Chaos movement with more natural flow
          this.velocity.x += (Math.random() - 0.5) * 0.4
          this.velocity.y += (Math.random() - 0.5) * 0.4
          this.velocity.x *= 0.97
          this.velocity.y *= 0.97
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks with bounce effect
          if (this.x < size / 2 || this.x > size) {
            this.velocity.x *= -1.1
            this.x = Math.max(size / 2, Math.min(size, this.x))
          }
          
          if (this.y < 0 || this.y > size) {
            this.velocity.y *= -1.1
            this.y = Math.max(0, Math.min(size, this.y))
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.visible) return
        
        // Calculate alpha based on particle type
        const alpha = this.order ? 0.65 : 0.8
        
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 20 // Match the exact grid density in the screenshot
    const spacing = size / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        particles.push(new Particle(x, y, order))
      }
    }

    // Create additional chaos particles for more connections on right side
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * (size / 2) + size / 2 // Only on right side
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships for network effect
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Different connection distances based on side
          const connectionDistance = particle.order ? 30 : 70
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          
          // Create more connections on the chaotic right side
          if (!particle.order && !other.order) {
            return distance < connectionDistance
          }
          
          // Almost no connections between ordered particles
          if (particle.order && other.order) {
            return false
          }
          
          // Few connections between ordered and chaotic
          return distance < 40 && Math.random() > 0.7
        })
      })
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)

      // Update neighbor relationships periodically
      if (time % 30 === 0) {
        updateNeighbors()
      }

      // Draw connection lines first (under particles)
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          // Different line appearance based on side
          if (particle.order) {
            // Almost no connections on the ordered side
            return
          } else {
            // More visible connections on chaotic side
            const maxDist = 70
            if (distance < maxDist) {
              // Stronger lines for closer particles
              const alpha = 0.25 * (1 - distance / maxDist)
              ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
            }
          }
        })
      })

      // Update and draw all particles (on top of lines)
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      // Add dividing line
      ctx.strokeStyle = `${particleColor}4D`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      // Add quote text at bottom
      ctx.font = '12px monospace'
      ctx.fillStyle = '#ffffff99'
      ctx.textAlign = 'center'
      ctx.fillText('"Order and chaos dance —digital poetry in motion."', size / 2, size - 20)

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