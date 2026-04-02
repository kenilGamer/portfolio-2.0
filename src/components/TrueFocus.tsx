import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  manualMode = false,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return;
    setLastActiveIndex(index);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (!manualMode || lastActiveIndex === null) return;
    setCurrentIndex(lastActiveIndex);
  };

  return (
    <div ref={containerRef} className="relative flex flex-wrap items-center justify-center gap-4">
      {words.map((word, index) => {
        const isActive = index === currentIndex;

        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`relative cursor-pointer text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.03em] transition-[filter] duration-[500ms] ${
              isActive ? 'blur-0' : manualMode ? 'blur-md' : 'blur-sm'
            } bg-gradient-to-r from-cyan-300 via-white to-cyan-100 bg-clip-text text-transparent`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="pointer-events-none absolute left-0 top-0 box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
      >
        <span className="absolute left-[-10px] top-[-10px] h-4 w-4 rounded-[3px] border-[3px] border-r-0 border-b-0 border-emerald-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.8)]" />
        <span className="absolute right-[-10px] top-[-10px] h-4 w-4 rounded-[3px] border-[3px] border-l-0 border-b-0 border-emerald-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.8)]" />
        <span className="absolute bottom-[-10px] left-[-10px] h-4 w-4 rounded-[3px] border-[3px] border-r-0 border-t-0 border-emerald-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.8)]" />
        <span className="absolute bottom-[-10px] right-[-10px] h-4 w-4 rounded-[3px] border-[3px] border-l-0 border-t-0 border-emerald-400 drop-shadow-[0_0_4px_rgba(74,222,128,0.8)]" />
      </motion.div>
    </div>
  );
};

export default TrueFocus;