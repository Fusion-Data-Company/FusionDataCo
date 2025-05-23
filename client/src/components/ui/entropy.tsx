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

    // Right side colors - Blue theme
    const rightSideColors = [
      '#2563eb', // bright blue
      '#0ea5e9', // bright sky blue
      '#0891b2', // bright cyan
      '#14b8a6'  // turquoise
    ]

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      color: string
      originalX: number
      originalY: number
      velocity: { x: number; y: number }
      
      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = order ? 1.5 : 1.8 // Smaller particles on right side
        this.order = order
        
        // Assign colors based on side
        if (order) {
          // Left side is white with very slight blue tint variations for visual interest
          const blueVariation = Math.floor(Math.random() * 10) // Subtle blue tinting (0-10)
          this.color = `rgb(255, 255, ${245 + blueVariation})` 
        } else {
          // Right side has random colors from the theme
          const colorIndex = Math.floor(Math.random() * rightSideColors.length)
          this.color = rightSideColors[colorIndex]
        }
        
        // Starting velocity - gentle and smooth
        const velocityFactor = Math.random() * 1.2 + 0.3 // Reduced for smoother movement
        this.velocity = {
          x: (Math.random() - 0.5) * velocityFactor,
          y: (Math.random() - 0.5) * velocityFactor
        }
      }

      update() {
        // Allow particles to very frequently cross over - greatly increased probability
        const nearCenter = Math.abs(this.x - size/2) < 35; // Even wider center area
        const shouldCrossOver = Math.random() < 0.015 && nearCenter; // 15x more likely than original
        
        // Additional crossing chance for particles that were created on the divider
        const isOnDivider = Math.abs(this.originalX - size/2) < 10;
        const dividerCrossChance = isOnDivider && Math.random() < 0.08; // High chance to cross
        
        if (shouldCrossOver || dividerCrossChance) {
          // Change state when crossing
          this.order = !this.order;
          
          // Update color when crossing with transition effect
          if (this.order) {
            // Changed to ordered (left side) - white
            this.color = '#ffffff';
          } else {
            // Changed to chaotic (right side) - random color from theme
            const colorIndex = Math.floor(Math.random() * rightSideColors.length);
            this.color = rightSideColors[colorIndex];
          }
          
          // Give a much stronger push in the new direction
          const crossingForce = 2 + Math.random() * 2; // Variable force between 2-4
          this.velocity.x = this.order ? -crossingForce : crossingForce; // Strong momentum
          this.velocity.y = (Math.random() - 0.5) * 6; // Add significant vertical movement when crossing
        }
        
        if (this.order) {
          // Left side particles - clean grid movement with gentle breathing
          const time = Date.now() * 0.001;
          // Keep the breathing subtle
          const breathingOffsetX = Math.sin(time + this.originalY * 0.1) * 2;
          const breathingOffsetY = Math.sin(time + this.originalX * 0.1) * 2;
          
          // If near the divider, allow gentle drift toward divider
          if (nearCenter && Math.random() < 0.02) {
            this.x += 0.8; // Move toward divider
          } else {
            // Move toward original position plus breathing offset
            this.x += ((this.originalX + breathingOffsetX) - this.x) * 0.1;
            this.y += ((this.originalY + breathingOffsetY) - this.y) * 0.1;
          }
        } else {
          // Right side particles - smoother, more controlled movement
          // Add gentle random forces
          this.velocity.x += (Math.random() - 0.5) * 0.2;
          this.velocity.y += (Math.random() - 0.5) * 0.2;
          
          // Stronger dampening for smoother, more controlled movement
          this.velocity.x *= 0.92;
          this.velocity.y *= 0.92;
          
          // Update position at normal speed
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          
          // Gentle attraction to center divider
          if (Math.random() < 0.01 && this.x > size/2 + 30) {
            this.velocity.x -= 0.1; // Very gentle pull toward divider
          }
          
          // Boundary checks with gentler bouncing
          if (this.x < 0) {
            this.x = 1;
            this.velocity.x = Math.abs(this.velocity.x) * 0.5;
          } else if (this.x > size) {
            this.x = size - 1;
            this.velocity.x = -Math.abs(this.velocity.x) * 0.5;
          }
          
          if (this.y < 0) {
            this.y = 1;
            this.velocity.y = Math.abs(this.velocity.y) * 0.5;
          } else if (this.y > size) {
            this.y = size - 1;
            this.velocity.y = -Math.abs(this.velocity.y) * 0.5;
          }
          
          // Occasional color changes - less frequent
          if (Math.random() < 0.001) {
            const colorIndex = Math.floor(Math.random() * rightSideColors.length);
            this.color = rightSideColors[colorIndex];
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - with optimized density for better performance
    const particles: Particle[] = []
    const gridSize = 30 // Reduced from 45 to prevent performance issues
    const spacing = size / gridSize
    
    // Create grid of particles, left side ordered, right side chaotic
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Skip some particles for better performance (every other one in some areas)
        if (i % 2 === 0 && j % 2 === 0 && i > gridSize/3 && j > gridSize/3) continue;
        
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        
        // Add some randomness to right side position
        const finalX = order ? x : x + (Math.random() - 0.5) * spacing * 1.5
        const finalY = order ? y : y + (Math.random() - 0.5) * spacing * 1.5
        
        particles.push(new Particle(finalX, finalY, order))
      }
    }
    
    // Add more particles to right side for chaotic movement - reduced count for performance
    for (let i = 0; i < 200; i++) { // Reduced from 600 to improve performance
      const x = size/2 + Math.random() * (size/2)
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }
    
    // Add particles on divider line that will cross regularly
    const dividerParticleCount = 20 // Reduced slightly for performance
    for (let i = 0; i < dividerParticleCount; i++) {
      const y = Math.random() * size
      // Slightly offset from center to encourage crossing
      const x = size/2 + (Math.random() < 0.5 ? -5 : 5)
      // Randomly assign to either ordered or chaotic side
      const order = Math.random() < 0.5
      particles.push(new Particle(x, y, order))
    }

    let animationId = 0
    
    function animate() {
      ctx.clearRect(0, 0, size, size)
      
      // Draw a blue glowing divider line
      // Main line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Blue glow for divider
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Inner brighter line
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })
      
      // Significantly optimized connections between particles for better performance
      
      // Only process every 3rd particle for connections to improve performance
      for (let i = 0; i < particles.length; i += 3) {
        const particle = particles[i]
        
        // Find a small number of close particles - optimized approach without filtering the entire array
        const nearbyParticles = []
        let foundCount = 0
        
        // Only sample a subset of particles to find neighbors (massive performance improvement)
        for (let j = 0; j < particles.length; j += 6) {
          if (i === j) continue
          const other = particles[j]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          
          // Check if connection crosses the divider - prioritize these
          const crossesDivider = (particle.x < size/2 && other.x >= size/2) || 
                              (particle.x >= size/2 && other.x < size/2)
                              
          const maxCheckDistance = particle.order ? 35 : 50
          if (distance < maxCheckDistance || (crossesDivider && distance < 70)) {
            nearbyParticles.push({other, distance, crossesDivider})
            foundCount++
            if (foundCount >= 2) break // Limit to just 2 connections per particle
          }
        }
        
        // Draw connections to nearby particles - limited for performance
        for (const {other, distance, crossesDivider} of nearbyParticles) {
          // Simplified pulsing effect
          const pulseTime = Date.now() * 0.0005 // Slower pulsing
          const pulseFactor = Math.sin(pulseTime + i * 0.1) * 0.3 + 0.7
          
          // Determine alpha based on distance and side
          const maxDistance = particle.order ? 35 : 50
          
          if (crossesDivider) {
            // Draw special connections across divider - simplified for performance
            ctx.strokeStyle = particle.order ? 
                'rgba(255, 255, 255, 0.4)' : 
                'rgba(56, 189, 248, 0.4)'
            ctx.lineWidth = 0.8 * pulseFactor
            
            // No shadow effects for better performance
            ctx.shadowBlur = 0
          } else {
            // Regular connections - much simpler for performance
            const alpha = 0.15 * (1 - distance / maxDistance) * pulseFactor
            ctx.strokeStyle = particle.order ? 
                `rgba(255, 255, 255, ${alpha})` : 
                'rgba(56, 189, 248, ' + alpha + ')'
            ctx.lineWidth = 0.5
            ctx.shadowBlur = 0
          }
          
          // Draw the connection line
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        }
      }
      
      // Draw blue glowing dots along the divider - increased count and more dramatic effects
      const dotCount = 6 // Doubled from 3
      for (let i = 0; i < dotCount; i++) {
        const y = size * ((i + 1) / (dotCount + 1)) // Spread evenly
        
        // More dramatic pulsing effect
        const time = Date.now() * 0.001
        const pulseSize = 2 + Math.sin(time * 0.8 + i * 0.5) * 1.2
        
        // Larger glow effect with brighter colors
        const pulsePhase = Math.sin(time * 0.5 + i * 0.3) * 0.5 + 0.5 // 0 to 1 range
        const gradientSize = 6 + pulsePhase * 8 // Larger, more dynamic glow
        
        // Create bright, pulsing gradient
        const gradient = ctx.createRadialGradient(
          size/2, y, 0,
          size/2, y, gradientSize
        )
        
        // Brighter center with more opacity variation
        const centralOpacity = 0.7 + pulsePhase * 0.3
        gradient.addColorStop(0, `rgba(56, 189, 248, ${centralOpacity})`)
        gradient.addColorStop(0.3, `rgba(59, 130, 246, ${centralOpacity * 0.7})`)
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
        
        // Draw the glow
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(size/2, y, gradientSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Bright dot in center with a slight 3D effect
        ctx.fillStyle = '#3b82f6'
        ctx.beginPath()
        ctx.arc(size/2, y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Add a highlight for 3D effect
        const highlightSize = pulseSize * 0.4
        const offsetX = -highlightSize * 0.5
        const offsetY = -highlightSize * 0.5
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.beginPath()
        ctx.arc(size/2 + offsetX, y + offsetY, highlightSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Add occasional energy burst from divider line
      const burstTime = Date.now() * 0.001
      if (Math.sin(burstTime * 0.2) > 0.95) {
        // Position burst at random point along divider
        const burstY = Math.random() * size
        const burstSize = 10 + Math.random() * 30
        
        // Create burst gradient
        const burstGradient = ctx.createRadialGradient(
          size/2, burstY, 0,
          size/2, burstY, burstSize
        )
        burstGradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)')
        burstGradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)')
        burstGradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
        
        // Draw burst
        ctx.fillStyle = burstGradient
        ctx.beginPath()
        ctx.arc(size/2, burstY, burstSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
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