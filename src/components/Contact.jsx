import React from 'react';
import Icon from './Icon';
import ICONS from '../constants/icons';
import { getYearOfStudy } from '../utils/helpers';

const Contact = () => {
  const contacts = [
    { name: "Adarsh Kumar", phone: "+91 76675 91456", year: getYearOfStudy(2023) },
    { name: "Nishan Bhakta", phone: "+91 75858 42982", year: getYearOfStudy(2024) },
    { name: "Ayush Kumar Gupta", phone: "+91 6266 110 461", year: getYearOfStudy(2024) },
    { name: "Kanak K Maiti", phone: "+91 6297 558 783", year: getYearOfStudy(2024) },
  ];

  return (
    <section id="contact" className="py-24 bg-gray-800 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Have Questions?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Your seniors at DAAN are here to help. Whether you have questions about academics,
          hostels, or just want to chat, feel free to reach out. We're excited to meet you!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-left">
              <h3 className="text-white font-semibold">{contact.name}</h3>
              <p className="text-sm text-cyan-400 mb-3">{contact.year}</p>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                <Icon path={ICONS.phone} className="w-4 h-4" />
                {contact.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
