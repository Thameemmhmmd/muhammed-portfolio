"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Code,
  Zap,
  Database,
  Cpu,
  ArrowRight,
  Rocket,
  Brain,
  Terminal,
  Shield,
  Cloud,
  Smartphone,
  Monitor,
  Gamepad2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [matrixChars, setMatrixChars] = useState<string[]>([])
  const heroRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const texts = [
    "Full Stack Architect",
    "AI/ML Engineer",
    "Blockchain Developer",
    "DevOps Specialist",
    "UI/UX Designer",
    "Mobile Developer",
    "Cloud Architect",
    "Cybersecurity Expert",
    "Data Scientist",
    "Game Developer",
  ]

  // Matrix rain effect
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?".split("")
    setMatrixChars(chars)
  }, [])

  // Advanced cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px"
        cursorRef.current.style.top = e.clientY + "px"
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Advanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ["hero", "about", "projects", "skills", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Advanced typing animation
  useEffect(() => {
    const currentFullText = texts[textIndex]
    const typingSpeed = isDeleting ? 30 : 80
    const pauseTime = isDeleting ? 500 : 3000

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullText.length) {
        setCurrentText(currentFullText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(currentFullText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setTextIndex((textIndex + 1) % texts.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, textIndex, texts])

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: ["#00ffff", "#ff00ff", "#ffff00"][Math.floor(Math.random() * 3)],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle =
          particle.color +
          Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const projects = [
    {
      title: "QuantumOS",
      description: "Revolutionary operating system built with Rust and WebAssembly for quantum computing interfaces",
      tech: ["Rust", "WebAssembly", "Quantum Computing", "Tauri", "React"],
      image: "/placeholder.svg?height=400&width=600",
      color: "from-cyan-500 to-blue-500",
      category: "System Software",
      year: "2024",
      status: "Live",
    },
    {
      title: "NeuralForge",
      description: "AI-powered code generation platform with real-time collaboration and advanced ML models",
      tech: ["Python", "TensorFlow", "FastAPI", "WebRTC", "Docker"],
      image: "/placeholder.svg?height=400&width=600",
      color: "from-purple-500 to-pink-500",
      category: "AI Platform",
      year: "2024",
      status: "Beta",
    },
    {
      title: "CryptoVault",
      description: "Decentralized finance platform with advanced smart contracts and cross-chain compatibility",
      tech: ["Solidity", "Web3.js", "IPFS", "Polygon", "Next.js"],
      image: "/placeholder.svg?height=400&width=600",
      color: "from-green-500 to-teal-500",
      category: "Blockchain",
      year: "2024",
      status: "Live",
    },
    {
      title: "HoloSpace",
      description: "Immersive AR/VR collaboration platform with spatial computing and haptic feedback",
      tech: ["Unity", "C#", "WebXR", "Three.js", "Node.js"],
      image: "/placeholder.svg?height=400&width=600",
      color: "from-orange-500 to-red-500",
      category: "XR Platform",
      year: "2023",
      status: "Live",
    },
    {
      title: "DataNexus",
      description: "Real-time big data analytics platform with ML-powered insights and predictive modeling",
      tech: ["Apache Kafka", "Spark", "Kubernetes", "GraphQL", "React"],
      image: "/placeholder.svg?height=400&width=600",
      color: "from-indigo-500 to-purple-500",
      category: "Data Platform",
      year: "2023",
      status: "Enterprise",
    },
    {
      title: "CloudMesh",
      description: "Serverless microservices orchestration platform with auto-scaling and edge computing",
      tech: ["AWS Lambda", "Terraform", "Go", "Redis", "PostgreSQL"],
      image: "/placeholder.svg?height=400&width=600",
      color: "from-yellow-500 to-orange-500",
      category: "Cloud Infrastructure",
      year: "2023",
      status: "Live",
    },
  ]

  const skills = [
    {
      name: "Frontend Mastery",
      icon: Monitor,
      techs: ["React", "Next.js", "Vue.js", "Svelte", "TypeScript", "WebGL"],
      color: "cyan",
      level: 98,
    },
    {
      name: "Backend Architecture",
      icon: Database,
      techs: ["Node.js", "Python", "Go", "Rust", "GraphQL", "gRPC"],
      color: "purple",
      level: 95,
    },
    {
      name: "Cloud & DevOps",
      icon: Cloud,
      techs: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Monitoring"],
      color: "blue",
      level: 92,
    },
    {
      name: "AI & Machine Learning",
      icon: Brain,
      techs: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "MLOps", "Computer Vision"],
      color: "green",
      level: 90,
    },
    {
      name: "Blockchain & Web3",
      icon: Shield,
      techs: ["Solidity", "Ethereum", "Polygon", "IPFS", "DeFi", "NFTs"],
      color: "yellow",
      level: 88,
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      techs: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "PWA"],
      color: "pink",
      level: 85,
    },
    {
      name: "Game Development",
      icon: Gamepad2,
      techs: ["Unity", "Unreal", "WebGL", "Three.js", "C#", "C++"],
      color: "red",
      level: 82,
    },
    {
      name: "Cybersecurity",
      icon: Shield,
      techs: ["Penetration Testing", "Cryptography", "Zero Trust", "OWASP", "Security Audits"],
      color: "orange",
      level: 80,
    },
  ]

  const achievements = [
    { number: "500K+", label: "Lines of Code", icon: Code },
    { number: "150+", label: "Projects Delivered", icon: Rocket },
    { number: "50+", label: "Technologies Mastered", icon: Cpu },
    { number: "99.9%", label: "Uptime Achieved", icon: Zap },
  ]

  // Advanced floating particles
  const particlesArray = Array.from({ length: 200 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speed: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }))

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Advanced Canvas Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />

      {/* Advanced Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-full h-full bg-white rounded-full animate-pulse" />
        <div className="absolute inset-0 w-full h-full bg-cyan-400 rounded-full animate-ping opacity-20" />
        <div className="absolute inset-0 w-full h-full border border-purple-400 rounded-full animate-spin opacity-30" />
      </div>

      {/* Advanced Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-black z-[9998] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-mono text-cyan-400 animate-pulse mb-8">{"<NEXUS/>"}</div>
            <div className="text-2xl font-mono text-purple-400 mb-4">Initializing Quantum Systems...</div>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-loading-bar" />
            </div>
            <div className="text-sm text-gray-400 mt-4 animate-pulse">
              Loading Neural Networks • Compiling Shaders • Establishing Connections
            </div>
          </div>
        </div>
      )}

      {/* Matrix Rain Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-1">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-sm animate-matrix-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
          </div>
        ))}
      </div>

      {/* Advanced Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {particlesArray.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-complex"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"][particle.id % 4],
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`,
              animationDuration: `${particle.speed}s`,
            }}
          />
        ))}
      </div>

      {/* Animated background layers */}
      <div className="fixed inset-0 opacity-40 z-1">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/30 to-pink-900/30 animate-pulse" />
        <div
          className="absolute w-[1200px] h-[1200px] bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl transition-all duration-300 ease-out animate-pulse"
          style={{
            left: mousePosition.x - 600,
            top: mousePosition.y - 600,
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] bg-gradient-radial from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-2xl transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            transform: `rotate(${scrollY * 0.1}deg)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-green-500/15 via-blue-500/10 to-transparent rounded-full blur-xl transition-all duration-700 ease-out"
          style={{
            right: mousePosition.x * 0.02,
            bottom: mousePosition.y * 0.02,
            transform: `rotate(${-scrollY * 0.05}deg)`,
          }}
        />
      </div>

      {/* Advanced Matrix-style grid */}
      <div className="fixed inset-0 opacity-10 z-1">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255, 255, 0, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px, 20px 20px, 40px 40px, 40px 40px",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
      </div>

      {/* Advanced Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer">
              {"<Muhammed .NEXUS/>"}
            </div> */}
            <div className="hidden md:flex space-x-8">
              {["About", "Projects", "Skills", "Contact"].map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group transform hover:scale-110 ${
                    activeSection === item.toLowerCase() ? "text-cyan-400" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Ultimate Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden"
      >
        {/* Advanced floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              {i % 3 === 0 && <div className="w-6 h-6 border border-cyan-400 rotate-45 animate-spin" />}
              {i % 3 === 1 && <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />}
              {i % 3 === 2 && <div className="w-5 h-5 border-2 border-pink-400 rounded-full animate-bounce" />}
            </div>
          ))}
        </div>

        <div className="text-center z-10 relative max-w-6xl mx-auto">
          {/* Ultimate glitch effect container */}
          <div className="relative mt-12 mb-12 group">
            <h1 className="text-6xl md:text-6xl font-black mb-6 relative overflow-hidden leading-none">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse hover:animate-none transition-all duration-300 group-hover:scale-105 inline-block font-extralight tracking-tighter">
                Muhammed 
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-pulse hover:animate-none transition-all duration-300 group-hover:scale-105 inline-block font-black tracking-wider">
               Thameem
              </span>

              {/* Multiple glitch layers */}
              {/* <span className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-100 transform translate-x-2">
                Muhammed 
                <br />
               Thameem
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-150 transform -translate-x-2">
                Muhammed 
                <br />
               Thameem
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-200 transform translate-y-1">
                Muhammed 
                <br />
               Thameem
              </span> */}
            </h1>

            {/* Multiple scanning line effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-full h-2 animate-scan opacity-0 group-hover:opacity-100" />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent w-full h-1 animate-scan-reverse opacity-0 group-hover:opacity-100"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <div className="text-3xl md:text-4xl text-gray-300 mb-12 font-mono h-16 flex items-center justify-center">
            <span className="mr-4 text-cyan-400">{">"}</span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-light">
              {currentText}
            </span>
            <span className="animate-pulse text-cyan-400 ml-2 text-4xl">|</span>
          </div>

          {/* Advanced achievement stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {achievements.map(({ number, label, icon: Icon }, index) => (
              <div
                key={label}
                className="text-center group cursor-pointer transform hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-purple-500/40 transition-all duration-300">
                  <Icon className="w-8 h-8 text-cyan-400 group-hover:animate-spin" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {number}
                </div>
                <div className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Advanced floating social icons */}
          <div className="flex justify-center space-x-8 mb-16">
            {[
              { icon: Github, delay: "0s", color: "hover:text-purple-400", bg: "hover:bg-purple-500/20" },
              { icon: Linkedin, delay: "0.1s", color: "hover:text-blue-400", bg: "hover:bg-blue-500/20" },
              { icon: Mail, delay: "0.2s", color: "hover:text-green-400", bg: "hover:bg-green-500/20" },
              { icon: Terminal, delay: "0.3s", color: "hover:text-yellow-400", bg: "hover:bg-yellow-500/20" },
            ].map(({ icon: Icon, delay, color, bg }, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`border-cyan-500/50 text-cyan-400 ${color} ${bg} bg-transparent backdrop-blur-sm transform hover:scale-125 hover:rotate-12 transition-all duration-300 animate-float relative group w-16 h-16`}
                style={{ animationDelay: delay }}
              >
                <Icon className="w-7 h-7 transition-transform duration-300 group-hover:animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            ))}
          </div>

          {/* Ultimate CTA Button */}
          <div className="relative group mb-16">
            {/* <Button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white px-16 py-6 rounded-full text-2xl font-bold shadow-2xl shadow-cyan-500/50 transform hover:scale-110 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                <Rocket className="w-8 h-8 mr-4 animate-bounce" />
                Explore Thameem
                <ArrowRight className="w-8 h-8 ml-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                style={{ animationDelay: "0.5s" }}
              />
             
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1200" />
            </Button> */}
            {/* Advanced glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-80 transition-opacity duration-300 animate-pulse" />
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Advanced floating stats */}
          {/* <div className="absolute top-20 right-10 hidden xl:block animate-float" style={{ animationDelay: "1s" }}>
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400 transition-colors duration-300 group">
              <div className="text-cyan-400 text-3xl font-bold mb-2 group-hover:animate-pulse">500K+</div>
              <div className="text-gray-400 text-sm">Lines of Code</div>
              <div className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-loading-bar" />
              </div>
            </div>
          </div> */}

          {/* <div className="absolute bottom-20 left-10 hidden xl:block animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400 transition-colors duration-300 group">
              <div className="text-purple-400 text-3xl font-bold mb-2 group-hover:animate-pulse">99.9%</div>
              <div className="text-gray-400 text-sm">System Uptime</div>
              <div className="flex space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-sm animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div> */}

          {/* <div className="absolute top-1/2 left-5 hidden xl:block animate-float" style={{ animationDelay: "2s" }}>
            <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-colors duration-300 group">
              <div className="text-green-400 text-3xl font-bold mb-2 group-hover:animate-pulse">150+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
              <div className="grid grid-cols-3 gap-1 mt-2">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-green-400 rounded-sm animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Ultimate animated scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce group cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-2 h-4 bg-cyan-400 rounded-full mt-2 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scroll-indicator" />
            </div>
            <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce group-hover:text-purple-400 transition-colors duration-300" />
            <div className="text-xs text-gray-400 font-mono">SCROLL TO EXPLORE</div>
          </div>
        </div> */}
      </section>

      {/* Featured Work Section */}
      <section id="projects" className="py-32 px-8 bg-zinc-900/10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-24">
            <div className="flex items-center mb-6">
              <div className="w-12 h-px bg-zinc-300 mr-6" />
              <span className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Selected Works</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter text-zinc-900 leading-tight">
              Projects that define
              <br />
              <span className="italic text-zinc-500">digital excellence</span>
            </h2>
          </div>

          {/* Projects grid */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Project image/visual */}
                <div className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border border-zinc-400 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-zinc-600 rounded-full" />
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 border border-zinc-300 opacity-60" />
                  <div className="absolute -bottom-6 -left-6 w-3 h-3 bg-zinc-400 rounded-full opacity-40" />
                </div>

                {/* Project details */}
                <div className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-medium text-zinc-500 tracking-wide">{project.year}</span>
                      <div className="w-px h-4 bg-zinc-300" />
                      <span className="text-sm font-medium text-zinc-500 tracking-wide">{project.category}</span>
                    </div>
                    <h3 className="text-4xl font-light tracking-tight text-zinc-900 mb-2">{project.title}</h3>
                    <p className="text-lg text-zinc-500 font-light mb-6">{project.description}</p>
                  </div>

                  <p className="text-zinc-600 leading-relaxed text-lg font-light">{project.description}</p>

                  <Button
                    variant="ghost"
                    className="text-zinc-900 hover:text-zinc-600 p-0 h-auto font-medium tracking-wide group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left column */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-px bg-zinc-300 mr-6" />
                <span className="text-sm font-medium tracking-widest text-zinc-500 uppercase">About</span>
              </div>

              <h2 className="text-5xl font-extralight tracking-tighter text-zinc-900 leading-tight mb-12">
                Crafting digital
                <br />
                <span className="italic text-zinc-500">experiences</span>
              </h2>

              <div className="space-y-8 text-lg text-zinc-600 font-light leading-relaxed">
                <p>
                  With over a decade of experience in digital design and development, I specialize in creating
                  interfaces that are not just functional, but emotionally resonant.
                </p>
                <p>
                  My approach combines technical precision with artistic sensibility, ensuring every project achieves
                  both its business objectives and aesthetic aspirations.
                </p>
                <p>
                  I believe the best digital experiences are invisible—they feel natural, intuitive, and effortlessly
                  guide users toward their goals.
                </p>
              </div>
            </div>

            {/* Right column - Skills */}
            <div className="space-y-12">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center group-hover:bg-zinc-300 transition-colors duration-300">
                      <skill.icon className="w-5 h-5 text-zinc-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-zinc-900 mb-2 tracking-tight">{skill.name}</h3>
                      <p className="text-zinc-600 font-light">{skill.techs.join(", ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 bg-zinc-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-px bg-zinc-300 mr-6" />
            <span className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Contact</span>
            <div className="w-12 h-px bg-zinc-300 ml-6" />
          </div>

          <h2 className="text-5xl md:text-6xl font-extralight tracking-tighter text-zinc-900 leading-tight mb-12">
            Let's create something
            <br />
            <span className="italic text-zinc-500">extraordinary</span>
          </h2>

          <p className="text-xl text-zinc-600 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities and creative challenges. Let's explore how we can
            bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3 rounded-none text-sm font-medium tracking-wide transition-all duration-300 group">
              <Mail className="w-4 h-4 mr-3" />
              Start a Conversation
            </Button>

            <div className="flex items-center gap-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-zinc-500 font-light">
              © 2024 Thameem. Thoughtfully crafted with attention to detail.
            </div>
            <div className="flex items-center gap-8 text-sm text-zinc-500">
              <span>Based in Dubai</span>
              <div className="w-px h-4 bg-zinc-300" />
              <span>Available Worldwide</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
