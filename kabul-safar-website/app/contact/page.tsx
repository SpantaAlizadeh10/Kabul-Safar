"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { useI18n } from "@/components/i18n-provider";
import { Mail, Phone, MapPin, Send, MessageCircle, Plane, MapPin as Pin } from "lucide-react";
import { CONTACT_WHATSAPP_URL, CONTACT_PHONE_DISPLAY } from "@/lib/contact";

const pageText = {
  fa: {
    heading: "تماس با ما",
    description:
      "برای برنامه‌ریزی سفر و دریافت ویزا با دفترهای ما در فرانسه و سوئد تماس بگیرید. ما آماده پاسخگویی سریع و پشتیبانی حرفه‌ای هستیم.",
    contactTitle: "اطلاعات تماس",
    contactSubtitle:
      "دفاتر ما در فرانسه و سوئد آماده راهنمایی شما در مسیر سفر و ویزا هستند.",
    nameLabel: "نام کامل",
    emailLabel: "ایمیل",
    subjectLabel: "موضوع",
    messageLabel: "پیام شما",
    writePlaceholder: "پیام خود را اینجا بنویسید...",
    sendButton: "ارسال پیام",
    phone: CONTACT_PHONE_DISPLAY,
    email: "info@kabulsafar.com",
    locationTitle: "دفاتر ما",
    locationFrance: "پاریس، فرانسه",
    locationSweden: "استکهلم، سوئد",
  },
  en: {
    heading: "Get In Touch",
    description:
      "Contact our France and Sweden offices for travel planning, visa support, and fast WhatsApp assistance.",
    contactTitle: "Contact Information",
    contactSubtitle:
      "Our offices in France and Sweden are ready to help you with travel services and visa guidance.",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    subjectLabel: "Subject",
    messageLabel: "Your Message",
    writePlaceholder: "Write your message here...",
    sendButton: "Send Message",
    phone: CONTACT_PHONE_DISPLAY,
    email: "info@kabulsafar.com",
    locationTitle: "Our Offices",
    locationFrance: "Paris, France",
    locationSweden: "Stockholm, Sweden",
  },
  ps: {
    heading: "د موږ سره اړیکه",
    description:
      "د سفر پلان کولو، ویزې ملاتړ او چټک واتساپ خدمت لپاره زموږ د فرانسې او سویډن دفترونو سره اړیکه ونیسئ.",
    contactTitle: "د اړیکې معلومات",
    contactSubtitle:
      "زموږ دفترونه په فرانسه او سویډن کې ستاسو د سفر او ویزې ملاتړ لپاره چمتو دي.",
    nameLabel: "بشپړ نوم",
    emailLabel: "بریښنالیک",
    subjectLabel: "موضوع",
    messageLabel: "ستاسو پیغام",
    writePlaceholder: "خپل پیغام دلته ولیکئ...",
    sendButton: "پیغام واستوئ",
    phone: CONTACT_PHONE_DISPLAY,
    email: "info@kabulsafar.com",
    locationTitle: "زموږ دفترونه",
    locationFrance: "پاریس، فرانسه",
    locationSweden: "سټاکهولم، سویډن",
  },
};

export default function ContactPage() {
  const { lang, dir } = useI18n();
  const content = pageText[lang];
  const isRTL = dir === "rtl";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange =
    (key: keyof typeof formData) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [key]: event.target.value }));
      };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, subject, message } = formData;
    const encodedMessage = encodeURIComponent(
      `${content.heading}\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    );
    window.open(`${CONTACT_WHATSAPP_URL}?text=${encodedMessage}`, "_blank");
  };

  return (
    <LanguageDirWrapper>
      <div
        className={`mx-auto min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50 md:max-w-7xl ${isRTL ? "rtl" : "ltr"}`}
      >
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
                <Pin className="h-8 w-8" />
              </div>
            </div>

            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm shadow-2xl">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h1 className="mt-6 text-3xl font-black text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                {content.heading}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9 drop-shadow">
                {content.description}
              </p>

              {/* Decorative Dots */}
              <div className="mt-8 flex justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white/60" />
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="grid gap-8 rounded-[32px] bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl ring-1 ring-slate-200/50 md:grid-cols-2 md:p-12 lg:p-16">
            {/* Left - Contact Information */}
            <div
              className={`group overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0dadd1] to-[#377bc9] p-8 text-white shadow-lg transition-all hover:shadow-xl ${isRTL ? "text-right" : "text-left"}`}
            >
              <h2 className="text-2xl font-bold md:text-3xl">
                {content.contactTitle}
              </h2>
              <p className="mt-3 text-sm opacity-90 md:text-base">
                {content.contactSubtitle}
              </p>

              <div className="mt-8 space-y-6">
                {/* Phone */}
                <a
                  href={CONTACT_WHATSAPP_URL}
                  className={`group flex items-start gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20 hover:-translate-x-1 ${isRTL ? "flex-row-reverse hover:translate-x-1" : "flex-row"}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="text-sm opacity-90">{content.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${content.email}`}
                  className={`group flex items-start gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20 hover:-translate-x-1 ${isRTL ? "flex-row-reverse hover:translate-x-1" : "flex-row"}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 transition-transform group-hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-sm opacity-90">{content.email}</p>
                  </div>
                </a>

                {/* Locations */}
                <div className="rounded-2xl bg-white/10 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5" />
                    <p className="text-sm font-semibold uppercase tracking-wider">
                      {content.locationTitle}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="group flex items-center gap-3 rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20 hover:-translate-x-1">
                      <span className="text-2xl transition-transform group-hover:scale-110">🇫🇷</span>
                      <p className="text-sm font-semibold">{content.locationFrance}</p>
                    </div>
                    <div className="group flex items-center gap-3 rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20 hover:-translate-x-1">
                      <span className="text-2xl transition-transform group-hover:scale-110">🇸🇪</span>
                      <p className="text-sm font-semibold">{content.locationSweden}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-semibold text-slate-700 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                >
                  {content.nameLabel}
                </label>
                <input
                  type="text"
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200/50 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold text-slate-700 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                >
                  {content.emailLabel}
                </label>
                <input
                  type="email"
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200/50 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold text-slate-700 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                >
                  {content.subjectLabel}
                </label>
                <input
                  type="text"
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200/50 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                  placeholder="I need help with visa"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-semibold text-slate-700 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                >
                  {content.messageLabel}
                </label>
                <textarea
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200/50 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
                  rows={5}
                  placeholder={content.writePlaceholder}
                  value={formData.message}
                  onChange={handleChange("message")}
                />
              </div>

              <div
                className={`flex ${isRTL ? "justify-end" : "justify-start"}`}
              >
                <button
                  type="submit"
                  className={`group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 md:px-8 md:py-4 md:text-base ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Send className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {content.sendButton}
                </button>
              </div>
            </form>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
