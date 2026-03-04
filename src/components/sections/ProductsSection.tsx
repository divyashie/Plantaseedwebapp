import React, { useState } from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { products, settings } from '../../lib/content';

const whatsappLink = (message: string) =>
  `https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(message)}`;

const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">Our Products</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Beautiful, eco-friendly planters and gardening essentials
        </p>
      </div>

      {categories.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              className={activeCategory === cat ? 'bg-green-600 hover:bg-green-700' : ''}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filtered.map((product) => (
          <Card key={product.title} className="overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            <div className="relative h-48 sm:h-56 md:h-64">
              <ImageWithFallback src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader className="p-4 sm:p-6 flex-1">
              <div className="flex justify-between items-start mb-2 gap-2">
                <CardTitle className="text-lg sm:text-xl">{product.title}</CardTitle>
                <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">
                  {product.currency} {product.price}
                </Badge>
              </div>
              <CardDescription className="text-sm sm:text-base whitespace-pre-line">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 mt-auto">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                <a href={whatsappLink(product.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Pre-Order on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 text-lg py-8">No products in this category yet.</p>
      )}

      <div className="mt-8 text-center p-6 bg-green-50 rounded-lg">
        <p className="text-lg mb-4">Interested in our products or fresh produce?</p>
        <Button variant="outline" size="lg" asChild>
          <a
            href={`https://wa.me/${settings.contact.whatsapp}?text=Hi%20Danielle!%20I'm%20interested%20in%20your%20products`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Us
          </a>
        </Button>
      </div>
    </div>
  );
}
