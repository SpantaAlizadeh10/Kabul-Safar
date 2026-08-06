"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/components/i18n-provider";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  cover_image: string;
  created_at: string;
}

export const BlogPostsGrid = () => {
  const { lang } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center py-8 text-gray-500">هنوز مقاله‌ای منتشر نشده است</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/blog/${article.slug}`}
          className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute top-3 right-3 z-10">
              <div className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0dadd1] shadow-md">
                {article.category || 'عمومی'}
              </div>
            </div>
            <Image
              src={article.cover_image || '/images/destination.jpg'}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="space-y-3 p-5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#0dadd1]">{article.author || 'ناشناس'}</span>
              <span className="text-slate-300">•</span>
              <span>{new Date(article.created_at).toLocaleDateString('fa-IR')}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-[#0dadd1] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#0dadd1] group-hover:underline">
                {lang === "fa" ? "ادامه مطلب" : lang === "ps" ? "ادامه وګورئ" : "Read more"} →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
