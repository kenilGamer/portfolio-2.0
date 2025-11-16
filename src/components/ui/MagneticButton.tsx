import { FC, ReactNode, useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  magneticStrength?: number;
  rippleColor?: string;
  type?: 'button' | 'submit' | 'reset';
}

const MagneticButton: FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  magneticStrength = 0.3,
  rippleColor = 'rgba(255, 255, 255, 0.5)',
  type = 'button',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * magneticStrength,
      y: y * magneticStrength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !rippleRef.current) return;

    const button = buttonRef.current;
    const ripple = rippleRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // Reset ripple
    gsap.set(ripple, {
      x,
      y,
      width: 0,
      height: 0,
      opacity: 1,
    });

    // Animate ripple
    gsap.to(ripple, {
      width: size * 2,
      height: size * 2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Button scale animation
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    onClick?.(e);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span className="relative z-10">{children}</span>
      <span
        ref={rippleRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${rippleColor} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </button>
  );
};

export default MagneticButton;

