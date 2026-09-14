import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { Card } from '../ui/Card';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  signal: string;
  points: string[];
  tone: string;
  /** Delete the object to remove a sample. */
  draft?: boolean;
}

const projects: Project[] = [
  {
    title: 'GADGETGALAXY',
    description: 'E-commerce for gadgets. Checkout treats a retried Razorpay webhook as the same payment, not a second order.',
    tags: ['Node.js', 'MongoDB', 'Razorpay'],
    link: 'http://gadgetgalaxy.live',
    signal: 'Unique payment id',
    points: ['Idempotent webhooks', 'Catalog index', 'OTP rate limit'],
    tone: 'from-indigo-500/30 to-slate-900',
  },
  {
    title: 'LOOPNET',
    description: 'Video and chat. The server fans out to the room, and never proxies the video bytes.',
    tags: ['Socket.io', 'MongoDB', 'Firebase'],
    link: 'http://loopnet.gadgetgalaxy.live',
    signal: 'Room fan-out',
    points: ['Thread rooms', 'Session on handshake', 'Storage off origin'],
    tone: 'from-emerald-500/25 to-slate-900',
  },
  {
    title: 'Journal API',
    description: 'Auth fails before a document is read. Email uniqueness lives in the index, not a check-then-insert.',
    tags: ['Node.js', 'MongoDB', 'JWT'],
    link: '',
    signal: 'Auth first',
    points: ['httpOnly session', 'Unique email', 'Short-lived token'],
    tone: 'from-violet-500/25 to-slate-900',
  },
];

/** Magadh ERP. Private — no public link. */
const workProjects: Project[] = [
  {
    title: 'Magadh ERP',
    description: 'The internal ERP. I work across the whole system, not one module.',
    tags: ['Bun', 'Hono', 'PostgreSQL', 'Drizzle', 'Zod'],
    link: '',
    signal: 'Magadh',
    points: [
      'Orders, warehouse loading, and factory PDF reports',
      'Rewards, gift slabs, and point transactions',
      'Raw materials and vehicle entry',
      'Marketing visits',
    ],
    tone: 'from-sky-500/25 to-slate-900',
  },
];

const pages = [...workProjects, ...projects];

const ProjectBody: React.FC<{ project: Project }> = ({ project }) => (
  <>
    <div className={`relative mb-6 flex h-36 items-end overflow-hidden rounded-xl bg-gradient-to-br ${project.tone} p-4`}>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:16px_16px]" />
      <span className="relative font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/80">{project.signal}</span>
      {project.draft && (
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200">
          Draft
        </span>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="absolute right-3 top-3 rounded-full bg-slate-950/70 p-2 text-white transition-colors hover:bg-indigo-600"
          aria-label={`${project.title} live site`}
        >
          <ExternalLink size={16} />
        </a>
      )}
    </div>
    <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
    <p className="mb-4 text-sm leading-relaxed text-slate-400">{project.description}</p>
    <ul className="mb-6 space-y-1.5">
      {project.points.map((point) => (
        <li key={point} className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-1 w-1 rounded-full bg-indigo-400" />
          {point}
        </li>
      ))}
    </ul>
    <div className="mt-auto flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <span key={tag} className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
          {tag}
        </span>
      ))}
    </div>
  </>
);

const Sheet: React.FC<{ project: Project }> = ({ project }) => (
  <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
    <ProjectBody project={project} />
  </article>
);

export const Projects: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [turning, setTurning] = useState<Project | null>(null);
  const current = pages[index];
  const behind = Math.min(3, pages.length - 1);

  const turn = () => {
    if (turning || pages.length < 2) return;
    setTurning(current);
    setIndex((value) => (value + 1) % pages.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="projects">
      <div className="mb-16">
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-white">
          <Layers className="text-indigo-400" />
          Featured Work
        </h2>
        <p className="max-w-2xl text-slate-400 md:hidden">Tap the page to open the next one.</p>
        <p className="hidden max-w-2xl text-slate-400 md:block">Systems, not feature lists. Each one has a decision that keeps it correct under retry or load.</p>
      </div>

      <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
        {pages.map((project, item) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: item * 0.08, duration: 0.45 }}
          >
            <Card className="flex h-full flex-col">
              <ProjectBody project={project} />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-md md:hidden">
        <div className="relative h-[540px] [perspective:1400px]">
          {Array.from({ length: behind }, (_, step) => (
            <div
              key={step}
              aria-hidden
              className="absolute inset-0 rounded-2xl border border-slate-800 bg-slate-800/80"
              style={{ transform: `translate(${(step + 1) * 14}px, ${(step + 1) * 10}px)` }}
            />
          ))}

          <div
            role="button"
            tabIndex={0}
            onClick={turn}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                turn();
              }
            }}
            className="absolute inset-0 cursor-pointer text-left"
            aria-label={`Open next page. Now showing ${current.title}`}
          >
            <Sheet project={current} />
          </div>

          {turning && (
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 z-10 origin-left cursor-pointer border-0 bg-transparent p-0 text-left"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -155 }}
              transition={{ duration: 0.7, ease: [0.45, 0.02, 0.2, 1] }}
              onAnimationComplete={() => setTurning(null)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="h-full [backface-visibility:hidden]">
                <Sheet project={turning} />
              </div>
            </motion.button>
          )}

        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          {index + 1} / {pages.length}
        </p>
      </div>
    </section>
  );
};
