"use client";

import { About } from "@/sections/about";
import { Blog } from "@/sections/blog";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { useI18n } from "@/components/i18n-provider";

const pageText = {
  fa: {
    title: "آخرین راهنمایی‌های سفر و ویزا را بخوانید.",
    subtitle:
      "از اخبار سفر تا نکات کاربردی و تجربه‌های واقعی، بلاگ کابل سفر شما را آماده حرکت می‌کند.",
  },
  en: {
    title: "Read the latest travel and visa tips.",
    subtitle:
      "From travel news to practical advice and real stories, Kabul Safar's blog gets you ready to move.",
  },
  ps: {
    title: "د سفر او ویزې وروستی لارښوونې ولولئ.",
    subtitle:
      "له د سفر خبرونو څخه تر عملي مشورو او ریښتینو کیسو پورې، د کابل سفر بلاګ تاسو چمتو کوي.",
  },
};

export default function BlogPage() {
  const { lang } = useI18n();
  const content = pageText[lang];

  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full bg-[#e9ebed] max-w-7xl">
        <main className="space-y-6 px-4 py-4 md:px-8 md:py-6">
          <Header />

          <section className="overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-slate-200 md:p-8">
            <SectionTitle
              title={content.title}
              subtitle={content.subtitle}
              align="right"
            />
          </section>

          <Blog />

          <About />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
