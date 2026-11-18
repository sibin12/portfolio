import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import React from 'react';
import { About } from './components/sections/About';
import { Contact, Footer } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Navbar } from './components/sections/Navbar';
import { Projects } from './components/sections/Projects';
import { Stack } from './components/sections/Stack';
import { Backdrop } from './components/ui/Backdrop';

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

const App: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <Backdrop />
    <ScrollProgress />
    <Navbar />
    <main className="relative z-10 overflow-x-clip">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Stack />
      <Contact />
    </main>
    <div className="relative z-10">
      <Footer />
    </div>
  </MotionConfig>
);

export default App;
