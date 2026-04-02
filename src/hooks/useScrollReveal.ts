import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

interface UseScrollRevealOptions {
  start?: string;
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  once?: boolean;
}

export const useScrollReveal = (
  scopeRef: RefObject<HTMLElement | null>,
  selector = '.reveal-item',
  options: UseScrollRevealOptions = {}
) => {
  useGSAP(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector, scope);
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          y: options.y ?? 50,
          opacity: options.opacity ?? 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.9,
          stagger: options.stagger ?? 0.12,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: scope,
            start: options.start ?? 'top 70%',
            once: options.once ?? true,
          },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, selector, options.start, options.y, options.opacity, options.duration, options.stagger, options.ease, options.once]);
};
