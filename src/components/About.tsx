import { useGSAP } from '@gsap/react';
import { FC, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutProps {
  scrollToSection?: (id: string) => void;
}

const techStack = [
  {
    label: 'Frontend',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-400/30',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'Three.js'],
  },
  {
    label: 'Backend',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-400/30',
    items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'PHP'],
  },
  {
    label: 'Tooling',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-400/30',
    items: ['Git', 'Docker', 'Figma', 'Vite', 'VS Code'],
  },
] as const;

const About: FC<AboutProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, '.about-item', {
    y: 40,
    duration: 0.9,
    stagger: 0.15,
    start: 'top 70%',
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );

      gsap.fromTo(
        '.about-name-badge',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="section-label about-item mb-4">02 / About</div>

        <div className="grid items-start gap-16 lg:grid-cols-[minmax(320px,380px)_1fr] lg:gap-16">
          <div ref={imgRef} className="relative">
            <div className="group relative max-w-[380px]">
              <div className="pointer-events-none absolute -inset-2 z-[3]">
                <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[var(--accent-cyan)] opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-[var(--accent-cyan)] opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-[var(--accent-cyan)] opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-[var(--accent-cyan)] opacity-70 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="grayscale-hover relative aspect-[3/4] overflow-hidden rounded-xl border border-[var(--border-subtle)] transition-[transform,box-shadow,border-color] duration-500 group-hover:-translate-y-0.5 group-hover:border-[rgba(0,212,255,0.28)] group-hover:shadow-[0_0_42px_rgba(0,212,255,0.22),0_0_90px_rgba(0,212,255,0.08)]">
                <img
                  src="/1000068353-Picsart-AiImageEnhancer.jpg-Photoroom.jpeg"
                  alt="Kenil Sangani - Full-Stack Developer"
                  className="h-full w-full object-cover object-top saturate-[0.72] transition-[filter] duration-500 group-hover:saturate-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[var(--bg-void)] to-transparent" />
              </div>

              <div className="about-name-badge absolute -bottom-6 -right-6 z-[4] rounded-[10px] border border-[var(--border-subtle)] bg-[rgba(13,18,37,0.92)] px-4 py-3 opacity-0 backdrop-blur-md">
                <div className="font-body text-[0.85rem] font-semibold text-[var(--text-primary)]">Kenil Sangani</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--accent-green)] shadow-[0_0_5px_var(--accent-green)]" />
                  <div className="font-mono text-[0.58rem] tracking-[0.12em] text-[var(--accent-cyan)]">FULL-STACK DEVELOPER</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="about-item m-0 font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Engineering <span className="font-body font-semibold text-[var(--accent-cyan)]">precision</span>, designing delight.
            </h2>

            <div className="about-item flex flex-col gap-4">
              <p className="m-0 font-body text-[0.95rem] leading-8 text-[var(--text-muted)]">
                I&apos;m <span className="font-medium text-[var(--text-primary)]">Kenil Sangani</span>, Co-founder of{' '}
                <span className="font-medium text-[var(--text-primary)]">CreativityCoder</span> and a full-stack developer
                obsessed with building digital experiences that are both technically rigorous and visually stunning.
              </p>
              <p className="m-0 font-body text-[0.95rem] leading-8 text-[var(--text-muted)]">
                I bridge the gap between engineering and design - writing clean, performant code while crafting interfaces
                that feel alive. Every pixel has a purpose.
              </p>
            </div>

            <div className="about-item glass-card overflow-hidden p-0 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[rgba(0,0,0,0.3)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                <span className="ml-2 font-mono text-[0.6rem] tracking-[0.1em] text-[var(--text-dim)]">tech-stack.json</span>
              </div>

              <div className="flex flex-col gap-4 p-5">
                {techStack.map((group) => (
                  <div key={group.label}>
                    <div className={`mb-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] ${group.accentText}`}>
                      {group.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.08em] ${group.accentText} ${group.accentBorder} bg-[rgba(15,22,48,0.6)]`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="font-mono text-[0.85rem] leading-none text-[var(--accent-cyan)] [animation:blink-cursor_1s_step-end_infinite]">▋</div>
              </div>
            </div>

            <div className="about-item">
              <a
                href="/KenilSangani.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 border-b border-[rgba(0,212,255,0.3)] pb-px font-mono text-[0.75rem] tracking-[0.1em] text-[var(--accent-cyan)] no-underline transition-colors hover:border-[var(--accent-cyan)]"
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