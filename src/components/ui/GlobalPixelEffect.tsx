import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Pixel {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const GlobalPixelEffect: React.FC = () => {
  const [pixels, setPixels] = useState<Pixel[]>([]);

  useEffect(() => {
    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (Math.random() > 0.35) return;

        const color = Math.random() > 0.5 ? '#6366f1' : '#10b981';
        setPixels((prev) => [
          ...prev.slice(-18),
          { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY, color },
        ]);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            initial={{ opacity: 0.8, scale: 1, x: pixel.x, y: pixel.y }}
            animate={{
              opacity: 0,
              scale: 0,
              x: pixel.x + (Math.random() - 0.5) * 80,
              y: pixel.y + (Math.random() - 0.5) * 80,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute h-1 w-1"
            style={{ backgroundColor: pixel.color, boxShadow: `0 0 5px ${pixel.color}` }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
