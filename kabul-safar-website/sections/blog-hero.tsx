"use client";

import { BookOpen, Plane, MapPin } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

export const BlogHero = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0dadd1] to-[#377bc9] py-16 md:py-24">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#0dadd1]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#377bc9]/10 blur-2xl" />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute right-10 top-20 hidden animate-bounce md:block">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
          <Plane className="h-8 w-8" />
        </div>
      </div>
      <div className="absolute left-10 bottom-20 hidden animate-pulse md:block">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
          <MapPin className="h-8 w-8" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm shadow-2xl">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="mt-6 max-w-3xl text-3xl font-black text-white md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
          {content.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9 drop-shadow">
          {content.hero.subtitle}
        </p>

        {/* Decorative Dots */}
        <div className="mt-8 flex gap-2">
          <div className="h-2 w-2 rounded-full bg-white/60" />
          <div className="h-2 w-2 rounded-full bg-white/40" />
          <div className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  );
};
