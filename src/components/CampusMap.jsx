import React from 'react';

const CampusMap = () => {
  return (
    <section id="map" className="py-24 bg-gray-800 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Interactive Campus Map</h2>
        <div className="rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
          <iframe
            title="IIT Guwahati Campus Map"
            src="https://www.google.com/maps?q=IIT+Guwahati&output=embed"
            className="w-full h-96 border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default CampusMap;
