import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { FC, useRef } from 'react';
import TiltCard from './ui/TiltCard';


const Testimonials: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);



  const testimonials = [
    {
      name: 'MS. GEETA P SOLANKI',
      role: 'CFO',
      company: 'Glovtouch',
      image: '/image/geeta.jpg',
      content: 'Working with this developer was an absolute pleasure. Their attention to detail and problem-solving skills helped us create a product that exceeded our expectations.',
    },
    {
      name: 'Panchal jaydip narendrabhai',
      role: 'CEO',
      company: 'Shree Jay Furniture',
      image: '/image/jd.JPG',
      content: 'The technical expertise and innovative solutions provided were instrumental in our product\'s success. Highly recommended for any complex web development project.',
    },
    {
      name: 'MR. SUMIT L CHUDASAMA',
      role: 'Co-Founder',
      company: 'Glovtouch',
      image: '/image/sumit.jpg',
      content: 'Collaborating on this project was seamless. Their understanding of modern web technologies and user experience principles made the development process smooth and efficient.',
    },
  ];
  
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
      const title = document.querySelector('.testimonials-title');
      if (title) {
        const split = new SplitText(title, { type: 'chars' });
        split.chars.forEach((char) => {
          const charEl = char as HTMLElement;
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

    tl.from(".testimonials-description", {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, '-=0.3')
    .from(".testimonials-cards", {
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
            <h2 className="testimonials-title text-5xl sm:text-6xl font-bold text-[#E6DDC4] mb-6">
              Client Testimonials
            </h2>
            <p className="testimonials-description text-lg sm:text-xl text-[#E6DDC4]/80 max-w-3xl mx-auto leading-relaxed">
              Hear what our clients have to say about their experience working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TiltCard
                key={index}
                tiltIntensity={8}
                className="testimonials-cards"
              >
                <div
                  ref={(el) => {
                    if (el) {
                      cardsRef.current[index] = el;
                    }
                  }}
                  className="group backdrop-blur-xl bg-[#678983]/80 rounded-2xl p-8 border border-[#E6DDC4]/20 hover:border-[#E6DDC4]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#678983]/20 h-full"
                >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#E6DDC4]">{testimonial.name}</h3>
                  <p className="text-[#E6DDC4]/70">{testimonial.role}</p>
                  <p className="text-[#E6DDC4]/50 text-sm">{testimonial.company}</p>
                </div>
              </div>
                  <p className="text-[#E6DDC4]/80 leading-relaxed">{testimonial.content}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 