import React from "react";

export default function FreshersAlert({ onClose }) {
  const remindTomorrow = () => {
    const nextShowTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem(
      "nextFreshersAlert",
      nextShowTime.toString()
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-hidden">

      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-900 shadow-2xl">

        {/* Header */}
        <div className="bg-red-600 px-6 py-5 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">
            🚨 Important Notice for Freshers
          </h2>

          <p className="text-red-100 mt-1">
            Please read before you continue
          </p>
        </div>

        {/* Body */}
        <div className="p-6">

          <h3 className="text-3xl font-bold text-white mb-5">
            Official IIT Guwahati Freshers' Portal
          </h3>

          <p className="text-gray-300 leading-8 mb-6">
            Please keep checking the{" "}
            <span className="text-cyan-400 font-semibold">
              Official IIT Guwahati Freshers' Portal
            </span>{" "}
            regularly until you receive your{" "}
            <span className="font-semibold text-white">
              IITG Email ID
            </span>.
            IIT Guwahati publishes all important admission-related
            updates on this website.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

            {[
              "📅 Reporting Instructions",
              "🏠 Hostel Allotment",
              "📄 Document Verification",
              "🎓 Orientation Schedule",
              "💰 Fee Payment",
              "📢 Important Notices",
              "📧 IITG Email Updates",
              "🚌 Arrival Information",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-cyan-900 bg-slate-800 px-4 py-3 text-gray-200"
              >
                {item}
              </div>
            ))}

          </div>

          <div className="rounded-xl border border-cyan-900 bg-slate-800 p-5 mb-8">
            <p className="text-gray-300 leading-7">
              <span className="font-bold text-cyan-400">
                Important:
              </span>{" "}
              Continue checking the portal regularly until all
              admission formalities are completed and your IITG Email
              ID credentials have been issued.
            </p>
          </div>

          {/* Buttons */}

          <div className="flex flex-col md:flex-row gap-3">

            <button
              onClick={() =>
                window.open(
                  "https://www.iitg.ac.in/acad/admission/fresher/",
                  "_blank"
                )
              }
              className="flex-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 py-3 font-semibold text-white transition"
            >
             Visit Official Portal
            </button>

            <button
              onClick={remindTomorrow}
              className="flex-1 rounded-xl bg-gray-700 hover:bg-gray-800 py-3 font-semibold text-white transition"
            >
             Remind Me Tomorrow
            </button>

            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 py-3 font-semibold text-white transition"
            >
              Continue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}