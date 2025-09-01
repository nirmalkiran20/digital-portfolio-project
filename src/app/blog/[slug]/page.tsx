import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Eye } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown';
import { MotionDiv } from '@/components/Motion';
import FluidCursor from '@/components/FluidCursor'; // 👈 cursor background

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);
  if (!article) return null;

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Fluid cursor background */}
      <FluidCursor />

      {/* Back button */}
      <div className="fixed top-3 left-3 z-50">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          <ArrowLeft size={16} /> Blog
        </Link>
      </div>

      {/* Header with motion */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 overflow-hidden"
      >
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4 text-white/80">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Eye size={14} /> {article.views} views</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
          </div>
        </div>
      </MotionDiv>

      {/* Content inside glass card */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-lg p-8">
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
}
