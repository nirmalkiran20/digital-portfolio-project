import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { getAllPosts, getAllCategories } from '@/lib/markdown';
import FluidCursor from '@/components/FluidCursor';


export const dynamic = 'force-static';

function toCategorySlug(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featured = posts.find((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
  <div className="relative flex min-h-screen flex-col items-center px-4 pb-16 pt-24">
    {/* Fluid cursor background */}
    <FluidCursor />

    {/* Navigation back to home */}
    <div className="fixed top-3 left-3 z-100">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
      >
        ←🏠
      </Link>
    </div>

    

      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-3">Digital Marketing Insights</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Deep dives into SEO, Google Ads, Analytics, CRO, and growth strategies.
        </p>
      </div>

      {/* Category badges */}
      <div className="w-full max-w-6xl mb-10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${toCategorySlug(cat)}`}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm bg-white/70 dark:bg-neutral-800/50 hover:bg-white transition"
            >
              <Tag size={14} />
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <div className="w-full max-w-6xl mb-16">
          <h2 className="text-2xl font-semibold mb-6">🔥 Featured Post</h2>
          <div className="relative rounded-3xl border bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-800/80 dark:to-neutral-800/40 backdrop-blur-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex items-center gap-2 mb-3 text-sm text-blue-600">
                  <Tag size={14} />
                  <span className="font-medium">
                    {featured.category || 'Uncategorized'}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Clock size={14} /> {featured.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-tight">{featured.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar size={14} />
                    {new Date(featured.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regular.map((post) => (
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
                <h3 className="text-lg font-semibold mb-3 leading-tight">{post.title}</h3>
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
      </div>
    </div>
  );
}
