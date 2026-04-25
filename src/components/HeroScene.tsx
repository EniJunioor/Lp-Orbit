'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Stars,
  useGLTF,
  Float,
  Trail,
  Sparkles,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'

interface HeroSceneProps {
  rocketModelPath?: string
}

// ─── Eclipse (Dark Core with Glowing Corona) ─────────────────────────────────
// Fica muito melhor atrás de textos porque o meio escuro não atrapalha a leitura!
function EclipseCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.05
    }
    if (coronaRef.current) {
      // Pulsação suave da corona
      coronaRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.02)
    }
  })

  // Núcleo escuro (buraco negro / eclipse)
  const coreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#020008',
      emissive: '#000000',
      roughness: 0.2,
      metalness: 0.8,
    })
  }, [])

  return (
    <group position={[0, 0, -3]}>
      {/* Luz principal irradiando do eclipse */}
      <pointLight color="#7b61ff" intensity={4} distance={30} decay={1.5} />
      <pointLight color="#00d4ff" intensity={2} distance={15} decay={2} position={[0, 0, 2]} />

      {/* Core principal escuro */}
      <mesh ref={coreRef} material={coreMaterial}>
        <sphereGeometry args={[2.0, 64, 64]} />
      </mesh>

      {/* Corona brilhante (Anel de luz ao redor) */}
      <group ref={coronaRef} position={[0, 0, -0.1]}>
        {/* Camada Rixa intensa */}
        <mesh>
          <ringGeometry args={[1.9, 2.1, 128]} />
          <meshBasicMaterial 
            color="#7b61ff" 
            transparent 
            opacity={0.8} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </mesh>
        
        {/* Camada Ciano exterior suave */}
        <mesh position={[0, 0, -0.1]}>
          <ringGeometry args={[2.0, 2.5, 128]} />
          <meshBasicMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </mesh>

        {/* Glow difuso super grande */}
        <mesh position={[0, 0, -0.2]}>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial
            color="#7b61ff"
            transparent
            opacity={0.06}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

// ─── Floating Planet (Sem Anéis) ─────────────────────────────────────────────

function FloatingPlanet() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      // Orbit around center slowly
      const orbitRadius = 4.8
      const orbitSpeed = 0.12
      groupRef.current.position.x = Math.cos(t * orbitSpeed) * orbitRadius
      groupRef.current.position.z = Math.sin(t * orbitSpeed) * orbitRadius - 1
      groupRef.current.position.y = Math.sin(t * orbitSpeed * 1.5) * 0.5 - 0.2
      
      groupRef.current.rotation.y = t * 0.2
      groupRef.current.rotation.x = t * 0.1
    }
  })

  // Material super liso/metálico para refletir as luzes coloridas
  const planetMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d0d1a',
    roughness: 0.15,
    metalness: 0.9,
  }), [])

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow material={planetMaterial}>
        <sphereGeometry args={[0.65, 64, 64]} />
      </mesh>
    </group>
  )
}

// ─── Small Moon ──────────────────────────────────────────────────────────────

function Moon() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      const orbitRadius = 3.2
      groupRef.current.position.x = Math.sin(t * 0.35) * orbitRadius
      groupRef.current.position.z = Math.cos(t * 0.35) * orbitRadius - 2
      groupRef.current.position.y = Math.sin(t * 0.5) * 1.5 + 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#a1a1d1"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  )
}

// ─── Rocket (GLB) ────────────────────────────────────────────────────────────

function RocketModel({ path }: { path: string }) {
  const { scene } = useGLTF(path)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      const speed = 0.35
      groupRef.current.position.x = Math.cos(t * speed) * 5
      groupRef.current.position.y = Math.sin(t * speed * 2) * 2
      groupRef.current.position.z = Math.sin(t * speed) * 3

      const nextT = t + 0.05
      const nx = Math.cos(nextT * speed) * 5
      const ny = Math.sin(nextT * speed * 2) * 2
      const nz = Math.sin(nextT * speed) * 3
      const dir = new THREE.Vector3(nx - groupRef.current.position.x, ny - groupRef.current.position.y, nz - groupRef.current.position.z).normalize()
      const quaternion = new THREE.Quaternion()
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      groupRef.current.quaternion.slerp(quaternion, 0.15)
    }
  })

  return (
    <Trail
      width={0.8}
      length={12}
      color={new THREE.Color('#00d4ff')}
      attenuation={(t) => t * t}
    >
      <group ref={groupRef} scale={0.25}>
        <primitive object={scene} />
        {/* Glow at the thruster */}
        <pointLight color="#00d4ff" intensity={4} distance={4} position={[0, -0.5, 0]} />
      </group>
    </Trail>
  )
}

// ─── Rocket Fallback (Premium Primitives) ────────────────────────────────────

