"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Footer } from "@/sections/footer";
import { Header } from "@/sections/header";
import { LanguageDirWrapper } from "@/sections/language-dir-wrapper";
import { useI18n } from "@/components/i18n-provider";
import { Mail, Phone } from "lucide-react";
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
  const { lang } = useI18n();
  const content = pageText[lang];
  const isRTL = lang !== "en";
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
        className={`mx-auto min-h-screen w-full bg-[#e9ebed] md:max-w-7xl ${isRTL ? "rtl" : "ltr"}`}
      >
        <main className="space-y-8 px-4 py-6 md:px-8 md:py-12">
          <Header />

          {/* Header Section */}
          <section className="text-center md:mb-12">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {content.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              {content.description}
            </p>
          </section>

          {/* Contact Section */}
          <section className="grid gap-8 rounded-3xl bg-white p-6 md:grid-cols-2 md:gap-12 md:p-8 lg:p-12">
            {/* Left - Contact Information */}
            <div className="rounded-3xl bg-[#1ab5ce] p-6 text-white md:p-8">
              <h2 className="text-2xl font-bold md:text-3xl">
                {content.contactTitle}
              </h2>
              <p className="mt-2 text-sm opacity-90 md:text-base">
                {content.contactSubtitle}
              </p>

              <div className="mt-8 space-y-6">
                {/* Phone */}
                <a
                  href={CONTACT_WHATSAPP_URL}
                  className="flex items-start gap-3 transition-opacity hover:opacity-80"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Phone</p>
                    <p className="text-sm opacity-90">{content.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${content.email}`}
                  className="flex items-start gap-3 transition-opacity hover:opacity-80"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-sm opacity-90">{content.email}</p>
                  </div>
                </a>

                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                    {content.locationTitle}
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
                        🇫🇷
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {content.locationFrance}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
                        🇸🇪
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {content.locationSweden}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="mt-12 h-32 w-32 rounded-full bg-white/10" />
            </div>

            {/* Right - Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 md:text-base">
                  {content.nameLabel}
                </label>
                <input
                  type="text"
                  className="mt-2 w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:border-[#1ab5ce] focus:outline-none md:py-3"
                  placeholder="John Trangely"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 md:text-base">
                  {content.emailLabel}
                </label>
                <input
                  type="email"
                  className="mt-2 w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:border-[#1ab5ce] focus:outline-none md:py-3"
                  placeholder="hello@urenergy.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 md:text-base">
                  {content.subjectLabel}
                </label>
                <input
                  type="text"
                  className="mt-2 w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:border-[#1ab5ce] focus:outline-none md:py-3"
                  placeholder="I want to hire you quickly"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 md:text-base">
                  {content.messageLabel}
                </label>
                <textarea
                  className="mt-2 w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder-slate-400 focus:border-[#1ab5ce] focus:outline-none md:py-3"
                  rows={4}
                  placeholder={content.writePlaceholder}
                  value={formData.message}
                  onChange={handleChange("message")}
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1ab5ce] px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 md:px-8 md:py-3"
              >
                {content.sendButton}
              </button>
            </form>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageDirWrapper>
  );
}
