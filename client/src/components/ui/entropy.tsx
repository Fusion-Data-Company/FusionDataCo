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

    // Using black theme with white particles
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

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * (order ? 0.2 : 2),
          y: (Math.random() - 0.5) * (order ? 0.2 : 2)
        }
        this.influence = 0
        this.neighbors = []
      }

      update() {
        if (this.order) {
          // Ordered particles stay at their grid positions
          this.x = this.originalX
          this.y = this.originalY
        } else {
          // Chaotic particles with more dynamic movement
          this.velocity.x += (Math.random() - 0.5) * 0.8
          this.velocity.y += (Math.random() - 0.5) * 0.8
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks - keep within right half
          if (this.x < size / 2 || this.x > size) {
            this.velocity.x *= -1
            this.x = Math.max(size / 2, Math.min(size, this.x))
          }
          if (this.y < 0 || this.y > size) {
            this.velocity.y *= -1
            this.y = Math.max(0, Math.min(size, this.y))
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid - exactly matching the demo
    const particles: Particle[] = []
    const gridSize = 20
    const spacing = size / gridSize

    // Create the ordered grid on the left side
    for (let i = 0; i < gridSize / 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        particles.push(new Particle(x, y, true))
      }
    }

    // Add chaotic particles on the right side
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * (size / 2) + size / 2
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Different connection distances based on particle types
          let maxDistance = 80
          if (!particle.order && !other.order) {
            // Chaos to chaos - higher density of connections
            maxDistance = 100
          } else if (particle.order && other.order) {
            // Order to order - grid-like connections
            const dx = Math.abs(particle.originalX - other.originalX)
            const dy = Math.abs(particle.originalY - other.originalY)
            // Only connect to immediate neighbors in grid
            return (dx <= spacing * 1.5 && dy < spacing * 0.5) || 
                   (dy <= spacing * 1.5 && dx < spacing * 0.5)
          } else {
            // Order to chaos - boundary connections
            maxDistance = 70
          }
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < maxDistance
        })
      })
    }

    let animationId: number
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)

      // Update neighbor relationships periodically
      if (Math.random() < 0.05) {
        updateNeighbors()
      }

      // Draw connections first - exactly like the demo
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          let maxDist = 80
          if (!particle.order && !neighbor.order) {
            maxDist = 100
          } else if (particle.order && other.order) {
            maxDist = 40
          } else {
            maxDist = 70
          }
          
          if (distance < maxDist) {
            // Calculate alpha based on distance - matching the demo exactly
            const alpha = 0.3 * (1 - distance / maxDist)
            
            ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      // Update and draw all particles
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      // Add dividing line - exactly matching demo visual
      ctx.strokeStyle = `${particleColor}4D` // 30% opacity
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      // Add quote text - matching demo exactly
      ctx.font = "12px monospace"
      ctx.fillStyle = "#ffffff99" // 60% opacity
      ctx.textAlign = "center"
      ctx.fillText('"Order and chaos dance —digital poetry in motion."', size / 2, size - 20)

      animationId = requestAnimationFrame(animate)
    }

    // Initialize neighbors
    updateNeighbors()
    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [size])

  return (
    <div className={`relative bg-black ${className}`} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}