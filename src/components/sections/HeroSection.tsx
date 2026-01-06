import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-20" style={{ minHeight: 'calc(100vh)' }}>
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/hero/gemini-generated-hero-image"
          alt="Tropical garden landscape with palm trees and pool"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 5rem)' }}>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex justify-center">
              <Badge className="bg-green-500 hover:bg-green-600 text-sm sm:text-base px-4 py-2">
                Growing Together
              </Badge>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Plant a Seed
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover the joy of growing your own plants from seed. A journey from soil to harvest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

