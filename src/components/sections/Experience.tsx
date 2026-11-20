import { GraduationCap } from 'lucide-react';
import React from 'react';
import { education, experience, type Role } from '../../data/profile';
import { cn } from '../../lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { Tag } from '../ui/Tag';

const RoleCard: React.FC<{ role: Role }> = ({ role }) => (
  <article className="relative grid gap-4 md:grid-cols-[170px_1fr] md:gap-10">
    <div className="relative md:pt-9">
      <span
        aria-hidden
        className={cn(
          'absolute -left-[5px] top-1.5 hidden h-[11px] w-[11px] rounded-full ring-4 ring-ink-950 md:top-[2.6rem] md:block',
          role.current ? 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]' : 'bg-slate-600',
        )}
      />
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400 md:pl-6">{role.period}</p>
    </div>

    <GlassCard interactive={false} className={cn('p-6 md:p-9', !role.current && 'md:p-8')}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className={cn('font-display font-semibold tracking-tight text-white', role.current ? 'text-2xl' : 'text-xl')}>{role.company}</h3>
          <p className="mt-1 text-sm text-indigo-200/90">
            {role.role}
            <span className="text-slate-500"> · </span>
            <span className="text-slate-400">{role.type}</span>
          </p>
        </div>
        {role.current && (
          <span className="chip gap-1.5 border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Current
          </span>
        )}
      </div>

      <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-slate-300">{role.summary}</p>

      <ul className={cn('mt-7 grid gap-x-10 gap-y-5', role.highlights.length > 3 && 'md:grid-cols-2')}>
        {role.highlights.map((item) => (
          <li key={item.title} className="relative pl-5">
            <span aria-hidden className="absolute left-0 top-[0.55rem] h-1.5 w-1.5 rounded-full bg-indigo-300/70" />
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-6">
        <span className="sr-only">Technologies: </span>
        {role.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </GlassCard>
  </article>
);

export const Experience: React.FC = () => (
  <Section
    id="experience"
    eyebrow="Experience"
    title={
      <>
        Where I&apos;ve been <span className="text-gradient">building.</span>
      </>
    }
    description="Most of my work lives in private company systems, so this is a high-level view of what I build and maintain."
  >
    <div className="relative space-y-8">
      <span
        aria-hidden
        className="absolute bottom-0 left-0 top-0 hidden w-px bg-gradient-to-b from-emerald-400/50 via-white/10 to-transparent md:block"
      />
      {experience.map((role) => (
        <Reveal key={role.company}>
          <RoleCard role={role} />
        </Reveal>
      ))}

      <Reveal>
        <div className="grid gap-4 md:grid-cols-[170px_1fr] md:gap-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400 md:pl-6 md:pt-7">{education.period}</p>
          <GlassCard interactive={false} className="flex items-center gap-5 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-slate-300">
              <GraduationCap size={20} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-white">{education.degree}</h3>
              <p className="mt-0.5 text-sm text-slate-400">{education.school}</p>
            </div>
          </GlassCard>
        </div>
      </Reveal>
    </div>
  </Section>
);
