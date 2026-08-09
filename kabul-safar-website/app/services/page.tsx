"use client";

import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { ConsultButton } from "@/components/consult-button";
import { useI18n } from "@/components/i18n-provider";
import { Shield, Clock, Globe, Heart, Zap, Users, Plane, MapPin } from "lucide-react";

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
        title: "ویزای ایران",
        description:
          "دریافت ویزای ایران برای شهروندان افغانستانی با پشتیبانی کامل و سریع.",
        icon: Shield,
      },
      {
        title: "ویزای ترکیه",
        description:
          "اخذ ویزای ترکیه با راهنمایی تخصصی و پشتیبانی در تمام مراحل.",
        icon: Shield,
      },
      {
        title: "حج و عمره",
        description:
          "خدمات کامل برای حج و عمره با راهنمایی‌های تخصصی و پشتیبانی کامل.",
        icon: Heart,
      },
      {
        title: "سفر به کربلا",
        description:
          "سفرهای زیارتی به کربلا با خدمات کامل و پشتیبانی حرفه‌ای.",
        icon: MapPin,
      },
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
        title: "Iran Visa",
        description:
          "Iran visa services for Afghan citizens with full support and fast processing.",
        icon: Shield,
      },
      {
        title: "Turkey Visa",
        description:
          "Turkey visa acquisition with expert guidance and full process support.",
        icon: Shield,
      },
      {
        title: "Hajj & Umrah",
        description:
          "Complete services for Hajj and Umrah with specialized guidance and full support.",
        icon: Heart,
      },
      {
        title: "Karbala Travel",
        description:
          "Pilgrimage trips to Karbala with complete services and professional support.",
        icon: MapPin,
      },
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
        title: "د ایران ویزه",
        description:
          "د افغان وګړو لپاره د ایران ویزې خدمتونه د بشپړ ملاتړ او چټک پروسې سره.",
        icon: Shield,
      },
      {
        title: "د ترکیې ویزه",
        description:
          "د ترکیې ویزې ترلاسه کولو د مسلکي لارښوونې او بشپړ بهیر ملاتړ سره.",
        icon: Shield,
      },
      {
        title: "حج او عمره",
        description:
          "د حج او عمرې لپاره بشپړ خدمتونه د مسلکي لارښوونې او بشپړ ملاتڵ سره.",
        icon: Heart,
      },
      {
        title: "د کربلا سفر",
        description:
          "د کربلا زیارت سفرونه د بشپړ خدمتونو او مسلکي ملاتړ سره.",
        icon: MapPin,
      },
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
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-[#0dadd1] to-[#377bc9] p-8 md:p-16 shadow-2xl">
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

            <div className="relative z-10">
              <h1 className="max-w-4xl text-3xl font-black text-white md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9 drop-shadow">
                {content.subtitle}
              </p>
              <div className={`mt-8 ${isRtl ? "flex justify-end" : "flex justify-start"}`}>
                <ConsultButton
                  label={content.action}
                  className="rounded-xl px-6 py-3 text-sm font-semibold md:px-8 md:py-4 md:text-base"
                />
              </div>

              {/* Decorative Dots */}
              <div className={`mt-8 flex gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                <div className="h-2 w-2 rounded-full bg-white/60" />
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
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
                  className="group overflow-hidden rounded-[24px] border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg ring-1 ring-slate-200/50 transition-all hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg transition-transform group-hover:scale-110">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-900 md:text-xl group-hover:text-[#0dadd1] transition-colors">
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
