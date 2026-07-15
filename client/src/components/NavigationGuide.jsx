import React, { useState, useEffect, useMemo } from "react";
import {
  createCabShare,
  getCabShares,
  deleteCabShare,
} from "../services/cabShareService";

// -----------------------------
// Hostel List
// -----------------------------

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

// -----------------------------
// Pickup Points
// -----------------------------

const PICKUP_POINTS = {
  "Airport (GAU)": {
    label: "Lokpriya Gopinath Bordoloi Airport",
    code: "GAU",
    lat: 26.1061,
    lng: 91.5859,
    kind: "air",
  },
  "Guwahati Station (GHY)": {
    label: "Guwahati Railway Station",
    code: "GHY",
    lat: 26.1614,
    lng: 91.7362,
    kind: "rail",
  },
  "Kamakhya Station (KYQ)": {
    label: "Kamakhya Railway Station",
    code: "KYQ",
    lat: 26.1517,
    lng: 91.6425,
    kind: "rail",
  },
};

// -----------------------------
// Small icons (inline, no deps)
// -----------------------------

const PlaneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="14" height="14" {...props}>
    <path
      d="M10.5 14.5 3 12l1.2-1.6L10 12l3.8-6.6c.3-.5 1-.8 1.6-.6.5.2.8.8.6 1.4L13.6 13l4.6.9c.6.1 1.1.7 1.1 1.3 0 .7-.6 1.2-1.3 1.2l-5.4-.4-2.6 4.5-1.7-.4.7-4.6-2.5-.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const TrainIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="14" height="14" {...props}>
    <rect
      x="6"
      y="3.5"
      width="12"
      height="13"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M6 12.5h12" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="9.2" cy="14.5" r="0.9" fill="currentColor" />
    <circle cx="14.8" cy="14.5" r="0.9" fill="currentColor" />
    <path
      d="M8.5 16.5 6 20.5M15.5 16.5l2.5 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="15" height="15" {...props}>
    <circle
      cx="10.5"
      cy="10.5"
      r="6.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M19 19l-4-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CompassIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...props}>
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const CopyIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13" {...props}>
    <rect
      x="8.5"
      y="8.5"
      width="11"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15.5 8.5V6.5A2 2 0 0 0 13.5 4.5h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13" {...props}>
    <path
      d="M5 12.5l4.5 4.5L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13" {...props}>
    <path
      d="M5 7h14M9.5 7V5.2c0-.66.54-1.2 1.2-1.2h2.6c.66 0 1.2.54 1.2 1.2V7M7 7l.7 12.1c.05.9.8 1.6 1.7 1.6h5.2c.9 0 1.65-.7 1.7-1.6L17 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.2 10.5v6M13.8 10.5v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// -----------------------------
// Helpers
// -----------------------------

