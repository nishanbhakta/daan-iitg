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
      accent: "from-cyan-400/20 to-blue-500/20 text-cyan-300",
      link: "calendar",
      cta: "View calendar",
    },
    {
      icon: ICONS.suitcase,
      title: "Items to Bring",
      content:
        "Essential documents, clothing, electronics, toiletries, and hostel essentials every IIT Guwahati fresher should carry.",
      rotation: "rotate-1",
      accent: "from-emerald-400/20 to-teal-500/20 text-emerald-300",
      link: "items",
      cta: "Open checklist",
    },
    {
      icon: ICONS.laptop,
      title: "Laptop Guide",
      content:
        "A detailed laptop buying guide for different branches and budgets will be available soon.",
      rotation: "rotate-2",
      accent: "from-blue-400/20 to-indigo-500/20 text-blue-300",
      status: "coming-soon",
    },
    {
      icon: ICONS.scholarship,
      title: "Scholarship Guide",
      content:
        "A comprehensive guide to scholarships, financial aid, eligibility, and application procedures will be available soon.",
      rotation: "-rotate-1",
      accent: "from-amber-400/20 to-orange-500/20 text-amber-300",
      status: "coming-soon",
    },
  ];

  const handleCardClick = (link) => {
    switch (link) {
      case "items":
        onShowItems();
        break;
      case "calendar":
        window.open("https://iitg.ac.in/acad/academic_calendar.php", "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <section id="notices" className="relative bg-gray-900 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Pinned for You
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Bulletin Board
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {notices.map((notice, index) => {
            const soon = notice.status === "coming-soon";
            const clickable = Boolean(notice.link);

            const content = (
              <>
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${notice.accent}`}>
                  <Icon path={notice.icon} className="w-6 h-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{notice.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{notice.content}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  {clickable && !soon && (
                    <>
                      {notice.cta}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </>
                  )}
                  {soon && <span className="text-gray-500">Coming soon</span>}
                </span>
              </>
            );

            const baseCls = `relative flex flex-col rounded-2xl border p-6 text-left transition-all duration-300 ${notice.rotation}`;

            if (soon) {
              return (
                <div
                  key={index}
                  aria-disabled="true"
                  className={`${baseCls} cursor-not-allowed border-white/5 bg-white/[0.03] opacity-60`}
                >
                  {content}
                </div>
              );
            }

            return (
              <button
                key={index}
                onClick={() => handleCardClick(notice.link)}
                className={`${baseCls} border-cyan-400/15 bg-white/5 backdrop-blur-md hover:rotate-0 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]`}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImportantNotices;
