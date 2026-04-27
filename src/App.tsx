import React, { useState } from 'react';
import { Tabs, TabsContent } from './components/ui/tabs';
import { Sprout } from 'lucide-react';
import Navigation from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EbookSection } from './components/sections/EbookSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { ShopSection } from './components/sections/ShopSection';
import { MusicSection } from './components/sections/MusicSection';
import { GuideSection } from './components/sections/GuideSection';
import { GallerySection } from './components/sections/GallerySection';
import { DigitalProductsSection } from './components/sections/DigitalProductsSection';
import { ContactSection } from './components/sections/ContactSection';
import { PageHeader } from './components/PageHeader';
import { Analytics } from '@vercel/analytics/react';
import { settings } from './lib/content';

const STATIC_TABS = [
  { value: 'about', label: 'About' },
  { value: 'ebook', label: 'eBook' },
  { value: 'digital', label: 'Digital Shop' },
  { value: 'products', label: 'Products' },
  { value: 'shop', label: 'Plants' },
  { value: 'music', label: 'Music' },
  { value: 'guide', label: 'Guide' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'contact', label: 'Contact' },
] as const;

type TabValue = (typeof STATIC_TABS)[number]['value'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabValue>('about');

  const navigate = (tab: string) => {
    if (STATIC_TABS.some((t) => t.value === tab)) {
      setActiveTab(tab as TabValue);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation activeTab={activeTab} onTabChange={(v) => navigate(v)} />

      {/* Hero — About tab only */}
      {activeTab === 'about' && <HeroSection onNavigate={navigate} />}

      {/* Full-width page banner — all tabs except About.
          Lives OUTSIDE the max-w-7xl container so it bleeds edge to edge. */}
      {activeTab !== 'about' && <PageHeader tab={activeTab} />}

      <div
        id="main-content"
        className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16"
        style={
          activeTab !== 'about'
            ? { paddingTop: '2rem', scrollMarginTop: '80px', position: 'relative', zIndex: 20 }
            : { position: 'relative', zIndex: 20 }
        }
      >
        <Tabs value={activeTab} onValueChange={(v: string) => navigate(v)} className="w-full">

          {/* About — keeps the full hero, no page header */}
          <TabsContent value="about" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <AboutSection />
          </TabsContent>

          <TabsContent value="ebook" className="space-y-8 sm:space-y-12">
            <EbookSection />
          </TabsContent>

          <TabsContent value="digital" className="space-y-8 sm:space-y-12">
            <DigitalProductsSection />
          </TabsContent>

          <TabsContent value="products" className="space-y-8 sm:space-y-12">
            <ProductsSection />
          </TabsContent>

          <TabsContent value="shop" className="space-y-8 sm:space-y-12">
            <ShopSection />
          </TabsContent>

          <TabsContent value="music" className="space-y-8 sm:space-y-12">
            <MusicSection onNavigate={navigate} />
          </TabsContent>

          <TabsContent value="guide" className="space-y-8 sm:space-y-12">
            <GuideSection />
          </TabsContent>

          <TabsContent value="gallery" className="space-y-8 sm:space-y-12">
            <GallerySection />
          </TabsContent>

          <TabsContent value="contact" className="space-y-8 sm:space-y-12">
            <ContactSection />
          </TabsContent>

        </Tabs>
      </div>

      <footer style={{ backgroundColor: '#052e16', color: 'white', marginTop: '5rem', borderTop: '1px solid rgba(74,222,128,0.12)' }}>

        {/* Main band */}
        <div style={{
          maxWidth: '80rem', margin: '0 auto',
          padding: '1.625rem 1.5rem',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '1rem 2rem',
        }}>

          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
            <img src="/images/logo.jpeg" alt="Plant A Seed"
              style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid rgba(74,222,128,0.35)' }} />
            <div>
              <p style={{ fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700, fontSize: '0.95rem', color: 'white', margin: 0, lineHeight: 1.2 }}>
                Plant A Seed
              </p>
              <p style={{ fontSize: '0.65rem', color: '#4ade80', margin: 0, letterSpacing: '0.05em' }}>Mauritius 🌴</p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '2rem', backgroundColor: 'rgba(74,222,128,0.18)', flexShrink: 0 }} className="hidden sm:block" />

          {/* Nav links inline */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.125rem', flex: 1 }}>
            {settings.navigation.menuItems
              .filter(item => item.visible)
              .sort((a, b) => a.order - b.order)
              .map(({ label, value: tab }, i, arr) => (
              <React.Fragment key={tab}>
                <button
                  onClick={() => navigate(tab)}
                  style={{
                    background: 'none', border: 'none', padding: '0.25rem 0.5rem',
                    cursor: 'pointer', fontSize: '0.8rem', color: '#86efac',
                    transition: 'color 0.15s', lineHeight: 1,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#86efac')}
                >
                  {label}
                </button>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(74,222,128,0.3)', fontSize: '0.7rem', lineHeight: 1, userSelect: 'none' }}>·</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <a href={`mailto:${settings.contact.email}`} aria-label="Email"
              style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6ee7b7', transition: 'background-color 0.15s, color 0.15s', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(74,222,128,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLAnchorElement).style.color = '#6ee7b7'; }}
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
            <a href={`https://wa.me/${settings.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6ee7b7', transition: 'background-color 0.15s, color 0.15s', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(74,222,128,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLAnchorElement).style.color = '#6ee7b7'; }}
            >
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.126 1.534 5.864L0 24l6.343-1.508A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.807 9.807 0 01-5.032-1.384l-.361-.214-3.729.887.932-3.619-.235-.371A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>
            </a>
            <a href={settings.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6ee7b7', transition: 'background-color 0.15s, color 0.15s', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(74,222,128,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLAnchorElement).style.color = '#6ee7b7'; }}
            >
              <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>

        </div>

        {/* Bottom micro-strip */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            maxWidth: '80rem', margin: '0 auto', padding: '0.75rem 1.5rem',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            alignItems: 'center', gap: '0.25rem',
          }}>
            <p style={{ fontSize: '0.7rem', color: '#3d6e52', margin: 0 }}>
              © {settings.general.copyright}
            </p>
            <p style={{ fontSize: '0.7rem', color: '#3d6e52', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sprout style={{ width: '0.7rem', height: '0.7rem', color: '#166534' }} />
              Made with love in Mauritius
            </p>
          </div>
        </div>

      </footer>
      <Analytics />
    </div>
  );
}
