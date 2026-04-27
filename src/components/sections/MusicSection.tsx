import React from 'react';
import { Heart, Sprout, BookOpen, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { sections, musicVideos } from '../../lib/content';

interface MusicSectionProps {
  onNavigate?: (tab: string) => void;
}

function VideoCTABanner({ onNavigate, gumroadUrl }: MusicSectionProps & { gumroadUrl: string }) {
  return (
    <div className="mt-4 p-4 bg-green-50 rounded-lg flex flex-col sm:flex-row items-center gap-4" style={{ border: '1px solid #bbf7d0' }}>
      <div className="flex-1 text-center sm:text-left">
        <p className="text-sm font-medium text-green-600">
          Love Danielle's content? Support her work directly.
        </p>
        <p className="text-xs text-gray-600 mt-0.5">
          Every purchase helps fund new music, garden guides, and free videos.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
        <a
          href={gumroadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Get the eBook
        </a>
        {onNavigate && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-green-500 text-green-600"
            onClick={() => onNavigate('shop')}
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1" />
            Shop Plants
          </Button>
        )}
      </div>
    </div>
  );
}

export function MusicSection({ onNavigate }: MusicSectionProps) {
  const music = sections.music;
  const videos = musicVideos;
  const gumroadUrl = music.gumroadUrl;
  const { gratitudeCard, cta } = music;

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">{music.sectionTitle}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          {music.sectionSubtitle}
        </p>
      </div>

      {videos.map((video, index) => {
        const embedSrc = video.embedUrl
          ? video.embedUrl
          : `https://www.youtube.com/embed/${video.videoId}`;

        return (
          <React.Fragment key={video.title}>
            <div className="mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl mb-4 text-center">{video.title}</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={embedSrc}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {video.description && (
                <Card className="mt-4 sm:mt-6">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-base sm:text-lg text-gray-700">{video.description}</p>
                  </CardContent>
                </Card>
              )}
              <VideoCTABanner onNavigate={onNavigate} gumroadUrl={gumroadUrl} />
            </div>

            {/* Gratitude card appears after the first video */}
            {index === 0 && (
              <Card className="mb-8 sm:mb-12">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    {gratitudeCard.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <p className="text-base sm:text-lg text-gray-700">{gratitudeCard.paragraph1}</p>
                  <p className="text-base sm:text-lg text-gray-700">{gratitudeCard.paragraph2}</p>
                  <div className="pt-3 sm:pt-4 border-t">
                    <p className="italic text-sm sm:text-base text-gray-600">
                      "{gratitudeCard.quote}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </React.Fragment>
        );
      })}

      {/* Call-to-action Section */}
      <section className="rounded-2xl p-8 md:p-12 border border-green-200 bg-green-50">
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <span className="inline-block px-5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest text-green-600" style={{ backgroundColor: '#dcfce7', border: '1px solid #bbf7d0' }}>
              {cta.badgeText}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532d' }}>
              {cta.heading}
            </h2>
            <p className="max-w-xl mx-auto text-base leading-relaxed italic text-green-700" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "{cta.quote}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl text-left shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #bbf7d0' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#dcfce7' }}>
                <Sprout className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-green-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{cta.takeActionTitle}</h4>
              <ul className="space-y-2">
                {cta.takeActionItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-green-700 text-sm leading-relaxed">
                    <span className="text-green-500 mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl text-left shadow-sm" style={{ backgroundColor: '#ffffff', border: '1px solid #bbf7d0' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#fdf2f8' }}>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-green-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{cta.spreadLoveTitle}</h4>
              <ul className="space-y-2">
                {cta.spreadLoveItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-green-700 text-sm leading-relaxed">
                    <span style={{ color: '#f472b6' }} className="mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <a
              href={gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white px-10 h-12 rounded-full font-semibold text-sm shadow-md transition-colors"
              style={{ backgroundColor: '#166534' }}
            >
              {cta.buttonText}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
