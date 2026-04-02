import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface SkillCubeProps {
  color: string;
  accentColor?: string;
  hovered?: boolean;
}

/* ─── Outer Icosahedron wireframe ─── */
function IcoWire({ color, hovered = false }: { color: string; hovered?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const speed = hovered ? 2 : 1;
    meshRef.current.rotation.y = t * 0.35 * speed;
    meshRef.current.rotation.x = -t * 0.20 * speed;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.88, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={hovered ? 0.25 : 0.12} />
    </mesh>
  );
}

/* ─── Inner solid cube with glowing edges ─── */
function SolidBody({ color, accentColor, hovered = false }: { color: string; accentColor: string; hovered?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const speed = hovered ? 2 : 1;
    meshRef.current.rotation.y = t * 0.5 * speed;
    meshRef.current.rotation.x = t * 0.3 * speed;
    const pulse = 1 + Math.sin(t * 2.4) * (hovered ? 0.06 : 0.04);
    meshRef.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[0.78, 0.78, 0.78]} />
      <meshStandardMaterial
        color={color}
        metalness={0.98}
        roughness={0.06}
        emissive={accentColor}
        emissiveIntensity={hovered ? 0.18 : 0.08}
      />
      <Edges threshold={1} color={accentColor} />
    </mesh>
  );
}

/* ─── Corner node particles ─── */
function CornerNodes({ accentColor, hovered = false }: { accentColor: string; hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodePositions = useMemo(() => {
    const s = 0.45;
    return [
      [ s,  s,  s], [-s,  s,  s], [ s, -s,  s], [-s, -s,  s],
      [ s,  s, -s], [-s,  s, -s], [ s, -s, -s], [-s, -s, -s],
    ] as [number, number, number][];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const scale = 1 + Math.sin(t * 3.0) * (hovered ? 0.22 : 0.15);
    groupRef.current.children.forEach((ch) => ch.scale.setScalar(scale));
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Orbital ring ─── */
function OrbRing({ accentColor, speed, tilt, hovered = false }: { accentColor: string; speed: number; tilt: [number, number, number]; hovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed * (hovered ? 1.8 : 1);
  });
  return (
    <group ref={groupRef} rotation={tilt}>
      <mesh>
        <torusGeometry args={[0.95, 0.018, 6, 80]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

/* ─── Main exported component ─── */
const SkillCube = ({ color, accentColor = '#00D4FF', hovered = false }: SkillCubeProps) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      style={{ width: '88px', height: '88px' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lights */}
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]}   color={accentColor} intensity={5} decay={2} />
      <pointLight position={[-2, -2, 2]} color="#F59E0B"     intensity={2} decay={2} />

      {/* Floating scene group */}
      <Float speed={hovered ? 3.2 : 2.5} rotationIntensity={hovered ? 0.35 : 0.2} floatIntensity={hovered ? 0.45 : 0.3}>
        <SolidBody color={color} accentColor={accentColor} hovered={hovered} />
        <CornerNodes accentColor={accentColor} hovered={hovered} />
        <IcoWire color={accentColor} hovered={hovered} />
        <OrbRing accentColor={accentColor} speed={0.6} tilt={[Math.PI / 5, 0, 0.4]} hovered={hovered} />
        <OrbRing accentColor="#F59E0B" speed={-0.4} tilt={[Math.PI / 3, 0.3, 0]} hovered={hovered} />
      </Float>

      {/* Mini sparkle field */}
      <Sparkles
        count={hovered ? 30 : 20}
        scale={3}
        size={0.5}
        speed={0.3}
        opacity={hovered ? 0.55 : 0.4}
        color={accentColor}
      />
    </Canvas>
  );
};

export default SkillCube;
