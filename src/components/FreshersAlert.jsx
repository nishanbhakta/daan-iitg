import React from "react";

export default function FreshersAlert({ onClose }) {
  const remindTomorrow = () => {
    const nextShowTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("nextFreshersAlert", nextShowTime.toString());
    onClose();
  };

  const features = [
    "📅 Reporting Instructions",
    "🏠 Hostel Allotment",
    "📄 Document Verification",
    "🎓 Orientation Schedule",
    "💰 Fee Payment",
    "📢 Important Notices",
    "📧 IITG Email Updates",
    "🚌 Arrival Information",
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
        onClick={remindTomorrow}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-cyan-400/20 bg-gray-900 shadow-2xl shadow-cyan-500/10">

        {/* Header */}
        <div className="flex items-center gap-3 bg-red-600 px-6 py-5 sticky top-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
            🚨
          </span>
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              Important Notice for Freshers
            </h2>
            <p className="text-xs text-red-100">Please read before you continue</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Official IIT Guwahati Freshers' Portal
          </h3>

          <p className="text-sm leading-relaxed text-gray-300 mb-6">
            Please keep checking the{" "}
            <span className="font-semibold text-cyan-300">Official IIT Guwahati Freshers' Portal</span>{" "}
            regularly until you receive your official{" "}
            <span className="font-semibold text-cyan-300">IITG Email ID</span>. IIT Guwahati publishes all
            important admission-related updates on this website.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-6">
            {features.map((text) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-white/5 p-3 backdrop-blur-md text-sm text-gray-300"
              >
                {text}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 mb-6">
            <p className="text-gray-300 leading-7 text-sm">
              <span className="font-semibold text-cyan-300">Important:</span> Continue checking the portal
              regularly until all admission formalities are completed and
              your IITG Email ID credentials have been issued.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                window.open("https://www.iitg.ac.in/acad/admission/fresher/", "_blank")
              }
              className="w-full sm:flex-1 rounded-xl border border-cyan-400/20 bg-white/5 py-3 text-sm font-semibold text-gray-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              🌐 Visit Official Portal
            </button>

            <button
              onClick={remindTomorrow}
              className="w-full sm:flex-1 rounded-xl border border-cyan-400/20 bg-white/5 py-3 text-sm font-semibold text-gray-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              ⏰ Remind Me Tomorrow
            </button>

            <button
              onClick={onClose}
              className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-transform duration-300 hover:scale-[1.02]"
            >
              ✅ Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
