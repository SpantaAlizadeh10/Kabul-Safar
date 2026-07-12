"use client";

import { About } from "@/sections/about";
import { CtaPromo } from "@/sections/cta-promo";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { SectionTitle } from "@/components/section-title";
import { ConsultButton } from "@/components/consult-button";
import { useI18n } from "@/components/i18n-provider";
import { VisaRequestForm } from "@/sections/visa-request-form";

const pageText = {
  fa: {
    title: "سریع‌تر مدارک ویزای خود را کامل کنید.",
    subtitle:
      "راهنمای گام‌به‌گام و پشتیبانی حرفه‌ای برای دریافت ویزا بدون دردسر.",
    action: "راهنمای ویزا",
    highlight: "قدم‌های ساده برای دریافت سریع ویزا",
    points: [
      "چک‌لیست مدارک، ارسال آنلاین و پیگیری مستمر تا دریافت ویزا.",
      "سازماندهی کامل مسیر درخواست و پشتیبانی چند زبانه.",
    ],
    steps: [
      {
        title: "بررسی مدارک سریع",
        description:
          "ما مدارک شما را بررسی می‌کنیم تا مسیر درخواست ویزا سریع‌تر شود.",
      },
      {
        title: "ارسال دقیق اسناد",
        description:
          "ایمیل و واتساپ ما برای ارسال دقیق‌ترین مدارک در اختیار شماست.",
      },
      {
        title: "پیگیری لحظه‌ای",
        description:
          "وضعیت درخواست ویزا را تا دریافت نهایی برای شما پیگیری می‌کنیم.",
      },
    ],
  },
  en: {
    title: "Complete your visa documents faster.",
    subtitle:
      "Step-by-step guidance and expert support for a smooth visa process.",
    action: "Visa guide",
    highlight: "Easy steps to fast visa approval",
    points: [
      "Document checklist, online submission, and continuous follow-up until approval.",
      "Complete process coordination with multilingual support.",
    ],
    steps: [
      {
        title: "Fast document review",
        description: "We review your papers so the visa request moves faster.",
      },
      {
        title: "Precise document submission",
        description:
          "Email and WhatsApp are ready for sending the correct documents.",
      },
      {
        title: "Real-time tracking",
        description: "We follow your visa request status until final approval.",
      },
    ],
  },
  ps: {
    title: "خپل د ویزې اسناد ژر بشپړ کړئ.",
    subtitle: "ګام په ګام لارښود او مسلکي مرسته د یو نرم ویزې پروسې لپاره.",
    action: "د ویزې لارښود",
    highlight: "د ویزې د چټک تصویب ساده پړاوونه",
    points: [
      "د اسنادو لیست، آنلاین سپارنه، او تر تایید پورې دوامداره تعقیب.",
      "د څو ژبني ملاتړ سره بشپړ پروسې همغږي.",
    ],
    steps: [
      {
        title: "د اسنادو چټکه کتنه",
        description:
          "موږ ستاسو اسناد ګورو ترڅو د ویزې غوښتنه ژر پرمخ ولاړه شي.",
      },
      {
        title: "دقیق د اسنادو سپارل",
        description:
          "ایمیل او واتساپ ستاسو د سم اسنادو د استولو لپاره چمتو دي.",
      },
      {
        title: "په ریښتیني وخت کې تعقیب",
        description:
          "موږ ستاسو د ویزې غوښتنې حالت تر وروستي تایید پورې تعقیبوو.",
      },
    ],
  },
};

export default function VisaPage() {
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
                <div className="mt-6 space-y-4 text-sm text-slate-600">
                  {content.points.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-3 rounded-[26px] bg-[#f8fcff] p-4 md:grid-cols-3 md:p-5">
              {content.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-white p-4 text-right shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0dadd1] text-sm font-bold text-white">
                      {idx + 1}
                    </div>
                    <h2 className="text-sm font-bold text-slate-900">
                      {step.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <VisaRequestForm />
          <About />
          <CtaPromo />
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
