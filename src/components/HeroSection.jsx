import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full bg-[#0b0b0b] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/Ujidb4bmigoHT4IV/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient glow overlay - non-blocking */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,140,0,0.15),rgba(17,17,17,0.2)_60%,rgba(17,17,17,1)_100%)]" />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-10">
        <div className="text-center pt-10">
          <motion.h1
            initial={{ opacity: 0, letterSpacing: '0.15em', y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2 } }}
            className="text-xs md:text-sm tracking-[0.35em] text-neutral-300 uppercase"
          >
            W GROUP INTERACTIVE JOURNEY
          </motion.h1>
        </div>

        <div className="text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 1.2 } }}
            className="text-3xl md:text-6xl font-semibold tracking-[0.15em] uppercase"
            style={{ fontFamily: 'Lato, Helvetica Neue, Arial, sans-serif' }}
          >
            A LIVING DIGITAL CITY
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0, transition: { delay: 0.5, duration: 1 } }}
            className="mt-4 max-w-3xl mx-auto text-sm md:text-base tracking-widest text-neutral-300"
          >
            Scroll to begin. Every pixel equals distance. One continuous shot.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8, transition: { delay: 1, duration: 1 } }}
          className="pb-4 flex items-center gap-2 text-neutral-400"
        >
          <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs tracking-[0.35em] uppercase">Genesis</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
