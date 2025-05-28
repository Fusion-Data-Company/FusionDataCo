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

    // 基础设置
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    // 使用黑色主题
    const particleColor = '#ffffff' // White for order particles
    const orderLineColor = '#ea580c' // Orange lines for order particles
    const chaosParticleColor = '#06b6d4' // Cyan for chaos particles
    const chaosLineColor = '#3b82f6' // Blue lines for chaos lines

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

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 2
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        }
        this.influence = 0
        this.neighbors = []
      }

      update() {
        if (this.order) {
          // 有序粒子受混沌影响的运动
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          // 计算来自混沌粒子的影响
          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })

          // 混合有序运动和混沌影响
          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence

          // 影响逐渐减弱
          this.influence *= 0.99
        } else {
          // 混沌运动
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y

          // 边界检查
          if (this.x < size / 2 || this.x > size) this.velocity.x *= -1
          if (this.y < 0 || this.y > size) this.velocity.y *= -1
          this.x = Math.max(size / 2, Math.min(size, this.x))
          this.y = Math.max(0, Math.min(size, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.order ?
          0.8 - this.influence * 0.5 :
          0.8
        const color = this.order ? particleColor : chaosParticleColor
        
        // Enterprise upgrade: Neon glow + size variation + subtle shimmer
        const baseSize = this.size + Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.3
        
        // Outer glow effect
        const glowSize = baseSize * 2.5
        const glowGradient = ctx.createRadialGradient(this.x, this.y, baseSize, this.x, this.y, glowSize)
        const glowColor = this.order ? '255, 255, 255' : '6, 182, 212'
        glowGradient.addColorStop(0, `rgba(${glowColor}, ${alpha * 0.4})`)
        glowGradient.addColorStop(0.7, `rgba(${glowColor}, ${alpha * 0.1})`)
        glowGradient.addColorStop(1, `rgba(${glowColor}, 0)`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Main particle with gradient
        const mainGradient = ctx.createRadialGradient(
          this.x - baseSize * 0.3, this.y - baseSize * 0.3, 0,
          this.x, this.y, baseSize
        )
        
        if (this.order) {
          mainGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
          mainGradient.addColorStop(0.6, `rgba(255, 255, 255, ${alpha * 0.9})`)
          mainGradient.addColorStop(1, `rgba(200, 200, 200, ${alpha * 0.7})`)
        } else {
          mainGradient.addColorStop(0, `rgba(165, 243, 252, ${alpha})`)
          mainGradient.addColorStop(0.6, `rgba(6, 182, 212, ${alpha})`)
          mainGradient.addColorStop(1, `rgba(8, 145, 178, ${alpha * 0.7})`)
        }
        
        ctx.fillStyle = mainGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, baseSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Core highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`
        ctx.beginPath()
        ctx.arc(this.x - baseSize * 0.2, this.y - baseSize * 0.2, baseSize * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // 创建粒子网格
    const particles: Particle[] = []
    const gridSize = 25
    const spacing = size / gridSize

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        particles.push(new Particle(x, y, order))
      }
    }

    // 更新邻居关系
    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 100
        })
      })
    }

    let time = 0
    let animationId: number
    
    function animate() {
      ctx.clearRect(0, 0, size, size)

      // 更新邻居关系
      if (time % 30 === 0) {
        updateNeighbors()
      }

      // 更新和绘制所有粒子
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)

        // 绘制连接线
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 50) {
            const alpha = 0.6 * (1 - distance / 50)
            // Use blue lines for left side (order), burnt orange for right side (chaos)
            const lineColor = particle.order && neighbor.order ? orderLineColor : chaosLineColor
            ctx.strokeStyle = `${lineColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      // 添加分隔线和文字
      ctx.strokeStyle = `${particleColor}4D`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      ctx.font = '12px monospace'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'

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