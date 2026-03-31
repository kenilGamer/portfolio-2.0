import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface SkillCubeProps {
  color: string;
  accentColor?: string;
}

/* ─── Outer Icosahedron wireframe ─── */
function IcoWire({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y =  t * 0.35;
    meshRef.current.rotation.x = -t * 0.20;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.88, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

/* ─── Inner solid cube with glowing edges ─── */
function GlowCube({ color, accentColor }: { color: string; accentColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.x = t * 0.3;
    const pulse = 1 + Math.sin(t * 2.4) * 0.04;
    meshRef.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[0.78, 0.78, 0.78]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.08}
        emissive={accentColor}
        emissiveIntensity={0.12}
      />
      <Edges threshold={1} color={accentColor} />
    </mesh>
  );
}

/* ─── Corner node particles ─── */
function CornerNodes({ accentColor }: { accentColor: string }) {
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
    const scale = 1 + Math.sin(t * 3.0) * 0.15;
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
function OrbRing({ accentColor, speed, tilt }: { accentColor: string; speed: number; tilt: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
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
const SkillCube = ({ color, accentColor = '#00D4FF' }: SkillCubeProps) => {
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
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <GlowCube   color={color} accentColor={accentColor} />
        <CornerNodes accentColor={accentColor} />
        <IcoWire    color={accentColor} />
        <OrbRing    accentColor={accentColor} speed={0.6}  tilt={[Math.PI / 5, 0, 0.4]} />
        <OrbRing    accentColor="#F59E0B"     speed={-0.4} tilt={[Math.PI / 3, 0.3, 0]} />
      </Float>

      {/* Mini sparkle field */}
      <Sparkles
        count={20}
        scale={3}
        size={0.5}
        speed={0.3}
        opacity={0.4}
        color={accentColor}
      />
    </Canvas>
  );
};

export default SkillCube;
