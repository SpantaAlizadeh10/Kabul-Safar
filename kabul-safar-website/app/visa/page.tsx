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
import { FileCheck, Send, Clock, Shield, Plane, MapPin } from "lucide-react";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

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
          <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 via-[#0dadd1] to-[#377bc9] p-6 md:p-10 shadow-xl">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm shadow-2xl">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="mt-4 max-w-3xl text-2xl font-black text-white md:text-4xl leading-tight drop-shadow-lg">
                {content.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90 md:text-base md:leading-8 drop-shadow">
                {content.subtitle}
              </p>
              <div className="mt-6">
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0dadd1] shadow-lg transition-all hover:scale-105 hover:shadow-xl md:px-8 md:py-4 md:text-base"
                >
                  <span>{content.action}</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 md:h-6 md:w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Decorative Dots */}
              <div className="mt-6 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-white/60" />
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </section>

          {/* Steps Section */}
          <section className="rounded-[32px] bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl ring-1 ring-slate-200/50 md:p-12">
            <div className="mb-6">
              <h2 className="text-xl font-black text-slate-900 md:text-3xl">
                {content.highlight}
              </h2>
            </div>
            <div className="grid gap-3 grid-cols-3">
              {content.steps.map((step, idx) => (
                <div
                  key={step.title}
                  className="group overflow-hidden rounded-[20px] border border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-3 shadow-lg ring-1 ring-slate-200/50 transition-all hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0dadd1] to-[#377bc9] text-white shadow-lg transition-transform group-hover:scale-110 md:h-10 md:w-10">
                    <step.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="mt-2 text-[10px] font-bold text-slate-900 md:text-sm group-hover:text-[#0dadd1] transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[9px] leading-3 text-slate-600 md:text-xs md:leading-4">
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
