'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { i18n } from '@/lib/i18n';
type T = typeof i18n['pt']['integrations'] | typeof i18n['en']['integrations'];

const CHIPS = ['ERP NestJS','Gmail','Sheets','Slack','WhatsApp','Outlook','Power BI','Teams','PostgreSQL','Webhook','API REST','Zapier'];

export default function IntegrationsSection({ t }: { t: T }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    let html = '';
    for (let i = 0; i < 120; i++) {
      const r = Math.random();
      const cls = r > .92 ? 'big' : r < .4 ? 'tiny' : '';
      const x = Math.random()*100, y = Math.random()*100;
      const dur = 2+Math.random()*5, del = Math.random()*5;
      html += `<span style="position:absolute;left:${x}%;top:${y}%;border-radius:50%;background:#fff;${cls==='big'?'width:3px;height:3px;box-shadow:0 0 8px rgba(255,255,255,.9)':cls==='tiny'?'width:1px;height:1px;opacity:.5':'width:2px;height:2px;opacity:.8'};animation:twinkle ${dur}s ease-in-out ${del}s infinite;"></span>`;
    }
    starsRef.current.innerHTML = html;
  }, []);

  return (
    <section id="integrations" style={{
      position:'relative',overflow:'hidden',padding:'140px 0 220px',
      background:`radial-gradient(ellipse 80% 60% at 50% 40%,rgba(60,30,140,.35),transparent 70%),
        radial-gradient(ellipse 40% 30% at 15% 80%,rgba(0,212,255,.12),transparent 70%),
        linear-gradient(180deg,#05020f 0%,#0a0518 100%)`,
    }}>
      {/* Stars */}
      <div ref={starsRef} style={{position:'absolute',inset:0,pointerEvents:'none'}}/>
      {/* Nebula */}
      <div style={{position:'absolute',inset:'-10%',background:`radial-gradient(ellipse 30% 20% at 20% 30%,rgba(123,97,255,.25),transparent 70%),radial-gradient(ellipse 25% 15% at 80% 70%,rgba(255,107,107,.18),transparent 70%)`,filter:'blur(30px)',pointerEvents:'none',opacity:.8,animation:'nebula-drift 20s ease-in-out infinite alternate'}}/>
      {/* Shooting star */}
      <div style={{position:'absolute',top:'20%',left:'-10%',width:180,height:2,background:'linear-gradient(90deg,transparent,rgba(255,255,255,.95) 40%,#00d4ff)',borderRadius:2,filter:'drop-shadow(0 0 6px rgba(255,255,255,.9))',opacity:0,transform:'rotate(15deg)',animation:'shoot 9s ease-out infinite'}}>
        <div style={{position:'absolute',right:0,top:'50%',width:6,height:6,borderRadius:'50%',background:'#fff',boxShadow:'0 0 12px 4px rgba(255,255,255,.9)',transform:'translateY(-50%)'}}/>
      </div>

      {/* Astronaut rocket */}
      <div style={{position:'absolute',bottom:60,left:-220,width:260,height:130,zIndex:2,animation:'astro-fly 22s linear 3s infinite',pointerEvents:'none'}}>
        <div style={{position:'relative',width:'100%',height:'100%',animation:'astro-bob 2.4s ease-in-out infinite'}}>
          <svg style={{position:'absolute',left:0,top:'50%',transform:'translateY(-50%)',width:180,height:90,filter:'drop-shadow(0 10px 30px rgba(123,97,255,.45))'}} viewBox="0 0 120 60" fill="none">
            <defs><linearGradient id="rgrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffb347"/><stop offset="0.5" stopColor="#ff6b6b"/><stop offset="1" stopColor="#7b61ff" stopOpacity="0"/></linearGradient></defs>
            <path d="M0 30 Q 18 22 30 30 Q 18 38 0 30 Z" fill="url(#rgrad)" opacity="0.9"/>
            <ellipse cx="12" cy="30" rx="18" ry="4" fill="#fff2c2" opacity="0.5"/>
            <path d="M30 22 L80 22 Q100 22 112 30 Q100 38 80 38 L30 38 Q24 38 22 34 L22 26 Q24 22 30 22 Z" fill="#e8e8f2"/>
            <path d="M30 22 L80 22 Q100 22 112 30 L80 30 L30 30 Z" fill="#c5c5d9"/>
            <circle cx="88" cy="30" r="4" fill="#00d4ff"/><circle cx="88" cy="30" r="2" fill="#fff"/>
            <path d="M42 22 L52 14 L56 22 Z" fill="#7b61ff"/>
            <path d="M42 38 L52 46 L56 38 Z" fill="#7b61ff"/>
          </svg>
          <svg style={{position:'absolute',left:68,top:-4,width:60,height:60}} viewBox="0 0 80 80" fill="none">
            <ellipse cx="40" cy="52" rx="16" ry="14" fill="#f4f4fa"/>
            <rect x="22" y="42" width="8" height="18" rx="3" fill="#d0d0e0"/>
            <circle cx="42" cy="34" r="14" fill="#e8e8f2" stroke="#c5c5d9" strokeWidth="1.5"/>
            <ellipse cx="43" cy="34" rx="10" ry="9" fill="#0a0216"/>
            <ellipse cx="39" cy="30" rx="3" ry="2" fill="#7b61ff" opacity="0.7"/>
          </svg>
          {/* Flag */}
          <div style={{position:'absolute',left:110,top:-40,display:'flex',alignItems:'flex-end',transformOrigin:'bottom left',animation:'flag-wave 1.6s ease-in-out infinite'}}>
            <div style={{width:2,height:60,background:'linear-gradient(180deg,#d0d0e0,#7b6b9a)',borderRadius:1}}/>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px 8px 10px',background:'linear-gradient(135deg,#1a1040,#7b61ff)',border:'1px solid rgba(255,255,255,.25)',borderRadius:'0 8px 8px 0',boxShadow:'0 6px 20px rgba(123,97,255,.45)',fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,color:'#fff',marginBottom:14}}>
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none" opacity="0.35"/><circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/><circle cx="24" cy="24" r="5" fill="white"/><circle cx="40" cy="16" r="3.5" fill="#00d4ff"/></svg>
              Orbit
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:3,textAlign:'center'}}>
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,color:'var(--accent)',letterSpacing:'.08em',textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{width:24,height:1,background:'var(--accent)',display:'inline-block'}}/>{t.kicker}
          </span>
          <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(32px,4vw,52px)',lineHeight:1.05,letterSpacing:'-.03em',marginBottom:16}}>{t.title}</h2>
          <p style={{fontSize:17,color:'var(--text-secondary)',maxWidth:620,margin:'0 auto'}}>{t.sub}</p>
        </motion.div>
        <div style={{marginTop:56,display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px 12px',maxWidth:820,margin:'56px auto 0'}}>
          {CHIPS.map((chip, i) => (
            <motion.span key={chip} initial={{opacity:0,y:20,scale:.9}} animate={inView?{opacity:1,y:0,scale:1}:{}} transition={{delay:.1+i*.04,duration:.5}}
              whileHover={{y:-2,borderColor:'rgba(123,97,255,.28)',color:'#fff',background:'rgba(123,97,255,.12)'}}
              style={{padding:'10px 18px',borderRadius:999,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.1)',backdropFilter:'blur(10px)',color:'var(--text-secondary)',fontFamily:'var(--font-mono)',fontSize:12,fontWeight:500,letterSpacing:'.02em',cursor:'default'}}>
              {chip}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
