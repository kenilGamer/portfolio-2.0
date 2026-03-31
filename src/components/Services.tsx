import { FC, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-hud-card',
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.14, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );
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
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          What I build.
        </h2>

        {/* 2×2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((svc) => (
            <div
              key={svc.num}
              className="service-hud-card"
              style={{
                position: 'relative',
                padding: '2rem',
                background: 'rgba(13,18,37,0.55)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.35s, box-shadow 0.35s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = `${svc.accentColor}40`;
                el.style.boxShadow = `0 0 32px ${svc.accentColor}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border-subtle)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Decorative large number */}
              <div style={{
                position: 'absolute', top: '1rem', left: '1.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: '5rem', lineHeight: 1,
                color: svc.accentColor, opacity: 0.06,
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {svc.num}
              </div>

              {/* Accent icon top-right */}
              <div style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                color: svc.accentColor, opacity: 0.5,
              }}>
                {svc.icon}
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.3rem',
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

              {/* CTA link */}
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
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  opacity: 0.85,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              >
                Get Started <span>↗</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
