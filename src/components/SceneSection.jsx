import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
  SceneSection
  - Sticky, scroll-driven section that simulates a slow camera move
  - Props:
    id: string
    title: string
    subtitle: string
    accent: one of 'orange' | 'violet' | 'blue' | 'gold'
    length: number (scroll length multiplier)
*/

const accentMap = {
  orange: 'from-orange-500/10 via-orange-400/5 to-transparent',
  violet: 'from-violet-500/10 via-fuchsia-400/5 to-transparent',
  blue: 'from-sky-500/10 via-cyan-400/5 to-transparent',
  gold: 'from-amber-400/15 via-amber-300/5 to-transparent',
};

const AccentBadge = ({ color, label }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs tracking-[0.25em] uppercase text-white/80`}
    style={{ backdropFilter: 'blur(6px)' }}
  >
    <span className={`h-2 w-2 rounded-full ${
      color === 'orange' ? 'bg-orange-500' : color === 'violet' ? 'bg-violet-500' : color === 'blue' ? 'bg-sky-500' : 'bg-amber-400'
    }`} />
    {label}
  </div>
);

const SceneSection = ({ id, title, subtitle, accent = 'orange', length = 1800, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Camera-like transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-30vh']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.2, 1, 1, 0.6]);

  // Parallax layers
  const bgShift = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const fgShift = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section id={id} className="relative w-full" style={{ height: `${length}px` }}>
      <div ref={ref} className="sticky top-0 h-screen overflow-hidden bg-[#0d0d0d]">
        {/* Background subtle grid & glow */}
        <motion.div
          style={{ y: bgShift }}
          className={`absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_10%,rgba(255,255,255,0.02),transparent_70%)]`}
        />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${accentMap[accent]} opacity-90`} />

        {/* Content */}
        <motion.div style={{ y, scale, opacity }} className="relative z-10 h-full px-6 md:px-12">
          <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <div className="pt-10 flex items-center justify-between">
              <AccentBadge color={accent} label={title} />
              <div className="text-right text-[10px] md:text-xs tracking-[0.35em] text-white/60 uppercase">Dubai — Night</div>
            </div>

            {/* Mid content slot */}
            <motion.div style={{ y: fgShift }} className="relative flex items-center justify-center">
              <div className="max-w-5xl w-full">
                <h3 className="text-2xl md:text-4xl tracking-[0.2em] uppercase text-white text-center" style={{ fontFamily: 'Lato, Helvetica Neue, Arial, sans-serif' }}>
                  {subtitle}
                </h3>
                <div className="mt-8">
                  {children}
                </div>
              </div>
            </motion.div>

            <div className="pb-10 flex items-center justify-center">
              <div className="h-px w-24 bg-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SceneSection;
