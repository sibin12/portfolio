import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Pixel {
  id: number;
  x: number;
  y: number;
  color: string;
}

/**
 * A global interactive component that creates "digital dust" or pixel particles
 * that follow the mouse cursor and "shatter" on movement.
 */
export const GlobalPixelEffect: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pixels, setPixels] = useState<Pixel[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Spawn new pixels on movement
      if (Math.random() > 0.1) {
        const newPixel: Pixel = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          color: Math.random() > 0.5 ? '#6366f1' : '#10b981', // Indigo or Emerald
        };
        
        setPixels(prev => [...prev.slice(-20), newPixel]); // Keep only last 15 pixels for performance
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            initial={{ 
              opacity: 0.8, 
              scale: 1, 
              x: pixel.x, 
              y: pixel.y 
            }}
            animate={{ 
              opacity: 0,
              scale: 0,
              x: pixel.x + (Math.random() - 0.5) * 100,
              y: pixel.y + (Math.random() - 0.5) * 100,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-1 h-1"
            style={{ backgroundColor: pixel.color, boxShadow: `0 0 5px ${pixel.color}` }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
