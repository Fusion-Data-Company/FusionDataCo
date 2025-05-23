'use client'
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

    // Right side colors - bright blue and turquoise shades
    const rightSideColors = [
      '#2563eb', // bright blue
      '#0ea5e9', // bright sky blue
      '#0891b2', // bright cyan
      '#14b8a6'  // turquoise
    ]
    
    // Left side is pure white
    const leftSideColor = '#ffffff'
    
    // Create a subtle divider line
    const dividerGradient = ctx.createLinearGradient(size/2, 0, size/2, size);
    dividerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');   // white top
    dividerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)'); // brighter middle
    dividerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');   // white bottom

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      colorIndex: number
      color: string
      originalX: number
      originalY: number
      velocity: { x: number; y: number }
      attractionPoint: { x: number; y: number } | null
      wobble: number
      wobbleSpeed: number
      transitionProgress: number
      transitioning: boolean
      cluster: number

      constructor(x: number, y: number, order: boolean, cluster = 0) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 : 2
        this.order = order
        this.cluster = cluster
        
        // Assign colors based on side
        if (order) {
          // Left side is white
          this.color = leftSideColor
          this.colorIndex = -1
        } else {
          // Right side has colors
          this.colorIndex = Math.floor(Math.random() * rightSideColors.length)
          this.color = rightSideColors[this.colorIndex]
        }
        
        // Very minimal velocity for precise control
        this.velocity = {
          x: 0,
          y: 0
        }
        
        // For particles being pulled across
        this.attractionPoint = null
        this.transitionProgress = 0
        this.transitioning = false
        
        // Add subtle movement
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = 0.02 + Math.random() * 0.03
      }

      update(time: number, mouseX: number, mouseY: number) {
        if (this.order) {
          // LEFT SIDE PARTICLES - Artistic patterns with subtle movement
          
          // Very slight breathing effect on left grid - subtle expand/contract
          const breathingPhase = Math.sin(time * 0.1) * 0.5
          const breathingX = (this.originalX - size/4) * (1.0 + breathingPhase * 0.01)
          
          // Apply the very subtle breathing motion
          this.x = size/4 + breathingX
          this.y = this.originalY
          
          // Mouse influence on left side - particles move away slightly when mouse is nearby
          const mouseDistance = Math.hypot(mouseX - this.x, mouseY - this.y)
          if (mouseDistance < 60) {
            const repelX = (this.x - mouseX) / mouseDistance * 2
            const repelY = (this.y - mouseY) / mouseDistance * 2
            
            this.x += repelX
            this.y += repelY
          } else {
            // Otherwise slowly return to original position
            this.x += (this.originalX - this.x) * 0.1
            this.y += (this.originalY - this.y) * 0.1
          }
          
          // Very rarely allow a particle to cross to the right (1/2500 chance)
          if (Math.random() < 0.0004 && !this.transitioning && this.x > size * 0.4) {
            this.transitioning = true
            this.attractionPoint = {
              x: size/2 + 5 + Math.random() * 20,
              y: this.y + (Math.random() - 0.5) * 10
            }
          }
          
          // Handle particles being pulled to right side (very rarely)
          if (this.transitioning && this.attractionPoint) {
            const targetX = this.attractionPoint.x
            const targetY = this.attractionPoint.y
            
            // Move directly toward the target
            this.x += (targetX - this.x) * 0.05
            this.y += (targetY - this.y) * 0.05
            
            // Transition progress
            this.transitionProgress += 0.01
            
            // Change color as it crosses
            if (this.x > size/2 - 5 && this.colorIndex === -1) {
              // Pick a color from the right side
              this.colorIndex = Math.floor(Math.random() * rightSideColors.length)
              this.color = rightSideColors[this.colorIndex]
              
              // Now it's on the right
              this.order = false
              
              // Reset for right side behavior
              this.transitioning = false
              this.attractionPoint = null
              this.velocity = {
                x: (Math.random() - 0.5) * 0.8,
                y: (Math.random() - 0.5) * 0.8
              }
            }
          }
        } else {
          // RIGHT SIDE PARTICLES - Complex cluster formations
          
          // Mouse influence - particles respond to mouse but maintain their original position
          const mouseDistance = Math.hypot(mouseX - this.x, mouseY - this.y)
          if (mouseX > size/2 && mouseDistance < 80) {
            // Temporary displacement from mouse - like a web vibrating
            const factor = 1 - (mouseDistance / 80)
            const displaceX = (this.x - mouseX) / mouseDistance * factor * 10
            const displaceY = (this.y - mouseY) / mouseDistance * factor * 10
            
            // Just add to position, don't affect velocity (so they snap back)
            this.x += displaceX * 0.3
            this.y += displaceY * 0.3
          } else {
            // Create interesting motion patterns but without "black hole" effect
            // Each particle moves in its own pattern based on its original position
            
            // Create diverse movement patterns based on particle's position
            const patternId = Math.floor(this.originalX * 7.3 + this.originalY * 3.7) % 6
            
            let targetX = this.originalX
            let targetY = this.originalY
            
            // Calculate different motion patterns
            switch(patternId) {
              case 0: // Circular motion
                const circleRadius = 20 + (this.originalX * 0.1)
                const circleSpeed = 0.2 + (this.originalY * 0.001)
                targetX = this.originalX + Math.cos(time * circleSpeed) * circleRadius
                targetY = this.originalY + Math.sin(time * circleSpeed) * circleRadius
                break
                
              case 1: // Horizontal wave
                targetX = this.originalX + Math.sin(time * 0.3 + this.originalY * 0.05) * 15
                targetY = this.originalY
                break
                
              case 2: // Vertical wave
                targetX = this.originalX
                targetY = this.originalY + Math.sin(time * 0.2 + this.originalX * 0.05) * 15
                break
                
              case 3: // Figure-8 pattern
                const figure8Size = 15
                targetX = this.originalX + Math.sin(time * 0.4) * figure8Size
                targetY = this.originalY + Math.sin(time * 0.8) * figure8Size * 0.5
                break
                
              case 4: // Spiral in/out
                const spiralPhase = (Math.sin(time * 0.2) + 1) * 0.5
                const spiralRadius = 5 + spiralPhase * 20
                const spiralAngle = time * 0.5 + this.originalX * 0.01
                targetX = this.originalX + Math.cos(spiralAngle) * spiralRadius
                targetY = this.originalY + Math.sin(spiralAngle) * spiralRadius
                break
                
              case 5: // Diagonal shift
                targetX = this.originalX + Math.sin(time * 0.25) * 20
                targetY = this.originalY + Math.sin(time * 0.25) * 20
                break
            }
            
            // Gentle movement toward the calculated pattern position
            // This ensures particles follow their pattern but can be disturbed by mouse
            this.x += (targetX - this.x) * 0.03
            this.y += (targetY - this.y) * 0.03
            
            // Apply very mild random forces
            this.velocity.x += (Math.random() - 0.5) * 0.1
            this.velocity.y += (Math.random() - 0.5) * 0.1
          }
          
          // Apply very minimal velocity - basically just for a slight random movement
          // This avoids any "sucking" effect while still giving some life to the particles
          this.velocity.x *= 0.85
          this.velocity.y *= 0.85
          this.x += this.velocity.x * 0.2  // Reduced effect of velocity 
          this.y += this.velocity.y * 0.2
          
          // Strict boundary checks
          if (this.x < size/2) {
            this.x = size/2 + 1
            this.velocity.x = Math.abs(this.velocity.x) * 0.3
          } else if (this.x > size) {
            this.x = size - 1
            this.velocity.x = -Math.abs(this.velocity.x) * 0.3
          }
          
          if (this.y < 0) {
            this.y = 1
            this.velocity.y = Math.abs(this.velocity.y) * 0.3
          } else if (this.y > size) {
            this.y = size - 1
            this.velocity.y = -Math.abs(this.velocity.y) * 0.3
          }
          
          // Occasionally change color
          if (Math.random() < 0.001) {
            const newColorIndex = Math.floor(Math.random() * rightSideColors.length)
            this.colorIndex = newColorIndex
            this.color = rightSideColors[newColorIndex]
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) return

        // Draw the main particle
        let alpha = this.order ? 0.7 : 0.9
        
        // Transitioning particles (moving from left to right)
        if (this.transitioning) {
          const progress = Math.min(1, this.transitionProgress)
          
          // Very subtle glow for transitioning particles
          const glowSize = this.size * 2
          const glowAlpha = 0.05 + progress * 0.1
          
          // Use right side color for glow
          const targetColorIndex = Math.floor(Math.random() * rightSideColors.length)
          const targetColor = rightSideColors[targetColorIndex]
          const tr = parseInt(targetColor.substring(1, 3), 16)
          const tg = parseInt(targetColor.substring(3, 5), 16)
          const tb = parseInt(targetColor.substring(5, 7), 16)
          
          const gradient = ctx.createRadialGradient(
            this.x, this.y, this.size * 0.5,
            this.x, this.y, glowSize
          )
          
          gradient.addColorStop(0, `rgba(${tr}, ${tg}, ${tb}, ${glowAlpha})`)
          gradient.addColorStop(1, `rgba(${tr}, ${tg}, ${tb}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Right side particles (colored)
        if (!this.order) {
          // Get RGB from color
          const r = parseInt(this.color.substring(1, 3), 16)
          const g = parseInt(this.color.substring(3, 5), 16)
          const b = parseInt(this.color.substring(5, 7), 16)
          
          // Very subtle inner glow
          const glowSize = this.size * 1.5
          const glowAlpha = 0.03 // Very faint
          
          const gradient = ctx.createRadialGradient(
            this.x, this.y, this.size * 0.5,
            this.x, this.y, glowSize
          )
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowAlpha})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
          
          // Main particle with subtle shimmer effect
          const colorShift = Math.sin(Date.now() * 0.001 + this.x * 0.1) * 0.1
          const rShifted = Math.min(255, Math.max(0, r * (1 + colorShift)))
          const gShifted = Math.min(255, Math.max(0, g * (1 + colorShift)))
          const bShifted = Math.min(255, Math.max(0, b * (1 + colorShift)))
          
          ctx.fillStyle = `rgb(${rShifted}, ${gShifted}, ${bShifted})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Tiny highlight for subtle 3D effect
          const highlightX = this.x - this.size * 0.25
          const highlightY = this.y - this.size * 0.25
          const highlightSize = this.size * 0.15
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.beginPath()
          ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Left side - simple white particle with no glow
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 32 // More dots for higher density
    const gridWidth = size / gridSize
    
    // LEFT SIDE - perfect square grid patterns with artistic accents
    for (let i = 0; i < gridSize / 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Always create the perfect grid structure first
        const shouldShow = (
          // Main grid structure - show every 4th point for a perfect grid
          i % 3 === 0 || j % 3 === 0 ||
          
          // Add a central circular pattern 
          Math.pow(i - gridSize/4, 2) + Math.pow(j - gridSize/2, 2) < Math.pow(gridSize/6, 2) ||
          
          // Create diagonal web-like structures
          (i + j) % 6 === 0 ||
          (i - j) % 6 === 0 ||
          
          // Add more detail along the edges
          (i < 3 || j < 3 || j > gridSize - 4)
        );
        
        if (shouldShow) {
          const x = gridWidth * i + gridWidth / 2
          const y = gridWidth * j + gridWidth / 2
          particles.push(new Particle(x, y, true))
        }
      }
    }
    
    // RIGHT SIDE - complex cluster formations
    // Create several clusters
    const numClusters = 8
    
    // Generate many more particles for right side (over 2x the density)
    for (let i = 0; i < gridSize * 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Only create about 70% of possible dots for a bit of randomness
        if (Math.random() < 0.7) {
          // Assign to a cluster randomly
          const clusterNum = Math.floor(Math.random() * numClusters)
          
          // Base position with jitter
          const x = size/2 + Math.random() * (size/2)
          const y = Math.random() * size
          
          particles.push(new Particle(x, y, false, clusterNum))
        }
      }
    }

    let time = 0
    let animationId = 0
    let mouseX = -100, mouseY = -100
    
    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    })
    
    canvas.addEventListener('mouseleave', () => {
      mouseX = -100
      mouseY = -100
    })
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)
      
      // Draw elegant divider line with slight gradient
      ctx.strokeStyle = dividerGradient
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Add subtle pulsing dots along the divider to indicate conversion points
      const pulseTime = Date.now() * 0.0005
      const pulseIntensity = (Math.sin(pulseTime) * 0.5 + 0.5) * 0.1
      
      // Add just 3 glowing dots along the divider - more subtle
      for (let i = 0; i < 3; i++) {
        const y = size * ((i + 1) / 4) + Math.sin(pulseTime * 2 + i) * 3
        const dotSize = 0.8 + Math.sin(pulseTime * 3 + i * 0.7) * 0.3
        const glow = 0.8 + Math.sin(pulseTime * 5 + i * 1.3) * 0.5
        
        // Draw a small glow point
        const glowGradient = ctx.createRadialGradient(
          size/2, y, 0,
          size/2, y, 2 + glow
        )
        
        // Use a color from the right side
        const colorIndex = Math.floor(time * 0.01 + i) % rightSideColors.length
        const color = rightSideColors[colorIndex]
        const r = parseInt(color.substring(1, 3), 16)
        const g = parseInt(color.substring(3, 5), 16)
        const b = parseInt(color.substring(5, 7), 16)
        
        glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.2)`)
        glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(size/2, y, 2 + glow, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw a small dot
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(size/2, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Draw connections between nearby points on same side
      particles.forEach(p1 => {
        particles.forEach(p2 => {
          if (p1 !== p2 && p1.order === p2.order) {
            const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y)
            const maxDistance = p1.order ? 30 : 40 // Different connection distances for each side
            
            // Only draw connections for nearby particles
            if (distance < maxDistance) {
              const alpha = p1.order ? 
                  0.05 * (1 - distance / maxDistance) : // Less visible on left
                  0.1 * (1 - distance / maxDistance)   // More visible on right
              
              if (p1.order) {
                // Left side white connections
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
              } else {
                // Right side colored connections
                const r = parseInt(p1.color.substring(1, 3), 16)
                const g = parseInt(p1.color.substring(3, 5), 16)
                const b = parseInt(p1.color.substring(5, 7), 16)
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
              }
              
              ctx.lineWidth = p1.order ? 0.3 : 0.4
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        })
      })
      
      // Special connections for transitioning particles
      particles.forEach(p => {
        if (p.transitioning) {
          // Find nearest particles on the right side
          const rightParticles = particles.filter(rp => !rp.order)
          
          // Connect to closest right particles
          rightParticles.sort((a, b) => {
            const distA = Math.hypot(p.x - a.x, p.y - a.y)
            const distB = Math.hypot(p.x - b.x, p.y - b.y)
            return distA - distB
          }).slice(0, 3).forEach(target => {
            const distance = Math.hypot(p.x - target.x, p.y - target.y)
            if (distance < 100) {
              const alpha = 0.3 * (1 - distance / 100) + pulseIntensity
              
              // Use the right side color
              const r = parseInt(target.color.substring(1, 3), 16)
              const g = parseInt(target.color.substring(3, 5), 16)
              const b = parseInt(target.color.substring(5, 7), 16)
              
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
              ctx.lineWidth = 0.7
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(target.x, target.y)
              ctx.stroke()
            }
          })
        }
      })
      
      // Update and draw all particles
      particles.forEach(particle => {
        particle.update(time, mouseX, mouseY)
        particle.draw(ctx)
      })

      time += 0.01
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