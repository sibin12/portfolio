import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { profile } from '../../data/profile';
import { sound } from '../../lib/sound';

interface IntroProps {
  /** Fired as the curtain starts to open, so the page can mount and animate in behind it. */
  onReveal: () => void;
  onDone: () => void;
}

// The cut runs slightly downhill from left to right; text halves and the curtain share it.
const TOP = 'polygon(0 0, 100% 0, 100% 46%, 0 56%)';
const BOTTOM = 'polygon(0 56%, 100% 46%, 100% 100%, 0 100%)';

const T = { blade: 0.25, split: 0.85, join: 1.3, open: 1.9, done: 2.6 };
const ease = [0.65, 0, 0.35, 1] as const;

const Name: React.FC<{ clip: string; dx: number }> = ({ clip, dx }) => (
  <motion.span
    aria-hidden
    className="absolute inset-0 flex items-center justify-center"
    style={{ clipPath: clip }}
    initial={{ x: 0, y: 0 }}
    animate={{ x: [0, 0, dx, dx, 0], y: [0, 0, dx * 0.12, dx * 0.12, 0] }}
    transition={{ duration: T.join + 0.25, times: [0, T.split / (T.join + 0.25), (T.split + 0.15) / (T.join + 0.25), T.join / (T.join + 0.25), 1], ease: 'easeInOut' }}
  >
    <span className="text-gradient whitespace-nowrap">{profile.name}</span>
  </motion.span>
);

/**
 * Opening title: a blade of light sweeps across, the name is revealed behind it, splits along the cut
 * and snaps back, then the screen itself parts along the same line to show the page.
 */
const IntroTimeline: React.FC<IntroProps> = ({ onReveal, onDone }) => {
  // Keep the latest callbacks without restarting the timeline when the parent re-renders.
  const callbacks = useRef({ onReveal, onDone });
  callbacks.current = { onReveal, onDone };

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timers = [
      window.setTimeout(() => sound.slice(), T.blade * 1000),
      window.setTimeout(() => sound.snap(), T.join * 1000),
      window.setTimeout(() => callbacks.current.onReveal(), T.open * 1000),
      window.setTimeout(() => callbacks.current.onDone(), T.done * 1000),
    ];
    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previous;
    };
  }, []);

  const skip = () => {
    callbacks.current.onReveal();
    callbacks.current.onDone();
  };

  return (
    <div className="fixed inset-0 z-[100]" role="presentation">
      {[TOP, BOTTOM].map((clip, index) => (
        <motion.div
          key={clip}
          className="absolute inset-0 bg-ink-950"
          style={{ clipPath: clip }}
          initial={{ x: 0, y: 0 }}
          animate={{ x: index ? '6%' : '-6%', y: index ? '100%' : '-100%' }}
          transition={{ delay: T.open, duration: T.done - T.open, ease }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(99,102,241,0.18),transparent)]" />
        </motion.div>
      ))}

      <motion.div
        aria-hidden
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: T.open, duration: 0.3 }}
      >
        <motion.div
          className="relative h-[1.2em] w-full max-w-5xl font-display text-[13vw] font-semibold leading-none tracking-[-0.045em] sm:text-7xl md:text-8xl"
          initial={{ clipPath: 'inset(-20% 100% -20% 0)' }}
          animate={{ clipPath: 'inset(-20% 0% -20% 0)' }}
          transition={{ delay: T.blade, duration: 0.45, ease }}
        >
          <Name clip={TOP} dx={-18} />
          <Name clip={BOTTOM} dx={18} />
        </motion.div>

        <motion.p
          className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-slate-400 sm:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: T.join, duration: 0.4 }}
        >
          {profile.role} · Backend · React · AI
        </motion.p>
      </motion.div>

      {/* the blade: a bright sliver with a soft glow, angled along the cut */}
      {/* framer-motion owns `transform` on the blade, so a plain wrapper does the centring */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          className="h-[3px] w-[160vw] shrink-0"
          style={{ rotate: '-2.5deg', originX: 0 }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ delay: T.blade, duration: 0.6, times: [0, 0.55, 1], ease: 'easeOut' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-indigo-300 shadow-[0_0_24px_6px_rgba(165,180,252,0.65)]" />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-6 right-6 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-white"
      >
        Skip
      </button>
    </div>
  );
};

/* Memoised so the page mounting behind it (a parent re-render) never hands framer-motion
   fresh keyframe arrays, which would restart the timeline mid-way. */
export const Intro = React.memo(IntroTimeline);
