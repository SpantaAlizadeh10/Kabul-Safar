"use client";

import { useI18n } from "@/components/i18n-provider";
import { getFaqContent } from "@/lib/data";

export const Faq = () => {
  const { lang } = useI18n();
  const content = getFaqContent(lang);

  return (
    <section id="faq" aria-labelledby="faq-title" className="space-y-3">
      <div className="rounded-[26px] bg-white px-4 py-5 shadow-sm md:px-6 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h2
              id="faq-title"
              className="text-right text-[10px] font-bold text-black md:text-2xl"
            >
              {content.title}
            </h2>
            <p className="text-[8px] leading-5 text-[rgba(0,0,0,0.75)] md:max-w-2xl md:text-sm">
              {content.subtitle}
            </p>
          </div>
          <p className="text-right text-[8px] font-bold text-[#0dadd1] md:text-sm">
            {content.cta}
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {content.items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#e0f5fb] bg-[#f4fcff] p-4 transition-all duration-200 hover:shadow-md"
            >
              <h3 className="text-[9px] font-bold text-black md:text-sm">
                {item.question}
              </h3>
              <p className="mt-2 text-[7px] leading-5 text-[rgba(0,0,0,0.72)] md:text-xs md:leading-6">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
