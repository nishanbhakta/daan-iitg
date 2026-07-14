"use client"

import { useEffect, useRef, useState } from "react"
import { PartyPopper, Timer } from "lucide-react"
import { JOINING_DATE } from "@/lib/daan-data"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

// Total window used for the progress bar: 60 days before joining.
const WINDOW_MS = 60 * 86400000

function Unit({ value, label }: { value: number; label: string }) {
  const [pulse, setPulse] = useState(false)
  const prev = useRef(value)

  useEffect(() => {
    if (prev.current !== value) {
      setPulse(true)
      prev.current = value
      const t = setTimeout(() => setPulse(false), 300)
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 text-2xl font-extrabold tabular-nums text-cyan-300 backdrop-blur-md transition-all duration-300 sm:h-20 sm:w-20 sm:text-3xl ${
          pulse ? "scale-110 border-cyan-400/60 shadow-[0_0_25px_-4px_rgba(34,211,238,0.7)]" : ""
        }`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const target = JOINING_DATE.getTime()
  const [time, setTime] = useState<TimeLeft | null>(null)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      setPassed(now >= target)
      setTime(getTimeLeft(target))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  if (!time) {
    return (
      <div className="h-52 w-full max-w-xl rounded-3xl border border-cyan-400/20 bg-white/5 backdrop-blur-md" />
    )
  }

  if (passed) {
    return (
      <div className="w-full max-w-xl rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 p-8 text-center backdrop-blur-md shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]">
        <PartyPopper className="mx-auto mb-3 h-10 w-10 text-cyan-300" />
        <h3 className="text-2xl font-extrabold text-white">Welcome to IIT Guwahati!</h3>
        <p className="mt-1 text-sm text-gray-300">
          The wait is over — your journey begins now. All the best, scholars!
        </p>
      </div>
    )
  }

  const remaining = Math.max(0, target - Date.now())
  const progress = Math.min(100, Math.max(0, (1 - remaining / WINDOW_MS) * 100))

  return (
    <div className="w-full max-w-xl rounded-3xl border border-cyan-400/20 bg-white/5 p-6 backdrop-blur-md shadow-2xl shadow-cyan-500/10 sm:p-8">
      <div className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-cyan-300">
        <Timer className="h-4 w-4" />
        Counting down to your joining day
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <Unit value={time.days} label="Days" />
        <Unit value={time.hours} label="Hours" />
        <Unit value={time.minutes} label="Minutes" />
        <Unit value={time.seconds} label="Seconds" />
      </div>
      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">
        {JOINING_DATE.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  )
}
