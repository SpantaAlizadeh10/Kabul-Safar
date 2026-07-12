"use client";

import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { ConsultButton } from "@/components/consult-button";
import { useI18n } from "@/components/i18n-provider";

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
      },
      {
        title: "رزرو پروازهای تایید شده",
        description:
          "پروازهای معتبر و مطمئن با بهترین قیمت‌ها برای مسیرهای ایران و اروپا.",
      },
      {
        title: "پشتیبانی ویزا تا دریافت نهایی",
        description:
          "هر مرحله از تکمیل مدارک تا دریافت ویزا تحت نظارت تیم ما انجام می‌شود.",
      },
      {
        title: "پشتیبانی واتساپ ۲۴/۷",
        description: "پاسخ سریع و همراهی کامل با شما در هر مرحله از سفر.",
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
      },
      {
        title: "Verified flight booking",
        description:
          "Reliable flights with the best prices for routes to Iran and Europe.",
      },
      {
        title: "Visa support until completion",
        description:
          "We oversee every step from document preparation to final visa approval.",
      },
      {
        title: "24/7 WhatsApp support",
        description:
          "Fast responses and full assistance at every stage of your trip.",
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
      },
      {
        title: "باوري الوتنې بکینګ",
        description: "د ایران او اروپا لپاره باوري الوتنې د غوره بیو سره.",
      },
      {
        title: "د ویزې بشپړ ملاتړ",
        description:
          "موږ د اسنادو چمتوالي څخه تر وروستي ویزې پورې هر ګام څارو.",
      },
      {
        title: "۲۴/۷ واتساپ ملاتړ",
        description: "چټک ځوابونه او بشپړ مرسته په هر پړاو کې.",
      },
    ],
  },
};

export default function ServicesPage() {
  const { lang } = useI18n();
  const content = pageText[lang];

  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full bg-[#e9ebed] max-w-7xl">
        <main className="space-y-6 px-4 py-4 md:px-8 md:py-6">
          <Header />

          <section className="overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-slate-200 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div className="space-y-4 text-right">
                <SectionTitle
                  title={content.title}
                  subtitle={content.subtitle}
                  align="right"
                />
                <ConsultButton
                  label={content.action}
                  className="rounded-xl py-3 px-4 text-[10px] md:text-sm"
                />
              </div>
              <div className="rounded-[30px] bg-[#0dadd1]/10 p-6 text-right">
                <p className="text-sm font-semibold text-[#0dadd1]">
                  {content.highlight}
                </p>
                <p className="mt-6 text-sm leading-7 text-slate-600">
                  {content.highlightText}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {content.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-slate-200 bg-[#f8fcff] p-5 shadow-sm"
                >
                  <h2 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
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
