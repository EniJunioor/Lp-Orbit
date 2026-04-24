'use client';
import '@/app/responsive.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { i18n } from '@/lib/i18n';

type T = typeof i18n['pt'] | typeof i18n['en'];

const BRAND_NAME = 'SISTEMA ORBIT';

function StarField() {
  const [mounted, setMounted] = useState(false);
  const stars = useRef<Array<{x:number;y:number;size:number;dur:number;delay:number;op:number}>>([]);

  useEffect(() => {
    if (!stars.current.length) {
      for (let i = 0; i < 140; i++) {
        const size = Math.random() < .85 ? 1 + Math.random() * 1.2 : 2 + Math.random() * 1.5;
        stars.current.push({
          x: Math.random()*100, y: Math.random()*100, size,
          dur: 2+Math.random()*4, delay: Math.random()*4,
          op: .4+Math.random()*.6,
        });
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{position:'absolute',inset:0,pointerEvents:'none'}}/>;
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
      {stars.current.map((s,i) => (
        <div key={i} style={{
          position:'absolute',left:`${s.x}%`,top:`${s.y}%`,
          width:s.size,height:s.size,borderRadius:'50%',background:'#fff',
          boxShadow:'0 0 4px rgba(255,255,255,.8)',
          animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }}/>
      ))}
    </div>
  );
}

function ShootingStars() {
  const shooters = [
    {y:'12%',angle:18,delay:0},{y:'38%',angle:22,delay:2.3},
    {y:'68%',angle:15,delay:4.8},{y:'24%',angle:25,delay:7.2},
  ];
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none'}}>
      {shooters.map((s,i) => (
        <div key={i} style={{
          position:'absolute',top:s.y,left:'-10%',
          width:160,height:2,
          background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,.15) 30%,#fff 80%,#b59bff 100%)',
          borderRadius:2,filter:'blur(.5px)',
          transform:`rotate(${s.angle}deg)`,
          opacity:0,
          ['--angle' as string]: `${s.angle}deg`,
          animation:`shoot ${2.2+i*.2}s cubic-bezier(.4,0,.2,1) ${s.delay}s infinite`,
        }}>
          <div style={{position:'absolute',right:0,top:-3,width:8,height:8,borderRadius:'50%',background:'#fff',boxShadow:'0 0 16px 4px rgba(255,255,255,.9),0 0 30px 8px rgba(123,97,255,.6)'}}/>
        </div>
      ))}
    </div>
  );
}

