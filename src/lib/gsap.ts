import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Observer } from 'gsap/Observer';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';

let gsapInitialized = false;

export const initGSAP = () => {
  if (gsapInitialized) return;

  gsap.registerPlugin(
    useGSAP,
    CustomEase,
    Draggable,
    Flip,
    MotionPathPlugin,
    Observer,
    ScrollSmoother,
    ScrollToPlugin,
    ScrollTrigger,
    SplitText,
    TextPlugin
  );

  CustomEase.create('cinematic', '0.22, 1, 0.36, 1');
  CustomEase.create('snap', '0.2, 0.9, 0.2, 1.25');

  gsapInitialized = true;
};

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin };
