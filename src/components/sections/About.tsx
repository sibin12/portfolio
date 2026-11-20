import React from 'react';
import { profile, quickFacts, stats } from '../../data/profile';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

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
        <GlassCard interactive={false} className="flex h-full flex-col p-7 md:p-10">
          <div className="flex-1 space-y-5 text-[15px] leading-[1.75] text-slate-300 md:text-base">
            {profile.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-7">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-last mt-1.5 text-xs leading-snug text-slate-400 md:text-[13px]">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-2">
        <GlassCard interactive={false} className="h-full p-7 md:p-8">
          <h3 className="eyebrow">At a glance</h3>
          <dl className="mt-6 divide-y divide-white/[0.06]">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[130px_1fr] sm:gap-4 lg:grid-cols-1 lg:gap-1 xl:grid-cols-[130px_1fr] xl:gap-4">
                <dt className="text-[13px] text-slate-400">{fact.label}</dt>
                <dd className="text-sm font-medium leading-snug text-slate-100">
                  {fact.value}
                  {fact.note && <span className="mt-0.5 block text-xs font-normal text-slate-400">{fact.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </Reveal>
    </div>
  </Section>
);
