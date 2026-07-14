"use client";

import { useI18n } from "@/components/i18n-provider";
import { getHowItWorksContent } from "@/lib/data";

export const HowItWorks = () => {
  const { lang } = useI18n();
  const content = getHowItWorksContent(lang);

  return (
    <section
      id="services"
      aria-labelledby="how-it-works-title"
      className="space-y-3"
    >
      <header className="space-y-1 text-center">
        <h2
          id="how-it-works-title"
          className="text-xs font-semibold text-black md:text-2xl"
        >
          {content.title}
        </h2>
        <p className="text-[8px] leading-4 tracking-wide text-[rgba(0,0,0,0.68)] md:mx-auto md:max-w-3xl md:text-sm md:leading-6">
          {content.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {content.steps.map((step) => (
          <article
            key={step.id}
            className={`relative flex flex-col rounded-2xl p-4 transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-lg ${
              step.accent
                ? "bg-[#377bc9] text-white md:min-h-60"
                : "bg-[rgba(98,202,225,0.6)] text-black md:min-h-52.5"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 md:h-12 md:w-12">
                <step.icon
                  className={`h-5 w-5 ${step.accent ? "text-white" : "text-[#377bc9]"}`}
                  aria-hidden="true"
                />
              </div>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#2c6994] md:hidden">
                {step.id}
              </span>
            </div>

            <h3 className="mt-2 text-sm font-semibold leading-5 md:mt-0 md:text-lg md:leading-7">
              {step.title}
            </h3>

            <p
              className={`mt-2 text-[10px] leading-5 tracking-wide ${step.accent ? "text-white/90" : "text-black/90"} md:text-sm md:leading-6`}
            >
              {step.description}
            </p>

            <div className="hidden md:block absolute left-1/2 bottom-4 -translate-x-1/2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#2c6994] md:h-10 md:w-10 md:text-base">
                {step.id}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
