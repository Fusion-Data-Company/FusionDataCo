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
      affectedByChaos: boolean
      disturbance: number

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
        this.affectedByChaos = false
        this.disturbance = 0
      }

      update() {
        if (this.order) {
          // Check if this ordered particle is close to the chaos boundary and should start becoming chaotic
          const distanceToEdge = Math.abs(this.x - size/2)
          
          // Particles near the boundary have a higher chance of being affected
          const edgeProximityFactor = Math.max(0, 1 - distanceToEdge / 50)
          
          // Increase the disturbance based on the edge proximity and influence from chaotic neighbors
          if (edgeProximityFactor > 0 && Math.random() < 0.05 * edgeProximityFactor + this.influence * 0.5) {
            this.disturbance = Math.min(1, this.disturbance + 0.01 + this.influence * 0.05)
          }

          // Gradually increase influence from chaotic neighbors
          let chaosInfluence = { x: 0, y: 0 }
          
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order || neighbor.disturbance > 0.5) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100) * (neighbor.disturbance || 1)
              chaosInfluence.x += (neighbor.velocity.x * strength * 1.2)
              chaosInfluence.y += (neighbor.velocity.y * strength * 1.2)
              this.influence = Math.max(this.influence, strength * 0.8)
            }
          })

          // Blend ordered movement with chaos influence based on disturbance level
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          
          // As disturbance increases, particle is less likely to return to original position
          // and more likely to be influenced by chaos
          this.x += dx * 0.1 * (1 - this.disturbance) + chaosInfluence.x * (0.5 + this.disturbance * 2)
          this.y += dy * 0.1 * (1 - this.disturbance) + chaosInfluence.y * (0.5 + this.disturbance * 2)
          
          // Once significantly disturbed, add some random movement
          if (this.disturbance > 0.3) {
            this.velocity.x += (Math.random() - 0.5) * 0.1 * this.disturbance
            this.velocity.y += (Math.random() - 0.5) * 0.1 * this.disturbance
            this.velocity.x *= 0.95
            this.velocity.y *= 0.95
            this.x += this.velocity.x * this.disturbance
            this.y += this.velocity.y * this.disturbance
          }
          
          // After being heavily influenced, possibly transition to chaos
          if (this.disturbance > 0.8 && Math.random() < 0.02) {
            this.order = false
            this.size = 2
          }
          
          // Influence gradually fades if not continuously affected
          this.influence *= 0.99
          
          // Boundary check - if an ordered particle crosses into chaos territory, it becomes chaotic
          if (this.x > size/2 + 5) { 
            this.disturbance = Math.min(1, this.disturbance + 0.1)
            if (Math.random() < 0.1 * this.disturbance) {
              this.order = false
              this.size = 2
            }
          }
        } else {
          // Full chaos movement with more natural flow
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
        
        // Calculate alpha based on particle type and disturbance
        let alpha = 0
        if (this.order) {
          // Ordered particles fade as they become more disturbed
          alpha = Math.max(0.4, 0.8 - this.disturbance * 0.3)
        } else {
          alpha = 0.8
        }
        
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
    for (let i = 0; i < 40; i++) {
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
          const connectionDistance = particle.order ? 40 : 70
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          
          // Create more connections on the chaotic right side
          if (!particle.order && !other.order) {
            return distance < connectionDistance
          }
          
          // Almost no connections between ordered particles
          if (particle.order && other.order) {
            return distance < 30 && Math.random() > 0.9
          }
          
          // Important: Allow more connections between ordered and chaotic particles
          // to enable the "pulling" effect we want
          return distance < 60 && Math.random() > 0.6
        })
      })
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)

      // Update neighbor relationships periodically
      if (time % 20 === 0) {
        updateNeighbors()
      }

      // Draw connection lines first (under particles)
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          
          // Different line appearance based on particle types
          if (particle.order && neighbor.order) {
            // Very faint connections between ordered particles
            if (Math.random() > 0.98) { // Only draw a tiny percentage
              const alpha = 0.05
              ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
              ctx.lineWidth = 0.3
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
            }
          } else if ((!particle.order && neighbor.order) || (particle.order && !neighbor.order)) {
            // Connections between ordered and chaotic - the pull effect
            const maxDist = 60
            if (distance < maxDist) {
              // Stronger lines for closer particles
              const alpha = 0.2 * (1 - distance / maxDist)
              ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
            }
          } else {
            // Connections between chaotic particles
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