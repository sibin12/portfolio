import { ArrowRight, Braces, Database, Github, Linkedin, Mail, MapPin, Server, Sparkles } from 'lucide-react';
import React from 'react';
import { heroChips, profile } from '../../data/profile';
import { cn } from '../../lib/utils';
import profileImg from '../../public/assets/images/profile.jpeg';
import { ButtonLink, IconLink } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

const chipIcons = { server: Server, database: Database, sparkles: Sparkles, braces: Braces };

// Corners around the portrait, staggered so the chips never bob in sync.
const chipPlaces = [
  { position: '-left-8 top-10', tint: 'bg-emerald-500/15 text-emerald-300' },
  { position: '-right-8 top-32 [animation-delay:-1.5s]', tint: 'bg-sky-500/15 text-sky-300' },
  { position: '-left-10 bottom-32 [animation-delay:-3s]', tint: 'bg-violet-500/15 text-violet-300' },
  { position: '-right-6 bottom-10 [animation-delay:-4.5s]', tint: 'bg-indigo-500/15 text-indigo-300' },
];

const Portrait: React.FC = () => (
  <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] lg:max-w-[420px]">
    <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-indigo-500/30 via-sky-400/10 to-emerald-400/25 blur-3xl" />

    <div className="surface relative h-full overflow-hidden rounded-[2rem] p-2">
      <img
        src={profileImg}
        alt={`Portrait of ${profile.name}`}
        width={1254}
        height={1254}
        className="h-full w-full rounded-[1.6rem] object-cover object-[50%_30%]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-ink-950/80 via-ink-950/0 to-transparent" />
      <div className="absolute inset-x-6 bottom-6">
        <p className="font-display text-lg font-semibold text-white">{profile.name}</p>
        <p className="text-xs text-slate-300">
          {profile.role} · {profile.company}
        </p>
      </div>
    </div>

    {heroChips.map((chip, index) => {
      const Icon = chipIcons[chip.icon];
      const place = chipPlaces[index % chipPlaces.length];
      return (
        <div
          key={chip.label}
          className={cn(
            'surface absolute hidden animate-float items-center gap-2.5 whitespace-nowrap rounded-2xl bg-ink-900/85 px-3.5 py-2.5 text-xs font-medium text-slate-200 sm:flex',
            place.position,
          )}
        >
          <span className={cn('grid h-7 w-7 place-items-center rounded-lg', place.tint)}>
            <Icon size={14} />
          </span>
          {chip.label}
        </div>
      );
    })}
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
        <Portrait />
      </Reveal>
    </div>
  </section>
);
