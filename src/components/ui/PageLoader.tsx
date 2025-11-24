import { FC, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const PageLoader: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Minimum loading time for smooth experience
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
      clearInterval(progressInterval);
    }, 1500);

    // Cleanup
    return () => {
      clearInterval(progressInterval);
      clearTimeout(minLoadTime);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Animate loader out
      gsap.to('.page-loader', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          const loader = document.querySelector('.page-loader');
          if (loader) {
            loader.remove();
          }
        },
      });
    }
  }, [isLoading]);

  useEffect(() => {
    // Animate progress bar
    gsap.to('.loader-progress-bar', {
      width: `${Math.min(progress, 100)}%`,
      duration: 0.3,
      ease: 'power1.out',
    });
  }, [progress]);

  if (!isLoading && progress >= 100) {
    return null;
  }

  return (
    <div className="page-loader fixed inset-0 z-[9999] bg-[#181D31] flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#678983]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E6DDC4]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Logo/Name */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#E6DDC4] mb-2">
            Kenil Sangani
          </h1>
          <p className="text-[#E6DDC4]/60 text-sm sm:text-base font-medium">
            Co-founder of CreativityCoder
          </p>
        </div>

        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#E6DDC4]/10 rounded-full">
            <div className="absolute inset-0 border-4 border-transparent border-t-[#678983] rounded-full animate-spin" style={{ animationDuration: '1s' }} />
            <div className="absolute inset-0 border-4 border-transparent border-r-[#E6DDC4] rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            <div className="absolute inset-2 border-4 border-transparent border-b-[#F0E9D2] rounded-full animate-spin" style={{ animationDuration: '2s' }} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 max-w-full px-4">
          <div className="h-1 bg-[#E6DDC4]/10 rounded-full overflow-hidden">
            <div
              className="loader-progress-bar h-full bg-[#F0E9D2] rounded-full transition-all duration-300"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-[#E6DDC4]/40 text-xs text-center mt-2 font-medium">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-[#E6DDC4]/50 text-sm font-medium animate-pulse">
            Loading amazing content...
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#E6DDC4]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;

