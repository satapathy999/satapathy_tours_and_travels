import { useEffect } from 'react';

export interface PageMetaOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_BASE_URL = 'https://www.satapathytravels.com';
const DEFAULT_OG_IMAGE =
  'https://www.satapathytravels.com/assets/aistudio/WhatsApp_Image_2026-11-15_at_6.00.56_PM_1d6810db.jpeg';

/**
 * Custom React hook for dynamic client-side SEO, Open Graph tags, canonical links,
 * and page-specific Schema.org JSON-LD structured data.
 */
export function usePageMeta({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData,
}: PageMetaOptions): void {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create <meta> elements
    const updateMeta = (
      selector: string,
      attrName: 'name' | 'property',
      attrVal: string,
      content: string
    ) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 2. Canonical URL Tag
    const canonicalHref = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${DEFAULT_BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
      : `${DEFAULT_BASE_URL}${window.location.pathname}`;

    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalHref);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalHref);

    // 3. Page-Level JSON-LD Structured Data
    const scriptId = 'page-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonical, ogImage, ogType, structuredData]);
}
