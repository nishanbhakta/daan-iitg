import React, { useState, useEffect } from "react";
import { createCabShare, getCabShares } from "../services/cabShareService";

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
  },

  "Guwahati Station (GHY)": {
    label: "Guwahati Railway Station",
    code: "GHY",
    lat: 26.1614,
    lng: 91.7362,
  },

  "Kamakhya Station (KYQ)": {
    label: "Kamakhya Railway Station",
    code: "KYQ",
    lat: 26.1517,
    lng: 91.6425,
  },
};

const NavigationHelp = () => {
  // -----------------------------
  // State
  // -----------------------------

  const [travelPlans, setTravelPlans] = useState([]);
  const [plansLoaded, setPlansLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

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

      // Supports both:
      // res.json(data)
      // res.json({ success:true,data })

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

    setNewPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // Submit
  // -----------------------------

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

    .mono {
      font-family: 'IBM Plex Mono', monospace;
    }

    .display {
      font-family: 'Fraunces', serif;
    }

    .fade-up {
      animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both;
    }

    @keyframes fadeUp {
      from {
        opacity:0;
        transform:translateY(14px);
      }
      to {
        opacity:1;
        transform:translateY(0);
      }
    }

    .plan-card{
      animation:fadeUp .5s ease both;
    }

    .glow-btn{
      transition:.2s;
    }

    .glow-btn:hover{
      transform:translateY(-2px);
    }

    select,input{
      color-scheme:dark;
    }
  `}</style>

      <div className="max-w-4xl mx-auto mb-12 text-center fade-up">
        <p className="mb-3 text-xs tracking-[0.25em] uppercase mono text-cyan-300/70">
          IIT Guwahati · Arrival Guide
        </p>

        <h1 className="display text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-slate-100 to-cyan-200">
          Landing Around the Same Time? Share the Ride.
        </h1>

        <p className="max-w-xl mx-auto mt-4 text-slate-300/90">
          Post your arrival details and find batchmates heading to the same
          hostel — split a cab from the airport or station instead of travelling
          alone.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <section
          className="p-6 sm:p-8 border rounded-2xl fade-up"
          style={{
            background:
              "linear-gradient(165deg, rgba(20,38,54,.85), rgba(12,24,36,.85))",
            borderColor: "rgba(148,197,210,.15)",
          }}
        >
          <h2 className="mb-1 text-2xl font-semibold display">Share a Cab</h2>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] mb-8">
            <div className="space-y-6">
              <p className="mb-4 text-sm text-slate-400">
                Post your travel plan and connect with anyone arriving around
                the same time.
              </p>

              <form onSubmit={handleAddPlan} className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={newPlan.name}
                  onChange={handleInputChange}
                  className="col-span-2 p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
                  required
                />

                <select
                  name="hostel"
                  value={newPlan.hostel}
                  onChange={handleInputChange}
                  className="p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
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
                  className="p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
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
                  className="p-2.5 text-sm text-white bg-slate-800/80 border border-slate-600/50 rounded-lg"
                  required
                />

                <input
                  type="time"
                  name="time"
                  value={newPlan.time}
                  onChange={handleInputChange}
                  className="p-2.5 text-sm text-white bg-slate-800/80 border border-slate-600/50 rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="contact"
                  placeholder="Phone / Instagram"
                  value={newPlan.contact}
                  onChange={handleInputChange}
                  className="col-span-2 p-2.5 text-sm bg-slate-800/80 border border-slate-600/50 rounded-lg"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="glow-btn col-span-2 py-2.5 rounded-lg font-semibold text-slate-900"
                  style={{
                    background: "linear-gradient(120deg,#5fb6c9,#8fd3e0)",
                  }}
                >
                  {loading ? "Posting..." : "Post Travel Plan"}
                </button>
              </form>
            </div>

            <aside className="rounded-3xl border border-slate-700/60 bg-slate-950/60 p-5">
              <h3 className="pb-2 mb-5 text-sm tracking-wide uppercase border-b mono text-cyan-300/70 border-slate-700/60">
                Active Plans · {travelPlans.length}
              </h3>

              {!plansLoaded ? (
                <p className="text-sm text-slate-500">
                  Loading travel plans...
                </p>
              ) : travelPlans.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No travel plans available. Be the first to post one.
                </p>
              ) : (
                <div className="space-y-3 max-h-[38rem] overflow-y-auto pr-1">
                  {travelPlans.map((plan) => (
                    <div
                      key={plan._id}
                      className="plan-card p-4 rounded-xl border-l-4 bg-slate-800/70"
                      style={{
                        borderLeftColor: "#5fb6c9",
                      }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="font-semibold text-cyan-200">
                          {plan.name}
                        </h4>

                        <span className="text-xs text-slate-400">
                          {new Date(plan.travelDate).toLocaleDateString()} •{" "}
                          {plan.travelTime}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-300">
                        {plan.from}
                        <span className="mx-2 text-cyan-400">→</span>
                        {plan.to}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Contact : {plan.contact}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>

          <div className="pt-5 mt-6 border-t border-slate-700/60">
            <a
              href="https://www.iitg.ac.in/phy/travelinfo.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-cyan-300 hover:text-cyan-200 hover:underline"
            >
              Official IITG Travel & Navigation Guide ↗
            </a>

            <p className="mt-1 text-sm text-slate-500">
              Institute buses also run regularly from Panbazar, near Guwahati
              Railway Station.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NavigationHelp;
