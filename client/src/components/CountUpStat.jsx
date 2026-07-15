import React, { useEffect, useRef, useState } from 'react';

// --- Count-up stat used in the hero to ground the pitch in real numbers ---
const CountUpStat = ({ value, label, suffix = "+" }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (prefersReducedMotion) {
        setDisplay(value);
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && run()),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center px-6 py-3 sm:px-8">
      <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
        {display}{suffix}
      </span>
      <span className="text-xs sm:text-sm text-gray-400 mt-1 tracking-wide uppercase">{label}</span>
    </div>
  );
};

export default CountUpStat;
