"use client";

import Image from "next/image";
import { MapPin, Share2, Plane } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

export const BlogSidebar = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);

  return (
    <aside className="space-y-8">
      {/* About Section */}
      <div className="group overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg ring-1 ring-slate-200/50 transition-all hover:shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-lg">
            <Image
              src="/images/avatar-1.jpg"
              alt="Kabul Safar"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">Kabul Safar</h3>
          <p className="text-sm font-semibold text-[#0dadd1]">
            {lang === "fa" ? "راهنمای سفر" : lang === "ps" ? "د سفر لارښوونکی" : "Travel Guide"}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {lang === "fa"
              ? "متخصص در ارائه خدمات ویزا و راهنمایی سفر برای افغانستانی‌ها"
              : lang === "ps"
                ? "د افغانانو لپاره د ویزې او د سفر لارښونې متخصص"
                : "Specialized in visa services and travel guidance for Afghans"}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            <span>Paris, France</span>
          </div>
          <div className="mt-4 flex gap-3">
            <a href="#" className="rounded-full bg-slate-100 p-2 text-slate-400 transition-all hover:bg-[#0dadd1] hover:text-white">
              <Share2 className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full bg-slate-100 p-2 text-slate-400 transition-all hover:bg-[#0dadd1] hover:text-white">
              <Share2 className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full bg-slate-100 p-2 text-slate-400 transition-all hover:bg-[#0dadd1] hover:text-white">
              <Share2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50 transition-all hover:shadow-xl">
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Image
            src={content.featuredPost.image}
            alt={content.featuredPost.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="space-y-3 p-5">
          <div className="inline-block rounded-full bg-gradient-to-r from-[#0dadd1]/10 to-[#377bc9]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#0dadd1]">
            {content.featuredPost.category}
          </div>
          <div className="text-xs text-slate-500">
            {content.featuredPost.author} on {content.featuredPost.date}
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-[#0dadd1] transition-colors">
            {content.featuredPost.title}
          </h3>
        </div>
      </div>

      {/* Trending */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg ring-1 ring-slate-200/50">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-md">
            <Plane className="h-4 w-4" />
          </div>
          {lang === "fa" ? "محبوب" : lang === "ps" ? "غوره" : "Trending"}
        </h3>
        <div className="space-y-4">
          {content.trendingItems.map((item, idx) => (
            <div key={item.id} className="group flex gap-3 transition-all hover:translate-x-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-sm font-bold text-white shadow-md">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 group-hover:text-[#0dadd1] transition-colors">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
