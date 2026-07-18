import React, { useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  settings,
  sections,
  products,
  plantingSteps,
  musicVideos,
  blogPosts,
} from '../lib/content';
import { applySeo } from '../lib/seo';
import { useReveal } from './useReveal';
import './redesign.css';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const { contact, general } = settings;
const waBase = `https://wa.me/${contact.whatsapp}`;

const waLink = (message: string) =>
  `${waBase}?text=${encodeURIComponent(message)}`;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.3.4c-.1.2-.2.3 0 .6.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.8 1.7.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .8-.2 1.4Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

function getNavHref(value: string) {
  switch (value) {
    case 'about':
      return '#story';
    case 'shop':
      return '#plants';
    case 'guide':
      return '#guide';
    case 'music':
      return '#music';
    case 'gallery':
      return '#gallery';
    case 'ebook':
      return '#ebook';
    case 'contact':
      return '#contact';
    case 'digital':
      return '#ebook';
    default:
      return `#${value}`;
  }
}

const NAV_LINKS = settings.navigation.menuItems
  .filter((item) => item.visible)
  .sort((a, b) => (a.order || 0) - (b.order || 0))
  .map((item) => ({
    href: getNavHref(item.value),
    label: item.label,
  }));

function Nav() {
  return (
    <nav className="ps-nav">
      <div className="ps-nav-in">
        <a className="ps-brand" href="#top">
          <img
            src="/images/logo.jpeg"
            alt="Plant A Seed"
            style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'contain', border: '1.5px solid rgba(74,222,128,0.35)' }}
          />
          {general.siteName}
        </a>
        <div className="ps-nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="ps-btn" href={waBase} target="_blank" rel="noopener noreferrer">
          Order on WhatsApp
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Hero + ticker                                                       */
/* ------------------------------------------------------------------ */

const HERO_ARCHES = [
  '/images/flowers/orchids/yellow-dancing-lady-orchid-closeup.jpg',
  '/images/hero/pink-hibiscus-garden.jpg',
  '/images/gallery/succulent-garden-display.jpg',
];

const TICKER_ITEMS = [
  'Fresh from the garden',
  'Hibiscus',
  'Orchids',
  'Jade plants',
  `Pickup at ${contact.pickupLocation}`,
  'Pre-order on WhatsApp',
];

