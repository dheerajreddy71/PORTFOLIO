"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Experience {
  title: string
  organization: string
  period: string
  description: string
}

interface AnimatedTimelineProps {
  experiences: Experience[]
}

export default function AnimatedTimeline({ experiences }: AnimatedTimelineProps) {
  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50 md:-translate-x-1/2 z-0" />

      {/* Timeline items */}
      <div className="relative z-10">
        {experiences.map((experience, index) => (
          <div
            key={experience.title}
            className={`mb-8 flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-0`}
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 md:-translate-x-1/2 mt-6 z-10"
            />

            {/* Content */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/10 border border-blue-500/10 bg-white/5 backdrop-blur-sm">
                  <CardHeader
                    className={`pb-2 bg-gradient-to-r ${index % 2 === 0 ? "from-cyan-500/5 to-blue-500/5" : "from-blue-500/5 to-cyan-500/5"}`}
                  >
                    <div className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} items-start`}>
                      <div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                          {experience.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">{experience.organization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="mb-2 border-blue-500/20 bg-blue-500/5">
                      {experience.period}
                    </Badge>
                    <p className="text-muted-foreground">{experience.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Empty space for the other side */}
            <div className="md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

