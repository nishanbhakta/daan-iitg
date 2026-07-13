import React, { useMemo, useState } from "react";
import Icon from "./Icon";
import ICONS from "./../constants/icons";
import allSeniorsData from "../data/seniorsData";
import { getYearOfStudy } from "../utils/helpers";

const AllSeniorsPage = ({ onBack }) => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("All");
  const [schoolFilter, setSchoolFilter] = useState("All");

  const admissionYears = [2025, 2024, 2023, 2022, 2021];

  const branches = useMemo(() => {
    return [
      "All",
      ...new Set(allSeniorsData.map((s) => s.branch).sort()),
    ];
  }, []);

  const schools = useMemo(() => {
    return [
      "All",
      ...new Set(allSeniorsData.map((s) => s.school).sort()),
    ];
  }, []);

  const filteredData = useMemo(() => {
    return allSeniorsData.filter((student) => {
      const searchMatch =
        student.name.toLowerCase().includes(search.toLowerCase());

      const branchMatch =
        branchFilter === "All" ||
        student.branch === branchFilter;

      const schoolMatch =
        schoolFilter === "All" ||
        student.school === schoolFilter;

      return searchMatch && branchMatch && schoolMatch;
    });
  }, [search, branchFilter, schoolFilter]);

  const seniorsByBatch = admissionYears
    .map((year) => ({
      year,
      students: filteredData.filter(
        (student) => student.admissionYear === year
      ),
    }))
    .filter((group) => group.students.length > 0);

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
        >
          <Icon path={ICONS.arrowLeft} className="w-5 h-5" />
          Back to Main Page
        </button>

        <h1 className="text-4xl font-bold text-white mb-3">
          Seniors Directory
        </h1>

        <p className="text-gray-400 mb-10">
          Feel free to contact any senior. We are always happy to help.
        </p>

        <div className="bg-gray-800 rounded-xl p-6 mb-10 grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="🔍 Search by Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
          >
            {branches.map((branch) => (
              <option key={branch}>{branch}</option>
            ))}
          </select>

          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
          >
            {schools.map((school) => (
              <option key={school}>{school}</option>
            ))}
          </select>

        </div>

        <p className="text-cyan-400 mb-8">
          {filteredData.length} Seniors Found
        </p>        {seniorsByBatch.map(({ year, students }) => (
          <div key={year} className="mb-16">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              Batch of {year} ({getYearOfStudy(year)})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 p-6"
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-cyan-600 flex items-center justify-center text-xl font-bold text-white">
                      {student.name
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {student.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        {student.branch}
                      </p>
                    </div>
                  </div>

                  {/* School */}
                  <div className="mb-3">
                    <p className="text-gray-500 text-xs uppercase">
                      School
                    </p>

                    <p className="text-white">
                      🏫 {student.school}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <p className="text-gray-500 text-xs uppercase">
                      Contact
                    </p>

                    <p className="text-white">
                      {student.phone === "N/A"
                        ? "Not Available"
                        : student.phone}
                    </p>
                  </div>

                  {/* Buttons */}

                  {student.phone !== "N/A" ? (
                    <div className="flex gap-3">

                      <a
                        href={`tel:${student.phone}`}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg text-center font-medium transition"
                      >
                        📞 Call
                      </a>

                      <a
                        href={`https://wa.me/91${student.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-center font-medium transition"
                      >
                        💬 WhatsApp
                      </a>

                    </div>
                  ) : (
                    <div className="bg-gray-700 rounded-lg py-2 text-center text-gray-300">
                      Contact Not Available
                    </div>
                  )}

                  {/* Copy Button */}

                  {student.phone !== "N/A" && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(student.phone);
                        alert("Phone number copied!");
                      }}
                      className="w-full mt-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition rounded-lg py-2"
                    >
                      📋 Copy Number
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">😔</div>

            <h2 className="text-2xl font-bold text-white">
              No Seniors Found
            </h2>

            <p className="text-gray-400 mt-3">
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllSeniorsPage;