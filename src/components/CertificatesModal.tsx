import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    image: string;
}

const certificates: Certificate[] = [
    {
        id: 1,
        title: 'NCC Level 4 Diploma in Computing',
        issuer: 'Strategy First University, Myanmar',
        image: '/images/certificates/cert-1.jpg',
    },
    {
        id: 2,
        title: 'NCC Level 4 Academic Transcript',
        issuer: 'Strategy First University, Myanmar',
        image: '/images/certificates/cert-2.jpg',
    },
    {
        id: 3,
        title: 'NCC Level 5 Diploma in Computing',
        issuer: 'Strategy First International College, Myanmar',
        image: '/images/certificates/cert-3.jpg',
    },
    {
        id: 4,
        title: 'NCC Level 5 Academic Transcript',
        issuer: 'Strategy First International College, Myanmar',
        image: '/images/certificates/cert-5.jpg',
    },
    {
        id: 5,
        title: 'GED - High School Equivalency Credential',
        issuer: 'Office of the State Superintendent of Education',
        image: '/images/certificates/cert-4.jpg',
    },
];

interface CertificatesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CertificatesModal = ({ isOpen, onClose }: CertificatesModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(
                '.cert-modal-content',
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleClose = () => {
        if (modalRef.current) {
            gsap.to('.cert-modal-content', {
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
                onComplete: onClose,
            });
        } else {
            onClose();
        }
    };

    const nextCert = () => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
    };

    const prevCert = () => {
        setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') nextCert();
            if (e.key === 'ArrowLeft') prevCert();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    if (!isOpen) return null;

    const currentCert = certificates[currentIndex];

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Modal Content */}
            <div
                className="cert-modal-content relative w-full max-w-4xl bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Navigation arrows */}
                <button
                    onClick={prevCert}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={nextCert}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Certificate Image */}
                <div className="relative w-full bg-white/5 p-4 md:p-8">
                    <img
                        src={currentCert.image}
                        alt={currentCert.title}
                        className="w-full h-auto max-h-[60vh] object-contain mx-auto rounded-lg shadow-2xl"
                    />
                </div>

                {/* Certificate Info */}
                <div className="p-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-pink-500" />
                        <span className="text-sm text-gray-400">
                            {currentIndex + 1} of {certificates.length}
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-['Montserrat'] mb-2">
                        {currentCert.title}
                    </h3>
                    <p className="text-gray-400">{currentCert.issuer}</p>

                    {/* Thumbnail navigation */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {certificates.map((cert, index) => (
                            <button
                                key={cert.id}
                                onClick={() => setCurrentIndex(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentIndex
                                    ? 'border-pink-500 scale-110'
                                    : 'border-white/10 opacity-50 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
