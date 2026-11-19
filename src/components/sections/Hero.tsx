import {
  ArrowRight,
  Atom,
  Braces,
  Database,
  Gauge,
  Github,
  Layers,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Route,
  Server,
  Sparkles,
  Zap,
} from 'lucide-react';
import React from 'react';
import { heroChips, profile } from '../../data/profile';
import profileImg from '../../public/assets/images/profile.jpeg';
import { BounceField, type BounceItem } from '../ui/BounceField';
import { ButtonLink, IconLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

// Each chip borrows its tool's brand colour. Full class strings so Tailwind's scanner keeps them.
const chipLooks = {
  server: { Icon: Server, badge: 'bg-emerald-500/15 text-emerald-300', color: '#34d399' },
  leaf: { Icon: Leaf, badge: 'bg-lime-500/15 text-lime-300', color: '#a3e635' },
  sparkles: { Icon: Sparkles, badge: 'bg-violet-500/15 text-violet-300', color: '#a78bfa' },
  atom: { Icon: Atom, badge: 'bg-sky-500/15 text-sky-300', color: '#38bdf8' },
  braces: { Icon: Braces, badge: 'bg-blue-500/15 text-blue-300', color: '#60a5fa' },
  database: { Icon: Database, badge: 'bg-indigo-500/15 text-indigo-300', color: '#818cf8' },
  zap: { Icon: Zap, badge: 'bg-amber-500/15 text-amber-200', color: '#fbbf24' },
  gauge: { Icon: Gauge, badge: 'bg-cyan-500/15 text-cyan-300', color: '#22d3ee' },
  route: { Icon: Route, badge: 'bg-slate-400/15 text-slate-200', color: '#cbd5e1' },
  layers: { Icon: Layers, badge: 'bg-rose-500/15 text-rose-300', color: '#fb7185' },
};

const chips: BounceItem[] = heroChips.map(({ icon, label }) => {
  const { Icon, badge, color } = chipLooks[icon];
  return { label, badge, color, icon: <Icon size={13} /> };
});

const HeroVisual: React.FC = () => (
  <div className="relative mx-auto flex w-full max-w-[520px] flex-col gap-3 sm:flex-row lg:max-w-none">
    <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-indigo-500/30 via-sky-400/10 to-emerald-400/25 blur-3xl" />

    <div className="surface relative aspect-[4/5] overflow-hidden rounded-[2rem] p-2 sm:w-[60%] sm:shrink-0 lg:aspect-[2/3]">
      <img
        src={profileImg}
        alt={`Portrait of ${profile.name}`}
        width={1254}
        height={1254}
        className="h-full w-full rounded-[1.6rem] object-cover object-[50%_30%]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-ink-950/80 via-ink-950/0 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 lg:inset-x-4 xl:inset-x-5">
        <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
        <p className="text-xs text-slate-300 lg:text-[11px] xl:text-xs">
          {profile.role} · {profile.company}
        </p>
      </div>
    </div>

    <BounceField items={chips} label="Tools I use most" className="surface h-44 rounded-[2rem] sm:h-auto sm:flex-1">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <p aria-hidden className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
        Flick a chip
      </p>
    </BounceField>
  </div>
);

export const Hero: React.FC = () => (
  <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center px-5 pb-20 pt-32 sm:px-8">
    <div className="grid w-full items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <Reveal>
          <a href="#experience" className="chip gap-2 py-1.5 pl-2 pr-3 transition-colors hover:border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-slate-500">Currently</span>
            <span className="text-slate-200">{profile.currently}</span>
          </a>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.4rem]">
            {profile.headline} <span className="text-gradient animate-shimmer">{profile.headlineAccent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">{profile.intro}</p>
        </Reveal>

        <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href="#work" icon={<ArrowRight size={16} />}>
            View my work
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-3">
          <IconLink href={profile.github} label="GitHub">
            <Github size={17} />
          </IconLink>
          <IconLink href={profile.linkedin} label="LinkedIn">
            <Linkedin size={17} />
          </IconLink>
          <IconLink href={`mailto:${profile.email}`} label="Email">
            <Mail size={17} />
          </IconLink>
          <span className="mx-2 h-5 w-px bg-white/10" />
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={14} />
            {profile.location}
          </span>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <HeroVisual />
      </Reveal>
    </div>
  </section>
);
