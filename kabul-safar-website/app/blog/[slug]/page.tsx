import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { BlogHeader } from '@/sections/blog-header';
import { BlogFooter } from '@/sections/blog-footer';
import { I18nProvider } from '@/components/i18n-provider';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  cover_image: string;
  created_at: string;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Convert spaces to dashes for slug matching
  const normalizedSlug = slug.replace(/%20/g, '-');

  // Fetch article by slug (try both original and normalized)
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .or(`slug.eq.${slug},slug.eq.${normalizedSlug}`)
    .eq('status', 'published')
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <I18nProvider>
      <div className="min-h-screen bg-slate-50">
        <BlogHeader />

        <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0dadd1] hover:underline mb-4"
            >
              ← بازگشت به بلاگ
            </Link>

            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
              <Image
                src={article.cover_image || '/images/destination.jpg'}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <div className="rounded-full bg-[#0dadd1]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0dadd1]">
                {article.category || 'عمومی'}
              </div>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-700">{article.author || 'ناشناس'}</span>
              <span className="text-slate-300">•</span>
              <span>{new Date(article.created_at).toLocaleDateString('fa-IR')}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              {article.excerpt}
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="text-slate-800 leading-8"
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0dadd1] to-[#377bc9] flex items-center justify-center text-white font-bold">
                  {article.author?.charAt(0) || 'ن'}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{article.author || 'ناشناس'}</p>
                  <p className="text-sm text-slate-500">نویسنده</p>
                </div>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0dadd1] to-[#377bc9] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                مقالات بیشتر
              </Link>
            </div>
          </footer>
        </article>

        <BlogFooter />
      </div>
    </I18nProvider>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Convert spaces to dashes for slug matching
  const normalizedSlug = slug.replace(/%20/g, '-');

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt')
    .or(`slug.eq.${slug},slug.eq.${normalizedSlug}`)
    .eq('status', 'published')
    .single();

  if (!article) {
    return {
      title: 'مقاله یافت نشد',
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}