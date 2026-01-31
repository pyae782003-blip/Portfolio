import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CTABanner = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Banner slide up animation
            gsap.fromTo(
                sectionRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );

            // Text animations
            const heading = contentRef.current?.querySelector('h2');
            const paragraph = contentRef.current?.querySelector('p');

            if (heading) {
                gsap.fromTo(
                    heading,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                        delay: 0.2,
                    }
                );
            }

            if (paragraph) {
                gsap.fromTo(
                    paragraph,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                        delay: 0.35,
                    }
                );
            }

            // Button animation
            if (buttonRef.current) {
                gsap.fromTo(
                    buttonRef.current,
                    { y: 20, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                        delay: 0.5,
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative py-16 md:py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <div
                    ref={sectionRef}
                    className="relative overflow-hidden rounded-3xl p-10 md:p-16"
                    style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a1a 30%, #4a1515 60%, #7f1d1d 100%)',
                        opacity: 0,
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                >
                    {/* Background Facebook watermark */}
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none"
                        style={{ fontSize: '280px', color: '#ef4444' }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-64 h-64 md:w-80 md:h-80"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Montserrat']">
                            Explore GearUp Design Services
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
                            Check out my latest AI creations, brand designs, and video productions on my Facebook page.
                        </p>

                        {/* CTA Button */}
                        <a
                            ref={buttonRef}
                            href="https://www.facebook.com/share/17mA1J8m3J/?mibextid=wwXIfr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-600/30 group"
                            style={{ opacity: 0 }}
                        >
                            <span>Go to Portfolio</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* Decorative gradient overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.15), transparent 50%)',
                        }}
                    />
                </div>
            </div>
        </section>
    );
};
