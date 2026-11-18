import { motion, type HTMLMotionProps } from 'framer-motion';
import React from 'react';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

/** Fades content up once as it scrolls into view. Respects reduced motion via MotionConfig. */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    {...props}
  >
    {children}
  </motion.div>
);
