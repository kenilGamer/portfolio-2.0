import { useGSAP } from '@gsap/react';
import { FC, lazy, Suspense, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SkillCube = lazy(() => import('./3D/SkillCube'));

const categories = [
  {
    num: '01',
    name: 'Frontend',
    color: '#00D4FF',
    cubeColor: '#0a1a2e',
    accentColor: '#00D4FF',
    skills: [
      { name: 'React',       level: 95 },
      { name: 'Next.js',     level: 90 },
      { name: 'TypeScript',  level: 85 },
      { name: 'Tailwind CSS',level: 96 },
      { name: 'JavaScript',  level: 92 },
    ],
  },
  {
    num: '02',
    name: 'Backend',
    color: '#F59E0B',
    cubeColor: '#1a1000',
    accentColor: '#F59E0B',
    skills: [
      { name: 'Node.js',    level: 95 },
      { name: 'MongoDB',    level: 98 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs',  level: 95 },
      { name: 'PHP',        level: 70 },
    ],
  },
  {
    num: '03',
    name: 'Tooling & 3D',
    color: '#22C55E',
    cubeColor: '#001a0a',
    accentColor: '#22C55E',
    skills: [
      { name: 'Three.js', level: 90 },
      { name: 'GSAP',     level: 88 },
      { name: 'Git',      level: 95 },
      { name: 'Docker',   level: 80 },
      { name: 'Figma',    level: 75 },
    ],
  },
];

const Skills: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleUnderlineRef = useRef<HTMLSpanElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useScrollReveal(sectionRef, '.skill-bento-card', {
    y: 60,
    duration: 0.9,
    stagger: 0.12,
    start: 'top 70%',
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (titleUnderlineRef.current) {
        gsap.fromTo(
          titleUnderlineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
            delay: 0.3,
          }
        );
      }

      // Skill bars fill on scroll
      categories.forEach((cat, ci) => {
        cat.skills.forEach((_skill, si) => {
          const barEl = document.querySelector(`[data-bar="${ci}-${si}"]`);
          if (barEl) {
            gsap.fromTo(barEl,
              { scaleX: 0 },
              {
                scaleX: 1, duration: 1.2, ease: 'power2.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
                delay: ci * 0.12 + si * 0.07,
              }
            );
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Section label */}
        <div className="section-label">03 / Skills</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '0.03em',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          Technical expertise.
          <span
            ref={titleUnderlineRef}
            style={{
              display: 'block',
              width: '120px',
              height: '1px',
              marginTop: '0.65rem',
              background: 'linear-gradient(to right, var(--accent-cyan), transparent)',
              transform: 'scaleX(0)',
            }}
          />
        </h2>

        {/* Bento grid — 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '1.5rem',
        }}>
          {categories.map((cat, ci) => (
            <div
              key={cat.num}
              className="skill-bento-card glass-card-hover border-pulse"
              style={{
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                setHoveredCategory(cat.num);
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = `${cat.accentColor}40`;
                el.style.boxShadow = `0 12px 40px ${cat.accentColor}12`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                setHoveredCategory((current) => (current === cat.num ? null : current));
                el.style.transform = 'translateY(0)';
                el.style.borderColor = '';
                el.style.boxShadow = '';
              }}
            >
              {/* Top bar accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(to right, ${cat.color}, transparent)`,
                opacity: 0.6,
              }} />

              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
                    color: cat.color, marginBottom: '0.4rem', textTransform: 'uppercase',
                  }}>
                    {cat.num}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0,
                  }}>
                    {cat.name}
                  </h3>
                </div>

                {/* Mini 3D Cube */}
                <div className="hidden md:block" style={{ opacity: 0.85 }}>
                  <Suspense fallback={
                    <div style={{ width: 88, height: 88, border: '1px solid var(--border-subtle)', borderRadius: 8 }} />
                  }>
                    <SkillCube
                      color={cat.cubeColor}
                      accentColor={cat.accentColor}
                      hovered={hoveredCategory === cat.num}
                    />
                  </Suspense>
                </div>
              </div>

              {/* Skill bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                        color: 'var(--text-primary)', letterSpacing: '0.05em',
                      }}>
                        {skill.name}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: cat.color, letterSpacing: '0.05em',
                      }}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Track */}
                    <div style={{
                      width: '100%', height: '3px',
                      background: 'rgba(100,200,255,0.07)',
                      borderRadius: '9999px', overflow: 'visible',
                      position: 'relative',
                    }}>
                      {/* Fill */}
                      <div
                        data-bar={`${ci}-${si}`}
                        style={{
                          width: `${skill.level}%`,
                          height: '100%',
                          borderRadius: '9999px',
                          background: `linear-gradient(to right, ${cat.color}80, ${cat.color})`,
                          transformOrigin: 'left center',
                          boxShadow: `0 0 6px ${cat.color}60`,
                          position: 'relative',
                        }}
                      >
                        {/* Glowing dot at right end */}
                        <div style={{
                          position: 'absolute',
                          right: '-3px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: cat.color,
                          boxShadow: `0 0 8px ${cat.color}, 0 0 16px ${cat.color}80`,
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
