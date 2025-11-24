import { FC, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

interface ServicesProps {
  scrollToSection?: (id: string) => void;
}

const Services: FC<ServicesProps> = ({ scrollToSection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

    // Animate title
    setTimeout(() => {
      const title = document.querySelector('.service-title');
      if (title) {
        const split = new SplitText(title, { type: 'chars' });
        split.chars.forEach((char) => {
          const charEl = char as HTMLElement;
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

    tl.from(".service-description", {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.4')
    .from(".service-cards .service-card-item", {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotationY: -15,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.5)",
    }, '-=0.3');
    
    // Animate features with proper visibility after cards are visible
    const animateFeatures = () => {
      const features = document.querySelectorAll(".service-feature");
      if (features.length > 0) {
        features.forEach((feature, index) => {
          const el = feature as HTMLElement;
          // Set initial state for animation
          gsap.set(el, { opacity: 0, x: -20 });
          // Animate to visible
          gsap.to(el, { 
            opacity: 1, 
            x: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "power2.out",
            onComplete: () => {
              // Ensure it stays visible
              gsap.set(el, { opacity: 1 });
            }
          });
        });
      } else {
        // Retry if features not found yet (max 5 retries)
        let retries = 0;
        const retry = () => {
          if (retries < 5) {
            retries++;
            setTimeout(animateFeatures, 200);
          }
        };
        retry();
      }
    };
    
    setTimeout(animateFeatures, 1000);
  }, []);

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Next.js, and TypeScript. Delivering high-performance, scalable solutions.',
      icon: '💻',
      features: [
        { name: 'Responsive Design', icon: '📱' },
        { name: 'Performance Optimization', icon: '⚡' },
        { name: 'SEO Best Practices', icon: '🔍' },
        { name: 'Cross-browser Compatibility', icon: '🌐' },
        { name: 'Progressive Web Apps', icon: '📲' },
      ],
    },
    {
      title: '3D Development',
      description: 'Interactive 3D experiences using Three.js and WebGL for immersive web applications. Bringing your vision to life in three dimensions.',
      icon: '🎮',
      features: [
        { name: '3D Modeling', icon: '🎨' },
        { name: 'Animation', icon: '✨' },
        { name: 'Physics Simulation', icon: '🔬' },
        { name: 'VR/AR Integration', icon: '🥽' },
        { name: 'Interactive Experiences', icon: '🎯' },
      ],
    },
    {
      title: 'Backend Development',
      description: 'Robust backend solutions with Node.js, PHP, and MongoDB for scalable applications. Secure, fast, and reliable server-side architecture.',
      icon: '⚙️',
      features: [
        { name: 'API Development', icon: '🔌' },
        { name: 'Database Design', icon: '🗄️' },
        { name: 'Authentication', icon: '🔒' },
        { name: 'Cloud Integration', icon: '☁️' },
        { name: 'Microservices', icon: '🔧' },
      ],
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces designed with modern design principles. Creating delightful experiences that users love.',
      icon: '🎨',
      features: [
        { name: 'Wireframing', icon: '📐' },
        { name: 'Prototyping', icon: '🎭' },
        { name: 'User Testing', icon: '👥' },
        { name: 'Design Systems', icon: '🎪' },
        { name: 'Brand Identity', icon: '🆔' },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#678983]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E6DDC4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#678983]/20 backdrop-blur-sm border border-[#E6DDC4]/20 text-sm text-[#E6DDC4]/80 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#678983] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#678983]"></span>
              </span>
              What We Offer
            </div>
            <h2 className="service-title text-5xl sm:text-6xl lg:text-7xl font-black text-[#E6DDC4] mb-6 leading-tight">
              Our Services
            </h2>
            <p className="service-description text-lg sm:text-xl text-[#E6DDC4]/80 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions tailored to meet your specific needs and business goals. From concept to deployment, we've got you covered.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 service-cards">
            {services.map((service, index) => (
              <TiltCard
                key={index}
                tiltIntensity={12}
                className="service-card-item"
              >
                <div 
                  ref={(el) => {
                    if (el) {
                      cardsRef.current[index] = el;
                    }
                  }}
                  className="group relative backdrop-blur-xl bg-[#678983]/80 rounded-2xl p-8 border border-[#E6DDC4]/20 hover:border-[#E6DDC4]/40 hover:bg-[#678983] transition-all duration-500 hover:shadow-2xl overflow-hidden h-full"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-[#E6DDC4] group-hover:w-full transition-all duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className={`text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                          {service.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-[#E6DDC4] group-hover:scale-105 transition-transform duration-300 inline-block">
                          {service.title}
                        </h3>
                        <div className="h-1 w-16 bg-[#E6DDC4]/30 rounded-full" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#E6DDC4]/80 mb-8 leading-relaxed text-base">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-0.5 flex-1 bg-[#E6DDC4]/30" />
                        <h4 className="text-base font-bold uppercase tracking-wider text-[#E6DDC4]/80">
                          Key Features
                        </h4>
                        <div className="h-0.5 flex-1 bg-[#E6DDC4]/30" />
                      </div>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li 
                            key={featureIndex} 
                            className="service-feature group/item flex items-center gap-4 p-4 rounded-xl bg-[#678983]/60 hover:bg-[#678983] border border-[#E6DDC4]/20 hover:border-[#E6DDC4]/40 transition-all duration-300 cursor-pointer"
                            style={{ opacity: 1 }}
                          >
                            <div className="text-2xl transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-transform duration-300 flex-shrink-0">
                              {feature.icon}
                            </div>
                            <span className="text-[#E6DDC4]/90 font-medium flex-1 group-hover/item:text-[#E6DDC4] transition-colors text-base">
                              {feature.name}
                            </span>
                            <svg 
                              className="w-5 h-5 text-[#E6DDC4]/40 group-hover/item:text-[#E6DDC4]/80 group-hover/item:translate-x-1 transition-all duration-300 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <MagneticButton
                      onClick={() => scrollToSection?.('contact')}
                      className="w-full bg-[#F0E9D2] text-[#181D31] py-3 rounded-xl font-semibold hover:bg-[#F0E9D2]/90 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                      magneticStrength={0.3}
                      rippleColor="rgba(24, 29, 49, 0.1)"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Learn More
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </MagneticButton>
                  </div>

                </div>
              </TiltCard>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="backdrop-blur-xl bg-[#678983]/80 rounded-3xl p-8 sm:p-12 border border-[#E6DDC4]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#E6DDC4]/30" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E6DDC4] mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-[#E6DDC4]/70 mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can bring your vision to life with cutting-edge technology and creative solutions.
                </p>
                <MagneticButton
                  onClick={() => scrollToSection?.('contact')}
                  className="px-8 py-4 bg-[#F0E9D2] text-[#181D31] rounded-full text-base font-bold hover:bg-[#F0E9D2]/90 hover:shadow-2xl hover:shadow-[#F0E9D2]/30 transition-all duration-300"
                  magneticStrength={0.4}
                  rippleColor="rgba(255, 255, 255, 0.6)"
                >
                  <span className="flex items-center gap-2">
                    Get Started Today
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
