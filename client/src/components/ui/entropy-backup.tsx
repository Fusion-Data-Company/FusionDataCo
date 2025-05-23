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
    
    // Create multiple attractor points MUCH more spread out across the right side
    // These will have a wider influence range to create a true spread-out effect
    const attractors = [
      { x: size * 0.6, y: size * 0.2, radius: 180, strength: 0.15, phase: 0 },
      { x: size * 0.9, y: size * 0.8, radius: 180, strength: 0.12, phase: 2.1 },
      { x: size * 0.75, y: size * 0.5, radius: 200, strength: 0.1, phase: 4.2 },
      { x: size * 0.65, y: size * 0.7, radius: 150, strength: 0.14, phase: 1.3 },
      { x: size * 0.85, y: size * 0.3, radius: 160, strength: 0.13, phase: 3.4 },
      { x: size * 0.55, y: size * 0.4, radius: 170, strength: 0.11, phase: 5.1 },
      { x: size * 0.95, y: size * 0.6, radius: 190, strength: 0.09, phase: 2.7 }
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
              
              // SPIDER WEB EFFECT: Strong repulsion to prevent getting sucked in
              // When particles get too close to an attractor, they strongly push back
              if (distToAttractor < attractor.radius * 0.5) {
                // Add STRONG repulsion force to push particles away from attractor center
                // This creates the spider web vibration effect
                const repelStrength = (1 - distToAttractor / (attractor.radius * 0.5)) * 0.5
                netForceX -= normDx * repelStrength  // Push AWAY from attractor
                netForceY -= normDy * repelStrength
              }
              
              // Some orbital movement to create interesting patterns
              if (distToAttractor < attractor.radius * 0.7 && Math.random() < 0.2) {
                // Gentle orbital force - perpendicular to attraction direction
                // This keeps particles dancing around rather than getting sucked in
                netForceX += -normDy * attractionStrength * 0.4
                netForceY += normDx * attractionStrength * 0.4
              }
              
              // Particles near attractors repel each other more strongly
              if (distToAttractor < attractor.radius * 0.5) {
                this.repelForce = Math.min(2.0, this.repelForce + 0.05)
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
            
            // Apply VERY GENTLE force from attractors - just enough to vibrate
            this.velocity.x += netForceX * 0.2
            this.velocity.y += netForceY * 0.2
            
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
          
          // Apply very gentle forces to create spider-web like vibration pattern
          if (totalInfluence > 0) {
            // DRASTICALLY REDUCED attractor influence - just enough to create vibration
            // Reduce by 90% to prevent particles getting sucked in
            this.velocity.x += netForceX * 0.12  // Reduced from 1.2 to 0.12 (90% reduction)
            this.velocity.y += netForceY * 0.12
            
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

          // EXTREMELY strict boundary constraints - keep particles fully on screen
          // Right side only - bouncy boundaries with very strong enforcement
          if (this.x < size / 2) {
            // Hard bounce from center divider
            this.velocity.x = Math.abs(this.velocity.x) * 2.0
            this.x = size / 2 + 5
          } else if (this.x > size - 10) {
            // Hard bounce from right edge
            this.velocity.x = -Math.abs(this.velocity.x) * 2.0
            this.x = size - 10
          }
          
          // Top and bottom hard boundaries
          if (this.y < 10) {
            this.velocity.y = Math.abs(this.velocity.y) * 2.0
            this.y = 10
          } else if (this.y > size - 10) {
            this.velocity.y = -Math.abs(this.velocity.y) * 2.0
            this.y = size - 10
          }
          
          // Force particles to remain on screen in case they somehow escape
          this.x = Math.max(size / 2 + 5, Math.min(size - 10, this.x))
          this.y = Math.max(10, Math.min(size - 10, this.y))
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

    // Add THOUSANDS of chaotic particles on the right side for an extremely dense network
    for (let i = 0; i < 6500; i++) {
      // Spread particles more evenly across the right side
      const x = Math.random() * (size / 2 - 10) + size / 2 + 5
      const y = Math.random() * (size - 10) + 5 // Keep away from edges
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships - critical for connection density
    function updateNeighbors() {
      particles.forEach(particle => {
        // Limit number of connections to improve performance with so many particles
        // But ensure well-distributed connections
        const potentialNeighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Get distance for filtering
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          
          // Different distance thresholds based on particle types
          if (!particle.order && !other.order) {
            // Chaos to chaos - much more spread out connections
            // Lower distance threshold to create more spread-out network
            return distance < 60 && Math.random() < 0.6  // Probabilistic connection to spread out
          } else if (particle.order && other.order) {
            // Order to order - grid-like connections
            const dx = Math.abs(particle.originalX - other.originalX)
            const dy = Math.abs(particle.originalY - other.originalY)
            // Only connect to immediate neighbors in grid
            return (dx <= spacing * 1.1 && dy < spacing * 0.5) || 
                   (dy <= spacing * 1.1 && dx < spacing * 0.5)
          } else {
            // Order to chaos - boundary connections
            // Higher probability at the boundary
            if (Math.abs(particle.x - size / 2) < 30 || Math.abs(other.x - size / 2) < 30) {
              return distance < 70 && Math.random() < 0.7
            } else {
              return distance < 50 && Math.random() < 0.3
            }
          }
        })
        
        // Select a limited set of neighbors for better performance
        // This creates a more interesting network topology
        if (!particle.order) {
          // For chaotic particles - limit connections to avoid dense clumps
          particle.neighbors = potentialNeighbors.slice(0, 
            Math.min(potentialNeighbors.length, Math.floor(Math.random() * 5) + 3))
        } else {
          // For ordered particles - we want the grid to be more stable
          particle.neighbors = potentialNeighbors
        }
      })
    }

    let animationId: number
    let frameCount = 0
    
    // Update attractor positions - with MUCH larger movement patterns
    function updateAttractors() {
      if (!autoMoveAttractors) return
      
      autoMoveTime += 0.004 // Slower movement for more gradual effect
      
      // Update each attractor with different movement patterns
      attractors.forEach((attractor, index) => {
        const t = autoMoveTime + attractor.phase
        
        // Different movement pattern for each attractor - MUCH wider movement range
        // These ranges are 3-4x larger than before to spread across the full width
        if (index === 0) {
          // Lissajous pattern
          attractor.x = size * 0.7 + size * 0.25 * Math.sin(t * 0.4)
          attractor.y = size * 0.3 + size * 0.25 * Math.sin(t * 0.7) * Math.cos(t * 0.3)
        } else if (index === 1) {
          // Figure-8 pattern
          attractor.x = size * 0.75 + size * 0.2 * Math.sin(t * 0.6)
          attractor.y = size * 0.75 + size * 0.2 * Math.sin(t * 0.3) * Math.cos(t * 0.6)
        } else if (index === 2) {
          // Large circular orbit
          attractor.x = size * 0.75 + size * 0.23 * Math.cos(t * 0.3)
          attractor.y = size * 0.5 + size * 0.4 * Math.sin(t * 0.3)
        } else if (index === 3) {
          // Wave pattern
          attractor.x = size * 0.65 + size * 0.15 * Math.cos(t * 0.5)
          attractor.y = size * 0.6 + size * 0.3 * Math.sin(t * 0.7)
        } else if (index === 4) {
          // Spiral effect
          attractor.x = size * 0.8 + size * 0.15 * Math.cos(t * 0.4) * (1 + 0.3 * Math.sin(t * 0.2))
          attractor.y = size * 0.4 + size * 0.35 * Math.sin(t * 0.4) * (1 + 0.3 * Math.cos(t * 0.2))
        } else if (index === 5) {
          // Wide arc
          attractor.x = size * 0.6 + size * 0.3 * Math.sin(t * 0.25)
          attractor.y = size * 0.3 + size * 0.2 * Math.cos(t * 0.45) 
        } else {
          // Bouncing pattern
          attractor.x = size * 0.8 + size * 0.18 * Math.sin(t * 0.35)
          attractor.y = size * 0.7 + size * 0.25 * Math.abs(Math.sin(t * 0.3))
        }
        
        // Ensure attractors stay fully on screen with MUCH larger margins
        // Keep away from all edges as requested
        const horizontalMargin = Math.floor(size * 0.15) // 15% of size from edges
        const verticalMargin = Math.floor(size * 0.15) // 15% of size from top/bottom
        
        // Restrict to a safer inner area
        attractor.x = Math.max(size / 2 + horizontalMargin, 
                             Math.min(size - horizontalMargin, attractor.x))
        attractor.y = Math.max(verticalMargin, 
                             Math.min(size - verticalMargin, attractor.y))
      })
    }
    
    function animate() {
      if (!ctx) return
      
      // Clear canvas with transparent black for trails effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, size, size)
      
      // Update all particle positions and states
      particles.forEach(particle => {
        particle.update()
      })
      
      // Update neighbor relationships
      if (frameCount % 30 === 0) {
        updateNeighbors()
      }
      
      // Draw connections between particles first (behind particles)
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 0.5
      
      particles.forEach(particle => {
        // Draw connections to neighbors
        particle.neighbors.forEach(neighbor => {
          // Avoid drawing the same connection twice
          if (particle.order && neighbor.order) {
            // For ordered particles - always draw connections
            const dx = Math.abs(particle.originalX - neighbor.originalX)
            const dy = Math.abs(particle.originalY - neighbor.originalY)
            if ((dx <= spacing * 1.1 && dy < spacing * 0.5) || 
                (dy <= spacing * 1.1 && dx < spacing * 0.5)) {
              const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
              
              // Draw direct lines between ordered particles
              // More opacity when both nodes are influenced by attractors
              const baseOpacity = 0.15
              let opacity = baseOpacity + Math.min(0.4, 
                  (particle.influence + neighbor.influence) * 0.2)
              
              // Lines stretch - reduce opacity
              if (distance > spacing * 1.5) {
                opacity *= Math.max(0.3, 1 - (distance - spacing * 1.5) / (spacing * 2))
              }
              
              // Apply the stroke style
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
              
              // Draw the line
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
              
              // Increment connection counts
              particle.connectionCount++
              neighbor.connectionCount++
              
              // Add brightness if influenced
              if (particle.influence > 0.1 || neighbor.influence > 0.1) {
                particle.connectionBrightness += 0.02
                neighbor.connectionBrightness += 0.02
              }
            }
          } else if (!particle.order && !neighbor.order) {
            // For chaotic particles - only draw some connections
            const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
            if (distance < 60 && Math.random() < 0.3) { // Sparse connections for better look
              // Graduated opacity by distance
              const opacity = Math.max(0.02, 0.15 * (1 - distance / 60))
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
              
              // Draw line with dynamic width
              const width = Math.max(0.2, 0.8 * (1 - distance / 60))
              ctx.lineWidth = width
              
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
              
              // Increment connection counts but less than order-order
              particle.connectionCount += 0.5
              neighbor.connectionCount += 0.5
              
              // Add brightness if influenced by an attractor
              if (particle.attractorInfluence > 0.05 || neighbor.attractorInfluence > 0.05) {
                particle.connectionBrightness += 0.01
                neighbor.connectionBrightness += 0.01
              }
            }
          } else {
            // Boundary connections between order and chaos
            // These should be less frequent but visually impactful
            if (Math.abs(particle.x - size / 2) < 40 || Math.abs(neighbor.x - size / 2) < 40) {
              // Only at the boundary
              const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
              if (distance < 60 && Math.random() < 0.4) {
                // Draw with slightly higher transparency
                const opacity = Math.max(0.03, 0.2 * (1 - distance / 60))
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
                
                // These connections can be slightly thicker
                const width = Math.max(0.3, 0.9 * (1 - distance / 60))
                ctx.lineWidth = width
                
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(neighbor.x, neighbor.y)
                ctx.stroke()
                
                // Increment connection count
                particle.connectionCount += 0.7
                neighbor.connectionCount += 0.7
                
                // Higher brightness boost at the boundary
                const orderedParticle = particle.order ? particle : neighbor
                const chaoticParticle = particle.order ? neighbor : particle
                
                if (orderedParticle.influence > 0.1 || chaoticParticle.attractorInfluence > 0.05) {
                  orderedParticle.connectionBrightness += 0.03
                  chaoticParticle.connectionBrightness += 0.02
                }
              }
            }
          }
        })
      })
      
      // Draw all particles on top
      particles.forEach(particle => {
        particle.draw(ctx)
      })
      
      // Update attractor positions
      updateAttractors()
      
      // Advance frame counter
      frameCount++
      
      // Animation loop
      animationId = requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Clean up on unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      
      // Remove event listeners
      canvas.removeEventListener('mousemove', () => {})
      canvas.removeEventListener('mouseleave', () => {})
    }
  }, [size])

  return (
    <canvas 
      ref={canvasRef}
      className={`${className} bg-black`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
      }}
    />
  )
}