"use client";

import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { ConsultButton } from "@/components/consult-button";
import { useI18n } from "@/components/i18n-provider";

const blogData = {
  fa: {
    title: "دنیای سفر کابل سفر",
    subtitle:
      "مقالات تازه و راهنمایی‌های کاربردی برای سفرهای شما به اروپا و آسیا.",
    intro:
      "در اینجا تازه‌ترین تجربه‌ها، نکات و راهکارهای ویزا و سفر را با شما به اشتراک می‌گذاریم تا برنامه‌ریزی‌تان سریع‌تر و مطمئن‌تر باشد.",
    cta: "بیشتر بخوانید",
    posts: [
      {
        title: "چگونه مدارک ویزای ایران را سریع آماده کنیم",
        category: "ویزای ایران",
        date: "۲۸ خرداد ۱۴۰۳",
        excerpt:
          "هنگام ارسال درخواست ویزا، تکمیل دقیق مدارک تفاوت بزرگی ایجاد می‌کند. این راهنمای سریع را بخوانید.",
        image: "/images/destination-iran.jpg",
      },
      {
        title: "راهنمای انتخاب بهترین مسیر پرواز به اروپا",
        category: "بلیط هواپیما",
        date: "۱۵ تیر ۱۴۰۳",
        excerpt:
          "مسیر مناسب، قیمت بهتر و تجربه سفر آرام‌تر را با نکات حرفه‌ای ما بیابید.",
        image: "/images/destination-turkey.jpg",
      },
      {
        title: "چرا مشاوره سفر قبل از خروج ضروری است",
        category: "خدمات سفر",
        date: "۵ مرداد ۱۴۰۳",
        excerpt:
          "مشاوره درست باعث می‌شود هزینه کمتر و مسیر مطمئن‌تری برای سفر خود انتخاب کنید.",
        image: "/images/destination.jpg",
      },
      {
        title: "برترین مقاصد کم‌هزینه برای افغان‌ها در سال جاری",
        category: "سفر اقتصادی",
        date: "۱۸ شهریور ۱۴۰۳",
        excerpt:
          "مقاصدی که هم هزینه مناسب دارند و هم تجربه‌ای جذاب و امن برای شما فراهم می‌کنند.",
        image: "/images/destination-iraq.jpg",
      },
    ],
  },
  ps: {
    title: "د کابل سفر بلاګ",
    subtitle:
      "تازه لارښوونې او سفر ته اړوند معلومات چې ستاسو سفر خوندي او ساده کړي.",
    intro:
      "موږ دلته تجربه، تګلارې او د ویزې اړوند مشوري شریکوو ترڅو ستاسو د سفر پلانونه په ښه توګه ترسره شي.",
    cta: "نور ولولئ",
    posts: [
      {
        title: "د ایران ویزې اسناد په چټکۍ سره څنګه برابر کړو",
        category: "د ایران ویزه",
        date: "۲۸ سلواغه ۱۴۰۲",
        excerpt:
          "د ویزې غوښتنې د بریالیتوب لپاره صحیح اسناد اړین دي. زموږ وړاندیزونه ولولئ.",
        image: "/images/destination-iran.jpg",
      },
      {
        title: "اروپا ته د سفر غوره پرواز لارې",
        category: "د هوايي ټکټ لارښوونه",
        date: "۱۵ کب ۱۴۰۲",
        excerpt:
          "ښه لاره د ارزانه بیې او هوسا سفر لپاره مهمه ده. زموږ تجربه له تاسې سره شریکوو.",
        image: "/images/destination-turkey.jpg",
      },
      {
        title: "ولې د سفر له وړاندې مشوره اخیستل مهم دي",
        category: "د سفر خدمتونه",
        date: "۵ حمل ۱۴۰۳",
        excerpt:
          "صحیح مشوره به ستاسو لګښت راکم او پلان مو اسانه کړي. زموږ تجربه وګورئ.",
        image: "/images/destination.jpg",
      },
      {
        title: "په اوسني کال کې د افغانانو لپاره تر ټولو ارزانه سفرونه",
        category: "اقتصادي سفر",
        date: "۱۸ ثور ۱۴۰۳",
        excerpt:
          "ساده، ارزانه او خوندي سفرونه چې ستاسو لپاره غوره انتخاب کیدی شي.",
        image: "/images/destination-iraq.jpg",
      },
    ],
  },
  en: {
    title: "Kabul Safar Blog",
    subtitle:
      "Fresh travel insights and practical visa tips for your next journey.",
    intro:
      "Discover our latest stories, honest recommendations, and useful advice to prepare your trip with confidence.",
    cta: "Read more",
    posts: [
      {
        title: "How to Prepare Iran Visa Documents Fast",
        category: "Iran Visa",
        date: "June 18, 2024",
        excerpt:
          "Submitting the right documents can make your visa process much smoother. Read our quick guide.",
        image: "/images/destination-iran.jpg",
      },
      {
        title: "Best Flight Routes to Europe for Afghan Travelers",
        category: "Flight Tickets",
        date: "July 5, 2024",
        excerpt:
          "Choose a better route, save money, and enjoy a more relaxed journey with our tips.",
        image: "/images/destination-turkey.jpg",
      },
      {
        title: "Why Travel Consultation Matters Before Departure",
        category: "Travel Services",
        date: "August 28, 2024",
        excerpt:
          "The right advice helps you avoid mistakes, save time, and plan your trip clearly.",
        image: "/images/destination.jpg",
      },
      {
        title: "Top Budget Destinations for Afghan Travelers",
        category: "Affordable Travel",
        date: "September 9, 2024",
        excerpt:
          "Discover destinations that are friendly on price and rich in travel experience.",
        image: "/images/destination-iraq.jpg",
      },
    ],
  },
};

