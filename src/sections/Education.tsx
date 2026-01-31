import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Award, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
    id: number;
    degree: string;
    institution: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    icon: React.ReactNode;
    color: string;
}

const educationData: EducationItem[] = [
    {
        id: 1,
        degree: 'B.Sc. Business Computing & Information Systems',
        institution: 'Kasem Bundit University & UCLan',
        location: 'Bangkok, Thailand',
        period: '2024 - Present',
        description: 'Currently completing final year studying Business Computing and Information Systems in partnership with University of Central Lancashire.',
        achievements: ['Final Year', 'Dual Degree Program'],
        icon: <GraduationCap className="w-6 h-6" />,
        color: '#ef4444',
    },
    {
        id: 2,
        degree: 'NCC Level 5 Diploma',
        institution: 'Strategy First University',
        location: 'Myanmar',
        period: '2024 - 2025',
        description: 'Advanced diploma in computing with focus on Digital Innovation Technology and AI-driven content creation.',
        achievements: ['GPA: 4.0/4.0', 'Top Performer'],
        icon: <Award className="w-6 h-6" />,
        color: '#f97316',
    },
    {
        id: 3,
        degree: 'NCC Level 4 Diploma',
        institution: 'Strategy First University',
        location: 'Myanmar',
        period: '2023 - 2024',
        description: 'Foundation diploma building strong technical skills in computing and information systems.',
        achievements: ['GPA: 3.87/4.0', 'Dean\'s List'],
        icon: <BookOpen className="w-6 h-6" />,
        color: '#eab308',
    },
    {
        id: 4,
        degree: 'General Educational Development (GED)',
        institution: 'Crown Education',
        location: 'Myanmar',
        period: '2022 - 2023',
        description: 'Completed high school equivalency program with focus on academic excellence.',
        achievements: ['Completed: March 2023', 'Full Certification'],
        icon: <BookOpen className="w-6 h-6" />,
        color: '#22c55e',
    },
];

export const Education = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            const headingChars = headingRef.current?.querySelectorAll('.heading-char');
            if (headingChars) {
                gsap.fromTo(
                    headingChars,
                    { y: 50, opacity: 0, rotateX: -90 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.03,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Animate the timeline line drawing
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0, transformOrigin: 'top center' },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 70%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }

            // Animate timeline items
            const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
            if (timelineItems) {
                timelineItems.forEach((item, index) => {
                    const isLeft = index % 2 === 0;

                    // Card animation
                    gsap.fromTo(
                        item.querySelector('.timeline-card'),
                        {
                            x: isLeft ? -100 : 100,
                            opacity: 0,
                            scale: 0.8,
                            rotateY: isLeft ? -15 : 15,
                        },
                        {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            rotateY: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 75%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );

                    // Node animation
                    gsap.fromTo(
                        item.querySelector('.timeline-node'),
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            ease: 'back.out(2)',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 75%',
                                toggleActions: 'play none none none',
                            },
                        }
                    );

                    // Pulse animation for nodes
                    gsap.to(item.querySelector('.timeline-node-pulse'), {
                        scale: 1.5,
                        opacity: 0,
                        duration: 1.5,
                        repeat: -1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 75%',
                            toggleActions: 'play pause resume pause',
                        },
                    });

                    // Achievement badges stagger
                    const badges = item.querySelectorAll('.achievement-badge');
                    gsap.fromTo(
                        badges,
                        { y: 20, opacity: 0, scale: 0.8 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            stagger: 0.1,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 70%',
                                toggleActions: 'play none none none',
                            },
                            delay: 0.3,
                        }
                    );
                });
            }

            // Floating particles animation
            const particles = sectionRef.current?.querySelectorAll('.edu-particle');
            particles?.forEach((particle) => {
                gsap.to(particle, {
                    y: 'random(-30, 30)',
                    x: 'random(-20, 20)',
                    rotation: 'random(-15, 15)',
                    duration: 'random(3, 5)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const headingText = 'EDUCATION';

    return (
        <section
            id="education"
            ref={sectionRef}
            className="relative py-24 md:py-32 px-6 overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="edu-particle absolute w-2 h-2 rounded-full bg-red-500/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div ref={headingRef} className="text-center mb-20">
                    <p className="text-red-500 text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
                        My Journey
                    </p>
                    <h2
                        className="text-4xl md:text-6xl font-bold font-['Montserrat']"
                        style={{ perspective: '1000px' }}
                    >
                        {headingText.split('').map((char, i) => (
                            <span
                                key={i}
                                className="heading-char inline-block opacity-0"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </h2>
                    <div className="mt-6 w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full" />
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Central Line */}
                    <div
                        ref={lineRef}
                        className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 transform -translate-x-1/2 hidden md:block"
                        style={{ transformOrigin: 'top center' }}
                    />

                    {/* Mobile Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 md:hidden" />

                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-16">
                        {educationData.map((edu, index) => (
                            <div
                                key={edu.id}
                                className={`timeline-item relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Card */}
                                <div
                                    className={`timeline-card ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                        }`}
                                    style={{ perspective: '1000px' }}
                                >
                                    <div
                                        className="relative p-6 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600/50 transition-all duration-500 group hover:scale-[1.02]"
                                        style={{
                                            boxShadow: `0 0 30px ${edu.color}10`,
                                        }}
                                    >
                                        {/* Glow effect on hover */}
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `radial-gradient(circle at 50% 50%, ${edu.color}15, transparent 70%)`,
                                            }}
                                        />

                                        {/* Header */}
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div
                                                    className="p-3 rounded-lg"
                                                    style={{ backgroundColor: `${edu.color}20` }}
                                                >
                                                    <span style={{ color: edu.color }}>{edu.icon}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{edu.period}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-2 font-['Montserrat']">
                                                {edu.degree}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                                                <span className="font-medium" style={{ color: edu.color }}>
                                                    {edu.institution}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {edu.location}
                                                </span>
                                            </div>

                                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                                {edu.description}
                                            </p>

                                            {/* Achievements */}
                                            <div className="flex flex-wrap gap-2">
                                                {edu.achievements.map((achievement, i) => (
                                                    <span
                                                        key={i}
                                                        className="achievement-badge px-3 py-1 text-xs font-medium rounded-full border transition-colors duration-300 hover:scale-105"
                                                        style={{
                                                            backgroundColor: `${edu.color}10`,
                                                            borderColor: `${edu.color}30`,
                                                            color: edu.color,
                                                        }}
                                                    >
                                                        {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Corner accent */}
                                        <div
                                            className="absolute top-0 right-0 w-16 h-16 rounded-tr-xl overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${edu.color}20, transparent)`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Timeline Node - Desktop */}
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                                    <div
                                        className="timeline-node-pulse absolute w-12 h-12 rounded-full"
                                        style={{ backgroundColor: edu.color }}
                                    />
                                    <div
                                        className="timeline-node relative w-12 h-12 rounded-full flex items-center justify-center z-10 border-4 border-black"
                                        style={{ backgroundColor: edu.color }}
                                    >
                                        <span className="text-white">{edu.icon}</span>
                                    </div>
                                </div>

                                {/* Timeline Node - Mobile */}
                                <div className="absolute left-8 transform -translate-x-1/2 md:hidden">
                                    <div
                                        className="timeline-node-pulse absolute w-10 h-10 rounded-full"
                                        style={{ backgroundColor: edu.color }}
                                    />
                                    <div
                                        className="timeline-node relative w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-black"
                                        style={{ backgroundColor: edu.color }}
                                    >
                                        <span className="text-white text-sm">{edu.icon}</span>
                                    </div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block md:w-5/12" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </section>
    );
};
