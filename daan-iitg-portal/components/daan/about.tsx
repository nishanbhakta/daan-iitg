import { HeartHandshake, Home, BookOpen, Compass } from "lucide-react"

const PILLARS = [
  {
    icon: Compass,
    title: "Admission Guidance",
    text: "Step-by-step help with reporting, document verification and joining formalities.",
  },
  {
    icon: Home,
    title: "Hostel & Campus Life",
    text: "Everything about hostel allotment, mess, and settling into life on campus.",
  },
  {
    icon: BookOpen,
    title: "Academics",
    text: "Course registration, credit system and study tips from those who have been there.",
  },
  {
    icon: HeartHandshake,
    title: "Peer Support",
    text: "A friendly senior network you can reach out to whenever you feel lost.",
  },
]

export function About() {
  return (
    <section id="about" className="relative bg-gray-800 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            About the Initiative
          </span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Seniors helping freshers, one step at a time
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            DAAN IITG is a scholar-network initiative by Dakshana Scholars — a community of senior
            students who once stood exactly where you are now. We built this portal to demystify the
            transition from an admit to a confident first-year student, covering everything from
            admission and hostel allotment to academics and everyday campus life.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_10px_40px_-12px_rgba(34,211,238,0.5)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
