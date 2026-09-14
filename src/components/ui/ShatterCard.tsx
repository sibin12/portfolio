import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ShatterCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'indigo' | 'emerald' | 'slate';
}

export const ShatterCard: React.FC<ShatterCardProps> = ({
  children,
  className,
  gradient = 'indigo',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const pixels = Array.from({ length: 8 });

  const gradientStyles = {
    indigo: 'from-indigo-500/20 via-transparent to-indigo-500/5 border-indigo-500/30',
    emerald: 'from-emerald-500/20 via-transparent to-emerald-500/5 border-emerald-500/30',
    slate: 'from-slate-500/20 via-transparent to-slate-500/5 border-slate-500/30',
  };

  const hoverGlows = {
    indigo: 'group-hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] group-hover:border-indigo-500/60',
    emerald: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/60',
    slate: 'group-hover:shadow-[0_0_40px_rgba(100,116,139,0.2)] group-hover:border-slate-500/60',
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-slate-900/60 shadow-xl backdrop-blur-xl transition-all duration-700',
        gradientStyles[gradient],
        hoverGlows[gradient],
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-700 group-hover:opacity-70',
          gradient === 'indigo'
            ? 'from-indigo-500/10 to-transparent'
            : gradient === 'emerald'
              ? 'from-emerald-500/10 to-transparent'
              : 'from-slate-500/10 to-transparent'
        )}
      />

      <AnimatePresence>
        {isHovered &&
          pixels.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
              transition={{ duration: 0.9, ease: 'circOut', delay: i * 0.04 }}
              className={cn(
                'pointer-events-none absolute z-20 h-1 w-1',
                gradient === 'indigo'
                  ? 'bg-indigo-400 shadow-[0_0_8px_#6366f1]'
                  : gradient === 'emerald'
                    ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                    : 'bg-slate-400'
              )}
              style={{ left: `${12 + (i % 4) * 22}%`, top: `${18 + (i % 3) * 24}%` }}
            />
          ))}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-[0.05] [background-size:24px_24px]" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
