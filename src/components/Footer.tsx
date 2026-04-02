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
    <footer className="relative pt-[2px]">
      {/* Gradient top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(to_right,var(--accent-cyan),rgba(0,212,255,0.1)_60%,transparent)]" />

      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-10 py-8">
        {/* Left: logo + copyright */}
        <div className="flex items-center gap-4">
          <span className="font-display text-[1.1rem] tracking-[0.1em] text-[var(--text-primary)]">
            KENIL<span className="text-[var(--accent-cyan)]">.</span>
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[var(--text-dim)]">
            © {year} All rights reserved.
          </span>
        </div>

        {/* Center: nav links */}
        <nav className="flex flex-wrap gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="cursor-pointer border-0 bg-transparent px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--text-dim)] transition-colors hover:text-[var(--accent-cyan)]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <span className="font-mono text-[0.6rem] tracking-[0.08em] text-[var(--text-dim)]">
          Built with <span className="text-[var(--accent-amber)]">♥</span> by Kenil Sangani
        </span>
      </div>
    </footer>
  );
};

export default Footer;