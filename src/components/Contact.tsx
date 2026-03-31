import { FC, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/kenilgamer',
    color: '#E8F4FF',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kenil-sangani/',
    color: '#0A66C2',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    color: '#1DA1F2',
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"/>
      </svg>
    ),
  },
];

const Contact: FC = () => {
  const formRef    = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    try {
      await emailjs.sendForm(
        'service_ffce6e5',
        'template_5u31fvp',
        formRef.current!,
        { publicKey: 'ugCBbxaJsWvscldSi' }
      );
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section ref={sectionRef} style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Section label */}
        <div className="section-label contact-item">07 / Contact</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px,100%), 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>

          {/* ---- LEFT ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <h2 className="contact-item" style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              margin: 0,
            }}>
              Let's build something remarkable.
            </h2>

            <p className="contact-item" style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              margin: 0,
            }}>
              Have a project in mind? I'd love to hear about it. Drop me a message
              and let's create something that stands out.
            </p>

            {/* Social links */}
            <div className="contact-item" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', textDecoration: 'none',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = s.color;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'var(--text-muted)';
                  }}
                >
                  <span style={{ color: 'inherit', display: 'flex' }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ---- RIGHT: Form ---- */}
          <div className="contact-item glass-card" style={{ padding: '2rem' }}>
            {status === 'success' ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center', gap: '1rem',
              }}>
                {/* Animated checkmark */}
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="var(--accent-green)" strokeWidth="2" opacity="0.3"/>
                  <path
                    d="M18 32 L28 42 L46 24"
                    stroke="var(--accent-green)" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="50"
                    strokeDashoffset="0"
                    style={{ animation: 'none' }}
                  />
                </svg>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
                  Message Sent ✓
                </div>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '0.5rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--accent-cyan)', background: 'none',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: '9999px', padding: '0.5rem 1.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Name */}
                <div className="float-label-wrapper">
                  <input type="text" id="contact-name" name="user_name" placeholder=" " required />
                  <label htmlFor="contact-name">Name</label>
                </div>

                {/* Email */}
                <div className="float-label-wrapper">
                  <input type="email" id="contact-email" name="user_email" placeholder=" " required />
                  <label htmlFor="contact-email">Email</label>
                </div>

                {/* Message */}
                <div className="float-label-wrapper">
                  <textarea id="contact-message" name="message" placeholder=" " rows={5} required />
                  <label htmlFor="contact-message">Message</label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="shimmer-btn"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    background: status === 'error'
                      ? 'rgba(239,68,68,0.8)'
                      : 'linear-gradient(135deg, rgba(245,158,11,0.9), rgba(245,158,11,0.7))',
                    color: '#000',
                    transition: 'box-shadow 0.3s',
                    boxShadow: '0 0 24px rgba(245,158,11,0.2)',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(245,158,11,0.4)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(245,158,11,0.2)')}
                >
                  {status === 'loading' ? '● ● ●' : status === 'error' ? 'Try Again' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;