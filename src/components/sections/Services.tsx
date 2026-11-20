import { ArrowRight, Database, Layers, Plug, Server, Wrench } from 'lucide-react';
import React from 'react';
import { profile, services } from '../../data/profile';
import { ButtonLink } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const icons = { server: Server, database: Database, plug: Plug, wrench: Wrench, layers: Layers };

export const Services: React.FC = () => (
  <Section
    id="services"
    eyebrow="Freelance"
    title={
      <>
        How I can <span className="text-gradient">help.</span>
      </>
    }
    description="I take on freelance work where the backend matters most, and complete applications when a project needs a frontend too."
  >
    <Reveal>
      <GlassCard interactive={false} className="overflow-hidden p-0">
        <ul className="divide-y divide-white/[0.06]">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.title}
                className="grid gap-3 px-6 py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[44px_1fr] sm:gap-5 md:grid-cols-[44px_minmax(0,300px)_1fr] md:items-center md:px-8"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-indigo-200">
                  <Icon size={19} aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                  <span className="mr-2 font-mono text-xs font-normal text-slate-500">0{index + 1}</span>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400 sm:col-start-2 md:col-start-auto md:text-[15px]">{service.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/[0.06] bg-white/[0.02] px-6 py-6 sm:flex-row sm:items-center md:px-8">
          <p className="text-[15px] text-slate-300">
            Have an API, database or integration that needs work? <span className="text-slate-400">Tell me what you’re building.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#contact" icon={<ArrowRight size={16} />} className="shrink-0">
              Discuss a project
            </ButtonLink>
            <ButtonLink href={`mailto:${profile.email}?subject=Freelance%20project`} variant="secondary" className="shrink-0">
              Email me
            </ButtonLink>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  </Section>
);
