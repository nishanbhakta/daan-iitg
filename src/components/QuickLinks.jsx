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
      href: "https://www.iitg.ac.in/acad/admission/",
      icon: ICONS.admission,
      description: "Find all official information related to admissions."
    }
  ];

  return (
    <section id="links" className="py-24 bg-gray-800 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                <Icon path={link.icon} className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{link.title}</h3>
              <p className="text-sm text-gray-400">{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
