"use client";

import Image from "next/image";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { useI18n } from "@/components/i18n-provider";
import { Plane, Shield, Clock, Heart, Globe, Users, Check, MapPin } from "lucide-react";

const pageText = {
  fa: {
    heading: "کابل سفر، مسیر مهاجرین را ساده می‌کند",
    description:
      "کابل سفر به خوبی نیاز روزافزون مهاجرین به مسافرت امن و پروسهٔ پیچیده دریافت بلیط را درک می‌کند. ما تلاش می‌کنیم سفر شما را از هر نقطهٔ جهان با برنامه‌ای روشن، پشتیبانی سریع و هماهنگی کامل آسان‌تر کنیم.",
    highlightTitle: "چرا کابل سفر؟",
    highlightText:
      "ما می‌دانیم که مهاجرت فقط یک پرواز نیست؛ این یک تصمیم بزرگ زندگی است. هدف ما این است که این مسیر برای شما قابل اعتماد، ساده و قابل پیگیری باشد.",
    stats: [
      { value: "5000+", label: "مسافر راضی" },
      { value: "24/7", label: "پشتیبانی واتساپ" },
      { value: "98%", label: "رضایت مشتری" },
    ],
    features: [
      {
        title: "ساده‌سازی ویزا",
        description:
          "فرآیندهای پیچیده ویزا را برای مهاجرین با پشتیبانی مرحله‌به‌مرحله ساده می‌کنیم.",
        icon: Shield,
      },
      {
        title: "رزرو بلیط سریع",
        description:
          "با دسترسی به بهترین مسیرها، خرید بلیط و هماهنگی سفر شما را سریع می‌کنیم.",
        icon: Clock,
      },
      {
        title: "همراه جهانی",
        description:
          "مهاجرین از سراسر دنیا می‌توانند روی پشتیبانی واتساپ و پاسخ‌گویی ۲۴ ساعته ما حساب کنند.",
        icon: Globe,
      },
      {
        title: "خدمت با عشق",
        description:
          "ما با عشق و تعهد به خدمت شما، بهترین تجربه سفر را فراهم می‌کنیم.",
        icon: Heart,
      },
    ],
    quote:
      "کابل سفر می‌فهمد که هر سفر مهاجرتی نیاز به آرامش، سرعت و شفافیت دارد. ما این مسیر را برای شما قابل‌اعتمادتر می‌کنیم.",
    quoteBy: "تیم کابل سفر",
    impact: [
      "پشتیبانی واتساپ برای مهاجرین در هر ساعت",
      "هماهنگی سریع بلیط و ویزا برای مسیرهای بین‌المللی",
      "پیگیری کامل تا زمان حرکت و رسیدن به مقصد",
    ],
  },
  en: {
    heading: "Kabul Safar simplifies migrant journeys",
    description:
      "Kabul Safar understands the rising need of migrants for secure travel and the complexity of ticketing. We make visa, ticket, and migration travel easier from anywhere in the world.",
    highlightTitle: "Why Kabul Safar?",
    highlightText:
      "Migration is more than a ticket. It is a life decision, and we make that journey smoother with clear guidance and trusted support.",
    stats: [
      { value: "5000+", label: "Happy travelers" },
      { value: "24/7", label: "WhatsApp support" },
      { value: "98%", label: "Customer satisfaction" },
    ],
    features: [
      {
        title: "Visa made simple",
        description:
          "We simplify complex visa steps with clear, step-by-step guidance.",
        icon: Shield,
      },
      {
        title: "Fast ticketing",
        description:
          "We source the best routes and book your flights quickly and reliably.",
        icon: Clock,
      },
      {
        title: "Global support",
        description:
          "Migrants worldwide rely on our WhatsApp support and 24/7 assistance.",
        icon: Globe,
      },
      {
        title: "Service with love",
        description:
          "We serve with love and commitment to provide the best travel experience.",
        icon: Heart,
      },
    ],
    quote:
      "Kabul Safar knows migration is not just a flight. It is a life change, and we make it more reliable and easier for you.",
    quoteBy: "The Kabul Safar team",
    impact: [
      "WhatsApp support for migrants anytime",
      "Fast ticket and visa coordination worldwide",
      "Full assistance until departure and arrival",
    ],
  },
  ps: {
    heading: "کابل سفر د کډوالو سفر اسانوي",
    description:
      "کابل سفر د کډوالو د سفري اړتیاوو او د ټکټ اخیستلو د پیچلتیا کامل درک لري. موږ د ویزې، ټکټ او مهاجرت سفرونه د نړۍ له هر ځایه آسانه کوو.",
    highlightTitle: "ولې کابل سفر؟",
    highlightText:
      "مهاجرې یوازې یوه الوتنه نه ده. دا د ژوند بدلونه انتخاب دی او موږ هغه سفر ستاسو لپاره اسانه کوو.",
    stats: [
      { value: "5000+", label: "خوشحاله مسافر" },
      { value: "24/7", label: "واتساپ ملاتړ" },
      { value: "98%", label: "د مشتری رضایت" },
    ],
    features: [
      {
        title: "ویرزې ساده کول",
        description:
          "موږ د پیچلو ویزې مرحلو لپاره واضح او ګام په ګام لارښود وړاندې کوو.",
        icon: Shield,
      },
      {
        title: "چ٫ک ټکټونه",
        description:
          "موږ غوره لارې پیدا کوو او ستاسو الوتنې په چ٫کۍ او اطمینان سره بBOOK کوو.",
        icon: Clock,
      },
      {
        title: "نړیوال ملاتړ",
        description:
          "د نړۍ له ګوټ ګوټ څخه مهاجرین زموږ په ۲۴/۷ واتساپ ملاتړ تکیه کوي.",
        icon: Globe,
      },
      {
        title: "خدمت سره مینې",
        description:
          "موږ د مینې او تعهد سره خدمت کوو ترڅو غوره سفر تجربه ورکړو.",
        icon: Heart,
      },
    ],
    quote:
      "کابل سفر پوهیږي چې مهاجرت یوازې یو سفر نه دی؛ دا د ژوند بدلون دی. موږ دا لاره ستاسو لپاره باوري او ساده کوو.",
    quoteBy: "د کابل سفر ټیم",
    impact: [
      "د مهاجرو لپاره هر وخت واتساپ ملاتړ",
      "د نړۍ په کچه چ٫که ټکټ او ویزه همغږي",
      "تر تګ او رسیدو پورې بشپړ مرسته",
    ],
  },
};

