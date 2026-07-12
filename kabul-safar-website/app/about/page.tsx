"use client";

import Image from "next/image";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { useI18n } from "@/components/i18n-provider";

const pageText = {
  fa: {
    heading: "کابل سفر، مسیر مهاجرین را ساده می‌کند",
    description:
      "کابل سفر به خوبی نیاز روزافزون مهاجرین به مسافرت امن و پروسهٔ پیچیده دریافت بلیط را درک می‌کند. ما تلاش می‌کنیم سفر شما را از هر نقطهٔ جهان با برنامه‌ای روشن، پشتیبانی سریع و هماهنگی کامل آسان‌تر کنیم.",
    highlightTitle: "درک عمیق از سفر مهاجرین",
    highlightText:
      "ما می‌دانیم که مهاجرت فقط یک پرواز نیست؛ این یک تصمیم بزرگ زندگی است. هدف ما این است که این مسیر برای شما قابل اعتماد، ساده و قابل پیگیری باشد.",
    cards: [
      {
        title: "ساده‌سازی ویزا",
        description:
          "فرآیندهای پیچیده ویزا را برای مهاجرین با پشتیبانی مرحله‌به‌مرحله ساده می‌کنیم.",
      },
      {
        title: "رزرو بلیط سریع",
        description:
          "با دسترسی به بهترین مسیرها، خرید بلیط و هماهنگی سفر شما را سریع می‌کنیم.",
      },
      {
        title: "همراه جهانی",
        description:
          "مهاجرین از سراسر دنیا می‌توانند روی پشتیبانی واتساپ و پاسخ‌گویی ۲۴ ساعته ما حساب کنند.",
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
    highlightTitle: "A modern migration partner",
    highlightText:
      "Migration is more than a ticket. It is a life decision, and we make that journey smoother with clear guidance and trusted support.",
    cards: [
      {
        title: "Visa made simple",
        description:
          "We simplify complex visa steps with clear, step-by-step guidance.",
      },
      {
        title: "Fast ticketing",
        description:
          "We source the best routes and book your flights quickly and reliably.",
      },
      {
        title: "Global support",
        description:
          "Migrants worldwide rely on our WhatsApp support and 24/7 assistance.",
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
    highlightTitle: "د مهاجرت لپاره نوی ملګری",
    highlightText:
      "مهاجرې یوازې یوه الوتنه نه ده. دا د ژوند بدلونه انتخاب دی او موږ هغه سفر ستاسو لپاره اسانه کوو.",
    cards: [
      {
        title: "ویرزې ساده کول",
        description:
          "موږ د پیچلو ویزې مرحلو لپاره واضح او ګام په ګام لارښود وړاندې کوو.",
      },
      {
        title: "چټک ټکټونه",
        description:
          "موږ غوره لارې پیدا کوو او ستاسو الوتنې په چټکۍ او اطمینان سره بOOK کوو.",
      },
      {
        title: "نړیوال ملاتړ",
        description:
          "د نړۍ له ګوټ ګوټ څخه مهاجرین زموږ په ۲۴/۷ واتساپ ملاتړ تکیه کوي.",
      },
    ],
    quote:
      "کابل سفر پوهیږي چې مهاجرت یوازې یو سفر نه دی؛ دا د ژوند بدلون دی. موږ دا لاره ستاسو لپاره باوري او ساده کوو.",
    quoteBy: "د کابل سفر ټیم",
    impact: [
      "د مهاجرو لپاره هر وخت واتساپ ملاتړ",
      "د نړۍ په کچه چټکه ټکټ او ویزه همغږي",
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
        className={`mx-auto min-h-screen w-full bg-[#eff3f5] ${isRtl ? "rtl" : "ltr"} max-w-7xl`}
      >
        <main className="space-y-10 px-4 py-6 md:px-8 md:py-10">
          <Header />

          <section className="overflow-hidden rounded-[40px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div
                className={`${isRtl ? "text-right" : "text-left"} space-y-6`}
              >
                <span className="inline-flex rounded-full bg-[#d8f4fb] px-4 py-2 text-sm font-semibold text-[#0c9dbf]">
                  {lang === "en"
                    ? "About Kabul Safar"
                    : lang === "ps"
                      ? "د کابل سفر په اړه"
                      : "درباره کابل سفر"}
                </span>
                <h1 className="max-w-3xl text-4xl font-black text-slate-900 md:text-5xl">
                  {content.heading}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  {content.description}
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {content.cards.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[28px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <h2 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-4xl bg-slate-100 h-52 sm:h-72">
                  <Image
                    src="/images/destination.jpg"
                    alt="People planning travel"
                    width={840}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative overflow-hidden rounded-[28px] bg-slate-100 h-36 sm:h-44">
                    <Image
                      src="/images/iraq.jpg"
                      alt="Travelers with luggage"
                      width={420}
                      height={280}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[28px] bg-slate-100 h-36 sm:h-44">
                    <Image
                      src="/images/turkey.jpg"
                      alt="Global travel support"
                      width={420}
                      height={280}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-4xl bg-white p-8 shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
              <SectionTitle
                kicker={
                  lang === "en"
                    ? "Our mission"
                    : lang === "ps"
                      ? "زموږ ماموریت"
                      : "ماموریت ما"
                }
                title={
                  lang === "en"
                    ? "Built for migrant travelers"
                    : lang === "ps"
                      ? "د کډوالو لپاره جوړ شوی"
                      : "برای مهاجران ساخته شده"
                }
                subtitle={
                  lang === "en"
                    ? "A clear, dependable process for ticketing, visas, and migration support."
                    : lang === "ps"
                      ? "د ټکټ، ویزې او مهاجرت ملاتړ لپاره روښانه او باوري پروسه."
                      : "یک روند روشن و قابل اعتماد برای بلیط، ویزا و پشتیبانی مهاجرت."
                }
                align={isRtl ? "right" : "left"}
              />

              <div className="mt-8 space-y-4 text-slate-600">
                {content.impact.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0dadd1]" />
                    <p className="text-sm leading-7 md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
              <div className="rounded-4xl bg-[#0dadd1] p-8 text-white">
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-100 opacity-90">
                  {lang === "en"
                    ? "Our promise"
                    : lang === "ps"
                      ? "زموږ ژمنه"
                      : "قول ما"}
                </p>
                <p className="mt-5 text-xl font-bold leading-9 text-white md:text-2xl">
                  {content.quote}
                </p>
                <p className="mt-6 text-sm opacity-90">— {content.quoteBy}</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="overflow-hidden rounded-3xl bg-slate-100 h-28 sm:h-36">
                  <Image
                    src="/images/bamiyan.jpg"
                    alt="Team working together"
                    width={360}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl bg-slate-100 h-28 sm:h-36">
                  <Image
                    src="/images/hero-illustration.png"
                    alt="Migration support"
                    width={360}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl bg-slate-100 h-28 sm:h-36">
                  <Image
                    src="/images/destination-iraq.jpg"
                    alt="Travel guide and support"
                    width={360}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
