import { Cloud, Code2, Database, LayoutTemplate, Server, Sparkles } from 'lucide-react';
import React from 'react';
import { skillGroups, type SkillGroup } from '../../data/profile';
import { cn } from '../../lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const icons = { server: Server, database: Database, layout: LayoutTemplate, code: Code2, cloud: Cloud, sparkles: Sparkles };

const tierStyles: Record<SkillGroup['tier'], { card: string; icon: string; chip: string }> = {
  primary: {
    card: 'p-7 md:p-8 border-indigo-300/[0.14] bg-gradient-to-b from-indigo-400/[0.07] to-white/[0.02]',
    icon: 'h-11 w-11 bg-indigo-400/15 text-indigo-200 border-indigo-300/20',
    chip: 'border-indigo-200/15 bg-indigo-300/[0.07] px-3.5 py-1.5 text-sm text-slate-100',
  },
  secondary: {
    card: 'p-7 md:p-8',
    icon: 'h-11 w-11 bg-sky-400/10 text-sky-200 border-white/[0.07]',
    chip: 'border-white/[0.09] bg-white/[0.04] px-3.5 py-1.5 text-sm text-slate-200',
  },
  supporting: {
    card: 'p-6',
    icon: 'h-9 w-9 bg-white/[0.04] text-slate-300 border-white/[0.07]',
    chip: 'border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[13px] text-slate-300',
  },
};

const GroupCard: React.FC<{ group: SkillGroup; className?: string }> = ({ group, className }) => {
  const Icon = icons[group.icon];
  const style = tierStyles[group.tier];
  return (
    <GlassCard interactive={false} className={cn('h-full', style.card, className)}>
      <div className="flex items-center gap-3">
        <span className={cn('grid shrink-0 place-items-center rounded-xl border', style.icon)}>
          <Icon size={group.tier === 'supporting' ? 16 : 19} aria-hidden />
        </span>
        <h3 className={cn('font-display font-semibold tracking-tight text-white', group.tier === 'supporting' ? 'text-base' : 'text-lg')}>
          {group.title}
        </h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item.name} className={cn('inline-flex items-center gap-2 rounded-full border font-medium', style.chip)}>
            {item.name}
            {item.note && (
              <span className="rounded-full bg-amber-300/10 px-1.5 py-px font-mono text-[10px] uppercase tracking-wider text-amber-200/90">
                {item.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
};

export const Skills: React.FC = () => {
  const byTier = (tier: SkillGroup['tier']) => skillGroups.filter((group) => group.tier === tier);

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          Backend at the core, <span className="text-gradient">full stack around it.</span>
        </>
      }
      description="The tools I use in production and in my own projects. Backend and databases are where I spend most of my time."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {byTier('primary').map((group, index) => (
          <Reveal key={group.title} delay={index * 0.06}>
            <GroupCard group={group} />
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5">
        {byTier('secondary').map((group) => (
          <Reveal key={group.title}>
            <GroupCard group={group} />
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {byTier('supporting').map((group, index) => (
          <Reveal key={group.title} delay={index * 0.06}>
            <GroupCard group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
