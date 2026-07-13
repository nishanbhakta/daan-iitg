import React from 'react';
import Icon from './Icon';
import ICONS from '../constants/icons';
import { getYearOfStudy } from '../utils/helpers';
import allSeniorsData from '../data/seniorsData';

const AllSeniorsPage = ({ onBack }) => {
  const admissionYears = [2021, 2022, 2023, 2024];
  const seniorsByBatch = admissionYears
    .map(year => ({ year, students: allSeniorsData.filter(s => s.admissionYear === year) }))
    .filter(group => group.students.length > 0);

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors duration-300"
        >
          <Icon path={ICONS.arrowLeft} className="w-5 h-5" />
          Back to Main Page
        </button>
        <h1 className="text-3xl font-bold text-white mb-10">All Seniors</h1>
        {seniorsByBatch.map(({ year, students }) => (
          <div key={year} className="mb-12">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">
              Batch of {year} ({getYearOfStudy(year)})
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Branch</th>
                    <th className="px-4 py-3">School</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3">{student.branch}</td>
                      <td className="px-4 py-3">{student.school}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSeniorsPage;
