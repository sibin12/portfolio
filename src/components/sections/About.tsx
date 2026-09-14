import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Briefcase, ShieldCheck, Camera } from 'lucide-react';
import { ShatterCard } from '../ui/ShatterCard';

const mainSkills = [
  'Node.js', 'PostgreSQL', 'MongoDB', 'Bun', 'Hono', 'TypeScript',
  'Redis', 'Docker', 'React', 'AWS', 'Nginx', 'Go (learning)',
];

const coreStack = [
  { name: 'Node.js', line: 'APIs' },
  { name: 'PostgreSQL', line: 'Data that stays correct' },
  { name: 'MongoDB', line: 'Flexible documents' },
  { name: 'Bun', line: 'Fast runtime' },
];

const practices = ['System design', 'Concurrency', 'Query plans', 'REST', 'JWT', 'CI/CD', 'Linux', 'Docker'];

export const About: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="about">
      <div className="mb-10">
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-white">
          <Target className="text-emerald-400" />
          The Evolution
        </h2>
        <p className="max-w-2xl text-lg text-slate-400">
          Software Engineer at Magadh Industries. I ship backend systems that stay fast under load.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {coreStack.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <p className="text-sm font-bold text-white">{item.name}</p>
            <p className="mt-1 text-xs text-indigo-300">{item.line}</p>
          </div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
        className="grid auto-rows-[220px] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-2 md:row-span-2">
          <ShatterCard gradient="indigo" className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-400">
                  <Zap size={28} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Technical Arsenal</h3>
              </div>
              <p className="mb-8 text-sm leading-relaxed text-slate-400">
                Node for APIs. Postgres when the data must stay correct. Mongo when the shape moves. Bun when the runtime should be fast.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {mainSkills.map((tag) => (
                <span key={tag} className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                  {tag}
                </span>
              ))}
            </div>
          </ShatterCard>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-1 md:row-span-2">
          <ShatterCard gradient="emerald" className="flex h-full flex-col justify-between p-8">
            <div className="mb-6 w-fit rounded-xl bg-emerald-500/20 p-3 text-emerald-400">
              <Briefcase size={28} />
            </div>
            <div className="space-y-6">
              <div className="relative border-l-2 border-emerald-500/30 pl-5">
                <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <h4 className="text-base font-bold text-white">Magadh Industries</h4>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Software Engineer</p>
                <p className="mt-1 text-[11px] italic text-slate-500">2024 - Present</p>
              </div>
              <div className="relative border-l-2 border-slate-700 pl-5">
                <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-slate-700" />
                <h4 className="text-sm font-bold text-slate-300">Brototype</h4>
                <p className="text-xs text-slate-500">MERN Specialist</p>
                <p className="mt-1 text-[11px] italic text-slate-600">Dec 2023</p>
              </div>
              <div className="relative border-l-2 border-slate-700 pl-5">
                <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-slate-700" />
                <h4 className="text-sm font-bold text-slate-300">MG University</h4>
                <p className="text-xs text-slate-500">BCA Graduate</p>
              </div>
            </div>
          </ShatterCard>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-2">
          <ShatterCard gradient="slate" className="flex h-full flex-col justify-center p-8">
            <div className="mb-4 flex items-center gap-4">
              <ShieldCheck size={24} className="text-slate-400" />
              <h3 className="text-lg font-bold text-white">How I work</h3>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {practices.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  {skill}
                </span>
              ))}
            </div>
          </ShatterCard>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-2">
          <ShatterCard gradient="indigo" className="group relative h-full overflow-hidden p-0">
            <div className="flex h-full w-full">
              {[
                'https://images.unsplash.com/photo-1551632432-c735eef3279c?q=80&w=400&h=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=400&h=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1529697210530-8c4bb1358ce5?q=80&w=400&h=300&auto=format&fit=crop',
                profileFallback,
              ].map((src) => (
                <div key={src} className="relative h-full w-1/4 overflow-hidden border-r border-white/5 last:border-0">
                  <img src={src} alt="" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/55 transition-opacity duration-700 group-hover:opacity-0">
              <div className="flex items-center gap-3">
                <Camera size={18} className="text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Snapshots</span>
              </div>
            </div>
          </ShatterCard>
        </motion.div>
      </motion.div>
    </section>
  );
};

const profileFallback =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&h=300&auto=format&fit=crop';
