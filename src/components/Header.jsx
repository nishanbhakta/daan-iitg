import React from 'react';
import { slugify } from '../utils/helpers';

const Header = ({ activeSection, onNavClick }) => {
  const navLinks = ["Home", "About", "Notices", "Links", "Seniors", "Map", "Gallery", "Contact"];
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavClick('home'); }}
          className="text-2xl font-bold text-white"
        >
          DAAN IITG
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
            const id = slugify(link);
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); onNavClick(id); }}
                  className={`text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative font-medium ${activeSection === id ? 'text-cyan-400' : ''}`}
                >
                  {link}
                  {activeSection === id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
