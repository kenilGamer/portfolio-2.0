import { FC, ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedGradientProps {
  children?: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}

const AnimatedGradient: FC<AnimatedGradientProps> = ({
  children,
  className = '',
  colors = ['#F45D01', '#6559FF', '#004777'],
  speed = 1,
  direction = 'diagonal',
}) => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gradientRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const gradient = gradientRef.current;
    let angle = 0;
    const colorStops = colors.map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`).join(', ');

    const updateGradient = () => {
      let x = 50;
      let y = 50;

      if (direction === 'horizontal') {
        x = 50 + Math.sin(angle) * 30;
      } else if (direction === 'vertical') {
        y = 50 + Math.sin(angle) * 30;
      } else {
        x = 50 + Math.sin(angle) * 30;
        y = 50 + Math.cos(angle) * 30;
      }

      gradient.style.background = `radial-gradient(circle at ${x}% ${y}%, ${colorStops})`;
      angle += 0.01 * speed;
    };

    const scrollUpdate = () => {
      const scrollProgress = ScrollTrigger.scrollProgress() || 0;
      angle = scrollProgress * Math.PI * 2;
      updateGradient();
    };

    const animation = gsap.to({}, {
      duration: Infinity,
      repeat: -1,
      onUpdate: updateGradient,
    });

    ScrollTrigger.create({
      onUpdate: scrollUpdate,
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [colors, speed, direction]);

  return (
    <div
      ref={gradientRef}
      className={`absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${colors.map((color, i) => `${color} ${(i / (colors.length - 1)) * 100}%`).join(', ')})`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedGradient;

