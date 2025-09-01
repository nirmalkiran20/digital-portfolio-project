import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { getAllCategories, getPostsByCategory } from '@/lib/markdown';

type Params = Promise<{ category: string }>;

export async function generateStaticParams() {
  const cats = getAllCategories();
  // Slugify categories for URLs: "Google Ads" -> "google-ads"
  const toSlug = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '-');
  return cats.map((c) => ({ category: toSlug(c) }));
}

function unslugifyCategory(slug: string) {
  // "google-ads" -> "Google Ads"
  const name = slug.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  return name
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const pretty = unslugifyCategory(category);

  // Filter using original category names, case-insensitive match
  const posts = getPostsByCategory(pretty);

  return (
    <div className="relative flex min-h-screen flex-col px-4 pb-16 pt-24">
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          <ArrowLeft size={16} />
          All Articles
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Tag size={28} className="text-blue-600" />
          {pretty}
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Articles categorized under “{pretty}”.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-neutral-500">No articles in this category yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-neutral-500">
                  <Tag size={14} />
                  {post.category || 'Uncategorized'}
                  <span>•</span>
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  <span>•</span>
                  <Clock size={14} />
                  {post.readTime}
                </div>
                <h3 className="text-lg font-semibold mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
