"use client";

import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { ConsultButton } from "@/components/consult-button";
import { useI18n } from "@/components/i18n-provider";
import { Shield, Clock, Globe, Heart, Zap, Users } from "lucide-react";

const pageText = {
  fa: {
    title: "خدمات سفر شما را از مشاوره تا پرواز کامل می‌کنیم.",
    subtitle:
      "راهکارهای جامع برای ویزا، رزرو بلیط و پشتیبانی سفر با تمرکز بر تجربه‌ی بی‌دردسر.",
    action: "شروع مشاوره",
    highlight: "سفر شما امن و آسان خواهد بود",
    highlightText:
      "ما مسیر سفر شما را مطابق نیازهایتان بهینه‌سازی می‌کنیم و تا پایان همراهتان هستیم.",
    items: [
      {
        title: "مشاوره سفر شخصی‌سازی شده",
        description:
          "برنامه سفر شما با توجه به هدف، بودجه و شرایط شخصی شما طراحی می‌شود.",
        icon: Users,
      },
      {
        title: "رزرو پروازهای تایید شده",
        description:
          "پروازهای معتبر و مطمئن با بهترین قیمت‌ها برای مسیرهای ایران و اروپا.",
        icon: Zap,
      },
      {
        title: "پشتیبانی ویزا تا دریافت نهایی",
        description:
          "هر مرحله از تکمیل مدارک تا دریافت ویزا تحت نظارت تیم ما انجام می‌شود.",
        icon: Shield,
      },
      {
        title: "پشتیبانی واتساپ ۲۴/۷",
        description: "پاسخ سریع و همراهی کامل با شما در هر مرحله از سفر.",
        icon: Globe,
      },
    ],
  },
  en: {
    title: "We complete your travel services from consultation to flight.",
    subtitle:
      "Comprehensive visa, ticket booking, and travel support designed for a seamless journey.",
    action: "Start consultation",
    highlight: "Your travel is safe and easy",
    highlightText:
      "We optimize your travel route and stay with you until the end.",
    items: [
      {
        title: "Personal travel consultation",
        description:
          "Your trip plan is tailored to your purpose, budget, and personal needs.",
        icon: Users,
      },
      {
        title: "Verified flight booking",
        description:
          "Reliable flights with the best prices for routes to Iran and Europe.",
        icon: Zap,
      },
      {
        title: "Visa support until completion",
        description:
          "We oversee every step from document preparation to final visa approval.",
        icon: Shield,
      },
      {
        title: "24/7 WhatsApp support",
        description:
          "Fast responses and full assistance at every stage of your trip.",
        icon: Globe,
      },
    ],
  },
  ps: {
    title: "ستاسو د سفر خدمتونه د مشورې نه تر الوتنې پورې بشپړ کوو.",
    subtitle:
      "د ویزې، ټکټ بکینګ او سفر ملاتړ حلونه د یوې بې ستونزې تجربې لپاره.",
    action: "د مشورې پیل",
    highlight: "ستاسو سفر خوندي او اسانه دی",
    highlightText:
      "موږ ستاسو د سفر لاره ستاسو د اړتیاوو سره سم تنظیموو او تر پایه ستاسو سره یوو.",
    items: [
      {
        title: "شخصي سفر مشوره",
        description:
          "ستاسو د سفر پلان ستاسو هدف، بودیجه او شخصي اړتیاوو ته برابرېږي.",
        icon: Users,
      },
      {
        title: "باوري الوتنې بکینګ",
        description: "د ایران او اروپا لپاره باوري الوتنې د غوره بیو سره.",
        icon: Zap,
      },
      {
        title: "د ویزې بشپړ ملاتړ",
        description:
          "موږ د اسنادو چمتوالي څخه تر وروستي ویزې پورې هر ګام څارو.",
        icon: Shield,
      },
      {
        title: "۲۴/۷ واتساپ ملاتړ",
        description: "چ٫ک ځوابونه او بشپړ مرسته په هر پړاو کې.",
        icon: Globe,
      },
    ],
  },
};

export default function ServicesPage() {
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
              <h1 className="max-w-4xl text-3xl font-black text-white md:text-5xl lg:text-6xl leading-tight">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9">
                {content.subtitle}
              </p>
              <div className={`mt-8 ${isRtl ? "flex justify-end" : "flex justify-start"}`}>
                <ConsultButton
                  label={content.action}
                  className="rounded-xl px-6 py-3 text-sm font-semibold md:px-8 md:py-4 md:text-base"
                />
              </div>
            </div>
          </section>

          {/* Highlight Section */}
          <section className="rounded-[32px] bg-white p-8 shadow-xl md:p-12">
            <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg">
                <Heart className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  {content.highlight}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
                  {content.highlightText}
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section>
            <div className="grid gap-6 md:grid-cols-2">
              {content.items.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900 md:text-xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <About />
          <CtaPromo />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
