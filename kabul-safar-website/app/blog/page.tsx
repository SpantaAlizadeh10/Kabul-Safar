"use client";

import { About } from "@/sections/about";
import { Blog } from "@/sections/blog";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { useI18n } from "@/components/i18n-provider";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

const pageText = {
  fa: {
    title: "آخرین راهنمایی‌های سفر و ویزا را بخوانید.",
    subtitle:
      "از اخبار سفر تا نکات کاربردی و تجربه‌های واقعی، بلاگ کابل سفر شما را آماده حرکت می‌کند.",
    featured: "مقاله ویژه",
    latest: "آخرین مقالات",
    readMore: "بیشتر بخوانید",
  },
  en: {
    title: "Read the latest travel and visa tips.",
    subtitle:
      "From travel news to practical advice and real stories, Kabul Safar's blog gets you ready to move.",
    featured: "Featured Article",
    latest: "Latest Articles",
    readMore: "Read More",
  },
  ps: {
    title: "د سفر او ویزې وروستی لارښوونې ولولئ.",
    subtitle:
      "له د سفر خبرونو څخه تر عملي مشورو او ریښتینو کیسو پورې، د کابل سفر بلاګ تاسو چمتو کوي.",
    featured: "ویژه مقاله",
    latest: "وروستي مقالات",
    readMore: "زیات ولولئ",
  },
};

export default function BlogPage() {
  const { lang, dir } = useI18n();
  const content = pageText[lang];
  const isRtl = dir === "rtl";

  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full max-w-7xl overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="space-y-12 px-4 py-8 md:px-8 md:py-12">
          <Header />

          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0dadd1] to-[#377bc9] p-8 md:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                <BookOpen className="h-8 w-8" />
              </div>
              <h1 className="mt-6 max-w-3xl text-3xl font-black text-white md:text-5xl lg:text-6xl leading-tight">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9">
                {content.subtitle}
              </p>
            </div>
          </section>

          {/* Featured Article */}
          <section className="rounded-[32px] bg-white p-8 shadow-xl md:p-12">
            <div className={`mb-8 flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                {content.featured}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-blue-100 h-64 md:h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-slate-300" />
                </div>
              </div>
              <div className={`flex flex-col justify-center ${isRtl ? "text-right" : "text-left"}`}>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 min</span>
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 md:text-2xl">
                  راهنمای کامل دریافت ویزای ایران برای مهاجرین
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                  همه چیزهایی که باید درباره دریافت ویزای ایران بدانید، از مدارک مورد نیاز تا نکات مهم برای مصاحبه سفارت.
                </p>
                <button className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0dadd1] transition-colors hover:text-[#377bc9] ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
                  {content.readMore}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section>
            <div className={`mb-8 flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                {content.latest}
              </h2>
            </div>
            <Blog />
          </section>

          <About />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
