"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Mail, Bell, RefreshCw, ShieldCheck, X } from "lucide-react"

const STORAGE_KEY = "daan-fresher-alert-dismissed"

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function FresherAlertModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed !== todayKey()) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const dismissForever = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed")
    setVisible(false)
  }

  const remindTomorrow = () => {
    localStorage.setItem(STORAGE_KEY, todayKey())
    setVisible(false)
  }

  if (!visible) return null

  const reminders = [
    { icon: RefreshCw, text: "Keep refreshing the official freshers' portal daily" },
    { icon: Mail, text: "Watch for your institute email ID activation" },
    { icon: Bell, text: "Check for hostel & registration notices" },
    { icon: ShieldCheck, text: "Verify updates only from official IITG sources" },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={remindTomorrow}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-cyan-400/20 bg-gray-900 shadow-2xl shadow-cyan-500/10 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 bg-red-600 px-6 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <AlertTriangle className="h-5 w-5 text-white" />
          </span>
          <div className="flex-1">
            <h2 className="text-base font-extrabold text-white">Important for all Freshers</h2>
            <p className="text-xs text-red-100">Please read before you continue</p>
          </div>
          <button
            onClick={remindTomorrow}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <p className="text-sm leading-relaxed text-gray-300">
            Until your <span className="font-semibold text-cyan-300">institute email ID</span> is
            activated, all official communication happens through the IIT Guwahati freshers&apos;
            portal. Keep checking it regularly so you never miss a critical update.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reminders.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-cyan-400/15 bg-white/5 p-3 backdrop-blur-md"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs leading-relaxed text-gray-300">{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={dismissForever}
              className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-3 text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-transform duration-300 hover:scale-[1.02]"
            >
              Got it
            </button>
            <button
              onClick={remindTomorrow}
              className="flex-1 rounded-xl border border-cyan-400/20 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              Remind me tomorrow
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
