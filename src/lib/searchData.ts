// FILE: src/lib/searchData.ts
'use client';
import Fuse from 'fuse.js';

const ENABLE_SEARCH = process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true';

type BaseItem = {
  title: string;
  path: string;
  content?: string;
  category?: string;
  type: 'Page' | 'Project' | 'Blog';
};

let fuse: Fuse<BaseItem> | null = null;
let loaded = false;

async function loadIndexOnce() {
  if (!ENABLE_SEARCH || loaded) return;
  // minimal local dataset only, no fetch
  const staticPages: BaseItem[] = [
    { title: 'About Me', path: '/me', type: 'Page', category: 'About' },
    { title: 'Projects', path: '/projects', type: 'Page', category: 'Work' },
    { title: 'Skills', path: '/skills', type: 'Page', category: 'Expertise' },
    { title: 'Blog', path: '/blog', type: 'Page', category: 'Articles' },
    { title: 'Contact', path: '/contact', type: 'Page', category: 'Contact' },
  ];
  fuse = new Fuse(staticPages, {
    threshold: 0.34,
    ignoreLocation: true,
    keys: [{ name: 'title', weight: 0.6 }, { name: 'category', weight: 0.2 }, { name: 'type', weight: 0.1 }],
  });
  loaded = true;
}

export async function searchContent(query: string, limit = 10) {
  if (!ENABLE_SEARCH) return [];
  if (!query.trim()) return [];
  await loadIndexOnce();
  const results = fuse!.search(query);
  return results.slice(0, limit).map((r) => ({
    title: r.item.title,
    path: r.item.path,
    category: r.item.category,
    snippet: r.item.content ?? '',
  }));
}
