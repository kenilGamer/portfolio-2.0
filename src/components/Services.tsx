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
    accentClass: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/10',
    accentUnderline: 'bg-cyan-400',
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
    accentClass: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
    accentUnderline: 'bg-amber-400',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'AI-Powered Tools',
    description: 'Intelligent web applications integrating LLMs and machine learning for automation, content generation, and smart user experiences.',
    tags: ['AI/ML', 'OpenAI', 'Python', 'React'],
    accentColor: '#22C55E',
    accentClass: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
    accentUnderline: 'bg-emerald-400',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Performance & UI/UX',
    description: 'Transforming sluggish interfaces into buttery-smooth experiences. 3D animations, GSAP timelines, pixel-perfect design systems.',
    tags: ['GSAP', 'Three.js', 'Lighthouse', 'A11y'],
    accentColor: '#A78BFA',
    accentClass: 'text-violet-300 border-violet-400/30 bg-violet-400/10',
    accentUnderline: 'bg-violet-400',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
] as const;

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
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="section-label">04 / Services</div>

        <h2 className="mb-12 font-serif text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
          What I build.
        </h2>

        <div className="services-grid grid gap-6">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="service-hud-card relative overflow-hidden rounded-[16px] border border-[var(--border-subtle)] bg-[rgba(13,18,37,0.55)] p-8 backdrop-blur-[8px] transition-[border-color,box-shadow,transform] duration-300"
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
              <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(400px_circle_at_var(--spot-x,_50%)_var(--spot-y,_50%),rgba(0,212,255,0.04),transparent_70%)]" />

              <div
                data-svc-num
                className={`pointer-events-none absolute right-6 top-4 select-none font-display text-[6rem] leading-none opacity-[0.06] transition-opacity ${svc.accentClass.split(' ')[0]}`}
              >
                {svc.num}
              </div>

              <div className="relative z-[1]">
                <div className={`mb-5 inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border ${svc.accentClass}`}>
                  {svc.icon}
                </div>

                <h3 className="mb-3 font-serif text-[1.3rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  {svc.title}
                </h3>

                <p className="mb-6 font-body text-[0.88rem] leading-[1.75] text-[var(--text-muted)]">
                  {svc.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {svc.tags.map(tag => (
                    <span
                      key={tag}
                      className={`inline-flex rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] ${svc.accentClass}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scrollToSection?.('contact')}
                className={`mt-6 inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-mono text-[0.65rem] uppercase tracking-[0.15em] ${svc.accentClass.split(' ')[0]}`}
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
                <span className="relative inline-block">
                  Get Started
                  <span
                    data-underline
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-200 ${svc.accentUnderline}`}
                  />
                </span>
                <span data-arrow className="transition-transform duration-200">↗</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;