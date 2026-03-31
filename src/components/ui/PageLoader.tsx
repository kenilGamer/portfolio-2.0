import { FC, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const PageLoader: FC = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 18;
        return next >= 100 ? 100 : next;
      });
    }, 80);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      // Cinematic slide-up exit
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          y: '-100%',
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.3,
          onComplete: () => setDone(true),
        });
      }
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${Math.min(progress, 100)}%`,
        duration: 0.25,
        ease: 'power1.out',
      });
    }
  }, [progress]);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-void)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            lineHeight: 1,
            color: 'var(--text-primary)',
            letterSpacing: '0.06em',
          }}
        >
          KENIL
          <span style={{ color: 'var(--accent-cyan)' }}>.</span>
        </h1>

        {/* Progress bar */}
        <div style={{ width: '192px' }}>
          <div
            style={{
              width: '192px',
              height: '2px',
              background: 'rgba(100,200,255,0.1)',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <div
              ref={barRef}
              style={{
                width: '0%',
                height: '100%',
                borderRadius: '9999px',
                background: 'linear-gradient(to right, rgba(0,212,255,0.5), var(--accent-cyan))',
                boxShadow: '0 0 8px rgba(0,212,255,0.6)',
                transition: 'none',
              }}
            />
          </div>
        </div>

        {/* Loading label */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}
        >
          Loading experience...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
