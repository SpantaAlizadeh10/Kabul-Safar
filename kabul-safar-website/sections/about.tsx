"use client";

import { useI18n } from "@/components/i18n-provider";
import { getAboutContent } from "@/lib/data";

export const About = () => {
  const { lang } = useI18n();
  const content = getAboutContent(lang);

  return (
    <section id="about" aria-labelledby="about-title" className="space-y-3">
      <header className="space-y-2 text-center">
        <h2 id="about-title" className="text-xs font-bold tracking-wide text-black md:text-2xl">
          {content.title}
        </h2>
        <p className="text-sm font-bold leading-5 tracking-wide text-black md:mx-auto md:max-w-4xl md:text-lg md:leading-7">
          {content.subtitle}
        </p>
      </header>

      <div className="flex items-stretch gap-3 md:gap-6">
        {content.columns.map((text, index) => (
          <div key={text} className="flex flex-1 items-stretch gap-3 md:gap-6">
            {index > 0 ? (
              <div className="w-px shrink-0 bg-slate-300" aria-hidden="true" />
            ) : null}
            <p className="flex-1 text-right text-xs leading-4 tracking-wide text-[rgba(0,0,0,0.8)] md:text-base md:leading-7">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
