import React from "react";
import { getYearOfStudy } from "../utils/helpers";

const Contact = () => {
  const contacts = [
    {
      name: "Laxmidhar Mohapatra",
      role: "Collage Representative (CR)",
      phone: "9861783046",
      year: getYearOfStudy(2025),
    },
    {
      name: "Pratibha",
      role: "Collage Representative (CR)",
      phone: "9354029030",
      year: getYearOfStudy(2025),
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-slate-900 to-gray-900 px-6"
    >
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white mb-4">
           Contact Us
        </h2>

        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-14">
          Need help regarding admission, hostel allotment, registration,
          academics, campus life, or anything else? Feel free to contact our
          Collage Representatives. They will be happy to assist you.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                  {contact.name
                    .split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-white text-center mt-5">
                {contact.name}
              </h3>

              {/* Role */}
              <p className="text-center text-cyan-400 mt-1">
                {contact.role}
              </p>

              {/* Year */}
              <p className="text-center text-gray-400 text-sm mt-1">
                {contact.year}
              </p>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-8">

                <a
                  href={`tel:${contact.phone}`}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-center text-white font-semibold transition"
                >
                  📞 Call
                </a>

                <a
                  href={`https://wa.me/91${contact.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 rounded-xl py-3 text-center text-white font-semibold transition"
                >
                  💬 WhatsApp
                </a>

              </div>
            </div>
          ))}

        </div>

        {/* Bottom Note */}
        <div className="mt-16 bg-cyan-950 border border-cyan-700 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">
            We're Here to Help!
          </h3>

          <p className="text-gray-300 leading-7">
            Don't hesitate to reach out if you have any questions regarding
            IIT Guwahati, admission formalities, hostel life, academics,
            campus facilities, or student life. We are always happy to guide
            and support incoming freshers.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;