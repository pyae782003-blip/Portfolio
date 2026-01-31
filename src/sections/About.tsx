import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 10, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '.0', label: 'GPA Score' },
  { value: 2, suffix: '', label: 'Diplomas' },
];

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState<number[]>(stats.map((s) => s.value));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image diagonal reveal
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
          opacity: 0
        },
        {
          clipPath: 'polygon(0 0%, 100% 5%, 100% 95%, 0 100%)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Heading character animation
      const headingChars = contentRef.current?.querySelectorAll('.heading-char');
      if (headingChars) {
        gsap.fromTo(
          headingChars,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.025,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Paragraph animations
      const paragraphs = contentRef.current?.querySelectorAll('.about-para');
      if (paragraphs) {
        paragraphs.forEach((para, index) => {
          gsap.fromTo(
            para,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: para,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.15,
            }
          );
        });
      }

      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 95%',
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            stats.forEach((stat, index) => {
              gsap.to(
                { value: 0 },
                {
                  value: stat.value,
                  duration: 2,
                  ease: 'power3.out',
                  onUpdate: function () {
                    setCounters((prev) => {
                      const newCounters = [...prev];
                      newCounters[index] = Math.round(this.targets()[0].value);
                      return newCounters;
                    });
                  },
                }
              );
            });
          }
        },
      });

      // Stats 3D flip entrance
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { rotateX: -90, opacity: 0, transformOrigin: 'center bottom' },
          {
            rotateX: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Parallax effects
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingText = 'ABOUT ME';

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative opacity-0"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="/images/about-portrait.jpg"
                alt="Pyae Phyo Kyaw"
                className="w-full h-full object-cover"
              />
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-white/10" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-pink-500/30 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-8">
              {headingText.split('').map((char, i) => (
                <span key={i} className="heading-char inline-block opacity-0">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p className="about-para opacity-0">
                I am Pyae Phyo Kyaw (Peter), the Founder of GearUp Design Services and an AI Creator at
                Burmese AI Studio, currently based in Bangkok, Thailand.
              </p>
              <p className="about-para opacity-0">
                As a final-year student at Kasem Bundit University and the University of Central Lancashire,
                I am completing my B.Sc. in Business Computing and Information Systems. I specialize in
                blending a strong technical foundation in Digital Innovation Technology with a passion for generative art.
              </p>
              <p className="about-para opacity-0">
                By leveraging my NCC Level 4 and 5 Diplomas from Strategy First University, I focus on
                creating impactful, AI-driven content that solves complex business challenges and pushes
                the boundaries of digital storytelling.
              </p>
            </div>

            {/* CTA Button */}
            <button className="about-para mt-8 group inline-flex items-center gap-3 px-6 py-3 bg-pink-600 text-white hover:bg-pink-700 transition-all duration-300 hover:scale-105 opacity-0">
              <Download className="w-5 h-5" />
              <span className="text-sm tracking-wider uppercase">Download Resume</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ perspective: '800px' }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item text-center opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-4xl md:text-5xl font-bold font-['Montserrat'] text-white mb-2">
                {counters[index]}
                <span className="text-pink-500">{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-500 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <svg
        className="absolute top-1/2 left-0 w-full h-px pointer-events-none opacity-20"
        style={{ transform: 'translateY(-50%)' }}
      >
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          className="animate-[draw-line_3s_ease-out_forwards]"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#ff0000" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};
