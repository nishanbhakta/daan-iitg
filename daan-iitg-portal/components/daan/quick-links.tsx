import { GraduationCap, Settings, Smartphone, FileText, ExternalLink } from "lucide-react"
import { QUICK_LINKS } from "@/lib/daan-data"

const ICONS: Record<string, typeof GraduationCap> = {
  "graduation-cap": GraduationCap,
  settings: Settings,
  smartphone: Smartphone,
  "file-text": FileText,
}

export function QuickLinks() {
  return (
    <section id="links" className="relative bg-gray-800 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Bookmark These
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Quick Links
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            The essential portals and apps you&apos;ll use throughout your first year.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link) => {
            const Icon = ICONS[link.icon] ?? ExternalLink
            return (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-500 transition-colors duration-300 group-hover:text-cyan-300" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{link.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{link.description}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
