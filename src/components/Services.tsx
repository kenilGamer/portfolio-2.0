import { FC, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServicesProps {
  scrollToSection?: (id: string) => void;
}

const services = [
  {
    num: '01',
    title: 'Full-Stack Web Apps',
    description: 'End-to-end web applications built with React, Next.js, TypeScript, and Node.js. Scalable architectures that handle real-world production loads.',
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    accentColor: '#00D4FF',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'SaaS Platform Engineering',
    description: 'Multi-tenant SaaS systems with subscription management, analytics dashboards, and robust API layers built for growth.',
    tags: ['SaaS', 'APIs', 'Auth', 'Stripe'],
    accentColor: '#F59E0B',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'AI-Powered Tools',
    description: 'Intelligent web applications integrating LLMs and machine learning for automation, content generation, and smart user experiences.',
    tags: ['AI/ML', 'OpenAI', 'Python', 'React'],
    accentColor: '#22C55E',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Performance & UI/UX',
    description: 'Transforming sluggish interfaces into buttery-smooth experiences. 3D animations, GSAP timelines, pixel-perfect design systems.',
    tags: ['GSAP', 'Three.js', 'Lighthouse', 'A11y'],
    accentColor: '#A78BFA',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
];

const Services: FC<ServicesProps> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, '.service-hud-card', {
    y: 60,
    duration: 0.9,
    stagger: 0.14,
    start: 'top 70%',
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set('.service-hud-card', { transformPerspective: 800, transformStyle: 'preserve-3d' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Section label */}
        <div className="section-label">04 / Services</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '0.03em',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          What I build.
        </h2>

        {/* 2×2 grid */}
        <div className="services-grid" style={{ display: 'grid', gap: '1.5rem' }}>
          {services.map((svc) => (
            <div
              key={svc.num}
              className="service-hud-card"
              style={{
                gridColumn: svc.num === '04' ? '1 / -1' : 'auto',
                position: 'relative',
                padding: '2rem',
                background: 'rgba(13,18,37,0.55)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.35s, box-shadow 0.35s, transform 0.25s',
              }}
              onMouseMove={e => {
                const el = e.currentTarget as HTMLElement;
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                el.style.setProperty('--spot-x', `${x}%`);
                el.style.setProperty('--spot-y', `${y}%`);
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${svc.accentColor}40`;
                el.style.boxShadow = `0 0 32px ${svc.accentColor}15`;
                el.style.transform = 'translateY(-3px)';
                // Reveal number
                const num = el.querySelector('[data-svc-num]') as HTMLElement;
                if (num) num.style.opacity = '0.12';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-subtle)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
                const num = el.querySelector('[data-svc-num]') as HTMLElement;
                if (num) num.style.opacity = '0.06';
              }}
            >
              {/* Spotlight overlay — follows cursor */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: `radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${svc.accentColor}0a, transparent 70%)`,
                transition: 'opacity 0.3s',
              }} />

              {/* Decorative large number */}
              <div data-svc-num style={{
                position: 'absolute', top: '1rem', right: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: '6rem', lineHeight: 1,
                color: svc.accentColor, opacity: 0.06,
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'opacity 0.3s',
              }}>
                {svc.num}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Accent icon box */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px',
                  background: `${svc.accentColor}12`,
                  border: `1px solid ${svc.accentColor}28`,
                  borderRadius: '10px',
                  color: svc.accentColor,
                  marginBottom: '1.25rem',
                  transition: 'background 0.3s, box-shadow 0.3s',
                }}>
                  {svc.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}>
                  {svc.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem',
                }}>
                  {svc.description}
                </p>

                {/* Tag chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {svc.tags.map(tag => (
                    <span
                      key={tag}
                      className="mono-chip"
                      style={{ borderColor: `${svc.accentColor}30`, color: svc.accentColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA link with underline slide-in */}
              <button
                onClick={() => scrollToSection?.('contact')}
                style={{
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: svc.accentColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  const line = el.querySelector('[data-underline]') as HTMLElement;
                  if (line) line.style.transform = 'scaleX(1)';
                  const arrow = el.querySelector('[data-arrow]') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  const line = el.querySelector('[data-underline]') as HTMLElement;
                  if (line) line.style.transform = 'scaleX(0)';
                  const arrow = el.querySelector('[data-arrow]') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Get Started
                  <span data-underline style={{
                    position: 'absolute', bottom: '-2px', left: 0,
                    width: '100%', height: '1px',
                    background: svc.accentColor,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.25s ease',
                  }} />
                </span>
                <span data-arrow style={{ transition: 'transform 0.25s ease' }}>↗</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
