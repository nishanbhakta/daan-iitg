import React from "react";
import { getYearOfStudy } from "../utils/helpers";
import InitialsAvatar from "./InitialsAvatar";

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
    <section id="contact" className="relative bg-gray-900 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            We've Got You
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Contact Us
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-gray-400">
            Need help regarding admission, hostel allotment, registration,
            academics, campus life, or anything else? Feel free to contact our
            Collage Representatives. They will be happy to assist you.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="group flex flex-col items-center rounded-2xl border border-cyan-400/15 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <InitialsAvatar name={contact.name} size="lg" />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mt-5">
                {contact.name}
              </h3>
              <p className="text-center text-cyan-300 mt-1">{contact.role}</p>
              <p className="text-center text-gray-400 text-sm mt-1">
                {contact.year}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                <a
                  href={`tel:${contact.phone}`}
                  className="rounded-xl border border-cyan-400/20 bg-white/5 py-3 text-center text-sm font-semibold text-gray-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  📞 Call
                </a>
                <a
                  href={`https://wa.me/91${contact.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-center text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-transform duration-300 hover:scale-[1.03]"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-white/5 p-6 text-center backdrop-blur-md">
          <h3 className="text-xl font-semibold text-cyan-300 mb-3">
            We're Here to Help!
          </h3>
          <p className="text-gray-300 leading-7">
            Don't hesitate to reach out if you have any questions regarding IIT
            Guwahati, admission formalities, hostel life, academics, campus
            facilities, or student life. We are always happy to guide and
            support incoming freshers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
