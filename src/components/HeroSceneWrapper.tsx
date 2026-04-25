'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
})

export default function HeroSceneWrapper({
  rocketModelPath,
}: {
  rocketModelPath?: string
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isMobile) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#03020a', overflow: 'hidden' }}>
        {/* Glow de fundo difuso */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '80vw', height: '80vw', maxWidth: 400, maxHeight: 400, borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(123,97,255,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }} />
        
        {/* Corona Ciano (anel exterior) */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,212,255,0.4) 50%, transparent 60%)',
          filter: 'blur(8px)',
        }} />

        {/* Corona Roxa (anel interior vibrante) */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 210, height: 210, borderRadius: '50%',
          background: 'radial-gradient(circle at center, transparent 45%, #7b61ff 52%, transparent 60%)',
          filter: 'blur(4px)',
          boxShadow: '0 0 60px rgba(123,97,255,0.5)'
        }} />

        {/* Núcleo Negro do Eclipse */}
        <div style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 190, height: 190, borderRadius: '50%',
          background: '#020008',
        }} />
        
        {/* Estrelas estáticas para mobile */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.3,
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Foguete / Estrela Cadente animada via CSS puro (Super leve) */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, #ffffff)',
          borderRadius: '100%',
          boxShadow: '0 0 15px #00d4ff, 0 0 30px #7b61ff',
          animation: 'mobileRocket 6s infinite ease-in',
          transform: 'rotate(-20deg)',
          zIndex: 10
        }} />

        <style>{`
          @keyframes mobileRocket {
            0% { transform: translate(-20vw, -10vh) rotate(-20deg) scale(0.5); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(120vw, 40vh) rotate(-20deg) scale(1.5); opacity: 0; }
          }
          @keyframes pulseGlow {
            0% { opacity: 0.5; transform: translate(-50%,-50%) scale(0.95); }
            50% { opacity: 0.8; transform: translate(-50%,-50%) scale(1.05); }
            100% { opacity: 0.5; transform: translate(-50%,-50%) scale(0.95); }
          }
        `}</style>
      </div>
    )
  }

  return <HeroScene rocketModelPath={rocketModelPath} />
}
