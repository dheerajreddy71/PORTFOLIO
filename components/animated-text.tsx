"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  delay?: number
}

export default function AnimatedText({ text, delay = 0 }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50 + delay)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text, delay])

  return (
    <div className="relative">
      <span className="invisible">{text}</span>
      <motion.span
        className="absolute top-0 left-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
            className="text-purple-500"
          >
            |
          </motion.span>
        )}
      </motion.span>
    </div>
  )
}

