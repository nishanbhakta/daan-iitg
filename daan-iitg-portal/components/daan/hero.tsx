"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { ParticleCanvas } from "./particle-canvas"
import { Countdown } from "./countdown"
import { CountUp } from "./count-up"
import { NETWORK_STATS } from "@/lib/daan-data"

const PHRASES = ["to IIT Guwahati", "to a new chapter", "to endless opportunities", "home, scholars"]

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index % phrases.length]
    let delay = deleting ? 45 : 90
    if (!deleting && text === current) {
      delay = 1600
    } else if (deleting && text === "") {
      delay = 300
    }
    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
      } else if (deleting && text === "") {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, phrases])

  return text
}

export function Hero() {
  const typed = useTypewriter(PHRASES)
  const sectionRef = useRef<HTMLElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 40 })

  const onMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const stats = [
    { value: NETWORK_STATS.seniors, label: "Seniors in Network", suffix: "+" },
    { value: NETWORK_STATS.schools, label: "Schools Represented", suffix: "+" },
    { value: NETWORK_STATS.branches, label: "Branches Represented", suffix: "" },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 px-4 pt-24 pb-16"
    >
      <ParticleCanvas />

      {/* cursor-reactive radial glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(34,211,238,0.12), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* floating gradient orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-blue-600/20 blur-3xl [animation-delay:1s]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 animate-pulse rounded-full bg-purple-600/10 blur-3xl [animation-delay:2s]" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Welcome, Scholars!
        </span>

        <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
          Welcome{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {typed}
          </span>
          <span className="ml-1 inline-block h-9 w-1 animate-pulse bg-cyan-400 align-middle sm:h-12" />
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-gray-300 sm:text-lg">
          DAAN IITG is a peer-support network built by senior Dakshana Scholars to help you glide
          through admission, hostel allotment, and your very first year at IIT Guwahati. You are not
          walking in alone.
        </p>

        <div className="mt-10 w-full">
          <div className="flex justify-center">
            <Countdown />
          </div>
        </div>

        <button
          onClick={() => scrollTo("notices")}
          className="group relative mt-10 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3.5 text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/30 transition-transform duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center gap-2">
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </button>

        <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-cyan-400/15 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]"
            >
              <div className="text-3xl font-extrabold text-cyan-300">
                <CountUp to={s.value} />
                {s.suffix}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
