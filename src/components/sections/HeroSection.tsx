import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { sections } from '../../lib/content';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const hero = sections.hero;

  return (
    <div className="relative overflow-hidden pt-20" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={hero.heroImage}
          alt="Tropical garden landscape with palm trees and pool"
          className="w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite]"
          style={{ animation: 'slowZoom 20s ease-in-out infinite' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <style>{`
        @keyframes slowZoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>

      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 5rem)' }}>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex justify-center">
              <Badge className="bg-green-600 hover:bg-green-700 text-sm sm:text-base px-4 py-2 border-none text-white">
                {hero.badge}
              </Badge>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              {hero.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12">
              {hero.tagline1}<br className="hidden md:block"/>
              {hero.tagline2}
            </p>

            <div className="mt-10">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold transition-all shadow-xl inline-flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  onNavigate(hero.buttonLink);
                  // Smooth scroll to content section
                  const contentSection = document.querySelector('.max-w-7xl');
                  if (contentSection) {
                    const navHeight = 80;
                    const elementPosition = contentSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
              >
                {hero.buttonText}
                <span
                  className="material-icons-outlined"
                  style={{ animation: 'bounce 2s ease-in-out infinite' }}
                >
                  arrow_downward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
