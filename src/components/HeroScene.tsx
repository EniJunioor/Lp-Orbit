'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Stars,
  useGLTF,
  OrbitControls,
  Float,
  Trail,
  Sphere,
  Ring,
  MeshDistortMaterial,
} from '@react-three/drei'
import { useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import * as THREE from 'three'

// ─── Types ───────────────────────────────────────────────────────────────────

interface HeroSceneProps {
  rocketModelPath?: string
}

// ─── Sun Planet ──────────────────────────────────────────────────────────────

function SunPlanet() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.08
    }
    if (glowRef.current) {
      // Pulsing glow
      const pulse = Math.sin(clock.getElapsedTime() * 0.6) * 0.04
      glowRef.current.scale.setScalar(1.18 + pulse)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial
          color="#ff8c3a"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Mid glow */}
      <mesh>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa55"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main planet body */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color="#f5a623"
          emissive="#c97820"
          emissiveIntensity={0.4}
          roughness={0.7}
          metalness={0.1}
          distort={0.12}
          speed={1.2}
        />
      </mesh>

      {/* Inner bright core */}
      <pointLight color="#fff5cc" intensity={3.5} distance={12} decay={2} />
      <pointLight color="#ff6600" intensity={1.5} distance={8} decay={2} />
    </group>
  )
}

// ─── Ringed Planet ───────────────────────────────────────────────────────────

function RingedPlanet() {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      // Orbit around center
      const orbitRadius = 3.4
      const orbitSpeed = 0.22
      groupRef.current.position.x = Math.cos(t * orbitSpeed) * orbitRadius
      groupRef.current.position.z = Math.sin(t * orbitSpeed) * orbitRadius * 0.55
      groupRef.current.position.y = Math.sin(t * orbitSpeed) * 0.4 - 0.5
      // Self rotation
      groupRef.current.rotation.y = t * 0.35
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.PI * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[3.4, -0.5, 0]}>
      {/* Planet body */}
      <mesh castShadow>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshStandardMaterial
          color="#7b8fd4"
          emissive="#2a3a8a"
          emissiveIntensity={0.25}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[0.58, 0.9, 64]} />
        <meshBasicMaterial
          color="#9aa8e8"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ring shadow/depth */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[0.91, 1.05, 64]} />
        <meshBasicMaterial
          color="#6070c0"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
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
      const orbitRadius = 2.2
      groupRef.current.position.x = Math.cos(t * 0.55) * orbitRadius
      groupRef.current.position.z = Math.sin(t * 0.55) * orbitRadius * 0.6
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.3 + 0.8
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#d0cfe8"
          roughness={0.9}
          metalness={0.05}
          emissive="#8080b0"
          emissiveIntensity={0.1}
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
      // Curved trajectory — figure-8 inspired loop
      const speed = 0.28
      groupRef.current.position.x = Math.cos(t * speed) * 3.8 - 1.5
      groupRef.current.position.y = Math.sin(t * speed * 2) * 1.6 + 1.2
      groupRef.current.position.z = Math.sin(t * speed) * 1.2

      // Face direction of travel
      const nextT = t + 0.05
      const nx = Math.cos(nextT * speed) * 3.8 - 1.5
      const ny = Math.sin(nextT * speed * 2) * 1.6 + 1.2
      const nz = Math.sin(nextT * speed) * 1.2
      const dir = new THREE.Vector3(nx - groupRef.current.position.x, ny - groupRef.current.position.y, nz - groupRef.current.position.z).normalize()
      const quaternion = new THREE.Quaternion()
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      groupRef.current.quaternion.slerp(quaternion, 0.12)
    }
  })

  return (
    <Trail
      width={0.6}
      length={6}
      color={new THREE.Color('#ffffff')}
      attenuation={(t) => t * t}
    >
      <group ref={groupRef} scale={0.18}>
        <primitive object={scene} />
      </group>
    </Trail>
  )
}

