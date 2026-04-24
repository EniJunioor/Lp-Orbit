'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/i18n';

const OrbitLogoSVG = () => (
  <svg viewBox="0 0 48 48" fill="none" width={22} height={22}>
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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      initial={{ y: -20, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: scrolled ? 8 : 14,
        left: '50%',
        zIndex: 100,
        width: 'calc(100% - 32px)',
        maxWidth: 1180,
        backdropFilter: 'blur(22px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
        background: scrolled
          ? 'linear-gradient(180deg,rgba(12,10,30,.92),rgba(9,9,20,.8))'
          : 'linear-gradient(180deg,rgba(18,12,40,.65),rgba(9,9,20,.45))',
        border: `1px solid ${scrolled ? 'rgba(123,97,255,.3)' : 'rgba(123,97,255,.18)'}`,
        borderRadius: menuOpen ? 16 : 18,
        boxShadow: '0 20px 60px -20px rgba(0,0,0,.6), 0 20px 40px -10px rgba(123,97,255,.2)',
        transition: 'top .3s ease, background .3s ease, border-color .3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Top highlight */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(255,255,255,.07) 0%,transparent 25%)', pointerEvents: 'none', borderRadius: 'inherit' }} />

      <div className="nav-inner">
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: '-0.02em', color: 'var(--text-primary)', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#1a1040 0%,#4a2cc7 50%,#7b61ff 100%)', display: 'grid', placeItems: 'center', boxShadow: '0 4px 14px rgba(123,97,255,.5),0 0 20px rgba(123,97,255,.35)', animation: 'logo-mark-pulse 3.5s ease-in-out infinite', flexShrink: 0 }}>
            <OrbitLogoSVG />
          </span>
          Orbit
        </a>

        {/* Desktop links - hidden on mobile */}
        {!isMobile && (
          <nav className="nav-links-group">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500, padding: '8px 14px', borderRadius: 999, transition: 'all .25s', textDecoration: 'none' }}
                onMouseEnter={e => { const el = e.target as HTMLElement; el.style.color = 'var(--text-primary)'; el.style.background = 'rgba(123,97,255,.12)'; }}
                onMouseLeave={e => { const el = e.target as HTMLElement; el.style.color = 'var(--text-secondary)'; el.style.background = 'transparent'; }}
              >{label}</a>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="nav-right-group">
          {/* Lang toggle */}
          <div style={{ display: 'inline-flex', background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 999, padding: 3, gap: 2 }}>
            {(['pt', 'en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? 'var(--accent)' : 'transparent', border: 'none', color: lang === l ? 'white' : 'var(--text-muted)', fontWeight: 600, fontSize: 11, letterSpacing: '.05em', padding: '5px 10px', borderRadius: 999, cursor: 'pointer', transition: 'all .2s' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {!isMobile && <a href="#" style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent', padding: '8px 14px', fontSize: 13, fontWeight: 600, borderRadius: 10, textDecoration: 'none' }}>{t.login}</a>}
          {!isMobile && <a href="#" style={{ padding: '9px 18px', fontSize: 13, fontWeight: 600, borderRadius: 10, background: 'var(--accent)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 14px rgba(123,97,255,.4)', whiteSpace: 'nowrap' }}>{t.cta}</a>}
          {/* Hamburger - mobile only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              style={{ background: 'rgba(123,97,255,.1)', border: '1px solid rgba(123,97,255,.2)', color: 'var(--text-primary)', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mobile-menu open">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <a href="#" onClick={() => setMenuOpen(false)}>{t.login}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
