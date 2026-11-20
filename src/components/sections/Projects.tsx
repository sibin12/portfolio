import { LayoutGroup, motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Github,
  Globe,
  Layers,
  LayoutTemplate,
  Lock,
  Server,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { archiveProjects, featuredProjects, type Project } from '../../data/profile';
import { cn } from '../../lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { accents, CardFace, statusText } from '../ui/ProjectCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { Tag } from '../ui/Tag';
import { ProjectShowcase } from './ProjectShowcase';

const focusIcon = { Backend: Server, 'Full-stack': Layers, Frontend: LayoutTemplate };

const spring = { type: 'spring', stiffness: 220, damping: 28 } as const;
const total = featuredProjects.length;
/** How many of the top projects get the pinned scroll showcase; all of them stay in the grid below. */
const SHOWCASE_COUNT = 3;

/* ------------------------------------------------------------------ grid */

interface GridProps {
  onOpen: (index: number) => void;
  buttonRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
}

const ProjectGrid: React.FC<GridProps> = ({ onOpen, buttonRefs }) => (
  <ul className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
    {featuredProjects.map((project, index) => (
      <motion.li
        key={project.name}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
      >
        <button
          ref={(el) => (buttonRefs.current[index] = el)}
          type="button"
          onClick={() => onOpen(index)}
          aria-controls="project-detail"
          className="group block w-full rounded-[1.4rem] text-left"
        >
          <motion.div layoutId={`card-${project.name}`} transition={spring} className="relative z-10">
            <div className="transition duration-300 group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
              <CardFace project={project} />
            </div>
          </motion.div>
          <span className="mt-3.5 flex items-center justify-between gap-3 px-1">
            <span className="truncate text-[13px] text-slate-400">
              <span className="text-slate-300">{project.focus}</span> · {project.stack.slice(0, 3).join(', ')}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-2 text-xs font-medium text-slate-100 transition group-hover:border-white/25 group-hover:bg-white/[0.08]">
              View details
              <ChevronRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </button>
      </motion.li>
    ))}
  </ul>
);

/* ------------------------------------------------------------------ detail */

interface TileProps {
  icon: React.ReactNode;
  label: string;
  caption: string;
  href?: string;
  onClick?: () => void;
  /** Greyed out, like an action a wallet card doesn't support. */
  disabled?: boolean;
}

/** Round action tile, like the controls that appear beside a card in a wallet app. */
const Tile: React.FC<TileProps> = ({ icon, label, caption, href, onClick, disabled }) => {
  const interactive = !disabled && (href || onClick);
  const body = (
    <>
      <span
        className={cn(
          'grid h-12 w-12 place-items-center rounded-full border shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] transition duration-300 sm:h-14 sm:w-14',
          disabled ? 'border-white/[0.06] bg-transparent text-slate-600' : 'border-white/[0.12] bg-white/[0.04] text-slate-100',
          interactive && 'group-hover:-translate-y-0.5 group-hover:border-white/30 group-hover:bg-white/[0.09]',
        )}
      >
        {icon}
      </span>
      <span className={cn('mt-2 text-[12.5px] font-medium leading-tight', disabled ? 'text-slate-500' : 'text-slate-100')}>{label}</span>
      <span className={cn('mt-0.5 text-[11px] leading-tight', disabled ? 'text-slate-600' : 'text-slate-400')}>{caption}</span>
    </>
  );
  const className = 'group flex w-full flex-col items-center rounded-2xl px-1 py-1 text-center';
  if (disabled) return <div className={className}>{body}</div>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {body}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={className}>
        {body}
      </button>
    );
  return <div className={className}>{body}</div>;
};

/** Always six tiles, so the grid stays even; links a project doesn't have are shown greyed out. */
const tilesFor = (project: Project, showDetails: () => void): TileProps[] => {
  const FocusIcon = focusIcon[project.focus];
  const { live, code, docs } = project.links;
  const inProgress = project.status === 'In progress';
  return [
    live
      ? { icon: <Globe size={20} aria-hidden />, label: 'Live demo', caption: 'Open the site', href: live }
      : { icon: <Globe size={20} aria-hidden />, label: 'Live demo', caption: inProgress ? 'Not deployed yet' : 'Not hosted now', disabled: true },
    code
      ? { icon: <Github size={20} aria-hidden />, label: 'Source code', caption: 'On GitHub', href: code }
      : { icon: <Lock size={19} aria-hidden />, label: 'Source code', caption: 'Private for now', disabled: true },
    docs
      ? { icon: <BookOpen size={20} aria-hidden />, label: 'API docs', caption: 'Postman', href: docs }
      : { icon: <ArrowDown size={20} aria-hidden />, label: 'Details', caption: 'Problem & build', onClick: showDetails },
    { icon: <CircleDot size={20} aria-hidden className={statusText[project.status]} />, label: project.status, caption: 'Status' },
    { icon: <FocusIcon size={20} aria-hidden />, label: project.focus, caption: 'Focus' },
    { icon: <CalendarDays size={20} aria-hidden />, label: project.year, caption: 'Year' },
  ];
};

