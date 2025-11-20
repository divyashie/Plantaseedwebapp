import React from 'react';
import { ShoppingBag, Leaf, Sprout, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const productPhoto = '/images/indoor/succulent-garden-display.jpg';
const chilliesPhoto = '/images/gallery/mixed-flowering-plants-garden.jpg';
const auberginePhoto = '/images/gallery/potted-plants-collection.jpg';

export function ProductsSection() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">Our Products</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Beautiful, eco-friendly planters and gardening essentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <div className="relative rounded-lg overflow-hidden shadow-xl">
          <ImageWithFallback
            src={productPhoto}
            alt="Recycled can planters with plants"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl">Recycled Can Planters</h3>
          <p className="text-base sm:text-lg text-gray-700">
            Transform everyday items into beautiful homes for your plants! Our eco-friendly recycled can planters are
            perfect for starting your urban garden journey. Each planter is carefully prepared and decorated to add
            color and life to your space.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                <strong>Eco-Friendly:</strong> Made from upcycled materials
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Sprout className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                <strong>Perfect Size:</strong> Ideal for herbs, flowers, and small vegetables
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p>
                <strong>Handcrafted:</strong> Each piece is unique and made with love
              </p>
            </div>
          </div>
          <div className="pt-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <a
                href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'm%20interested%20in%20your%20recycled%20can%20planters"
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
        <h3 className="text-3xl mb-4">From Our Garden to Your Table</h3>
        <p className="text-xl text-gray-600">Fresh produce grown with love</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative h-80">
            <ImageWithFallback src={chilliesPhoto} alt="Fresh green chillies" className="w-full h-full object-cover" />
          </div>
          <CardHeader>
            <CardTitle>Fresh Chillies</CardTitle>
            <CardDescription>
              Homegrown, organic chillies bursting with flavor. Perfect for adding that special kick to your dishes!
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-80">
            <ImageWithFallback
              src={auberginePhoto}
              alt="Garden fresh aubergine and peppers"
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>Garden Vegetables</CardTitle>
            <CardDescription>
              Beautiful aubergines and peppers, grown naturally in rich soil. Experience the true taste of homegrown
              produce!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-8 text-center p-6 bg-green-50 rounded-lg">
        <p className="text-lg mb-4">Interested in our products or fresh produce?</p>
        <Button variant="outline" size="lg" asChild>
          <a
            href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'm%20interested%20in%20your%20products"
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

