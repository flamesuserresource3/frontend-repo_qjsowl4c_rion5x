import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection.jsx';
import SceneSection from './components/SceneSection.jsx';
import SideProgress from './components/SideProgress.jsx';
import AmbientAudio from './components/AmbientAudio.jsx';

const BillboardRow = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[0,1,2,3].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: i * 0.1 }}
        className="relative aspect-[4/3] rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-300/5 border border-white/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.06),transparent)]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-[10px] tracking-[0.35em] uppercase text-white/70">Impression +2.3%</div>
        </div>
      </motion.div>
    ))}
  </div>
);

const DataPanels = ({ tone = 'violet' }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[0,1,2].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: i * 0.1 }}
        className={`relative rounded-lg border border-white/10 p-6 bg-gradient-to-b ${
          tone === 'violet' ? 'from-fuchsia-500/10 to-transparent' : 'from-cyan-500/10 to-transparent'
        }`}
      >
        <div className="text-xs tracking-[0.3em] uppercase text-white/60">Live Metric</div>
        <div className="mt-3 text-3xl tracking-widest">{(Math.random()*100).toFixed(1)}%</div>
        <div className="mt-4 h-1.5 w-full rounded bg-white/10">
          <div className="h-1.5 rounded bg-white/60" style={{ width: `${40 + i*20}%` }} />
        </div>
      </motion.div>
    ))}
  </div>
);

const AerialChips = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    {[
      { label: 'Palm Jumeirah', color: 'from-amber-400/30 to-pink-300/20' },
      { label: 'Expo City', color: 'from-pink-400/30 to-violet-400/20' },
      { label: 'Hudayriyat', color: 'from-sky-400/30 to-cyan-400/20' },
    ].map((p) => (
      <motion.div
        key={p.label}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className={`rounded-full border border-white/15 px-4 py-2 text-[10px] tracking-[0.35em] uppercase bg-gradient-to-r ${p.color}`}
        style={{ backdropFilter: 'blur(6px)' }}
      >
        {p.label}
      </motion.div>
    ))}
  </div>
);

function App() {
  return (
    <div className="bg-[#111111] text-white min-h-screen">
      <HeroSection />
      <SideProgress />
      <AmbientAudio />

      {/* OUTDOOR */}
      <SceneSection
        id="outdoor"
        title="Outdoor"
        subtitle="Sheikh Zayed Road — Billboards Awaken"
        accent="orange"
        length={1800}
      >
        <BillboardRow />
        <p className="mt-6 text-center text-sm md:text-base tracking-widest text-white/70 max-w-3xl mx-auto">
          LED facades ignite in sequence; reflections ripple across glass towers.
        </p>
      </SceneSection>

      {/* METRO */}
      <SceneSection
        id="metro"
        title="Dubai Metro"
        subtitle="Tilt to Transit — Precision in Motion"
        accent="violet"
        length={1800}
      >
        <DataPanels tone="violet" />
        <p className="mt-6 text-center text-sm md:text-base tracking-widest text-white/70 max-w-3xl mx-auto">
          Volumetric light and particle trails trace a data-rich journey.
        </p>
      </SceneSection>

      {/* RETAIL */}
      <SceneSection
        id="retail"
        title="Retail / In-Mall"
        subtitle="Calm Intelligence — Atrium Analytics"
        accent="blue"
        length={1800}
      >
        <DataPanels tone="blue" />
        <p className="mt-6 text-center text-sm md:text-base tracking-widest text-white/70 max-w-3xl mx-auto">
          Columns and suspended canvases stream footfall and engagement data.
        </p>
      </SceneSection>

      {/* DESTINATIONS */}
      <SceneSection
        id="destinations"
        title="Destinations"
        subtitle="Aerial Continuum — Palm / Expo / Hudayriyat"
        accent="gold"
        length={1800}
      >
        <AerialChips />
        <p className="mt-6 text-center text-sm md:text-base tracking-widest text-white/70 max-w-3xl mx-auto">
          Each district adopts its own hue and ambient logic — unified through motion.
        </p>
      </SceneSection>

      {/* CORE */}
      <SceneSection
        id="core"
        title="Return Home / AiOO Core"
        subtitle="All Lines Converge — The Data Sphere"
        accent="violet"
        length={1400}
      >
        <div className="mx-auto max-w-sm aspect-square rounded-full border border-white/15 bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-sky-400/20 shadow-[0_0_120px_rgba(168,85,247,0.25)]" />
        <p className="mt-6 text-center text-sm md:text-base tracking-widest text-white/80 max-w-2xl mx-auto">
          W Group — Connecting Data, People, and Place.
        </p>
      </SceneSection>

      <footer className="py-16 text-center text-xs tracking-[0.35em] text-white/50 uppercase">
        © {new Date().getFullYear()} W Group — All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
