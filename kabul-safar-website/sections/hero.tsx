"use client";

import { Clock, Languages, MessageCircle } from "lucide-react";
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

            <div className="mt-4 grid gap-2 md:mt-5 md:grid-cols-3 md:gap-3">
              <div className="rounded-lg bg-white/20 p-2.5 backdrop-blur-sm transition-all hover:bg-white/30 md:p-3">
                <div className="flex items-center gap-2 text-center md:gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/40 md:h-8 md:w-8">
                    <Clock className="h-3.5 w-3.5 text-black md:h-4 md:w-4" />
                  </div>
                  <span className="text-xs font-medium text-black/90 md:text-sm">
                    {content.bullets[0]}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white/20 p-2.5 backdrop-blur-sm transition-all hover:bg-white/30 md:p-3">
                <div className="flex items-center gap-2 text-center md:gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/40 md:h-8 md:w-8">
                    <Languages className="h-3.5 w-3.5 text-black md:h-4 md:w-4" />
                  </div>
                  <span className="text-xs font-medium text-black/90 md:text-sm">
                    {content.bullets[1]}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white/20 p-2.5 backdrop-blur-sm transition-all hover:bg-white/30 md:p-3">
                <div className="flex items-center gap-2 text-center md:gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/40 md:h-8 md:w-8">
                    <MessageCircle className="h-3.5 w-3.5 text-black md:h-4 md:w-4" />
                  </div>
                  <span className="text-xs font-medium text-black/90 md:text-sm">
                    {content.bullets[2]}
                  </span>
                </div>
              </div>
            </div>

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

              {/* Feature Bubbles */}
              {/* Top Left - Speed */}
              <div className="absolute left-1 top-1 md:left-2 md:top-2">
                <div className="relative group">
                  <div className="absolute -left-0.5 -top-0.5 h-2 w-2 md:h-3 md:w-3 rounded-full bg-white/60 animate-ping" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/40 transition-transform group-hover:scale-110 md:h-10 md:w-10">
                    <Clock className="h-4 w-4 text-orange-500 md:h-5 md:w-5" />
                  </div>
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 w-32 md:left-12 md:w-40 rounded-lg bg-white/80 backdrop-blur-md px-2 py-1.5 md:px-3 md:py-2 shadow-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <p className="text-[10px] font-semibold text-gray-900 md:text-xs">
                      {content.bullets[0]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Right - Multilingual */}
              <div className="absolute right-1 top-1 md:right-2 md:top-2">
                <div className="relative group">
                  <div className="absolute -right-0.5 -top-0.5 h-2 w-2 md:h-3 md:w-3 rounded-full bg-white/60 animate-ping" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/40 transition-transform group-hover:scale-110 md:h-10 md:w-10">
                    <Languages className="h-4 w-4 text-blue-500 md:h-5 md:w-5" />
                  </div>
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 md:right-12 md:w-40 rounded-lg bg-white/80 backdrop-blur-md px-2 py-1.5 md:px-3 md:py-2 shadow-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <p className="text-[10px] font-semibold text-gray-900 md:text-xs">
                      {content.bullets[1]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Left - Free Consultation */}
              <div className="absolute left-1 bottom-1 md:left-2 md:bottom-2">
                <div className="relative group">
                  <div className="absolute -left-0.5 -bottom-0.5 h-2 w-2 md:h-3 md:w-3 rounded-full bg-white/60 animate-ping" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/40 transition-transform group-hover:scale-110 md:h-10 md:w-10">
                    <MessageCircle className="h-4 w-4 text-green-500 md:h-5 md:w-5" />
                  </div>
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 w-32 md:left-12 md:w-40 rounded-lg bg-white/80 backdrop-blur-md px-2 py-1.5 md:px-3 md:py-2 shadow-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <p className="text-[10px] font-semibold text-gray-900 md:text-xs">
                      {content.bullets[2]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Right - Trust Badge */}
              <div className="absolute right-1 bottom-1 md:right-2 md:bottom-2">
                <div className="relative group">
                  <div className="absolute -right-0.5 -bottom-0.5 h-2 w-2 md:h-3 md:w-3 rounded-full bg-white/60 animate-ping" />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg border border-white/40 transition-transform group-hover:scale-110 md:h-10 md:w-10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-yellow-500 md:h-5 md:w-5"
                      fill="currentColor"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 md:right-12 md:w-40 rounded-lg bg-white/80 backdrop-blur-md px-2 py-1.5 md:px-3 md:py-2 shadow-xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                    <p className="text-[10px] font-semibold text-gray-900 md:text-xs">
                      {isRtl ? "۵۰۰۰+ مسافر راضی" : "5000+ Happy Travelers"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
