import { FC, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface CustomCursorProps {
  enabled?: boolean;
}

const CustomCursor: FC<CustomCursorProps> = ({ enabled = true }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'click'>('default');

  useEffect(() => {
    if (!enabled || !cursorRef.current || !followerRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trails: HTMLDivElement[] = [];

    // Create trail elements
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div');
      trail.className = 'fixed w-2 h-2 rounded-full bg-gradient-to-r from-[#F45D01] to-[#6559FF] pointer-events-none z-[9999] opacity-0';
      trail.style.transform = 'translate(-50%, -50%)';
      trail.style.transition = 'opacity 0.3s';
      document.body.appendChild(trail);
      trails.push(trail);
      trailRefs.current.push(trail);
    }

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update cursor position immediately
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });

      // Update follower with delay
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Update trail positions
      trails.forEach((trail, index) => {
        const delay = index * 0.05;
        gsap.to(trail, {
          x: mouseX,
          y: mouseY,
          duration: 0.3 + delay,
          ease: 'power2.out',
          opacity: 0.3 - index * 0.05,
        });
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(true);
        setCursorType('hover');
        gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        gsap.to(follower, { scale: 1.5, duration: 0.2 });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setIsHovering(false);
        setCursorType('default');
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { scale: 1, duration: 0.2 });
      }
    };

    const handleMouseDown = () => {
      setCursorType('click');
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
      gsap.to(follower, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      setCursorType(isHovering ? 'hover' : 'default');
      gsap.to(cursor, { scale: isHovering ? 1.5 : 1, duration: 0.1 });
      gsap.to(follower, { scale: isHovering ? 1.5 : 1, duration: 0.1 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      trails.forEach(trail => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      trailRefs.current = [];
    };
  }, [enabled, isHovering]);

  if (!enabled) return null;

  const cursorStyles = {
    default: 'bg-white/80',
    hover: 'bg-gradient-to-r from-[#F45D01] to-[#6559FF]',
    click: 'bg-[#F45D01]',
  };

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed w-4 h-4 rounded-full pointer-events-none z-[10000] ${cursorStyles[cursorType]} transition-colors duration-200`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className={`fixed w-8 h-8 rounded-full border-2 border-white/30 pointer-events-none z-[9999] transition-colors duration-200 ${
          cursorType === 'hover' ? 'border-[#F45D01]' : ''
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;

