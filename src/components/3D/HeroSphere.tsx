import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Torus, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Radial glow backdrop ─── */
function GlowHalo() {
  return (
    <mesh>
      <sphereGeometry args={[1.65, 32, 32]} />
      <meshBasicMaterial
        color="#001a2e"
        transparent
        opacity={0.55}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

/* ─── Distorted energy sphere ─── */
function EnergySphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = t * 0.04;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.08, 128, 128]} />
      <MeshDistortMaterial
        color="#040910"
        metalness={0.9}
        roughness={0.1}
        distort={0.28}
        speed={1.2}
        envMapIntensity={4.6}
      />
    </mesh>
  );
}

/* ─── Bright pulsing icosahedron core ─── */
function CrystalCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.20;
    ref.current.rotation.z = t * 0.13;
    ref.current.scale.setScalar(0.85 + Math.sin(t * 2.2) * 0.12);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.48, 1]} />
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={4}
        metalness={0.3}
        roughness={0.05}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/* ─── Wireframe cage ─── */
function WireCage() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = -t * 0.05;
    ref.current.rotation.x = t * 0.03;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

/* ─── Orbit ring ─── */
function Ring({
  radius, tube, color, opacity, tilt, speed,
}: {
  radius: number; tube: number; color: string;
  opacity: number; tilt: [number, number, number]; speed: number;
}) {
  const grp = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (grp.current) grp.current.rotation.y = clock.elapsedTime * speed;
  });
  return (
    <group ref={grp} rotation={tilt}>
      <Torus args={[radius, tube, 8, 160]}>
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={1.8}
          transparent opacity={opacity} side={THREE.DoubleSide}
        />
      </Torus>
    </group>
  );
}

/* ─── Glow nodes orbiting a ring ─── */
function GlowNodes({ count, radius, color, speed }: {
  count: number; radius: number; color: string; speed: number;
}) {
  const grp = useRef<THREE.Group>(null);
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count],
  );
  useFrame(({ clock }) => {
    if (!grp.current) return;
    const t = clock.elapsedTime * speed;
    grp.current.children.forEach((ch, i) => {
      ch.position.x = Math.cos(t + offsets[i]) * radius;
      ch.position.z = Math.sin(t + offsets[i]) * radius;
      ch.position.y = Math.sin((t + offsets[i]) * 1.6) * 0.14;
    });
  });
  return (
    <group ref={grp}>
      {offsets.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={7}
            transparent opacity={0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Particle dust belt ─── */
function DustRing({ radius, count, color }: { radius: number; count: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.25;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count, radius]);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.07;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.02} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function SurroundingParticles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.1 + Math.random() * 1.7;

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d8f5ff" size={0.018} sizeAttenuation transparent opacity={0.22} />
    </points>
  );
}

/* ─── Complete scene ─── */
const HeroSphere = () => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 4.6], fov: 44 }}
    style={{ width: '100%', height: '100%' }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
  >
    {/* Lighting */}
    <ambientLight intensity={0.06} />
    <pointLight position={[2.9, 2.6, 3.1]} color="#00D4FF" intensity={15} distance={18} decay={2} />
    <pointLight position={[-2.8, -2.2, 2.2]} color="#F59E0B" intensity={10} distance={15} decay={2} />
    <pointLight position={[0, 0.5, 4]} color="#ffffff" intensity={0.8} distance={10} decay={2} />

    {/* Core — gentle float so sphere remains dominant */}
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <GlowHalo />
      <EnergySphere />
      <CrystalCore />
      <WireCage />
    </Float>

    {/* Rings — all radii ≤ 1.75 so they stay in-frame at fov 44, z=4.6 */}
    <Ring radius={1.36} tube={0.010} color="#00D4FF" opacity={0.95} tilt={[0.45, 0, 0.18]} speed={0.42} />
    <Ring radius={1.58} tube={0.008} color="#F59E0B" opacity={0.75} tilt={[1.05, 0, -0.32]} speed={-0.28} />
    <Ring radius={1.78} tube={0.005} color="#A78BFA" opacity={0.50} tilt={[0.2, 0, 1.05]} speed={0.16} />

    {/* Orbiting nodes */}
    <GlowNodes count={6} radius={1.37} color="#00D4FF" speed={0.42} />
    <GlowNodes count={4} radius={1.59} color="#F59E0B" speed={-0.28} />

    {/* Particle belts */}
    <DustRing radius={1.48} count={180} color="#00D4FF" />
    <DustRing radius={1.82} count={130} color="#A78BFA" />
    <SurroundingParticles count={240} />

    {/* Sparkle cloud */}
    <Sparkles count={44} scale={4.8} size={0.8} speed={0.2} opacity={0.2} color="#9CEBFF" />
  </Canvas>
);

export default HeroSphere;
