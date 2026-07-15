import React from 'react';
import Icon from './Icon';
import ICONS from '../constants/icons';

const About = () => {
  const resources = [
    { name: "Academics", icon: ICONS.academics },
    { name: "Hostel Life", icon: ICONS.hostel },
    { name: "Fests & Clubs", icon: ICONS.fests },
  ];

  return (
    <section id="about" className="relative bg-gray-800 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            About the Initiative
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Your Journey Begins
          </h2>
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-400/15 bg-white/5 p-8 backdrop-blur-md md:p-12 shadow-2xl shadow-cyan-500/5">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">IIT Guwahati</h3>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Congratulations on making it to IIT Guwahati! A new and exciting chapter of your life
              is about to begin. The Dakshana Alumni Association Network (DAAN) is here to welcome
              you and support you every step of the way.
            </p>
            <p>
              We are a community of your seniors who have walked the same path. We're here to help
              you navigate academic life, campus culture, and everything in between. Never hesitate
              to reach out!
            </p>
          </div>
          <h4 className="text-lg font-semibold text-white mt-8 mb-4">What to Expect</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {resources.map(resource => (
              <div
                key={resource.name}
                className="group flex flex-col items-center text-center rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_10px_40px_-12px_rgba(34,211,238,0.5)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                  <Icon path={resource.icon} className="w-6 h-6" />
                </span>
                <span className="mt-4 text-gray-200 font-medium">{resource.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
