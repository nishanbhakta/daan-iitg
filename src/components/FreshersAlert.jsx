import React from "react";

export default function FreshersAlert({ onClose }) {

  const dontShowAgain = () => {
    localStorage.setItem("hideFreshersAlert", "true");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">

        <div className="bg-red-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            🚨 Important Notice for Freshers
          </h2>
        </div>

        <div className="p-6">

          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Official IIT Guwahati Freshers' Portal
          </h3>

          <p className="text-gray-700 leading-7 mb-5">
            Please keep checking the <strong>Official IIT Guwahati Freshers' Portal</strong>
            regularly until you receive your official <strong>IITG Email ID</strong>.
            The institute publishes all important admission updates on this website.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">

            <div>📅 Reporting Instructions</div>
            <div>🏠 Hostel Allotment</div>
            <div>📄 Document Verification</div>
            <div>🎓 Orientation Schedule</div>
            <div>💰 Fee Payment</div>
            <div>📢 Important Notices</div>
            <div>📧 IITG Email Updates</div>
            <div>🚌 Arrival Information</div>

          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">

            <p className="text-gray-800">
              <strong>Note:</strong> This portal is updated regularly by IIT
              Guwahati. Please visit it frequently until your admission process
              is fully completed and your IITG Email ID credentials are issued.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                window.open(
                  "https://www.iitg.ac.in/acad/admission/fresher/",
                  "_blank"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              🌐 Visit Official Portal
            </button>

            <button
              onClick={dontShowAgain}
              className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg"
            >
              Don't Show Again
            </button>

            <button
              onClick={onClose}
              className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}