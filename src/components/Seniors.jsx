import React from 'react';
import { getYearOfStudy } from '../utils/helpers';
import allSeniorsData from '../data/seniorsData';

const Seniors = ({ onShowAllSeniors }) => {
  const featuredSeniorNames = [
    "Harshit Chachariya", "Siba Sankar", "Adarsh Kumar", "Brijesh Singh Bharti",
    "Ishita Brice", "Nishan Bhakta", "Kanak Kamini Maiti", "Vaibhav C D",
    "Ayush Kumar Gupta", "Ashutosh Kumar"
  ];

  const seniors = featuredSeniorNames
    .map(name => allSeniorsData.find(s => s.name === name))
    .filter(Boolean);

  return (
    <section id="seniors" className="py-24 bg-gray-900 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Meet Your Seniors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {seniors.map((senior, index) => (
            <div key={index} className="text-center">
              <img
                src={`https://placehold.co/128x128/1f2937/22d3ee?text=${senior.name.split(' ').map(n => n[0]).join('')}`}
                alt={senior.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400 object-cover"
              />
              <h3 className="text-white font-semibold">{senior.name}</h3>
              <p className="text-sm text-cyan-400">{senior.branch}</p>
              <p className="text-xs text-gray-400 mt-1">{getYearOfStudy(senior.admissionYear)}</p>
              <p className="text-xs text-gray-500">{senior.school}</p>
              <button
                type="button"
                aria-label={`View ${senior.name}'s LinkedIn profile`}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 inline-block mt-2"
              >

              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={onShowAllSeniors}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
          >
            More About Seniors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Seniors;
