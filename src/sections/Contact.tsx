import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Calendar, Send, Facebook, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word animation
      const words = headingRef.current?.querySelectorAll('.heading-word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subheading
      gsap.fromTo(
        '.contact-subheading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );

      // Contact info items
      const infoItems = infoRef.current?.querySelectorAll('.info-item');
      if (infoItems) {
        gsap.fromTo(
          infoItems,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Social icons
      const socialIcons = infoRef.current?.querySelectorAll('.social-icon');
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Form fields
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(
          formFields,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Submit button
      gsap.fromTo(
        '.submit-btn',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Divider line
      gsap.fromTo(
        '.divider-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xnjvegnk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const headingWords = "LET'S CREATE SOMETHING AMAZING".split(' ');

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'pyae782003@gmail.com' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: 'Bangkok, Thailand' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Availability', value: 'Open for new projects' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/share/17mA1J8m3J/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/@gearupmyanmarstorybook', label: 'YouTube' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-6"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="heading-word inline-block mr-3 opacity-0">
                {word}
              </span>
            ))}
          </h2>
          <p className="contact-subheading text-gray-400 text-lg max-w-xl mx-auto opacity-0">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          {/* Divider line (desktop only) */}
          <div className="divider-line hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top" />

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Info Items */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="info-item flex items-center gap-4 opacity-0"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg text-red-500">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    <div className="text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-sm text-gray-500 mb-4">Follow me</div>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:rotate-6 opacity-0"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="form-field relative opacity-0">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formState.name
                    ? '-top-2.5 text-xs text-red-500 bg-black px-2'
                    : 'top-4 text-gray-500'
                    }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-field relative opacity-0">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formState.email
                    ? '-top-2.5 text-xs text-red-500 bg-black px-2'
                    : 'top-4 text-gray-500'
                    }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="form-field relative opacity-0">
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || formState.subject
                  ? '-top-2.5 text-xs text-red-500 bg-black px-2'
                  : 'top-4 text-gray-500'
                  }`}
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                required
              />
            </div>

            {/* Message */}
            <div className="form-field relative opacity-0">
              <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formState.message
                  ? '-top-2.5 text-xs text-red-500 bg-black px-2'
                  : 'top-4 text-gray-500'
                  }`}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={5}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,0,0,0.2)] resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn group w-full md:w-auto px-8 py-4 bg-red-600 text-white font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all duration-300 hover:scale-105 opacity-0"
            >
              <span>Send Message</span>
              <Send className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </section>
  );
};
