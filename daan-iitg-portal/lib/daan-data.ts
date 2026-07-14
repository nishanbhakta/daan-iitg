export type Senior = {
  name: string
  admissionYear: number
  school: string
  branch: string
  phone?: string
}

// The official joining date for incoming freshers.
export const JOINING_DATE = new Date("2026-07-28T09:00:00+05:30")

// Reference point used to compute year-of-study. During July, the new
// academic year is about to begin, so we base it on the calendar year.
export function getCurrentAcademicYear(now: Date = new Date()): number {
  // Academic year rolls over in July when new admits join.
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export function yearOfStudy(admissionYear: number, now: Date = new Date()): string {
  const academicYear = getCurrentAcademicYear(now)
  const diff = academicYear - admissionYear + 1
  if (diff <= 0) return "Incoming"
  if (diff > 5) return "Alumnus"
  return `${ordinal(diff)} Year`
}

export const BRANCHES = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Electronics & Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biosciences & Bioengineering",
  "Engineering Physics",
  "Mathematics & Computing",
  "Data Science & Artificial Intelligence",
  "Chemical Science & Technology",
]

export const SENIORS: Senior[] = [
  { name: "Aditya Kumar", admissionYear: 2023, school: "JNV Patna", branch: "Computer Science & Engineering", phone: "+91 98765 43210" },
  { name: "Priya Sharma", admissionYear: 2023, school: "JNV Jaipur", branch: "Mathematics & Computing", phone: "+91 98765 43211" },
  { name: "Rahul Verma", admissionYear: 2023, school: "JNV Lucknow", branch: "Electronics & Communication Engineering", phone: "+91 98765 43212" },
  { name: "Sneha Reddy", admissionYear: 2023, school: "JNV Hyderabad", branch: "Data Science & Artificial Intelligence", phone: "+91 98765 43213" },
  { name: "Arjun Nair", admissionYear: 2023, school: "JNV Kozhikode", branch: "Mechanical Engineering", phone: "+91 98765 43214" },
  { name: "Ananya Das", admissionYear: 2024, school: "JNV Kamrup", branch: "Chemical Engineering", phone: "+91 98765 43215" },
  { name: "Vikram Singh", admissionYear: 2023, school: "JNV Bikaner", branch: "Civil Engineering", phone: "+91 98765 43216" },
  { name: "Isha Gupta", admissionYear: 2024, school: "JNV Bhopal", branch: "Engineering Physics", phone: "+91 98765 43217" },
  { name: "Karthik Iyer", admissionYear: 2023, school: "JNV Chennai", branch: "Electronics & Electrical Engineering", phone: "+91 98765 43218" },
  { name: "Meera Joshi", admissionYear: 2023, school: "JNV Pune", branch: "Biosciences & Bioengineering", phone: "+91 98765 43219" },
  { name: "Rohan Mehta", admissionYear: 2024, school: "JNV Ahmedabad", branch: "Computer Science & Engineering" },
  { name: "Divya Menon", admissionYear: 2023, school: "JNV Ernakulam", branch: "Mathematics & Computing" },
  { name: "Aman Chauhan", admissionYear: 2023, school: "JNV Dehradun", branch: "Mechanical Engineering" },
  { name: "Nisha Patel", admissionYear: 2024, school: "JNV Surat", branch: "Chemical Science & Technology" },
  { name: "Siddharth Rao", admissionYear: 2023, school: "JNV Bengaluru", branch: "Data Science & Artificial Intelligence" },
  { name: "Pooja Kulkarni", admissionYear: 2023, school: "JNV Nagpur", branch: "Electronics & Communication Engineering" },
  { name: "Harsh Vardhan", admissionYear: 2024, school: "JNV Ranchi", branch: "Civil Engineering" },
  { name: "Tanvi Deshmukh", admissionYear: 2023, school: "JNV Nashik", branch: "Biosciences & Bioengineering" },
  { name: "Nikhil Bansal", admissionYear: 2023, school: "JNV Rohtak", branch: "Engineering Physics" },
  { name: "Shreya Ghosh", admissionYear: 2024, school: "JNV Kolkata", branch: "Computer Science & Engineering" },
  { name: "Aryan Malhotra", admissionYear: 2023, school: "JNV Amritsar", branch: "Electronics & Electrical Engineering" },
  { name: "Kavya Krishnan", admissionYear: 2023, school: "JNV Thrissur", branch: "Mathematics & Computing" },
  { name: "Devansh Jain", admissionYear: 2024, school: "JNV Indore", branch: "Mechanical Engineering" },
  { name: "Ritika Agarwal", admissionYear: 2023, school: "JNV Kanpur", branch: "Chemical Engineering" },
  { name: "Manish Yadav", admissionYear: 2023, school: "JNV Varanasi", branch: "Data Science & Artificial Intelligence" },
  { name: "Sanya Kapoor", admissionYear: 2024, school: "JNV Shimla", branch: "Engineering Physics" },
  { name: "Yash Thakur", admissionYear: 2023, school: "JNV Mandi", branch: "Civil Engineering" },
  { name: "Lakshmi Pillai", admissionYear: 2023, school: "JNV Kollam", branch: "Biosciences & Bioengineering" },
  { name: "Gaurav Saxena", admissionYear: 2024, school: "JNV Gwalior", branch: "Chemical Science & Technology" },
  { name: "Neha Bora", admissionYear: 2023, school: "JNV Dibrugarh", branch: "Computer Science & Engineering" },
]