function RocketPrimitive() {
  const groupRef = useRef<THREE.Group>(null)
  
  const emissiveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#00d4ff',
      emissive: '#00d4ff',
      toneMapped: false
    })
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      const speed = 0.4
      // Figure 8 dynamic path
      groupRef.current.position.x = Math.cos(t * speed) * 4.5
      groupRef.current.position.y = Math.sin(t * speed * 1.5) * 1.5
      groupRef.current.position.z = Math.sin(t * speed) * 2.5 + 2

      const nextT = t + 0.05
      const nx = Math.cos(nextT * speed) * 4.5
      const ny = Math.sin(nextT * speed * 1.5) * 1.5
      const nz = Math.sin(nextT * speed) * 2.5 + 2
      const dir = new THREE.Vector3(nx - groupRef.current.position.x, ny - groupRef.current.position.y, nz - groupRef.current.position.z).normalize()
      const q = new THREE.Quaternion()
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      groupRef.current.quaternion.slerp(q, 0.2)
    }
  })

  return (
    <Trail
      width={0.3}
      length={20}
      color={new THREE.Color('#00d4ff')}
      attenuation={(t) => t * t}
    >
      <group ref={groupRef} scale={1.8}>
        {/* Main Body */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.1, 0.5, 24]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Dark Nose */}
        <mesh position={[0, 0.35, 0]}>
          <coneGeometry args={[0.06, 0.2, 24]} />
          <meshStandardMaterial color="#1a1040" metalness={0.6} roughness={0.4} />
        </mesh>
        
        {/* Sleek Fins */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
          <mesh key={i} position={[Math.cos(rot) * 0.1, -0.15, Math.sin(rot) * 0.1]} rotation={[0, rot, 0]}>
            <boxGeometry args={[0.015, 0.25, 0.12]} />
            <meshStandardMaterial color="#7b61ff" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        
        {/* Engine Base */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#222" metalness={0.9} />
        </mesh>
        
        {/* Glowing Engine Flame */}
        <mesh position={[0, -0.38, 0]}>
          <coneGeometry args={[0.04, 0.2, 16]} />
          <primitive object={emissiveMaterial} attach="material" />
        </mesh>
        <pointLight color="#00d4ff" intensity={3} distance={4} decay={2} position={[0, -0.4, 0]} />
      </group>
    </Trail>
  )
}

// ─── Orbit Ring (decorative) ─────────────────────────────────────────────────

function OrbitRingDecor({ radius, tilt = 0, speed = 0.05 }: { radius: number; tilt?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed
    }
  })
  
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]} position={[0, 0, -2]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
      <meshBasicMaterial color="#7b61ff" transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

// ─── Scene Content ───────────────────────────────────────────────────────────

function SceneContent({
  scrollProgress,
  rocketModelPath,
}: {
  scrollProgress: number
  rocketModelPath?: string
}) {
  const { camera } = useThree()
  const springProgress = useRef(scrollProgress)

  useFrame(() => {
    springProgress.current += (scrollProgress - springProgress.current) * 0.05
    const p = springProgress.current

    // Movimento suave e cinematográfico da câmera
    camera.position.y = THREE.MathUtils.lerp(1.5, -1.2, p)
    camera.position.z = THREE.MathUtils.lerp(8, 11, p)
    camera.position.x = THREE.MathUtils.lerp(0, 1.5, p)
    camera.rotation.x = THREE.MathUtils.lerp(-0.05, 0.15, p)
    camera.rotation.y = THREE.MathUtils.lerp(0, 0.1, p)
  })

  return (
    <>
      <color attach="background" args={['#03020a']} />
      <ambientLight intensity={0.2} color="#7b61ff" />
      
      {/* Estrelas dinâmicas */}
      <Stars radius={100} depth={50} count={2500} factor={4} saturation={1} fade speed={1} />
      
      {/* Poeira espacial brilhante */}
      <Sparkles count={300} scale={15} size={2} speed={0.4} opacity={0.3} color="#00d4ff" />
      <Sparkles count={200} scale={20} size={3} speed={0.2} opacity={0.2} color="#7b61ff" />

      {/* Linhas de Órbita */}
      <OrbitRingDecor radius={3.2} tilt={0.1} speed={0.02} />
      <OrbitRingDecor radius={4.8} tilt={-0.15} speed={-0.015} />
      <OrbitRingDecor radius={6.5} tilt={0.05} speed={0.01} />

      {/* Eclipse (Fundo central) */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <EclipseCore />
      </Float>
      
      {/* Planetas */}
      <FloatingPlanet />
      <Moon />

      {/* Rocket */}
      <Suspense fallback={<RocketPrimitive />}>
        {rocketModelPath ? (
          <RocketModel path={rocketModelPath} />
        ) : (
          <RocketPrimitive />
        )}
      </Suspense>

      {/* Post-Processing */}
      <EffectComposer multisampling={4}>
        <Bloom 
          luminanceThreshold={0.5} 
          intensity={1.0} 
        />
      </EffectComposer>
    </>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function HeroScene({ rocketModelPath }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)

  const { scrollYProgress } = useScroll()

  // Keep a mutable ref synced to scroll (avoids re-render)
  scrollYProgress.on('change', (v) => {
    scrollProgressRef.current = Math.min(v * 3, 1) // first 33% of page scroll
  })

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        camera={{ position: [0, 1.5, 8], fov: 50, near: 0.1, far: 200 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <SceneContent
          scrollProgress={scrollProgressRef.current}
          rocketModelPath={rocketModelPath}
        />
      </Canvas>
    </div>
  )
}