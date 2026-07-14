"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Search, Users } from "lucide-react"
import { InitialsAvatar } from "./initials-avatar"
import { SENIORS, BRANCHES, yearOfStudy } from "@/lib/daan-data"

export function AllSeniorsPage({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("")
  const [branch, setBranch] = useState("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SENIORS.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.school.toLowerCase().includes(q) ||
        s.branch.toLowerCase().includes(q)
      const matchesBranch = branch === "All" || s.branch === branch
      return matchesQuery && matchesBranch
    })
  }, [query, branch])

  return (
    <main className="min-h-screen bg-gray-900 px-4 pt-24 pb-20">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-cyan-300 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300">
            <Users className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Seniors Directory</h1>
            <p className="text-sm text-gray-400">
              {filtered.length} of {SENIORS.length} scholars in the network
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, school or branch..."
              className="w-full rounded-xl border border-cyan-400/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 backdrop-blur-md outline-none transition-colors duration-300 focus:border-cyan-400/50"
            />
          </div>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="rounded-xl border border-cyan-400/15 bg-gray-800 py-3 px-4 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-400/50"
          >
            <option value="All">All Branches</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-cyan-400/15 bg-white/5 p-10 text-center text-gray-400 backdrop-blur-md">
            No seniors match your search. Try a different name or branch.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <div
                key={`${s.name}-${s.school}`}
                className="group flex items-center gap-4 rounded-2xl border border-cyan-400/15 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <InitialsAvatar name={s.name} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-white">{s.name}</h3>
                  <p className="truncate text-xs text-gray-400">{s.branch}</p>
                  <p className="truncate text-xs text-gray-500">{s.school}</p>
                  <span className="mt-1 inline-block rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                    {yearOfStudy(s.admissionYear)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
