import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Phone, Sparkles } from 'lucide-react';
import React from 'react';
import profileImg from '../../public/assets/images/profile.jpeg';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const imgX = useTransform(mouseX, [-0.5, 0.5], ['4%', '-4%']);
  const imgY = useTransform(mouseY, [-0.5, 0.5], ['4%', '-4%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-20" id="home">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute right-[12%] top-24 -z-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px]" />

      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 flex flex-col items-start text-left lg:order-1 lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-400"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
            </span>
            Backend Systems Engineer
          </motion.div>

          <h1 className="mb-4 text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl">
            Sibin Silu<span className="text-indigo-500">.</span>
            <br />
            <span className="text-3xl font-bold text-slate-500 md:text-5xl">Bun · Hono · Postgres</span>
          </h1>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Software Engineer at Magadh. I also come from MERN — Node, Express, MongoDB, and React.
          </p>

          <div className="mb-10 flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="md"
              className="group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="text-slate-400 hover:text-white"
              onClick={() => document.getElementById('play')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Say hi
            </Button>
          </div>

          <div className="flex gap-6 text-slate-500">
            <motion.a whileHover={{ y: -3, color: '#fff' }} href="#" className="transition-all" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a whileHover={{ y: -3, color: '#fff' }} href="#" className="transition-all" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a whileHover={{ y: -3, color: '#fff' }} href="tel:+919567049403" className="transition-all" aria-label="Phone">
              <Phone className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end"
        >
          <div
            className="group relative h-72 w-72 md:h-80 md:w-80"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
          >
            <div className="absolute -inset-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 blur-[1px] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute -inset-6 rounded-full bg-indigo-500/20 blur-2xl" />

            <div className="relative h-full w-full overflow-hidden rounded-full border border-slate-600 bg-[#e8eaee] shadow-[0_20px_80px_rgba(79,70,229,0.25)]">
              <motion.img
                style={{ x: imgX, y: imgY, scale: 1.08 }}
                src={profileImg}
                alt="Sibin Silu"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-slate-950/70 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90">
                  <Sparkles className="h-3 w-3 text-indigo-300" />
                  Sibin Silu
                </div>
              </div>
            </div>

            <div className="absolute -left-1 top-8 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-indigo-400" />
            <div className="absolute -right-1 bottom-8 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-emerald-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
