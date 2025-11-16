import { useGSAP } from "@gsap/react";
import { FC, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import TiltCard from "./ui/TiltCard";

const Skills: FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const skills = [
    {
      category: "Frontend Development",
      icon: "💻",
      color: "from-[#F45D01] to-[#FF6B35]",
      bgColor: "from-[#F45D01]/20 to-[#FF6B35]/10",
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
      color: "from-[#6559FF] to-[#4A90E2]",
      bgColor: "from-[#6559FF]/20 to-[#4A90E2]/10",
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
      color: "from-[#FF6B35] to-[#F45D01]",
      bgColor: "from-[#FF6B35]/20 to-[#F45D01]/10",
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
      color: "from-[#4A90E2] to-[#6559FF]",
      bgColor: "from-[#4A90E2]/20 to-[#6559FF]/10",
      items: [
        { name: "Figma", level: 90, icon: "🎨" },
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
    .from(".progress-bar", {
      width: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power3.out",
    }, "-=0.6");
  }, []);

  const getLevelColor = (level: number) => {
    if (level >= 90) return "from-[#10B981] to-[#34D399]";
    if (level >= 80) return "from-[#F45D01] to-[#FF6B35]";
    if (level >= 70) return "from-[#6559FF] to-[#4A90E2]";
    return "from-[#6B7280] to-[#9CA3AF]";
  };

  return (
    <section
      ref={skillsRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F45D01]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6559FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F45D01] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F45D01]"></span>
              </span>
              Technical Expertise
            </div>
            <h2 className="skills-title text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              My Skills
            </h2>
            <p className="skills-description text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
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
                <div className={`relative backdrop-blur-xl bg-gradient-to-br ${category.bgColor} rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl overflow-hidden group`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Category Header */}
                  <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                        {category.category}
                      </h3>
                    </div>
                    <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full`} />
                  </div>

                  {/* Skills List */}
                  <div className="relative z-10 space-y-6">
                    {category.items.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="skill-item group/item"
                        onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl transform group-hover/item:scale-110 group-hover/item:rotate-12 transition-transform duration-300">
                              {skill.icon}
                            </div>
                            <span className="text-lg sm:text-xl text-white font-semibold group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-[#F45D01] group-hover/item:to-[#6559FF] transition-all duration-300">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-base sm:text-lg font-bold bg-gradient-to-r ${getLevelColor(skill.level)} bg-clip-text text-transparent`}>
                              {skill.level}%
                            </span>
                            {skill.level >= 90 && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 border border-[#10B981]/30 text-[#10B981] font-semibold">
                                Expert
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
                          
                          {/* Progress fill */}
                          <div
                            className={`progress-bar h-full bg-gradient-to-r ${getLevelColor(skill.level)} rounded-full relative overflow-hidden transition-all duration-300 ${
                              hoveredSkill === `${index}-${skillIndex}` ? 'shadow-lg' : ''
                            }`}
                            style={{ width: `${skill.level}%` }}
                          >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                            
                            {/* Glow effect on hover */}
                            {hoveredSkill === `${index}-${skillIndex}` && (
                              <div className="absolute inset-0 bg-white/40 blur-sm animate-pulse" />
                            )}
                          </div>
                          
                          {/* Percentage indicator dot */}
                          <div
                            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${getLevelColor(skill.level)} border-2 border-white shadow-lg transform transition-all duration-300 ${
                              hoveredSkill === `${index}-${skillIndex}` ? 'scale-125' : 'scale-100'
                            }`}
                            style={{ left: `calc(${skill.level}% - 8px)` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decorative corner element */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:opacity-10 transition-opacity duration-300`} />
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
                className="text-center p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black text-white mb-1 bg-gradient-to-r from-[#F45D01] to-[#6559FF] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
