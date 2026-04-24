'use client';
import '@/app/responsive.css';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import type { i18n } from '@/lib/i18n';
type T = typeof i18n['pt']['product'] | typeof i18n['en']['product'];

function SidebarItem({ item, isActive, badge }: { item: string, isActive?: boolean, badge?: React.ReactNode }) {
  return (
    <motion.div 
      initial={false}
      whileHover={{ backgroundColor: 'var(--accent-soft)', color: 'var(--text-primary)', x: 4 }}
      transition={{ duration: 0.2 }}
      style={{
        display:'flex',
        alignItems:'center',
        gap:10,
        padding:'8px 10px',
        fontSize:13,
        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
        borderRadius:8,
        background: isActive ? 'var(--accent-soft)' : 'transparent',
        cursor:'pointer'
      }}
    >
      {item}
      {badge}
    </motion.div>
  );
}

export default function ProductShowcase({ t }: { t: T }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="product" style={{padding:'100px 0',position:'relative'}}>
      <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
        <motion.div ref={ref} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.7}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,color:'var(--accent)',letterSpacing:'.08em',textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:10,marginBottom:16}}>
            <span style={{width:24,height:1,background:'var(--accent)',display:'inline-block'}}/>{t.kicker}
          </span>
          <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'clamp(32px,4vw,52px)',lineHeight:1.05,letterSpacing:'-.03em',marginBottom:16,maxWidth:800}}>{t.title}</h2>
          <p style={{fontSize:17,color:'var(--text-secondary)',maxWidth:620}}>{t.sub}</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:50}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:.2,duration:.8}}
          style={{marginTop:56,background:'linear-gradient(180deg,rgba(22,24,31,.8),rgba(11,12,18,.9))',border:'1px solid var(--border-default)',borderRadius:24,padding:20,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-1,left:'20%',right:'20%',height:1,background:'linear-gradient(90deg,transparent,var(--accent),transparent)'}}/>
          <motion.div className="showcase-inner" style={{y, background:'var(--bg-base)',border:'1px solid var(--border-subtle)',borderRadius:14,overflow:'hidden'}}>
            {/* Sidebar */}
            <div className="showcase-sidebar" style={{borderRight:'1px solid var(--border-subtle)',padding:18,flexDirection:'column',gap:4}}>
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'0 8px 18px',borderBottom:'1px solid var(--border-subtle)',marginBottom:14}}>
                <span style={{width:22,height:22,borderRadius:6,background:'linear-gradient(135deg,var(--accent),#b59bff)',display:'inline-block',boxShadow:'0 0 10px rgba(99,102,241,.3)'}}/>
                <span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:14,color:'var(--text-primary)'}}>Orbit</span>
              </div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.1em',padding:'10px 8px 4px'}}>Cockpit</div>
              {['Visão geral','KPIs','Planos de Ação','Rituais','Calendário'].map((item,i) => (
                <SidebarItem 
                  key={i} 
                  item={item} 
                  isActive={i === 0} 
                  badge={i === 1 ? <span style={{marginLeft:'auto',fontSize:9,padding:'2px 6px',borderRadius:4,background:'var(--accent)',color:'#fff',fontWeight:700}}>12</span> : undefined} 
                />
              ))}
              <div style={{fontFamily:'var(--font-mono)',fontSize:9,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.1em',padding:'10px 8px 4px',marginTop:8}}>Organização</div>
              {['Times','Integrações'].map((item,i) => (
                <SidebarItem key={i} item={item} />
              ))}
            </div>
            {/* Main */}
            <div style={{padding:24,display:'flex',flexDirection:'column',gap:18}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <h4 style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:700,letterSpacing:'-.02em'}}>Cockpit — Out/25</h4>
                  <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>3 metas no verde · 2 planos atrasados · 1 ritual hoje</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button style={{padding:'7px 12px',borderRadius:8,border:'1px solid var(--border-default)',background:'var(--bg-elevated)',color:'var(--text-secondary)',fontSize:12,fontWeight:500,cursor:'pointer'}}>Exportar</button>
                  <button style={{padding:'7px 12px',borderRadius:8,border:'1px solid var(--accent)',background:'var(--accent)',color:'#fff',fontSize:12,fontWeight:500,cursor:'pointer'}}>+ Novo plano</button>
                </div>
              </div>
              {/* KPI tiles */}
              <div className="tiles-grid">
                {[
                  {l:'Receita MTD',v:'R$ 1.84M',d:'▲ 12.4% vs meta',up:true,stroke:'#22c55e',pts:'0,22 15,18 30,20 45,14 60,10 75,12 90,6 100,4'},
                  {l:'Planos ativos',v:'24',d:'▲ 3 esta semana',up:true,stroke:'#7b61ff',pts:'0,20 15,16 30,18 45,12 60,14 75,10 90,8 100,10'},
                  {l:'Conversão',v:'38.2%',d:'▼ 2.1%',up:false,stroke:'#ef4444',pts:'0,8 15,10 30,9 45,14 60,12 75,16 90,18 100,20'},
                  {l:'NPS',v:'72',d:'▲ 5 pts',up:true,stroke:'#00d4ff',pts:'0,16 15,14 30,16 45,10 60,12 75,8 90,6 100,4'},
                ].map((tile,i) => (
                  <motion.div key={i} initial={{opacity:0,scale:.95}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:.4+i*.05,duration:.5}}
                    style={{background:'var(--bg-elevated)',border:'1px solid var(--border-subtle)',borderRadius:12,padding:'14px 16px'}}>
                    <div style={{fontSize:11,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.06em'}}>{tile.l}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:26,fontWeight:700,marginTop:4}}>{tile.v}</div>
                    <div style={{fontSize:11,marginTop:4,color:tile.up?'var(--success)':'var(--danger)'}}>{tile.d}</div>
                    <svg viewBox="0 0 100 28" preserveAspectRatio="none" style={{marginTop:8,height:28,width:'100%'}}>
                      <polyline fill="none" stroke={tile.stroke} strokeWidth="1.8" points={tile.pts}/>
                    </svg>
                  </motion.div>
                ))}
              </div>
              {/* Panels */}
              <div className="panels-grid" style={{flex:1}}>
                <div style={{background:'var(--bg-elevated)',border:'1px solid var(--border-subtle)',borderRadius:12,padding:16,display:'flex',flexDirection:'column',gap:10}}>
                  <h5 style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    Planos de ação <span style={{fontSize:10,color:'var(--text-muted)',fontFamily:'var(--font-mono)',fontWeight:500}}>5W2H · 24 ativos</span>
                  </h5>
                  {[
                    {av:'JS',name:'Reativar carteira inativa Q4',meta:'João S. · vence em 3d',s:'ok',sl:'No prazo'},
                    {av:'MR',name:'Processo de onboarding v2',meta:'Marina R. · em revisão',s:'wait',sl:'Em atraso'},
                    {av:'CT',name:'Migração CRM para Orbit',meta:'Carlos T. · vence hoje',s:'risk',sl:'Risco'},
                    {av:'AP',name:'Lançamento campanha Black',meta:'Ana P. · +8d',s:'ok',sl:'No prazo'},
                  ].map((row,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<3?'1px solid var(--border-subtle)':'none',fontSize:13}}>
                      <div style={{width:24,height:24,borderRadius:'50%',background:`linear-gradient(135deg,${['var(--accent),#b59bff','#00d4ff,#0099cc','#f59e0b,#ef4444','#22c55e,#059669'][i]})`,display:'grid',placeItems:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{row.av}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{row.name}</div>
                        <div style={{fontSize:11,color:'var(--text-muted)'}}>{row.meta}</div>
                      </div>
                      <span style={{fontSize:10,padding:'2px 8px',borderRadius:999,fontWeight:600,background:row.s==='ok'?'rgba(34,197,94,.12)':row.s==='wait'?'rgba(245,158,11,.12)':'rgba(239,68,68,.12)',color:row.s==='ok'?'var(--success)':row.s==='wait'?'var(--warning)':'var(--danger)'}}>{row.sl}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:'var(--bg-elevated)',border:'1px solid var(--border-subtle)',borderRadius:12,padding:16,display:'flex',flexDirection:'column',gap:10}}>
                  <h5 style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    Próximos rituais <span style={{fontSize:10,color:'var(--text-muted)',fontFamily:'var(--font-mono)',fontWeight:500}}>Hoje · 3</span>
                  </h5>
                  {[
                    {h:'09',m:'00',name:'Daily Comercial',meta:'15min · 4 participantes'},
                    {h:'11',m:'30',name:'Review de KPIs',meta:'45min · Financeiro'},
                    {h:'16',m:'00',name:'1:1 com diretoria',meta:'30min · Estratégico'},
                  ].map((row,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<2?'1px solid var(--border-subtle)':'none',fontSize:13}}>
                      <div style={{width:36,textAlign:'center',fontFamily:'var(--font-mono)',fontSize:11,color:'var(--text-muted)',flexShrink:0}}>
                        <div style={{fontWeight:700,color:'var(--accent)',fontSize:14}}>{row.h}</div>:{row.m}
                      </div>
                      <div>
                        <div style={{fontWeight:600}}>{row.name}</div>
                        <div style={{fontSize:11,color:'var(--text-muted)'}}>{row.meta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
