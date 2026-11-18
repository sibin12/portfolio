import React from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, eyebrow, title, description, className, children }) => (
  <section id={id} className={cn('relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32', className)}>
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">{description}</p>}
    </Reveal>
    {children}
  </section>
);
