import { FC, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header: FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
    gsap.registerPlugin(ScrollTrigger);

    // Entrance: slide down after loader (~2.5s)
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 2.5 }
    );

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
    return () => window.removeEventListener('scroll', handleScroll);
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        opacity: 0, // GSAP will animate in
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-bottom-color 0.5s ease',
        background: isScrolled
          ? 'rgba(4, 6, 15, 0.75)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(100,200,255,0.07)'
          : '1px solid transparent',
        boxShadow: isScrolled
          ? '0 4px 32px rgba(0,0,0,0.4)'
          : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2.5rem' }}>

        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          {/* KS Badge */}
          <div style={{
            width: '36px',
            height: '36px',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--accent-cyan)',
            letterSpacing: '0.05em',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.7)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(0,212,255,0.2)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)';
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
          >
            KS
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            letterSpacing: '0.08em',
            color: 'var(--text-primary)',
          }}>
            KENIL<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                position: 'relative',
                padding: '0.4rem 0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: activeSection === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
                background: activeSection === item.id ? 'rgba(0,212,255,0.06)' : 'transparent',
                border: activeSection === item.id ? '1px solid rgba(0,212,255,0.15)' : '1px solid transparent',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'color 0.2s, background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                if (activeSection !== item.id) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={e => {
                if (activeSection !== item.id) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Hire Me button — desktop */}
          <button
            className="hidden md:block shimmer-btn"
            onClick={() => scrollToSection('contact')}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '9999px',
              padding: '0.5rem 1.5rem',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'border-color 0.3s, box-shadow 0.3s, color 0.3s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(0,212,255,0.7)';
              el.style.boxShadow = '0 0 14px rgba(0,212,255,0.2)';
              el.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(0,212,255,0.3)';
              el.style.boxShadow = 'none';
              el.style.color = 'var(--accent-cyan)';
            }}
          >
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '6px',
              padding: '0.4rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
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
          style={{
            padding: '1rem 2.5rem 1.5rem',
            background: 'rgba(4,6,15,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(0,212,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { scrollToSection(item.id); setIsMobileMenuOpen(false); }}
              style={{
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                background: 'none',
                border: 'none',
                padding: '0.6rem 0',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(100,200,255,0.04)',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }}
            style={{
              marginTop: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '9999px',
              padding: '0.6rem',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;