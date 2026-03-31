import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Distorted sphere
function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.55, 64, 64]} />
      <MeshDistortMaterial
        color="#0a0e1a"
        metalness={0.95}
        roughness={0.05}
        distort={0.35}
        speed={1.5}
        envMapIntensity={2}
      />
    </mesh>
  );
}

// Wireframe shell
function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.06;
    meshRef.current.rotation.y = t * 0.09;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.75, 18, 18]} />
      <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

// Orbit rings
function OrbitRing({ radius, color, opacity, tiltX, tiltZ, speed }: {
  radius: number; color: string; opacity: number; tiltX: number; tiltZ: number; speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      <Torus args={[radius, 0.012, 8, 120]}>
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </Torus>
    </group>
  );
}

const HeroSphere = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Lights */}
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 2]}  color="#00D4FF" intensity={4} distance={12} />
      <pointLight position={[-3, -3, 2]} color="#F59E0B" intensity={2.5} distance={12} />
      <pointLight position={[0, 0, 4]}  color="#ffffff"  intensity={0.3} />

      <DistortedSphere />
      <WireframeShell />
      <OrbitRing radius={2.1} color="#00D4FF" opacity={0.18} tiltX={Math.PI / 6} tiltZ={0.2} speed={0.3} />
      <OrbitRing radius={2.5} color="#F59E0B" opacity={0.08} tiltX={Math.PI / 4} tiltZ={-0.3} speed={-0.2} />
    </Canvas>
  );
};

export default HeroSphere;
