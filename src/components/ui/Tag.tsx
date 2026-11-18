import React from 'react';
import { cn } from '../../lib/utils';

export const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-[10.5px] font-medium tracking-wide text-slate-400',
      className,
    )}
  >
    {children}
  </span>
);
