import React from 'react';
import { ShoppingBag, Leaf, Sprout, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { sections, settings } from '../../lib/content';

export function ProductsSection() {
  const productsSection = sections.products;
  const featured = productsSection.featuredProduct;
  const produce = productsSection.produceSection;
  const cta = productsSection.cta;

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">{productsSection.sectionTitle}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          {productsSection.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <ImageWithFallback
            src={featured.image}
            alt={featured.imageAlt}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl">{featured.title}</h3>
          <p className="text-base sm:text-lg text-gray-700">
            {featured.description}
          </p>
          <div className="space-y-3">
            {featured.highlights.map((item, index) => (
              <div key={item.title} className="flex items-start gap-2">
                {index === 0 && <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />}
                {index === 1 && <Sprout className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />}
                {index === 2 && <Heart className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />}
                {index > 2 && <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />}
                <p>
                  <strong>{item.title}:</strong> {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <a
                href={`https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(
                  featured.whatsappMessage,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="text-center mb-8">
        <h3 className="text-3xl mb-4">{produce.title}</h3>
        <p className="text-xl text-gray-600">{produce.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {produce.cards.map((card) => (
          <Card key={card.title} className="overflow-hidden">
            <div className="relative h-80">
              <ImageWithFallback src={card.image} alt={card.imageAlt} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center p-6 bg-green-50 rounded-lg">
        <p className="text-lg mb-4">{cta.text}</p>
        <Button variant="outline" size="lg" asChild>
          <a
            href={`https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(cta.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {cta.buttonText}
          </a>
        </Button>
      </div>
    </div>
  );
}
