import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FC, useRef } from 'react';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce with Next.js, TypeScript, and MongoDB. Real-time inventory, Stripe payments, admin dashboard.',
    image: '/image/Screenshot 2025-05-03 193837.png',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
    link: 'https://whitezone.vercel.app/',
    github: 'https://github.com/kenilGamer/whitezone',
  },
  {
    title: '3D Product Viewer',
    description: 'Interactive 3D product visualization using Three.js and WebGL. Real-time material switching and AR preview.',
    image: '/image/Screenshot 2025-05-03 194121.png',
    tags: ['Three.js', 'WebGL', 'React', 'GSAP'],
    link: 'https://amaya.godcraft.fun/',
    github: 'https://github.com/kenilGamer/Amaya',
  },
  {
    title: 'AI-Powered Dashboard',
    description: 'Real-time analytics dashboard with AI-powered insights, anomaly detection, and predictive modeling.',
    image: '/image/ai.png',
    tags: ['React', 'Node.js', 'TensorFlow', 'D3.js'],
    link: 'https://ai.godcraft.fun/',
    github: 'https://github.com/kenilGamer/AI-Image-Enhancer',
  },
  {
    title: 'Movie Streaming App',
    description: 'Modern movie streaming platform with personalized recommendations, user profiles, and watchlists.',
    image: '/image/moviesapp.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
    link: 'https://movies.godcraft.fun/',
    github: 'https://github.com/kenilGamer/Movies-app',
  },
];

const Projects: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-tilt-card',
        { opacity: 0, y: 70 },
        {
          opacity: 1, y: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect  = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY =  ((x - rect.width  / 2) / rect.width)  *  10;
    const rotX = -((y - rect.height / 2) / rect.height) *  10;
    gsap.to(card, { rotationX: rotX, rotationY: rotY, transformPerspective: 1000, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Section label */}
        <div className="section-label">05 / Projects</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
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
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                cursor: 'default',
                transformStyle: 'preserve-3d',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-active)';
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.06)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 60%)',
                }} />

                {/* Hover action buttons */}
                <div className="project-actions" style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  display: 'flex', gap: '0.5rem',
                  opacity: 0, transition: 'opacity 0.3s',
                }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    style={{
                      width: '36px', height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(0,212,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                      textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700,
                      transition: 'background 0.2s',
                    }}
                  >
                    ↗
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    style={{
                      width: '36px', height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Show action buttons on card hover using CSS variable trick */}
              <style>{`
                .project-tilt-card:hover .project-actions { opacity: 1 !important; }
              `}</style>

              {/* Bottom glass panel */}
              <div style={{
                padding: '1.25rem 1.5rem 1.5rem',
                background: 'rgba(13,18,37,0.5)',
                backdropFilter: 'blur(12px)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
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
                    <span key={tag} className="mono-chip">{tag}</span>
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