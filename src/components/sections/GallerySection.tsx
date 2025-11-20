import React from 'react';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Separator } from '../ui/separator';

const galleryImages = [
  { url: '/images/flowers/orchids/orchidsPhoto.jpeg', title: 'Exotic Orchids', category: 'Flowers' },
  { url: '/images/flowers/hibiscus/peach-pink-hibiscus-closeup.jpg', title: 'Beautiful Hibiscus', category: 'Flowers' },
  { url: '/images/gallery/mixed-flowering-plants-garden.jpg', title: 'Fresh Chillies', category: 'Harvest' },
  { url: '/images/gallery/potted-plants-collection.jpg', title: 'Garden Aubergine', category: 'Harvest' },
  { url: '/images/flowers/hibiscus/red-hibiscus-flower.jpg', title: 'Homegrown Lemons', category: 'Harvest' },
  { url: '/images/flowers/hibiscus/coral-hibiscus-flower.jpg', title: 'Papaya Solo', category: 'Harvest' },
  { url: '/images/indoor/succulent-garden-display.jpg', title: 'Recycled Can Planters', category: 'Products' },
  { url: '/images/flowers/other/orange-trumpet-vine-flowers.jpg', title: 'Plant Sale Day', category: 'Products' },
  { url: '/images/gallery/yellow-hibiscus-flower.jpg', title: 'Recycled Bottle Planters', category: 'Garden' },
  { url: '/images/product-specific/garlicChivePhoto.jpeg', title: 'Garlic Chive', category: 'Products' },
  { url: '/images/product-specific/eggplantPhoto.jpeg', title: 'Eggplant Seedling', category: 'Products' },
  { url: '/images/product-specific/flamingKathyPhoto.jpeg', title: 'Flaming Katy', category: 'Products' },
  { url: '/images/product-specific/jadePlantPhoto.jpeg', title: 'Jade Plant', category: 'Products' },
  { url: '/images/product-specific/stonecropPhoto.jpeg', title: 'Stonecrop', category: 'Products' },
  { url: '/images/product-specific/turtleVinePhoto.jpeg', title: 'Turtle Vine', category: 'Products' },
  { url: '/images/gallery/pink-hibiscus-closeup.jpg', title: 'Hibiscus Collection', category: 'Flowers' },
  { url: '/images/flowers/orchids/pink-bauhinia-orchid-tree.jpg', title: 'Pink Orchids', category: 'Flowers' },
  { url: '/images/flowers/orchids/yellow-oncidium-orchid.jpg', title: 'Yellow Orchids', category: 'Flowers' },
  { url: '/images/flowers/orchids/pink-orchid-flowers.jpg', title: 'Purple Orchids', category: 'Flowers' },
  { url: '/images/edible/vegetables/fresh-green-lettuce.jpg', title: 'Fresh Lettuce', category: 'Harvest' },
  { url: '/images/flowers/other/red-amaryllis-flowers.jpg', title: 'Red Amaryllis', category: 'Flowers' },
  { url: '/images/edible/fruits/fresh-mulberries-branch.jpg', title: 'Garden Mulberries', category: 'Harvest' },
  { url: '/images/hero/garden-landscape-overview.jpg', title: 'Hibiscus Garden', category: 'Garden' },
  { url: '/images/indoor/snake-plant-sansevieria.jpg', title: 'Snake Plant', category: 'Products' },
  { url: '/images/product-specific/dolipranePhoto.jpeg', title: 'Doliprane Plant', category: 'Products' },
];

export function GallerySection() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Inspiration Gallery</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Explore beautiful examples of successful seed planting and gardens
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {galleryImages.map((image) => (
          <div
            key={image.title}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer aspect-square"
          >
            <ImageWithFallback
              src={image.url}
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
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBnYXJkZW58ZW58MXx8fHwxNzYxMjk1NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Lush vegetable garden"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white text-2xl mb-2">Thriving Garden</h3>
            <p className="text-white/80">The result of patience and care</p>
          </div>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1530027644375-9c83053d392e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBibG9vbWluZ3xlbnwxfHx8fDE3NjEzNjg4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Blooming flowers"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white text-2xl mb-2">Beautiful Blooms</h3>
            <p className="text-white/80">From tiny seeds to stunning flowers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

