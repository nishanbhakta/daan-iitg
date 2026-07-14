import { MapPin } from "lucide-react"

export function CampusMap() {
  return (
    <section id="map" className="relative bg-gray-800 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Find Your Way
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Interactive Campus Map
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            IIT Guwahati sits on a sprawling green campus by the Brahmaputra. Here&apos;s exactly
            where you&apos;re headed.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 p-2 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              title="IIT Guwahati campus location"
              src="https://www.google.com/maps?q=IIT+Guwahati&output=embed"
              className="h-[420px] w-full border-0 grayscale-[0.2]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4 text-cyan-400" />
          Indian Institute of Technology Guwahati, Amingaon, North Guwahati, Assam 781039
        </div>
      </div>
    </section>
  )
}
