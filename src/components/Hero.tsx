import { FC, lazy, Suspense, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import MagneticButton from './ui/MagneticButton';

const HeroSphere = lazy(() => import('./3D/HeroSphere'));

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const hudBadges = [
  { label: 'THREE.JS', positionClass: 'top-[12%] left-[8%]', delayClass: 'delay-0' },
  { label: 'GSAP · MOTION', positionClass: 'top-[70%] left-[5%]', delayClass: 'delay-[300ms]' },
  { label: 'R3F CANVAS', positionClass: 'top-[20%] right-[6%]', delayClass: 'delay-[600ms]' },
  { label: 'REACT · TS', positionClass: 'top-[78%] right-[8%]', delayClass: 'delay-[150ms]' },
] as const;

const Hero: FC<HeroProps> = ({ scrollToSection }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const sphereLayerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineWords = useMemo(() => ['CRAFTING', 'BEAUTIFUL', 'DIGITAL', 'EXPERIENCES'], []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2.2 });

      tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, 0);

      const chars = headlineRef.current?.querySelectorAll('.hero-char');
      if (chars?.length) {
        tl.fromTo(
          chars,
          { y: 100, rotationX: -90, opacity: 0, transformOrigin: '50% 100%' },
          { y: 0, rotationX: 0, opacity: 1, stagger: 0.025, duration: 0.85, ease: 'power4.out' },
          0.4
        );
      }

      tl.fromTo('.hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
      tl.fromTo('.hero-btn', { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6 }, '-=0.4');
      tl.fromTo('.hero-stats-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.65 }, '-=0.2');
      tl.fromTo('.hero-stat', { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, '-=0.2');
      tl.fromTo('.hud-float-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.15, duration: 0.5 }, '-=0.5');
      tl.fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden pt-[80px]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1440px] grid-cols-1 items-start gap-3 px-6 lg:grid-cols-[1.14fr_0.86fr] lg:px-10">
        <div ref={textLayerRef} className="flex flex-col gap-6 pt-2">
          <div className="flex flex-wrap gap-2.5">
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)] px-[0.9rem] py-[0.35rem] font-mono text-[0.65rem] tracking-[0.1em] text-[var(--accent-green)]">
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_var(--accent-green)] [animation:float_2s_ease-in-out_infinite]" />
              Available for work
            </span>
            <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[rgba(13,18,37,0.4)] px-[0.9rem] py-[0.35rem] font-mono text-[0.65rem] tracking-[0.1em] text-[var(--text-muted)]">
              India · Remote
            </span>
          </div>

          <div ref={headlineRef} className="perspective-text flex flex-col leading-[0.88]">
            {headlineWords.map((word) => (
              <div key={word} className="hero-word whitespace-nowrap font-display text-[clamp(2.9rem,4.9vw,6rem)] font-extrabold uppercase tracking-[0.035em] text-[var(--text-primary)]">
                {word.split('').map((char, index) => (
                  <span key={`${word}-${index}`} className="hero-char inline-block [transform-style:preserve-3d] [will-change:transform,opacity]">
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <p className="hero-sub max-w-[480px] font-body text-[clamp(0.95rem,1.5vw,1.1rem)] leading-[1.7] text-[var(--text-muted)]">
            Building modern web experiences with{' '}
            <span className="font-medium text-[var(--accent-cyan)]">React</span>,{' '}
            <span className="font-medium text-[var(--accent-cyan)]">TypeScript</span> &{' '}
            <span className="font-medium text-[var(--accent-cyan)]">Next.js</span>{' '}
            through responsive architecture, cinematic motion, and product-grade craft.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="hero-btn shimmer-btn flex cursor-pointer items-center gap-2 rounded-full border-0 bg-[var(--accent-cyan)] px-8 py-[0.85rem] font-mono text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-[var(--bg-void)] shadow-[0_0_24px_rgba(0,212,255,0.3)]"
              magneticStrength={0.35}
            >
              View My Work <span className="text-base">→</span>
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="hero-btn flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-transparent px-8 py-[0.85rem] font-mono text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] transition-colors"
              magneticStrength={0.35}
            >
              <span className="text-base">←</span> Get in Touch
            </MagneticButton>
          </div>

          <div className="flex flex-col gap-6">
            <div className="hero-stats-divider h-px w-full origin-left bg-gradient-to-r from-[rgba(100,200,255,0.45)] to-transparent" />
            <div className="flex w-full flex-wrap items-start justify-start gap-10">
              {[
                { value: '50+', label: 'Projects Built' },
                { value: '3+', label: 'Years Exp' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <div className="font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-none text-[var(--text-primary)]">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={sphereLayerRef} className="relative hidden h-[560px] md:block">
          <Suspense fallback={null}>
            <HeroSphere />
          </Suspense>

          {hudBadges.map((b) => (
            <div
              key={b.label}
              className={`hud-badge hud-float-badge animate-float absolute ${b.positionClass} ${b.delayClass} opacity-0`}
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>

      <div
        className="scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 opacity-0"
        onClick={() => scrollToSection('about')}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[var(--text-dim)]">Scroll</span>
        <div className="h-12 w-px animate-[float_2s_ease-in-out_infinite] bg-gradient-to-b from-[var(--accent-cyan)] to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
