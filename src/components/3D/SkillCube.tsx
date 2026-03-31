import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MiniCubeProps {
  color: string;
}

function RotatingCube({ color }: MiniCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.6;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

function WireframeCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.35;
    meshRef.current.rotation.y = t * 0.55;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.55, 1.55, 1.55]} />
      <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

const SkillCube = ({ color }: MiniCubeProps) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      style={{ width: '80px', height: '80px' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} color="#00D4FF" intensity={3} />
      <pointLight position={[-2, -2, 2]} color="#F59E0B" intensity={1.5} />
      <RotatingCube color={color} />
      <WireframeCube />
    </Canvas>
  );
};

export default SkillCube;
