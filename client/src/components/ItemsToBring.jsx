import React from "react";

const sections = [
  {
    title: "📄 Essential Documents",
    items: [
      "Original JEE Admit Card / Admission Letter",
      "Offer & Acceptance Letter",
      "Class X & XII Mark Sheets & Passing Certificates",
      "Aadhaar Card",
      "Address Proof",
      "10–15 Passport Size Photographs",
      "Photocopies of all important documents",
      "Medical Documents (if applicable)",
    ],
  },

  {
    title: "👕 Clothing",
    items: [
      "Shirts",
      "T-Shirts",
      "Jeans / Trousers",
      "Shorts",
      "Track Pants / Lower",
      "Formal Trouser (1)",
      "Undergarments",
      "Socks",
      "Nightwear",
      "Bath Towel",
      "Hand Towel",
      "Sweater / Hoodie",
      "Light Jacket",
      "Raincoat / Umbrella",
      "Swimming Costume (Optional)",
    ],
  },

  {
    title: "🛏 Hostel Essentials",
    items: [
      "Bedsheets (2)",
      "Pillow Covers",
      "Blanket",
      "Lock & Keys",
      "Water Bottle",
      "Laundry Bag",
      "Clothes Hangers",
      "Clothesline (Rope)",
      "Cloth Clips",
      "Window Mosquito Net (Optional)",
      "Plastic Bags",
      "Dusting Cloth",
      "Newspapers (for cupboard lining)",
    ],
  },

  {
    title: "👟 Footwear",
    items: [
      "Running Shoes",
      "Casual Shoes",
      "Formal Shoes",
      "Bathroom Slippers",
      "Sandals",
      "Non-Marking Shoes (Optional for indoor sports)",
    ],
  },

  {
    title: "🧴 Toiletries & Personal Care",
    items: [
      "Toothbrush",
      "Toothpaste",
      "Soap",
      "Shampoo",
      "Face Wash",
      "Hair Oil",
      "Comb",
      "Hand Wash",
      "Soap Case",
      "Bucket & Mug",
      "Nail Cutter",
      "Mosquito Repellent",
      "Spectacles (if applicable)",
    ],
  },

  {
    title: "💻 Electronics",
    items: [
      "Mobile Phone",
      "Phone Charger",
      "Laptop",
      "Laptop Charger",
      "Scientific Calculator (Casio fx-991ES Plus or equivalent)",
      "Extension Board",
      "Pen Drive",
      "Earphones / Headphones",
      "USB Cable",
      "OTG Adapter",
      "LAN Cable",
      "Power Bank (Optional)",
      "Table Lamp (Optional)",
    ],
  },

  {
    title: "📚 Stationery",
    items: [
      "Blue & Black Pens",
      "Pencils",
      "Eraser",
      "Sharpener",
      "Notebook / Rough Book",
      "School Bag / Backpack",
      "Glue Stick",
      "Stapler",
      "Scissors",
      "Highlighter",
      "Scale",
      "Cello Tape",
      "Paper Clips",
      "Sticky Notes (Optional)",
    ],
  },

  {
    title: "💊 Medicines & First Aid",
    items: [
      "Paracetamol",
      "ORS",
      "Band-Aids",
      "Cotton",
      "Antiseptic Cream",
      "Pain Relief Spray",
      "Prescription Medicines",
      "Thermometer",
    ],
  },

  {
    title: "🍜 Miscellaneous",
    items: [
      "Dry Snacks",
      "Steel Plate / Bowl / Spoon",
      "Coffee Mug",
      "Reusable Water Bottle",
      "Safety Pins",
      "Small Sewing Kit",
      "Wallet",
      "Identity Card Holder",
      "Small Torch",
      "Notebook for Important Information",
    ],
  },

  {
    title: "🏸 Sports & Fitness (Optional)",
    items: [
      "Badminton Racket",
      "Cricket Equipment",
      "Football",
      "Gym Gloves",
      "Skipping Rope",
      "Swimming Kit",
    ],
  },
];
export default function ItemsToBring({ onBack }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_35%),linear-gradient(135deg,_#111827_0%,_#030712_100%)] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 font-medium text-cyan-300 transition hover:bg-cyan-500/20 hover:text-cyan-200"
        >
          <span className="text-lg">←</span>
          Back
        </button>

        <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Fresher&apos;s guide
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              🎒 IIT Guwahati Packing Checklist
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Pack light, stay prepared, and carry only what will genuinely help you settle in comfortably.
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-blue-300 bg-blue-50 p-4 text-blue-900">
            <h3 className="font-bold text-lg mb-2">
              📦 Before You Start Packing
            </h3>

            <p className="leading-7">
              Read through the complete checklist first. Bring only the items that are
              essential for you. Most daily-use items can be purchased after reaching
              IIT Guwahati, so avoid carrying unnecessary luggage and travel light.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-gray-700/80 bg-gray-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <h2 className="mb-4 text-xl font-semibold text-cyan-300">
                  {section.title}
                </h2>

                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-200">
                      <span className="mt-0.5 text-cyan-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-yellow-400/30 bg-yellow-100/95 p-7 text-gray-900 shadow-xl shadow-yellow-500/10">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            💡 Important Note
          </h2>

          <ul className="ml-6 list-disc space-y-3 text-[15px] leading-7">
            <li>Carry only the items that are essential for your personal needs.</li>
            <li>Most daily-use items are easily available in and around the IIT Guwahati campus, so there&apos;s no need to overpack.</li>
            <li>Keep all important documents safely organized in a waterproof folder.</li>
            <li>Label your luggage and valuable belongings with your name and contact details.</li>
            <li>Carry a small amount of cash along with digital payment options (UPI/cards).</li>
            <li>Pack smart and travel comfortably rather than carrying unnecessary weight.</li>
            <li>
              <strong>Disclaimer:</strong> This checklist is meant to serve as a general guide for incoming first-year students. It is <strong>not mandatory</strong> to bring every item listed below. Go through the list and pack according to your personal requirements, preferences, and convenience.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}