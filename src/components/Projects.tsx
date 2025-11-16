import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FC, useRef, useState } from 'react';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';


const Projects: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and MongoDB.',
      image: '/image/Screenshot 2025-05-03 193837.png',
      tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
      link: 'https://whitezone.vercel.app/',
      github: 'https://github.com/kenilGamer/whitezone',
      category: 'web',
    },    
    {
      title: '3D Product Viewer',
      description: 'Interactive 3D product visualization using Three.js and WebGL.',
      image: '/image/Screenshot 2025-05-03 194121.png',
      tags: ['Three.js', 'WebGL', 'React', 'GSAP'],
      link: 'https://amaya.godcraft.fun/',
      github: 'https://github.com/kenilGamer/Amaya',
      category: '3d',
    },
    {
      title: 'AI-Powered Dashboard',
      description: 'Real-time analytics dashboard with AI-powered insights and predictions.',
      image: '/image/ai.png',
      tags: ['React', 'Node.js', 'TensorFlow', 'D3.js'],
      link: 'https://ai.godcraft.fun/',
      github: 'https://github.com/kenilGamer/AI-Image-Enhancer',
      category: 'web',
    },
    {
      title: 'Movie Website',
      description: 'A modern movie streaming platform with personalized recommendations and user profiles.',
      image: '/image/moviesapp.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
      link: 'https://movies.godcraft.fun/',
      github: 'https://github.com/kenilGamer/Movies-app',
      category: 'web',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);
   
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "+=100%",
        scrub: 1,
        // markers: true,
      },
    });
    // Animate title
    setTimeout(() => {
      const title = document.querySelector('.project-title');
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
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, 100);

    tl.from(".project-description", {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, '-=0.3')
    .from(".project-filters", {
      opacity: 0,
      y: 20,
      duration: 0.5,
    }, '-=0.2')
    .from(".project-cards", {
      opacity: 0,
      y: 40,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
    }, '-=0.2'); 
  }, []);
    
  
  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="project-title text-5xl sm:text-6xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="project-description text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              A showcase of our most impactful and innovative projects.
            </p>
            
            {/* Filter Buttons */}
            <div className="project-filters flex flex-wrap justify-center gap-4 mt-8">
            {['all', 'web', '3d'].map((cat) => (
              <MagneticButton
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#F45D01] to-[#6559FF] text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                magneticStrength={0.2}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MagneticButton>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <TiltCard
              key={index}
              tiltIntensity={10}
              className="project-cards"
            >
              <section
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    cardsRef.current[index] = el;
                  }
                }}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#F45D01]/10 h-full"
                onClick={() => setSelectedProject(index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F45D01] to-[#6559FF] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
                  <p className="text-white/80 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link && (
                      <MagneticButton
                        onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                          e?.stopPropagation();
                          window.open(project.link, '_blank');
                        }}
                        className="inline-flex items-center gap-2 text-white hover:text-[#F45D01] transition-colors duration-300"
                        magneticStrength={0.2}
                      >
                        <span>View Project</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </MagneticButton>
                    )}
                    {project.github && (
                      <MagneticButton
                        onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
                          e?.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                        className="inline-flex items-center gap-2 text-white hover:text-[#F45D01] transition-colors duration-300"
                        magneticStrength={0.2}
                      >
                        <span>GitHub</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </section>
            </TiltCard>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {projects[selectedProject] && (
                <>
                  <img
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    className="w-full h-64 object-cover rounded-2xl mb-6"
                  />
                  <h3 className="text-3xl font-bold text-white mb-4">{projects[selectedProject].title}</h3>
                  <p className="text-white/80 mb-6 text-lg">{projects[selectedProject].description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[selectedProject].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-[#F45D01] to-[#6559FF] text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default Projects; 