function Hero() {
  return (
    <>
      <header className="ps-hero" id="top">
        <span className="ps-eyebrow">Cascavelle · Mauritius</span>
        <h1 className="ps-hero-h1">
          Plant a <em>Seed</em>
        </h1>
        <p className="ps-hero-p">
          Hand-grown plants, tropical growing know-how and heartfelt songs — from
          Danielle&rsquo;s garden to homes around the world.
        </p>
        <div className="ps-hero-cta">
          <a className="ps-btn" href="#plants">
            Browse the plants
          </a>
          <a className="ps-btn ps-btn--ghost" href="#story">
            Meet Danielle
          </a>
        </div>
        <div className="ps-hero-arches" aria-hidden="true">
          {HERO_ARCHES.map((src) => (
            <div className="ps-hero-arch" key={src}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </header>

      <div className="ps-ticker" aria-hidden="true">
        <div className="ps-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Story                                                               */
/* ------------------------------------------------------------------ */

function Story() {
  const about = sections.about;
  return (
    <section className="ps-section" id="story">
      <div className="ps-wrap ps-story-grid">
        <div className="ps-story-photo ps-rv">
          <img src={about.mainPhoto} alt={about.mainPhotoAlt} loading="lazy" />
        </div>
        <div className="ps-story ps-rv">
          <span className="ps-eyebrow">{about.eyebrow}</span>
          <h2 className="ps-h2">
            A garden named
            <br />
            <em>Plant a Seed</em>
          </h2>
          <p>{about.paragraph1}</p>
          <p>{about.paragraph2}</p>
          <p>{about.paragraph3}</p>
          <div className="ps-pull">&ldquo;{about.pullQuote}&rdquo;</div>
          <div className="ps-pull-by">— {about.pullQuoteAuthor}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Affiliate + blog monetisation                                      */
/* ------------------------------------------------------------------ */

function AffiliateMarketing() {
  const affiliate = sections.affiliate;

  return (
    <section className="ps-section ps-section--tight" id="affiliate">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">International growth</span>
          <h2 className="ps-h2">
            Smart partner picks for <em>gardeners worldwide</em>
          </h2>
          <p className="ps-lede">{affiliate.intro}</p>
        </div>

        <div className="ps-affiliate-grid">
          <div className="ps-affiliate-intro ps-rv">
            <p>
              This section helps Plant a Seed grow into a stronger digital brand with
              affiliate-friendly recommendations, trusted guides and a more global audience.
            </p>
            <a className="ps-btn" href="#blog">{affiliate.ctaText}</a>
          </div>

          <div className="ps-affiliate-cards">
            {affiliate.items.map((item) => (
              <a className="ps-affiliate-card ps-rv" key={item.title} href={item.link} target="_blank" rel="noopener noreferrer">
                {item.badge ? <span className="ps-affiliate-badge">{item.badge}</span> : null}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="ps-affiliate-link">Explore this pick →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const posts = [...blogPosts].sort((a, b) => (a.order || 0) - (b.order || 0));
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    applySeo({
      title: 'Garden blog & growth guides',
      description: 'Learn how to grow tropical favourites, build better routines and grow your garden with confidence.',
      path: '/blog',
    });
  }, []);

  const activePost = activeSlug ? posts.find((post) => post.slug === activeSlug) ?? null : null;

  return (
    <section className="ps-section" id="blog">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">From the journal</span>
          <h2 className="ps-h2">
            Blog stories that support <em>growth and income</em>
          </h2>
          <p className="ps-lede">
            Fresh content helps the site rank better, build trust and create more ways to earn through affiliate relationships and search traffic.
          </p>
        </div>

        {activePost ? (
          <div className="ps-blog-detail ps-rv">
            <div className="ps-blog-detail-copy">
              <span className="ps-blog-meta">{activePost.category} · {activePost.readTime}</span>
              <h3>{activePost.title}</h3>
              <p>{activePost.description}</p>
              <a className="ps-btn" href={activePost.link || '#contact'} target={activePost.link ? '_blank' : '_self'} rel={activePost.link ? 'noopener noreferrer' : undefined}>
                Open the full guide
              </a>
            </div>
            <button className="ps-btn ps-btn--ghost" type="button" onClick={() => setActiveSlug(null)}>
              Back to all posts
            </button>
          </div>
        ) : (
          <div className="ps-blog-grid">
            {posts.map((post) => (
              <article className="ps-blog-card ps-rv" key={post.slug}>
                <img src={post.image} alt={post.title} loading="lazy" />
                <div className="ps-blog-body">
                  <span className="ps-blog-meta">{post.category} · {post.readTime}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <button className="ps-btn ps-btn--ghost" type="button" onClick={() => setActiveSlug(post.slug)}>
                    Read the guide
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Plants (from CMS products)                                          */
/* ------------------------------------------------------------------ */

function Plants() {
  const available = useMemo(() => products.filter((p) => p.available), []);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'price-asc' | 'price-desc'>('default');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredPlants = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = available.filter((p) => {
      if (!term) return true;
      return (
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    });

    switch (sortBy) {
      case 'name':
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [available, search, sortBy]);

  const addToCart = (plant: (typeof available)[number]) => {
    setCart((current) => ({ ...current, [plant.title]: (current[plant.title] || 0) + 1 }));
  };

  const updateQuantity = (title: string, delta: number) => {
    setCart((current) => {
      const next = { ...current };
      const value = (next[title] || 0) + delta;
      if (value <= 0) delete next[title];
      else next[title] = value;
      return next;
    });
  };

  const cartItems = useMemo(() => {
    return available
      .filter((p) => cart[p.title])
      .map((p) => ({ ...p, quantity: cart[p.title] }));
  }, [available, cart]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const checkoutHref = useMemo(() => {
    const lines = cartItems.map((item) => `${item.quantity} × ${item.title}`).join('\n');
    const message = `Hi Danielle! I’d like to order these plants:\n\n${lines}\n\nTotal: ${settings.general.siteName} ${cartTotal}`;
    return `${waBase}?text=${encodeURIComponent(message)}`;
  }, [cartItems, cartTotal]);

  return (
    <section className="ps-section ps-section--tight" id="plants">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">From the garden</span>
          <h2 className="ps-h2">
            Plants ready for a <em>new home</em>
          </h2>
          <p className="ps-lede">
            Every plant is grown by hand in Cascavelle. Tap a plant to pre-order on
            WhatsApp — pay with Juice by MCB or cash, and pick up at{' '}
            {contact.pickupLocation}.
          </p>
        </div>

        <div className="ps-plants-tools ps-rv" role="search">
          <label className="ps-plants-search">
            <span>Find a plant</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try hibiscus, orchid, jade..."
            />
          </label>

          <label className="ps-plants-sort">
            <span>Garden sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'name' | 'price-asc' | 'price-desc')}
            >
              <option value="default">Fresh from the garden</option>
              <option value="name">Name A–Z</option>
              <option value="price-asc">Price low to high</option>
              <option value="price-desc">Price high to low</option>
            </select>
          </label>
        </div>

        <div className="ps-cart-shell">
          <div className="ps-cart-summary ps-rv">
            <div className="ps-basket-header">
              <svg className="ps-basket-icon" viewBox="0 0 24 24" fill="currentColor">
                {/* Basket body */}
                <ellipse cx="12" cy="14" rx="8" ry="5" fill="rgba(113,201,94,0.2)" stroke="currentColor" strokeWidth="1.5" />
                {/* Basket weave pattern */}
                <path d="M4 14C4 17 7.6 19 12 19C16.4 19 20 17 20 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                {/* Basket sides */}
                <path d="M4.5 14L5 8C5 6 7 5 12 5C17 5 19 6 19 8L19.5 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Handle left */}
                <path d="M6 8Q6 2 12 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Handle right */}
                <path d="M18 8Q18 2 12 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Flowers/plants in basket */}
                <circle cx="9" cy="10" r="2" fill="rgba(214,72,123,0.6)" />
                <circle cx="15" cy="10" r="2" fill="rgba(255,193,7,0.6)" />
                <circle cx="12" cy="8" r="2" fill="rgba(76,175,80,0.6)" />
              </svg>
              <div>
                <div className="ps-cart-title">Your garden basket</div>
                {cartItems.length > 0 && <span className="ps-basket-count">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>}
              </div>
            </div>
            
            <div className="ps-cart-copy">
              Collect your favorites, then send to Danielle via WhatsApp.
            </div>
            <div className="ps-cart-total">
              <span>Total</span>
              <strong>{settings.general.siteName} {cartTotal}</strong>
            </div>
            
            {cartItems.length > 0 ? (
              <>
                <div className="ps-basket-contents">
                  <ul className="ps-cart-list">
                    {cartItems.map((item) => (
                      <li key={item.title} className="ps-basket-item">
                        <div className="ps-basket-item-info">
                          <strong>{item.title}</strong>
                          <span>{item.quantity} × {item.currency} {item.price}</span>
                        </div>
                        <div className="ps-cart-actions">
                          <button type="button" className="ps-qty-btn" onClick={() => updateQuantity(item.title, -1)} title="Remove one">−</button>
                          <span className="ps-qty-display">{item.quantity}</span>
                          <button type="button" className="ps-qty-btn" onClick={() => updateQuantity(item.title, 1)} title="Add one">+</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <a className="ps-btn ps-btn--full ps-btn--basket" href={checkoutHref} target="_blank" rel="noopener noreferrer">
                  Checkout on WhatsApp →
                </a>
              </>
            ) : (
              <div className="ps-basket-empty">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '40px', height: '40px', margin: '0 auto 8px', opacity: 0.4}}>
                  {/* Basket body */}
                  <ellipse cx="12" cy="14" rx="8" ry="5" fill="rgba(113,201,94,0.2)" stroke="currentColor" strokeWidth="1.5" />
                  {/* Basket weave pattern */}
                  <path d="M4 14C4 17 7.6 19 12 19C16.4 19 20 17 20 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  {/* Basket sides */}
                  <path d="M4.5 14L5 8C5 6 7 5 12 5C17 5 19 6 19 8L19.5 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  {/* Handle left */}
                  <path d="M6 8Q6 2 12 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Handle right */}
                  <path d="M18 8Q18 2 12 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Flowers/plants in basket */}
                  <circle cx="9" cy="10" r="2" fill="rgba(214,72,123,0.4)" />
                  <circle cx="15" cy="10" r="2" fill="rgba(255,193,7,0.4)" />
                  <circle cx="12" cy="8" r="2" fill="rgba(76,175,80,0.4)" />
                </svg>
                Your basket is waiting. Add plants to get started.
              </div>
            )}
          </div>

          {filteredPlants.length === 0 ? (
            <div className="ps-empty-state ps-rv">
              No plants match that little green search yet. Try another name or reset the filter.
            </div>
          ) : (
            <div className="ps-plant-grid">
              {filteredPlants.map((p) => (
                <article className="ps-plant ps-rv" key={p.title}>
                  <div className="ps-plant-img">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                  <div className="ps-plant-body">
                    <h3 className="ps-plant-h">
                      {p.title}
                      <span className="ps-price">
                        {p.currency} {p.price}
                      </span>
                    </h3>
                    <p>{p.description}</p>
                    <div className="ps-plant-actions">
                      <button type="button" className="ps-wa" onClick={() => addToCart(p)}>
                        <WhatsAppIcon />
                        Add to basket
                      </button>
                      {cart[p.title] ? <span className="ps-cart-pill">{cart[p.title]} selected</span> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How to order (from CMS shop.orderSteps)                             */
/* ------------------------------------------------------------------ */

function HowToOrder() {
  const shop = sections.shop;
  return (
    <section className="ps-section ps-dark">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">Simple as that</span>
          <h2 className="ps-h2">
            How to <em>order</em>
          </h2>
        </div>
        <div className="ps-steps">
          {shop.orderSteps.map((step, i) => (
            <div className="ps-step ps-rv" key={i}>
              <div className="ps-step-n">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>
                {step.description}
                {step.additionalInfo ? ` ${step.additionalInfo}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Ebook                                                               */
/* ------------------------------------------------------------------ */

function Ebook() {
  const ebook = sections.ebook;
  return (
    <section className="ps-section" id="ebook">
      <div className="ps-wrap ps-ebook">
        <div className="ps-ebook-cover ps-rv">
          <img src={ebook.coverImage} alt={`${ebook.ebookTitle} cover`} loading="lazy" />
        </div>
        <div className="ps-rv">
          <span className="ps-eyebrow">The eBook · {ebook.price}</span>
          <h2 className="ps-h2">
            Tiny Seed, <em>Big Dreams</em>
          </h2>
          <p className="ps-lede">{ebook.ebookDescription}</p>
          <div className="ps-feat">
            {ebook.features.map((f, i) => (
              <div key={i}>
                {f.title && <b>{f.title}</b>}
                <span>{f.text}</span>
              </div>
            ))}
          </div>
          <a
            className="ps-btn"
            href={ebook.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ebook.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Guide (from CMS planting steps)                                     */
/* ------------------------------------------------------------------ */

function Guide() {
  return (
    <section className="ps-section ps-section--tight" id="guide">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">Free guide</span>
          <h2 className="ps-h2">
            From seed to sprout in <em>six steps</em>
          </h2>
        </div>
        <div className="ps-guide-list ps-rv">
          {plantingSteps.map((s) => (
            <div className="ps-g-row" key={s.step}>
              <div className="ps-g-n">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Music (from CMS music videos)                                       */
/* ------------------------------------------------------------------ */

const TRACK_LABELS = ['Track One', 'Track Two', 'Track Three', 'Track Four', 'Track Five'];

function Music() {
  const videos = [...musicVideos].sort((a, b) => a.order - b.order);
  const music = sections.music;
  return (
    <section className="ps-section ps-dark" id="music">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">{music.sectionTitle}</span>
          <h2 className="ps-h2">
            Songs from the <em>same soil</em>
          </h2>
          <p className="ps-lede">{music.sectionSubtitle}</p>
        </div>
        <div className="ps-songs">
          {videos.map((v, i) => {
            const href = v.videoId
              ? `https://www.youtube.com/watch?v=${v.videoId}`
              : v.embedUrl;
            return (
              <a
                className="ps-song ps-rv"
                key={v.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ps-song-n">{TRACK_LABELS[i] ?? `Track ${i + 1}`}</span>
                <h3>{v.title}</h3>
                {v.description && <p>{v.description}</p>}
                <span className="ps-song-play">▶ Listen on YouTube</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery (from CMS gallery items)                                    */
/* ------------------------------------------------------------------ */

function Gallery() {
  const items = [
    { title: 'Pink hibiscus garden', image: '/images/gallery/pink-hibiscus-garden.jpg' },
    { title: 'Red amaryllis flowers', image: '/images/gallery/red-amaryllis-flowers.jpg' },
    { title: 'Flowering vegetable plants', image: '/images/gallery/flowering-vegetable-plants.jpg' },
    { title: 'Yellow dancing lady orchid', image: '/images/gallery/yellow-dancing-lady-orchid-closeup.jpg' },
    { title: 'Mixed flowering plants garden', image: '/images/gallery/mixed-flowering-plants-garden.jpg' },
    { title: 'Vegetable garden beds', image: '/images/gallery/vegetable-garden-beds.jpg' },
    { title: 'Potted plants collection', image: '/images/gallery/potted-plants-collection.jpg' },
    { title: 'Garden pathway plants', image: '/images/gallery/garden-pathway-plants.jpg' },
    { title: 'Fresh green lettuce', image: '/images/gallery/fresh-green-lettuce.jpg' },
    { title: 'Fresh mulberries branch', image: '/images/gallery/fresh-mulberries-branch.jpg' },
  ];

  return (
    <section className="ps-section" id="gallery">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">From the garden</span>
          <h2 className="ps-h2">
            What&rsquo;s blooming in <em>Cascavelle</em>
          </h2>
        </div>
        <div className="ps-gal ps-rv">
          {items.map((g) => (
            <figure key={g.title}>
              <img src={g.image} alt={g.title} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function NewsletterSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [sending, setSending] = useState(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      const saved = { name: name.trim(), email: email.trim(), message: content.trim() };
      window.localStorage.setItem('plantaseed-contact-form', JSON.stringify(saved));
      setStatusMessage('Your message is ready to send once EmailJS is configured.');
      setName('');
      setEmail('');
      setContent('');
      return;
    }

    setSending(true);
    setStatusMessage('');

    try {
      emailjs.init(publicKey);
      await emailjs.send(serviceId, templateId, {
        from_name: name.trim(),
        reply_to: email.trim(),
        message: content.trim(),
      });

      setStatusMessage('Thanks — your message has been sent.');
      setName('');
      setEmail('');
      setContent('');
    } catch {
      setStatusMessage('There was a problem sending your message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="ps-contact-form" onSubmit={handleSubmit} noValidate>
      <div className="ps-contact-form-grid">
        <label htmlFor="contact-name">
          <span>Name</span>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="contact-email">
          <span>Email</span>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label htmlFor="contact-message" className="ps-contact-message-label">
          <span>Message</span>
          <textarea
            id="contact-message"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Tell us what you need help with"
            rows={5}
          />
        </label>
        <div className="ps-contact-submit-row">
          <button type="submit" className="ps-btn" disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </div>
      {statusMessage ? <p className="ps-newsletter-message">{statusMessage}</p> : null}
    </form>
  );
}

function ContactSection() {
  return (
    <section className="ps-section ps-section--tight ps-contact-section" id="contact">
      <div className="ps-wrap">
        <div className="ps-rv">
          <span className="ps-eyebrow">Contact</span>
          <h2 className="ps-h2">
            Have a question? <em>Send us a note</em>
          </h2>
          <p className="ps-lede">
            Use this form to ask about plant availability, international shipping, or affiliate collaboration.
          </p>
        </div>
        <div className="ps-contact-shell ps-rv">
          <NewsletterSignup />
          <div className="ps-contact-details">
            <div className="ps-card">
              <h3>Need support?</h3>
              <p>Message Danielle directly on WhatsApp or send an email for faster replies.</p>
              <ul>
                <li>
                  <a href={waBase} target="_blank" rel="noopener noreferrer">{contact.whatsappDisplay} on WhatsApp</a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer">{contact.facebookDisplay} on Facebook</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ps-footer">
      <div className="ps-wrap">
        <div className="ps-foot-grid">
          <div>
            <h3>{general.siteName}</h3>
            <p>{general.footerText}</p>
            <p style={{ marginTop: '1.2em' }}>
              <a className="ps-btn" href={waBase} target="_blank" rel="noopener noreferrer">
                WhatsApp Danielle
              </a>
            </p>
          </div>
          <div>
            <div className="ps-foot-label">Get in touch</div>
            <ul>
              <li>
                <a href={waBase} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
                  {contact.facebookDisplay} on Facebook
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="ps-foot-label">Pickup</div>
            <ul>
              <li>{contact.pickupLocation}, Mauritius</li>
              <li>
                <a href={contact.pickupMapUrl} target="_blank" rel="noopener noreferrer">
                  Get directions →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ps-copy">
          <span>© {general.copyright}</span>
          <span>Grown with love in Mauritius ✿</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Redesign() {
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    applySeo({
      title: 'Plant a Seed',
      description: 'Discover tropical plants, garden guidance and heartfelt music from Danielle in Mauritius.',
      path: '/',
    });
  }, []);

  return (
    <div className="ps-root" ref={ref}>
      <Nav />
      <Hero />
      <Story />
      <Plants />
      <HowToOrder />
      <Ebook />
      <Guide />
      <Music />
      <Gallery />
      <ContactSection />
      <Footer />
    </div>
  );
}
