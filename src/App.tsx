import { FC, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GlobalAtmosphere from "./components/GlobalAtmosphere";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, ScrollSmoother, initGSAP } from "./lib/gsap";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollToTop from "./components/ui/ScrollToTop";
import PageLoader from "./components/ui/PageLoader";

initGSAP();

const App: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power2.inOut",
      });
    }
  };

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.4,
      normalizeScroll: true,
      smoothTouch: 0.1,
    });

    ScrollTrigger.create({
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
  }, []);

  return (
    <div
      id="smooth-wrapper"
      className="relative select-none overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg-void)' }}
    >
      {/* Global atmosphere — grain, glows, grid, scan line */}
      <GlobalAtmosphere />

      {/* Page loader */}
      <PageLoader />

      {/* Custom cursor — desktop only */}
      <CustomCursor enabled={typeof window !== "undefined" && window.innerWidth > 768} />

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Scroll progress bar */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div id="smooth-content" className="relative z-10">
        <div id="hero" className="relative">
          <Header scrollToSection={scrollToSection} />
          <Hero scrollToSection={scrollToSection} />
        </div>
        <div id="about" className="relative">
          <About scrollToSection={scrollToSection} />
        </div>
        <div id="skills" className="relative">
          <Skills />
        </div>
        <div id="services" className="relative">
          <Services scrollToSection={scrollToSection} />
        </div>
        <div id="projects" className="relative">
          <Projects />
        </div>
        <div id="testimonials" className="relative">
          <Testimonials />
        </div>
        <div id="contact" className="relative">
          <Contact />
        </div>
        <div className="relative">
          <Footer scrollToSection={scrollToSection} />
        </div>
      </div>
    </div>
  );
};

export default App;
