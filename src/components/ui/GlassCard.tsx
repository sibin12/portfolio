import React, { useRef } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lift on hover and draw a soft spotlight that follows the cursor. */
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ interactive = true, className, children, onMouseMove, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--x', `${event.clientX - rect.left}px`);
      node.style.setProperty('--y', `${event.clientY - rect.top}px`);
    }
    onMouseMove?.(event);
  };

  return (
    <div
      ref={ref}
      onMouseMove={interactive ? handleMouseMove : onMouseMove}
      className={cn('surface group/card', interactive && 'surface-hover', className)}
      {...props}
    >
      {interactive && (
        // .surface uses backdrop-filter, so it is its own stacking context and -z-10 stays inside the card.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: 'radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgba(129,140,248,0.13), transparent 65%)',
          }}
        />
      )}
      {children}
    </div>
  );
};
