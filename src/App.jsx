import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ImportantNotices from "./components/ImportantNotices";
import QuickLinks from "./components/QuickLinks";
import Seniors from "./components/Seniors";
import CampusMap from "./components/CampusMap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllSeniorsPage from "./components/AllSeniorsPage";
import ItemsToBring from "./components/ItemsToBring";
import FreshersAlert from "./components/FreshersAlert";

const SECTION_IDS = [
  "home",
  "about",
  "notices",
  "links",
  "seniors",
  "map",
  "gallery",
  "contact",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [page, setPage] = useState("main");
  const [showAlert, setShowAlert] = useState(false);

  // Show alert on first visit or after 24 hours
  useEffect(() => {
    const nextShowTime = localStorage.getItem("nextFreshersAlert");

    if (!nextShowTime) {
      setShowAlert(true);
    } else if (Date.now() >= Number(nextShowTime)) {
      setShowAlert(true);
    }
  }, []);

  // Lock background scrolling while popup is open
  useEffect(() => {
    if (showAlert) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showAlert]);

  const handleNavClick = (id) => {
    if (page !== "main") {
      setPage("main");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (page !== "main") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [page]);

  if (page === "allSeniors") {
    return <AllSeniorsPage onBack={() => setPage("main")} />;
  }

  if (page === "itemsToBring") {
    return <ItemsToBring onBack={() => setPage("main")} />;
  }

  return (
    <div className="bg-gray-900 font-sans overflow-x-hidden">

      {showAlert && (
        <FreshersAlert onClose={() => setShowAlert(false)} />
      )}

      <Header
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />

      <main>
        <Hero onNavClick={handleNavClick} />

        <About />

        <ImportantNotices
          onShowItems={() => setPage("itemsToBring")}
        />

        <QuickLinks />

        <Seniors
          onShowAllSeniors={() => setPage("allSeniors")}
        />

        <CampusMap />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}