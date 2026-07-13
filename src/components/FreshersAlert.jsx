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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fade-in">

        {/* Header */}
        <div className="bg-red-600 px-6 py-5">
          <h2 className="text-2xl font-bold text-white">
            🚨 Important Notice for Freshers
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">

          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Official IIT Guwahati Freshers' Portal
          </h3>

          <p className="text-gray-700 leading-7 mb-5">
            Please keep checking the{" "}
            <strong>Official IIT Guwahati Freshers' Portal</strong>{" "}
            regularly until you receive your official{" "}
            <strong>IITG Email ID</strong>. IIT Guwahati publishes all
            important admission-related updates on this website.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 text-gray-800">

            <div>📅 Reporting Instructions</div>
            <div>🏠 Hostel Allotment</div>

            <div>📄 Document Verification</div>
            <div>🎓 Orientation Schedule</div>

            <div>💰 Fee Payment</div>
            <div>📢 Important Notices</div>

            <div>📧 IITG Email Updates</div>
           

          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">

            <p className="text-gray-800 leading-7">
              <strong>Important:</strong> Continue checking the portal
              regularly until all admission formalities are completed and
              your IITG Email ID credentials have been issued.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                window.open(
                  "https://www.iitg.ac.in/acad/admission/fresher/",
                  "_blank"
                )
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
               Visit Official Portal
            </button>

            <button
              onClick={remindTomorrow}
              className="flex-1 bg-gray-800 hover:bg-black text-white px-5 py-3 rounded-lg transition"
            >
               Remind Me Tomorrow
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg transition"
            >
              Continue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}