import React from 'react';

const CampusMap = () => {
  return (
    <section id="map" className="relative bg-gray-800 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Find Your Way
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Interactive Campus Map
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 p-2 shadow-2xl shadow-cyan-500/10 backdrop-blur-md">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              title="IIT Guwahati Campus Map"
              src="https://www.google.com/maps?q=IIT+Guwahati&output=embed"
              className="w-full h-96 border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusMap;
