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

    // 使用配色方案
    const orderedParticleColor = '#ffffff'
    const chaosParticleColor = '#60a5fa'

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
        const color = this.order ? orderedParticleColor : chaosParticleColor
        ctx.fillStyle = `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
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

    // 创建重力吸引子（弹跳球）
    class Attractor {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      mass: number

      constructor() {
        this.x = size * 0.75 // 在右侧（混沌区域）
        this.y = size * 0.5
        this.vx = (Math.random() - 0.5) * 3
        this.vy = (Math.random() - 0.5) * 3
        this.radius = 15
        this.mass = 100
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // 边界反弹
        if (this.x - this.radius < size / 2 || this.x + this.radius > size) {
          this.vx *= -0.8
          this.x = Math.max(size / 2 + this.radius, Math.min(size - this.radius, this.x))
        }
        if (this.y - this.radius < 0 || this.y + this.radius > size) {
          this.vy *= -0.8
          this.y = Math.max(this.radius, Math.min(size - this.radius, this.y))
        }

        // 添加一些随机性
        this.vx += (Math.random() - 0.5) * 0.1
        this.vy += (Math.random() - 0.5) * 0.1

        // 阻尼
        this.vx *= 0.98
        this.vy *= 0.98
      }

      draw(ctx: CanvasRenderingContext2D) {
        // 绘制重力场效果
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3)
        gradient.addColorStop(0, `${chaosParticleColor}20`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2)
        ctx.fill()

        // 绘制吸引子核心
        ctx.fillStyle = chaosParticleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()

        // 绘制内部光晕
        const innerGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        innerGradient.addColorStop(0, '#ffffff')
        innerGradient.addColorStop(1, chaosParticleColor)
        ctx.fillStyle = innerGradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      attractParticle(particle: Particle) {
        const dx = this.x - particle.x
        const dy = this.y - particle.y
        const distance = Math.hypot(dx, dy)
        
        if (distance < 200 && distance > 0) {
          const force = (this.mass / (distance * distance)) * 0.1
          const fx = (dx / distance) * force
          const fy = (dy / distance) * force
          
          particle.velocity.x += fx
          particle.velocity.y += fy
          particle.influence = Math.max(particle.influence, force * 10)
        }
      }
    }

    const attractor = new Attractor()

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

      // 更新吸引子
      attractor.update()

      // 更新邻居关系
      if (time % 30 === 0) {
        updateNeighbors()
      }

      // 更新和绘制所有粒子
      particles.forEach(particle => {
        // 让吸引子影响所有粒子
        attractor.attractParticle(particle)
        
        particle.update()
        particle.draw(ctx)

        // 绘制连接线
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 50) {
            const alpha = 0.2 * (1 - distance / 50)
            const lineColor = particle.order ? orderedParticleColor : chaosParticleColor
            ctx.strokeStyle = `${lineColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      // 绘制吸引子（在粒子之后，所以在顶层）
      attractor.draw(ctx)

      // 添加分隔线
      ctx.strokeStyle = `${orderedParticleColor}4D`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

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
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  )
}

export default Entropy