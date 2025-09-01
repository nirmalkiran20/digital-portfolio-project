'use client';

import Fuse from 'fuse.js';

type BaseItem = {
  title: string;
  path: string;
  content?: string;
  category?: string;
  type: 'Page' | 'Project' | 'Blog';
};

let fuse: Fuse<BaseItem> | null = null;
let dataset: BaseItem[] = [];
let loaded = false;

async function loadIndexOnce() {
  if (loaded) return;
  // Static pages and projects (existing data)
  const staticPages: BaseItem[] = [
    { title: 'About Me', path: '/me', type: 'Page', category: 'About',
      content: 'Digital Marketing Specialist 9.7 years experience SEO SEM SMM Google Ads GA4 Looker Studio data-driven strategies ROI performance marketing' },
    { title: 'Projects', path: '/projects', type: 'Page', category: 'Work',
      content: 'SEO campaigns Google Ads optimization social media marketing analytics implementation conversion rate optimization' },
    { title: 'Skills', path: '/skills', type: 'Page', category: 'Expertise',
      content: 'SEO strategy Google Ads GA4 analytics Looker Studio SEM campaigns performance marketing conversion optimization technical SEO' },
    { title: 'Blog', path: '/blog', type: 'Page', category: 'Articles',
      content: 'Digital marketing insights SEO case studies Google Ads tips GA4 measurement Looker Studio dashboards growth ideas' },
    { title: 'Contact', path: '/contact', type: 'Page', category: 'Contact',
      content: 'get in touch email LinkedIn collaboration hire digital marketing specialist' },
  ];

  const projects: BaseItem[] = [
    { title: 'E-commerce SEO Campaign', path: '/projects', type: 'Project', category: 'SEO',
      content: 'increased organic traffic 150% technical SEO optimization keyword research content strategy' },
    { title: 'Google Ads Performance Campaign', path: '/projects', type: 'Project', category: 'Paid Media',
      content: 'reduced cost per acquisition 45% improved ROAS Google Ads optimization landing page testing' },
  ];

  // Fetch blog posts index from server (no fs in browser)
  try {
    const res = await fetch('/api/search-index', { next: { revalidate: 0 } });
    const json = await res.json();
    const blogs: BaseItem[] = (json.posts ?? []).map((p: any) => ({
      title: p.title,
      path: `/blog/${p.slug}`,
      type: 'Blog',
      category: p.category,
      content: p.excerpt,
    }));
    dataset = [...staticPages, ...projects, ...blogs];
  } catch {
    dataset = [...staticPages, ...projects];
  }

  fuse = new Fuse(dataset, {
    threshold: 0.34,
    ignoreLocation: true,
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'content', weight: 0.3 },
      { name: 'category', weight: 0.2 },
      { name: 'type', weight: 0.1 },
    ],
  });
  loaded = true;
}

export async function searchContent(query: string, limit = 10) {
  if (!query.trim()) return [];
  await loadIndexOnce();
  const results = fuse!.search(query);
  return results.slice(0, limit).map((r) => ({
    title: r.item.title,
    path: r.item.path,
    category: r.item.category,
    snippet: makeSnippet(r.item.content ?? '', query),
  }));
}

function makeSnippet(content: string, q: string) {
  const l = content.toLowerCase();
  const i = l.indexOf(q.toLowerCase());
  if (i === -1) return content.substring(0, 100) + (content.length > 100 ? '...' : '');
  const start = Math.max(0, i - 30);
  const end = Math.min(content.length, i + q.length + 30);
  return (start > 0 ? '...' : '') + content.substring(start, end) + (end < content.length ? '...' : '');
}
