import { FC } from 'react';

const testimonials = [
  {
    name: 'MS. GEETA P SOLANKI',
    role: 'CFO · Glovtouch',
    image: '/image/geeta.jpg',
    content: 'Working with Kenil was an absolute pleasure. Attention to detail and problem-solving skills helped us create a product that exceeded our expectations.',
  },
  {
    name: 'PANCHAL JAYDIP',
    role: 'CEO · Shree Jay Furniture',
    image: '/image/jd.JPG',
    content: 'The technical expertise and innovative solutions were instrumental in our product\'s success. Highly recommended for complex web development projects.',
  },
  {
    name: 'MR. SUMIT L CHUDASAMA',
    role: 'Co-Founder · Glovtouch',
    image: '/image/sumit.jpg',
    content: 'Collaborating was seamless. Understanding of modern web technologies and user experience principles made the development process smooth and efficient.',
  },
  {
    name: 'ALEX MARTIN',
    role: 'Product Lead · TechStart',
    image: '/image/geeta.jpg',
    content: 'The 3D animations and interactive elements Kenil implemented completely transformed our landing page. Conversion rates went up 40% after the redesign.',
  },
  {
    name: 'PRIYA SHARMA',
    role: 'CTO · DataScale',
    image: '/image/sumit.jpg',
    content: 'Incredible speed and quality. Delivered a full-stack SaaS platform in record time without compromising on code quality or user experience.',
  },
];

// Duplicate for seamless loop
const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

interface CardProps {
  t: typeof testimonials[0];
  i: number;
}

const TestiCard: FC<CardProps> = ({ t, i }) => (
  <div
    key={i}
    style={{
      minWidth: '340px',
      maxWidth: '340px',
      padding: '1.5rem',
      background: 'rgba(13,18,37,0.65)',
      backdropFilter: 'blur(16px)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '14px',
      position: 'relative',
      flexShrink: 0,
      marginRight: '1.25rem',
    }}
  >
    {/* Large decorative quote */}
    <div style={{
      position: 'absolute', top: '0.75rem', left: '1.25rem',
      fontFamily: 'var(--font-serif)',
      fontSize: '4rem', lineHeight: 1,
      color: 'var(--accent-cyan)', opacity: 0.06,
      pointerEvents: 'none', userSelect: 'none',
    }}>
      "
    </div>

    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.87rem',
      color: 'var(--text-muted)',
      lineHeight: 1.75,
      marginBottom: '1.25rem',
      position: 'relative', zIndex: 1,
    }}>
      "{t.content}"
    </p>

    {/* Author */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{
        width: '36px', height: '36px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        flexShrink: 0,
      }}>
        <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          letterSpacing: '0.12em', color: 'var(--text-primary)', fontWeight: 500,
        }}>
          {t.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          letterSpacing: '0.1em', color: 'var(--text-dim)', marginTop: '0.15rem',
        }}>
          {t.role}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials: FC = () => {
  return (
    <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Section label */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', marginBottom: '3rem' }}>
        <div className="section-label">06 / Testimonials</div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          What clients say.
        </h2>
      </div>

      <div className="marquee-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Row 1 — left */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-left" style={{ display: 'flex', width: 'max-content' }}>
            {row1.map((t, i) => <TestiCard key={i} t={t} i={i} />)}
          </div>
        </div>

        {/* Row 2 — right (slower) */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-right" style={{ display: 'flex', width: 'max-content' }}>
            {row2.map((t, i) => <TestiCard key={i} t={t} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;