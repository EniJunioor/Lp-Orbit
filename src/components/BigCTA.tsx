'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { i18n } from '@/lib/i18n';
type T = typeof i18n['pt']['cta'] | typeof i18n['en']['cta'];

import TextReveal from './TextReveal';

function MagneticButton({ children, style, href }: { children: React.ReactNode, style?: any, href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ ...style, display: 'inline-flex' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

export default function BigCTA({ t }: { t: T }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section style={{padding:'100px 0',position:'relative'}}>
      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
        <motion.div ref={ref} initial={{opacity:0,y:40,scale:.97}} animate={inView?{opacity:1,y:0,scale:1}:{}} transition={{duration:.8,ease:[.2,.8,.3,1]}}
          style={{background:`radial-gradient(ellipse 60% 100% at 50% 0%,rgba(123,97,255,.3),transparent 70%),linear-gradient(180deg,rgba(22,24,31,.8),rgba(11,12,18,.95))`,border:'1px solid rgba(123,97,255,.28)',borderRadius:28,padding:'72px 40px',textAlign:'center',position:'relative',overflow:'hidden',boxShadow:'0 0 80px rgba(123,97,255,.15)'}}>
          <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:1,background:'linear-gradient(90deg,transparent,var(--accent),transparent)'}}/>
          <TextReveal 
            text={t.title} 
            delay={0.2}
            style={{fontFamily:'var(--font-display)',fontSize:'clamp(32px,4.5vw,54px)',fontWeight:700,letterSpacing:'-.03em',lineHeight:1.05, justifyContent: 'center'}}
          />
          <motion.p initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:.35,duration:.7}}
            style={{fontSize:17,color:'var(--text-secondary)',margin:'16px auto 32px',maxWidth:520}}>{t.sub}</motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:.5,duration:.7}}
            style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <MagneticButton href="#" style={{alignItems:'center',padding:'14px 24px',borderRadius:10,background:'var(--accent)',color:'#fff',fontWeight:600,fontSize:15,boxShadow:'0 2px 12px rgba(123,97,255,.4)',textDecoration:'none'}}>{t.btn}</MagneticButton>
            <MagneticButton href="#" style={{alignItems:'center',padding:'14px 24px',borderRadius:10,background:'transparent',color:'var(--text-secondary)',border:'1px solid var(--border-default)',fontWeight:600,fontSize:15,textDecoration:'none'}}>{t.btn2}</MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
