import { FC, useMemo, useRef, lazy, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import MagneticButton from './ui/MagneticButton';

const HeroSphere = lazy(() => import('./3D/HeroSphere'));

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const hudBadges = [
  { label: 'THREE.JS', top: '12%', left: '8%', delay: 0 },
  { label: 'GSAP · MOTION', top: '70%', left: '5%', delay: 0.3 },
  { label: 'R3F CANVAS', top: '20%', right: '6%', delay: 0.6 },
  { label: 'REACT · TS', top: '78%', right: '8%', delay: 0.15 },
] as const;

const Hero: FC<HeroProps> = ({ scrollToSection }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const sphereLayerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineWords = useMemo(
    () => ['CRAFTING', 'BEAUTIFUL', 'DIGITAL', 'EXPERIENCES'],
    []
  );

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 2.2 });

      tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, 0);

      const chars = headlineRef.current?.querySelectorAll('.hero-char');
      if (chars?.length) {
        tl.fromTo(
          chars,
          {
            y: 100,
            rotationX: -90,
            opacity: 0,
            transformOrigin: '50% 100%',
          },
          {
            y: 0,
            rotationX: 0,
            opacity: 1,
            stagger: 0.025,
            duration: 0.85,
            ease: 'power4.out',
          },
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
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Desktop: 2 columns | Mobile: single column */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.06fr) minmax(0, 0.94fr)',
          alignItems: 'start',
          minHeight: 'calc(100vh - 80px)',
          
          gap: '0.75rem',
          maxWidth: '1320px',
          margin: '0 auto',
        }}
      >
        {/* ---- LEFT: Text content ---- */}
        <div ref={textLayerRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '0.5rem' }}>

          {/* Availability badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <span className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
              padding: '0.35rem 0.9rem', borderRadius: '9999px',
              border: '1px solid rgba(34,197,94,0.3)',
              color: 'var(--accent-green)',
              background: 'rgba(34,197,94,0.06)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 6px var(--accent-green)', animation: 'float 2s ease-in-out infinite' }} />
              Available for work
            </span>
            <span className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
              padding: '0.35rem 0.9rem', borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              background: 'rgba(13,18,37,0.4)',
            }}>
              India · Remote
            </span>
          </div>

          {/* Headline: 4 words stacked */}
          <div ref={headlineRef} className="perspective-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.88 }}>
            {headlineWords.map((word) => (
              <div key={word} className="hero-word" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 6.1vw, 7rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {word.split('').map((char, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="hero-char"
                    style={{
                      display: 'inline-block',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Sub-headline */}
          <p className="hero-sub" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'var(--text-muted)',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}>
            Building modern web experiences with{' '}
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>React</span>,{' '}
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>TypeScript</span> &{' '}
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>Next.js</span>{' '}
            through responsive architecture, cinematic motion, and product-grade craft.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="hero-btn shimmer-btn"
              magneticStrength={0.35}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.85rem 2rem',
                borderRadius: '9999px',
                background: 'var(--accent-cyan)',
                color: 'var(--bg-void)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 24px rgba(0,212,255,0.3)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
            >
              View My Work <span style={{ fontSize: '1rem' }}>→</span>
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="hero-btn"
              magneticStrength={0.35}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.85rem 2rem',
                borderRadius: '9999px',
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'border-color 0.3s',
              }}
            >
              <span style={{ fontSize: '1rem' }}>←</span> Get in Touch
            </MagneticButton>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <div
              className="hero-stats-divider"
              style={{
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, rgba(100,200,255,0.45), transparent)',
                transformOrigin: 'left center',
              }}
            />
            <div style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
              flexWrap: 'wrap',
            }}>
              {[
                { value: '50+', label: 'Projects Built' },
                { value: '3+', label: 'Years Exp' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map(stat => (
                <div key={stat.label} className="hero-stat">
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginTop: '0.3rem',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- RIGHT: 3D Sphere (hidden on mobile) ---- */}
        <div
          ref={sphereLayerRef}
          className="hidden md:block"
          style={{ position: 'relative', height: '560px' }}
        >
          <Suspense fallback={null}>
            <HeroSphere />
          </Suspense>

          {/* Floating HUD Badges */}
          {hudBadges.map(b => (
            <div
              key={b.label}
              className="hud-badge hud-float-badge animate-float"
              style={{
                position: 'absolute',
                top: b.top,
                left: 'left' in b ? b.left : undefined,
                right: 'right' in b ? b.right : undefined,
                animationDelay: `${b.delay}s`,
                opacity: 0,
              }}
            >
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
          cursor: 'pointer',
        }}
        onClick={() => scrollToSection('about')}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </div>
  );
};

export default Hero;
