import { FC, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header: FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoBadgePathRef = useRef<SVGRectElement>(null);
  const logoDotRef = useRef<HTMLSpanElement>(null);

  const navItems = [
    { id: 'hero',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'skills',       label: 'Skills' },
    { id: 'services',     label: 'Services' },
    { id: 'projects',     label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact',      label: 'Contact' },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'cinematic', delay: 2.2 }
      );

      if (logoBadgePathRef.current) {
        gsap.fromTo(
          logoBadgePathRef.current,
          { strokeDasharray: 128, strokeDashoffset: 128 },
          { strokeDashoffset: 0, duration: 1.1, ease: 'power3.out', delay: 2.35 }
        );
      }

      if (logoDotRef.current) {
        gsap.fromTo(
          logoDotRef.current,
          { scale: 1, opacity: 0.8 },
          {
            scale: 1.7,
            opacity: 1,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            delay: 2.55,
          }
        );
      }
    }, headerRef);

    // Transparent → glassmorphic on 40px scroll
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
    };

    // Active section detection
    const sections = ['hero', 'about', 'skills', 'services', 'projects', 'testimonials', 'contact'];
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter:     () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  useGSAP(() => {
    if (menuRef.current && isMobileMenuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[1000] opacity-0 transition-[background,backdrop-filter,border-color,box-shadow] duration-500 ${
        isScrolled
          ? 'bg-[rgba(4,6,15,0.75)] backdrop-blur-[20px] border-b border-[rgba(100,200,255,0.07)] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-10 py-4">

        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0"
        >
          {/* KS Badge */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(0,212,255,0.2)] font-mono text-[0.7rem] font-semibold tracking-[0.05em] text-[var(--accent-cyan)] transition-[border-color,box-shadow] hover:border-[rgba(0,212,255,0.7)] hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              className="pointer-events-none absolute inset-0"
            >
              <rect
                ref={logoBadgePathRef}
                x="1"
                y="1"
                width="34"
                height="34"
                rx="6"
                fill="none"
                stroke="rgba(0,212,255,0.85)"
                strokeWidth="1"
              />
            </svg>
            KS
          </div>
          <span className="font-display text-[1.4rem] tracking-[0.08em] text-[var(--text-primary)]">
            KENIL
            <span ref={logoDotRef} className="inline-block text-[var(--accent-cyan)]">
              .
            </span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative cursor-pointer border-0 border-t-2 bg-transparent px-[0.9rem] py-[0.45rem] font-mono text-[0.65rem] uppercase tracking-[0.25em] transition-[color,border-top-color,text-shadow] ${
                activeSection === item.id
                  ? 'border-t-[var(--accent-cyan)] font-semibold text-[var(--text-primary)] [text-shadow:0_0_10px_rgba(0,212,255,0.35)]'
                  : 'border-t-transparent font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Hire Me button — desktop (amber, availability dot) */}
          <button
            
            onClick={() => scrollToSection('contact')}
            className="hidden md:block shimmer-btn  items-center gap-2 rounded-full border border-[rgba(245,158,11,0.35)] bg-transparent px-[1.1rem] py-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[var(--accent-amber)] shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-[border-color,box-shadow,background] hover:border-[rgba(245,158,11,0.7)] hover:bg-[rgba(245,158,11,0.15)] hover:shadow-[0_0_18px_rgba(245,158,11,0.25)]"
          >
            <span className="h-[6px] w-[6px] shrink-0 animate-[pulse-dot_1.4s_ease-in-out_infinite] rounded-full bg-[var(--accent-amber)] shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className=" md:hidden cursor-pointer rounded-md border border-[rgba(0,212,255,0.2)] bg-transparent p-1.5 text-[var(--text-muted)]"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="flex flex-col gap-2 border-t border-[rgba(0,212,255,0.07)] bg-[rgba(4,6,15,0.95)] px-10 py-4 backdrop-blur-[20px]"
        >
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { scrollToSection(item.id); setIsMobileMenuOpen(false); }}
              className={`cursor-pointer border-0 border-b border-[rgba(100,200,255,0.04)] bg-transparent py-[0.6rem] text-left font-mono text-[0.75rem] uppercase tracking-[0.2em] ${activeSection === item.id ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-muted)]'}`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }}
            className="mt-3 cursor-pointer rounded-full border border-[rgba(0,212,255,0.3)] bg-transparent p-[0.6rem] font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[var(--accent-cyan)]"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;