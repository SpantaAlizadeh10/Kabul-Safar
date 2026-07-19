"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { useI18n } from "@/components/i18n-provider";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
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
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0dadd1] to-[#377bc9] p-8 md:p-16 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h1 className="mt-6 text-3xl font-black text-white md:text-5xl lg:text-6xl">
                {content.heading}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90 md:text-lg md:leading-9">
                {content.description}
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="grid gap-8 rounded-[32px] bg-white p-8 shadow-xl md:grid-cols-2 md:p-12 lg:p-16">
            {/* Left - Contact Information */}
            <div
              className={`rounded-[24px] bg-gradient-to-br from-[#0dadd1] to-[#377bc9] p-8 text-white ${isRTL ? "text-right" : "text-left"}`}
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
                  className={`flex items-start gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
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
                  className={`flex items-start gap-4 rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
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
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                      <span className="text-2xl">🇫🇷</span>
                      <p className="text-sm font-semibold">{content.locationFrance}</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                      <span className="text-2xl">🇸🇪</span>
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
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
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
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
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
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
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
                  className={`mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-[#0dadd1] focus:bg-white focus:outline-none md:py-4 md:text-base ${isRTL ? "text-right" : "text-left"}`}
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
                  className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 md:px-8 md:py-4 md:text-base ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Send className="h-5 w-5" />
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
