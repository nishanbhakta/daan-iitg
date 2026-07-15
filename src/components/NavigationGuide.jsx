import React, { useEffect, useMemo, useState } from "react";
import { loadTravelPlans, saveTravelPlans } from "../services/cabShareService";

const IITG_HOSTELS = [
  "Barak",
  "Brahmaputra",
  "Dhansiri",
  "Dibang",
  "Dihing",
  "Disang",
  "Gaurang",
  "Kameng",
  "Kapili",
  "Lohit",
  "Manas",
  "Siang",
  "Subansiri",
  "Umiam",
];

const PICKUP_POINTS = {
  "Airport (GAU)": "Lokpriya Gopinath Bordoloi Airport",
  "Guwahati Station (GHY)": "Guwahati Railway Station",
  "Kamakhya Station (KYQ)": "Kamakhya Railway Station",
};

const initialForm = {
  name: "",
  date: "",
  time: "",
  source: "Airport (GAU)",
  hostel: IITG_HOSTELS[0],
  contact: "",
};

export default function NavigationGuide() {
  const [travelPlans, setTravelPlans] = useState([]);
  const [plansLoaded, setPlansLoaded] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [newPlan, setNewPlan] = useState(initialForm);

  useEffect(() => {
    const plans = loadTravelPlans();
    setTravelPlans(plans);
    setPlansLoaded(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.name || !newPlan.date || !newPlan.hostel) return;

    const nextPlan = { ...newPlan, id: Date.now() };
    const updatedPlans = [...travelPlans, nextPlan];
    setTravelPlans(updatedPlans);

    const saved = saveTravelPlans(updatedPlans);
    setSaveError(
      saved
        ? ""
        : "Couldn't save — your plan may not persist after a refresh."
    );

    setNewPlan(initialForm);
  };

  const stats = useMemo(() => {
    const byHostel = travelPlans.reduce((acc, plan) => {
      acc[plan.hostel] = (acc[plan.hostel] || 0) + 1;
      return acc;
    }, {});

    return {
      total: travelPlans.length,
      topHostel: Object.entries(byHostel).sort((a, b) => b[1] - a[1])[0]?.[0] || "-",
    };
  }, [travelPlans]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300">
            IIT Guwahati • Arrival Guide
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Landing around the same time? Share the ride.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            Post your arrival details and find batchmates heading to the same hostel.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
            <h2 className="text-xl font-semibold text-cyan-200">Share a cab</h2>
            <p className="mt-2 text-sm text-slate-400">
              Add your arrival plan so others can connect with you.
            </p>

            <form onSubmit={handleAddPlan} className="mt-6 grid gap-3 sm:grid-cols-2">
              <input
                name="name"
                value={newPlan.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-0"
                required
              />
              <select
                name="hostel"
                value={newPlan.hostel}
                onChange={handleInputChange}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
              >
                {IITG_HOSTELS.map((hostel) => (
                  <option key={hostel} value={hostel}>
                    {hostel}
                  </option>
                ))}
              </select>
              <select
                name="source"
                value={newPlan.source}
                onChange={handleInputChange}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
              >
                {Object.keys(PICKUP_POINTS).map((point) => (
                  <option key={point} value={point}>
                    {point}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="date"
                value={newPlan.date}
                onChange={handleInputChange}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                required
              />
              <input
                type="time"
                name="time"
                value={newPlan.time}
                onChange={handleInputChange}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                required
              />
              <input
                name="contact"
                value={newPlan.contact}
                onChange={handleInputChange}
                placeholder="Contact (phone / Insta)"
                className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                required
              />
              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-cyan-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                Post travel plan
              </button>
            </form>

            {saveError ? <p className="mt-3 text-sm text-amber-400">{saveError}</p> : null}
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-cyan-200">Active plans</h2>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                {stats.total}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Most common destination: <span className="text-cyan-300">{stats.topHostel}</span>
            </p>

            {!plansLoaded ? (
              <p className="mt-6 text-sm text-slate-500">Loading plans…</p>
            ) : travelPlans.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">No plans posted yet.</p>
            ) : (
              <div className="mt-6 space-y-3">
                {travelPlans.map((plan) => (
                  <div key={plan.id} className="rounded-xl border border-slate-800 bg-slate-800/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-white">{plan.name}</span>
                      <span className="text-xs text-slate-400">
                        {plan.date} • {plan.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {plan.source} → {plan.hostel} Hostel
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{plan.contact}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
