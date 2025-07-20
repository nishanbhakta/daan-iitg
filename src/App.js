import React, { useState, useEffect, useRef } from 'react';

// Example Icon Component const Icon = ({ path, className = "w-6 h-6" }) => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}> <path d={path} /> </svg> );

const allSeniorsData = [ { name: "Anjali Sharma", admissionYear: 2021, school: "Delhi Public School", branch: "CSE" }, { name: "Rahul Verma", admissionYear: 2022, school: "DAV Ranchi", branch: "ME" }, { name: "Sneha Patel", admissionYear: 2023, school: "Modern School", branch: "EEE" }, { name: "Vikram Joshi", admissionYear: 2024, school: "St. Xavier's", branch: "CE" }, ];

const getYearOfStudy = (admissionYear) => { const currentYear = new Date().getFullYear(); const diff = currentYear - admissionYear; if (diff >= 4) return "Alumnus/Alumna"; return ${diff + 1} Year; };

const App = () => { const [page, setPage] = useState("main"); const [activeSection, setActiveSection] = useState("");

const sections = useRef({});

useEffect(() => { const observer = new IntersectionObserver( (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setActiveSection(entry.target.id); } }); }, { threshold: 0.5 } );

Object.values(sections.current).forEach((section) => {
  if (section) observer.observe(section);
});

return () => {
  Object.values(sections.current).forEach((section) => {
    if (section) observer.unobserve(section);
  });
};

}, []);

const groupedSeniors = allSeniorsData.reduce((acc, senior) => { acc[senior.admissionYear] = acc[senior.admissionYear] || []; acc[senior.admissionYear].push(senior); return acc; }, {});

if (page === "allSeniors") { return ( <div className="p-4"> <h1 className="text-2xl font-bold mb-4">All Seniors</h1> {Object.entries(groupedSeniors).map(([year, seniors]) => ( <div key={year} className="mb-6"> <h2 className="text-xl font-semibold">Batch of {year}</h2> <ul className="list-disc ml-5"> {seniors.map((s, i) => ( <li key={i}>{s.name} ({s.branch}) - {s.school}</li> ))} </ul> </div> ))} <button onClick={() => setPage("main")} className="text-blue-500 underline">Back to Main Page</button> </div> ); }

return ( <div> <nav className="sticky top-0 bg-white z-10 flex gap-4 p-2 shadow"> {['hero', 'about', 'seniors', 'gallery', 'contact'].map((id) => ( <a key={id} href={#${id}} className={px-2 ${activeSection === id ? 'text-blue-600 font-bold' : ''}} > {id.charAt(0).toUpperCase() + id.slice(1)} </a> ))} </nav>

<section ref={el => sections.current.hero = el} id="hero" className="h-screen flex flex-col items-center justify-center bg-blue-50">
    <h1 className="text-4xl font-bold mb-4">Welcome to IIT Guwahati</h1>
    <button onClick={() => window.scrollTo({ top: document.getElementById('about').offsetTop, behavior: 'smooth' })} className="px-4 py-2 bg-blue-600 text-white rounded">Get Started</button>
  </section>

  <section ref={el => sections.current.about = el} id="about" className="p-8 bg-gray-100">
    <h2 className="text-3xl font-semibold mb-4">About</h2>
    <p>This platform is created to help you navigate your initial days at IITG with the support of your seniors.</p>
  </section>

  <section ref={el => sections.current.seniors = el} id="seniors" className="p-8">
    <h2 className="text-2xl font-bold mb-4">Featured Seniors</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allSeniorsData.slice(0, 3).map((senior, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h3 className="font-bold">{senior.name}</h3>
          <p>{senior.branch} | {senior.school}</p>
          <p>{getYearOfStudy(senior.admissionYear)}</p>
        </div>
      ))}
    </div>
    <button onClick={() => setPage("allSeniors")} className="mt-4 text-blue-600 underline">More About Seniors</button>
  </section>

  <section ref={el => sections.current.gallery = el} id="gallery" className="p-8 bg-gray-100">
    <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
    <p>Campus photos and memorable moments coming soon...</p>
  </section>

  <section ref={el => sections.current.contact = el} id="contact" className="p-8">
    <h2 className="text-2xl font-semibold mb-4">Contact</h2>
    <p>If you need help, contact any of the listed seniors or reach out via our official WhatsApp group.</p>
  </section>

  <footer className="text-center p-4 bg-gray-200 mt-8">
    &copy; {new Date().getFullYear()} DAAN IIT Guwahati
  </footer>
</div>

); };

export default App;

