"use client";

import { useI18n } from "@/components/i18n-provider";
import { getHowItWorksContent } from "@/lib/data";

export const HowItWorks = () => {
  const { lang } = useI18n();
  const content = getHowItWorksContent(lang);

  return (
    <section id="services" aria-labelledby="how-it-works-title" className="space-y-3">
      <header className="space-y-1 text-center">
        <h2 id="how-it-works-title" className="text-xs font-semibold text-black md:text-2xl">
          {content.title}
        </h2>
        <p className="text-[8px] leading-4 tracking-wide text-[rgba(0,0,0,0.68)] md:mx-auto md:max-w-3xl md:text-sm md:leading-6">
          {content.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-3 items-end gap-1 md:gap-4">
        {content.steps.map((step) => (
          <article
            key={step.id}
            className={`relative flex flex-col rounded-t-[10px] p-2.5 ${
              step.accent
                ? "min-h-[168px] rounded-b-none bg-[#377bc9] text-white md:min-h-[240px]"
                : "mb-5 min-h-[134px] rounded-b-[10px] bg-[rgba(98,202,225,0.5)] text-black md:mb-8 md:min-h-[210px]"
            }`}
          >
            <step.icon
              className={`mb-2 h-4 w-4 md:h-6 md:w-6 ${step.accent ? "text-white" : "text-[#377bc9]"}`}
              aria-hidden="true"
            />
            <h3 className="text-[10px] font-semibold leading-4 md:text-base md:leading-6">{step.title}</h3>
            <p
              className={`mt-1 text-[6px] leading-4 tracking-wide ${
                step.accent ? "text-white/90" : "text-black"
              } md:text-xs md:leading-5`}
            >
              {step.description}
            </p>
            <div className="mt-auto flex justify-center pt-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#2c6994] md:h-8 md:w-8 md:text-sm">
                {step.id}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
