import React, { useEffect, useRef, useState } from 'react';

// Minimal generative ambience: low-frequency pulses + soft noise
const AmbientAudio = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef({});
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    return () => {
      if (ctxRef.current) ctxRef.current.close();
    };
  }, []);

  const setupAudio = async () => {
    if (enabled) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    // Low bass pulse
    const bass = ctx.createOscillator();
    bass.type = 'sine';
    bass.frequency.value = 48; // Hz

    const bassGain = ctx.createGain();
    bassGain.gain.value = 0.02;

    // Soft noise via buffer source
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.25; // white noise
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 600;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.015;

    // Subtle pulse LFO on bass gain
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08; // very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.015; // modulation depth

    lfo.connect(lfoGain);
    lfoGain.connect(bassGain.gain);

    // Routing
    bass.connect(bassGain).connect(ctx.destination);
    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);

    bass.start();
    noise.start();
    lfo.start();

    nodesRef.current = { bass, bassGain, noise, noiseGain, lfo, lfoGain };
    setEnabled(true);
  };

  const teardown = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    Object.values(nodesRef.current).forEach((node) => {
      try { node.stop && node.stop(); } catch {}
      try { node.disconnect && node.disconnect(); } catch {}
    });
    ctx.close();
    ctxRef.current = null;
    nodesRef.current = {};
    setEnabled(false);
  };

  return (
    <div className="fixed left-4 bottom-4 z-40">
      <button
        onClick={() => (enabled ? teardown() : setupAudio())}
        className={`rounded-full border px-4 py-2 text-[10px] tracking-[0.35em] uppercase transition-colors ${
          enabled ? 'border-white/40 text-white/80 hover:bg-white/5' : 'border-white/20 text-white/60 hover:bg-white/5'
        }`}
        aria-pressed={enabled}
      >
        {enabled ? 'Audio: On' : 'Audio: Off'}
      </button>
    </div>
  );
};

export default AmbientAudio;
