import { Bug, MessageCircle, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gray-950 px-4 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-cyan-400/15 bg-white/5 p-8 text-center backdrop-blur-md sm:p-10">
          <h3 className="text-xl font-extrabold text-white">Help us improve</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-400">
            Spotted something broken or have a suggestion? This portal is built by students, for
            students — your feedback keeps it useful.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:daan.iitg@gmail.com?subject=Bug%20Report%20-%20DAAN%20IITG"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              <Bug className="h-4 w-4 text-cyan-300" />
              Report a Bug
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-transform duration-300 hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" />
              Contact on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-900">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold">
              DAAN <span className="text-cyan-400">IITG</span>
            </span>
          </div>
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} DAAN IITG · Built with care by Dakshana Scholars at IIT
            Guwahati.
          </p>
        </div>
      </div>
    </footer>
  )
}
