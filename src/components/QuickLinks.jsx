import React from 'react';
import Icon from './Icon';
import ICONS from '../constants/icons';

const QuickLinks = () => {
  const links = [
    {
      title: "IITG ERP System",
      href: "https://academic.iitg.ac.in/sso/",
      icon: ICONS.erp,
      description: "Access your academic records, course registrations, and grades."
    },
    {
      title: "IITG Automation",
      href: "https://online.iitg.ac.in/sso/",
      icon: ICONS.automation,
      description: "Manage various online services and administrative tasks."
    },
    {
      title: "One Stop App",
      href: "https://play.google.com/store/apps/details?id=com.swciitg.onestop2&hl=en_IN",
      icon: ICONS.oneStopApp,
      description: "The official all-in-one app for IITG students. Available on Google Play."
    },
    {
      title: "IITG Admission",
      href: "https://www.iitg.ac.in/acad/admission/fresher/",
      icon: ICONS.admission,
      description: "Find all official information related to admissions."
    }
  ];

  return (
    <section id="links" className="relative bg-gray-800 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Bookmark These
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Quick Links
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                <Icon path={link.icon} className="w-6 h-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{link.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
