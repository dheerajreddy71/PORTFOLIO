"use client"

import { motion } from "framer-motion"

interface CursorFollowerProps {
  mousePosition: { x: number; y: number }
  variant: string
}

export default function CursorFollower({ mousePosition, variant }: CursorFollowerProps) {
  // Simplified variants with fewer properties to animate
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 rounded-full bg-purple-500/20 pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: mousePosition.x - (variant === "hover" ? 24 : 16),
          y: mousePosition.y - (variant === "hover" ? 24 : 16),
          height: variant === "hover" ? 48 : 32,
          width: variant === "hover" ? 48 : 32,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-50 rounded-full bg-white/30 pointer-events-none hidden md:block"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          height: 8,
          width: 8,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  )
}

