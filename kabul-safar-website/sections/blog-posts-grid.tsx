"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

export const BlogPostsGrid = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {content.posts.map((post) => (
        <article
          key={post.id}
          className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="space-y-3 p-5">
            <div className="inline-block rounded-full bg-gradient-to-r from-[#0dadd1]/10 to-[#377bc9]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#0dadd1]">
              {post.category}
            </div>
            <div className="text-xs text-slate-500">
              {post.author} on {post.date}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-[#0dadd1] transition-colors">
              {post.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};