export default function AboutPage() {
  const { lang } = useI18n();
  const content = pageText[lang];
  const isRtl = lang !== "en";

  return (
    <LanguageDirWrapper>
      <div
        className={`mx-auto min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 ${isRtl ? "rtl" : "ltr"} max-w-7xl`}
      >
        <main className="space-y-16 px-4 py-8 md:px-8 md:py-12">
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
              <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm shadow-lg md:px-6 md:py-3 md:text-sm">
                {lang === "en"
                  ? "About Kabul Safar"
                  : lang === "ps"
                    ? "د کابل سفر په اړه"
                    : "درباره کابل سفر"}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-black text-white md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
                {content.heading}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9 drop-shadow">
                {content.description}
              </p>

              {/* Decorative Dots */}
              <div className={`mt-8 flex gap-2 ${isRtl ? "justify-end" : "justify-start"}`}>
                <div className="h-2 w-2 rounded-full bg-white/60" />
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid gap-6 rounded-[32px] bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl ring-1 ring-slate-200/50 md:grid-cols-3 md:p-12">
            {content.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`group text-center transition-transform hover:scale-105 ${idx !== content.stats.length - 1 ? "md:border-r md:border-slate-100" : ""}`}
              >
                <p className="text-4xl font-black text-[#0dadd1] md:text-5xl lg:text-6xl drop-shadow">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-600 md:text-base group-hover:text-[#0dadd1] transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          {/* Features Section */}
          <section>
            <div className={`mb-8 ${isRtl ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
                {content.highlightTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                {content.highlightText}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {content.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group overflow-hidden rounded-[24px] border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg ring-1 ring-slate-200/50 transition-all hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg transition-transform group-hover:scale-110">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 md:text-xl group-hover:text-[#0dadd1] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Quote Section */}
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-[#0dadd1] to-[#377bc9] p-8 md:p-16 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#0dadd1]/20 blur-3xl" />
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative z-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-4xl text-white backdrop-blur-sm shadow-2xl">
                  "
                </div>
              </div>
              <p className="text-xl font-bold leading-9 text-white drop-shadow md:text-2xl md:leading-10 lg:text-3xl">
                {content.quote}
              </p>
              <p className="mt-6 text-base font-semibold text-white/90 md:text-lg">
                — {content.quoteBy}
              </p>
            </div>
          </section>

          {/* Impact Section */}
          <section className="rounded-[32px] bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl ring-1 ring-slate-200/50 md:p-12">
            <div className={`mb-8 ${isRtl ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
                {lang === "en"
                  ? "Our Impact"
                  : lang === "ps"
                    ? "زموږ اغیز"
                    : "تاثیر ما"}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.impact.map((item, idx) => (
                <div
                  key={idx}
                  className={`group flex items-start gap-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${isRtl ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg transition-transform group-hover:scale-110">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-slate-700 md:text-base group-hover:text-[#0dadd1] transition-colors">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
