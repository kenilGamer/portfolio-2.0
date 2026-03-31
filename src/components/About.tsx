import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FC, useRef } from 'react';

interface AboutProps {
  scrollToSection: (id: string) => void;
}

const techStack = {
  Frontend:  ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'],
  Backend:   ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'PHP'],
  Tooling:   ['Git', 'Docker', 'Figma', 'Vite', 'VS Code'],
};

const About: FC<AboutProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Photo slides in from left
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
      // Content items stagger up
      gsap.fromTo('.about-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Section label */}
        <div className="section-label about-item" style={{ marginBottom: '1rem' }}>
          02 / About
        </div>

        {/* Two-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>

          {/* ---- LEFT: Photo ---- */}
          <div ref={imgRef} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', maxWidth: '380px' }}>
              {/* Corner brackets */}
              <div style={{
                position: 'absolute', inset: '-8px',
                pointerEvents: 'none', zIndex: 3,
              }}>
                {/* TL */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px',
                  borderTop: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)', opacity: 0.7 }} />
                {/* TR */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px',
                  borderTop: '2px solid var(--accent-cyan)', borderRight: '2px solid var(--accent-cyan)', opacity: 0.7 }} />
                {/* BL */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px',
                  borderBottom: '2px solid var(--accent-cyan)', borderLeft: '2px solid var(--accent-cyan)', opacity: 0.7 }} />
                {/* BR */}
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px',
                  borderBottom: '2px solid var(--accent-cyan)', borderRight: '2px solid var(--accent-cyan)', opacity: 0.7 }} />
              </div>

              {/* Image container */}
              <div
                className="grayscale-hover"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  position: 'relative',
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src="/1000068353-Picsart-AiImageEnhancer.jpg-Photoroom.jpeg"
                  alt="Kenil Sangani — Full-Stack Developer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                  background: 'linear-gradient(to top, var(--bg-void), transparent)',
                }} />
              </div>

              {/* Floating name badge */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                padding: '0.75rem 1.2rem',
                background: 'rgba(13,18,37,0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                zIndex: 4,
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Kenil Sangani
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
                  FULL-STACK DEVELOPER
                </div>
              </div>
            </div>
          </div>

          {/* ---- RIGHT: Content ---- */}
          <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Heading */}
            <h2 className="about-item" style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}>
              Engineering{' '}
              <span style={{ fontStyle: 'normal', color: 'var(--accent-cyan)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                precision
              </span>
              , designing delight.
            </h2>

            {/* Bio */}
            <div className="about-item" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                I'm <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Kenil Sangani</span>, Co-founder of{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>CreativityCoder</span> and a full-stack developer
                obsessed with building digital experiences that are both technically rigorous and visually stunning.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                I bridge the gap between engineering and design — writing clean, performant code
                while crafting interfaces that feel alive. Every pixel has a purpose.
              </p>
            </div>

            {/* Terminal-style tech stack */}
            <div className="about-item glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Window chrome */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.6rem 1rem',
                background: 'rgba(0,0,0,0.3)',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28CA41' }} />
                <span style={{
                  marginLeft: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  color: 'var(--text-dim)', letterSpacing: '0.1em',
                }}>
                  tech-stack.json
                </span>
              </div>

              {/* Stack content */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(techStack).map(([cat, items]) => (
                  <div key={cat}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      letterSpacing: '0.15em', color: 'var(--accent-cyan)',
                      marginBottom: '0.5rem', textTransform: 'uppercase',
                    }}>
                      {cat}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {items.map(item => (
                        <span key={item} className="mono-chip">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume link */}
            <div className="about-item">
              <a
                href="/cv.pdf"
                download
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  letterSpacing: '0.1em', color: 'var(--accent-cyan)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0,212,255,0.3)',
                  paddingBottom: '1px',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)';
                }}
              >
                Download Resume ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
