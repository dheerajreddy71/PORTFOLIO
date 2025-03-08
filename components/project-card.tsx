"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

interface Project {
  title: string
  description: string
  period: string
  tags: string[]
  image: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all border-blue-500/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10">
        <div className="relative overflow-hidden h-48">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              {project.period}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{project.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-purple-500/20 bg-purple-500/5">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 w-full">
            <Link href="https://github.com/dheerajreddy71" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-blue-500/20 hover:bg-blue-500/10 transition-all duration-300"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

