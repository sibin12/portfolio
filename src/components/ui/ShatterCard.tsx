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
  gradient = 'indigo'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const pixels = Array.from({ length: 12 });

  const gradientStyles = {
    indigo: "from-indigo-500/20 via-transparent to-indigo-500/5 border-indigo-500/30",
    emerald: "from-emerald-500/20 via-transparent to-emerald-500/5 border-emerald-500/30",
    slate: "from-slate-500/20 via-transparent to-slate-500/5 border-slate-500/30",
  };

  const hoverGlows = {
    indigo: "group-hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] group-hover:border-indigo-500/60",
    emerald: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/60",
    slate: "group-hover:shadow-[0_0_40px_rgba(100,116,139,0.2)] group-hover:border-slate-500/60",
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group overflow-hidden rounded-2xl border transition-all duration-700",
        "bg-slate-900/60 backdrop-blur-xl shadow-xl", // Enhanced glass base
        gradientStyles[gradient],
        hoverGlows[gradient],
        className
      )}
    >
      {/* Background Gradient Layer (Makes glass effect pop) */}
      <div className={cn(
        "absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70 bg-gradient-to-br",
        gradient === 'indigo' ? 'from-indigo-500/10 to-transparent' : 
        gradient === 'emerald' ? 'from-emerald-500/10 to-transparent' : 
        'from-slate-500/10 to-transparent'
      )} />

      {/* Pixel Fragments on Hover */}
      <AnimatePresence>
        {isHovered && pixels.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, Math.random() * 2 + 1, 0],
              x: (Math.random() - 0.5) * 400, 
              y: (Math.random() - 0.5) * 400,
              rotate: Math.random() * 90 
            }}
            transition={{ duration: 1.2, ease: "circOut", repeat: Infinity, repeatDelay: Math.random() * 2 }}
            className={cn(
              "absolute pointer-events-none z-20 w-1 h-1",
              gradient === 'indigo' ? 'bg-indigo-400 shadow-[0_0_8px_#6366f1]' : 
              gradient === 'emerald' ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 
              'bg-slate-400 shadow-[0_0_8px_#94a3b8]'
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Glossy Reflection Highlight */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Content */}
      <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
        {children}
      </div>

      {/* Inner Border Glow */}
      <div className={cn(
        "absolute inset-[1px] rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none border border-white/10"
      )} />
    </motion.div>
  );
};
