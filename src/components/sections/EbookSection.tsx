import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function EbookSection() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
        <h2 className="text-2xl sm:text-4xl mb-3 sm:mb-4 px-4">Plant a Seed, Grow Happiness</h2>
        <p className="text-lg sm:text-xl text-gray-600 px-4">A Tropical Guide to Love in the Soil</p>
      </div>

      <Card className="overflow-hidden border-2 border-green-500">
        <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="prose prose-sm sm:prose-lg max-w-none">
            <p className="text-base sm:text-lg">Dear Plant a Seed Family,</p>
            <h3 className="text-xl sm:text-2xl">Let's Grow Happiness Together!</h3>
            <p>
              From the sun-kissed soils of my garden, I'm reaching out with a heart full of love to share. My eBook,
              <strong> Plant a Seed, Grow Happiness: A Tropical Guide to Love in the Soil </strong>, is more than just a
              few pages—it's a piece of my soul, woven with memories of my Floreal childhood, where my grandma's hands
              taught me to nurture life in a blooming courtyard.
            </p>
            <p>Today, I'm asking for your support to keep Plant a Seed thriving by grabbing your copy!</p>

            <div className="my-6 sm:my-8 bg-green-50 p-4 sm:p-6 rounded-lg">
              <h4 className="text-lg sm:text-xl mb-3 sm:mb-4">Why support Plant a Seed?</h4>
              <p>Because together, we're planting a magical, eco-friendly future:</p>
              <ul className="space-y-2">
                <li>
                  <strong>🌱 A Greener Tomorrow</strong> - Creating sustainable gardens and eco-conscious communities
                </li>
                <li>
                  <strong>✨ Nature's Magic</strong> - Discovering the wonder in every seed and sprout
                </li>
                <li>
                  <strong>💚 Happiness in Every Seed</strong> - Growing joy and wellness through gardening
                </li>
                <li>
                  <strong>🌍 A Community of Dreamers</strong> - Your purchase fuels Plant a Seed's mission to unite
                  eco-warriors, gardeners, and nature lovers
                </li>
              </ul>
            </div>

            <div className="text-center my-6 sm:my-8">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                <a href="https://diemahave.gumroad.com/l/hbecgv" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Get Your eBook Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <p className="text-center text-lg">
              Will you join me? Grab <strong>Plant a Seed, Grow Happiness</strong> now and let's sow joy together.
            </p>
            <p className="text-center">
              Share this post, tag a friend, or show off your garden in the comments—I can't wait to see our Plant a
              Seed family grow!
            </p>
            <p className="text-right italic mt-8">
              With all my love,
              <br />
              <strong>Danielle Feliciane-Diemahave</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-4">
            <Badge className="bg-green-500 text-base px-4 py-2">#PlantASeed</Badge>
            <Badge className="bg-pink-500 text-base px-4 py-2">#GrowHappiness</Badge>
            <Badge className="bg-purple-500 text-base px-4 py-2">#EcoMagic</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-8 sm:mt-12 p-4 sm:p-8 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg">
        <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">Ready to Transform Your Garden?</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 px-4">
          Join thousands of gardeners who have discovered the joy of growing happiness
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <a href="https://diemahave.gumroad.com/l/hbecgv" target="_blank" rel="noopener noreferrer">
            Purchase the eBook
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
}

