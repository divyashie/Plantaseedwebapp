import React, { useState } from 'react';
import { Download, Star, Check } from 'lucide-react';
import { digitalProducts } from '../../lib/content';

const CATEGORIES = ['All', 'eBook', 'Online Course', 'Printable', 'Bundle'];

const BADGE_COLOR_MAP: Record<string, string> = {
  amber:  '#f59e0b',
  rose:   '#f43f5e',
  teal:   '#14b8a6',
  purple: '#a855f7',
  green:  '#16a34a',
  orange: '#f97316',
};

const CATEGORY_GRADIENTS: Record<string, [string, string]> = {
  'eBook':         ['166534', '14532d'],
  'Online Course': ['be123c', '881337'],
  'Printable':     ['0f766e', '134e4a'],
  'Bundle':        ['6b21a8', '4c1d95'],
};

function makePlaceholder(category: string, title: string) {
  const [c1, c2] = CATEGORY_GRADIENTS[category] ?? ['166534', '14532d'];
  const label = encodeURIComponent(title.slice(0, 24));
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23${c1}' /%3E%3Cstop offset='100%25' stop-color='%23${c2}' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)' /%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='32' fill='%23ffffff'%3E${label}%3C/text%3E%3C/svg%3E`;
}

export function DigitalProductsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = digitalProducts.filter(
    p => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <div>
      <style>{`
        .dp-grid { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
        .dp-card { display: flex; flex-direction: column; background: white; border-radius: 1.5rem; overflow: hidden; border: 1px solid #f3f4f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: box-shadow 0.3s ease; }
        .dp-card:hover { box-shadow: 0 20px 40px -8px rgba(0,0,0,0.15); }
        .dp-img { height: 14rem; position: relative; background: #f3f4f6; margin: 0.5rem; border-radius: 1.25rem; overflow: hidden; }
        .dp-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
        .dp-card:hover .dp-img img { transform: scale(1.05); }
        .dp-body { padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1; }
        .dp-bottom { margin-top: auto; padding-top: 1.25rem; border-top: 1px solid #f3f4f6; display: flex; justify-content: space-between; align-items: flex-end; gap: 1rem; }
        @media (max-width: 640px) { .dp-bottom { flex-direction: column; align-items: stretch; } .dp-bottom a { justify-content: center; } }
      `}</style>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #052e16 0%, #166534 100%)', borderRadius: '2rem', padding: '3rem 2rem', textAlign: 'center', marginBottom: '3rem', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(5,46,22,0.3)' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'ui-serif, Georgia, serif', fontWeight: 'bold', marginBottom: '1rem' }}>Digital Shop Coming Soon</h2>
          <p style={{ fontSize: '1.1rem', color: '#86efac', maxWidth: '32rem', margin: '0 auto', lineHeight: 1.6 }}>
            We're currently cultivating our digital library! All items below are placeholders for upcoming guides, courses, and printables.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1.25rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>
              🚀 Launching Late 2026
            </span>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'white', opacity: 0.05, borderRadius: '50%' }} />
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{ padding: '0.625rem 1.5rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold', border: activeFilter === cat ? 'none' : '1px solid #e5e7eb', backgroundColor: activeFilter === cat ? '#14532d' : 'white', color: activeFilter === cat ? 'white' : '#4b5563', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="dp-grid">
        {filtered.map(product => {
          const imgSrc = product.image || makePlaceholder(product.category, product.title);
          const badgeHex = product.badgeColor ? BADGE_COLOR_MAP[product.badgeColor] : null;
          const whatsappUrl = `https://wa.me/23059878033?text=Hi Danielle! I'm interested in the ${encodeURIComponent(product.title)}. Please notify me when it's available.`;

          return (
            <div key={product.title} className="dp-card">
              <div className="dp-img" style={{ opacity: product.isUpcoming ? 0.7 : 1, filter: product.isUpcoming ? 'grayscale(0.4)' : 'none' }}>
                <img src={imgSrc} alt={product.title} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.08), transparent)', pointerEvents: 'none' }} />
                {(product.badgeText || product.isUpcoming) && (
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: product.isUpcoming ? '#111827' : (badgeHex ?? '#6b7280'), color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', boxShadow: '0 2px 6px rgba(0,0,0,0.25)', letterSpacing: '0.04em', pointerEvents: 'none' }}>
                    {product.isUpcoming ? 'COMING SOON' : product.badgeText}
                  </span>
                )}
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.95)', color: '#166534', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px', backdropFilter: 'blur(4px)', letterSpacing: '0.04em', pointerEvents: 'none' }}>
                  {product.category}
                </span>
              </div>

              <div className="dp-body">
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'ui-serif, Georgia, serif', fontWeight: 'bold', color: '#111827', marginBottom: '0.35rem', lineHeight: 1.25 }}>{product.title}</h3>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', marginBottom: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{product.subtitle}</p>

                {product.rating && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.9rem' }}>
                    <div style={{ display: 'flex', color: '#fbbf24' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>{product.rating}</span>
                  </div>
                )}

                <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem', flexGrow: 1, lineHeight: 1.6 }}>{product.description}</p>

                {product.features && product.features.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {product.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>
                        <Check size={17} color="#16a34a" style={{ flexShrink: 0, marginTop: '1px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="dp-bottom">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111827', lineHeight: 1 }}>{product.price}</span>
                      {product.originalPrice && (
                        <span style={{ fontSize: '0.85rem', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 500 }}>{product.originalPrice}</span>
                      )}
                    </div>
                    {product.downloads && (
                      <span style={{ fontSize: '0.72rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.4rem', fontWeight: 500 }}>
                        <Download size={13} /> {product.downloads} downloads
                      </span>
                    )}
                  </div>

                  <a
                    href={product.isUpcoming ? whatsappUrl : (product.lsUrl || '#')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: product.isUpcoming ? '#e5e7eb' : '#14532d', color: product.isUpcoming ? '#4b5563' : 'white', fontSize: '0.875rem', fontWeight: 700, padding: '0.75rem 1.25rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', transition: 'all 0.2s ease', whiteSpace: 'nowrap', cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = product.isUpcoming ? '#d1d5db' : '#166534'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = product.isUpcoming ? '#e5e7eb' : '#14532d'; }}
                  >
                    {product.isUpcoming ? 'Interested? WhatsApp Me' : <><Download size={17} /> Get It Now</>}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
