import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorBio: string;
  image: string;
  excerpt: string;
  views: string;
  likes: string;
  featured?: boolean;
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllPosts(): Omit<BlogPost, 'content'>[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(contentDirectory, file), 'utf8');
    const { data } = matter(raw);
    return { slug, ...(data as any) } as Omit<BlogPost, 'content'>;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return { slug, content: contentHtml, ...(data as any) } as BlogPost;
}

// Category helpers
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => set.add((p.category || 'Uncategorized').trim()));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getPostsByCategory(category: string): Omit<BlogPost, 'content'>[] {
  const posts = getAllPosts();
  return posts.filter((p) => (p.category || 'Uncategorized').trim().toLowerCase() === category.trim().toLowerCase());
}


