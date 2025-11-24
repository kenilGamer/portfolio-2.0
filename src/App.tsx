import { FC, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import Galaxy from "./components/LiquidEther";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollToTop from "./components/ui/ScrollToTop";
import PageLoader from "./components/ui/PageLoader";
import LiquidEther from "./components/LiquidEther";

gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin
);
const App: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  useGSAP(() => {
    // Create the smooth scroller
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      normalizeScroll: true,
      smoothTouch: 0.1,
      // effects: true,
    });

    // Update scroll progress and direction
    ScrollTrigger.create({
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        setIsScrolling(self.direction === 1);
      },
    });
  }, []);

  return (
    <div
      id="smooth-wrapper"
      className="bg-[#181D31] relative select-none overflow-x-hidden"
    >
      <PageLoader />
      <CustomCursor
        enabled={typeof window !== "undefined" && window.innerWidth > 768}
      />
      <ScrollToTop />
      <div className="absolute inset-0 w-full h-full pointer-events-none">
    


<LiquidEther
    colors={[ "#181D31", "#678983", "#E6DDC4","#F0E9D2" ]}
    mouseForce={10}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={1000}
    autoRampDuration={0.6}
  />

      </div>
      <div className="scroll-progress fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="scroll-progress-bar h-full transition-all duration-300"
          style={{
            width: `${scrollProgress * 100}%`,
            backgroundColor: isScrolling ? "#678983" : "#F0E9D2",
          }}
        />
      </div>
      <div id="smooth-content" className="relative">
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
