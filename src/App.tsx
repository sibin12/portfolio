import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { About } from './components/sections/About';
import { Contact, Footer } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Navbar } from './components/sections/Navbar';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { Backdrop } from './components/ui/Backdrop';
import { Intro } from './components/ui/Intro';

const SEEN = 'sibin.intro-seen';

/** Play the opening cut once per browser session, and never for visitors who prefer reduced motion. */
const shouldPlayIntro = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SEEN) !== '1';
  } catch {
    return true;
  }
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300"
      style={{ scaleX }}
    />
  );
};

const App: React.FC = () => {
  const [playIntro] = useState(shouldPlayIntro);
  // `intro` is the key of the running intro (null when none); `ready` mounts the page behind it.
  const [intro, setIntro] = useState<number | null>(playIntro ? 1 : null);
  const [ready, setReady] = useState(!playIntro);

  const reveal = useCallback(() => setReady(true), []);
  const finish = useCallback(() => {
    setIntro(null);
    try {
      sessionStorage.setItem(SEEN, '1');
    } catch {
      /* ignore */
    }
  }, []);
  const replay = useCallback(() => {
    window.scrollTo({ top: 0 });
    setIntro(Date.now());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {intro !== null && <Intro key={intro} onReveal={reveal} onDone={finish} />}
      {ready && (
        <>
          <Backdrop />
          <ScrollProgress />
          <a
            href="#main"
            className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Navbar onReplay={replay} />
          <main id="main" tabIndex={-1} className="relative z-10 overflow-x-clip outline-none">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Services />
            <Skills />
            <Contact />
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </>
      )}
    </MotionConfig>
  );
};

export default App;