const sourceKind = (sourceLabel) => PICKUP_POINTS[sourceLabel]?.kind || "rail";

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const dayLabel = (dateStr) => {
  if (!dateStr) return "";
  const target = startOfDay(dateStr);
  const today = startOfDay(new Date());
  const diffDays = Math.round((target - today) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

// Formats a 24hr "HH:MM" time string into 12hr format with AM/PM,
// e.g. "14:05" -> "2:05 PM". Falls back to the raw value if it
// doesn't look like a valid HH:MM string.
const formatTime12hr = (timeStr) => {
  if (!timeStr) return "";
  const match = /^(\d{1,2}):(\d{2})/.exec(timeStr);
  if (!match) return timeStr;

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  if (Number.isNaN(hours)) return timeStr;

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}:${minutes} ${period}`;
};

const planTimestamp = (plan) => {
  if (!plan.travelDate) return Infinity;
  const t = new Date(
    `${plan.travelDate}T${plan.travelTime || "00:00"}`,
  ).getTime();
  return Number.isNaN(t) ? Infinity : t;
};

const isPast = (plan) => planTimestamp(plan) < Date.now() - 3 * 60 * 60 * 1000; // 3hr grace window

// Copy text to the clipboard, with a fallback for browsers/contexts
// where navigator.clipboard isn't available (e.g. non-HTTPS dev servers).
const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const NavigationHelp = () => {
  // -----------------------------
  // State
  // -----------------------------

  const [travelPlans, setTravelPlans] = useState([]);
  const [plansLoaded, setPlansLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [sortAsap, setSortAsap] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const [newPlan, setNewPlan] = useState({
    name: "",
    source: "Airport (GAU)",
    hostel: IITG_HOSTELS[0],
    date: "",
    time: "",
    contact: "",
  });

  // -----------------------------
  // Load Plans
  // -----------------------------

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setPlansLoaded(false);
      const response = await getCabShares();
      const plans = Array.isArray(response) ? response : response.data || [];
      setTravelPlans(plans);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    } finally {
      setPlansLoaded(true);
    }
  };

  // -----------------------------
  // Form
  // -----------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        name: newPlan.name,
        from: newPlan.source,
        to: `${newPlan.hostel} Hostel`,
        travelDate: newPlan.date,
        travelTime: newPlan.time,
        contact: newPlan.contact,
      };

      await createCabShare(payload);
      await fetchPlans();

      setNewPlan({
        name: "",
        source: "Airport (GAU)",
        hostel: IITG_HOSTELS[0],
        date: "",
        time: "",
        contact: "",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to post travel plan.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Delete plan
  // -----------------------------

  const handleDeletePlan = async (plan) => {
    if (!plan?._id) return;
    const confirmed = window.confirm(
      `Delete the travel plan for ${plan.name || "this rider"}?`,
    );
    if (!confirmed) return;

    try {
      setDeletingId(plan._id);
      await deleteCabShare(plan._id);
      setTravelPlans((prev) => prev.filter((p) => p._id !== plan._id));
    } catch (err) {
      console.error("Failed to delete plan", err);
      alert("Unable to delete travel plan.");
    } finally {
      setDeletingId(null);
    }
  };

  // -----------------------------
  // Copy contact
  // -----------------------------

  const handleCopyContact = async (plan) => {
    if (!plan.contact) return;
    try {
      await copyText(plan.contact);
      setCopiedId(plan._id);
      setTimeout(() => {
        setCopiedId((current) => (current === plan._id ? null : current));
      }, 1500);
    } catch (err) {
      console.error("Failed to copy contact", err);
    }
  };

  // -----------------------------
  // Search + sort
  // -----------------------------

  const visiblePlans = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = travelPlans.filter((plan) => {
      if (!term) return true;
      return (
        plan.to?.toLowerCase().includes(term) ||
        plan.from?.toLowerCase().includes(term) ||
        plan.name?.toLowerCase().includes(term)
      );
    });

    if (sortAsap) {
      list = [...list].sort((a, b) => planTimestamp(a) - planTimestamp(b));
    }

    return list;
  }, [travelPlans, search, sortAsap]);

  const nextPlanId =
    sortAsap && visiblePlans.length && !isPast(visiblePlans[0])
      ? visiblePlans[0]._id
      : null;

  return (
    <div className="route-root">
      <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .route-root {
      min-height: 100vh;
      padding: 3rem 1.25rem 4rem;
      background:
        radial-gradient(ellipse 80% 50% at 15% 0%, rgba(59,130,166,0.25), transparent 60%),
        radial-gradient(ellipse 60% 40% at 90% 15%, rgba(232,163,61,0.12), transparent 55%),
        linear-gradient(180deg, #0a1826 0%, #0b1f2f 45%, #0a1a24 100%);
      font-family: 'Inter', sans-serif;
      color: #eae6da;
      position: relative;
      overflow-x: hidden;
    }

    .route-root::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(1px 1px at 20% 30%, rgba(234,230,218,0.25) 0, transparent 100%),
        radial-gradient(1px 1px at 70% 65%, rgba(234,230,218,0.18) 0, transparent 100%),
        radial-gradient(1.5px 1.5px at 85% 20%, rgba(234,230,218,0.2) 0, transparent 100%),
        radial-gradient(1px 1px at 45% 80%, rgba(234,230,218,0.15) 0, transparent 100%);
      pointer-events: none;
    }

    .mono { font-family: 'IBM Plex Mono', monospace; }
    .display { font-family: 'Fraunces', serif; }

    .fade-up { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both; }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(14px); }
      to { opacity:1; transform:translateY(0); }
    }

    .plan-card { animation: fadeUp .45s ease both; }

    .river-divider {
      display: block;
      width: 100%;
      max-width: 420px;
      height: 22px;
      margin: 1.75rem auto 0;
      opacity: .55;
    }
    .river-divider path {
      stroke-dasharray: 6 7;
      animation: riverFlow 14s linear infinite;
    }
    @keyframes riverFlow {
      to { stroke-dashoffset: -260; }
    }
    @media (prefers-reduced-motion: reduce) {
      .river-divider path { animation: none; }
    }

    .field-label {
      display: block;
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(148,197,210,0.65);
      margin-bottom: 0.3rem;
      font-family: 'IBM Plex Mono', monospace;
    }

    .glow-btn { transition: transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease; }
    .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -8px rgba(95,182,201,0.5); }
    .glow-btn:focus-visible,
    input:focus-visible,
    select:focus-visible,
    button:focus-visible {
      outline: 2px solid #8fd3e0;
      outline-offset: 2px;
    }

    select, input {
      color-scheme: dark;
    }

    .search-wrap { position: relative; }
    .search-wrap svg { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: rgba(148,197,210,0.6); }
    .search-wrap input { padding-left: 2rem; }

    .next-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #0a1a24;
      background: linear-gradient(120deg,#e8a33d,#f0c374);
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
    }

    .info-banner {
      position: relative;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      text-align: left;
      padding: 1.1rem 1.4rem;
      border-radius: 1rem;
      background: linear-gradient(100deg, rgba(232,163,61,0.14), rgba(232,163,61,0.05) 60%, rgba(20,38,54,0.4));
      border: 1px solid rgba(232,163,61,0.35);
    }
    .info-banner::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      border-radius: 3px 0 0 3px;
      background: linear-gradient(180deg,#f0c374,#e8a33d);
    }

    .panel-head {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.35rem;
    }
    .panel-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.65rem;
      flex-shrink: 0;
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.68rem;
      padding: 0.3rem 0.55rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(148,197,210,0.25);
      background: rgba(148,197,210,0.08);
      color: #94c5d2;
      cursor: pointer;
    }
    .copy-btn.copied {
      background: rgba(95,182,201,0.25);
      border-color: rgba(95,182,201,0.5);
      color: #a9e4ee;
    }

    .delete-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.68rem;
      padding: 0.3rem 0.55rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(220,120,120,0.3);
      background: rgba(220,120,120,0.08);
      color: #e79999;
      cursor: pointer;
    }
    .delete-btn:hover { background: rgba(220,120,120,0.18); }
    .delete-btn:disabled { opacity: 0.5; cursor: default; }
  `}</style>

      {/* ----------------- Hero ----------------- */}
      <div className="max-w-4xl mx-auto mb-4 text-center fade-up">
        <p className="mb-3 text-xs tracking-[0.25em] uppercase mono text-cyan-300/70">
          IIT Guwahati · Arrival Guide
        </p>

        <div className="info-banner text-left mb-6">
          <span className="mt-0.5 text-amber-300">
            <CompassIcon />
          </span>
          <div>
            <p className="mb-1 text-xs font-semibold tracking-wide uppercase mono text-amber-300/90">
              Good to know before you travel
            </p>
            <a
              href="https://www.iitg.ac.in/phy/travelinfo.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-amber-200 hover:text-amber-100 hover:underline"
            >
              Official IITG Travel & Navigation Guide ↗
            </a>
            <p className="mt-1 text-sm text-slate-300/80">
              Institute buses also run regularly from Panbazar, near Guwahati
              Railway Station.
            </p>
          </div>
        </div>

        <h1 className="display text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-slate-100 to-cyan-200">
          Landing Around the Same Time? Share the Ride.
        </h1>

        <p className="max-w-xl mx-auto mt-4 text-slate-300/90">
          Post your arrival details and find batchmates heading to the same
          hostel — split a cab from the airport or station instead of travelling
          alone.
        </p>

        <svg className="river-divider" viewBox="0 0 420 22" fill="none">
          <path
            d="M2 11c30-9 55 9 85 0s55-9 85 0 55 9 85 0 55-9 80 0"
            stroke="url(#riverGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="420" y2="0">
              <stop offset="0%" stopColor="#5fb6c9" stopOpacity="0" />
              <stop offset="15%" stopColor="#5fb6c9" />
              <stop offset="50%" stopColor="#e8a33d" />
              <stop offset="85%" stopColor="#5fb6c9" />
              <stop offset="100%" stopColor="#5fb6c9" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ----------------- Post / Browse, split into two panels ----------------- */}
      <div className="grid max-w-5xl gap-6 mx-auto lg:grid-cols-[1fr_1.05fr]">
        {/* ----------------- Panel: Post a cab ----------------- */}
        <section
          className="p-6 border rounded-2xl fade-up sm:p-7"
          style={{
            background:
              "linear-gradient(165deg, rgba(20,38,54,.85), rgba(12,24,36,.85))",
            borderColor: "rgba(148,197,210,.15)",
          }}
        >
          <div className="panel-head">
            <span
              className="panel-icon"
              style={{ background: "rgba(95,182,201,0.15)", color: "#8fd3e0" }}
            >
              <PlusIcon />
            </span>
            <h2 className="text-xl font-semibold display">Post a Cab Share</h2>
          </div>
          <p className="mb-6 text-sm text-slate-400">
            Share your arrival details so others heading your way can find you.
          </p>

          <form onSubmit={handleAddPlan} className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="field-label" htmlFor="name">
                Your name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Priya Sharma"
                value={newPlan.name}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="hostel">
                Hostel
              </label>
              <select
                id="hostel"
                name="hostel"
                value={newPlan.hostel}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
              >
                {IITG_HOSTELS.map((hostel) => (
                  <option key={hostel} value={hostel}>
                    {hostel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="source">
                Pickup point
              </label>
              <select
                id="source"
                name="source"
                value={newPlan.source}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
              >
                {Object.keys(PICKUP_POINTS).map((point) => (
                  <option key={point} value={point}>
                    {point}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={newPlan.date}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm text-white bg-slate-800/80 border border-slate-600/50 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="time">
                Time
              </label>
              <input
                id="time"
                type="time"
                name="time"
                value={newPlan.time}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm text-white bg-slate-800/80 border border-slate-600/50 rounded-lg"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="field-label" htmlFor="contact">
                Contact
              </label>
              <input
                id="contact"
                type="text"
                name="contact"
                placeholder="Phone / Instagram"
                value={newPlan.contact}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="glow-btn col-span-2 py-2.5 rounded-lg font-semibold text-slate-900 disabled:opacity-60"
              style={{ background: "linear-gradient(120deg,#5fb6c9,#8fd3e0)" }}
            >
              {loading ? "Posting..." : "Post Travel Plan"}
            </button>
          </form>
        </section>

        {/* ----------------- Panel: Browse plans ----------------- */}
        <section
          className="p-6 border rounded-2xl fade-up sm:p-7"
          style={{
            background: "rgba(6,16,26,0.75)",
            borderColor: "rgba(232,163,61,.18)",
          }}
        >
          <div className="panel-head">
            <span
              className="panel-icon"
              style={{ background: "rgba(232,163,61,0.15)", color: "#f0c374" }}
            >
              <SearchIcon width="15" height="15" />
            </span>
            <h2 className="text-xl font-semibold display">Find a Ride</h2>
            <span className="ml-auto text-xs text-slate-500 mono">
              {visiblePlans.length}
              {search && ` / ${travelPlans.length}`}
            </span>
          </div>
          <p className="mb-5 text-sm text-slate-400">
            Search by hostel, or sort to see who's leaving soonest.
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="search-wrap flex-1">
              <SearchIcon />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by hostel..."
                className="w-full p-2 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
                aria-label="Search by hostel name"
              />
            </div>

            <button
              type="button"
              onClick={() => setSortAsap((v) => !v)}
              aria-pressed={sortAsap}
              className="glow-btn shrink-0 flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg mono"
              style={{
                background: sortAsap
                  ? "linear-gradient(120deg,#e8a33d,#f0c374)"
                  : "rgba(148,197,210,0.12)",
                color: sortAsap ? "#0a1a24" : "#94c5d2",
                border: sortAsap ? "none" : "1px solid rgba(148,197,210,0.3)",
              }}
              title="Sort by soonest departure"
            >
              ASAP {sortAsap ? "✓" : ""}
            </button>
          </div>

          {!plansLoaded ? (
            <p className="text-sm text-slate-500">Loading travel plans...</p>
          ) : visiblePlans.length === 0 ? (
            <p className="text-sm text-slate-500">
              {search
                ? `No plans heading to "${search}" yet. Try another hostel, or post one yourself.`
                : "No travel plans available. Be the first to post one."}
            </p>
          ) : (
            <div className="space-y-3 max-h-[34rem] overflow-y-auto pr-1">
              {visiblePlans.map((plan) => {
                const kind = sourceKind(plan.from);
                const past = isPast(plan);
                const copied = copiedId === plan._id;
                const deleting = deletingId === plan._id;

                return (
                  <div
                    key={plan._id}
                    className="plan-card p-4 rounded-xl border-l-4 bg-slate-800/70"
                    style={{
                      borderLeftColor: past ? "#4b5563" : "#5fb6c9",
                      opacity: past ? 0.55 : 1,
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-semibold text-cyan-200 flex items-center gap-2">
                        {plan.name}
                        {plan._id === nextPlanId && (
                          <span className="next-badge">Next up</span>
                        )}
                      </h4>

                      <span className="text-xs text-slate-400 shrink-0">
                        {dayLabel(plan.travelDate)} •{" "}
                        {formatTime12hr(plan.travelTime)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-300 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-cyan-300/80">
                        {kind === "air" ? <PlaneIcon /> : <TrainIcon />}
                        {plan.from}
                      </span>
                      <span className="mx-1 text-cyan-400">→</span>
                      {plan.to}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-2">
                      <p className="text-xs text-slate-500 truncate">
                        Contact/InstaId : {plan.contact}
                      </p>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopyContact(plan)}
                          className={`glow-btn copy-btn ${copied ? "copied" : ""}`}
                          aria-label={`Copy contact for ${plan.name}`}
                        >
                          {copied ? <CheckIcon /> : <CopyIcon />}
                          {copied ? "Copied" : "Copy"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan)}
                          disabled={deleting}
                          className="glow-btn delete-btn"
                          aria-label={`Delete travel plan for ${plan.name}`}
                        >
                          <TrashIcon />
                          {deleting ? "Deleting..." : "Delete"}
                        </button>
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
  );
};

export default NavigationHelp;
