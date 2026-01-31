import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { ParticleField } from './components/ParticleField';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { CTABanner } from './sections/CTABanner';
import { Footer } from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Education />
        <Skills />
        <Contact />
        <CTABanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
