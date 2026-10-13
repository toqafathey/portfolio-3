import { siteConfig } from '../data/siteConfig';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Keeps document metadata in sync with siteConfig.seo. index.html carries the same defaults for crawlers. */
export function applySeo(): void {
  const { title, description } = siteConfig.seo;
  document.title = title;
  setMeta('meta[name="description"]', 'name', 'description', description);
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
}

export const isHttpUrl = (value: string): boolean => /^https?:\/\//i.test(value.trim());
