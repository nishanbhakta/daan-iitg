import React, { useEffect, useMemo, useState } from "react";
import { loadTravelPlans, saveTravelPlans } from "../services/cabShareService";

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
  contact: "",
};

const MY_PLANS_KEY = "iitg-cabshare-my-plan-ids";

function loadMyPlanIds() {
  try {
    return JSON.parse(window.localStorage.getItem(MY_PLANS_KEY) || "[]");
  } catch {
    return [];
  }
}

function rememberMyPlanId(id) {
  try {
    const ids = loadMyPlanIds();
    window.localStorage.setItem(MY_PLANS_KEY, JSON.stringify([...ids, id]));
  } catch {
    // localStorage unavailable — the delete option just won't show, no crash.
  }
}

function forgetMyPlanId(id) {
  try {
    const ids = loadMyPlanIds().filter((existing) => existing !== id);
    window.localStorage.setItem(MY_PLANS_KEY, JSON.stringify(ids));
  } catch {
    // no-op
  }
}

export default function NavigationGuide() {
  const [travelPlans, setTravelPlans] = useState([]);
  const [plansLoaded, setPlansLoaded] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [newPlan, setNewPlan] = useState(initialForm);
  const [myPlanIds, setMyPlanIds] = useState([]);
  const [toast, setToast] = useState(null);

  // Filters / sort for the plans list
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    const plans = loadTravelPlans();
    setTravelPlans(plans);
    setMyPlanIds(loadMyPlanIds());
    setPlansLoaded(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlan.name || !newPlan.date) return;

    const nextPlan = { ...newPlan, id: Date.now() };
    const updatedPlans = [...travelPlans, nextPlan];
    setTravelPlans(updatedPlans);

    const saved = saveTravelPlans(updatedPlans);
    if (saved) {
      setSaveError("");
      rememberMyPlanId(nextPlan.id);
      setMyPlanIds((prev) => [...prev, nextPlan.id]);
      setToast({ type: "success", message: "Plan posted — batchmates can now see it." });
    } else {
      setSaveError("Couldn't save — your plan may not persist after a refresh.");
    }

    setNewPlan(initialForm);
  };

  const handleDeletePlan = (id) => {
    const updatedPlans = travelPlans.filter((plan) => plan.id !== id);
    setTravelPlans(updatedPlans);
    const saved = saveTravelPlans(updatedPlans);
    if (saved) {
      forgetMyPlanId(id);
      setMyPlanIds((prev) => prev.filter((existing) => existing !== id));
      setToast({ type: "success", message: "Plan withdrawn." });
    } else {
      setSaveError("Couldn't remove that plan — try again.");
    }
  };

  const handleCopyContact = async (contact) => {
    try {
      await navigator.clipboard.writeText(contact);
      setToast({ type: "success", message: "Contact copied to clipboard." });
    } catch {
      setToast({ type: "error", message: "Couldn't copy — copy it manually instead." });
    }
  };

  // Plans that share the exact date + source currently in the form —
  // i.e. people the person filling the form could actually ride with.
  const liveMatchIds = useMemo(() => {
    if (!newPlan.date) return new Set();
    return new Set(
      travelPlans
        .filter(
          (plan) => plan.date === newPlan.date && plan.source === newPlan.source
        )
        .map((plan) => plan.id)
    );
  }, [travelPlans, newPlan.date, newPlan.source]);

  const visiblePlans = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = travelPlans.filter((plan) => {
      const matchesSearch =
        !query ||
        plan.name.toLowerCase().includes(query) ||
        plan.contact.toLowerCase().includes(query);
      const matchesSource = sourceFilter === "All" || plan.source === sourceFilter;
      return matchesSearch && matchesSource;
    });

    return filtered.sort((a, b) => {
      const aKey = `${a.date}T${a.time || "00:00"}`;
      const bKey = `${b.date}T${b.time || "00:00"}`;
      return sortDir === "asc" ? aKey.localeCompare(bKey) : bKey.localeCompare(aKey);
    });
  }, [travelPlans, search, sourceFilter, sortDir]);

  const stats = useMemo(() => {
    const bySource = travelPlans.reduce((acc, plan) => {
      acc[plan.source] = (acc[plan.source] || 0) + 1;
      return acc;
    }, {});

    return {
      total: travelPlans.length,
      topSource: Object.entries(bySource).sort((a, b) => b[1] - a[1])[0]?.[0] || "-",
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
            Post your arrival details and find batchmates on the same route.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
            <h2 className="text-xl font-semibold text-cyan-200">Share a cab</h2>
            <p className="mt-2 text-sm text-slate-400">
              Add your arrival plan so others can connect with you.
            </p>

            {liveMatchIds.size > 0 && (
              <div className="mt-4 rounded-lg border border-cyan-700/50 bg-cyan-950/40 px-3 py-2 text-sm text-cyan-200">
                {liveMatchIds.size} {liveMatchIds.size === 1 ? "person is" : "people are"}{" "}
                already headed the same way — check the list before you post.
              </div>
            )}

            <form onSubmit={handleAddPlan} className="mt-6 grid gap-3 sm:grid-cols-2">
              <input
                name="name"
                value={newPlan.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                required
              />
              <select
                name="source"
                value={newPlan.source}
                onChange={handleInputChange}
                className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
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
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                required
              />
              <input
                type="time"
                name="time"
                value={newPlan.time}
                onChange={handleInputChange}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                required
              />
              <input
                name="contact"
                value={newPlan.contact}
                onChange={handleInputChange}
                placeholder="Contact (phone / Insta)"
                className="sm:col-span-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
                required
              />
              <button
                type="submit"
                className="sm:col-span-2 rounded-lg bg-cyan-400 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.99]"
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
              Most common pickup: <span className="text-cyan-300">{stats.topSource}</span>
            </p>

            {/* Search + filters */}
            <div className="mt-4 flex flex-col gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or contact"
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40"
              />
              <div className="flex flex-wrap gap-2">
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-200"
                >
                  <option value="All">All pickup points</option>
                  {Object.keys(PICKUP_POINTS).map((point) => (
                    <option key={point} value={point}>
                      {point}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setSortDir((dir) => (dir === "asc" ? "desc" : "asc"))}
                  className="ml-auto rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-200 transition hover:border-cyan-600 hover:text-cyan-300"
                >
                  Sort: {sortDir === "asc" ? "Soonest first ↑" : "Latest first ↓"}
                </button>
              </div>
            </div>

            {!plansLoaded ? (
              <p className="mt-6 text-sm text-slate-500">Loading plans…</p>
            ) : travelPlans.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">No plans posted yet.</p>
            ) : visiblePlans.length === 0 ? (
              <p className="mt-6 text-sm text-slate-500">
                Nothing matches those filters — try clearing the search.
              </p>
            ) : (
              <div className="mt-6 space-y-3">
                {visiblePlans.map((plan) => {
                  const isMine = myPlanIds.includes(plan.id);
                  const isLiveMatch = liveMatchIds.has(plan.id);
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-xl border p-4 transition ${
                        isLiveMatch
                          ? "border-cyan-500/70 bg-cyan-950/30 ring-1 ring-cyan-500/30"
                          : "border-slate-800 bg-slate-800/70 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 font-medium text-white">
                          {plan.name}
                          {isMine && (
                            <span className="rounded-full bg-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                              You
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-slate-400">
                          {plan.date} • {plan.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">
                        Pickup: {plan.source}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">{plan.contact}</p>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyContact(plan.contact)}
                            className="rounded-md border border-slate-700 px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan-600 hover:text-cyan-300"
                          >
                            Copy contact
                          </button>
                          {isMine && (
                            <button
                              type="button"
                              onClick={() => handleDeletePlan(plan.id)}
                              className="rounded-md border border-red-900/60 px-2.5 py-1 text-xs text-red-300 transition hover:border-red-600 hover:bg-red-950/40"
                            >
                              Withdraw
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2.5 text-sm shadow-xl transition ${
            toast.type === "error"
              ? "bg-red-900/90 text-red-100"
              : "bg-cyan-500/95 text-slate-900"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}