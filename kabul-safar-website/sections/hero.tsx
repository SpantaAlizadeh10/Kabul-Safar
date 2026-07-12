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
    <section aria-labelledby="hero-title" dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden rounded-2xl bg-[#18b8d0] md:rounded-3xl">
        <div className="flex justify-between items-center gap-4 px-4 py-6 md:gap-8 md:px-8 md:py-10">
          {/* Text Content (left) */}
          <div className="flex-1 text-left">
            <h1
              id="hero-title"
              className="text-base font-bold leading-tight text-black text-left md:text-3xl md:leading-tight"
            >
              ویزای <span>{content.titleIran}</span> و{" "}
              <span>{content.titleAsia}</span>
            </h1>

            <p className="mt-1 text-xs font-medium text-black/90 text-left md:mt-2 md:text-sm">
              {content.subTitle}
            </p>

            <ul className="mt-2 space-y-1 md:mt-3 md:space-y-1.5">
              {content.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start justify-start gap-1.5"
                >
                  <Check
                    className="mt-0.5 h-3 w-3 shrink-0 text-white md:h-4 md:w-4"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] leading-tight text-black/90 md:text-xs md:leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex justify-start md:mt-4">
              <ConsultButton
                href="/visa"
                label={content.consultCta}
                className="h-8 rounded-full px-4 text-xs font-semibold md:h-10 md:px-5 md:text-sm"
              />
            </div>
          </div>

          {/* Right image (hidden on small screens) */}
          <div className="hidden md:block w-[35%] shrink-0">
            <Image
              src="/images/Hero image.jpeg"
              alt="suitcase"
              width={400}
              height={300}
              className="h-auto w-full object-contain"
              aria-hidden="true"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
