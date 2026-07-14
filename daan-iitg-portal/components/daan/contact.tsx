import { Phone } from "lucide-react"
import { InitialsAvatar } from "./initials-avatar"
import { CONTACTS } from "@/lib/daan-data"

export function Contact() {
  return (
    <section id="contact" className="relative bg-gray-900 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            We&apos;ve Got You
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Need Help? Talk to a Rep
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            Stuck with admission, hostel, registration or academics? These student representatives
            are just a call away.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CONTACTS.map((c) => (
            <div
              key={c.name}
              className="group flex items-center gap-5 rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <InitialsAvatar name={c.name} size="lg" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-white">{c.name}</h3>
                <p className="text-sm text-cyan-300">{c.role}</p>
                <p className="text-xs text-gray-400">{c.year}</p>
                <a
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-300 transition-colors duration-300 hover:bg-cyan-400/20"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {c.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
