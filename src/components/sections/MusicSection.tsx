import React from 'react';
import { Heart, Sprout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function MusicSection() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Music by Danielle</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Heartfelt songs celebrating nature, life, and our connection to Mother Earth
        </p>
      </div>

      <div className="mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl mb-4 text-center">A Song for Our Planet</h3>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/yXGU9pGNfSg"
            title="A Song for Planet Earth by Danielle"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <Card className="mb-8 sm:mb-12">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            A Message of Gratitude and Healing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          <p className="text-base sm:text-lg">
            This song is a heartfelt tribute to our beautiful planet Earth. It's a thankful way to honor everything our
            Earth has given us—the soil beneath our feet, the air we breathe, the water that sustains us, and the seeds
            that grow into life.
          </p>
          <p className="text-base sm:text-lg">
            It's also a gentle plea for forgiveness for all the harm we've caused. Through music, I hope to sensitize
            people about the importance of caring for our planet and inspire everyone to plant seeds of change.
          </p>
          <div className="pt-3 sm:pt-4 border-t">
            <p className="italic text-sm sm:text-base text-gray-600">
              "Every seed we plant is a promise to the Earth. Let's make that promise with love, gratitude, and hope for
              a greener tomorrow." - Danielle
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl mb-4 text-center">Melt Like an Ice</h3>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/XkB2vPgTvwk"
            title="Melt Like an Ice by Danielle"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Card className="mt-4 sm:mt-6">
          <CardContent className="p-4 sm:p-6">
            <p className="text-base sm:text-lg text-gray-700">
              A tender ballad about vulnerability and transformation. Like ice melting under warmth, this song explores
              how love and compassion can soften even the hardest hearts, revealing the beauty that lies beneath our
              protective layers.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl mb-4 text-center">Distance Love</h3>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_lWdnqQAdv_E3_C-SoGTbUqm4vF6bK84oA"
            title="Distance Love - Danielle's Full Album"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Card className="mt-4 sm:mt-6">
          <CardContent className="p-4 sm:p-6">
            <p className="text-base sm:text-lg text-gray-700">
              A soulful reflection on love that transcends physical boundaries. This heartfelt track explores the
              emotional journey of maintaining connection across miles, celebrating the strength of bonds that remain
              unbroken despite the distance.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-500" />
              Take Action
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Plant a tree or start a garden</p>
            <p>• Reduce, reuse, and recycle</p>
            <p>• Share this message with others</p>
            <p>• Support sustainable practices</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Spread the Love
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Like and share the video</p>
            <p>• Comment your thoughts</p>
            <p>• Tag friends who care about Earth</p>
            <p>• Join our eco-community</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

