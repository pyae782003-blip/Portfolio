import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ဦးပေါ်ဦးနှင့် နွားချေးပုံပြသနာ',
    category: 'AI Story Video',
    description: 'AI-generated Burmese folklore animation created with Kling AI',
    thumbnail: '/images/work-1.jpg',
    videoUrl: 'https://www.youtube.com/embed/mWu69HXbzwI',
  },
  {
    id: 2,
    title: 'Tom & Jerry - Emotional Story',
    category: 'AI Animation',
    description: 'Heartwarming AI-generated animation bringing childhood memories to life',
    thumbnail: '/images/work-2.png',
    videoUrl: 'https://drive.google.com/file/d/1Tb7lBsoy8FoVPDNU_7po-9QYbxCCvDn4/preview',
  },
  {
    id: 3,
    title: 'Myanmar Village Story',
    category: 'AI Storytelling',
    description: 'Beautiful watercolor-style AI-generated story about Myanmar village life',
    thumbnail: '/images/work-3.jpg',
    videoUrl: 'https://drive.google.com/file/d/1DpSwxOWaTX-EbID3iq9R0_fWessetD_S/preview',
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerWords = headerRef.current?.querySelectorAll('.header-word');
      if (headerWords) {
        gsap.fromTo(
          headerWords,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        '.projects-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              rotateY: -30,
              x: 100,
              opacity: 0,
              transformOrigin: 'center center'
            },
            {
              rotateY: 0,
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.1,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Modal animation
  useEffect(() => {
    if (selectedProject && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.modal-content',
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        onComplete: () => setSelectedProject(null),
      });
    } else {
      setSelectedProject(null);
    }
  };

  const titleWords = 'SELECTED WORK'.split(' ');

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative py-24 md:py-32 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] mb-6">
              {titleWords.map((word, i) => (
                <span key={i} className="header-word inline-block mr-4 opacity-0">
                  {word}
                </span>
              ))}
            </h2>
            <p className="projects-subtitle text-gray-400 text-lg max-w-xl mx-auto opacity-0">
              A showcase of my AI-generated videos and creative productions.
            </p>
          </div>

          {/* Projects Grid - 3 cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ perspective: '1500px' }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-card group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 opacity-0 transition-all duration-500 hover:border-pink-500/30 hover:-translate-y-2 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-600 rounded-full flex items-center justify-center transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-500 hover:scale-110">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs bg-black/60 backdrop-blur-sm text-white/80 rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-bold font-['Montserrat'] text-white mb-2 group-hover:text-pink-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {project.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="modal-content relative w-full max-w-5xl bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Video container */}
            <div className="aspect-video w-full bg-black">
              {selectedProject.videoUrl.includes('youtube.com') ? (
                <iframe
                  src={selectedProject.videoUrl}
                  title={selectedProject.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedProject.videoUrl.includes('facebook.com') ? (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(selectedProject.videoUrl)}&show_text=false&width=800&height=450`}
                  title={selectedProject.title}
                  className="w-full h-full"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selectedProject.videoUrl.includes('drive.google.com') ? (
                <iframe
                  src={selectedProject.videoUrl}
                  title={selectedProject.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedProject.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 text-xs bg-pink-600/20 text-pink-500 rounded-full border border-pink-500/30">
                  {selectedProject.category}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-['Montserrat'] mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-gray-400">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
