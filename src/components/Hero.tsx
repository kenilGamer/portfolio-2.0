import { FC, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import MagneticButton from './ui/MagneticButton';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const Hero: FC<HeroProps> = ({ scrollToSection }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate main heading
    setTimeout(() => {
      const heading = document.querySelector('.hero-title');
      if (heading) {
        const split = new SplitText(heading, { type: 'chars' });
        
        split.chars.forEach((char) => {
          const charEl = char as HTMLElement;
          charEl.style.background = 'linear-gradient(180deg, #F45D01 0%, #FF6B35 30%, #6559FF 60%, #4A90E2 100%)';
          charEl.style.backgroundClip = 'text';
          charEl.style.webkitBackgroundClip = 'text';
          charEl.style.webkitTextFillColor = 'transparent';
          charEl.style.display = 'inline-block';
        });

        gsap.from(split.chars, {
          opacity: 0,
          y: 50,
          rotationX: -90,
          delay: 1.5,
          stagger: 0.03,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }
    }, 100);

    // Animate other elements
    tl.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.4')
    .from('.hero-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
    .from('.hero-buttons > *', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.6,
    }, '-=0.4');

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            y: self.progress * 50,
            opacity: 1 - self.progress * 0.5,
            duration: 0.3,
          });
        }
      },
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#F45D01]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#6559FF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Subtitle */}
          <div className="hero-subtitle">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm sm:text-base text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F45D01] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F45D01]"></span>
              </span>
              Frontend Developer
            </span>
          </div>

          {/* Main title */}
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            Crafting Beautiful
            <br />
            Digital Experiences
          </h1>

          {/* Description */}
          <div className="hero-description space-y-4 max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
              Building modern, responsive, and interactive web applications with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F45D01] to-[#6559FF] font-semibold">
                React, TypeScript, and Next.js
              </span>
            </p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Specializing in elegant UI/UX design, blazing-fast performance optimization,
              and creating intuitive, pixel-perfect user interfaces
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#F45D01] to-[#6559FF] text-white rounded-full text-base font-bold hover:shadow-2xl hover:shadow-[#F45D01]/50 transition-all duration-300 overflow-hidden"
              magneticStrength={0.4}
              rippleColor="rgba(255, 255, 255, 0.6)"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#6559FF] to-[#F45D01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 z-10">
                View My Work
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 border-2 border-white/30 text-white rounded-full text-base font-bold hover:bg-white/10 hover:border-white/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              magneticStrength={0.4}
              rippleColor="rgba(255, 255, 255, 0.4)"
            >
              <span className="flex items-center gap-2">
                Get in Touch
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4m0 0l6-6m-6 6l6 6" />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={() => scrollToSection('about')}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 group-hover:border-white/60 transition-colors">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;
