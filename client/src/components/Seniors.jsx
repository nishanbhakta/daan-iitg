import React from 'react';
import { getYearOfStudy } from '../utils/helpers';
import allSeniorsData from '../data/seniorsData';
import InitialsAvatar from './InitialsAvatar';

const Seniors = ({ onShowAllSeniors }) => {
  const featuredSeniorNames = [
     "Brijesh Singh Bharti", "Adarsh Kumar","Ayush Kumar Gupta","Vaibhav C D",
      "Nishan Bhakta", "Kanak Kamini Maiti", 
     "Ashutosh Kumar","Laxmidhar Mohapatra","Pratibha"
  ];

  const seniors = featuredSeniorNames
    .map(name => allSeniorsData.find(s => s.name === name))
    .filter(Boolean);

  return (
    <section id="seniors" className="relative bg-gray-900 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Your Support System
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Meet Your Seniors
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seniors.map((senior, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 rounded-2xl border border-cyan-400/15 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <InitialsAvatar name={senior.name} size="lg" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-white">{senior.name}</h3>
                <p className="truncate text-sm text-gray-400">{senior.branch}</p>
                <span className="mt-1 inline-block rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                  {getYearOfStudy(senior.admissionYear)}
                </span>
                <p className="truncate text-xs text-gray-500 mt-1">{senior.school}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={onShowAllSeniors}
            className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-7 py-3 text-sm font-bold text-cyan-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]"
          >
            More About Seniors
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Seniors;
