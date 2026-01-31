import { useState, useEffect } from 'react';
import { Menu, X, Award } from 'lucide-react';
import { CertificatesModal } from './CertificatesModal';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'glass border-b border-white/10'
          : 'bg-transparent'
          }`}
        style={{
          height: isScrolled ? '60px' : '70px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-wider font-['Montserrat'] transition-transform duration-300"
            style={{ transform: isScrolled ? 'scale(0.85)' : 'scale(1)' }}
          >
            <span className="text-white">PETER</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            {/* Certificates Button */}
            <button
              onClick={() => setIsCertModalOpen(true)}
              className="relative text-sm text-gray-400 hover:text-white transition-colors duration-300 group flex items-center gap-1"
            >
              <Award className="w-4 h-4" />
              Certificates
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </button>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="hidden md:block px-5 py-2 border border-white/30 text-sm text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300 hover:scale-105"
          >
            Let's Talk
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl text-white hover:text-pink-500 transition-colors duration-300"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.4s ease ${index * 0.1 + 0.2}s`,
              }}
            >
              {link.name}
            </button>
          ))}
          {/* Certificates button for mobile */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCertModalOpen(true);
            }}
            className="text-2xl text-white hover:text-pink-500 transition-colors duration-300 flex items-center gap-2"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${navLinks.length * 0.1 + 0.2}s`,
            }}
          >
            <Award className="w-6 h-6" />
            Certificates
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-4 px-8 py-3 bg-pink-600 text-white text-lg transition-all duration-300"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${(navLinks.length + 1) * 0.1 + 0.2}s`,
            }}
          >
            Let's Talk
          </button>
        </div>
      </div>

      {/* Certificates Modal */}
      <CertificatesModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
    </>
  );
};
