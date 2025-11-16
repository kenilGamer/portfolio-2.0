import { FC, useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './ui/MagneticButton';

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header: FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate header on scroll
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (headerRef.current) {
        if (prevScrollPos > currentScrollPos) {
          gsap.to(headerRef.current, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(headerRef.current, {
            y: -100,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
      prevScrollPos = currentScrollPos;
    };

    // Active section detection
    const sections = ['hero', 'about', 'skills', 'services', 'projects', 'contact'];
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger?.toString().includes('#')) {
          trigger.kill();
        }
      });
    };
  }, []);

  // Handle mobile menu animations
  useGSAP(() => {
    if (menuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(menuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' }
  ];

  return (
    <nav ref={headerRef} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-transparent">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F45D01] to-[#6559FF] hover:scale-105 transition-transform duration-300">
            Portfolio
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <MagneticButton
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-all duration-300 relative group ${
                activeSection === item.id ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              magneticStrength={0.2}
            >
              <span className="relative">
                {item.label}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F45D01] to-[#6559FF] transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </span>
            </MagneticButton>
          ))}
          <MagneticButton
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 bg-gradient-to-r from-[#F45D01] to-[#6559FF] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#F45D01]/20 transition-all duration-300"
            magneticStrength={0.3}
            rippleColor="rgba(255, 255, 255, 0.6)"
          >
            Contact
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={menuRef} className="md:hidden px-10 py-4 space-y-4 bg-black/90">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white/80 hover:text-white transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <MagneticButton
            onClick={() => {
              scrollToSection('contact');
              setIsMobileMenuOpen(false);
            }}
            className="w-full px-4 py-2 bg-gradient-to-r from-[#F45D01] to-[#6559FF] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#F45D01]/20 transition-all duration-300"
            magneticStrength={0.2}
            rippleColor="rgba(255, 255, 255, 0.6)"
          >
            Contact
          </MagneticButton>
        </div>
      )}
    </nav>
  );
};

export default Header;