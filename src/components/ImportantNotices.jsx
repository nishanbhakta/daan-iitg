import React from 'react';
import Icon from './Icon';
import ICONS from '../constants/icons';

const ImportantNotices = ({ onShowItems }) => {
  const notices = [
    {
      icon: ICONS.calendar,
      title: "Joining Date",
      content:
        "The official joining date for all first-year students is 20th July. Click here to view the official IIT Guwahati Academic Calendar for complete academic schedules and important dates.",
      rotation: "-rotate-2",
      link: "calendar",
    },
    {
      icon: ICONS.suitcase,
      title: "Items to Bring",
      content:
        "Essential documents, clothing, electronics, toiletries, and hostel essentials every IIT Guwahati fresher should carry.",
      rotation: "rotate-1",
      link: "items",
    },
    {
      icon: ICONS.laptop,
      title: "Laptop Guide",
      content:
        "A detailed laptop buying guide for different branches and budgets will be available soon.",
      rotation: "rotate-2",
      status: "coming-soon",
    },
    {
      icon: ICONS.scholarship,
      title: "Scholarship Guide",
      content:
        "A comprehensive guide to scholarships, financial aid, eligibility, and application procedures will be available soon.",
      rotation: "-rotate-1",
      status: "coming-soon",
    },
  ];

  const handleCardClick = (link) => {
    switch (link) {
      case "items":
        onShowItems();
        break;

      case "calendar":
        window.open(
          "https://iitg.ac.in/acad/academic_calendar.php",
          "_blank"
        );
        break;

      default:
        break;
    }
  };

  return (
    <section id="notices" className="py-24 bg-gray-900 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-white text-center mb-16">
          Bulletin Board
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {notices.map((notice, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(notice.link)}
              className={`relative flex flex-col justify-between bg-yellow-100 text-gray-800 rounded-lg p-6 shadow-xl transform ${notice.rotation} hover:rotate-0 transition-all duration-300 ${
                notice.link ? "cursor-pointer hover:scale-105" : ""
              }`}
            >
              <Icon
                path={ICONS.pushpin}
                className="w-6 h-6 text-red-500 absolute -top-3 left-1/2 -translate-x-1/2"
              />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    path={notice.icon}
                    className="w-5 h-5 text-gray-700"
                  />
                  <h3 className="font-bold text-lg">
                    {notice.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {notice.content}
                </p>
              </div>

              <div className="mt-5">

                {notice.link === "calendar" && (
                  <p className="text-sm font-semibold text-blue-700">
                    📅 Open Academic Calendar →
                  </p>
                )}

                {notice.link === "items" && (
                  <p className="text-sm font-semibold text-blue-700">
                    🎒 View Checklist →
                  </p>
                )}

                {notice.status === "coming-soon" && (
                  <span className="inline-block bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    🚧 Coming Soon
                  </span>
                )}

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ImportantNotices;