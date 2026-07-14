"use client"

import { CalendarDays, Backpack, Laptop, Award, ExternalLink, ArrowRight } from "lucide-react"

type NoticeCard = {
  title: string
  desc: string
  icon: typeof CalendarDays
  rotate: string
  accent: string
  action:
    | { type: "external"; href: string }
    | { type: "page" }
    | { type: "soon" }
}

const NOTICES: NoticeCard[] = [
  {
    title: "Joining Date",
    desc: "Check the official academic calendar for reporting dates and orientation schedule.",
    icon: CalendarDays,
    rotate: "-rotate-2",
    accent: "from-cyan-400/20 to-blue-500/20 text-cyan-300",
    action: { type: "external", href: "https://www.iitg.ac.in/acad/academic-calendar" },
  },
  {
    title: "Items to Bring",
    desc: "A complete, categorized packing checklist so you never forget the essentials.",
    icon: Backpack,
    rotate: "rotate-2",
    accent: "from-emerald-400/20 to-teal-500/20 text-emerald-300",
    action: { type: "page" },
  },
  {
    title: "Laptop Buying Guide",
    desc: "Branch-wise laptop recommendations and where to buy. Coming soon.",
    icon: Laptop,
    rotate: "-rotate-1",
    accent: "from-blue-400/20 to-indigo-500/20 text-blue-300",
    action: { type: "soon" },
  },
  {
    title: "Scholarship Guide",
    desc: "All the scholarships you can apply for and how to secure them. Coming soon.",
    icon: Award,
    rotate: "rotate-1",
    accent: "from-amber-400/20 to-orange-500/20 text-amber-300",
    action: { type: "soon" },
  },
]

export function Notices({ onOpenItems }: { onOpenItems: () => void }) {
  return (
    <section id="notices" className="relative bg-gray-900 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Pinned for You
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Important Notices
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            The must-know things before you arrive. Tap a note to learn more.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NOTICES.map((n) => {
            const Icon = n.icon
            const soon = n.action.type === "soon"

            const content = (
              <>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${n.accent}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{n.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  {n.action.type === "external" && (
                    <>
                      View calendar <ExternalLink className="h-3.5 w-3.5" />
                    </>
                  )}
                  {n.action.type === "page" && (
                    <>
                      Open checklist <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                  {soon && <span className="text-gray-500">Coming soon</span>}
                </span>
              </>
            )

            const baseCls = `block rounded-2xl border p-6 text-left transition-all duration-300 ${n.rotate}`

            if (soon) {
              return (
                <div
                  key={n.title}
                  aria-disabled="true"
                  className={`${baseCls} cursor-not-allowed border-white/5 bg-white/[0.03] opacity-60`}
                >
                  {content}
                </div>
              )
            }

            if (n.action.type === "external") {
              return (
                <a
                  key={n.title}
                  href={n.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baseCls} border-cyan-400/15 bg-white/5 backdrop-blur-md hover:rotate-0 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]`}
                >
                  {content}
                </a>
              )
            }

            return (
              <button
                key={n.title}
                onClick={onOpenItems}
                className={`${baseCls} border-cyan-400/15 bg-white/5 backdrop-blur-md hover:rotate-0 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]`}
              >
                {content}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
