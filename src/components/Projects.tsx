import { useGSAP } from '@gsap/react';
import { FC, useRef } from 'react';
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
    accentClass: 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10',
  },
  {
    title: '3D Product Viewer',
    description: 'Interactive 3D product visualization using Three.js and WebGL. Real-time material switching and AR preview.',
    image: '/image/Screenshot 2025-05-03 194121.png',
    tags: ['Three.js', 'WebGL', 'React', 'GSAP'],
    link: 'https://amaya.godcraft.fun/',
    github: 'https://github.com/kenilGamer/Amaya',
    accent: '#F59E0B',
    accentClass: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
  },
  {
    title: 'AI-Powered Dashboard',
    description: 'Real-time analytics dashboard with AI-powered insights, anomaly detection, and predictive modeling.',
    image: '/image/ai.png',
    tags: ['React', 'Node.js', 'TensorFlow', 'D3.js'],
    link: 'https://ai.godcraft.fun/',
    github: 'https://github.com/kenilGamer/AI-Image-Enhancer',
    accent: '#22C55E',
    accentClass: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
  },
  {
    title: 'Movie Streaming App',
    description: 'Modern movie streaming platform with personalized recommendations, user profiles, and watchlists.',
    image: '/image/moviesapp.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
    link: 'https://movies.godcraft.fun/',
    github: 'https://github.com/kenilGamer/Movies-app',
    accent: '#A78BFA',
    accentClass: 'text-violet-300 border-violet-400/40 bg-violet-400/10',
  },
] as const;

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
    const rect = card.getBoundingClientRect();
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
    gsap.to(actions, { opacity: 1, y: 0, duration: 0.32, stagger: 0.1, ease: 'power3.out' });
    gsap.to(tags, {
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
    gsap.to(actions, { opacity: 0, y: -8, duration: 0.24, stagger: 0.05, ease: 'power2.inOut' });
    gsap.to(tags, {
      borderColor: 'var(--border-subtle)',
      backgroundColor: 'rgba(15, 22, 48, 0.6)',
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.out',
    });
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="section-label">05 / Projects</div>

        <h2 className="mb-12 font-serif text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
          Featured work.
        </h2>

        <div className="grid gap-7 sm:grid-cols-1 lg:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-tilt-card group relative overflow-hidden rounded-[14px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] [transform-style:preserve-3d] transition-[border-color,box-shadow] duration-300"
              onMouseMove={handleMouseMove}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
                handleCardLeave(e.currentTarget);
              }}
              onMouseEnter={e => {
                handleCardEnter(e.currentTarget, project.accent);
              }}
            >
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-[transform,filter] duration-500 group-hover:scale-[1.06]"
                />

                <div className="project-image-overlay absolute inset-0 bg-[linear-gradient(to_top,rgba(4,6,15,0.88)_0%,rgba(4,6,15,0.15)_55%,transparent_100%)] opacity-70 transition-opacity duration-400" />

                <div className="project-actions pointer-events-none absolute right-4 top-4 flex gap-2">
                  <a
                    className="project-overlay-action pointer-events-auto rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[var(--accent-cyan)] backdrop-blur-md transition-colors"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                  >
                    Live ↗
                  </a>
                  <a
                    className="project-overlay-action pointer-events-auto rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-[var(--text-primary)] backdrop-blur-md transition-colors"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="bg-[rgba(13,18,37,0.5)] px-6 pb-6 pt-5 backdrop-blur-xl">
                <h3 className="mb-2 font-serif text-[1.15rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="mb-4 font-body text-[0.82rem] leading-[1.65] text-[var(--text-muted)]">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className={`project-tag inline-flex rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-[var(--text-muted)] bg-[rgba(15,22,48,0.6)] ${project.accentClass}`}
                    >
                      {tag}
                    </span>
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