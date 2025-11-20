import React, { useState, type ComponentType } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Sprout } from 'lucide-react';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EbookSection } from './components/sections/EbookSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { ShopSection } from './components/sections/ShopSection';
import { MusicSection } from './components/sections/MusicSection';
import { GuideSection } from './components/sections/GuideSection';
import { GallerySection } from './components/sections/GallerySection';

const tabConfig = [
  { value: 'about', label: 'About', Component: AboutSection },
  { value: 'ebook', label: 'eBook', Component: EbookSection },
  { value: 'products', label: 'Products', Component: ProductsSection },
  { value: 'shop', label: 'Shop', Component: ShopSection },
  { value: 'music', label: 'Music', Component: MusicSection },
  { value: 'guide', label: 'Guide', Component: GuideSection },
  { value: 'gallery', label: 'Gallery', Component: GallerySection },
] satisfies Array<{ value: string; label: string; Component: ComponentType }>;

export default function App() {
  const [activeTab, setActiveTab] = useState(tabConfig[0].value);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 sm:mb-12 -mx-3 sm:mx-0">
            <div className="sm:hidden overflow-x-auto scrollbar-hide px-3">
              <TabsList className="inline-flex w-auto h-auto p-1 bg-muted">
                {tabConfig.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="px-4 py-2 text-sm whitespace-nowrap">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="hidden sm:block">
              <TabsList className="grid w-full max-w-6xl mx-auto grid-cols-4 lg:grid-cols-7">
                {tabConfig.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {tabConfig.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
              <tab.Component />
          </TabsContent>
          ))}
        </Tabs>
      </div>

      <footer className="bg-green-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Sprout className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl mb-2">Plant a Seed</h3>
          <p className="text-green-200 max-w-2xl mx-auto">
            Growing plants from seeds is a rewarding journey. Start small, be patient, and enjoy watching life grow.
          </p>
          <p className="text-green-300 mt-6 text-sm">© 2025 Plant a Seed. Cultivating green thumbs everywhere.</p>
        </div>
      </footer>
    </div>
  );
}

