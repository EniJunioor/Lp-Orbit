'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

type Plan = { name: string; price: string; period: string; desc: string; cta: string; features: string[]; highlight?: boolean };
type PricingData = { kicker: string; title: string; sub: string; plans: Plan[] };

export default function PricingSection({ t }: { t: PricingData }) {
  const [annual, setAnnual] = useState(true);

  // Helper to calculate annual discount
  const getDisplayPrice = (priceStr: string) => {
    if (priceStr === 'Custom' || priceStr === 'Sob consulta') return priceStr;
    if (!annual) return priceStr; // Monthly price
    
    // Simple mock calculation for Annual (20% off)
    const num = parseInt(priceStr.replace(/\D/g, ''));
    if (isNaN(num)) return priceStr;
    const discounted = Math.floor(num * 0.8);
    // Format back to R$ or $ based on string
    if (priceStr.includes('R$')) return `R$ ${discounted}`;
    if (priceStr.includes('$')) return `$${discounted}`;
    return priceStr;
  };

  return (
    <section id="pricing" style={{ padding: '140px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 100, border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.1)', color: '#00d4ff', fontSize: 13, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 20, boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>
            {t.kicker}
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24, background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t.title}
          </h2>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto' }}>
            {t.sub}
          </p>
        </div>

        {/* Toggle Switch */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 64 }}>
          <span style={{ color: annual ? 'rgba(255,255,255,0.5)' : '#fff', fontWeight: 600, transition: 'color 0.2s' }}>Mensal</span>
          <button 
            onClick={() => setAnnual(!annual)}
            style={{ 
              width: 64, height: 32, borderRadius: 100, background: annual ? '#7b61ff' : 'rgba(255,255,255,0.1)', 
              border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
            }}
          >
            <motion.div 
              animate={{ x: annual ? 34 : 2 }} 
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ width: 28, height: 28, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2 }}
            />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: !annual ? 'rgba(255,255,255,0.5)' : '#fff', fontWeight: 600, transition: 'color 0.2s' }}>Anual</span>
            <span style={{ background: 'linear-gradient(90deg, #7b61ff, #00d4ff)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100, textTransform: 'uppercase' }}>
              Economize 20%
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'center' }}>
          {t.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                background: plan.highlight ? 'linear-gradient(180deg, rgba(20,10,40,0.9) 0%, rgba(10,5,20,0.95) 100%)' : 'rgba(255,255,255,0.02)',
                border: plan.highlight ? '1px solid rgba(123,97,255,0.6)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: 24,
                padding: '48px 40px',
                position: 'relative',
                boxShadow: plan.highlight ? '0 0 80px rgba(123,97,255,0.25), inset 0 0 40px rgba(123,97,255,0.1)' : 'none',
                transform: plan.highlight ? 'scale(1.05)' : 'scale(1)',
                zIndex: plan.highlight ? 2 : 1
              }}
            >
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #7b61ff, #00d4ff)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '6px 16px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '.05em', boxShadow: '0 8px 20px rgba(0,212,255,0.4)' }}>
                  Mais escolhido
                </div>
              )}
              <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: plan.highlight ? '#00d4ff' : '#fff' }}>{plan.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, minHeight: 48 }}>{plan.desc}</p>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, margin: '24px 0 32px', height: 60 }}>
                {plan.price !== 'Custom' && plan.price !== 'Sob consulta' && (
                  <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{plan.price.includes('R$') ? 'R$' : '$'}</span>
                )}
                <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {plan.price === 'Custom' || plan.price === 'Sob consulta' ? plan.price : getDisplayPrice(plan.price).replace(/R\$\s?|\$/g, '')}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', paddingBottom: 6 }}>
                  {plan.price !== 'Custom' && plan.price !== 'Sob consulta' && (
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>{plan.period}</span>
                  )}
                </div>
              </div>
              
              <a href="#" style={{
                display: 'block', textAlign: 'center', padding: '18px', borderRadius: 14, fontSize: 16, fontWeight: 600, textDecoration: 'none',
                background: plan.highlight ? 'linear-gradient(135deg, #7b61ff 0%, #00d4ff 100%)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                boxShadow: plan.highlight ? '0 10px 30px rgba(123,97,255,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if(!plan.highlight) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={e => {
                if(!plan.highlight) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
              }}
              >
                {plan.cta}
              </a>
              
              <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {plan.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M20 6L9 17L4 12" stroke={plan.highlight ? "#00d4ff" : "#7b61ff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Intense Background glow for Pricing */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '120vw', height: '800px', background: 'radial-gradient(ellipse at center, rgba(123,97,255,0.12) 0%, rgba(0,212,255,0.05) 30%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
    </section>
  );
}
