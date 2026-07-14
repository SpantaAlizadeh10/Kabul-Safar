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

  return (
    <section aria-labelledby="hero-title">
      <div className="relative overflow-hidden rounded-2xl bg-[#89BFC9] md:rounded-3xl">
        <div
          dir="ltr"
          className="flex flex-row flex-nowrap items-center gap-3 px-4 py-5 md:gap-6 md:px-8 md:py-8"
        >
          <div className="w-[42%] shrink-0 md:w-[44%]">
            <Image
              src="/images/hero-illustration-new.jpeg"
              alt=""
              width={740}
              height={660}
              className="h-auto w-full object-contain"
              aria-hidden="true"
              priority
            />
          </div>

          <div
            dir={isRtl ? "rtl" : "ltr"}
            className={`min-w-0 flex-1 ${isRtl ? "text-right" : "text-left"}`}
          >
            <h1
              id="hero-title"
              className="text-[20px] font-black leading-tight text-black md:text-[42px] md:leading-[1.04]"
            >
              {content.titlePrefix}{" "}
              <span className="text-white">
                {content.titleIran} {isRtl ? "و" : "and"} {content.titleAsia}
              </span>
            </h1>

            <p className="mt-2 text-xs font-bold text-black md:mt-3 md:text-base">
              {content.subTitle}
            </p>

            <ul className="mt-3 space-y-1.5 md:mt-5 md:space-y-2.5">
              {content.bullets.map((item) => (
                <li key={item} className="flex flex-row items-start gap-1.5 md:gap-2">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white md:h-4 md:w-4"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] leading-snug text-black/90 md:text-sm md:leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className={`mt-4 md:mt-6 ${isRtl ? "flex justify-end" : "flex justify-start"}`}>
              <ConsultButton label={content.consultCta} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