export const Blog = () => {
  const { lang } = useI18n();
  const content = blogData[lang] ?? blogData.fa;

  // Duplicate posts locally to avoid large empty gaps on wide screens
  const allPosts = [...content.posts, ...content.posts];

  return (
    <section aria-labelledby="blog-title" className="space-y-6">
      <div className="overflow-hidden rounded-[28px] bg-[#0dadd1] px-5 py-6 text-white shadow-[0_25px_60px_-40px_rgba(13,173,209,0.8)] md:px-8 md:py-10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-100 md:text-xs">
            <FileText className="h-4 w-4" aria-hidden="true" />
            بلاگ
          </div>
          <h1 id="blog-title" className="text-xl font-black leading-tight md:text-2xl lg:text-4xl">
            {content.title}
          </h1>
          <p className="max-w-2xl text-xs leading-5 text-cyan-100/90 md:text-sm md:leading-6 md:text-base">{content.subtitle}</p>
          <p className="max-w-2xl text-xs leading-5 text-white/90 md:text-sm md:leading-6 md:text-base">{content.intro}</p>
        </div>
      </div>

      {/* Featured area: large left article + stacked right column */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <article className="overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-72 overflow-hidden md:h-96">
              <Image src={content.posts[0].image} alt={content.posts[0].title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:text-xs">
                <span>{content.posts[0].category}</span>
                <time>{content.posts[0].date}</time>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 md:text-xl lg:text-3xl">{content.posts[0].title}</h2>
              <p className="text-sm leading-6 text-slate-700 md:text-base md:leading-7">{content.posts[0].excerpt}</p>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#0dadd1] md:text-sm"><span>{content.cta}</span><ArrowRight className="h-4 w-4" aria-hidden="true" /></div>
            </div>
          </article>

          {/* Secondary row of two medium cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {content.posts.slice(1, 3).map((post) => (
              <article key={post.title} className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-36 overflow-hidden md:h-44">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{post.category}</div>
                  <h3 className="mt-2 text-base font-bold text-slate-900 md:text-lg">{post.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 md:text-sm">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right column: small stacked posts / featured list */}
        <aside className="space-y-4 md:space-y-6">
          {content.posts.slice(3).map((post) => (
            <div key={post.title} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{post.category}</div>
                <h4 className="mt-1 text-xs font-bold text-slate-900 md:text-sm">{post.title}</h4>
                <time className="text-xs text-slate-600 md:text-sm">{post.date}</time>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Latest posts with right sidebar for popular posts */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-base font-bold text-slate-900 md:text-lg">Latest Posts</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post, idx) => (
              <article key={`${post.title}-${idx}`} className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div className="relative h-36 overflow-hidden rounded-md md:h-40">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{post.category}</div>
                  <h4 className="mt-2 text-base font-bold text-slate-900 md:text-lg">{post.title}</h4>
                  <p className="mt-2 text-xs text-slate-600 md:text-sm">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:sticky md:top-24">
            <h4 className="text-xs font-bold text-slate-900 md:text-sm">Popular Posts</h4>
            <ol className="mt-3 space-y-3 list-none">
              {content.posts.map((post, idx) => (
                <li key={post.title} className="flex items-start gap-3">
                  <div className="text-2xl font-extrabold text-slate-200 md:text-3xl">{String(idx + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900 md:text-sm">{post.title}</div>
                    <div className="text-xs text-slate-600 md:text-sm">{post.date}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
};
