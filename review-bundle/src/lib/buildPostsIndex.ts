// src/lib/buildPostsIndex.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostIndexItem = {
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
};

export function buildPostsIndex(): PostIndexItem[] {
  const postsDir = path.join(process.cwd(), 'content', 'blog'); // adjust folder
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      category: data.category ?? data.tags?.[0],
      excerpt: data.excerpt ?? data.description ?? '',
    };
  });
}
