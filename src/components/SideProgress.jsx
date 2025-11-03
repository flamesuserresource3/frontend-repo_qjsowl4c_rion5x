import React, { useMemo } from 'react';
import { motion, useScroll } from 'framer-motion';

const sections = [
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'metro', label: 'Metro' },
  { id: 'retail', label: 'Retail' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'core', label: 'AiOO Core' },
];

const SideProgress = () => {
  const { scrollY } = useScroll();

  const anchors = useMemo(() =>
    sections.map(s => ({ id: s.id, el: typeof window !== 'undefined' ? document.getElementById(s.id) : null })),
  []);

  const onJump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top + 1; // slight nudge inside section
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-3">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onJump(s.id)}
            className="group relative"
            aria-label={s.label}
          >
            <motion.span
              className="block h-2 w-2 rounded-full bg-white/40 group-hover:bg-white"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.35em] uppercase text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideProgress;
