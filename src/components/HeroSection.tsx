'use client';
import '@/app/responsive.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { i18n } from '@/lib/i18n';
import HeroSceneWrapper from './HeroSceneWrapper';

type T = typeof i18n['pt'] | typeof i18n['en'];

const BRAND_NAME = 'SISTEMA ORBIT';

export default function HeroSection({ t }: { t: T }) {
  const [clock, setClock] = useState('T+00:00');
  
  // Clock
  useEffect(() => {
    const started = Date.now();
    const id = setInterval(() => {
      const el = (Date.now() - started) / 1000;
      const mm = Math.floor(el/60).toString().padStart(2,'0');
      const ss = Math.floor(el%60).toString().padStart(2,'0');
      setClock(`T+${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{padding:0,position:'relative'}}>
      {/* SCENE WRAP */}
      <div style={{
        position:'relative',width:'100vw',left:'50%',marginLeft:'-50vw',
        height:'100vh',minHeight:760,maxHeight:1000,
        overflow:'hidden',isolation:'isolate',
        background:'radial-gradient(ellipse 120% 80% at 50% 30%,#1a0a3a 0%,#050511 55%,#020206 100%)',
      }}>
        <HeroSceneWrapper />

        {/* Clock */}
        <div style={{position:'absolute',top:18,right:20,zIndex:20,fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(123,97,255,.7)',letterSpacing:'.1em',display:'flex',alignItems:'center',gap:6,background:'rgba(0,0,0,.4)',backdropFilter:'blur(6px)',padding:'6px 10px',borderRadius:6,border:'1px solid rgba(123,97,255,.2)'}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e',animation:'pulse 1.5s ease-in-out infinite'}}/>
          <span>{clock}</span>
          <span style={{opacity:.5}}>· MISSION ORBIT</span>
        </div>

        {/* Logo reveal */}
        <div style={{
          position:'absolute',top:'42%',left:'50%',
          transform:'translate(-50%,30%)',
          display:'flex',flexDirection:'column',alignItems:'center',gap:18,
          opacity:0,zIndex:14,pointerEvents:'none',
          animation:'logo-reveal-in 1.2s cubic-bezier(.2,.8,.3,1) 6s forwards, logo-float-up 1.4s cubic-bezier(.3,.8,.3,1) 8.2s forwards',
        }}>
          <style>{`
            @keyframes logo-reveal-in{0%{opacity:0;transform:translate(-50%,60%) scale(.6);filter:blur(20px)}100%{opacity:1;transform:translate(-50%,30%) scale(1);filter:blur(0)}}
            @keyframes logo-float-up{from{top:42%;transform:translate(-50%,30%) scale(1)}to{top:18%;transform:translate(-50%,30%) scale(.68)}}
          `}</style>
          <div style={{width:72,height:72,borderRadius:18,background:'linear-gradient(135deg,#1a1040,#7b61ff)',display:'grid',placeItems:'center',boxShadow:'0 0 30px rgba(123,97,255,.6),0 0 60px rgba(123,97,255,.3),inset 0 2px 0 rgba(255,255,255,.2)'}}>
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25"/>
              <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.55"/>
              <circle cx="24" cy="24" r="5" fill="white"/>
              <circle cx="24" cy="24" r="2.5" fill="#7b61ff"/>
              <circle cx="40" cy="16" r="3.5" fill="#00d4ff" opacity="0.95"/>
            </svg>
          </div>
          <div style={{display:'flex',gap:2,fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(24px,5vw,44px)',fontWeight:700,letterSpacing:'-1px',lineHeight:1,flexWrap:'wrap',justifyContent:'center'}}>
            <style>{`
              @keyframes letter-in{0%{opacity:0;transform:translateY(8px);filter:blur(6px)}50%{filter:blur(0) brightness(1.8)}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
            `}</style>
            {[...BRAND_NAME].map((ch, i) => (
              <span key={i} style={{
                display:'inline-block',
                color: i >= 8 ? '#b59bff' : '#fff',
                textShadow: i >= 8 ? '0 0 12px #7b61ff,0 0 24px rgba(123,97,255,.6)' : '0 0 8px rgba(255,255,255,.6),0 0 16px rgba(123,97,255,.6)',
                opacity:0,
                animation:`letter-in .5s cubic-bezier(.2,.8,.3,1) ${6.2+i*.08}s forwards`,
                width: ch === ' ' ? '0.4em' : undefined,
              }}>{ch === ' ' ? '\u00a0' : ch}</span>
            ))}
          </div>
        </div>

        {/* Scene overlay sub */}
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:24,pointerEvents:'none',zIndex:10}}>
          <p style={{fontSize:15,color:'rgba(232,234,240,.7)',fontFamily:'var(--font-body)',letterSpacing:'.02em',opacity:0,animation:'fadein 1s ease 6.5s forwards',maxWidth:480,textAlign:'center',lineHeight:1.5}}>
            Uma missão de gestão em órbita — KPIs, planos e rituais em tempo real.
          </p>
        </div>

        {/* Hero content */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,calc(-50% + 80px))',width:'100%',maxWidth:920,padding:'0 24px',textAlign:'center',zIndex:12,pointerEvents:'none'}}>
          <motion.span initial={{opacity:0,y:24,filter:'blur(12px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{delay:8.3,duration:1,ease:[.2,.8,.3,1]}}
            style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:999,background:'var(--accent-soft)',border:'1px solid var(--accent-border)',color:'#b59bff',fontSize:12,fontWeight:600,fontFamily:'var(--font-mono)',letterSpacing:'.02em',pointerEvents:'auto'}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 8px var(--accent)',animation:'pulse 2s ease-in-out infinite'}}/>
            {t.hero.pill}
          </motion.span>
          <motion.h1 initial={{opacity:0,y:24,filter:'blur(12px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{delay:8.7,duration:1.2,ease:[.2,.8,.3,1]}}
            style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(44px,6vw,76px)',lineHeight:.98,letterSpacing:'-.035em',margin:'20px 0 22px',color:'#fff',textWrap:'balance' as any}}>
            {t.hero.title1}<br/>
            <span style={{background:'linear-gradient(120deg,#b59bff 0%,#7b61ff 45%,#00d4ff 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',display:'inline-block'}}>{t.hero.title2}</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:24,filter:'blur(12px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{delay:9.3,duration:1,ease:[.2,.8,.3,1]}}
            style={{fontSize:18,lineHeight:1.55,color:'rgba(232,234,240,.75)',maxWidth:560,margin:'0 auto 28px'}}>
            {t.hero.subtitle}
          </motion.p>
          <motion.div initial={{opacity:0,y:24,filter:'blur(12px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{delay:9.7,duration:1,ease:[.2,.8,.3,1]}}
            className="hero-cta-group">
            <a href="#" style={{display:'inline-flex',alignItems:'center',padding:'14px 24px',borderRadius:10,background:'var(--accent)',color:'#fff',fontWeight:600,fontSize:15,boxShadow:'0 2px 12px rgba(123,97,255,.4)',textDecoration:'none'}}>{t.hero.cta}</a>
            <a href="#" style={{display:'inline-flex',alignItems:'center',padding:'14px 24px',borderRadius:10,background:'transparent',color:'var(--text-secondary)',border:'1px solid var(--border-default)',fontWeight:600,fontSize:15,textDecoration:'none'}}>{t.hero.ctaGhost}</a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:10.5,duration:1}}
          style={{position:'absolute',bottom:40,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:10,fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,.5)',letterSpacing:'.16em',zIndex:20}}>
          EXPLORAR
          <div style={{width:14,height:14,borderRight:'1.5px solid rgba(255,255,255,.5)',borderBottom:'1.5px solid rgba(255,255,255,.5)',transform:'rotate(45deg)',animation:'chev-bounce 2s ease-in-out infinite'}}/>
        </motion.div>

        {/* Bottom fade */}
        <div style={{position:'absolute',left:0,right:0,bottom:0,height:180,background:'linear-gradient(180deg,transparent,var(--bg-base))',pointerEvents:'none',zIndex:8}}/>
      </div>

      {/* Hero badges */}
      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:10,duration:.8}}
          style={{display:'flex',gap:20,marginTop:40,paddingBottom:40,flexWrap:'wrap',justifyContent:'center'}}>
          {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((b,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--text-muted)',fontWeight:500}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {b}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
