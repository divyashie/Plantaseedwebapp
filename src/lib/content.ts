/**
 * Content loader for Decap CMS
 *
 * This module loads content from the CMS JSON and markdown files.
 * The content is imported at build time using Vite's glob import feature.
 */

// Import all content files using Vite's glob import
// Settings
import generalSettings from '../../content/settings/general.json';
import contactSettings from '../../content/settings/contact.json';
import navigationSettings from '../../content/settings/navigation.json';

// Sections
import heroContent from '../../content/sections/hero.json';
import aboutContent from '../../content/sections/about.json';
import shopContent from '../../content/sections/shop.json';
import galleryContent from '../../content/sections/gallery.json';
import guideContent from '../../content/sections/guide.json';
import musicContent from '../../content/sections/music.json';
import ebookContent from '../../content/sections/ebook.json';

// Types
export interface GeneralSettings {
  siteName: string;
  tagline: string;
  logo: string;
  footerText: string;
  copyright: string;
}

export interface ContactSettings {
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  facebook: string;
  facebookDisplay: string;
  pickupLocation: string;
  pickupMapUrl: string;
}

export interface MenuItem {
  label: string;
  value: string;
  order: number;
  visible: boolean;
}

export interface NavigationSettings {
  menuItems: MenuItem[];
}

export interface HeroContent {
  badge: string;
  title: string;
  tagline1: string;
  tagline2: string;
  buttonText: string;
  buttonLink: string;
  heroImage: string;
}

export interface Badge {
  text: string;
  color: 'green' | 'pink' | 'yellow' | 'blue' | 'purple' | 'orange';
}

export interface FeatureCard {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface AboutContent {
  sectionTitle: string;
  sectionSubtitle: string;
  mainPhoto: string;
  mainPhotoAlt: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  badges: Badge[];
  featureCards: FeatureCard[];
  contactTitle: string;
  contactSubtitle: string;
}

export interface OrderStep {
  title: string;
  description: string;
  additionalInfo?: string;
}

export interface ShopContent {
  sectionTitle: string;
  sectionSubtitle: string;
  howToOrderTitle: string;
  orderSteps: OrderStep[];
  questionsTitle: string;
  questionsText: string;
}

export interface FeaturedImage {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export interface GalleryContent {
  sectionTitle: string;
  sectionSubtitle: string;
  featuredImages: FeaturedImage[];
}

export interface GuideContent {
  sectionTitle: string;
  sectionSubtitle: string;
  faqTitle: string;
}

export interface MusicContent {
  sectionTitle: string;
  sectionSubtitle: string;
}

export interface EbookFeature {
  text: string;
}

export interface EbookContent {
  sectionTitle: string;
  sectionSubtitle: string;
  ebookTitle: string;
  ebookDescription: string;
  coverImage: string;
  buttonText: string;
  downloadUrl: string;
  features: EbookFeature[];
}

export interface Product {
  title: string;
  price: number;
  currency: string;
  description: string;
  image: string;
  whatsappMessage: string;
  available: boolean;
  featured: boolean;
  order: number;
  category: string;
}

export interface GalleryItem {
  title: string;
  image: string;
  category: string;
  order: number;
}

export interface PlantingStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
  order: number;
}

// Content exports
export const settings = {
  general: generalSettings as GeneralSettings,
  contact: contactSettings as ContactSettings,
  navigation: navigationSettings as NavigationSettings,
};

export const sections = {
  hero: heroContent as HeroContent,
  about: aboutContent as AboutContent,
  shop: shopContent as ShopContent,
  gallery: galleryContent as GalleryContent,
  guide: guideContent as GuideContent,
  music: musicContent as MusicContent,
  ebook: ebookContent as EbookContent,
};

// Helper function to parse frontmatter from markdown files
function parseFrontmatter<T>(content: string): T {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {} as T;

  const frontmatter = match[1];
  const result: Record<string, unknown> = {};

  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    // Parse numbers
    if (typeof value === 'string' && /^-?\d+$/.test(value)) {
      value = parseInt(value, 10);
    }

    result[key] = value;
  });

  return result as T;
}

// Load products from markdown files
const productModules = import.meta.glob<string>('../../content/products/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const products: Product[] = Object.values(productModules)
  .map(content => parseFrontmatter<Product>(content))
  .filter(p => p.available !== false)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

// Load gallery items from markdown files
const galleryModules = import.meta.glob<string>('../../content/gallery/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const galleryItems: GalleryItem[] = Object.values(galleryModules)
  .map(content => parseFrontmatter<GalleryItem>(content))
  .sort((a, b) => (a.order || 0) - (b.order || 0));

// Load planting steps from markdown files
const stepsModules = import.meta.glob<string>('../../content/guide/steps/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const plantingSteps: PlantingStep[] = Object.values(stepsModules)
  .map(content => parseFrontmatter<PlantingStep>(content))
  .sort((a, b) => a.step - b.step);

// Load FAQs from markdown files
const faqModules = import.meta.glob<string>('../../content/guide/faqs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const faqs: FAQ[] = Object.values(faqModules)
  .map(content => parseFrontmatter<FAQ>(content))
  .sort((a, b) => (a.order || 0) - (b.order || 0));

// Convenience hooks for React components
export function useSettings() {
  return settings;
}

export function useSections() {
  return sections;
}

export function useProducts() {
  return products;
}

export function useGalleryItems() {
  return galleryItems;
}

export function usePlantingSteps() {
  return plantingSteps;
}

export function useFAQs() {
  return faqs;
}
