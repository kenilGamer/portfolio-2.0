import { FC, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    title: 'Creative website',
    description: 'A visually stunning portfolio site showcasing creative projects with smooth animations and interactive elements.',
    image: '/image/Screenshot2026-03-31125723.png',
    tags: ['Three.js', 'GSAP', 'React', 'Tailwind CSS'],
    link: 'https://skateboard-one.vercel.app/',
    github: 'https://github.com/kenilGamer/Skateboard',
    accent: '#00D4FF',
  },
  {
    title: '3D Product Viewer',
    description: 'Interactive 3D product visualization using Three.js and WebGL. Real-time material switching and AR preview.',
    image: '/image/Screenshot 2025-05-03 194121.png',
    tags: ['Three.js', 'WebGL', 'React', 'GSAP'],
    link: 'https://amaya.godcraft.fun/',
    github: 'https://github.com/kenilGamer/Amaya',
    accent: '#F59E0B',
  },
  {
    title: 'AI-Powered Dashboard',
    description: 'Real-time analytics dashboard with AI-powered insights, anomaly detection, and predictive modeling.',
    image: '/image/ai.png',
    tags: ['React', 'Node.js', 'TensorFlow', 'D3.js'],
    link: 'https://ai.godcraft.fun/',
    github: 'https://github.com/kenilGamer/AI-Image-Enhancer',
    accent: '#22C55E',
  },
  {
    title: 'Movie Streaming App',
    description: 'Modern movie streaming platform with personalized recommendations, user profiles, and watchlists.',
    image: '/image/moviesapp.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
    link: 'https://movies.godcraft.fun/',
    github: 'https://github.com/kenilGamer/Movies-app',
    accent: '#A78BFA',
  },
];

const Projects: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, '.project-tilt-card', {
    y: 60,
    duration: 0.9,
    stagger: 0.15,
    start: 'top 70%',
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set('.project-overlay-action', { opacity: 0, y: -8 });
      gsap.set('.project-tag', { opacity: 0.9 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect  = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY = ((x - rect.width / 2) / rect.width) * 20;
    const rotX = -((y - rect.height / 2) / rect.height) * 20;
    const maxTilt = 10;
    const clampedX = Math.max(-maxTilt, Math.min(maxTilt, rotX));
    const clampedY = Math.max(-maxTilt, Math.min(maxTilt, rotY));

    gsap.to(card, {
      rotationX: clampedX,
      rotationY: clampedY,
      duration: 0.25,
      ease: 'power2.out',
      transformPerspective: 800,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  const handleCardEnter = (card: HTMLDivElement, accent: string) => {
    gsap.to(card, {
      borderColor: `${accent}55`,
      boxShadow: `0 0 30px ${accent}26`,
      duration: 0.32,
      ease: 'power2.out',
    });

    const overlay = card.querySelector('.project-image-overlay');
    const actions = card.querySelectorAll('.project-overlay-action');
    const tags = card.querySelectorAll('.project-tag');

    gsap.to(overlay, { opacity: 0.45, duration: 0.35, ease: 'power2.out' });
    gsap.to(actions, {
      opacity: 1,
      y: 0,
      duration: 0.32,
      stagger: 0.1,
      ease: 'power3.out',
    });
    gsap.to(tags, {
      color: accent,
      borderColor: `${accent}66`,
      backgroundColor: `${accent}12`,
      duration: 0.25,
      stagger: 0.05,
      ease: 'power2.out',
    });
  };

  const handleCardLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      borderColor: 'var(--border-subtle)',
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out',
    });

    const overlay = card.querySelector('.project-image-overlay');
    const actions = card.querySelectorAll('.project-overlay-action');
    const tags = card.querySelectorAll('.project-tag');

    gsap.to(overlay, { opacity: 0.7, duration: 0.3, ease: 'power2.out' });
    gsap.to(actions, {
      opacity: 0,
      y: -8,
      duration: 0.24,
      stagger: 0.05,
      ease: 'power2.inOut',
    });
    gsap.to(tags, {
      color: 'var(--text-muted)',
      borderColor: 'var(--border-subtle)',
      backgroundColor: 'rgba(15, 22, 48, 0.6)',
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Section label */}
        <div className="section-label">05 / Projects</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '0.03em',
          color: 'var(--text-primary)',
          marginBottom: '3rem',
        }}>
          Featured work.
        </h2>

        {/* 2-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
          gap: '1.75rem',
        }}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-tilt-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
                handleCardLeave(e.currentTarget);
              }}
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                cursor: 'default',
                transformStyle: 'preserve-3d',
                transition: 'border-color 0.3s, box-shadow 0.35s',
              }}
              onMouseEnter={e => {
                handleCardEnter(e.currentTarget, project.accent);
              }}
            >
              {/* Image — grayscale → color on card hover */}
              <div
                className="grayscale-hover"
                style={{ position: 'relative', height: '220px', overflow: 'hidden' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease, filter 0.5s ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                />

                {/* Gradient overlay */}
                <div className="project-image-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(4,6,15,0.88) 0%, rgba(4,6,15,0.15) 55%, transparent 100%)',
                  opacity: 0.7,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Hover action buttons */}
                <div className="project-actions" style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  display: 'flex', gap: '0.5rem',
                  pointerEvents: 'none',
                }}>
                  <a
                    className="project-overlay-action"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    style={{
                      pointerEvents: 'auto',
                      borderRadius: '999px',
                      padding: '0.4rem 0.75rem',
                      background: 'rgba(0,212,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'background 0.2s',
                    }}
                  >
                    Live ↗
                  </a>
                  <a
                    className="project-overlay-action"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    style={{
                      pointerEvents: 'auto',
                      borderRadius: '999px',
                      padding: '0.4rem 0.75rem',
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'background 0.2s',
                    }}
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Bottom glass panel */}
              <div style={{
                padding: '1.25rem 1.5rem 1.5rem',
                background: 'rgba(13,18,37,0.5)',
                backdropFilter: 'blur(12px)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1rem',
                }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="mono-chip project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;