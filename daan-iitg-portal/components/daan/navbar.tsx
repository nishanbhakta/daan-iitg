"use client"

import { useEffect, useState } from "react"
import { Menu, X, Sparkles } from "lucide-react"

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "notices", label: "Notices" },
  { id: "links", label: "Links" },
  { id: "seniors", label: "Seniors" },
  { id: "map", label: "Map" },
  { id: "contact", label: "Contact" },
]

export function Navbar() {
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-cyan-400/20 bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/5"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <button
          onClick={() => scrollTo("home")}
          className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-900 shadow-lg shadow-cyan-500/30">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            DAAN <span className="text-cyan-400">IITG</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active === item.id
                  ? "text-cyan-300"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {active === item.id && (
                <span className="absolute inset-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]" />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-white/5 text-cyan-300 transition-colors duration-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-cyan-400/10 bg-gray-900/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                active === item.id
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
