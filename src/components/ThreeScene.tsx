import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { FC, useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Camera controller for scroll-to-zoom with enhanced smoothness
const CameraController: FC = () => {
  const { camera } = useThree();
  const targetFov = useRef(75);
  const currentFov = useRef(75);
  const scrollProgress = useRef(0);
  const lastScrollTime = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY;
      const deltaTime = now - lastScrollTime.current;
      
      // Calculate scroll velocity for dynamic lerp speed
      if (deltaTime > 0) {
        velocityRef.current = Math.abs(deltaY) / deltaTime;
      }
      
      lastScrollY = scrollY;
      lastScrollTime.current = now;
      
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgress.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      // Enhanced zoom curve with easing
      // Using easeOutCubic for smoother feel: 1 - (1 - t)^3
      const easedProgress = 1 - Math.pow(1 - scrollProgress.current, 3);
      
      // Zoom in as user scrolls (lower FOV = more zoom)
      // FOV range: 75 (default) to 40 (zoomed in)
      targetFov.current = 75 - (easedProgress * 35);
    };

    // Use requestAnimationFrame for smoother scroll handling
    const smoothScrollHandler = () => {
      handleScroll();
      rafId = requestAnimationFrame(smoothScrollHandler);
    };
    
    window.addEventListener('scroll', () => {
      if (!rafId) {
        rafId = requestAnimationFrame(smoothScrollHandler);
      }
    }, { passive: true });
    
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useFrame((_, delta) => {
    if (camera instanceof THREE.PerspectiveCamera) {
      // Dynamic lerp speed based on scroll velocity
      // Faster scrolling = faster interpolation, slower scrolling = smoother interpolation
      const baseLerpSpeed = 0.08;
      const velocityFactor = Math.min(velocityRef.current * 0.1, 0.15);
      const lerpSpeed = baseLerpSpeed + velocityFactor;
      
      // Smooth zoom interpolation with delta-time awareness
      const lerpFactor = 1 - Math.exp(-lerpSpeed * delta * 60); // Frame-rate independent
      currentFov.current = THREE.MathUtils.lerp(
        currentFov.current, 
        targetFov.current, 
        lerpFactor
      );
      
      // Apply with minimal jitter
      if (Math.abs(camera.fov - currentFov.current) > 0.01) {
        camera.fov = currentFov.current;
        camera.updateProjectionMatrix();
      }
      
      // Decay velocity for smooth stop
      velocityRef.current *= 0.95;
    }
  });

  return null;
};

