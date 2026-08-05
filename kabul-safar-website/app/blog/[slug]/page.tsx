import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_image: string;
  created_at: string;
  published_at: string;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0dadd1] transition"
          >
            <ArrowRight size={20} />
            <span>بازگشت به بلاگ</span>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Cover Image */}
        {article.cover_image && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-600">
          {article.category && (
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span className="font-medium text-[#0dadd1]">
                {article.category}
              </span>
            </div>
          )}
          {article.author && (
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>
              {new Date(
                article.published_at || article.created_at,
              ).toLocaleDateString("fa-IR")}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="prose prose-lg prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                این مقاله را به اشتراک بگذارید
              </h3>
              <p className="text-sm text-slate-600">
                اگر این مقاله مفید بود، آن را با دوستان خود به اشتراک بگذارید
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                فیس‌بوک
              </button>
              <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition">
                توییتر
              </button>
              <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                واتساپ
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            مقالات مرتبط
          </h2>
          <RelatedArticles
            currentArticleId={article.id}
            category={article.category}
          />
        </div>
      </article>
    </div>
  );
}

async function RelatedArticles({
  currentArticleId,
  category,
}: {
  currentArticleId: string;
  category: string | null;
}) {
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .neq("id", currentArticleId)
    .order("created_at", { ascending: false })
    .limit(3);

  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {relatedArticles.map((article: any) => (
        <Link
          key={article.id}
          href={`/blog/${article.slug}`}
          className="group overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {article.cover_image && (
            <div className="relative h-32 overflow-hidden">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-[#0dadd1] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
