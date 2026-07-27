import React from 'react';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { About } from './components/sections/About';
import { GlobalPixelEffect } from './components/ui/GlobalPixelEffect';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Global Interactive Pixel Cursor Effect */}
      <GlobalPixelEffect />

      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 origin-left shadow-[0_0_10px_rgba(79,70,229,0.5)]"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 z-40 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter text-white"
          >
            PORTFOLIO<span className="text-indigo-500">.</span>
          </motion.span>
          <div className="hidden gap-8 text-sm font-medium text-slate-400 md:flex">
            {['Home', 'About', 'Projects'].map((item, i) => (
              <motion.a 
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        
        <footer className="border-t border-slate-800 py-12 px-6 bg-slate-900/30">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">
              © 2026 Engineered with Precision.
            </p>
            <div className="flex gap-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors text-sm">GitHub</a>
              <a href="#" className="hover:text-white transition-colors text-sm">LinkedIn</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
