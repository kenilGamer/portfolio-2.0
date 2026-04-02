import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

interface ParallaxLayer {
  ref: RefObject<HTMLElement | null>;
  yPercent?: number;
  opacityTo?: number;
}

export const useParallaxLayers = (
  triggerRef: RefObject<HTMLElement | null>,
  layers: ParallaxLayer[],
  start = 'top top',
  end = 'bottom top'
) => {
  useGSAP(() => {
    const trigger = triggerRef.current;
    if (!trigger || !layers.length) return;

    const ctx = gsap.context(() => {
      const tweenTargets = layers
        .map((layer) => {
          const el = layer.ref.current;
          if (!el) return null;

          return gsap.to(el, {
            yPercent: layer.yPercent ?? 0,
            opacity: layer.opacityTo,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start,
              end,
              scrub: 1,
            },
          });
        })
        .filter(Boolean);

      return () => {
        tweenTargets.forEach((tween) => tween?.kill());
      };
    }, trigger);

    return () => ctx.revert();
  }, [triggerRef, layers, start, end]);
};
