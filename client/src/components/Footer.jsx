import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 px-4 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        {/* Feedback Section */}
        <div className="rounded-3xl border border-cyan-400/15 bg-white/5 p-8 text-center backdrop-blur-md sm:p-10">
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Help Us to Improve DAAN IITG
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm md:text-base leading-6 text-gray-400">
            Found a bug, incorrect information, broken link, or have an idea to
            improve this website? We'd love to hear your feedback.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/9414804982"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-transform duration-300 hover:scale-[1.03]"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-900 font-black text-xs">
              D
            </span>
            <span className="text-sm font-bold">
              DAAN <span className="text-cyan-400">IITG</span>
            </span>
          </div>

          <p className="text-gray-500 text-xs md:text-sm text-center">
            © {new Date().getFullYear()} DAAN IIT Guwahati. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-xs md:text-sm text-center">
            Built with ❤️ by DAAN Seniors for IIT Guwahati Freshers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
