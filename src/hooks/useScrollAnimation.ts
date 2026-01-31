import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animation
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Fade in animation
      gsap.utils.toArray<HTMLElement>('.fade-in').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>('.stagger-children').forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Scale up animation
      gsap.utils.toArray<HTMLElement>('.scale-up').forEach((elem) => {
        gsap.fromTo(
          elem,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Slide from left
      gsap.utils.toArray<HTMLElement>('.slide-left').forEach((elem) => {
        gsap.fromTo(
          elem,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Slide from right
      gsap.utils.toArray<HTMLElement>('.slide-right').forEach((elem) => {
        gsap.fromTo(
          elem,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => window.innerHeight * speed * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
};
