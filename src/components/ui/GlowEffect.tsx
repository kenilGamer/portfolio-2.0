import { FC, ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface GlowEffectProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

const GlowEffect: FC<GlowEffectProps> = ({
  children,
  className = '',
  glowColor = '#F45D01',
  intensity = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !glowRef.current) return;

    const container = containerRef.current;
    const glow = glowRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: intensity,
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full blur-3xl opacity-0"
        style={{
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {children}
    </div>
  );
};

export default GlowEffect;

