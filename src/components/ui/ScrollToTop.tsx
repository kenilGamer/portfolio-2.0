import { FC, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      onUpdate: (self) => {
        setIsVisible(self.progress > 0.2);
      },
    });
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power2.inOut',
    });
  };

  if (!isVisible) return null;

  return (
    <MagneticButton
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#F0E9D2] text-[#181D31] shadow-lg hover:bg-[#F0E9D2]/90 hover:shadow-[#F0E9D2]/30 transition-all duration-300 flex items-center justify-center"
      magneticStrength={0.3}
      rippleColor="rgba(24, 29, 49, 0.1)"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </MagneticButton>
  );
};

export default ScrollToTop;

