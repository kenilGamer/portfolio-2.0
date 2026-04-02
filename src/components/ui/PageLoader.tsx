import { FC, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-void)]"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,212,255,0.06)_0%,transparent_65%)]"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <h1 className="font-display text-[clamp(4rem,12vw,8rem)] leading-none tracking-[0.06em] text-[var(--text-primary)]">
          KENIL
          <span className="text-[var(--accent-cyan)]">.</span>
        </h1>

        {/* Progress bar */}
        <div className="w-48">
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-[rgba(100,200,255,0.1)]">
            <motion.div
              ref={barRef}
              className="h-full origin-left rounded-full bg-[linear-gradient(to_right,rgba(0,212,255,0.5),var(--accent-cyan))] shadow-[0_0_8px_rgba(0,212,255,0.6)]"
              animate={{ scaleX: Math.min(progress, 100) / 100 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Loading label */}
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[var(--text-dim)]">
          Loading experience...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
