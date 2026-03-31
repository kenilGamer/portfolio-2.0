import { useGSAP } from '@gsap/react';
import { FC, lazy, Suspense, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Cards stagger in
      gsap.fromTo('.skill-bento-card',
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );

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
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          Technical expertise.
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
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
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
                    <SkillCube color={cat.cubeColor} accentColor={cat.accentColor} />
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
                      borderRadius: '9999px', overflow: 'hidden',
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
                        }}
                      />
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
