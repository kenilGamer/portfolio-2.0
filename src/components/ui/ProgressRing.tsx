import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

const ProgressRing: FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  className = '',
  label,
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!circleRef.current || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(circleRef.current, {
          strokeDashoffset: circumference - (percentage / 100) * circumference,
          duration: 1.5,
          ease: 'power2.out',
        });
      },
    });
  }, [percentage, circumference]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(230, 221, 196, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="transition-all duration-300"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#678983" />
            <stop offset="100%" stopColor="#E6DDC4" />
          </linearGradient>
        </defs>
      </svg>
      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#E6DDC4]">{percentage}%</span>
          <span className="text-sm text-[#E6DDC4]/70 mt-1">{label}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;

