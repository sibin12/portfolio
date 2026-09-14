import React, { useState } from 'react';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { Playground } from './components/sections/Playground';
import { Puzzle } from './components/sections/Puzzle';
import { GlobalPixelEffect } from './components/ui/GlobalPixelEffect';
import { motion, useScroll, useSpring } from 'framer-motion';

const links = ['Home', 'About', 'Projects', 'Play', 'Puzzle'];

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative min-h-screen bg-slate-950">
      <GlobalPixelEffect />

      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-indigo-500 to-emerald-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 z-40 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter text-white"
          >
            SIBIN<span className="text-indigo-500">.</span>
          </motion.a>
          <div className="hidden gap-8 text-sm font-medium text-slate-400 md:flex">
            {links.map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                href={`#${item.toLowerCase()}`}
                className="group relative transition-colors hover:text-white"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
          <button
            type="button"
            className="text-sm text-slate-300 md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <div className="flex flex-col gap-1 border-t border-slate-800 px-6 py-3 md:hidden">
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-md px-2 py-2 text-sm text-slate-300 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Playground />
        <Puzzle />

        <footer className="border-t border-slate-800 bg-slate-900/30 px-6 py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-slate-500">© 2026 Sibin Silu</p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="mailto:sibinthekkel@gmail.com" className="transition-colors hover:text-white">Email</a>
              <a href="tel:+919567049403" className="transition-colors hover:text-white">Call</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
