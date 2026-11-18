import { ArrowUpRight, Github, Lock } from 'lucide-react';
import React from 'react';
import { archiveProjects, featuredProjects, type Accent, type Project } from '../../data/profile';
import { cn } from '../../lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { Tag } from '../ui/Tag';

// Full class strings so Tailwind's scanner keeps them.
const accents: Record<Accent, { field: string; orb: string; text: string }> = {
  indigo: { field: 'from-indigo-500/30 via-indigo-500/5', orb: 'bg-indigo-400/50', text: 'text-indigo-300' },
  emerald: { field: 'from-emerald-500/25 via-emerald-500/5', orb: 'bg-emerald-400/45', text: 'text-emerald-300' },
  amber: { field: 'from-amber-500/25 via-amber-500/5', orb: 'bg-amber-300/45', text: 'text-amber-200' },
  sky: { field: 'from-sky-500/25 via-sky-500/5', orb: 'bg-sky-400/45', text: 'text-sky-300' },
  rose: { field: 'from-rose-500/25 via-rose-500/5', orb: 'bg-rose-400/45', text: 'text-rose-300' },
  violet: { field: 'from-violet-500/30 via-violet-500/5', orb: 'bg-violet-400/50', text: 'text-violet-300' },
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur">
    <span className={cn('h-1.5 w-1.5 rounded-full', status === 'Live' ? 'bg-emerald-400' : 'bg-amber-300')} />
    {status}
  </span>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const accent = accents[project.accent];

  return (
    <GlassCard className="flex h-full flex-col p-2">
      <div className={cn('relative h-36 overflow-hidden rounded-[1.25rem] bg-gradient-to-br to-transparent', accent.field)}>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div aria-hidden className={cn('absolute -right-8 -top-10 h-36 w-36 rounded-full blur-2xl transition-transform duration-700 group-hover/card:scale-125', accent.orb)} />
        <div aria-hidden className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/10" />
        <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/[0.06]" />
        <span aria-hidden className="absolute bottom-3 left-4 font-display text-5xl font-bold tracking-tighter text-white/[0.12]">
          {initials(project.name)}
        </span>
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <StatusBadge status={project.status} />
          <span className="font-mono text-[11px] text-white/50">{project.year}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <h3 className="font-display text-xl font-semibold tracking-tight text-white">{project.name}</h3>
        <p className={cn('mt-1 text-sm', accent.text)}>{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5 pt-6 text-sm font-medium">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1 text-white transition-colors hover:text-indigo-200">
              Live site
              <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <Github size={14} />
              Source
            </a>
          )}
          {!project.live && !project.code && (
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Lock size={13} />
              Private while in progress
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export const Projects: React.FC = () => (
  <Section
    id="work"
    eyebrow="Selected work"
    title={
      <>
        Things I&apos;ve <span className="text-gradient">built lately.</span>
      </>
    }
    description="Personal projects from this year, from games you can play right now to full-stack apps still in progress."
  >
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map((project, index) => (
        <Reveal key={project.name} delay={(index % 3) * 0.06}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Archive</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">Where I started</h3>
        </div>
        <a href="https://github.com/sibin12?tab=repositories" target="_blank" rel="noreferrer" className="hidden items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white sm:inline-flex">
          All repositories
          <ArrowUpRight size={15} />
        </a>
      </div>

      <GlassCard interactive={false} className="overflow-hidden p-0">
        <ul className="divide-y divide-white/[0.05]">
          {archiveProjects.map((project) => (
            <li key={project.name}>
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[180px_1fr_220px_60px_20px]"
              >
                <span className="font-medium text-white">{project.name}</span>
                <span className="hidden text-sm text-slate-400 md:block">{project.description}</span>
                <span className="hidden flex-wrap gap-1.5 md:flex">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </span>
                <span className="hidden font-mono text-xs text-slate-500 md:block">{project.year}</span>
                <ArrowUpRight size={16} className="text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </li>
          ))}
        </ul>
      </GlassCard>
    </Reveal>
  </Section>
);
