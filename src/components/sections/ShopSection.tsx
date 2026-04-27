import React, { useMemo, useState } from 'react';
import { MessageCircle, MapPin, ExternalLink, ShoppingBag } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PlantOrderForm } from '../PlantOrderForm';
import { sections, products, settings } from '../../lib/content';

export function ShopSection() {
  const shop = sections.shop;
  const contact = settings.contact;
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [initialQuantities, setInitialQuantities] = useState<Record<string, number>>({});
  const emptyQuantities = useMemo(() => ({}), []);

  if (isOrderFormOpen) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl mb-3 px-4">Complete Your Plant Order</h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-600 px-4">
            Select your plants, add your details, and send one WhatsApp order to Danielle.
          </p>
        </div>
        <PlantOrderForm
          open
          variant="inline"
          onClose={() => setIsOrderFormOpen(false)}
          products={products}
          initialQuantities={initialQuantities}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">{shop.sectionTitle}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          {shop.sectionSubtitle}
        </p>
      </div>

      <div 
        onClick={() => {
          setInitialQuantities(emptyQuantities);
          setIsOrderFormOpen(true);
        }}
        className="max-w-4xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300 space-y-3 sm:space-y-4 cursor-pointer hover:border-green-400 hover:shadow-md transition-all group"
      >
        <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center group-hover:text-green-800 transition-colors">{shop.howToOrderTitle}</h3>
        {shop.orderSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            {index === 0 && <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />}
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
                  className="text-xs sm:text-sm text-green-600 underline inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get directions
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
        <div className="pt-2 text-sm text-green-600 bg-green-50 rounded-lg p-3 flex justify-between items-center ring-1 ring-green-200 group-hover:bg-green-100 transition-colors">
          <span><strong>New:</strong> Use the order form to send a clear, structured request — cuts back-and-forth in half!</span>
          <Button
            type="button"
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white ml-4 flex-shrink-0 font-bold px-4"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setInitialQuantities(emptyQuantities);
              setIsOrderFormOpen(true);
            }}
          >
            Open Order Form
          </Button>
        </div>
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
              <CardDescription className="text-sm sm:text-base whitespace-pre-line">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 mt-auto space-y-2">
              {/* Primary: structured order form */}
              <Button
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base font-bold"
                onClick={() => {
                  setInitialQuantities({ [product.title]: 1 });
                  setIsOrderFormOpen(true);
                }}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Order Now
              </Button>
              {/* Fallback: direct WhatsApp */}
              <a
                href={`https://wa.me/${settings.contact.whatsapp}?text=${encodeURIComponent(product.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors py-1"
              >
                <MessageCircle className="w-3 h-3" />
                or message directly on WhatsApp
              </a>
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
          <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold border-green-600 text-green-700" asChild>
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

