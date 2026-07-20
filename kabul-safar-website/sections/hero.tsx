"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { ConsultButton } from "@/components/consult-button";
import { getHeroContent } from "@/lib/data";

export const Hero = () => {
  const { lang } = useI18n();
  const content = getHeroContent(lang);
  const isRtl = lang === "fa" || lang === "ps";
  const titleText = isRtl
    ? `${content.titlePrefix} ${content.titleIran} و ${content.titleAsia}`
    : `${content.titlePrefix} ${content.titleIran} and ${content.titleAsia}`;

  return (
    <section aria-labelledby="hero-title" dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden rounded-2xl bg-[#89bfc9] md:rounded-3xl">
        <div
          className="flex flex-col items-center gap-6 px-5 py-6 md:flex-row md:items-start md:gap-8 md:px-10 md:py-10"
        >
          {/* Text Content */}
          <div className="flex-1 min-w-0 text-center">
            <h1
              id="hero-title"
              className="break-words text-[22px] font-black leading-[1.05] text-white md:text-[42px] md:leading-[1.04]"
            >
              {titleText}
            </h1>

            <p
              className="mt-3 text-base font-medium text-black/90 md:mt-4 md:text-lg"
            >
              {content.subTitle}
            </p>

            <ul className="mt-4 space-y-2 md:mt-5 md:space-y-2.5">
              {content.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-center gap-2"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-black md:h-5 md:w-5"
                    aria-hidden="true"
                  />
                  <span
                    className="text-base leading-tight text-black/90 md:text-lg md:leading-relaxed"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-5 flex flex-wrap items-center justify-center gap-3 md:mt-6"
            >
              <ConsultButton
                label={content.consultCta}
                className="h-10 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition-transform hover:-translate-y-0.5 md:h-12 md:px-6"
              />
            </div>
          </div>

          {/* Image (shown on all screens) */}
          <div className="w-full shrink-0 md:w-[45%] md:max-w-[420px]">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
              <Image
                src="/images/Kabul hero.jpg"
                alt="Kabul Safar"
                width={740}
                height={660}
                className="mx-auto h-auto w-full max-w-[420px] object-cover"
                aria-hidden="true"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
