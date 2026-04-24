'use client';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function TextReveal({ text, className, style, delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  // Split text into words
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', ...style }}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '0.25em', display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
