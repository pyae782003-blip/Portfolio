import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Facebook, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top line animation
      gsap.fromTo(
        lineRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Logo
      gsap.fromTo(
        '.footer-logo',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );

      // Tagline
      gsap.fromTo(
        '.footer-tagline',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );

      // Links
      const linkColumns = footerRef.current?.querySelectorAll('.link-column');
      if (linkColumns) {
        gsap.fromTo(
          linkColumns,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Social icons
      const socialIcons = footerRef.current?.querySelectorAll('.footer-social');
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Bottom bar
      gsap.fromTo(
        '.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.7,
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: 'https://www.facebook.com/share/17mA1J8m3J/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: <Youtube className="w-4 h-4" />, href: 'https://youtube.com/@gearupmyanmarstorybook', label: 'YouTube' },
    { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>, href: 'https://t.me/Pyae_Phyo_2003', label: 'Telegram' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative pt-16 pb-8 px-6"
    >
      {/* Top gradient line */}
      <div className="max-w-7xl mx-auto mb-16">
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
          style={{ width: '0%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="footer-logo inline-block text-2xl font-bold tracking-wider font-['Montserrat'] text-white mb-4 opacity-0"
            >
              PETER
            </a>
            <p className="footer-tagline text-gray-500 text-sm max-w-xs opacity-0">
              Creating digital experiences that matter. Let's build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="link-column text-sm text-gray-500 uppercase tracking-wider mb-4 opacity-0">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="link-column text-gray-400 hover:text-white transition-colors duration-300 relative group opacity-0"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="link-column text-sm text-gray-500 uppercase tracking-wider mb-4 opacity-0">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer-social w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-300 hover:scale-110 opacity-0"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 opacity-0">
          <p className="text-gray-600 text-sm">
            © 2025 Pyae Phyo Kyaw. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full group-hover:bg-red-600 transition-all duration-300">
              <ArrowUp className="w-4 h-4 animate-bounce-subtle" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
