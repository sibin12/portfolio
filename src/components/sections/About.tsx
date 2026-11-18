import { Bot, Database, Layers, Server } from 'lucide-react';
import React from 'react';
import { focusAreas, profile, stats } from '../../data/profile';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const icons = { server: Server, database: Database, layers: Layers, bot: Bot };

export const About: React.FC = () => (
  <Section
    id="about"
    eyebrow="About"
    title={
      <>
        Full-stack, <span className="text-gradient">backend first.</span>
      </>
    }
  >
    <div className="grid gap-5 lg:grid-cols-5">
      <Reveal className="lg:col-span-3">
        <GlassCard className="flex h-full flex-col p-7 md:p-10">
          <div className="flex-1 space-y-5 text-[15px] leading-relaxed text-slate-300 md:text-base">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">{stat.value}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-slate-500 md:text-[13px]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
        {focusAreas.map((area, index) => {
          const Icon = icons[area.icon];
          return (
            <Reveal key={area.title} delay={index * 0.06}>
              <GlassCard className="h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/20 to-emerald-500/10 text-indigo-200">
                  <Icon size={18} />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-white">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{area.body}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </Section>
);
