import React, { useEffect, useState } from 'react';
import { slugify } from '../utils/helpers';

const Header = ({ activeSection, onNavClick }) => {
  const navLinks = ["Home", "About", "Notices", "Links", "Seniors", "Map", "Gallery", "Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id) => {
    setOpen(false);
    onNavClick(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-cyan-400/20 bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/5'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleClick('home'); }}
          className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-105"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-900 shadow-lg shadow-cyan-500/30 font-black">
            D
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            DAAN <span className="text-cyan-400">IITG</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = slugify(link);
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); handleClick(id); }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive ? 'text-cyan-300' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]" />
                )}
                <span className="relative">{link}</span>
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-white/5 text-cyan-300 transition-colors duration-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-cyan-400/10 bg-gray-900/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => {
            const id = slugify(link);
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); handleClick(id); }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'bg-cyan-400/10 text-cyan-300' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
