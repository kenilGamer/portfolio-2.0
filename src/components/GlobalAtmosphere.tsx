import { FC } from 'react';

const GlobalAtmosphere: FC = () => {
  return (
    <>
      {/* SVG Noise Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Scan Line Sweep */}
      <div className="scan-line" aria-hidden="true" />

      {/* Radial Glow — Cyan top center */}
      <div className="glow-cyan-top" aria-hidden="true" />

      {/* Radial Glow — Amber bottom right */}
      <div className="glow-amber-bottom" aria-hidden="true" />

      {/* Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-grid"
        aria-hidden="true"
      />
    </>
  );
};

export default GlobalAtmosphere;
