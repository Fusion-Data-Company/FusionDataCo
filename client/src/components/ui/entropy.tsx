import { useEffect, useRef, useState } from 'react'

interface EntropyProps {
  className?: string
  size?: number
}

export function Entropy({ className = "", size = 400 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

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

    // Spotlight effect
    let spotlight = {
      x: size * 0.75, // Position in the chaotic side
      y: size * 0.5,
      radius: size * 0.15,
      intensity: 0.7
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
      neighbors: Particle[]
      brightness: number
      active: boolean
      inSpotlight: boolean

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.2
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * (order ? 0.5 : 2),
          y: (Math.random() - 0.5) * (order ? 0.5 : 2)
        }
        this.influence = 0
        this.neighbors = []
        this.brightness = Math.random() * 0.3 + 0.7
        this.active = true
        this.inSpotlight = false
      }

      update(time: number) {
        // Calculate distance to spotlight
        const distToSpotlight = Math.hypot(this.x - spotlight.x, this.y - spotlight.y)
        this.inSpotlight = distToSpotlight < spotlight.radius
        
        if (this.order) {
          // Ordered particles influenced by chaos
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          // Calculate influence from chaos particles
          const chaosInfluence = { x: 0, y: 0 }
          let totalInfluence = 0
          
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength * 1.5)
              chaosInfluence.y += (neighbor.velocity.y * strength * 1.5)
              totalInfluence += strength
              this.influence = Math.max(this.influence, strength)
            }
          })
          
          if (totalInfluence > 0) {
            chaosInfluence.x /= totalInfluence
            chaosInfluence.y /= totalInfluence
          }

          // Blend ordered movement with chaos influence
          const chaosFactor = this.influence * 1.5
          this.x += dx * 0.05 * (1 - chaosFactor) + chaosInfluence.x * chaosFactor
          this.y += dy * 0.05 * (1 - chaosFactor) + chaosInfluence.y * chaosFactor

          // Particles near the boundary are more likely to be influenced
          const distanceToBoundary = Math.abs(this.x - size/2)
          if (distanceToBoundary < 30 && Math.random() < 0.02) {
            this.influence = Math.min(1, this.influence + 0.2)
          }

          // Chance to convert to chaos based on influence and distance to boundary
          if (this.influence > 0.7 && Math.random() < 0.01) {
            this.order = false
            this.size = 1.8
          }

          // Influence gradually fades if not continuously reinforced
          this.influence *= 0.97
        } else {
          // Chaos movement - faster and more dynamic
          // Add oscillation to simulate more energy
          const oscillation = Math.sin(time * 0.01 + this.originalX) * 0.1
          
          this.velocity.x += (Math.random() - 0.5) * 0.8 + oscillation
          this.velocity.y += (Math.random() - 0.5) * 0.8 + oscillation
          this.velocity.x *= 0.96
          this.velocity.y *= 0.96
          
          // Particles in spotlight area are pulled toward center slightly
          if (this.inSpotlight) {
            const toSpotlight = {
              x: spotlight.x - this.x,
              y: spotlight.y - this.y
            }
            const dist = Math.hypot(toSpotlight.x, toSpotlight.y)
            if (dist > 0) {
              const pull = 0.05 * spotlight.intensity * (1 - dist/spotlight.radius)
              this.velocity.x += toSpotlight.x / dist * pull
              this.velocity.y += toSpotlight.y / dist * pull
            }
          }
          
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks
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
        // Calculate alpha based on multiple factors
        let alpha = this.order ? 0.9 - this.influence * 0.4 : 0.9
        
        // Increase brightness in spotlight
        if (this.inSpotlight) {
          const distToCenter = Math.hypot(this.x - spotlight.x, this.y - spotlight.y)
          const spotlightFactor = Math.max(0, 1 - distToCenter/spotlight.radius)
          alpha = Math.min(1, alpha + spotlightFactor * spotlight.intensity)
          
          // Make particles slightly larger in spotlight
          const sizeFactor = 1 + spotlightFactor * 0.5
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * sizeFactor, 0, Math.PI * 2)
          ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
        } else {
          // Regular rendering
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
        }
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
    for (let i = 0; i < 200; i++) {
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

    // Update spotlight position to create movement
    function updateSpotlight(time: number) {
      // Move spotlight in a gentle figure-8 pattern
      const cycleSpeed = 0.0003
      const xAmplitude = size * 0.15
      const yAmplitude = size * 0.1
      
      spotlight.x = size * 0.75 + Math.sin(time * cycleSpeed) * xAmplitude
      spotlight.y = size * 0.5 + Math.sin(time * cycleSpeed * 2) * yAmplitude
      
      // Subtle pulsing of the intensity and size
      const pulseFactor = 0.5 + Math.sin(time * 0.003) * 0.2
      spotlight.intensity = 0.7 + pulseFactor * 0.3
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      
      // Update spotlight position
      updateSpotlight(time)

      // Update neighbor relationships periodically
      if (time % 15 === 0) {
        updateNeighbors()
      }

      // Draw the subtle spotlight glow first
      const gradient = ctx.createRadialGradient(
        spotlight.x, spotlight.y, 0,
        spotlight.x, spotlight.y, spotlight.radius * 1.5
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(spotlight.x, spotlight.y, spotlight.radius * 1.5, 0, Math.PI * 2)
      ctx.fill()

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
            // Base alpha for connection
            let alpha = 0.3 * (1 - distance / maxDist)
            
            // Boost connections in spotlight
            const connectionMidpointX = (particle.x + neighbor.x) / 2
            const connectionMidpointY = (particle.y + neighbor.y) / 2
            const distToSpotlight = Math.hypot(connectionMidpointX - spotlight.x, connectionMidpointY - spotlight.y)
            
            if (distToSpotlight < spotlight.radius * 1.2) {
              const spotlightFactor = 1 - distToSpotlight/(spotlight.radius * 1.2)
              alpha = Math.min(1, alpha + spotlightFactor * 0.4 * spotlight.intensity)
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

      // Update and draw all particles after drawing connections
      particles.forEach(particle => {
        particle.update(time)
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
      
      // Mark as initialized after first frame
      if (!isInitialized) {
        setIsInitialized(true)
      }
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [size, isInitialized])

  return (
    <div className={`relative bg-black ${className}`} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}