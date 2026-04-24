'use client';
import '@/app/responsive.css';
import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import type { i18n } from '@/lib/i18n';

type T = typeof i18n['pt']['features'] | typeof i18n['en']['features'];

const ICONS: Record<string, React.ReactNode> = {
  kpi: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  action: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  ritual: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  cal: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  team: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  bell: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
};

function FeatureCard({ item, i, inView }: { item: any; i: number; inView: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseMove={onMouseMove}
      style={{
        background: 'linear-gradient(180deg,rgba(22,24,31,.7),rgba(15,17,23,.7))',
        border: '1px solid var(--border-subtle)',
        borderRadius: 14,
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      variants={{
        hidden: { opacity: 0, y: 40, borderColor: 'var(--border-subtle)' },
        visible: { 
          opacity: 1, 
          y: 0, 
          borderColor: 'var(--border-subtle)',
          transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.3, 1] } 
        },
        hover: { 
          y: -3, 
          borderColor: 'rgba(123,97,255,.28)',
          transition: { duration: 0.3 }
        }
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 14,
          pointerEvents: 'none',
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(123, 97, 255, 0.15),
              transparent 80%
            )
          `,
        }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.3 } }
        }}
      />
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', display: 'grid', placeItems: 'center', color: 'var(--accent)', marginBottom: 18, position: 'relative', zIndex: 1 }}>{ICONS[item.icon]}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8, position: 'relative', zIndex: 1 }}>{item.tag}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 700, letterSpacing: '-.02em', marginBottom: 10, position: 'relative', zIndex: 1 }}>{item.title}</h3>
      <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{item.desc}</p>
    </motion.div>
  );
}

import TextReveal from './TextReveal';

export default function FeaturesSection({ t }: { t: T }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" style={{padding:'100px 0',position:'relative'}}>
      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7,ease:[.2,.8,.3,1]}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,color:'var(--accent)',letterSpacing:'.08em',textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{width:24,height:1,background:'var(--accent)',display:'inline-block'}}/>
            {t.kicker}
          </span>
          <TextReveal 
            text={t.title}
            delay={0.1}
            style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(32px,4vw,52px)',lineHeight:1.05,letterSpacing:'-.03em',marginBottom:16,maxWidth:800}}
          />
          <p style={{fontSize:17,color:'var(--text-secondary)',maxWidth:620}}>{t.sub}</p>
        </motion.div>

        <div className="features-grid">
          {t.items.map((item, i) => (
            <FeatureCard key={i} item={item} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