export const FEATURED_SENIORS: Senior[] = SENIORS.slice(0, 10)

export type QuickLink = {
  title: string
  description: string
  href: string
  icon: string
}

export const QUICK_LINKS: QuickLink[] = [
  {
    title: "Student ERP Portal",
    description: "Course registration, grades, fee payments and academic records.",
    href: "https://academic.iitg.ac.in/",
    icon: "graduation-cap",
  },
  {
    title: "Swayam Automation Portal",
    description: "Internal services, mess registration, hostel utilities and more.",
    href: "https://swagatam.iitg.ac.in/",
    icon: "settings",
  },
  {
    title: "IITG Student App",
    description: "The official all-in-one mobile app for campus life and updates.",
    href: "https://iitg.ac.in/",
    icon: "smartphone",
  },
  {
    title: "Admissions Info",
    description: "Reporting, document checklist and joining formalities.",
    href: "https://www.iitg.ac.in/acad/",
    icon: "file-text",
  },
]

export type Contact = {
  name: string
  role: string
  year: string
  phone: string
}

export const CONTACTS: Contact[] = [
  { name: "Aditya Kumar", role: "Freshers' Coordinator", year: "4th Year", phone: "+91 98765 43210" },
  { name: "Priya Sharma", role: "Hostel & Accommodation Rep", year: "4th Year", phone: "+91 98765 43211" },
  { name: "Rahul Verma", role: "Academics Rep", year: "3rd Year", phone: "+91 98765 43212" },
  { name: "Sneha Reddy", role: "Registration Help Desk", year: "3rd Year", phone: "+91 98765 43213" },
]

export type PackingCategory = {
  emoji: string
  title: string
  items: string[]
}

export const PACKING_LIST: PackingCategory[] = [
  {
    emoji: "📄",
    title: "Essential Documents",
    items: [
      "Original + photocopies of JEE Advanced admit card & scorecard",
      "Class X and XII mark sheets and certificates",
      "Category certificate (if applicable)",
      "Provisional admission / seat allotment letter",
      "Passport-size photographs (at least 10)",
      "Medical fitness certificate",
      "Aadhaar card & bank passbook copy",
    ],
  },
  {
    emoji: "👕",
    title: "Clothing",
    items: [
      "Everyday casual wear (7–10 sets)",
      "One formal outfit for orientation",
      "Light jacket / hoodie for AC rooms and rain",
      "Raincoat or umbrella (Guwahati gets heavy monsoon)",
      "Sleepwear and enough undergarments",
    ],
  },
  {
    emoji: "🛏️",
    title: "Hostel Essentials",
    items: [
      "Bedsheets, pillow & pillow covers",
      "Blanket / quilt",
      "Mosquito net or repellent",
      "Bucket, mug and a sturdy lock",
      "Hangers and a small clothesline",
      "Study lamp and an extension board",
    ],
  },
  {
    emoji: "👟",
    title: "Footwear",
    items: [
      "Comfortable sneakers for daily walking",
      "Flip-flops / bathroom slippers",
      "One pair of formal shoes",
    ],
  },
  {
    emoji: "🧴",
    title: "Toiletries & Personal Care",
    items: [
      "Toothbrush, toothpaste and soap/body wash",
      "Shampoo, comb and a towel (2)",
      "Basic first-aid kit and personal medicines",
      "Nail cutter, deodorant and other essentials",
    ],
  },
  {
    emoji: "💻",
    title: "Electronics",
    items: [
      "Laptop + charger (buying guide coming soon)",
      "Phone charger and a power bank",
      "Earphones / headphones",
      "Universal adapter and a multi-plug board",
      "Pen drive / external storage",
    ],
  },
  {
    emoji: "🎒",
    title: "Miscellaneous",
    items: [
      "Water bottle and a couple of tiffin boxes",
      "Notebooks, pens and a basic geometry box",
      "Small sewing kit and safety pins",
      "Some cash for the first few days",
      "A photo or two from home for your desk",
    ],
  },
]

export const NETWORK_STATS = {
  seniors: SENIORS.length,
  schools: new Set(SENIORS.map((s) => s.school)).size,
  branches: new Set(SENIORS.map((s) => s.branch)).size,
}
