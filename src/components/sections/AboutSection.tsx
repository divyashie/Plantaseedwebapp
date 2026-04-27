import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Leaf, Sun, Users, Sprout, Heart, Star } from 'lucide-react';
import { sections } from '../../lib/content';

const ICON_MAP: Record<string, React.ElementType> = {
  Leaf, Sun, Users, Sprout, Heart, Star,
};

const VALUE_STYLES: { bg: string; border: string; iconBg: string }[] = [
  { bg: '#f0fdf4', border: '#bbf7d0', iconBg: '#166534' },
  { bg: '#fffbeb', border: '#fde68a', iconBg: '#d97706' },
  { bg: '#f5f3ff', border: '#ddd6fe', iconBg: '#7c3aed' },
  { bg: '#fff1f2', border: '#fecdd3', iconBg: '#be123c' },
];

const BADGE_COLOR_MAP: Record<string, { bg: string; color: string; border: string }> = {
  green:  { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
  pink:   { bg: '#fdf2f8', color: '#9d174d', border: '#f9a8d4' },
  yellow: { bg: '#fefce8', color: '#854d0e', border: '#fde68a' },
  blue:   { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
  purple: { bg: '#f5f3ff', color: '#5b21b6', border: '#ddd6fe' },
  orange: { bg: '#fff7ed', color: '#9a3412', border: '#fed7aa' },
};

export function AboutSection() {
  const about = sections.about;
  const values = about.values ?? [];
  const featureCards = about.featureCards ?? [];

  return (
    <div className="max-w-5xl mx-auto" style={{ paddingBottom: '3rem' }}>

      {/* ── Section title ── */}
      <div className="text-center" style={{ marginBottom: '5rem' }}>
        {about.eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-green-600" style={{ marginBottom: '1rem' }}>
            {about.eyebrow}
          </p>
        )}
        <h2 style={{
          fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700,
          fontSize: 'clamp(2.2rem, 5vw, 3.25rem)', color: '#111827',
          marginBottom: '1.25rem', lineHeight: 1.1,
        }}>
          {about.sectionTitle}
        </h2>
        <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.75, padding: '0 1rem' }}>
          {about.sectionSubtitle}
        </p>
      </div>

      {/* ── Story block ── */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>

        {/* Photo with offset frame */}
        <div style={{ position: 'relative', paddingBottom: '14px', paddingRight: '14px' }}>
          <div style={{
            position: 'absolute', bottom: 0, right: 0, left: '14px', top: '14px',
            borderRadius: '1.5rem', backgroundColor: '#bbf7d0',
          }} />
          <div style={{
            position: 'relative', borderRadius: '1.5rem', overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.16)', aspectRatio: '3/4',
          }}>
            <ImageWithFallback
              src={about.mainPhoto}
              alt={about.mainPhotoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {about.yearsGrowing != null && (
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              backgroundColor: '#166534', color: 'white',
              borderRadius: '1rem', padding: '0.875rem 1.375rem',
              boxShadow: '0 8px 28px rgba(22,101,52,0.4)',
              textAlign: 'center', zIndex: 1,
            }}>
              <p style={{ fontSize: '1.875rem', fontWeight: 800, lineHeight: 1, margin: 0 }}>{about.yearsGrowing}</p>
              <p style={{ fontSize: '0.65rem', color: '#86efac', margin: '0.25rem 0 0', letterSpacing: '0.04em' }}>years growing</p>
            </div>
          )}
        </div>

        {/* Text */}
        <div>
          <h3 style={{
            fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#111827',
            lineHeight: 1.25, marginBottom: '1.75rem',
            whiteSpace: 'pre-line',
          }}>
            {about.heading}
          </h3>

          <p style={{ color: '#4b5563', lineHeight: 1.85, fontSize: '1rem', marginBottom: '1.25rem' }}>
            {about.paragraph1}
          </p>

          <p style={{ color: '#4b5563', lineHeight: 1.85, fontSize: '1rem', marginBottom: '1.25rem' }}>
            {about.paragraph2}
          </p>

          {about.paragraph3 && (
            <p style={{ color: '#4b5563', lineHeight: 1.85, fontSize: '1rem', marginBottom: '2rem' }}>
              {about.paragraph3}
            </p>
          )}

          {/* Badges */}
          {about.badges && about.badges.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {about.badges.map((badge) => {
                const style = BADGE_COLOR_MAP[badge.color] ?? BADGE_COLOR_MAP.green;
                return (
                  <span key={badge.text} style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    padding: '0.4rem 0.9rem', borderRadius: '999px',
                    backgroundColor: style.bg, color: style.color,
                    border: `1px solid ${style.border}`,
                  }}>
                    {badge.text}
                  </span>
                );
              })}
            </div>
          )}

          {/* Pull quote */}
          {about.pullQuote && (
            <div style={{ borderLeft: '3px solid #166534', paddingLeft: '1.25rem' }}>
              <p style={{
                fontFamily: 'ui-serif, Georgia, serif', fontStyle: 'italic',
                color: '#374151', fontSize: '1.05rem', lineHeight: 1.75, margin: 0,
              }}>
                "{about.pullQuote}"
              </p>
              {about.pullQuoteAuthor && (
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem', fontWeight: 600 }}>— {about.pullQuoteAuthor}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Values strip ── */}
      {values.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1.25rem', marginBottom: '5rem' }}>
          {values.map((value, idx) => {
            const Icon = ICON_MAP[value.icon ?? ''] ?? Leaf;
            const style = VALUE_STYLES[idx % VALUE_STYLES.length];
            return (
              <div key={value.title} style={{
                backgroundColor: style.bg, border: `1px solid ${style.border}`,
                borderRadius: '1.5rem', padding: '1.75rem',
              }}>
                <div style={{
                  width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem',
                  backgroundColor: style.iconBg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '1.25rem',
                }}>
                  <Icon size={18} color="white" />
                </div>
                <h4 style={{
                  fontFamily: 'ui-serif, Georgia, serif', fontWeight: 700,
                  fontSize: '1.05rem', color: '#111827', marginBottom: '0.625rem',
                }}>
                  {value.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{value.body}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Gallery cards ── */}
      {featureCards.length > 0 && (
        <div>
          {about.galleryLabel && (
            <p style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#16a34a',
              textAlign: 'center', marginBottom: '2rem',
            }}>
              {about.galleryLabel}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem' }}>
            {featureCards.map((card) => (
              <div key={card.title} style={{
                position: 'relative', borderRadius: '1.25rem', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)', aspectRatio: '4/3',
              }}
                className="group"
              >
                <ImageWithFallback
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                  <h3 style={{
                    fontFamily: 'ui-serif, Georgia, serif', fontSize: '1.25rem',
                    fontWeight: 700, color: 'white', marginBottom: '0.4rem',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
