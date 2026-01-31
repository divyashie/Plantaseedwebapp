import React from 'react';
import { MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { sections, products, settings } from '../../lib/content';

const whatsappLink = (message: string) =>
  `https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export function ShopSection() {
  const shop = sections.shop;
  const contact = settings.contact;

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">{shop.sectionTitle}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          {shop.sectionSubtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300 space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">{shop.howToOrderTitle}</h3>
        {shop.orderSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            {index === 0 && <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />}
            {index === 1 && (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            )}
            {index === 2 && <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />}
            <div>
              <p className="text-sm sm:text-base md:text-lg">
                <strong>{step.title}:</strong> {step.description}
              </p>
              {step.additionalInfo && (
                <p className="text-xs sm:text-sm text-gray-600">{step.additionalInfo}</p>
              )}
              {index === 2 && (
                <a
                  href={contact.pickupMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-green-600 hover:text-green-700 underline inline-flex items-center gap-1"
                >
                  Get directions
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {products.map((product) => (
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
              <CardDescription className="text-sm sm:text-base">{product.description}</CardDescription>
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

      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
        <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">{shop.questionsTitle}</h3>
        <p className="text-center text-base sm:text-lg mb-4 px-4">
          {shop.questionsText}
        </p>
        <div className="text-center">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a
              href={`https://wa.me/${contact.whatsapp}?text=Hi%20Danielle!%20I%20have%20a%20question%20about%20ordering`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Chat with Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
