"use client";

import { useI18n } from "@/components/i18n-provider";
import { getWhyContent } from "@/lib/data";

export const WhyChooseUs = () => {
  const { lang } = useI18n();
  const content = getWhyContent(lang);

  return (
    <section aria-labelledby="why-choose-title" className="space-y-3">
      <header className="space-y-1 text-center">
        <h2 id="why-choose-title" className="text-[10px] font-bold text-black md:text-2xl">
          {content.title}
        </h2>
        <p className="text-[8px] leading-4 tracking-wide text-[rgba(0,0,0,0.74)] md:mx-auto md:max-w-3xl md:text-sm md:leading-6">
          {content.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-[86px_1fr_86px] items-end gap-2 md:grid-cols-3 md:gap-4">
        {content.features.map((feature) => (
          <article
            key={feature.id}
            className={`flex flex-col items-center rounded-[10px] px-2.5 py-4 text-center ${
              feature.variant === "light"
                ? "min-h-[116px] bg-[rgba(13,173,209,0.8)] text-black md:min-h-[220px]"
                : "min-h-[128px] bg-[rgba(2,45,55,0.85)] text-white md:min-h-[220px]"
            }`}
          >
            <feature.icon
              className={`mb-2 h-5 w-5 ${
                feature.variant === "light" ? "text-[#022d37]" : "text-white"
              } md:h-8 md:w-8`}
              aria-hidden="true"
            />
            <h3 className="text-[10px] font-medium tracking-wide md:text-lg">{feature.title}</h3>
            <p
              className={`mt-2 text-[6px] leading-4 tracking-wide ${
                feature.variant === "light"
                  ? "text-[rgba(0,0,0,0.74)]"
                  : "text-white/95"
              } md:text-xs md:leading-6`}
            >
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