export default function HeroScene({ t }: { t: T }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState('T+00:00');
  const started = useRef(Date.now());
  const curX = useRef(0); const curY = useRef(0);
  const targetX = useRef(0); const targetY = useRef(0);

  // Clock
  useEffect(() => {
    const id = setInterval(() => {
      const el = (Date.now() - started.current) / 1000;
      const mm = Math.floor(el/60).toString().padStart(2,'0');
      const ss = Math.floor(el%60).toString().padStart(2,'0');
      setClock(`T+${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Parallax
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      targetX.current = ((e.clientX-r.left)/r.width-.5)*2;
      targetY.current = ((e.clientY-r.top)/r.height-.5)*2;
    };
    const onLeave = () => { targetX.current=0; targetY.current=0; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    let raf: number;
    const tick = () => {
      curX.current += (targetX.current-curX.current)*.06;
      curY.current += (targetY.current-curY.current)*.06;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${curX.current*-10}px,${curY.current*-10}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { el.removeEventListener('mousemove',onMove); el.removeEventListener('mouseleave',onLeave); cancelAnimationFrame(raf); };
  }, []);

  const fadeIn = { hidden:{opacity:0}, visible:{opacity:1} };

  return (
    <div style={{padding:0,position:'relative'}}>
      {/* SCENE WRAP */}
      <div ref={sceneRef} style={{
        position:'relative',width:'100vw',left:'50%',marginLeft:'-50vw',
        height:'100vh',minHeight:760,maxHeight:1000,
        overflow:'hidden',cursor:'crosshair',isolation:'isolate',
        background:'radial-gradient(ellipse 120% 80% at 50% 30%,#1a0a3a 0%,#050511 55%,#020206 100%)',
      }}>
        {/* Nebulae */}
        {[
          {cls:'purple',w:520,h:520,top:-80,left:-120,bg:'radial-gradient(circle,#7b61ff,transparent 70%)',op:.6},
          {cls:'cyan',w:380,h:380,bottom:-60,right:-80,bg:'radial-gradient(circle,#00d4ff,transparent 70%)',op:.35},
          {cls:'pink',w:300,h:300,top:'40%',right:'20%',bg:'radial-gradient(circle,#d94eff,transparent 70%)',op:.3},
        ].map((n,i)=>(
          <div key={i} style={{position:'absolute',borderRadius:'50%',pointerEvents:'none',filter:'blur(60px)',opacity:n.op,mixBlendMode:'screen' as any,...(n.top!==undefined?{top:n.top}:{}),left:n.left,right:(n as any).right,bottom:(n as any).bottom,width:n.w,height:n.h,background:n.bg}}/>
        ))}

        {/* Clock */}
        <div style={{position:'absolute',top:18,right:20,zIndex:20,fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(123,97,255,.7)',letterSpacing:'.1em',display:'flex',alignItems:'center',gap:6,background:'rgba(0,0,0,.4)',backdropFilter:'blur(6px)',padding:'6px 10px',borderRadius:6,border:'1px solid rgba(123,97,255,.2)'}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e',animation:'pulse 1.5s ease-in-out infinite'}}/>
          <span>{clock}</span>
          <span style={{opacity:.5}}>· MISSION ORBIT</span>
        </div>

        {/* Parallax scene */}
        <div ref={parallaxRef} style={{position:'absolute',inset:0,transformStyle:'preserve-3d',transition:'transform .2s ease-out'}}>
          <StarField/>
          <ShootingStars/>

          {/* Orbit paths */}
          <div style={{position:'absolute',top:'50%',left:'50%',width:560,height:180,transform:'translate(-50%,-50%) rotateX(68deg)',border:'1px dashed rgba(123,97,255,.22)',borderRadius:'50%',pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:'50%',left:'50%',width:780,height:250,transform:'translate(-50%,-50%) rotateX(68deg)',border:'1px dashed rgba(0,212,255,.12)',borderRadius:'50%',pointerEvents:'none'}}/>

          {/* Sun */}
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:5}}>
            <div style={{width:160,height:160,borderRadius:'50%',background:'radial-gradient(circle at 40% 40%,#fff 0%,#ffd88a 25%,#ff9e3f 55%,#d94eff 85%)',boxShadow:'0 0 40px rgba(255,200,100,.6),0 0 120px rgba(217,78,255,.5),0 0 200px rgba(123,97,255,.4)',animation:'sun-pulse 4s ease-in-out infinite',position:'relative'}}>
              <div style={{position:'absolute',inset:-12,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,180,100,.3),transparent 60%)',animation:'corona 6s linear infinite'}}/>
            </div>
          </div>

          {/* Planet */}
          <div style={{position:'absolute',top:'50%',left:'50%',width:560,height:180,transform:'translate(-50%,-50%) rotateX(68deg)',animation:'orbit-3d 14s linear infinite',transformStyle:'preserve-3d'}}>
            <div style={{position:'absolute',top:'50%',left:'100%',width:54,height:54,borderRadius:'50%',transform:'translate(-50%,-50%) rotateX(-68deg)',background:'radial-gradient(circle at 32% 30%,#b59bff 0%,#7b61ff 40%,#3a1f8f 85%)',boxShadow:'inset -8px -12px 24px rgba(0,0,0,.5),inset 6px 8px 14px rgba(255,255,255,.15),0 0 30px rgba(123,97,255,.45)',animation:'planet-depth 14s linear infinite'}}/>
          </div>

          {/* Moon */}
          <div style={{position:'absolute',top:'50%',left:'50%',width:780,height:250,transform:'translate(-50%,-50%) rotateX(68deg)',animation:'orbit-3d 22s linear reverse infinite',transformStyle:'preserve-3d'}}>
            <div style={{position:'absolute',top:'50%',left:0,width:22,height:22,borderRadius:'50%',transform:'translate(-50%,-50%) rotateX(-68deg)',background:'radial-gradient(circle at 35% 30%,#e8eaf0 0%,#9aa3b7 60%,#3d4455 100%)',boxShadow:'0 0 14px rgba(0,212,255,.4),inset -4px -4px 8px rgba(0,0,0,.4)'}}/>
          </div>
        </div>

        {/* Rocket stage */}
        <div style={{position:'absolute',top:'50%',left:'50%',width:300,height:300,transform:'translate(-50%,-50%) scale(0)',animation:'rocket-enter 2.5s cubic-bezier(.25,.8,.3,1) 5s forwards, rocket-exit 2s cubic-bezier(.4,0,.3,1) 8.5s forwards',zIndex:15,pointerEvents:'none'}}>
          <style>{`
            @keyframes rocket-enter {
              0%{transform:translate(-50%,40%) scale(0) rotate(-12deg);opacity:0}
              40%{opacity:1}
              65%{transform:translate(-50%,-50%) scale(1.5) rotate(4deg)}
              100%{transform:translate(-50%,-70%) scale(1) rotate(0deg);opacity:1}
            }
            @keyframes rocket-exit {
              from{transform:translate(-50%,-70%) scale(1);opacity:1}
              to{transform:translate(-50%,-160%) scale(.3);opacity:0}
            }
            @keyframes rocket-hover {
              0%,100%{transform:translateX(-50%) translateY(0)}
              50%{transform:translateX(-50%) translateY(-10px)}
            }
          `}</style>
          <div style={{position:'absolute',top:'100%',left:'50%',width:30,height:60,transform:'translateX(-50%)',background:'linear-gradient(180deg,#ffd88a 0%,#ff9e3f 40%,#ef4444 70%,transparent 100%)',borderRadius:'50% 50% 30% 30%/30% 30% 70% 70%',filter:'blur(2px)',animation:'flame .2s linear infinite alternate',transformOrigin:'top center'}}/>
          <svg style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',animation:'rocket-hover 3s ease-in-out 7.5s infinite'}} width="160" height="220" viewBox="0 0 160 220" fill="none">
            <path d="M 40 140 L 20 190 L 50 170 Z" fill="#b59bff"/>
            <path d="M 120 140 L 140 190 L 110 170 Z" fill="#b59bff"/>
            <path d="M 50 70 Q 50 30 80 10 Q 110 30 110 70 L 110 170 Q 110 180 100 180 L 60 180 Q 50 180 50 170 Z" fill="url(#rocketGrad)"/>
            <rect x="50" y="110" width="60" height="6" fill="#7b61ff"/>
            <rect x="50" y="124" width="60" height="3" fill="rgba(123,97,255,0.5)"/>
            <circle cx="80" cy="70" r="22" fill="#0a0a1a" stroke="#b59bff" strokeWidth="3"/>
            <circle cx="80" cy="70" r="18" fill="url(#windowGrad)"/>
            <circle cx="80" cy="72" r="11" fill="#e8eaf0"/>
            <rect x="72" y="70" width="16" height="8" rx="2" fill="#1a1040"/>
            <ellipse cx="76" cy="68" rx="3" ry="4" fill="rgba(255,255,255,0.7)"/>
            <path d="M 80 82 Q 92 88 96 104" stroke="#e8eaf0" strokeWidth="5" strokeLinecap="round" fill="none"/>
            <defs>
              <linearGradient id="rocketGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff"/><stop offset="50%" stopColor="#e8eaf0"/><stop offset="100%" stopColor="#9aa3b7"/>
              </linearGradient>
              <radialGradient id="windowGrad" cx="0.3" cy="0.3">
                <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.3"/><stop offset="100%" stopColor="#0a0a1a"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Tether */}
        <div style={{position:'absolute',top:'60%',left:'50%',width:2,height:40,transform:'translateX(-50%)',background:'linear-gradient(180deg,rgba(123,97,255,.7),rgba(123,97,255,.1))',opacity:0,animation:'fadein .5s ease 6.2s forwards',boxShadow:'0 0 6px rgba(123,97,255,.8)',zIndex:14}}>
          <style>{`@keyframes fadein{to{opacity:1}}`}</style>
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
