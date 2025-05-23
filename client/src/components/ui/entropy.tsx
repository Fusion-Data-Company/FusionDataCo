import { useEffect, useRef, useState } from 'react'

interface EntropyProps {
  className?: string
  size?: number
}

export function Entropy({ className = "", size = 400 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX / window.devicePixelRatio,
        y: (e.clientY - rect.top) * scaleY / window.devicePixelRatio,
        active: true
      }
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)

    // Base settings
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    // Using black theme
    const particleColor = '#ffffff'

    // Multiple spotlights for more dynamic effect
    const spotlights = [
      {
        x: size * 0.75, 
        y: size * 0.4,
        radius: size * 0.12,
        intensity: 0.8,
        speed: 0.0005,
        offset: 0
      },
      {
        x: size * 0.65, 
        y: size * 0.6,
        radius: size * 0.1,
        intensity: 0.6,
        speed: 0.0007,
        offset: Math.PI / 3
      }
    ]

    // 3D effect settings
    const depthScale = 0.3 // Scale for 3D depth effect
    const zRange = size * 0.2 // Range of z values

    class Particle {
      x: number
      y: number
      z: number // Adding z dimension for 3D effect
      size: number
      order: boolean
      velocity: { x: number; y: number; z: number }
      originalX: number
      originalY: number
      originalZ: number
      influence: number
      neighbors: Particle[]
      brightness: number
      active: boolean
      inSpotlight: boolean
      spotlightInfluence: number
      color: string

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.z = order ? 0 : (Math.random() - 0.5) * zRange // Z dimension for 3D
        this.originalX = x
        this.originalY = y
        this.originalZ = this.z
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * (order ? 0.5 : 3),
          y: (Math.random() - 0.5) * (order ? 0.5 : 3),
          z: (Math.random() - 0.5) * (order ? 0.1 : 1.5)
        }
        this.influence = 0
        this.neighbors = []
        this.brightness = Math.random() * 0.3 + 0.7
        this.active = true
        this.inSpotlight = false
        this.spotlightInfluence = 0
        this.color = particleColor
      }

      update(time: number) {
        // Reset spotlight influence
        this.spotlightInfluence = 0
        
        // Check influence from each spotlight
        spotlights.forEach(spot => {
          const distToSpotlight = Math.hypot(this.x - spot.x, this.y - spot.y)
          if (distToSpotlight < spot.radius * 1.5) {
            const strength = Math.max(0, 1 - distToSpotlight / (spot.radius * 1.5))
            this.spotlightInfluence = Math.max(this.spotlightInfluence, strength * spot.intensity)
            this.inSpotlight = true
          }
        })
        
        // Check mouse influence if active
        if (mouseRef.current.active) {
          const distToMouse = Math.hypot(this.x - mouseRef.current.x, this.y - mouseRef.current.y)
          const mouseRadius = size * 0.15
          
          if (distToMouse < mouseRadius) {
            const strength = Math.max(0, 1 - distToMouse / mouseRadius)
            this.spotlightInfluence = Math.max(this.spotlightInfluence, strength * 0.9)
            this.inSpotlight = true
          }
        }
        
        if (this.order) {
          // Calculate more dynamic 3D movement for ordered particles
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          const dz = this.originalZ - this.z

          // Calculate influence from chaos particles with 3D awareness
          const chaosInfluence = { x: 0, y: 0, z: 0 }
          let totalInfluence = 0
          
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              // Use 3D distance for more realistic influence
              const distance = Math.sqrt(
                Math.pow(this.x - neighbor.x, 2) + 
                Math.pow(this.y - neighbor.y, 2) + 
                Math.pow(this.z - neighbor.z, 2) * depthScale
              )
              
              const strength = Math.max(0, 1 - distance / 120)
              chaosInfluence.x += neighbor.velocity.x * strength * 2
              chaosInfluence.y += neighbor.velocity.y * strength * 2
              chaosInfluence.z += neighbor.velocity.z * strength * 1.5
              
              totalInfluence += strength
              this.influence = Math.max(this.influence, strength)
            }
          })
          
          // Normalize influence for smoother movement
          if (totalInfluence > 0) {
            chaosInfluence.x /= totalInfluence
            chaosInfluence.y /= totalInfluence
            chaosInfluence.z /= totalInfluence
          }

          // Spotlight has massive influence on movement - creates a strong pull
          if (this.inSpotlight) {
            // Apply strong force toward closest spotlight
            let closestSpot = null
            let minDist = Infinity
            
            spotlights.forEach(spot => {
              const dist = Math.hypot(this.x - spot.x, this.y - spot.y)
              if (dist < minDist) {
                minDist = dist
                closestSpot = spot
              }
            })
            
            // If mouse is active and closer, use mouse position
            if (mouseRef.current.active) {
              const mouseDist = Math.hypot(this.x - mouseRef.current.x, this.y - mouseRef.current.y)
              if (mouseDist < minDist) {
                closestSpot = {
                  x: mouseRef.current.x,
                  y: mouseRef.current.y,
                  radius: size * 0.15,
                  intensity: 0.9,
                  speed: 0,
                  offset: 0
                }
              }
            }
            
            if (closestSpot) {
              // Create a strong pull toward the spotlight
              const spotDir = {
                x: closestSpot.x - this.x,
                y: closestSpot.y - this.y,
                z: 0 - this.z // Pull toward z=0 for flatter shape in spotlight
              }
              
              const spotDist = Math.hypot(spotDir.x, spotDir.y, spotDir.z * depthScale)
              if (spotDist > 0) {
                const pullStrength = 0.08 * this.spotlightInfluence
                chaosInfluence.x += (spotDir.x / spotDist) * pullStrength * 2
                chaosInfluence.y += (spotDir.y / spotDist) * pullStrength * 2
                chaosInfluence.z += (spotDir.z / spotDist) * pullStrength
              }
              
              // Increase influence when in spotlight
              this.influence = Math.max(this.influence, this.spotlightInfluence * 0.8)
            }
          }

          // Apply temporal oscillation for more dynamic 3D movement
          const oscillation = {
            x: Math.sin(time * 0.002 + this.originalX * 0.1) * 0.1,
            y: Math.cos(time * 0.002 + this.originalY * 0.1) * 0.1,
            z: Math.sin(time * 0.003 + this.originalX * 0.2) * 0.05
          }
          
          // Blend ordered movement with chaos influence and oscillation
          const chaosFactor = Math.min(1, this.influence * 1.8 + this.spotlightInfluence * 0.5)
          const returnFactor = 0.03 * (1 - chaosFactor)
          
          this.x += dx * returnFactor + chaosInfluence.x * chaosFactor + oscillation.x
          this.y += dy * returnFactor + chaosInfluence.y * chaosFactor + oscillation.y
          this.z += dz * returnFactor + chaosInfluence.z * chaosFactor + oscillation.z
          
          // Proximity to boundary increases chance of being pulled into chaos
          const distanceToBoundary = Math.abs(this.x - size/2)
          if (distanceToBoundary < 40 && Math.random() < 0.01 + this.spotlightInfluence * 0.05) {
            this.influence = Math.min(1, this.influence + 0.1 + this.spotlightInfluence * 0.2)
          }

          // Chance to convert to chaos - much higher when in spotlight
          const chaosChance = 0.001 + 
                              (this.influence > 0.7 ? 0.005 : 0) + 
                              (this.spotlightInfluence > 0.5 ? 0.01 : 0)
                              
          if (Math.random() < chaosChance) {
            this.order = false
            this.size = 1.8
            // Give an initial push away from the grid
            this.velocity.x += (Math.random() - 0.3) * 2
            this.velocity.y += (Math.random() - 0.5) * 2
            this.velocity.z += (Math.random() - 0.5) * 1
          }

          // Influences gradually fade if not continuously reinforced
          this.influence *= 0.985
        } else {
          // Chaotic particles with 3D movement
          // Add complex oscillation for more energetic movement
          const oscillation = {
            x: Math.sin(time * 0.01 + this.originalX + this.z * 0.1) * 0.15,
            y: Math.cos(time * 0.01 + this.originalY + this.z * 0.1) * 0.15,
            z: Math.sin(time * 0.015 + this.originalX + this.originalY) * 0.1
          }
          
          this.velocity.x += (Math.random() - 0.5) * 0.9 + oscillation.x
          this.velocity.y += (Math.random() - 0.5) * 0.9 + oscillation.y
          this.velocity.z += (Math.random() - 0.5) * 0.4 + oscillation.z
          
          this.velocity.x *= 0.94
          this.velocity.y *= 0.94
          this.velocity.z *= 0.96
          
          // Spotlight creates a stronger vortex effect
          if (this.inSpotlight) {
            let closestSpot = null
            let minDist = Infinity
            
            spotlights.forEach(spot => {
              const dist = Math.hypot(this.x - spot.x, this.y - spot.y)
              if (dist < minDist) {
                minDist = dist
                closestSpot = spot
              }
            })
            
            // Check if mouse is closer
            if (mouseRef.current.active) {
              const mouseDist = Math.hypot(this.x - mouseRef.current.x, this.y - mouseRef.current.y)
              if (mouseDist < minDist) {
                closestSpot = {
                  x: mouseRef.current.x,
                  y: mouseRef.current.y,
                  radius: size * 0.15,
                  intensity: 0.9,
                  speed: 0,
                  offset: 0
                }
              }
            }
            
            if (closestSpot) {
              // Create a vortex effect - particles spiral around the spotlight
              const toSpot = {
                x: closestSpot.x - this.x,
                y: closestSpot.y - this.y
              }
              
              const dist = Math.hypot(toSpot.x, toSpot.y)
              if (dist > 0) {
                // Circular motion around spotlight + pull toward center
                const tangentialForce = 0.15 * this.spotlightInfluence
                const pullForce = 0.05 * this.spotlightInfluence * (1 - dist/(closestSpot.radius * 1.5))
                
                this.velocity.x += (-toSpot.y / dist * tangentialForce) + (toSpot.x / dist * pullForce)
                this.velocity.y += (toSpot.x / dist * tangentialForce) + (toSpot.y / dist * pullForce)
                
                // Flatten z movement in spotlight for better visibility
                this.velocity.z += -this.z * 0.01 * this.spotlightInfluence
              }
            }
          }
          
          this.x += this.velocity.x
          this.y += this.velocity.y
          this.z += this.velocity.z

          // Boundary checks with 3D awareness
          if (this.x < size / 2 || this.x > size) {
            this.velocity.x *= -0.8
            this.x = Math.max(size / 2, Math.min(size, this.x))
          }
          
          if (this.y < 0 || this.y > size) {
            this.velocity.y *= -0.8
            this.y = Math.max(0, Math.min(size, this.y))
          }
          
          // Z boundaries for 3D depth
          if (Math.abs(this.z) > zRange / 2) {
            this.velocity.z *= -0.8
            this.z = Math.max(-zRange/2, Math.min(zRange/2, this.z))
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Scale particle based on z position for 3D effect
        const zScale = 1 + (this.z / zRange)
        const scaledSize = this.size * (zScale * 0.5 + 0.5)
        
        // Calculate alpha based on multiple factors
        let alpha = this.order ? 
                    0.9 - this.influence * 0.4 : 
                    0.9
        
        // Z-depth affects brightness
        alpha *= 0.7 + (this.z / zRange + 0.5) * 0.6
        
        // Increase brightness in spotlight
        if (this.inSpotlight) {
          alpha = Math.min(1, alpha + this.spotlightInfluence * 0.5)
          
          // Make particles slightly larger in spotlight
          const sizeFactor = 1 + this.spotlightInfluence * 0.8
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, scaledSize * sizeFactor, 0, Math.PI * 2)
          ctx.fillStyle = `${this.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
          
          // Add a subtle glow for spotlight particles
          if (this.spotlightInfluence > 0.3) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, scaledSize * sizeFactor * 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `${this.color}${Math.round(alpha * 0.15 * 255).toString(16).padStart(2, '0')}`
            ctx.fill()
          }
        } else {
          // Regular rendering with 3D scaling
          ctx.beginPath()
          ctx.arc(this.x, this.y, scaledSize, 0, Math.PI * 2)
          ctx.fillStyle = `${this.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
          ctx.fill()
        }
      }
    }

    // Create particle grid with small z-variance for subtle 3D
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

    // Add additional chaos particles with 3D distribution
    for (let i = 0; i < 250; i++) {
      const x = Math.random() * (size / 2) + size / 2
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Update neighbor relationships - establish more connections
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          
          // Use 3D distance calculation for better neighbor relationships
          const distance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + 
            Math.pow(particle.y - other.y, 2) + 
            Math.pow(particle.z - other.z, 2) * depthScale
          )
          
          // Different connection distances based on particle types
          let connectionDistance = 100
          
          if (!particle.order && !other.order) {
            // Chaos to chaos - higher density of connections
            connectionDistance = 130
          } else if (particle.order && other.order) {
            // Order to order - fewer connections
            connectionDistance = 30
          } else {
            // Order to chaos - medium connections at boundary
            connectionDistance = 90
          }
          
          // Add some z-dependent connection logic
          const zProximity = Math.abs(particle.z - other.z) < zRange * 0.4
          
          return distance < connectionDistance && (zProximity || Math.random() < 0.7)
        })
      })
    }

    // Update spotlight positions
    function updateSpotlights(time: number) {
      spotlights.forEach((spot, i) => {
        // Each spotlight follows a unique path
        const t = time * spot.speed + spot.offset
        
        // Complex movement patterns
        if (i === 0) {
          // First spotlight - figure-8 pattern
          const xAmplitude = size * 0.18
          const yAmplitude = size * 0.15
          
          spot.x = size * 0.75 + Math.sin(t) * xAmplitude
          spot.y = size * 0.4 + Math.sin(t * 2) * yAmplitude
        } else {
          // Second spotlight - circular pattern with radial waves
          const radius = size * 0.15
          spot.x = size * 0.7 + Math.cos(t) * radius
          spot.y = size * 0.6 + Math.sin(t) * radius * 0.8
        }
        
        // Dynamic intensity
        const pulseBase = 0.6 + Math.sin(time * 0.002 + i * Math.PI) * 0.2
        const pulseFast = 0.1 * Math.sin(time * 0.01 + i * Math.PI * 0.7)
        spot.intensity = pulseBase + pulseFast
        
        // Radius also pulses slightly
        spot.radius = size * (0.1 + 0.02 * Math.sin(time * 0.003 + i * Math.PI * 0.5))
      })
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      
      // Update spotlight positions
      updateSpotlights(time)

      // Update neighbor relationships periodically
      if (time % 15 === 0) {
        updateNeighbors()
      }

      // Draw spotlights first (ambient glow)
      spotlights.forEach(spot => {
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, 0,
          spot.x, spot.y, spot.radius * 2
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.08 * spot.intensity})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.04 * spot.intensity})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(spot.x, spot.y, spot.radius * 2, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // Add mouse-based spotlight if active
      if (mouseRef.current.active) {
        const mouseRadius = size * 0.15
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, mouseRadius * 1.5
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRadius * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Sort particles by z-index for proper 3D rendering
      const sortedParticles = [...particles].sort((a, b) => a.z - b.z)

      // Draw connections first - use z-index-aware connections
      sortedParticles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          // Use 3D-aware distance
          const distance = Math.sqrt(
            Math.pow(particle.x - neighbor.x, 2) + 
            Math.pow(particle.y - neighbor.y, 2) + 
            Math.pow(particle.z - neighbor.z, 2) * depthScale
          )
          
          let maxDist = 100
          if (!particle.order && !neighbor.order) {
            maxDist = 130
          } else if (particle.order && neighbor.order) {
            maxDist = 30
          } else {
            maxDist = 90
          }
          
          if (distance < maxDist) {
            // Z-aware connection alpha - deeper connections are more transparent
            const zAlpha = 0.5 + (particle.z / zRange + neighbor.z / zRange) * 0.25 + 0.5
            
            // Base alpha for connection with distance falloff
            let alpha = 0.3 * (1 - distance / maxDist) * zAlpha
            
            // Boost connections in spotlight
            let inSpotlightConnection = false
            spotlights.forEach(spot => {
              const connectionMidpointX = (particle.x + neighbor.x) / 2
              const connectionMidpointY = (particle.y + neighbor.y) / 2
              const distToSpotlight = Math.hypot(connectionMidpointX - spot.x, connectionMidpointY - spot.y)
              
              if (distToSpotlight < spot.radius * 1.5) {
                const spotlightFactor = 1 - distToSpotlight/(spot.radius * 1.5)
                alpha = Math.min(1, alpha + spotlightFactor * 0.5 * spot.intensity)
                inSpotlightConnection = true
              }
            })
            
            // Check mouse influence
            if (mouseRef.current.active) {
              const midX = (particle.x + neighbor.x) / 2
              const midY = (particle.y + neighbor.y) / 2
              const mouseDistance = Math.hypot(midX - mouseRef.current.x, midY - mouseRef.current.y)
              const mouseRadius = size * 0.15
              
              if (mouseDistance < mouseRadius * 1.2) {
                const strength = 1 - mouseDistance / (mouseRadius * 1.2)
                alpha = Math.min(1, alpha + strength * 0.6)
                inSpotlightConnection = true
              }
            }
            
            ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = inSpotlightConnection ? 0.7 : 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      // Update and draw all particles in z-order (back to front)
      sortedParticles.forEach(particle => {
        particle.update(time)
      })
      
      // Draw particles back to front for correct z-ordering
      sortedParticles.forEach(particle => {
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
      canvas.removeEventListener('mousemove', handleMouseMove)
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