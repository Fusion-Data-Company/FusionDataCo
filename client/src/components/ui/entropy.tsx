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
    const dividerGradient = ctx.createLinearGradient(size/2, 0, size/2, size)
    dividerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)')
    dividerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)')
    dividerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)')

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
      transitionProgress: number
      transitioning: boolean
      patternType: number
      
      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 : 2
        this.order = order
        this.patternType = Math.floor(Math.random() * 6)
        
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
      }

      update(time: number, mouseX: number, mouseY: number) {
        if (this.order) {
          // LEFT SIDE PARTICLES - Grid with subtle motion
          
          // Mouse interaction - particles move away when mouse is near
          const mouseDistance = Math.hypot(mouseX - this.x, mouseY - this.y)
          if (mouseDistance < 40) {
            // Repel from mouse
            const repelX = (this.x - mouseX) / mouseDistance * 2
            const repelY = (this.y - mouseY) / mouseDistance * 2
            
            this.x += repelX
            this.y += repelY
          } else {
            // Return to original position with a very slight breathing effect
            const breathingPhase = Math.sin(time * 0.1) * 0.5
            const targetX = this.originalX + Math.sin(time * 0.2 + this.originalY * 0.05) * 1.5
            const targetY = this.originalY + Math.sin(time * 0.2 + this.originalX * 0.05) * 1.5
            
            this.x += (targetX - this.x) * 0.05
            this.y += (targetY - this.y) * 0.05
          }
          
          // Very rarely allow a particle to cross to the right
          if (Math.random() < 0.0002 && !this.transitioning && this.x > size * 0.4) {
            this.transitioning = true
            this.attractionPoint = {
              x: size/2 + 5 + Math.random() * 20,
              y: this.y + (Math.random() - 0.5) * 10
            }
          }
          
          // Handle transitioning particles
          if (this.transitioning && this.attractionPoint) {
            const targetX = this.attractionPoint.x
            const targetY = this.attractionPoint.y
            
            // Move toward the target
            this.x += (targetX - this.x) * 0.05
            this.y += (targetY - this.y) * 0.05
            
            // Transition progress
            this.transitionProgress += 0.01
            
            // Change color as it crosses
            if (this.x > size/2 - 5 && this.colorIndex === -1) {
              // Now it's on the right side
              this.colorIndex = Math.floor(Math.random() * rightSideColors.length)
              this.color = rightSideColors[this.colorIndex]
              this.order = false
              
              // Reset for right side behavior
              this.transitioning = false
              this.attractionPoint = null
              this.velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
              }
            }
          }
        } else {
          // RIGHT SIDE PARTICLES - Complex movement patterns
          
          // Random influence to simulate mouse effects
          if (Math.random() < 0.001) {
            this.velocity.x += (Math.random() - 0.5) * 1
            this.velocity.y += (Math.random() - 0.5) * 1
          }
          
          // Mouse interaction - particles react to mouse
          const mouseDistance = Math.hypot(mouseX - this.x, mouseY - this.y)
          if (mouseX > size/2 && mouseDistance < 80) {
            // Move away from the mouse
            const factor = 1 - (mouseDistance / 80)
            const displaceX = (this.x - mouseX) / mouseDistance * factor * 8
            const displaceY = (this.y - mouseY) / mouseDistance * factor * 8
            
            this.x += displaceX * 0.2
            this.y += displaceY * 0.2
          } else {
            // Move in interesting patterns based on particle's type
            let targetX = this.originalX
            let targetY = this.originalY
            
            switch(this.patternType) {
              case 0: // Circular motion
                const circleRadius = 15 + (this.originalX * 0.05)
                const circleSpeed = 0.1 + (this.originalY * 0.0005)
                targetX = this.originalX + Math.cos(time * circleSpeed) * circleRadius
                targetY = this.originalY + Math.sin(time * circleSpeed) * circleRadius
                break
                
              case 1: // Horizontal wave
                targetX = this.originalX + Math.sin(time * 0.2 + this.originalY * 0.01) * 12
                targetY = this.originalY
                break
                
              case 2: // Vertical wave
                targetX = this.originalX
                targetY = this.originalY + Math.sin(time * 0.15 + this.originalX * 0.01) * 12
                break
                
              case 3: // Figure-8 pattern
                targetX = this.originalX + Math.sin(time * 0.2) * 10
                targetY = this.originalY + Math.sin(time * 0.4) * 8
                break
                
              case 4: // Spiral effect
                const spiralPhase = (Math.sin(time * 0.1) + 1) * 0.5
                const spiralRadius = 5 + spiralPhase * 10
                const spiralAngle = time * 0.2 + this.originalX * 0.01
                targetX = this.originalX + Math.cos(spiralAngle) * spiralRadius
                targetY = this.originalY + Math.sin(spiralAngle) * spiralRadius
                break
                
              case 5: // Diagonal shift
                targetX = this.originalX + Math.sin(time * 0.15) * 10
                targetY = this.originalY + Math.sin(time * 0.15) * 10
                break
            }
            
            // Gentle movement toward pattern position
            this.x += (targetX - this.x) * 0.02
            this.y += (targetY - this.y) * 0.02
          }
          
          // Apply very minimal velocity
          this.velocity.x *= 0.9
          this.velocity.y *= 0.9
          this.x += this.velocity.x * 0.1
          this.y += this.velocity.y * 0.1
          
          // Boundary checks
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
        let alpha = this.order ? 0.8 : 0.9
        
        // Transitioning particles
        if (this.transitioning) {
          const progress = Math.min(1, this.transitionProgress)
          
          // Create glow effect for transitioning particles
          const glowSize = this.size * 2
          const glowAlpha = 0.05 + progress * 0.1
          
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
          const glowAlpha = 0.03
          
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
          
          // Main particle with shimmer effect
          const colorShift = Math.sin(Date.now() * 0.001 + this.x * 0.1) * 0.1
          const rShifted = Math.min(255, Math.max(0, r * (1 + colorShift)))
          const gShifted = Math.min(255, Math.max(0, g * (1 + colorShift)))
          const bShifted = Math.min(255, Math.max(0, b * (1 + colorShift)))
          
          ctx.fillStyle = `rgb(${rShifted}, ${gShifted}, ${bShifted})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Highlight for 3D effect
          const highlightX = this.x - this.size * 0.25
          const highlightY = this.y - this.size * 0.25
          const highlightSize = this.size * 0.15
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.beginPath()
          ctx.arc(highlightX, highlightY, highlightSize, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Left side - white particle
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Create particle grid
    const particles: Particle[] = []
    const gridSize = 32 // Higher density
    const gridWidth = size / gridSize
    
    // LEFT SIDE - perfect grid patterns with artistic designs
    for (let i = 0; i < gridSize / 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Create artistic pattern on left side
        const shouldShow = (
          // Main grid structure - show every 3rd point
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
    
    // RIGHT SIDE - complex patterns
    for (let i = 0; i < gridSize * 2; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Only create about 60% of possible dots for randomness
        if (Math.random() < 0.6) {
          // Base position with jitter
          const x = size/2 + (i / (gridSize * 2)) * (size/2)
          const y = (j / gridSize) * size
          
          particles.push(new Particle(x, y, false))
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
    
    // Virtual mouse position that moves automatically to create constant activity
    let virtualMouseX = size * 0.75
    let virtualMouseY = size * 0.5
    let virtualMouseSpeedX = 0.5
    let virtualMouseSpeedY = 0.7
    
    function animate() {
      if (!ctx) return
      
      // Move virtual mouse
      virtualMouseX += virtualMouseSpeedX
      virtualMouseY += virtualMouseSpeedY
      
      // Bounce virtual mouse off boundaries
      if (virtualMouseX < size/2 || virtualMouseX > size) {
        virtualMouseSpeedX *= -1
      }
      if (virtualMouseY < 0 || virtualMouseY > size) {
        virtualMouseSpeedY *= -1
      }
      
      // Use real mouse if available, otherwise use virtual mouse
      const effectiveMouseX = mouseX > 0 ? mouseX : virtualMouseX
      const effectiveMouseY = mouseY > 0 ? mouseY : virtualMouseY
      
      ctx.clearRect(0, 0, size, size)
      
      // Draw divider line with enhanced blue glow
      // Main divider line
      ctx.strokeStyle = dividerGradient
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Outer blue glow for the divider
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Inner intense blue glow for the divider
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Glowing dots along the divider
      const pulseTime = Date.now() * 0.0005
      
      // Add 3 glowing dots along the divider
      for (let i = 0; i < 3; i++) {
        const y = size * ((i + 1) / 4) + Math.sin(pulseTime * 2 + i) * 3
        const dotSize = 0.8 + Math.sin(pulseTime * 3 + i * 0.7) * 0.3
        const glow = 0.8 + Math.sin(pulseTime * 5 + i * 1.3) * 0.5
        
        // Draw glow
        const glowGradient = ctx.createRadialGradient(
          size/2, y, 0,
          size/2, y, 2 + glow
        )
        
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
        
        // Draw dot
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(size/2, y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Draw connections between points - for performance, limit connections per particle
      const connectionLimit = 3 
      
      particles.forEach(p1 => {
        // Find nearby particles of same type
        const nearbyParticles = particles
          .filter(p2 => p1 !== p2 && p1.order === p2.order)
          .map(p2 => ({
            particle: p2,
            distance: Math.hypot(p1.x - p2.x, p1.y - p2.y)
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, connectionLimit);
        
        nearbyParticles.forEach(({particle: p2, distance}) => {
          const maxDistance = p1.order ? 35 : 40
          
          if (distance < maxDistance) {
            const alpha = p1.order ? 
                0.15 * (1 - distance / maxDistance) : 
                0.1 * (1 - distance / maxDistance)
            
            if (p1.order) {
              // Left side connections with blue glow
              // Main line
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 1.2})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
              
              // Blue glow effect
              ctx.strokeStyle = `rgba(50, 150, 255, ${alpha * 0.8})`
              ctx.lineWidth = 1.2
              ctx.globalAlpha = 0.3
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
              ctx.globalAlpha = 1.0
            } else {
              // Right side colored connections
              const r = parseInt(p1.color.substring(1, 3), 16)
              const g = parseInt(p1.color.substring(3, 5), 16)
              const b = parseInt(p1.color.substring(5, 7), 16)
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
              ctx.lineWidth = 0.4
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        });
      });
      
      // Draw transitioning particle connections
      particles.forEach(p => {
        if (p.transitioning) {
          // Find nearest particles on the right side
          const rightParticles = particles.filter(rp => !rp.order)
          
          // Connect to closest particles
          rightParticles.sort((a, b) => {
            const distA = Math.hypot(p.x - a.x, p.y - a.y)
            const distB = Math.hypot(p.x - b.x, p.y - b.y)
            return distA - distB
          }).slice(0, 3).forEach(target => {
            const distance = Math.hypot(p.x - target.x, p.y - target.y)
            if (distance < 100) {
              const pulseIntensity = (Math.sin(pulseTime) * 0.5 + 0.5) * 0.1
              const alpha = 0.3 * (1 - distance / 100) + pulseIntensity
              
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
          });
        }
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update(time, effectiveMouseX, effectiveMouseY)
        particle.draw(ctx)
      });

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