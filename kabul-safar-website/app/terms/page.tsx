"use client";

import { useI18n } from "@/components/i18n-provider";
import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";

export default function TermsPage() {
  const { lang } = useI18n();

  const content = {
    fa: {
      title: "قوانین و مقررات",
      description: "قوانین و مقررات استفاده از خدمات کابل سفر",
      sections: [
        {
          title: "پذیرش قوانین",
          content: "با استفاده از خدمات کابل سفر، شما موافقت می‌کنید که از این قوانین و مقررات پیروی کنید. لطفاً قبل از استفاده از خدمات، این قوانین را به دقت مطالعه کنید."
        },
        {
          title: "خدمات ویزا",
          content: "کابل سفر خدمات مشاوره و پشتیبانی برای درخواست ویزا ارائه می‌دهد. ما تضمین نمی‌کنیم که ویزا صادر شود، زیرا تصمیم نهایی با سفارت مربوطه است."
        },
        {
          title: "تعهدات مشتری",
          content: "مشتری موظف است اطلاعات صحیح و کامل را ارائه دهد. هرگونه اطلاعات نادرست ممکن است منجر به رد درخواست ویزا شود."
        },
        {
          title: "پرداخت‌ها",
          content: "تمام هزینه‌های خدمات باید قبل از شروع فرآیند پرداخت شوند. در صورت رد درخواست ویزا توسط سفارت، هزینه‌های خدمات قابل بازگشت نیستند."
        },
        {
          title: "مسئولیت",
          content: "کابل سفر مسئولیتی در قبال تأخیر یا رد درخواست ویزا توسط سفارت‌ها ندارد. ما فقط خدمات مشاوره و پشتیبانی ارائه می‌دهیم."
        },
        {
          title: "تماس با ما",
          content: "برای هرگونه سوال در مورد قوانین و مقررات، می‌توانید با ما تماس بگیرید."
        }
      ]
    },
    en: {
      title: "Terms and Conditions",
      description: "Kabul Safar Terms and Conditions",
      sections: [
        {
          title: "Acceptance of Terms",
          content: "By using Kabul Safar services, you agree to comply with these terms and conditions. Please read these terms carefully before using our services."
        },
        {
          title: "Visa Services",
          content: "Kabul Safar provides consultation and support services for visa applications. We do not guarantee visa issuance as the final decision rests with the respective embassy."
        },
        {
          title: "Customer Obligations",
          content: "The customer is required to provide accurate and complete information. Any incorrect information may lead to visa application rejection."
        },
        {
          title: "Payments",
          content: "All service fees must be paid before the process begins. In case of visa rejection by the embassy, service fees are non-refundable."
        },
        {
          title: "Liability",
          content: "Kabul Safar is not responsible for delays or rejection of visa applications by embassies. We only provide consultation and support services."
        },
        {
          title: "Contact Us",
          content: "For any questions about terms and conditions, please contact us."
        }
      ]
    },
    ps: {
      title: "شرایط او مقررات",
      description: "د کابل سفر د خدماتو کارولو شرایط او مقررات",
      sections: [
        {
          title: "د شرایطو منل",
          content: "د کابل سفر خدماتو کارولو سره، تاسو د دې شرایطو او مقرراتو د پیروي کولو موافق یاست. مهرباني وکړئ د خدماتو کارولو مخکې دا شرایطو په دقیق ډول ولولئ."
        },
        {
          title: "د ویزې خدمات",
          content: "کابل سفر د ویزې غوښتنو لپاره مشوره او ملاتړ خدمات وړاندې کوي. موږ د ویزې د صادر کیدو تضمین نه کوو ځکه چې پایي پریکړه په اړوند سفارت کې ده."
        },
        {
          title: "د مشتری اړوندې",
          content: "مشتری موظف دی چې دقیق او بشپړ معلومات وړاندې کړي. هر ډول ناسم معلومات کولی شي د ویزې غوښتنې د رد کیدو لامل شي."
        },
        {
          title: "پورتنې",
          content: "د خدماتو ټول لګښتونه باید د بهیر پیلیدونکي مخکې ورکول شي. د سفارت لخوا د ویزې غوښتنې د رد کیدو په صورت کې، د خدماتو لګښتونه بیرته نه ورکول کیږي."
        },
        {
          title: "مسئولیت",
          content: "کابل سفر د سفارتونو لخوا د ویزې غوښتنو د تاخیر یا رد کیدو په اړه مسئولیت نه لري. موږ یوازې مشوره او ملاتړ خدمات وړاندې کوو."
        },
        {
          title: "زموږ سره اړیکه ونیسئ",
          content: "د شرایط او مقرراتو په اړه هر ډول پوښتنې لپاره، مهرباني وکړئ زموږ سره اړیکه ونیسئ."
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
