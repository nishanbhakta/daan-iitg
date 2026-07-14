"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/daan/navbar"
import { FresherAlertModal } from "@/components/daan/fresher-alert-modal"
import { Hero } from "@/components/daan/hero"
import { About } from "@/components/daan/about"
import { Notices } from "@/components/daan/notices"
import { QuickLinks } from "@/components/daan/quick-links"
import { Seniors } from "@/components/daan/seniors"
import { CampusMap } from "@/components/daan/campus-map"
import { Contact } from "@/components/daan/contact"
import { Footer } from "@/components/daan/footer"
import { AllSeniorsPage } from "@/components/daan/all-seniors-page"
import { ItemsToBringPage } from "@/components/daan/items-to-bring-page"

type View = "home" | "seniors" | "items"

export default function Page() {
  const [view, setView] = useState<View>("home")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [view])

  const goHome = () => setView("home")

  if (view === "seniors") {
    return (
      <>
        <Navbar />
        <AllSeniorsPage onBack={goHome} />
      </>
    )
  }

  if (view === "items") {
    return (
      <>
        <Navbar />
        <ItemsToBringPage onBack={goHome} />
      </>
    )
  }

  return (
    <>
      <FresherAlertModal />
      <Navbar />
      <Hero />
      <About />
      <Notices onOpenItems={() => setView("items")} />
      <QuickLinks />
      <Seniors onViewAll={() => setView("seniors")} />
      <CampusMap />
      <Contact />
      <Footer />
    </>
  )
}
