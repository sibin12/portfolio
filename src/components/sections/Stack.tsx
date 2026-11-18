import React from 'react';
import { skillGroups } from '../../data/profile';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

export const Stack: React.FC = () => (
  <Section
    id="stack"
    eyebrow="Toolkit"
    title={
      <>
        The stack I <span className="text-gradient">reach for.</span>
      </>
    }
  >
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, index) => (
        <Reveal key={group.title} delay={(index % 3) * 0.06}>
          <GlassCard className="h-full p-6">
            <p className="eyebrow text-slate-500">{group.title}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip text-[13px]">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  </Section>
);
