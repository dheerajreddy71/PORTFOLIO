"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function FloatingParticles() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? "purple" : i % 3 === 1 ? "pink" : "blue",
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === "purple"
              ? "bg-gradient-to-br from-purple-500/5 to-pink-500/5"
              : particle.color === "pink"
                ? "bg-gradient-to-br from-pink-500/5 to-purple-500/5"
                : "bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0, 0.5, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

