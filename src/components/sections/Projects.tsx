import { ArrowUpRight, Check, Github, Hammer } from 'lucide-react';
import React from 'react';
import { archiveProjects, liveProjects, workshopProjects, type Accent, type LiveProject } from '../../data/profile';
import { cn } from '../../lib/utils';
import { ButtonLink } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { Tag } from '../ui/Tag';

// Full class strings so Tailwind's scanner keeps them.
const accents: Record<Accent, { glow: string; text: string; dot: string }> = {
  indigo: { glow: 'from-indigo-500/35', text: 'text-indigo-300', dot: 'bg-indigo-400' },
  emerald: { glow: 'from-emerald-500/30', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  amber: { glow: 'from-amber-500/30', text: 'text-amber-200', dot: 'bg-amber-300' },
  sky: { glow: 'from-sky-500/30', text: 'text-sky-300', dot: 'bg-sky-400' },
  rose: { glow: 'from-rose-500/30', text: 'text-rose-300', dot: 'bg-rose-400' },
  violet: { glow: 'from-violet-500/35', text: 'text-violet-300', dot: 'bg-violet-400' },
};

/** "https://sibin12.github.io/brainplay/" → "sibin12.github.io/brainplay" for the fake address bar. */
const displayUrl = (href: string) => {
  const url = new URL(href);
  return (url.host + url.pathname).replace(/\/$/, '');
};

const BrowserFrame: React.FC<{ project: LiveProject }> = ({ project }) => (
  <a
    href={project.live}
    target="_blank"
    rel="noreferrer"
    aria-label={`Open ${project.name}`}
    className="group/shot relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
  >
    <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
      <div className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <span className="flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 text-center font-mono text-[11px] text-slate-400">
        {displayUrl(project.live)}
      </span>
      <ArrowUpRight size={14} className="text-slate-500 transition-colors group-hover/shot:text-white" />
    </div>
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={project.image}
        alt={`Screenshot of ${project.name}`}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/shot:opacity-100">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-950">
          Try it live <ArrowUpRight size={14} />
        </span>
      </div>
    </div>
  </a>
);

const Showcase: React.FC<{ project: LiveProject; index: number }> = ({ project, index }) => {
  const accent = accents[project.accent];
  const flip = index % 2 === 1;

  return (
    <article className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <div aria-hidden className={cn('absolute -inset-x-10 -inset-y-6 -z-10 bg-gradient-to-br to-transparent opacity-50 blur-3xl', accent.glow, flip && 'lg:bg-gradient-to-bl')} />

      <div className={cn(flip && 'lg:order-2')}>
        <BrowserFrame project={project} />
      </div>

      <div className={cn(flip && 'lg:order-1')}>
        <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-white/15" />
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
          <span>· {project.year}</span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">{project.name}</h3>
        <p className={cn('mt-2 text-base', accent.text)}>{project.tagline}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{project.description}</p>

        <ul className="mt-5 space-y-2.5">
          {project.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
              <Check size={16} className={cn('mt-0.5 shrink-0', accent.text)} />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ButtonLink href={project.live} icon={<ArrowUpRight size={16} />}>
            Open live
          </ButtonLink>
          <ButtonLink href={project.code} variant="secondary">
            <Github size={15} />
            Source
          </ButtonLink>
        </div>
      </div>
    </article>
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
    description="Personal projects you can open and use right now, plus what I am building next. My company work is private, so it lives in Experience."
  >
    <div className="space-y-24 md:space-y-32">
      {liveProjects.map((project, index) => (
        <Reveal key={project.name}>
          <Showcase project={project} index={index} />
        </Reveal>
      ))}
    </div>

    <Reveal className="mt-28">
      <div className="mb-6">
        <p className="eyebrow">In the workshop</p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">Being built right now</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {workshopProjects.map((project) => (
          <GlassCard key={project.name} className="flex h-full flex-col p-5">
            <div className="flex items-center justify-between">
              <span className={cn('h-2 w-2 rounded-full', accents[project.accent].dot)} />
              <span className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-wider text-amber-200/80">
                <Hammer size={11} />
                In progress
              </span>
            </div>
            <h4 className="mt-4 font-display text-base font-semibold text-white">{project.name}</h4>
            <p className={cn('mt-1 text-xs', accents[project.accent].text)}>{project.tagline}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </Reveal>

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
