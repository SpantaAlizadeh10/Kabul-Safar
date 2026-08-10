"use client";

import { useI18n } from "@/components/i18n-provider";
import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";

export default function PrivacyPage() {
  const { lang } = useI18n();

  const content = {
    fa: {
      title: "حریم خصوصی",
      description: "سیاست حفظ حریم خصوصی کابل سفر",
      sections: [
        {
          title: "جمع‌آوری اطلاعات",
          content: "ما اطلاعات شخصی شما را فقط برای ارائه خدمات بهتر جمع‌آوری می‌کنیم. این اطلاعات شامل نام، شماره تماس، و اطلاعات مربوط به درخواست ویزا می‌شود."
        },
        {
          title: "استفاده از اطلاعات",
          content: "اطلاعات جمع‌آوری شده تنها برای پردازش درخواست‌های ویزا و ارائه خدمات سفر استفاده می‌شود. ما اطلاعات شما را با هیچ شخص ثالثی به اشتراک نمی‌گذاریم."
        },
        {
          title: "امنیت اطلاعات",
          content: "ما از اقدامات امنیتی مناسب برای محافظت از اطلاعات شخصی شما استفاده می‌کنیم. تمام اطلاعات شما به صورت امن ذخیره و پردازش می‌شوند."
        },
        {
          title: "دسترسی به اطلاعات",
          content: "شما می‌توانید در هر زمان درخواست دسترسی به اطلاعات شخصی خود را داشته باشید و درخواست اصلاح یا حذف آن را ارسال کنید."
        },
        {
          title: "تماس با ما",
          content: "برای هرگونه سوال در مورد سیاست حریم خصوصی، می‌توانید با ما تماس بگیرید."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      description: "Kabul Safar Privacy Policy",
      sections: [
        {
          title: "Information Collection",
          content: "We collect your personal information only to provide better services. This includes your name, contact number, and visa request related information."
        },
        {
          title: "Use of Information",
          content: "Collected information is used solely for processing visa requests and providing travel services. We do not share your information with any third parties."
        },
        {
          title: "Information Security",
          content: "We use appropriate security measures to protect your personal information. All your data is stored and processed securely."
        },
        {
          title: "Access to Information",
          content: "You can request access to your personal information at any time and request corrections or deletions."
        },
        {
          title: "Contact Us",
          content: "For any questions about our privacy policy, please contact us."
        }
      ]
    },
    ps: {
      title: "محرمیت",
      description: "د کابل سفر د محرمیت تګلاره",
      sections: [
        {
          title: "د معلوماتو راټولول",
          content: "موږ ستاسو شخصي معلومات یوازې د ښه خدماتو د چمتو کولو لپاره راټولوو. دا معلومات نوم، اړیکه شمیره، او د ویزې غوښتنې اړوند معلومات په کې شامل دي."
        },
        {
          title: "د معلوماتو کارول",
          content: "راټول شوي معلومات یوازې د ویزې غوښتنو د پروسس کولو او د سفر خدماتو د چمتو کولو لپاره کارول کیږي. موږ ستاسو معلومات هیڅ دریم ګړي سره شریک نه کوو."
        },
        {
          title: "د معلوماتو خوندیتوب",
          content: "موږ د ستاسو شخصي معلوماتو د ساتنې لپاره مناسبه خوندیتوب اقدامات کاروو. ستاسو ټول معلومات په امن ډول ذخیره او پروسس کیږي."
        },
        {
          title: "د معلوماتو لاسرسی",
          content: "تاسو کولی شئ په هر وخت کې د ستاسو شخصي معلوماتو ته د لاسرسي غوښتنه وکړئ او د تصحیح یا حذف غوښتنه واستوئ."
        },
        {
          title: "زموږ سره اړیکه ونیسئ",
          content: "د محرمیت تګلارې په اړه هر ډول پوښتنې لپاره، مهرباني وکړئ زموږ سره اړیکه ونیسئ."
        }
      ]
    }
  };

  const currentContent = content[lang] || content.fa;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <div className="py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="mb-2 text-3xl font-bold text-slate-900">
              {currentContent.title}
            </h1>
            <p className="text-slate-600">
              {currentContent.description}
            </p>
          </div>

          <div className="space-y-6">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-md">
                <h2 className="mb-3 text-xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
            <p className="text-center text-sm text-slate-500">
              {lang === "fa" ? "آخرین بروزرسانی: " : lang === "ps" ? "آخرین نوی: " : "Last updated: "}{new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
