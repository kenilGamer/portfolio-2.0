import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CustomCursorProps {
  enabled?: boolean;
}

const CustomCursor: FC<CustomCursorProps> = ({ enabled = true }) => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot: instant
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Ring: smooth lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]');

      if (isInteractive) {
        // Ring scales up 2x, dot disappears
        gsap.to(ring, {
          scale: 2,
          borderColor: 'var(--accent-cyan)',
          duration: 0.25,
          ease: 'back.out(2)',
        });
        gsap.to(dot, { opacity: 0, scale: 0, duration: 0.15 });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]');

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(0,212,255,0.5)',
          duration: 0.35,
          ease: 'elastic.out(1,0.5)',
        });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.1 });
      gsap.to(dot,  { scale: 0.7, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'elastic.out(1,0.5)' });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    document.addEventListener('mousemove',  handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown',  handleMouseDown);
    document.addEventListener('mouseup',    handleMouseUp);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove',  handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown',  handleMouseDown);
      document.removeEventListener('mouseup',    handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — 6px, instant, mix-blend-mode screen */}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10001,
          mixBlendMode: 'screen',
        }}
      />

      {/* Ring — 32px hollow, lagged */}
      <div
        ref={ringRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0,212,255,0.5)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </>
  );
};

export default CustomCursor;
