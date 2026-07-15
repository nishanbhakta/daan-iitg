import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import ICONS from '../constants/icons';
import NetworkCanvas from './NetworkCanvas';
import CountUpStat from './CountUpStat';
import allSeniorsData from '../data/seniorsData';

const HERO_ROLES = [
  "to IIT Guwahati",
  "to a new chapter",
  "to endless opportunities",
];
const JOINING_DATE = new Date('2026-07-20T09:00:00');

const Hero = ({ onNavClick }) => {
  const [typedText, setTypedText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [pulseKeys, setPulseKeys] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delay = 2000;

  const stats = useMemo(
    () => ({
      seniors: allSeniorsData.length,
      schools: new Set(allSeniorsData.map((s) => s.school)).size,
      branches: new Set(allSeniorsData.map((s) => s.branch)).size,
    }),
    []
  );

  /* ===========================
      Mount / reveal animation
  ============================ */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  /* ===========================
      Mouse-reactive glow
  ============================ */
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  }, []);

  /* ===========================
      Countdown Timer
  ============================ */

  const calculateTimeLeft = useCallback(() => {
    const difference = JOINING_DATE - new Date();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      totalMs: difference,
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        const next = calculateTimeLeft();
        if (prev && next) {
          setPulseKeys((pk) => ({
            days: pk.days + (prev.days !== next.days ? 1 : 0),
            hours: pk.hours + (prev.hours !== next.hours ? 1 : 0),
            minutes: pk.minutes + (prev.minutes !== next.minutes ? 1 : 0),
            seconds: pk.seconds + 1,
          }));
        }
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [calculateTimeLeft]);

  // Progress toward joining day, counted from 60 days out (purely visual)
  const countdownProgress = useMemo(() => {
    if (!timeLeft) return 100;
    const totalWindowMs = 60 * 24 * 60 * 60 * 1000;
    const pct = 100 - Math.min(100, (timeLeft.totalMs / totalWindowMs) * 100);
    return Math.max(0, Math.min(100, pct));
  }, [timeLeft]);

  /* ===========================
      Typing Animation
  ============================ */

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    let timeoutId;

    const type = () => {
      const currentRole = HERO_ROLES[roleIndex];

      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, delay);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex =
          (roleIndex + 1) % HERO_ROLES.length;

        timeoutId = setTimeout(type, typingSpeed);
      } else {
        timeoutId = setTimeout(
          type,
          isDeleting ? deletingSpeed : typingSpeed
        );
      }
    };

    timeoutId = setTimeout(type, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const countdownUnits = timeLeft
    ? [
        ["Days", timeLeft.days, pulseKeys.days],
        ["Hours", timeLeft.hours, pulseKeys.hours],
        ["Minutes", timeLeft.minutes, pulseKeys.minutes],
        ["Seconds", timeLeft.seconds, pulseKeys.seconds],
      ]
    : [];

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-gray-900 pt-24 px-6 overflow-hidden"
    >
      <NetworkCanvas />

      {/* Cursor-reactive glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(34,211,238,0.15), transparent 70%)`,
        }}
      />

      {/* Ambient floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
      </div>

      <div
        className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >

        <p className="text-cyan-400 font-semibold tracking-[0.25em] uppercase mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/5 border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          Welcome, Dakshana Scholars!
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Welcome{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_linear_infinite]">
            {typedText}
          </span>
          <span className="animate-pulse text-cyan-400">
            |
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-8">
          Congratulations on joining{" "}
          <span className="font-semibold text-white">
            IIT Guwahati
          </span>
          ! This platform is built by your seniors to
          help you throughout your admission journey,
          hostel life, academics, and your exciting
          first year at IITG.
        </p>

        {timeLeft && (
          <div className="mt-12 relative bg-white/5 backdrop-blur-md border border-cyan-400/20 rounded-3xl shadow-2xl p-8 hover:border-cyan-400/40 hover:shadow-cyan-500/10 transition-all duration-500 group">
            {/* subtle animated border glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />

            <p className="text-cyan-400 uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2">
              <Icon path={ICONS.chevronDown} className="w-4 h-4 rotate-90 opacity-70" />
              Countdown to Joining Day
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-5">
              {countdownUnits.map(([label, value, pulseKey]) => (
                <div
                  key={label}
                  className="relative w-24 h-24 rounded-2xl bg-gray-800/80 border border-cyan-500/20 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 cursor-default"
                >
                  <div
                    key={pulseKey}
                    className="text-3xl font-bold text-white animate-[digit-pop_0.4s_ease-out]"
                  >
                    {String(value).padStart(2, "0")}
                  </div>

                  <div className="text-xs uppercase tracking-widest text-gray-400 mt-2">
                    {label}
                  </div>

                  {label === "Seconds" && (
                    <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-400/80 transition-all duration-1000 ease-linear" style={{ width: `${(value / 60) * 100}%` }} />
                  )}
                </div>
              ))}
            </div>

            {/* Overall progress bar toward joining day */}
            <div className="mt-6 max-w-sm mx-auto">
              <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-1000 ease-out"
                  style={{ width: `${countdownProgress}%` }}
                />
              </div>
            </div>

            <p className="mt-8 text-gray-300 text-lg">
              📅 Official Joining Date
            </p>

            <p className="text-3xl font-bold text-cyan-400 mt-2">
              20 July 2026
            </p>
          </div>
        )}
        {!timeLeft && (
          <div className="mt-12 bg-green-600/20 border border-green-500/30 rounded-3xl p-8 hover:bg-green-600/25 transition-colors duration-500">
            <h2 className="text-3xl font-bold text-green-400">
              🎉 Welcome to IIT Guwahati!
            </h2>

            <p className="mt-4 text-gray-300 text-lg">
              Your IITG journey has officially begun. We wish you an amazing
              first year filled with learning, friendships, and unforgettable
              memories.
            </p>
          </div>
        )}

        <button
          onClick={() => onNavClick("notices")}
          className="relative mt-10 inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20 overflow-hidden group"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <span className="relative">Get Started</span>
          <Icon
            path={ICONS.chevronDown}
            className="relative w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300"
          />
        </button>

        <div className="mt-14 flex flex-wrap items-center justify-center divide-x divide-gray-700 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-colors duration-500">

          <div className="transition-transform duration-300 hover:-translate-y-1 hover:bg-cyan-400/5">
            <CountUpStat
              value={stats.seniors}
              label="Seniors in Network"
            />
          </div>

          <div className="transition-transform duration-300 hover:-translate-y-1 hover:bg-cyan-400/5">
            <CountUpStat
              value={stats.schools}
              label="JNVs Represented"
            />
          </div>

          <div className="transition-transform duration-300 hover:-translate-y-1 hover:bg-cyan-400/5">
            <CountUpStat
              value={stats.branches}
              label="Branches Covered"
            />
          </div>

        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={() => onNavClick("about")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-500 hover:text-cyan-400 hover:scale-125 transition-all duration-300 animate-bounce"
      >
        <Icon
          path={ICONS.chevronDown}
          className="w-8 h-8"
        />
      </button>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes digit-pop {
          0% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;