import React, { useMemo, useState } from "react";
import Icon from "./Icon";
import ICONS from "./../constants/icons";
import allSeniorsData from "../data/seniorsData";
import { getYearOfStudy } from "../utils/helpers";
import InitialsAvatar from "./InitialsAvatar";

const AllSeniorsPage = ({ onBack }) => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [schoolFilter, setSchoolFilter] = useState("All");

  const admissionYears = [2025, 2024, 2023, 2022, 2021];

  const branches = useMemo(() => {
    return ["All", ...new Set(allSeniorsData.map((s) => s.branch).sort())];
  }, []);

  const schools = useMemo(() => {
    return ["All", ...new Set(allSeniorsData.map((s) => s.school).sort())];
  }, []);

  const filteredData = useMemo(() => {
    return allSeniorsData.filter((student) => {
      const searchMatch = student.name.toLowerCase().includes(search.toLowerCase());
      const branchMatch = branchFilter === "All" || student.branch === branchFilter;
      const schoolMatch = schoolFilter === "All" || student.school === schoolFilter;
      return searchMatch && branchMatch && schoolMatch;
    });
  }, [search, branchFilter, schoolFilter]);

  const seniorsByBatch = admissionYears
    .map((year) => ({
      year,
      students: filteredData.filter((student) => student.admissionYear === year),
    }))
    .filter((group) => group.students.length > 0);

  return (
    <main className="min-h-screen bg-gray-900 px-4 pt-24 pb-20">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-cyan-300 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
        >
          <Icon path={ICONS.arrowLeft} className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Main Page
        </button>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 font-black">
            S
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Seniors Directory</h1>
            <p className="text-sm text-gray-400">
              Feel free to contact any senior. We are always happy to help.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-cyan-400/15 bg-white/5 p-4 backdrop-blur-md md:grid-cols-3 md:p-6">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-cyan-400/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-colors duration-300 focus:border-cyan-400/50"
            />
          </div>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="rounded-xl border border-cyan-400/15 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-400/50"
          >
            {branches.map((branch) => (
              <option key={branch}>{branch}</option>
            ))}
          </select>

          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="rounded-xl border border-cyan-400/15 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition-colors duration-300 focus:border-cyan-400/50"
          >
            {schools.map((school) => (
              <option key={school}>{school}</option>
            ))}
          </select>
        </div>

        <p className="mt-8 text-sm font-medium text-cyan-300">
          {filteredData.length} Seniors Found
        </p>

        {seniorsByBatch.map(({ year, students }) => (
          <div key={year} className="mt-8 mb-16">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">
              Batch of {year} ({getYearOfStudy(year)})
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="group flex flex-col rounded-2xl border border-cyan-400/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_45px_-12px_rgba(34,211,238,0.55)]"
                >
                  {/* Avatar + identity */}
                  <div className="flex items-center gap-4">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <InitialsAvatar name={student.name} size="lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-bold text-white">{student.name}</h3>
                      <p className="truncate text-sm text-gray-400">{student.branch}</p>
                      <span className="mt-1 inline-block rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                        {getYearOfStudy(student.admissionYear)}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-gray-500">🏫 {student.school}</p>

                  {/* Contact actions */}
                  {student.phone !== "N/A" ? (
                    <>
                      <div className="mt-5 flex gap-3">
                        <a
                          href={`tel:${student.phone}`}
                          className="flex-1 rounded-xl border border-cyan-400/20 bg-white/5 py-2.5 text-center text-sm font-semibold text-gray-200 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                        >
                          📞 Call
                        </a>
                        <a
                          href={`https://wa.me/91${student.phone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-2.5 text-center text-sm font-bold text-gray-900 shadow-lg shadow-cyan-500/25 transition-transform duration-300 hover:scale-[1.03]"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(student.phone);
                          alert("Phone number copied!");
                        }}
                        className="mt-3 w-full rounded-xl border border-cyan-400/20 bg-white/5 py-2.5 text-sm font-semibold text-cyan-300 transition-colors duration-300 hover:bg-cyan-400/10"
                      >
                        📋 Copy Number
                      </button>
                    </>
                  ) : (
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-sm text-gray-400">
                      Contact Not Available
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="mt-16 rounded-2xl border border-cyan-400/15 bg-white/5 p-10 text-center backdrop-blur-md">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-white">No Seniors Found</h2>
            <p className="mt-3 text-gray-400">Try changing your search or filters.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllSeniorsPage;