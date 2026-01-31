import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Title animation - split by lines
      const titleLines = titleRef.current?.querySelectorAll('.title-line');
      if (titleLines) {
        tl.fromTo(
          titleLines[0],
          { rotateX: -90, opacity: 0, transformOrigin: 'center bottom' },
          { rotateX: 0, opacity: 1, duration: 0.8 },
          0.5
        );
        tl.fromTo(
          titleLines[1],
          { scale: 1.5, opacity: 0, filter: 'blur(20px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
          0.7
        );
        tl.fromTo(
          titleLines[2],
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7 },
          0.9
        );
      }

      // Subtitle word animation
      if (subtitleRef.current) {
        const words = subtitleRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 },
          1.1
        );
      }

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
        1.4
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.8
      );

      // Scroll-triggered parallax
      gsap.to(titleRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      gsap.to(subtitleRef.current, {
        y: -80,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const subtitleText = "Founder of GearUp Design Services & AI Creator at Burmese AI Studio. Based in Bangkok, Thailand.";
  const words = subtitleText.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />

      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-30 z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(255,0,0,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(100,0,0,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div ref={titleRef} className="mb-8" style={{ perspective: '1000px' }}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-['Montserrat'] leading-tight">
            <span className="title-line block text-white opacity-0">PYAE PHYO</span>
            <span className="title-line block text-red-500 opacity-0">KYAW</span>
            <span className="title-line block text-white opacity-0">AI CREATOR</span>
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-2 opacity-0">
              {word}
            </span>
          ))}
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToProjects}
          className="group relative px-8 py-4 bg-transparent border border-white/30 text-white text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:border-red-500 hover:scale-105 opacity-0"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            View My Work
          </span>
          <span className="absolute inset-0 bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gray-500 animate-bounce-subtle" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-1/4 right-10 w-px h-32 bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
    </section>
  );
};
