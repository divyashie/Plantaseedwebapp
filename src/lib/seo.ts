type SeoData = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

function setMeta(name: string, content: string) {
  const existing = document.querySelector(`meta[name="${name}"]`);
  if (existing) {
    existing.setAttribute('content', content);
    return;
  }

  const meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setPropertyMeta(property: string, content: string) {
  const existing = document.querySelector(`meta[property="${property}"]`);
  if (existing) {
    existing.setAttribute('content', content);
    return;
  }

  const meta = document.createElement('meta');
  meta.setAttribute('property', property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

export function applySeo(data: SeoData) {
  const title = `${data.title} | Plant a Seed`;
  const description = data.description;
  const path = data.path ?? '/';
  const image = data.image ?? '/images/logo.jpeg';

  document.title = title;
  setMeta('description', description);
  setMeta('robots', 'index,follow');
  setPropertyMeta('og:title', title);
  setPropertyMeta('og:description', description);
  setPropertyMeta('og:type', 'website');
  setPropertyMeta('og:image', image);
  setPropertyMeta('og:url', `https://plantaseedmauritius.com${path}`);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `https://plantaseedmauritius.com${path}`;
}
