import { FC, ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animate?: boolean;
}

const GradientText: FC<GradientTextProps> = ({
  children,
  className = '',
  colors = ['#678983', '#E6DDC4', '#F0E9D2'],
  animate = true,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate || !textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', gradientId);
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');

    colors.forEach((color, index) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', `${(index / (colors.length - 1)) * 100}%`);
      stop.setAttribute('stop-color', color);
      gradient.appendChild(stop);
    });

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.appendChild(gradient);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    // Apply gradient text effect
    const gradientText = `linear-gradient(90deg, ${colors.join(', ')})`;
    textRef.current.style.background = gradientText;
    textRef.current.style.backgroundClip = 'text';
    textRef.current.style.webkitBackgroundClip = 'text';
    textRef.current.style.webkitTextFillColor = 'transparent';
    textRef.current.style.color = 'transparent';
    // Fallback color for browsers that don't support background-clip
    if (!CSS.supports('background-clip', 'text')) {
      textRef.current.style.color = colors[0];
      textRef.current.style.webkitTextFillColor = colors[0];
    }

    if (animate) {
      let angle = 0;
      const animateGradient = () => {
        angle += 0.5;

        textRef.current!.style.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
        textRef.current!.style.backgroundClip = 'text';
        textRef.current!.style.webkitBackgroundClip = 'text';
      };

      const interval = setInterval(animateGradient, 50);

      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(textRef.current, {
            backgroundPosition: '200% 0',
            duration: 3,
            ease: 'none',
            repeat: -1,
          });
        },
      });

      return () => {
        clearInterval(interval);
        document.body.removeChild(svg);
      };
    }

    return () => {
      if (svg.parentNode) {
        document.body.removeChild(svg);
      }
    };
  }, [colors, animate]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

export default GradientText;