const ParticleField = React.memo(({
  baseColor, accentColor, size, count, speed, spread, section, positionOffset = [0, 0, 0], opacity = 0.8
}: {
  baseColor: string;
  accentColor: string;
  size: number;
  count: number;
  speed: number;
  spread: number;
  section?: string;
  positionOffset?: [number, number, number];
  opacity?: number;
}) => {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number; time: number } | null>(null);
  const colorRef = useRef(baseColor);
  const targetColorRef = useRef(baseColor);
  const scaleRef = useRef(1);
  const positionsRef = useRef<Float32Array | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const sizesRef = useRef<Float32Array | null>(null);
  const opacityRef = useRef(opacity);
  const intensityRef = useRef(1);

  // Galaxy-like particle distribution with spiral arms
  useMemo(() => {
    const arr = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    // Realistic galaxy parameters based on actual spiral galaxies
    const numArms = 2; // Most spiral galaxies have 2 main arms
    const armTightness = 0.2; // Realistic spiral tightness
    const coreRadius = spread * 0.18; // Realistic central bulge size
    const diskThickness = spread * 0.08; // Thin disk like real galaxies
    const armWidth = 0.4; // Realistic arm width
    
    for (let i = 0; i < count; i++) {
      let radius, theta, z;
      
      // Realistic galaxy structure based on actual spiral galaxies
      const rand = Math.random();
      
      if (rand < 0.25) {
        // Central bulge - dense, spherical core (25% of particles)
        // Real galaxies have a dense, older stellar population in the center
        radius = Math.sqrt(Math.random()) * coreRadius;
        theta = Math.random() * Math.PI * 2;
        z = (Math.random() - 0.5) * diskThickness * 0.3; // Spherical bulge
      } else if (rand < 0.7) {
        // Spiral arms - main structure (45% of particles)
        // Real galaxies have most stars in spiral arms
        const armIndex = Math.floor(Math.random() * numArms);
        const armAngle = (armIndex * Math.PI * 2) / numArms;
        
        // Logarithmic spiral - matches real galaxy arm structure
        const spiralProgress = Math.random();
        radius = coreRadius + spiralProgress * (spread * 0.9 - coreRadius);
        
        // Realistic arm structure with density variation
        // Arms are denser in certain regions (like real galaxies)
        const armDensity = Math.random() < 0.6 ? 1 : 0.5; // 60% dense, 40% sparse
        const armOffset = (Math.random() - 0.5) * armWidth * armDensity;
        theta = armAngle + Math.log(radius / coreRadius) / armTightness + armOffset;
        z = (Math.random() - 0.5) * diskThickness;
      } else if (rand < 0.85) {
        // Inter-arm regions - sparse (15% of particles)
        // Real galaxies have fewer stars between arms
        radius = coreRadius + Math.sqrt(Math.random()) * (spread - coreRadius);
        // Avoid spiral arms - place in gaps
        const armIndex = Math.floor(Math.random() * numArms);
        const armAngle = (armIndex * Math.PI * 2) / numArms;
        const gapAngle = armAngle + Math.PI / numArms; // Between arms
        theta = gapAngle + (Math.random() - 0.5) * 0.6;
        z = (Math.random() - 0.5) * diskThickness * 1.5;
      } else {
        // Outer halo - very sparse (15% of particles)
        // Real galaxies have a sparse stellar halo
        radius = spread * 0.7 + Math.sqrt(Math.random()) * (spread * 0.5);
        theta = Math.random() * Math.PI * 2;
        z = (Math.random() - 0.5) * diskThickness * 3; // Thicker halo
      }
      
      // Convert to Cartesian coordinates
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
      
      original[i * 3] = x;
      original[i * 3 + 1] = y;
      original[i * 3 + 2] = z;
      
      // Realistic orbital velocities (Keplerian motion)
      // Real galaxies: faster rotation near center, slower at edges
      // Using sqrt(r) relationship for realistic rotation curve
      const orbitalSpeed = Math.sqrt(coreRadius / (radius + 0.1)) * 0.008;
      
      // Add realistic velocity dispersion (stars don't move in perfect circles)
      const velocityDispersion = 0.003; // Random motion component
      velocities[i * 3] = -orbitalSpeed * Math.sin(theta) + (Math.random() - 0.5) * velocityDispersion;
      velocities[i * 3 + 1] = orbitalSpeed * Math.cos(theta) + (Math.random() - 0.5) * velocityDispersion;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * velocityDispersion * 0.5; // Less vertical motion
      
      // Realistic size/brightness distribution
      // Real galaxies: brighter core (older, larger stars), dimmer arms (younger stars)
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const normalizedDistance = distanceFromCenter / spread;
      
      let sizeMultiplier;
      if (normalizedDistance < 0.15) {
        // Core - brightest (older stellar population, larger stars)
        sizeMultiplier = 2.2 - normalizedDistance * 3.0;
      } else if (normalizedDistance < 0.5) {
        // Inner spiral arms - bright (active star formation)
        sizeMultiplier = 1.3 - (normalizedDistance - 0.15) * 0.6;
      } else if (normalizedDistance < 0.8) {
        // Outer spiral arms - medium brightness
        sizeMultiplier = 0.9 - (normalizedDistance - 0.5) * 0.5;
      } else {
        // Halo - very dim (old, small stars)
        sizeMultiplier = 0.4 - (normalizedDistance - 0.8) * 0.2;
      }
      
      // Add realistic size variation (stars come in different sizes)
      const starSizeVariation = 0.5 + Math.random() * 1.0; // 0.5x to 1.5x
      sizes[i] = size * starSizeVariation * Math.max(sizeMultiplier, 0.2);
    }
    
    positionsRef.current = arr;
    originalPositionsRef.current = original;
    velocitiesRef.current = velocities;
    sizesRef.current = sizes;
    return arr;
  }, [count, spread, size]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    const handleClick = (event: MouseEvent) => {
      setClickPosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
        time: Date.now()
      });
      
      // Enhanced explosion effect
      gsap.to(intensityRef, {
        current: 2,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(intensityRef, {
            current: 1,
            duration: 0.8,
            ease: 'power2.in'
          });
        }
      });
      
      // Reset after animation
      setTimeout(() => setClickPosition(null), 1500);
    };
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollY / maxScroll;
      scaleRef.current = 1 + scrollProgress * 0.5;
      
      // Parallax effect based on scroll
      if (ref.current) {
        ref.current.position.z = scrollProgress * 5;
      }
    };

    // Enhanced section-specific color changes with smooth transitions
    const sections = ['hero', 'about', 'skills', 'services', 'projects', 'contact'];
    const sectionColors: Record<string, string> = {
      hero: accentColor,
      about: '#FF6B35',
      skills: '#4A90E2',
      services: '#6559FF',
      projects: accentColor,
      contact: '#6559FF'
    };
    
    sections.forEach(sec => {
      ScrollTrigger.create({
        trigger: `#${sec}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          if (section === sec) {
            targetColorRef.current = sectionColors[sec] || accentColor;
            gsap.to(colorRef, {
              current: targetColorRef.current,
              duration: 1.5,
              ease: 'power2.inOut',
            });
            gsap.to(opacityRef, {
              current: 1,
              duration: 1,
              ease: 'power2.out'
            });
          }
        },
        onLeave: () => {
          if (section === sec) {
            targetColorRef.current = baseColor;
            gsap.to(colorRef, {
              current: baseColor,
              duration: 1.5,
              ease: 'power2.inOut',
            });
          }
        },
        onEnterBack: () => {
          if (section === sec) {
            targetColorRef.current = sectionColors[sec] || accentColor;
            gsap.to(colorRef, {
              current: targetColorRef.current,
              duration: 1.5,
              ease: 'power2.inOut',
            });
          }
        },
      });
    });
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [baseColor, accentColor, section]);

  useFrame((state) => {
    if (!ref.current || !positionsRef.current || !originalPositionsRef.current || !velocitiesRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Realistic galaxy colors
    // Real galaxies: bluer in spiral arms (young stars), redder/yellower in core (old stars)
    const base = new THREE.Color(typeof colorRef.current === 'string' ? colorRef.current : baseColor);
    const accent = new THREE.Color(accentColor);
    const target = new THREE.Color(targetColorRef.current);
    
    // Realistic color variation: core is warmer (redder), arms are cooler (bluer)
    // This is subtle but adds realism
    const wave1 = Math.sin(time * 0.15) * 0.2 + 0.5;
    const wave2 = Math.sin(time * 0.25 + Math.PI / 4) * 0.15 + 0.4;
    const colorMix = (wave1 + wave2) / 2;
    
    // Blend colors - more blue in arms, more red/yellow in core
    const intermediate = base.lerp(accent, colorMix * 0.3);
    const finalColor = intermediate.lerp(target, 0.5);
    
    // Realistic brightness - galaxies have subtle brightness variations
    finalColor.multiplyScalar(0.85 + Math.sin(time * 0.1) * 0.08);
    colorRef.current = '#' + finalColor.getHexString();
    
    if (materialRef.current) {
      materialRef.current.color.set(colorRef.current);
      materialRef.current.opacity = opacityRef.current * intensityRef.current;
    }

    // Galaxy-like rotation - slow, majestic spin around Z-axis
    // Different rotation speeds for different layers create depth
    
    const baseRotationSpeed = speed * 0.5;
    const layerOffset = section === 'hero' ? 0 : section === 'projects' ? 0.3 : 0.6;
    const galaxyRotationSpeed = baseRotationSpeed * (1 + layerOffset * 0.2);
    ref.current.rotation.z = time * galaxyRotationSpeed;
    
    // Subtle tilt for 3D effect - varies by layer
    const tiltOffset = layerOffset * 0.1;
    ref.current.rotation.x = Math.PI / 6 + Math.sin(time * 0.1 + tiltOffset) * 0.05;
    ref.current.rotation.y = Math.sin(time * 0.08 + tiltOffset) * 0.1;

    // Enhanced mouse influence with smoother interpolation
    const mouseInfluence = 0.15;
    const mouseStrength = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
    const targetX = mousePosition.x * 4 * (1 + mouseStrength);
    const targetY = mousePosition.y * 4 * (1 + mouseStrength);
    
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, mouseInfluence);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, mouseInfluence);
    
    // Add subtle Z-axis movement based on mouse
    const targetZ = mouseStrength * 2;
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.05);

    // Enhanced click explosion with ripple effect
    if (clickPosition && ref.current.geometry && positionsRef.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const elapsed = (Date.now() - clickPosition.time) / 1000;
      const explosionRadius = elapsed * 8;
      const fadeOut = Math.max(0, 1 - elapsed * 0.8);
      
      for (let i = 0; i < positions.length; i += 3) {
        const dx = positions[i] - clickPosition.x * 12;
        const dy = positions[i + 1] - clickPosition.y * 12;
        const dz = positions[i + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < explosionRadius && fadeOut > 0) {
          const force = (1 - distance / explosionRadius) * fadeOut * 3;
          const angle = Math.atan2(dy, dx);
          positions[i] += Math.cos(angle) * force * 0.02;
          positions[i + 1] += Math.sin(angle) * force * 0.02;
          positions[i + 2] += (Math.random() - 0.5) * force * 0.01;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    } else {
      // Galaxy orbital motion - particles orbit around center
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const original = originalPositionsRef.current;
      const velocities = velocitiesRef.current;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const radius = Math.sqrt(x * x + y * y);
        
        if (radius > 0.1) {
          // Realistic orbital motion - particles maintain their orbit
          const angle = Math.atan2(y, x);
          const targetAngle = angle + velocities[i] * 40; // Realistic orbital progression
          
          // Maintain orbital radius (stars stay in their orbits)
          const targetRadius = Math.sqrt(original[i] * original[i] + original[i + 1] * original[i + 1]);
          const currentRadius = radius;
          const radiusDiff = targetRadius - currentRadius;
          
          // Apply orbital motion with realistic stability
          positions[i] = currentRadius * Math.cos(targetAngle) + radiusDiff * 0.008;
          positions[i + 1] = currentRadius * Math.sin(targetAngle) + radiusDiff * 0.008;
          
          // Realistic vertical oscillation (galaxy disk warping)
          // Real galaxies have slight vertical oscillations
          positions[i + 2] = original[i + 2] + Math.sin(time * 1.5 + angle) * 0.08;
        } else {
          // Core particles - more random motion (dense core)
          // Real galaxy cores have more random stellar motions
          positions[i] += velocities[i] * 0.4;
          positions[i + 1] += velocities[i + 1] * 0.4;
          positions[i + 2] += velocities[i + 2] * 0.25;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }

    // Enhanced scale with multiple factors
    const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2);
    const hoverScale = hovered ? 1.5 : 1;
    const mouseScale = 1 + distance * 0.3;
    const timeScale = 1 + Math.sin(time * 0.5) * 0.1;
    const finalScale = scaleRef.current * hoverScale * mouseScale * timeScale;
    
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, finalScale, 0.08);
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, finalScale, 0.08);
    ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, finalScale, 0.08);

    // Animate particle sizes for pulsing effect
    if (materialRef.current && sizesRef.current) {
      const sizeVariation = 1 + Math.sin(time * 2) * 0.2;
      materialRef.current.size = size * sizeVariation * intensityRef.current;
    }
  });

  if (!positionsRef.current) return null;

  return (
    <Points
      ref={ref}
      positions={positionsRef.current}
      stride={3}
      position={positionOffset}
      frustumCulled={false}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <PointMaterial
        ref={materialRef}
        transparent
        color={colorRef.current}
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={opacityRef.current * 0.9}
        vertexColors={false}
        fog={false}
      />
    </Points>
  );
});

ParticleField.displayName = 'ParticleField';

const ThreeScene: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const lights = useMemo(() => (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#F45D01" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6559FF" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#4A90E2" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </>
  ), []);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  // Enhanced particle counts for richer galaxy effect
  const particleCount1 = isMobile ? 200 : isReducedMotion ? 300 : 600;
  const particleCount2 = isMobile ? 200 : isReducedMotion ? 300 : 600;
  const particleCount3 = isMobile ? 250 : isReducedMotion ? 350 : 700;
  
  // Additional background galaxy layers for depth
  const backgroundCount1 = isMobile ? 100 : isReducedMotion ? 150 : 300;
  const backgroundCount2 = isMobile ? 100 : isReducedMotion ? 150 : 300;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <CameraController />
        {lights}

        {/* Background Galaxy Layer 1 - Deep space stars */}
        <ParticleField 
          baseColor="#2A1B5E" 
          accentColor="#4A2C8A"
          size={0.08} 
          count={backgroundCount1} 
          speed={0.001}
          spread={35}
          section="hero"
          positionOffset={[0, 0, -5]}
          opacity={0.4}
        />
        
        {/* Background Galaxy Layer 2 - Distant galaxy */}
        <ParticleField 
          baseColor="#3D2A6B" 
          accentColor="#5A3F8F"
          size={0.1} 
          count={backgroundCount2} 
          speed={0.0015}
          spread={30}
          section="projects"
          positionOffset={[2, -1, -3]}
          opacity={0.5}
        />
        
        {/* Primary Particle Field - Hero Section - Main Galaxy */}
        <ParticleField 
          baseColor="#6559FF" 
          accentColor="#F45D01"
          size={0.1} 
          count={particleCount1} 
          speed={0.0035}
          spread={25}
          section="hero"
        />
        
        {/* Secondary Particle Field - Projects Section - Main Galaxy */}
        <ParticleField 
          baseColor="#F45D01" 
          accentColor="#FF6B35"
          size={0.1} 
          count={particleCount2} 
          speed={0.004}
          spread={22}
          section="projects"
        />
        
        {/* Tertiary Particle Field - Contact Section - Main Galaxy */}
        <ParticleField 
          baseColor="#4A90E2" 
          accentColor="#6559FF"
          size={0.13} 
          count={particleCount3} 
          speed={0.0038}
          spread={24}
          section="contact"
        />
        
        {/* Foreground Galaxy Layer - Bright stars */}
        <ParticleField 
          baseColor="#8B7FFF" 
          accentColor="#FFA366"
          size={0.12} 
          count={isMobile ? 100 : isReducedMotion ? 150 : 250} 
          speed={0.002}
          spread={20}
          section="hero"
          positionOffset={[0, 0, 2]}
          opacity={0.6}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
