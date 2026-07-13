import React from "react";

export default function FreshersAlert({ onClose }) {
  const remindTomorrow = () => {
    const nextShowTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(
      "nextFreshersAlert",
      nextShowTime.toString()
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="bg-red-600 px-6 py-5 sticky top-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            🚨 Important Notice for Freshers
          </h2>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">

          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Official IIT Guwahati Freshers' Portal
          </h3>

          <p className="text-gray-700 leading-7 break-words mb-6">
            Please keep checking the{" "}
            <strong>Official IIT Guwahati Freshers' Portal</strong>{" "}
            regularly until you receive your official{" "}
            <strong>IITG Email ID</strong>. IIT Guwahati publishes all
            important admission-related updates on this website.
          </p>

          {/* Features */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-gray-800">

            <div>📅 Reporting Instructions</div>
            <div>🏠 Hostel Allotment</div>

            <div>📄 Document Verification</div>
            <div>🎓 Orientation Schedule</div>

            <div>💰 Fee Payment</div>
            <div>📢 Important Notices</div>

            <div>📧 IITG Email Updates</div>
            <div>🚌 Arrival Information</div>

          </div>

          {/* Note */}

          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">

            <p className="text-gray-800 leading-7">
              <strong>Important:</strong> Continue checking the portal
              regularly until all admission formalities are completed and
              your IITG Email ID credentials have been issued.
            </p>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={() =>
                window.open(
                  "https://www.iitg.ac.in/acad/admission/fresher/",
                  "_blank"
                )
              }
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              🌐 Visit Official Portal
            </button>

            <button
              onClick={remindTomorrow}
              className="w-full sm:flex-1 bg-gray-800 hover:bg-black text-white py-3 rounded-lg transition"
            >
              ⏰ Remind Me Tomorrow
            </button>

            <button
              onClick={onClose}
              className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              ✅ Continue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}