import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { MapPin, Mail, MessageCircle, Facebook } from 'lucide-react';

const daniellePhoto = '/images/garden-scenes/gardener-with-flowers.jpg';
const orchidsPhoto = '/images/flowers/orchids/orchidsPhoto';
const hibiscusPhoto = '/images/flowers/hibiscus/peach-pink-hibiscus-closeup.jpg';

export function AboutSection() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">Meet Danielle</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Passionate gardener and plant enthusiast
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-16">
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <ImageWithFallback
            src={daniellePhoto}
            alt="Danielle with her urban garden"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-2xl sm:text-3xl">Growing Dreams, One Seed at a Time</h3>
          <p className="text-base sm:text-lg text-gray-700">
            Hi! I'm Danielle, and I believe that anyone can create their own green paradise, no matter how small the
            space. My journey started with a few recycled containers and a handful of seeds, and it blossomed into a
            thriving urban garden.
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            Through Plant a Seed, I want to share the joy and fulfillment that comes from nurturing plants from their
            very beginning. Whether you're growing flowers that brighten your day or vegetables that nourish your
            family, every seed planted is a step toward a greener future.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 sm:pt-4">
            <Badge className="bg-green-500">Urban Gardening</Badge>
            <Badge className="bg-pink-500">Flower Enthusiast</Badge>
            <Badge className="bg-yellow-600">Sustainable Living</Badge>
            <Badge className="bg-blue-500">Community Builder</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative h-64">
            <ImageWithFallback
              src={orchidsPhoto}
              alt="Beautiful orchids from the garden"
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>Orchid Collection</CardTitle>
            <CardDescription>
              These delicate beauties are a testament to patience and care. Orchids may seem challenging, but with the
              right approach, they reward you with stunning blooms.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-64">
            <ImageWithFallback
              src={hibiscusPhoto}
              alt="Vibrant hibiscus flower"
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>Tropical Treasures</CardTitle>
            <CardDescription>
              Hibiscus flowers bring a touch of the tropics to any garden. Their vibrant colors and unique petals make
              every bloom a celebration.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-center">Get in Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                Visit Us
              </CardTitle>
              <CardDescription className="text-base mb-4">Cascavelle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.9841392847595!2d57.40736!3d-20.24932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c5b5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sAvenue%20Camelia%2C%20Cascavelle%2C%20Mauritius!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Plant A Seed Location"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-500" />
                Email
              </CardTitle>
              <CardDescription className="text-base">
                <a href="mailto:daniellediemahave@gmail.com" className="hover:text-green-600 transition-colors">
                  daniellediemahave@gmail.com
                </a>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp
              </CardTitle>
              <CardDescription className="text-base">
                <a
                  href="https://wa.me/23059878033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors"
                >
                  +230 5987 8033
                </a>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="w-5 h-5 text-green-500" />
                Facebook
              </CardTitle>
              <CardDescription className="text-base">
                <a
                  href="https://www.facebook.com/BAuthenticc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors"
                >
                  @Plant A Seed
                </a>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

