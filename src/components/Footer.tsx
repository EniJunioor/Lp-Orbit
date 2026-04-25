'use client';
import '@/app/responsive.css';
import { useEffect, useRef } from 'react';
import type { i18n } from '@/lib/i18n';
type T = typeof i18n['pt']['footer'] | typeof i18n['en']['footer'];

export default function Footer({ t }: { t: T }) {
  const starsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!starsRef.current) return;
    let html = '';
    for (let i = 0; i < 60; i++) {
      const x = Math.random()*100, y = Math.random()*100;
      const op = .3+Math.random()*.6, dur = 3+Math.random()*4, del = Math.random()*4;
      const size = Math.random() < .7 ? 1.5 : 2.5;
      html += `<span style="position:absolute;left:${x}%;top:${y}%;width:${size}px;height:${size}px;border-radius:50%;background:#fff;box-shadow:0 0 4px rgba(255,255,255,.8);animation:twinkle-foot ${dur}s ease-in-out ${del}s infinite;--op:${op};opacity:${op}"></span>`;
    }
    starsRef.current.innerHTML = html;
  }, []);

  return (
    <footer style={{position:'relative',padding:'120px 0 40px',marginTop:40,overflow:'hidden'}}>
      {/* Bottom blur halo */}
      <div style={{position:'absolute',left:'50%',bottom:'-40%',transform:'translateX(-50%)',width:'min(1400px,140vw)',height:700,borderRadius:'50%',background:'radial-gradient(circle at 50% 50%,rgba(123,97,255,.55) 0%,rgba(123,97,255,.22) 30%,transparent 65%)',filter:'blur(80px)',pointerEvents:'none',zIndex:0,animation:'halo-breath 8s ease-in-out infinite'}}/>
      <div style={{position:'absolute',left:'15%',bottom:'-20%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,212,255,.3) 0%,transparent 65%)',filter:'blur(90px)',pointerEvents:'none',zIndex:0}}/>
      {/* Grid texture */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0,backgroundImage:`linear-gradient(rgba(123,97,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(123,97,255,.06) 1px,transparent 1px)`,backgroundSize:'60px 60px',maskImage:'radial-gradient(ellipse 80% 80% at 50% 60%,black 30%,transparent 80%)',WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 60%,black 30%,transparent 80%)',opacity:.5}}/>
      {/* Stars */}
      <div ref={starsRef} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0}}/>

      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:2}}>
        <div className="footer-grid">
          <div>
            <a href="#" style={{display:'flex',alignItems:'center',gap:10,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:19,color:'var(--text-primary)',textDecoration:'none'}}>
              <span style={{width:34,height:34,borderRadius:10,background:'linear-gradient(135deg,#1a1040,#7b61ff)',display:'grid',placeItems:'center'}}>
                <svg viewBox="0 0 48 48" fill="none" width="22" height="22"><circle cx="24" cy="24" r="20" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2"/><circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.45"/><circle cx="24" cy="24" r="5" fill="white"/><circle cx="24" cy="24" r="2.5" fill="#7b61ff"/><circle cx="40" cy="16" r="3.5" fill="#00d4ff" opacity="0.9"/></svg>
              </span>
              Orbit
            </a>
            <p style={{fontSize:13,color:'var(--text-muted)',marginTop:14,maxWidth:260,lineHeight:1.6}}>{t.tag}</p>
          </div>
          {[
            { title: t.product, links: [{ name: 'Cockpit', href: '/#product' }, { name: 'KPIs', href: '/#features' }, { name: 'Planos de Ação', href: '/#features' }, { name: 'Rituais', href: '/#features' }] },
            { title: t.company, links: [{ name: 'Sobre', href: '/sobre' }, { name: 'Clientes', href: '/#clientes' }, { name: 'Contato', href: 'mailto:contato@sistemaorbit.com.br' }] },
            { title: t.resources, links: [{ name: 'Documentação', href: '/docs' }, { name: 'API', href: '/docs/api' }, { name: 'Status', href: 'https://status.sistemaorbit.com.br' }] },
            { title: t.legal, links: [{ name: 'Termos', href: '/legal/termos' }, { name: 'Privacidade', href: '/legal/privacidade' }, { name: 'LGPD', href: '/legal/lgpd' }] },
          ].map((col) => (
            <div key={col.title}>
              <h6 style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:600,color:'var(--text-primary)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:14}}>{col.title}</h6>
              {col.links.map(link => (
                <a key={link.name} href={link.href} style={{display:'block',fontSize:13.5,color:'var(--text-secondary)',textDecoration:'none',padding:'5px 0',transition:'color .2s'}}
                  onMouseEnter={e => (e.target as HTMLElement).style.color='var(--accent)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color='var(--text-secondary)'}
                >{link.name}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:28,marginTop:24,borderTop:'1px solid rgba(123,97,255,.15)',fontSize:12,color:'var(--text-muted)'}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 6px #22c55e',animation:'pulse 2s ease-in-out infinite'}}/>
            © 2026 JRS Core · Sistema Orbit — em órbita
          </span>
          <span>Feito com órbita ⟲</span>
        </div>
      </div>
      {/* Wordmark */}
      <div style={{position:'absolute',left:0,right:0,bottom:-30,textAlign:'center',fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(80px,18vw,260px)',fontWeight:700,letterSpacing:'-.04em',lineHeight:.85,background:'linear-gradient(180deg,rgba(123,97,255,.35) 0%,rgba(123,97,255,.05) 60%,transparent 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',pointerEvents:'none',zIndex:1,userSelect:'none',filter:'blur(.5px)'}}>
        ORBIT
      </div>
    </footer>
  );
}
