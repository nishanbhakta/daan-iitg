import React from "react";
import { FaCompass, FaCarSide, FaArrowRight } from "react-icons/fa";

const NavigationGuide = () => (
  <section className="bg-gradient-to-br from-[#102b42] via-[#16435a] to-[#0d2438] px-5 py-16 sm:px-8">
    <div className="mx-auto max-w-4xl">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/70">
        IIT Guwahati · Arrival Guide
      </p>
      <h2 className="mb-10 text-center text-2xl font-semibold text-slate-100 sm:text-3xl">
        Getting to campus
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Travel & navigation info */}
        <div className="group flex flex-col rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-400/10 via-slate-900/50 to-slate-900/60 p-6 transition-colors hover:border-amber-300/50">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400/15 ring-1 ring-amber-300/30">
            <FaCompass className="text-base text-amber-300" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-300/90">
            Before you travel
          </p>

          <a
            href="https://www.iitg.ac.in/phy/travelinfo.php"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-amber-200 transition-colors hover:text-amber-100 hover:underline underline-offset-2"
          >
            Official IITG Travel &amp; Navigation Guide
            <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
          </a>

          <p className="text-sm leading-relaxed text-slate-300/80">
            Institute buses run regularly from Panbazar, near Guwahati Railway
            Station, straight to campus.
          </p>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.swciitg.onestop2&hl=en_IN"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the OneStop IITG app on Google Play"
          className="group flex flex-col rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/10 via-slate-900/50 to-slate-900/60 p-6 transition-all hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-400/15 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#16435a]"
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 ring-1 ring-cyan-300/30">
            <FaCarSide className="text-base text-cyan-300" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-300/90">
            Sharing a cab?
          </p>

          <p className="text-sm leading-relaxed text-slate-300/80">
            Use the{" "}
            <span className="font-medium text-cyan-200">
              cab-sharing feature on OneStop
            </span>{" "}
            to find others headed your way.
          </p>
        </a>
      </div>
    </div>
  </section>
);

export default NavigationGuide;
