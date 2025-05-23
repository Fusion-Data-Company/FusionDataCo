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
      active: boolean
      rowIndex: number
      colIndex: number
      connectionStrength: number
    
      constructor(x: number, y: number, order: boolean, rowIndex = 0, colIndex = 0) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1 // All particles same size for consistent look
        this.order = order
        this.velocity = {
          x: order ? 0 : (Math.random() - 0.5) * 3,
          y: order ? 0 : (Math.random() - 0.5) * 3
        }
        this.influence = 0
        this.neighbors = []
        this.active = true
        this.rowIndex = rowIndex
        this.colIndex = colIndex
        this.connectionStrength = 0
      }
    
      update(particles: Particle[], time: number) {
        if (this.order) {
          // Calculate row-based activation pattern - activates particles in sequence
          const rowActivationTime = time % 500; // Cycle every 500 frames
          const rowToActivate = Math.floor(rowActivationTime / 25); // Each row active for 25 frames
          const isRowActive = this.rowIndex === rowToActivate % 20; // 20 rows total
        
          // When a row becomes active, increase its influence dramatically
          if (isRowActive && Math.random() > 0.7) {
            this.influence = Math.min(1, this.influence + 0.1);
          }
          
          // Particles near the chaos boundary are more susceptible to being pulled
          const distanceToEdge = Math.abs(this.x - size/2);
          const edgeProximityFactor = Math.max(0, 1 - distanceToEdge / 80);
          
          // Calculate chaotic influence from neighbors
          let chaosInfluence = { x: 0, y: 0 };
          let totalInfluence = 0;
          
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
              const strength = Math.max(0, 1 - distance / 100);
              chaosInfluence.x += neighbor.velocity.x * strength * 2;
              chaosInfluence.y += neighbor.velocity.y * strength * 2;
              totalInfluence += strength;
              
              // Increase connection strength when particles interact
              if (distance < 60) {
                this.connectionStrength = Math.min(1, this.connectionStrength + 0.01);
              }
            }
          });
          
          // Normalize influence
          if (totalInfluence > 0) {
            chaosInfluence.x /= totalInfluence;
            chaosInfluence.y /= totalInfluence;
          }
          
          // Apply chaotic influence based on proximity to edge and current row activation
          const chaos = this.influence * edgeProximityFactor * (isRowActive ? 3 : 1);
          
          if (chaos > 0.1 || (edgeProximityFactor > 0.7 && Math.random() > 0.95)) {
            // Apply velocity directly when chaotic enough - makes particles move faster
            this.velocity.x = this.velocity.x * 0.9 + chaosInfluence.x * 1.5 * chaos;
            this.velocity.y = this.velocity.y * 0.9 + chaosInfluence.y * 1.5 * chaos;
            
            // Apply the velocity
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // Increase influence further if moving
            this.influence = Math.min(1, this.influence + 0.01);
          } else {
            // Return to original position when not influenced
            const dx = this.originalX - this.x;
            const dy = this.originalY - this.y;
            
            this.x += dx * 0.1;
            this.y += dy * 0.1;
            
            // Gradually reduce influence
            this.influence *= 0.99;
            this.connectionStrength *= 0.99;
          }
          
          // Boundary check - when an ordered particle crosses into chaos territory
          if (this.x > size/2 + 15) {
            if (Math.random() < 0.05 + this.influence * 0.1) {
              this.order = false;
              this.velocity.x = (Math.random() - 0.2) * 2; // Slight bias toward right
              this.velocity.y = (Math.random() - 0.5) * 2;
            }
          }
          
        } else {
          // Chaotic particle movement
          this.velocity.x += (Math.random() - 0.5) * 0.8;
          this.velocity.y += (Math.random() - 0.5) * 0.8;
          
          // Dampen velocity for more natural movement
          this.velocity.x *= 0.96;
          this.velocity.y *= 0.96;
          
          // Apply velocity
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          
          // Boundary checks
          if (this.x < size/2) {
            // Push back if trying to cross to ordered side
            this.velocity.x += 0.2 + Math.random() * 0.3;
            this.x = size/2;
          } else if (this.x > size) {
            this.velocity.x *= -0.8;
            this.x = size;
          }
          
          if (this.y < 0) {
            this.velocity.y *= -0.8;
            this.y = 0;
          } else if (this.y > size) {
            this.velocity.y *= -0.8;
            this.y = size;
          }
          
          // Increase connection strength randomly
          if (Math.random() > 0.95) {
            this.connectionStrength = Math.min(1, this.connectionStrength + 0.05);
          } else {
            this.connectionStrength *= 0.99;
          }
        }
      }
    
      draw(ctx: CanvasRenderingContext2D) {
        // Adjust brightness based on connection strength and type
        let alpha = this.order ? 0.6 + this.connectionStrength * 0.4 : 0.7 + this.connectionStrength * 0.3;
        
        // Draw the particle
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
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
        particles.push(new Particle(x, y, order, j, i))
      }
    }

    // Create additional chaos particles for more connections on right side
    for (let i = 0; i < 100; i++) { // Increased number for more density on right side
      const x = Math.random() * (size / 2) + size / 2
      const y = Math.random() * size
      particles.push(new Particle(x, y, false))
    }

    // Connection management
    function updateConnections() {
      particles.forEach(particle => {
        // Reset connections
        particle.neighbors = [];
        
        // Find neighbors based on distance
        particles.forEach(other => {
          if (other === particle) return;
          
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          
          // More connections for chaotic particles
          const connectionThreshold = particle.order ? 
                                      (other.order ? 25 : 60) : // Ordered to ordered: very short, Ordered to chaotic: medium
                                      80; // Chaotic to any: longer
          
          // Add connection if within threshold
          if (distance < connectionThreshold) {
            // Higher probability for interesting areas
            const shouldConnect = !particle.order || !other.order || 
                                  Math.random() > 0.7 || // Random factor
                                  (Math.abs(particle.x - size/2) < 50); // More connections near boundary
            
            if (shouldConnect) {
              particle.neighbors.push(other);
              
              // Increase connection strength based on proximity to boundary
              if (Math.abs(particle.x - size/2) < 50 || Math.abs(other.x - size/2) < 50) {
                particle.connectionStrength = Math.min(1, particle.connectionStrength + 0.01);
                other.connectionStrength = Math.min(1, other.connectionStrength + 0.01);
              }
            }
          }
        });
      });
    }

    let time = 0
    let animationId = 0
    
    function animate() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, size, size)

      // Update connections every few frames for better performance
      if (time % 10 === 0) {
        updateConnections()
      }

      // Draw connection lines before particles
      particles.forEach(particle => {
        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
          let lineOpacity = 0;
          
          // Determine connection opacity based on type and strength
          if (particle.order && neighbor.order) {
            // Grid lines - very faint
            lineOpacity = 0.05;
          } else if (!particle.order && !neighbor.order) {
            // Chaos-to-chaos connections - stronger
            lineOpacity = 0.15 * ((particle.connectionStrength + neighbor.connectionStrength) / 2);
          } else {
            // Border crossing connections - medium strength but with distance factor
            const distanceFactor = 1 - distance / 60;
            lineOpacity = 0.3 * distanceFactor * ((particle.connectionStrength + neighbor.connectionStrength) / 2);
          }
          
          // Draw connection
          ctx.strokeStyle = `${particleColor}${Math.round(lineOpacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.stroke();
        });
      });

      // Update and draw all particles
      particles.forEach(particle => {
        particle.update(particles, time);
        particle.draw(ctx);
      });

      // Add dividing line
      ctx.strokeStyle = `${particleColor}4D`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size);
      ctx.stroke();

      // Add quote text at bottom
      ctx.font = '12px monospace';
      ctx.fillStyle = '#ffffff99';
      ctx.textAlign = 'center';
      ctx.fillText('"Order and chaos dance —digital poetry in motion."', size / 2, size - 20);

      time++;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [size]);

  return (
    <div className={`relative bg-black ${className}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}