// ─── Rocket Fallback (primitives) ────────────────────────────────────────────

function RocketPrimitive() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      const speed = 0.28
      groupRef.current.position.x = Math.cos(t * speed) * 3.8 - 1.5
      groupRef.current.position.y = Math.sin(t * speed * 2) * 1.6 + 1.2
      groupRef.current.position.z = Math.sin(t * speed) * 1.2

      const nextT = t + 0.05
      const nx = Math.cos(nextT * speed) * 3.8 - 1.5
      const ny = Math.sin(nextT * speed * 2) * 1.6 + 1.2
      const nz = Math.sin(nextT * speed) * 1.2
      const dir = new THREE.Vector3(nx - groupRef.current.position.x, ny - groupRef.current.position.y, nz - groupRef.current.position.z).normalize()
      const q = new THREE.Quaternion()
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      groupRef.current.quaternion.slerp(q, 0.12)
    }
  })

  return (
    <Trail
      width={0.5}
      length={5}
      color={new THREE.Color('#ffffffcc')}
      attenuation={(t) => t * t}
    >
      <group ref={groupRef}>
        {/* Body */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.1, 0.4, 12]} />
          <meshStandardMaterial color="#e8e8f0" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, 0.28, 0]}>
          <coneGeometry args={[0.06, 0.18, 12]} />
          <meshStandardMaterial color="#c0c8e8" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Fins */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
          <mesh key={i} position={[Math.cos(rot) * 0.08, -0.16, Math.sin(rot) * 0.08]} rotation={[0, rot, 0]}>
            <boxGeometry args={[0.04, 0.12, 0.08]} />
            <meshStandardMaterial color="#9090b8" metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
        {/* Exhaust glow */}
        <pointLight color="#4488ff" intensity={0.8} distance={1.2} decay={2} position={[0, -0.25, 0]} />
      </group>
    </Trail>
  )
}

// ─── Orbit Ring (decorative) ─────────────────────────────────────────────────

function OrbitRingDecor({ radius, tilt = 0 }: { radius: number; tilt?: number }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <ringGeometry args={[radius - 0.005, radius + 0.005, 128]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.06} side={THREE.DoubleSide} />
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
    // Lerp scroll effect on camera
    springProgress.current += (scrollProgress - springProgress.current) * 0.05
    const p = springProgress.current

    // Parallax: camera tilts/zooms slightly on scroll
    camera.position.y = THREE.MathUtils.lerp(1.2, -0.8, p)
    camera.position.z = THREE.MathUtils.lerp(7, 9, p)
    camera.rotation.x = THREE.MathUtils.lerp(-0.05, 0.12, p)
  })

  return (
    <>
      {/* Ambient & directional lights */}
      <ambientLight intensity={0.15} color="#1a1040" />
      <directionalLight
        position={[-8, 6, 4]}
        intensity={1.2}
        color="#fff5e0"
        castShadow
      />
      <directionalLight position={[5, -3, -5]} intensity={0.3} color="#6060ff" />

      {/* Stars field */}
      <Stars
        radius={80}
        depth={50}
        count={1500}
        factor={3}
        saturation={0.3}
        fade
        speed={0.4}
      />

      {/* Orbit rings decorative */}
      <OrbitRingDecor radius={2.2} tilt={0.18} />
      <OrbitRingDecor radius={3.4} tilt={0.22} />

      {/* Planets */}
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.3}>
        <SunPlanet />
      </Float>
      <RingedPlanet />
      <Moon />

      {/* Rocket */}
      <Suspense fallback={<RocketPrimitive />}>
        {rocketModelPath ? (
          <RocketModel path={rocketModelPath} />
        ) : (
          <RocketPrimitive />
        )}
      </Suspense>
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
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.2, 7], fov: 55, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <SceneContent
          scrollProgress={scrollProgressRef.current}
          rocketModelPath={rocketModelPath}
        />
      </Canvas>
    </div>
  )
}