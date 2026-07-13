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
    <section id="about" className="py-24 bg-gray-800 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Your Journey Begins</h2>
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resources.map(resource => (
              <div key={resource.name} className="flex flex-col items-center text-center bg-gray-800 rounded-xl p-5 border border-gray-700">
                <Icon path={resource.icon} className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-gray-200 font-medium">{resource.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
