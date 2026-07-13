import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">

      {/* Compact Feedback Section */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">

        <h2 className="text-xl md:text-2xl font-bold text-white">
          Help Us to Improve DAAN IITG
        </h2>

        <p className="mt-2 text-sm md:text-base text-gray-400 leading-6 max-w-2xl mx-auto">
          Found a bug, incorrect information, broken link, or have an idea to
          improve this website? We'd love to hear your feedback and make this
          platform even better for future IIT Guwahati freshers.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row justify-center gap-3">

          <a
            href="mailto:monubaindara@gmail.com?subject=DAAN IITG Website Feedback"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
          >
            🐞 Report a Bug
          </a>

          <a
            href="https://wa.me/9414804982"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
          >
             WhatsApp
          </a>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">

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