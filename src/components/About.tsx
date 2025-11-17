import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FC, useRef, useState } from 'react';
import MagneticButton from './ui/MagneticButton';
import TiltCard from './ui/TiltCard';

interface AboutProps {
  scrollToSection: (id: string) => void;
}

const About: FC<AboutProps> = ({ scrollToSection }) => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 60%",
      },
    });

    // Animate title
    setTimeout(() => {
      const title = document.querySelector('.about-title');
      if (title) {
        const split = new SplitText(title, { type: 'chars' });
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
          y: 30,
          rotationX: -90,
          stagger: 0.03,
          duration: 0.8,
          ease: 'back.out(1.7)',
        });
      }
    }, 100);

    tl.from('.about-description', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.4')
    .from('.about-stats-card', {
      opacity: 0,
      y: 50,
      scale: 0.8,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(1.5)',
    }, '-=0.3')
    .from('.about-buttons > *', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2')
    .from('.about-image', {
      opacity: 0,
      scale: 0.8,
      rotationY: -15,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
    .from('.about-feature', {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.6,
    }, '-=0.4');

    // Floating animation for stats
    gsap.to('.about-stats-card', {
      y: 'random(-10, 10)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2,
    });
  }, []);

  const stats = [
    { value: '5+', label: 'Years Experience', icon: '🚀', color: 'from-[#F45D01] to-[#FF6B35]' },
    { value: '50+', label: 'Projects Completed', icon: '💼', color: 'from-[#6559FF] to-[#4A90E2]' },
    { value: '100%', label: 'Client Satisfaction', icon: '⭐', color: 'from-[#FF6B35] to-[#F45D01]' },
    { value: '24/7', label: 'Support Available', icon: '🛠️', color: 'from-[#4A90E2] to-[#6559FF]' },
  ];

  const features = [
    { 
      icon: '🎨', 
      title: 'Creative Design', 
      desc: 'Pixel-perfect UI/UX designs that captivate users',
      color: 'from-[#F45D01] to-[#FF6B35]'
    },
    { 
      icon: '⚡', 
      title: 'Fast Performance', 
      desc: 'Optimized code for lightning-fast load times',
      color: 'from-[#6559FF] to-[#4A90E2]'
    },
    { 
      icon: '🔒', 
      title: 'Secure & Reliable', 
      desc: 'Enterprise-grade security and best practices',
      color: 'from-[#FF6B35] to-[#F45D01]'
    },
    { 
      icon: '📱', 
      title: 'Responsive Design', 
      desc: 'Seamless experience across all devices',
      color: 'from-[#4A90E2] to-[#6559FF]'
    },
    { 
      icon: '🚀', 
      title: 'Modern Tech Stack', 
      desc: 'React, Next.js, TypeScript, and cutting-edge tools',
      color: 'from-[#F45D01] to-[#6559FF]'
    },
    { 
      icon: '💡', 
      title: 'Problem Solver', 
      desc: 'Creative solutions for complex challenges',
      color: 'from-[#6559FF] to-[#4A90E2]'
    },
  ];

  return (
    <section ref={aboutRef} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F45D01]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6559FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F45D01] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F45D01]"></span>
              </span>
              About Me
            </div>
            <h2 className="about-title text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Crafting Digital
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F45D01] via-[#FF6B35] to-[#6559FF]">
                Excellence
              </span>
            </h2>
            <p className="about-description text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              I'm <span className="text-white font-semibold">Kenil Sangani</span>, Co-founder of <span className="text-white font-semibold">CreativityCoder</span> and a passionate full-stack developer with a keen eye for design and a love for creating beautiful, functional digital experiences. With expertise in modern web technologies and a focus on user-centered design, I bring ideas to life through code.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            {/* Left Column - Stats & Features */}
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <TiltCard
                    key={index}
                    tiltIntensity={10}
                    className="about-stats-card"
                  >
                    <div
                      className={`relative backdrop-blur-xl bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-white/20 overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                      onMouseEnter={() => setHoveredStat(index)}
                      onMouseLeave={() => setHoveredStat(null)}
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                          {stat.icon}
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-1">
                          {stat.value}
                        </h3>
                        <p className="text-white/90 text-sm font-medium">
                          {stat.label}
                        </p>
                      </div>
                      {hoveredStat === index && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent animate-pulse" />
                      )}
                    </div>
                  </TiltCard>
                ))}
              </div>

              {/* Features List */}
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F45D01] via-[#6559FF] to-[#4A90E2]" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  <span>Key Strengths</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="about-feature group relative p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold mb-2 text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F45D01] group-hover:to-[#6559FF] transition-all duration-300">
                              {feature.title}
                            </h4>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F45D01] to-[#6559FF] group-hover:w-full transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 about-buttons">
                <MagneticButton
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/cv.pdf';
                    link.download = 'cv.pdf';
                    link.click();
                  }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#F45D01] to-[#6559FF] text-white rounded-full text-base font-bold hover:shadow-2xl hover:shadow-[#F45D01]/50 transition-all duration-300 overflow-hidden"
                  magneticStrength={0.4}
                  rippleColor="rgba(255, 255, 255, 0.6)"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#6559FF] to-[#F45D01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2 z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                  </span>
                </MagneticButton>
                <MagneticButton
                  onClick={() => scrollToSection('skills')}
                  className="group relative px-8 py-4 border-2 border-white/30 text-white rounded-full text-base font-bold hover:bg-white/10 hover:border-white/50 hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
                  magneticStrength={0.4}
                  rippleColor="rgba(255, 255, 255, 0.4)"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    View Skills
                  </span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="relative about-image">
              <TiltCard tiltIntensity={15} className="h-full">
                <div className=" backdrop-blur-xl bg-gradient-to-br from-[#F45D01]/20 via-[#6559FF]/20 to-[#4A90E2]/20 rounded-3xl p-8 border border-white/20 relative overflow-hidden group hover:border-white/40 transition-all duration-500">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F45D01]/10 via-[#6559FF]/10 to-[#4A90E2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F45D01] via-[#6559FF] to-[#F45D01] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                  
                  {/* Image container */}
                  <div className="relative aspect-square bg-gradient-to-br from-[#F45D01]/30 to-[#6559FF]/30 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img 
                      src="/DSC_0116.png" 
                      alt="Kenil Sangani - Frontend Developer" 
                      className="w-full h-full object-cover img-filter object-top  rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Floating badges */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="backdrop-blur-xl bg-white/20 rounded-full px-4 py-2 border border-white/30">
                        <span className="text-white text-sm font-semibold">👋 Available</span>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                      <div className="backdrop-blur-xl bg-gradient-to-r from-[#F45D01] to-[#6559FF] rounded-full px-4 py-2">
                        <span className="text-white text-sm font-semibold">Frontend Dev</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#F45D01]/20 to-[#6559FF]/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#6559FF]/20 to-[#4A90E2]/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
                </div>
              </TiltCard>
            </div>
          </div>

          {/* Bottom Quote Section */}
          <div className="mt-20 text-center">
            <div className="backdrop-blur-xl bg-gradient-to-r from-[#F45D01]/10 via-[#6559FF]/10 to-[#4A90E2]/10 rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F45D01] via-[#6559FF] to-[#4A90E2]" />
              <div className="relative z-10">
                <div className="text-6xl mb-4">💡</div>
                <blockquote className="text-xl sm:text-2xl text-white/90 font-medium italic mb-4 max-w-3xl mx-auto">
                  "Code is like humor. When you have to explain it, it's bad."
                </blockquote>
                <p className="text-white/60 text-sm">- Cory House</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
