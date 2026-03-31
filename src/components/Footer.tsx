import { FC } from 'react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const navLinks = [
  { id: 'hero',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'contact',      label: 'Contact' },
];

const Footer: FC<FooterProps> = ({ scrollToSection }) => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: 'relative', paddingTop: '2px' }}>
      {/* Gradient top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, var(--accent-cyan), rgba(0,212,255,0.1) 60%, transparent)',
      }} />

      <div style={{
        maxWidth: '1280px', margin: '0 auto', padding: '2rem 2.5rem',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        {/* Left: logo + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            letterSpacing: '0.1em',
            color: 'var(--text-primary)',
          }}>
            KENIL<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--text-dim)', letterSpacing: '0.1em',
          }}>
            © {year} All rights reserved.
          </span>
        </div>

        {/* Center: nav links */}
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                background: 'none', border: 'none',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-dim)')}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--text-dim)', letterSpacing: '0.08em',
        }}>
          Built with <span style={{ color: 'var(--accent-amber)' }}>♥</span> by Kenil Sangani
        </span>
      </div>
    </footer>
  );
};

export default Footer;