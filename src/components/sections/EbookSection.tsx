import React from 'react';
import { Star, Leaf, Download, Heart, ShoppingBag, Quote } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { sections } from '../../lib/content';

const DECOR_IMAGE = '/images/botanical-decor.png';
const FEATURE_ICONS = [Leaf, Download, Heart, Star];

export function EbookSection() {
  const ebook = sections.ebook;
  const gumroadUrl = ebook.gumroadUrl || ebook.downloadUrl;
  const price = ebook.price || '$3.99';
  const heroImage = ebook.coverImage || '/images/ebook-cover.png';

  return (
    <div className="max-w-6xl mx-auto space-y-24 pb-20 overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Hero Section: Editorial Style */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-12">
        <div className="lg:col-span-7 relative z-10 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-4">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Digital Collector's Edition
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] text-emerald-950 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {ebook.ebookTitle.split(',')[0]}, <br />
              <span className="not-italic text-emerald-900 font-bold">{ebook.ebookTitle.split(',')[1]?.trim() ?? ''}</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-800/80 max-w-xl leading-relaxed font-light italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              "{ebook.ebookDescription}"
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-emerald-900 hover:bg-emerald-950 text-white px-8 h-14 rounded-full shadow-xl shadow-emerald-900/20 group transition-all gumroad-button" asChild>
              <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
                <ShoppingBag className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {ebook.buttonText} — {price}
              </a>
            </Button>
            <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/50 backdrop-blur-sm border border-emerald-100 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                ))}
              </div>
              <span className="text-sm font-bold text-emerald-900">5.0</span>
              <span className="text-xs text-emerald-600/70 border-l border-emerald-200 pl-2">Top Rated Guide</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative lg:h-[700px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
          {/* Decorative background shape */}
          <div className="absolute -top-10 -right-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-lime-100 rounded-full blur-3xl opacity-40" />
          
          <div className="relative z-10 w-full max-w-sm lg:max-w-md group">
            <div className="absolute -inset-4 bg-emerald-900/5 rounded-[2.5rem] rotate-3 transition-transform group-hover:rotate-6 duration-500" />
            <div className="absolute -inset-4 bg-emerald-900/10 rounded-[2.5rem] -rotate-3 transition-transform group-hover:-rotate-1 duration-500" />
            <a href={gumroadUrl} target="_blank" rel="noopener noreferrer" className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-950/40 transform transition-transform group-hover:-translate-y-4 duration-700 block gumroad-button">
              <img
                src={heroImage}
                alt="Plant a Seed, Grow Happiness Ebook Cover" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />
            </a>
          </div>
        </div>
      </section>

      {/* Feature Section: Botanical Index Style */}
      <section className="py-12 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
           <img src={DECOR_IMAGE} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ebook.features.map((feature, idx) => {
            const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
            return (
              <div
                key={feature.title ?? idx}
                className="group p-8 bg-white border border-emerald-50 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-900">
                  <Icon className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950 mb-3 uppercase tracking-wider text-sm">{feature.title ?? feature.text}</h3>
                <p className="text-emerald-800/70 text-sm leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Narrative Section: Elegant Letter */}
      <section className="relative px-4 sm:px-0">
        <div className="max-w-4xl mx-auto bg-[#fdfbf7] p-8 md:p-16 rounded-[3rem] shadow-sm border border-emerald-100/50 relative overflow-hidden animate-in fade-in duration-1000">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Quote className="w-32 h-32 text-emerald-900" />
          </div>
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <p className="text-emerald-900/60 uppercase tracking-[0.2em] text-[0.65rem] font-black">A message from the garden</p>
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Dear Plant a Seed Family,
              </h2>
            </div>

            <div className="prose prose-emerald max-w-none space-y-6">
              <p className="text-lg md:text-xl text-emerald-900/80 leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                From the sun-kissed soils of my garden, I'm reaching out with a heart full of love to share.
                My eBook, <strong className="text-emerald-950 not-italic font-bold">Plant a Seed, Grow Happiness</strong>,
                is more than just a few pages — it's a piece of my soul, woven with memories of my Floreal
                childhood, where my grandma's hands taught me to nurture life in a blooming courtyard.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="space-y-4 border-l-2 border-emerald-100 pl-6">
                   <h4 className="font-bold text-emerald-950 tracking-wide uppercase text-xs">A Greener Tomorrow</h4>
                   <p className="text-sm text-emerald-800/70 leading-relaxed">Helping you build sustainable gardens and eco-conscious communities right at home.</p>
                </div>
                <div className="space-y-4 border-l-2 border-emerald-100 pl-6">
                   <h4 className="font-bold text-emerald-950 tracking-wide uppercase text-xs">Nature's Magic</h4>
                   <p className="text-sm text-emerald-800/70 leading-relaxed">Discovering the wonder in every seed and sprout, from potting to first bloom.</p>
                </div>
              </div>

              <p className="text-lg text-emerald-900/80 leading-relaxed">
                Today, I'm asking for your support to keep Plant a Seed thriving by grabbing your copy. 
                Every seed we sow together makes our island a little more beautiful.
              </p>
            </div>

            <div className="pt-8 flex flex-col items-end border-t border-emerald-100/50">
              <p className="text-emerald-900/60 text-sm italic mb-2">With all my love,</p>
              <p className="text-4xl md:text-5xl text-emerald-950" style={{ fontFamily: "'Caveat', cursive" }}>
                Danielle Feliciane-Diemahave
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section: High-End Refinement */}
      <section className="text-center space-y-10 py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-lime-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-950 tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Ready to Transform Your Garden?
          </h2>
          <p className="text-emerald-800/60 max-w-xl mx-auto text-lg italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Join a community of dreamers who find joy in the simple act of planting a seed.
          </p>
        </div>

        <div className="relative z-10">
          <Button size="lg" className="bg-emerald-900 hover:bg-emerald-950 text-white px-12 h-16 rounded-full text-xl shadow-2xl hover:shadow-emerald-900/30 transition-all transform hover:-translate-y-1 gumroad-button" asChild>
            <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="mr-3 h-6 w-6" />
              Secure Checkout — {price}
            </a>
          </Button>
          <div className="mt-6 flex items-center justify-center gap-6 text-emerald-800/40">
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Instant Download</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Secure Payment</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
