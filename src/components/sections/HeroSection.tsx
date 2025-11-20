import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';

export function HeroSection() {
  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1566364402522-3ba8c9ab1448?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHNwcm91dHxlbnwxfHx8fDE3NjEzNjg3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Plant growing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <Badge className="mb-3 sm:mb-4 bg-green-500 hover:bg-green-600 text-sm sm:text-base">
          Growing Together
        </Badge>
        <h1 className="text-3xl sm:text-5xl md:text-7xl text-center mb-4 sm:mb-6 text-white">
          Plant a Seed
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-center max-w-2xl text-white/90 px-4">
          Discover the joy of growing your own plants from seed. A journey from soil to harvest.
        </p>
      </div>
    </div>
  );
}

