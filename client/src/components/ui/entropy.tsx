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

    // Mouse interaction for spotlight effect
    let mouseX = size
    let mouseY = size / 2
    let spotlight = false

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) * dpr
      mouseY = (e.clientY - rect.top) * dpr
      spotlight = true
    })

    canvas.addEventListener('mouseleave', () => {
      spotlight = false
    })

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
      attracted: boolean
      brightness: number

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * (order ? 0.1 : 1.5),
          y: (Math.random() - 0.5) * (order ? 0.1 : 1.5)
        }
        this.influence = 0
        this.neighbors = []
        this.attracted = false
        this.brightness = Math.random() * 0.3 + 0.7
      }

      update() {
        // Calculate distance to mouse for spotlight effect
        const dx = mouseX / dpr - this.x
        const dy = mouseY / dpr - this.y
        const distToMouse = Math.hypot(dx, dy)
        const attractionRange = 150
        const attractionStrength = spotlight ? 0.08 : 0

        if (this.order) {
          // Ordered particles - can be influenced by chaos and spotlight
          if (distToMouse < attractionRange && spotlight) {
            // Pulled by the spotlight
            this.velocity.x += (dx / distToMouse) * attractionStrength 
            this.velocity.y += (dy / distToMouse) * attractionStrength
            this.attracted = true
            
            // Add some chaos when attracted
            this.velocity.x += (Math.random() - 0.5) * 0.2
            this.velocity.y += (Math.random() - 0.5) * 0.2
            
            // Update position with velocity
            this.x += this.velocity.x
            this.y += this.velocity.y
            
            // Dampen velocity
            this.velocity.x *= 0.95
            this.velocity.y *= 0.95
            
            // Calculate influence from pull strength
            this.influence = Math.min(1, (attractionRange - distToMouse) / attractionRange)
          } else {
            // Gradually return to original position if not attracted
            const returnSpeed = this.attracted ? 0.03 : 0.1
            this.x += (this.originalX - this.x) * returnSpeed
            this.y += (this.originalY - this.y) * returnSpeed
            this.influence *= 0.98
            this.attracted = false
          }
          
          // Apply cross-boundary influence from chaotic particles
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order && Math.random() < 0.02) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              if (distance < 70) {
                const pullStrength = 0.05 * (1 - distance / 70)
                this.velocity.x += (neighbor.x - this.x) * pullStrength
                this.velocity.y += (neighbor.y - this.y) * pullStrength
                this.influence = Math.max(this.influence, pullStrength * 3)
              }
            }
          })
        } else {
          // Chaotic particles - more dynamic movement
          // Random movement
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          
          // Spotlight attraction
          if (distToMouse < attractionRange * 1.5 && spotlight) {
            this.velocity.x += (dx / distToMouse) * attractionStrength * 2
            this.velocity.y += (dy / distToMouse) * attractionStrength * 2
          }
          
          // Dampen velocity
          this.velocity.x *= 0.94
          this.velocity.y *= 0.94
          
          // Update position
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks - keep within right half with some elasticity
          if (this.x < size / 2) {
            this.velocity.x = Math.abs(this.velocity.x) * 1.1
            this.x = size / 2 + 1
          } else if (this.x > size) {
            this.velocity.x = -Math.abs(this.velocity.x) * 1.1
            this.x = size - 1
          }
          
          if (this.y < 0) {
            this.velocity.y = Math.abs(this.velocity.y) * 1.1
            this.y = 1
          } else if (this.y > size) {
            this.velocity.y = -Math.abs(this.velocity.y) * 1.1
            this.y = size - 1
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Adjust size based on influence and type
        const drawSize = this.order 
          ? this.size * (1 + this.influence * 1.5)
          : this.size * 1.2
          
        // Adjust color based on influence for ordered particles
        const alpha = this.order 
          ? 0.7 + this.influence * 0.3 
          : 0.8
          
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, drawSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid
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

    // Add chaotic particles on the right side - more to match demo
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
    let frameCount = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      frameCount++

      // Update neighbor relationships periodically
      if (frameCount % 60 === 0) {
        updateNeighbors()
      }

      // Draw connections first
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          let maxDist = 80
          if (!particle.order && !neighbor.order) {
            maxDist = 100
          } else if (particle.order && neighbor.order) {
            maxDist = 40
          } else {
            // Cross-boundary connections (order to chaos)
            maxDist = 70
            // Increase connection probability at the boundary
            if (Math.abs(particle.x - size / 2) < 20 || Math.abs(neighbor.x - size / 2) < 20) {
              maxDist = 90
            }
          }
          
          if (distance < maxDist) {
            // Higher alpha for cross-boundary connections
            let alpha = 0.3 * (1 - distance / maxDist)
            if ((particle.order && !neighbor.order) || (!particle.order && neighbor.order)) {
              alpha *= 1.5
            }
            
            // Brighter connections for influenced particles
            if (particle.influence > 0.1 || neighbor.influence > 0.1) {
              alpha *= 1.3
            }
            
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

      // Add dividing line
      ctx.strokeStyle = `${particleColor}4D` // 30% opacity
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      // Add quote text
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
    <div className={`relative bg-black ${className}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}