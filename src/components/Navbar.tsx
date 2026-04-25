'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/i18n';

const OrbitLogoSVG = () => (
  <svg viewBox="0 0 48 48" fill="none" width={24} height={24}>
    <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="1.5" fill="none" opacity="0.2"/>
    <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.45"/>
    <circle cx="24" cy="24" r="5" fill="white"/>
    <circle cx="24" cy="24" r="2.5" fill="#7b61ff"/>
    <circle cx="40" cy="16" r="3.5" fill="#00d4ff" opacity="0.9"/>
  </svg>
);

interface NavProps {
  t: { features: string; product: string; integrations: string; login: string; cta: string };
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function Navbar({ t, lang, setLang }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', checkMobile); };
  }, []);

  const navLinks = [
    { href: '#features', label: t.features },
    { href: '#product', label: t.product },
    { href: '#integrations', label: t.integrations },
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: scrolled ? 12 : 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'calc(100% - 48px)',
        maxWidth: 1200,
        backdropFilter: 'blur(30px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(30px) saturate(1.5)',
        background: scrolled
          ? 'linear-gradient(180deg, rgba(14, 12, 32, 0.7) 0%, rgba(5, 4, 15, 0.8) 100%)'
          : 'linear-gradient(180deg, rgba(14, 12, 32, 0.4) 0%, rgba(5, 4, 15, 0.2) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 24,
        boxShadow: scrolled 
          ? '0 30px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 10px 40px -10px rgba(0,0,0,0.5)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '12px 20px' : '10px 10px 10px 24px',
      }}>
        {/* Logo */}
        <a href="#" style={{ 
          display: 'flex', alignItems: 'center', gap: 12, 
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, 
          color: '#fff', textDecoration: 'none', flexShrink: 0 
        }}>
          <span style={{ 
            width: 38, height: 38, borderRadius: 12, 
            background: 'linear-gradient(135deg, #2a1b54 0%, #7b61ff 100%)', 
            display: 'grid', placeItems: 'center', 
            boxShadow: '0 4px 20px rgba(123,97,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)', 
            flexShrink: 0 
          }}>
            <OrbitLogoSVG />
          </span>
          Orbit
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: 100,
          }}>
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} style={{ 
                color: 'rgba(255,255,255,0.6)', 
                fontSize: 14, 
                fontWeight: 500, 
                padding: '8px 20px', 
                borderRadius: 100, 
                transition: 'all 0.3s ease', 
                textDecoration: 'none' 
              }}
                onMouseEnter={e => { 
                  const el = e.target as HTMLElement; 
                  el.style.color = '#fff'; 
                  el.style.background = 'rgba(255,255,255,0.08)'; 
                  el.style.boxShadow = '0 0 12px rgba(255,255,255,0.1)';
                }}
                onMouseLeave={e => { 
                  const el = e.target as HTMLElement; 
                  el.style.color = 'rgba(255,255,255,0.6)'; 
                  el.style.background = 'transparent'; 
                  el.style.boxShadow = 'none';
                }}
              >{label}</a>
            ))}
          </nav>
        )}

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Lang toggle */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: 100, 
            padding: 4, 
            gap: 2 
          }}>
            {(['pt', 'en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ 
                background: lang === l ? '#7b61ff' : 'transparent', 
                border: 'none', 
                color: lang === l ? 'white' : 'rgba(255,255,255,0.5)', 
                fontWeight: 600, 
                fontSize: 12, 
                padding: '6px 12px', 
                borderRadius: 100, 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                boxShadow: lang === l ? '0 0 12px rgba(123,97,255,0.5)' : 'none'
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="#" style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: 14, 
                fontWeight: 600, 
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
              >{t.login}</a>
              <a href="#" style={{ 
                padding: '10px 24px', 
                fontSize: 14, 
                fontWeight: 600, 
                borderRadius: 100, 
                background: 'linear-gradient(135deg, #7b61ff 0%, #00d4ff 100%)', 
                color: 'white', 
                textDecoration: 'none', 
                boxShadow: '0 4px 16px rgba(123,97,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)', 
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={e => { 
                  (e.target as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,212,255,0.6), inset 0 2px 0 rgba(255,255,255,0.2)';
                  (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => { 
                  (e.target as HTMLElement).style.boxShadow = '0 4px 16px rgba(123,97,255,0.4), inset 0 2px 0 rgba(255,255,255,0.2)';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                }}
              >{t.cta}</a>
            </div>
          )}

          {/* Hamburger - mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: '#fff', 
                width: 40, height: 40, 
                borderRadius: 12, 
                cursor: 'pointer', 
                fontSize: 20, 
                display: 'grid', 
                placeItems: 'center' 
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', padding: '16px 20px 24px', gap: 16,
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                  color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500, textDecoration: 'none'
                }}>{label}</a>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '4px 0' }} />
              <a href="#" onClick={() => setMenuOpen(false)} style={{
                color: '#fff', fontSize: 16, fontWeight: 500, textDecoration: 'none'
              }}>{t.login}</a>
              <a href="#" onClick={() => setMenuOpen(false)} style={{
                padding: '12px', textAlign: 'center', background: '#7b61ff', color: '#fff', 
                borderRadius: 12, fontWeight: 600, textDecoration: 'none'
              }}>{t.cta}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

