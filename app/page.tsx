"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Code,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import AnimatedText from "@/components/animated-text"
import AnimatedSkillBar from "@/components/animated-skill-bar"
import AnimatedTimeline from "@/components/animated-timeline"
import ProjectCard from "@/components/project-card"
import CursorFollower from "@/components/cursor-follower"
import FloatingParticles from "@/components/floating-particles"
import AnimatedBackground from "@/components/animated-background"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sections = ["home", "about", "experience", "projects", "education", "contact"]
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    contact: useRef(null),
  }

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const currentPosition = window.scrollY + 100

      for (const section of sections) {
        const element = sectionRefs[section].current
        if (!element) continue

        const { offsetTop, offsetHeight } = element
        if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Throttled mouse move handler for better performance
    let lastUpdate = 0
    const handleMouseMove = (e) => {
      const now = Date.now()
      if (now - lastUpdate > 10) {
        // Update at most every 10ms
        setMousePosition({ x: e.clientX, y: e.clientY })
        lastUpdate = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Update the skills array to focus on web development
  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "Tailwind CSS", level: 85 },
  ]

  const competencies = [
    "Team Work",
    "Leadership",
    "Adaptability",
    "Work Ethics",
    "Communication",
    "Time Management",
    "Creativity",
    "Problem Solving",
  ]

  // Update the experiences array to include Intel Student Ambassador Level 1
  const experiences = [
    {
      title: "Intel Student Ambassador Level 1",
      organization: "Intel oneAPI",
      period: "Sept 2024 - Present",
      description:
        "Received Level 1 badge for conducting workshops on Intel technologies and promoting oneAPI tools among students.",
    },
    {
      title: "IEEE Event Coordinator",
      organization: "KARE IEEE CS SBC",
      period: "July 2024 - Present",
      description: "Organized workshops, tech events, and industry talks to enhance student engagement.",
    },
    {
      title: "IEEE Day Ambassador",
      organization: "IEEE",
      period: "Aug 2024 - Present",
      description: "Hosted a workshop on Intel oneAPI featuring guest speakers and networking sessions.",
    },
    {
      title: "Activity Team Member",
      organization: "KARE ACM",
      period: "Sept 2023 - July 2024",
      description: "Led coding workshops and interactive learning sessions for students.",
    },
  ]

  // Updated projects array with the requested projects
  const projects = [
    {
      title: "Image-Based Plant Disease Detection",
      description:
        "Built a computer vision model for early plant disease diagnosis and treatment recommendations using deep learning.",
      period: "Aug 2024 - Present",
      tags: ["Computer Vision", "Machine Learning", "Agriculture"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Smart Agri Assistant",
      description:
        "Developed an AI-powered assistant for farmers to provide real-time advice on crop management and pest control.",
      period: "June 2024 - Present",
      tags: ["AI", "IoT", "Agriculture"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Food Ordering Chatbot",
      description:
        "Developed an AI chatbot for personalized food recommendations and order management with dietary restrictions.",
      period: "Aug 2024 - Present",
      tags: ["AI", "NLP", "User Experience"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "AgriXpert",
      description:
        "Integrated IoT and AI for real-time crop monitoring and yield optimization in precision agriculture.",
      period: "Aug 2023 - Present",
      tags: ["IoT", "AI", "Agriculture"],
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Update the education array to include INTI International University
  const education = [
    {
      degree: "Bachelor of Technology (Semester Exchange Program)",
      institution: "INTI International University",
      period: "Current",
      score: "Exchange Student",
    },
    {
      degree: "Bachelor of Technology",
      institution: "Kalasalingam Academy of Research and Education",
      period: "Aug 2022 - Present",
      score: "GPA: 9.16",
    },
    {
      degree: "Intermediate",
      institution: "Narayana Junior College, Vijayawada",
      period: "July 2020 - May 2022",
      score: "Percentage: 96.80%",
    },
    {
      degree: "Class 10",
      institution: "Montessori Gurukul, Kurnool",
      period: "May 2020",
      score: "Percentage: 99.67%",
    },
  ]

  const scrollToSection = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />
      <CursorFollower mousePosition={mousePosition} variant={cursorVariant} />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 z-50"
        style={{ scaleX: progressBarScaleX, transformOrigin: "0%" }}
      />

      {/* Fixed header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-xl border-b border-white/10"
        style={{ opacity: headerOpacity }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Dheeraj Reddy
          </motion.div>
          <nav className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(section)}
                className={cn(
                  "text-sm font-medium capitalize transition-all hover:text-primary relative",
                  activeSection === section ? "text-primary" : "text-muted-foreground",
                )}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
              >
                {section}
                {activeSection === section && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    layoutId="activeSection"
                  />
                )}
              </motion.button>
            ))}
          </nav>
          <div className="flex md:hidden">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <motion.div animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/90 backdrop-blur-xl border-b border-white/10"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {sections.map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={cn(
                      "text-sm font-medium capitalize transition-all hover:text-primary py-2 text-left",
                      activeSection === section ? "text-primary" : "text-muted-foreground",
                    )}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero section */}
      <section
        ref={sectionRefs.home}
        className="min-h-screen flex flex-col justify-center pt-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/5 z-[-1]" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4"
                >
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-500">Intel Student Ambassador</span>
                </motion.div>
                <motion.p
                  className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Hello, I'm
                </motion.p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <AnimatedText text="Dheeraj Reddy Byreddy" />
                </h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  B.Tech Student & Tech Enthusiast
                </motion.p>
              </div>
              <motion.p
                className="text-muted-foreground max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Results-driven B.Tech student with expertise in AI/ML, data-driven agriculture, and web development.
                Proven leadership in organizing tech events, coding workshops, and mentoring students.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    onClick={() => scrollToSection("projects")}
                    className="border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://linkedin.com/in/dheeraj-reddy-byreddy-84914b247"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                  <Link href="https://github.com/dheerajreddy71" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link href="mailto:byreddydheerajreddy@gmail.com">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
              <motion.div
                className="relative h-full w-full rounded-full border-2 border-purple-500/20 overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 20px 0px rgba(168, 85, 247, 0.3)",
                    "0 0 30px 5px rgba(168, 85, 247, 0.4)",
                    "0 0 20px 0px rgba(168, 85, 247, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 animate-spin-slow" />
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Dheeraj Reddy Byreddy"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 p-4 bg-background/80 backdrop-blur-sm rounded-2xl border border-purple-500/20 shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium">Web Developer</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("about")}
              className="rounded-full border border-purple-500/20 bg-background/50 backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300"
            >
              <ChevronDown className="h-6 w-6 text-purple-500" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About section */}
      <section ref={sectionRefs.about} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-cyan-500/5 z-[-1]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Who I Am
              </h3>
              <motion.div
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/10 shadow-lg hover:shadow-purple-500/5 transition-all duration-500"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-muted-foreground">
                  As a third-year B.Tech student with a focus on web development, I have developed a strong foundation
                  in technology and leadership through various roles. As a lead member of the Kare ACM club, I organized
                  workshops and coding events that enhanced student engagement and learning. My role as an IEEE event
                  coordinator involved planning and executing technical seminars, which improved my organizational
                  skills and ability to collaborate with peers.
                </p>
              </motion.div>
              <motion.div
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/10 shadow-lg hover:shadow-purple-500/5 transition-all duration-500"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-muted-foreground">
                  Additionally, as an Intel oneAPI Student Ambassador with a Level 1 badge, I promoted cutting-edge
                  technology and facilitated knowledge-sharing sessions, further strengthening my understanding of
                  industry trends. Currently, I'm participating in a semester exchange program at INTI International
                  University, expanding my global perspective and technical expertise in web development.
                </p>
              </motion.div>

              <div className="pt-4">
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Key Competencies
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {competencies.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.2)",
                      }}
                      className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 rounded-lg px-4 py-3 text-center hover:bg-purple-500/10 transition-all duration-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Technical Skills
              </h3>
              <motion.div
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/10 shadow-lg hover:shadow-purple-500/5 transition-all duration-500"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <AnimatedSkillBar key={skill.name} name={skill.name} percentage={skill.level} delay={index * 0.1} />
                  ))}
                </div>
              </motion.div>

              <div className="pt-4">
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Languages
                </h3>
                <motion.div
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/10 shadow-lg hover:shadow-purple-500/5 transition-all duration-500"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>English</span>
                        <span className="text-muted-foreground">Fluent</span>
                      </div>
                      <Progress
                        value={90}
                        className="h-2 bg-purple-500/10"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Telugu</span>
                        <span className="text-muted-foreground">Native</span>
                      </div>
                      <Progress
                        value={100}
                        className="h-2 bg-purple-500/10"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Tamil</span>
                        <span className="text-muted-foreground">Fluent</span>
                      </div>
                      <Progress
                        value={85}
                        className="h-2 bg-purple-500/10"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Malayalam</span>
                        <span className="text-muted-foreground">Basic</span>
                      </div>
                      <Progress
                        value={40}
                        className="h-2 bg-purple-500/10"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section ref={sectionRefs.experience} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-blue-500/5 z-[-1]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              Experience & Volunteering
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          </motion.div>

          <AnimatedTimeline experiences={experiences} />
        </div>
      </section>

      {/* Projects section */}
      <section ref={sectionRefs.projects} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 z-[-1]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="https://github.com/dheerajreddy71" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
              >
                <Github className="mr-2 h-4 w-4" />
                View All Projects on GitHub
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Education section */}
      <section ref={sectionRefs.education} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-pink-500/5 z-[-1]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Education
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-8 last:mb-0"
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-purple-500/10 border border-purple-500/10 bg-white/5 backdrop-blur-sm">
                  <CardHeader className="pb-2 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                          {item.degree}
                        </CardTitle>
                        <CardDescription className="text-base mt-1">{item.institution}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs border-purple-500/20 bg-purple-500/5">
                        {item.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-primary">{item.score}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section ref={sectionRefs.contact} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-purple-500/5 z-[-1]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Get In Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-center text-muted-foreground">
              Feel free to reach out to me for collaborations, opportunities, or just to say hello!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">byreddydheerajreddy@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 9390341106</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Uyyalawada, Nandyal, Andhra Pradesh, India</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                  <Linkedin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <Link
                    href="https://linkedin.com/in/dheeraj-reddy-byreddy-84914b247"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-purple-500 transition-colors flex items-center"
                  >
                    dheeraj-reddy-byreddy
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center space-x-4 pt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="https://linkedin.com/in/dheeraj-reddy-byreddy-84914b247"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect on LinkedIn
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="https://github.com/dheerajreddy71" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Follow on GitHub
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/10 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-purple-500/5 z-[-1]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex justify-center space-x-4">
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://linkedin.com/in/dheeraj-reddy-byreddy-84914b247"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <Link href="https://github.com/dheerajreddy71" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href="mailto:byreddydheerajreddy@gmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-purple-500/10 hover:text-purple-500 transition-all duration-300"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Dheeraj Reddy Byreddy. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

