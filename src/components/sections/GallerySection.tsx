import React from 'react';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Separator } from '../ui/separator';
import { sections, galleryItems } from '../../lib/content';

export function GallerySection() {
  const gallery = sections.gallery;

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">{gallery.sectionTitle}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          {gallery.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {galleryItems.map((image) => (
          <div
            key={image.title}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer aspect-square"
          >
            <ImageWithFallback
              src={image.image}
              alt={image.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white mb-1">{image.title}</h4>
                <Badge variant="secondary" className="text-xs">
                  {image.category}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.featuredImages.map((featured, index) => (
          <div key={index} className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <ImageWithFallback
              src={featured.image}
              alt={featured.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-2xl mb-2">{featured.title}</h3>
              <p className="text-white/80">{featured.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
