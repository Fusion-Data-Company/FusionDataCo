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

    // Spotlight/gravity center - starts at center-right by default
    let spotlightX = size * 0.75
    let spotlightY = size / 2
    let spotlightActive = true
    let spotlightStrength = 0.7
    let spotlightRadius = 120
    
    // Create automatic spotlight movement if no mouse input
    let autoMoveSpotlight = true
    let autoMoveTime = 0
    
    // Mouse interaction for spotlight effect
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      spotlightX = (e.clientX - rect.left) * dpr / dpr
      spotlightY = (e.clientY - rect.top) * dpr / dpr
      spotlightActive = true
      autoMoveSpotlight = false
      spotlightStrength = 1.0
    })

    canvas.addEventListener('mouseleave', () => {
      autoMoveSpotlight = true
      spotlightStrength = 0.7
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
      connectionCount: number
      connectionBrightness: number

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 : 2
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * (order ? 0.05 : 2),
          y: (Math.random() - 0.5) * (order ? 0.05 : 2)
        }
        this.influence = 0
        this.neighbors = []
        this.attracted = false
        this.brightness = Math.random() * 0.3 + 0.7
        this.connectionCount = 0
        this.connectionBrightness = 0
      }

      update() {
        // Calculate distance to spotlight for gravity effect
        const dx = spotlightX - this.x
        const dy = spotlightY - this.y
        const distToSpotlight = Math.hypot(dx, dy)
        const normDx = dx / (distToSpotlight || 1)
        const normDy = dy / (distToSpotlight || 1)
        
        // Attraction strength depends on distance and type of particle
        let attractionFactor = 0
        
        if (spotlightActive) {
          // Only apply if spotlight is on right side (chaotic side)
          if (spotlightX > size / 2) {
            // For ordered particles - can be pulled from grid
            if (this.order) {
              // Attraction gets stronger the closer to the spotlight
              if (distToSpotlight < spotlightRadius * 1.5) {
                attractionFactor = Math.pow(1 - Math.min(1, distToSpotlight / (spotlightRadius * 1.5)), 2) * spotlightStrength
                this.attracted = attractionFactor > 0.05
                
                if (this.attracted) {
                  // Add jitter when attracted
                  this.velocity.x += (Math.random() - 0.5) * 0.5
                  this.velocity.y += (Math.random() - 0.5) * 0.5
                }
              }
            } 
            // For chaotic particles - stronger attraction
            else {
              if (distToSpotlight < spotlightRadius * 2) {
                attractionFactor = Math.pow(1 - Math.min(1, distToSpotlight / (spotlightRadius * 2)), 1.5) * spotlightStrength * 1.5
              }
            }
          }
        }
        
        if (this.order) {
          // Generate chaotic influence value
          if (attractionFactor > 0) {
            this.influence = Math.max(this.influence, attractionFactor * 1.2)
            
            // Add spotlight attraction force
            this.velocity.x += normDx * attractionFactor * 1.2
            this.velocity.y += normDy * attractionFactor * 1.2
            
            // Update position with velocity
            this.x += this.velocity.x
            this.y += this.velocity.y
            
            // Add more jitter to make it look chaotic when influenced
            if (this.influence > 0.3) {
              this.velocity.x += (Math.random() - 0.5) * this.influence * 0.8
              this.velocity.y += (Math.random() - 0.5) * this.influence * 0.8
            }
            
            // Dampen velocity
            this.velocity.x *= 0.94
            this.velocity.y *= 0.94
          } else {
            // If not attracted, gradually return to original position
            const returnSpeed = this.attracted ? 0.02 : 0.1
            this.x += (this.originalX - this.x) * returnSpeed
            this.y += (this.originalY - this.y) * returnSpeed
            this.velocity.x *= 0.9
            this.velocity.y *= 0.9
            this.attracted = false
            this.influence *= 0.97
          }
          
          // Apply cross-boundary influence from chaotic particles
          if (this.neighbors.length > 0) {
            let chaoticInfluence = 0
            this.neighbors.forEach(neighbor => {
              if (!neighbor.order && Math.random() < 0.03) {
                const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
                if (distance < 80) {
                  // Pull towards chaotic particle at boundary
                  const pullStrength = 0.1 * Math.pow(1 - distance / 80, 2)
                  this.velocity.x += (neighbor.x - this.x) * pullStrength
                  this.velocity.y += (neighbor.y - this.y) * pullStrength
                  chaoticInfluence = Math.max(chaoticInfluence, pullStrength * 2)
                }
              }
            })
            
            this.influence = Math.max(this.influence, chaoticInfluence)
          }
        } else {
          // Chaotic particles - more dynamic movement
          
          // Random movement - stronger for more chaos
          this.velocity.x += (Math.random() - 0.5) * 0.8
          this.velocity.y += (Math.random() - 0.5) * 0.8
          
          // Spotlight gravity attraction
          if (attractionFactor > 0) {
            // Stronger pull to create concentration areas
            this.velocity.x += normDx * attractionFactor * 1.5
            this.velocity.y += normDy * attractionFactor * 1.5
            
            // Concentrate chaotic particles around spotlight
            if (distToSpotlight < spotlightRadius * 0.5) {
              // Orbital effect - perpendicular force
              this.velocity.x += -normDy * attractionFactor * 0.8
              this.velocity.y += normDx * attractionFactor * 0.8
            }
          }
          
          // Dampen velocity - but not too much to keep chaotic movement
          this.velocity.x *= 0.92
          this.velocity.y *= 0.92
          
          // Update position
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary checks - keep within right half with elastic bouncing
          if (this.x < size / 2) {
            this.velocity.x = Math.abs(this.velocity.x) * 1.2
            this.x = size / 2 + 1
          } else if (this.x > size) {
            this.velocity.x = -Math.abs(this.velocity.x) * 1.2
            this.x = size - 1
          }
          
          if (this.y < 0) {
            this.velocity.y = Math.abs(this.velocity.y) * 1.2
            this.y = 1
          } else if (this.y > size) {
            this.velocity.y = -Math.abs(this.velocity.y) * 1.2
            this.y = size - 1
          }
        }
        
        // Update connection brightness for glow effect
        this.connectionBrightness *= 0.95
        this.connectionCount = 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Adjust size based on influence, connection count, and particle type
        const influenceFactor = this.order ? (1 + this.influence * 2) : 1
        const sizeFactor = 1 + Math.min(0.5, this.connectionCount / 20)
        const drawSize = this.size * influenceFactor * sizeFactor
          
        // Adjust color based on influence and connection count
        let alpha = this.order 
          ? 0.8 + this.influence * 0.2 
          : 0.9
          
        // Brighter if lots of connections
        if (this.connectionBrightness > 0) {
          alpha = Math.min(1, alpha + this.connectionBrightness * 0.3)
        }
          
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

    // Add chaotic particles on the right side - much more to match screenshot
    for (let i = 0; i < 350; i++) {
      const x = Math.random() * (size / 2) + size / 2
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships - critical for connection density
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Different connection distances based on particle types
          let maxDistance = 60
          
          if (!particle.order && !other.order) {
            // Chaos to chaos - very high density of connections
            // This is key for matching the screenshot
            maxDistance = particle.influence > 0.2 || other.influence > 0.2 ? 110 : 90
          } else if (particle.order && other.order) {
            // Order to order - grid-like connections
            const dx = Math.abs(particle.originalX - other.originalX)
            const dy = Math.abs(particle.originalY - other.originalY)
            // Only connect to immediate neighbors in grid
            return (dx <= spacing * 1.1 && dy < spacing * 0.5) || 
                   (dy <= spacing * 1.1 && dx < spacing * 0.5)
          } else {
            // Order to chaos - boundary connections
            // More connections at the boundary to match screenshot
            if (Math.abs(particle.x - size / 2) < 20 || Math.abs(other.x - size / 2) < 20) {
              maxDistance = 100
            } else {
              maxDistance = 80
            }
          }
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < maxDistance
        })
      })
    }

    let animationId: number
    let frameCount = 0
    
    // Auto-move spotlight in an interesting pattern
    function updateSpotlight() {
      if (!autoMoveSpotlight) return
      
      autoMoveTime += 0.01
      
      // Create a complex movement pattern
      const t = autoMoveTime
      const radiusX = size * 0.2
      const radiusY = size * 0.3
      const centerX = size * 0.75
      const centerY = size * 0.5
      
      // Lissajous curve for natural-looking motion
      spotlightX = centerX + radiusX * Math.sin(t * 0.8) * Math.cos(t * 0.2)
      spotlightY = centerY + radiusY * Math.sin(t * 0.7) * Math.sin(t * 0.3)
      
      // Ensure it stays mostly on the right side
      spotlightX = Math.max(size / 2, Math.min(size, spotlightX))
    }
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      frameCount++
      
      // Update spotlight position
      updateSpotlight()

      // Update neighbor relationships periodically to keep network dynamic
      if (frameCount % 30 === 0) {
        updateNeighbors()
      }

      // Draw connections first - creates the network effect
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          // Connection distance varies by particle types
          let maxDist = 60
          
          if (!particle.order && !neighbor.order) {
            // Chaos to chaos - dense network with longer connections
            maxDist = 90
            
            // Extra long connections near spotlight to create the focal point
            const distToSpotlight1 = Math.hypot(particle.x - spotlightX, particle.y - spotlightY)
            const distToSpotlight2 = Math.hypot(neighbor.x - spotlightX, neighbor.y - spotlightY)
            
            if (distToSpotlight1 < spotlightRadius || distToSpotlight2 < spotlightRadius) {
              maxDist = 110
            }
          } else if (particle.order && neighbor.order) {
            // Order to order - tight grid connections
            maxDist = 40
          } else {
            // Order to chaos - boundary connections
            maxDist = 80
            
            // Increase boundary connection probability
            if (Math.abs(particle.x - size / 2) < 20 || Math.abs(neighbor.x - size / 2) < 20) {
              maxDist = 100
            }
          }
          
          if (distance < maxDist) {
            // Calculate alpha based on distance
            let alpha = 0.35 * Math.pow(1 - distance / maxDist, 1.2)
            
            // Cross-boundary connections brighter
            if ((particle.order && !neighbor.order) || (!particle.order && neighbor.order)) {
              alpha *= 1.4
            }
            
            // Brighter connections for attracted/influenced particles
            if (particle.influence > 0.2 || neighbor.influence > 0.2) {
              alpha *= 1.5
              
              // Register connection for particle glow effect
              particle.connectionBrightness = Math.max(particle.connectionBrightness, 
                                                     particle.influence * 0.5)
              neighbor.connectionBrightness = Math.max(neighbor.connectionBrightness, 
                                                      neighbor.influence * 0.5)
            }
            
            // Count connections for sizing effect
            particle.connectionCount++
            neighbor.connectionCount++
            
            // Extra bright connections near spotlight
            const distToSpotlight1 = Math.hypot(particle.x - spotlightX, particle.y - spotlightY)
            const distToSpotlight2 = Math.hypot(neighbor.x - spotlightX, neighbor.y - spotlightY)
            
            if ((distToSpotlight1 < spotlightRadius * 0.7) || 
                (distToSpotlight2 < spotlightRadius * 0.7)) {
              alpha *= 1.6
            }
            
            // Draw the connection line
            const alphaHex = Math.min(255, Math.round(alpha * 255))
                .toString(16)
                .padStart(2, '0')
            
            ctx.strokeStyle = `${particleColor}${alphaHex}`
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
        className="absolute top-0 left-0 w-full h-full cursor-none"
      />
    </div>
  )
}