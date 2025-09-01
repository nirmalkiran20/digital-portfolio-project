// FILE: src/lib/searchData.ts
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
let loaded = false;

// Optional: inline a few blog items or switch to a static JSON import later
const inlineBlogs: BaseItem[] = [
  { title: 'GA4 Migration Checklist', path: '/blog/ga4-migration-checklist', type: 'Blog', category: 'Analytics',
    content: 'Event mapping, conversions, audiences, Looker Studio templates' },
  { title: 'Scaling Google Ads with PMax', path: '/blog/scaling-google-ads-pmax', type: 'Blog', category: 'Paid Media',
    content: 'Asset groups, audience signals, budget pacing, ROAS stability' },
];

async function loadIndexOnce() {
  if (loaded) return;

  const staticPages: BaseItem[] = [
    { title: 'About Me', path: '/me', type: 'Page', category: 'About',
      content: 'Digital Marketing Specialist SEO SEM SMM Google Ads GA4 Looker Studio' },
    { title: 'Projects', path: '/projects', type: 'Page', category: 'Work',
      content: 'SEO campaigns Google Ads optimization social media marketing' },
    { title: 'Skills', path: '/skills', type: 'Page', category: 'Expertise',
      content: 'SEO strategy Google Ads GA4 analytics Looker Studio SEM' },
    { title: 'Blog', path: '/blog', type: 'Page', category: 'Articles',
      content: 'Digital marketing insights SEO case studies Google Ads tips' },
    { title: 'Contact', path: '/contact', type: 'Page', category: 'Contact',
      content: 'get in touch email LinkedIn collaboration' },
  ];

  const projects: BaseItem[] = [
    { title: 'E-commerce SEO Campaign', path: '/projects', type: 'Project', category: 'SEO',
      content: 'increased organic traffic 150% technical SEO optimization' },
    { title: 'Google Ads Performance Campaign', path: '/projects', type: 'Project', category: 'Paid Media',
      content: 'reduced CPA 45% improved ROAS landing page testing' },
  ];

  // BEFORE (remove this block):
  // try {
  
  //   const json = await res.json();
  //   const blogs: BaseItem[] = (json.posts ?? []).map(...)
  //   dataset = [...staticPages, ...projects, ...blogs];
  // } catch {
  //   dataset = [...staticPages, ...projects];
  // }

  // AFTER: local dataset only
  const dataset = [...staticPages, ...projects, ...inlineBlogs];

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
