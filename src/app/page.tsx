'use client';
import { useState } from 'react';
import { i18n, type Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import HeroScene from '@/components/HeroScene';
import LogosStrip from '@/components/LogosStrip';
import FeaturesSection from '@/components/FeaturesSection';
import ProductShowcase from '@/components/ProductShowcase';
import IntegrationsSection from '@/components/IntegrationsSection';
import BigCTA from '@/components/BigCTA';
import Footer from '@/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const [lang, setLang] = useState<Lang>('pt');
  const t = i18n[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #1a1040, #7b61ff, #00d4ff)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 9999,
        }}
      />
      {/* Background layers */}
      <div style={{
        position:'fixed',inset:0,zIndex:0,pointerEvents:'none',
        background:`radial-gradient(ellipse 80% 50% at 50% -10%,rgba(123,97,255,.18),transparent 60%),
          radial-gradient(ellipse 50% 40% at 90% 20%,rgba(0,212,255,.08),transparent 60%),
          radial-gradient(ellipse 60% 40% at 10% 60%,rgba(123,97,255,.08),transparent 60%)`
      }}/>
      <div style={{
        position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:.35,
        backgroundImage:`linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)`,
        backgroundSize:'56px 56px',
        maskImage:'radial-gradient(ellipse 80% 60% at 50% 30%,black 30%,transparent 75%)',
        WebkitMaskImage:'radial-gradient(ellipse 80% 60% at 50% 30%,black 30%,transparent 75%)',
      }}/>

      <Navbar t={t.nav} lang={lang} setLang={setLang} />
      <main>
        <HeroScene t={t} />
        <div style={{maxWidth:1240,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
          <LogosStrip label={t.logos} />
        </div>
        <FeaturesSection t={t.features} />
        <ProductShowcase t={t.product} />
        <IntegrationsSection t={t.integrations} />
        <BigCTA t={t.cta} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
