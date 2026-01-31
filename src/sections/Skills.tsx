import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cpu,
  Clapperboard,
  Brush,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const skillCards: SkillCard[] = [
  {
    title: 'AI Architecture & Conversational Engineering',
    description: 'Architecting custom chatbots using Gemini, ChatGPT, Claude, and DeepSeek for seamless user interaction and automation.',
    icon: <Cpu className="w-6 h-6" />,
    iconBg: '#ffffff',
    iconColor: '#ef4444',
  },
  {
    title: 'Generative Video & Visual Production',
    description: 'Utilizing Kling AI to produce professional story videos, high-conversion advertisements, and immersive multimedia music video narratives.',
    icon: <Clapperboard className="w-6 h-6" />,
    iconBg: '#ffffff',
    iconColor: '#ef4444',
  },
  {
    title: 'Creative Design & Multimedia Tooling',
    description: 'Mastering Figma, Canva, and CapCut to transform complex conceptual ideas into visually compelling and professional designs.',
    icon: <Brush className="w-6 h-6" />,
    iconBg: '#ffffff',
    iconColor: '#ef4444',
  },
  {
    title: 'Strategic AI Integration & Workflows',
    description: 'Orchestrating emerging technologies and creative workflows to balance technical precision with innovative aesthetics for impactful results.',
    icon: <Zap className="w-6 h-6" />,
    iconBg: '#ffffff',
    iconColor: '#ef4444',
  },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Icon animation
      const icons = cardsRef.current?.querySelectorAll('.skill-icon');
      if (icons) {
        gsap.fromTo(
          icons,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.2,
          }
        );
      }

      // Hover glow animation setup
      cards?.forEach((card) => {
        const glow = card.querySelector('.card-glow');

        card.addEventListener('mouseenter', () => {
          gsap.to(glow, {
            opacity: 1,
            duration: 0.3,
          });
          gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.3,
          });
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCards.map((skill, index) => (
            <div
              key={index}
              className="skill-card relative p-6 rounded-2xl bg-[#0d1117] border border-gray-800/50 cursor-pointer transition-colors duration-300 hover:border-gray-700/70"
              style={{ opacity: 0 }}
            >
              {/* Glow effect */}
              <div
                className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${skill.iconBg.includes('ec4899') ? 'rgba(236,72,153,0.15)' : skill.iconBg.includes('f97316') ? 'rgba(249,115,22,0.15)' : skill.iconBg.includes('f59e0b') ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)'}, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="skill-icon w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: skill.iconBg,
                  color: skill.iconColor,
                }}
              >
                {skill.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 font-['Montserrat']">
                {skill.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
