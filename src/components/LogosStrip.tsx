'use client';
import { motion } from 'framer-motion';

export default function LogosStrip({ label }: { label: string }) {
  const logos = ['NORTHBEAM', 'Lumen Co.', 'Apex Group', 'Vértice', 'Meridian'];
  // Duplicate array multiple times to ensure enough width for seamless scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div style={{padding:'40px 0',borderTop:'1px solid var(--border-subtle)',borderBottom:'1px solid var(--border-subtle)',marginTop:60, overflow: 'hidden'}}>
      <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--text-muted)',letterSpacing:'.08em',textTransform:'uppercase',textAlign:'center',marginBottom:24}}>{label}</div>
      
      {/* Container with fade masks on edges */}
      <div style={{
        display: 'flex',
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          style={{ display: 'flex', gap: 60, flexWrap: 'nowrap', opacity: .65, paddingRight: 60, width: 'max-content' }}
        >
          {duplicatedLogos.map((l, i) => {
            const originalIndex = i % logos.length;
            return (
              <div key={i} style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,letterSpacing:'-.02em',color:'var(--text-muted)',display:'flex',alignItems:'center',gap:8, whiteSpace: 'nowrap'}}>
                <span style={{width:18,height:18,border:'1.5px solid currentColor',borderRadius:originalIndex===1||originalIndex===4?'50%':originalIndex===2?0:4,display:'inline-block',transform:originalIndex===3?'rotate(45deg)':undefined}}/>
                {l}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
