import Fuse from 'fuse.js';
import { getAllPosts } from '@/lib/markdown';

export type SearchItem = {
  id: string;
  title: string;
  path: string;
  type: 'Page' | 'Project' | 'Blog';
  category?: string;
  tags?: string[];
  excerpt?: string;
};

function staticPages(): SearchItem[] {
  return [
    { id: 'page:me', title: 'About Me', path: '/me', type: 'Page', tags: ['about','profile'] },
    { id: 'page:projects', title: 'Projects', path: '/projects', type: 'Page', tags: ['work','portfolio'] },
    { id: 'page:skills', title: 'Skills', path: '/skills', type: 'Page', tags: ['expertise'] },
    { id: 'page:blog', title: 'Blog', path: '/blog', type: 'Page', tags: ['articles'] },
    { id: 'page:contact', title: 'Contact', path: '/contact', type: 'Page', tags: ['connect'] },
  ];
}

function projects(): SearchItem[] {
  return [
    { id: 'proj:ecom-seo', title: 'E-commerce SEO Campaign', path: '/projects', type: 'Project', category: 'SEO',
      excerpt: '150% organic traffic growth via technical SEO, keyword strategy, and content' },
    { id: 'proj:ads-perf', title: 'Google Ads Performance Campaign', path: '/projects', type: 'Project', category: 'Paid Media',
      excerpt: '45% lower CPA and higher ROAS through optimization and landing page testing' },
  ];
}

function blogs(): SearchItem[] {
  const posts = getAllPosts(); // assumes returns metadata incl. slug,title,excerpt,category
  return posts.map((p: any) => ({
    id: `blog:${p.slug}`,
    title: p.title,
    path: `/blog/${p.slug}`,
    type: 'Blog',
    category: p.category,
    excerpt: p.excerpt,
    tags: p.tags ?? (p.category ? [p.category] : []),
  }));
}

export function buildItems(): SearchItem[] {
  return [...staticPages(), ...projects(), ...blogs()];
}

export function createFuse(items: SearchItem[]) {
  return new Fuse(items, {
    threshold: 0.34,
    ignoreLocation: true,
    includeScore: true,
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'excerpt', weight: 0.3 },
      { name: 'category', weight: 0.2 },
      { name: 'tags', weight: 0.2 },
      { name: 'type', weight: 0.1 },
    ],
  });
}


