"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Progress } from "@/components/ui/progress"

interface AnimatedSkillBarProps {
  name: string
  percentage: number
  delay?: number
}

export default function AnimatedSkillBar({ name, percentage, delay = 0 }: AnimatedSkillBarProps) {
  const [value, setValue] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      // Animate the progress bar
      const timeout = setTimeout(() => {
        let start = 0
        const interval = setInterval(() => {
          start += 1
          setValue(start)
          if (start >= percentage) {
            clearInterval(interval)
          }
        }, 10)

        return () => clearInterval(interval)
      }, delay * 1000)

      return () => clearTimeout(timeout)
    }
  }, [inView, percentage, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between">
        <span className="flex items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-2"
          />
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className="text-purple-500 font-medium"
        >
          {value}%
        </motion.span>
      </div>
      <Progress
        value={value}
        className="h-2 bg-purple-500/10"
        indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
      />
    </motion.div>
  )
}

