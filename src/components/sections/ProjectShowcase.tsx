import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Github } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../../data/profile';
import { cn } from '../../lib/utils';
import { accents, CardFace } from '../ui/ProjectCard';

interface ShowcaseProps {
  projects: Project[];
  /** Open a project's full details in the all-projects view below. */
  onOpen: (index: number) => void;
  /** Id of the element the "Skip" button jumps to. */
  skipTo: string;
}

/** Pin only where it helps: not for reduced-motion visitors, and not on screens too short to fit a slide. */
function usePinned() {
  const reduce = useReducedMotion();
  const query = '(min-height: 620px)';
  const [tall, setTall] = useState(() => typeof window === 'undefined' || window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setTall(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return !reduce && tall;
}

/**
 * Scroll positions where each slide sits still, with the moves between them.
 * Each slide holds for half of its share of the scroll, so there is time to read it.
 */
function holdFrames(count: number) {
  if (count < 2) return { input: [0, 1], output: ['0%', '0%'] };
  const segment = 1 / (count - 1);
  const input: number[] = [];
  const output: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const centre = i * segment;
    const x = `${(-i * 100) / count}%`;
    input.push(Math.max(0, centre - segment * 0.25), Math.min(1, centre + segment * 0.25));
    output.push(x, x);
  }
  return { input, output };
}

interface SlideProps {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number> | null;
  onOpen: () => void;
  slideRef: (el: HTMLDivElement | null) => void;
}

const Slide: React.FC<SlideProps> = ({ project, index, count, progress, onOpen, slideRef }) => {
  // How far this slide is from centre stage: -1 waiting on the right, 0 in view, 1 leaving to the left.
  const fallback = useSpring(0);
  const offset = useTransform(progress ?? fallback, (value) => value * (count - 1) - index);
  // The card swings only while it moves; at rest it sits flat.
  const rotateY = useTransform(offset, [-1, 0, 1], [32, 0, -32]);
  const cardX = useTransform(offset, [-1, 0, 1], ['30%', '0%', '-22%']);
  const textOpacity = useTransform(offset, [-0.6, 0, 0.6], [0, 1, 0]);
  const textY = useTransform(offset, [-1, 0, 1], [36, 0, -36]);
  const pinned = progress !== null;
  const { live, code, docs } = project.links;

  return (
    <div
      ref={slideRef}
      className={cn(
        'grid shrink-0 content-center items-center gap-6 sm:gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12',
        pinned && 'h-full',
      )}
      style={pinned ? { width: `${100 / count}%` } : undefined}
    >
      <motion.div
        style={pinned ? { x: cardX, rotateY, transformPerspective: 1300 } : undefined}
        className="relative w-full"
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open full details for ${project.name}`}
          className="group block w-full rounded-[1.6rem] text-left"
        >
          <div className="transition duration-300 group-hover:-translate-y-1">
            <CardFace project={project} large />
          </div>
        </button>
      </motion.div>

      <motion.div style={pinned ? { opacity: textOpacity, y: textY } : undefined} className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} · {project.focus}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">{project.name}</h3>
        <p className={cn('mt-1.5 text-sm sm:text-base', accents[project.accent].text)}>{project.tagline}</p>

        <dl className="mt-5 space-y-4 text-sm leading-relaxed sm:mt-6 sm:text-[15px]">
          <div>
            <dt className="font-semibold text-slate-100">Problem</dt>
            <dd className="mt-1 text-slate-400">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-100">What I built</dt>
            <dd className="mt-1 text-slate-400">{project.built}</dd>
          </div>
        </dl>

        <ul className="mt-5 hidden flex-wrap gap-2 lg:flex">
          {project.features.map((feature) => (
            <li key={feature.label} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
              {feature.label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium">
          <button
            type="button"
            onClick={onOpen}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-semibold text-ink-950 transition hover:bg-indigo-50"
          >
            Full details
            <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </button>
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-slate-200 hover:text-white">
              Live demo <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
          {code && (
            <a href={code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white">
              <Github size={14} aria-hidden /> Source
            </a>
          )}
          {docs && (
            <a href={docs} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white">
              <BookOpen size={14} aria-hidden /> API docs
            </a>
          )}
          {!live && !code && !docs && project.note && <span className="text-xs text-slate-400">{project.note}</span>}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * The top projects, pinned while you scroll: each scroll step slides the next one in horizontally,
 * its card swinging in like a wallet card. A progress bar shows where you are, and "Skip" jumps past it.
 */
export const ProjectShowcase: React.FC<ShowcaseProps> = ({ projects, onOpen, skipTo }) => {
  const pinned = usePinned();
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = projects.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const frames = holdFrames(count);
  const trackX = useTransform(progress, frames.input, frames.output);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(value * (count - 1)))));
  });

  // Only the slide on stage can take focus; the others are off to the side.
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const hidden = pinned && i !== active;
      el.toggleAttribute('inert', hidden);
      el.setAttribute('aria-hidden', String(hidden));
    });
  }, [active, pinned]);

  const goTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const travel = container.offsetHeight - window.innerHeight;
    const top = container.getBoundingClientRect().top + window.scrollY + (travel * index) / Math.max(1, count - 1);
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };
  const skip = () => document.getElementById(skipTo)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  const slides = projects.map((project, index) => (
    <Slide
      key={project.name}
      project={project}
      index={index}
      count={count}
      progress={pinned ? progress : null}
      onOpen={() => onOpen(index)}
      slideRef={(el) => (slideRefs.current[index] = el)}
    />
  ));

  if (!pinned) {
    return (
      <div ref={containerRef} className="space-y-20 md:space-y-28">
        {slides}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlighted projects"
      className="relative"
      style={{ height: `${count * 100}svh` }}
    >
      {/* Full-bleed sticky stage, so cards can slide off the screen edges rather than the content column. */}
      <div className="sticky top-0 mx-[calc(50%-50vw)] h-[100svh] overflow-hidden">
        <div className="mx-auto flex h-full max-w-6xl flex-col px-5 pb-6 pt-24 sm:px-8 md:pb-8">
          <div className="min-h-0 flex-1">
            <motion.div style={{ x: trackX, width: `${count * 100}%` }} className="flex h-full">
              {slides}
            </motion.div>
          </div>

          <div className="mt-4 flex items-center gap-3 sm:gap-5">
            <ol className="flex flex-1 gap-2 sm:gap-3">
              {projects.map((project, index) => (
                <li key={project.name} className="flex-1">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Go to ${project.name}`}
                    aria-current={index === active ? 'step' : undefined}
                    className="group w-full py-2 text-left"
                  >
                    <span className="block h-[3px] overflow-hidden rounded-full bg-white/10">
                      <span
                        className={cn(
                          'block h-full rounded-full bg-gradient-to-r from-indigo-300 to-emerald-300 transition-all duration-500',
                          index < active ? 'w-full opacity-60' : index === active ? 'w-full' : 'w-0',
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        'mt-2 hidden truncate font-mono text-[11px] uppercase tracking-[0.14em] transition-colors sm:block',
                        index === active ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-300',
                      )}
                    >
                      {project.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={skip}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-xs font-medium text-slate-200 transition hover:border-white/25 hover:bg-white/[0.08] sm:text-[13px]"
            >
              Skip to all projects
              <ArrowDown size={14} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
