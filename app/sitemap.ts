import type { MetadataRoute } from 'next';

const BASE = 'https://mh-toha.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ['', '#about', '#work', '#skills', '#services', '#experience', '#agency', '#process', '#contact'];
  return sections.map((s, i) => ({
    url: `${BASE}/${s}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: i === 0 ? 1 : 0.7,
  }));
}
