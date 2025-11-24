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
    const description = document.querySelector('.hero-description');
    const buttons = document.querySelectorAll('.hero-buttons > *');
    
    if (description) {
      tl.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.6');
    }
    
    if (buttons.length > 0) {
      tl.from('.hero-buttons > *', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.4');
    }

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
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#678983]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#E6DDC4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
       

          {/* Main title */}
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-[#E6DDC4]">
            Crafting Beautiful
            <br />
            Digital Experiences
          </h1>

          {/* Description */}
          <div className="hero-description space-y-4 max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-[#E6DDC4]/95 leading-relaxed font-light">
              Building modern, responsive, and interactive web applications with{' '}
              <span className="text-[#E6DDC4] font-semibold">
                React, TypeScript, and Next.js
              </span>
            </p>
            <p className="text-base sm:text-lg text-[#E6DDC4]/80 leading-relaxed font-light">
              Specializing in elegant UI/UX design, blazing-fast performance optimization,
              and creating intuitive, pixel-perfect user interfaces
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-[#F0E9D2] text-[#181D31] rounded-full text-base font-bold hover:bg-[#F0E9D2]/90 hover:shadow-2xl hover:shadow-[#F0E9D2]/30 transition-all duration-300 overflow-hidden"
              magneticStrength={0.4}
              rippleColor="rgba(24, 29, 49, 0.1)"
            >
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
              className="group relative px-8 py-4 border-2 border-[#E6DDC4]/30 text-[#E6DDC4] rounded-full text-base font-bold hover:bg-[#678983]/20 hover:border-[#E6DDC4]/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
              magneticStrength={0.4}
              rippleColor="rgba(230, 221, 196, 0.4)"
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
          className="group flex flex-col items-center gap-2 text-[#E6DDC4]/70 hover:text-[#E6DDC4] transition-colors duration-300"
        >
          <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#E6DDC4]/40 rounded-full flex items-start justify-center p-2 group-hover:border-[#E6DDC4]/80 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#E6DDC4]/20">
            <div className="w-1.5 h-1.5 bg-[#E6DDC4] rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;
