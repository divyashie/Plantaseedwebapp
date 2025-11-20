import React from 'react';
import { MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const shopProducts = [
  {
    name: 'Garlic Chive',
    price: 'Rs 25',
    photo: '/images/product-specific/garlicChivePhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order a Garlic Chive for Rs 25",
    description:
      'Aromatic and versatile! These delicate grass-like herbs bring a gentle garlic flavor to your kitchen. Perfect for garnishing soups, salads, and stir-fries. Low maintenance, thrives in tropical climates, and regrows beautifully after each harvest. Planted in our signature eco-friendly recycled fabric planter.',
  },
  {
    name: 'Eggplant',
    price: 'Rs 25',
    photo: '/images/product-specific/eggplantPhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order an Eggplant for Rs 25",
    description:
      'Grow your own glossy purple treasures! This healthy eggplant seedling thrives in warm tropical weather and produces abundant harvests. Perfect for rougaille, curry, or grilled delights. Comes beautifully arranged with companion succulents in our sustainable eco-friendly recycled planters.',
  },
  {
    name: 'Flaming Katy',
    price: 'Rs 25',
    photo: '/images/product-specific/flamingKathyPhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order a Flaming Katy for Rs 25",
    description:
      'A living waterfall of tiny jade leaves! This stunning cascading succulent creates a mesmerizing curtain of lush greenery. Drought-tolerant, easy to care for, and absolutely Instagram-worthy! Perfect for hanging baskets, shelves, or adding vertical interest to your space.',
  },
  {
    name: 'Jade Plant',
    price: 'Rs 50',
    photo: '/images/product-specific/jadePlantPhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order a Jade Plant for Rs 50",
    description:
      'The lucky money tree! This charming Jade Plant features plump, glossy leaves that bring prosperity and good fortune. Incredibly resilient and long-lived, perfect for beginners and seasoned plant lovers. Its thick stems create a miniature tree appearance that matures beautifully. Water sparingly and watch it thrive!',
  },
  {
    name: 'Stonecrop',
    price: 'Rs 50',
    photo: '/images/product-specific/stonecropPhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order a Stonecrop for Rs 50",
    description:
      "Nature's living art! This stunning Stonecrop showcases star-shaped rosettes in gorgeous sunset hues from jade green to peachy coral. Incredibly drought-tolerant and multiplies readily. Perfect for rock gardens, containers, or as ground cover. Low maintenance beauty that rewards minimal care!",
  },
  {
    name: 'Turtle Vine',
    price: 'Rs 25',
    photo: '/images/product-specific/turtleVinePhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order a Turtle Vine for Rs 25",
    description:
      'Adorable trailing charmer! Named for its tiny turtle shell-shaped leaves with pink-purple stems. Perfect for hanging planters where it cascades gracefully, or as whimsical ground cover. Fast-growing and easy to propagate—just pinch and plant! Loves bright indirect light and brings fairy-tale charm to any space.',
  },
  {
    name: 'Doliprane (Efferalgan)',
    price: 'Rs 40',
    photo: '/images/product-specific/dolipranePhoto.jpeg',
    message: "Hi Danielle! I'd like to pre-order a Doliprane for Rs 40",
    description:
      'A unique medicinal plant known locally as Doliprane or Efferalgan! This fascinating plant is valued for its traditional healing properties. Easy to grow in tropical climates and thrives with minimal care. Comes in our eco-friendly recycled planter, perfect for your home garden or balcony.',
  },
];

const whatsappLink = (message: string) => `https://wa.me/23059878033?text=${encodeURIComponent(message)}`;

export function ShopSection() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Shop Our Products</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Pre-order your favorite plants, planters, and fresh produce
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300 space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">How to Order</h3>
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
          <p className="text-sm sm:text-base md:text-lg">
            <strong>Step 1:</strong> Click "Pre-Order on WhatsApp" on any product
          </p>
        </div>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <div>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Step 2:</strong> We accept payments via <strong>Juice by MCB Mauritius or cash on delivery</strong>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Secure and easy mobile payment</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
          <div>
            <p className="text-sm sm:text-base md:text-lg">
              <strong>Step 3:</strong> Pick up at <strong>Cascavelle Mall</strong>
            </p>
            <a
              href="https://www.google.com/maps/dir//Cascavelle+Mall,+Cascavelle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-green-600 hover:text-green-700 underline inline-flex items-center gap-1"
            >
              Get directions
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {shopProducts.map((product) => (
          <Card key={product.name} className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 sm:h-56 md:h-64">
              <ImageWithFallback src={product.photo} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-2 gap-2">
                <CardTitle className="text-lg sm:text-xl">{product.name}</CardTitle>
                <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">{product.price}</Badge>
              </div>
              <CardDescription className="text-sm sm:text-base">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                <a href={whatsappLink(product.message)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Pre-Order on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
        <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">Questions About Your Order?</h3>
        <p className="text-center text-base sm:text-lg mb-4 px-4">
          Feel free to reach out to us on WhatsApp for any questions about availability, delivery, or custom orders.
        </p>
        <div className="text-center">
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I%20have%20a%20question%20about%20ordering" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Chat with Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

