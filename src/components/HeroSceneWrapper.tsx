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
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 80% at 50% 30%,#1a0a3a 0%,#050511 55%,#020206 100%)', overflow: 'hidden' }}>
        {/* Fallback de background para mobile */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%,#fff 0%,#ffd88a 25%,#ff9e3f 55%,#d94eff 85%)',
          boxShadow: '0 0 40px rgba(255,200,100,.6),0 0 120px rgba(217,78,255,.5),0 0 200px rgba(123,97,255,.4)'
        }} />
      </div>
    )
  }

  return <HeroScene rocketModelPath={rocketModelPath} />
}
