'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/i18n';
import { SYSTEM_LOGIN } from '@/lib/config';

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

  const MenuIcon = ({ open }: { open: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <motion.path d="M4 6H20" stroke="white" strokeWidth="2" strokeLinecap="round" animate={open ? { d: "M6 6L18 18" } : { d: "M4 6H20" }} transition={{ duration: 0.2 }} />
      <motion.path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
      <motion.path d="M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" animate={open ? { d: "M6 18L18 6" } : { d: "M4 18H20" }} transition={{ duration: 0.2 }} />
    </svg>
  );

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: isMobile ? 70 : (scrolled ? 68 : 88),
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: (scrolled || menuOpen) ? 'rgba(5, 5, 12, 0.75)' : 'transparent',
          backdropFilter: (scrolled || menuOpen) ? 'blur(24px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: (scrolled || menuOpen) ? 'blur(24px) saturate(1.2)' : 'none',
          borderBottom: (scrolled || menuOpen) ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 24px',
        }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <span style={{ 
              width: 36, height: 36, borderRadius: 10, 
              background: 'linear-gradient(135deg, #160e33 0%, #301e7a 100%)', 
              display: 'grid', placeItems: 'center', 
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
            }}>
              <OrbitLogoSVG />
            </span>
            <span style={{ color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              Orbit
            </span>
          </a>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: 36 }}>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                >
                  {label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {/* Lang Toggle */}
              <div style={{ display: 'flex', gap: 8 }}>
                {(['pt', 'en'] as Lang[]).map(l => (
                  <button key={l} onClick={() => setLang(l)} style={{
                    background: 'transparent',
                    border: 'none',
                    color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)',
                    fontWeight: lang === l ? 700 : 500,
                    fontSize: 13,
                    cursor: 'pointer',
                    padding: 0,
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { if(lang !== l) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                  onMouseLeave={e => { if(lang !== l) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)' }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
              <a
                href={SYSTEM_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
              >
                {t.login}
              </a>
              <a
                href={SYSTEM_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff',
                  color: '#050511',
                  padding: '10px 20px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                  (e.target as HTMLElement).style.boxShadow = '0 4px 14px rgba(255,255,255,0.2)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {t.cta}
              </a>
            </div>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, cursor: 'pointer', padding: 0
            }}>
              <MenuIcon open={menuOpen} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 70,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(3, 2, 8, 0.98)',
              backdropFilter: 'blur(30px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              padding: '32px 24px',
              overflowY: 'auto'
            }}
          >
            {/* Links da navegação */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ 
                  color: '#fff', fontSize: 24, fontWeight: 600, textDecoration: 'none', letterSpacing: '-0.02em',
                }}>
                  {label}
                </a>
              ))}
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '32px 0' }} />

            {/* Ações (Idiomas + Botões) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500 }}>Idioma</span>
                <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 100 }}>
                  {(['pt', 'en'] as Lang[]).map(l => (
                    <button key={l} onClick={() => setLang(l)} style={{
                      background: lang === l ? '#7b61ff' : 'transparent',
                      border: 'none', color: lang === l ? '#fff' : 'rgba(255,255,255,0.6)', 
                      fontWeight: 600, padding: '8px 16px', borderRadius: 100, fontSize: 13, transition: 'all 0.2s'
                    }}>
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href={SYSTEM_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{ 
                  color: '#fff', fontSize: 16, fontWeight: 600, textDecoration: 'none', textAlign: 'center', padding: '16px'
                }}
              >
                {t.login}
              </a>
              <a
                href={SYSTEM_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{ 
                  background: 'linear-gradient(135deg, #7b61ff 0%, #00d4ff 100%)',
                  color: '#fff', padding: '16px', textAlign: 'center', borderRadius: 16, fontSize: 16, fontWeight: 600, textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(123,97,255,0.4)'
                }}
              >
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
