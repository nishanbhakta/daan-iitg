"use client"

import { useState } from "react"
import { ArrowLeft, Backpack, Check } from "lucide-react"
import { PACKING_LIST } from "@/lib/daan-data"

export function ItemsToBringPage({ onBack }: { onBack: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))

  const total = PACKING_LIST.reduce((n, c) => n + c.items.length, 0)
  const done = Object.values(checked).filter(Boolean).length

  return (
    <main className="min-h-screen bg-gray-900 px-4 pt-24 pb-20">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-cyan-300 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300">
            <Backpack className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Items to Bring</h1>
            <p className="text-sm text-gray-400">
              Tick items as you pack — {done} of {total} done
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
            style={{ width: `${total ? (done / total) * 100 : 0}%` }}
          />
        </div>

        <div className="mt-10 space-y-6">
          {PACKING_LIST.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md"
            >
              <h2 className="flex items-center gap-3 text-lg font-bold text-white">
                <span className="text-2xl" aria-hidden="true">
                  {cat.emoji}
                </span>
                {cat.title}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cat.items.map((item) => {
                  const key = `${cat.title}::${item}`
                  const isChecked = !!checked[key]
                  return (
                    <li key={key}>
                      <button
                        onClick={() => toggle(key)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                          isChecked
                            ? "border-cyan-400/40 bg-cyan-400/10 text-gray-400"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-cyan-400/30 hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                            isChecked
                              ? "border-cyan-400 bg-cyan-400 text-gray-900"
                              : "border-gray-500"
                          }`}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className={isChecked ? "line-through" : ""}>{item}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
