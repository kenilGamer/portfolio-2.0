import { useGSAP } from "@gsap/react";
import { FC, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import TiltCard from "./ui/TiltCard";

const Skills: FC = () => {
  
  const skills = [
    {
      category: "Frontend Development",
      icon: "💻",
      items: [
        { name: "React", level: 95, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "▲" },
        { name: "TypeScript", level: 85, icon: "📘" },
        { name: "Tailwind CSS", level: 96, icon: "🎨" },
        { name: "JavaScript", level: 92, icon: "🟨" },
      ],
    },
    {
      category: "Backend Development",
      icon: "⚙️",
      items: [
        { name: "Node.js", level: 95, icon: "🟢" },
        { name: "PHP", level: 70, icon: "🐘" },
        { name: "MongoDB", level: 98, icon: "🍃" },
        { name: "RESTful APIs", level: 95, icon: "🔌" },
        { name: "Express.js", level: 88, icon: "🚂" },
      ],
    },
    {
      category: "3D Development",
      icon: "🎮",
      items: [
        { name: "Three.js", level: 90, icon: "🎯" },
        { name: "Blender", level: 75, icon: "🎬" },
        { name: "WebGL", level: 70, icon: "🌐" },
        { name: "GSAP", level: 85, icon: "✨" },
      ],
    },
    {
      category: "Design & Tools",
      icon: "🛠️",
      items: [
        { name: "Figma", level: 75, icon: "🎨" },
        { name: "Git", level: 95, icon: "📦" },
        { name: "Docker", level: 80, icon: "🐳" },
        { name: "VS Code", level: 98, icon: "💻" },
      ],
    },
  ];

  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 60%",
      },
    });

    // Animate title
    setTimeout(() => {
      const title = document.querySelector('.skills-title');
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

    tl.from(".skills-description", {
      opacity: 0,
      y: 30,
      duration: 0.8,
    }, '-=0.4')
    .from(".skill-category-card", {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotationY: -15,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.5)"
    }, '-=0.3')
    .from(".skill-item", {
      opacity: 0,
      x: -30,
      stagger: 0.08,
      duration: 0.6,
    }, '-=0.4')
  }, []);


  return (
    <section
      ref={skillsRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#678983]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E6DDC4]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#678983]/20 backdrop-blur-sm border border-[#E6DDC4]/20 text-sm text-[#E6DDC4]/80 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#678983] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#678983]"></span>
              </span>
              Technical Expertise
            </div>
            <h2 className="skills-title text-5xl sm:text-6xl lg:text-7xl font-black text-[#E6DDC4] mb-6 leading-tight">
              My Skills
            </h2>
            <p className="skills-description text-lg sm:text-xl text-[#E6DDC4]/80 max-w-3xl mx-auto leading-relaxed">
              A comprehensive showcase of my technical expertise and proficiency levels across various technologies, frameworks, and tools.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, index) => (
              <TiltCard
                key={index}
                tiltIntensity={10}
                className="skill-category-card"
              >
                <div className="relative bg-[#678983]/80 rounded-2xl p-8 border border-[#E6DDC4]/20 overflow-hidden">
                  {/* Category Header */}
                  <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-5xl">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#E6DDC4]">
                        {category.category}
                      </h3>
                    </div>
                    <div className="h-1 w-20 bg-[#E6DDC4]/30 rounded-full" />
                  </div>

                  {/* Skills List */}
                  <div className="relative z-10 space-y-6">
                    {category.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="skill-item"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">
                              {skill.icon}
                            </div>
                            <span className="text-lg sm:text-xl text-[#E6DDC4] font-semibold">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-bold text-[#F0E9D2] px-2 py-1 rounded">
                              {skill.level}%
                            </span>
                            {skill.level >= 90 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[#678983] border border-[#E6DDC4]/30 text-[#E6DDC4] font-semibold">
                                Expert
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative h-3 bg-[#678983]/40 rounded-full overflow-hidden">
                          {/* Progress fill */}
                          <div
                            className="progress-bar h-full bg-[#F0E9D2] rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                          
                          {/* Percentage indicator dot */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F0E9D2] border-2 border-[#E6DDC4]"
                            style={{ left: `calc(${skill.level}% - 8px)` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </TiltCard>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Technologies', value: '20+', icon: '🔧' },
              { label: 'Projects', value: '50+', icon: '🚀' },
              { label: 'Experience', value: '5+', icon: '⭐' },
              { label: 'Satisfaction', value: '100%', icon: '💯' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[#678983]/80 rounded-2xl border border-[#E6DDC4]/20"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black text-[#E6DDC4] mb-1">
                  {stat.value}
                </div>
                <div className="text-[#E6DDC4]/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
