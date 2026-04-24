'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouchDevice(false);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      // Check if hovered element is clickable
      if (
        target.closest('a') || 
        target.closest('button') || 
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Ponto central super rápido */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-50%',
          translateY: '-50%',
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Anel exterior com spring e efeito de hover */}
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'rgba(99, 102, 241, 0.6)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(99, 102, 241, 0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          translateX: '-50%',
          translateY: '-50%',
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
}
