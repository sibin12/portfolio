import React, { useLayoutEffect, useRef, useState } from 'react';
import type { Accent, Project, Relation } from '../../data/profile';
import { cn } from '../../lib/utils';

/*
 * Project card pieces shared by the scroll showcase and the all-projects grid and detail view.
 */

// Full class strings so Tailwind's scanner keeps them.
export const accents: Record<Accent, { text: string; field: string }> = {
  indigo: { text: 'text-indigo-300', field: 'from-indigo-500/30' },
  emerald: { text: 'text-emerald-300', field: 'from-emerald-500/25' },
  amber: { text: 'text-amber-200', field: 'from-amber-500/25' },
  sky: { text: 'text-sky-300', field: 'from-sky-500/25' },
  rose: { text: 'text-rose-300', field: 'from-rose-500/25' },
  violet: { text: 'text-violet-300', field: 'from-violet-500/30' },
};

export const statusDot: Record<Project['status'], string> = {
  Live: 'bg-emerald-400',
  Completed: 'bg-indigo-300',
  'In progress': 'bg-amber-300',
};

export const statusText: Record<Project['status'], string> = {
  Live: 'text-emerald-400',
  Completed: 'text-indigo-300',
  'In progress': 'text-amber-300',
};

/** A compact entity-relationship view: one row per relation, cardinality on the connector. */
export const ModelDiagram: React.FC<{ relations: Relation[]; compact?: boolean }> = ({ relations, compact }) => {
  const pill = cn(
    'truncate rounded-md border border-white/10 bg-ink-950/85 font-mono text-slate-100',
    compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-[11.5px]',
  );
  return (
    <figure>
      {!compact && <figcaption className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300/80">Data model</figcaption>}
      <ul className={compact ? 'space-y-1.5' : 'space-y-2.5'}>
        {relations.map((relation) => (
          <li key={`${relation.from}-${relation.to}`} className="grid grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] items-center gap-1.5">
            <span className={pill}>{relation.from}</span>
            <span className="relative flex min-w-[40px] items-center">
              <span aria-hidden className="h-px w-full bg-gradient-to-r from-white/25 via-indigo-300/50 to-white/25" />
              <span
                className={cn(
                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-ink-900 px-1 font-mono font-medium text-indigo-200',
                  compact ? 'text-[9px]' : 'text-[10px]',
                )}
              >
                {relation.kind}
                {!compact && relation.note && <span className="font-normal text-slate-400"> · {relation.note}</span>}
              </span>
            </span>
            <span className={pill}>{relation.to}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
};

export const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/75 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur">
    <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', statusDot[status])} />
    {status}
  </span>
);

/**
 * The card artwork, drawn at a fixed design width: compact (360px) for grid cards,
 * large (520px) for the showcase and detail stage.
 */
const CardArt: React.FC<{ project: Project; size: 'compact' | 'large' }> = ({ project, size }) => {
  const { visual } = project;
  const large = size === 'large';
  return (
    <div
      className={cn(
        'relative aspect-[1.6/1] w-full overflow-hidden border border-white/[0.12] bg-ink-900 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.95)]',
        large ? 'rounded-[1.6rem]' : 'rounded-[1.25rem]',
      )}
    >
      {visual.kind === 'screenshot' ? (
        <>
          <img
            src={visual.image}
            alt={visual.alt}
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
        </>
      ) : (
        <>
          <div aria-hidden className={cn('absolute inset-0 bg-gradient-to-br via-ink-900/60 to-ink-900', accents[project.accent].field)} />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className={cn('absolute', large ? 'inset-x-6 top-14' : 'inset-x-4 top-11')}>
            <ModelDiagram relations={visual.relations} compact={!large} />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent" />
        </>
      )}

      {/* A soft sheen, like light across a real card. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent" />

      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
        <StatusBadge status={project.status} />
        <span className="rounded-full bg-ink-950/60 px-2 py-0.5 font-mono text-[11px] text-slate-300 backdrop-blur">{project.year}</span>
      </div>

      <div className={cn('absolute', large ? 'inset-x-6 bottom-5' : 'inset-x-4 bottom-3.5')}>
        <p className={cn('font-display font-semibold tracking-tight text-white', large ? 'text-2xl' : 'text-lg')}>{project.name}</p>
        <p className={cn('truncate text-slate-300', large ? 'text-sm' : 'text-xs')}>{project.tagline}</p>
      </div>
    </div>
  );
};

const DESIGN_WIDTH = { compact: 360, large: 520 } as const;

/**
 * The project as a card: screenshot or data model as the artwork, name and tagline printed on it.
 * Grid cards render at their natural size. Large cards are drawn at a fixed design width and scaled
 * to fit, like an image, so they look the same at any size and their diagram never runs into the name.
 */
export const CardFace: React.FC<{ project: Project; large?: boolean }> = ({ project, large }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!large || !el) return undefined;
    // offsetWidth and contentRect ignore transforms, so a tilt or layout animation doesn't skew the measurement.
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [large]);

  if (!large) return <CardArt project={project} size="compact" />;

  // Small stages (phones) use the compact artwork, which reads better when shrunk.
  const size = width > 0 && width < 420 ? 'compact' : 'large';
  const base = DESIGN_WIDTH[size];
  return (
    <div ref={ref} className="relative aspect-[1.6/1] w-full">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: base, transform: `scale(${width ? width / base : 1})` }}>
        <CardArt project={project} size={size} />
      </div>
    </div>
  );
};
