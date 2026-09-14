import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { Card } from '../ui/Card';

const projects = [
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

export const Projects: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24" id="projects">
      <div className="mb-16">
        <h2 className="mb-4 flex items-center gap-3 text-3xl font-bold text-white">
          <Layers className="text-indigo-400" />
          Featured Work
        </h2>
        <p className="max-w-2xl text-slate-400">Systems, not feature lists. Each one has a decision that keeps it correct under retry or load.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
          >
            <Card className="flex h-full flex-col">
              <div className={`relative mb-6 flex h-40 items-end overflow-hidden rounded-xl bg-gradient-to-br ${project.tone} p-4`}>
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:16px_16px]" />
                <span className="relative font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/80">{project.signal}</span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
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
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
