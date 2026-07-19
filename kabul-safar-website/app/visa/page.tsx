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
import { FileCheck, Send, Clock, Shield, CheckCircle } from "lucide-react";

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
        icon: FileCheck,
      },
      {
        title: "ارسال دقیق اسناد",
        description:
          "ایمیل و واتساپ ما برای ارسال دقیق‌ترین مدارک در اختیار شماست.",
        icon: Send,
      },
      {
        title: "پیگیری لحظه‌ای",
        description:
          "وضعیت درخواست ویزا را تا دریافت نهایی برای شما پیگیری می‌کنیم.",
        icon: Clock,
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
        icon: FileCheck,
      },
      {
        title: "Precise document submission",
        description:
          "Email and WhatsApp are ready for sending the correct documents.",
        icon: Send,
      },
      {
        title: "Real-time tracking",
        description: "We follow your visa request status until final approval.",
        icon: Clock,
      },
    ],
  },
  ps: {
    title: "خپل د ویزې اسناد ژر بشپړ کړئ.",
    subtitle: "ګام په ګام لارښود او مسلکي مرسته د یو نرم ویزې پروسې لپاره.",
    action: "د ویزې لارښود",
    highlight: "د ویزې د چ٫ک تصویب ساده پړاوونه",
    points: [
      "د اسنادو لیست، آنلاین سپارنه، او تر تایید پورې دوامداره تعقیب.",
      "د څو ژبني ملاتړ سره بشپړ پروسې همغږي.",
    ],
    steps: [
      {
        title: "د اسنادو چ٫که کتنه",
        description:
          "موږ ستاسو اسناد ګورو ترڅو د ویزې غوښتنه ژر پرمخ ولاړه شي.",
        icon: FileCheck,
      },
      {
        title: "دقیق د اسنادو سپارل",
        description:
          "ایمیل او واتساپ ستاسو د سم اسنادو د استولو لپاره چمتو دي.",
        icon: Send,
      },
      {
        title: "په ریښتیني وخت کې تعقیب",
        description:
          "موږ ستاسو د ویزې غوښتنې حالت تر وروستي تایید پورې تعقیبوو.",
        icon: Clock,
      },
    ],
  },
};

export default function VisaPage() {
  const { lang } = useI18n();
  const content = pageText[lang];

  return (
    <LanguageDirWrapper>
      <div className="mx-auto min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50 max-w-7xl">
        <main className="space-y-12 px-4 py-8 md:px-8 md:py-12">
          <Header />

          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0dadd1] to-[#377bc9] p-6 md:p-10 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="mt-4 max-w-3xl text-2xl font-black text-white md:text-4xl leading-tight">
                {content.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90 md:text-base md:leading-8">
                {content.subtitle}
              </p>
              <div className="mt-6">
                <ConsultButton
                  compact
                  label={content.action}
                  className="h-9 rounded-xl px-4 text-xs font-semibold md:h-10 md:px-6 md:text-sm"
                />
              </div>
            </div>
          </section>

          {/* Steps Section */}
          <section className="rounded-[32px] bg-white p-6 shadow-xl md:p-12">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-900 md:text-3xl">
                {content.highlight}
              </h2>
            </div>
            <div className="grid gap-3 grid-cols-3">
              {content.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="group rounded-[20px] border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-3 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg md:h-10 md:w-10">
                    <step.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="mt-2 text-[10px] font-bold text-slate-900 md:text-sm">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[9px] leading-3 text-slate-600 md:text-xs md:leading-4">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="rounded-[32px] bg-gradient-to-r from-[#284d55] to-[#0dadd1] p-8 shadow-xl md:p-12">
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-white md:text-3xl">
                {lang === "en" ? "Why Choose Us?" : lang === "ps" ? "ولې موږ غوره یو؟" : "چرا ما را انتخاب کنید؟"}
              </h2>
              <div className="mt-6 space-y-4">
                {content.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-white">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <p className="text-base leading-7 text-white/90 md:text-lg">{point}</p>
                  </div>
                ))}
              </div>
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
