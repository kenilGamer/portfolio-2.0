import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const Footer: FC<FooterProps> = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 3D floating animation for background elements (only if elements exist)
    const bgElements = document.querySelectorAll('.footer-bg-element');
    if (bgElements.length > 0) {
      gsap.to('.footer-bg-element', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // 3D perspective effect on scroll
    elementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          rotationY: index % 2 === 0 ? 10 : -10,
          rotationX: 5,
          transformPerspective: 1000,
          ease: 'none',
        });
      }
    });

    // Hover 3D effect for cards
    const cards = document.querySelectorAll('.footer-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  return (
    <footer className="relative py-16 overflow-hidden">


      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div ref={el => { elementsRef.current[0] = el }} className="footer-card space-y-6 transform-gpu">
            <h2 className="text-2xl font-bold text-[#E6DDC4]">
              <span className="text-[#E6DDC4]">
                Portfolio
              </span>
            </h2>
            <p className="text-[#E6DDC4]/70 leading-relaxed">
              Creating innovative digital experiences with modern technologies and creative solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#678983]/60 flex items-center justify-center hover:bg-[#678983] transition-colors transform-gpu hover:scale-110 hover:rotate-12"
              >
                <svg className="w-5 h-5 text-[#E6DDC4]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#678983]/60 flex items-center justify-center hover:bg-[#678983] transition-colors transform-gpu hover:scale-110 hover:-rotate-12"
              >
                <svg className="w-5 h-5 text-[#E6DDC4]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#678983]/60 flex items-center justify-center hover:bg-[#678983] transition-colors transform-gpu hover:scale-110 hover:rotate-12"
              >
                <svg className="w-5 h-5 text-[#E6DDC4]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={el => { elementsRef.current[1] = el }} className="footer-card transform-gpu">
            <h3 className="text-lg font-semibold text-[#E6DDC4] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div ref={el => { elementsRef.current[2] = el }} className="footer-card transform-gpu">
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2">
                  Mobile Development
                </a>
              </li>
              <li>
                <a href="#" className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={el => { elementsRef.current[3] = el }} className="footer-card transform-gpu">
            <h3 className="text-lg font-semibold text-[#E6DDC4] mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#E6DDC4] transform-gpu hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:kenilk667@gmail.com"
                  className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2"
                >
                  kenilk667@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-[#E6DDC4] transform-gpu hover:-rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+1234567890"
                  className="text-[#E6DDC4]/70 hover:text-[#F0E9D2] transition-colors transform-gpu hover:translate-x-2"
                    >
                      +91 7383740131
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#E6DDC4] transform-gpu hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[#E6DDC4]/70 transform-gpu hover:translate-x-2">Rajkot, Gujarat</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-[#E6DDC4]/20">
          <p className="text-center text-[#E6DDC4]/50 transform-gpu hover:scale-105">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 