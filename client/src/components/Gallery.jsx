import React from "react";
import { FaImage } from "react-icons/fa";

// Add your image URLs to `src` when they are ready.
const galleryImages = [
  { title: "Campus views", src: "" },
  {
    title: "Freshers' Party",
    src: "https://drive.google.com/file/d/15TT6N9LnScnaQ9rx4dcxmGfG4eyiDf5S/view?usp=drivesdk",
  },
  { title: "Hostel life", src: "" },
  { title: "Events & memories", src: "" },
  { title: "IITG evenings", src: "" },
  { title: "Life at IITG", src: "" },
];

const Gallery = () => (
  <section
    id="gallery"
    className="relative overflow-hidden bg-gray-800 px-4 py-20 sm:py-28"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.1),transparent_26%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.12),transparent_28%)]" />

    <div className="relative mx-auto max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Campus memories
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Gallery
        </h2>
        <p className="mt-4 text-gray-400">Moments from life at IIT Guwahati.</p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {galleryImages.map((image, index) => (
          <div
            key={image.title}
            className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-cyan-400/15 bg-slate-900/80 ${
              index === 0 ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto" : ""
            }`}
          >
            {image.src ? (
              <img
                src={image.src}
                alt={image.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cyan-400/15 via-slate-900 to-blue-500/10 p-4 text-center">
                <FaImage
                  className="text-xl text-cyan-300/75"
                  aria-hidden="true"
                />
                <span className="mt-3 text-xs font-medium text-slate-300 sm:text-sm">
                  {image.title}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-wider text-cyan-300/60">
                  Add image link
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        Add image URLs in{" "}
        <code className="text-cyan-300/70">galleryImages</code> to publish your
        photos.
      </p>
    </div>
  </section>
);

export default Gallery;
