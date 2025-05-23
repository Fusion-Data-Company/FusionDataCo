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
    
    // Create multiple attractor points that move independently
    const attractors = [
      { x: size * 0.75, y: size * 0.3, radius: 80, strength: 0.4, phase: 0 },
      { x: size * 0.65, y: size * 0.7, radius: 70, strength: 0.3, phase: 2.1 },
      { x: size * 0.85, y: size * 0.5, radius: 90, strength: 0.35, phase: 4.2 }
    ]
    
    // For automatic movement
    let autoMoveTime = 0
    let autoMoveAttractors = true
    
    // Mouse adds another attractor point
    let mouseX = -100
    let mouseY = -100
    let mouseActive = false
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left)
      mouseY = (e.clientY - rect.top)
      mouseActive = true
      autoMoveAttractors = false
    })

    canvas.addEventListener('mouseleave', () => {
      mouseActive = false
      autoMoveAttractors = true
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
      connectionCount: number
      connectionBrightness: number
      attractorInfluence: number
      repelForce: number

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
        this.connectionCount = 0
        this.connectionBrightness = 0
        this.attractorInfluence = 0
        this.repelForce = Math.random() * 0.4 + 0.8 // Varied repulsion strength
      }

      update() {
        // Calculate combined influences from all attractors
        let totalInfluence = 0
        let netForceX = 0
        let netForceY = 0
        
        // Process all the attractors (including mouse)
        const allAttractors = [...attractors]
        
        // Add mouse as an attractor when active
        if (mouseActive && mouseX > 0) {
          allAttractors.push({
            x: mouseX,
            y: mouseY,
            radius: 100,
            strength: 0.6,
            phase: 0
          })
        }
        
        // Calculate forces from all attractors
        for (const attractor of allAttractors) {
          // Skip attractors on the left side (ordered side) - only right side has attractors
          if (attractor.x < size / 2) continue
          
          const dx = attractor.x - this.x
          const dy = attractor.y - this.y
          const distToAttractor = Math.hypot(dx, dy)
          
          // Skip if too far from this attractor
          const effectiveRadius = this.order ? attractor.radius * 1.5 : attractor.radius * 2.5
          if (distToAttractor > effectiveRadius) continue
          
          // Calculate normalized direction and attraction strength
          const normDx = dx / (distToAttractor || 1)
          const normDy = dy / (distToAttractor || 1)
          
          // Different influence formula for ordered vs chaotic particles
          let attractionStrength = 0
          
          if (this.order) {
            // Ordered particles - only influenced when close to attractors
            if (distToAttractor < effectiveRadius) {
              // Quadratic falloff - stronger near the attractor
              attractionStrength = Math.pow(1 - Math.min(1, distToAttractor / effectiveRadius), 2) * 
                                  attractor.strength
            }
          } else {
            // Chaotic particles - wider influence range with various behaviors
            if (distToAttractor < effectiveRadius) {
              // Linear falloff with randomness
              attractionStrength = (1 - distToAttractor / effectiveRadius) * 
                                  attractor.strength * 
                                  (0.8 + Math.random() * 0.4)
              
              // Special behavior: some particles orbit rather than directly attract
              if (distToAttractor < attractor.radius * 0.4 && Math.random() < 0.3) {
                // Orbital force - perpendicular to attraction direction
                netForceX += -normDy * attractionStrength * 0.8
                netForceY += normDx * attractionStrength * 0.8
              }
              
              // Particles near attractors repel each other slightly
              if (distToAttractor < attractor.radius * 0.5) {
                this.repelForce = Math.min(1.5, this.repelForce + 0.02)
              }
            }
          }
          
          // Add this attractor's influence to net force
          netForceX += normDx * attractionStrength
          netForceY += normDy * attractionStrength
          
          // Track total influence
          totalInfluence = Math.max(totalInfluence, attractionStrength)
        }
        
        // Apply the movement logic based on particle type
        if (this.order) {
          // Ordered grid particles
          if (totalInfluence > 0.05) {
            // When influenced by attractors
            this.influence = Math.max(this.influence, totalInfluence)
            
            // Apply net force from attractors
            this.velocity.x += netForceX * 0.8
            this.velocity.y += netForceY * 0.8
            
            // Add randomness when influenced
            this.velocity.x += (Math.random() - 0.5) * this.influence * 0.4
            this.velocity.y += (Math.random() - 0.5) * this.influence * 0.4
            
            // Update position
            this.x += this.velocity.x
            this.y += this.velocity.y
            
            // Dampen velocity gradually
            this.velocity.x *= 0.94
            this.velocity.y *= 0.94
          } else {
            // Return to original grid position when not influenced
            const returnSpeed = 0.06
            this.x += (this.originalX - this.x) * returnSpeed
            this.y += (this.originalY - this.y) * returnSpeed
            this.velocity.x *= 0.9
            this.velocity.y *= 0.9
            this.influence *= 0.95
          }
          
          // Apply cross-boundary pull from chaotic particles
          if (this.neighbors.length > 0 && Math.random() < 0.04) {
            let chaoticInfluence = 0
            
            // Find chaotic neighbors pulling on this ordered particle
            this.neighbors.forEach(neighbor => {
              if (!neighbor.order && Math.random() < 0.1) {
                const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
                if (distance < 90) {
                  // Pull towards chaotic particle at boundary
                  const pullStrength = 0.03 * Math.pow(1 - distance / 90, 1.5)
                  this.velocity.x += (neighbor.x - this.x) * pullStrength
                  this.velocity.y += (neighbor.y - this.y) * pullStrength
                  chaoticInfluence = Math.max(chaoticInfluence, pullStrength * 3)
                }
              }
            })
            
            this.influence = Math.max(this.influence, chaoticInfluence)
          }
        } else {
          // Chaotic particles - dynamic movement
          
          // Random movement for chaos
          this.velocity.x += (Math.random() - 0.5) * 0.7
          this.velocity.y += (Math.random() - 0.5) * 0.7
          
          // Apply net force from attractors
          if (totalInfluence > 0) {
            // Attractor influence
            this.velocity.x += netForceX * 1.2
            this.velocity.y += netForceY * 1.2
            
            // Save for connection effects
            this.attractorInfluence = totalInfluence
          } else {
            this.attractorInfluence *= 0.95
          }
          
          // Apply repulsion from other chaotic particles to prevent clumping
          if (this.neighbors.length > 0) {
            let repelX = 0
            let repelY = 0
            
            this.neighbors.forEach(neighbor => {
              if (!neighbor.order) {
                const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
                if (distance < 30) {
                  // Repel from very close chaotic neighbors
                  const repelStrength = (1 - distance / 30) * 0.04 * this.repelForce
                  const nx = (this.x - neighbor.x) / (distance || 1)
                  const ny = (this.y - neighbor.y) / (distance || 1)
                  repelX += nx * repelStrength
                  repelY += ny * repelStrength
                }
              }
            })
            
            // Apply repulsion
            this.velocity.x += repelX
            this.velocity.y += repelY
          }
          
          // Gradually decrease repulsion force
          this.repelForce *= 0.995
          
          // Dampen velocity
          this.velocity.x *= 0.93
          this.velocity.y *= 0.93
          
          // Update position
          this.x += this.velocity.x
          this.y += this.velocity.y

          // Boundary constraints
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
        
        // Reset connections for next frame
        this.connectionBrightness *= 0.95
        this.connectionCount = 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Size based on particle type, influence and connections
        const influenceFactor = this.order ? (1 + this.influence * 1.5) : 1
        const sizeFactor = 1 + Math.min(0.5, this.connectionCount / 15)
        const attractorFactor = 1 + this.attractorInfluence * 0.5
        
        // Combined size factors
        const drawSize = this.size * influenceFactor * sizeFactor * 
                        (this.order ? 1 : attractorFactor)
          
        // Color alpha based on particle properties
        let alpha = this.order 
          ? 0.85 + this.influence * 0.15 
          : 0.9 + this.attractorInfluence * 0.1
          
        // Brighter with more connections
        if (this.connectionBrightness > 0) {
          alpha = Math.min(1, alpha + this.connectionBrightness * 0.2)
        }
          
        // Draw the particle
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

    // Add chaotic particles on the right side - more to match screenshot
    for (let i = 0; i < 380; i++) {
      const x = Math.random() * (size / 2) + size / 2
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships - critical for connection density
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Connection distance thresholds based on particle types
          let maxDistance = 60
          
          if (!particle.order && !other.order) {
            // Chaos to chaos - higher density of connections
            maxDistance = 80
            
            // Higher connection density in areas with high influence
            if (particle.attractorInfluence > 0.2 || other.attractorInfluence > 0.2) {
              maxDistance = 100
            }
          } else if (particle.order && other.order) {
            // Order to order - grid-like connections
            const dx = Math.abs(particle.originalX - other.originalX)
            const dy = Math.abs(particle.originalY - other.originalY)
            // Only connect to immediate neighbors in grid
            return (dx <= spacing * 1.1 && dy < spacing * 0.5) || 
                   (dy <= spacing * 1.1 && dx < spacing * 0.5)
          } else {
            // Order to chaos - boundary connections
            // More connections at the boundary
            if (Math.abs(particle.x - size / 2) < 25 || Math.abs(other.x - size / 2) < 25) {
              maxDistance = 85
            } else {
              maxDistance = 70
            }
          }
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < maxDistance
        })
      })
    }

    let animationId: number
    let frameCount = 0
    
    // Update attractor positions
    function updateAttractors() {
      if (!autoMoveAttractors) return
      
      autoMoveTime += 0.006
      
      // Update each attractor with different movement patterns
      attractors.forEach((attractor, index) => {
        const t = autoMoveTime + attractor.phase
        
        // Different movement pattern for each attractor
        if (index === 0) {
          // First attractor - figure 8 pattern
          attractor.x = size * 0.75 + size * 0.15 * Math.sin(t * 0.7)
          attractor.y = size * 0.4 + size * 0.25 * Math.sin(t * 1.3) * Math.cos(t * 0.7)
        } else if (index === 1) {
          // Second attractor - bouncing pattern
          attractor.x = size * 0.65 + size * 0.12 * Math.cos(t * 0.8)
          attractor.y = size * 0.6 + size * 0.2 * Math.sin(t * 1.1)
        } else {
          // Third attractor - circular motion
          attractor.x = size * 0.8 + size * 0.15 * Math.cos(t * 0.5)
          attractor.y = size * 0.5 + size * 0.3 * Math.sin(t * 0.5)
        }
        
        // Ensure attractors stay on the right side
        attractor.x = Math.max(size / 2 + 20, Math.min(size - 20, attractor.x))
      })
    }
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      frameCount++
      
      // Update attractor positions
      updateAttractors()

      // Update neighbor relationships periodically
      if (frameCount % 45 === 0) {
        updateNeighbors()
      }

      // Draw connections first
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          // Calculate maximum connection distance based on particle types
          let maxDist = 60
          
          if (!particle.order && !neighbor.order) {
            // Chaos to chaos - denser connections
            maxDist = particle.attractorInfluence > 0.1 || neighbor.attractorInfluence > 0.1 
              ? 100 : 80
          } else if (particle.order && neighbor.order) {
            // Order to order - grid-like connections
            maxDist = 40
          } else {
            // Order to chaos - boundary connections
            maxDist = 70
            
            // More connections at the boundary
            if (Math.abs(particle.x - size / 2) < 25 || Math.abs(neighbor.x - size / 2) < 25) {
              maxDist = 85
            }
          }
          
          if (distance < maxDist) {
            // Calculate alpha based on distance
            let alpha = 0.3 * Math.pow(1 - distance / maxDist, 1.2)
            
            // Cross-boundary connections brighter
            if ((particle.order && !neighbor.order) || (!particle.order && neighbor.order)) {
              alpha *= 1.3
            }
            
            // Higher alpha for connections with influenced particles
            if (particle.influence > 0.1 || neighbor.influence > 0.1 || 
                particle.attractorInfluence > 0.1 || neighbor.attractorInfluence > 0.1) {
              alpha *= 1.3
              
              // Register connection effect
              particle.connectionBrightness = Math.max(
                particle.connectionBrightness,
                Math.max(particle.influence, particle.attractorInfluence) * 0.4
              )
              
              neighbor.connectionBrightness = Math.max(
                neighbor.connectionBrightness,
                Math.max(neighbor.influence, neighbor.attractorInfluence) * 0.4
              )
            }
            
            // Count connections for particle sizing
            particle.connectionCount++
            neighbor.connectionCount++
            
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
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  )
}