const tileList: Variants = { show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } };
const tileItem: Variants = { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0, transition: spring } };

interface DetailProps {
  index: number;
  /** The project opened from the grid: only its card flies in from the grid. */
  entry: string;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const ProjectDetail = React.forwardRef<HTMLDivElement, DetailProps>(({ index, entry, onClose, onSelect }, ref) => {
  const project = featuredProjects[index];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstCard = useRef(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    firstCard.current = false;
  }, []);

  // On open, and whenever a switch removes the focused element, put focus on the project heading.
  useEffect(() => {
    const region = document.getElementById('project-detail');
    const focused = document.activeElement;
    if (!region?.contains(focused) || focused === document.body) headingRef.current?.focus({ preventScroll: true });
  }, [index]);

  // Escape goes back, arrow keys switch projects, while focus is in the detail view (or nowhere in particular).
  const step = (delta: number) => onSelect((index + delta + total) % total);
  const keys = useRef({ step, onClose });
  keys.current = { step, onClose };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const region = document.getElementById('project-detail');
      const focused = document.activeElement;
      if (focused && focused !== document.body && !region?.contains(focused)) return;
      if (event.key === 'Escape') keys.current.onClose();
      else if (event.key === 'ArrowRight') keys.current.step(1);
      else if (event.key === 'ArrowLeft') keys.current.step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const showDetails = () => headingRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  // The card flies in from the grid on open; after that, switching projects slides the next card in from the right.
  const cardInitial = firstCard.current ? { x: '0%' } : { x: '45%', opacity: 0 };

  return (
    <div ref={ref} id="project-detail" role="region" aria-labelledby="project-detail-title">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-100 transition hover:border-white/25 hover:bg-white/[0.08]"
        >
          <ArrowLeft size={15} aria-hidden />
          All projects
        </button>
        <div className="flex items-center gap-2">
          <span className="mr-1 font-mono text-xs text-slate-400" aria-live="polite">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous project"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <ChevronLeft size={17} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next project"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            <ChevronRight size={17} aria-hidden />
          </button>
        </div>
      </div>

      {/* Stage: the card settles flat, the tiles slide in beside it (below it on phones). */}
      <div className="relative mt-8 grid gap-7 sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] sm:items-center sm:gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="relative">
          <motion.div
            key={project.name}
            layoutId={project.name === entry ? `card-${project.name}` : undefined}
            transition={spring}
            className="relative z-10 w-full"
          >
            <motion.div
              initial={cardInitial}
              animate={{ x: '0%', opacity: 1 }}
              transition={{ ...spring, delay: firstCard.current ? 0.3 : 0 }}
            >
              {/* Clicking the open card again puts it back with the others. */}
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${project.name} and show all projects`}
                title="Back to all projects"
                className="group block w-full rounded-[1.6rem] text-left"
              >
                <div className="transition duration-300 group-hover:-translate-y-1 group-hover:brightness-110">
                  <CardFace project={project} large />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.ul key={project.name} variants={tileList} initial="hidden" animate="show" className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
          {tilesFor(project, showDetails).map((tile) => (
            <motion.li key={tile.label} variants={tileItem}>
              <Tile {...tile} />
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Picker, like the card strip at the bottom of a wallet app. */}
      <div className="mt-10 flex items-center gap-2.5 overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.025] p-2.5 [scrollbar-width:none]">
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/[0.06]"
        >
          All ({total})
        </button>
        {featuredProjects.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${item.name}`}
            aria-current={i === index ? 'true' : undefined}
            className={cn(
              'relative h-11 w-[74px] shrink-0 overflow-hidden rounded-lg border transition duration-300',
              i === index ? 'border-white/70 opacity-100 shadow-[0_0_0_3px_rgba(165,180,252,0.25)]' : 'border-white/10 opacity-60 hover:opacity-100',
            )}
          >
            {item.visual.kind === 'screenshot' ? (
              <img src={item.visual.image} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            ) : (
              <span className={cn('grid h-full w-full place-items-center bg-gradient-to-br to-ink-900 font-display text-sm font-bold text-white/80', accents[item.accent].field)}>
                {item.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Full details. */}
      <motion.div key={project.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} className="mt-10">
        <h3 id="project-detail-title" ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold tracking-tight text-white outline-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-3xl">
          {project.name}
        </h3>
        <p className={cn('mt-1 text-sm md:text-base', accents[project.accent].text)}>{project.tagline}</p>

        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 md:p-6">
            <dt className="eyebrow">Problem</dt>
            <dd className="mt-3 text-[15px] leading-relaxed text-slate-300">{project.problem}</dd>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 md:p-6">
            <dt className="eyebrow">What I built</dt>
            <dd className="mt-3 text-[15px] leading-relaxed text-slate-300">{project.built}</dd>
          </div>
        </dl>

        <h4 className="eyebrow mt-9">Key features</h4>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 md:p-5">
              <p className="text-sm font-semibold text-white">{feature.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{feature.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-1.5">
          <span className="sr-only">Technologies: </span>
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </motion.div>
    </div>
  );
});
ProjectDetail.displayName = 'ProjectDetail';

/* ------------------------------------------------------------------ archive */

const Archive: React.FC = () => (
  <Reveal className="mt-24">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow">Archive</p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">More projects</h3>
      </div>
      <a
        href="https://github.com/sibin12?tab=repositories"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
      >
        All repositories
        <ArrowUpRight size={15} aria-hidden />
      </a>
    </div>

    <GlassCard interactive={false} className="overflow-hidden p-0">
      <ul className="divide-y divide-white/[0.05]">
        {archiveProjects.map((project) => (
          <li
            key={project.name}
            className="grid gap-2 px-6 py-5 transition-colors hover:bg-white/[0.02] md:grid-cols-[150px_1fr_220px_48px_150px] md:items-center md:gap-4"
          >
            <span className="font-medium text-white">{project.name}</span>
            <span className="text-sm text-slate-400">{project.description}</span>
            <span className="hidden flex-wrap gap-1.5 md:flex">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </span>
            <span className="hidden font-mono text-xs text-slate-400 md:block">{project.year}</span>
            <span className="flex items-center gap-4 text-sm md:justify-end">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-slate-200 transition-colors hover:text-white">
                  Live
                  <ArrowUpRight size={14} aria-hidden />
                  <span className="sr-only">: {project.name}</span>
                </a>
              )}
              {project.code && (
                <a href={project.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
                  <Github size={14} aria-hidden />
                  Code
                  <span className="sr-only">: {project.name}</span>
                </a>
              )}
              {project.note && <span className="text-xs text-amber-200/80">{project.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  </Reveal>
);

/* ------------------------------------------------------------------ section */

export const Projects: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const [entry, setEntry] = useState('');
  const detailRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closedFrom = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const isOpen = active !== null;

  const open = (index: number) => {
    setEntry(featuredProjects[index].name);
    setActive(index);
  };
  const close = () => {
    closedFrom.current = active;
    setActive(null);
  };

  // Keep the stage in view when it opens, and return to the card (and its focus) when it closes.
  useEffect(() => {
    const behavior = reduce ? 'auto' : 'smooth';
    if (isOpen) {
      detailRef.current?.scrollIntoView({ behavior, block: 'start' });
    } else if (closedFrom.current !== null) {
      const button = buttonRefs.current[closedFrom.current];
      button?.focus({ preventScroll: true });
      button?.scrollIntoView({ behavior, block: 'center' });
      closedFrom.current = null;
    }
  }, [isOpen, reduce]);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={
        <>
          Things I&apos;ve <span className="text-gradient">built.</span>
        </>
      }
      description="Backend-heavy work first. Scroll through the highlights, or open any project below for the full details."
    >
      <ProjectShowcase projects={featuredProjects.slice(0, SHOWCASE_COUNT)} onOpen={open} skipTo="all-projects" />

      <div id="all-projects" className="pt-20 md:pt-28">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Index</p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">All projects</h3>
          </div>
          <p className="hidden text-sm text-slate-400 sm:block">Open a card for the full details.</p>
        </div>
        <LayoutGroup>
          {active !== null ? (
            <ProjectDetail ref={detailRef} index={active} entry={entry} onClose={close} onSelect={setActive} />
          ) : (
            <ProjectGrid onOpen={open} buttonRefs={buttonRefs} />
          )}
        </LayoutGroup>
      </div>
      <Archive />
    </Section>
  );
};
