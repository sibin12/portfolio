import { motion, useReducedMotion, type Variants } from 'framer-motion';
import React from 'react';

const ease = [0.65, 0, 0.35, 1] as const;
const transition = { duration: 0.8, ease, delay: 0.1 };

const text: Variants = {
  hidden: { clipPath: 'inset(-15% 100% -15% 0)' },
  visible: { clipPath: 'inset(-15% 0% -15% 0)', transition },
};

const blade: Variants = {
  hidden: { left: '0%', opacity: 0 },
  visible: { left: '100%', opacity: [0, 1, 1, 0], transition },
};

/**
 * Reveals a heading left to right behind a thin blade of light, echoing the opening cut.
 * One in-view trigger on the wrapper drives both the text and the blade through variants.
 */
export const SliceIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.span className="relative inline-block" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      <motion.span className="inline-block" variants={text}>
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        variants={blade}
        className="pointer-events-none absolute -bottom-1 -top-1 w-[2px] rounded-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_14px_3px_rgba(165,180,252,0.6)]"
      />
    </motion.span>
  );
};
