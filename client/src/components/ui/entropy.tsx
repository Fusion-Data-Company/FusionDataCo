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

    // Using black theme
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
      active: boolean

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
        this.active = true
      }

      update() {
        if (this.order) {
          // Ordered particles influenced by chaos
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          // Calculate influence from chaos particles
          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength * 1.5)
              chaosInfluence.y += (neighbor.velocity.y * strength * 1.5)
              this.influence = Math.max(this.influence, strength)
            }
          })

          // Blend ordered movement with chaos influence
          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence * 1.5
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence * 1.5

          // Chance to convert to chaos based on influence
          if (this.influence > 0.7 && Math.random() < 0.01) {
            this.order = false
          }

          // Influence gradually fades
          this.influence *= 0.98
        } else {
          // Chaos movement - faster and more dynamic
          this.velocity.x += (Math.random() - 0.5) * 0.8
          this.velocity.y += (Math.random() - 0.5) * 0.8
          this.velocity.x *= 0.96
          this.velocity.y *= 0.96
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks
          if (this.x < size / 2 || this.x > size) this.velocity.x *= -1
          if (this.y < 0 || this.y > size) this.velocity.y *= -1
          this.x = Math.max(size / 2, Math.min(size, this.x))
          this.y = Math.max(0, Math.min(size, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.order ?
          0.9 - this.influence * 0.4 :
          0.9
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 22
    const spacing = size / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        particles.push(new Particle(x, y, order))
      }
    }

    // Add additional chaos particles for more density and activity on the right side
    for (let i = 0; i < 180; i++) {
      const x = Math.random() * (size / 2) + size / 2
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships - establish more connections for density
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Different connection distances based on particle types
          let connectionDistance = 100
          
          if (!particle.order && !other.order) {
            // Chaos to chaos - higher density of connections
            connectionDistance = 120
          } else if (particle.order && other.order) {
            // Order to order - fewer connections
            connectionDistance = 40
          } else {
            // Order to chaos - medium connections at boundary
            connectionDistance = 80
          }
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < connectionDistance
        })
      })
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)

      // Update neighbor relationships periodically
      if (time % 15 === 0) {
        updateNeighbors()
      }

      // Draw connections first - higher number of connections to match the demo
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          let maxDist = 100
          if (!particle.order && !neighbor.order) {
            maxDist = 120
          } else if (particle.order && neighbor.order) {
            maxDist = 40
          } else {
            maxDist = 80
          }
          
          if (distance < maxDist) {
            // Stronger lines, more visible
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

      // Update and draw all particles after drawing connections
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
    <div className={`relative bg-black ${className}`} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}