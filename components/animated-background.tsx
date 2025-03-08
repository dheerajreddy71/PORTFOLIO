"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(20, 20, 30, 1)")
    gradient.addColorStop(1, "rgba(30, 25, 40, 1)")

    // Particle settings
    const particlesArray = []
    const numberOfParticles = 120

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          `rgba(${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.3 + 0.1})`,
          `rgba(${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.3 + 0.1})`,
          `rgba(${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 50) + 100}, ${Math.random() * 0.3 + 0.1})`,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles with lines
      connectParticles()

      animationFrameId = requestAnimationFrame(animate)
    }

    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = 1 - distance / 100
            // Create gradient lines
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x,
              particlesArray[a].y,
              particlesArray[b].x,
              particlesArray[b].y,
            )
            gradient.addColorStop(0, `rgba(150, 100, 200, ${opacity * 0.2})`)
            gradient.addColorStop(1, `rgba(100, 150, 200, ${opacity * 0.2})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-[-2]" />
}

