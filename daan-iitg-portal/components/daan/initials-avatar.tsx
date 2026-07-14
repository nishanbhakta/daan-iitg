const GRADIENTS = [
  "from-cyan-400 to-blue-500",
  "from-blue-400 to-indigo-500",
  "from-teal-400 to-cyan-500",
  "from-purple-400 to-blue-500",
  "from-sky-400 to-cyan-500",
]

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function InitialsAvatar({
  name,
  size = "md",
}: {
  name: string
  size?: "md" | "lg"
}) {
  const gradient = GRADIENTS[name.length % GRADIENTS.length]
  const sizeCls = size === "lg" ? "h-20 w-20 text-2xl" : "h-12 w-12 text-base"
  return (
    <span
      aria-hidden="true"
      className={`flex ${sizeCls} flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-extrabold text-gray-900 shadow-lg`}
    >
      {initials(name)}
    </span>
  )
}
