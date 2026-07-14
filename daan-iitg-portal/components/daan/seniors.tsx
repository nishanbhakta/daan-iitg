"use client"

import { ArrowRight } from "lucide-react"
import { InitialsAvatar } from "./initials-avatar"
import { FEATURED_SENIORS, yearOfStudy } from "@/lib/daan-data"

export function Seniors({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section id="seniors" className="relative bg-gray-900 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Your Support System
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Meet Your Seniors
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            A few of the friendly faces from the network. Reach out — they genuinely want to help.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SENIORS.map((s) => (
            <div
              key={s.name}
              className="group flex items-center gap-4 rounded-2xl border border-cyan-400/15 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <InitialsAvatar name={s.name} />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-white">{s.name}</h3>
                <p className="truncate text-sm text-gray-400">{s.branch}</p>
                <span className="mt-1 inline-block rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                  {yearOfStudy(s.admissionYear)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-7 py-3 text-sm font-bold text-cyan-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]"
          >
            View All Seniors
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
