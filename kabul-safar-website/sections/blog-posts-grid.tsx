"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src={article.cover_image || '/images/destination.jpg'}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="space-y-3 p-5">
            <div className="inline-block rounded-full bg-gradient-to-r from-[#0dadd1]/10 to-[#377bc9]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#0dadd1]">
              {article.category || 'عمومی'}
            </div>
            <div className="text-xs text-slate-500">
              {article.author || 'ناشناس'} • {new Date(article.created_at).toLocaleDateString('fa-IR')}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-[#0dadd1] transition-colors">
              {article.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
